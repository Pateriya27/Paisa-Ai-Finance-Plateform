import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // Get user information
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    const name = `${firstName} ${lastName}`.trim() || 'User';
    const imageUrl = user.imageUrl || '';
    const email = user.emailAddresses && user.emailAddresses[0] 
      ? user.emailAddresses[0].emailAddress 
      : '';

    // Create new user
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl,
        email,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error in checkUser:", error);
    throw error;
  }
};
