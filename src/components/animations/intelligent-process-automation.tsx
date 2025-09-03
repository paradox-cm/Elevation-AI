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
    const speedFactor = 0.6
    
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
    
    // Batch traffic drawing operations
    ctx.strokeStyle = lineColorRef.current
    ctx.lineWidth = 1
    ctx.beginPath()
    
    // Update and draw traffic
    trafficRef.current.forEach(tradeLine => {
      // Update position
      if (tradeLine.dir === 'horizontal') {
        tradeLine.x += tradeLine.speed
        if (tradeLine.x > gridBoundary.x + gridBoundary.width) tradeLine.x = gridBoundary.x - gridSize
      } else {
        tradeLine.y += tradeLine.speed
        if (tradeLine.y > gridBoundary.y + gridBoundary.height) tradeLine.y = gridBoundary.y - gridSize
      }
      
      // Add to batch path instead of individual strokes
      if (tradeLine.dir === 'horizontal') {
        ctx.moveTo(tradeLine.x, tradeLine.y)
        ctx.lineTo(tradeLine.x + gridSize * 0.7, tradeLine.y) // Reduced line length to 70% of grid size
      } else {
        ctx.moveTo(tradeLine.x, tradeLine.y)
        ctx.lineTo(tradeLine.x, tradeLine.y + gridSize * 0.7) // Reduced line length to 70% of grid size
      }
    })
    
    // Single stroke for all traffic lines
    ctx.stroke()

    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx))
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = width
    canvas.height = height

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
