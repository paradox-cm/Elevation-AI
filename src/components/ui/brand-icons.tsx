"use client"

import React from 'react'
import Image from "next/image"
import { cn } from "@/lib/utils"

interface BrandIconProps {
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export function Favicon({ className, width = 32, height = 32, priority = false }: BrandIconProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/images/branding/E-AI-Arrow.svg"
        alt="Elevation AI Favicon"
        width={width}
        height={height}
        priority={priority}
        className="dark:invert"
      />
    </div>
  )
}

export function AppIcon({ className, width = 64, height = 64, priority = false }: BrandIconProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/images/branding/E-AI-Squircle.svg"
        alt="Elevation AI App Icon"
        width={width}
        height={height}
        priority={priority}
        className="dark:invert"
      />
    </div>
  )
}

export function CircleIcon({ className, width = 40, height = 40, priority = false }: BrandIconProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/images/branding/E-AI-Circle.svg"
        alt="Elevation AI Circle Icon"
        width={width}
        height={height}
        priority={priority}
        className="dark:invert"
      />
    </div>
  )
}

export const CompactLogo = React.memo(function CompactLogo({ 
  className, 
  width = 60, 
  height = 21, 
  priority = true 
}: BrandIconProps) {
  // Memoize the image source to prevent unnecessary re-renders
  const imageSrc = React.useMemo(() => "/images/branding/E-AI-Compact.svg", [])
  
  return (
    <div className={cn("relative", className)}>
      <Image
        src={imageSrc}
        alt="Elevation AI Compact Logo"
        width={width}
        height={height}
        priority={priority}
        unoptimized={false}
        className="dark:invert"
      />
    </div>
  )
})
