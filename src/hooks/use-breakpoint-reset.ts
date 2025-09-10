import { useEffect, useRef, useCallback } from 'react'

/**
 * Hook to detect when a component becomes visible due to breakpoint changes
 * This specifically handles the case where elements are hidden/shown with CSS classes
 */
export function useBreakpointReset(
  elementRef: React.RefObject<HTMLElement | null>,
  onBreakpointChange: () => void,
  options: {
    debounceDelay?: number
    checkInterval?: number
  } = {}
) {
  const { debounceDelay = 100, checkInterval = 100 } = options
  const isVisibleRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const checkVisibility = useCallback(() => {
    const element = elementRef.current
    if (!element) return

    // Check if element is actually visible (not hidden by CSS)
    const rect = element.getBoundingClientRect()
    const computedStyle = window.getComputedStyle(element)
    const isVisible = 
      rect.width > 0 && 
      rect.height > 0 && 
      computedStyle.display !== 'none' && 
      computedStyle.visibility !== 'hidden' &&
      computedStyle.opacity !== '0'

    // Debug logging removed to prevent console spam

    // If visibility changed from hidden to visible, trigger callback
    if (isVisible && !isVisibleRef.current) {
      onBreakpointChange()
    }

    isVisibleRef.current = isVisible
  }, [elementRef, onBreakpointChange])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Initial check
    checkVisibility()

    // Set up interval to check visibility periodically
    intervalRef.current = setInterval(checkVisibility, checkInterval)

    // Also listen for window resize events
    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(checkVisibility, debounceDelay)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [checkVisibility, debounceDelay, checkInterval])

  return {
    isVisible: isVisibleRef.current
  }
}
