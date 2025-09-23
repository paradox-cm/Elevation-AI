"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { useThemeProvider } from "@/hooks/use-theme"

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
  const starsRef = useRef<{ x: number; y: number; z: number; originalX: number; originalY: number }[]>([])
  const lastCanvasSizeRef = useRef<{ width: number; height: number } | null>(null)
  const lastFrameTimeRef = useRef(0)
  const frameInterval = 1000 / 30 // 30 FPS for better performance
  const { isDark } = useThemeProvider()

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
            const x = Math.random() * canvas.width - canvas.width / 2
            const y = Math.random() * canvas.height - canvas.height / 2
            starsRef.current.push({
              x: x,
              y: y,
              z: Math.random() * zMax,
              originalX: x,
              originalY: y,
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
      // Frame rate limiting for better performance
      const currentTime = performance.now()
      if (currentTime - lastFrameTimeRef.current < frameInterval) {
        animationFrameId.current = requestAnimationFrame(animate)
        return
      }
      lastFrameTimeRef.current = currentTime
      
      if (canvas.width === 0 || canvas.height === 0) {
        if (!initializeCanvasAndStars()) {
          return
        }
      }

      // Clear canvas with fade effect - shorter trails in light mode
      const fadeBackgroundColor = isDark 
        ? 'rgba(0, 0, 0, 0.2)' 
        : 'rgba(255, 255, 255, 0.3)'
      ctx.fillStyle = fadeBackgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Use theme-aware star color
      const starColor = isDark ? '#FFFFFF' : '#000000'

      for (let i = 0; i < starsRef.current.length; i++) {
        const star = starsRef.current[i]
        star.z -= speed
        
        // Reset star to create seamless loop
        if (star.z <= 0.1) {
          star.z = zMax
          star.x = star.originalX
          star.y = star.originalY
        }

        const projectedX = (star.x / star.z) * perspectiveFactor + centerX
        const projectedY = (star.y / star.z) * perspectiveFactor + centerY
        const opacity = Math.max(0, Math.min(1, 1 - star.z / zMax))

        // Only draw stars that are within canvas bounds
        if (projectedX >= 0 && projectedX < canvas.width && projectedY >= 0 && projectedY < canvas.height) {
          ctx.fillStyle = starColor
          ctx.globalAlpha = opacity
          
          // Use theme-aware star sizes: smaller on dark mode, current size on light mode
          const baseSize = isDark ? 1.2 : 1.5
          const starSize = Math.max(1, Math.floor(baseSize + (1 - star.z / zMax) * (isDark ? 1.2 : 1.5)))
          const halfSize = Math.floor(starSize / 2)
          
          ctx.fillRect(
            Math.floor(projectedX) - halfSize, 
            Math.floor(projectedY) - halfSize, 
            starSize, 
            starSize
          )
          ctx.globalAlpha = 1
        }
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
  }, [mounted, starCount, speed, zMax, perspectiveFactor, backgroundColor, starColor, isDark])

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
  const { isDark } = useThemeProvider()
  
  return (
    <StarfieldAnimation
      {...props}
      className={className}
      starCount={400}
      speed={0.3}
      zMax={1200}
      perspectiveFactor={350}
      backgroundColor={isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"}
      starColor={isDark ? "#FFFFFF" : "#000000"}
    />
  )
}

// Hero variant with different settings
export function StarfieldAnimationHero({ 
  className = "",
  ...props 
}: Omit<StarfieldAnimationProps, 'variant'>) {
  const { isDark } = useThemeProvider()
  
  return (
    <StarfieldAnimation
      {...props}
      className={className}
      starCount={500}
      speed={0.8}
      zMax={800}
      perspectiveFactor={250}
      backgroundColor={isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)"}
      starColor={isDark ? "#FFFFFF" : "#000000"}
    />
  )
}
