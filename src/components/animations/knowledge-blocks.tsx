"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useCanvasResize } from "@/hooks/use-canvas-resize"
import { useVisibilityReset } from "@/hooks/use-visibility-reset"
import { useBreakpointReset } from "@/hooks/use-breakpoint-reset"

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
  width = 480, 
  height = 320, 
  className = "",
  showBorder = true 
}: KnowledgeBlocksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const blocksRef = useRef<KnowledgeBlock[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const [isPlaying, _setIsPlaying] = useState(true)
  const [animationKey, setAnimationKey] = useState(0)
  
  // Performance optimized: Reduced from 168 to 45 total animated objects

  // Theme-aware colors - will be set in useEffect
  const isDarkRef = useRef(false);
  const blockColorRef = useRef('rgba(0, 0, 0, 0.8)');
  const connectionColorRef = useRef('rgba(0, 0, 0, 0.6)');
  const particleColorRef = useRef('rgba(0, 0, 0, 0.9)');
  const observerRef = useRef<MutationObserver | null>(null);

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
    setAnimationKey(prev => prev + 1)
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

  const initializeKnowledgeNetwork = (canvas: HTMLCanvasElement) => {
    const blocks: KnowledgeBlock[] = []
    const connections: Connection[] = []
    
    // Create knowledge blocks in a grid pattern (reduced for performance)
    const cols = 5 // Reduced from 6 to 5
    const rows = 3 // Reduced from 4 to 3
    
    // Get the logical dimensions (CSS size) for positioning calculations
    const logicalWidth = canvas.width / (window.devicePixelRatio || 1)
    const logicalHeight = canvas.height / (window.devicePixelRatio || 1)
    
    const spacingX = logicalWidth / (cols + 1)
    const spacingY = logicalHeight / (rows + 1)
    
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
    
    // Create logical network-like connections (reduced frequency for performance)
    blocks.forEach((block, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols
      
      // Connect to adjacent blocks in a grid pattern
      const adjacentConnections = []
      
      // Connect to right neighbor (if exists)
      if (col < cols - 1) {
        adjacentConnections.push(index + 1)
      }
      
      // Connect to bottom neighbor (if exists)
      if (row < rows - 1) {
        adjacentConnections.push(index + cols)
      }
      
      // Connect to diagonal bottom-right (if exists) - 80% reduced frequency
      if (col < cols - 1 && row < rows - 1 && index % 10 === 0) {
        adjacentConnections.push(index + cols + 1)
      }
      
      // Connect to diagonal bottom-left (if exists) - 80% reduced frequency
      if (col > 0 && row < rows - 1 && index % 10 === 0) {
        adjacentConnections.push(index + cols - 1)
      }
      
      // Add some cross-connections for network effect (but not random) - 80% reduced frequency
      if (index % 20 === 0 && index + 2 < blocks.length) {
        adjacentConnections.push(index + 2)
      }
      
      // Create connections with consistent opacity
      adjacentConnections.forEach(targetIndex => {
        if (targetIndex < blocks.length) {
          const connection: Connection = {
            start: index,
            end: targetIndex,
            opacity: 0.8, // Consistent opacity for all connections
            flowParticles: []
          }
          
          // Add flow particle
          connection.flowParticles.push({
            x: block.x,
            y: block.y,
            progress: Math.random(),
            speed: 0.002 + Math.random() * 0.003, // Consistent speed range
            active: true
          })
          
          connections.push(connection)
          block.connections.push(connections.length - 1)
        }
      })
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
    ctx.strokeStyle = connectionColorRef.current
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
    ctx.fillStyle = particleColorRef.current
    
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
    ctx.fillStyle = blockColorRef.current
    ctx.globalAlpha = 1
    
    // Draw all blocks in a single batch
    blocks.forEach(block => {
      const currentSize = block.size
      const halfSize = currentSize
      ctx.globalAlpha = 1 // Always solid, no transparency
      ctx.fillRect(block.x - halfSize, block.y - halfSize, currentSize * 2, currentSize * 2)
    })

    animationRef.current = requestAnimationFrame(() => animateKnowledgeNetwork(canvas, ctx))
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

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

    // Theme-aware colors
    const updateColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      isDarkRef.current = isDark;
      blockColorRef.current = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'; // Solid colors
      connectionColorRef.current = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'; // Slightly transparent
      particleColorRef.current = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'; // Solid colors
    };

    // Initial color update
    updateColors();

    // Observe theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateColors();
        }
      });
    });
    observerRef.current = observer;
    observer.observe(document.documentElement, { attributes: true });

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
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [width, height, isPlaying, animateKnowledgeNetwork, initializeKnowledgeNetwork, animationKey])

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

