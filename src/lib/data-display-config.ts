export interface DataDisplayConfig {
  tables: {
    variants: TableVariant[]
    sizes: TableSize[]
    densities: TableDensity[]
    defaultConfig: TableConfig
  }
  emptyStates: {
    variants: EmptyStateVariant[]
    sizes: EmptyStateSize[]
    defaultConfig: EmptyStateConfig
  }
  dataCards: {
    variants: DataCardVariant[]
    sizes: DataCardSize[]
    defaultConfig: DataCardConfig
  }
  progressIndicators: {
    variants: ProgressIndicatorVariant[]
    sizes: ProgressIndicatorSize[]
    defaultConfig: ProgressIndicatorConfig
  }
  charts: {
    variants: ChartVariant[]
    types: ChartType[]
    defaultConfig: ChartConfig
  }
  lists: {
    variants: ListVariant[]
    layouts: ListLayout[]
    defaultConfig: ListConfig
  }
  statusIndicators: {
    variants: StatusIndicatorVariant[]
    colors: StatusIndicatorColor[]
    defaultConfig: StatusIndicatorConfig
  }
  pagination: {
    variants: PaginationVariant[]
    sizes: PaginationSize[]
    defaultConfig: PaginationConfig
  }
  searchFilters: {
    variants: SearchFilterVariant[]
    types: SearchFilterType[]
    defaultConfig: SearchFilterConfig
  }
  dataVisualization: {
    variants: DataVisualizationVariant[]
    defaultConfig: DataVisualizationConfig
  }
}

// Table Types
export interface TableVariant {
  id: string
  name: string
  description: string
  className: string
  features: string[]
}

export interface TableSize {
  id: string
  name: string
  className: string
  padding: string
  fontSize: string
}

export interface TableDensity {
  id: string
  name: string
  className: string
  rowHeight: string
  compact: boolean
}

export interface TableConfig {
  variant: string
  size: string
  density: string
  sortable: boolean
  filterable: boolean
  selectable: boolean
  pagination: boolean
  search: boolean
  actions: boolean
  maxRows: number
}

// Empty State Types
export interface EmptyStateVariant {
  id: string
  name: string
  description: string
  className: string
  iconStyle: string
}

export interface EmptyStateSize {
  id: string
  name: string
  className: string
  padding: string
  iconSize: string
}

export interface EmptyStateConfig {
  variant: string
  size: string
  showIcon: boolean
  showAction: boolean
  showDescription: boolean
  centered: boolean
}

// Data Card Types
export interface DataCardVariant {
  id: string
  name: string
  description: string
  className: string
  layout: string
}

export interface DataCardSize {
  id: string
  name: string
  className: string
  padding: string
  fontSize: string
}

export interface DataCardConfig {
  variant: string
  size: string
  showIcon: boolean
  showTrend: boolean
  showDescription: boolean
  interactive: boolean
}

// Progress Indicator Types
export interface ProgressIndicatorVariant {
  id: string
  name: string
  description: string
  className: string
  style: string
}

export interface ProgressIndicatorSize {
  id: string
  name: string
  className: string
  height: string
  fontSize: string
}

export interface ProgressIndicatorConfig {
  variant: string
  size: string
  showLabel: boolean
  showPercentage: boolean
  animated: boolean
  colorized: boolean
}

// Chart Types
export interface ChartVariant {
  id: string
  name: string
  description: string
  className: string
  responsive: boolean
}

export interface ChartType {
  id: string
  name: string
  description: string
  className: string
  useCase: string
}

export interface ChartConfig {
  variant: string
  type: string
  responsive: boolean
  showLegend: boolean
  showTooltip: boolean
  animated: boolean
  height: string
}

// List Types
export interface ListVariant {
  id: string
  name: string
  description: string
  className: string
  itemStyle: string
}

export interface ListLayout {
  id: string
  name: string
  className: string
  columns: number
  responsive: boolean
}

export interface ListConfig {
  variant: string
  layout: string
  selectable: boolean
  sortable: boolean
  searchable: boolean
  pagination: boolean
  maxItems: number
}

