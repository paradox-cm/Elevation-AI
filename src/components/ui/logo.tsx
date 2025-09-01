"use client"

import React from 'react'
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  width?: number
  height?: number
  priority?: boolean
  variant?: "light" | "dark"
}

export const Logo = React.memo(function Logo({ 
  className, 
  width = 120, 
  height = 21, 
  priority = true, 
  variant = "light" 
}: LogoProps) {
  // Memoize the image source to prevent unnecessary re-renders
  const imageSrc = React.useMemo(() => "/images/branding/E-AI.Logo.svg", [])
  
  return (
    <div className={cn("relative", className)}>
      <Image
        src={imageSrc}
        alt="Elevation AI Logo"
        width={width}
        height={height}
        priority={priority}
        unoptimized={false}
        className={cn(
          variant === "dark" ? "invert" : "dark:invert"
        )}
      />
    </div>
  )
})
