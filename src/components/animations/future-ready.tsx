"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useCanvasResize, maintainAspectRatio } from "@/hooks/use-canvas-resize"

interface Arrow {
  x: number
  y: number
  opacity: number
  delay: number
  originalX: number
  originalY: number
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
  const animationRef = useRef<number | null>(null)
  const arrowsRef = useRef<Arrow[]>([])
  const [isPlaying, _setIsPlaying] = useState(true)
  
  // Performance optimization: frame rate limiting and constants
  const lastFrameTimeRef = useRef(0)
  const targetFPS = 60
  const frameInterval = 1000 / targetFPS

  // Animation state for persistence across resizes
  const animationTimeRef = useRef(0)
  const isStartingUpRef = useRef(true)
  const startupDelayRef = useRef(0)

  // Theme-aware colors - will be set in useEffect
  const isDarkRef = useRef(false);
  const arrowColorRef = useRef('#000000');
  const observerRef = useRef<MutationObserver | null>(null);

  // E-AI-Arrow SVG path data
  const arrowPathData = "M91.7,158.3c-7.2,0-13.1-5.9-13.1-13.1v-40.1c0-11.1-9-20.1-20.1-20.1H13.1c-7.2,0-13.1-5.9-13.1-13.1V13.1C0,5.9,5.9,0,13.1,0h137.5c7.2,0,13.1,5.9,13.1,13.1v132.1c0,7.2-5.9,13.1-13.1,13.1h-58.8Z";

  const createArrows = useCallback((canvas: HTMLCanvasElement) => {
    const arrows: Arrow[] = []
    
    // Get the logical dimensions (CSS size) for positioning calculations
    const logicalWidth = canvas.width / (window.devicePixelRatio || 1)
    const logicalHeight = canvas.height / (window.devicePixelRatio || 1)
    
    // Maintain aspect ratio to prevent warping
    const baseWidth = 600 // Original design width
    const baseHeight = 400 // Original design height
    const scaleX = logicalWidth / baseWidth
    const scaleY = logicalHeight / baseHeight
    const scale = Math.min(scaleX, scaleY) // Use smaller scale to maintain aspect ratio
    
    // Calculate centered positioning
    const scaledWidth = baseWidth * scale
    const scaledHeight = baseHeight * scale
    const offsetX = (logicalWidth - scaledWidth) / 2
    const offsetY = (logicalHeight - scaledHeight) / 2
    
    // Base positioning (from original design)
    const baseCenterX = baseWidth * 0.3
    const baseCenterY = baseHeight * 0.5
    const baseArrowSpacing = 25
    const baseVerticalOffset = 25
    
    // Scale and center the positioning
    const centerX = offsetX + (baseCenterX * scale)
    const centerY = offsetY + (baseCenterY * scale)
    const arrowSpacing = baseArrowSpacing * scale
    const verticalOffset = baseVerticalOffset * scale
    
    // Create 5 arrows that repeat up and to the right
    for (let i = 0; i < 5; i++) {
      const x = centerX + (i * arrowSpacing)
      const y = centerY - (i * verticalOffset)
      
      const arrow: Arrow = {
        x,
        y,
        originalX: x,
        originalY: y,
        opacity: 0.1, // Start very transparent
        delay: i * 0.36, // Staggered appearance (slowed down by 20%)
      }
      arrows.push(arrow)
    }
    
    return arrows
  }, [])

  const drawArrow = useCallback((ctx: CanvasRenderingContext2D, arrow: Arrow, canvas: HTMLCanvasElement) => {
    ctx.save()
    
    // Calculate scale factor to maintain aspect ratio
    const logicalWidth = canvas.width / (window.devicePixelRatio || 1)
    const logicalHeight = canvas.height / (window.devicePixelRatio || 1)
    const baseWidth = 600
    const baseHeight = 400
    const scaleX = logicalWidth / baseWidth
    const scaleY = logicalHeight / baseHeight
    const scale = Math.min(scaleX, scaleY)
    
    // Set position and transform
    ctx.translate(arrow.x, arrow.y)
    ctx.scale(scale, scale) // Scale the arrow to maintain aspect ratio
    
    // Set stroke color and opacity
    ctx.strokeStyle = arrowColorRef.current
    ctx.lineWidth = 1.0 / scale // Adjust line width for scale
    ctx.globalAlpha = arrow.opacity
    
    // Draw the arrow path as stroke only
    const path = new Path2D(arrowPathData)
    ctx.stroke(path)
    
    ctx.restore()
  }, [])

