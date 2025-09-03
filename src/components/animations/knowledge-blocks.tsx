"use client"

import { useEffect, useRef, useState } from "react"

interface KnowledgeBlock {
  x: number
  y: number
  size: number
  connections: number[]
  opacity: number
  pulsePhase: number
}

interface Connection {
  start: number
  end: number
  opacity: number
  flowParticles: FlowParticle[]
}

interface FlowParticle {
  x: number
  y: number
  progress: number
  speed: number
  active: boolean // For object pooling
}

interface KnowledgeBlocksProps {
  width?: number
  height?: number
  className?: string
  showBorder?: boolean
}

export function KnowledgeBlocks({ 
  width = 600, 
  height = 400, 
  className = "",
  showBorder = true 
}: KnowledgeBlocksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const blocksRef = useRef<KnowledgeBlock[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const [isPlaying, setIsPlaying] = useState(true)
  
  // Performance optimized: Reduced from 168 to 45 total animated objects

  // Theme-aware colors - will be set in useEffect
  let isDark = false
  let blockColor = 'rgba(0, 0, 0, 0.8)'
  let connectionColor = 'rgba(0, 0, 0, 0.4)'
  let particleColor = 'rgba(0, 0, 0, 0.6)'

  // Theme change observer - will be created in useEffect
  let observer: MutationObserver

  const initializeKnowledgeNetwork = (canvas: HTMLCanvasElement) => {
    const blocks: KnowledgeBlock[] = []
    const connections: Connection[] = []
    
    // Create knowledge blocks in a grid pattern (reduced for performance)
    const cols = 5 // Reduced from 6 to 5
    const rows = 3 // Reduced from 4 to 3
    const spacingX = canvas.width / (cols + 1)
    const spacingY = canvas.height / (rows + 1)
    
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const block: KnowledgeBlock = {
          x: spacingX * (x + 1),
          y: spacingY * (y + 1),
          size: 15,
          connections: [],
          opacity: 0.8 + Math.random() * 0.2,
          pulsePhase: 0
        }
        blocks.push(block)
      }
    }
    
    // Create intelligent connections (further reduced for performance)
    blocks.forEach((block, index) => {
      const numConnections = Math.floor(Math.random() * 1) + 1 // Reduced to 1 connection per block
      const connectedIndices = new Set<number>()
      
      for (let i = 0; i < numConnections; i++) {
        let targetIndex
        do {
          targetIndex = Math.floor(Math.random() * blocks.length)
        } while (targetIndex === index || connectedIndices.has(targetIndex))
        
        connectedIndices.add(targetIndex)
        
        const connection: Connection = {
          start: index,
          end: targetIndex,
          opacity: 0.3 + Math.random() * 0.4,
          flowParticles: []
        }
        
        // Add only 1 flow particle per connection for maximum performance
        connection.flowParticles.push({
          x: block.x,
          y: block.y,
          progress: Math.random(),
          speed: 0.001 + Math.random() * 0.002, // Further reduced speed
          active: true
        })
        
        connections.push(connection)
        block.connections.push(connections.length - 1)
      }
    })
    
    return { blocks, connections }
  }

  const animateKnowledgeNetwork = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    if (!isPlaying) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const blocks = blocksRef.current
    const connections = connectionsRef.current
    
    // Draw connections as individual lines (not batched to avoid solid shapes)
    ctx.strokeStyle = connectionColor
    ctx.lineWidth = 2
    
    connections.forEach(connection => {
      const startBlock = blocks[connection.start]
      const endBlock = blocks[connection.end]
      
      if (startBlock && endBlock) {
        ctx.globalAlpha = connection.opacity
        ctx.beginPath()
        ctx.moveTo(startBlock.x, startBlock.y)
        ctx.lineTo(endBlock.x, endBlock.y)
        ctx.stroke()
      }
    })
    
    // Draw particles as individual dots
    ctx.fillStyle = particleColor
    
    connections.forEach(connection => {
      const startBlock = blocks[connection.start]
      const endBlock = blocks[connection.end]
      
      if (startBlock && endBlock) {
        connection.flowParticles.forEach(particle => {
          if (!particle.active) return
          
          particle.progress += particle.speed
          if (particle.progress > 1) {
            particle.progress = 0
          }
          
          // Calculate particle position along the connection
          particle.x = startBlock.x + (endBlock.x - startBlock.x) * particle.progress
          particle.y = startBlock.y + (endBlock.y - startBlock.y) * particle.progress
          
          // Draw individual particle
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
          ctx.fill()
        })
      }
    })
    
    // Batch all block drawing operations
    ctx.fillStyle = blockColor
    ctx.globalAlpha = 1
    
    // Draw all blocks in a single batch
    blocks.forEach(block => {
      const currentSize = block.size
      const halfSize = currentSize
      ctx.globalAlpha = block.opacity
      ctx.fillRect(block.x - halfSize, block.y - halfSize, currentSize * 2, currentSize * 2)
    })

    animationRef.current = requestAnimationFrame(() => animateKnowledgeNetwork(canvas, ctx))
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
    blockColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
    connectionColor = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'
    particleColor = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'

    // Create theme change observer
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          isDark = document.documentElement.classList.contains('dark')
          blockColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
          connectionColor = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'
          particleColor = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
        }
      })
    })

    // Start observing theme changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Create initial knowledge network
    const { blocks, connections } = initializeKnowledgeNetwork(canvas)
    blocksRef.current = blocks
    connectionsRef.current = connections
    
    if (isPlaying) {
      animateKnowledgeNetwork(canvas, ctx)
    }

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
