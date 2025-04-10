"use client";

import { useRef, useEffect, useState } from "react";
import { Camera, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { scanReceipt } from "@/actions/transaction";

export function ReceiptScanner({ onScanComplete }) {
  const fileInputRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [hasProcessedData, setHasProcessedData] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
    error: scanError
  } = useFetch(scanReceipt);

  const handleReceiptScan = async (file) => {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    // Save file name for UI
    setSelectedFileName(file.name);

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    try {
      setIsCapturing(true);
      setHasProcessedData(false);
      await scanReceiptFn(file);
    } catch (error) {
      console.error("Error scanning receipt:", error);
      toast.error(error.message || "Failed to scan receipt");
    } finally {
      setIsCapturing(false);
    }
  };

  useEffect(() => {
    if (scannedData && !scanReceiptLoading && !hasProcessedData) {
      setHasProcessedData(true);
      toast.success("Receipt scanned successfully");
      onScanComplete(scannedData);
    }
  }, [scanReceiptLoading, scannedData, onScanComplete, hasProcessedData]);

  useEffect(() => {
    if (scanError) {
      toast.error(`Scan failed: ${scanError.message || "Unknown error"}`);
    }
  }, [scanError]);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset the input
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-6">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full h-14 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 relative hover:opacity-90 transition-opacity text-white hover:text-white"
        onClick={handleClick}
        disabled={scanReceiptLoading || isCapturing}
      >
        {scanReceiptLoading || isCapturing ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            <span>Scanning {selectedFileName || "Receipt"}...</span>
          </>
        ) : (
          <>
            <Camera className="mr-2 h-5 w-5" />
            <span>Scan Receipt with AI</span>
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Upload a receipt image to automatically extract amount, date, and other details
      </p>
    </div>
  );
}