// Mobile-specific version with smaller squares and fewer connections
export function KnowledgeBlocksMobile({ 
  width = 480, 
  height = 320, 
  className = "",
  showBorder = true 
}: KnowledgeBlocksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const blocksRef = useRef<KnowledgeBlock[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const [isPlaying, _setIsPlaying] = useState(true)
  const [animationKey, setAnimationKey] = useState(0)
  
  // Performance optimized: Reduced from 168 to 45 total animated objects

  // Theme-aware colors - will be set in useEffect
  const isDarkRef = useRef(false);
  const blockColorRef = useRef('rgba(0, 0, 0, 1)'); // Solid black, no transparency
  const connectionColorRef = useRef('rgba(0, 0, 0, 0.8)'); // Slightly transparent for connections
  const particleColorRef = useRef('rgba(0, 0, 0, 1)'); // Solid black particles
  const observerRef = useRef<MutationObserver | null>(null);

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
    if (isVisible) {
      initializeAndStartAnimation()
    }
  })

  // Alternative approach: Use breakpoint reset hook
  useBreakpointReset(containerRef, () => {
    // Animation restart triggered by breakpoint change
    initializeAndStartAnimation()
  })

  const initializeKnowledgeNetwork = (canvas: HTMLCanvasElement) => {
    const blocks: KnowledgeBlock[] = []
    const connections: Connection[] = []
    
    // Create knowledge blocks in a grid pattern (reduced for performance) - MOBILE VERSION
    const cols = 5 // Reduced from 6 to 5
    const rows = 3 // Reduced from 4 to 3
    
    // Get the logical dimensions (CSS size) for positioning calculations
    const logicalWidth = canvas.width / (window.devicePixelRatio || 1)
    const logicalHeight = canvas.height / (window.devicePixelRatio || 1)
    
    const spacingX = logicalWidth / (cols + 1)
    const spacingY = logicalHeight / (rows + 1)
    
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const block: KnowledgeBlock = {
          x: spacingX * (x + 1),
          y: spacingY * (y + 1),
          size: 10.8, // 28% smaller for mobile (was 15, now 10.8)
          connections: [],
          opacity: 1, // Solid, no transparency
          pulsePhase: 0
        }
        blocks.push(block)
      }
    }
    
    // Create logical network-like connections with fewer lines for mobile
    blocks.forEach((block, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols
      
      // Connect to adjacent blocks in a grid pattern
      const adjacentConnections = []
      
      // Connect to right neighbor (if exists)
      if (col < cols - 1) {
        adjacentConnections.push(index + 1)
      }
      
      // Connect to bottom neighbor (if exists)
      if (row < rows - 1) {
        adjacentConnections.push(index + cols)
      }
      
      // Connect to diagonal bottom-right (if exists) - reduced frequency for mobile (87.5% fewer)
      if (col < cols - 1 && row < rows - 1 && index % 24 === 0) {
        adjacentConnections.push(index + cols + 1)
      }
      
      // Connect to diagonal bottom-left (if exists) - reduced frequency for mobile (87.5% fewer)
      if (col > 0 && row < rows - 1 && index % 24 === 0) {
        adjacentConnections.push(index + cols - 1)
      }
      
      // Add some cross-connections for network effect (but not random) - reduced frequency for mobile (87.5% fewer)
      if (index % 40 === 0 && index + 2 < blocks.length) {
        adjacentConnections.push(index + 2)
      }
      
      // Create connections with consistent opacity
      adjacentConnections.forEach(targetIndex => {
        if (targetIndex < blocks.length) {
          const connection: Connection = {
            start: index,
            end: targetIndex,
            opacity: 0.8, // Consistent opacity for all connections
            flowParticles: []
          }
          
          // Add flow particle
          connection.flowParticles.push({
            x: block.x,
            y: block.y,
            progress: Math.random(),
            speed: 0.002 + Math.random() * 0.003, // Consistent speed range
            active: true
          })
          
          connections.push(connection)
          block.connections.push(connections.length - 1)
        }
      })
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
    ctx.strokeStyle = connectionColorRef.current
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
    ctx.fillStyle = particleColorRef.current
    
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
    ctx.fillStyle = blockColorRef.current
    ctx.globalAlpha = 1 // Always solid, no transparency
    
    // Draw all blocks in a single batch
    blocks.forEach(block => {
      const currentSize = block.size
      const halfSize = currentSize
      ctx.globalAlpha = 1 // Always solid, no transparency
      ctx.fillRect(block.x - halfSize, block.y - halfSize, currentSize * 2, currentSize * 2)
    })

    animationRef.current = requestAnimationFrame(() => animateKnowledgeNetwork(canvas, ctx))
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

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

    // Theme-aware colors
    const updateColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      isDarkRef.current = isDark;
      blockColorRef.current = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'; // Solid colors
      connectionColorRef.current = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'; // Slightly transparent
      particleColorRef.current = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'; // Solid colors
    };

    // Initial color update
    updateColors();

    // Observe theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateColors();
        }
      });
    });
    observerRef.current = observer;
    observer.observe(document.documentElement, { attributes: true });

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
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [width, height, isPlaying, animateKnowledgeNetwork, initializeKnowledgeNetwork, animationKey])

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
