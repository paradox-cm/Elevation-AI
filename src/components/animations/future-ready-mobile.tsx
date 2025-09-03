"use client"

import { useEffect, useRef, useState } from "react"

interface Arrow {
  x: number
  y: number
  opacity: number
  delay: number
}

interface FutureReadyMobileProps {
  width?: number
  height?: number
  className?: string
  showBorder?: boolean
}

export function FutureReadyMobile({ 
  width = 250, 
  height = 200, 
  className = "",
  showBorder = true 
}: FutureReadyMobileProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const arrowsRef = useRef<Arrow[]>([])
  const [isPlaying, _setIsPlaying] = useState(true)
  
  // Performance optimization: frame rate limiting and constants
  const lastFrameTimeRef = useRef(0)
  const targetFPS = 60
  const frameInterval = 1000 / targetFPS

  // Theme-aware colors - will be set in useEffect
  const isDarkRef = useRef(false);
  const arrowColorRef = useRef('#000000');
  const observerRef = useRef<MutationObserver | null>(null);

  // E-AI-Arrow SVG path data (scaled down for mobile)
  const arrowPathData = "M91.7,158.3c-7.2,0-13.1-5.9-13.1-13.1v-40.1c0-11.1-9-20.1-20.1-20.1H13.1c-7.2,0-13.1-5.9-13.1-13.1V13.1C0,5.9,5.9,0,13.1,0h137.5c7.2,0,13.1,5.9,13.1,13.1v132.1c0,7.2-5.9,13.1-13.1,13.1h-58.8Z";

  const createArrows = (canvas: HTMLCanvasElement) => {
    const arrows: Arrow[] = []
    
    // Mobile-first positioning and sizing (50% smaller than desktop)
    const centerX = canvas.width * 0.35 // Start from left side for mobile (adjusted for larger container)
    const centerY = canvas.height * 0.5 // Center vertically
    const arrowSpacing = 18 // Larger spacing for better visibility in larger container
    const verticalOffset = 18 // Equal to horizontal offset for perfect diagonal
    
    // Create 5 arrows that repeat up and to the right
    for (let i = 0; i < 5; i++) {
      const arrow: Arrow = {
        x: centerX + (i * arrowSpacing), // Move right
        y: centerY - (i * verticalOffset), // Move up from center (equal to horizontal offset for perfect diagonal)
        opacity: 0.1, // Start very transparent
        delay: i * 0.36, // Staggered appearance (slowed down by 20%)
      }
      arrows.push(arrow)
    }
    
    return arrows
  }

  const drawArrow = (ctx: CanvasRenderingContext2D, arrow: Arrow) => {
    ctx.save()
    
    // Set position and transform
    ctx.translate(arrow.x, arrow.y)
    
    // Scale down the arrow for mobile (50% smaller)
    ctx.scale(0.5, 0.5)
    
    // Set stroke color and opacity
    ctx.strokeStyle = arrowColorRef.current
    ctx.lineWidth = 2 // Thicker line for better visibility on mobile
    ctx.globalAlpha = arrow.opacity
    
    // Draw the arrow path as stroke only
    const path = new Path2D(arrowPathData)
    ctx.stroke(path)
    
    ctx.restore()
  }

  const animateArrows = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
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
        drawArrow(ctx, arrow)
      }
    })

    animationRef.current = requestAnimationFrame(() => animateArrows(canvas, ctx))
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

    // Create arrows
    arrowsRef.current = createArrows(canvas)

    // Start animation
    animateArrows(canvas, ctx)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [width, height, isPlaying])

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
