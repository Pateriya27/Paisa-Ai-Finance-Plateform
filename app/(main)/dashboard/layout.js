import DashboardPage from "./page";
import { Suspense } from "react";

// Add metadata to optimize page loading
export const metadata = {
  title: 'Dashboard | Paisa',
  description: 'Manage your finances with Paisa',
};

// Optimized dashboard layout with fixed scrolling
export default function Layout() {
  return (
    <div className="px-5 overflow-auto">
      {/* Static header that loads immediately */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold tracking-tight gradient-title">
          Dashboard
        </h1>
      </div>
      
      {/* Content area that properly scrolls */}
      <div className="dashboard-scrollable-content">
        <Suspense
          fallback={<FastLoadingSkeleton />}
        >
          <DashboardPage />
        </Suspense>
      </div>
    </div>
  );
}

// Optimized fast-loading skeleton that renders instantly 
function FastLoadingSkeleton() {
  return (
    <div className="w-full space-y-6">
      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg"
          />
        ))}
      </div>
      
      {/* Budget bar */}
      <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-lg w-full" />
      
      {/* Content area */}
      <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg w-full" />
    </div>
  );
}