// Status Indicator Types
export interface StatusIndicatorVariant {
  id: string
  name: string
  description: string
  className: string
  style: string
}

export interface StatusIndicatorColor {
  id: string
  name: string
  className: string
  color: string
  meaning: string
}

export interface StatusIndicatorConfig {
  variant: string
  color: string
  showLabel: boolean
  showIcon: boolean
  animated: boolean
}

// Pagination Types
export interface PaginationVariant {
  id: string
  name: string
  description: string
  className: string
  style: string
}

export interface PaginationSize {
  id: string
  name: string
  className: string
  buttonSize: string
  fontSize: string
}

export interface PaginationConfig {
  variant: string
  size: string
  showPageNumbers: boolean
  showFirstLast: boolean
  showPrevNext: boolean
  itemsPerPage: number
  maxVisiblePages: number
}

// Search Filter Types
export interface SearchFilterVariant {
  id: string
  name: string
  description: string
  className: string
  layout: string
}

export interface SearchFilterType {
  id: string
  name: string
  description: string
  className: string
  inputType: string
}

export interface SearchFilterConfig {
  variant: string
  type: string
  placeholder: string
  debounce: number
  clearable: boolean
  suggestions: boolean
}

// Data Visualization Types
export interface DataVisualizationVariant {
  id: string
  name: string
  description: string
  className: string
  type: string
}

export interface DataVisualizationConfig {
  variant: string
  responsive: boolean
  interactive: boolean
  animated: boolean
  theme: string
}

