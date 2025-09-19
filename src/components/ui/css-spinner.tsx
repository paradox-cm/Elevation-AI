"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CSSSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function CSSSpinner({ 
  size = "md", 
  className 
}: CSSSpinnerProps) {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  }

  return (
    <div 
      className={cn(
        "animate-spin rounded-full border-2 border-muted border-t-primary",
        sizeMap[size],
        className
      )}
    />
  )
}

// Alternative spinner with dots
export function DotsSpinner({ 
  size = "md", 
  className 
}: CSSSpinnerProps) {
  const sizeMap = {
    sm: "h-1 w-1",
    md: "h-2 w-2",
    lg: "h-3 w-3", 
    xl: "h-4 w-4"
  }

  return (
    <div className={cn("flex space-x-1", className)}>
      <div 
        className={cn(
          "rounded-full bg-primary animate-bounce",
          sizeMap[size]
        )}
        style={{ animationDelay: "0ms" }}
      />
      <div 
        className={cn(
          "rounded-full bg-primary animate-bounce",
          sizeMap[size]
        )}
        style={{ animationDelay: "150ms" }}
      />
      <div 
        className={cn(
          "rounded-full bg-primary animate-bounce",
          sizeMap[size]
        )}
        style={{ animationDelay: "300ms" }}
      />
    </div>
  )
}

// Pulse spinner
export function PulseSpinner({ 
  size = "md", 
  className 
}: CSSSpinnerProps) {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  }

  return (
    <div 
      className={cn(
        "rounded-full bg-primary animate-pulse",
        sizeMap[size],
        className
      )}
    />
  )
}
