import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Cache recommendations to reduce API calls
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
const recommendationsCache = new Map();

export async function POST() {
  try {
    // Authenticate the user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if we have a valid cached result
    const cachedResult = recommendationsCache.get(userId);
    if (cachedResult && (Date.now() - cachedResult.timestamp < CACHE_DURATION)) {
      return NextResponse.json(cachedResult.data, { status: 200 });
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

    // Get user's transactions for the last 3 months
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    // Fetch only necessary fields to improve query performance
    const transactions = await db.transaction.findMany({
      where: {
        userId: user.id,
        date: {
          gte: threeMonthsAgo,
        },
      },
      select: {
        id: true,
        type: true,
        amount: true,
        category: true,
        description: true,
        date: true,
        isRecurring: true,
        accountId: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    // If no transactions, return sample recommendations
    if (transactions.length === 0) {
      const fallbackData = {
        suggestions: getFallbackSuggestions(),
        monthlySavings: 4500,
        annualImpact: 54000,
      };
      
      // Cache the fallback result
      recommendationsCache.set(userId, {
        timestamp: Date.now(),
        data: fallbackData
      });
      
      return NextResponse.json(fallbackData, { status: 200 });
    }

    // Prepare transaction data for AI analysis - optimize by doing a single pass through the data
    const transactionSummary = prepareTransactionDataForAI(transactions);

    // Generate insights using Gemini AI
    const aiSuggestions = await generateAISuggestions(transactionSummary);
    
    // Cache the result
    recommendationsCache.set(userId, {
      timestamp: Date.now(),
      data: aiSuggestions
    });
    
    // Revalidate dashboard path to update UI
    revalidatePath("/dashboard");

    return NextResponse.json(aiSuggestions, { status: 200 });
  } catch (error) {
    console.error("Error generating AI recommendations:", error);
    
    // Return a friendly error message based on the type of error
    const errorMessage = error.message?.includes("rate limit") 
      ? "AI service is currently busy. Please try again later."
      : error.message || "Failed to generate recommendations";
    
    return NextResponse.json(
      { 
        error: errorMessage,
        // Provide fallback data even in error case for better UX
        suggestions: getFallbackSuggestions(),
        monthlySavings: 5000,
        annualImpact: 60000,
      },
      { status: error.status || 500 }
    );
  }
}

// Prepare transaction data for AI analysis - optimized for a single pass through the data
function prepareTransactionDataForAI(transactions) {
  // Pre-allocate objects to avoid re-creation
  const expensesByCategory = {};
  let totalIncome = 0;
  let totalExpenses = 0;
  const recurringExpenses = [];
  const highValueTransactions = [];
  let expenseCount = 0;
  let incomeCount = 0;

  // Single pass through transactions
  for (const transaction of transactions) {
    const amount = parseFloat(transaction.amount);
    
    if (transaction.type === "EXPENSE") {
      // Add to category total
      expensesByCategory[transaction.category] = (expensesByCategory[transaction.category] || 0) + amount;
      
      // Add to expense total
      totalExpenses += amount;
      expenseCount++;
      
      // Check for recurring expenses (only store essential data)
      if (transaction.isRecurring) {
        recurringExpenses.push({
          description: transaction.description,
          amount,
          category: transaction.category,
        });
      }
      
      // Check for high value transactions (over 1000)
      if (amount > 1000) {
        highValueTransactions.push({
          description: transaction.description,
          amount,
          category: transaction.category,
          date: transaction.date,
        });
      }
    } else if (transaction.type === "INCOME") {
      totalIncome += amount;
      incomeCount++;
    }
  }

  // Calculate averages
  const monthlyExpenseAvg = totalExpenses / 3; // Last 3 months
  const monthlyIncomeAvg = totalIncome / 3; // Last 3 months
  const savingsRate = monthlyIncomeAvg > 0 
    ? ((monthlyIncomeAvg - monthlyExpenseAvg) / monthlyIncomeAvg * 100)
    : 0;

  // Sort categories by amount once at the end
  const topExpenseCategories = Object.entries(expensesByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([category, amount]) => ({ category, amount }));

  // Return optimized data structure
  return {
    expensesByCategory,
    monthlyExpenseAvg,
    monthlyIncomeAvg,
    savingsRate,
    topExpenseCategories,
    recurringExpenses: recurringExpenses.slice(0, 5), // Limit to top 5 for AI prompt size
    highValueTransactions: highValueTransactions.slice(0, 5), // Limit to top 5 for AI prompt size
    transactionCount: transactions.length,
  };
}

// Generate AI suggestions based on transaction data
async function generateAISuggestions(transactionData) {
  try {
    // Verify API key is available
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '') {
      console.error("Missing or invalid GEMINI_API_KEY environment variable");
      return {
        suggestions: getFallbackSuggestions(),
        monthlySavings: 5500,
        annualImpact: 66000,
      };
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    });

    // Simplified and shortened prompt for better performance
    const prompt = `
      Generate personalized financial recommendations based on this data:
      - Monthly expenses: ₹${transactionData.monthlyExpenseAvg.toFixed(0)}
      - Monthly income: ₹${transactionData.monthlyIncomeAvg.toFixed(0)}
      - Savings rate: ${transactionData.savingsRate.toFixed(1)}%
      - Top expenses: ${JSON.stringify(transactionData.topExpenseCategories)}
      - Recurring expenses: ${JSON.stringify(transactionData.recurringExpenses)}

      Create three recommendation types:
      1. Quick Wins: Immediate savings actions
      2. Monthly Plans: Medium-term strategies
      3. Long-term Strategies: Bigger financial moves

      For each include:
      - title: Descriptive title
      - description: Actionable advice based on spending
      - potentialSavings: Realistic monthly saving amount (INR)
      - category: Financial category

      Format as JSON:
      {
        "suggestions": {
          "quickWins": [
            {"id": 1, "title": "", "description": "", "potentialSavings": 0, "category": ""},
            ...2 more
          ],
          "monthlyPlans": [
            {"id": 4, "title": "", "description": "", "potentialSavings": 0, "category": ""},
            ...1 more
          ],
          "longTerm": [
            {"id": 6, "title": "", "description": "", "potentialSavings": 0, "category": ""},
            ...1 more
          ]
        },
        "monthlySavings": 0, 
        "annualImpact": 0
      }
    `;

    // Set timeout for AI request
    const timeoutMs = 12000; // 12 seconds
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("AI request timed out")), timeoutMs)
    );
    
    // Race the AI request against timeout
    const resultPromise = model.generateContent(prompt);
    const result = await Promise.race([resultPromise, timeoutPromise]);

    const response = await result.response;
    if (!response) {
      throw new Error("Empty response from AI service");
    }

    const text = response.text();
    if (!text) {
      throw new Error("Empty text from AI service");
    }
    
    // Extract JSON from the response - improved regex pattern
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || text.match(/({[\s\S]*})/);
    let parsedResponse;
    
    if (jsonMatch) {
      try {
        const jsonString = jsonMatch[1] || jsonMatch[0];
        
        // More robust JSON cleanup
        let cleanedJson = jsonString.trim();
        
        // Try to fix common JSON formatting issues
        cleanedJson = cleanedJson
          .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":') // Ensure property names are quoted
          .replace(/'/g, '"') // Replace single quotes with double quotes
          .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
          .replace(/\\/g, '\\\\') // Escape backslashes
          .replace(/\n/g, '\\n') // Handle newlines
          .replace(/\r/g, '\\r') // Handle carriage returns
          .replace(/\t/g, '\\t'); // Handle tabs
          
        try {
          // First try to parse directly
          parsedResponse = JSON.parse(cleanedJson);
        } catch (initialError) {
          console.warn("Initial JSON parse failed, trying alternative approach");
          
          // If direct parsing fails, try to extract JSON object using regex
          const extractObject = cleanedJson.match(/{[\s\S]*}/);
          if (extractObject) {
            parsedResponse = JSON.parse(extractObject[0]);
          } else {
            throw new Error("Could not extract valid JSON object");
          }
        }
        
        // Validate and ensure all required fields exist
        if (!parsedResponse.suggestions) {
          console.warn("Missing suggestions in response, using fallback");
          return {
            suggestions: getFallbackSuggestions(),
            monthlySavings: 5000,
            annualImpact: 60000,
          };
        }
        
        // Calculate total savings if not provided
        if (!parsedResponse.monthlySavings) {
          let totalSavings = 0;
          ['quickWins', 'monthlyPlans', 'longTerm'].forEach(type => {
            if (Array.isArray(parsedResponse.suggestions[type])) {
              totalSavings += parsedResponse.suggestions[type].reduce(
                (total, item) => total + (item.potentialSavings || 0), 0
              );
            }
          });
          parsedResponse.monthlySavings = totalSavings;
          parsedResponse.annualImpact = totalSavings * 12;
        }
        
        return parsedResponse;
      } catch (parseError) {
        console.error("JSON parse error:", parseError, "Falling back to default suggestions");
        return {
          suggestions: getFallbackSuggestions(),
          monthlySavings: 5000,
          annualImpact: 60000,
        };
      }
    } else {
      console.warn("Couldn't find JSON in AI response, using fallback");
      return {
        suggestions: getFallbackSuggestions(),
        monthlySavings: 5000,
        annualImpact: 60000,
      };
    }
  } catch (error) {
    console.error("Error generating AI suggestions:", error);
    
    // Return fallback if AI fails
    return {
      suggestions: getFallbackSuggestions(),
      monthlySavings: 5000,
      annualImpact: 60000,
    };
  }
}

