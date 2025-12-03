"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { BarChart3, ChevronLeft, Lightbulb, TrendingUp, Sparkles, Rocket, Target, LineChart, PieChart, ArrowUpRight } from "lucide-react";

const FeatureInsightsPage = () => {
  // Sample insights data
  const insightExamples = [
    {
      title: "Budget Alert",
      description: "You've reached 85% of your Dining budget with 10 days remaining in the month.",
      action: "Review spending",
      icon: <Target className="h-5 w-5 text-red-500" />,
      color: "bg-red-100"
    },
    {
      title: "Spending Pattern",
      description: "Your grocery spending is 20% higher than last month. Tap to see details.",
      action: "See details",
      icon: <TrendingUp className="h-5 w-5 text-orange-500" />,
      color: "bg-orange-100"
    },
    {
      title: "Saving Opportunity",
      description: "Based on your entertainment spending, you could save ₹2,000 by reducing weekly movie expenses.",
      action: "View suggestion",
      icon: <Sparkles className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-100"
    },
    {
      title: "Financial Goal Progress",
      description: "You're on track to reach your 'New Laptop' goal 1 month ahead of schedule!",
      action: "Check goal",
      icon: <Rocket className="h-5 w-5 text-green-500" />,
      color: "bg-green-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIyLjUiIGN5PSIyLjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjE3LjUiIGN5PSIyLjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjMyLjUiIGN5PSIyLjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjQ3LjUiIGN5PSIyLjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjIuNSIgY3k9IjE3LjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjE3LjUiIGN5PSIxNy41IiByPSIyLjUiLz48Y2lyY2xlIGN4PSIzMi41IiBjeT0iMTcuNSIgcj0iMi41Ii8+PGNpcmNsZSBjeD0iNDcuNSIgY3k9IjE3LjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjIuNSIgY3k9IjMyLjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjE3LjUiIGN5PSIzMi41IiByPSIyLjUiLz48Y2lyY2xlIGN4PSIzMi41IiBjeT0iMzIuNSIgcj0iMi41Ii8+PGNpcmNsZSBjeD0iNDcuNSIgY3k9IjMyLjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjIuNSIgY3k9IjQ3LjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjE3LjUiIGN5PSI0Ny41IiByPSIyLjUiLz48Y2lyY2xlIGN4PSIzMi41IiBjeT0iNDcuNSIgcj0iMi41Ii8+PGNpcmNsZSBjeD0iNDcuNSIgY3k9IjQ3LjUiIHI9IjIuNSIvPjwvZz48L3N2Zz4=')]"></div>
        </div>
        
        {/* Floating particles */}
        <div className="particle particle-blue w-2 h-2 absolute top-1/4 left-1/4 animate-float" style={{ animationDuration: '6s', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}></div>
        <div className="particle particle-blue w-3 h-3 absolute top-3/4 left-1/3 animate-float" style={{ animationDuration: '8s', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}></div>
        <div className="particle particle-blue w-4 h-4 absolute top-1/3 right-1/4 animate-float" style={{ animationDuration: '7s', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center space-x-4 mb-8">
            <Link href="/features">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 group"
              >
                <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Features
              </Button>
            </Link>
            <Link href="/">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10"
              >
                Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/20 animate-pulse">
              <PieChart className="mr-2 h-4 w-4" />
              Step 3 of 3: Get Insights
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight animate-fade-in">
              AI-Powered <span className="text-yellow-300 animate-shimmer inline-block">Financial Insights</span> <br />
              For Smarter Decisions
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 mb-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
              Discover hidden patterns in your finances and receive personalized
              recommendations to help you save more and spend wisely
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Personalized Financial Intelligence</h2>
            <p className="text-gray-600">
              Paisa uses advanced AI to analyze your financial data and provide insights 
              that help you make better decisions about your money.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
              <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 relative z-10 h-full">
                <CardContent className="pt-6">
                  <div className="text-blue-600 p-3 rounded-full bg-blue-50 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Smart Spending Analysis</h3>
                  <p className="text-gray-600 mb-4">
                    Our AI analyzes your spending patterns to identify potential savings opportunities:
                  </p>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Category spending comparisons to previous months</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Unusual transaction detection to spot potential fraud</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Subscription tracking to eliminate unused services</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Merchant-specific spending insights</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-100 rounded-full opacity-50 blur-xl"></div>
              <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 relative z-10 h-full">
                <CardContent className="pt-6">
                  <div className="text-purple-600 p-3 rounded-full bg-purple-50 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Budget Optimization</h3>
                  <p className="text-gray-600 mb-4">
                    Get personalized recommendations to improve your budget based on your actual spending:
                  </p>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Suggested budget adjustments based on historical data</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Weekly budget progress alerts to keep you on track</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Category-specific saving suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Smart seasonal budget adjustments</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-green-100 rounded-full opacity-50 blur-xl"></div>
              <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 relative z-10 h-full">
                <CardContent className="pt-6">
                  <div className="text-green-600 p-3 rounded-full bg-green-50 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Goal Achievement Insights</h3>
                  <p className="text-gray-600 mb-4">
                    Accelerate your financial goals with AI-powered strategies:
                  </p>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Projected goal completion timelines</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Specific saving opportunities to reach goals faster</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Smart milestone celebrations to keep you motivated</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Goal adjustment recommendations based on progress</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-100 rounded-full opacity-50 blur-xl"></div>
              <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 relative z-10 h-full">
                <CardContent className="pt-6">
                  <div className="text-orange-600 p-3 rounded-full bg-orange-50 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Financial Health Metrics</h3>
                  <p className="text-gray-600 mb-4">
                    Track your overall financial wellness with key metrics:
                  </p>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Personal savings rate calculations and benchmarks</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Debt-to-income ratio tracking and improvement plans</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Emergency fund adequacy assessment</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Monthly financial health score with improvement tips</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Insights Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Your Personal Financial Assistant</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Paisa delivers timely insights directly to your dashboard, helping you stay on top of your finances
                without having to dig through the data yourself.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-xl p-8 mb-12">
              <h3 className="text-xl font-semibold mb-6">Recent Insights</h3>
              
              <div className="space-y-4">
                {insightExamples.map((insight, index) => (
                  <div 
                    key={index} 
                    className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start">
                      <div className={`${insight.color} p-2 rounded-full mr-4 flex-shrink-0`}>
                        {insight.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                        <p className="text-gray-600 text-sm my-1">{insight.description}</p>
                        <Link 
                          href="/dashboard" 
                          className="text-blue-600 text-xs font-medium inline-flex items-center mt-2 group-hover:underline"
                        >
                          {insight.action}
                          <ArrowUpRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Spending Trends</h3>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <LineChart className="w-16 h-16 mx-auto text-blue-300 mb-4" />
                    <p className="text-sm">Trend Analysis Chart</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Our AI analyzes your spending across months to identify patterns and help you understand
                  seasonal variations in your finances.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Smart Budget Recommendations</h3>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="w-16 h-16 mx-auto text-purple-300 mb-4" />
                    <p className="text-sm">Budget Optimization Chart</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Get AI-generated budget adjustments based on your real spending habits to create
                  more realistic and achievable financial plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* AI Suggestions Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center mb-4 bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-medium">
                <Sparkles className="h-4 w-4 mr-2" />
                Powered by AI
              </div>
              <h2 className="text-3xl font-bold mb-4">Smart Money-Saving Suggestions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our AI analyzes your spending habits and provides personalized recommendations to help
                you save money and improve your financial health.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 transform transition-all hover:scale-105 hover:shadow-xl">
                <div className="mb-4 text-blue-600">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Food & Dining</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm">Switch to meal planning for weekdays to reduce food delivery expenses (potential saving: ₹2,500/month)</p>
                  </li>
                  <li className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm">You spend 30% more at restaurants on weekends - consider cooking one weekend meal at home</p>
                  </li>
                  <li className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm">Based on grocery patterns, bulk buying staples could save approximately ₹600/month</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 transform transition-all hover:scale-105 hover:shadow-xl">
                <div className="mb-4 text-green-600">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Transportation</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm">Carpooling to work 3 days a week could reduce your fuel expenses by ₹1,800/month</p>
                  </li>
                  <li className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm">You could save ₹1,200/month by using public transport for non-essential travel</p>
                  </li>
                  <li className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm">Based on your travel patterns, a monthly transport pass would be more economical (saving ~₹750)</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 transform transition-all hover:scale-105 hover:shadow-xl">
                <div className="mb-4 text-purple-600">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Subscriptions</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm">You&apos;re currently paying for 3 streaming services but primarily use only one. Consider rotating services (potential saving: ₹1,000/month)</p>
                  </li>
                  <li className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm">Your news subscription has been unused for 2 months - consider canceling (₹299/month)</p>
                  </li>
                  <li className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm">Switching to annual billing for your most-used subscriptions would save approximately ₹1,800/year</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-16 bg-yellow-50 rounded-xl p-8 border border-yellow-100">
              <div className="flex items-start">
                <div className="bg-yellow-100 p-3 rounded-full mr-6 text-yellow-600">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Total Potential Monthly Savings</h3>
                  <p className="text-gray-700 mb-4">
                    By implementing these AI-generated suggestions, you could save approximately 
                    <span className="font-bold text-green-600 text-xl ml-2">₹8,150</span> per month 
                    <span className="text-green-600 font-medium"> (₹97,800 annually)</span>
                  </p>
                  <div className="flex justify-between items-center mt-4 bg-white p-4 rounded-lg shadow-sm">
                    <div>
                      <p className="text-sm text-gray-600">Want even more personalized suggestions?</p>
                      <p className="text-sm font-medium">Connect your accounts to get started</p>
                    </div>
                    <Link href="/dashboard">
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                        Connect Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Gain Financial Clarity?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are making smarter financial decisions with Paisa&apos;s
            powerful AI-driven insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Get Started Now
              </Button>
            </Link>
            
            <Link href="/features">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Explore More Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureInsightsPage; 