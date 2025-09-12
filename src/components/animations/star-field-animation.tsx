"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useThemeProvider } from '@/hooks/use-theme'
import { useScrollTimer } from '@/hooks/use-scroll-timer'
import { useMediaQuery } from '@/hooks/use-media-query'

interface StarFieldAnimationProps {
  className?: string
}

export function StarFieldAnimation({ className = "" }: StarFieldAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const [mounted, setMounted] = useState(false)
  const { theme } = useThemeProvider()
  const isMobile = useMediaQuery("(max-width: 1023px)")
  
  // Performance optimizations for mobile
  const lastFrameTimeRef = useRef(0)
  const frameInterval = isMobile ? 1000 / 20 : 1000 / 30 // 20 FPS on mobile, 30 FPS on desktop
  
  // On mobile, always animate indefinitely like a screensaver
  // On desktop, use scroll timer for timed animation
  const { elementRef, shouldAnimate: scrollShouldAnimate, isFadingOut, fadeOutDuration } = useScrollTimer({ 
    duration: 3000,
    fadeInDuration: 0, // Immediate appearance
    fadeOutDuration: 2000 // 2 seconds fade out
  })
  
  // Mobile: always animate indefinitely, Desktop: use scroll timer
  const shouldAnimate = isMobile ? true : scrollShouldAnimate

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !shouldAnimate) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    ctx.imageSmoothingEnabled = false

    const stars: { x: number; y: number; z: number; originalX: number; originalY: number }[] = []
    const starCount = isMobile ? 150 : 300 // Fewer stars on mobile for better performance
    const speed = isMobile ? 0.3 : 0.5 // Slower on mobile for stability
    const Z_MAX = 1000
    const Z_MIN = 0.1

    // Function to set canvas buffer size and initialize/re-initialize stars
    const initializeCanvasAndStars = () => {
      // Use lower DPR on mobile to reduce memory usage
      const dpr = isMobile ? 1 : (window.devicePixelRatio || 1)
      if (canvas.offsetWidth === 0 || canvas.offsetHeight === 0) {
        animationRef.current = requestAnimationFrame(initializeCanvasAndStars)
        return false
      }

      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr

      ctx.imageSmoothingEnabled = false

      stars.length = 0
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width - canvas.width / 2
        const y = Math.random() * canvas.height - canvas.height / 2
        stars.push({
          x: x,
          y: y,
          z: Math.random() * Z_MAX,
          originalX: x,
          originalY: y,
        })
      }
      return true
    }

    let animationRunning = false

    const animate = () => {
      // Frame rate limiting for better performance
      const currentTime = performance.now()
      if (currentTime - lastFrameTimeRef.current < frameInterval) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrameTimeRef.current = currentTime
      
      if (canvas.width === 0 || canvas.height === 0) {
        if (!initializeCanvasAndStars()) {
          return
        }
      }

      // Clear canvas with fade effect
      const backgroundColor = theme === 'dark' 
        ? 'rgba(0, 0, 0, 0.2)' 
        : 'rgba(255, 255, 255, 0.1)'
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const perspectiveFactor = 300
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Use theme-aware star color
      const starColor = theme === 'dark' ? '#FFFFFF' : '#000000'

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]
        star.z -= speed
        
        // Reset star to create seamless loop
        if (star.z <= Z_MIN) {
          star.z = Z_MAX
          star.x = star.originalX
          star.y = star.originalY
        }

        const projectedX = (star.x / star.z) * perspectiveFactor + centerX
        const projectedY = (star.y / star.z) * perspectiveFactor + centerY
        const opacity = Math.max(0, Math.min(1, 1 - star.z / Z_MAX))

        // Only draw stars that are within canvas bounds
        if (projectedX >= 0 && projectedX < canvas.width && projectedY >= 0 && projectedY < canvas.height) {
          ctx.fillStyle = starColor
          ctx.globalAlpha = opacity
          ctx.fillRect(Math.floor(projectedX), Math.floor(projectedY), 1, 1)
          ctx.globalAlpha = 1
        }
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    // Resize handler
    const handleResize = () => {
      if (canvasRef.current) {
        initializeCanvasAndStars()
        if (!animationRunning && canvasRef.current.width > 0 && canvasRef.current.height > 0) {
          animationRunning = true
          animate()
        }
      }
    }

    // Attempt initial setup
    if (initializeCanvasAndStars()) {
      animationRunning = true
      animate()
    } else {
      // Retry if canvas dimensions are zero
      animationRef.current = requestAnimationFrame(() => {
        if (initializeCanvasAndStars()) {
          animationRunning = true
          animate()
        }
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      animationRunning = false
    }
  }, [mounted, theme, shouldAnimate, isMobile])

  if (!mounted) {
    return null
  }

  return (
    <div ref={elementRef} className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity ${className} ${
          shouldAnimate ? (isFadingOut ? 'opacity-0' : 'opacity-100') : 'opacity-0'
        }`}
        style={{ 
          pointerEvents: 'none',
          transitionDuration: isFadingOut ? `${fadeOutDuration}ms` : '0ms'
        }}
      />
    </div>
  )
}
