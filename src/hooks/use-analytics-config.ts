"use client"

import { useState, useCallback } from "react"
import {
  analyticsConfig,
  MetricConfig,
  ChartConfig,
  DataVisualizationConfig,
  AnalyticsFilterConfig,
  AnalyticsDashboardConfig,
  AnalyticsReportConfig,
  AnalyticsTrackingConfig,
  getMetricType,
  getChartType,
  getVisualizationType,
  getFilterType,
  getDashboardType,
  getReportType,
  getTrackingType
} from "@/lib/analytics-config"

interface UseAnalyticsConfigReturn {
  // Configuration object
  config: typeof analyticsConfig
  
  // Metric configurations
  metricConfig: MetricConfig
  updateMetricConfig: (config: Partial<MetricConfig>) => void
  getMetricType: typeof getMetricType
  
  // Chart configurations
  chartConfig: ChartConfig
  updateChartConfig: (config: Partial<ChartConfig>) => void
  getChartType: typeof getChartType
  
  // Data Visualization configurations
  dataVisualizationConfig: DataVisualizationConfig
  updateDataVisualizationConfig: (config: Partial<DataVisualizationConfig>) => void
  getVisualizationType: typeof getVisualizationType
  
  // Analytics Filter configurations
  analyticsFilterConfig: AnalyticsFilterConfig
  updateAnalyticsFilterConfig: (config: Partial<AnalyticsFilterConfig>) => void
  getFilterType: typeof getFilterType
  
  // Analytics Dashboard configurations
  analyticsDashboardConfig: AnalyticsDashboardConfig
  updateAnalyticsDashboardConfig: (config: Partial<AnalyticsDashboardConfig>) => void
  getDashboardType: typeof getDashboardType
  
  // Analytics Report configurations
  analyticsReportConfig: AnalyticsReportConfig
  updateAnalyticsReportConfig: (config: Partial<AnalyticsReportConfig>) => void
  getReportType: typeof getReportType
  
  // Analytics Tracking configurations
  analyticsTrackingConfig: AnalyticsTrackingConfig
  updateAnalyticsTrackingConfig: (config: Partial<AnalyticsTrackingConfig>) => void
  getTrackingType: typeof getTrackingType
  
  // Utility functions
  resetToDefaults: () => void
  exportConfig: () => string
  importConfig: (configString: string) => void
}

