"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  
  // Only render the toggle on the client to prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Function to handle theme change with layout stabilization
  const handleThemeChange = React.useCallback((newTheme) => {
    // Dispatch event before changing theme
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { newTheme } }));
    
    // Set theme after a short delay
    setTimeout(() => {
      setTheme(newTheme);
    }, 0);
  }, [setTheme]);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="h-9 w-9 rounded-full relative">
        <div className="w-4 h-4 bg-transparent" />
        <span className="sr-only">Loading theme</span>
      </Button>
    )
  }

  return (
    <div className="relative no-transition">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-9 w-9 rounded-full relative overflow-hidden"
          >
            <div className="relative w-4 h-4">
              <Sun className="h-4 w-4 absolute inset-0" />
              <Moon className="h-4 w-4 absolute inset-0 opacity-0 dark:opacity-100" />
            </div>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[8rem]">
          <DropdownMenuItem onClick={() => handleThemeChange("light")} className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange("dark")} className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange("system")} className="flex items-center gap-2">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 