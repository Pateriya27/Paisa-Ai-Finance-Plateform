"use client";

import React, { useState, useEffect } from "react";
import { UserButton, useUser, UserProfile, useClerk } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, Camera, X, Shield, Mail, Calendar, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function UserProfileSection() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Add entrance animation
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      setIsAnimating(true);
      toast.success("Logging out...");
      
      setTimeout(async () => {
        await signOut();
        router.push("/");
        toast.success("Logged out successfully");
      }, 800);
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
      setIsAnimating(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-blue-500 animate-pulse">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-blue-100 opacity-30 blur-3xl animate-float dark:bg-blue-600 dark:opacity-10"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-purple-100 opacity-30 blur-3xl animate-float dark:bg-purple-600 dark:opacity-10" style={{ animationDelay: '2s' }}></div>
      
      <Card className={`w-full max-w-lg mx-4 shadow-xl border-0 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 transition-all duration-700 transform ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Verified badge */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-full shadow-lg transform rotate-12 animate-pulse">
              <Shield className="h-5 w-5 text-white" />
            </div>
            
            {/* Profile image with animation */}
            <div 
              className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500 flex items-center justify-center bg-gray-100 dark:bg-gray-800 cursor-pointer group transition-all duration-300 shadow-xl hover:shadow-blue-500/30"
              onClick={() => setIsProfileOpen(true)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 ${isHovering ? 'scale-110' : 'scale-100'}`}>
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <span className="text-4xl text-gray-500 dark:text-gray-400 animate-pulse">
                      {user?.firstName?.[0] || "U"}
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <Camera className="w-8 h-8 mx-auto mb-2 animate-bounce-slow" />
                  <span className="text-sm font-medium">Change Photo</span>
                </div>
              </div>
              
              {/* Verified indicator */}
              <div className="absolute bottom-0 right-0 bg-green-500 p-1 rounded-full border-2 border-white dark:border-gray-800 animate-float">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* User Info with animations */}
            <div className="text-center space-y-3">
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-fade-in">
                {user?.fullName || "User"}
              </h3>
              
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
                  <Mail className="w-4 h-4 animate-float" style={{animationDuration: '3s'}} />
                  <p className="text-lg">
                    {user?.primaryEmailAddress?.emailAddress || "No email provided"}
                  </p>
                </div>
                
                {user?.createdAt && (
                  <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 animate-float" style={{animationDuration: '4s'}} />
                    <p className="text-sm">
                      Member since {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons with animations */}
            <div className="flex flex-col gap-4 w-full pt-4">
              <Button
                variant="outline"
                className="w-full group relative overflow-hidden hover:border-blue-500 transition-colors duration-500"
                onClick={() => router.push("/settings")}
              >
                <span className="relative z-10 group-hover:text-blue-500 transition-colors duration-500 flex items-center">
                  <Settings className="w-4 h-4 mr-2 animate-spin-slow" />
                  Settings
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-500"></span>
              </Button>
              
              <Button
                variant="destructive"
                className="w-full group relative overflow-hidden transition-all duration-500"
                onClick={handleLogout}
              >
                <span className="relative z-10 flex items-center">
                  <LogOut className="w-4 h-4 mr-2 group-hover:animate-bounce-slow" />
                  Logout
                </span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></span>
                <span className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <span className="absolute inset-0 rounded-md animate-ripple bg-white/20 opacity-0 group-hover:opacity-100"></span>
                </span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Management Modal with animations */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
            <button
              onClick={() => setIsProfileOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300 hover:rotate-90 transform"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Profile Settings</h2>
            <div className="mt-4">
              <UserProfile
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "shadow-none",
                  },
                }}
                routing="hash"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 