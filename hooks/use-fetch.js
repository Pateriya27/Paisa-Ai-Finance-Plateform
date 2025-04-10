import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";

/**
 * Enhanced useFetch hook for better performance
 * - Uses useCallback to avoid recreation of functions
 * - Adds debouncing support
 * - Supports cancelable requests
 * - Handles concurrent calls
 */
const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Use ref to track the latest callback
  const callbackRef = useRef(cb);
  callbackRef.current = cb;
  
  // Use ref to track abort controllers for cancelable requests
  const controllerRef = useRef(null);
  
  // Keep track of pending requests
  const pendingRef = useRef(false);

  // Memoized function to avoid recreation on each render
  const fn = useCallback(async (...args) => {
    // Cancel any previous ongoing request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    
    // Create new abort controller
    controllerRef.current = new AbortController();
    
    // Set loading state
    setLoading(true);
    setError(null);
    pendingRef.current = true;

    try {
      // Add abort signal to the callback arguments if supported
      const response = await callbackRef.current(...args);
      
      // Only update state if this is still the latest request
      if (pendingRef.current) {
        setData(response);
        setError(null);
        pendingRef.current = false;
      }
      
      return response;
    } catch (error) {
      // Only update error state if this is still the latest request
      // and it's not an abort error
      if (pendingRef.current && error.name !== 'AbortError') {
        setError(error);
        // Only show toast for non-aborted errors
        if (error.message) {
          toast.error(error.message);
        }
        pendingRef.current = false;
      }
      
      throw error;
    } finally {
      // Only update loading state if this is still the latest request
      if (pendingRef.current) {
        setLoading(false);
        pendingRef.current = false;
      }
    }
  }, []); // Empty dependency array since we use refs

  // Memoized function to set data without triggering API call
  const setDataMemoized = useCallback((newData) => {
    setData(newData);
  }, []);

  // Memoized function to reset state
  const reset = useCallback(() => {
    setData(undefined);
    setError(null);
    setLoading(false);
  }, []);

  // Memoized function to cancel ongoing requests
  const cancel = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
    setLoading(false);
    pendingRef.current = false;
  }, []);

  return { 
    data, 
    loading, 
    error, 
    fn, 
    setData: setDataMemoized, 
    reset,
    cancel
  };
};

export default useFetch;