export const dataDisplayConfig: DataDisplayConfig = {
  tables: {
    variants: [
      {
        id: "default",
        name: "Default Table",
        description: "Standard table with basic functionality",
        className: "w-full border-collapse",
        features: ["sorting", "pagination"]
      },
      {
        id: "striped",
        name: "Striped Table",
        description: "Table with alternating row colors",
        className: "w-full border-collapse [&_tr:nth-child(even)]:bg-muted/50",
        features: ["sorting", "pagination", "striped"]
      },
      {
        id: "bordered",
        name: "Bordered Table",
        description: "Table with visible borders",
        className: "w-full border-collapse border",
        features: ["sorting", "pagination", "borders"]
      },
      {
        id: "compact",
        name: "Compact Table",
        description: "Dense table for displaying more data",
        className: "w-full border-collapse text-sm",
        features: ["sorting", "pagination", "compact"]
      }
    ],
    sizes: [
      {
        id: "sm",
        name: "Small",
        className: "text-sm",
        padding: "0.5rem",
        fontSize: "0.875rem"
      },
      {
        id: "md",
        name: "Medium",
        className: "text-base",
        padding: "0.75rem",
        fontSize: "1rem"
      },
      {
        id: "lg",
        name: "Large",
        className: "text-lg",
        padding: "1rem",
        fontSize: "1.125rem"
      }
    ],
    densities: [
      {
        id: "comfortable",
        name: "Comfortable",
        className: "py-4",
        rowHeight: "3rem",
        compact: false
      },
      {
        id: "standard",
        name: "Standard",
        className: "py-3",
        rowHeight: "2.5rem",
        compact: false
      },
      {
        id: "compact",
        name: "Compact",
        className: "py-2",
        rowHeight: "2rem",
        compact: true
      }
    ],
    defaultConfig: {
      variant: "default",
      size: "md",
      density: "standard",
      sortable: true,
      filterable: true,
      selectable: false,
      pagination: true,
      search: true,
      actions: true,
      maxRows: 50
    }
  },
  emptyStates: {
    variants: [
      {
        id: "default",
        name: "Default Empty State",
        description: "Standard empty state with icon and message",
        className: "flex flex-col items-center justify-center py-12",
        iconStyle: "default"
      },
      {
        id: "minimal",
        name: "Minimal Empty State",
        description: "Clean empty state without icon",
        className: "flex flex-col items-center justify-center py-8",
        iconStyle: "none"
      },
      {
        id: "illustrated",
        name: "Illustrated Empty State",
        description: "Empty state with custom illustration",
        className: "flex flex-col items-center justify-center py-16",
        iconStyle: "illustration"
      },
      {
        id: "actionable",
        name: "Actionable Empty State",
        description: "Empty state with clear call-to-action",
        className: "flex flex-col items-center justify-center py-12",
        iconStyle: "action"
      }
    ],
    sizes: [
      {
        id: "sm",
        name: "Small",
        className: "py-6",
        padding: "1.5rem",
        iconSize: "1.5rem"
      },
      {
        id: "md",
        name: "Medium",
        className: "py-12",
        padding: "3rem",
        iconSize: "2rem"
      },
      {
        id: "lg",
        name: "Large",
        className: "py-16",
        padding: "4rem",
        iconSize: "3rem"
      }
    ],
    defaultConfig: {
      variant: "default",
      size: "md",
      showIcon: true,
      showAction: true,
      showDescription: true,
      centered: true
    }
  },
  dataCards: {
    variants: [
      {
        id: "default",
        name: "Default Card",
        description: "Standard data card with title and value",
        className: "p-6",
        layout: "horizontal"
      },
      {
        id: "vertical",
        name: "Vertical Card",
        description: "Card with vertical layout",
        className: "p-6 text-center",
        layout: "vertical"
      },
      {
        id: "minimal",
        name: "Minimal Card",
        description: "Clean card without background",
        className: "p-4",
        layout: "horizontal"
      },
      {
        id: "elevated",
        name: "Elevated Card",
        description: "Card with shadow and elevation",
        className: "p-6 shadow-lg",
        layout: "horizontal"
      }
    ],
    sizes: [
      {
        id: "sm",
        name: "Small",
        className: "p-4",
        padding: "1rem",
        fontSize: "0.875rem"
      },
      {
        id: "md",
        name: "Medium",
        className: "p-6",
        padding: "1.5rem",
        fontSize: "1rem"
      },
      {
        id: "lg",
        name: "Large",
        className: "p-8",
        padding: "2rem",
        fontSize: "1.125rem"
      }
    ],
    defaultConfig: {
      variant: "default",
      size: "md",
      showIcon: true,
      showTrend: true,
      showDescription: true,
      interactive: false
    }
  },
  progressIndicators: {
    variants: [
      {
        id: "default",
        name: "Default Progress",
        description: "Standard progress bar",
        className: "w-full bg-muted rounded-full overflow-hidden",
        style: "bar"
      },
      {
        id: "gradient",
        name: "Gradient Progress",
        description: "Progress bar with gradient fill",
        className: "w-full bg-muted rounded-full overflow-hidden",
        style: "gradient"
      },
      {
        id: "circular",
        name: "Circular Progress",
        description: "Circular progress indicator",
        className: "relative inline-flex",
        style: "circular"
      },
      {
        id: "steps",
        name: "Step Progress",
        description: "Step-based progress indicator",
        className: "flex items-center space-x-2",
        style: "steps"
      }
    ],
    sizes: [
      {
        id: "sm",
        name: "Small",
        className: "h-2",
        height: "0.5rem",
        fontSize: "0.75rem"
      },
      {
        id: "md",
        name: "Medium",
        className: "h-3",
        height: "0.75rem",
        fontSize: "0.875rem"
      },
      {
        id: "lg",
        name: "Large",
        className: "h-4",
        height: "1rem",
        fontSize: "1rem"
      }
    ],
    defaultConfig: {
      variant: "default",
      size: "md",
      showLabel: true,
      showPercentage: true,
      animated: true,
      colorized: true
    }
  },
  charts: {
    variants: [
      {
        id: "default",
        name: "Default Chart",
        description: "Standard chart with basic styling",
        className: "w-full h-64",
        responsive: true
      },
      {
        id: "minimal",
        name: "Minimal Chart",
        description: "Clean chart without grid lines",
        className: "w-full h-64",
        responsive: true
      },
      {
        id: "interactive",
        name: "Interactive Chart",
        description: "Chart with hover effects and tooltips",
        className: "w-full h-64",
        responsive: true
      }
    ],
    types: [
      {
        id: "line",
        name: "Line Chart",
        description: "Chart for showing trends over time",
        className: "line-chart",
        useCase: "trends"
      },
      {
        id: "bar",
        name: "Bar Chart",
        description: "Chart for comparing categories",
        className: "bar-chart",
        useCase: "comparison"
      },
      {
        id: "pie",
        name: "Pie Chart",
        description: "Chart for showing proportions",
        className: "pie-chart",
        useCase: "proportions"
      },
      {
        id: "area",
        name: "Area Chart",
        description: "Chart for showing cumulative data",
        className: "area-chart",
        useCase: "cumulative"
      }
    ],
    defaultConfig: {
      variant: "default",
      type: "line",
      responsive: true,
      showLegend: true,
      showTooltip: true,
      animated: true,
      height: "16rem"
    }
  },
  lists: {
    variants: [
      {
        id: "default",
        name: "Default List",
        description: "Standard list with basic styling",
        className: "space-y-2",
        itemStyle: "default"
      },
      {
        id: "card",
        name: "Card List",
        description: "List with card-style items",
        className: "space-y-4",
        itemStyle: "card"
      },
      {
        id: "minimal",
        name: "Minimal List",
        description: "Clean list without borders",
        className: "space-y-1",
        itemStyle: "minimal"
      },
      {
        id: "table",
        name: "Table List",
        description: "List with table-like structure",
        className: "divide-y",
        itemStyle: "table"
      }
    ],
    layouts: [
      {
        id: "single",
        name: "Single Column",
        className: "grid-cols-1",
        columns: 1,
        responsive: false
      },
      {
        id: "two-column",
        name: "Two Column",
        className: "grid-cols-1 md:grid-cols-2",
        columns: 2,
        responsive: true
      },
      {
        id: "three-column",
        name: "Three Column",
        className: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        columns: 3,
        responsive: true
      }
    ],
    defaultConfig: {
      variant: "default",
      layout: "single",
      selectable: false,
      sortable: false,
      searchable: false,
      pagination: false,
      maxItems: 100
    }
  },
  statusIndicators: {
    variants: [
      {
        id: "badge",
        name: "Badge",
        description: "Small badge indicator",
        className: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
        style: "badge"
      },
      {
        id: "dot",
        name: "Dot",
        description: "Simple colored dot",
        className: "w-2 h-2 rounded-full",
        style: "dot"
      },
      {
        id: "pill",
        name: "Pill",
        description: "Pill-shaped indicator",
        className: "inline-flex items-center px-3 py-1 rounded-full text-sm",
        style: "pill"
      },
      {
        id: "icon",
        name: "Icon",
        description: "Icon-based indicator",
        className: "flex items-center space-x-1",
        style: "icon"
      }
    ],
    colors: [
      {
        id: "success",
        name: "Success",
        className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        color: "green",
        meaning: "Positive or completed"
      },
      {
        id: "warning",
        name: "Warning",
        className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        color: "yellow",
        meaning: "Caution or pending"
      },
      {
        id: "error",
        name: "Error",
        className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        color: "red",
        meaning: "Error or failed"
      },
      {
        id: "info",
        name: "Info",
        className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        color: "blue",
        meaning: "Information or neutral"
      }
    ],
    defaultConfig: {
      variant: "badge",
      color: "info",
      showLabel: true,
      showIcon: false,
      animated: false
    }
  },
  pagination: {
    variants: [
      {
        id: "default",
        name: "Default Pagination",
        description: "Standard pagination with page numbers",
        className: "flex items-center space-x-2",
        style: "numbers"
      },
      {
        id: "minimal",
        name: "Minimal Pagination",
        description: "Simple prev/next pagination",
        className: "flex items-center space-x-2",
        style: "prev-next"
      },
      {
        id: "compact",
        name: "Compact Pagination",
        description: "Compact pagination for small spaces",
        className: "flex items-center space-x-1",
        style: "compact"
      }
    ],
    sizes: [
      {
        id: "sm",
        name: "Small",
        className: "h-8 px-3 text-sm",
        buttonSize: "2rem",
        fontSize: "0.875rem"
      },
      {
        id: "md",
        name: "Medium",
        className: "h-10 px-4 text-base",
        buttonSize: "2.5rem",
        fontSize: "1rem"
      },
      {
        id: "lg",
        name: "Large",
        className: "h-12 px-6 text-lg",
        buttonSize: "3rem",
        fontSize: "1.125rem"
      }
    ],
    defaultConfig: {
      variant: "default",
      size: "md",
      showPageNumbers: true,
      showFirstLast: true,
      showPrevNext: true,
      itemsPerPage: 10,
      maxVisiblePages: 5
    }
  },
  searchFilters: {
    variants: [
      {
        id: "default",
        name: "Default Search",
        description: "Standard search input",
        className: "w-full",
        layout: "single"
      },
      {
        id: "with-filters",
        name: "Search with Filters",
        description: "Search with additional filter options",
        className: "w-full",
        layout: "with-filters"
      },
      {
        id: "advanced",
        name: "Advanced Search",
        description: "Advanced search with multiple criteria",
        className: "w-full",
        layout: "advanced"
      }
    ],
    types: [
      {
        id: "text",
        name: "Text Search",
        description: "Basic text search",
        className: "text-search",
        inputType: "text"
      },
      {
        id: "select",
        name: "Select Filter",
        description: "Dropdown filter",
        className: "select-filter",
        inputType: "select"
      },
      {
        id: "date",
        name: "Date Filter",
        description: "Date range filter",
        className: "date-filter",
        inputType: "date"
      },
      {
        id: "multi",
        name: "Multi-select",
        description: "Multiple selection filter",
        className: "multi-select",
        inputType: "checkbox"
      }
    ],
    defaultConfig: {
      variant: "default",
      type: "text",
      placeholder: "Search...",
      debounce: 300,
      clearable: true,
      suggestions: false
    }
  },
  dataVisualization: {
    variants: [
      {
        id: "default",
        name: "Default Visualization",
        description: "Standard data visualization",
        className: "w-full",
        type: "chart"
      },
      {
        id: "interactive",
        name: "Interactive Visualization",
        description: "Interactive data visualization",
        className: "w-full",
        type: "interactive"
      },
      {
        id: "animated",
        name: "Animated Visualization",
        description: "Animated data visualization",
        className: "w-full",
        type: "animated"
      }
    ],
    defaultConfig: {
      variant: "default",
      responsive: true,
      interactive: false,
      animated: false,
      theme: "light"
    }
  }
}

