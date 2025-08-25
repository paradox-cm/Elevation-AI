// Analytics Configuration
// Defines all analytics components, metrics, charts, data visualization, and analytics tools

export interface MetricConfig {
  type: "kpi" | "summary" | "progress" | "trend" | "comparison"
  name: string
  description: string
  format: "number" | "currency" | "percentage" | "duration" | "custom"
  display: "card" | "inline" | "compact" | "detailed"
  icon: string
  iconColor: string
  change: {
    enabled: boolean
    period: string
    format: "percentage" | "absolute" | "relative"
  }
  thresholds: {
    warning: number
    critical: number
    success: number
  }
  precision: number
  prefix?: string
  suffix?: string
}

export interface ChartConfig {
  type: "bar" | "line" | "pie" | "area" | "scatter" | "heatmap" | "radar" | "doughnut"
  name: string
  description: string
  height: number
  width?: number
  responsive: boolean
  colors: string[]
  animations: {
    enabled: boolean
    duration: number
    easing: string
  }
  interactions: {
    hover: boolean
    click: boolean
    zoom: boolean
    pan: boolean
  }
  legend: {
    enabled: boolean
    position: "top" | "bottom" | "left" | "right"
    orientation: "horizontal" | "vertical"
  }
  grid: {
    enabled: boolean
    color: string
    opacity: number
  }
}

export interface DataVisualizationConfig {
  type: "chart" | "table" | "gauge" | "funnel" | "treemap" | "sankey"
  name: string
  description: string
  component: string
  props: Record<string, unknown>
  dataFormat: string
  responsive: boolean
  accessibility: {
    ariaLabel: string
    ariaDescription: string
    keyboardNavigation: boolean
  }
  export: {
    enabled: boolean
    formats: string[]
    filename: string
  }
}

export interface AnalyticsFilterConfig {
  type: "date" | "select" | "multiselect" | "range" | "search" | "toggle"
  name: string
  description: string
  key: string
  label: string
  placeholder?: string
  options: Array<{
    value: string
    label: string
    description?: string
  }>
  defaultValue: string | string[]
  validation: {
    required: boolean
    min?: number
    max?: number
    pattern?: string
  }
  behavior: {
    autoApply: boolean
    debounce: number
    clearable: boolean
  }
}

export interface AnalyticsDashboardConfig {
  type: "overview" | "detailed" | "custom" | "executive"
  name: string
  description: string
  layout: "grid" | "flexible" | "fixed"
  columns: number
  rows: number
  components: string[]
  refreshInterval: number
  autoRefresh: boolean
  export: {
    enabled: boolean
    formats: string[]
    schedule?: string
  }
  permissions: {
    view: string[]
    edit: string[]
    export: string[]
  }
}

export interface AnalyticsReportConfig {
  type: "scheduled" | "on-demand" | "real-time" | "batch"
  name: string
  description: string
  format: "pdf" | "excel" | "csv" | "json" | "html"
  schedule: {
    frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
    time: string
    timezone: string
  }
  recipients: string[]
  dataSources: string[]
  filters: string[]
  delivery: {
    method: "email" | "api" | "webhook" | "storage"
    config: Record<string, unknown>
  }
  retention: {
    enabled: boolean
    days: number
  }
}

export interface AnalyticsTrackingConfig {
  type: "pageview" | "event" | "conversion" | "custom" | "error"
  name: string
  description: string
  eventName: string
  properties: Record<string, unknown>
  triggers: {
    automatic: boolean
    conditions: Array<{
      type: "url" | "element" | "time" | "user" | "custom"
      value: unknown
    }>
  }
  dataLayer: {
    enabled: boolean
    push: boolean
    variables: string[]
  }
  privacy: {
    anonymize: boolean
    consent: boolean
    retention: number
  }
}

export interface AnalyticsConfig {
  metrics: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    formats: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: MetricConfig
  }
  charts: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    interactions: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: ChartConfig
  }
  visualizations: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    components: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: DataVisualizationConfig
  }
  filters: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    behaviors: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: AnalyticsFilterConfig
  }
  dashboards: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    layouts: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: AnalyticsDashboardConfig
  }
  reports: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    formats: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: AnalyticsReportConfig
  }
  tracking: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    triggers: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: AnalyticsTrackingConfig
  }
}

