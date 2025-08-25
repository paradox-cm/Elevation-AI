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
  variant?: "default" | "success" | "warning" | "error"
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
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "outline"}
              onClick={action.onClick}
              className="h-auto p-3 flex flex-col items-center space-y-2"
            >
              <Icon name={action.icon} className="h-5 w-5" />
              <div className="text-center">
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
      <CardContent>
        <div
          className="flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg bg-muted/25"
          style={{ height }}
        >
          <div className="text-center space-y-2">
            <Icon name="bar-chart-line" className="h-8 w-8 text-muted-foreground mx-auto" />
            <BodySmall className="text-muted-foreground">
              Chart visualization would appear here
            </BodySmall>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
