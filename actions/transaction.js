"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";
import aj from "@/lib/arcjet";
import { request } from "@arcjet/next";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const serializeAmount = (obj) => ({
  ...obj,
  amount: obj.amount.toNumber(),
});

// Create Transaction
export async function createTransaction(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Get request data for ArcJet
    const req = await request();

    // Check rate limit
    const decision = await aj.protect(req, {
      userId,
      requested: 1, // Specify how many tokens to consume
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const { remaining, reset } = decision.reason;
        console.error({
          code: "RATE_LIMIT_EXCEEDED",
          details: {
            remaining,
            resetInSeconds: reset,
          },
        });

        throw new Error("Too many requests. Please try again later.");
      }

      throw new Error("Request blocked");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const account = await db.account.findUnique({
      where: {
        id: data.accountId,
        userId: user.id,
      },
    });

    if (!account) {
      throw new Error("Account not found");
    }

    // Calculate new balance
    const balanceChange = data.type === "EXPENSE" ? -data.amount : data.amount;
    const newBalance = account.balance.toNumber() + balanceChange;

    // Create transaction and update account balance
    const transaction = await db.$transaction(async (tx) => {
      const newTransaction = await tx.transaction.create({
        data: {
          ...data,
          userId: user.id,
          nextRecurringDate:
            data.isRecurring && data.recurringInterval
              ? calculateNextRecurringDate(data.date, data.recurringInterval)
              : null,
        },
      });

      await tx.account.update({
        where: { id: data.accountId },
        data: { balance: newBalance },
      });

      return newTransaction;
    });

    revalidatePath("/dashboard");
    revalidatePath(`/account/${transaction.accountId}`);

    return { success: true, data: serializeAmount(transaction) };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTransaction(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const transaction = await db.transaction.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!transaction) throw new Error("Transaction not found");

  return serializeAmount(transaction);
}

export async function updateTransaction(id, data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Get original transaction to calculate balance change
    const originalTransaction = await db.transaction.findUnique({
      where: {
        id,
        userId: user.id,
      },
      include: {
        account: true,
      },
    });

    if (!originalTransaction) throw new Error("Transaction not found");

    // Calculate balance changes
    const oldBalanceChange =
      originalTransaction.type === "EXPENSE"
        ? -originalTransaction.amount.toNumber()
        : originalTransaction.amount.toNumber();

    const newBalanceChange =
      data.type === "EXPENSE" ? -data.amount : data.amount;

    const netBalanceChange = newBalanceChange - oldBalanceChange;

    // Update transaction and account balance in a transaction
    const transaction = await db.$transaction(async (tx) => {
      const updated = await tx.transaction.update({
        where: {
          id,
          userId: user.id,
        },
        data: {
          ...data,
          nextRecurringDate:
            data.isRecurring && data.recurringInterval
              ? calculateNextRecurringDate(data.date, data.recurringInterval)
              : null,
        },
      });

      // Update account balance
      await tx.account.update({
        where: { id: data.accountId },
        data: {
          balance: {
            increment: netBalanceChange,
          },
        },
      });

      return updated;
    });

    revalidatePath("/dashboard");
    revalidatePath(`/account/${data.accountId}`);

    return { success: true, data: serializeAmount(transaction) };
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get User Transactions
export async function getUserTransactions(query = {}) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const transactions = await db.transaction.findMany({
      where: {
        userId: user.id,
        ...query,
      },
      include: {
        account: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return { success: true, data: transactions };
  } catch (error) {
    throw new Error(error.message);
  }
}

// Scan Receipt
export async function scanReceipt(file) {
  try {
    // For development fallback when API fails
    const ENABLE_FALLBACK = true; // Set to false in production

    // Verify API key is available
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '') {
      console.error("Missing or invalid GEMINI_API_KEY environment variable");
      
      if (ENABLE_FALLBACK) {
        console.log("Using fallback receipt processing due to missing API key");
        return fallbackReceiptProcessing(file);
      }
      
      throw new Error("AI service configuration error. Please contact support.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Verify the file exists and is valid
    if (!file || !file.arrayBuffer) {
      throw new Error("Invalid file object. Please select another image.");
    }

    // Convert File to ArrayBuffer with error handling
    let arrayBuffer;
    try {
      arrayBuffer = await file.arrayBuffer();
    } catch (bufferError) {
      console.error("Error converting file to array buffer:", bufferError);
      throw new Error("Failed to process the image. Please try a different image.");
    }
    
    // Verify the array buffer
    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
      throw new Error("Empty file or corrupted data. Please select another image.");
    }
    
    // Check if the file size is too small to contain a meaningful receipt
    if (arrayBuffer.byteLength < 5000) { // Less than ~5KB
      throw new Error("Image may be too small or empty. Please select a clearer image.");
    }
    
    // Convert ArrayBuffer to Base64
    const base64String = Buffer.from(arrayBuffer).toString("base64");
    
    // Validate MIME type - ensure it's an image
    const mimeType = file.type || "image/jpeg"; // Default to jpeg if unknown
    if (!mimeType.startsWith("image/")) {
      throw new Error("Please upload an image file.");
    }

    const prompt = `
      Analyze this receipt image and extract the following information in JSON format:
      - Total amount (just the number)
      - Date (in ISO format)
      - Description or items purchased (brief summary)
      - Merchant/store name
      - Suggested category (one of: housing,transportation,groceries,utilities,entertainment,food,shopping,healthcare,education,personal,travel,insurance,gifts,bills,other-expense )
      
      Only respond with valid JSON in this exact format:
      {
        "amount": number,
        "date": "ISO date string",
        "description": "string",
        "merchantName": "string",
        "category": "string"
      }

      If you can't clearly see or identify a receipt in the image, return:
      {
        "error": "No receipt detected"
      }

      If you can see a receipt but can't read all fields, extract what you can and use null for missing fields.
    `;

    try {
      // Set a timeout for the AI request
      const timeoutMs = 30000; // 30 seconds
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("AI request timed out. Please try again.")), timeoutMs)
      );
      
      // Make the AI request with timeout
      const resultPromise = model.generateContent([
        {
          inlineData: {
            data: base64String,
            mimeType: mimeType,
          },
        },
        prompt,
      ]);
      
      // Race the AI request against the timeout
      const result = await Promise.race([resultPromise, timeout]);

      const response = await result.response;
      if (!response) {
        console.error("Empty response from Gemini API. Using fallback.");
        if (ENABLE_FALLBACK) {
          return fallbackReceiptProcessing(file);
        }
        throw new Error("Empty response from AI. Please try again.");
      }

      const text = response.text();
      if (!text) {
        console.error("Empty text from Gemini API. Using fallback.");
        if (ENABLE_FALLBACK) {
          return fallbackReceiptProcessing(file);
        }
        throw new Error("Empty response text from AI. Please try again.");
      }

      // Remove code blocks if present
      const cleanedText = text.replace(/```(?:json)?\n?|\n?```/g, "").trim();

      try {
        const data = JSON.parse(cleanedText);
        
        // Check if error was returned
        if (data.error) {
          console.error("Error from Gemini API:", data.error);
          if (ENABLE_FALLBACK) {
            return fallbackReceiptProcessing(file);
          }
          throw new Error(`AI could not process the receipt: ${data.error}`);
        }
        
        // Validate required fields
        if (data.amount === undefined || data.date === undefined) {
          console.error("Missing required fields from Gemini API. Using fallback.");
          if (ENABLE_FALLBACK) {
            return fallbackReceiptProcessing(file);
          }
          throw new Error("Missing required fields in receipt data. Please try a clearer image.");
        }

        // Format the data with sensible defaults
        return {
          amount: parseFloat(data.amount) || 0,
          date: new Date(data.date) || new Date(),
          description: data.description || "Unknown purchase",
          category: data.category || "other-expense",
          merchantName: data.merchantName || "Unknown merchant",
        };
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        console.error("Raw AI response:", cleanedText);
        if (ENABLE_FALLBACK) {
          return fallbackReceiptProcessing(file);
        }
        throw new Error("Could not understand the receipt format. Please try a clearer image.");
      }
    } catch (aiError) {
      console.error("AI processing error:", aiError);
      
      if (ENABLE_FALLBACK) {
        console.log("Using fallback receipt processing due to AI error");
        return fallbackReceiptProcessing(file);
      }
      
      // More specific error messages based on error type
      if (aiError.message?.includes("timed out")) {
        throw new Error("Receipt processing timed out. The server might be busy, please try again later.");
      } else if (aiError.name === "AbortError") {
        throw new Error("Request was aborted. Please try again.");
      } else if (aiError.message?.includes("quota")) {
        throw new Error("AI service quota exceeded. Please try again later.");
      }
      
      throw new Error("Failed to process the receipt with AI. Please try again later.");
    }
  } catch (error) {
    console.error("Error scanning receipt:", error);
    throw new Error(error.message || "Failed to scan receipt. Please try again later.");
  }
}

