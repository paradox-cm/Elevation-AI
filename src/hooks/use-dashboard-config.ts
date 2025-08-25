"use client"

import { useState, useCallback } from "react"
import {
  dashboardConfig,
  DashboardLayoutConfig,
  DashboardMetricConfig,
  DashboardWidgetConfig,
  DashboardChartConfig,
  DashboardActivityConfig,
  DashboardQuickActionsConfig,
  DashboardNavigationConfig,
  getDashboardLayoutType,
  getDashboardMetricType,
  getDashboardWidgetType,
  getDashboardChartType,
  getDashboardActivityType,
  getDashboardQuickActionsType,
  getDashboardNavigationType
} from "@/lib/dashboard-config"

interface UseDashboardConfigReturn {
  // Configuration object
  config: typeof dashboardConfig
  
  // Dashboard Layout configurations
  dashboardLayoutConfig: DashboardLayoutConfig
  updateDashboardLayoutConfig: (config: Partial<DashboardLayoutConfig>) => void
  getDashboardLayoutType: typeof getDashboardLayoutType
  
  // Dashboard Metric configurations
  dashboardMetricConfig: DashboardMetricConfig
  updateDashboardMetricConfig: (config: Partial<DashboardMetricConfig>) => void
  getDashboardMetricType: typeof getDashboardMetricType
  
  // Dashboard Widget configurations
  dashboardWidgetConfig: DashboardWidgetConfig
  updateDashboardWidgetConfig: (config: Partial<DashboardWidgetConfig>) => void
  getDashboardWidgetType: typeof getDashboardWidgetType
  
  // Dashboard Chart configurations
  dashboardChartConfig: DashboardChartConfig
  updateDashboardChartConfig: (config: Partial<DashboardChartConfig>) => void
  getDashboardChartType: typeof getDashboardChartType
  
  // Dashboard Activity configurations
  dashboardActivityConfig: DashboardActivityConfig
  updateDashboardActivityConfig: (config: Partial<DashboardActivityConfig>) => void
  getDashboardActivityType: typeof getDashboardActivityType
  
  // Dashboard Quick Actions configurations
  dashboardQuickActionsConfig: DashboardQuickActionsConfig
  updateDashboardQuickActionsConfig: (config: Partial<DashboardQuickActionsConfig>) => void
  getDashboardQuickActionsType: typeof getDashboardQuickActionsType
  
  // Dashboard Navigation configurations
  dashboardNavigationConfig: DashboardNavigationConfig
  updateDashboardNavigationConfig: (config: Partial<DashboardNavigationConfig>) => void
  getDashboardNavigationType: typeof getDashboardNavigationType
  
  // Utility functions
  resetToDefaults: () => void
  exportConfig: () => string
  importConfig: (configString: string) => void
}

