"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Force scroll to top on route change
    if (typeof window !== 'undefined') {
      // Immediate scroll
      window.scrollTo(0, 0)
      
      // Also try after a small delay to ensure content is rendered
      const timer = setTimeout(() => {
        window.scrollTo(0, 0)
      }, 50)

      return () => clearTimeout(timer)
    }
  }, [pathname])

  return null
}
