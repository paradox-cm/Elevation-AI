"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import Icon from "@/components/ui/icon"
import { H3, H4, BodySmall } from "@/components/ui/typography"

// Analytics Metric Card Component
interface AnalyticsMetricProps {
  title: string
  value: string | number
  change?: {
    value: number
    isPositive: boolean
    period: string
  }
  trend?: "up" | "down" | "stable"
  icon?: string
  iconColor?: string
  format?: "number" | "currency" | "percentage" | "duration"
  className?: string
}

export function AnalyticsMetric({
  title,
  value,
  change,
  trend,
  icon,
  iconColor = "text-primary",
  format = "number",
  className,
}: AnalyticsMetricProps) {
  const formatValue = (val: string | number) => {
    switch (format) {
      case "currency":
        return typeof val === "number" ? `$${val.toLocaleString()}` : val
      case "percentage":
        return typeof val === "number" ? `${val}%` : val
      case "duration":
        return typeof val === "number" ? `${val}h` : val
      default:
        return typeof val === "number" ? val.toLocaleString() : val
    }
  }

  return (
    <Card className={cn("transition-all hover:shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <BodySmall className="text-muted-foreground font-medium">{title}</BodySmall>
            <div className="text-2xl font-bold">{formatValue(value)}</div>
            {change && (
              <div className="flex items-center gap-1">
                <Icon
                  name={change.isPositive ? "arrow-up-line" : "arrow-down-line"}
                  className={cn(
                    "h-3 w-3",
                    change.isPositive ? "text-green-500" : "text-red-500"
                  )}
                />
                <BodySmall
                  className={cn(
                    "font-medium",
                    change.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}
                >
                  {Math.abs(change.value)}%
                </BodySmall>
                <BodySmall className="text-muted-foreground">
                  vs {change.period}
                </BodySmall>
              </div>
            )}
          </div>
          {icon && (
            <div className={cn("p-3 rounded-lg bg-muted", iconColor)}>
              <Icon name={icon} className="h-6 w-6" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Chart Container Component
interface ChartContainerProps {
  title: string
  description?: string
  children: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export function ChartContainer({
  title,
  description,
  children,
  actions,
  className,
}: ChartContainerProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Icon name="bar-chart-line" className="h-5 w-5" />
              {title}
            </CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

// Simple Bar Chart Component
interface BarChartData {
  label: string
  value: number
  color?: string
}

interface SimpleBarChartProps {
  data: BarChartData[]
  maxValue?: number
  height?: number
  className?: string
}

export function SimpleBarChart({
  data,
  maxValue,
  height = 200,
  className,
}: SimpleBarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value))
  const maxBarHeight = height - 40 // Account for labels

  return (
    <div className={cn("space-y-3", className)}>
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex items-center justify-between">
            <BodySmall className="font-medium">{item.label}</BodySmall>
            <BodySmall className="text-muted-foreground">{item.value}</BodySmall>
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-300",
                item.color || "bg-primary"
              )}
              style={{
                width: `${(item.value / max) * 100}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// Progress Chart Component
interface ProgressChartProps {
  data: Array<{
    label: string
    value: number
    target: number
    color?: string
  }>
  className?: string
}

export function ProgressChart({
  data,
  className,
}: ProgressChartProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {data.map((item, index) => {
        const percentage = Math.min((item.value / item.target) * 100, 100)
        return (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <BodySmall className="font-medium">{item.label}</BodySmall>
              <BodySmall className="text-muted-foreground">
                {item.value} / {item.target}
              </BodySmall>
            </div>
            <Progress
              value={percentage}
              className="h-2"
              style={{
                "--progress-background": item.color || "hsl(var(--primary))",
              } as React.CSSProperties}
            />
            <BodySmall className="text-muted-foreground text-right">
              {percentage.toFixed(1)}%
            </BodySmall>
          </div>
        )
      })}
    </div>
  )
}

// Analytics Dashboard Header Component
interface AnalyticsHeaderProps {
  title: string
  description?: string
  period?: string
  onPeriodChange?: (period: string) => void
  className?: string
}

export function AnalyticsHeader({
  title,
  description,
  period = "30d",
  onPeriodChange,
  className,
}: AnalyticsHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <H3 className="flex items-center gap-2">
            <Icon name="bar-chart-box-line" className="h-6 w-6" />
            {title}
          </H3>
          {description && (
            <BodySmall className="text-muted-foreground mt-1">
              {description}
            </BodySmall>
          )}
        </div>
        {onPeriodChange && (
          <Select value={period} onValueChange={onPeriodChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  )
}

// KPI Grid Component
interface KPIGridProps {
  kpis: Array<{
    title: string
    value: string | number
    change?: {
      value: number
      isPositive: boolean
      period: string
    }
    icon?: string
    iconColor?: string
    format?: "number" | "currency" | "percentage" | "duration"
  }>
  className?: string
}

export function KPIGrid({
  kpis,
  className,
}: KPIGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {kpis.map((kpi, index) => (
        <AnalyticsMetric
          key={index}
          title={kpi.title}
          value={kpi.value}
          change={kpi.change}
          icon={kpi.icon}
          iconColor={kpi.iconColor}
          format={kpi.format}
        />
      ))}
    </div>
  )
}

// Analytics Summary Component
interface AnalyticsSummaryProps {
  title: string
  metrics: Array<{
    label: string
    value: string | number
    description?: string
    trend?: "up" | "down" | "stable"
  }>
  className?: string
}

export function AnalyticsSummary({
  title,
  metrics,
  className,
}: AnalyticsSummaryProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="pie-chart-line" className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                <div>
                  <BodySmall className="font-medium">{metric.label}</BodySmall>
                  {metric.description && (
                    <BodySmall className="text-muted-foreground">
                      {metric.description}
                    </BodySmall>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{metric.value}</span>
                  {metric.trend && (
                    <Icon
                      name={
                        metric.trend === "up" ? "arrow-up-line" :
                        metric.trend === "down" ? "arrow-down-line" : "arrow-right-line"
                      }
                      className={cn(
                        "h-3 w-3",
                        metric.trend === "up" ? "text-green-500" :
                        metric.trend === "down" ? "text-red-500" : "text-gray-500"
                      )}
                    />
                  )}
                </div>
              </div>
              {index < metrics.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Data Table with Analytics Component
interface AnalyticsTableProps {
  title: string
  data: Array<{
    id: string
    name: string
    value: number
    change: number
    trend: "up" | "down" | "stable"
  }>
  className?: string
}

export function AnalyticsTable({
  title,
  data,
  className,
}: AnalyticsTableProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="table-line" className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div>
                  <BodySmall className="font-medium">{item.name}</BodySmall>
                  <BodySmall className="text-muted-foreground">
                    {item.value.toLocaleString()}
                  </BodySmall>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon
                  name={
                    item.trend === "up" ? "arrow-up-line" :
                    item.trend === "down" ? "arrow-down-line" : "arrow-right-line"
                  }
                  className={cn(
                    "h-3 w-3",
                    item.trend === "up" ? "text-green-500" :
                    item.trend === "down" ? "text-red-500" : "text-gray-500"
                  )}
                />
                <BodySmall
                  className={cn(
                    "font-medium",
                    item.trend === "up" ? "text-green-600 dark:text-green-400" :
                    item.trend === "down" ? "text-red-600 dark:text-red-400" : "text-gray-600"
                  )}
                >
                  {item.change > 0 ? "+" : ""}{item.change}%
                </BodySmall>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Chart Placeholder with Customization
interface ChartPlaceholderProps {
  title: string
  description?: string
  height?: number
  chartType?: "bar" | "line" | "pie" | "area"
  className?: string
}

export function ChartPlaceholder({
  title,
  description,
  height = 300,
  chartType = "bar",
  className,
}: ChartPlaceholderProps) {
  const chartIcons = {
    bar: "bar-chart-line",
    line: "line-chart-line",
    pie: "pie-chart-line",
    area: "area-chart-line",
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name={chartIcons[chartType]} className="h-5 w-5" />
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
            <Icon name={chartIcons[chartType]} className="h-8 w-8 text-muted-foreground mx-auto" />
            <BodySmall className="text-muted-foreground">
              {chartType.charAt(0).toUpperCase() + chartType.slice(1)} chart would appear here
            </BodySmall>
            <BodySmall className="text-muted-foreground text-xs">
              Connect your charting library (Chart.js, Recharts, etc.)
            </BodySmall>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Analytics Filter Component
interface AnalyticsFilterProps {
  filters: Array<{
    key: string
    label: string
    options: Array<{ value: string; label: string }>
    value: string
  }>
  onFilterChange: (key: string, value: string) => void
  className?: string
}

export function AnalyticsFilter({
  filters,
  onFilterChange,
  className,
}: AnalyticsFilterProps) {
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {filters.map((filter) => (
        <div key={filter.key} className="flex items-center gap-2">
          <BodySmall className="font-medium">{filter.label}:</BodySmall>
          <Select value={filter.value} onValueChange={(value) => onFilterChange(filter.key, value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  )
}
