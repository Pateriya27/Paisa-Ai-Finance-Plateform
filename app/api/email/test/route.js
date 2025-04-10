import { sendEmail } from "@/actions/send-email";
import EmailTemplate from "@/emails/template";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Send a test email
    const result = await sendEmail({
      to: "test@example.com", // Replace with your email to test
      subject: "Test Email from Paisa Finance App",
      react: EmailTemplate({
        userName: "Test User",
        type: "budget-alert",
        data: {
          percentageUsed: 85,
          budgetAmount: 4000,
          totalExpenses: 3400,
          accountName: "Primary Account"
        },
      }),
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Email test failed:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
