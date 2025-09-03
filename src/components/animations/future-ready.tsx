"use client"

import { useEffect, useRef, useState } from "react"

interface FlowParticle {
  angle: number
  progress: number
  speed: number
}

interface Connection {
  startAngle: number
  endAngle: number
  opacity: number
  flowParticles: FlowParticle[]
}

interface GrowthRing {
  radius: number
  opacity: number
  maxRadius: number
  growthSpeed: number
  technology: string
  connections: Connection[]
}

interface FutureReadyProps {
  width?: number
  height?: number
  className?: string
  showBorder?: boolean
}

export function FutureReady({ 
  width = 600, 
  height = 400, 
  className = "",
  showBorder = true 
}: FutureReadyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const ringsRef = useRef<GrowthRing[]>([])
  const [isPlaying, setIsPlaying] = useState(true)

  // Theme-aware colors - will be set in useEffect
  let isDark = false
  let ringColor = 'rgba(0, 0, 0, 1)'
  let connectionColor = 'rgba(0, 0, 0, 1)'
  let particleColor = 'rgba(0, 0, 0, 1)'

  // Theme change observer - will be created in useEffect
  let observer: MutationObserver

  const createGrowthRings = (canvas: HTMLCanvasElement) => {
    const rings: GrowthRing[] = []
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    
    // Create 5 technology evolution rings
    const technologies = ['AI/ML', 'Cloud', 'Edge', 'Quantum', 'Future']
    
    for (let i = 0; i < technologies.length; i++) {
      const ring: GrowthRing = {
        radius: (20 + i * 40) * 0.8, // Start small and grow outward (reduced by 20%)
        opacity: 0.3 + (i * 0.15), // Newer technologies more visible
        maxRadius: (20 + i * 40) * 0.8, // Reduced by 20%
        growthSpeed: 0.5 + (i * 0.2), // Outer rings grow faster
        technology: technologies[i],
        connections: []
      }
      
      // Add connections between rings
      if (i > 0) {
        const numConnections = Math.floor(Math.random() * 3) + 1
        for (let j = 0; j < numConnections; j++) {
          const connection: Connection = {
            startAngle: Math.random() * Math.PI * 2,
            endAngle: Math.random() * Math.PI * 2,
            opacity: 0.3 + Math.random() * 0.4,
            flowParticles: []
          }
          
          // Add flow particles
          const numParticles = Math.floor(Math.random() * 2) + 1
          for (let k = 0; k < numParticles; k++) {
            connection.flowParticles.push({
              angle: Math.random() * Math.PI * 2,
              progress: Math.random(),
              speed: 0.005 + Math.random() * 0.01
            })
          }
          
          ring.connections.push(connection)
        }
      }
      
      rings.push(ring)
    }
    
    return rings
  }

  const animateGrowthRings = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    if (!isPlaying) return

    // Clear canvas completely (transparent background)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const rings = ringsRef.current
    
    // Draw connections first (behind rings)
    rings.forEach(ring => {
      ring.connections.forEach(connection => {
        ctx.strokeStyle = connectionColor
        ctx.lineWidth = 1
        
        // Draw connection line
        ctx.beginPath()
        ctx.arc(centerX, centerY, ring.radius, connection.startAngle, connection.endAngle)
        ctx.stroke()
        
        // Update and draw flow particles
        connection.flowParticles.forEach(particle => {
          particle.progress += particle.speed
          if (particle.progress > 1) {
            particle.progress = 0
          }
          
          // Calculate particle position along the arc
          const angle = connection.startAngle + (connection.endAngle - connection.startAngle) * particle.progress
          const x = centerX + Math.cos(angle) * ring.radius
          const y = centerY + Math.sin(angle) * ring.radius
          
          // Draw particle
          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2) // Increased from 2 to 3
          ctx.fillStyle = particleColor
          ctx.fill()
        })
      })
    })
    
    // Draw growth rings
    rings.forEach(ring => {
      // Update ring growth
      if (ring.radius < ring.maxRadius) {
        ring.radius += ring.growthSpeed
      }
      
      // Draw ring
      ctx.strokeStyle = ringColor
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2)
      ctx.stroke()
    })

    animationRef.current = requestAnimationFrame(() => animateGrowthRings(canvas, ctx))
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
    ringColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)' // White for dark mode, black for light mode
    connectionColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)' // White for dark mode, black for light mode
    particleColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)' // White for dark mode, black for light mode

    // Create theme change observer
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          isDark = document.documentElement.classList.contains('dark')
          ringColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)' // White for dark mode, black for light mode
          connectionColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)' // White for dark mode, black for light mode
          particleColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)' // White for dark mode, black for light mode
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Create growth rings
    ringsRef.current = createGrowthRings(canvas)

    // Start animation
    animateGrowthRings(canvas, ctx)

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
