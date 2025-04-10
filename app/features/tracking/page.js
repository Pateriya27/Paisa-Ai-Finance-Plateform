"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { BarChart3, ChevronLeft, DollarSign, PieChart, Receipt, LineChart, Tags, Calendar, Clock, BarChart, Sparkles } from "lucide-react";

const FeatureTrackingPage = () => {
  // Sample transaction data for demo purposes
  const sampleTransactions = [
    { id: 1, name: "Grocery Store", amount: "₹2,340", category: "Groceries", date: "Today", time: "2:30 PM" },
    { id: 2, name: "Coffee Shop", amount: "₹180", category: "Food & Drink", date: "Today", time: "10:15 AM" },
    { id: 3, name: "Gas Station", amount: "₹1,500", category: "Transport", date: "Yesterday", time: "6:45 PM" },
    { id: 4, name: "Online Shopping", amount: "₹1,299", category: "Shopping", date: "Yesterday", time: "1:20 PM" },
    { id: 5, name: "Mobile Recharge", amount: "₹499", category: "Utilities", date: "3 days ago", time: "11:05 AM" }
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
              <BarChart3 className="mr-2 h-4 w-4" />
              Step 2 of 3: Track Your Spending
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Real-Time <span className="text-yellow-300 animate-shimmer inline-block">Expense Tracking</span> <br />
              Made Simple
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 mb-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
              Effortlessly monitor where your money goes with powerful
              categorization and visualization tools
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Smart Expense Tracking</h2>
            <p className="text-gray-600">
              Paisa makes tracking your expenses effortless with automatic categorization,
              real-time updates, and powerful visualization tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="text-blue-600 p-3 rounded-full bg-blue-50 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Receipt className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Auto-Categorization</h3>
                <p className="text-gray-600 text-center">
                  Our AI automatically categorizes your transactions, saving you time and reducing errors
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="text-blue-600 p-3 rounded-full bg-blue-50 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Tags className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Custom Tags</h3>
                <p className="text-gray-600 text-center">
                  Create your own tags to track specific expenses across multiple categories
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="text-blue-600 p-3 rounded-full bg-blue-50 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <PieChart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Visual Reports</h3>
                <p className="text-gray-600 text-center">
                  See where your money goes with beautiful charts and graphs that make analysis easy
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="text-blue-600 p-3 rounded-full bg-blue-50 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Time-Based Analysis</h3>
                <p className="text-gray-600 text-center">
                  Track spending patterns over time to identify trends and optimize your budget
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="text-blue-600 p-3 rounded-full bg-blue-50 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Real-Time Updates</h3>
                <p className="text-gray-600 text-center">
                  See your transactions as they happen with instant notifications and updates
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="text-blue-600 p-3 rounded-full bg-blue-50 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Smart Insights</h3>
                <p className="text-gray-600 text-center">
                  Receive personalized recommendations for reducing spending in specific categories
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">See Your Transactions at a Glance</h2>
                <p className="text-gray-600 mb-8">
                  Paisa's intuitive transaction view makes it easy to see where your money is going. 
                  Filter by date, category, or tag to find exactly what you're looking for.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-green-500 rounded-full p-1 mt-1.5 mr-3">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>See transactions from all your accounts in one place</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-500 rounded-full p-1 mt-1.5 mr-3">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Filter by date, category, tag, or amount</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-500 rounded-full p-1 mt-1.5 mr-3">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Search for specific transactions with our powerful search feature</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                
                <div className="space-y-4">
                  {sampleTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-3 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{transaction.name}</div>
                          <div className="text-xs text-gray-500">{transaction.category} • {transaction.date} at {transaction.time}</div>
                        </div>
                      </div>
                      <div className="font-semibold">{transaction.amount}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="ghost" className="text-blue-600">
                    View All Transactions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Chart Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
                  
                  <div className="aspect-square max-w-md mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <PieChart className="w-16 h-16 mx-auto text-blue-300 mb-4" />
                      <p className="text-sm">Interactive Chart Preview</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold mb-6">Visualize Your Spending Habits</h2>
                <p className="text-gray-600 mb-8">
                  Paisa's powerful charts and reports help you understand your spending patterns at a glance.
                  Identify trends, spot opportunities to save, and make smarter financial decisions.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-green-500 rounded-full p-1 mt-1.5 mr-3">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Interactive pie charts show where your money is going</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-500 rounded-full p-1 mt-1.5 mr-3">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Line graphs track your spending over time to identify trends</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-500 rounded-full p-1 mt-1.5 mr-3">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Compare months or years to see how your habits are changing</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Tracking?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have gained control of their finances with Paisa's
            powerful expense tracking tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Start Tracking Now
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

export default FeatureTrackingPage; 