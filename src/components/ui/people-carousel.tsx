"use client"

import React from "react"
import { PlatformCarousel, PlatformCarouselItem } from "./platform-carousel"

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
  // Override the cardStyle to always use blue for people page
  // and use custom padding that matches the original Carousel component
  const peopleProps = {
    ...props,
    cardStyle: 'blue' as const,
    customPadding: 'p-6', // Use the same padding as original Carousel component
    customContentPadding: 'p-6 pt-0' // People page needs separate content padding for badges
  }

  return <PlatformCarousel {...peopleProps} />
}
