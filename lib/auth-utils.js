import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

/**
 * Safely gets or creates a user record from Clerk authentication
 * Uses upsert to avoid race conditions between concurrent API calls
 */
export async function getOrCreateUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    // Use upsert to safely create the user if it doesn't exist
    const user = await db.user.upsert({
      where: { clerkUserId: userId },
      update: {}, // No updates if user exists
      create: {
        clerkUserId: userId,
        email: "",
        name: "",
      },
    });

    return user;
  } catch (error) {
    console.error("Error in getOrCreateUser:", error);
    throw error;
  }
} 