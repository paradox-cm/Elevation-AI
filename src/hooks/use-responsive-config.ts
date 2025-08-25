"use client"

import { useState, useCallback } from "react"
import {
  responsiveConfig,
  BreakpointConfig,
  ResponsivePatternConfig,
  GridSystemConfig,
  ResponsiveComponentConfig,
  FluidTypographyConfig,
  ResponsiveImageConfig,
  ContainerConfig,
  getBreakpoint,
  getResponsivePattern,
  getGridSystem,
  getResponsiveComponent,
  getFluidTypography,
  getResponsiveImage,
  getContainer
} from "@/lib/responsive-config"

interface UseResponsiveConfigReturn {
  // Configuration object
  config: typeof responsiveConfig
  
  // Breakpoint configurations
  breakpointConfig: BreakpointConfig
  updateBreakpointConfig: (config: Partial<BreakpointConfig>) => void
  getBreakpoint: typeof getBreakpoint
  
  // Responsive Pattern configurations
  responsivePatternConfig: ResponsivePatternConfig
  updateResponsivePatternConfig: (config: Partial<ResponsivePatternConfig>) => void
  getResponsivePattern: typeof getResponsivePattern
  
  // Grid System configurations
  gridSystemConfig: GridSystemConfig
  updateGridSystemConfig: (config: Partial<GridSystemConfig>) => void
  getGridSystem: typeof getGridSystem
  
  // Responsive Component configurations
  responsiveComponentConfig: ResponsiveComponentConfig
  updateResponsiveComponentConfig: (config: Partial<ResponsiveComponentConfig>) => void
  getResponsiveComponent: typeof getResponsiveComponent
  
  // Fluid Typography configurations
  fluidTypographyConfig: FluidTypographyConfig
  updateFluidTypographyConfig: (config: Partial<FluidTypographyConfig>) => void
  getFluidTypography: typeof getFluidTypography
  
  // Responsive Image configurations
  responsiveImageConfig: ResponsiveImageConfig
  updateResponsiveImageConfig: (config: Partial<ResponsiveImageConfig>) => void
  getResponsiveImage: typeof getResponsiveImage
  
  // Container configurations
  containerConfig: ContainerConfig
  updateContainerConfig: (config: Partial<ContainerConfig>) => void
  getContainer: typeof getContainer
  
  // Utility functions
  resetToDefaults: () => void
  exportConfig: () => string
  importConfig: (configString: string) => void
}

