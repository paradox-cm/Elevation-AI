"use client"

import { useEffect, useRef } from "react"

interface AgenticEngineProps {
  width?: number
  height?: number
  className?: string
  showBorder?: boolean
}

export function AgenticEngine({ 
  width = 440, 
  height = 440, 
  className = "",
  showBorder = true 
}: AgenticEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = width
    canvas.height = height

    // Define wider boundary area for nodes (keeping them contained)
    const nodeBoundary = {
      x: width * 0.16, // Start 16% from left edge (adjusted for wider area)
      y: height * 0.27, // Start 27% from top edge
      width: width * 0.68, // 68% of canvas width
      height: height * 0.45  // 45% of canvas height
    }

    // Theme-aware colors
    let isDark = document.documentElement.classList.contains('dark')
    let nodeColor = isDark ? 'rgba(255, 255, 255, ' : 'rgba(0, 0, 0, '
    let lineColor = isDark ? 'rgba(255, 255, 255, ' : 'rgba(0, 0, 0, '

    // Theme change observer
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          isDark = document.documentElement.classList.contains('dark')
          nodeColor = isDark ? 'rgba(255, 255, 255, ' : 'rgba(0, 0, 0, '
          lineColor = isDark ? 'rgba(255, 255, 255, ' : 'rgba(0, 0, 0, '
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    const nodes: Array<{ x: number; y: number; vx: number; vy: number; opacity: number; radius: number; draw: () => void; update: () => void }> = []
    const lines: Array<{ start: { x: number; y: number }; end: { x: number; y: number }; opacity: number; draw: () => void; update: () => void }> = []

    class Node {
      x: number
      y: number
      vx: number
      vy: number
      opacity: number
      radius: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 1.5
        this.vy = (Math.random() - 0.5) * 1.5
        this.opacity = 1
        this.radius = 5
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${nodeColor}${this.opacity})`
        ctx.fill()
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        
        // Keep nodes within the smaller boundary area
        if (this.x < nodeBoundary.x) {
          this.x = nodeBoundary.x
          this.vx = Math.abs(this.vx) // Bounce back
        } else if (this.x > nodeBoundary.x + nodeBoundary.width) {
          this.x = nodeBoundary.x + nodeBoundary.width
          this.vx = -Math.abs(this.vx) // Bounce back
        }
        
        if (this.y < nodeBoundary.y) {
          this.y = nodeBoundary.y
          this.vy = Math.abs(this.vy) // Bounce back
        } else if (this.y > nodeBoundary.y + nodeBoundary.height) {
          this.y = nodeBoundary.y + nodeBoundary.height
          this.vy = -Math.abs(this.vy) // Bounce back
        }
        
        this.opacity -= 0.015 // Increased from 0.008 for faster fade-out
      }
    }

    class Line {
      start: { x: number; y: number }
      end: { x: number; y: number }
      opacity: number

      constructor(start: { x: number; y: number }, end: { x: number; y: number }) {
        this.start = start
        this.end = end
        this.opacity = 1.0
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.moveTo(this.start.x, this.start.y)
        ctx.lineTo(this.end.x, this.end.y)
        ctx.strokeStyle = `${lineColor}${this.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      update() {
        // Lines fade out much faster now
        this.opacity -= 0.025 // Increased from 0.012 for much faster fade-out
      }
    }

    function addNode() {
      // Generate nodes only within the smaller boundary area
      const x = nodeBoundary.x + Math.random() * nodeBoundary.width
      const y = nodeBoundary.y + Math.random() * nodeBoundary.height
      const newNode = { 
        x, 
        y, 
        vx: 0, 
        vy: 0, 
        opacity: 1.0, 
        radius: Math.random() * 3 + 1,
        draw() {
          if (!ctx) return
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
          ctx.fillStyle = `${nodeColor}${this.opacity})`
          ctx.fill()
        },
        update() {
          this.x += this.vx
          this.y += this.vy
          this.opacity -= 0.015
        }
      }
      nodes.push(newNode)
      
      for (let i = 0; i < 3; i++) { // Reduced from 6 to 3 connections per node
        if (nodes.length > i + 1) {
          lines.push(new Line({ x: newNode.x, y: newNode.y }, { x: nodes[nodes.length - (i + 2)].x, y: nodes[nodes.length - (i + 2)].y }))
        }
      }
    }



    function animate() {
      if (!ctx || !canvas) return
      // Clear completely each frame
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      nodes.forEach((node, index) => {
        node.draw()
        node.update()
        if (node.opacity <= 0) nodes.splice(index, 1)
      })
      
      lines.forEach((line, index) => {
        line.draw()
        line.update()
        if (line.opacity <= 0) lines.splice(index, 1)
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }

    const nodeInterval = setInterval(addNode, 500) // Increased from 300ms to 500ms for slower generation
    animate()

    return () => {
      clearInterval(nodeInterval)
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
