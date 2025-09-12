"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useThemeProvider } from '@/hooks/use-theme'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface StarFieldAnimationPlatformProps {
  className?: string
}

export function StarFieldAnimationPlatform({ className = "" }: StarFieldAnimationPlatformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useThemeProvider()
  const prefersReducedMotion = useReducedMotion()

  // Performance optimizations
  const lastFrameTimeRef = useRef(0)
  const frameInterval = 1000 / 30 // 30 FPS instead of 60 FPS
  const isAnimatingRef = useRef(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Intersection Observer for visibility-based animation control
  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(canvas)

    return () => {
      observer.disconnect()
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted || !isVisible || prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { 
      willReadFrequently: false, // Optimize for performance
      alpha: true
    })
    if (!ctx) return

    ctx.imageSmoothingEnabled = false

    const stars: { x: number; y: number; z: number; originalX: number; originalY: number }[] = []
    const starCount = 200 // Reduced from 300 for better performance
    const speed = 0.3 // Reduced speed for smoother animation
    const Z_MAX = 1000
    const Z_MIN = 0.1

    // Function to set canvas buffer size and initialize/re-initialize stars
    const initializeCanvasAndStars = () => {
      const dpr = window.devicePixelRatio || 1
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

      // Stop animation if not visible
      if (!isVisible) {
        isAnimatingRef.current = false
        return
      }

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

      // Batch drawing operations for better performance
      ctx.fillStyle = starColor
      ctx.beginPath()

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

        // Only draw stars that are within canvas bounds and have sufficient opacity
        if (projectedX >= 0 && projectedX < canvas.width && 
            projectedY >= 0 && projectedY < canvas.height && 
            opacity > 0.1) {
          ctx.globalAlpha = opacity
          ctx.fillRect(Math.floor(projectedX), Math.floor(projectedY), 1, 1)
        }
      }
      
      ctx.globalAlpha = 1
      isAnimatingRef.current = true
      animationRef.current = requestAnimationFrame(animate)
    }

    // Resize handler
    const handleResize = () => {
      if (canvasRef.current) {
        initializeCanvasAndStars()
        if (!animationRunning && canvasRef.current.width > 0 && canvasRef.current.height > 0 && isVisible) {
          animationRunning = true
          animate()
        }
      }
    }

    // Start animation if visible
    if (isVisible) {
      if (initializeCanvasAndStars()) {
        animationRunning = true
        animate()
      } else {
        // Retry if canvas dimensions are zero
        animationRef.current = requestAnimationFrame(() => {
          if (initializeCanvasAndStars() && isVisible) {
            animationRunning = true
            animate()
          }
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      animationRunning = false
      isAnimatingRef.current = false
    }
  }, [mounted, theme, isVisible, prefersReducedMotion])

  if (!mounted) {
    return null
  }

  // Show static background for reduced motion
  if (prefersReducedMotion) {
    return (
      <div 
        className={`absolute inset-0 w-full h-full ${className}`}
        style={{ 
          pointerEvents: 'none',
          background: theme === 'dark' 
            ? 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.1) 0%, transparent 70%)'
        }}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  )
}
