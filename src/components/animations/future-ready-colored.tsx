"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useCanvasResize } from "@/hooks/use-canvas-resize"

interface Arrow {
  x: number
  y: number
  opacity: number
  delay: number
  originalX: number
  originalY: number
  color: string
}

interface FutureReadyColoredProps {
  width?: number
  height?: number
  className?: string
  showBorder?: boolean
}

export function FutureReadyColored({ 
  width = 600, 
  height = 400, 
  className = "",
  showBorder = true 
}: FutureReadyColoredProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const arrowsRef = useRef<Arrow[]>([])
  const [isPlaying, _setIsPlaying] = useState(true)
  
  // Performance optimization: frame rate limiting and constants
  const lastFrameTimeRef = useRef(0)
  const targetFPS = 60
  const frameInterval = 1000 / targetFPS

  // Animation state for persistence across resizes
  const animationTimeRef = useRef(0)
  const isStartingUpRef = useRef(true)
  const startupDelayRef = useRef(0)

  // Color palette from design system
  const colors = [
    '#0e62fd', // Elevation (Primary Blue)
    '#7458f4', // Periwinkle (Secondary Purple)
    '#12c55d', // Green (Success)
    '#ebbc48', // Gold (Warning)
    '#e433c3', // Magenta (Creative)
    '#5bc8f7', // Cyan (Info)
    '#df3523', // Red (Error)
  ]

  // E-AI-Arrow SVG path data
  const arrowPathData = "M91.7,158.3c-7.2,0-13.1-5.9-13.1-13.1v-40.1c0-11.1-9-20.1-20.1-20.1H13.1c-7.2,0-13.1-5.9-13.1-13.1V13.1C0,5.9,5.9,0,13.1,0h137.5c7.2,0,13.1,5.9,13.1,13.1v132.1c0,7.2-5.9,13.1-13.1,13.1h-58.8Z";

  // Create path from SVG data
  const createPath = useCallback((ctx: CanvasRenderingContext2D, pathData: string) => {
    const path = new Path2D(pathData)
    return path
  }, [])

  // Initialize arrows with different colors
  const initializeArrows = useCallback((canvas: HTMLCanvasElement) => {
    const arrows: Arrow[] = []
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(canvas.width, canvas.height) * 0.15

    // Create 7 arrows (one for each color)
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      
      arrows.push({
        x,
        y,
        opacity: 0,
        delay: i * 0.2, // Stagger the appearance
        originalX: x,
        originalY: y,
        color: colors[i % colors.length]
      })
    }

    arrowsRef.current = arrows
  }, [colors])

  // Animation function
  const animate = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const currentTime = Date.now()
    
    // Frame rate limiting
    if (currentTime - lastFrameTimeRef.current < frameInterval) {
      return
    }
    lastFrameTimeRef.current = currentTime

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update animation time
    animationTimeRef.current += 0.016 // ~60fps

    // Draw arrows
    arrowsRef.current.forEach((arrow, index) => {
      const time = animationTimeRef.current - arrow.delay
      
      if (time < 0) return

      // Calculate opacity with smooth fade-in and pulse
      const fadeInDuration = 1.0
      const pulseDuration = 2.0
      const totalCycle = fadeInDuration + pulseDuration
      
      let opacity = 0
      if (time < fadeInDuration) {
        // Fade in
        opacity = Math.min(time / fadeInDuration, 1)
      } else if (time < totalCycle) {
        // Pulse effect
        const pulseTime = (time - fadeInDuration) / pulseDuration
        opacity = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(pulseTime * Math.PI * 4))
      } else {
        // Reset for next cycle
        animationTimeRef.current = arrow.delay
        opacity = 0
      }

      // Update arrow opacity
      arrow.opacity = opacity

      // Draw arrow with its assigned color
      if (opacity > 0) {
        ctx.save()
        ctx.globalAlpha = opacity
        ctx.fillStyle = arrow.color
        ctx.translate(arrow.x, arrow.y)
        
        // Rotate arrow based on its position
        const angle = Math.atan2(arrow.originalY - canvas.height/2, arrow.originalX - canvas.width/2)
        ctx.rotate(angle)
        
        // Scale arrow based on opacity for a nice effect
        const scale = 0.5 + (opacity * 0.5)
        ctx.scale(scale, scale)
        
        // Draw the arrow path
        const path = createPath(ctx, arrowPathData)
        ctx.fill(path)
        
        ctx.restore()
      }
    })

    // Continue animation
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(() => animate(ctx, canvas))
    }
  }, [createPath, isPlaying])

  // Initialize canvas and start animation
  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = width
    canvas.height = height

    // Initialize arrows
    initializeArrows(canvas)

    // Start animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    
    animationRef.current = requestAnimationFrame(() => animate(ctx, canvas))
  }, [width, height, initializeArrows, animate])

  // Handle canvas resize
  useCanvasResize(canvasRef, initializeCanvas)

  // Initialize on mount
  useEffect(() => {
    initializeCanvas()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initializeCanvas])

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${showBorder ? 'border border-border/20 rounded-lg' : ''}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </div>
  )
}
