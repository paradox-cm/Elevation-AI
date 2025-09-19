"use client"

import React, { useEffect, useRef, useMemo, useState } from 'react'

// Global animation cache and path length storage
const animationCache = {
  keyframesAdded: false,
  pathLength: 0
}

// Cache path length to avoid recalculation
const getCachedPathLength = (): number => {
  if (animationCache.pathLength > 0) return animationCache.pathLength
  
  // Try to get from localStorage first (only in browser)
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = localStorage.getItem('e_arrow_path_length')
      if (stored) {
        const length = parseFloat(stored)
        if (length > 0) {
          animationCache.pathLength = length
          return length
        }
      }
    } catch (error) {
      // localStorage might be disabled or throw errors
      console.warn('localStorage access failed:', error)
    }
  }
  
  // Fallback to default
  return 450
}

// Function to add static CSS optimizations
const addGlobalStyles = (() => {
  return function addGlobalStyles(): void {
    if (animationCache.keyframesAdded) return
    
    // Only run in browser environment
    if (typeof document === 'undefined') return

    const style = document.createElement('style')
    style.id = 'loading-animation-styles'
    style.textContent = `
      /* Static CSS with pre-defined values */
      .loading-path {
        will-change: stroke-dashoffset;
        stroke-dasharray: var(--head-length, 67.5) var(--tail-length, 382.5);
        stroke-dashoffset: var(--path-length, 450);
      }
      
      /* Smooth opacity transition */
      .loading-path-hidden {
        opacity: 0;
        transition: opacity 0.2s ease-in;
      }
      
      .loading-path-visible {
        opacity: 1;
      }
      
      /* Hide entire SVG initially to prevent flash */
      .loading-svg-hidden {
        opacity: 0;
        transition: opacity 0.2s ease-in;
      }
      
      .loading-svg-visible {
        opacity: 1;
      }
    `
    document.head.appendChild(style)
    animationCache.keyframesAdded = true
  }
})()

interface LoadingAnimationProps {
  size?: number
  strokeWidth?: number
  glowIntensity?: number
  duration?: number
  className?: string
}

export function LoadingAnimation({ 
  size = 60, 
  strokeWidth = 6,
  glowIntensity = 0.2,
  duration = 1.0,
  className = ""
}: LoadingAnimationProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const headRef = useRef<SVGPathElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Pre-calculate values with fallback
  const cachedPathLength = useMemo(() => getCachedPathLength(), [])
  const headLength = useMemo(() => cachedPathLength * 0.15, [cachedPathLength])

  useEffect(() => {
    if (!headRef.current) return

    const head = headRef.current

    // Add global styles
    if (typeof addGlobalStyles === 'function') {
      addGlobalStyles()
    }

    // Set up initial CSS variables with cached values
    // Set CSS variables on the SVG element instead of the path element
    if (svgRef.current && svgRef.current.style && typeof svgRef.current.style.setProperty === 'function') {
      svgRef.current.style.setProperty('--path-length', `${cachedPathLength}`)
      svgRef.current.style.setProperty('--head-length', `${headLength}`)
      svgRef.current.style.setProperty('--tail-length', `${cachedPathLength - headLength}`)
    }

    // Use requestIdleCallback for smooth setup
    const setupAnimation = () => {
      const actualPathLength = head.getTotalLength()
      
      // Update cache if we got a different value
      if (actualPathLength > 0 && Math.abs(actualPathLength - cachedPathLength) > 10) {
        const actualHeadLength: number = actualPathLength * 0.15
        const tailLength = actualPathLength - actualHeadLength
        // Update CSS variables on the SVG element
        if (svgRef.current && svgRef.current.style && typeof svgRef.current.style.setProperty === 'function') {
          svgRef.current.style.setProperty('--path-length', `${actualPathLength}`)
          svgRef.current.style.setProperty('--head-length', `${actualHeadLength}`)
          svgRef.current.style.setProperty('--tail-length', `${tailLength}`)
        }
        
        // Cache the new value
        animationCache.pathLength = actualPathLength
        if (typeof window !== 'undefined' && window.localStorage) {
          try {
            localStorage.setItem('e_arrow_path_length', actualPathLength.toString())
          } catch (error) {
            console.warn('localStorage setItem failed:', error)
          }
        }
      }

      // Use Web Animations API for smoother control
      if ('animate' in head) {
        head.animate(
          [
            { strokeDashoffset: `${cachedPathLength}` },
            { strokeDashoffset: '0' }
          ],
          {
            duration: duration * 1000,
            iterations: Infinity,
            easing: 'linear'
          }
        )
      } else {
        // Fallback to CSS animation
        (head as unknown as HTMLElement).style.animation = `loading-head-rotate ${duration}s linear infinite`
      }
      
      // Show the animation
      setIsVisible(true)
    }

    // Use requestIdleCallback for smooth timing
    if ('requestIdleCallback' in window) {
      requestIdleCallback(setupAnimation)
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(setupAnimation, 0)
    }
  }, [duration, cachedPathLength, headLength])

  // Pre-calculate glow styles to avoid runtime calculations
  const glowStyles = useMemo(() => ({
    filter: `drop-shadow(0 0 ${glowIntensity * 15}px rgba(59, 130, 246, ${glowIntensity})) drop-shadow(0 0 ${glowIntensity * 30}px rgba(59, 130, 246, ${glowIntensity * 0.6}))`,
    padding: '20px'
  }), [glowIntensity])

  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={glowStyles}
    >
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox="0 0 163.7 158.3"
        className={`${isVisible ? 'loading-svg-visible' : 'loading-svg-hidden'}`}
        style={{
          overflow: 'visible'
        }}
      >
        <defs>
          <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#1d4ed8" stopOpacity="1" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background stroke (subtle) */}
        <path
          d="M91.7,158.3c-7.2,0-13.1-5.9-13.1-13.1v-40.1c0-11.1-9-20.1-20.1-20.1H13.1c-7.2,0-13.1-5.9-13.1-13.1V13.1C0,5.9,5.9,0,13.1,0h137.5c7.2,0,13.1,5.9,13.1,13.1v132.1c0,7.2-5.9,13.1-13.1,13.1h-58.9Z"
          fill="none"
          stroke="rgba(59, 130, 246, 0.15)"
          strokeWidth={strokeWidth + 1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        
        {/* Traveling head stroke (thicker, brighter) */}
        <path
          ref={headRef}
          d="M91.7,158.3c-7.2,0-13.1-5.9-13.1-13.1v-40.1c0-11.1-9-20.1-20.1-20.1H13.1c-7.2,0-13.1-5.9-13.1-13.1V13.1C0,5.9,5.9,0,13.1,0h137.5c7.2,0,13.1,5.9,13.1,13.1v132.1c0,7.2-5.9,13.1-13.1,13.1h-58.9Z"
          fill="none"
          stroke="#60a5fa"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#strongGlow)"
          className={`loading-path ${isVisible ? 'loading-path-visible' : 'loading-path-hidden'}`}
        />
      </svg>
    </div>
  )
}

