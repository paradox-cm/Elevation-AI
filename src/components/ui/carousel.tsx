"use client"

import React from "react"
import { cn } from "@/lib/utils"

export interface CarouselItem {
  id: string | number
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
  content?: React.ReactNode
}

export interface CarouselProps {
  items: CarouselItem[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showProgressIndicators?: boolean
  showGradients?: boolean
  cardWidth?: number
  cardGap?: number
  className?: string
  onSlideChange?: (index: number) => void
}

export function Carousel({
  items,
  autoPlay = true,
  autoPlayInterval = 4000,
  showProgressIndicators = true,
  showGradients = true,
  cardWidth = 260,
  cardGap = 16,
  className,
  onSlideChange
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [showGradient, setShowGradient] = React.useState(true)
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const autoPlayIntervalRef = React.useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  // Check if we're at the end of the carousel
  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1 // -1 for rounding errors
      setShowGradient(!isAtEnd)
    }
  }

  // Scroll to specific slide
  const scrollToSlide = (index: number) => {
    setCurrentSlide(index)
    setProgress(0)
    
    if (carouselRef.current) {
      const totalCardWidth = cardWidth + cardGap
      carouselRef.current.scrollTo({
        left: index * totalCardWidth,
        behavior: 'smooth'
      })
    }
    
    onSlideChange?.(index)
  }

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoPlay) return
    
    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length)
    }, autoPlayInterval)

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
      }
    }
  }, [autoPlay, autoPlayInterval, items.length])

  // Auto-scroll carousel when currentSlide changes
  React.useEffect(() => {
    if (carouselRef.current) {
      const totalCardWidth = cardWidth + cardGap
      carouselRef.current.scrollTo({
        left: currentSlide * totalCardWidth,
        behavior: 'smooth'
      })
    }
  }, [currentSlide, cardWidth, cardGap])

  // Add scroll event listener to check position
  React.useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollPosition)
      // Check initial position
      checkScrollPosition()
      
      return () => carousel.removeEventListener('scroll', checkScrollPosition)
    }
  }, [])

  // Progress animation
  React.useEffect(() => {
    setProgress(0)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + 2 // Increment by 2% every ~80ms for smooth animation
      })
    }, 80)

    return () => clearInterval(progressInterval)
  }, [currentSlide])

  return (
    <div className={cn("space-y-6", className)}>
      <div className="relative">
        <div 
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" 
          ref={carouselRef}
          style={{ gap: `${cardGap}px` }}
        >
          {items.map((item, index) => (
            <div 
              key={item.id} 
              className="flex items-start gap-3 flex-shrink-0 p-3 border rounded-lg transition-colors duration-200"
              style={{ 
                minWidth: `${cardWidth}px`, 
                maxWidth: `${cardWidth}px` 
              }}
            >
              <div className={cn(
                "flex items-start gap-3 w-full",
                index === currentSlide 
                  ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm' 
                  : 'border-border bg-card'
              )}>
                {item.icon && (
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div className="space-y-1 min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-foreground leading-tight">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  {item.content && (
                    <div className="mt-2">
                      {item.content}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Left-side gradient fade - appears on 3rd and 4th slides on desktop, only 4th slide on mobile */}
        {showGradients && (
          <>
            {/* Desktop: 3rd and 4th slides */}
            <div className="hidden md:block absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none transition-opacity duration-300" 
                 style={{ opacity: currentSlide >= 2 ? 1 : 0 }} />
            {/* Mobile: only 4th slide */}
            <div className="md:hidden absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none transition-opacity duration-300" 
                 style={{ opacity: currentSlide >= 3 ? 1 : 0 }} />
          </>
        )}
        
        {/* Right-side gradient fade - Light and Dark mode adapted */}
        {showGradients && showGradient && (
          <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none transition-opacity duration-300" />
        )}
        
        {/* Progress Indicators */}
        {showProgressIndicators && (
          <div className="flex justify-center mt-4">
            <div className="flex gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSlide(index)}
                  className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className="relative">
                    {index === currentSlide ? (
                      // Active slide: Animated progress bar
                      <div className="w-6 h-2.5 bg-primary/30 rounded-[0.625rem] overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-75 ease-linear"
                          style={{ 
                            width: `${Math.max(10, Math.min(24, progress * 0.24))}px` 
                          }}
                        />
                      </div>
                    ) : (
                      // Inactive slide: Simple dot
                      <div className="w-2.5 h-2.5 bg-primary/30 rounded-full" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
