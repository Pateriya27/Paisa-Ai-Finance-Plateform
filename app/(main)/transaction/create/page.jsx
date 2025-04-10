import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";
import { Suspense } from "react";

// Main page component with Suspense boundary
export default function AddTransactionPage(props) {
  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title">Add Transaction</h1>
      </div>
      <Suspense fallback={<div>Loading transaction form...</div>}>
        <TransactionContent {...props} />
      </Suspense>
    </div>
  );
}

// Separate async component that handles data fetching
async function TransactionContent({ params, searchParams }) {
  // Fetch accounts data
  const accounts = await getUserAccounts();
  
  // Instead of accessing searchParams directly, pass it to the form component
  // The client component will handle extracting the editId safely
  
  return (
    <AddTransactionForm
      accounts={accounts}
      categories={defaultCategories}
      searchParams={searchParams || {}}
    />
  );
}
