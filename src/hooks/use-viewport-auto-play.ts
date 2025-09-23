import { useEffect, useRef, useState } from 'react'

interface UseViewportAutoPlayOptions {
  threshold?: number
  rootMargin?: string
}

export function useViewportAutoPlay(options: UseViewportAutoPlayOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px' } = options
  const [isInViewport, setIsInViewport] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting)
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin])

  return { elementRef, isInViewport }
}
