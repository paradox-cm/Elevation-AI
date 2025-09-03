"use client"

import { useEffect, useRef, useState } from "react"

interface TradeLine {
  x: number
  y: number
  dir: 'horizontal' | 'vertical'
  speed: number
}

interface IntelligentProcessAutomationProps {
  width?: number
  height?: number
  className?: string
  showBorder?: boolean
}

export function IntelligentProcessAutomation({ 
  width = 600, 
  height = 400, 
  className = "",
  showBorder = true 
}: IntelligentProcessAutomationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const trafficRef = useRef<TradeLine[]>([])
  const [isPlaying, _setIsPlaying] = useState(true)

  // Define wider boundary area for grid and traffic (closer to 16:9 aspect ratio)
  const gridBoundary = {
    x: width * 0.203, // Start 20.3% from left edge (adjusted for wider area)
    y: height * 0.25, // Start 25% from top edge
    width: width * 0.593, // 59.3% of canvas width
    height: height * 0.5  // 50% of canvas height
  }

  // Theme-aware colors - will be set in useEffect
  const isDarkRef = useRef(false);
  const gridColorRef = useRef('rgba(0, 0, 0, 0.3)');
  const lineColorRef = useRef('rgba(0, 0, 0, 0.8)');
  const observerRef = useRef<MutationObserver | null>(null);

  const createTraffic = (canvas: HTMLCanvasElement) => {
    const traffic: TradeLine[] = []
    const gridSize = 32
    const speedFactor = 1.8
    
    // Create traffic only within the smaller boundary area
    for (let x = gridBoundary.x; x < gridBoundary.x + gridBoundary.width; x += gridSize * 3) {
      for (let y = gridBoundary.y; y < gridBoundary.y + gridBoundary.height; y += gridSize * 3) {
        traffic.push({
          x,
          y,
          dir: Math.random() > 0.5 ? 'horizontal' : 'vertical',
          speed: (Math.random() * 2 + 1) * speedFactor
        })
      }
    }
    return traffic
  }

  const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    if (!isPlaying) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Cache values for performance
    const gridSize = 32
    
    // Draw dots at grid intersections
    ctx.fillStyle = gridColorRef.current
    const dotSize = 2 // Size of each intersection dot
    
    // Draw dots only within the smaller boundary area
    for (let x = gridBoundary.x; x <= gridBoundary.x + gridBoundary.width; x += gridSize) {
      for (let y = gridBoundary.y; y <= gridBoundary.y + gridBoundary.height; y += gridSize) {
        ctx.beginPath()
        ctx.arc(x, y, dotSize, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    // Update and draw traffic with soft edge fade effect
    trafficRef.current.forEach(tradeLine => {
      // Update position
      if (tradeLine.dir === 'horizontal') {
        tradeLine.x += tradeLine.speed
        if (tradeLine.x > gridBoundary.x + gridBoundary.width) tradeLine.x = gridBoundary.x - gridSize
      } else {
        tradeLine.y += tradeLine.speed
        if (tradeLine.y > gridBoundary.y + gridBoundary.height) tradeLine.y = gridBoundary.y - gridSize
      }
      
      // Calculate fade opacity based on position (softer edges)
      let opacity = 1
      const fadeDistance = 40 // Distance from edge where fade starts
      
      if (tradeLine.dir === 'horizontal') {
        const distanceFromLeft = tradeLine.x - gridBoundary.x
        const distanceFromRight = (gridBoundary.x + gridBoundary.width) - tradeLine.x
        const minDistance = Math.min(distanceFromLeft, distanceFromRight)
        
        if (minDistance < fadeDistance) {
          opacity = minDistance / fadeDistance
        }
      } else {
        const distanceFromTop = tradeLine.y - gridBoundary.y
        const distanceFromBottom = (gridBoundary.y + gridBoundary.height) - tradeLine.y
        const minDistance = Math.min(distanceFromTop, distanceFromBottom)
        
        if (minDistance < fadeDistance) {
          opacity = minDistance / fadeDistance
        }
      }
      
      // Apply fade effect to line color
      const baseColor = lineColorRef.current
      const fadeColor = baseColor.replace(/[\d.]+\)$/, `${opacity})`)
      
      // Draw individual line with fade effect
      ctx.strokeStyle = fadeColor
      ctx.lineWidth = 1
      ctx.beginPath()
      
      if (tradeLine.dir === 'horizontal') {
        ctx.moveTo(tradeLine.x, tradeLine.y)
        ctx.lineTo(tradeLine.x + gridSize * 0.7, tradeLine.y)
      } else {
        ctx.moveTo(tradeLine.x, tradeLine.y)
        ctx.lineTo(tradeLine.x, tradeLine.y + gridSize * 0.7)
      }
      
      ctx.stroke()
    })

    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx))
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
      gridColorRef.current = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)';
      lineColorRef.current = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
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

    // Create initial traffic
    trafficRef.current = createTraffic(canvas)
    
    if (isPlaying) {
      animate(canvas, ctx)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [width, height, isPlaying, animate, createTraffic])

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

