"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  width?: number
  height?: number
  priority?: boolean
  variant?: "light" | "dark"
}

export function Logo({ className, width = 120, height = 21, priority = false, variant = "light" }: LogoProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/images/branding/E-AI.Logo.svg"
        alt="Elevation AI Logo"
        width={width}
        height={height}
        priority={priority}
        className={cn(
          variant === "dark" ? "invert" : "dark:invert"
        )}
      />
    </div>
  )
}