  const animateArrows = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    if (!isPlaying) return

    // Frame rate limiting for consistent performance
    const currentTime = performance.now()
    if (currentTime - lastFrameTimeRef.current < frameInterval) {
      animationRef.current = requestAnimationFrame(() => animateArrows(canvas, ctx))
      return
    }
    lastFrameTimeRef.current = currentTime

    // Clear canvas completely (transparent background)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const arrows = arrowsRef.current
    const currentTime2 = performance.now() / 1000 // Convert to seconds
    
    // Calculate loop timing for seamless restart (slowed down by 20%)
    const totalAppearTime = 5 * 0.36 // Time for all arrows to appear (0.3s * 1.2)
    const totalFadeOutTime = 5 * 0.36 // Time for all arrows to fade out (0.3s * 1.2)
    const loopDuration = totalAppearTime + totalFadeOutTime // Perfect loop timing for smooth transition
    const loopTime = currentTime2 % loopDuration
    
    // Update animation time for state persistence
    animationTimeRef.current = currentTime2
    
    // Update and draw arrows
    arrows.forEach((arrow, index) => {
      // Check if we're in the fade-out phase
      const fadeOutStartTime = totalAppearTime + (index * 0.36) // Start fading out from bottom (index 0)
      
      if (loopTime >= fadeOutStartTime) {
        // Fade out phase - calculate fade progress
        const fadeProgress = Math.min(1, (loopTime - fadeOutStartTime) / 0.36)
        arrow.opacity = 0.9 * (1 - fadeProgress)
      } else {
        // Fade in phase - sequential from bottom to top (index 0 to 4)
        const fadeInStartTime = index * 0.36 // Start fading in from bottom (index 0)
        
        if (loopTime >= fadeInStartTime) {
          // Calculate fade in progress - match fade-out timing exactly
          const fadeInProgress = Math.min(1, (loopTime - fadeInStartTime) / 0.36)
          arrow.opacity = 0.9 * fadeInProgress
        } else {
          // Keep opacity at 0 before fade-in starts
          arrow.opacity = 0
        }
      }
      
      // Only draw if opacity > 0
      if (arrow.opacity > 0) {
        drawArrow(ctx, arrow, canvas)
      }
    })

    animationRef.current = requestAnimationFrame(() => animateArrows(canvas, ctx))
  }, [isPlaying, drawArrow])



  // Initialize canvas and start animation
  const initializeAndStartAnimation = useCallback(() => {
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

    // Create arrows with new dimensions
    arrowsRef.current = createArrows(canvas)

    // Start animation
    animateArrows(canvas, ctx)
  }, [createArrows, animateArrows])

  // Use canvas resize hook
  useCanvasResize(canvasRef, initializeAndStartAnimation, {
    debounceDelay: 150,
    preserveAspectRatio: true
  })

  useEffect(() => {
    // Theme-aware colors
    const updateColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      isDarkRef.current = isDark;
      arrowColorRef.current = isDark ? '#ffffff' : '#000000';
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

    // Start initial animation
    initializeAndStartAnimation()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [initializeAndStartAnimation])

  return (
    <div className={`flex justify-center ${className}`}>
      <div className={`${showBorder ? 'bg-muted/50 rounded-lg p-4 border border-border' : ''}`}>
        <canvas 
          ref={canvasRef}
          className="rounded-lg"
          style={{ 
            width: `${width}px`, 
            height: `${height}px`,
            maxWidth: '100%',
            maxHeight: '100%'
          }}
        />
      </div>
    </div>
  )
}
