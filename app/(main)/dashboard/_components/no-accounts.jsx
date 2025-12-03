"use client";

import { CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateAccountDrawer } from "@/components/create-account-drawer";

export default function NoAccounts() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <div className="mb-8">
        <CreditCard className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-2xl font-bold mb-2">Create your first account</h1>
        <p className="text-muted-foreground max-w-md mb-6">
          Start your financial journey by adding your first account. You&apos;ll be able to track
          expenses, set budgets, and get personalized recommendations.
        </p>
        <CreateAccountDrawer>
          <Button size="lg" className="px-8">
            <Plus className="mr-2 h-5 w-5" />
            Create Account
          </Button>
        </CreateAccountDrawer>
      </div>
    </div>
  );
} 