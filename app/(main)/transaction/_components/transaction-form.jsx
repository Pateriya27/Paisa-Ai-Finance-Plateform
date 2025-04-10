"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import ReceiptScanner from "./receipt-scanner";
import { cn } from "@/lib/utils";

// Define the schema for form validation
const formSchema = z.object({
  type: z.enum(["EXPENSE", "INCOME", "TRANSFER"]),
  amount: z.string().min(1, { message: "Amount is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  accountId: z.string().min(1, { message: "Account is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  date: z.date({ required_error: "Date is required" }),
  payee: z.string().optional(),
  isRecurring: z.boolean().default(false),
  recurringInterval: z.string().optional(),
});

export function AddTransactionForm({
  categories = [],
  accounts = [],
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Extract editId from searchParams using the hook
  const editId = searchParams ? searchParams.get("edit") : null;

  // Fetch transaction data if in edit mode
  useEffect(() => {
    const fetchTransactionData = async () => {
      if (editId) {
        setIsEditMode(true);
        setIsLoading(true);
        try {
          const response = await fetch(`/api/transactions/${editId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch transaction");
          }
          const data = await response.json();
          setTransactionData(data);
        } catch (error) {
          console.error("Error fetching transaction:", error);
          toast.error("Failed to load transaction data");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTransactionData();
  }, [editId]);

  // Set default values for the form
  const defaultValues = {
            type: "EXPENSE",
            amount: "",
    date: new Date(),
            description: "",
    categoryId: categories.length > 0 ? categories[0].id : "",
    accountId: accounts.length > 0 ? accounts[0].id : "",
    payee: "",
            isRecurring: false,
    recurringInterval: "MONTHLY",
  };

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { register, control, handleSubmit, setValue, getValues, watch, formState: { errors } } = form;
  const isRecurring = watch("isRecurring");
  
  // Update form with receipt scanner data when available
  useEffect(() => {
    if (receiptData) {
      // Update form fields based on receipt data
      setValue("amount", receiptData.amount || getValues("amount"));
      setValue("description", receiptData.description || getValues("description"));
      setValue("date", receiptData.date ? new Date(receiptData.date) : getValues("date"));
      
      // Show success notification
      toast.success("Receipt data applied to the form");
    }
  }, [receiptData, setValue, getValues]);

  // Update form when transaction data is loaded
  useEffect(() => {
    if (transactionData) {
      // Update all form fields with the transaction data
      setValue("type", transactionData.type || "EXPENSE");
      setValue("amount", transactionData.amount?.toString() || "");
      setValue("date", transactionData.date ? new Date(transactionData.date) : new Date());
      setValue("description", transactionData.description || "");
      setValue("categoryId", transactionData.categoryId || "");
      setValue("accountId", transactionData.accountId || "");
      setValue("payee", transactionData.payee || "");
      setValue("isRecurring", transactionData.isRecurring || false);
      if (transactionData.recurringInterval) {
        setValue("recurringInterval", transactionData.recurringInterval);
      }
    }
  }, [transactionData, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Format data for submission
      const formattedData = {
      ...data,
      amount: parseFloat(data.amount),
    };

      // Determine API endpoint based on edit mode
      const endpoint = isEditMode
        ? `/api/transactions/${editId}`
        : "/api/transactions";
      
      // Determine HTTP method based on edit mode
      const method = isEditMode ? "PUT" : "POST";

      console.log("Submitting data:", formattedData);

      // Submit form data
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to save transaction");
      }

      // Show success message and redirect
      toast.success(
        isEditMode
          ? "Transaction updated successfully"
          : "Transaction created successfully"
      );
      
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error saving transaction:", error);
      toast.error(error.message || "Failed to save transaction");
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanComplete = (data) => {
    if (data) {
      // Make sure to convert amount to string before setting in form
      const formattedData = {
        ...data,
        amount: typeof data.amount === 'number' ? data.amount.toString() : data.amount
      };
      setReceiptData(formattedData);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">
        {isEditMode ? "Edit Transaction" : "Add New Transaction"}
      </h2>
      
      {!isEditMode && (
        <div className="mb-6">
          <ReceiptScanner onScanComplete={handleScanComplete} />
        </div>
      )}

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Transaction Type */}
      <div className="space-y-2">
          <label className="text-sm font-medium">Transaction Type</label>
        <Select
          onValueChange={(value) => setValue("type", value)}
            defaultValue={watch("type")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EXPENSE">Expense</SelectItem>
            <SelectItem value="INCOME">Income</SelectItem>
              <SelectItem value="TRANSFER">Transfer</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-sm text-red-500">{errors.type.message}</p>
        )}
      </div>

        {/* Amount */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("amount")}
          />
          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}
        </div>

        {/* Date */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full pl-3 text-left font-normal",
                  !watch("date") && "text-muted-foreground"
                )}
              >
                {watch("date") ? (
                  format(watch("date"), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
                selected={watch("date")}
              onSelect={(date) => setValue("date", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.date && (
          <p className="text-sm text-red-500">{errors.date.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
          <Textarea
            placeholder="Enter transaction description"
            {...register("description")}
          />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select
            onValueChange={(value) => setValue("categoryId", value)}
            value={watch("categoryId")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categoryId && (
            <p className="text-sm text-red-500">{errors.categoryId.message}</p>
          )}
        </div>

        {/* Account */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Account</label>
          <Select
            onValueChange={(value) => setValue("accountId", value)}
            value={watch("accountId")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.accountId && (
            <p className="text-sm text-red-500">{errors.accountId.message}</p>
          )}
        </div>

        {/* Payee */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Payee (Optional)</label>
          <Input
            placeholder="Enter payee name"
            {...register("payee")}
          />
          {errors.payee && (
            <p className="text-sm text-red-500">{errors.payee.message}</p>
          )}
        </div>

        {/* Recurring */}
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
            <label className="text-base">Recurring Transaction</label>
          <div className="text-sm text-muted-foreground">
              Enable for repeating transactions
            </div>
        </div>
        <Switch
          checked={isRecurring}
          onCheckedChange={(checked) => setValue("isRecurring", checked)}
        />
      </div>

        {/* Recurring Interval - Only shown if isRecurring is true */}
      {isRecurring && (
        <div className="space-y-2">
            <label className="text-sm font-medium">Recurrence Interval</label>
          <Select
            onValueChange={(value) => setValue("recurringInterval", value)}
              defaultValue={watch("recurringInterval")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DAILY">Daily</SelectItem>
              <SelectItem value="WEEKLY">Weekly</SelectItem>
              <SelectItem value="MONTHLY">Monthly</SelectItem>
              <SelectItem value="YEARLY">Yearly</SelectItem>
            </SelectContent>
          </Select>
          {errors.recurringInterval && (
            <p className="text-sm text-red-500">
              {errors.recurringInterval.message}
            </p>
          )}
        </div>
      )}

        {/* Submit Button */}
        <Button
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
              <span>{isEditMode ? "Updating" : "Creating"} Transaction...</span>
            </div>
          ) : (
            <span>{isEditMode ? "Update" : "Create"} Transaction</span>
          )}
        </Button>
      </form>
      </div>
  );
}
