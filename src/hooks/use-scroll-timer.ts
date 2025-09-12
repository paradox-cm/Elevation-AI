import { useEffect, useRef, useState } from 'react'

interface UseScrollTimerOptions {
  duration?: number // Duration in milliseconds
  threshold?: number // Intersection observer threshold
  fadeInDuration?: number // Fade in duration in milliseconds (0 = immediate)
  fadeOutDuration?: number // Fade out duration in milliseconds
}

export function useScrollTimer(options: UseScrollTimerOptions = {}) {
  const { 
    duration = 3000, 
    threshold = 0.1, 
    fadeInDuration = 0, 
    fadeOutDuration = 1000 
  } = options
  const [isVisible, setIsVisible] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true)
            setIsFadingOut(false)
            
            // Immediate appearance or fade in
            if (fadeInDuration === 0) {
              setShouldAnimate(true)
            } else {
              // Fade in over specified duration
              setShouldAnimate(true)
            }
            
            // Clear any existing timeouts
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current)
            }
            if (fadeTimeoutRef.current) {
              clearTimeout(fadeTimeoutRef.current)
            }
            
            // Set timeout to start fade out after duration
            timeoutRef.current = setTimeout(() => {
              setIsFadingOut(true)
              setHasAnimated(true)
              // Keep shouldAnimate true so animation continues during fade out
              
              // Stop animation after fade out completes
              fadeTimeoutRef.current = setTimeout(() => {
                setShouldAnimate(false)
              }, fadeOutDuration)
            }, duration)
          } else if (!entry.isIntersecting) {
            setIsVisible(false)
            // Reset when out of view (optional - remove if you want one-time only)
            // setHasAnimated(false)
          }
        })
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current)
      }
    }
  }, [duration, threshold, hasAnimated, fadeInDuration])

  return {
    elementRef,
    isVisible,
    shouldAnimate,
    hasAnimated,
    isFadingOut,
    fadeOutDuration
  }
}
