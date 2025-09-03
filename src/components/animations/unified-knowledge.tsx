"use client"

import { useEffect, useRef } from "react"

interface UnifiedKnowledgeProps {
  width?: number
  height?: number
  className?: string
  showBorder?: boolean
}

export function UnifiedKnowledge({ 
  width = 600, 
  height = 400, 
  className = "",
  showBorder = true 
}: UnifiedKnowledgeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!canvas) return

    canvas.width = width
    canvas.height = height

    // Theme-aware colors
    let isDark = document.documentElement.classList.contains('dark')
    let backgroundColor = isDark ? 'rgba(15, 15, 15, 0.1)' : 'rgba(250, 250, 250, 0.1)'
    let columnColor = isDark ? 'rgba(161, 161, 170, 0.4)' : 'rgba(82, 82, 91, 0.4)'
    let dataColor = isDark ? 'rgba(59, 130, 246, 0.8)' : 'rgba(37, 99, 235, 0.8)'
    let sourceColor = isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'

    // Theme change observer
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          isDark = document.documentElement.classList.contains('dark')
          backgroundColor = isDark ? 'rgba(15, 15, 15, 0.1)' : 'rgba(250, 250, 250, 0.1)'
          columnColor = isDark ? 'rgba(161, 161, 170, 0.4)' : 'rgba(82, 82, 91, 0.4)'
          dataColor = isDark ? 'rgba(59, 130, 246, 0.8)' : 'rgba(37, 99, 235, 0.8)'
          sourceColor = isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'
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
    const columnWidth = 80
    const columnSpacing = 20
    const topY = height * 0.27 // Adjusted to center the animation vertically
    const bottomY = height * 0.73 // Adjusted to center the animation vertically

    let dataParticles: Array<DataParticle> = [];
    let animationTime = 0

    class DataParticle {
      x: number
      y: number
      targetX: number
      targetY: number
      progress: number
      speed: number
      size: number

      constructor(startX: number, startY: number, endX: number, endY: number) {
        this.x = startX
        this.y = startY
        this.targetX = endX
        this.targetY = endY
        this.progress = 0
        this.speed = (Math.random() * 0.015 + 0.01) * 0.7 // Reduced by 30% for slower movement
        this.size = 4
      }

      update() {
        this.progress += this.speed
        
        if (this.progress >= 1) {
          return false // Remove particle
        }
        
        // Move along diagonal path
        this.x = this.x + (this.targetX - this.x) * this.speed
        this.y = this.y + (this.targetY - this.y) * this.speed
        
        return true // Keep particle
      }

      draw() {
        if (!ctx) return
        
        const currentX = this.x + (this.targetX - this.x) * this.progress
        const currentY = this.y + (this.targetY - this.y) * this.progress
        
        // Clean blue circle with no outline
        ctx.beginPath()
        ctx.arc(currentX, currentY, this.size, 0, Math.PI * 2)
        ctx.fillStyle = dataColor
        ctx.fill()
      }
    }

    function drawColumns() {
      // Removed vertical dividers - keeping clean, open design
      if (!ctx) return
      // No dividers drawn
    }

    function drawSources() {
      if (!ctx) return
      
      // Draw four source squares at the top (centered horizontally)
      const sourcePositions = [width * 0.16, width * 0.39, width * 0.61, width * 0.84]
      
      sourcePositions.forEach(x => {
        // Simple square
        ctx.fillStyle = sourceColor
        ctx.fillRect(x - 15, topY - 15, 30, 30)
        ctx.strokeStyle = sourceColor
        ctx.lineWidth = 2
        ctx.strokeRect(x - 15, topY - 15, 30, 30)
      })
    }

    function drawDestinations() {
      if (!ctx) return
      
      // Draw four destination circles at the bottom (centered horizontally)
      const destPositions = [width * 0.16, width * 0.39, width * 0.61, width * 0.84]
      
      destPositions.forEach(x => {
        // Theme-aware circle color
        ctx.fillStyle = sourceColor
        ctx.beginPath()
        ctx.arc(x, bottomY, 15, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    function drawDataFlowLines() {
      if (!ctx) return
      
      // Draw diagonal lines representing data flow
      ctx.strokeStyle = columnColor + '60'
      ctx.lineWidth = 1
      
      // Connect each source to multiple destinations with diagonal lines (centered horizontally)
      const sources = [width * 0.16, width * 0.39, width * 0.61, width * 0.84]
      const destinations = [width * 0.16, width * 0.39, width * 0.61, width * 0.84]
      
      sources.forEach(sourceX => {
        destinations.forEach(destX => {
          // Create diagonal flow lines
          ctx.beginPath()
          ctx.moveTo(sourceX, topY + 25)
          ctx.lineTo(destX, bottomY - 25)
          ctx.stroke()
        })
      })
    }

    function generateDataParticles() {
      // Generate new data particles periodically
      if (animationTime % 40 === 0) { // Slower frequency - every 40 frames
        const sources = [width * 0.16, width * 0.39, width * 0.61, width * 0.84]
        const destinations = [width * 0.16, width * 0.39, width * 0.61, width * 0.84]
        
        // Create 5 particles per cycle (reduced by 30% from 7)
        for (let i = 0; i < 5; i++) {
          const randomSource = sources[Math.floor(Math.random() * sources.length)]
          const randomDest = destinations[Math.floor(Math.random() * destinations.length)]
          
          dataParticles.push(new DataParticle(
            randomSource, topY + 25,
            randomDest, bottomY - 25
          ))
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw background
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw static elements
      drawColumns()
      drawDataFlowLines()
      drawSources()
      drawDestinations()
      
      // Generate new data particles
      generateDataParticles()
      
      // Update and draw data particles
      dataParticles = dataParticles.filter(particle => particle.update())
      dataParticles.forEach(particle => particle.draw())
      
      animationTime++
      animationRef.current = requestAnimationFrame(animate)
    }

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
