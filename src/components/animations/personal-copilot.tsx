"use client"

import { useEffect, useRef } from "react"

interface PersonalCopilotProps {
  width?: number
  height?: number
  className?: string
  showBorder?: boolean
}

export function PersonalCopilot({ 
  width = 440, 
  height = 440, 
  className = "",
  showBorder = true 
}: PersonalCopilotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = width
    canvas.height = height

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
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const numExchanges = 6
    const radius = Math.min(width, height) * 0.364 // 160 for 440x440, scaled proportionally
    const angleStep = (Math.PI * 2) / numExchanges
    const rotationSpeed1 = 0.005
    const rotationSpeed2 = 0.005

    // Performance optimization: Object pooling
    let exchanges1: any[] = []
    let exchanges2: any[] = []
    let connections1: any[] = []
    let connections2: any[] = []
    let angle1 = 0
    let angle2 = 0

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
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    class Connection {
      start: any
      end: any

      constructor(start: any, end: any) {
        this.start = start
        this.end = end
      }

      draw() {
        ctx.beginPath()
        ctx.moveTo(this.start.x, this.start.y)
        ctx.lineTo(this.end.x, this.end.y)
        ctx.stroke()
      }
    }

    function generateExchanges(exchangesArray: any[], offsetAngle: number) {
      for (let i = 0; i < numExchanges; i++) {
        const basePos = basePositions[i]
        exchangesArray.push(new Exchange(basePos.x, basePos.y))
      }
    }

    function createConnections(exchangesArray: any[], connectionsArray: any[]) {
      // Performance optimization: Create connections more efficiently
      for (let i = 0; i < exchangesArray.length; i++) {
        for (let j = i + 1; j < exchangesArray.length; j++) {
          connectionsArray.push(new Connection(exchangesArray[i], exchangesArray[j]))
        }
      }
    }

    function updatePositions(exchangesArray: any[], angleOffset: number) {
      // Performance optimization: Use pre-calculated trigonometric values
      const cosOffset = Math.cos(angleOffset)
      const sinOffset = Math.sin(angleOffset)
      
      exchangesArray.forEach(exchange => {
        exchange.updatePosition(cosOffset, sinOffset)
      })
    }

    function animate() {
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
      
      // Performance optimization: Use pre-calculated rotation speeds
      angle1 -= rotationSpeed1
      angle2 += rotationSpeed2
      
      animationRef.current = requestAnimationFrame(animate)
    }

    generateExchanges(exchanges1, 0)
    generateExchanges(exchanges2, Math.PI / 6)
    createConnections(exchanges1, connections1)
    createConnections(exchanges2, connections2)
    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      observer.disconnect()
    }
  }, [width, height])

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
