"use client"

import { useState } from 'react'
import {
  shadowScale,
  elevationLevels,
  componentExamples,
  usageGuidelines,
  shadowFoundation,
  cssCustomProperties,
  tailwindClasses,
  accessibilityConsiderations,
  implementationExamples,
  ShadowItem,
  ElevationLevel,
  ComponentExample,
  UsageGuideline
} from '@/lib/shadows-elevation-config'

interface ShadowsElevationConfig {
  shadowScale: ShadowItem[]
  elevationLevels: ElevationLevel[]
  componentExamples: ComponentExample[]
  usageGuidelines: UsageGuideline[]
  shadowFoundation: typeof shadowFoundation
  cssCustomProperties: typeof cssCustomProperties
  tailwindClasses: typeof tailwindClasses
  accessibilityConsiderations: typeof accessibilityConsiderations
  implementationExamples: typeof implementationExamples
}

interface UseShadowsElevationConfigReturn extends ShadowsElevationConfig {
  getShadowByName: (name: string) => ShadowItem | undefined
  getShadowByValue: (value: string) => ShadowItem | undefined
  getShadowByCategory: (category: 'subtle' | 'standard' | 'prominent' | 'maximum') => ShadowItem[]
  getElevationLevelByLevel: (level: number) => ElevationLevel | undefined
  getElevationLevelByName: (name: string) => ElevationLevel | undefined
  getComponentExampleByName: (name: string) => ComponentExample | undefined
  getComponentExamplesByCategory: (category: 'ui' | 'content' | 'overlay') => ComponentExample[]
  getUsageGuidelinesByCategory: (category: 'do' | 'dont') => UsageGuideline[]
  updateShadowScale: (scale: ShadowItem[]) => void
  updateElevationLevels: (levels: ElevationLevel[]) => void
  resetToDefaults: () => void
}

export function useShadowsElevationConfig(): UseShadowsElevationConfigReturn {
  const [config, setConfig] = useState<ShadowsElevationConfig>({
    shadowScale,
    elevationLevels,
    componentExamples,
    usageGuidelines,
    shadowFoundation,
    cssCustomProperties,
    tailwindClasses,
    accessibilityConsiderations,
    implementationExamples
  })

  // Update shadow scale
  const updateShadowScale = (scale: ShadowItem[]) => {
    setConfig(prev => ({
      ...prev,
      shadowScale: scale
    }))
  }

  // Update elevation levels
  const updateElevationLevels = (levels: ElevationLevel[]) => {
    setConfig(prev => ({
      ...prev,
      elevationLevels: levels
    }))
  }

  // Reset to defaults
  const resetToDefaults = () => {
    setConfig({
      shadowScale,
      elevationLevels,
      componentExamples,
      usageGuidelines,
      shadowFoundation,
      cssCustomProperties,
      tailwindClasses,
      accessibilityConsiderations,
      implementationExamples
    })
  }

  // Local helper functions that use the current state
  const getShadowByNameLocal = (name: string): ShadowItem | undefined => {
    return config.shadowScale.find(shadow => shadow.name === name)
  }

  const getShadowByValueLocal = (value: string): ShadowItem | undefined => {
    return config.shadowScale.find(shadow => shadow.value === value)
  }

  const getShadowByCategoryLocal = (category: 'subtle' | 'standard' | 'prominent' | 'maximum'): ShadowItem[] => {
    return config.shadowScale.filter(shadow => shadow.category === category)
  }

  const getElevationLevelByLevelLocal = (level: number): ElevationLevel | undefined => {
    return config.elevationLevels.find(elevation => elevation.level === level)
  }

  const getElevationLevelByNameLocal = (name: string): ElevationLevel | undefined => {
    return config.elevationLevels.find(elevation => elevation.name === name)
  }

  const getComponentExampleByNameLocal = (name: string): ComponentExample | undefined => {
    return config.componentExamples.find(example => example.name === name)
  }

  const getComponentExamplesByCategoryLocal = (category: 'ui' | 'content' | 'overlay'): ComponentExample[] => {
    return config.componentExamples.filter(example => example.category === category)
  }

  const getUsageGuidelinesByCategoryLocal = (category: 'do' | 'dont'): UsageGuideline[] => {
    return config.usageGuidelines.filter(guideline => guideline.category === category)
  }

  return {
    ...config,
    getShadowByName: getShadowByNameLocal,
    getShadowByValue: getShadowByValueLocal,
    getShadowByCategory: getShadowByCategoryLocal,
    getElevationLevelByLevel: getElevationLevelByLevelLocal,
    getElevationLevelByName: getElevationLevelByNameLocal,
    getComponentExampleByName: getComponentExampleByNameLocal,
    getComponentExamplesByCategory: getComponentExamplesByCategoryLocal,
    getUsageGuidelinesByCategory: getUsageGuidelinesByCategoryLocal,
    updateShadowScale,
    updateElevationLevels,
    resetToDefaults
  }
}

// Specialized hooks for specific use cases
export function useShadowItem(name: string): ShadowItem | undefined {
  const { getShadowByName } = useShadowsElevationConfig()
  return getShadowByName(name)
}

export function useShadowByCategory(category: 'subtle' | 'standard' | 'prominent' | 'maximum'): ShadowItem[] {
  const { getShadowByCategory } = useShadowsElevationConfig()
  return getShadowByCategory(category)
}

export function useElevationLevel(level: number): ElevationLevel | undefined {
  const { getElevationLevelByLevel } = useShadowsElevationConfig()
  return getElevationLevelByLevel(level)
}

export function useComponentExample(name: string): ComponentExample | undefined {
  const { getComponentExampleByName } = useShadowsElevationConfig()
  return getComponentExampleByName(name)
}

export function useComponentExamples(category: 'ui' | 'content' | 'overlay'): ComponentExample[] {
  const { getComponentExamplesByCategory } = useShadowsElevationConfig()
  return getComponentExamplesByCategory(category)
}

export function useUsageGuidelines(category: 'do' | 'dont'): UsageGuideline[] {
  const { getUsageGuidelinesByCategory } = useShadowsElevationConfig()
  return getUsageGuidelinesByCategory(category)
}
