"use client";

import React, { useEffect } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import UserProfileSection from "@/components/user-profile-section";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div>
      <SignedIn>
        <UserProfileSection />
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Please sign in to view your profile</h2>
            <p className="text-gray-500">Redirecting you to the home page...</p>
          </div>
        </div>
      </SignedOut>
    </div>
  );
} 