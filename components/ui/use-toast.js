"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast as useToastOriginal } from "@/components/ui/use-toast-primitive"

export const ToastContext = ({ children }) => {
  return (
    <ToastProvider>
      {children}
      <ToastViewport />
    </ToastProvider>
  )
}

export const useToast = () => {
  const { toast } = useToastOriginal()
  
  return {
    toast: ({ title, description, ...props }) => {
      return toast({
        title,
        description,
        ...props,
        className: props.className,
      })
    },
  }
} 