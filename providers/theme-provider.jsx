"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={true}
      {...props}
    >
      <ThemeLayoutStabilizer />
      {children}
    </NextThemesProvider>
  )
}

// Enhanced component to prevent layout shifts during theme changes
function ThemeLayoutStabilizer() {
  const [themeTransitioning, setThemeTransitioning] = React.useState(false);
  
  React.useEffect(() => {
    // Set a CSS variable for controlling transitions
    document.documentElement.style.setProperty(
      '--theme-transition-duration', 
      '0.2s'
    );
    
    // Add global listener for theme changes
    const handleThemeChange = () => {
      // Briefly disable all transitions
      setThemeTransitioning(true);
      document.documentElement.classList.add('disable-transitions');
      
      // After a short delay, re-enable transitions
      setTimeout(() => {
        document.documentElement.classList.remove('disable-transitions');
        document.documentElement.classList.add('theme-transition-ready');
        setThemeTransitioning(false);
      }, 10);
    };
    
    // Listen for theme changes
    window.addEventListener('themeChange', handleThemeChange);
    
    // Initially add transition class
    document.documentElement.classList.add('theme-transition-ready');
    
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
      document.documentElement.classList.remove('theme-transition-ready');
    };
  }, []);
  
  return null;
} 