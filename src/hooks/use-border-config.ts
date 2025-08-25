"use client"

import { useState } from 'react'
import {
  borderWidths,
  borderStyles,
  borderColors,
  borderRadius,
  borderPrinciples,
  borderFoundation,
  usageGuidelines,
  implementationExamples,
  cssCustomProperties,
  tailwindClasses,
  BorderWidth,
  BorderStyle,
  BorderColor,
  BorderRadius,
  BorderPrinciple
} from '@/lib/border-config'

interface BorderConfig {
  borderWidths: BorderWidth[]
  borderStyles: BorderStyle[]
  borderColors: BorderColor[]
  borderRadius: BorderRadius[]
  borderPrinciples: BorderPrinciple[]
  borderFoundation: typeof borderFoundation
  usageGuidelines: typeof usageGuidelines
  implementationExamples: typeof implementationExamples
  cssCustomProperties: typeof cssCustomProperties
  tailwindClasses: typeof tailwindClasses
}

interface UseBorderConfigReturn extends BorderConfig {
  getBorderWidthByName: (name: string) => BorderWidth | undefined
  getBorderWidthsByCategory: (category: 'none' | 'thin' | 'medium' | 'thick' | 'extra-thick') => BorderWidth[]
  getBorderStyleByName: (name: string) => BorderStyle | undefined
  getBorderStylesByCategory: (category: 'solid' | 'dashed' | 'dotted' | 'double' | 'none') => BorderStyle[]
  getBorderColorByName: (name: string) => BorderColor | undefined
  getBorderColorsByCategory: (category: 'default' | 'input' | 'focus' | 'primary' | 'secondary' | 'destructive' | 'muted') => BorderColor[]
  getBorderRadiusByName: (name: string) => BorderRadius | undefined
  getBorderRadiusByCategory: (category: 'none' | 'small' | 'default' | 'medium' | 'large' | 'xl' | '2xl' | '3xl' | 'full') => BorderRadius[]
  getBorderPrincipleByCategory: (category: 'consistency' | 'clarity' | 'hierarchy') => BorderPrinciple[]
  updateBorderWidths: (widths: BorderWidth[]) => void
  updateBorderStyles: (styles: BorderStyle[]) => void
  updateBorderColors: (colors: BorderColor[]) => void
  updateBorderRadius: (radius: BorderRadius[]) => void
  resetToDefaults: () => void
}

