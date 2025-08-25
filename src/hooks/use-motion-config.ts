"use client"

import { useState } from 'react'
import {
  easingCurves,
  durationScale,
  animationPrinciples,
  microInteractions,
  animationTypes,
  motionFoundation,
  cssCustomProperties,
  tailwindClasses,
  accessibilityConsiderations,
  implementationExamples,
  usageGuidelines,
  EasingCurve,
  DurationScale,
  AnimationPrinciple,
  MicroInteraction,
  AnimationType
} from '@/lib/motion-config'

interface MotionConfig {
  easingCurves: EasingCurve[]
  durationScale: DurationScale[]
  animationPrinciples: AnimationPrinciple[]
  microInteractions: MicroInteraction[]
  animationTypes: AnimationType[]
  motionFoundation: typeof motionFoundation
  cssCustomProperties: typeof cssCustomProperties
  tailwindClasses: typeof tailwindClasses
  accessibilityConsiderations: typeof accessibilityConsiderations
  implementationExamples: typeof implementationExamples
  usageGuidelines: typeof usageGuidelines
}

interface UseMotionConfigReturn extends MotionConfig {
  getEasingByName: (name: string) => EasingCurve | undefined
  getEasingByValue: (value: string) => EasingCurve | undefined
  getEasingByCategory: (category: 'linear' | 'ease' | 'custom') => EasingCurve[]
  getDurationByName: (name: string) => DurationScale | undefined
  getDurationByClass: (className: string) => DurationScale | undefined
  getDurationByCategory: (category: 'instant' | 'fast' | 'normal' | 'slow' | 'very-slow') => DurationScale[]
  getMicroInteractionByName: (name: string) => MicroInteraction | undefined
  getMicroInteractionsByCategory: (category: 'feedback' | 'navigation' | 'loading' | 'state') => MicroInteraction[]
  getAnimationTypeByName: (name: string) => AnimationType | undefined
  getAnimationTypesByCategory: (category: 'appearance' | 'movement' | 'transformation' | 'rotation') => AnimationType[]
  getAnimationPrincipleByCategory: (category: 'purpose' | 'style' | 'accessibility') => AnimationPrinciple[]
  updateEasingCurves: (curves: EasingCurve[]) => void
  updateDurationScale: (scale: DurationScale[]) => void
  resetToDefaults: () => void
}

