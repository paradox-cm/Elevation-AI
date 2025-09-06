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
  indicatorStyle?: 'progress' | 'thin-lines'
  highlightActiveCard?: boolean
  cardStyle?: 'filled' | 'outline'
  responsive?: {
    sm?: { cardWidth: number; cardGap: number }
    md?: { cardWidth: number; cardGap: number }
    lg?: { cardWidth: number; cardGap: number }
  }
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
  onSlideChange,
  indicatorStyle = 'progress',
  highlightActiveCard = true,
  cardStyle = 'filled',
  responsive
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [showGradient, setShowGradient] = React.useState(true)
  const [screenSize, setScreenSize] = React.useState<'sm' | 'md' | 'lg' | 'xl'>('lg')
  const [maxCardHeight, setMaxCardHeight] = React.useState<number>(0)
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const autoPlayIntervalRef = React.useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  // Responsive screen size detection
  React.useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setScreenSize('sm')
      } else if (width < 768) {
        setScreenSize('md')
      } else if (width < 1024) {
        setScreenSize('lg')
      } else {
        setScreenSize('xl')
      }
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  // Calculate responsive card width and gap
  const getResponsiveSettings = () => {
    if (!responsive) return { cardWidth, cardGap }
    
    switch (screenSize) {
      case 'sm':
        return responsive.sm || { cardWidth, cardGap }
      case 'md':
        return responsive.md || responsive.sm || { cardWidth, cardGap }
      case 'lg':
        return responsive.lg || responsive.md || responsive.sm || { cardWidth, cardGap }
      default:
        return { cardWidth, cardGap }
    }
  }

  const { cardWidth: responsiveCardWidth, cardGap: responsiveCardGap } = getResponsiveSettings()

  // Calculate responsive padding to match Container padding exactly
  const getResponsivePadding = () => {
    switch (screenSize) {
      case 'sm':
        return { paddingLeft: '1.5rem', paddingRight: '1.5rem' } // sm:px-6 = 1.5rem
      case 'md':
        return { paddingLeft: '1.5rem', paddingRight: '1.5rem' } // sm:px-6 = 1.5rem
      case 'lg':
        return { paddingLeft: '2rem', paddingRight: '2rem' } // lg:px-8 = 2rem
      case 'xl':
        return { paddingLeft: '2rem', paddingRight: '2rem' } // lg:px-8 = 2rem
      default:
        return { paddingLeft: '1rem', paddingRight: '1rem' } // px-4 = 1rem
    }
  }

  const responsivePadding = getResponsivePadding()

  // Measure and set maximum card height
  const measureCardHeights = React.useCallback(() => {
    if (cardRefs.current.length === 0) return
    
    let maxHeight = 0
    cardRefs.current.forEach((cardRef) => {
      if (cardRef) {
        // Temporarily remove height constraints to measure natural height
        const originalHeight = cardRef.style.height
        cardRef.style.height = 'auto'
        const height = cardRef.offsetHeight
        cardRef.style.height = originalHeight
        
        if (height > maxHeight) {
          maxHeight = height
        }
      }
    })
    
    if (maxHeight > 0) {
      setMaxCardHeight(maxHeight)
    }
  }, [items.length])

  // Measure heights when items change or screen size changes
  React.useEffect(() => {
    const timer = setTimeout(() => {
      measureCardHeights()
    }, 100) // Small delay to ensure DOM is updated
    
    return () => clearTimeout(timer)
  }, [items, screenSize, measureCardHeights])

  // Add resize observer to handle dynamic content changes
  React.useEffect(() => {
    if (!cardRefs.current.length) return

    const resizeObserver = new ResizeObserver(() => {
      measureCardHeights()
    })

    cardRefs.current.forEach((cardRef) => {
      if (cardRef) {
        resizeObserver.observe(cardRef)
      }
    })

    return () => {
      resizeObserver.disconnect()
    }
  }, [items.length, measureCardHeights])

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
      const totalCardWidth = responsiveCardWidth + responsiveCardGap
      carouselRef.current.scrollTo({
        left: index * totalCardWidth,
        behavior: 'smooth'
      })
    }
    
    onSlideChange?.(index)
  }

  // Auto-play functionality with synchronized progress
  React.useEffect(() => {
    if (!autoPlay) return
    
    // Reset progress when starting
    setProgress(0)
    
    // Calculate progress increment based on auto-play interval
    const progressIncrement = 2 // 2% every 80ms
    const progressInterval = 80 // 80ms intervals
    const totalProgressSteps = autoPlayInterval / progressInterval // Total steps needed
    
    let currentProgress = 0
    const progressTimer = setInterval(() => {
      currentProgress += progressIncrement
      setProgress(currentProgress)
      
      if (currentProgress >= 100) {
        currentProgress = 0
        setProgress(0)
        // Move to next slide
        setCurrentSlide((prev) => (prev + 1) % items.length)
      }
    }, progressInterval)

    return () => {
      clearInterval(progressTimer)
    }
  }, [autoPlay, autoPlayInterval, items.length])

  // Auto-scroll carousel when currentSlide changes
  React.useEffect(() => {
    if (carouselRef.current) {
      const totalCardWidth = responsiveCardWidth + responsiveCardGap
      carouselRef.current.scrollTo({
        left: currentSlide * totalCardWidth,
        behavior: 'smooth'
      })
    }
  }, [currentSlide, responsiveCardWidth, responsiveCardGap])

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


  return (
    <div className={cn("space-y-6", className)}>
      <div className="relative">
        <div 
          className="flex overflow-x-auto pb-4 pt-4 scrollbar-hide" 
          ref={carouselRef}
          style={{ 
            gap: `${responsiveCardGap}px`
          }}
        >
          {items.map((item, index) => (
            <div 
              key={item.id} 
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className={cn(
                "flex-shrink-0 border rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer",
                cardStyle === 'outline' 
                  ? 'border-border bg-transparent' 
                  : highlightActiveCard && index === currentSlide 
                    ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm' 
                    : 'border-border bg-card'
              )}
              style={{ 
                minWidth: `${responsiveCardWidth}px`, 
                maxWidth: `${responsiveCardWidth}px`,
                height: maxCardHeight > 0 ? `${maxCardHeight}px` : 'auto',
                minHeight: '320px',
                marginLeft: index === 0 ? responsivePadding.paddingLeft : '0',
                marginRight: index === items.length - 1 ? responsivePadding.paddingRight : '0'
              }}
            >
              <div className="flex flex-col h-full p-6">
                {item.icon && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
                    <item.icon className="text-4xl sm:text-5xl md:text-6xl text-primary" />
                  </div>
                )}
                <div className="flex flex-col flex-1">
                  <h4 className="text-xl font-semibold text-foreground leading-tight mb-3">{item.title}</h4>
                  <p className="text-base text-muted-foreground leading-relaxed flex-1">{item.description}</p>
                  {item.content && (
                    <div className="mt-4 flex-shrink-0">
                      {item.content}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
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
                  {indicatorStyle === 'thin-lines' ? (
                    // Thin line indicators (matching ProblemIntroductionSection)
                    <div 
                      className={`h-1 w-22 transition-colors duration-300 rounded-full cursor-pointer hover:opacity-80 ${
                        index === currentSlide
                          ? 'bg-blue-600 dark:bg-blue-400' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ) : (
                    // Progress bar indicators (default)
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
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
