"use client";

import { Suspense } from "react";
import { AccountCard } from "./account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, User, CreditCard, ChevronDown } from "lucide-react";
import { DashboardOverview } from "./transaction-overview";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AISuggestions from "./ai-suggestions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Loading fallbacks
const AccountsSkeleton = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {[1, 2, 3].map((i) => (
      <Card key={i} className="h-44 animate-pulse">
        <CardContent className="p-4">
          <div className="bg-gray-200 h-6 w-3/4 rounded mb-4"></div>
          <div className="bg-gray-200 h-8 w-1/2 rounded mb-4"></div>
          <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
          <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
        </CardContent>
      </Card>
    ))}
  </div>
);

// Compact Account Selector for the header
const AccountSelector = ({ accounts, defaultAccount }) => {
  if (!accounts || accounts.length === 0) {
    return null;
  }

  const defaultAcc = defaultAccount || accounts.find(a => a.isDefault) || accounts[0];
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-3 px-4 py-6 h-auto rounded-xl min-w-[280px]">
          <CreditCard className="h-5 w-5 text-primary" />
          <div className="flex flex-col items-start flex-grow">
            <span className="max-w-[220px] truncate font-medium text-base">{defaultAcc.name}</span>
            <span className="text-sm text-muted-foreground capitalize">{defaultAcc.type.toLowerCase()}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[350px] p-3 rounded-xl">
        <div className="grid grid-cols-2 gap-3 mb-3">
          {accounts.map(account => {
            // Assign icon and color based on account type
            const getAccountIcon = (type) => {
              switch(type.toLowerCase()) {
                case 'savings': return <CreditCard className="h-5 w-5 text-blue-500" />;
                case 'checking': return <CreditCard className="h-5 w-5 text-green-500" />;
                case 'investment': return <CreditCard className="h-5 w-5 text-purple-500" />;
                case 'credit': return <CreditCard className="h-5 w-5 text-red-500" />;
                default: return <CreditCard className="h-5 w-5 text-gray-500" />;
              }
            };
            
            return (
              <Link key={account.id} href={`/account/${account.id}`} className="w-full">
                <div className={`cursor-pointer rounded-xl p-3 hover:bg-accent/50 transition-colors ${account.isDefault ? 'bg-primary/5 border border-primary/20' : ''}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {getAccountIcon(account.type)}
                    <span className="font-medium text-sm truncate">{account.name}</span>
                    {account.isDefault && (
                      <Badge variant="outline" className="ml-auto px-1 py-0 text-[10px]">
                        Default
                      </Badge>
                    )}
                  </div>
                  <div className="text-lg font-bold">
                    ₹{parseFloat(account.balance).toFixed(0)}
                  </div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {account.type.toLowerCase()}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <CreateAccountDrawer>
          <Button variant="outline" className="w-full text-primary border-dashed p-3 h-auto text-base">
            <Plus className="mr-2 h-5 w-5" />
            Add Account
          </Button>
        </CreateAccountDrawer>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const BudgetSkeleton = () => (
  <div className="h-36 border rounded-lg p-6 animate-pulse">
    <div className="bg-gray-200 h-6 w-1/3 rounded mb-4"></div>
    <div className="bg-gray-200 h-8 w-full rounded mb-2"></div>
    <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
  </div>
);

export default function DashboardContent({ accounts, dashboardData, budgetData, defaultAccount }) {
  return (
    <div className="space-y-4 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b">
        <div className="flex items-center gap-4">
          {/* Accounts Selector in the header */}
          <AccountSelector 
            accounts={accounts} 
            defaultAccount={defaultAccount} 
          />
        </div>
        <div>
          <CreateAccountDrawer>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </CreateAccountDrawer>
        </div>
      </div>

      {/* Budget Progress with Suspense boundary */}
      <div className="mt-2">
        <h2 className="text-lg font-medium mb-2">Budget</h2>
        <Suspense fallback={<BudgetSkeleton />}>
          {defaultAccount && (
            <BudgetProgress
              initialBudget={budgetData?.budget}
              currentExpenses={budgetData?.currentExpenses || 0}
            />
          )}
        </Suspense>
      </div>

      {/* Dashboard Overview with Suspense boundary */}
      <div className="mt-4">
        <h2 className="text-lg font-medium mb-2">Transaction Overview</h2>
        <Suspense fallback={<div className="h-64 border rounded-lg animate-pulse"></div>}>
          <DashboardOverview
            accounts={accounts}
            transactions={dashboardData || []}
          />
        </Suspense>
      </div>

      {/* AI Suggestions with Suspense boundary */}
      <div className="mt-4">
        <h2 className="text-lg font-medium mb-2">Smart Suggestions</h2>
        <Suspense fallback={<div className="h-96 border rounded-lg animate-pulse"></div>}>
          <AISuggestions />
        </Suspense>
      </div>
    </div>
  );
} 