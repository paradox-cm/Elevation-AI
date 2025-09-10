"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import { useCanvasResize } from "@/hooks/use-canvas-resize"
import { useVisibilityReset } from "@/hooks/use-visibility-reset"
import { useBreakpointReset } from "@/hooks/use-breakpoint-reset"

interface PersonalCopilotProps {
  width?: number
  height?: number
  className?: string
  showBorder?: boolean
}

export function PersonalCopilot({ 
  width = 352, 
  height = 352, 
  className = "",
  showBorder = true 
}: PersonalCopilotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const [animationKey, setAnimationKey] = useState(0)

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
    console.log('PersonalCopilot visibility changed:', isVisible)
    if (isVisible) {
      console.log('PersonalCopilot: Restarting animation due to visibility change')
      initializeAndStartAnimation()
    }
  })

  // Alternative approach: Use breakpoint reset hook
  useBreakpointReset(containerRef, () => {
    // Animation restart triggered by breakpoint change
    initializeAndStartAnimation()
  })

  useEffect(() => {
    const canvasData = initializeCanvas()
    if (!canvasData || !canvasData.canvas || !canvasData.ctx) return
    const { canvas, ctx } = canvasData

    // Theme-aware colors
    let isDark = document.documentElement.classList.contains('dark')
    let exchangeColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'
    let connectionColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'

    // Theme change observer
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          isDark = document.documentElement.classList.contains('dark')
          exchangeColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'
          connectionColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
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
    const numExchanges = 6
    const radius = Math.min(logicalWidth, logicalHeight) * 0.364 // 160 for 440x440, scaled proportionally
    const angleStep = (Math.PI * 2) / numExchanges
    const rotationSpeed1 = 0.003
    const rotationSpeed2 = 0.007

    // Performance optimization: Object pooling
    const exchanges1: Array<{ x: number; y: number; radius: number; baseX: number; baseY: number; updatePosition: (cosOffset: number, sinOffset: number) => void; draw: () => void }> = []
    const exchanges2: Array<{ x: number; y: number; radius: number; baseX: number; baseY: number; updatePosition: (cosOffset: number, sinOffset: number) => void; draw: () => void }> = []
    const connections1: Array<{ start: { x: number; y: number }; end: { x: number; y: number }; draw: () => void }> = []
    const connections2: Array<{ start: { x: number; y: number }; end: { x: number; y: number }; draw: () => void }> = []
    let angle1 = 0
    let angle2 = 0
    let lastTime = 0
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS

    // Performance optimization: Pre-calculate exchange positions
    const basePositions: { x: number, y: number }[] = []
    for (let i = 0; i < numExchanges; i++) {
      const angle = i * angleStep
      basePositions.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      })
    }

    class Exchange {
      x: number
      y: number
      radius: number
      baseX: number
      baseY: number

      constructor(baseX: number, baseY: number) {
        this.baseX = baseX
        this.baseY = baseY
        this.x = centerX + baseX
        this.y = centerY + baseY
        this.radius = 4
      }

      // Performance optimization: Update position using pre-calculated base positions
      updatePosition(cosOffset: number, sinOffset: number) {
        this.x = centerX + this.baseX * cosOffset - this.baseY * sinOffset
        this.y = centerY + this.baseX * sinOffset + this.baseY * cosOffset
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = exchangeColor
        ctx.fill()
        ctx.strokeStyle = connectionColor
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    class Connection {
      start: { x: number; y: number }
      end: { x: number; y: number }

      constructor(start: { x: number; y: number }, end: { x: number; y: number }) {
        this.start = start
        this.end = end
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.moveTo(this.start.x, this.start.y)
        ctx.lineTo(this.end.x, this.end.y)
        ctx.stroke()
      }
    }

    function generateExchanges(exchangesArray: Array<{ x: number; y: number; radius: number; baseX: number; baseY: number; updatePosition: (cosOffset: number, sinOffset: number) => void; draw: () => void }>) {
      for (let i = 0; i < numExchanges; i++) {
        const basePos = basePositions[i]
        exchangesArray.push(new Exchange(basePos.x, basePos.y))
      }
    }

    function createConnections(exchangesArray: Array<{ x: number; y: number; radius: number; baseX: number; baseY: number; updatePosition: (cosOffset: number, sinOffset: number) => void; draw: () => void }>, connectionsArray: Array<{ start: { x: number; y: number }; end: { x: number; y: number }; draw: () => void }>) {
      // Performance optimization: Create connections more efficiently
      for (let i = 0; i < exchangesArray.length; i++) {
        for (let j = i + 1; j < exchangesArray.length; j++) {
          connectionsArray.push(new Connection(exchangesArray[i], exchangesArray[j]))
        }
      }
    }

    function updatePositions(exchangesArray: Array<{ x: number; y: number; radius: number; baseX: number; baseY: number; updatePosition: (cosOffset: number, sinOffset: number) => void; draw: () => void }>, angleOffset: number) {
      // Performance optimization: Use pre-calculated trigonometric values
      const cosOffset = Math.cos(angleOffset)
      const sinOffset = Math.sin(angleOffset)
      
      exchangesArray.forEach(exchange => {
        exchange.updatePosition(cosOffset, sinOffset)
      })
    }

    function animate(currentTime: number) {
      if (!ctx || !canvas) return
      
      // Frame rate limiting for consistent performance
      if (currentTime - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastTime = currentTime
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Performance optimization: Update positions first
      updatePositions(exchanges1, angle1)
      updatePositions(exchanges2, angle2)

      // Performance optimization: Batch drawing operations
      // Set styles once for connections
      ctx.strokeStyle = connectionColor
      ctx.lineWidth = 1
      
      // Draw all connections first (batched)
      connections1.forEach(connection => connection.draw())
      connections2.forEach(connection => connection.draw())
      
      // Set styles once for exchanges
      ctx.fillStyle = exchangeColor
      
      // Draw all exchanges (batched)
      exchanges1.forEach(exchange => exchange.draw())
      exchanges2.forEach(exchange => exchange.draw())
      
      // Performance optimization: Use pre-calculated rotation speeds with consistent timing
      angle1 -= rotationSpeed1
      angle2 += rotationSpeed2
      
      // Normalize angles to prevent precision issues
      if (angle1 > Math.PI * 2) angle1 -= Math.PI * 2
      if (angle1 < 0) angle1 += Math.PI * 2
      if (angle2 > Math.PI * 2) angle2 -= Math.PI * 2
      if (angle2 < 0) angle2 += Math.PI * 2
      
      animationRef.current = requestAnimationFrame(animate)
    }

    generateExchanges(exchanges1)
    generateExchanges(exchanges2)
    createConnections(exchanges1, connections1)
    createConnections(exchanges2, connections2)
    animate(performance.now())

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      observer.disconnect()
    }
  }, [width, height, animationKey])

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