export function useResponsiveConfig(): UseResponsiveConfigReturn {
  // Breakpoint state
  const [breakpointConfig, setBreakpointConfig] = useState<BreakpointConfig>(
    responsiveConfig.breakpoints.defaultConfig
  )

  // Responsive Pattern state
  const [responsivePatternConfig, setResponsivePatternConfig] = useState<ResponsivePatternConfig>(
    responsiveConfig.patterns.defaultConfig
  )

  // Grid System state
  const [gridSystemConfig, setGridSystemConfig] = useState<GridSystemConfig>(
    responsiveConfig.gridSystems.defaultConfig
  )

  // Responsive Component state
  const [responsiveComponentConfig, setResponsiveComponentConfig] = useState<ResponsiveComponentConfig>(
    responsiveConfig.components.defaultConfig
  )

  // Fluid Typography state
  const [fluidTypographyConfig, setFluidTypographyConfig] = useState<FluidTypographyConfig>(
    responsiveConfig.typography.defaultConfig
  )

  // Responsive Image state
  const [responsiveImageConfig, setResponsiveImageConfig] = useState<ResponsiveImageConfig>(
    responsiveConfig.images.defaultConfig
  )

  // Container state
  const [containerConfig, setContainerConfig] = useState<ContainerConfig>(
    responsiveConfig.containers.defaultConfig
  )

  // Update functions
  const updateBreakpointConfig = useCallback((config: Partial<BreakpointConfig>) => {
    setBreakpointConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateResponsivePatternConfig = useCallback((config: Partial<ResponsivePatternConfig>) => {
    setResponsivePatternConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateGridSystemConfig = useCallback((config: Partial<GridSystemConfig>) => {
    setGridSystemConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateResponsiveComponentConfig = useCallback((config: Partial<ResponsiveComponentConfig>) => {
    setResponsiveComponentConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateFluidTypographyConfig = useCallback((config: Partial<FluidTypographyConfig>) => {
    setFluidTypographyConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateResponsiveImageConfig = useCallback((config: Partial<ResponsiveImageConfig>) => {
    setResponsiveImageConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateContainerConfig = useCallback((config: Partial<ContainerConfig>) => {
    setContainerConfig(prev => ({ ...prev, ...config }))
  }, [])

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setBreakpointConfig(responsiveConfig.breakpoints.defaultConfig)
    setResponsivePatternConfig(responsiveConfig.patterns.defaultConfig)
    setGridSystemConfig(responsiveConfig.gridSystems.defaultConfig)
    setResponsiveComponentConfig(responsiveConfig.components.defaultConfig)
    setFluidTypographyConfig(responsiveConfig.typography.defaultConfig)
    setResponsiveImageConfig(responsiveConfig.images.defaultConfig)
    setContainerConfig(responsiveConfig.containers.defaultConfig)
  }, [])

  // Export configuration
  const exportConfig = useCallback(() => {
    const configToExport = {
      breakpointConfig,
      responsivePatternConfig,
      gridSystemConfig,
      responsiveComponentConfig,
      fluidTypographyConfig,
      responsiveImageConfig,
      containerConfig
    }
    return JSON.stringify(configToExport, null, 2)
  }, [
    breakpointConfig,
    responsivePatternConfig,
    gridSystemConfig,
    responsiveComponentConfig,
    fluidTypographyConfig,
    responsiveImageConfig,
    containerConfig
  ])

  // Import configuration
  const importConfig = useCallback((configString: string) => {
    try {
      const importedConfig = JSON.parse(configString)
      
      if (importedConfig.breakpointConfig) {
        setBreakpointConfig(importedConfig.breakpointConfig)
      }
      if (importedConfig.responsivePatternConfig) {
        setResponsivePatternConfig(importedConfig.responsivePatternConfig)
      }
      if (importedConfig.gridSystemConfig) {
        setGridSystemConfig(importedConfig.gridSystemConfig)
      }
      if (importedConfig.responsiveComponentConfig) {
        setResponsiveComponentConfig(importedConfig.responsiveComponentConfig)
      }
      if (importedConfig.fluidTypographyConfig) {
        setFluidTypographyConfig(importedConfig.fluidTypographyConfig)
      }
      if (importedConfig.responsiveImageConfig) {
        setResponsiveImageConfig(importedConfig.responsiveImageConfig)
      }
      if (importedConfig.containerConfig) {
        setContainerConfig(importedConfig.containerConfig)
      }
    } catch (error) {
      console.error("Failed to import configuration:", error)
    }
  }, [])

  return {
    config: responsiveConfig,
    
    // Breakpoint
    breakpointConfig,
    updateBreakpointConfig,
    getBreakpoint,
    
    // Responsive Pattern
    responsivePatternConfig,
    updateResponsivePatternConfig,
    getResponsivePattern,
    
    // Grid System
    gridSystemConfig,
    updateGridSystemConfig,
    getGridSystem,
    
    // Responsive Component
    responsiveComponentConfig,
    updateResponsiveComponentConfig,
    getResponsiveComponent,
    
    // Fluid Typography
    fluidTypographyConfig,
    updateFluidTypographyConfig,
    getFluidTypography,
    
    // Responsive Image
    responsiveImageConfig,
    updateResponsiveImageConfig,
    getResponsiveImage,
    
    // Container
    containerConfig,
    updateContainerConfig,
    getContainer,
    
    // Utilities
    resetToDefaults,
    exportConfig,
    importConfig,
  }
}