export function useAnalyticsConfig(): UseAnalyticsConfigReturn {
  // Metric state
  const [metricConfig, setMetricConfig] = useState<MetricConfig>(
    analyticsConfig.metrics.defaultConfig
  )

  // Chart state
  const [chartConfig, setChartConfig] = useState<ChartConfig>(
    analyticsConfig.charts.defaultConfig
  )

  // Data Visualization state
  const [dataVisualizationConfig, setDataVisualizationConfig] = useState<DataVisualizationConfig>(
    analyticsConfig.visualizations.defaultConfig
  )

  // Analytics Filter state
  const [analyticsFilterConfig, setAnalyticsFilterConfig] = useState<AnalyticsFilterConfig>(
    analyticsConfig.filters.defaultConfig
  )

  // Analytics Dashboard state
  const [analyticsDashboardConfig, setAnalyticsDashboardConfig] = useState<AnalyticsDashboardConfig>(
    analyticsConfig.dashboards.defaultConfig
  )

  // Analytics Report state
  const [analyticsReportConfig, setAnalyticsReportConfig] = useState<AnalyticsReportConfig>(
    analyticsConfig.reports.defaultConfig
  )

  // Analytics Tracking state
  const [analyticsTrackingConfig, setAnalyticsTrackingConfig] = useState<AnalyticsTrackingConfig>(
    analyticsConfig.tracking.defaultConfig
  )

  // Update functions
  const updateMetricConfig = useCallback((config: Partial<MetricConfig>) => {
    setMetricConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateChartConfig = useCallback((config: Partial<ChartConfig>) => {
    setChartConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateDataVisualizationConfig = useCallback((config: Partial<DataVisualizationConfig>) => {
    setDataVisualizationConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateAnalyticsFilterConfig = useCallback((config: Partial<AnalyticsFilterConfig>) => {
    setAnalyticsFilterConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateAnalyticsDashboardConfig = useCallback((config: Partial<AnalyticsDashboardConfig>) => {
    setAnalyticsDashboardConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateAnalyticsReportConfig = useCallback((config: Partial<AnalyticsReportConfig>) => {
    setAnalyticsReportConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateAnalyticsTrackingConfig = useCallback((config: Partial<AnalyticsTrackingConfig>) => {
    setAnalyticsTrackingConfig(prev => ({ ...prev, ...config }))
  }, [])

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setMetricConfig(analyticsConfig.metrics.defaultConfig)
    setChartConfig(analyticsConfig.charts.defaultConfig)
    setDataVisualizationConfig(analyticsConfig.visualizations.defaultConfig)
    setAnalyticsFilterConfig(analyticsConfig.filters.defaultConfig)
    setAnalyticsDashboardConfig(analyticsConfig.dashboards.defaultConfig)
    setAnalyticsReportConfig(analyticsConfig.reports.defaultConfig)
    setAnalyticsTrackingConfig(analyticsConfig.tracking.defaultConfig)
  }, [])

  // Export configuration
  const exportConfig = useCallback(() => {
    const configToExport = {
      metricConfig,
      chartConfig,
      dataVisualizationConfig,
      analyticsFilterConfig,
      analyticsDashboardConfig,
      analyticsReportConfig,
      analyticsTrackingConfig
    }
    return JSON.stringify(configToExport, null, 2)
  }, [
    metricConfig,
    chartConfig,
    dataVisualizationConfig,
    analyticsFilterConfig,
    analyticsDashboardConfig,
    analyticsReportConfig,
    analyticsTrackingConfig
  ])

  // Import configuration
  const importConfig = useCallback((configString: string) => {
    try {
      const importedConfig = JSON.parse(configString)
      
      if (importedConfig.metricConfig) {
        setMetricConfig(importedConfig.metricConfig)
      }
      if (importedConfig.chartConfig) {
        setChartConfig(importedConfig.chartConfig)
      }
      if (importedConfig.dataVisualizationConfig) {
        setDataVisualizationConfig(importedConfig.dataVisualizationConfig)
      }
      if (importedConfig.analyticsFilterConfig) {
        setAnalyticsFilterConfig(importedConfig.analyticsFilterConfig)
      }
      if (importedConfig.analyticsDashboardConfig) {
        setAnalyticsDashboardConfig(importedConfig.analyticsDashboardConfig)
      }
      if (importedConfig.analyticsReportConfig) {
        setAnalyticsReportConfig(importedConfig.analyticsReportConfig)
      }
      if (importedConfig.analyticsTrackingConfig) {
        setAnalyticsTrackingConfig(importedConfig.analyticsTrackingConfig)
      }
    } catch (error) {
      console.error("Failed to import configuration:", error)
    }
  }, [])

  return {
    config: analyticsConfig,
    
    // Metric
    metricConfig,
    updateMetricConfig,
    getMetricType,
    
    // Chart
    chartConfig,
    updateChartConfig,
    getChartType,
    
    // Data Visualization
    dataVisualizationConfig,
    updateDataVisualizationConfig,
    getVisualizationType,
    
    // Analytics Filter
    analyticsFilterConfig,
    updateAnalyticsFilterConfig,
    getFilterType,
    
    // Analytics Dashboard
    analyticsDashboardConfig,
    updateAnalyticsDashboardConfig,
    getDashboardType,
    
    // Analytics Report
    analyticsReportConfig,
    updateAnalyticsReportConfig,
    getReportType,
    
    // Analytics Tracking
    analyticsTrackingConfig,
    updateAnalyticsTrackingConfig,
    getTrackingType,
    
    // Utilities
    resetToDefaults,
    exportConfig,
    importConfig,
  }
}
