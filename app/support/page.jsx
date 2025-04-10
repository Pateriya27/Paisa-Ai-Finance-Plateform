"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail, Send, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendSupportEmail } from "@/actions/support";
import { toast } from "sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  
  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!subject.trim()) {
      toast.error("Please enter a subject");
      return false;
    }
    if (!message.trim()) {
      toast.error("Please enter your message");
      return false;
    }
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsConfirmDialogOpen(true);
  };
  
  const handleConfirmSend = async () => {
    try {
      setIsLoading(true);
      
      const result = await sendSupportEmail({
        name,
        email,
        subject,
        message
      });
      
      if (result.success) {
        toast.success("Your message has been sent successfully!");
        // Reset form
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        // Show more detailed error message
        const errorMsg = result.error || "Failed to send message";
        const details = result.details ? `Details: ${result.details}` : "";
        
        console.error("Email sending failed:", result);
        throw new Error(`${errorMsg}${details ? `\n${details}` : ""}`);
      }
    } catch (error) {
      toast.error(error.message || "Failed to send message", {
        description: "Please make sure the email service is configured correctly.",
        duration: 5000,
        action: {
          label: "Test Service",
          onClick: () => window.open("/api/email/support-test", "_blank")
        }
      });
    } finally {
      setIsLoading(false);
      setIsConfirmDialogOpen(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header with return button */}
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2 text-blue-600">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4 animate-fade-in">
            Contact Support
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            Need help with Paisa? We're here to assist you.
          </p>
        </div>
        
        {/* Support Form */}
        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden border-blue-100 dark:border-blue-900 shadow-lg animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Send us a message
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter the subject of your message"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue or question in detail"
                    rows={6}
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Additional Support Information */}
          <div className="mt-12 grid md:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <Card className="overflow-hidden border-blue-100 dark:border-blue-900">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Frequently Asked Questions
                </h3>
                <ul className="space-y-4">
                  <li>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      How do I add a new account?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      You can add a new account from the dashboard by clicking on the "Add Account" button.
                    </p>
                  </li>
                  <li>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      How do I delete a transaction?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Navigate to the transaction details and click on the delete button in the top right corner.
                    </p>
                  </li>
                  <li>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      Is my financial data secure?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Yes, we use industry-standard encryption to protect your data and never share it with third parties.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-blue-100 dark:border-blue-900">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Other Ways to Reach Us
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      Email Support
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      You can email us directly at support@paisa.finance
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      Community Forum
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Join our community forum to connect with other users and get help.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      Social Media
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Reach out to us on Twitter or Facebook for quick responses.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Send Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to send this support request to our team?
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-900/50">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="font-semibold">Name:</div>
              <div className="col-span-2">{name}</div>
              
              <div className="font-semibold">Email:</div>
              <div className="col-span-2">{email}</div>
              
              <div className="font-semibold">Subject:</div>
              <div className="col-span-2">{subject}</div>
            </div>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmSend}
              disabled={isLoading}
              className="bg-blue-600 text-white"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 