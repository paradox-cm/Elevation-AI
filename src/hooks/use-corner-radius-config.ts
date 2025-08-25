"use client"

import { useState } from 'react'
import {
  radiusScale,
  componentExamples,
  usageGuidelines,
  radiusFoundation,
  cssCustomProperties,
  tailwindClasses,
  accessibilityConsiderations,
  implementationExamples,
  customizationExamples,
  RadiusItem,
  ComponentExample,
  UsageGuideline
} from '@/lib/corner-radius-config'

interface CornerRadiusConfig {
  radiusScale: RadiusItem[]
  componentExamples: ComponentExample[]
  usageGuidelines: UsageGuideline[]
  radiusFoundation: typeof radiusFoundation
  cssCustomProperties: typeof cssCustomProperties
  tailwindClasses: typeof tailwindClasses
  accessibilityConsiderations: typeof accessibilityConsiderations
  implementationExamples: typeof implementationExamples
  customizationExamples: typeof customizationExamples
}

interface UseCornerRadiusConfigReturn extends CornerRadiusConfig {
  getRadiusByName: (name: string) => RadiusItem | undefined
  getRadiusByValue: (value: string) => RadiusItem | undefined
  getRadiusByCategory: (category: 'sharp' | 'subtle' | 'standard' | 'prominent' | 'circular') => RadiusItem[]
  getComponentExampleByName: (name: string) => ComponentExample | undefined
  getComponentExamplesByCategory: (category: 'ui' | 'content' | 'media' | 'form') => ComponentExample[]
  getUsageGuidelinesByCategory: (category: 'do' | 'dont') => UsageGuideline[]
  updateRadiusScale: (scale: RadiusItem[]) => void
  resetToDefaults: () => void
}

export function useCornerRadiusConfig(): UseCornerRadiusConfigReturn {
  const [config, setConfig] = useState<CornerRadiusConfig>({
    radiusScale,
    componentExamples,
    usageGuidelines,
    radiusFoundation,
    cssCustomProperties,
    tailwindClasses,
    accessibilityConsiderations,
    implementationExamples,
    customizationExamples
  })

  // Update radius scale
  const updateRadiusScale = (scale: RadiusItem[]) => {
    setConfig(prev => ({
      ...prev,
      radiusScale: scale
    }))
  }

  // Reset to defaults
  const resetToDefaults = () => {
    setConfig({
      radiusScale,
      componentExamples,
      usageGuidelines,
      radiusFoundation,
      cssCustomProperties,
      tailwindClasses,
      accessibilityConsiderations,
      implementationExamples,
      customizationExamples
    })
  }

  // Local helper functions that use the current state
  const getRadiusByNameLocal = (name: string): RadiusItem | undefined => {
    return config.radiusScale.find(radius => radius.name === name)
  }

  const getRadiusByValueLocal = (value: string): RadiusItem | undefined => {
    return config.radiusScale.find(radius => radius.value === value)
  }

  const getRadiusByCategoryLocal = (category: 'sharp' | 'subtle' | 'standard' | 'prominent' | 'circular'): RadiusItem[] => {
    return config.radiusScale.filter(radius => radius.category === category)
  }

  const getComponentExampleByNameLocal = (name: string): ComponentExample | undefined => {
    return config.componentExamples.find(example => example.name === name)
  }

  const getComponentExamplesByCategoryLocal = (category: 'ui' | 'content' | 'media' | 'form'): ComponentExample[] => {
    return config.componentExamples.filter(example => example.category === category)
  }

  const getUsageGuidelinesByCategoryLocal = (category: 'do' | 'dont'): UsageGuideline[] => {
    return config.usageGuidelines.filter(guideline => guideline.category === category)
  }

  return {
    ...config,
    getRadiusByName: getRadiusByNameLocal,
    getRadiusByValue: getRadiusByValueLocal,
    getRadiusByCategory: getRadiusByCategoryLocal,
    getComponentExampleByName: getComponentExampleByNameLocal,
    getComponentExamplesByCategory: getComponentExamplesByCategoryLocal,
    getUsageGuidelinesByCategory: getUsageGuidelinesByCategoryLocal,
    updateRadiusScale,
    resetToDefaults
  }
}

// Specialized hooks for specific use cases
export function useRadiusItem(name: string): RadiusItem | undefined {
  const { getRadiusByName } = useCornerRadiusConfig()
  return getRadiusByName(name)
}

export function useRadiusByCategory(category: 'sharp' | 'subtle' | 'standard' | 'prominent' | 'circular'): RadiusItem[] {
  const { getRadiusByCategory } = useCornerRadiusConfig()
  return getRadiusByCategory(category)
}

export function useComponentExample(name: string): ComponentExample | undefined {
  const { getComponentExampleByName } = useCornerRadiusConfig()
  return getComponentExampleByName(name)
}

export function useComponentExamples(category: 'ui' | 'content' | 'media' | 'form'): ComponentExample[] {
  const { getComponentExamplesByCategory } = useCornerRadiusConfig()
  return getComponentExamplesByCategory(category)
}

export function useUsageGuidelines(category: 'do' | 'dont'): UsageGuideline[] {
  const { getUsageGuidelinesByCategory } = useCornerRadiusConfig()
  return getUsageGuidelinesByCategory(category)
}
