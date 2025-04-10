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

export async function POST(request) {
  try {
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

    // Parse request body
    const data = await request.json();
    console.log("Received data:", data);
    
    // Format date properly
    let formattedDate = data.date;
    if (typeof formattedDate === 'string') {
      formattedDate = new Date(formattedDate);
    }
    
    // Create transaction in database
    const transaction = await db.transaction.create({
      data: {
        type: data.type,
        amount: parseFloat(data.amount),
        description: data.description,
        date: formattedDate,
        category: data.categoryId,
        accountId: data.accountId,
        isRecurring: data.isRecurring || false,
        recurringInterval: data.isRecurring ? data.recurringInterval : null,
        userId: user.id,
      },
    });

    // Update account balance based on transaction type
    const account = await db.account.findUnique({
      where: { id: data.accountId },
    });

    if (account) {
      let newBalance = parseFloat(account.balance);
      
      if (data.type === "INCOME") {
        newBalance += parseFloat(data.amount);
      } else if (data.type === "EXPENSE") {
        newBalance -= parseFloat(data.amount);
      }

      await db.account.update({
        where: { id: data.accountId },
        data: { balance: newBalance },
      });
    }

    // Return the created transaction
    return NextResponse.json(
      { 
        success: true, 
        data: serializeTransaction(transaction) 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create transaction" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
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

    // Get transactions for the user
    const transactions = await db.transaction.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
      include: { account: true },
    });

    // Return transactions
    return NextResponse.json(
      { 
        success: true, 
        data: transactions.map(serializeTransaction) 
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch transactions" },
      { status: 500 }
    );
  }
} 