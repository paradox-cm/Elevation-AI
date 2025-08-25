// Dashboard Configuration
// Defines all dashboard components, layouts, metrics, widgets, charts, and monitoring

export interface DashboardLayoutConfig {
  type: "grid" | "sidebar" | "tabs" | "cards" | "list" | "custom"
  name: string
  description: string
  columns: number
  rows: number
  responsive: boolean
  sidebar: {
    enabled: boolean
    position: "left" | "right" | "top" | "bottom"
    width: string
    collapsible: boolean
  }
  header: {
    enabled: boolean
    height: string
    sticky: boolean
  }
  footer: {
    enabled: boolean
    height: string
  }
  spacing: {
    gap: string
    padding: string
    margin: string
  }
  theme: {
    background: string
    cardBackground: string
    borderColor: string
  }
}

export interface DashboardMetricConfig {
  type: "stat" | "progress" | "trend" | "comparison" | "gauge" | "counter"
  name: string
  description: string
  display: "card" | "inline" | "compact" | "detailed"
  size: "sm" | "md" | "lg" | "xl"
  format: "number" | "currency" | "percentage" | "duration" | "custom"
  icon: {
    enabled: boolean
    name: string
    color: string
    size: string
  }
  trend: {
    enabled: boolean
    period: string
    format: "percentage" | "absolute" | "relative"
    color: "auto" | "green" | "red" | "blue" | "yellow"
  }
  thresholds: {
    warning: number
    critical: number
    success: number
  }
  refresh: {
    enabled: boolean
    interval: number
    realtime: boolean
  }
}

export interface DashboardWidgetConfig {
  type: "chart" | "table" | "list" | "form" | "calendar" | "map" | "custom"
  name: string
  description: string
  size: "sm" | "md" | "lg" | "xl" | "full"
  position: {
    x: number
    y: number
    width: number
    height: number
  }
  draggable: boolean
  resizable: boolean
  collapsible: boolean
  refreshable: boolean
  configurable: boolean
  dataSource: {
    type: "api" | "static" | "websocket" | "database"
    url?: string
    method?: string
    headers?: Record<string, string>
    params?: Record<string, unknown>
  }
  styling: {
    background: string
    border: string
    borderRadius: string
    shadow: string
  }
}

export interface DashboardChartConfig {
  type: "line" | "bar" | "pie" | "area" | "scatter" | "heatmap" | "radar" | "doughnut"
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
  tooltip: {
    enabled: boolean
    format: string
    position: "top" | "bottom" | "left" | "right"
  }
}

export interface DashboardActivityConfig {
  type: "feed" | "log" | "timeline" | "notifications" | "alerts"
  name: string
  description: string
  maxItems: number
  autoScroll: boolean
  realtime: boolean
  filters: {
    enabled: boolean
    types: string[]
    levels: string[]
    dateRange: boolean
  }
  actions: {
    view: boolean
    edit: boolean
    delete: boolean
    markRead: boolean
  }
  styling: {
    itemHeight: string
    spacing: string
    avatar: boolean
    timestamp: boolean
    badges: boolean
  }
  grouping: {
    enabled: boolean
    by: "date" | "type" | "user" | "none"
    collapse: boolean
  }
}

export interface DashboardQuickActionsConfig {
  type: "buttons" | "cards" | "menu" | "floating"
  name: string
  description: string
  layout: "grid" | "list" | "horizontal" | "vertical"
  size: "sm" | "md" | "lg"
  actions: Array<{
    id: string
    label: string
    icon: string
    description: string
    action: string
    shortcut?: string
    disabled?: boolean
  }>
  styling: {
    background: string
    border: string
    borderRadius: string
    hover: string
  }
  behavior: {
    confirm: boolean
    loading: boolean
    feedback: boolean
  }
}