// Fallback suggestions for when AI fails or no data is available
function getFallbackSuggestions() {
  return {
    quickWins: [
      {
        id: 1,
        title: "Reduce food delivery expenses",
        description: "You could save by cooking at home more often instead of ordering delivery.",
        potentialSavings: 1600,
        category: "Food"
      },
      {
        id: 2,
        title: "Cancel unused subscriptions",
        description: "Review your monthly subscriptions and cancel services you rarely use.",
        potentialSavings: 899,
        category: "Entertainment"
      },
      {
        id: 3,
        title: "Optimize your mobile plan",
        description: "Consider switching to a more affordable mobile plan based on your usage.",
        potentialSavings: 400,
        category: "Utilities"
      }
    ],
    monthlyPlans: [
      {
        id: 4,
        title: "Set automated savings transfers",
        description: "Automatically move 10% of your income to savings on payday.",
        potentialSavings: 2000,
        category: "Savings"
      },
      {
        id: 5,
        title: "Try the 50/30/20 budget rule",
        description: "Allocate 50% to needs, 30% to wants, and 20% to savings/debt.",
        potentialSavings: 1200,
        category: "Budgeting"
      }
    ],
    longTerm: [
      {
        id: 6,
        title: "Refinance high-interest debt",
        description: "Consider consolidating your credit card debts to a lower interest loan.",
        potentialSavings: 1800,
        category: "Debt"
      },
      {
        id: 7,
        title: "Investment opportunities",
        description: "Based on your risk profile, you could benefit from these investment options.",
        potentialSavings: 8000,
        category: "Investments"
      }
    ]
  };
} 