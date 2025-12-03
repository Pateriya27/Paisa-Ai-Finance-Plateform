"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import { useRouter } from "next/navigation";
import { Loader2, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Link from "next/link";

// Add a new import for dashboard preview images
const dashboardImages = [
  "/images/dashboard-1.png",
  "/images/dashboard-2.png",
  "/images/dashboard-3.png",
  "/images/dashboard-4.png"
];

// Enhanced testimonials with more diverse Indian users
const testimonialsData = [
  {
    name: "Rahul Sharma",
    role: "Business Owner, Mumbai",
    quote: "Paisa has transformed how I manage my business finances. The insights are incredibly valuable and the interface is so intuitive.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Priya Patel",
    role: "Software Engineer, Bangalore",
    quote: "As a tech professional, I appreciate how well-designed this app is. It's helped me save 20% more each month with smart budgeting.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Aditya Verma",
    role: "Marketing Executive, Delhi",
    quote: "The visualization tools and transaction tracking make financial management feel effortless. I've never been more organized.",
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    name: "Meera Desai",
    role: "Healthcare Professional, Pune",
    quote: "I work long hours and needed something simple yet comprehensive. Paisa fits perfectly into my busy lifestyle.",
    image: "https://randomuser.me/api/portraits/women/29.jpg"
  },
  {
    name: "Vikram Singh",
    role: "Startup Founder, Hyderabad",
    quote: "Using Paisa has given me clarity on my startup's finances that I never had before. The investment tracking is exceptional.",
    image: "https://randomuser.me/api/portraits/men/55.jpg"
  },
  {
    name: "Ananya Reddy",
    role: "Financial Analyst, Chennai",
    quote: "As someone who works with finances daily, I'm impressed by the depth of insights Paisa provides while remaining so user-friendly.",
    image: "https://randomuser.me/api/portraits/women/17.jpg"
  },
  {
    name: "Rajesh Iyer",
    role: "College Professor, Kolkata",
    quote: "I recommend Paisa to all my economics students. It's the perfect practical tool for understanding personal finance management.",
    image: "https://randomuser.me/api/portraits/men/36.jpg"
  },
  {
    name: "Sarika Mehta",
    role: "Freelance Designer, Jaipur",
    quote: "As a freelancer with irregular income, Paisa helps me plan and visualize my finances. It's been a game-changer for my peace of mind.",
    image: "https://randomuser.me/api/portraits/women/57.jpg"
  },
  {
    name: "Arjun Nair",
    role: "IT Consultant, Kochi",
    quote: "The integration with Indian banks is seamless, and the expense categorization is impressively accurate. Best finance app I've used.",
    image: "https://randomuser.me/api/portraits/men/68.jpg"
  },
  {
    name: "Divya Krishnan",
    role: "School Teacher, Chandigarh",
    quote: "Paisa has helped me teach my students about saving and budgeting. The simple interface makes financial concepts accessible to everyone.",
    image: "https://randomuser.me/api/portraits/women/63.jpg"
  },
  {
    name: "Kunal Kapoor",
    role: "Restaurant Owner, Lucknow",
    quote: "Managing both personal and business expenses was a nightmare until I found Paisa. Now I have complete clarity on my financial health.",
    image: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  {
    name: "Lakshmi Sundaram",
    role: "Digital Nomad, Pondicherry",
    quote: "I travel constantly for work, and Paisa helps me track expenses across different cities and currencies effortlessly.",
    image: "https://randomuser.me/api/portraits/women/37.jpg"
  }
];

const LandingPage = () => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isPaisaClicked, setIsPaisaClicked] = useState(false);

  // Clean up animation class when component mounts
  useEffect(() => {
    document.body.classList.remove('page-transitioning');
    
    // Listen for navigation complete event
    const handleNavigationComplete = () => {
      setIsNavigating(false);
    };
    
    window.addEventListener('navigationComplete', handleNavigationComplete);
    
    return () => {
      window.removeEventListener('navigationComplete', handleNavigationComplete);
    };
  }, []);

  const handleNavigation = (path) => {
    // Simplified navigation with immediate push
    try {
      // Set minimal transition state
      setIsNavigating(true);
      
      // Use immediate navigation without animations
      router.prefetch(path);
      router.push(path);
      
      // No delay or setTimeout needed - let router handle the transition
    } catch (error) {
      console.error("Navigation error:", error);
      setIsNavigating(false);
    }
  };

  // Handle click on Paisa text
  const handlePaisaClick = () => {
    setIsPaisaClicked(true);
    // Reset after animation completes
    setTimeout(() => {
      setIsPaisaClicked(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 px-4 items-center">
          <div className="space-y-6 max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-in">
              Manage your finances with{" "}
              <span 
                className="relative inline-block cursor-pointer" 
                onClick={handlePaisaClick}
                role="button"
                tabIndex={0}
                aria-label="Paisa animation"
              >
                <span className={`bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 animate-gradient-x text-glow ${isPaisaClicked ? 'animate-jelly' : ''}`}>
                  Paisa
                </span>
                <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 rounded-full ${isPaisaClicked ? 'animate-ripple' : 'animate-pulse'}`}></span>
                {/* Particle effects */}
                <span className={`absolute -z-5 -top-1 left-1/4 w-1.5 h-1.5 rounded-full bg-blue-400 ${isPaisaClicked ? 'animate-expand' : 'animate-float'}`} style={{ animationDuration: isPaisaClicked ? '0.5s' : '3s' }}></span>
                <span className={`absolute -z-5 -top-2 left-3/4 w-2 h-2 rounded-full bg-purple-400 ${isPaisaClicked ? 'animate-expand' : 'animate-float'}`} style={{ animationDuration: isPaisaClicked ? '0.5s' : '2.5s', animationDelay: '0.2s' }}></span>
                <span className={`absolute -z-5 -bottom-3 left-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400 ${isPaisaClicked ? 'animate-expand' : 'animate-float'}`} style={{ animationDuration: isPaisaClicked ? '0.5s' : '3.5s', animationDelay: '0.3s' }}></span>
                {/* Show extra particles when clicked */}
                {isPaisaClicked && (
                  <>
                    <span className="absolute -z-5 top-0 right-0 w-2 h-2 rounded-full bg-blue-400 animate-float" style={{ animationDuration: '2s' }}></span>
                    <span className="absolute -z-5 bottom-0 left-0 w-2 h-2 rounded-full bg-purple-400 animate-float" style={{ animationDuration: '2.2s' }}></span>
                    <span className="absolute -z-5 top-1/2 left-1/2 w-3 h-3 rounded-full bg-indigo-400 animate-expand" style={{ animationDuration: '0.5s' }}></span>
                  </>
                )}
              </span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
              Take control of your money with our powerful and easy-to-use
              financial management platform.
            </p>
            <div className="pt-4 space-x-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Button
                size="lg"
                onClick={() => handleNavigation('/dashboard')}
                className={`${isNavigating ? 'animate-pulse' : ''}`}
                disabled={isNavigating}
              >
                {isNavigating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Try Now"
                )}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block animate-fade-in perspective-1000" style={{ animationDelay: '600ms' }}>
            <DashboardCarousel />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Animated particles */}
        <div className="particle particle-blue w-6 h-6 absolute top-1/4 left-1/4 animate-float" style={{ animationDuration: '7s' }}></div>
        <div className="particle particle-purple w-5 h-5 absolute top-3/4 left-1/3 animate-float" style={{ animationDuration: '9s' }}></div>
        <div className="particle particle-blue w-4 h-4 absolute top-1/3 right-1/4 animate-float" style={{ animationDuration: '8s' }}></div>
        <div className="particle particle-purple w-8 h-8 absolute bottom-1/4 right-1/3 animate-float" style={{ animationDuration: '10s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-10 animate-typewriter max-w-md mx-auto overflow-hidden">
            Our Platform by the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center animate-tilt group perspective-1000 transition-all duration-500 hover:scale-105">
                <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:animate-jelly animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                  {stat.value}
                </div>
                <div className="text-gray-600 animate-fade-in" style={{ animationDelay: `${(index * 150) + 100}ms` }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32 relative overflow-hidden parallax-section">
        <div className="dots-grid"></div>
        <div className="geometric-pattern"></div>
        <div className="parallax-bg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"></div>
        
        <div className="container px-4 mx-auto parallax-content">
          <div className="max-w-5xl mx-auto mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in text-highlight">
              Powerful Features to Transform Your Financial Journey
          </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Designed to help you track, manage, and optimize your personal finances with ease.
            </p>
          </div>

          <div className="floating-element -right-16 top-1/4">
            <div className="w-64 h-64 rounded-full bg-blue-300/10 dark:bg-blue-300/5 blur-3xl cool-animation"></div>
          </div>
          <div className="floating-element -left-16 bottom-1/4" style={{animationDelay: '1.5s'}}>
            <div className="w-64 h-64 rounded-full bg-indigo-300/10 dark:bg-indigo-300/5 blur-3xl cool-animation"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <div
                key={feature.title}
                className="card-3d feature-card holo-effect p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg mouse-tracking group"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transitionDelay: `${index * 0.05}s`,
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  e.currentTarget.style.setProperty('--x', `${x}%`);
                  e.currentTarget.style.setProperty('--y', `${y}%`);
                }}
              >
                <div className="card-3d-shadow"></div>
                <div className="card-3d-content">
                  <div className="feature-card-icon text-3xl text-blue-500 dark:text-blue-400 mb-4 inline-block">
                  {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-blue-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Add animated wave background */}
        <div className="absolute w-full h-32 -bottom-10 left-0 right-0 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="animate-wave">
            <path fill="#3B82F6" fillOpacity="0.5" d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,170.7C960,149,1056,107,1152,90.7C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="absolute w-full h-24 -bottom-4 left-0 right-0 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="animate-wave" style={{ animationDelay: '0.5s' }}>
            <path fill="#8B5CF6" fillOpacity="0.5" d="M0,64L48,80C96,96,192,128,288,133.3C384,139,480,117,576,112C672,107,768,117,864,133.3C960,149,1056,171,1152,170.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-16 animate-typewriter max-w-sm mx-auto overflow-hidden">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center group perspective-1000 hover:animate-tilt">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-ripple group-hover:bg-blue-200 transition-colors duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 transition-all duration-300 group-hover:text-blue-900 dark:group-hover:text-blue-300">
                  {step.description}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Link href={step.linkUrl || "/features"}>
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 lg:py-32 relative overflow-hidden parallax-section">
        <div className="dots-grid"></div>
        <div className="geometric-pattern"></div>
        <div className="parallax-bg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"></div>
        
        <div className="container mx-auto px-4 parallax-content">
          <div className="max-w-5xl mx-auto mb-16 text-center relative">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-800 dark:text-purple-200 mb-4 animate-expand">
              Trusted by Indians
            </span>
            <div className="floating-element top-0 left-1/4" style={{animationDelay: '0.8s'}}>
              <div className="h-16 w-16 rounded-full bg-purple-400/30 dark:bg-purple-400/10 blur-xl"></div>
            </div>
            <div className="floating-element bottom-0 right-1/4" style={{animationDelay: '1.2s'}}>
              <div className="h-16 w-16 rounded-full bg-pink-400/30 dark:bg-pink-400/10 blur-xl"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 dark:from-purple-400 dark:via-pink-300 dark:to-purple-400">
            What Our Users Say
          </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied users who are taking control of their finances with Paisa.
            </p>
          </div>

          {/* Auto-scrolling testimonials carousel */}
          <div className="overflow-hidden relative">
            <div className="overflow-x-auto scrollbar-hide pb-4" style={{ scrollBehavior: 'smooth' }}>
              <div className="flex animate-scroll-x" style={{ animationDuration: '60s', animationIterationCount: 'infinite', animationTimingFunction: 'linear' }}>
                {/* First set of testimonials */}
                {testimonialsData.map((testimonial, index) => (
                  <div
                    key={`first-${testimonial.name}`}
                    className="flex-none w-80 md:w-96 mr-6 last:mr-0"
                  >
                    <div 
                      className="card-3d testimonial-card h-full p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg mouse-tracking"
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        const y = ((e.clientY - rect.top) / rect.height) * 100;
                        e.currentTarget.style.setProperty('--x', `${x}%`);
                        e.currentTarget.style.setProperty('--y', `${y}%`);
                      }}
                    >
                      <div className="card-3d-shadow"></div>
                      <div className="card-3d-content">
                        <div className="text-purple-500 dark:text-purple-400 text-6xl opacity-20 absolute -top-2 -left-2">&quot;</div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 relative">
                          {testimonial.quote}
                        </p>
                        <div className="flex items-center">
                          <div className="mr-4 relative">
                            <div className="testimonial-image w-12 h-12 rounded-full overflow-hidden border-2 border-purple-200 dark:border-purple-800 animate-float">
                              <Image
                                src={testimonial.image}
                                width={50}
                                height={50}
                                alt={testimonial.name}
                                className="object-cover"
                              />
                            </div>
                            <div className="absolute -right-1 -bottom-1 bg-green-500 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs">
                              <span className="sr-only">Verified</span>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                            <div className="text-yellow-400 flex mt-1">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform hover:scale-125" style={{transitionDelay: `${i * 0.05}s`}}>
                                  <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for infinite scrolling */}
            {testimonialsData.map((testimonial, index) => (
                  <div
                    key={`duplicate-${testimonial.name}`}
                    className="flex-none w-80 md:w-96 mr-6 last:mr-0"
                  >
                    <div 
                      className="card-3d testimonial-card h-full p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg mouse-tracking"
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        const y = ((e.clientY - rect.top) / rect.height) * 100;
                        e.currentTarget.style.setProperty('--x', `${x}%`);
                        e.currentTarget.style.setProperty('--y', `${y}%`);
                      }}
                    >
                      <div className="card-3d-shadow"></div>
                      <div className="card-3d-content">
                        <div className="text-purple-500 dark:text-purple-400 text-6xl opacity-20 absolute -top-2 -left-2">&quot;</div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 relative">
                          {testimonial.quote}
                        </p>
                        <div className="flex items-center">
                          <div className="mr-4 relative">
                            <div className="testimonial-image w-12 h-12 rounded-full overflow-hidden border-2 border-purple-200 dark:border-purple-800 animate-float">
                    <Image
                      src={testimonial.image}
                                width={50}
                                height={50}
                      alt={testimonial.name}
                                className="object-cover"
                              />
                            </div>
                            <div className="absolute -right-1 -bottom-1 bg-green-500 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs">
                              <span className="sr-only">Verified</span>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                            <div className="text-yellow-400 flex mt-1">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform hover:scale-125" style={{transitionDelay: `${i * 0.05}s`}}>
                                  <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            ))}
              </div>
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent dark:from-gray-950 dark:to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent dark:from-gray-950 dark:to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIyLjUiIGN5PSIyLjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjE3LjUiIGN5PSIyLjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjMyLjUiIGN5PSIyLjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjQ3LjUiIGN5PSIyLjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjIuNSIgY3k9IjE3LjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjE3LjUiIGN5PSIxNy41IiByPSIyLjUiLz48Y2lyY2xlIGN4PSIzMi41IiBjeT0iMTcuNSIgcj0iMi41Ii8+PGNpcmNsZSBjeD0iNDcuNSIgY3k9IjE3LjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjIuNSIgY3k9IjMyLjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjE3LjUiIGN5PSIzMi41IiByPSIyLjUiLz48Y2lyY2xlIGN4PSIzMi41IiBjeT0iMzIuNSIgcj0iMi41Ii8+PGNpcmNsZSBjeD0iNDcuNSIgY3k9IjMyLjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjIuNSIgY3k9IjQ3LjUiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjE3LjUiIGN5PSI0Ny41IiByPSIyLjUiLz48Y2lyY2xlIGN4PSIzMi41IiBjeT0iNDcuNSIgcj0iMi41Ii8+PGNpcmNsZSBjeD0iNDcuNSIgY3k9IjQ3LjUiIHI9IjIuNSIvPjwvZz48L3N2Zz4=')]"></div>
        </div>
        
        {/* Animated waves */}
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="animate-wave">
            <path fill="#ffffff" fillOpacity="0.6" d="M0,224L48,224C96,224,192,224,288,202.7C384,181,480,139,576,138.7C672,139,768,181,864,176C960,171,1056,117,1152,101.3C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-15">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="animate-wave" style={{ animationDuration: '10s', animationDelay: '0.3s' }}>
            <path fill="#ffffff" fillOpacity="0.8" d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,176C672,171,768,117,864,101.3C960,85,1056,107,1152,133.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        {/* Floating particles */}
        <div className="particle particle-blue w-2 h-2 absolute top-1/4 left-1/4 animate-float" style={{ animationDuration: '6s', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}></div>
        <div className="particle particle-blue w-3 h-3 absolute top-3/4 left-1/3 animate-float" style={{ animationDuration: '8s', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}></div>
        <div className="particle particle-blue w-4 h-4 absolute top-1/3 right-1/4 animate-float" style={{ animationDuration: '7s', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}></div>
        <div className="particle particle-blue w-2 h-2 absolute bottom-1/4 right-1/3 animate-float" style={{ animationDuration: '9s', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}></div>
        
        {/* Content Container */}
        <div className={`container mx-auto px-4 text-center relative z-10 transition-all duration-700 ${isNavigating ? 'scale-95 opacity-90 blur-sm' : ''}`}>
          <div className="max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-block animate-float mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 bg-opacity-20 backdrop-blur-sm text-white text-sm font-medium border border-white border-opacity-20">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                <span>Join 10,000+ users</span>
              </span>
            </div>
            
            {/* Heading with animated highlight */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              <span className="relative inline-block">
                Ready to 
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-300 animate-shimmer"></span>
              </span>{" "}
              <span className="relative inline-block animate-float" style={{ animationDuration: '3s' }}>
                Take Control
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-300 animate-shimmer"></span>
              </span>{" "}
              of Your Finances?
          </h2>
            
            {/* Animated subtitle */}
            <p className="text-blue-100 mb-10 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '300ms' }}>
              Join thousands of users who are already managing their finances smarter with{" "}
              <span className="relative inline-block font-semibold text-white">
                Paisa
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none" height="8">
                  <path d="M0,0 L200,0 C180,4 140,8 100,8 C60,8 20,4 0,0" fill="rgba(236, 252, 203, 0.6)" className="animate-wave" style={{ animationDuration: '2s' }}></path>
                </svg>
              </span>
            </p>
            
            {/* CTA buttons with animations */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 transition-all duration-500 shadow-lg hover:shadow-xl group relative overflow-hidden"
                onClick={() => handleNavigation('/dashboard')}
                disabled={isNavigating}
              >
                {/* Button highlight effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-100 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                
                <span className="relative flex items-center gap-2">
                  {isNavigating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                      <span className="font-medium">Loading...</span>
                    </>
                  ) : (
                    <>
                      <span className="font-medium">Start Now</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </Button>
              
              <Link href="/features" className="inline-block">
            <Button
              size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:bg-opacity-10 transition-all duration-500 backdrop-blur-sm bg-white bg-opacity-10 group"
                  disabled={isNavigating}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-medium">See Features</span>
                    <svg className="w-5 h-5 transform group-hover:rotate-45 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </Button>
              </Link>
            </div>
            
            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white text-opacity-70">
              <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '600ms' }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>256-bit encryption</span>
              </div>
              <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '800ms' }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>99.9% uptime</span>
              </div>
              <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '1000ms' }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>24/7 Support</span>
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
      </section>
    </div>
  );
};

// Pre-defined dashboard slide content components
const dashboardSlides = [
  // Account Overview
  <div key="account" className="space-y-4">
    <div className="text-xl font-bold text-gray-800">Account Overview</div>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="text-sm text-gray-600">Total Balance</div>
        <div className="text-2xl font-bold text-blue-600">₹12,450.85</div>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <div className="text-sm text-gray-600">Monthly Savings</div>
        <div className="text-2xl font-bold text-green-600">₹2,150.00</div>
      </div>
    </div>
    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Spending Chart</p>
    </div>
  </div>,
  
  // Budget Tracker
  <div key="budget" className="space-y-4">
    <div className="text-xl font-bold text-gray-800">Budget Tracker</div>
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Groceries</span>
          <span>70%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Entertainment</span>
          <span>45%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Transport</span>
          <span>30%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
        </div>
      </div>
    </div>
  </div>,
  
  // Recent Transactions
  <div key="transactions" className="space-y-4">
    <div className="text-xl font-bold text-gray-800">Recent Transactions</div>
    <div className="space-y-3">
      <div className="flex justify-between items-center p-2 border-b">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
            <span className="text-red-600 text-xs">↓</span>
          </div>
          <div>
            <div className="font-medium">Grocery Store</div>
            <div className="text-xs text-gray-500">May 12, 2023</div>
          </div>
        </div>
        <div className="text-red-600">-₹85.40</div>
      </div>
      <div className="flex justify-between items-center p-2 border-b">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
            <span className="text-green-600 text-xs">↑</span>
          </div>
          <div>
            <div className="font-medium">Salary</div>
            <div className="text-xs text-gray-500">May 10, 2023</div>
          </div>
        </div>
        <div className="text-green-600">+₹3,250.00</div>
      </div>
    </div>
  </div>,
  
  // Financial Goals
  <div key="goals" className="space-y-4">
    <div className="text-xl font-bold text-gray-800">Financial Goals</div>
    <div className="space-y-3">
      <div className="bg-blue-50 p-3 rounded-lg">
        <div className="flex justify-between mb-1">
          <span className="font-medium">New Car</span>
          <span className="text-sm">₹15,000 / ₹25,000</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
        </div>
        <div className="text-xs text-right mt-1 text-gray-500">60% completed</div>
      </div>
      <div className="bg-purple-50 p-3 rounded-lg">
        <div className="flex justify-between mb-1">
          <span className="font-medium">Vacation</span>
          <span className="text-sm">₹3,500 / ₹5,000</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
        </div>
        <div className="text-xs text-right mt-1 text-gray-500">70% completed</div>
      </div>
    </div>
  </div>
];

// Optimized carousel component - static content for better performance
function DashboardCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Load minimal state and avoid timer-based animations for better performance
  useEffect(() => {
    // Just set current slide without animation
    const carouselInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % dashboardSlides.length);
    }, 5000); // Longer interval for better performance

    return () => clearInterval(carouselInterval);
  }, []);

  return (
    <div className="relative h-[400px] w-full rounded-xl shadow-xl border border-gray-200 bg-white overflow-hidden">
      {/* Dashboard header - simplified */}
      <div className="h-12 bg-gradient-to-r from-blue-600 to-violet-600 px-4 flex items-center rounded-t-lg">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-white font-medium text-sm ml-4">Paisa Dashboard</div>
      </div>
      
      {/* Content area - use static positioning for better performance */}
      <div className="p-4 bg-white h-[calc(100%-48px)]">
        {dashboardSlides.map((slide, index) => (
          <div 
            key={index}
            className="absolute top-12 left-0 w-full h-[calc(100%-48px)] p-4"
            style={{ 
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 0.3s ease',
              visibility: currentSlide === index ? 'visible' : 'hidden' 
            }}
          >
            {slide}
          </div>
        ))}
      </div>
      
      {/* Simple indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {dashboardSlides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`View slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