export interface DashboardNavigationConfig {
  type: "sidebar" | "topbar" | "breadcrumb" | "tabs" | "pagination"
  name: string
  description: string
  position: "left" | "right" | "top" | "bottom"
  items: Array<{
    id: string
    label: string
    icon: string
    href: string
    active: boolean
    disabled: boolean
    children?: Array<{
      id: string
      label: string
      href: string
      active: boolean
    }>
  }>
  styling: {
    background: string
    border: string
    activeColor: string
    hoverColor: string
  }
  behavior: {
    collapsible: boolean
    expandable: boolean
    searchable: boolean
  }
}

export interface DashboardConfig {
  layouts: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    positions: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: DashboardLayoutConfig
  }
  metrics: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    displays: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: DashboardMetricConfig
  }
  widgets: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    sizes: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: DashboardWidgetConfig
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
    defaultConfig: DashboardChartConfig
  }
  activities: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    filters: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: DashboardActivityConfig
  }
  quickActions: {
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
    defaultConfig: DashboardQuickActionsConfig
  }
  navigation: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    positions: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: DashboardNavigationConfig
  }
}

export const dashboardConfig: DashboardConfig = {
  layouts: {
    types: [
      {
        id: "grid",
        name: "Grid Layout",
        description: "Flexible grid-based dashboard layout",
        type: "grid",
        className: "layout-grid"
      },
      {
        id: "sidebar",
        name: "Sidebar Layout",
        description: "Dashboard with sidebar navigation",
        type: "sidebar",
        className: "layout-sidebar"
      },
      {
        id: "tabs",
        name: "Tabs Layout",
        description: "Tab-based dashboard organization",
        type: "tabs",
        className: "layout-tabs"
      },
      {
        id: "cards",
        name: "Cards Layout",
        description: "Card-based dashboard layout",
        type: "cards",
        className: "layout-cards"
      },
      {
        id: "list",
        name: "List Layout",
        description: "List-based dashboard layout",
        type: "list",
        className: "layout-list"
      },
      {
        id: "custom",
        name: "Custom Layout",
        description: "Custom dashboard layout",
        type: "custom",
        className: "layout-custom"
      }
    ],
    positions: [
      {
        id: "top",
        name: "Top",
        description: "Top position",
        className: "position-top"
      },
      {
        id: "bottom",
        name: "Bottom",
        description: "Bottom position",
        className: "position-bottom"
      },
      {
        id: "left",
        name: "Left",
        description: "Left position",
        className: "position-left"
      },
      {
        id: "right",
        name: "Right",
        description: "Right position",
        className: "position-right"
      }
    ],
    defaultConfig: {
      type: "grid",
      name: "Dashboard Layout",
      description: "Standard dashboard layout configuration",
      columns: 12,
      rows: 8,
      responsive: true,
      sidebar: {
        enabled: false,
        position: "left",
        width: "250px",
        collapsible: true
      },
      header: {
        enabled: true,
        height: "60px",
        sticky: true
      },
      footer: {
        enabled: false,
        height: "40px"
      },
      spacing: {
        gap: "1rem",
        padding: "1rem",
        margin: "0"
      },
      theme: {
        background: "bg-background",
        cardBackground: "bg-card",
        borderColor: "border-border"
      }
    }
  },
  metrics: {
    types: [
      {
        id: "stat",
        name: "Statistic",
        description: "Simple statistic display",
        type: "stat",
        className: "metric-stat"
      },
      {
        id: "progress",
        name: "Progress",
        description: "Progress indicator",
        type: "progress",
        className: "metric-progress"
      },
      {
        id: "trend",
        name: "Trend",
        description: "Trend indicator with change",
        type: "trend",
        className: "metric-trend"
      },
      {
        id: "comparison",
        name: "Comparison",
        description: "Comparison between values",
        type: "comparison",
        className: "metric-comparison"
      },
      {
        id: "gauge",
        name: "Gauge",
        description: "Gauge or meter display",
        type: "gauge",
        className: "metric-gauge"
      },
      {
        id: "counter",
        name: "Counter",
        description: "Simple counter display",
        type: "counter",
        className: "metric-counter"
      }
    ],
    displays: [
      {
        id: "card",
        name: "Card",
        description: "Card-based metric display",
        className: "display-card"
      },
      {
        id: "inline",
        name: "Inline",
        description: "Inline metric display",
        className: "display-inline"
      },
      {
        id: "compact",
        name: "Compact",
        description: "Compact metric display",
        className: "display-compact"
      },
      {
        id: "detailed",
        name: "Detailed",
        description: "Detailed metric display",
        className: "display-detailed"
      }
    ],
    defaultConfig: {
      type: "stat",
      name: "Dashboard Metric",
      description: "Standard dashboard metric configuration",
      display: "card",
      size: "md",
      format: "number",
      icon: {
        enabled: true,
        name: "chart-line",
        color: "text-primary",
        size: "h-5 w-5"
      },
      trend: {
        enabled: true,
        period: "last month",
        format: "percentage",
        color: "auto"
      },
      thresholds: {
        warning: 0,
        critical: -10,
        success: 5
      },
      refresh: {
        enabled: false,
        interval: 300000,
        realtime: false
      }
    }
  },
  widgets: {
    types: [
      {
        id: "chart",
        name: "Chart Widget",
        description: "Chart visualization widget",
        type: "chart",
        className: "widget-chart"
      },
      {
        id: "table",
        name: "Table Widget",
        description: "Data table widget",
        type: "table",
        className: "widget-table"
      },
      {
        id: "list",
        name: "List Widget",
        description: "List display widget",
        type: "list",
        className: "widget-list"
      },
      {
        id: "form",
        name: "Form Widget",
        description: "Form input widget",
        type: "form",
        className: "widget-form"
      },
      {
        id: "calendar",
        name: "Calendar Widget",
        description: "Calendar display widget",
        type: "calendar",
        className: "widget-calendar"
      },
      {
        id: "map",
        name: "Map Widget",
        description: "Map visualization widget",
        type: "map",
        className: "widget-map"
      },
      {
        id: "custom",
        name: "Custom Widget",
        description: "Custom widget implementation",
        type: "custom",
        className: "widget-custom"
      }
    ],
    sizes: [
      {
        id: "sm",
        name: "Small",
        description: "Small widget size",
        className: "size-sm"
      },
      {
        id: "md",
        name: "Medium",
        description: "Medium widget size",
        className: "size-md"
      },
      {
        id: "lg",
        name: "Large",
        description: "Large widget size",
        className: "size-lg"
      },
      {
        id: "xl",
        name: "Extra Large",
        description: "Extra large widget size",
        className: "size-xl"
      },
      {
        id: "full",
        name: "Full Width",
        description: "Full width widget",
        className: "size-full"
      }
    ],
    defaultConfig: {
      type: "chart",
      name: "Dashboard Widget",
      description: "Standard dashboard widget configuration",
      size: "md",
      position: {
        x: 0,
        y: 0,
        width: 6,
        height: 4
      },
      draggable: true,
      resizable: true,
      collapsible: true,
      refreshable: true,
      configurable: true,
      dataSource: {
        type: "api",
        url: "/api/dashboard/data",
        method: "GET",
        headers: {},
        params: {}
      },
      styling: {
        background: "bg-card",
        border: "border border-border",
        borderRadius: "rounded-lg",
        shadow: "shadow-sm"
      }
    }
  },
  charts: {
    types: [
      {
        id: "line",
        name: "Line Chart",
        description: "Line chart visualization",
        type: "line",
        className: "chart-line"
      },
      {
        id: "bar",
        name: "Bar Chart",
        description: "Bar chart visualization",
        type: "bar",
        className: "chart-bar"
      },
      {
        id: "pie",
        name: "Pie Chart",
        description: "Pie chart visualization",
        type: "pie",
        className: "chart-pie"
      },
      {
        id: "area",
        name: "Area Chart",
        description: "Area chart visualization",
        type: "area",
        className: "chart-area"
      },
      {
        id: "scatter",
        name: "Scatter Plot",
        description: "Scatter plot visualization",
        type: "scatter",
        className: "chart-scatter"
      },
      {
        id: "heatmap",
        name: "Heatmap",
        description: "Heatmap visualization",
        type: "heatmap",
        className: "chart-heatmap"
      },
      {
        id: "radar",
        name: "Radar Chart",
        description: "Radar chart visualization",
        type: "radar",
        className: "chart-radar"
      },
      {
        id: "doughnut",
        name: "Doughnut Chart",
        description: "Doughnut chart visualization",
        type: "doughnut",
        className: "chart-doughnut"
      }
    ],
    interactions: [
      {
        id: "hover",
        name: "Hover",
        description: "Hover interactions",
        className: "interaction-hover"
      },
      {
        id: "click",
        name: "Click",
        description: "Click interactions",
        className: "interaction-click"
      },
      {
        id: "zoom",
        name: "Zoom",
        description: "Zoom interactions",
        className: "interaction-zoom"
      },
      {
        id: "pan",
        name: "Pan",
        description: "Pan interactions",
        className: "interaction-pan"
      }
    ],
    defaultConfig: {
      type: "line",
      name: "Dashboard Chart",
      description: "Standard dashboard chart configuration",
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
      },
      tooltip: {
        enabled: true,
        format: "default",
        position: "top"
      }
    }
  },
  activities: {
    types: [
      {
        id: "feed",
        name: "Activity Feed",
        description: "Real-time activity feed",
        type: "feed",
        className: "activity-feed"
      },
      {
        id: "log",
        name: "Activity Log",
        description: "Detailed activity log",
        type: "log",
        className: "activity-log"
      },
      {
        id: "timeline",
        name: "Timeline",
        description: "Timeline view of activities",
        type: "timeline",
        className: "activity-timeline"
      },
      {
        id: "notifications",
        name: "Notifications",
        description: "Notification center",
        type: "notifications",
        className: "activity-notifications"
      },
      {
        id: "alerts",
        name: "Alerts",
        description: "Alert and warning system",
        type: "alerts",
        className: "activity-alerts"
      }
    ],
    filters: [
      {
        id: "type",
        name: "Type Filter",
        description: "Filter by activity type",
        className: "filter-type"
      },
      {
        id: "level",
        name: "Level Filter",
        description: "Filter by activity level",
        className: "filter-level"
      },
      {
        id: "date",
        name: "Date Filter",
        description: "Filter by date range",
        className: "filter-date"
      },
      {
        id: "user",
        name: "User Filter",
        description: "Filter by user",
        className: "filter-user"
      }
    ],
    defaultConfig: {
      type: "feed",
      name: "Dashboard Activity",
      description: "Standard dashboard activity configuration",
      maxItems: 10,
      autoScroll: false,
      realtime: true,
      filters: {
        enabled: true,
        types: ["info", "success", "warning", "error"],
        levels: ["low", "medium", "high"],
        dateRange: true
      },
      actions: {
        view: true,
        edit: false,
        delete: false,
        markRead: true
      },
      styling: {
        itemHeight: "auto",
        spacing: "0.5rem",
        avatar: true,
        timestamp: true,
        badges: true
      },
      grouping: {
        enabled: false,
        by: "none",
        collapse: false
      }
    }
  },
  quickActions: {
    types: [
      {
        id: "buttons",
        name: "Buttons",
        description: "Button-based quick actions",
        type: "buttons",
        className: "quick-actions-buttons"
      },
      {
        id: "cards",
        name: "Cards",
        description: "Card-based quick actions",
        type: "cards",
        className: "quick-actions-cards"
      },
      {
        id: "menu",
        name: "Menu",
        description: "Menu-based quick actions",
        type: "menu",
        className: "quick-actions-menu"
      },
      {
        id: "floating",
        name: "Floating",
        description: "Floating action buttons",
        type: "floating",
        className: "quick-actions-floating"
      }
    ],
    layouts: [
      {
        id: "grid",
        name: "Grid",
        description: "Grid layout for actions",
        className: "layout-grid"
      },
      {
        id: "list",
        name: "List",
        description: "List layout for actions",
        className: "layout-list"
      },
      {
        id: "horizontal",
        name: "Horizontal",
        description: "Horizontal layout for actions",
        className: "layout-horizontal"
      },
      {
        id: "vertical",
        name: "Vertical",
        description: "Vertical layout for actions",
        className: "layout-vertical"
      }
    ],
    defaultConfig: {
      type: "buttons",
      name: "Dashboard Quick Actions",
      description: "Standard dashboard quick actions configuration",
      layout: "grid",
      size: "md",
      actions: [
        {
          id: "add",
          label: "Add Item",
          icon: "add-line",
          description: "Add new item",
          action: "add"
        },
        {
          id: "view",
          label: "View All",
          icon: "eye-line",
          description: "View all items",
          action: "view"
        },
        {
          id: "settings",
          label: "Settings",
          icon: "settings-3-line",
          description: "Open settings",
          action: "settings"
        }
      ],
      styling: {
        background: "bg-card",
        border: "border border-border",
        borderRadius: "rounded-lg",
        hover: "hover:bg-muted"
      },
      behavior: {
        confirm: false,
        loading: true,
        feedback: true
      }
    }
  },
  navigation: {
    types: [
      {
        id: "sidebar",
        name: "Sidebar",
        description: "Sidebar navigation",
        type: "sidebar",
        className: "nav-sidebar"
      },
      {
        id: "topbar",
        name: "Top Bar",
        description: "Top bar navigation",
        type: "topbar",
        className: "nav-topbar"
      },
      {
        id: "breadcrumb",
        name: "Breadcrumb",
        description: "Breadcrumb navigation",
        type: "breadcrumb",
        className: "nav-breadcrumb"
      },
      {
        id: "tabs",
        name: "Tabs",
        description: "Tab navigation",
        type: "tabs",
        className: "nav-tabs"
      },
      {
        id: "pagination",
        name: "Pagination",
        description: "Pagination navigation",
        type: "pagination",
        className: "nav-pagination"
      }
    ],
    positions: [
      {
        id: "left",
        name: "Left",
        description: "Left position",
        className: "position-left"
      },
      {
        id: "right",
        name: "Right",
        description: "Right position",
        className: "position-right"
      },
      {
        id: "top",
        name: "Top",
        description: "Top position",
        className: "position-top"
      },
      {
        id: "bottom",
        name: "Bottom",
        description: "Bottom position",
        className: "position-bottom"
      }
    ],
    defaultConfig: {
      type: "sidebar",
      name: "Dashboard Navigation",
      description: "Standard dashboard navigation configuration",
      position: "left",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: "dashboard-line",
          href: "/dashboard",
          active: true,
          disabled: false
        },
        {
          id: "analytics",
          label: "Analytics",
          icon: "bar-chart-line",
          href: "/analytics",
          active: false,
          disabled: false
        },
        {
          id: "settings",
          label: "Settings",
          icon: "settings-3-line",
          href: "/settings",
          active: false,
          disabled: false
        }
      ],
      styling: {
        background: "bg-background",
        border: "border-r border-border",
        activeColor: "text-primary",
        hoverColor: "hover:text-primary"
      },
      behavior: {
        collapsible: true,
        expandable: true,
        searchable: false
      }
    }
  }
}

// Helper functions to get specific configurations
export function getDashboardLayoutType(typeId: string) {
  return dashboardConfig.layouts.types.find(t => t.id === typeId)
}

export function getDashboardMetricType(typeId: string) {
  return dashboardConfig.metrics.types.find(t => t.id === typeId)
}

export function getDashboardWidgetType(typeId: string) {
  return dashboardConfig.widgets.types.find(t => t.id === typeId)
}

export function getDashboardChartType(typeId: string) {
  return dashboardConfig.charts.types.find(t => t.id === typeId)
}

export function getDashboardActivityType(typeId: string) {
  return dashboardConfig.activities.types.find(t => t.id === typeId)
}

export function getDashboardQuickActionsType(typeId: string) {
  return dashboardConfig.quickActions.types.find(t => t.id === typeId)
}

export function getDashboardNavigationType(typeId: string) {
  return dashboardConfig.navigation.types.find(t => t.id === typeId)
}
