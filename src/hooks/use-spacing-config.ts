"use client"

import { useState } from 'react'
import {
  spacingScale,
  containerSizes,
  spacingExamples,
  spacingRules,
  spacingFoundation,
  spacingCategories,
  implementationDetails,
  SpacingItem,
  ContainerSize,
  SpacingExample,
  SpacingRule
} from '@/lib/spacing-config'

interface SpacingConfig {
  spacingScale: SpacingItem[]
  containerSizes: ContainerSize[]
  spacingExamples: SpacingExample[]
  spacingRules: SpacingRule[]
  spacingFoundation: typeof spacingFoundation
  spacingCategories: typeof spacingCategories
  implementationDetails: typeof implementationDetails
}

interface UseSpacingConfigReturn extends SpacingConfig {
  getSpacingByName: (name: string) => SpacingItem | undefined
  getSpacingByValue: (value: number) => SpacingItem | undefined
  getSpacingByCategory: (category: 'component' | 'layout' | 'page') => SpacingItem[]
  getContainerSizeByName: (name: string) => ContainerSize | undefined
  getContainerSizeByValue: (value: number) => ContainerSize | undefined
  getSpacingExamplesByCategory: (category: string) => SpacingExample | undefined
  getSpacingRulesByCategory: (category: 'do' | 'dont') => SpacingRule[]
  updateSpacingScale: (scale: SpacingItem[]) => void
  updateContainerSizes: (sizes: ContainerSize[]) => void
  resetToDefaults: () => void
}

export function useSpacingConfig(): UseSpacingConfigReturn {
  const [config, setConfig] = useState<SpacingConfig>({
    spacingScale,
    containerSizes,
    spacingExamples,
    spacingRules,
    spacingFoundation,
    spacingCategories,
    implementationDetails
  })

  // Update spacing scale
  const updateSpacingScale = (scale: SpacingItem[]) => {
    setConfig(prev => ({
      ...prev,
      spacingScale: scale
    }))
  }

  // Update container sizes
  const updateContainerSizes = (sizes: ContainerSize[]) => {
    setConfig(prev => ({
      ...prev,
      containerSizes: sizes
    }))
  }

  // Reset to defaults
  const resetToDefaults = () => {
    setConfig({
      spacingScale,
      containerSizes,
      spacingExamples,
      spacingRules,
      spacingFoundation,
      spacingCategories,
      implementationDetails
    })
  }

  // Local helper functions that use the current state
  const getSpacingByNameLocal = (name: string): SpacingItem | undefined => {
    return config.spacingScale.find(spacing => spacing.name === name)
  }

  const getSpacingByValueLocal = (value: number): SpacingItem | undefined => {
    return config.spacingScale.find(spacing => spacing.value === value)
  }

  const getSpacingByCategoryLocal = (category: 'component' | 'layout' | 'page'): SpacingItem[] => {
    return config.spacingScale.filter(spacing => spacing.category === category)
  }

  const getContainerSizeByNameLocal = (name: string): ContainerSize | undefined => {
    return config.containerSizes.find(container => container.name === name)
  }

  const getContainerSizeByValueLocal = (value: number): ContainerSize | undefined => {
    return config.containerSizes.find(container => container.value === value)
  }

  const getSpacingExamplesByCategoryLocal = (category: string): SpacingExample | undefined => {
    return config.spacingExamples.find(example => 
      example.title.toLowerCase().includes(category.toLowerCase())
    )
  }

  const getSpacingRulesByCategoryLocal = (category: 'do' | 'dont'): SpacingRule[] => {
    return config.spacingRules.filter(rule => rule.category === category)
  }

  return {
    ...config,
    getSpacingByName: getSpacingByNameLocal,
    getSpacingByValue: getSpacingByValueLocal,
    getSpacingByCategory: getSpacingByCategoryLocal,
    getContainerSizeByName: getContainerSizeByNameLocal,
    getContainerSizeByValue: getContainerSizeByValueLocal,
    getSpacingExamplesByCategory: getSpacingExamplesByCategoryLocal,
    getSpacingRulesByCategory: getSpacingRulesByCategoryLocal,
    updateSpacingScale,
    updateContainerSizes,
    resetToDefaults
  }
}

// Specialized hooks for specific use cases
export function useSpacingItem(name: string): SpacingItem | undefined {
  const { getSpacingByName } = useSpacingConfig()
  return getSpacingByName(name)
}

export function useSpacingByCategory(category: 'component' | 'layout' | 'page'): SpacingItem[] {
  const { getSpacingByCategory } = useSpacingConfig()
  return getSpacingByCategory(category)
}

export function useContainerSize(name: string): ContainerSize | undefined {
  const { getContainerSizeByName } = useSpacingConfig()
  return getContainerSizeByName(name)
}

export function useSpacingExamples(category: string): SpacingExample | undefined {
  const { getSpacingExamplesByCategory } = useSpacingConfig()
  return getSpacingExamplesByCategory(category)
}

export function useSpacingRules(category: 'do' | 'dont'): SpacingRule[] {
  const { getSpacingRulesByCategory } = useSpacingConfig()
  return getSpacingRulesByCategory(category)
}
