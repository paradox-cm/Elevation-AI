"use client"

import { useState, useCallback } from "react"
import {
  dataDisplayConfig,
  DataDisplayConfig,
  TableConfig,
  EmptyStateConfig,
  DataCardConfig,
  ProgressIndicatorConfig,
  ChartConfig,
  ListConfig,
  StatusIndicatorConfig,
  PaginationConfig,
  SearchFilterConfig,
  DataVisualizationConfig,
  getTableVariant,
  getEmptyStateVariant,
  getDataCardVariant,
  getProgressIndicatorVariant,
  getChartVariant,
  getListVariant,
  getStatusIndicatorVariant,
  getPaginationVariant,
  getSearchFilterVariant,
  getDataVisualizationVariant,
} from "@/lib/data-display-config"

export interface UseDataDisplayConfigReturn {
  // Configuration
  config: DataDisplayConfig
  
  // Tables
  tableConfig: TableConfig
  updateTableConfig: (config: Partial<TableConfig>) => void
  getTableVariant: (id: string) => ReturnType<typeof getTableVariant>
  
  // Empty States
  emptyStateConfig: EmptyStateConfig
  updateEmptyStateConfig: (config: Partial<EmptyStateConfig>) => void
  getEmptyStateVariant: (id: string) => ReturnType<typeof getEmptyStateVariant>
  
  // Data Cards
  dataCardConfig: DataCardConfig
  updateDataCardConfig: (config: Partial<DataCardConfig>) => void
  getDataCardVariant: (id: string) => ReturnType<typeof getDataCardVariant>
  
  // Progress Indicators
  progressIndicatorConfig: ProgressIndicatorConfig
  updateProgressIndicatorConfig: (config: Partial<ProgressIndicatorConfig>) => void
  getProgressIndicatorVariant: (id: string) => ReturnType<typeof getProgressIndicatorVariant>
  
  // Charts
  chartConfig: ChartConfig
  updateChartConfig: (config: Partial<ChartConfig>) => void
  getChartVariant: (id: string) => ReturnType<typeof getChartVariant>
  
  // Lists
  listConfig: ListConfig
  updateListConfig: (config: Partial<ListConfig>) => void
  getListVariant: (id: string) => ReturnType<typeof getListVariant>
  
  // Status Indicators
  statusIndicatorConfig: StatusIndicatorConfig
  updateStatusIndicatorConfig: (config: Partial<StatusIndicatorConfig>) => void
  getStatusIndicatorVariant: (id: string) => ReturnType<typeof getStatusIndicatorVariant>
  
  // Pagination
  paginationConfig: PaginationConfig
  updatePaginationConfig: (config: Partial<PaginationConfig>) => void
  getPaginationVariant: (id: string) => ReturnType<typeof getPaginationVariant>
  
  // Search Filters
  searchFilterConfig: SearchFilterConfig
  updateSearchFilterConfig: (config: Partial<SearchFilterConfig>) => void
  getSearchFilterVariant: (id: string) => ReturnType<typeof getSearchFilterVariant>
  
  // Data Visualization
  dataVisualizationConfig: DataVisualizationConfig
  updateDataVisualizationConfig: (config: Partial<DataVisualizationConfig>) => void
  getDataVisualizationVariant: (id: string) => ReturnType<typeof getDataVisualizationVariant>
  
  // Utility functions
  resetToDefaults: () => void
  exportConfig: () => string
  importConfig: (configString: string) => void
}

