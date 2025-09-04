import { useEffect, useRef } from 'react'

/**
 * Custom hook to handle window resize events for canvas-based animations
 * This ensures animations restart properly when the browser window is resized
 */
export function useAnimationResize(
  initializeCanvas: () => { canvas: HTMLCanvasElement | null; ctx: CanvasRenderingContext2D | null },
  startAnimation: () => void,
  stopAnimation: () => void
) {
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleResize = () => {
      // Clear any existing timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }

      // Stop current animation
      stopAnimation()

      // Debounce resize events to avoid excessive restarts
      resizeTimeoutRef.current = setTimeout(() => {
        // Reinitialize canvas with new dimensions
        const { canvas, ctx } = initializeCanvas()
        if (canvas && ctx) {
          // Restart animation with new canvas dimensions
          startAnimation()
        }
      }, 150) // 150ms debounce delay
    }

    // Add resize event listener
    window.addEventListener('resize', handleResize)

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [initializeCanvas, startAnimation, stopAnimation])
}