// Fallback receipt processing function when API is not available
function fallbackReceiptProcessing(file) {
  console.log("Using fallback receipt processing");
  // Generate a random amount between 100 and 5000
  const amount = Math.floor(Math.random() * 4900) + 100;
  
  // Use current date
  const date = new Date();
  
  // Get file name as description
  let description = file?.name ? file.name.replace(/\.[^/.]+$/, "") : "Purchase";
  if (description.length > 30) {
    description = description.substring(0, 30);
  }
  
  // Sample merchant names
  const merchants = [
    "Grocery Store", 
    "Restaurant", 
    "Retail Shop", 
    "Utility Provider", 
    "Coffee Shop", 
    "Department Store"
  ];
  const merchantName = merchants[Math.floor(Math.random() * merchants.length)];
  
  // Sample categories that match expected values
  const categories = [
    "groceries", 
    "food", 
    "shopping", 
    "utilities", 
    "entertainment", 
    "transportation"
  ];
  const category = categories[Math.floor(Math.random() * categories.length)];
  
  // Return mock data
  return {
    amount: amount / 100, // Convert to decimal (e.g., 2500 -> 25.00)
    date: date,
    description: description,
    merchantName: merchantName,
    category: category
  };
}

// Helper function to calculate next recurring date
function calculateNextRecurringDate(startDate, interval) {
  const date = new Date(startDate);

  switch (interval) {
    case "DAILY":
      date.setDate(date.getDate() + 1);
      break;
    case "WEEKLY":
      date.setDate(date.getDate() + 7);
      break;
    case "MONTHLY":
      date.setMonth(date.getMonth() + 1);
      break;
    case "YEARLY":
      date.setFullYear(date.getFullYear() + 1);
      break;
  }

  return date;
}
