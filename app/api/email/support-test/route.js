import { sendSupportEmail } from "@/actions/support";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Send a test support email
    const result = await sendSupportEmail({
      name: "Test User",
      email: "testuser@example.com",
      subject: "Test Support Request",
      message: "This is a test support message to verify email functionality.",
    });

    // Return detailed response for debugging
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        data: result.data,
        message: "Test support email sent successfully!",
        info: "Check catch693@gmail.com to see the test email"
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: result.error,
        details: result.details,
        message: "Failed to send test email",
        info: "Check the error details for more information"
      }, { 
        status: 400 
      });
    }
  } catch (error) {
    console.error("Support email test failed:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        message: "Failed to send test support email" 
      },
      { status: 500 }
    );
  }
} 