"use client"

import React, { useEffect, useRef } from 'react'
import { useThemeProvider } from '@/hooks/use-theme'

interface BusinessDataAnimationProps {
  className?: string
}

export function BusinessDataAnimation({ className = "" }: BusinessDataAnimationProps) {
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

  const cols = 8
  const rows = 24

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
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
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Use theme-aware color
      const color = theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
      ctx.fillStyle = color

      linesRef.current.forEach(line => {
        line.offset += line.speed * line.direction
        if (Math.abs(line.offset) > spacingX / 3) {
          line.direction *= -1
        }

        ctx.fillRect(line.x + line.offset, line.y, 0.5, 3)
      })

      animationRef.current = requestAnimationFrame(animateLines)
    }

    const handleResize = () => {
      resizeCanvas()
    }

    // Initialize
    resizeCanvas()
    animateLines()

    // Add resize listener
    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  )
}
