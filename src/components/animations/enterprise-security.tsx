"use client"

import { useEffect, useRef, useState } from "react"

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
  width = 600, 
  height = 400, 
  className = "",
  showBorder = true 
}: EnterpriseSecurityProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const layersRef = useRef<SecurityLayer[]>([])
  const [isPlaying, setIsPlaying] = useState(true)

  // Theme-aware colors - will be set in useEffect
  let isDark = false
  let lineColor = '#000000'
  let backgroundColor = 'transparent'

  // Theme change observer - will be created in useEffect
  let observer: MutationObserver

  const createSecurityLayers = (canvas: HTMLCanvasElement) => {
    const layers: SecurityLayer[] = []
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    
    // Create 3 security layers (outer, middle, inner)
    for (let i = 0; i < 3; i++) {
      const radius = 80 + i * 40
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
        rotationSpeed: 0.002 + (i * 0.001) // Very slow rotation for performance
      })
    }
    
    return layers
  }

  const animateSecurityLayers = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    if (!isPlaying) return

    // Clear canvas completely for transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const layers = layersRef.current
    
    // Draw security layers (hexagons)
    layers.forEach(layer => {
      // Update rotation
      layer.rotation += layer.rotationSpeed
      
      // Calculate rotated points
      const rotatedPoints = layer.points.map(([x, y]) => {
        const dx = x - centerX
        const dy = y - centerY
        const cos = Math.cos(layer.rotation)
        const sin = Math.sin(layer.rotation)
        return [
          centerX + dx * cos - dy * sin,
          centerY + dx * sin + dy * cos
        ]
      })
      
      // Draw hexagon
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 2 // Changed from 1 to 2 for consistent thickness
      
      ctx.beginPath()
      ctx.moveTo(rotatedPoints[0][0], rotatedPoints[0][1])
      for (let i = 1; i < rotatedPoints.length; i++) {
        ctx.lineTo(rotatedPoints[i][0], rotatedPoints[i][1])
      }
      ctx.closePath()
      ctx.stroke()
    })
    
    // Draw central security core (small hexagon) with 30-degree rotation to face upward
    const coreRadius = 30
    const coreRotation = Math.PI / 6 // 30 degrees in radians - makes hexagon face upward
    const corePoints: number[][] = []
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 + coreRotation // Add 30-degree rotation
      const x = centerX + Math.cos(angle) * coreRadius
      const y = centerY + Math.sin(angle) * coreRadius
      corePoints.push([x, y])
    }
    
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 2 // Same thickness as outer layers
    ctx.beginPath()
    ctx.moveTo(corePoints[0][0], corePoints[0][1])
    for (let i = 1; i < corePoints.length; i++) {
      ctx.lineTo(corePoints[i][0], corePoints[i][1])
    }
    ctx.closePath()
    ctx.stroke()

    animationRef.current = requestAnimationFrame(() => animateSecurityLayers(canvas, ctx))
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
    lineColor = isDark ? '#ffffff' : '#000000'
    backgroundColor = 'transparent'

    // Create theme change observer
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          isDark = document.documentElement.classList.contains('dark')
          lineColor = isDark ? '#ffffff' : '#000000'
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Create security layers
    layersRef.current = createSecurityLayers(canvas)

    // Start animation
    animateSecurityLayers(canvas, ctx)

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
