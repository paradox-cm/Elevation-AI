"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

interface PageWrapperProps {
  children: React.ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname()

  useEffect(() => {
    // Ensure page loads at the top
    if (typeof window !== 'undefined') {
      // Immediate scroll to top
      window.scrollTo(0, 0)
      
      // Also try after render to catch any late content
      const timer = setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [pathname])

  return <>{children}</>
}
