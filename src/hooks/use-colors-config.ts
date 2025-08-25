"use client"

import { useState } from 'react'
import {
  colorPalettes,
  semanticColors,
  colorUsage,
  colorPrinciples,
  ColorPalette,
  SemanticColor,
  ColorUsage
} from '@/lib/colors-config'

interface ColorsConfig {
  colorPalettes: ColorPalette[]
  semanticColors: SemanticColor[]
  colorUsage: ColorUsage[]
  colorPrinciples: typeof colorPrinciples
}

interface UseColorsConfigReturn extends ColorsConfig {
  getColorPaletteByName: (name: string) => ColorPalette | undefined
  getColorPaletteByColor: (color: string) => ColorPalette | undefined
  getSemanticColorByName: (name: string) => SemanticColor | undefined
  getSemanticColorByClass: (className: string) => SemanticColor | undefined
  getPrimaryColor: () => ColorPalette | undefined
  getBrandColors: () => ColorPalette[]
  updateColorPalettes: (palettes: ColorPalette[]) => void
  updateSemanticColors: (colors: SemanticColor[]) => void
  resetToDefaults: () => void
}

export function useColorsConfig(): UseColorsConfigReturn {
  const [config, setConfig] = useState<ColorsConfig>({
    colorPalettes,
    semanticColors,
    colorUsage,
    colorPrinciples
  })

  // Update color palettes
  const updateColorPalettes = (palettes: ColorPalette[]) => {
    setConfig(prev => ({
      ...prev,
      colorPalettes: palettes
    }))
  }

  // Update semantic colors
  const updateSemanticColors = (colors: SemanticColor[]) => {
    setConfig(prev => ({
      ...prev,
      semanticColors: colors
    }))
  }

  // Reset to defaults
  const resetToDefaults = () => {
    setConfig({
      colorPalettes,
      semanticColors,
      colorUsage,
      colorPrinciples
    })
  }

  // Local helper functions that use the current state
  const getColorPaletteByNameLocal = (name: string): ColorPalette | undefined => {
    return config.colorPalettes.find(palette => palette.name.toLowerCase() === name.toLowerCase())
  }

  const getColorPaletteByColorLocal = (color: string): ColorPalette | undefined => {
    return config.colorPalettes.find(palette => palette.color === color)
  }

  const getSemanticColorByNameLocal = (name: string): SemanticColor | undefined => {
    return config.semanticColors.find(color => color.name.toLowerCase() === name.toLowerCase())
  }

  const getSemanticColorByClassLocal = (className: string): SemanticColor | undefined => {
    return config.semanticColors.find(color => color.class === className)
  }

  const getPrimaryColorLocal = (): ColorPalette | undefined => {
    return config.colorPalettes.find(palette => palette.isPrimary)
  }

  const getBrandColorsLocal = (): ColorPalette[] => {
    return config.colorPalettes.filter(palette => palette.isBrand)
  }

  return {
    ...config,
    getColorPaletteByName: getColorPaletteByNameLocal,
    getColorPaletteByColor: getColorPaletteByColorLocal,
    getSemanticColorByName: getSemanticColorByNameLocal,
    getSemanticColorByClass: getSemanticColorByClassLocal,
    getPrimaryColor: getPrimaryColorLocal,
    getBrandColors: getBrandColorsLocal,
    updateColorPalettes,
    updateSemanticColors,
    resetToDefaults
  }
}

// Specialized hooks for specific use cases
export function useColorPalette(colorName: string): ColorPalette | undefined {
  const { getColorPaletteByName } = useColorsConfig()
  return getColorPaletteByName(colorName)
}

export function useSemanticColor(className: string): SemanticColor | undefined {
  const { getSemanticColorByClass } = useColorsConfig()
  return getSemanticColorByClass(className)
}

export function usePrimaryColor(): ColorPalette | undefined {
  const { getPrimaryColor } = useColorsConfig()
  return getPrimaryColor()
}

export function useBrandColors(): ColorPalette[] {
  const { getBrandColors } = useColorsConfig()
  return getBrandColors()
}
