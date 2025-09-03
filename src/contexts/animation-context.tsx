"use client"

import React, { createContext, useContext, useRef, useEffect, useState, ReactNode } from 'react'

/**
 * Animation Context
 * 
 * This context manages the global state for the Perlin plasma animation.
 * It preloads the animation classes and state once, then shares them across
 * all AnimatedFavicon components to avoid reloading when navigating between pages.
 */

interface AnimationState {
  perlin: any
  prng: any
  colorIndex: number
  colorTransition: number
  currentR: number
  currentG: number
  currentB: number
  startTime: number
  brandColors: Array<{ name: string; hex: string; rgb: { r: number; g: number; b: number } }>
}

interface AnimationContextType {
  isAnimationInitialized: boolean
  animationState: AnimationState | null
  initializeAnimation: (state: AnimationState) => void
}

const AnimationContext = createContext<AnimationContextType | null>(null)

export function useAnimationContext() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimationContext must be used within an AnimationProvider')
  }
  return context
}

interface AnimationProviderProps {
  children: ReactNode
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [isAnimationInitialized, setIsAnimationInitialized] = useState(false)
  const [animationState, setAnimationState] = useState<AnimationState | null>(null)

  const initializeAnimation = (state: AnimationState) => {
    setAnimationState(state)
    setIsAnimationInitialized(true)
  }

  return (
    <AnimationContext.Provider
      value={{
        isAnimationInitialized,
        animationState,
        initializeAnimation,
      }}
    >
      {children}
    </AnimationContext.Provider>
  )
}
