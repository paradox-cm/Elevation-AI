"use client"

import { useEffect, useRef, useState } from "react"

interface TradeLine {
  x: number
  y: number
  dir: 'horizontal' | 'vertical'
  speed: number
}

interface IntelligentProcessAutomationProps {
  width?: number
  height?: number
  className?: string
  showBorder?: boolean
}

export function IntelligentProcessAutomation({ 
  width = 600, 
  height = 400, 
  className = "",
  showBorder = true 
}: IntelligentProcessAutomationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const trafficRef = useRef<TradeLine[]>([])
  const [isPlaying, setIsPlaying] = useState(true)

  // Define wider boundary area for grid and traffic (closer to 16:9 aspect ratio)
  const gridBoundary = {
    x: width * 0.203, // Start 20.3% from left edge (adjusted for wider area)
    y: height * 0.25, // Start 25% from top edge
    width: width * 0.593, // 59.3% of canvas width
    height: height * 0.5  // 50% of canvas height
  }

  // Theme-aware colors - will be set in useEffect
  let isDark = false
  let gridColor = 'rgba(0, 0, 0, 0.2)'
  let lineColor = '#4B5563'

  // Theme change observer - will be created in useEffect
  let observer: MutationObserver

  const createTraffic = (canvas: HTMLCanvasElement) => {
    const traffic: TradeLine[] = []
    const gridSize = 32
    const speedFactor = 0.6
    
    // Create traffic only within the smaller boundary area
    for (let x = gridBoundary.x; x < gridBoundary.x + gridBoundary.width; x += gridSize * 3) {
      for (let y = gridBoundary.y; y < gridBoundary.y + gridBoundary.height; y += gridSize * 3) {
        traffic.push({
          x,
          y,
          dir: Math.random() > 0.5 ? 'horizontal' : 'vertical',
          speed: (Math.random() * 2 + 1) * speedFactor
        })
      }
    }
    return traffic
  }

  const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    if (!isPlaying) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Cache values for performance
    const gridSize = 32
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    
    // Draw dots at grid intersections
    ctx.fillStyle = gridColor
    const dotSize = 2 // Size of each intersection dot
    
    // Draw dots only within the smaller boundary area
    for (let x = gridBoundary.x; x <= gridBoundary.x + gridBoundary.width; x += gridSize) {
      for (let y = gridBoundary.y; y <= gridBoundary.y + gridBoundary.height; y += gridSize) {
        ctx.beginPath()
        ctx.arc(x, y, dotSize, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    // Batch traffic drawing operations
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 1
    ctx.beginPath()
    
    // Update and draw traffic
    trafficRef.current.forEach(tradeLine => {
      // Update position
      if (tradeLine.dir === 'horizontal') {
        tradeLine.x += tradeLine.speed
        if (tradeLine.x > gridBoundary.x + gridBoundary.width) tradeLine.x = gridBoundary.x - gridSize
      } else {
        tradeLine.y += tradeLine.speed
        if (tradeLine.y > gridBoundary.y + gridBoundary.height) tradeLine.y = gridBoundary.y - gridSize
      }
      
      // Add to batch path instead of individual strokes
      if (tradeLine.dir === 'horizontal') {
        ctx.moveTo(tradeLine.x, tradeLine.y)
        ctx.lineTo(tradeLine.x + gridSize * 0.7, tradeLine.y) // Reduced line length to 70% of grid size
      } else {
        ctx.moveTo(tradeLine.x, tradeLine.y)
        ctx.lineTo(tradeLine.x, tradeLine.y + gridSize * 0.7) // Reduced line length to 70% of grid size
      }
    })
    
    // Single stroke for all traffic lines
    ctx.stroke()

    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx))
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = width
    canvas.height = height

    // Initialize theme-aware colors
    isDark = document.documentElement.classList.contains('dark')
    gridColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)' // Solid white for dark mode, solid black for light mode
    lineColor = isDark ? '#ffffff' : '#000000' // Solid white for dark mode, solid black for light mode

    // Create theme change observer
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          isDark = document.documentElement.classList.contains('dark')
          gridColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)' // Solid white for dark mode, solid black for light mode
          lineColor = isDark ? '#ffffff' : '#000000' // Solid white for dark mode, solid black for light mode
        }
      })
    })

    // Start observing theme changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Create initial traffic
    trafficRef.current = createTraffic(canvas)
    
    if (isPlaying) {
      animate(canvas, ctx)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (observer) {
        observer.disconnect()
      }
    }
  }, [width, height, isPlaying])

  return (
    <div className={`flex justify-center ${className}`}>
      <div className={`${showBorder ? 'bg-muted/50 rounded-lg p-4 border border-border' : ''}`}>
        <canvas 
          ref={canvasRef}
          className="rounded-lg"
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      </div>
    </div>
  )
}
