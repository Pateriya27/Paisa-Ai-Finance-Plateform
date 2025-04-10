"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { updateAccountBalance } from "@/actions/account";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AdjustBalanceButton({ accountId, currentBalance }) {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [adjustType, setAdjustType] = useState("increase");
  const router = useRouter();

  const handleAdjustBalance = async () => {
    try {
      if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        toast.error("Please enter a valid positive amount");
        return;
      }

      setIsLoading(true);
      
      // If decrease, make the amount negative
      const adjustAmount = adjustType === "decrease" 
        ? -Math.abs(parseFloat(amount)) 
        : Math.abs(parseFloat(amount));
      
      const result = await updateAccountBalance(accountId, adjustAmount);
      
      if (result.success) {
        toast.success(`Balance ${adjustType}d successfully`);
        router.refresh();
      } else {
        throw new Error(result.error || "Failed to adjust balance");
      }
    } catch (error) {
      toast.error(error.message || "Failed to adjust balance");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <div className="flex gap-2">
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setAdjustType("increase");
              setAmount("");
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Funds
          </Button>
        </AlertDialogTrigger>
        
        <AlertDialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setAdjustType("decrease");
              setAmount("");
            }}
          >
            <Minus className="h-4 w-4 mr-2" />
            Remove Funds
          </Button>
        </AlertDialogTrigger>
      </div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {adjustType === "increase" ? "Add Funds" : "Remove Funds"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Enter the amount to {adjustType === "increase" ? "add to" : "remove from"} this account.
            {adjustType === "decrease" && currentBalance && (
              <span className="mt-2 text-sm font-medium block">
                Available balance: ₹{parseFloat(currentBalance).toFixed(2)}
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="py-4">
          <div className="flex items-center">
            <span className="text-lg mr-2">₹</span>
            <Input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1"
            />
          </div>
          
          {adjustType === "decrease" && currentBalance && parseFloat(amount) > currentBalance && (
            <p className="text-destructive text-sm mt-2">
              Warning: This will make the account balance negative.
            </p>
          )}
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleAdjustBalance}
            disabled={isLoading}
            className={adjustType === "increase" ? "bg-primary" : "bg-destructive text-destructive-foreground"}
          >
            {isLoading ? "Processing..." : adjustType === "increase" ? "Add Funds" : "Remove Funds"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 