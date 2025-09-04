import { useEffect, useRef, useCallback } from 'react'

interface CanvasResizeConfig {
  debounceDelay?: number
  preserveAspectRatio?: boolean
}

/**
 * Simple hook to handle canvas resize events and restart animations
 * This is a focused solution for the specific resize issues
 */
export function useCanvasResize(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  restartAnimation: () => void,
  config: CanvasResizeConfig = {}
) {
  const { debounceDelay = 150, preserveAspectRatio = true } = config
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastDimensionsRef = useRef({ width: 0, height: 0 })

  // Check if dimensions have actually changed
  const hasDimensionsChanged = useCallback((newWidth: number, newHeight: number) => {
    const { width: lastWidth, height: lastHeight } = lastDimensionsRef.current
    const threshold = 5 // 5px threshold to avoid unnecessary restarts
    
    return (
      Math.abs(newWidth - lastWidth) > threshold ||
      Math.abs(newHeight - lastHeight) > threshold
    )
  }, [])

  // Update stored dimensions
  const updateDimensions = useCallback((width: number, height: number) => {
    lastDimensionsRef.current = { width, height }
  }, [])

  // Main resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Clear any existing timeout
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current)
    }

    // Debounce resize events to avoid excessive restarts
    resizeTimeoutRef.current = setTimeout(() => {
      const rect = canvas.getBoundingClientRect()
      const newWidth = rect.width
      const newHeight = rect.height

      // Only restart if dimensions have actually changed
      if (hasDimensionsChanged(newWidth, newHeight)) {
        // Update stored dimensions
        updateDimensions(newWidth, newHeight)

        // Restart animation
        restartAnimation()
      }
    }, debounceDelay)
  }, [canvasRef, restartAnimation, hasDimensionsChanged, updateDimensions, debounceDelay])

  // Set up resize listener
  useEffect(() => {
    // Only add event listener on client side
    if (typeof window === 'undefined') return

    // Add resize event listener with passive flag for better performance
    window.addEventListener('resize', handleResize, { passive: true })

    // Cleanup function
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [handleResize])

  return {
    hasDimensionsChanged,
    updateDimensions
  }
}

/**
 * Utility function to maintain aspect ratio during resize
 */
export function maintainAspectRatio(
  originalWidth: number,
  originalHeight: number,
  newWidth: number,
  newHeight: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight
  const newAspectRatio = newWidth / newHeight

  if (newAspectRatio > aspectRatio) {
    // New container is wider, fit by height
    return {
      width: newHeight * aspectRatio,
      height: newHeight
    }
  } else {
    // New container is taller, fit by width
    return {
      width: newWidth,
      height: newWidth / aspectRatio
    }
  }
}