export function useBorderConfig(): UseBorderConfigReturn {
  const [config, setConfig] = useState<BorderConfig>({
    borderWidths,
    borderStyles,
    borderColors,
    borderRadius,
    borderPrinciples,
    borderFoundation,
    usageGuidelines,
    implementationExamples,
    cssCustomProperties,
    tailwindClasses
  })

  // Update border widths
  const updateBorderWidths = (newWidths: BorderWidth[]) => {
    setConfig(prev => ({
      ...prev,
      borderWidths: newWidths
    }))
  }

  // Update border styles
  const updateBorderStyles = (newStyles: BorderStyle[]) => {
    setConfig(prev => ({
      ...prev,
      borderStyles: newStyles
    }))
  }

  // Update border colors
  const updateBorderColors = (newColors: BorderColor[]) => {
    setConfig(prev => ({
      ...prev,
      borderColors: newColors
    }))
  }

  // Update border radius
  const updateBorderRadius = (newRadius: BorderRadius[]) => {
    setConfig(prev => ({
      ...prev,
      borderRadius: newRadius
    }))
  }

  // Reset to defaults
  const resetToDefaults = () => {
    setConfig({
      borderWidths,
      borderStyles,
      borderColors,
      borderRadius,
      borderPrinciples,
      borderFoundation,
      usageGuidelines,
      implementationExamples,
      cssCustomProperties,
      tailwindClasses
    })
  }

  // Local helper functions that use the current state
  const getBorderWidthByNameLocal = (name: string): BorderWidth | undefined => {
    return config.borderWidths.find(width => width.name === name)
  }

  const getBorderWidthsByCategoryLocal = (category: 'none' | 'thin' | 'medium' | 'thick' | 'extra-thick'): BorderWidth[] => {
    return config.borderWidths.filter(width => width.category === category)
  }

  const getBorderStyleByNameLocal = (name: string): BorderStyle | undefined => {
    return config.borderStyles.find(style => style.name === name)
  }

  const getBorderStylesByCategoryLocal = (category: 'solid' | 'dashed' | 'dotted' | 'double' | 'none'): BorderStyle[] => {
    return config.borderStyles.filter(style => style.category === category)
  }

  const getBorderColorByNameLocal = (name: string): BorderColor | undefined => {
    return config.borderColors.find(color => color.name === name)
  }

  const getBorderColorsByCategoryLocal = (category: 'default' | 'input' | 'focus' | 'primary' | 'secondary' | 'destructive' | 'muted'): BorderColor[] => {
    return config.borderColors.filter(color => color.category === category)
  }

  const getBorderRadiusByNameLocal = (name: string): BorderRadius | undefined => {
    return config.borderRadius.find(radius => radius.name === name)
  }

  const getBorderRadiusByCategoryLocal = (category: 'none' | 'small' | 'default' | 'medium' | 'large' | 'xl' | '2xl' | '3xl' | 'full'): BorderRadius[] => {
    return config.borderRadius.filter(radius => radius.category === category)
  }

  const getBorderPrincipleByCategoryLocal = (category: 'consistency' | 'clarity' | 'hierarchy'): BorderPrinciple[] => {
    return config.borderPrinciples.filter(principle => principle.category === category)
  }

  return {
    ...config,
    getBorderWidthByName: getBorderWidthByNameLocal,
    getBorderWidthsByCategory: getBorderWidthsByCategoryLocal,
    getBorderStyleByName: getBorderStyleByNameLocal,
    getBorderStylesByCategory: getBorderStylesByCategoryLocal,
    getBorderColorByName: getBorderColorByNameLocal,
    getBorderColorsByCategory: getBorderColorsByCategoryLocal,
    getBorderRadiusByName: getBorderRadiusByNameLocal,
    getBorderRadiusByCategory: getBorderRadiusByCategoryLocal,
    getBorderPrincipleByCategory: getBorderPrincipleByCategoryLocal,
    updateBorderWidths,
    updateBorderStyles,
    updateBorderColors,
    updateBorderRadius,
    resetToDefaults
  }
}

// Specialized hooks for specific use cases
export function useBorderWidth(name: string): BorderWidth | undefined {
  const { getBorderWidthByName } = useBorderConfig()
  return getBorderWidthByName(name)
}

export function useBorderWidths(category: 'none' | 'thin' | 'medium' | 'thick' | 'extra-thick'): BorderWidth[] {
  const { getBorderWidthsByCategory } = useBorderConfig()
  return getBorderWidthsByCategory(category)
}

export function useBorderStyle(name: string): BorderStyle | undefined {
  const { getBorderStyleByName } = useBorderConfig()
  return getBorderStyleByName(name)
}

export function useBorderStyles(category: 'solid' | 'dashed' | 'dotted' | 'double' | 'none'): BorderStyle[] {
  const { getBorderStylesByCategory } = useBorderConfig()
  return getBorderStylesByCategory(category)
}

export function useBorderColor(name: string): BorderColor | undefined {
  const { getBorderColorByName } = useBorderConfig()
  return getBorderColorByName(name)
}

export function useBorderColors(category: 'default' | 'input' | 'focus' | 'primary' | 'secondary' | 'destructive' | 'muted'): BorderColor[] {
  const { getBorderColorsByCategory } = useBorderConfig()
  return getBorderColorsByCategory(category)
}

export function useBorderRadius(name: string): BorderRadius | undefined {
  const { getBorderRadiusByName } = useBorderConfig()
  return getBorderRadiusByName(name)
}

export function useBorderRadiusByCategory(category: 'none' | 'small' | 'default' | 'medium' | 'large' | 'xl' | '2xl' | '3xl' | 'full'): BorderRadius[] {
  const { getBorderRadiusByCategory } = useBorderConfig()
  return getBorderRadiusByCategory(category)
}

export function useBorderPrinciples(category: 'consistency' | 'clarity' | 'hierarchy'): BorderPrinciple[] {
  const { getBorderPrincipleByCategory } = useBorderConfig()
  return getBorderPrincipleByCategory(category)
}