export function useMotionConfig(): UseMotionConfigReturn {
  const [config, setConfig] = useState<MotionConfig>({
    easingCurves,
    durationScale,
    animationPrinciples,
    microInteractions,
    animationTypes,
    motionFoundation,
    cssCustomProperties,
    tailwindClasses,
    accessibilityConsiderations,
    implementationExamples,
    usageGuidelines
  })

  // Update easing curves
  const updateEasingCurves = (curves: EasingCurve[]) => {
    setConfig(prev => ({
      ...prev,
      easingCurves: curves
    }))
  }

  // Update duration scale
  const updateDurationScale = (scale: DurationScale[]) => {
    setConfig(prev => ({
      ...prev,
      durationScale: scale
    }))
  }

  // Reset to defaults
  const resetToDefaults = () => {
    setConfig({
      easingCurves,
      durationScale,
      animationPrinciples,
      microInteractions,
      animationTypes,
      motionFoundation,
      cssCustomProperties,
      tailwindClasses,
      accessibilityConsiderations,
      implementationExamples,
      usageGuidelines
    })
  }

  // Local helper functions that use the current state
  const getEasingByNameLocal = (name: string): EasingCurve | undefined => {
    return config.easingCurves.find(easing => easing.name === name)
  }

  const getEasingByValueLocal = (value: string): EasingCurve | undefined => {
    return config.easingCurves.find(easing => easing.value === value)
  }

  const getEasingByCategoryLocal = (category: 'linear' | 'ease' | 'custom'): EasingCurve[] => {
    return config.easingCurves.filter(easing => easing.category === category)
  }

  const getDurationByNameLocal = (name: string): DurationScale | undefined => {
    return config.durationScale.find(duration => duration.name === name)
  }

  const getDurationByClassLocal = (className: string): DurationScale | undefined => {
    return config.durationScale.find(duration => duration.class === className)
  }

  const getDurationByCategoryLocal = (category: 'instant' | 'fast' | 'normal' | 'slow' | 'very-slow'): DurationScale[] => {
    return config.durationScale.filter(duration => duration.category === category)
  }

  const getMicroInteractionByNameLocal = (name: string): MicroInteraction | undefined => {
    return config.microInteractions.find(interaction => interaction.name === name)
  }

  const getMicroInteractionsByCategoryLocal = (category: 'feedback' | 'navigation' | 'loading' | 'state'): MicroInteraction[] => {
    return config.microInteractions.filter(interaction => interaction.category === category)
  }

  const getAnimationTypeByNameLocal = (name: string): AnimationType | undefined => {
    return config.animationTypes.find(type => type.name === name)
  }

  const getAnimationTypesByCategoryLocal = (category: 'appearance' | 'movement' | 'transformation' | 'rotation'): AnimationType[] => {
    return config.animationTypes.filter(type => type.category === category)
  }

  const getAnimationPrincipleByCategoryLocal = (category: 'purpose' | 'style' | 'accessibility'): AnimationPrinciple[] => {
    return config.animationPrinciples.filter(principle => principle.category === category)
  }

  return {
    ...config,
    getEasingByName: getEasingByNameLocal,
    getEasingByValue: getEasingByValueLocal,
    getEasingByCategory: getEasingByCategoryLocal,
    getDurationByName: getDurationByNameLocal,
    getDurationByClass: getDurationByClassLocal,
    getDurationByCategory: getDurationByCategoryLocal,
    getMicroInteractionByName: getMicroInteractionByNameLocal,
    getMicroInteractionsByCategory: getMicroInteractionsByCategoryLocal,
    getAnimationTypeByName: getAnimationTypeByNameLocal,
    getAnimationTypesByCategory: getAnimationTypesByCategoryLocal,
    getAnimationPrincipleByCategory: getAnimationPrincipleByCategoryLocal,
    updateEasingCurves,
    updateDurationScale,
    resetToDefaults
  }
}

// Specialized hooks for specific use cases
export function useEasingCurve(name: string): EasingCurve | undefined {
  const { getEasingByName } = useMotionConfig()
  return getEasingByName(name)
}

export function useEasingByCategory(category: 'linear' | 'ease' | 'custom'): EasingCurve[] {
  const { getEasingByCategory } = useMotionConfig()
  return getEasingByCategory(category)
}

export function useDurationScale(name: string): DurationScale | undefined {
  const { getDurationByName } = useMotionConfig()
  return getDurationByName(name)
}

export function useDurationByCategory(category: 'instant' | 'fast' | 'normal' | 'slow' | 'very-slow'): DurationScale[] {
  const { getDurationByCategory } = useMotionConfig()
  return getDurationByCategory(category)
}

export function useMicroInteraction(name: string): MicroInteraction | undefined {
  const { getMicroInteractionByName } = useMotionConfig()
  return getMicroInteractionByName(name)
}

export function useMicroInteractions(category: 'feedback' | 'navigation' | 'loading' | 'state'): MicroInteraction[] {
  const { getMicroInteractionsByCategory } = useMotionConfig()
  return getMicroInteractionsByCategory(category)
}

export function useAnimationType(name: string): AnimationType | undefined {
  const { getAnimationTypeByName } = useMotionConfig()
  return getAnimationTypeByName(name)
}

export function useAnimationTypes(category: 'appearance' | 'movement' | 'transformation' | 'rotation'): AnimationType[] {
  const { getAnimationTypesByCategory } = useMotionConfig()
  return getAnimationTypesByCategory(category)
}

export function useAnimationPrinciples(category: 'purpose' | 'style' | 'accessibility'): AnimationPrinciple[] {
  const { getAnimationPrincipleByCategory } = useMotionConfig()
  return getAnimationPrincipleByCategory(category)
}
