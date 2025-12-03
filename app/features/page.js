"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { featuresData } from "@/data/landing";
import { CheckCircle, ChevronLeft, Sparkles } from "lucide-react";

const FeaturePage = () => {
  // Additional detailed features that complement the basic features
  const detailedFeatures = [
    {
      title: "Smart Budget Creation",
      description: "Our AI-powered budget creator analyzes your spending habits to create personalized budgets that work for your lifestyle. Adjust categories, set goals, and track progress in real-time.",
      benefits: [
        "Personalized budget recommendations",
        "Flexible category adjustments",
        "Real-time spending alerts",
        "Goal-based budget planning"
      ],
      image: "/images/feature-1.jpg"
    },
    {
      title: "Comprehensive Expense Tracking",
      description: "Track every transaction with powerful categorization and tagging. View your spending patterns with intuitive charts and breakdown analytics that help identify opportunities to save.",
      benefits: [
        "Automatic transaction categorization",
        "Custom tags for detailed tracking",
        "Receipt scanning and storage",
        "Spending pattern analysis"
      ],
      image: "/images/feature-2.jpg"
    },
    {
      title: "Multi-Account Management",
      description: "Connect all your accounts in one place for a complete financial picture. Track balances, monitor transactions, and transfer funds between accounts seamlessly.",
      benefits: [
        "Secure bank connections",
        "Combined account overview",
        "Cross-account analytics",
        "Balance history tracking"
      ],
      image: "/images/feature-3.jpg"
    },
    {
      title: "Financial Goals & Milestones",
      description: "Set short and long-term financial goals with detailed planning tools. Track progress, celebrate milestones, and adjust strategies to stay on target.",
      benefits: [
        "Visual goal progress tracking",
        "Milestone celebration notifications",
        "Goal-specific saving suggestions",
        "Timeline projections and adjustments"
      ],
      image: "/images/feature-4.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
          <Link href="/">
            <div className="flex items-center text-white mb-8 hover:bg-white/10 py-2 px-4 rounded-md transition-colors group">
              <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </div>
          </Link>
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/20 animate-pulse">
              <Sparkles className="mr-2 h-4 w-4" />
              Explore All Features
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Powerful Features to <br />
              <span className="text-yellow-300 animate-shimmer inline-block">Transform Your Finances</span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 mb-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
              Discover how Paisa helps thousands of users take control of their financial future with these powerful tools and features.
            </p>
          </div>
        </div>
      </section>
      
      {/* Core Features Grid */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Core Features</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform provides essential tools to help you manage every aspect of your financial life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card 
                className="p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600" 
                key={index}
              >
                <CardContent className="space-y-4 pt-4">
                  <div className="text-blue-600 dark:text-blue-400 p-3 rounded-full bg-blue-50 dark:bg-blue-900/30 w-14 h-14 flex items-center justify-center mx-auto group-hover:animate-bounce-slow">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Detailed Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Detailed Features</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore the powerful capabilities that make Paisa the ultimate financial management tool.
            </p>
          </div>
          
          <div className="space-y-20">
            {detailedFeatures.map((feature, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}>
                <div className="w-full md:w-1/2 relative">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl p-1">
                    <div className="rounded-2xl aspect-video relative overflow-hidden">
                      <div 
                        className={`absolute inset-0 rounded-2xl transform transition-transform duration-700 hover:scale-105 ${
                          index === 0 ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 
                          index === 1 ? 'bg-gradient-to-br from-green-500 to-teal-600' : 
                          index === 2 ? 'bg-gradient-to-br from-orange-400 to-pink-600' : 
                          'bg-gradient-to-br from-indigo-500 to-blue-700'
                        }`}
                      >
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                          <div className="w-16 h-16 mb-4 flex items-center justify-center bg-white bg-opacity-20 rounded-full animate-float" style={{ animationDuration: '3s' }}>
                            {index === 0 && (
                              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M3 7L12 13L21 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                            {index === 1 && (
                              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                            {index === 2 && (
                              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 7V17L8 13L12 17L16 13L20 17V7M4 7H20M4 7H3M20 7H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                            {index === 3 && (
                              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 22H19M5 22V17M19 22V17M5 17V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V17M5 17H19M9 8H15M9 12H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <h4 className="text-lg font-semibold text-center mb-2">{feature.title}</h4>
                          <p className="text-sm text-white text-opacity-80 text-center">
                            {feature.benefits[0]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">{feature.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">{feature.description}</p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="dark:text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Paisa?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start managing your finances smarter today with our powerful tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <div className="px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 transition-colors rounded-md font-medium dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-400">
                Get Started
              </div>
            </Link>
            
            <Link href="/">
              <div className="px-6 py-3 border border-white text-white hover:bg-white/10 transition-colors rounded-md font-medium">
                Learn More
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturePage; 