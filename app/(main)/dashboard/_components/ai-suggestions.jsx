"use client";

import { useState, useEffect, memo, useCallback, useMemo, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, Sparkles, TrendingDown, Clock, Target, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/use-local-storage";

// Memoized suggestion item to prevent unnecessary re-renders
const SuggestionItem = memo(({ suggestion }) => {
  return (
    <div className="p-3 border rounded-lg hover:bg-accent/10 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{suggestion.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-sm font-medium px-2 py-1 rounded whitespace-nowrap">
          Save ₹{suggestion.potentialSavings.toLocaleString('en-IN')}
        </div>
      </div>
      <div className="mt-2 text-xs text-muted-foreground border-t pt-2">
        Category: {suggestion.category}
      </div>
    </div>
  );
});
SuggestionItem.displayName = 'SuggestionItem';

// Error message component
const ErrorMessage = memo(({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-8 text-center">
    <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
    <p className="text-red-500">{message}</p>
    <Button
      variant="outline"
      size="sm"
      className="mt-4"
      onClick={onRetry}
    >
      Retry
    </Button>
  </div>
));
ErrorMessage.displayName = 'ErrorMessage';

// Memoized tabs content to prevent unnecessary re-renders
const SuggestionsList = memo(({ suggestions, type, isLoading, error, onRetry }) => {
  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Generating personalized recommendations...</span>
      </div>
    );
  }
  
  if (!suggestions?.[type] || suggestions[type].length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No recommendations available.</p>
        <p className="text-sm text-muted-foreground mt-1">Try refreshing or add more transactions for better insights.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3 mt-4">
      {suggestions[type]?.map(suggestion => (
        <SuggestionItem key={suggestion.id} suggestion={suggestion} />
      ))}
    </div>
  );
});
SuggestionsList.displayName = 'SuggestionsList';

// Initial state - moved outside component to avoid recreating on each render
const initialSpendingData = {
  monthlySavings: 0,
  annualImpact: 0,
  refreshedAt: new Date().toISOString()
};

// Memoized formatters to avoid recreating on each render
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount).replace(/^(\D+)/, '₹');
};

// Sample fallback suggestions in case the API fails
const fallbackSuggestions = {
  quickWins: [
    {
      id: 1,
      title: "Reduce food delivery expenses",
      description: "You could save by cooking at home more often instead of ordering delivery.",
      potentialSavings: 1600,
      category: "Food"
    },
    {
      id: 2,
      title: "Cancel unused subscriptions",
      description: "Review your monthly subscriptions and cancel services you rarely use.",
      potentialSavings: 899,
      category: "Entertainment"
    },
    {
      id: 3,
      title: "Optimize your mobile plan",
      description: "Consider switching to a more affordable mobile plan based on your usage.",
      potentialSavings: 400,
      category: "Utilities"
    }
  ],
  monthlyPlans: [
    {
      id: 4,
      title: "Set automated savings transfers",
      description: "Automatically move 10% of your income to savings on payday.",
      potentialSavings: 2000,
      category: "Savings"
    },
    {
      id: 5,
      title: "Try the 50/30/20 budget rule",
      description: "Allocate 50% to needs, 30% to wants, and 20% to savings/debt.",
      potentialSavings: 1200,
      category: "Budgeting"
    }
  ],
  longTerm: [
    {
      id: 6,
      title: "Refinance high-interest debt",
      description: "Consider consolidating your credit card debts to a lower interest loan.",
      potentialSavings: 1800,
      category: "Debt"
    },
    {
      id: 7,
      title: "Investment opportunities",
      description: "Based on your risk profile, you could benefit from these investment options.",
      potentialSavings: 8000,
      category: "Investments"
    }
  ]
};

// Function to get AI-generated recommendations with AbortController for cancellation
async function getAIRecommendations(signal) {
  try {
    const response = await fetch('/api/ai-recommendations', {
      method: 'POST',
      signal
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch recommendations');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request was cancelled');
    }
    
    console.error('Error getting AI recommendations:', error);
    // Return fallback suggestions if the API fails
    return {
      suggestions: fallbackSuggestions,
      monthlySavings: 6699,
      annualImpact: 6699 * 12
    };
  }
}

// Local storage key
const RECOMMENDATIONS_STORAGE_KEY = 'paisa-recommendations';
const CACHE_DURATION = 1000 * 60 * 60 * 3; // 3 hours