// Mobile-specific version with smaller grid and more traffic lines
export function IntelligentProcessAutomationMobile({ 
  width = 600, 
  height = 400, 
  className = "",
  showBorder = true 
}: IntelligentProcessAutomationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const trafficRef = useRef<TradeLine[]>([])
  const [isPlaying, _setIsPlaying] = useState(true)

  // Define wider boundary area for grid and traffic (closer to 16:9 aspect ratio)
  const gridBoundary = {
    x: width * 0.203, // Start 20.3% from left edge (adjusted for wider area)
    y: height * 0.2, // Start 20% from top edge (more space for grid)
    width: width * 0.593, // 59.3% of canvas width
    height: height * 0.6  // 60% of canvas height (more grid visible)
  }

  // Theme-aware colors - will be set in useEffect
  const isDarkRef = useRef(false);
  const gridColorRef = useRef('rgba(0, 0, 0, 0.3)');
  const lineColorRef = useRef('rgba(0, 0, 0, 0.8)');
  const observerRef = useRef<MutationObserver | null>(null);

  const createTraffic = (canvas: HTMLCanvasElement) => {
    const traffic: TradeLine[] = []
    const gridSize = 17 // Reduced grid size by 30% for mobile (was 24, now 17)
    const speedFactor = 1.8 // Keep same speed as desktop
    
    // Create traffic with more lines for mobile (smaller spacing between lines)
    for (let x = gridBoundary.x; x < gridBoundary.x + gridBoundary.width; x += gridSize * 1.3) { // Reduced spacing for more lines (was 1.5)
      for (let y = gridBoundary.y; y < gridBoundary.y + gridBoundary.height; y += gridSize * 1.3) { // Reduced spacing for more lines (was 1.5)
        // Add more randomness to starting positions
        const randomOffsetX = (Math.random() - 0.5) * gridSize * 1.2 // Increased from 0.8
        const randomOffsetY = (Math.random() - 0.5) * gridSize * 1.2 // Increased from 0.8
        
        // Determine if this is in the center area for more vertical lines
        const centerX = gridBoundary.x + gridBoundary.width / 2
        const centerY = gridBoundary.y + gridBoundary.height / 2
        const distanceFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
        const centerRadius = Math.min(gridBoundary.width, gridBoundary.height) * 0.3 // 30% of grid size
        
        // In center area: 80% vertical, 20% horizontal
        // Outside center area: 50% vertical, 50% horizontal
        const isInCenter = distanceFromCenter < centerRadius
        const verticalProbability = isInCenter ? 0.8 : 0.5
        
        // Add some randomness to the direction probability
        const finalVerticalProbability = verticalProbability + (Math.random() - 0.5) * 0.2
        
        traffic.push({
          x: x + randomOffsetX,
          y: y + randomOffsetY,
          dir: Math.random() < finalVerticalProbability ? 'vertical' : 'horizontal',
          speed: (Math.random() * 3 + 0.5) * speedFactor // More speed variation
        })
      }
    }
    
    // Add extra vertical lines specifically in the center for more density
    const centerX = gridBoundary.x + gridBoundary.width / 2
    const centerY = gridBoundary.y + gridBoundary.height / 2
    const centerRadius = Math.min(gridBoundary.width, gridBoundary.height) * 0.25 // 25% of grid size
    
    for (let i = 0; i < 18; i++) { // Increased from 15 to 18 (20% more)
      const randomX = centerX + (Math.random() - 0.5) * centerRadius * 1.5
      const randomY = gridBoundary.y + Math.random() * gridBoundary.height
      
      traffic.push({
        x: randomX,
        y: randomY,
        dir: 'vertical',
        speed: (Math.random() * 2 + 1) * speedFactor
      })
    }
    
    // Add more random traffic lines across the entire grid for better distribution
    for (let i = 0; i < 12; i++) { // Add 12 additional random lines
      const randomX = gridBoundary.x + Math.random() * gridBoundary.width
      const randomY = gridBoundary.y + Math.random() * gridBoundary.height
      const randomDir = Math.random() > 0.6 ? 'vertical' : 'horizontal'
      
      traffic.push({
        x: randomX,
        y: randomY,
        dir: randomDir,
        speed: (Math.random() * 3 + 0.5) * speedFactor
      })
    }
    
    // Add extra vertical lines specifically on the left and right sides
    const leftSideX = gridBoundary.x + gridSize * 2 // 2 grid units from left edge
    const rightSideX = gridBoundary.x + gridBoundary.width - gridSize * 2 // 2 grid units from right edge
    
    // Left side vertical lines
    for (let i = 0; i < 8; i++) { // Add 8 vertical lines on left side
      const randomY = gridBoundary.y + Math.random() * gridBoundary.height
      const randomOffsetX = (Math.random() - 0.5) * gridSize * 0.8 // Slight horizontal variation
      
      traffic.push({
        x: leftSideX + randomOffsetX,
        y: randomY,
        dir: 'vertical',
        speed: (Math.random() * 2 + 1) * speedFactor
      })
    }
    
    // Right side vertical lines
    for (let i = 0; i < 8; i++) { // Add 8 vertical lines on right side
      const randomY = gridBoundary.y + Math.random() * gridBoundary.height
      const randomOffsetX = (Math.random() - 0.5) * gridSize * 0.8 // Slight horizontal variation
      
      traffic.push({
        x: rightSideX + randomOffsetX,
        y: randomY,
        dir: 'vertical',
        speed: (Math.random() * 2 + 1) * speedFactor
      })
    }
    
    return traffic
  }

  const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    if (!isPlaying) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Cache values for performance
    const gridSize = 17 // Reduced grid size by 30% for mobile (was 24, now 17)
    
    // Draw dots at grid intersections
    ctx.fillStyle = gridColorRef.current
    const dotSize = 2 // Size of each intersection dot
    
    // Draw dots only within the smaller boundary area
    for (let x = gridBoundary.x; x <= gridBoundary.x + gridBoundary.width; x += gridSize) {
      for (let y = gridBoundary.y; y <= gridBoundary.y + gridBoundary.height; y += gridSize) {
        ctx.beginPath()
        ctx.arc(x, y, dotSize, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    // Update and draw traffic with soft edge fade effect
    trafficRef.current.forEach(tradeLine => {
      // Add more frequent direction changes for better randomness (mobile only)
      if (Math.random() < 0.002) { // Increased from 0.001 to 0.002 (0.2% chance per frame)
        tradeLine.dir = Math.random() > 0.5 ? 'horizontal' : 'vertical'
      }
      
      // Add occasional speed variations to break up repetitive patterns
      if (Math.random() < 0.003) { // 0.3% chance per frame to vary speed
        tradeLine.speed = (Math.random() * 3 + 0.5) * 1.8 // Use the speedFactor value directly
      }
      
      // Update position with enhanced randomization
      if (tradeLine.dir === 'horizontal') {
        // Horizontal lines get more varied movement
        const movementVariation = 0.8 + Math.random() * 0.4 // 0.8 to 1.2 variation
        tradeLine.x += tradeLine.speed + (Math.random() - 0.5) * movementVariation
        if (tradeLine.x > gridBoundary.x + gridBoundary.width) tradeLine.x = gridBoundary.x - gridSize
      } else {
        // Vertical lines get more varied movement for better visual effect
        const centerX = gridBoundary.x + gridBoundary.width / 2
        const distanceFromCenter = Math.abs(tradeLine.x - centerX)
        const centerRadius = Math.min(gridBoundary.width, gridBoundary.height) * 0.25
        
        // Center vertical lines get more varied movement
        const movementVariation = distanceFromCenter < centerRadius ? 1.2 : 0.8
        const randomOffset = (Math.random() - 0.5) * 2 // Increased random movement
        tradeLine.y += tradeLine.speed + randomOffset * movementVariation
        
        if (tradeLine.y > gridBoundary.y + gridBoundary.height) tradeLine.y = gridBoundary.y - gridSize
      }
      
      // Calculate fade opacity based on position (softer edges)
      let opacity = 1
      const fadeDistance = 40 // Distance from edge where fade starts
      
      if (tradeLine.dir === 'horizontal') {
        const distanceFromLeft = tradeLine.x - gridBoundary.x
        const distanceFromRight = (gridBoundary.x + gridBoundary.width) - tradeLine.x
        const minDistance = Math.min(distanceFromLeft, distanceFromRight)
        
        if (minDistance < fadeDistance) {
          opacity = minDistance / fadeDistance
        }
      } else {
        const distanceFromTop = tradeLine.y - gridBoundary.y
        const distanceFromBottom = (gridBoundary.y + gridBoundary.height) - tradeLine.y
        const minDistance = Math.min(distanceFromTop, distanceFromBottom)
        
        if (minDistance < fadeDistance) {
          opacity = minDistance / fadeDistance
        }
      }
      
      // Apply fade effect to line color
      const baseColor = lineColorRef.current
      const fadeColor = baseColor.replace(/[\d.]+\)$/, `${opacity})`)
      
      // Draw individual line with fade effect
      ctx.strokeStyle = fadeColor
      ctx.lineWidth = 1
      ctx.beginPath()
      
      if (tradeLine.dir === 'horizontal') {
        ctx.moveTo(tradeLine.x, tradeLine.y)
        ctx.lineTo(tradeLine.x + gridSize * 0.7, tradeLine.y)
      } else {
        ctx.moveTo(tradeLine.x, tradeLine.y)
        ctx.lineTo(tradeLine.x, tradeLine.y + gridSize * 0.7)
      }
      
    ctx.stroke()
    })

    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx))
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
      gridColorRef.current = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)';
      lineColorRef.current = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
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

    // Create initial traffic
    trafficRef.current = createTraffic(canvas)
    
    if (isPlaying) {
      animate(canvas, ctx)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [width, height, isPlaying, animate, createTraffic])

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
