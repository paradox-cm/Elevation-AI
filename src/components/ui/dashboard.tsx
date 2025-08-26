"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import Icon from "@/components/ui/icon"
import { H3, H4, BodySmall } from "@/components/ui/typography"

// Stats Card Component
interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  trend?: {
    value: number
    isPositive: boolean
    period: string
  }
  icon?: string
  iconColor?: string
  variant?: "default" | "success" | "warning" | "error" | "info"
  className?: string
}

export function StatsCard({
  title,
  value,
  description,
  trend,
  icon,
  iconColor = "text-primary",
  variant = "default",
  className,
}: StatsCardProps) {
  const variantStyles = {
    default: "border-border",
    success: "border-green-200 dark:border-green-800",
    warning: "border-yellow-200 dark:border-yellow-800",
    error: "border-red-200 dark:border-red-800",
    info: "border-blue-200 dark:border-blue-800",
  }

  return (
    <Card className={cn("transition-all hover:shadow-md", variantStyles[variant], className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className={cn("p-2 rounded-lg bg-muted flex items-center justify-center", iconColor)}>
            <Icon name={icon} className="h-4 w-4" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <BodySmall className="text-muted-foreground mt-1">
            {description}
          </BodySmall>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <Icon
              name={trend.isPositive ? "arrow-up-line" : "arrow-down-line"}
              className={cn(
                "h-3 w-3 mr-1",
                trend.isPositive ? "text-green-500" : "text-red-500"
              )}
            />
            <BodySmall
              className={cn(
                "font-medium",
                trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}
            >
              {Math.abs(trend.value)}%
            </BodySmall>
            <BodySmall className="text-muted-foreground ml-1">
              vs {trend.period}
            </BodySmall>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Metric Display Component
interface MetricDisplayProps {
  label: string
  value: string | number
  unit?: string
  description?: string
  status?: "success" | "warning" | "error" | "info"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function MetricDisplay({
  label,
  value,
  unit,
  description,
  status,
  size = "md",
  className,
}: MetricDisplayProps) {
  const sizeStyles = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  }

  const statusStyles = {
    success: "text-green-600 dark:text-green-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    error: "text-red-600 dark:text-red-400",
    info: "text-blue-600 dark:text-blue-400",
  }

  return (
    <div className={cn("space-y-1", className)}>
      <BodySmall className="text-muted-foreground font-medium">{label}</BodySmall>
      <div className="flex items-baseline space-x-1">
        <span className={cn("font-bold", sizeStyles[size], status && statusStyles[status])}>
          {value}
        </span>
        {unit && (
          <BodySmall className="text-muted-foreground">{unit}</BodySmall>
        )}
      </div>
      {description && (
        <BodySmall className="text-muted-foreground">{description}</BodySmall>
      )}
    </div>
  )
}

// Progress Metric Component
interface ProgressMetricProps {
  label: string
  value: number
  target: number
  unit?: string
  description?: string
  variant?: "default" | "success" | "warning" | "error"
  className?: string
}

export function ProgressMetric({
  label,
  value,
  target,
  unit,
  description,
  variant = "default",
  className,
}: ProgressMetricProps) {
  const percentage = Math.min((value / target) * 100, 100)
  
  const variantStyles = {
    default: "bg-primary",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <BodySmall className="font-medium">{label}</BodySmall>
        <div className="flex items-center space-x-1">
          <span className="text-sm font-bold">{value}</span>
          {unit && <BodySmall className="text-muted-foreground">{unit}</BodySmall>}
          <BodySmall className="text-muted-foreground">/ {target}</BodySmall>
        </div>
      </div>
      <Progress value={percentage} className="h-2" />
      <div className="flex items-center justify-between">
        <BodySmall className="text-muted-foreground">{description}</BodySmall>
        <BodySmall className="font-medium">{percentage === 100 ? "100.0" : percentage.toFixed(1)}%</BodySmall>
      </div>
    </div>
  )
}

// Activity Feed Component
interface ActivityItem {
  id: string
  type: "success" | "warning" | "error" | "info"
  title: string
  description?: string
  timestamp: string
  user?: {
    name: string
    avatar?: string
  }
}

interface ActivityFeedProps {
  activities: ActivityItem[]
  title?: string
  maxItems?: number
  className?: string
}

export function ActivityFeed({
  activities,
  title = "Recent Activity",
  maxItems = 5,
  className,
}: ActivityFeedProps) {
  const typeConfig = {
    success: { icon: "check-line", color: "text-green-500" },
    warning: { icon: "alert-line", color: "text-yellow-500" },
    error: { icon: "close-line", color: "text-red-500" },
    info: { icon: "information-line", color: "text-blue-500" },
  }

  const displayActivities = activities.slice(0, maxItems)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="time-line" className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayActivities.map((activity, index) => {
            const config = typeConfig[activity.type]
            return (
              <div key={activity.id}>
                <div className="flex items-start space-x-3">
                  <div className={cn("p-1 rounded-full bg-muted", config.color)}>
                    <Icon name={config.icon} className="h-3 w-3" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <BodySmall className="font-medium">{activity.title}</BodySmall>
                      <BodySmall className="text-muted-foreground text-xs">
                        {activity.timestamp}
                      </BodySmall>
                    </div>
                    {activity.description && (
                      <BodySmall className="text-muted-foreground">
                        {activity.description}
                      </BodySmall>
                    )}
                    {activity.user && (
                      <BodySmall className="text-muted-foreground text-xs">
                        by {activity.user.name}
                      </BodySmall>
                    )}
                  </div>
                </div>
                {index < displayActivities.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// Quick Actions Component
interface QuickAction {
  label: string
  icon: string
  onClick: () => void
  variant?: "default" | "outline" | "secondary"
  description?: string
}

interface QuickActionsProps {
  actions: QuickAction[]
  title?: string
  className?: string
}

export function QuickActions({
  actions,
  title = "Quick Actions",
  className,
}: QuickActionsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="flashlight-line" className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "outline"}
              onClick={action.onClick}
              className="h-auto p-4 flex flex-col items-center space-y-3 hover:shadow-md transition-all"
            >
              <div className="p-2 rounded-lg bg-muted/50">
                <Icon name={action.icon} className="h-5 w-5" />
              </div>
              <div className="text-center space-y-1">
                <div className="font-medium text-sm">{action.label}</div>
                {action.description && (
                  <BodySmall className="text-muted-foreground text-xs">
                    {action.description}
                  </BodySmall>
                )}
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Dashboard Layout Component
interface DashboardLayoutProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
  header?: React.ReactNode
  className?: string
}

export function DashboardLayout({
  children,
  sidebar,
  header,
  className,
}: DashboardLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {header && (
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            {header}
          </div>
        </header>
      )}
      <div className="flex">
        {sidebar && (
          <aside className="w-64 border-r bg-card min-h-screen">
            <div className="p-4">
              {sidebar}
            </div>
          </aside>
        )}
        <main className="flex-1">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

// Chart Placeholder Component
interface ChartPlaceholderProps {
  title: string
  description?: string
  height?: number
  className?: string
}

export function ChartPlaceholder({
  title,
  description,
  height = 300,
  className,
}: ChartPlaceholderProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="bar-chart-line" className="h-5 w-5" />
          {title}
        </CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <div
          className="relative border rounded-lg bg-background p-4"
          style={{ height: height - 48 }}
        >
          {/* Chart Area */}
          <div className="relative h-full">
            {/* Chart Header Legend */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <BodySmall className="font-medium">Revenue</BodySmall>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <BodySmall className="font-medium">Growth</BodySmall>
              </div>
            </div>

            {/* Y-axis labels */}
            <div className="absolute left-0 top-8 bottom-0 flex flex-col justify-between text-xs text-muted-foreground">
              <span>$150k</span>
              <span>$100k</span>
              <span>$50k</span>
              <span>$0</span>
            </div>

            {/* Chart bars and line */}
            <div className="ml-12 h-full flex items-end justify-between gap-2" style={{ height: 'calc(100% - 32px)' }}>
              {/* Bar Chart */}
              <div className="flex-1 flex items-end justify-between gap-1">
                {[
                  { value: 85, height: 85, label: 'Jan' },
                  { value: 78, height: 78, label: 'Feb' },
                  { value: 82, height: 82, label: 'Mar' },
                  { value: 65, height: 65, label: 'Apr' },
                  { value: 72, height: 72, label: 'May' },
                  { value: 58, height: 58, label: 'Jun' },
                  { value: 45, height: 45, label: 'Jul' },
                  { value: 52, height: 52, label: 'Aug' },
                  { value: 38, height: 38, label: 'Sep' },
                  { value: 48, height: 48, label: 'Oct' },
                  { value: 32, height: 32, label: 'Nov' },
                  { value: 25, height: 25, label: 'Dec' }
                ].map((bar, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-primary/20 rounded-t-sm relative group"
                      style={{ height: `${bar.height}%` }}
                    >
                      <div className="absolute inset-0 bg-primary/40 rounded-t-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{bar.label}</div>
                  </div>
                ))}
              </div>

              {/* Line Chart Overlay */}
              <svg className="absolute inset-0 ml-12 pointer-events-none" style={{ height: 'calc(100% - 52px)', top: '32px' }}>
                <polyline
                  fill="none"
                  stroke="rgb(34 197 94)"
                  strokeWidth="2"
                  points="
                    0,85 8.33,78 16.67,82 25,65 33.33,72 41.67,58 50,45 58.33,52 66.67,38 75,48 83.33,32 91.67,25
                  "
                />
                {/* Data points */}
                <circle cx="0" cy="85" r="3" fill="rgb(34 197 94)" />
                <circle cx="8.33" cy="78" r="3" fill="rgb(34 197 94)" />
                <circle cx="16.67" cy="82" r="3" fill="rgb(34 197 94)" />
                <circle cx="25" cy="65" r="3" fill="rgb(34 197 94)" />
                <circle cx="33.33" cy="72" r="3" fill="rgb(34 197 94)" />
                <circle cx="41.67" cy="58" r="3" fill="rgb(34 197 94)" />
                <circle cx="50" cy="45" r="3" fill="rgb(34 197 94)" />
                <circle cx="58.33" cy="52" r="3" fill="rgb(34 197 94)" />
                <circle cx="66.67" cy="38" r="3" fill="rgb(34 197 94)" />
                <circle cx="75" cy="48" r="3" fill="rgb(34 197 94)" />
                <circle cx="83.33" cy="32" r="3" fill="rgb(34 197 94)" />
                <circle cx="91.67" cy="25" r="3" fill="rgb(34 197 94)" />
              </svg>
            </div>

            {/* Grid lines */}
            <div className="absolute inset-0 ml-12 pointer-events-none" style={{ top: '32px', height: 'calc(100% - 32px)' }}>
              <div className="h-full flex flex-col justify-between">
                <div className="border-t border-muted/20"></div>
                <div className="border-t border-muted/20"></div>
                <div className="border-t border-muted/20"></div>
                <div className="border-t border-muted/20"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Chart Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">Monthly Revenue</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-muted-foreground">Trend Line</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Last updated: 2 min ago
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