export function useDataDisplayConfig(): UseDataDisplayConfigReturn {
  // Table State
  const [tableConfig, setTableConfig] = useState<TableConfig>(
    dataDisplayConfig.tables.defaultConfig
  )
  
  // Empty State State
  const [emptyStateConfig, setEmptyStateConfig] = useState<EmptyStateConfig>(
    dataDisplayConfig.emptyStates.defaultConfig
  )
  
  // Data Card State
  const [dataCardConfig, setDataCardConfig] = useState<DataCardConfig>(
    dataDisplayConfig.dataCards.defaultConfig
  )
  
  // Progress Indicator State
  const [progressIndicatorConfig, setProgressIndicatorConfig] = useState<ProgressIndicatorConfig>(
    dataDisplayConfig.progressIndicators.defaultConfig
  )
  
  // Chart State
  const [chartConfig, setChartConfig] = useState<ChartConfig>(
    dataDisplayConfig.charts.defaultConfig
  )
  
  // List State
  const [listConfig, setListConfig] = useState<ListConfig>(
    dataDisplayConfig.lists.defaultConfig
  )
  
  // Status Indicator State
  const [statusIndicatorConfig, setStatusIndicatorConfig] = useState<StatusIndicatorConfig>(
    dataDisplayConfig.statusIndicators.defaultConfig
  )
  
  // Pagination State
  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>(
    dataDisplayConfig.pagination.defaultConfig
  )
  
  // Search Filter State
  const [searchFilterConfig, setSearchFilterConfig] = useState<SearchFilterConfig>(
    dataDisplayConfig.searchFilters.defaultConfig
  )
  
  // Data Visualization State
  const [dataVisualizationConfig, setDataVisualizationConfig] = useState<DataVisualizationConfig>(
    dataDisplayConfig.dataVisualization.defaultConfig
  )

  // Update functions
  const updateTableConfig = useCallback((config: Partial<TableConfig>) => {
    setTableConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateEmptyStateConfig = useCallback((config: Partial<EmptyStateConfig>) => {
    setEmptyStateConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateDataCardConfig = useCallback((config: Partial<DataCardConfig>) => {
    setDataCardConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateProgressIndicatorConfig = useCallback((config: Partial<ProgressIndicatorConfig>) => {
    setProgressIndicatorConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateChartConfig = useCallback((config: Partial<ChartConfig>) => {
    setChartConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateListConfig = useCallback((config: Partial<ListConfig>) => {
    setListConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateStatusIndicatorConfig = useCallback((config: Partial<StatusIndicatorConfig>) => {
    setStatusIndicatorConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updatePaginationConfig = useCallback((config: Partial<PaginationConfig>) => {
    setPaginationConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateSearchFilterConfig = useCallback((config: Partial<SearchFilterConfig>) => {
    setSearchFilterConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateDataVisualizationConfig = useCallback((config: Partial<DataVisualizationConfig>) => {
    setDataVisualizationConfig(prev => ({ ...prev, ...config }))
  }, [])

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setTableConfig(dataDisplayConfig.tables.defaultConfig)
    setEmptyStateConfig(dataDisplayConfig.emptyStates.defaultConfig)
    setDataCardConfig(dataDisplayConfig.dataCards.defaultConfig)
    setProgressIndicatorConfig(dataDisplayConfig.progressIndicators.defaultConfig)
    setChartConfig(dataDisplayConfig.charts.defaultConfig)
    setListConfig(dataDisplayConfig.lists.defaultConfig)
    setStatusIndicatorConfig(dataDisplayConfig.statusIndicators.defaultConfig)
    setPaginationConfig(dataDisplayConfig.pagination.defaultConfig)
    setSearchFilterConfig(dataDisplayConfig.searchFilters.defaultConfig)
    setDataVisualizationConfig(dataDisplayConfig.dataVisualization.defaultConfig)
  }, [])

  // Export configuration
  const exportConfig = useCallback(() => {
    const config = {
      tableConfig,
      emptyStateConfig,
      dataCardConfig,
      progressIndicatorConfig,
      chartConfig,
      listConfig,
      statusIndicatorConfig,
      paginationConfig,
      searchFilterConfig,
      dataVisualizationConfig,
    }
    return JSON.stringify(config, null, 2)
  }, [
    tableConfig,
    emptyStateConfig,
    dataCardConfig,
    progressIndicatorConfig,
    chartConfig,
    listConfig,
    statusIndicatorConfig,
    paginationConfig,
    searchFilterConfig,
    dataVisualizationConfig,
  ])

  // Import configuration
  const importConfig = useCallback((configString: string) => {
    try {
      const config = JSON.parse(configString)
      if (config.tableConfig) setTableConfig(config.tableConfig)
      if (config.emptyStateConfig) setEmptyStateConfig(config.emptyStateConfig)
      if (config.dataCardConfig) setDataCardConfig(config.dataCardConfig)
      if (config.progressIndicatorConfig) setProgressIndicatorConfig(config.progressIndicatorConfig)
      if (config.chartConfig) setChartConfig(config.chartConfig)
      if (config.listConfig) setListConfig(config.listConfig)
      if (config.statusIndicatorConfig) setStatusIndicatorConfig(config.statusIndicatorConfig)
      if (config.paginationConfig) setPaginationConfig(config.paginationConfig)
      if (config.searchFilterConfig) setSearchFilterConfig(config.searchFilterConfig)
      if (config.dataVisualizationConfig) setDataVisualizationConfig(config.dataVisualizationConfig)
    } catch (error) {
      console.error("Failed to import data display configuration:", error)
    }
  }, [])

  return {
    config: dataDisplayConfig,
    
    // Tables
    tableConfig,
    updateTableConfig,
    getTableVariant,
    
    // Empty States
    emptyStateConfig,
    updateEmptyStateConfig,
    getEmptyStateVariant,
    
    // Data Cards
    dataCardConfig,
    updateDataCardConfig,
    getDataCardVariant,
    
    // Progress Indicators
    progressIndicatorConfig,
    updateProgressIndicatorConfig,
    getProgressIndicatorVariant,
    
    // Charts
    chartConfig,
    updateChartConfig,
    getChartVariant,
    
    // Lists
    listConfig,
    updateListConfig,
    getListVariant,
    
    // Status Indicators
    statusIndicatorConfig,
    updateStatusIndicatorConfig,
    getStatusIndicatorVariant,
    
    // Pagination
    paginationConfig,
    updatePaginationConfig,
    getPaginationVariant,
    
    // Search Filters
    searchFilterConfig,
    updateSearchFilterConfig,
    getSearchFilterVariant,
    
    // Data Visualization
    dataVisualizationConfig,
    updateDataVisualizationConfig,
    getDataVisualizationVariant,
    
    // Utility functions
    resetToDefaults,
    exportConfig,
    importConfig,
  }
}
