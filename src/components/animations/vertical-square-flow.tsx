"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useCanvasResize } from "@/hooks/use-canvas-resize"

interface Square {
  x: number
  y: number
  size: number
  speed: number
  direction: number
}

interface VerticalSquareFlowProps {
  width?: number
  height?: number
  className?: string
  squareCount?: number
  maxSpeed?: number
}

export function VerticalSquareFlow({ 
  width = 600, 
  height = 400, 
  className = "",
  squareCount = 1000,
  maxSpeed = 0.1
}: VerticalSquareFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const squaresRef = useRef<Square[]>([])
  const [isPlaying, setIsPlaying] = useState(true)
  
  // Performance optimization: frame rate limiting
  const lastFrameTimeRef = useRef(0)
  const targetFPS = 60
  const frameInterval = 1000 / targetFPS

  // Fixed blue color
  const squareColorRef = useRef('#3b82f6') // Blue-500
  const observerRef = useRef<MutationObserver | null>(null)

  const createSquares = useCallback((canvas: HTMLCanvasElement) => {
    const squares: Square[] = []
    const logicalWidth = canvas.width / (window.devicePixelRatio || 1)
    const logicalHeight = canvas.height / (window.devicePixelRatio || 1)
    
    for (let i = 0; i < squareCount; i++) {
      // 2% are 6x6, others between 1.5-3px (scaled for canvas size) - medium squares
      const baseSize = Math.random() < 0.02 ? 6 : Math.random() * 1.5 + 1.5
      const size = Math.min(baseSize, Math.min(logicalWidth, logicalHeight) * 0.015) // Scale with canvas size - medium multiplier
      const speed = Math.random() * maxSpeed + 0.2
      
      squares.push({
        x: Math.random() * logicalWidth,
        y: Math.random() * logicalHeight,
        size,
        speed,
        direction: Math.random() > 0.5 ? 1 : -1 // Randomly move up or down
      })
    }
    
    return squares
  }, [squareCount, maxSpeed])

  const animateSquares = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    if (!isPlaying) return

    // Frame rate limiting for consistent performance
    const currentTime = performance.now()
    if (currentTime - lastFrameTimeRef.current < frameInterval) {
      animationRef.current = requestAnimationFrame(() => animateSquares(canvas, ctx))
      return
    }
    lastFrameTimeRef.current = currentTime

    // Clear canvas completely (transparent background)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const squares = squaresRef.current
    const logicalWidth = canvas.width / (window.devicePixelRatio || 1)
    const logicalHeight = canvas.height / (window.devicePixelRatio || 1)
    
    // Set fill color
    ctx.fillStyle = squareColorRef.current
    
    // Update and draw squares
    squares.forEach(square => {
      // Update position
      square.y += square.speed * square.direction
      
      // Wrap around screen
      if (square.y > logicalHeight) {
        square.y = 0
      }
      if (square.y < 0) {
        square.y = logicalHeight
      }
      
      // Draw square
      ctx.fillRect(square.x, square.y, square.size, square.size)
    })

    animationRef.current = requestAnimationFrame(() => animateSquares(canvas, ctx))
  }, [isPlaying])

  // Initialize canvas and start animation
  const initializeAndStartAnimation = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // High-DPI support
    const devicePixelRatio = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    
    // Set canvas size accounting for device pixel ratio
    canvas.width = rect.width * devicePixelRatio
    canvas.height = rect.height * devicePixelRatio
    
    // Scale the drawing context to match device pixel ratio
    ctx.scale(devicePixelRatio, devicePixelRatio)
    
    // Set the canvas CSS size to the logical size
    canvas.style.width = rect.width + 'px'
    canvas.style.height = rect.height + 'px'

    // Create squares with new dimensions
    squaresRef.current = createSquares(canvas)

    // Start animation
    animateSquares(canvas, ctx)
  }, [createSquares, animateSquares])

  // Use canvas resize hook
  useCanvasResize(canvasRef, initializeAndStartAnimation, {
    debounceDelay: 150,
    preserveAspectRatio: false // Allow free-form resizing for background
  })

  useEffect(() => {
    // Start initial animation
    initializeAndStartAnimation()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initializeAndStartAnimation])

  return (
    <div className={`absolute inset-0 ${className}`}>
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          width: '100%', 
          height: '100%'
        }}
      />
    </div>
  )
}
