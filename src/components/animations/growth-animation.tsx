"use client"

import React, { useEffect, useRef } from 'react'
import { useThemeProvider } from '@/hooks/use-theme'

interface GrowthAnimationProps {
  className?: string
}

export function GrowthAnimation({ className = "" }: GrowthAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const dotsRef = useRef<Dot[]>([])
  const lastTimestampRef = useRef<number>(0)
  const { theme } = useThemeProvider()

  class Dot {
    x: number
    y: number
    baseSize: number
    size: number
    growthSpeed: number
    shrinkSpeed: number
    growing: boolean
    growthDelay: number
    timeElapsed: number

    constructor(x: number, y: number, maxGrowth: number, cycleTime: number) {
      this.x = x
      this.y = y
      this.baseSize = Math.random() * 2 + 2
      this.size = this.baseSize
      this.growthSpeed = (maxGrowth - this.baseSize) / (cycleTime / 60)
      this.shrinkSpeed = this.growthSpeed
      this.growing = Math.random() > 0.5
      this.growthDelay = Math.random() * 5000
      this.timeElapsed = 0
    }

    update(deltaTime: number, maxGrowth: number, cycleTime: number) {
      this.timeElapsed += deltaTime
      if (this.timeElapsed < this.growthDelay) return
      
      if (this.growing) {
        this.size += this.growthSpeed
        if (this.size >= maxGrowth) {
          this.growing = false
        }
      } else {
        this.size -= this.shrinkSpeed
        if (this.size <= this.baseSize) {
          this.growing = true
          this.growthDelay = Math.random() * 5000
          this.timeElapsed = 0
        }
      }
    }

    draw(ctx: CanvasRenderingContext2D, dotColor: string) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = dotColor
      ctx.fill()
    }
  }

  const createGrid = (canvas: HTMLCanvasElement) => {
    const dots: Dot[] = []
    const gridSize = 20
    const maxGrowth = 15
    const cycleTime = (20000 / 2) * 5 // 5x slower (20% of original speed)

    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = canvas.height; y > 0; y -= gridSize) {
        dots.push(new Dot(x, y, maxGrowth, cycleTime))
      }
    }
    return dots
  }

  const animate = (timestamp: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const deltaTime = timestamp - lastTimestampRef.current
    lastTimestampRef.current = timestamp

    // Clear canvas with transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Determine dot color based on theme
    const dotColor = theme === 'dark' ? '#ffffff' : '#000000'
    
    dotsRef.current.forEach(dot => {
      dot.update(deltaTime, 15, 50000) // 5x slower (20% of original speed)
      dot.draw(ctx, dotColor)
    })
    
    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Create dots
    dotsRef.current = createGrid(canvas)

    // Start animation
    lastTimestampRef.current = performance.now()
    animationRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      dotsRef.current = createGrid(canvas)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  )
}
