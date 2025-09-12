"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { usePerformanceMonitor } from '@/hooks/use-performance-monitor'

interface OptimizedAnimationWrapperProps {
  children: React.ReactNode
  className?: string
  fallback?: React.ReactNode
  performanceThreshold?: number
}

export function OptimizedAnimationWrapper({ 
  children, 
  className = "",
  fallback = null,
  performanceThreshold = 0.8
}: OptimizedAnimationWrapperProps) {
  const prefersReducedMotion = useReducedMotion()
  const { metrics, measureFrame } = usePerformanceMonitor({
    targetFPS: 30,
    lowPerformanceThreshold: performanceThreshold
  })
  const [shouldRenderAnimation, setShouldRenderAnimation] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Monitor performance and disable animations if performance is poor
  useEffect(() => {
    if (metrics.isLowPerformance && shouldRenderAnimation) {
      console.warn('Low performance detected, disabling animations')
      setShouldRenderAnimation(false)
    }
  }, [metrics.isLowPerformance, shouldRenderAnimation])

  // Respect reduced motion preference
  useEffect(() => {
    if (prefersReducedMotion) {
      setShouldRenderAnimation(false)
    }
  }, [prefersReducedMotion])

  // Performance monitoring
  useEffect(() => {
    if (!shouldRenderAnimation) return

    let animationId: number
    const monitorPerformance = () => {
      measureFrame()
      animationId = requestAnimationFrame(monitorPerformance)
    }

    animationId = requestAnimationFrame(monitorPerformance)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [shouldRenderAnimation, measureFrame])

  // Show fallback if animations are disabled
  if (!shouldRenderAnimation) {
    return (
      <div className={className}>
        {fallback}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