// Variant with pulsing effect
export function PulsingLoadingAnimation({ 
  size = 60, 
  strokeWidth = 6,
  glowIntensity = 0.2,
  duration = 1.0,
  className = ""
}: LoadingAnimationProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Pre-calculate values with fallback
  const cachedPathLength = useMemo(() => getCachedPathLength(), [])
  const segmentLength = useMemo(() => cachedPathLength * 0.3, [cachedPathLength])

  useEffect(() => {
    if (!pathRef.current) return

    const path = pathRef.current

    // Add global styles
    if (typeof addGlobalStyles === 'function') {
      addGlobalStyles()
    }

    // Set up initial CSS variables with cached values
    (path as unknown as HTMLElement).style.setProperty('--path-length', `${cachedPathLength}`)
    (path as unknown as HTMLElement).style.setProperty('--head-length', `${segmentLength}`)
    (path as unknown as HTMLElement).style.setProperty('--tail-length', `${cachedPathLength - segmentLength}`)

    // Use requestIdleCallback for smooth setup
    const setupAnimation = () => {
      const actualPathLength = path.getTotalLength()
      
      // Update cache if we got a different value
      if (actualPathLength > 0 && Math.abs(actualPathLength - cachedPathLength) > 10) {
        const actualSegmentLength: number = actualPathLength * 0.3
        const tailLength = actualPathLength - actualSegmentLength
        (path as unknown as HTMLElement).style.setProperty('--path-length', `${actualPathLength}`)
        (path as unknown as HTMLElement).style.setProperty('--head-length', `${actualSegmentLength}`)
        (path as unknown as HTMLElement).style.setProperty('--tail-length', `${tailLength}`)
        
        // Cache the new value
        animationCache.pathLength = actualPathLength
        if (typeof window !== 'undefined' && window.localStorage) {
          try {
            localStorage.setItem('e_arrow_path_length', actualPathLength.toString())
          } catch (error) {
            console.warn('localStorage setItem failed:', error)
          }
        }
      }

      // Use Web Animations API for smoother control
      if ('animate' in path) {
        path.animate(
          [
            { strokeDashoffset: `${cachedPathLength}` },
            { strokeDashoffset: '0' }
          ],
          {
            duration: duration * 1000,
            iterations: Infinity,
            easing: 'linear'
          }
        )
      } else {
        // Fallback to CSS animation
        (path as unknown as HTMLElement).style.animation = `pulse-rotate ${duration}s linear infinite`
      }
      
      // Show the animation
      setIsVisible(true)
    }

    // Use requestIdleCallback for smooth timing
    if ('requestIdleCallback' in window) {
      requestIdleCallback(setupAnimation)
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(setupAnimation, 0)
    }
  }, [duration, cachedPathLength, segmentLength])

  // Pre-calculate glow styles
  const glowStyles = useMemo(() => ({
    filter: `drop-shadow(0 0 ${glowIntensity * 20}px rgba(59, 130, 246, ${glowIntensity})) drop-shadow(0 0 ${glowIntensity * 40}px rgba(59, 130, 246, ${glowIntensity * 0.5}))`
  }), [glowIntensity])

  return (
    <div className={`flex items-center justify-center ${className}`}>
        <svg
          ref={svgRef}
          width={size}
          height={size}
          viewBox="0 0 163.7 158.3"
          className={`animate-pulse ${isVisible ? 'loading-svg-visible' : 'loading-svg-hidden'}`}
          style={glowStyles}
        >
        <defs>
          <linearGradient id="pulsingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#1d4ed8" stopOpacity="1" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.6" />
          </linearGradient>
          <filter id="pulsingGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background stroke (subtle) */}
        <path
          d="M91.7,158.3c-7.2,0-13.1-5.9-13.1-13.1v-40.1c0-11.1-9-20.1-20.1-20.1H13.1c-7.2,0-13.1-5.9-13.1-13.1V13.1C0,5.9,5.9,0,13.1,0h137.5c7.2,0,13.1,5.9,13.1,13.1v132.1c0,7.2-5.9,13.1-13.1,13.1h-58.9Z"
          fill="none"
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth={strokeWidth + 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Animated stroke */}
        <path
          ref={pathRef}
          d="M91.7,158.3c-7.2,0-13.1-5.9-13.1-13.1v-40.1c0-11.1-9-20.1-20.1-20.1H13.1c-7.2,0-13.1-5.9-13.1-13.1V13.1C0,5.9,5.9,0,13.1,0h137.5c7.2,0,13.1,5.9,13.1,13.1v132.1c0,7.2-5.9,13.1-13.1,13.1h-58.9Z"
          fill="none"
          stroke="url(#pulsingGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#pulsingGlow)"
          className={`loading-path ${isVisible ? 'loading-path-visible' : 'loading-path-hidden'}`}
        />
        
      </svg>
    </div>
  )
}