export const analyticsConfig: AnalyticsConfig = {
  metrics: {
    types: [
      {
        id: "kpi",
        name: "Key Performance Indicator",
        description: "Primary business metrics and KPIs",
        type: "kpi",
        className: "metric-kpi"
      },
      {
        id: "summary",
        name: "Summary Metric",
        description: "Summary and overview metrics",
        type: "summary",
        className: "metric-summary"
      },
      {
        id: "progress",
        name: "Progress Metric",
        description: "Progress tracking and goal metrics",
        type: "progress",
        className: "metric-progress"
      },
      {
        id: "trend",
        name: "Trend Metric",
        description: "Trend analysis and change metrics",
        type: "trend",
        className: "metric-trend"
      },
      {
        id: "comparison",
        name: "Comparison Metric",
        description: "Comparative and benchmark metrics",
        type: "comparison",
        className: "metric-comparison"
      }
    ],
    formats: [
      {
        id: "number",
        name: "Number",
        description: "Plain number format",
        className: "format-number"
      },
      {
        id: "currency",
        name: "Currency",
        description: "Currency format with symbol",
        className: "format-currency"
      },
      {
        id: "percentage",
        name: "Percentage",
        description: "Percentage format with % symbol",
        className: "format-percentage"
      },
      {
        id: "duration",
        name: "Duration",
        description: "Time duration format",
        className: "format-duration"
      },
      {
        id: "custom",
        name: "Custom",
        description: "Custom format with prefix/suffix",
        className: "format-custom"
      }
    ],
    defaultConfig: {
      type: "kpi",
      name: "Revenue",
      description: "Total revenue metric",
      format: "currency",
      display: "card",
      icon: "money-dollar-circle-line",
      iconColor: "text-green-500",
      change: {
        enabled: true,
        period: "last month",
        format: "percentage"
      },
      thresholds: {
        warning: 0,
        critical: -10,
        success: 5
      },
      precision: 2,
      prefix: "$",
      suffix: ""
    }
  },
  charts: {
    types: [
      {
        id: "bar",
        name: "Bar Chart",
        description: "Vertical or horizontal bar chart",
        type: "bar",
        className: "chart-bar"
      },
      {
        id: "line",
        name: "Line Chart",
        description: "Line chart for trends over time",
        type: "line",
        className: "chart-line"
      },
      {
        id: "pie",
        name: "Pie Chart",
        description: "Pie chart for proportions",
        type: "pie",
        className: "chart-pie"
      },
      {
        id: "area",
        name: "Area Chart",
        description: "Area chart for cumulative data",
        type: "area",
        className: "chart-area"
      },
      {
        id: "scatter",
        name: "Scatter Plot",
        description: "Scatter plot for correlations",
        type: "scatter",
        className: "chart-scatter"
      },
      {
        id: "heatmap",
        name: "Heatmap",
        description: "Heatmap for matrix data",
        type: "heatmap",
        className: "chart-heatmap"
      },
      {
        id: "radar",
        name: "Radar Chart",
        description: "Radar chart for multi-dimensional data",
        type: "radar",
        className: "chart-radar"
      },
      {
        id: "doughnut",
        name: "Doughnut Chart",
        description: "Doughnut chart for proportions",
        type: "doughnut",
        className: "chart-doughnut"
      }
    ],
    interactions: [
      {
        id: "hover",
        name: "Hover",
        description: "Hover interactions and tooltips",
        className: "interaction-hover"
      },
      {
        id: "click",
        name: "Click",
        description: "Click interactions and selection",
        className: "interaction-click"
      },
      {
        id: "zoom",
        name: "Zoom",
        description: "Zoom and pan interactions",
        className: "interaction-zoom"
      },
      {
        id: "drag",
        name: "Drag",
        description: "Drag and drop interactions",
        className: "interaction-drag"
      }
    ],
    defaultConfig: {
      type: "bar",
      name: "Revenue Chart",
      description: "Monthly revenue bar chart",
      height: 300,
      responsive: true,
      colors: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
      animations: {
        enabled: true,
        duration: 1000,
        easing: "easeInOut"
      },
      interactions: {
        hover: true,
        click: true,
        zoom: false,
        pan: false
      },
      legend: {
        enabled: true,
        position: "bottom",
        orientation: "horizontal"
      },
      grid: {
        enabled: true,
        color: "#E5E7EB",
        opacity: 0.5
      }
    }
  },
  visualizations: {
    types: [
      {
        id: "chart",
        name: "Chart",
        description: "Data visualization charts",
        type: "chart",
        className: "viz-chart"
      },
      {
        id: "table",
        name: "Table",
        description: "Data table visualization",
        type: "table",
        className: "viz-table"
      },
      {
        id: "gauge",
        name: "Gauge",
        description: "Gauge and meter visualization",
        type: "gauge",
        className: "viz-gauge"
      },
      {
        id: "funnel",
        name: "Funnel",
        description: "Funnel chart visualization",
        type: "funnel",
        className: "viz-funnel"
      },
      {
        id: "treemap",
        name: "Treemap",
        description: "Treemap hierarchical visualization",
        type: "treemap",
        className: "viz-treemap"
      },
      {
        id: "sankey",
        name: "Sankey",
        description: "Sankey flow diagram",
        type: "sankey",
        className: "viz-sankey"
      }
    ],
    components: [
      {
        id: "analytics-metric",
        name: "Analytics Metric",
        description: "Metric display component",
        className: "component-analytics-metric"
      },
      {
        id: "chart-container",
        name: "Chart Container",
        description: "Chart wrapper component",
        className: "component-chart-container"
      },
      {
        id: "analytics-table",
        name: "Analytics Table",
        description: "Data table component",
        className: "component-analytics-table"
      },
      {
        id: "analytics-filter",
        name: "Analytics Filter",
        description: "Filter component",
        className: "component-analytics-filter"
      }
    ],
    defaultConfig: {
      type: "chart",
      name: "Revenue Visualization",
      description: "Revenue data visualization",
      component: "SimpleBarChart",
      props: {
        height: 300,
        responsive: true
      },
      dataFormat: "array",
      responsive: true,
      accessibility: {
        ariaLabel: "Revenue chart",
        ariaDescription: "Monthly revenue data visualization",
        keyboardNavigation: true
      },
      export: {
        enabled: true,
        formats: ["png", "svg", "pdf"],
        filename: "revenue-chart"
      }
    }
  },
  filters: {
    types: [
      {
        id: "date",
        name: "Date Filter",
        description: "Date range and period filters",
        type: "date",
        className: "filter-date"
      },
      {
        id: "select",
        name: "Select Filter",
        description: "Single selection dropdown filter",
        type: "select",
        className: "filter-select"
      },
      {
        id: "multiselect",
        name: "Multi-Select Filter",
        description: "Multiple selection filter",
        type: "multiselect",
        className: "filter-multiselect"
      },
      {
        id: "range",
        name: "Range Filter",
        description: "Numeric range filter",
        type: "range",
        className: "filter-range"
      },
      {
        id: "search",
        name: "Search Filter",
        description: "Text search filter",
        type: "search",
        className: "filter-search"
      },
      {
        id: "toggle",
        name: "Toggle Filter",
        description: "Boolean toggle filter",
        type: "toggle",
        className: "filter-toggle"
      }
    ],
    behaviors: [
      {
        id: "auto-apply",
        name: "Auto Apply",
        description: "Automatically apply filter changes",
        className: "behavior-auto-apply"
      },
      {
        id: "debounce",
        name: "Debounce",
        description: "Debounce filter input",
        className: "behavior-debounce"
      },
      {
        id: "clearable",
        name: "Clearable",
        description: "Allow clearing filter values",
        className: "behavior-clearable"
      },
      {
        id: "persistent",
        name: "Persistent",
        description: "Persist filter state",
        className: "behavior-persistent"
      }
    ],
    defaultConfig: {
      type: "date",
      name: "Date Range",
      description: "Date range filter for analytics",
      key: "dateRange",
      label: "Date Range",
      placeholder: "Select date range",
      options: [
        { value: "7d", label: "Last 7 days" },
        { value: "30d", label: "Last 30 days" },
        { value: "90d", label: "Last 90 days" },
        { value: "1y", label: "Last year" }
      ],
      defaultValue: "30d",
      validation: {
        required: true
      },
      behavior: {
        autoApply: true,
        debounce: 300,
        clearable: false
      }
    }
  },
  dashboards: {
    types: [
      {
        id: "overview",
        name: "Overview Dashboard",
        description: "High-level overview dashboard",
        type: "overview",
        className: "dashboard-overview"
      },
      {
        id: "detailed",
        name: "Detailed Dashboard",
        description: "Detailed analytics dashboard",
        type: "detailed",
        className: "dashboard-detailed"
      },
      {
        id: "custom",
        name: "Custom Dashboard",
        description: "Customizable dashboard",
        type: "custom",
        className: "dashboard-custom"
      },
      {
        id: "executive",
        name: "Executive Dashboard",
        description: "Executive summary dashboard",
        type: "executive",
        className: "dashboard-executive"
      }
    ],
    layouts: [
      {
        id: "grid",
        name: "Grid Layout",
        description: "Fixed grid layout",
        className: "layout-grid"
      },
      {
        id: "flexible",
        name: "Flexible Layout",
        description: "Flexible responsive layout",
        className: "layout-flexible"
      },
      {
        id: "fixed",
        name: "Fixed Layout",
        description: "Fixed position layout",
        className: "layout-fixed"
      }
    ],
    defaultConfig: {
      type: "overview",
      name: "Business Analytics Dashboard",
      description: "Comprehensive business analytics overview",
      layout: "grid",
      columns: 12,
      rows: 8,
      components: ["kpi-grid", "revenue-chart", "analytics-table"],
      refreshInterval: 300000,
      autoRefresh: true,
      export: {
        enabled: true,
        formats: ["pdf", "excel"],
        schedule: "daily"
      },
      permissions: {
        view: ["user", "admin"],
        edit: ["admin"],
        export: ["admin"]
      }
    }
  },
  reports: {
    types: [
      {
        id: "scheduled",
        name: "Scheduled Report",
        description: "Automatically scheduled reports",
        type: "scheduled",
        className: "report-scheduled"
      },
      {
        id: "on-demand",
        name: "On-Demand Report",
        description: "Generated on request",
        type: "on-demand",
        className: "report-on-demand"
      },
      {
        id: "real-time",
        name: "Real-Time Report",
        description: "Real-time data reports",
        type: "real-time",
        className: "report-real-time"
      },
      {
        id: "batch",
        name: "Batch Report",
        description: "Batch processed reports",
        type: "batch",
        className: "report-batch"
      }
    ],
    formats: [
      {
        id: "pdf",
        name: "PDF",
        description: "Portable Document Format",
        className: "format-pdf"
      },
      {
        id: "excel",
        name: "Excel",
        description: "Microsoft Excel format",
        className: "format-excel"
      },
      {
        id: "csv",
        name: "CSV",
        description: "Comma-separated values",
        className: "format-csv"
      },
      {
        id: "json",
        name: "JSON",
        description: "JavaScript Object Notation",
        className: "format-json"
      },
      {
        id: "html",
        name: "HTML",
        description: "Hypertext Markup Language",
        className: "format-html"
      }
    ],
    defaultConfig: {
      type: "scheduled",
      name: "Monthly Analytics Report",
      description: "Monthly business analytics summary",
      format: "pdf",
      schedule: {
        frequency: "monthly",
        time: "09:00",
        timezone: "UTC"
      },
      recipients: ["analytics@company.com"],
      dataSources: ["revenue", "users", "conversions"],
      filters: ["dateRange", "region"],
      delivery: {
        method: "email",
        config: {
          subject: "Monthly Analytics Report",
          body: "Please find attached the monthly analytics report."
        }
      },
      retention: {
        enabled: true,
        days: 365
      }
    }
  },
  tracking: {
    types: [
      {
        id: "pageview",
        name: "Page View",
        description: "Page view tracking",
        type: "pageview",
        className: "tracking-pageview"
      },
      {
        id: "event",
        name: "Event",
        description: "Custom event tracking",
        type: "event",
        className: "tracking-event"
      },
      {
        id: "conversion",
        name: "Conversion",
        description: "Conversion tracking",
        type: "conversion",
        className: "tracking-conversion"
      },
      {
        id: "custom",
        name: "Custom",
        description: "Custom tracking implementation",
        type: "custom",
        className: "tracking-custom"
      },
      {
        id: "error",
        name: "Error",
        description: "Error tracking and monitoring",
        type: "error",
        className: "tracking-error"
      }
    ],
    triggers: [
      {
        id: "automatic",
        name: "Automatic",
        description: "Automatically triggered tracking",
        className: "trigger-automatic"
      },
      {
        id: "manual",
        name: "Manual",
        description: "Manually triggered tracking",
        className: "trigger-manual"
      },
      {
        id: "conditional",
        name: "Conditional",
        description: "Condition-based tracking",
        className: "trigger-conditional"
      }
    ],
    defaultConfig: {
      type: "pageview",
      name: "Page View Tracking",
      description: "Track page views automatically",
      eventName: "page_view",
      properties: {
        page_title: "",
        page_url: "",
        referrer: ""
      },
      triggers: {
        automatic: true,
        conditions: [
          {
            type: "url",
            value: "*"
          }
        ]
      },
      dataLayer: {
        enabled: true,
        push: true,
        variables: ["page_title", "page_url"]
      },
      privacy: {
        anonymize: true,
        consent: true,
        retention: 90
      }
    }
  }
}

// Helper functions to get specific configurations
export function getMetricType(typeId: string) {
  return analyticsConfig.metrics.types.find(t => t.id === typeId)
}

export function getChartType(typeId: string) {
  return analyticsConfig.charts.types.find(t => t.id === typeId)
}

export function getVisualizationType(typeId: string) {
  return analyticsConfig.visualizations.types.find(t => t.id === typeId)
}

export function getFilterType(typeId: string) {
  return analyticsConfig.filters.types.find(t => t.id === typeId)
}

export function getDashboardType(typeId: string) {
  return analyticsConfig.dashboards.types.find(t => t.id === typeId)
}

export function getReportType(typeId: string) {
  return analyticsConfig.reports.types.find(t => t.id === typeId)
}

export function getTrackingType(typeId: string) {
  return analyticsConfig.tracking.types.find(t => t.id === typeId)
}
