import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Helper to serialize Decimal values
const serializeTransaction = (obj) => {
  const serialized = { ...obj };
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }
  return serialized;
};

// Get a single transaction
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Authenticate the user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Find the transaction
    const transaction = await db.transaction.findUnique({
      where: {
        id,
        userId: user.id, // Ensure the transaction belongs to the user
      },
      include: {
        account: true,
      },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // Return the transaction
    return NextResponse.json(
      serializeTransaction(transaction),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch transaction" },
      { status: 500 }
    );
  }
}

// Update a transaction
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    
    // Authenticate the user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Find the existing transaction
    const existingTransaction = await db.transaction.findUnique({
      where: {
        id,
        userId: user.id, // Ensure the transaction belongs to the user
      },
      include: {
        account: true,
      },
    });

    if (!existingTransaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // Parse request body
    const data = await request.json();
    
    // Format date properly
    let formattedDate = data.date;
    if (typeof formattedDate === 'string') {
      formattedDate = new Date(formattedDate);
    }

    // Handle account balance adjustment if amount or type changed
    if (
      data.amount !== existingTransaction.amount.toNumber() ||
      data.type !== existingTransaction.type ||
      data.accountId !== existingTransaction.accountId
    ) {
      // Restore old account balance first
      if (existingTransaction.account) {
        let oldAccountBalance = parseFloat(existingTransaction.account.balance);
        
        if (existingTransaction.type === "INCOME") {
          oldAccountBalance -= parseFloat(existingTransaction.amount);
        } else if (existingTransaction.type === "EXPENSE") {
          oldAccountBalance += parseFloat(existingTransaction.amount);
        }

        await db.account.update({
          where: { id: existingTransaction.accountId },
          data: { balance: oldAccountBalance },
        });
      }

      // Apply new amount to potentially new account
      const accountId = data.accountId || existingTransaction.accountId;
      const account = await db.account.findUnique({
        where: { id: accountId },
      });

      if (account) {
        let newBalance = parseFloat(account.balance);
        
        if (data.type === "INCOME") {
          newBalance += parseFloat(data.amount);
        } else if (data.type === "EXPENSE") {
          newBalance -= parseFloat(data.amount);
        }

        await db.account.update({
          where: { id: accountId },
          data: { balance: newBalance },
        });
      }
    }

    // Update the transaction
    const updatedTransaction = await db.transaction.update({
      where: { id },
      data: {
        type: data.type,
        amount: data.amount,
        description: data.description,
        date: formattedDate,
        category: data.categoryId,
        accountId: data.accountId || existingTransaction.accountId,
        isRecurring: data.isRecurring || false,
        recurringInterval: data.isRecurring ? data.recurringInterval : null,
      },
      include: {
        account: true,
      },
    });

    // Return the updated transaction
    return NextResponse.json(
      { 
        success: true, 
        data: serializeTransaction(updatedTransaction) 
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating transaction:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update transaction" },
      { status: 500 }
    );
  }
}

// Delete a transaction
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Authenticate the user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Find the transaction
    const transaction = await db.transaction.findUnique({
      where: {
        id,
        userId: user.id, // Ensure the transaction belongs to the user
      },
      include: {
        account: true,
      },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // Adjust the account balance
    if (transaction.account) {
      let accountBalance = parseFloat(transaction.account.balance);
      
      if (transaction.type === "INCOME") {
        accountBalance -= parseFloat(transaction.amount);
      } else if (transaction.type === "EXPENSE") {
        accountBalance += parseFloat(transaction.amount);
      }

      await db.account.update({
        where: { id: transaction.accountId },
        data: { balance: accountBalance },
      });
    }

    // Delete the transaction
    await db.transaction.delete({
      where: { id },
    });

    // Return success
    return NextResponse.json(
      { success: true }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete transaction" },
      { status: 500 }
    );
  }
} 