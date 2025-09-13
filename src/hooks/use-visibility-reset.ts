import { useEffect, useRef, useCallback } from 'react'

/**
 * Hook to detect when a component becomes visible again after being hidden
 * This is crucial for canvas animations that lose their context when hidden
 */
export function useVisibilityReset(
  elementRef: React.RefObject<HTMLElement | null>,
  onVisibilityChange: (isVisible: boolean) => void,
  options: {
    threshold?: number
    rootMargin?: string
  } = {}
) {
  const { threshold = 0.01, rootMargin = '0px' } = options
  const isVisibleRef = useRef(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const isVisible = entry.isIntersecting && entry.intersectionRatio >= threshold
      
      // Only trigger callback when visibility state actually changes
      if (isVisible !== isVisibleRef.current) {
        isVisibleRef.current = isVisible
        onVisibilityChange(isVisible)
      }
    })
  }, [onVisibilityChange, threshold])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Create intersection observer
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    })

    // Start observing
    observerRef.current.observe(element)

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [elementRef, handleIntersection, threshold, rootMargin])

  return {
    isVisible: isVisibleRef.current
  }
}
