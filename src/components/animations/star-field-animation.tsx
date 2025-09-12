"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useThemeProvider } from '@/hooks/use-theme'

interface StarFieldAnimationProps {
  className?: string
}

export function StarFieldAnimation({ className = "" }: StarFieldAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const [mounted, setMounted] = useState(false)
  const { theme } = useThemeProvider()

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

    const stars: { x: number; y: number; z: number }[] = []
    const starCount = 300
    const speed = 0.5
    const Z_MAX = 1000

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
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * Z_MAX,
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
        if (star.z <= 0) {
          star.z = Z_MAX
          star.x = Math.random() * canvas.width - canvas.width / 2
          star.y = Math.random() * canvas.height - canvas.height / 2
        }

        const projectedX = (star.x / star.z) * perspectiveFactor + centerX
        const projectedY = (star.y / star.z) * perspectiveFactor + centerY
        const opacity = 1 - star.z / Z_MAX

        ctx.fillStyle = starColor
        ctx.globalAlpha = opacity
        ctx.fillRect(Math.floor(projectedX), Math.floor(projectedY), 1, 1)
        ctx.globalAlpha = 1
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
  }, [mounted, theme])

  if (!mounted) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  )
}