export function useDashboardConfig(): UseDashboardConfigReturn {
  // Dashboard Layout state
  const [dashboardLayoutConfig, setDashboardLayoutConfig] = useState<DashboardLayoutConfig>(
    dashboardConfig.layouts.defaultConfig
  )

  // Dashboard Metric state
  const [dashboardMetricConfig, setDashboardMetricConfig] = useState<DashboardMetricConfig>(
    dashboardConfig.metrics.defaultConfig
  )

  // Dashboard Widget state
  const [dashboardWidgetConfig, setDashboardWidgetConfig] = useState<DashboardWidgetConfig>(
    dashboardConfig.widgets.defaultConfig
  )

  // Dashboard Chart state
  const [dashboardChartConfig, setDashboardChartConfig] = useState<DashboardChartConfig>(
    dashboardConfig.charts.defaultConfig
  )

  // Dashboard Activity state
  const [dashboardActivityConfig, setDashboardActivityConfig] = useState<DashboardActivityConfig>(
    dashboardConfig.activities.defaultConfig
  )

  // Dashboard Quick Actions state
  const [dashboardQuickActionsConfig, setDashboardQuickActionsConfig] = useState<DashboardQuickActionsConfig>(
    dashboardConfig.quickActions.defaultConfig
  )

  // Dashboard Navigation state
  const [dashboardNavigationConfig, setDashboardNavigationConfig] = useState<DashboardNavigationConfig>(
    dashboardConfig.navigation.defaultConfig
  )

  // Update functions
  const updateDashboardLayoutConfig = useCallback((config: Partial<DashboardLayoutConfig>) => {
    setDashboardLayoutConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateDashboardMetricConfig = useCallback((config: Partial<DashboardMetricConfig>) => {
    setDashboardMetricConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateDashboardWidgetConfig = useCallback((config: Partial<DashboardWidgetConfig>) => {
    setDashboardWidgetConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateDashboardChartConfig = useCallback((config: Partial<DashboardChartConfig>) => {
    setDashboardChartConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateDashboardActivityConfig = useCallback((config: Partial<DashboardActivityConfig>) => {
    setDashboardActivityConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateDashboardQuickActionsConfig = useCallback((config: Partial<DashboardQuickActionsConfig>) => {
    setDashboardQuickActionsConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateDashboardNavigationConfig = useCallback((config: Partial<DashboardNavigationConfig>) => {
    setDashboardNavigationConfig(prev => ({ ...prev, ...config }))
  }, [])

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setDashboardLayoutConfig(dashboardConfig.layouts.defaultConfig)
    setDashboardMetricConfig(dashboardConfig.metrics.defaultConfig)
    setDashboardWidgetConfig(dashboardConfig.widgets.defaultConfig)
    setDashboardChartConfig(dashboardConfig.charts.defaultConfig)
    setDashboardActivityConfig(dashboardConfig.activities.defaultConfig)
    setDashboardQuickActionsConfig(dashboardConfig.quickActions.defaultConfig)
    setDashboardNavigationConfig(dashboardConfig.navigation.defaultConfig)
  }, [])

  // Export configuration
  const exportConfig = useCallback(() => {
    const configToExport = {
      dashboardLayoutConfig,
      dashboardMetricConfig,
      dashboardWidgetConfig,
      dashboardChartConfig,
      dashboardActivityConfig,
      dashboardQuickActionsConfig,
      dashboardNavigationConfig
    }
    return JSON.stringify(configToExport, null, 2)
  }, [
    dashboardLayoutConfig,
    dashboardMetricConfig,
    dashboardWidgetConfig,
    dashboardChartConfig,
    dashboardActivityConfig,
    dashboardQuickActionsConfig,
    dashboardNavigationConfig
  ])

  // Import configuration
  const importConfig = useCallback((configString: string) => {
    try {
      const importedConfig = JSON.parse(configString)
      
      if (importedConfig.dashboardLayoutConfig) {
        setDashboardLayoutConfig(importedConfig.dashboardLayoutConfig)
      }
      if (importedConfig.dashboardMetricConfig) {
        setDashboardMetricConfig(importedConfig.dashboardMetricConfig)
      }
      if (importedConfig.dashboardWidgetConfig) {
        setDashboardWidgetConfig(importedConfig.dashboardWidgetConfig)
      }
      if (importedConfig.dashboardChartConfig) {
        setDashboardChartConfig(importedConfig.dashboardChartConfig)
      }
      if (importedConfig.dashboardActivityConfig) {
        setDashboardActivityConfig(importedConfig.dashboardActivityConfig)
      }
      if (importedConfig.dashboardQuickActionsConfig) {
        setDashboardQuickActionsConfig(importedConfig.dashboardQuickActionsConfig)
      }
      if (importedConfig.dashboardNavigationConfig) {
        setDashboardNavigationConfig(importedConfig.dashboardNavigationConfig)
      }
    } catch (error) {
      console.error("Failed to import configuration:", error)
    }
  }, [])

  return {
    config: dashboardConfig,
    
    // Dashboard Layout
    dashboardLayoutConfig,
    updateDashboardLayoutConfig,
    getDashboardLayoutType,
    
    // Dashboard Metric
    dashboardMetricConfig,
    updateDashboardMetricConfig,
    getDashboardMetricType,
    
    // Dashboard Widget
    dashboardWidgetConfig,
    updateDashboardWidgetConfig,
    getDashboardWidgetType,
    
    // Dashboard Chart
    dashboardChartConfig,
    updateDashboardChartConfig,
    getDashboardChartType,
    
    // Dashboard Activity
    dashboardActivityConfig,
    updateDashboardActivityConfig,
    getDashboardActivityType,
    
    // Dashboard Quick Actions
    dashboardQuickActionsConfig,
    updateDashboardQuickActionsConfig,
    getDashboardQuickActionsType,
    
    // Dashboard Navigation
    dashboardNavigationConfig,
    updateDashboardNavigationConfig,
    getDashboardNavigationType,
    
    // Utilities
    resetToDefaults,
    exportConfig,
    importConfig,
  }
}
