"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { getOrCreateUser } from "@/lib/auth-utils";

const serializeDecimal = (obj) => {
  const serialized = { ...obj };
  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }
  return serialized;
};

export async function getUserAccounts() {
  try {
    const user = await getOrCreateUser();

    // Get all accounts for the user
    const accounts = await db.account.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        isDefault: "desc",
      },
    });

    return accounts.map(serializeDecimal);
  } catch (error) {
    console.error("Error fetching user accounts:", error);
    throw error;
  }
}

export async function getAccountWithTransactions(accountId) {
  const user = await getOrCreateUser();

  const account = await db.account.findUnique({
    where: {
      id: accountId,
      userId: user.id,
    },
    include: {
      transactions: {
        orderBy: { date: "desc" },
      },
      _count: {
        select: { transactions: true },
      },
    },
  });

  if (!account) return null;

  return {
    ...serializeDecimal(account),
    transactions: account.transactions.map(serializeDecimal),
  };
}

export async function bulkDeleteTransactions(transactionIds) {
  try {
    const user = await getOrCreateUser();
    
    // Just delete the transactions without adjusting account balances
    await db.transaction.deleteMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });

    // Revalidate paths to update UI
    revalidatePath("/dashboard");
    revalidatePath("/account/[id]");

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateDefaultAccount(accountId) {
  try {
    const user = await getOrCreateUser();

    // First, unset any existing default account
    await db.account.updateMany({
      where: {
        userId: user.id,
        isDefault: true,
      },
      data: { isDefault: false },
    });

    // Then set the new default account
    const account = await db.account.update({
      where: {
        id: accountId,
        userId: user.id,
      },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");
    return { success: true, data: serializeDecimal(account) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteAccount(id) {
  try {
    const user = await getOrCreateUser();

    // Verify the account belongs to the user
    const account = await db.account.findUnique({
      where: {
        id,
        userId: user.id,
      },
      include: {
        _count: {
          select: { transactions: true },
        },
      },
    });

    if (!account) throw new Error("Account not found");

    // Use a transaction to ensure data consistency
    await db.$transaction(async (tx) => {
      // Delete all associated transactions first
      await tx.transaction.deleteMany({
        where: {
          accountId: id,
          userId: user.id,
        },
      });

      // Then delete the account
      await tx.account.delete({
        where: {
          id,
          userId: user.id,
        },
      });
    });

    // Revalidate all necessary paths
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to delete account:", error);
    throw new Error(error.message || "Failed to delete account");
  }
}

export async function updateAccountBalance(accountId, amount) {
  try {
    const user = await getOrCreateUser();

    // Verify the account belongs to the user
    const account = await db.account.findUnique({
      where: {
        id: accountId,
        userId: user.id,
      },
    });

    if (!account) throw new Error("Account not found");

    // Convert amount to Decimal if it's a string
    const adjustAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    // Update the account balance
    const updatedAccount = await db.account.update({
      where: {
        id: accountId,
        userId: user.id,
      },
      data: {
        balance: {
          increment: adjustAmount,
        },
      },
    });

    // Revalidate necessary paths
    revalidatePath("/dashboard");
    revalidatePath(`/account/${accountId}`);

    return { 
      success: true, 
      data: serializeDecimal(updatedAccount) 
    };
  } catch (error) {
    console.error("Failed to update account balance:", error);
    throw new Error(error.message || "Failed to update account balance");
  }
}