// Helper functions for accessing configuration
export function getTableVariant(id: string): TableVariant | undefined {
  return dataDisplayConfig.tables.variants.find(v => v.id === id)
}

export function getEmptyStateVariant(id: string): EmptyStateVariant | undefined {
  return dataDisplayConfig.emptyStates.variants.find(v => v.id === id)
}

export function getDataCardVariant(id: string): DataCardVariant | undefined {
  return dataDisplayConfig.dataCards.variants.find(v => v.id === id)
}

export function getProgressIndicatorVariant(id: string): ProgressIndicatorVariant | undefined {
  return dataDisplayConfig.progressIndicators.variants.find(v => v.id === id)
}

export function getChartVariant(id: string): ChartVariant | undefined {
  return dataDisplayConfig.charts.variants.find(v => v.id === id)
}

export function getListVariant(id: string): ListVariant | undefined {
  return dataDisplayConfig.lists.variants.find(v => v.id === id)
}

export function getStatusIndicatorVariant(id: string): StatusIndicatorVariant | undefined {
  return dataDisplayConfig.statusIndicators.variants.find(v => v.id === id)
}

export function getPaginationVariant(id: string): PaginationVariant | undefined {
  return dataDisplayConfig.pagination.variants.find(v => v.id === id)
}

export function getSearchFilterVariant(id: string): SearchFilterVariant | undefined {
  return dataDisplayConfig.searchFilters.variants.find(v => v.id === id)
}

export function getDataVisualizationVariant(id: string): DataVisualizationVariant | undefined {
  return dataDisplayConfig.dataVisualization.variants.find(v => v.id === id)
}

// Export default configuration
export default dataDisplayConfig
