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
  cardStyle?: 'filled' | 'outline' | 'blue' | 'neutral-blue' | 'green' | 'purple'
  indicatorColor?: 'primary' | 'green' | 'purple' | 'blue'
  minHeight?: string
  responsiveMinHeight?: {
    sm?: string
    md?: string
    lg?: string
  }
  hugContent?: boolean
  stopWhenAllVisible?: boolean
  naturalScroll?: boolean
  flexibleWidth?: boolean
  customPadding?: string
  customContentPadding?: string
  responsive?: {
    sm?: { cardWidth: number; cardGap: number }
    md?: { cardWidth: number; cardGap: number }
    lg?: { cardWidth: number; cardGap: number }
    xl?: { cardWidth: number; cardGap: number }
    '2xl'?: { cardWidth: number; cardGap: number }
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
  indicatorColor = 'primary',
  minHeight = '320px',
  responsiveMinHeight,
  hugContent = false,
  stopWhenAllVisible = false,
  naturalScroll = false,
  flexibleWidth = false,
  customPadding,
  customContentPadding,
  responsive
}: PlatformCarouselProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [activeCardIndex, setActiveCardIndex] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [showGradient, setShowGradient] = React.useState(true)
  const [screenSize, setScreenSize] = React.useState<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('lg')
  const [maxCardHeight, setMaxCardHeight] = React.useState<number>(0)
  const [allCardsVisible, setAllCardsVisible] = React.useState(false)
  const [hasManualInteraction, setHasManualInteraction] = React.useState(false)
  
  // Refs for natural scroll
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const autoPlayIntervalRef = React.useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const manualInteractionTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const isProgrammaticScrollRef = React.useRef<boolean>(false)
  const activeCardIndexRef = React.useRef(0)
  const currentSlideRef = React.useRef(0)
  
  // Touch and drag state (for non-natural scroll)
  const [isDragging, setIsDragging] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [currentX, setCurrentX] = React.useState(0)
  const [dragOffset, setDragOffset] = React.useState(0)
  const [isTouchDevice, setIsTouchDevice] = React.useState(false)

  const isMobileScreen = screenSize === 'sm' || screenSize === 'md' || screenSize === 'lg'
  const isNaturalScrollEnabled = naturalScroll || isMobileScreen

  // Responsive configuration
  const getResponsiveConfig = () => {
    if (!responsive) return { cardWidth, cardGap }
    
    switch (screenSize) {
      case 'sm': return responsive.sm || { cardWidth, cardGap }
      case 'md': return responsive.md || responsive.sm || { cardWidth, cardGap }
      case 'lg': return responsive.lg || responsive.md || responsive.sm || { cardWidth, cardGap }
      case 'xl': return responsive.xl || responsive.lg || responsive.md || responsive.sm || { cardWidth, cardGap }
      case '2xl': return responsive['2xl'] || responsive.xl || responsive.lg || responsive.md || responsive.sm || { cardWidth, cardGap }
      default: return { cardWidth, cardGap }
    }
  }

  const { cardWidth: responsiveCardWidth, cardGap: responsiveCardGap } = getResponsiveConfig()

  const responsivePadding = React.useMemo(() => {
    switch (screenSize) {
      case 'sm':
        return { paddingLeft: 16, paddingRight: 16 }
      case 'md':
        return { paddingLeft: 24, paddingRight: 24 }
      case 'lg':
      case 'xl':
      case '2xl':
        return { paddingLeft: 32, paddingRight: 32 }
      default:
        return { paddingLeft: 16, paddingRight: 16 }
    }
  }, [screenSize])

  // Check if flexible width should be applied
  const shouldUseFlexibleWidth = React.useCallback(() => {
    if (!flexibleWidth) return false
    
    // Only apply flexible width on XL/2XL breakpoints
    if (screenSize !== 'xl' && screenSize !== '2xl') return false
    
    // Calculate if cards would be smaller than 248px minimum width
    const calculateCardWidth = () => {
      if (typeof window === 'undefined') return responsiveCardWidth
      
      const viewportWidth = window.innerWidth
      const containerPadding = responsivePadding.paddingLeft + responsivePadding.paddingRight
      const availableWidth = viewportWidth - containerPadding
      const totalGapWidth = (items.length - 1) * responsiveCardGap
      const cardWidth = (availableWidth - totalGapWidth) / items.length
      
      return cardWidth
    }
    
    const calculatedCardWidth = calculateCardWidth()
    const minCardWidth = 300
    
    // Only use flexible width if cards would be at least 300px wide
    return calculatedCardWidth >= minCardWidth
  }, [flexibleWidth, screenSize, responsivePadding.paddingLeft, responsivePadding.paddingRight, items.length, responsiveCardGap, responsiveCardWidth])

  // Check if all cards are visible and should disable scrolling
  const shouldDisableScrolling = React.useCallback(() => {
    if (!shouldUseFlexibleWidth()) return false

    return true
  }, [shouldUseFlexibleWidth])

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

  React.useEffect(() => {
    activeCardIndexRef.current = activeCardIndex
  }, [activeCardIndex])

  React.useEffect(() => {
    currentSlideRef.current = currentSlide
  }, [currentSlide])

  // Screen size detection and carousel position adjustment
  React.useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      let newScreenSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
      
      if (width < 640) {
        newScreenSize = 'sm'
      } else if (width < 768) {
        newScreenSize = 'md'
      } else if (width < 1024) {
        newScreenSize = 'lg'
      } else if (width < 1600) {
        newScreenSize = 'xl'
      } else {
        newScreenSize = '2xl'
      }
      
      setScreenSize(newScreenSize)
      
      // Recalculate carousel position when viewport changes
      if (carouselRef.current && !isNaturalScrollEnabled) {
        const calculateVisibleCards = () => {
          const viewportWidth = window.innerWidth
          const actualCardWidth = Math.max(responsiveCardWidth, 300)
          const totalCardWidth = actualCardWidth + responsiveCardGap
          return Math.floor(viewportWidth / totalCardWidth)
        }
        
        const visibleCards = calculateVisibleCards()
        const maxSlide = Math.max(0, items.length - visibleCards)
        
        // Ensure current slide doesn't exceed the new maximum
        const adjustedSlide = Math.min(currentSlide, maxSlide)
        if (adjustedSlide !== currentSlide) {
          setCurrentSlide(adjustedSlide)
        }
        
        // Ensure active card is visible in the new viewport
        const adjustedActiveCard = Math.min(activeCardIndex, items.length - 1)
        if (adjustedActiveCard !== activeCardIndex) {
          setActiveCardIndex(adjustedActiveCard)
        }
      }
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [currentSlide, activeCardIndex, responsiveCardWidth, responsiveCardGap, items.length, isNaturalScrollEnabled])

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
    const carousel = carouselRef.current
    if (!carousel) return

    const scrollLeft = carousel.scrollLeft
    const containerWidth = carousel.clientWidth

    if (isProgrammaticScrollRef.current) {
      return
    }

    if (isNaturalScrollEnabled) {
      let closestIndex = activeCardIndexRef.current
      let minDistance = Number.POSITIVE_INFINITY
      const viewportCenter = carousel.getBoundingClientRect().left + containerWidth / 2

      cardRefs.current.forEach((cardRef, index) => {
        if (!cardRef) return
        const cardRect = cardRef.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const distance = Math.abs(cardCenter - viewportCenter)
        if (distance < minDistance) {
          minDistance = distance
          closestIndex = index
        }
      })

      if (closestIndex !== activeCardIndexRef.current) {
        setActiveCardIndex(closestIndex)
        setCurrentSlide(closestIndex)
        setProgress(0)
      }
      return
    }

    const actualCardWidth = Math.max(responsiveCardWidth, 248)
    const totalCardWidth = actualCardWidth + responsiveCardGap

    let bestMatchIndex = 0
    let minDistance = Infinity

    for (let i = 0; i < items.length; i++) {
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
    if (clampedSlideIndex !== currentSlide) {
      setCurrentSlide(clampedSlideIndex)
      setProgress(0)
    }
  }, [isNaturalScrollEnabled, responsiveCardWidth, responsiveCardGap, items.length, currentSlide, responsivePadding.paddingLeft])

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
  const scrollNaturallyToIndex = React.useCallback((index: number) => {
    const carousel = carouselRef.current
    const targetCard = cardRefs.current[index]
    if (!carousel || !targetCard) return

    const firstOffset = cardRefs.current[0]?.offsetLeft ?? 0
    const targetOffset = Math.max(0, targetCard.offsetLeft - firstOffset)

    isProgrammaticScrollRef.current = true
    carousel.scrollTo({ left: targetOffset, behavior: 'smooth' })
    setTimeout(() => {
      isProgrammaticScrollRef.current = false
    }, 500)
  }, [])

  const scrollToSlide = (index: number) => {
    const safeIndex = Math.max(0, Math.min(index, items.length - 1))

    setActiveCardIndex(safeIndex)
    setProgress(0)
    handleManualInteraction()

    if (shouldDisableScrolling()) {
      setCurrentSlide(safeIndex)
      onSlideChange?.(safeIndex)
      return
    }

    if (isNaturalScrollEnabled) {
      scrollNaturallyToIndex(safeIndex)
      setCurrentSlide(safeIndex)
      onSlideChange?.(safeIndex)
      return
    }

    const calculateVisibleCards = () => {
      if (typeof window === 'undefined') return 0
      const viewportWidth = window.innerWidth
      const actualCardWidth = Math.max(responsiveCardWidth, 248)
      const totalCardWidth = actualCardWidth + responsiveCardGap
      return Math.floor(viewportWidth / totalCardWidth)
    }

    const visibleCards = calculateVisibleCards()
    const maxSlide = Math.max(0, items.length - visibleCards)
    const clampedIndex = Math.min(safeIndex, maxSlide)

    setCurrentSlide(clampedIndex)
    onSlideChange?.(clampedIndex)
  }

  // Auto-play functionality with hybrid behavior (natural scroll + smooth positioning)
  React.useEffect(() => {
    if (!autoPlay || hasManualInteraction || items.length <= 1) {
      return
    }

    setProgress(0)

    const progressInterval = 80
    const intervalDuration = Math.max(autoPlayInterval, progressInterval * 2)
    const progressIncrement = 100 / (intervalDuration / progressInterval)

    const calculateVisibleCards = () => {
      if (typeof window === 'undefined') return 0
      const viewportWidth = window.innerWidth
      const actualCardWidth = Math.max(responsiveCardWidth, 248)
      const totalCardWidth = actualCardWidth + responsiveCardGap
      return Math.floor(viewportWidth / totalCardWidth)
    }

    let currentProgress = 0

    const timer = setInterval(() => {
      currentProgress += progressIncrement
      setProgress(currentProgress)

      const activeIndex = activeCardIndexRef.current
      const progressThreshold = activeIndex === 0 ? 137.5 : 100

      if (currentProgress >= progressThreshold) {
        currentProgress = 0
        setProgress(0)

        const nextActiveIndex = (activeIndex + 1) % items.length
        setActiveCardIndex(nextActiveIndex)

        if (shouldDisableScrolling()) {
          setCurrentSlide(nextActiveIndex)
          onSlideChange?.(nextActiveIndex)
          return
        }

        if (isNaturalScrollEnabled) {
          scrollNaturallyToIndex(nextActiveIndex)
          setCurrentSlide(nextActiveIndex)
          onSlideChange?.(nextActiveIndex)
        } else {
          const visibleCards = calculateVisibleCards()
          const maxSlide = Math.max(0, items.length - visibleCards)

          let nextSlide = currentSlideRef.current + 1
          if (nextActiveIndex === 0) {
            nextSlide = 0
          } else if (nextSlide > maxSlide) {
            nextSlide = maxSlide
          }

          setCurrentSlide(nextSlide)
          onSlideChange?.(Math.min(nextSlide, items.length - 1))
        }
      }
    }, progressInterval)

    return () => clearInterval(timer)
  }, [autoPlay, autoPlayInterval, hasManualInteraction, items.length, isNaturalScrollEnabled, responsiveCardWidth, responsiveCardGap, scrollNaturallyToIndex, onSlideChange, flexibleWidth, screenSize, shouldDisableScrolling])

  // Auto-scroll carousel when currentSlide changes (for natural scroll)
  // Only auto-scroll if naturalScroll is disabled and scrolling is not disabled
  React.useEffect(() => {
    if (carouselRef.current && !isNaturalScrollEnabled && !shouldDisableScrolling()) {
      const actualCardWidth = Math.max(responsiveCardWidth, 248)
      const totalCardWidth = actualCardWidth + responsiveCardGap
      
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
  }, [currentSlide, responsiveCardWidth, responsiveCardGap, screenSize, isNaturalScrollEnabled, shouldDisableScrolling])

  // Add scroll event listener to check position and detect manual interaction
  React.useEffect(() => {
    const carousel = carouselRef.current
    if (carousel && isNaturalScrollEnabled) {
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
  }, [checkScrollPosition, handleManualInteraction, isNaturalScrollEnabled])

  // Progress tracking
  React.useEffect(() => {
    if (!autoPlay) return
    if (isNaturalScrollEnabled) return // Disable progress tracking for natural scroll
  
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (autoPlayInterval / 100)
        return prev + increment >= 100 ? 0 : prev + increment
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [autoPlay, autoPlayInterval, isNaturalScrollEnabled])

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
    scrollToSlide(index)
  }

  const nextSlide = () => {
    if (shouldDisableScrolling()) {
      handleSlideChange((activeCardIndex + 1) % items.length)
    } else {
      handleSlideChange((currentSlide + 1) % items.length)
    }
  }

  const prevSlide = () => {
    if (shouldDisableScrolling()) {
      handleSlideChange((activeCardIndex - 1 + items.length) % items.length)
    } else {
      handleSlideChange((currentSlide - 1 + items.length) % items.length)
    }
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
      {showGradients && !shouldDisableScrolling() && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </>
      )}

      {/* Carousel Container */}
      {isNaturalScrollEnabled ? (
        <div 
          className={cn(
            "flex pb-4 pt-4 platform-carousel-container",
            shouldDisableScrolling() ? "overflow-visible" : "overflow-x-auto scrollbar-hide"
          )}
          ref={carouselRef}
          style={{ 
            gap: `${responsiveCardGap}px`
          }}
        >
          {items.map((item, index) => {
            const cardClasses = cn(
              "w-full h-full rounded-lg border transition-all duration-300",
              cardStyle === 'filled'
                ? 'bg-card border-border'
                : cardStyle === 'outline'
                  ? 'bg-transparent border-border'
                  : cardStyle === 'blue'
                    ? highlightActiveCard && index === activeCardIndex
                      ? 'border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/15 shadow-blue-500/20 shadow-sm'
                      : 'border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/8 hover:bg-blue-500/10 hover:border-blue-500/30'
                    : cardStyle === 'green'
                      ? highlightActiveCard && index === activeCardIndex
                        ? 'border-green-500/30 bg-green-500/10 dark:bg-green-500/15 shadow-green-500/20 shadow-sm'
                        : 'border-green-500/20 bg-green-500/5 dark:bg-green-500/8 hover:bg-green-500/10 hover:border-green-500/30'
                      : cardStyle === 'purple'
                        ? highlightActiveCard && index === activeCardIndex
                          ? 'border-purple-500/30 bg-purple-500/10 dark:bg-purple-500/15 shadow-purple-500/20 shadow-sm'
                          : 'border-purple-500/20 bg-purple-500/5 dark:bg-purple-500/8 hover:bg-purple-500/10 hover:border-purple-500/30'
                        : cardStyle === 'neutral-blue'
                          ? highlightActiveCard && index === activeCardIndex
                            ? 'border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/15 shadow-blue-500/20 shadow-sm'
                            : 'bg-card border-border'
                          : highlightActiveCard && index === activeCardIndex
                            ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm'
                            : 'border-border bg-card'
            )

            const iconWrapperClass = cn(
              "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center mb-4 flex-shrink-0",
              cardStyle === 'blue'
                ? 'bg-blue-500/10'
                : cardStyle === 'green'
                  ? 'bg-green-500/10'
                  : cardStyle === 'purple'
                    ? 'bg-purple-500/10'
                    : cardStyle === 'neutral-blue'
                      ? 'bg-blue-500/10'
                      : 'bg-primary/10'
            )

            const iconClass = cn(
              "text-4xl sm:text-5xl md:text-6xl",
              cardStyle === 'blue'
                ? 'text-blue-500'
                : cardStyle === 'green'
                  ? 'text-green-500'
                  : cardStyle === 'purple'
                    ? 'text-purple-500'
                    : cardStyle === 'neutral-blue'
                      ? 'text-blue-500'
                      : 'text-primary'
            )

            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className="platform-carousel-card flex-shrink-0"
                style={{ 
                  minWidth: shouldUseFlexibleWidth() ? 'auto' : `${Math.max(responsiveCardWidth, 300)}px`, 
                  maxWidth: shouldUseFlexibleWidth() ? 'none' : `${Math.max(responsiveCardWidth, 300)}px`,
                  flex: shouldUseFlexibleWidth() ? '1' : 'none',
                  height: hugContent ? responsiveMinHeightValue : (maxCardHeight > 0 ? `${maxCardHeight}px` : 'auto'),
                  minHeight: responsiveMinHeightValue,
                  marginLeft: index === 0 ? `${responsivePadding.paddingLeft}px` : '0',
                  marginRight: index === items.length - 1 ? `${responsivePadding.paddingRight}px` : '0'
                }}
              >
                <div className={cardClasses}>
                  <div className={hugContent ? "flex flex-col justify-end h-full" : "flex flex-col h-full"}>
                    <div className={customPadding || (hugContent ? "p-6" : "p-6 pb-4")}>
                      {item.icon && (
                        <div className={iconWrapperClass}>
                          <item.icon className={iconClass} />
                        </div>
                      )}
                      <div className="flex flex-col flex-1">
                        <h4 className="text-xl font-semibold text-foreground leading-tight mb-3">{item.title}</h4>
                        <p className="text-base text-muted-foreground leading-relaxed flex-1">{item.description}</p>
                      </div>
                    </div>
                    {item.content && (
                      <div className={`flex-shrink-0 mt-auto ${customContentPadding || ''}`}>
                        {item.content}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div 
          className={cn(
            "platform-carousel-container",
            shouldDisableScrolling() ? "overflow-visible" : "overflow-hidden"
          )}
          onTouchStart={shouldDisableScrolling() ? undefined : handleTouchStart}
          onTouchMove={shouldDisableScrolling() ? undefined : handleTouchMove}
          onTouchEnd={shouldDisableScrolling() ? undefined : handleTouchEnd}
          onMouseDown={shouldDisableScrolling() ? undefined : handleMouseDown}
          onMouseMove={shouldDisableScrolling() ? undefined : handleMouseMove}
          onMouseUp={shouldDisableScrolling() ? undefined : handleMouseUp}
          onMouseLeave={shouldDisableScrolling() ? undefined : handleMouseLeaveDrag}
          style={{ 
            cursor: shouldDisableScrolling() ? 'default' : (isDragging ? 'grabbing' : 'grab'),
            width: '100%',
            maxWidth: '100%'
          }}
        >
          <div 
            className={`flex ${isDragging ? 'transition-none' : 'transition-transform duration-500 ease-in-out'}`}
            style={{ 
              transform: shouldDisableScrolling() ? 'none' : `translateX(-${currentSlide * (Math.max(responsiveCardWidth, 300) + responsiveCardGap) + dragOffset}px)`,
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
                  minWidth: shouldUseFlexibleWidth() ? 'auto' : `${Math.max(responsiveCardWidth, 248)}px`, 
                  maxWidth: shouldUseFlexibleWidth() ? 'none' : `${Math.max(responsiveCardWidth, 248)}px`,
                  flex: shouldUseFlexibleWidth() ? '1' : 'none',
                  height: hugContent ? responsiveMinHeightValue : (maxCardHeight > 0 ? `${maxCardHeight}px` : 'auto'),
                  minHeight: responsiveMinHeightValue,
                  marginLeft: index === 0 ? `${responsivePadding.paddingLeft}px` : '0',
                  marginRight: index === items.length - 1 ? `${responsivePadding.paddingRight}px` : '0'
                }}
              >
                <div className={cn(
                  "w-full h-full rounded-lg border transition-all duration-300 overflow-hidden",
                  cardStyle === 'filled' 
                    ? 'bg-card border-border' 
                    : cardStyle === 'outline'
                      ? 'bg-transparent border-border'
                      : cardStyle === 'blue'
                        ? highlightActiveCard && index === activeCardIndex
                          ? 'border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/15 shadow-blue-500/20 shadow-sm'
                          : 'border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/8 hover:bg-blue-500/10 hover:border-blue-500/30'
                        : cardStyle === 'green'
                          ? highlightActiveCard && index === activeCardIndex
                            ? 'border-green-500/30 bg-green-500/10 dark:bg-green-500/15 shadow-green-500/20 shadow-sm'
                            : 'border-green-500/20 bg-green-500/5 dark:bg-green-500/8 hover:bg-green-500/10 hover:border-green-500/30'
                          : cardStyle === 'purple'
                            ? highlightActiveCard && index === activeCardIndex
                              ? 'border-purple-500/30 bg-purple-500/10 dark:bg-purple-500/15 shadow-purple-500/20 shadow-sm'
                              : 'border-purple-500/20 bg-purple-500/5 dark:bg-purple-500/8 hover:bg-purple-500/10 hover:border-purple-500/30'
                            : cardStyle === 'neutral-blue'
                          ? highlightActiveCard && index === activeCardIndex
                            ? 'border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/15 shadow-blue-500/20 shadow-sm'
                            : 'bg-card border-border'
                          : highlightActiveCard && index === activeCardIndex 
                            ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm'
                            : 'border-border bg-card'
                )}>
                  <div className={hugContent ? "flex flex-col justify-end h-full" : "flex flex-col h-full"}>
                    <div className={customPadding || (hugContent ? "p-6" : "p-6 pb-4")}>
                      {item.icon && (
                        <div className={cn(
                          "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center mb-4 flex-shrink-0",
                          cardStyle === 'blue' || cardStyle === 'neutral-blue' ? 'bg-blue-500/10' :
                          cardStyle === 'green' ? 'bg-green-500/10' :
                          cardStyle === 'purple' ? 'bg-purple-500/10' :
                          'bg-primary/10'
                        )}>
                          <item.icon className={cn(
                            "text-4xl sm:text-5xl md:text-6xl",
                            cardStyle === 'blue' || cardStyle === 'neutral-blue' ? 'text-blue-500' :
                            cardStyle === 'green' ? 'text-green-500' :
                            cardStyle === 'purple' ? 'text-purple-500' :
                            'text-primary'
                          )} />
                        </div>
                      )}
                      <div className="flex flex-col flex-1">
                        <h4 className="text-xl font-semibold text-foreground leading-tight mb-3">{item.title}</h4>
                        <p className="text-base text-muted-foreground leading-relaxed flex-1">{item.description}</p>
                      </div>
                    </div>
                    {item.content && (
                      <div className={`flex-shrink-0 mt-auto ${customContentPadding || ''}`}>
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
                  ? index === activeCardIndex 
                    ? indicatorColor === 'green' ? "bg-green-500 w-8" :
                      indicatorColor === 'purple' ? "bg-purple-500 w-8" :
                      indicatorColor === 'blue' ? "bg-blue-500 w-8" :
                      "bg-primary w-8"
                    : "bg-muted-foreground/30"
                  : index === activeCardIndex
                    ? indicatorColor === 'green' ? "bg-green-500 h-1 w-6" :
                      indicatorColor === 'purple' ? "bg-purple-500 h-1 w-6" :
                      indicatorColor === 'blue' ? "bg-blue-500 h-1 w-6" :
                      "bg-primary h-1 w-6"
                    : "bg-muted-foreground/30 h-1 w-2"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
