"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, Mail, User, Lock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AccountSetupPage() {
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
            Creating Your Paisa Account
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            Follow these simple steps to set up your account and start managing your finances with Paisa
          </p>
        </div>
        
        {/* Step by step instructions */}
        <div className="max-w-4xl mx-auto">
          {/* Step 1 */}
          <div className="mb-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl mr-4">
                1
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Visit the Sign Up Page</h2>
            </div>
            <Card className="overflow-hidden border-blue-100 dark:border-blue-900">
              <CardContent className="p-6">
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Click on the &quot;Get Started&quot; or &quot;Sign Up&quot; button on the Paisa homepage to navigate to the registration page.
                  </p>
                  <div className="flex justify-center">
                    <div className="relative w-full max-w-2xl h-64 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <div className="absolute inset-0 flex flex-col">
                        <div className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center px-4">
                          <div className="text-white font-medium">Paisa - Sign Up</div>
                        </div>
                        <div className="flex-1 p-6 flex items-center justify-center">
                          <div className="w-72 mx-auto space-y-4">
                            <div className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">Create Your Account</div>
                            <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center px-3">
                              <User className="h-4 w-4 text-gray-400 mr-2" />
                              <div className="text-sm text-gray-400">Full Name</div>
                            </div>
                            <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center px-3">
                              <Mail className="h-4 w-4 text-gray-400 mr-2" />
                              <div className="text-sm text-gray-400">Email Address</div>
                            </div>
                            <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center px-3">
                              <Lock className="h-4 w-4 text-gray-400 mr-2" />
                              <div className="text-sm text-gray-400">Password</div>
                            </div>
                            <button className="w-full h-10 bg-blue-600 text-white rounded font-medium">
                              Sign Up
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Step 2 */}
          <div className="mb-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl mr-4">
                2
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Fill in Your Details</h2>
            </div>
            <Card className="overflow-hidden border-blue-100 dark:border-blue-900">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Provide the following information to create your account:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-300">
                          <strong className="font-medium">Full Name</strong> - Enter your complete name as it appears on your official documents
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-300">
                          <strong className="font-medium">Email Address</strong> - Use a valid email address that you have access to
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-300">
                          <strong className="font-medium">Password</strong> - Create a strong password with at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-900/50">
                    <div className="flex items-start mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                      <h3 className="font-medium text-yellow-800 dark:text-yellow-400">Security Tips</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300 ml-7">
                      <li>Never use the same password across multiple platforms</li>
                      <li>Avoid using easily guessable information like birthdays</li>
                      <li>Consider using a password manager to generate and store secure passwords</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Step 3 */}
          <div className="mb-16 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl mr-4">
                3
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Verify Your Email</h2>
            </div>
            <Card className="overflow-hidden border-blue-100 dark:border-blue-900">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      After submitting your registration form, we&apos;ll send a verification email to the address you provided. Click the verification link in the email to confirm your account.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900/50 mb-4">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <strong>Tip:</strong> Check your spam folder if you don&apos;t see the email in your inbox within a few minutes.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                            <Mail className="h-3 w-3 text-blue-600" />
                          </div>
                          <div className="text-sm font-medium text-gray-800 dark:text-white">noreply@paisa.finance</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        <p className="font-medium text-gray-800 dark:text-white mb-2">Verify Your Paisa Account</p>
                        <p className="mb-4">Thank you for registering with Paisa! Please click the button below to verify your email address.</p>
                        <div className="flex justify-center mb-4">
                          <button className="px-4 py-2 bg-blue-600 text-white text-xs rounded">
                            Verify Email Address
                          </button>
                        </div>
                        <p className="text-xs text-gray-500">If you did not create an account, you can safely ignore this email.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Step 4 */}
          <div className="mb-16 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl mr-4">
                4
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Complete Your Profile</h2>
            </div>
            <Card className="overflow-hidden border-blue-100 dark:border-blue-900">
              <CardContent className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  After verifying your email, you&apos;ll be prompted to complete your profile. This information helps us personalize your financial management experience.
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6 max-w-2xl mx-auto">
                  <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-6">Complete Your Profile</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number</label>
                        <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded"></div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
                        <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Primary Financial Goal</label>
                      <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly Income Range</label>
                      <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div className="pt-4">
                      <button className="w-full h-10 bg-blue-600 text-white rounded font-medium">
                        Complete Setup
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Step 5 */}
          <div className="animate-fade-in" style={{ animationDelay: '700ms' }}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-xl mr-4">
                <Check className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Start Using Paisa!</h2>
            </div>
            <Card className="overflow-hidden border-green-100 dark:border-green-900">
              <CardContent className="p-6">
                <div className="text-center max-w-2xl mx-auto">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Congratulations! Your Paisa account is now ready to use. You can start adding accounts, tracking expenses, setting budgets, and exploring all the features that Paisa has to offer.
                  </p>
                  <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                      <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <Link href="/dashboard">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 text-lg font-medium hover:shadow-lg transition-all duration-300">
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Need Help Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Need Help?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            If you encounter any issues during the account setup process, our support team is here to help.
          </p>
          <Link href="/support">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 