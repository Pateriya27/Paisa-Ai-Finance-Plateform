"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, AlertCircle, CheckCircle, AlertTriangle, Camera, RotateCcw } from "lucide-react";
import { scanReceipt } from "@/actions/transaction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function ReceiptScanner({ onScanComplete }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");
  const [showCamera, setShowCamera] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Reset all state
  const resetScanner = () => {
    setFile(null);
    setIsLoading(false);
    setError(null);
    setPreviewUrl(null);
    setActiveTab("upload");
    setShowCamera(false);
    setCameraReady(false);
    stopCamera();
  };

  // Camera setup - simplified approach
  useEffect(() => {
    // Only attempt to start camera when showCamera is true
    if (showCamera && videoRef.current && !streamRef.current) {
      startCamera();
    }
    
    // Clean up camera on unmount
    return () => {
      stopCamera();
    };
  }, [showCamera]);

  // Check if camera is available
  const checkCameraAvailability = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error("Your browser doesn't support camera access");
      return false;
    }
    
    try {
      // Quick test to see if we can get camera access
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      // If successful, stop the test stream
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error("Camera check failed:", error);
      return false;
    }
  };

  // Prepare to show camera
  const prepareCamera = async () => {
    setError(null);
    setIsLoading(true);
    
    const isCameraAvailable = await checkCameraAvailability();
    
    if (!isCameraAvailable) {
      setError("Camera access not available. Please check your browser permissions or use file upload instead.");
      setIsLoading(false);
      return;
    }
    
    // Set showCamera to true, which will trigger the useEffect
    setShowCamera(true);
    setIsLoading(false);
  };

  // Start camera with basic options
  const startCamera = async () => {
    try {
      // Basic camera options - keeping it simple
      const constraints = { 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      };
      
      // Get camera stream
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      // Store stream
      streamRef.current = stream;
      
      // Connect to video element
      if (videoRef.current) {
        // Set properties directly
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        videoRef.current.setAttribute("playsinline", "true");
        videoRef.current.setAttribute("autoplay", "true");
        
        // Force play
        try {
          await videoRef.current.play();
          setCameraReady(true);
          console.log("Camera started successfully");
        } catch (playError) {
          console.error("Error playing video:", playError);
          setError("Could not start video playback. Please try again.");
          stopCamera();
        }
      }
    } catch (err) {
      console.error("Camera access error:", err);
      
      let errorMessage = "Could not access camera. ";
      if (err.name === "NotAllowedError") {
        errorMessage += "You denied camera permission. Please enable camera access in your browser settings.";
      } else {
        errorMessage += "Please check your camera and try again.";
      }
      
      setError(errorMessage);
      stopCamera();
      setShowCamera(false);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setCameraReady(false);
  };

  // Take photo
  const capturePhoto = () => {
    if (!videoRef.current || !streamRef.current || !cameraReady) {
      toast.error("Camera is not ready yet");
      return;
    }
    
    try {
      // Create canvas at video's actual display size
      const canvas = document.createElement('canvas');
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;
      
      // Set appropriate dimensions
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      
      // Draw current video frame
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
      
      // Convert to file
      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error("Failed to capture image");
          return;
        }
        
        // Create file with unique name
        const fileName = `receipt-${Date.now()}.jpg`;
        const capturedFile = new File([blob], fileName, { 
          type: 'image/jpeg',
          lastModified: Date.now()
        });
        
        // Set as current file
        setFile(capturedFile);
        
        // Create preview URL
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
        
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        
        // Clean up camera and show preview
        stopCamera();
        setShowCamera(false);
        setActiveTab("preview");
        
        toast.success("Photo captured successfully");
      }, 'image/jpeg', 0.9);
    } catch (err) {
      console.error("Error capturing photo:", err);
      toast.error("Failed to capture photo");
    }
  };

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) {
      return;
    }
    
    // Check if file is an image
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    
    // Check file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Image file is too large. Please select an image under 5MB.");
      return;
    }
    
    setFile(selectedFile);
    setError(null);
    
    // Create preview URL
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    
    // Automatically switch to preview tab
    setActiveTab("preview");
  };

  // Handle receipt scan
  const handleReceiptScan = async () => {
    if (!file) {
      setError("Please select a receipt image first.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await scanReceipt(file);
      
      if (!data) {
        throw new Error("Failed to extract data from receipt. Please try a clearer image.");
      }

      // Format data for display
      const formattedData = {
        ...data,
        date: data.date instanceof Date ? data.date : new Date(data.date),
      };
      
      // Notify success and pass data to parent
      toast.success("Receipt scanned successfully!");
      onScanComplete(formattedData);
      
      // Reset scanner
      resetScanner();
    } catch (err) {
      console.error("Receipt scanning error:", err);
      setError(err.message || "Failed to scan receipt. Please try again.");
      toast.error(err.message || "Failed to scan receipt");
    } finally {
      setIsLoading(false);
    }
  };

  // Clear file selection
  const handleClearFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    setError(null);
    setActiveTab("upload");
  };

  return (
    <div className="w-full space-y-4">
      <Tabs value={activeTab} onValueChange={(value) => {
        // If switching away from camera tab, make sure camera is off
        if (activeTab === "upload" && showCamera) {
          stopCamera();
          setShowCamera(false);
        }
        setActiveTab(value);
      }} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Receipt</TabsTrigger>
          <TabsTrigger value="preview" disabled={!file}>Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-4 pt-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="receipt" className="text-sm font-medium">
              Receipt Image
            </Label>
            
            {showCamera ? (
              <div className="relative border rounded-lg overflow-hidden bg-black" 
                   style={{ minHeight: '300px', maxHeight: '70vh' }}>
                <video 
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/70 flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      stopCamera();
                      setShowCamera(false);
                    }}
                  >
                    Cancel
                  </Button>
                  
                  <Button 
                    onClick={capturePhoto}
                    size="sm" 
                    className="bg-red-500 hover:bg-red-600"
                    disabled={!cameraReady}
                  >
                    {!cameraReady ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : "Take Photo"}
                  </Button>
                </div>
                
                {!cameraReady && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                    <p className="text-sm">Starting camera...</p>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => document.getElementById("receipt").click()}>
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">Upload a clear image of your receipt</p>
                  
                  <input
                    type="file"
                    id="receipt"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="text-center">
                  <span className="text-xs text-gray-500">- or -</span>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  onClick={prepareCamera}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Preparing Camera...
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 h-4 w-4" />
                      Take Photo with Camera
                    </>
                  )}
                </Button>
              </>
            )}
            
            {error && (
              <div className="flex items-center space-x-2 text-red-500 mt-2 p-3 bg-red-50 rounded-md">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-4 pt-4">
          {previewUrl && (
            <div className="space-y-4">
              <div className="relative border rounded-md overflow-hidden bg-black/5">
                <img 
                  src={previewUrl} 
                  alt="Receipt preview" 
                  className="max-h-[400px] w-full object-contain"
                />
              </div>
              
              <div className="flex justify-between space-x-4">
                <Button
                  variant="outline"
                  onClick={handleClearFile}
                  disabled={isLoading}
                  className="flex-1"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Change Image
                </Button>
                
                <Button
                  onClick={handleReceiptScan}
                  disabled={isLoading || !file}
                  className="flex-1"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    "Scan Receipt"
                  )}
                </Button>
              </div>
              
              {error && (
                <div className="flex items-start space-x-2 text-red-500 bg-red-50 p-3 rounded-md">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Failed to scan receipt</p>
                    <p className="text-xs">{error}</p>
                    <p className="text-xs mt-1">Suggestion: Try a clearer image with good lighting and make sure all text is visible</p>
                  </div>
                </div>
              )}
              
              {!error && (
                <div className="text-xs text-gray-500">
                  <p>Tip: For best results, ensure:</p>
                  <ul className="list-disc list-inside ml-2 mt-1">
                    <li>Good lighting with no shadows</li>
                    <li>All receipt text is clearly visible</li>
                    <li>Receipt is not crumpled or torn</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 