// Dramatic traveling variant with more pronounced head
export function TravelingLoadingAnimation({ 
  size = 60, 
  strokeWidth = 6,
  glowIntensity = 0.2,
  duration = 1.0,
  className = ""
}: LoadingAnimationProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const headRef = useRef<SVGPathElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Pre-calculate values with fallback
  const cachedPathLength = useMemo(() => getCachedPathLength(), [])
  const headLength = useMemo(() => cachedPathLength * 0.2, [cachedPathLength])

  useEffect(() => {
    if (!headRef.current) return

    const head = headRef.current

    // Add global styles
    if (typeof addGlobalStyles === 'function') {
      addGlobalStyles()
    }

    // Set up initial CSS variables with cached values
    // Set CSS variables on the SVG element instead of the path element
    if (svgRef.current && svgRef.current.style && typeof svgRef.current.style.setProperty === 'function') {
      svgRef.current.style.setProperty('--path-length', `${cachedPathLength}`)
      svgRef.current.style.setProperty('--head-length', `${headLength}`)
      svgRef.current.style.setProperty('--tail-length', `${cachedPathLength - headLength}`)
    }

    // Use requestIdleCallback for smooth setup
    const setupAnimation = () => {
      const actualPathLength = head.getTotalLength()
      
      // Update cache if we got a different value
      if (actualPathLength > 0 && Math.abs(actualPathLength - cachedPathLength) > 10) {
        const actualHeadLength: number = actualPathLength * 0.2
        const tailLength = actualPathLength - actualHeadLength
        // Update CSS variables on the SVG element
        if (svgRef.current && svgRef.current.style && typeof svgRef.current.style.setProperty === 'function') {
          svgRef.current.style.setProperty('--path-length', `${actualPathLength}`)
          svgRef.current.style.setProperty('--head-length', `${actualHeadLength}`)
          svgRef.current.style.setProperty('--tail-length', `${tailLength}`)
        }
        
        // Cache the new value
        animationCache.pathLength = actualPathLength
        if (typeof window !== 'undefined' && window.localStorage) {
          try {
            localStorage.setItem('e_arrow_path_length', actualPathLength.toString())
          } catch (error) {
            console.warn('localStorage setItem failed:', error)
          }
        }
      }

      // Use Web Animations API for smoother control
      if ('animate' in head) {
        head.animate(
          [
            { strokeDashoffset: `${cachedPathLength}` },
            { strokeDashoffset: '0' }
          ],
          {
            duration: duration * 1000,
            iterations: Infinity,
            easing: 'linear'
          }
        )
      } else {
        // Fallback to CSS animation
        (head as unknown as HTMLElement).style.animation = `head-rotate-travel ${duration}s linear infinite`
      }
      
      // Show the animation
      setIsVisible(true)
    }

    // Use requestIdleCallback for smooth timing
    if ('requestIdleCallback' in window) {
      requestIdleCallback(setupAnimation)
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(setupAnimation, 0)
    }
  }, [duration, cachedPathLength, headLength])

  // Pre-calculate glow styles
  const glowStyles = useMemo(() => ({
    filter: `drop-shadow(0 0 ${glowIntensity * 20}px rgba(59, 130, 246, ${glowIntensity})) drop-shadow(0 0 ${glowIntensity * 40}px rgba(59, 130, 246, ${glowIntensity * 0.7}))`,
    padding: '25px'
  }), [glowIntensity])

  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={glowStyles}
    >
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox="0 0 163.7 158.3"
        className={`${isVisible ? 'loading-svg-visible' : 'loading-svg-hidden'}`}
        style={{
          overflow: 'visible'
        }}
      >
        <defs>
          <linearGradient id="travelingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.8" />
          </linearGradient>
          <filter id="travelingGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background stroke (subtle) */}
        <path
          d="M91.7,158.3c-7.2,0-13.1-5.9-13.1-13.1v-40.1c0-11.1-9-20.1-20.1-20.1H13.1c-7.2,0-13.1-5.9-13.1-13.1V13.1C0,5.9,5.9,0,13.1,0h137.5c7.2,0,13.1,5.9,13.1,13.1v132.1c0,7.2-5.9,13.1-13.1,13.1h-58.9Z"
          fill="none"
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth={strokeWidth + 1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        
        {/* Traveling head stroke (much thicker and brighter) */}
        <path
          ref={headRef}
          d="M91.7,158.3c-7.2,0-13.1-5.9-13.1-13.1v-40.1c0-11.1-9-20.1-20.1-20.1H13.1c-7.2,0-13.1-5.9-13.1-13.1V13.1C0,5.9,5.9,0,13.1,0h137.5c7.2,0,13.1,5.9,13.1,13.1v132.1c0,7.2-5.9,13.1-13.1,13.1h-58.9Z"
          fill="none"
          stroke="#60a5fa"
          strokeWidth={strokeWidth * 1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#travelingGlow)"
          className={`loading-path ${isVisible ? 'loading-path-visible' : 'loading-path-hidden'}`}
        />
      </svg>
    </div>
  )
}

// Minimal variant for subtle loading
export function MinimalLoadingAnimation({ 
  size = 60, 
  strokeWidth = 3,
  className = ""
}: Omit<LoadingAnimationProps, 'glowIntensity' | 'duration'>) {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!pathRef.current) return

    const path = pathRef.current
    const pathLength: number = path.getTotalLength()
    const pathLengthStr = pathLength.toString()

    // Set initial stroke-dasharray and stroke-dashoffset
    (path as unknown as HTMLElement).style.strokeDasharray = `${pathLengthStr} ${pathLengthStr}`
    (path as unknown as HTMLElement).style.strokeDashoffset = pathLengthStr

    // Create the animation
    const animate = () => {
      (path as unknown as HTMLElement).style.strokeDashoffset = pathLengthStr
      (path as unknown as HTMLElement).style.transition = 'none'
      
      // Trigger reflow
      (path as unknown as HTMLElement).offsetHeight
      
      // Start animation
      (path as unknown as HTMLElement).style.transition = 'stroke-dashoffset 1.5s ease-in-out'
      (path as unknown as HTMLElement).style.strokeDashoffset = '0'
    }

    // Start animation immediately
    animate()

    // Set up interval for continuous animation
    const interval = setInterval(animate, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 163.7 158.3"
        className="opacity-60"
      >
        <path
          ref={pathRef}
          d="M91.7,158.3c-7.2,0-13.1-5.9-13.1-13.1v-40.1c0-11.1-9-20.1-20.1-20.1H13.1c-7.2,0-13.1-5.9-13.1-13.1V13.1C0,5.9,5.9,0,13.1,0h137.5c7.2,0,13.1,5.9,13.1,13.1v132.1c0,7.2-5.9,13.1-13.1,13.1h-58.9Z"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
