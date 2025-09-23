"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import { useCanvasResize } from "@/hooks/use-canvas-resize"
import { useVisibilityReset } from "@/hooks/use-visibility-reset"
import { useBreakpointReset } from "@/hooks/use-breakpoint-reset"
import { useMediaQuery } from "@/hooks/use-media-query"

interface SecurityLayer {
  points: number[][]
  opacity: number
  rotation: number
  rotationSpeed: number
}

interface EnterpriseSecurityProps {
  width?: number
  height?: number
  className?: string
  showBorder?: boolean
}

export function EnterpriseSecurity({ 
  width = 480, 
  height = 320, 
  className = "",
  showBorder = true 
}: EnterpriseSecurityProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const layersRef = useRef<SecurityLayer[]>([])
  const [animationKey, setAnimationKey] = useState(0)
  
  // Detect mobile for scaling
  const isMobile = useMediaQuery("(max-width: 1023px)")

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return { canvas: null, ctx: null }

    const ctx = canvas.getContext("2d")
    if (!ctx) return { canvas: null, ctx: null }

    // High-DPI support for mobile devices
    const devicePixelRatio = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    
    // Set canvas size accounting for device pixel ratio
    canvas.width = rect.width * devicePixelRatio
    canvas.height = rect.height * devicePixelRatio
    
    // Scale the drawing context to match device pixel ratio
    ctx.scale(devicePixelRatio, devicePixelRatio)
    
    // Enable antialiasing for smoother lines
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    
    // Set the canvas CSS size to the logical size
    canvas.style.width = rect.width + 'px'
    canvas.style.height = rect.height + 'px'

    return { canvas, ctx }
  }, [])

  // Initialize canvas and start animation
  const initializeAndStartAnimation = useCallback(() => {
    // Stop any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    
    // Force animation restart by updating the key
    setAnimationKey((prev: number) => prev + 1)
  }, [])

  // Use canvas resize hook
  useCanvasResize(canvasRef, initializeAndStartAnimation, {
    debounceDelay: 150,
    preserveAspectRatio: true
  })

  // Use visibility reset hook to detect when component becomes visible again
  useVisibilityReset(containerRef, (isVisible) => {
    if (isVisible) {
      initializeAndStartAnimation()
    }
  })

  // Alternative approach: Use breakpoint reset hook
  useBreakpointReset(containerRef, () => {
    // Animation restart triggered by breakpoint change
    initializeAndStartAnimation()
  })

  const createSecurityLayers = (canvas: HTMLCanvasElement) => {
    const layers: SecurityLayer[] = []
    
    // Get the logical dimensions (CSS size) for positioning calculations
    const logicalWidth = canvas.width / (window.devicePixelRatio || 1)
    const logicalHeight = canvas.height / (window.devicePixelRatio || 1)
    const centerX = logicalWidth / 2
    const centerY = logicalHeight / 2
    
    // Apply mobile scaling: 25% smaller on mobile
    const mobileScale = isMobile ? 0.75 : 1.0
    
    // Create 3 security layers (outer, middle, inner) - reduced to match Personal Co-pilot scale
    for (let i = 0; i < 3; i++) {
      const radius = (50 + i * 25) * 0.8 * mobileScale // Reduced sizes: 32, 48, 64 on mobile
      const points: number[][] = []
      
      // Create hexagon points for each layer
      for (let j = 0; j < 6; j++) {
        const angle = (j * Math.PI) / 3
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        points.push([x, y])
      }
      
      layers.push({
        points,
        opacity: 0.3 + (i * 0.2),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: 0.003 + (i * 0.001) // Match Personal Copilot rotation speeds
      })
    }
    
    return layers
  }


  useEffect(() => {
    const canvasData = initializeCanvas()
    if (!canvasData || !canvasData.canvas || !canvasData.ctx) return
    const { canvas, ctx } = canvasData

    // Theme-aware colors
    let isDark = document.documentElement.classList.contains('dark')
    let lineColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'

    // Theme change observer
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          isDark = document.documentElement.classList.contains('dark')
          lineColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Performance optimization: Pre-calculate constants
    // Get the logical dimensions (CSS size) for positioning calculations
    const logicalWidth = canvas.width / (window.devicePixelRatio || 1)
    const logicalHeight = canvas.height / (window.devicePixelRatio || 1)
    
    const centerX = logicalWidth / 2
    const centerY = logicalHeight / 2

    // Apply mobile scaling: 25% smaller on mobile
    const mobileScale = isMobile ? 0.75 : 1.0

    // Create security layers
    layersRef.current = createSecurityLayers(canvas)

    // Performance optimization: Frame rate limiting
    let lastTime = 0
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS

    function animate(currentTime: number) {
      if (!ctx || !canvas) return
      
      // Frame rate limiting for consistent performance
      if (currentTime - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastTime = currentTime
      
      // Clear canvas completely for transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const layers = layersRef.current
      
      // Set styles once for all hexagons
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 1.0 // Standardized stroke width
      ctx.lineCap = 'round' // Smooth line endings
      ctx.lineJoin = 'round' // Smooth line connections
      
      // Draw security layers (hexagons)
      layers.forEach(layer => {
        // Update rotation
        layer.rotation += layer.rotationSpeed
        
        // Pre-calculate trigonometric values for performance
        const cos = Math.cos(layer.rotation)
        const sin = Math.sin(layer.rotation)
        
        // Calculate rotated points
        const rotatedPoints = layer.points.map(([x, y]) => {
          const dx = x - centerX
          const dy = y - centerY
          return [
            centerX + dx * cos - dy * sin,
            centerY + dx * sin + dy * cos
          ]
        })
        
        // Draw hexagon
        ctx.beginPath()
        ctx.moveTo(rotatedPoints[0][0], rotatedPoints[0][1])
        for (let i = 1; i < rotatedPoints.length; i++) {
          ctx.lineTo(rotatedPoints[i][0], rotatedPoints[i][1])
        }
        ctx.closePath()
        ctx.stroke()
      })
      
      // Draw central security core (small hexagon) with 30-degree rotation to face upward - reduced to match Personal Co-pilot scale
      const mobileScale = isMobile ? 0.75 : 1.0
      const coreRadius = 18 * 0.8 * mobileScale // Reduced size: 10.8 on mobile
      const coreRotation = Math.PI / 6 // 30 degrees in radians - makes hexagon face upward
      const corePoints: number[][] = []
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3 + coreRotation // Add 30-degree rotation
        const x = centerX + Math.cos(angle) * coreRadius
        const y = centerY + Math.sin(angle) * coreRadius
        corePoints.push([x, y])
      }
      
      // Draw central core with same styling
      ctx.beginPath()
      ctx.moveTo(corePoints[0][0], corePoints[0][1])
      for (let i = 1; i < corePoints.length; i++) {
        ctx.lineTo(corePoints[i][0], corePoints[i][1])
      }
      ctx.closePath()
      ctx.stroke()
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animate(performance.now())

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      observer.disconnect()
    }
  }, [width, height, animationKey, initializeCanvas, isMobile])

  return (
    <div ref={containerRef} className={`flex justify-center ${className}`}>
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
