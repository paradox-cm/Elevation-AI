"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { H3, H4, BodySmall } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTabs, ResponsiveTabsContent, ResponsiveTabsList, ResponsiveTabsTrigger } from "@/components/ui/responsive-tabs"
import { Separator } from "@/components/ui/separator"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { useAnalyticsConfig } from "@/hooks/use-analytics-config"
import {
  AnalyticsMetric,
  ChartContainer,
  SimpleBarChart,
  ProgressChart,
  AnalyticsHeader,
  KPIGrid,
  AnalyticsSummary,
  AnalyticsTable,
  ChartPlaceholder,
  AnalyticsFilter,
} from "@/components/ui/analytics"

export default function AnalyticsPage() {
  const {
    config,
    metricConfig,
    chartConfig,
    dataVisualizationConfig,
    analyticsFilterConfig,
    analyticsDashboardConfig,
    analyticsReportConfig,
    analyticsTrackingConfig
  } = useAnalyticsConfig()

  const [activeTab, setActiveTab] = useState("overview")
  const [period, setPeriod] = useState("30d")

  // Sample analytics data
  const kpiData = [
    {
      title: "Total Revenue",
      value: 124563,
      change: { value: 12.5, isPositive: true, period: "last month" },
      icon: "money-dollar-circle-line",
      iconColor: "text-green-500",
      format: "currency" as const,
    },
    {
      title: "Active Users",
      value: 2847,
      change: { value: 8.2, isPositive: true, period: "last week" },
      icon: "user-line",
      iconColor: "text-blue-500",
      format: "number" as const,
    },
    {
      title: "Conversion Rate",
      value: 3.24,
      change: { value: 2.1, isPositive: false, period: "last month" },
      icon: "percent-line",
      iconColor: "text-yellow-500",
      format: "percentage" as const,
    },
    {
      title: "Support Tickets",
      value: 156,
      change: { value: 15.3, isPositive: false, period: "last week" },
      icon: "customer-service-line",
      iconColor: "text-red-500",
      format: "number" as const,
    },
  ]

  const barChartData = [
    { label: "January", value: 45000, color: "bg-blue-500" },
    { label: "February", value: 52000, color: "bg-blue-500" },
    { label: "March", value: 48000, color: "bg-blue-500" },
    { label: "April", value: 61000, color: "bg-blue-500" },
    { label: "May", value: 55000, color: "bg-blue-500" },
    { label: "June", value: 67000, color: "bg-blue-500" },
  ]

  const progressData = [
    {
      label: "Monthly Sales Target",
      value: 85000,
      target: 100000,
      unit: "$",
      description: "85% of target achieved",
    },
    {
      label: "Customer Satisfaction",
      value: 4.8,
      target: 5.0,
      unit: "",
      description: "Based on 1,234 reviews",
    },
    {
      label: "Website Performance",
      value: 98.5,
      target: 99.0,
      unit: "%",
      description: "Uptime this month",
    },
  ]

  const analyticsTableData = [
    {
      id: "1",
      name: "Product A",
      value: 45600,
      change: 12.5,
      trend: "up" as const,
    },
    {
      id: "2",
      name: "Product B",
      value: 32400,
      change: 8.2,
      trend: "up" as const,
    },
    {
      id: "3",
      name: "Product C",
      value: 28900,
      change: 3.1,
      trend: "down" as const,
    },
    {
      id: "4",
      name: "Product D",
      value: 15600,
      change: 15.3,
      trend: "down" as const,
    },
  ]

  const summaryMetrics = [
    {
      label: "Total Orders",
      value: "1,234",
      description: "Orders this month",
      trend: "up" as const,
    },
    {
      label: "Average Order Value",
      value: "$89.45",
      description: "Per customer",
      trend: "up" as const,
    },
    {
      label: "Customer Retention",
      value: "94.2%",
      description: "Monthly retention rate",
      trend: "stable" as const,
    },
    {
      label: "Support Response Time",
      value: "2.3h",
      description: "Average response time",
      trend: "down" as const,
    },
  ]

  const filters = [
    {
      key: "period",
      label: "Time Period",
      options: [
        { value: "7d", label: "Last 7 days" },
        { value: "30d", label: "Last 30 days" },
        { value: "90d", label: "Last 90 days" },
        { value: "1y", label: "Last year" },
      ],
      value: period,
    },
    {
      key: "region",
      label: "Region",
      options: [
        { value: "all", label: "All Regions" },
        { value: "us", label: "United States" },
        { value: "eu", label: "Europe" },
        { value: "asia", label: "Asia Pacific" },
      ],
      value: "all",
    },
  ]

  const handleFilterChange = (key: string, value: string) => {
    if (key === "period") {
      setPeriod(value)
    }
    console.log("Filter changed:", key, value)
  }

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container>
          <Section paddingY="xl">
            <PageHeader
              title="Analytics Components"
              description="Comprehensive analytics and data visualization components for building powerful business intelligence and reporting interfaces."
              size="lg"
              centered
            />
          </Section>





          {/* Analytics System Overview */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="bar-chart-box-line" className="h-5 w-5" />
                  Analytics System Overview
                </CardTitle>
                <CardDescription>
                  Our analytics components provide everything you need to build comprehensive business intelligence and data visualization interfaces.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="bar-chart-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Data Visualization</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Charts, graphs, and interactive data displays
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="dashboard-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Metrics & KPIs</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Key performance indicators and metric displays
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="filter-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Analytics Tools</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Filters, date ranges, and data exploration tools
                    </BodySmall>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Analytics Components Showcase */}
          <Section paddingY="lg">
            <ResponsiveTabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <ResponsiveTabsList className="grid w-full grid-cols-4">
                <ResponsiveTabsTrigger value="overview">Overview</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="metrics">Metrics</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="charts">Charts</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="tools">Tools</ResponsiveTabsTrigger>
              </ResponsiveTabsList>

              {/* Analytics Overview */}
              <ResponsiveTabsContent value="overview" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Complete Analytics Dashboard</CardTitle>
                    <CardDescription>
                      A comprehensive analytics dashboard showing all key business metrics and data visualizations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Analytics Header */}
                    <AnalyticsHeader
                      title="Business Analytics Dashboard"
                      description="Comprehensive overview of key business metrics and performance indicators"
                      period={period}
                      onPeriodChange={setPeriod}
                    />

                    {/* KPI Grid */}
                    <div>
                      <H3 className="mb-4">Key Performance Indicators</H3>
                      <KPIGrid kpis={kpiData} />
                    </div>

                    <Separator />

                    {/* Charts Section */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <ChartContainer
                        title="Revenue Trend"
                        description="Monthly revenue performance"
                      >
                        <SimpleBarChart data={barChartData} height={250} />
                      </ChartContainer>
                      <ChartContainer
                        title="Progress Metrics"
                        description="Target achievement tracking"
                      >
                        <ProgressChart data={progressData} />
                      </ChartContainer>
                    </div>

                    <Separator />

                    {/* Analytics Summary */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <AnalyticsSummary
                        title="Performance Summary"
                        metrics={summaryMetrics}
                      />
                      <AnalyticsTable
                        title="Top Products"
                        data={analyticsTableData}
                      />
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Metrics Showcase */}
              <ResponsiveTabsContent value="metrics" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics Metrics Components</CardTitle>
                    <CardDescription>
                      Various ways to display business metrics and analytics data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Analytics Metrics */}
                    <div>
                      <H3 className="mb-4">Analytics Metrics</H3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {kpiData.map((kpi, index) => (
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
                    </div>

                    <Separator />

                    {/* Metric Variations */}
                    <div>
                      <H3 className="mb-4">Metric Display Variations</H3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <AnalyticsMetric
                          title="Revenue"
                          value={124563}
                          change={{ value: 12.5, isPositive: true, period: "last month" }}
                          format="currency"
                          icon="money-dollar-circle-line"
                          iconColor="text-green-500"
                        />
                        <AnalyticsMetric
                          title="Users"
                          value={2847}
                          change={{ value: 8.2, isPositive: true, period: "last week" }}
                          format="number"
                          icon="user-line"
                          iconColor="text-blue-500"
                        />
                        <AnalyticsMetric
                          title="Conversion"
                          value={3.24}
                          change={{ value: 2.1, isPositive: false, period: "last month" }}
                          format="percentage"
                          icon="trending-up-line"
                          iconColor="text-yellow-500"
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Progress Charts */}
                    <div>
                      <H3 className="mb-4">Progress Tracking</H3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {progressData.map((item, index) => (
                          <div key={index} className="space-y-4">
                            <H4>{item.label}</H4>
                            <ProgressChart data={[item]} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Charts Showcase */}
              <ResponsiveTabsContent value="charts" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Chart & Visualization Components</CardTitle>
                    <CardDescription>
                      Various chart types and data visualization components
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Simple Bar Chart */}
                    <div>
                      <H3 className="mb-4">Simple Bar Chart</H3>
                      <ChartContainer
                        title="Monthly Revenue"
                        description="Revenue performance over the last 6 months"
                      >
                        <SimpleBarChart data={barChartData} height={300} />
                      </ChartContainer>
                    </div>

                    <Separator />

                    {/* Chart Placeholders */}
                    <div>
                      <H3 className="mb-4">Chart Placeholders</H3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <ChartPlaceholder
                          title="Line Chart"
                          description="Revenue trend over time"
                          chartType="line"
                          height={250}
                        />
                        <ChartPlaceholder
                          title="Pie Chart"
                          description="Revenue by product category"
                          chartType="pie"
                          height={250}
                        />
                        <ChartPlaceholder
                          title="Area Chart"
                          description="User growth over time"
                          chartType="area"
                          height={250}
                        />
                        <ChartPlaceholder
                          title="Bar Chart"
                          description="Sales by region"
                          chartType="bar"
                          height={250}
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Chart Container Examples */}
                    <div>
                      <H3 className="mb-4">Chart Containers</H3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <ChartContainer
                          title="Revenue Analytics"
                          description="Detailed revenue breakdown and trends"
                          actions={
                            <Button size="sm" variant="outline">
                              <Icon name="download-line" className="h-4 w-4 mr-1" />
                              Export
                            </Button>
                          }
                        >
                          <SimpleBarChart data={barChartData.slice(0, 4)} height={200} />
                        </ChartContainer>
                        <ChartContainer
                          title="Performance Metrics"
                          description="Key performance indicators and targets"
                        >
                          <ProgressChart data={progressData} />
                        </ChartContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Analytics Tools Showcase */}
              <ResponsiveTabsContent value="tools" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics Tools & Filters</CardTitle>
                    <CardDescription>
                      Filters, data exploration tools, and analytics utilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Analytics Filters */}
                    <div>
                      <H3 className="mb-4">Analytics Filters</H3>
                      <AnalyticsFilter
                        filters={filters}
                        onFilterChange={handleFilterChange}
                      />
                    </div>

                    <Separator />

                    {/* Analytics Summary */}
                    <div>
                      <H3 className="mb-4">Analytics Summary</H3>
                      <AnalyticsSummary
                        title="Business Performance Summary"
                        metrics={summaryMetrics}
                      />
                    </div>

                    <Separator />

                    {/* Analytics Table */}
                    <div>
                      <H3 className="mb-4">Analytics Data Table</H3>
                      <AnalyticsTable
                        title="Product Performance"
                        data={analyticsTableData}
                      />
                    </div>

                    <Separator />

                    {/* Filter Examples */}
                    <div>
                      <H3 className="mb-4">Filter Examples</H3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Date Range Filter</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {["Last 7 days", "Last 30 days", "Last 90 days", "Custom range"].map((option) => (
                                <div key={option} className="flex items-center space-x-2">
                                  <div className="w-3 h-3 rounded-full bg-primary" />
                                  <BodySmall>{option}</BodySmall>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Category Filter</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {["All Categories", "Electronics", "Clothing", "Home & Garden", "Sports"].map((option) => (
                                <div key={option} className="flex items-center space-x-2">
                                  <div className="w-3 h-3 rounded-full bg-muted" />
                                  <BodySmall>{option}</BodySmall>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>
            </ResponsiveTabs>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
