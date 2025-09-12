"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useThemeProvider } from '@/hooks/use-theme'
import { useScrollTimer } from '@/hooks/use-scroll-timer'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface BusinessDataAnimationWithTimerProps {
  className?: string
}

export function BusinessDataAnimationWithTimer({ className = "" }: BusinessDataAnimationWithTimerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const linesRef = useRef<Array<{
    x: number
    y: number
    offset: number
    direction: number
    speed: number
  }>>([])
  const { theme } = useThemeProvider()
  const { elementRef, shouldAnimate, isFadingOut, fadeOutDuration } = useScrollTimer({ 
    duration: 3000,
    fadeInDuration: 0, // Immediate appearance
    fadeOutDuration: 6000, // 6 seconds fade out
    threshold: 0.01 // Very low threshold to trigger immediately
  })

  // Performance optimizations
  const lastFrameTimeRef = useRef(0)
  const frameInterval = 1000 / 30 // 30 FPS instead of 60 FPS
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const cols = 8
  const rows = 24

  // Intersection Observer for visibility-based animation control
  useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (!shouldAnimate || !isVisible || prefersReducedMotion) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { 
      willReadFrequently: false, // Optimize for performance
      alpha: true
    })
    if (!ctx) return

    let spacingX = 0
    let spacingY = 0

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      spacingX = Math.floor(canvas.width / cols)
      spacingY = Math.floor(canvas.height / rows)
      initializeLines()
    }

    const initializeLines = () => {
      linesRef.current = []
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          linesRef.current.push({
            x: x * spacingX + spacingX / 2,
            y: y * spacingY + spacingY / 2,
            offset: Math.random() * 10 - 5,
            direction: Math.random() > 0.5 ? 1 : -1,
            speed: Math.random() * 0.25 + 0.25
          })
        }
      }
    }

    const animateLines = () => {
      // Frame rate limiting for better performance
      const currentTime = performance.now()
      if (currentTime - lastFrameTimeRef.current < frameInterval) {
        animationRef.current = requestAnimationFrame(animateLines)
        return
      }
      lastFrameTimeRef.current = currentTime

      // Stop animation if not visible
      if (!isVisible) {
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Use theme-aware color
      const color = theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
      ctx.fillStyle = color

      // Batch drawing operations for better performance
      ctx.beginPath()
      linesRef.current.forEach(line => {
        line.offset += line.speed * line.direction
        if (Math.abs(line.offset) > spacingX / 3) {
          line.direction *= -1
        }

        ctx.fillRect(line.x + line.offset, line.y, 0.5, 3)
      })

      animationRef.current = requestAnimationFrame(animateLines)
    }

    // Initial setup
    resizeCanvas()
    animateLines()

    // Add resize listener
    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [theme, shouldAnimate, isVisible, prefersReducedMotion])

  // Show static fallback for reduced motion
  if (prefersReducedMotion) {
    return (
      <div ref={elementRef} className="relative w-full h-full">
        <div 
          className={`absolute inset-0 w-full h-full transition-opacity ${className} ${
            shouldAnimate ? (isFadingOut ? 'opacity-0' : 'opacity-100') : 'opacity-0'
          }`}
          style={{ 
            pointerEvents: 'none',
            transitionDuration: isFadingOut ? `${fadeOutDuration}ms` : '0ms',
            background: theme === 'dark' 
              ? 'linear-gradient(45deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.05) 75%), linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.05) 75%)'
              : 'linear-gradient(45deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, 0.05) 75%), linear-gradient(-45deg, transparent 75%, rgba(0, 0, 0, 0.05) 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        />
      </div>
    )
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
