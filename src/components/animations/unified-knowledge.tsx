"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import { useCanvasResize } from "@/hooks/use-canvas-resize"
import { useVisibilityReset } from "@/hooks/use-visibility-reset"
import { useBreakpointReset } from "@/hooks/use-breakpoint-reset"

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
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const [animationKey, setAnimationKey] = useState(0)
  
  // Performance optimization: frame rate limiting
  const lastFrameTimeRef = useRef(0)
  const targetFPS = 60
  const frameInterval = 1000 / targetFPS
  
  // Smooth startup sequence
  const startupDelayRef = useRef(0)
  const isStartingUpRef = useRef(true)
  const startupPhaseRef = useRef(0) // 0: delay, 1: gradual build, 2: full speed
  
  // Responsive sizing for mobile breakpoints
  const isMobile = width <= 768
  const mobileScale = isMobile ? 0.8 : 1.0 // 20% smaller on mobile

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

  // Start animation function
  const startAnimation = useCallback((state?: unknown) => {
    const { canvas, ctx } = initializeCanvas()
    if (!canvas || !ctx) return

    // Start the animation by calling the useEffect
    // The animation will be started in the useEffect
  }, [initializeCanvas])

  // Stop animation function
  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [])

  // Initialize canvas and start animation
  const initializeAndStartAnimation = useCallback(() => {
    // Stop any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    
    // Force animation restart by updating the key
    setAnimationKey(prev => prev + 1)
  }, [])

  // Use canvas resize hook
  useCanvasResize(canvasRef, initializeAndStartAnimation, {
    debounceDelay: 150,
    preserveAspectRatio: true
  })

  // Use visibility reset hook to detect when component becomes visible again
  useVisibilityReset(containerRef, (isVisible) => {
    console.log('UnifiedKnowledge visibility changed:', isVisible)
    if (isVisible) {
      console.log('UnifiedKnowledge: Restarting animation due to visibility change')
      // Component became visible, force animation restart
      initializeAndStartAnimation()
    }
  })

  // Alternative approach: Use breakpoint reset hook
  useBreakpointReset(containerRef, () => {
    console.log('UnifiedKnowledge: Breakpoint change detected, restarting animation')
    // Animation restart triggered by breakpoint change
    initializeAndStartAnimation()
  })

  // Additional window resize listener for extra safety
  useEffect(() => {
    const handleResize = () => {
      console.log('UnifiedKnowledge: Window resize detected, checking if restart needed')
      // Small delay to ensure CSS classes have been applied
      setTimeout(() => {
        const element = containerRef.current
        if (element) {
          const rect = element.getBoundingClientRect()
          const computedStyle = window.getComputedStyle(element)
          const isVisible = 
            rect.width > 0 && 
            rect.height > 0 && 
            computedStyle.display !== 'none' && 
            computedStyle.visibility !== 'hidden' &&
            computedStyle.opacity !== '0'
          
          if (isVisible) {
            console.log('UnifiedKnowledge: Element is visible after resize, restarting animation')
            initializeAndStartAnimation()
          }
        }
      }, 100)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [initializeAndStartAnimation])

  useEffect(() => {
    const canvasData = initializeCanvas()
    if (!canvasData || !canvasData.canvas || !canvasData.ctx) return
    const { canvas, ctx } = canvasData

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
    // Get the logical dimensions (CSS size) for positioning calculations
    const logicalWidth = canvas.width / (window.devicePixelRatio || 1)
    const logicalHeight = canvas.height / (window.devicePixelRatio || 1)
    
    const centerX = logicalWidth / 2
    const centerY = logicalHeight / 2
    const columnWidth = 80
    const columnSpacing = 20
    const topY = logicalHeight * 0.27 // Adjusted to center the animation vertically
    const bottomY = logicalHeight * 0.73 // Adjusted to center the animation vertically
    const TWO_PI = Math.PI * 2 // Pre-calculate constant

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
        this.speed = 0.015 // Slightly slower for steadier visual flow
        this.size = 4 * mobileScale // Responsive particle size
      }

      update() {
        this.progress += this.speed
        
        if (this.progress >= 1) {
          return false // Remove particle
        }
        
        return true // Keep particle
      }

      draw() {
        if (!ctx) return
        
        // Linear interpolation for consistent movement
        const currentX = this.x + (this.targetX - this.x) * this.progress
        const currentY = this.y + (this.targetY - this.y) * this.progress
        
        // Clean blue circle with no outline - optimized drawing
        ctx.beginPath()
        ctx.arc(currentX, currentY, this.size, 0, TWO_PI)
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
      const sourcePositions = [logicalWidth * 0.16, logicalWidth * 0.39, logicalWidth * 0.61, logicalWidth * 0.84]
      const squareSize = 30 * mobileScale
      const halfSize = squareSize / 2
      
      sourcePositions.forEach(x => {
        // Simple square with responsive sizing
        ctx.fillStyle = sourceColor
        ctx.fillRect(x - halfSize, topY - halfSize, squareSize, squareSize)
        ctx.strokeStyle = sourceColor
        ctx.lineWidth = 2
        ctx.strokeRect(x - halfSize, topY - halfSize, squareSize, squareSize)
      })
    }

    function drawDestinations() {
      if (!ctx) return
      
      // Draw four destination circles at the bottom (centered horizontally)
      const destPositions = [logicalWidth * 0.16, logicalWidth * 0.39, logicalWidth * 0.61, logicalWidth * 0.84]
      const circleRadius = 15 * mobileScale
      
      destPositions.forEach(x => {
        // Theme-aware circle color with responsive sizing
        ctx.fillStyle = sourceColor
        ctx.beginPath()
        ctx.arc(x, bottomY, circleRadius, 0, TWO_PI)
        ctx.fill()
      })
    }

    function drawDataFlowLines() {
      if (!ctx) return
      
      // Draw diagonal lines representing data flow
      ctx.strokeStyle = columnColor + '60'
      ctx.lineWidth = 1
      
      // Connect each source to multiple destinations with diagonal lines (centered horizontally)
      const sources = [logicalWidth * 0.16, logicalWidth * 0.39, logicalWidth * 0.61, logicalWidth * 0.84]
      const destinations = [logicalWidth * 0.16, logicalWidth * 0.39, logicalWidth * 0.61, logicalWidth * 0.84]
      
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
      // Generate new data particles with smooth startup sequence
      const sources = [logicalWidth * 0.16, logicalWidth * 0.39, logicalWidth * 0.61, logicalWidth * 0.84]
      const destinations = [logicalWidth * 0.16, logicalWidth * 0.39, logicalWidth * 0.61, logicalWidth * 0.84]
      
      // Phase 0: Wait for startup delay
      if (startupPhaseRef.current === 0) {
        return
      }
      
      // Phase 1: Gradual build-up (fewer particles, slower generation)
      if (startupPhaseRef.current === 1) {
        if (animationTime % 20 === 0 && dataParticles.length < 8) { // Slower, fewer particles
          const particleCount = 1 // Only 1 particle at a time during build-up
          for (let i = 0; i < particleCount; i++) {
            const randomSource = sources[Math.floor(Math.random() * sources.length)]
            const randomDest = destinations[Math.floor(Math.random() * sources.length)]
            
            dataParticles.push(new DataParticle(
              randomSource, topY + 25,
              randomDest, bottomY - 25
            ))
          }
        }
        return
      }
      
      // Phase 2: Full speed operation
      if (animationTime % 8 === 0 && dataParticles.length < 25) {
        const particleCount = Math.random() > 0.6 ? 1 : 2
        for (let i = 0; i < particleCount; i++) {
          const randomSource = sources[Math.floor(Math.random() * sources.length)]
          const randomDest = destinations[Math.floor(Math.random() * sources.length)]
          
          dataParticles.push(new DataParticle(
            randomSource, topY + 25,
            randomDest, bottomY - 25
          ))
        }
      }
    }

    const animate = () => {
      if (!ctx || !canvas) return
      
      // Frame rate limiting for consistent performance
      const currentTime = performance.now()
      if (currentTime - lastFrameTimeRef.current < frameInterval) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrameTimeRef.current = currentTime
      
      // Handle startup sequence phases
      if (isStartingUpRef.current) {
        startupDelayRef.current++
        
        // Phase 0: Wait 20 frames (0.33 seconds at 60fps) for smooth startup
        if (startupDelayRef.current < 20) {
          startupPhaseRef.current = 0
        }
        // Phase 1: Gradual build-up for 60 frames (1 second)
        else if (startupDelayRef.current < 80) {
          startupPhaseRef.current = 1
        }
        // Phase 2: Full speed operation
        else {
          startupPhaseRef.current = 2
          isStartingUpRef.current = false
        }
      }
      
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
      
      // Update and draw data particles - optimized batch drawing
      dataParticles = dataParticles.filter(particle => particle.update())
      
      // Batch particle drawing for better performance with startup fade-in
      if (dataParticles.length > 0) {
        dataParticles.forEach(particle => {
          // Apply fade-in effect during startup
          if (isStartingUpRef.current && startupPhaseRef.current === 1) {
            const fadeProgress = Math.min((startupDelayRef.current - 20) / 60, 1)
            const fadeColor = dataColor.replace(/[\d.]+\)$/, `${fadeProgress * 0.8})`)
            ctx.fillStyle = fadeColor
          } else {
            ctx.fillStyle = dataColor
          }
          particle.draw()
        })
      }
      
      animationTime++
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start the animation
    animate()

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
