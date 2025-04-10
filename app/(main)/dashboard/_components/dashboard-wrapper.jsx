"use client";

import { Container } from "@/components/ui/container";
import { useEffect, useState, useCallback } from "react";

const DashboardWrapper = ({ children }) => {
  // Start with loaded state to avoid flashing
  const [isLoaded, setIsLoaded] = useState(true);
  
  // Simplified ref callback to avoid scrolling issues
  const contentLoadedRef = useCallback((node) => {
    if (node) {
      // Mark as visible immediately without adding styles that block scrolling
      node.style.opacity = '1';
      
      // Preconnect to critical resources
      const links = [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://api.clerk.dev' }
      ];
      
      // Add preconnect links in a non-blocking way
      if (window.requestIdleCallback) {
        requestIdleCallback(() => {
          links.forEach(link => {
            const linkEl = document.createElement('link');
            Object.keys(link).forEach(attr => {
              linkEl.setAttribute(attr, link[attr]);
            });
            document.head.appendChild(linkEl);
          });
        });
      }
    }
  }, []);

  useEffect(() => {
    // Immediately dispatch event
    const completeEvent = new CustomEvent('navigationComplete');
    window.dispatchEvent(completeEvent);
    
    // Remove transition class immediately
    document.body.classList.remove('page-transitioning');
    
    // Make sure scrolling is enabled
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    return () => {
      // Clean up
    };
  }, []);

  return (
    <Container>
      <div 
        ref={contentLoadedRef}
        className="dashboard-content-wrapper"
        style={{ 
          // Allow normal scrolling behavior
          minHeight: "100vh",
          position: "relative",
          zIndex: 1
        }}
      >
        {children}
      </div>
    </Container>
  );
};

export default DashboardWrapper; 