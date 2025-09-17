"use client"

import React from "react"
import { PlatformCarousel, PlatformCarouselItem } from "./platform-carousel"

export interface PlatformPageCarouselProps {
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

export function PlatformPageCarousel(props: PlatformPageCarouselProps) {
  // Override settings for platform page specific styling
  const platformProps = {
    ...props,
    cardStyle: 'filled' as const,
    customPadding: 'p-6', // Platform-specific padding (hugContent=true means p-6)
    customContentPadding: undefined // No separate content padding - content is part of main card
  }

  return <PlatformCarousel {...platformProps} />
}
