"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useThemeProvider } from '@/hooks/use-theme'
import { useScrollTriggeredAnimation } from '@/hooks/use-scroll-triggered-animation'

interface StarFieldAnimationProps {
  className?: string
  scrollTriggered?: boolean // New prop to enable scroll-triggered behavior
}

export function StarFieldAnimation({ className = "", scrollTriggered = false }: StarFieldAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const [mounted, setMounted] = useState(false)
  const { theme } = useThemeProvider()
  
  // Scroll-triggered animation hook
  const { containerRef, isPlaying } = useScrollTriggeredAnimation({
    duration: 3000, // 3 seconds
    threshold: 0.1
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    ctx.imageSmoothingEnabled = false

    const stars: { x: number; y: number; z: number; originalX: number; originalY: number }[] = []
    const starCount = 300
    const speed = 0.5
    const Z_MAX = 1000
    const Z_MIN = 0.1

    // If scroll-triggered and not playing, don't start animation
    if (scrollTriggered && !isPlaying) {
      return
    }

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
  }, [mounted, theme, scrollTriggered, isPlaying])

  if (!mounted) {
    return null
  }

  // If scroll-triggered, wrap in container div
  if (scrollTriggered) {
    return (
      <div ref={containerRef} className={`absolute inset-0 w-full h-full ${className}`}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
        />
      </div>
    )
  }

  // Default behavior (always playing)
  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  )
}
