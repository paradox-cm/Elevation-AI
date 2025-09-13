"use client"

import React from "react"
import { cn } from "@/lib/utils"

export interface PlatformCarouselItem {
  id: string | number
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
  content?: React.ReactNode
}

export interface PlatformCarouselProps {
  items: PlatformCarouselItem[]
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
  cardStyle?: 'filled' | 'outline' | 'blue'
  minHeight?: string
  responsiveMinHeight?: {
    sm?: string
    md?: string
    lg?: string
  }
  hugContent?: boolean
  stopWhenAllVisible?: boolean
  naturalScroll?: boolean
  responsive?: {
    sm?: { cardWidth: number; cardGap: number }
    md?: { cardWidth: number; cardGap: number }
    lg?: { cardWidth: number; cardGap: number }
  }
}

export function PlatformCarousel({
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
  minHeight = '320px',
  responsiveMinHeight,
  hugContent = false,
  stopWhenAllVisible = false,
  naturalScroll = false,
  responsive
}: PlatformCarouselProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [showGradient, setShowGradient] = React.useState(true)
  const [screenSize, setScreenSize] = React.useState<'sm' | 'md' | 'lg' | 'xl'>('lg')
  const [maxCardHeight, setMaxCardHeight] = React.useState<number>(0)
  const [allCardsVisible, setAllCardsVisible] = React.useState(false)
  const [hasManualInteraction, setHasManualInteraction] = React.useState(false)
  
  // Refs for natural scroll
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const autoPlayIntervalRef = React.useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const manualInteractionTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const isProgrammaticScrollRef = React.useRef<boolean>(false)
  
  // Touch and drag state (for non-natural scroll)
  const [isDragging, setIsDragging] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [currentX, setCurrentX] = React.useState(0)
  const [dragOffset, setDragOffset] = React.useState(0)
  const [isTouchDevice, setIsTouchDevice] = React.useState(false)

  // Responsive configuration
  const getResponsiveConfig = () => {
    if (!responsive) return { cardWidth, cardGap }
    
    switch (screenSize) {
      case 'sm': return responsive.sm || { cardWidth, cardGap }
      case 'md': return responsive.md || { cardWidth, cardGap }
      case 'lg': return responsive.lg || { cardWidth, cardGap }
      default: return { cardWidth, cardGap }
    }
  }

  const { cardWidth: responsiveCardWidth, cardGap: responsiveCardGap } = getResponsiveConfig()

  // Get responsive minHeight
  const getResponsiveMinHeight = () => {
    if (!responsiveMinHeight) return minHeight
    
    switch (screenSize) {
      case 'sm': return responsiveMinHeight.sm || minHeight
      case 'md': return responsiveMinHeight.md || minHeight
      case 'lg': return responsiveMinHeight.lg || minHeight
      default: return minHeight
    }
  }

  const responsiveMinHeightValue = getResponsiveMinHeight()

  // Responsive padding calculation
  const getResponsivePadding = () => {
    const basePadding = 16
    switch (screenSize) {
      case 'sm': return { paddingLeft: basePadding, paddingRight: basePadding }
      case 'md': return { paddingLeft: basePadding * 1.5, paddingRight: basePadding * 1.5 }
      case 'lg': return { paddingLeft: basePadding * 2, paddingRight: basePadding * 2 }
      default: return { paddingLeft: basePadding * 2, paddingRight: basePadding * 2 }
    }
  }

  const responsivePadding = getResponsivePadding()

  // Screen size detection
  React.useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      if (width < 640) setScreenSize('sm')
      else if (width < 768) setScreenSize('md')
      else if (width < 1024) setScreenSize('lg')
      else setScreenSize('xl')
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  // Touch device detection
  React.useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkTouchDevice()
  }, [])

  // Check if all cards are visible
  React.useEffect(() => {
    const checkAllCardsVisible = () => {
      if (!stopWhenAllVisible) return
      
      const container = document.querySelector('.platform-carousel-container')
      if (!container) return
      
      // Get the actual available width (accounting for parent margins)
      const containerRect = container.getBoundingClientRect()
      const parentContainer = container.closest('.container, [class*="container"]')
      const parentRect = parentContainer?.getBoundingClientRect()
      
      // Use the smaller of container width or parent width minus margins
      const availableWidth = parentRect ? 
        Math.min(containerRect.width, parentRect.width - 32) : // Account for container padding
        containerRect.width
      
      const totalCardsWidth = items.length * (responsiveCardWidth + responsiveCardGap) - responsiveCardGap
      const padding = responsivePadding.paddingLeft + responsivePadding.paddingRight
      
      const allVisible = totalCardsWidth + padding <= availableWidth
      setAllCardsVisible(allVisible)
    }

    // Use setTimeout to ensure DOM is ready
    const timeoutId = setTimeout(checkAllCardsVisible, 100)
    window.addEventListener('resize', checkAllCardsVisible)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', checkAllCardsVisible)
    }
  }, [stopWhenAllVisible, items.length, responsiveCardWidth, responsiveCardGap, responsivePadding, screenSize])

  // Check scroll position for natural scroll
  const checkScrollPosition = React.useCallback(() => {
    if (!carouselRef.current || !naturalScroll) return
    
    const scrollLeft = carouselRef.current.scrollLeft
    const containerWidth = carouselRef.current.clientWidth
    
    // Don't update slide position if this is a programmatic scroll (from indicator click)
    if (isProgrammaticScrollRef.current) {
      return
    }
    
    // If naturalScroll is enabled, don't snap to cards - just track the closest slide for indicators
    if (naturalScroll) {
      const totalCardWidth = responsiveCardWidth + responsiveCardGap
      
      // Find which card is most centered in the viewport
      let bestMatchIndex = 0
      let minDistance = Infinity
      
      for (let i = 0; i < items.length; i++) {
        // Calculate card position accounting for padding
        let cardStart = i * totalCardWidth
        if (i === 0) {
          cardStart += responsivePadding.paddingLeft
        }
        
        const cardCenter = cardStart + (responsiveCardWidth / 2)
        const viewportCenter = scrollLeft + (containerWidth / 2)
        const distance = Math.abs(cardCenter - viewportCenter)
        
        if (distance < minDistance) {
          minDistance = distance
          bestMatchIndex = i
        }
      }
      
      const clampedSlideIndex = Math.max(0, Math.min(bestMatchIndex, items.length - 1))
      
      // Only update if the slide has actually changed to avoid unnecessary re-renders
      if (clampedSlideIndex !== currentSlide) {
        setCurrentSlide(clampedSlideIndex)
        setProgress(0) // Reset progress when manually scrolling
      }
      return
    }
  }, [responsiveCardWidth, responsiveCardGap, items.length, currentSlide, naturalScroll, responsivePadding.paddingLeft])

  // Detect manual interaction (all devices)
  const handleManualInteraction = React.useCallback(() => {
    setHasManualInteraction(true)
    
    // Clear existing timeout
    if (manualInteractionTimeoutRef.current) {
      clearTimeout(manualInteractionTimeoutRef.current)
    }
    
    // Set 5-second timer for auto-play resume
    manualInteractionTimeoutRef.current = setTimeout(() => {
      setHasManualInteraction(false)
    }, 5000)
  }, [])

  // Scroll to specific slide
  const scrollToSlide = (index: number) => {
    setCurrentSlide(index)
    setProgress(0)
    onSlideChange?.(index)
    
    if (naturalScroll && carouselRef.current) {
      const totalCardWidth = responsiveCardWidth + responsiveCardGap
      
      // Set flag to indicate this is a programmatic scroll
      isProgrammaticScrollRef.current = true
      
      carouselRef.current.scrollTo({
        left: index * totalCardWidth,
        behavior: 'smooth'
      })
      
      // Reset flag after scroll completes
      setTimeout(() => {
        isProgrammaticScrollRef.current = false
      }, 500) // Wait for smooth scroll to complete
    }
  }

  // Auto-play functionality
  // Disable auto-play when natural scroll is enabled to prevent snapping
  React.useEffect(() => {
    if (!autoPlay) return
    if (naturalScroll) return // Disable auto-play for natural scroll
    if (stopWhenAllVisible && allCardsVisible) {
      return
    }
    if (hasManualInteraction) {
      return
    }

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        // If all cards are visible and we're at the last card, stay at the last card
        if (stopWhenAllVisible && allCardsVisible && prev === items.length - 1) {
          return prev
        }
        const nextSlide = (prev + 1) % items.length
        return nextSlide
      })
      setProgress(0)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, items.length, stopWhenAllVisible, allCardsVisible, currentSlide, naturalScroll, hasManualInteraction])

  // Auto-scroll carousel when currentSlide changes (for natural scroll)
  // Only auto-scroll if naturalScroll is disabled
  React.useEffect(() => {
    if (carouselRef.current && !naturalScroll) {
      const totalCardWidth = responsiveCardWidth + responsiveCardGap
      
      // Set flag to indicate this is a programmatic scroll
      isProgrammaticScrollRef.current = true
      
      carouselRef.current.scrollTo({
        left: currentSlide * totalCardWidth,
        behavior: 'smooth'
      })
      
      // Reset flag after scroll completes
      setTimeout(() => {
        isProgrammaticScrollRef.current = false
      }, 500) // Wait for smooth scroll to complete
    }
  }, [currentSlide, responsiveCardWidth, responsiveCardGap, screenSize, naturalScroll])

  // Add scroll event listener to check position and detect manual interaction
  React.useEffect(() => {
    const carousel = carouselRef.current
    if (carousel && naturalScroll) {
      let scrollTimeout: ReturnType<typeof setTimeout>
      
      const handleScroll = () => {
        // Throttle scroll events for better performance
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
          checkScrollPosition()
          handleManualInteraction()
        }, 16) // ~60fps throttling
      }
      
      const handleTouchStart = () => {
        handleManualInteraction()
      }
      
      carousel.addEventListener('scroll', handleScroll)
      carousel.addEventListener('touchstart', handleTouchStart, { passive: true })
      // Check initial position
      checkScrollPosition()
      
      return () => {
        clearTimeout(scrollTimeout)
        carousel.removeEventListener('scroll', handleScroll)
        carousel.removeEventListener('touchstart', handleTouchStart)
      }
    }
  }, [checkScrollPosition, handleManualInteraction, naturalScroll])

  // Progress tracking
  React.useEffect(() => {
    if (!autoPlay) return
    if (naturalScroll) return // Disable progress tracking for natural scroll

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (autoPlayInterval / 100)
        return prev + increment >= 100 ? 0 : prev + increment
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [autoPlay, autoPlayInterval, naturalScroll])

  // Card height calculation
  React.useEffect(() => {
    const calculateMaxHeight = () => {
      const cards = document.querySelectorAll('.platform-carousel-card')
      let maxHeight = 0
      cards.forEach((card) => {
        const height = card.getBoundingClientRect().height
        if (height > maxHeight) maxHeight = height
      })
      setMaxCardHeight(maxHeight)
    }

    calculateMaxHeight()
    window.addEventListener('resize', calculateMaxHeight)
    return () => window.removeEventListener('resize', calculateMaxHeight)
  }, [items])

  const handleSlideChange = (index: number) => {
    if (naturalScroll) {
      scrollToSlide(index)
    } else {
      setCurrentSlide(index)
      setProgress(0)
      onSlideChange?.(index)
    }
  }

  const nextSlide = () => {
    handleSlideChange((currentSlide + 1) % items.length)
  }

  const prevSlide = () => {
    handleSlideChange((currentSlide - 1 + items.length) % items.length)
  }

  const handleMouseEnter = () => {
    if (autoPlay) setShowGradient(false)
  }

  const handleMouseLeave = () => {
    if (autoPlay) setShowGradient(true)
  }

  // Touch and drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isTouchDevice) return
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
    setDragOffset(0)
    // Pause auto-play during drag
    if (autoPlay) setShowGradient(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isTouchDevice) return
    e.preventDefault()
    const touch = e.touches[0]
    setCurrentX(touch.clientX)
    const offset = touch.clientX - startX
    setDragOffset(offset)
  }

  const handleTouchEnd = () => {
    if (!isDragging || !isTouchDevice) return
    setIsDragging(false)
    
    const threshold = responsiveCardWidth * 0.3 // 30% of card width
    const dragDistance = currentX - startX
    
    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        // Swipe right - go to previous slide
        prevSlide()
      } else {
        // Swipe left - go to next slide
        nextSlide()
      }
    }
    
    setDragOffset(0)
    setStartX(0)
    setCurrentX(0)
    // Resume auto-play
    if (autoPlay) setShowGradient(true)
  }

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTouchDevice) return
    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentX(e.clientX)
    setDragOffset(0)
    if (autoPlay) setShowGradient(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isTouchDevice) return
    e.preventDefault()
    setCurrentX(e.clientX)
    const offset = e.clientX - startX
    setDragOffset(offset)
  }

  const handleMouseUp = () => {
    if (!isDragging || isTouchDevice) return
    setIsDragging(false)
    
    const threshold = responsiveCardWidth * 0.3
    const dragDistance = currentX - startX
    
    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        prevSlide()
      } else {
        nextSlide()
      }
    }
    
    setDragOffset(0)
    setStartX(0)
    setCurrentX(0)
    if (autoPlay) setShowGradient(true)
  }

  const handleMouseLeaveDrag = () => {
    if (isDragging) {
      handleMouseUp()
    }
  }

  if (items.length === 0) return null

  return (
    <div 
      className={cn("relative w-full", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient Overlays */}
      {showGradients && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </>
      )}

      {/* Carousel Container */}
      {naturalScroll ? (
        <div 
          className="flex overflow-x-auto pb-4 pt-4 scrollbar-hide platform-carousel-container"
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
              className="platform-carousel-card flex-shrink-0"
              style={{ 
                minWidth: `${responsiveCardWidth}px`, 
                maxWidth: `${responsiveCardWidth}px`,
                height: hugContent ? responsiveMinHeightValue : (maxCardHeight > 0 ? `${maxCardHeight}px` : 'auto'),
                minHeight: responsiveMinHeightValue,
                marginLeft: index === 0 ? responsivePadding.paddingLeft : '0',
                marginRight: index === items.length - 1 ? responsivePadding.paddingRight : '0'
              }}
            >
              <div className={cn(
                "w-full h-full rounded-lg border transition-all duration-300",
                cardStyle === 'filled' 
                  ? 'bg-card border-border' 
                  : cardStyle === 'outline'
                    ? 'bg-transparent border-border'
                    : cardStyle === 'blue'
                      ? highlightActiveCard && index === currentSlide
                        ? 'border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/15 shadow-blue-500/20 shadow-sm'
                        : 'border-border bg-card hover:bg-card/80'
                      : highlightActiveCard && index === currentSlide 
                        ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm' 
                        : 'border-border bg-card'
              )}>
                <div className={hugContent ? "flex flex-col justify-end h-full" : "flex flex-col h-full"}>
                  <div className={hugContent ? "p-6" : "p-6 pb-4"}>
                    {item.icon && (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
                        <item.icon className="text-4xl sm:text-5xl md:text-6xl" />
                      </div>
                    )}
                    <div className="flex flex-col flex-1">
                      <h4 className="text-xl font-semibold text-foreground leading-tight mb-3">{item.title}</h4>
                      <p className="text-base text-muted-foreground leading-relaxed flex-1">{item.description}</p>
                    </div>
                  </div>
                  {item.content && (
                    <div className="flex-shrink-0 mt-auto">
                      {item.content}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div 
          className="overflow-hidden platform-carousel-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeaveDrag}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div 
            className={`flex ${isDragging ? 'transition-none' : 'transition-transform duration-500 ease-in-out'}`}
            style={{ 
              transform: `translateX(-${currentSlide * (responsiveCardWidth + responsiveCardGap) + dragOffset}px)`,
              gap: `${responsiveCardGap}px`
            }}
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className="platform-carousel-card flex-shrink-0"
                style={{ 
                  minWidth: `${responsiveCardWidth}px`, 
                  maxWidth: `${responsiveCardWidth}px`,
                  height: hugContent ? responsiveMinHeightValue : (maxCardHeight > 0 ? `${maxCardHeight}px` : 'auto'),
                  minHeight: responsiveMinHeightValue,
                  marginLeft: index === 0 ? responsivePadding.paddingLeft : '0',
                  marginRight: index === items.length - 1 ? responsivePadding.paddingRight : '0'
                }}
              >
                <div className={cn(
                  "w-full h-full rounded-lg border transition-all duration-300",
                  cardStyle === 'filled' 
                    ? 'bg-card border-border' 
                    : cardStyle === 'outline'
                      ? 'bg-transparent border-border'
                      : cardStyle === 'blue'
                        ? highlightActiveCard && index === currentSlide
                          ? 'border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/15 shadow-blue-500/20 shadow-sm'
                          : 'border-border bg-card hover:bg-card/80'
                        : highlightActiveCard && index === currentSlide 
                          ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm' 
                          : 'border-border bg-card'
                )}>
                  <div className={hugContent ? "flex flex-col justify-end h-full" : "flex flex-col h-full"}>
                    <div className={hugContent ? "p-6" : "p-6 pb-4"}>
                      {item.icon && (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
                          <item.icon className="text-4xl sm:text-5xl md:text-6xl" />
                        </div>
                      )}
                      <div className="flex flex-col flex-1">
                        <h4 className="text-xl font-semibold text-foreground leading-tight mb-3">{item.title}</h4>
                        <p className="text-base text-muted-foreground leading-relaxed flex-1">{item.description}</p>
                      </div>
                    </div>
                    {item.content && (
                      <div className="flex-shrink-0 mt-auto">
                        {item.content}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Progress Indicators */}
      {showProgressIndicators && (
        <div className="flex justify-center mt-6 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                indicatorStyle === 'progress'
                  ? index === currentSlide 
                    ? "bg-primary w-8" 
                    : "bg-muted-foreground/30"
                  : index === currentSlide
                    ? "bg-primary h-1 w-6"
                    : "bg-muted-foreground/30 h-1 w-2"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
