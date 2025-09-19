"use client"

import { LoadingAnimation } from "@/components/animations/loading-animation"
import { cn } from "@/lib/utils"

interface LogoLoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "minimal"
  className?: string
}

export function LogoLoadingSpinner({ 
  size = "md", 
  variant = "default",
  className 
}: LogoLoadingSpinnerProps) {
  const sizeMap = {
    sm: 60,
    md: 82,
    lg: 120
  }

  const animationSize = sizeMap[size]

  if (variant === "minimal") {
    return (
      <LoadingAnimation 
        size={animationSize}
        strokeWidth={size === "sm" ? 3 : size === "md" ? 4 : 6}
        glowIntensity={0.1}
        duration={1.0}
        className={cn("text-primary", className)}
      />
    )
  }

  return (
    <LoadingAnimation 
      size={animationSize}
      strokeWidth={size === "sm" ? 4 : size === "md" ? 6 : 8}
      glowIntensity={size === "sm" ? 0.15 : 0.2}
      duration={1.0}
      className={className}
    />
  )
}
