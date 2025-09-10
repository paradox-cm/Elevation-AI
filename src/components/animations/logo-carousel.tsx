"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface LogoCarouselProps {
  className?: string
}

interface LogoItem {
  name: string
  filename: string
  showText?: boolean
}

const logos: LogoItem[] = [
  { name: "Accenture", filename: "Accenture.svg", showText: true },
  { name: "Apple", filename: "Apple.svg", showText: false },
  { name: "Bank of America", filename: "Bank-of-America.svg", showText: true },
  { name: "BCG Consulting", filename: "BCG-Consulting.svg", showText: true },
  { name: "Capital One", filename: "Capital-One.svg", showText: true },
  { name: "Deutsche Bank", filename: "Deutsche-Bank.svg", showText: true },
  { name: "eBay", filename: "ebay.svg", showText: false },
  { name: "Google", filename: "Google.svg", showText: true },
  { name: "Indeed", filename: "Indeed.svg", showText: true },
  { name: "JPM", filename: "JPM.svg", showText: true },
  { name: "McKinsey", filename: "McKinsey.svg", showText: true },
  { name: "Meta", filename: "Meta.svg", showText: true },
  { name: "Tesla", filename: "Tesla.svg", showText: true },
  { name: "Visa", filename: "Visa.svg", showText: true },
  { name: "Microsoft", filename: "Windows.svg", showText: true }
]

// Split logos responsively
// Mobile (< 640px): 3 rows (5 logos each)
// Small/Medium/Desktop (≥ 640px): 2 rows (7-8 logos each)
const getResponsiveLogoDistribution = (isMobile: boolean) => {
  if (isMobile) {
    // Mobile (< 640px): 3 rows of 5 logos each
    return {
      firstRow: logos.slice(0, 5),
      secondRow: logos.slice(5, 10),
      thirdRow: logos.slice(10, 15)
    }
  } else {
    // Small/Medium/Desktop (≥ 640px): 2 rows of 7-8 logos each
    return {
      firstRow: logos.slice(0, 8),
      secondRow: logos.slice(8, 15),
      thirdRow: [] // No third row on sm/md/lg+ breakpoints
    }
  }
}

