"use client"

import React, { useState, useEffect } from "react"
import { PlatformCarousel, PlatformCarouselItem } from "./platform-carousel"

export type { PlatformCarouselItem }

export interface PeopleCarouselProps {
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
  responsive?: {
    sm?: { cardWidth: number; cardGap: number }
    md?: { cardWidth: number; cardGap: number }
    lg?: { cardWidth: number; cardGap: number }
    xl?: { cardWidth: number; cardGap: number }
    '2xl'?: { cardWidth: number; cardGap: number }
  }
}

export function PeopleCarousel(props: PeopleCarouselProps) {
  const [isCompactViewport, setIsCompactViewport] = useState(false)

  // Detect mobile devices
  useEffect(() => {
    const checkViewport = () => {
      setIsCompactViewport(window.innerWidth < 1024) // disable gradients up to lg breakpoint
    }
    
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  // Use custom padding that matches the original Carousel component
  // Disable gradients on mobile devices
  const peopleProps = {
    ...props,
    cardStyle: props.cardStyle || 'blue', // Default to blue if not specified
    indicatorColor: props.indicatorColor || 'primary', // Default to primary if not specified
    customPadding: 'p-6', // Use the same padding as original Carousel component
    customContentPadding: 'p-6 pt-0', // People page needs separate content padding for badges
    showGradients: isCompactViewport ? false : (props.showGradients ?? true) // Disable gradients on mobile & tablet
  }

  return <PlatformCarousel {...peopleProps} />
}
