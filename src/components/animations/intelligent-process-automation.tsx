"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useCanvasResize } from "@/hooks/use-canvas-resize"
import { useVisibilityReset } from "@/hooks/use-visibility-reset"
import { useBreakpointReset } from "@/hooks/use-breakpoint-reset"
import { useScrollTriggeredAnimation } from "@/hooks/use-scroll-triggered-animation"

interface TradeLine {
  x: number
  y: number
  dir: 'horizontal' | 'vertical'
  speed: number
  horizontalDirection?: number
  verticalDirection?: number
}

interface IntelligentProcessAutomationProps {
  width?: number
  height?: number
  className?: string
  showBorder?: boolean
  scrollTriggered?: boolean
}

export function IntelligentProcessAutomation({ 
  width = 600, 
  height = 400, 
  className = "",
  showBorder = true,
  scrollTriggered = false
}: IntelligentProcessAutomationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const trafficRef = useRef<TradeLine[]>([])
  const [isPlaying, _setIsPlaying] = useState(true)
  const [animationKey, setAnimationKey] = useState(0)
  
  // Scroll-triggered animation hook
  const { containerRef: scrollContainerRef, isPlaying: scrollIsPlaying } = useScrollTriggeredAnimation({
    duration: 3000, // 3 seconds
    threshold: 0.1
  })

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
    const speedFactor = 0.3
    
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
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
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

    // If scroll-triggered and not playing, don't start animation
    if (scrollTriggered && !scrollIsPlaying) {
      return
    }

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
  }, [width, height, isPlaying, animate, createTraffic, animationKey, scrollTriggered, scrollIsPlaying])

  // If scroll-triggered, use scroll container ref
  const containerRefToUse = scrollTriggered ? scrollContainerRef : null

  return (
    <div ref={containerRefToUse} className={`flex justify-center ${className}`}>
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
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const trafficRef = useRef<TradeLine[]>([])
  const [isPlaying, _setIsPlaying] = useState(true)
  const [animationKey, setAnimationKey] = useState(0)

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
    console.log('IntelligentProcessAutomation visibility changed:', isVisible)
    if (isVisible) {
      console.log('IntelligentProcessAutomation: Restarting animation due to visibility change')
      // Component became visible, force animation restart
      initializeAndStartAnimation()
    }
  })

  // Alternative approach: Use breakpoint reset hook
  useBreakpointReset(containerRef, () => {
    console.log('IntelligentProcessAutomation: Breakpoint change detected, restarting animation')
    // Animation restart triggered by breakpoint change
    initializeAndStartAnimation()
  })

  // Additional window resize listener for extra safety
  useEffect(() => {
    const handleResize = () => {
      console.log('IntelligentProcessAutomation: Window resize detected, checking if restart needed')
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
            console.log('IntelligentProcessAutomation: Element is visible after resize, restarting animation')
            initializeAndStartAnimation()
          }
        }
      }, 100)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [initializeAndStartAnimation])

  const createTraffic = (canvas: HTMLCanvasElement) => {
    const traffic: TradeLine[] = []
    const gridSize = 17 // Smaller grid for mobile
    const devicePixelRatio = window.devicePixelRatio || 1
    const speedFactor = 1.8 / devicePixelRatio // Adjust speed for device pixel ratio
    
    // Create traffic only within the smaller boundary area (same logic as desktop)
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
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
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

    // If scroll-triggered and not playing, don't start animation
    if (scrollTriggered && !scrollIsPlaying) {
      return
    }

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
  }, [width, height, isPlaying, animate, createTraffic, animationKey, scrollTriggered, scrollIsPlaying])

  // If scroll-triggered, use scroll container ref
  const containerRefToUse = scrollTriggered ? scrollContainerRef : null

  return (
    <div ref={containerRefToUse} className={`flex justify-center ${className}`}>
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

