"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { ScrollEventManager } from "@/lib/scroll-standards"

export function useScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top when pathname changes
    // Use setTimeout to ensure the page has rendered
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])
}

/**
 * Hook for managing scroll events with one-action-one-slide behavior
 * @param totalSlides - Total number of slides in the section
 * @param sectionRef - Ref to the section element
 * @returns Current active slide index
 */
export function useScrollEventManager(
  totalSlides: number,
  sectionRef: React.RefObject<HTMLElement | null>
): number {
  const [activeSlide, setActiveSlide] = useState(0)
  const scrollManagerRef = useRef<ScrollEventManager | null>(null)
  const lastScrollYRef = useRef<number>(0)

  useEffect(() => {
    if (!sectionRef.current) return

    // Create scroll event manager
    scrollManagerRef.current = new ScrollEventManager(totalSlides, (slideIndex) => {
      setActiveSlide(slideIndex)
    })

    // Handle wheel events (primary method)
    const handleWheel = (event: WheelEvent) => {
      if (!scrollManagerRef.current || !sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      
      // Handle wheel event
      const changed = scrollManagerRef.current.handleWheel(event.deltaY, rect)
      if (changed) {
        // Prevent default scroll behavior when we handle the wheel event
        event.preventDefault()
      }
    }

    // Handle scroll events (fallback for non-wheel devices)
    const handleScroll = () => {
      if (!scrollManagerRef.current || !sectionRef.current) return
      
      const scrollY = window.scrollY
      const rect = sectionRef.current.getBoundingClientRect()
      
      // Handle scroll event
      const changed = scrollManagerRef.current.handleScroll(scrollY, rect)
      if (changed) {
      }
      
      lastScrollYRef.current = scrollY
    }

    // Add event listeners
    // Use wheel events as primary method
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    // Use scroll events as fallback
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial call to set correct slide based on current position
    handleScroll()

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      if (scrollManagerRef.current) {
        scrollManagerRef.current.destroy()
      }
    }
  }, [totalSlides, sectionRef])

  return activeSlide
}
