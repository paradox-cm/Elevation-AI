"use client"

import { useState, useEffect } from 'react'
import { 
  typeScale, 
  fontWeights, 
  fontFamilies, 
  typographyPrinciples, 
  fontSpecifications, 
  usageGuidelines,
  TypeScaleItem,
  FontWeight,
  FontFamily,
  getTypeScaleByComponent,
  getTypeScaleByClass,
  getFontWeightByClass,
  getFontFamilyByClass
} from '@/lib/typography-config'

interface TypographyConfig {
  typeScale: TypeScaleItem[]
  fontWeights: FontWeight[]
  fontFamilies: FontFamily[]
  typographyPrinciples: typeof typographyPrinciples
  fontSpecifications: typeof fontSpecifications
  usageGuidelines: typeof usageGuidelines
}

interface UseTypographyConfigReturn extends TypographyConfig {
  // Helper methods
  getTypeScaleByComponent: (componentName: string) => TypeScaleItem | undefined
  getTypeScaleByClass: (className: string) => TypeScaleItem | undefined
  getFontWeightByClass: (className: string) => FontWeight | undefined
  getFontFamilyByClass: (className: string) => FontFamily | undefined
  
  // Update methods
  updateTypeScale: (newTypeScale: TypeScaleItem[]) => void
  updateFontWeights: (newFontWeights: FontWeight[]) => void
  updateFontFamilies: (newFontFamilies: FontFamily[]) => void
  
  // Reset method
  resetToDefaults: () => void
}

export function useTypographyConfig(): UseTypographyConfigReturn {
  const [config, setConfig] = useState<TypographyConfig>({
    typeScale,
    fontWeights,
    fontFamilies,
    typographyPrinciples,
    fontSpecifications,
    usageGuidelines
  })

  // Update type scale
  const updateTypeScale = (newTypeScale: TypeScaleItem[]) => {
    setConfig(prev => ({
      ...prev,
      typeScale: newTypeScale
    }))
  }

  // Update font weights
  const updateFontWeights = (newFontWeights: FontWeight[]) => {
    setConfig(prev => ({
      ...prev,
      fontWeights: newFontWeights
    }))
  }

  // Update font families
  const updateFontFamilies = (newFontFamilies: FontFamily[]) => {
    setConfig(prev => ({
      ...prev,
      fontFamilies: newFontFamilies
    }))
  }

  // Reset to defaults
  const resetToDefaults = () => {
    setConfig({
      typeScale,
      fontWeights,
      fontFamilies,
      typographyPrinciples,
      fontSpecifications,
      usageGuidelines
    })
  }

  // Helper methods that work with current config
  const getTypeScaleByComponentLocal = (componentName: string): TypeScaleItem | undefined => {
    return config.typeScale.find(item => item.component === componentName)
  }

  const getTypeScaleByClassLocal = (className: string): TypeScaleItem | undefined => {
    return config.typeScale.find(item => item.class === className)
  }

  const getFontWeightByClassLocal = (className: string): FontWeight | undefined => {
    return config.fontWeights.find(weight => weight.class === className)
  }

  const getFontFamilyByClassLocal = (className: string): FontFamily | undefined => {
    return config.fontFamilies.find(font => font.class === className)
  }

  return {
    ...config,
    getTypeScaleByComponent: getTypeScaleByComponentLocal,
    getTypeScaleByClass: getTypeScaleByClassLocal,
    getFontWeightByClass: getFontWeightByClassLocal,
    getFontFamilyByClass: getFontFamilyByClassLocal,
    updateTypeScale,
    updateFontWeights,
    updateFontFamilies,
    resetToDefaults
  }
}

// Hook for getting a specific type scale item
export function useTypeScaleItem(componentName: string): TypeScaleItem | undefined {
  const { getTypeScaleByComponent } = useTypographyConfig()
  return getTypeScaleByComponent(componentName)
}

// Hook for getting font classes for a component
export function useTypographyClasses(componentName: string): string {
  const typeScaleItem = useTypeScaleItem(componentName)
  
  if (!typeScaleItem) {
    console.warn(`Typography component ${componentName} not found in type scale configuration`)
    return ""
  }
  
  return `${typeScaleItem.class} ${typeScaleItem.weight} ${typeScaleItem.lineHeight} ${typeScaleItem.tracking}`
}
