"use client";

import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, User, Home, HelpCircle } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Handle hash links properly
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    // Only use hash scrolling on the home page
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on home page, navigate to home page with hash
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-40 border-b h-16 md:h-20 transition-all duration-300 ease-in-out">
      <nav className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center group" onClick={() => router.push('/')}>
          <div className="relative overflow-hidden cursor-pointer">
            <Image
              src={"/paisa-logo-zip-file/png/logo-no-background.png"}
              alt="Paisa Logo"
              width={180}
              height={50}
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 relative z-10 dark:brightness-0 dark:invert dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]"
            />
            {/* Light effect for dark mode */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer dark:animate-shine hidden dark:block"></div>
            
            {/* Highlight effect */}
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0 opacity-0 blur-sm group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500 dark:via-blue-400/30"></div>
          </div>
          <span className="ml-2 text-3xl font-extrabold relative overflow-hidden cursor-pointer">
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 animate-gradient-x text-glow group-hover:animate-jelly inline-block dark:from-blue-400 dark:via-purple-300 dark:to-indigo-400 dark:drop-shadow-[0_0_8px_rgba(165,180,252,0.5)]">
              P<span className="text-shine inline-block">a</span>isa
            </span>
            <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left dark:from-blue-400 dark:via-purple-300 dark:to-indigo-400"></span>
            <span className="absolute -z-10 -inset-0.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            
            {/* Particle effects */}
            <span className="absolute -z-5 top-0 left-1/4 w-1 h-1 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-float" style={{ animationDuration: '3s' }}></span>
            <span className="absolute -z-5 top-0 left-3/4 w-1.5 h-1.5 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-float" style={{ animationDuration: '2.5s', animationDelay: '0.2s' }}></span>
            <span className="absolute -z-5 bottom-0 left-1/2 w-1 h-1 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-float" style={{ animationDuration: '3.5s', animationDelay: '0.3s' }}></span>
          </span>
        </div>

        {/* Navigation Links - Different for signed in/out users */}
        <div className="hidden md:flex items-center space-x-8">
          <SignedOut>
            <button 
              onClick={(e) => scrollToSection(e, 'features')}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Features
            </button>
            <button
              onClick={(e) => scrollToSection(e, 'testimonials')}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Testimonials
            </button>
          </SignedOut>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <SignedIn>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105"
              onClick={() => router.push('/')}
            >
              <Home size={18} className="transition-transform duration-300 group-hover:rotate-12" />
              <span className="hidden md:inline ml-2">Home</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105"
              onClick={() => router.push('/dashboard')}
            >
              <LayoutDashboard size={18} className="transition-transform duration-300 group-hover:rotate-12" />
              <span className="hidden md:inline ml-2">Dashboard</span>
            </Button>
            <Button 
              className="flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-md"
              onClick={() => router.push('/transaction/create')}
            >
              <PenBox size={18} className="transition-transform duration-300 group-hover:rotate-12" />
              <span className="hidden md:inline">Add Transaction</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105"
              onClick={() => router.push('/profile')}
            >
              <User size={18} className="transition-transform duration-300 group-hover:rotate-12" />
              <span className="hidden md:inline">Profile</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105"
              onClick={() => router.push('/support')}
            >
              <HelpCircle size={18} className="transition-transform duration-300 group-hover:rotate-12" />
              <span className="hidden md:inline">Support</span>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button 
              variant="outline" 
              className="transition-all duration-300 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              onClick={() => router.push('/support')}
            >
              <HelpCircle size={18} className="md:mr-2" />
              <span className="hidden md:inline">Support</span>
            </Button>
            <SignInButton>
              <Button variant="outline" className="transition-all duration-300 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/30">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 transition-transform duration-300 hover:scale-110",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;


