"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import { useCanvasResize } from "@/hooks/use-canvas-resize"

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
    setAnimationKey(prev => prev + 1)
  }, [])

  // Use canvas resize hook
  useCanvasResize(canvasRef, initializeAndStartAnimation, {
    debounceDelay: 150,
    preserveAspectRatio: true
  })

  useEffect(() => {
    const canvasData = initializeCanvas()
    if (!canvasData || !canvasData.canvas || !canvasData.ctx) return
    const { canvas, ctx } = canvasData

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
    
    // Persistent base network that doesn't fade
    const baseNodes: Array<{ x: number; y: number; radius: number; draw: () => void }> = []
    const baseLines: Array<{ start: { x: number; y: number }; end: { x: number; y: number }; draw: () => void }> = []
    
    // Internal base network connections (dynamic)
    const baseInternalLines: Array<{ 
      start: { x: number; y: number }; 
      end: { x: number; y: number }; 
      opacity: number; 
      maxOpacity: number;
      draw: () => void; 
      update: () => void;
    }> = []

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
        this.vx = (Math.random() - 0.5) * 2.0
        this.vy = (Math.random() - 0.5) * 2.0
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
        
        this.opacity -= 0.010 // Reduced for slower fade-out
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
        // Lines fade out slower to stay longer
        this.opacity -= 0.008 // Reduced for slower fade-out
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
          this.opacity -= 0.015 // Faster fade for dynamic nodes
        }
      }
      nodes.push(newNode)

      for (let i = 0; i < 3; i++) { // Reduced from 6 to 3 connections per node
        if (nodes.length > i + 1) {
          lines.push(new Line({ x: newNode.x, y: newNode.y }, { x: nodes[nodes.length - (i + 2)].x, y: nodes[nodes.length - (i + 2)].y }))
        }
      }
    }

    function addBaseInternalConnection() {
      if (baseNodes.length < 2) return
      
      // Limit maximum connections to prevent buildup (doubled for more density)
      if (baseInternalLines.length > 16) return
      
      // Ensure minimum activity: if very few connections exist, increase probability
      const minConnections = 2
      const shouldForceConnection = baseInternalLines.length < minConnections
      
      // Ensure minimum activity: if no connections exist, force at least one
      if (baseInternalLines.length === 0) {
        // Force create a connection to prevent empty gaps
        const startIdx = Math.floor(Math.random() * baseNodes.length)
        let endIdx = Math.floor(Math.random() * baseNodes.length)
        while (endIdx === startIdx) {
          endIdx = Math.floor(Math.random() * baseNodes.length)
        }
        // Create connection without additional randomization when forcing
        const startNode = baseNodes[startIdx]
        const endNode = baseNodes[endIdx]
        const distance = Math.sqrt(
          Math.pow(startNode.x - endNode.x, 2) + 
          Math.pow(startNode.y - endNode.y, 2)
        )
        const maxConnectionDistance = Math.min(nodeBoundary.width, nodeBoundary.height) * 0.8
        if (distance <= maxConnectionDistance) {
          // Create the forced connection
          const maxOpacity = 0.3 + Math.random() * 0.6
          const fadeInSpeed = 0.012 // Consistent fade in speed for all lines
          const fadeOutSpeed = 0.010 // Consistent fade out speed for all lines
          const scaleX = nodeBoundary.width / 88
          const scaleY = nodeBoundary.height / 84.4
          const scale = Math.min(scaleX, scaleY) * 1.04
          const lineWidth = 0.7 * scale
          
          const internalLine = {
            start: { x: startNode.x, y: startNode.y },
            end: { x: endNode.x, y: endNode.y },
            opacity: 0,
            maxOpacity,
            fadeInSpeed,
            fadeOutSpeed,
            lineWidth,
            isFadingIn: true,
            lifespan: 0,
            maxLifespan: 80, // Consistent lifespan for all lines (80 frames)
            draw() {
              if (!ctx) return
              ctx.beginPath()
              ctx.moveTo(this.start.x, this.start.y)
              ctx.lineTo(this.end.x, this.end.y)
              ctx.strokeStyle = `${lineColor}${this.opacity})`
              ctx.lineWidth = this.lineWidth
              ctx.stroke()
            },
            update() {
              this.lifespan++
              if (this.lifespan >= this.maxLifespan) {
                this.isFadingIn = false
                this.opacity -= this.fadeOutSpeed * 2
                if (this.opacity <= 0) {
                  this.opacity = 0
                }
                return
              }
              if (this.isFadingIn) {
                this.opacity += this.fadeInSpeed
                if (this.opacity >= this.maxOpacity) {
                  this.opacity = this.maxOpacity
                  this.isFadingIn = false
                }
              } else {
                this.opacity -= this.fadeOutSpeed
                if (this.opacity <= 0) {
                  this.opacity = 0
                }
              }
            }
          }
          baseInternalLines.push(internalLine)
        }
        return
      }
      
      // AI Engine: More often create multiple connections at once (increased by 33%)
      const connectionCount = Math.random() < 0.29 ? 2 : 1 // 29% chance for 2 connections (increased by 33%)
      
      for (let c = 0; c < connectionCount; c++) {
        // Enhanced randomization to break X patterns
        // Weighted selection: prefer certain node positions to avoid repetitive patterns
        const getWeightedRandomNode = () => {
          const weights = [0.15, 0.1, 0.15, 0.1, 0.15, 0.1, 0.15, 0.1] // Vary weights for different nodes
          const random = Math.random()
          let cumulative = 0
          for (let i = 0; i < weights.length; i++) {
            cumulative += weights[i]
            if (random <= cumulative) return i
          }
          return Math.floor(Math.random() * baseNodes.length) // Fallback
        }
        
        const startIdx = getWeightedRandomNode()
        let endIdx = getWeightedRandomNode()
        
        // Ensure we don't connect a node to itself
        while (endIdx === startIdx) {
          endIdx = getWeightedRandomNode()
        }
        
        // Add extra randomization: reduce skip chance when few connections exist
        const skipChance = shouldForceConnection ? 0.02 : 0.1 // 2% skip when forcing, 10% normally
        if (Math.random() < skipChance) {
          continue
        }
      
      const startNode = baseNodes[startIdx]
      const endNode = baseNodes[endIdx]
      
      // Calculate distance between nodes
      const distance = Math.sqrt(
        Math.pow(startNode.x - endNode.x, 2) + 
        Math.pow(startNode.y - endNode.y, 2)
      )
      
      // Variable connection distance with randomization to break X patterns
      const baseMaxDistance = Math.min(nodeBoundary.width, nodeBoundary.height) * 0.8
      const distanceVariation = 0.3 + Math.random() * 0.4 // 30-70% of base distance
      const maxConnectionDistance = baseMaxDistance * distanceVariation
      
      // Additional randomization: 20% chance to allow longer connections
      const allowLongConnection = Math.random() < 0.2
      if (distance > maxConnectionDistance && !allowLongConnection) return
      
      // Check if this connection already exists
      const connectionExists = baseInternalLines.some(line => 
        (line.start.x === startNode.x && line.start.y === startNode.y && 
         line.end.x === endNode.x && line.end.y === endNode.y) ||
        (line.start.x === endNode.x && line.start.y === endNode.y && 
         line.end.x === startNode.x && line.end.y === startNode.y)
      )
      
      if (connectionExists) return
      
      // Create new internal connection with AI engine characteristics
      const maxOpacity = 0.3 + Math.random() * 0.6 // Vary opacity between 0.3 and 0.9
      const fadeInSpeed = 0.012 // Consistent fade in speed for all lines
      const fadeOutSpeed = 0.010 // Consistent fade out speed for all lines
      // Calculate scale to match base network line thickness
      const scaleX = nodeBoundary.width / 88
      const scaleY = nodeBoundary.height / 84.4
      const scale = Math.min(scaleX, scaleY) * 1.04 // Same as base network
      const lineWidth = 0.7 * scale // Match base network line thickness
      
      const internalLine = {
        start: { x: startNode.x, y: startNode.y },
        end: { x: endNode.x, y: endNode.y },
        opacity: 0,
        maxOpacity,
        fadeInSpeed,
        fadeOutSpeed,
        lineWidth,
        isFadingIn: true, // Track fade state
        lifespan: 0, // Track how long connection has existed
            maxLifespan: 80, // Consistent lifespan for all lines (80 frames)
        draw() {
          if (!ctx) return
          ctx.beginPath()
          ctx.moveTo(this.start.x, this.start.y)
          ctx.lineTo(this.end.x, this.end.y)
          ctx.strokeStyle = `${lineColor}${this.opacity})`
          ctx.lineWidth = this.lineWidth
          ctx.stroke()
        },
        update() {
          this.lifespan++
          
          // Force fade out after max lifespan
          if (this.lifespan >= this.maxLifespan) {
            this.isFadingIn = false
            this.opacity -= this.fadeOutSpeed * 2 // Faster fade out when expired
            if (this.opacity <= 0) {
              this.opacity = 0
            }
            return
          }
          
          // AI Engine: Clear fade in/out states
          if (this.isFadingIn) {
            this.opacity += this.fadeInSpeed
            if (this.opacity >= this.maxOpacity) {
              this.opacity = this.maxOpacity
              this.isFadingIn = false // Switch to fade out
            }
          } else {
            this.opacity -= this.fadeOutSpeed
            if (this.opacity <= 0) {
              this.opacity = 0
            }
          }
        }
      }
      
        baseInternalLines.push(internalLine)
      }
    }

    function initializeComplexState() {
      // Create base network from E-Arrow-Nodes.svg
      // Scale factor to fit within nodeBoundary (SVG viewBox: 88 x 84.4)
      const scaleX = nodeBoundary.width / 88
      const scaleY = nodeBoundary.height / 84.4
      const scale = Math.min(scaleX, scaleY) * 1.04 // 80% * 1.3 = 104% for 30% increase
      
      // Center the E-Arrow shape within the boundary
      const centerX = nodeBoundary.x + nodeBoundary.width / 2
      const centerY = nodeBoundary.y + nodeBoundary.height / 2
      const offsetX = centerX - (88 * scale) / 2
      const offsetY = centerY - (84.4 * scale) / 2
      
      // Define E-Arrow-Nodes shape key points (from SVG analysis)
      // This creates an upside-down L with nodes at key positions
      const eArrowNodesPoints = [
        // From SVG circles (cx, cy, r=1.1)
        { x: 42.3, y: 44.9 },  // Inner corner (cutout boundary)
        { x: 42.3, y: 79.7 },  // Bottom-left corner
        { x: 82.9, y: 79.7 },  // Bottom-right corner
        { x: 82.9, y: 4.6 },   // Top-right corner
        { x: 5.2, y: 4.6 },    // Top-left corner
        { x: 5.2, y: 44.9 },   // Left edge middle
        { x: 82.9, y: 43.8 },  // Right edge middle
        { x: 42.3, y: 4.6 },   // Top edge middle
      ]
      
      // Create base nodes at E-Arrow key points
      eArrowNodesPoints.forEach(point => {
        const baseNode = { 
          x: offsetX + point.x * scale, 
          y: offsetY + point.y * scale, 
          radius: 1.1 * scale, // Scale the radius from SVG
          draw() {
            if (!ctx) return
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
            ctx.fillStyle = `${nodeColor}0.9)` // Match animation color
            ctx.fill()
          }
        }
        baseNodes.push(baseNode)
      })
      
      // Create connections based on SVG polygon path
      // The polygon creates the outline: "42.5 45 42.5 79.7 82.9 79.7 82.9 62.4 82.9 60.8 82.9 55.7 82.9 45 82.9 4.6 5.2 4.6 5.2 45 42.5 45"
      const eArrowConnections = [
        // Main outline connections (following the polygon path)
        [0, 1], // Inner corner to bottom-left
        [1, 2], // Bottom-left to bottom-right
        [2, 3], // Bottom-right to top-right
        [3, 7], // Top-right to top-middle
        [7, 4], // Top-middle to top-left
        [4, 5], // Top-left to left-middle
        [5, 0], // Left-middle to inner corner
      ]
      
      // Create base lines for E-Arrow shape
      eArrowConnections.forEach(([startIdx, endIdx]) => {
        if (startIdx < baseNodes.length && endIdx < baseNodes.length) {
          const baseLine = {
            start: { x: baseNodes[startIdx].x, y: baseNodes[startIdx].y },
            end: { x: baseNodes[endIdx].x, y: baseNodes[endIdx].y },
            draw() {
              if (!ctx) return
              ctx.beginPath()
              ctx.moveTo(this.start.x, this.start.y)
              ctx.lineTo(this.end.x, this.end.y)
              ctx.strokeStyle = `${lineColor}0.8)` // Match animation color
              ctx.lineWidth = 0.7 * scale // Scale stroke width from SVG
              ctx.stroke()
            }
          }
          baseLines.push(baseLine)
        }
      })
    }



    function animate() {
      if (!ctx || !canvas) return
      // Clear completely each frame
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw persistent base network first (always visible)
      baseLines.forEach(line => line.draw())
      baseNodes.forEach(node => node.draw())
      
      // Draw and update internal base network connections
      for (let i = baseInternalLines.length - 1; i >= 0; i--) {
        const line = baseInternalLines[i]
        line.draw()
        line.update()
        if (line.opacity <= 0) {
          baseInternalLines.splice(i, 1) // Remove faded connections
          // console.log('Removed connection, remaining:', baseInternalLines.length)
        }
      }
      
      // Dynamic nodes and lines animation removed - only base network now
      
      animationRef.current = requestAnimationFrame(animate)
    }

        // Initialize with complex starting state
        initializeComplexState()

        // AI Engine: Randomized intervals to break X patterns (reduced gaps)
        const createRandomInterval = (baseMs: number) => {
          return setInterval(() => {
            // 15% chance to skip this interval entirely (reduced to prevent gaps)
            if (Math.random() < 0.15) return
            addBaseInternalConnection()
          }, baseMs + Math.random() * 30) // Reduced variation for more consistent timing
        }
        
        const baseInternalInterval = createRandomInterval(125) // Base 125ms + variation
        const baseInternalInterval2 = createRandomInterval(150) // Base 150ms + variation
        const baseInternalInterval3 = createRandomInterval(188) // Base 188ms + variation
        const baseInternalInterval4 = createRandomInterval(225) // Base 225ms + variation
        const baseInternalInterval5 = createRandomInterval(275) // Base 275ms + variation
        
        // AI Engine: Enhanced burst effect - create many connections at once (increased by 33%)
        const burstInterval = setInterval(() => {
          if (Math.random() < 0.36) { // 36% chance for burst (increased by 33%)
            for (let i = 0; i < 3 + Math.floor(Math.random() * 2); i++) { // 3-4 connections (increased by 33%)
              addBaseInternalConnection()
            }
          }
        }, 1875) // Check for burst every 1.875 seconds (1500 * 1.25)
        animate()

    return () => {
      clearInterval(baseInternalInterval)
      clearInterval(baseInternalInterval2)
      clearInterval(baseInternalInterval3)
      clearInterval(baseInternalInterval4)
      clearInterval(baseInternalInterval5)
      clearInterval(burstInterval)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      observer.disconnect()
    }
  }, [width, height, animationKey])

  return (
    <div className={`flex justify-center ${className}`}>
      <div className={`${showBorder ? 'rounded-lg p-4 border border-border' : ''}`}>
        <canvas 
          ref={canvasRef}
          className="rounded-lg"
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      </div>
    </div>
  )
}
