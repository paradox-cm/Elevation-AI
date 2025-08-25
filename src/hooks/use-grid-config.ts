"use client"

import { useState } from 'react'
import {
  breakpoints,
  gridPrinciples,
  gridLayouts,
  gridSpecifications,
  gridFoundation,
  cssCustomProperties,
  tailwindClasses,
  usageGuidelines,
  implementationExamples,
  Breakpoint,
  GridPrinciple,
  GridLayout,
  GridSpecification
} from '@/lib/grid-config'

interface GridConfig {
  breakpoints: Breakpoint[]
  gridPrinciples: GridPrinciple[]
  gridLayouts: GridLayout[]
  gridSpecifications: GridSpecification[]
  gridFoundation: typeof gridFoundation
  cssCustomProperties: typeof cssCustomProperties
  tailwindClasses: typeof tailwindClasses
  usageGuidelines: typeof usageGuidelines
  implementationExamples: typeof implementationExamples
}

interface UseGridConfigReturn extends GridConfig {
  getBreakpointById: (id: string) => Breakpoint | undefined
  getBreakpointByCategory: (category: 'mobile' | 'tablet' | 'desktop' | 'wide') => Breakpoint[]
  getBreakpointByWidth: (width: number) => Breakpoint | undefined
  getGridPrincipleByCategory: (category: 'responsive' | 'consistency' | 'flexibility') => GridPrinciple[]
  getGridLayoutByName: (name: string) => GridLayout | undefined
  getGridLayoutsByCategory: (category: 'content' | 'cards' | 'form' | 'dashboard') => GridLayout[]
  getGridSpecificationByName: (name: string) => GridSpecification | undefined
  getGridSpecificationsByCategory: (category: 'spacing' | 'breakpoint' | 'container') => GridSpecification[]
  updateBreakpoints: (breakpoints: Breakpoint[]) => void
  updateGridLayouts: (layouts: GridLayout[]) => void
  resetToDefaults: () => void
}

export function useGridConfig(): UseGridConfigReturn {
  const [config, setConfig] = useState<GridConfig>({
    breakpoints,
    gridPrinciples,
    gridLayouts,
    gridSpecifications,
    gridFoundation,
    cssCustomProperties,
    tailwindClasses,
    usageGuidelines,
    implementationExamples
  })

  // Update breakpoints
  const updateBreakpoints = (newBreakpoints: Breakpoint[]) => {
    setConfig(prev => ({
      ...prev,
      breakpoints: newBreakpoints
    }))
  }

  // Update grid layouts
  const updateGridLayouts = (newLayouts: GridLayout[]) => {
    setConfig(prev => ({
      ...prev,
      gridLayouts: newLayouts
    }))
  }

  // Reset to defaults
  const resetToDefaults = () => {
    setConfig({
      breakpoints,
      gridPrinciples,
      gridLayouts,
      gridSpecifications,
      gridFoundation,
      cssCustomProperties,
      tailwindClasses,
      usageGuidelines,
      implementationExamples
    })
  }

  // Local helper functions that use the current state
  const getBreakpointByIdLocal = (id: string): Breakpoint | undefined => {
    return config.breakpoints.find(breakpoint => breakpoint.id === id)
  }

  const getBreakpointByCategoryLocal = (category: 'mobile' | 'tablet' | 'desktop' | 'wide'): Breakpoint[] => {
    return config.breakpoints.filter(breakpoint => breakpoint.category === category)
  }

  const getBreakpointByWidthLocal = (width: number): Breakpoint | undefined => {
    return config.breakpoints.find(breakpoint => 
      width >= breakpoint.minWidth && (!breakpoint.maxWidth || width <= breakpoint.maxWidth)
    )
  }

  const getGridPrincipleByCategoryLocal = (category: 'responsive' | 'consistency' | 'flexibility'): GridPrinciple[] => {
    return config.gridPrinciples.filter(principle => principle.category === category)
  }

  const getGridLayoutByNameLocal = (name: string): GridLayout | undefined => {
    return config.gridLayouts.find(layout => layout.name === name)
  }

  const getGridLayoutsByCategoryLocal = (category: 'content' | 'cards' | 'form' | 'dashboard'): GridLayout[] => {
    return config.gridLayouts.filter(layout => layout.category === category)
  }

  const getGridSpecificationByNameLocal = (name: string): GridSpecification | undefined => {
    return config.gridSpecifications.find(spec => spec.name === name)
  }

  const getGridSpecificationsByCategoryLocal = (category: 'spacing' | 'breakpoint' | 'container'): GridSpecification[] => {
    return config.gridSpecifications.filter(spec => spec.category === category)
  }

  return {
    ...config,
    getBreakpointById: getBreakpointByIdLocal,
    getBreakpointByCategory: getBreakpointByCategoryLocal,
    getBreakpointByWidth: getBreakpointByWidthLocal,
    getGridPrincipleByCategory: getGridPrincipleByCategoryLocal,
    getGridLayoutByName: getGridLayoutByNameLocal,
    getGridLayoutsByCategory: getGridLayoutsByCategoryLocal,
    getGridSpecificationByName: getGridSpecificationByNameLocal,
    getGridSpecificationsByCategory: getGridSpecificationsByCategoryLocal,
    updateBreakpoints,
    updateGridLayouts,
    resetToDefaults
  }
}

// Specialized hooks for specific use cases
export function useBreakpoint(id: string): Breakpoint | undefined {
  const { getBreakpointById } = useGridConfig()
  return getBreakpointById(id)
}

export function useBreakpointsByCategory(category: 'mobile' | 'tablet' | 'desktop' | 'wide'): Breakpoint[] {
  const { getBreakpointByCategory } = useGridConfig()
  return getBreakpointByCategory(category)
}

export function useBreakpointByWidth(width: number): Breakpoint | undefined {
  const { getBreakpointByWidth } = useGridConfig()
  return getBreakpointByWidth(width)
}

export function useGridPrinciples(category: 'responsive' | 'consistency' | 'flexibility'): GridPrinciple[] {
  const { getGridPrincipleByCategory } = useGridConfig()
  return getGridPrincipleByCategory(category)
}

export function useGridLayout(name: string): GridLayout | undefined {
  const { getGridLayoutByName } = useGridConfig()
  return getGridLayoutByName(name)
}

export function useGridLayouts(category: 'content' | 'cards' | 'form' | 'dashboard'): GridLayout[] {
  const { getGridLayoutsByCategory } = useGridConfig()
  return getGridLayoutsByCategory(category)
}

export function useGridSpecification(name: string): GridSpecification | undefined {
  const { getGridSpecificationByName } = useGridConfig()
  return getGridSpecificationByName(name)
}

export function useGridSpecifications(category: 'spacing' | 'breakpoint' | 'container'): GridSpecification[] {
  const { getGridSpecificationsByCategory } = useGridConfig()
  return getGridSpecificationsByCategory(category)
}