export function LogoCarousel({ className }: LogoCarouselProps) {
  const [hoverState, setHoverState] = React.useState<'left' | 'right' | 'none'>('none')
  const [isInView, setIsInView] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)
  const firstRowRef = React.useRef<HTMLDivElement>(null)
  const secondRowRef = React.useRef<HTMLDivElement>(null)
  const thirdRowRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const animationRef = React.useRef<number | undefined>(undefined)
  const startTimeRef = React.useRef<number | undefined>(undefined)
  const firstRowPositionRef = React.useRef<number>(0)
  const secondRowPositionRef = React.useRef<number>(0)
  const thirdRowPositionRef = React.useRef<number>(0)
  const directionRef = React.useRef<number>(1) // 1 for forward, -1 for reverse
  const speedRef = React.useRef<number>(1) // 1 for normal, 3 for fast
  
  // Media query to detect mobile vs desktop
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640) // sm breakpoint - only true mobile shows 3 rows
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])
  
  // Get responsive logo distribution
  const logoDistribution = getResponsiveLogoDistribution(isMobile)
  
  // Duplicate logos for seamless infinite scroll - more duplicates on desktop for better tiling
  const getDuplicatedLogos = (logos: LogoItem[]) => {
    if (isMobile) {
      // Mobile: 2 sets for seamless loop
      return [...logos, ...logos]
    } else {
      // Desktop: 3 sets for better tiling and seamless loop
      return [...logos, ...logos, ...logos]
    }
  }
  
  const duplicatedFirstRowLogos = getDuplicatedLogos(logoDistribution.firstRow)
  const duplicatedSecondRowLogos = getDuplicatedLogos(logoDistribution.secondRow)
  const duplicatedThirdRowLogos = getDuplicatedLogos(logoDistribution.thirdRow)

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp
    }
    
    const elapsed = timestamp - startTimeRef.current
    const baseDuration = 62400 // 62.4 seconds base duration (30% slower)
    const adjustedDuration = baseDuration / speedRef.current
    
    // Calculate progress (0 to 1) and wrap around
    const progress = (elapsed / adjustedDuration) % 1
    
    // Calculate movement range based on number of duplicates
    const movementRange = isMobile ? 50 : 33.33 // 50% for 2 sets, 33.33% for 3 sets
    
    // First row: moves left (forward direction)
    let firstRowPosition
    if (directionRef.current === 1) {
      firstRowPosition = progress * movementRange // Forward: 0% to movementRange%
    } else {
      firstRowPosition = movementRange - (progress * movementRange) // Reverse: movementRange% to 0%
    }
    
    // Second row: moves right (reverse direction)
    let secondRowPosition
    if (directionRef.current === 1) {
      secondRowPosition = movementRange - (progress * movementRange) // Reverse: movementRange% to 0%
    } else {
      secondRowPosition = progress * movementRange // Forward: 0% to movementRange%
    }
    
    // Third row: only animate on mobile (when third row exists)
    let thirdRowPosition = 0
    if (isMobile && logoDistribution.thirdRow.length > 0) {
      if (directionRef.current === 1) {
        thirdRowPosition = (progress * movementRange) + (movementRange * 0.5) // Forward: 25% to 75%
      } else {
        thirdRowPosition = (movementRange * 1.5) - (progress * movementRange) // Reverse: 75% to 25%
      }
    }
    
    firstRowPositionRef.current = firstRowPosition
    secondRowPositionRef.current = secondRowPosition
    thirdRowPositionRef.current = thirdRowPosition
    
    if (firstRowRef.current) {
      firstRowRef.current.style.transform = `translateX(-${firstRowPosition}%)`
    }
    
    if (secondRowRef.current) {
      secondRowRef.current.style.transform = `translateX(-${secondRowPosition}%)`
    }
    
    if (thirdRowRef.current) {
      thirdRowRef.current.style.transform = `translateX(-${thirdRowPosition}%)`
    }
    
    animationRef.current = requestAnimationFrame(animate)
  }

  // Intersection Observer to start animation when in view
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
          } else {
            setIsInView(false)
          }
        })
      },
      {
        threshold: 0.1, // Start animation when 10% of the element is visible
        rootMargin: '50px' // Start animation 50px before it comes into view
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  // Start/stop animation based on visibility and responsive changes
  React.useEffect(() => {
    if (isInView) {
      animationRef.current = requestAnimationFrame(animate)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isInView, isMobile, logoDistribution])

  const handleMouseEnter = (side: 'left' | 'right') => {
    if (!isInView) return // Only allow hover interactions when in view
    
    setHoverState(side)
    
    // Get the current actual position from the refs
    const currentFirstRowPosition = firstRowPositionRef.current
    const currentSecondRowPosition = secondRowPositionRef.current
    
    console.log(`Mouse enter ${side}:`, {
      currentFirstRowPosition,
      currentSecondRowPosition,
      currentDirection: directionRef.current,
      currentSpeed: speedRef.current
    })
    
    if (side === 'left') {
      // For reverse direction
      directionRef.current = -1 // Reverse direction
      speedRef.current = 2.1 // Faster reverse speed (30% slower than before)
      
      // Calculate progress based on current position for reverse animation
      const movementRange = isMobile ? 50 : 33.33
      const currentProgress = currentFirstRowPosition / movementRange // Convert position to progress (0-1)
      const reverseProgress = 1 - currentProgress // Invert the progress for reverse
      
      // Set start time so reverse animation continues from current position
      startTimeRef.current = performance.now() - (reverseProgress * 29714) // ~29.7s for fast reverse
      
      console.log('Left hover - reverse:', {
        currentProgress,
        reverseProgress,
        newStartTime: startTimeRef.current
      })
    } else if (side === 'right') {
      // For fast forward, continue from current position
      directionRef.current = 1 // Forward direction
      speedRef.current = 2.1 // Faster forward speed (30% slower than before)
      
      // Calculate progress based on current position
      const movementRange = isMobile ? 50 : 33.33
      const currentProgress = currentFirstRowPosition / movementRange
      
      // Set start time for fast animation from current position
      startTimeRef.current = performance.now() - (currentProgress * 29714) // ~29.7s for fast forward
      
      console.log('Right hover - fast forward:', {
        currentProgress,
        newStartTime: startTimeRef.current
      })
    }
  }

  const handleMouseLeave = () => {
    if (!isInView) return // Only allow hover interactions when in view
    
    setHoverState('none')
    
    // Get the current actual position from the refs (these are updated in the animate function)
    const currentFirstRowPosition = firstRowPositionRef.current
    const currentSecondRowPosition = secondRowPositionRef.current
    
    console.log('Mouse leave:', {
      currentFirstRowPosition,
      currentSecondRowPosition,
      previousDirection: directionRef.current,
      previousSpeed: speedRef.current
    })
    
    // Reset to normal speed and forward direction
    directionRef.current = 1 // Forward direction
    speedRef.current = 1 // Normal speed
    
    // Calculate the progress based on current position for normal speed animation
    const movementRange = isMobile ? 50 : 33.33
    const currentProgress = currentFirstRowPosition / movementRange
    
    // Set start time to continue from current position at normal speed
    startTimeRef.current = performance.now() - (currentProgress * 62400) // 62.4s for normal speed
    
    console.log('Mouse leave - reset to normal:', {
      currentProgress,
      newStartTime: startTimeRef.current
    })
  }

  return (
    <div 
      ref={containerRef} 
      className={cn("relative overflow-hidden", className)}
      style={{
        maskImage: 'linear-gradient(to right, transparent 0px, black 64px, black calc(100% - 64px), transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0px, black 64px, black calc(100% - 64px), transparent 100%)'
      }}
    >
      
      {/* Left hover zone for reverse direction (desktop only) */}
      <div 
        className="hidden lg:block absolute left-0 top-0 bottom-0 w-1/3 z-20 cursor-w-resize"
        onMouseEnter={() => handleMouseEnter('left')}
        onMouseLeave={handleMouseLeave}
      />
      
      {/* Right hover zone for speed up (desktop only) */}
      <div 
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/3 z-20 cursor-e-resize"
        onMouseEnter={() => handleMouseEnter('right')}
        onMouseLeave={handleMouseLeave}
      />
      
      {/* First row - moves left */}
      <div ref={firstRowRef} className="flex mb-4 sm:mb-8 lg:mb-16">
        {/* Extra padding at the start for better visibility */}
        <div className="flex-shrink-0 w-4 sm:w-12 lg:w-16" />
        {duplicatedFirstRowLogos.map((logo, index) => (
          <div
            key={`first-${logo.filename}-${index}`}
            className="flex-shrink-0 flex items-center gap-3 px-4 sm:px-6 lg:px-8"
          >
            {/* Logo */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center">
              <img
                src={`/images/logos/${logo.filename}`}
                alt={`${logo.name} logo`}
                className="w-full h-full object-contain filter dark:brightness-0 dark:invert opacity-80"
                loading="lazy"
              />
            </div>
            
            {/* Company name - only show if showText is true */}
            {logo.showText && (
              <span className="text-sm sm:text-base lg:text-lg font-medium text-muted-foreground whitespace-nowrap">
                {logo.name}
              </span>
            )}
          </div>
        ))}
        {/* Extra padding at the end for smooth looping */}
        <div className="flex-shrink-0 w-16 sm:w-24 lg:w-32" />
      </div>

      {/* Second row - moves right */}
      <div ref={secondRowRef} className="flex mb-4 sm:mb-8 lg:mb-16">
        {/* Extra padding at the start for better visibility */}
        <div className="flex-shrink-0 w-4 sm:w-12 lg:w-16" />
        {duplicatedSecondRowLogos.map((logo, index) => (
          <div
            key={`second-${logo.filename}-${index}`}
            className="flex-shrink-0 flex items-center gap-3 px-4 sm:px-6 lg:px-8"
          >
            {/* Logo */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center">
              <img
                src={`/images/logos/${logo.filename}`}
                alt={`${logo.name} logo`}
                className="w-full h-full object-contain filter dark:brightness-0 dark:invert opacity-80"
                loading="lazy"
              />
            </div>
            
            {/* Company name - only show if showText is true */}
            {logo.showText && (
              <span className="text-sm sm:text-base lg:text-lg font-medium text-muted-foreground whitespace-nowrap">
                {logo.name}
              </span>
            )}
          </div>
        ))}
        {/* Extra padding at the end for smooth looping */}
        <div className="flex-shrink-0 w-16 sm:w-24 lg:w-32" />
      </div>

      {/* Third row - only show on mobile */}
      {isMobile && logoDistribution.thirdRow.length > 0 && (
        <div ref={thirdRowRef} className="flex">
          {/* Extra padding at the start for better visibility */}
          <div className="flex-shrink-0 w-4 sm:w-12 lg:w-16" />
          {duplicatedThirdRowLogos.map((logo, index) => (
            <div
              key={`third-${logo.filename}-${index}`}
              className="flex-shrink-0 flex items-center gap-3 px-4 sm:px-6 lg:px-8"
            >
              {/* Logo */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center">
                <img
                  src={`/images/logos/${logo.filename}`}
                  alt={`${logo.name} logo`}
                  className="w-full h-full object-contain filter dark:brightness-0 dark:invert opacity-80"
                  loading="lazy"
                />
              </div>
              
              {/* Company name - only show if showText is true */}
              {logo.showText && (
                <span className="text-sm sm:text-base lg:text-lg font-medium text-muted-foreground whitespace-nowrap">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
          {/* Extra padding at the end for smooth looping */}
          <div className="flex-shrink-0 w-16 sm:w-24 lg:w-32" />
        </div>
      )}
    </div>
  )
}