function AISuggestions() {
  // Use local storage to cache recommendations between page refreshes
  const [cachedData, setCachedData] = useLocalStorage(RECOMMENDATIONS_STORAGE_KEY, null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [spendingData, setSpendingData] = useState(initialSpendingData);
  
  const [activeTab, setActiveTab] = useState("quickWins");
  const [suggestions, setSuggestions] = useState({});
  
  // Add state for formatted date to avoid hydration errors
  const [formattedDate, setFormattedDate] = useState('Loading...');
  
  // Add states for formatted currency values to avoid hydration errors
  const [formattedMonthlySavings, setFormattedMonthlySavings] = useState('₹0');
  const [formattedAnnualImpact, setFormattedAnnualImpact] = useState('₹0');

  // Use AbortController for fetch cancellation
  const abortControllerRef = useRef(null);

  // Initialize data from cache on client-side only
  useEffect(() => {
    // Initialize from cache if available and not expired
    if (cachedData && 
        cachedData.refreshedAt && 
        (Date.now() - new Date(cachedData.refreshedAt).getTime() < CACHE_DURATION)) {
      
      const cachedSpendingData = {
        monthlySavings: cachedData.monthlySavings || 0,
        annualImpact: cachedData.annualImpact || 0,
        refreshedAt: cachedData.refreshedAt
      };
      
      setSpendingData(cachedSpendingData);
      setSuggestions(cachedData.suggestions || {});
      setLoading(false);
      
      // Format currency values
      setFormattedMonthlySavings(formatCurrency(cachedData.monthlySavings || 0));
      setFormattedAnnualImpact(formatCurrency(cachedData.annualImpact || 0));
    }
    
    const shouldFetch = !cachedData || 
                       !cachedData.refreshedAt || 
                       (Date.now() - new Date(cachedData.refreshedAt).getTime() > CACHE_DURATION);
    
    if (shouldFetch) {
      fetchRecommendations();
    }
  }, []);

  // Format date safely on client-side only to avoid hydration errors
  useEffect(() => {
    try {
      setFormattedDate(
        new Date(spendingData.refreshedAt).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        })
      );
      
      // Also update formatted currency values when spending data changes
      setFormattedMonthlySavings(formatCurrency(spendingData.monthlySavings));
      setFormattedAnnualImpact(formatCurrency(spendingData.annualImpact));
    } catch (error) {
      console.error("Formatting error:", error);
      setFormattedDate('Recently updated');
    }
  }, [spendingData]);

  // Clean up on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Memoized refresh function to prevent recreation on each render
  const fetchRecommendations = useCallback(async () => {
    // Cancel any in-flight requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getAIRecommendations(abortControllerRef.current.signal);
      
      // Get values with fallbacks
      const monthlySavings = data.monthlySavings || 0;
      const annualImpact = data.annualImpact || 0;
      const newSuggestions = data.suggestions || fallbackSuggestions;
      const refreshedAt = new Date().toISOString();
      
      // Update state with new data
      setSuggestions(newSuggestions);
      setSpendingData({
        monthlySavings,
        annualImpact,
        refreshedAt
      });
      
      // Also update formatted values directly to prevent hydration issues
      setFormattedMonthlySavings(formatCurrency(monthlySavings));
      setFormattedAnnualImpact(formatCurrency(annualImpact));
      
      // Update formatted date 
      try {
        setFormattedDate(
          new Date(refreshedAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          })
        );
      } catch (err) {
        setFormattedDate('Just now');
      }
      
      // Save to local storage for persistence
      setCachedData({
        suggestions: newSuggestions,
        monthlySavings,
        annualImpact,
        refreshedAt
      });
      
      toast.success("Insights refreshed", {
        description: "Your personalized recommendations have been updated."
      });
    } catch (error) {
      console.error('Failed to get recommendations:', error);
      setError(error.message || "Failed to load recommendations");
      
      // Use fallback data if available
      if (!suggestions || Object.keys(suggestions).length === 0) {
        setSuggestions(fallbackSuggestions);
        
        const monthlySavings = 4500;
        const annualImpact = 54000;
        const refreshedAt = new Date().toISOString();
        
        setSpendingData({
          monthlySavings,
          annualImpact,
          refreshedAt
        });
        
        // Update formatted values directly
        setFormattedMonthlySavings(formatCurrency(monthlySavings));
        setFormattedAnnualImpact(formatCurrency(annualImpact));
        
        // Update formatted date
        try {
          setFormattedDate(
            new Date(refreshedAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            })
          );
        } catch (err) {
          setFormattedDate('Just now');
        }
      }
      
      toast.error("Failed to refresh insights", {
        description: error.message || "Using default recommendations instead."
      });
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [setCachedData, formatCurrency]);

  // Handle tab change without unnecessary rerenders
  const handleTabChange = useCallback((value) => {
    setActiveTab(value);
  }, []);

  return (
    <Card className="border-t-4 border-t-primary">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Personalized recommendations
            </CardTitle>
            <CardDescription className="mt-1">
              AI-powered insights based on your spending patterns • Last updated: {formattedDate}
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex gap-2"
            onClick={fetchRecommendations}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-primary/5 border-none">
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground mb-2">Potential monthly savings</div>
              <div className="text-3xl font-bold text-primary">{formattedMonthlySavings}</div>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-none">
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground mb-2">Annual impact</div>
              <div className="text-3xl font-bold text-primary">{formattedAnnualImpact}</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="quickWins" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quickWins" className="flex gap-2 items-center">
              <TrendingDown className="h-4 w-4" />
              <span className="hidden sm:inline">Quick Wins</span>
              <span className="sm:hidden">Quick</span>
            </TabsTrigger>
            <TabsTrigger value="monthlyPlans" className="flex gap-2 items-center">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Monthly Plans</span>
              <span className="sm:hidden">Monthly</span>
            </TabsTrigger>
            <TabsTrigger value="longTerm" className="flex gap-2 items-center">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Long-term Strategies</span>
              <span className="sm:hidden">Long-term</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="quickWins">
            <SuggestionsList 
              suggestions={suggestions} 
              type="quickWins" 
              isLoading={loading} 
              error={error}
              onRetry={fetchRecommendations}
            />
          </TabsContent>
          
          <TabsContent value="monthlyPlans">
            <SuggestionsList 
              suggestions={suggestions} 
              type="monthlyPlans" 
              isLoading={loading} 
              error={error}
              onRetry={fetchRecommendations}
            />
          </TabsContent>
          
          <TabsContent value="longTerm">
            <SuggestionsList 
              suggestions={suggestions} 
              type="longTerm" 
              isLoading={loading} 
              error={error}
              onRetry={fetchRecommendations}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Export as memoized component to prevent unnecessary re-renders
export default memo(AISuggestions); 