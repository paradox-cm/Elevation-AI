"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Grid } from "@/components/ui/layout/grid"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { H3, H4, BodySmall } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { useDashboardConfig } from "@/hooks/use-dashboard-config"
import {
  StatsCard,
  MetricDisplay,
  ProgressMetric,
  ActivityFeed,
  QuickActions,
  ChartPlaceholder,
} from "@/components/ui/dashboard"

export default function DashboardPage() {
  const {
    config,
    dashboardLayoutConfig,
    dashboardMetricConfig,
    dashboardWidgetConfig,
    dashboardChartConfig,
    dashboardActivityConfig,
    dashboardQuickActionsConfig,
    dashboardNavigationConfig
  } = useDashboardConfig()

  const [activeTab, setActiveTab] = useState("overview")

  // Sample data for dashboard components
  const statsData = [
    {
      title: "Total Revenue",
      value: "$124,563.00",
      description: "From 1,234 orders",
      trend: { value: 12.5, isPositive: true, period: "last month" },
      icon: "money-dollar-circle-line",
      iconColor: "text-green-500",
      variant: "success" as const,
    },
    {
      title: "Active Users",
      value: "2,847",
      description: "Across all platforms",
      trend: { value: 8.2, isPositive: true, period: "last week" },
      icon: "user-line",
      iconColor: "text-blue-500",
      variant: "info" as const,
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      description: "From 45,678 visits",
      trend: { value: 2.1, isPositive: false, period: "last month" },
      icon: "percent-line",
      iconColor: "text-orange-500",
      variant: "warning" as const,
    },
    {
      title: "Support Tickets",
      value: "156",
      description: "23 pending resolution",
      trend: { value: 15.3, isPositive: false, period: "last week" },
      icon: "customer-service-line",
      iconColor: "text-red-500",
      variant: "error" as const,
    },
  ]

  const activityData = [
    {
      id: "1",
      type: "success" as const,
      title: "New order completed",
      description: "Order #12345 has been successfully processed",
      timestamp: "2 minutes ago",
      user: { name: "Sarah Johnson" },
    },
    {
      id: "2",
      type: "info" as const,
      title: "System update completed",
      description: "Database maintenance completed successfully",
      timestamp: "15 minutes ago",
    },
    {
      id: "3",
      type: "warning" as const,
      title: "High server load detected",
      description: "Server CPU usage reached 85%",
      timestamp: "1 hour ago",
      user: { name: "System Monitor" },
    },
    {
      id: "4",
      type: "error" as const,
      title: "Payment processing failed",
      description: "Failed to process payment for order #12344",
      timestamp: "2 hours ago",
      user: { name: "Payment Gateway" },
    },
    {
      id: "5",
      type: "success" as const,
      title: "New user registered",
      description: "John Doe has joined the platform",
      timestamp: "3 hours ago",
      user: { name: "Registration System" },
    },
  ]

  const quickActions = [
    {
      label: "Add Product",
      icon: "add-line",
      onClick: () => console.log("Add product"),
      description: "Create new product",
    },
    {
      label: "View Orders",
      icon: "shopping-bag-line",
      onClick: () => console.log("View orders"),
      description: "Manage orders",
    },
    {
      label: "Analytics",
      icon: "bar-chart-line",
      onClick: () => console.log("View analytics"),
      description: "View reports",
    },
    {
      label: "Settings",
      icon: "settings-3-line",
      onClick: () => console.log("Open settings"),
      description: "Configure system",
    },
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
      target: 5,
      unit: "",
      description: "Based on 1,234 reviews",
    },
    {
      label: "Website Performance",
      value: 98.5,
      target: 99,
      unit: "%",
      description: "Uptime this month",
    },
    {
      label: "Uptime this month",
      value: 99.5,
      target: 100,
      unit: "%",
      description: "System uptime",
    },
  ]

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container size="2xl">
          <Section paddingY="xl">
            <PageHeader
              title="Dashboard"
              description="Complete dashboard interface showcasing real-time analytics, metrics, and business intelligence components."
              size="lg"
              centered
            />
          </Section>

          {/* Full Dashboard Mockup */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="dashboard-line" className="h-5 w-5" />
                  Live Dashboard Interface
                </CardTitle>
                <CardDescription>
                  A complete dashboard interface demonstrating real-world usage of our components
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-background border-b">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Icon name="dashboard-line" className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <H3>Elevation AI Analytics</H3>
                        <BodySmall className="text-muted-foreground">Real-time business intelligence</BodySmall>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm">
                        <Icon name="download-line" className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="settings-3-line" className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                      <Button size="sm">
                        <Icon name="refresh-line" className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-6 space-y-6">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {statsData.map((stat, index) => (
                        <StatsCard key={index} {...stat} />
                      ))}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Charts Section */}
                      <div className="lg:col-span-2 space-y-8">
                        {/* Revenue Chart */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              <span>Revenue Analytics</span>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">7D</Button>
                                <Button variant="outline" size="sm">30D</Button>
                                <Button variant="outline" size="sm">90D</Button>
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ChartPlaceholder
                              title="Revenue Trend"
                              description="Monthly revenue performance"
                              height={300}
                            />
                          </CardContent>
                        </Card>

                                                 {/* User Activity */}
                         <Card>
                           <CardHeader>
                             <CardTitle>User Activity Overview</CardTitle>
                           </CardHeader>
                           <CardContent>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div>
                                 <H4 className="mb-4">Top Performing Pages</H4>
                                 <div className="space-y-3">
                                   {[
                                     { page: "Dashboard", views: "12,847", growth: "+12%" },
                                     { page: "Analytics", views: "8,234", growth: "+8%" },
                                     { page: "Settings", views: "5,123", growth: "+5%" },
                                     { page: "Profile", views: "3,456", growth: "+3%" }
                                   ].map((item, index) => (
                                     <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                       <div>
                                         <BodySmall className="font-medium">{item.page}</BodySmall>
                                         <BodySmall className="text-muted-foreground">{item.views} views</BodySmall>
                                       </div>
                                       <Badge variant="secondary">{item.growth}</Badge>
                                     </div>
                                   ))}
                                 </div>
                               </div>
                               <div>
                                 <H4 className="mb-4">System Health</H4>
                                 <div className="space-y-4">
                                   {progressData.slice(0, 3).map((item, index) => (
                                     <ProgressMetric key={index} {...item} />
                                   ))}
                                 </div>
                               </div>
                             </div>
                           </CardContent>
                         </Card>

                         {/* Recent Activity */}
                         <Card>
                           <CardHeader>
                             <CardTitle>Recent Activity</CardTitle>
                           </CardHeader>
                           <CardContent>
                             <ActivityFeed
                               activities={activityData}
                               title=""
                               maxItems={6}
                             />
                           </CardContent>
                         </Card>
                      </div>

                                             {/* Sidebar */}
                       <div className="space-y-6">
                                                 {/* Quick Actions */}
                        <QuickActions
                          actions={quickActions}
                          title="Quick Actions"
                        />

                         {/* System Status */}
                        <Card>
                          <CardHeader>
                            <CardTitle>System Status</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {[
                                { service: "API Gateway", status: "operational", uptime: "99.9%" },
                                { service: "Database", status: "operational", uptime: "99.8%" },
                                { service: "CDN", status: "operational", uptime: "99.9%" },
                                { service: "Monitoring", status: "operational", uptime: "100%" }
                              ].map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                  <div>
                                    <BodySmall className="font-medium">{item.service}</BodySmall>
                                    <BodySmall className="text-muted-foreground">{item.uptime} uptime</BodySmall>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <BodySmall className="text-green-600">{item.status}</BodySmall>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Dashboard System Overview */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="dashboard-line" className="h-5 w-5" />
                  Dashboard System Overview
                </CardTitle>
                <CardDescription>
                  Our dashboard components provide everything you need to build comprehensive business intelligence interfaces.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="bar-chart-box-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Analytics & Metrics</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Real-time metrics, KPI cards, and trend indicators
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="time-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Activity Monitoring</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Activity feeds, progress tracking, and status updates
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="layout-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Dashboard Layouts</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Flexible layouts, sidebars, and responsive grids
                    </BodySmall>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Dashboard Components Showcase */}
          <Section paddingY="lg">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="layouts">Layouts</TabsTrigger>
              </TabsList>

              {/* Overview Dashboard */}
              <TabsContent value="overview" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Complete Dashboard Overview</CardTitle>
                    <CardDescription>
                      A comprehensive dashboard showing all key business metrics and activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Stats Cards */}
                    <div>
                      <H3 className="mb-4">Key Performance Indicators</H3>
                      <Grid cols={4} gap={4}>
                        {statsData.map((stat, index) => (
                          <StatsCard key={index} {...stat} />
                        ))}
                      </Grid>
                    </div>

                    <Separator />

                    {/* Progress Metrics */}
                    <div>
                      <H3 className="mb-4">Progress Tracking</H3>
                      <div className="grid md:grid-cols-4 gap-6">
                        {progressData.map((item, index) => (
                          <ProgressMetric key={index} {...item} />
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Quick Actions and Activity */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <QuickActions
                        actions={quickActions}
                        title="Quick Actions"
                      />
                      <ActivityFeed
                        activities={activityData}
                        title="Recent Activity"
                        maxItems={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Metrics Showcase */}
              <TabsContent value="metrics" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Metrics & Analytics Components</CardTitle>
                    <CardDescription>
                      Various ways to display business metrics and analytics data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Stats Cards Variations */}
                    <div>
                      <H3 className="mb-4">Stats Cards</H3>
                      <Grid cols={2} gap={4}>
                        {statsData.slice(0, 4).map((stat, index) => (
                          <StatsCard key={index} {...stat} />
                        ))}
                      </Grid>
                    </div>

                    <Separator />

                    {/* Metric Displays */}
                    <div>
                      <H3 className="mb-4">Metric Displays</H3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <MetricDisplay
                          label="Revenue"
                          value="124,563"
                          unit="$"
                          description="Total revenue this month"
                          status="success"
                          size="lg"
                        />
                        <MetricDisplay
                          label="Users"
                          value="2,847"
                          description="Active users"
                          status="info"
                          size="md"
                        />
                        <MetricDisplay
                          label="Conversion"
                          value="3.24"
                          unit="%"
                          description="Conversion rate"
                          status="warning"
                          size="sm"
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Progress Metrics */}
                    <div>
                      <H3 className="mb-4">Progress Metrics</H3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {progressData.map((item, index) => (
                          <ProgressMetric key={index} {...item} />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Feed Showcase */}
              <TabsContent value="activity" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity & Monitoring Components</CardTitle>
                    <CardDescription>
                      Components for displaying real-time activity feeds and system monitoring
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Activity Feed */}
                    <div>
                      <H3 className="mb-4">Activity Feed</H3>
                      <ActivityFeed
                        activities={activityData}
                        title="System Activity"
                        maxItems={5}
                      />
                    </div>

                    <Separator />

                    {/* Quick Actions */}
                    <div>
                      <H3 className="mb-4">Quick Actions</H3>
                      <QuickActions
                        actions={quickActions}
                        title="Common Actions"
                      />
                    </div>

                    <Separator />

                    {/* Chart Placeholders */}
                    <div>
                      <H3 className="mb-4">Chart Components</H3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <ChartPlaceholder
                          title="Revenue Trend"
                          description="Monthly revenue over time"
                          height={250}
                        />
                        <ChartPlaceholder
                          title="User Distribution"
                          description="Users by region"
                          height={250}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Layouts Showcase */}
              <TabsContent value="layouts" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dashboard Layouts</CardTitle>
                    <CardDescription>
                      Different dashboard layout patterns and structures
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Simple Dashboard Layout */}
                    <div>
                      <H3 className="mb-4">Simple Dashboard Layout</H3>
                      <div className="border rounded-lg p-4 bg-muted/25">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                          {statsData.slice(0, 4).map((stat, index) => (
                            <div key={index} className="bg-background p-4 rounded-lg border">
                              <div className="flex items-center justify-between">
                                <div>
                                  <BodySmall className="text-muted-foreground">{stat.title}</BodySmall>
                                  <div className="text-xl font-bold">{stat.value}</div>
                                </div>
                                <Icon name={stat.icon} className="h-6 w-6 text-muted-foreground" />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-background p-4 rounded-lg border">
                            <H4 className="mb-2">Recent Activity</H4>
                            <div className="space-y-2">
                              {activityData.slice(0, 3).map((activity) => (
                                <div key={activity.id} className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                  <BodySmall className="flex-1">{activity.title}</BodySmall>
                                  <BodySmall className="text-muted-foreground text-xs">
                                    {activity.timestamp}
                                  </BodySmall>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-background p-4 rounded-lg border">
                            <H4 className="mb-2">Quick Actions</H4>
                            <div className="grid grid-cols-2 gap-2">
                              {quickActions.slice(0, 4).map((action, index) => (
                                <Button key={index} variant="outline" size="sm" className="h-auto p-2">
                                  <div className="text-center">
                                    <Icon name={action.icon} className="h-4 w-4 mx-auto mb-1" />
                                    <BodySmall className="text-xs">{action.label}</BodySmall>
                                  </div>
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Sidebar Layout Example */}
                    <div>
                      <H3 className="mb-4">Sidebar Layout Example</H3>
                      <div className="border rounded-lg bg-muted/25">
                        <div className="flex">
                          <div className="w-64 bg-background border-r p-4">
                            <H4 className="mb-4">Navigation</H4>
                            <div className="space-y-2">
                              {["Dashboard", "Analytics", "Users", "Settings"].map((item) => (
                                <div key={item} className="p-2 rounded hover:bg-muted cursor-pointer">
                                  <BodySmall>{item}</BodySmall>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex-1 p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                              {statsData.slice(0, 3).map((stat, index) => (
                                <div key={index} className="bg-background p-4 rounded-lg border">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <BodySmall className="text-muted-foreground">{stat.title}</BodySmall>
                                      <div className="text-lg font-bold">{stat.value}</div>
                                    </div>
                                    <Icon name={stat.icon} className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="bg-background p-4 rounded-lg border">
                              <H4 className="mb-2">Main Content Area</H4>
                              <BodySmall className="text-muted-foreground">
                                This is where your main dashboard content would go.
                              </BodySmall>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
