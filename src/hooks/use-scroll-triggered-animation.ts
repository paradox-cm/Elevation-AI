"use client"

import { useEffect, useRef, useState } from 'react'

interface UseScrollTriggeredAnimationOptions {
  duration?: number // Duration in milliseconds (default: 3000ms = 3 seconds)
  threshold?: number // Intersection observer threshold (default: 0.1)
  rootMargin?: string // Intersection observer root margin (default: '0px')
}

export function useScrollTriggeredAnimation(options: UseScrollTriggeredAnimationOptions = {}) {
  const {
    duration = 3000, // 3 seconds default
    threshold = 0.1,
    rootMargin = '0px'
  } = options

  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            console.log('Animation triggered: starting 3-second play')
            setIsVisible(true)
            setIsPlaying(true)
            setHasPlayed(true)

            // Stop animation after duration
            timeoutRef.current = setTimeout(() => {
              console.log('Animation stopped: 3-second timer completed')
              setIsPlaying(false)
              setIsVisible(false)
            }, duration)
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [duration, threshold, rootMargin, hasPlayed])

  // Reset function to allow re-playing (useful for testing)
  const reset = () => {
    setHasPlayed(false)
    setIsVisible(false)
    setIsPlaying(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  return {
    containerRef,
    isVisible,
    isPlaying,
    hasPlayed,
    reset
  }
}
