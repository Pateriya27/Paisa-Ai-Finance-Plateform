"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const imageRef = useRef(null);
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const imageElement = imageRef.current;
    
    // Clean up animation class when component mounts
    document.body.classList.remove('page-transitioning');
    
    // Check localStorage for navigation state
    if (typeof window !== "undefined") {
      const savedNavigationState = window.localStorage.getItem("isNavigating");
      if (savedNavigationState === "true") {
        setIsNavigating(false);
        window.localStorage.setItem("isNavigating", "false");
      }
    }

    // Listen for navigation complete event
    const handleNavigationComplete = () => {
      setIsNavigating(false);
    };
    
    window.addEventListener('navigationComplete', handleNavigationComplete);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('navigationComplete', handleNavigationComplete);
    };
  }, []);

  const handleNavigation = (path) => {
    // Simplified navigation with immediate push
    try {
      // Set minimal state
      setIsNavigating(true);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("isNavigating", "true");
      }
      
      // Use immediate navigation without animations
      router.prefetch(path);
      router.push(path);
      
      // No delay or setTimeout needed
    } catch (error) {
      console.error("Navigation error:", error);
      setIsNavigating(false);
    }
  };

  return (
    <section className="pt-40 pb-20 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-blue-100 opacity-30 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-purple-100 opacity-30 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-8 h-8 rounded-full bg-yellow-200 animate-pulse opacity-70"></div>
      <div className="absolute top-1/3 right-10 w-6 h-6 rounded-full bg-green-200 animate-float opacity-70"></div>
      <div className="absolute bottom-1/4 left-1/4 w-10 h-10 rounded-full bg-blue-200 animate-bounce-slow opacity-70"></div>
      <div className="absolute top-1/2 right-1/4 w-12 h-12 rounded-full bg-purple-200 animate-spin-slow opacity-70"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="inline-block mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium animate-expand">
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            <span>Financial Intelligence</span>
          </span>
        </div>
        
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title animate-fade-in relative">
          <span className="animate-float inline-block" style={{ animationDuration: '3s' }}>Manage</span> Your <span className="animate-float inline-block" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>Finances</span> <br /> 
          <span className="relative inline-block">
            with Intelligence
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-shimmer"></span>
          </span>
          <Sparkles className="absolute -top-10 right-1/4 text-yellow-400 w-8 h-8 animate-float" style={{ animationDuration: '4s' }} />
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '300ms' }}>
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        
        <div className="flex justify-center space-x-4 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <Button 
            size="lg" 
            className={`px-8 transition-all duration-500 group relative overflow-hidden ${isNavigating ? 'scale-105 bg-primary/60 backdrop-filter backdrop-blur-sm' : ''}`}
            onClick={() => handleNavigation('/dashboard')}
            disabled={isNavigating}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isNavigating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-white">Loading...</span>
              </>
            ) : (
              <>
                <span className="relative z-10 group-hover:translate-x-[-8px] transition-transform duration-500">Get Started</span>
                <ArrowRight className={`absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 h-4 w-4 ${isHovered ? 'animate-bounce-slow' : ''}`} />
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></span>
              </>
            )}
            {/* Button ripple effect */}
            <span className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <span className="absolute inset-0 rounded-md animate-ripple bg-white/20 opacity-0 group-hover:opacity-100"></span>
            </span>
          </Button>
          
          <Link href="https://github.com/pateriya27" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="px-8 group relative overflow-hidden hover:border-blue-500 transition-colors duration-500">
              <span className="relative z-10 group-hover:text-blue-500 transition-colors duration-500">GitHub</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-500"></span>
            </Button>
          </Link>
        </div>
        
        <div className="hero-image-wrapper mt-12 md:mt-8 relative perspective-1000 animate-fade-in" style={{ animationDelay: '900ms' }}>
          <div ref={imageRef} className="hero-image group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className={`rounded-lg shadow-2xl border mx-auto transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-blue-500/20 ${isNavigating ? 'scale-95 opacity-50 blur-sm' : ''}`}
              priority
            />
            
            {/* Floating labels */}
            <div className="absolute top-10 left-[10%] bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-lg shadow-lg transform -translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 animate-float" style={{ animationDuration: '6s' }}>
              <span className="text-sm font-medium text-blue-600">AI Analytics</span>
            </div>
            
            <div className="absolute bottom-10 right-[10%] bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-lg shadow-lg transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 animate-float" style={{ animationDuration: '5s', animationDelay: '1s' }}>
              <span className="text-sm font-medium text-purple-600">Smart Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
