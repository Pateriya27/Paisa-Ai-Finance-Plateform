"use server";

import { Resend } from "resend";
import SupportEmailTemplate from "@/emails/support-template";

export async function sendSupportEmail({ name, email, subject, message }) {
  if (!name || !email || !subject || !message) {
    return { 
      success: false, 
      error: "All fields are required"
    };
  }

  // Check for API key
  const apiKey = process.env.RESEND_API_KEY || "";
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set in environment variables");
    return {
      success: false,
      error: "Email service configuration error: API key not found"
    };
  }

  const resend = new Resend(apiKey);
  
  // In test mode, Resend only allows sending to this email address
  const supportEmail = "catch693@gmail.com"; 
  const realSupportEmail = "harsh080871@gmail.com";

  try {
    console.log(`Attempting to send support email to: ${supportEmail}`);
    
    const response = await resend.emails.send({
      from: "Paisa Support <onboarding@resend.dev>",
      to: supportEmail,
      reply_to: email, // Set reply-to to the user's email
      subject: `Support Request: ${subject}`,
      react: SupportEmailTemplate({
        userName: name,
        userEmail: email,
        subject,
        message,
        testModeInfo: `Real destination would be: ${realSupportEmail}`
      }),
    });

    console.log("Email send response:", response);
    
    // Check if we have a successful response with an ID
    if (response && response.data && response.data.id) {
      return { 
        success: true, 
        data: response.data,
        message: `Email sent with ID: ${response.data.id}`
      };
    }
    
    // Handle error response
    if (response && response.error) {
      return {
        success: false,
        error: response.error.message || "Email service error",
        details: JSON.stringify(response.error)
      };
    }
    
    // If we don't have an ID or error, something unexpected happened
    return {
      success: false,
      error: "No response ID received from email service",
      details: JSON.stringify(response)
    };
  } catch (error) {
    console.error("Failed to send support email:", error);
    return { 
      success: false, 
      error: error.message || "Failed to send email",
      details: typeof error === 'object' ? JSON.stringify(error) : 'Unknown error'
    };
  }
} 