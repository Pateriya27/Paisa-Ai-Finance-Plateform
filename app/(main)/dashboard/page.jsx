import { getUserAccounts } from "@/actions/account";
import { getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import DashboardWrapper from "./_components/dashboard-wrapper";
import DashboardContent from "./_components/dashboard-content";
import NoAccounts from "./_components/no-accounts";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";

// Export static metadata to optimize build
export const dynamic = 'force-dynamic';
export const fetchCache = 'default-cache';
export const revalidate = 60; // Revalidate every 60 seconds

export default async function DashboardPage() {
  // Fetch data in parallel for better performance
  const [accountsPromise, dashboardDataPromise] = await Promise.allSettled([
    getUserAccounts(),
    getDashboardData()
  ]);
  
  // Handle results safely
  const accounts = accountsPromise.status === 'fulfilled' ? accountsPromise.value : [];
  const dashboardData = dashboardDataPromise.status === 'fulfilled' ? dashboardDataPromise.value : [];
  
  // Check if user has any accounts
  if (!accounts || accounts.length === 0) {
    return (
      <DashboardWrapper>
        <NoAccounts />
      </DashboardWrapper>
    );
  }
  
  // Find default account after data is loaded
  const defaultAccount = accounts?.find((account) => account.isDefault);
  
  // Fetch budget data separately since it depends on defaultAccount
  const budgetData = defaultAccount 
    ? await getCurrentBudget(defaultAccount.id).catch(() => null) 
    : null;

  return (
    <DashboardWrapper>
      <Suspense fallback={<FastLoadingFallback />}>
        <DashboardContent
          accounts={accounts}
          dashboardData={dashboardData}
          budgetData={budgetData}
          defaultAccount={defaultAccount}
        />
      </Suspense>
    </DashboardWrapper>
  );
}

// Simple loading state that renders very quickly
function FastLoadingFallback() {
  return (
    <div className="py-8 space-y-6">
      <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
