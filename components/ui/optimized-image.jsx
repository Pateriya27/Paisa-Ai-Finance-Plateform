"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes = "100vw",
  quality = 85,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Handle empty/invalid src
  const imageSrc = src || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
  
  useEffect(() => {
    // Reset state when src changes
    setIsLoaded(false);
    setError(false);
  }, [src]);

  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        !isLoaded && !error && "animate-pulse bg-muted",
        className
      )}
      style={{
        // Use aspect ratio if both width and height are provided
        ...(width && height && !fill ? { aspectRatio: `${width} / ${height}` } : {}),
      }}
    >
      {!error ? (
        <Image
          src={imageSrc}
          alt={alt || ""}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          quality={quality}
          priority={priority}
          fill={fill}
          sizes={sizes}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            fill && "object-cover"
          )}
          // Performance optimizations
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          {...props}
        />
      ) : (
        // Simple fallback for image errors
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <svg 
            className="w-8 h-8 text-muted-foreground" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export { OptimizedImage }; 