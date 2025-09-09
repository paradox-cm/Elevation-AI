"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-background/80 backdrop-blur-sm border border-border/50"
      aria-label="Back to top"
    >
      <Icon name="arrow-up-s-line" className="h-5 w-5" />
    </Button>
  )
}
