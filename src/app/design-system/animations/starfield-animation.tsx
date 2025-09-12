"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface StarfieldAnimationProps {
  className?: string
  starCount?: number
  speed?: number
  zMax?: number
  perspectiveFactor?: number
  backgroundColor?: string
  starColor?: string
  variant?: "default" | "platform" | "hero"
}

export function StarfieldAnimation({ 
  className = "",
  starCount = 300,
  speed = 0.5,
  zMax = 1000,
  perspectiveFactor = 300,
  backgroundColor = "rgba(0, 0, 0, 0.2)",
  starColor = "#FFFFFF",
  variant = "default"
}: StarfieldAnimationProps) {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>(0)
  const starsRef = useRef<{ x: number; y: number; z: number }[]>([])
  const lastCanvasSizeRef = useRef<{ width: number; height: number } | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Starfield Animation useEffect
  useEffect(() => {
    if (!mounted) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) {
      return
    }

    ctx.imageSmoothingEnabled = false

    // Function to set canvas buffer size and initialize/re-initialize stars
    const initializeCanvasAndStars = (forceRecreate = false) => {
      const dpr = window.devicePixelRatio || 1
      if (canvas.offsetWidth === 0 || canvas.offsetHeight === 0) {
        animationFrameId.current = requestAnimationFrame(() => initializeCanvasAndStars(forceRecreate))
        return false
      }

      const newWidth = canvas.offsetWidth * dpr
      const newHeight = canvas.offsetHeight * dpr
      
      // Check if dimensions actually changed significantly (more than 1 pixel difference)
      const lastSize = lastCanvasSizeRef.current
      const dimensionsChanged = !lastSize || 
        Math.abs(newWidth - lastSize.width) > 1 || 
        Math.abs(newHeight - lastSize.height) > 1

      // Debug logging (can be removed in production)
      if (dimensionsChanged && lastSize) {
        console.log('Starfield: Dimensions changed significantly', {
          old: lastSize,
          new: { width: newWidth, height: newHeight },
          delta: { width: newWidth - lastSize.width, height: newHeight - lastSize.height }
        })
      }

      // Only recreate stars if dimensions changed significantly or forced
      if (dimensionsChanged || forceRecreate) {
        canvas.width = newWidth
        canvas.height = newHeight
        ctx.imageSmoothingEnabled = false

        // Update the tracked dimensions
        lastCanvasSizeRef.current = { width: newWidth, height: newHeight }

        // Only recreate stars if dimensions changed or forced
        if (dimensionsChanged || forceRecreate) {
          starsRef.current.length = 0
          for (let i = 0; i < starCount; i++) {
            starsRef.current.push({
              x: Math.random() * canvas.width - canvas.width / 2,
              y: Math.random() * canvas.height - canvas.height / 2,
              z: Math.random() * zMax,
            })
          }
        }
      } else {
        // Just update canvas size without recreating stars
        canvas.width = newWidth
        canvas.height = newHeight
        ctx.imageSmoothingEnabled = false
      }
      
      return true
    }

    let animationRunning = false

    const animate = () => {
      if (canvas.width === 0 || canvas.height === 0) {
        if (!initializeCanvasAndStars()) {
          return
        }
      }

      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      for (let i = 0; i < starsRef.current.length; i++) {
        const star = starsRef.current[i]
        star.z -= speed
        if (star.z <= 0) {
          star.z = zMax
          star.x = Math.random() * canvas.width - canvas.width / 2
          star.y = Math.random() * canvas.height - canvas.height / 2
        }

        const projectedX = (star.x / star.z) * perspectiveFactor + centerX
        const projectedY = (star.y / star.z) * perspectiveFactor + centerY
        const opacity = 1 - star.z / zMax

        ctx.fillStyle = starColor
        ctx.globalAlpha = opacity
        ctx.fillRect(Math.floor(projectedX), Math.floor(projectedY), 1, 1)
        ctx.globalAlpha = 1
      }
      animationFrameId.current = requestAnimationFrame(animate)
    }

    // Resize handler - only recreates stars when dimensions actually change
    const handleResize = () => {
      if (canvasRef.current) {
        initializeCanvasAndStars(false) // Don't force recreate, let it check dimensions
        if (!animationRunning && canvasRef.current.width > 0 && canvasRef.current.height > 0) {
          animationRunning = true
          animate()
        }
      }
    }

    // Attempt initial setup - force recreation on first load
    if (initializeCanvasAndStars(true)) {
      animationRunning = true
      animate()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      animationRunning = false
      lastCanvasSizeRef.current = null
    }
  }, [mounted, starCount, speed, zMax, perspectiveFactor, backgroundColor, starColor])

  if (!mounted) {
    return null
  }

  return (
    <canvas 
      ref={canvasRef} 
      className={cn("absolute inset-0 w-full h-full", className)} 
      style={{ zIndex: 0 }} 
    />
  )
}

// Platform variant with different settings
export function StarfieldAnimationPlatform({ 
  className = "",
  ...props 
}: Omit<StarfieldAnimationProps, 'variant'>) {
  return (
    <StarfieldAnimation
      {...props}
      className={className}
      starCount={400}
      speed={0.3}
      zMax={1200}
      perspectiveFactor={350}
      backgroundColor="rgba(0, 0, 0, 0.1)"
      starColor="#FFFFFF"
    />
  )
}

// Hero variant with different settings
export function StarfieldAnimationHero({ 
  className = "",
  ...props 
}: Omit<StarfieldAnimationProps, 'variant'>) {
  return (
    <StarfieldAnimation
      {...props}
      className={className}
      starCount={500}
      speed={0.8}
      zMax={800}
      perspectiveFactor={250}
      backgroundColor="rgba(0, 0, 0, 0.3)"
      starColor="#FFFFFF"
    />
  )
}
