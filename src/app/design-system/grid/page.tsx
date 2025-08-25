"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { H3, P } from "@/components/ui/typography"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"

export default function GridPage() {
  const [activeBreakpoint] = useState("desktop")

  const breakpoints = [
    { id: "mobile", name: "Mobile", width: "320px", cols: 4 },
    { id: "tablet", name: "Tablet", width: "768px", cols: 8 },
    { id: "desktop", name: "Desktop", width: "1024px", cols: 12 },
    { id: "wide", name: "Wide", width: "1440px", cols: 12 },
  ]

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
    >
      <Container>
        <Section paddingY="xl">
          <PageHeader
            title="Grid System"
            description="A responsive 12-column grid system that adapts to different screen sizes and provides consistent spacing and alignment."
            size="lg"
            centered
          />
        </Section>

        {/* Grid Overview */}
        <Section paddingY="lg">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="grid-line" className="h-5 w-5" />
                Grid Overview
              </CardTitle>
              <CardDescription>
                Our grid system is built on a 12-column foundation that scales from mobile to desktop, 
                providing consistent spacing and alignment across all screen sizes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <H3 className="mb-3">Key Principles</H3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name="responsive-line" className="h-4 w-4 text-primary" />
                        <span className="font-semibold">Responsive</span>
                      </div>
                      <P className="text-sm text-muted-foreground">
                        Automatically adapts to different screen sizes with appropriate column counts
                      </P>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name="ruler-line" className="h-4 w-4 text-primary" />
                        <span className="font-semibold">Consistent</span>
                      </div>
                      <P className="text-sm text-muted-foreground">
                        Uniform spacing and alignment using standardized gutters and margins
                      </P>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name="flexibility-line" className="h-4 w-4 text-primary" />
                        <span className="font-semibold">Flexible</span>
                      </div>
                      <P className="text-sm text-muted-foreground">
                        Supports various layout patterns from simple cards to complex dashboards
                      </P>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <H3 className="mb-3">Breakpoints</H3>
                  <div className="grid md:grid-cols-4 gap-4">
                    {breakpoints.map((breakpoint) => (
                      <div key={breakpoint.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{breakpoint.name}</span>
                          <Badge variant="outline">{breakpoint.width}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {breakpoint.cols} columns
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-primary transition-all duration-300 ${
                              activeBreakpoint === breakpoint.id ? 'opacity-100' : 'opacity-30'
                            }`}
                            style={{ width: `${(breakpoint.cols / 12) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Interactive Grid Examples */}
        <Section paddingY="lg">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="layout-line" className="h-5 w-5" />
                Interactive Grid Examples
              </CardTitle>
              <CardDescription>
                Explore different grid layouts and see how they adapt across breakpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="cards">Cards</TabsTrigger>
                  <TabsTrigger value="form">Form</TabsTrigger>
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-4">
                  <div className="space-y-2">
                    <H3>Content Layout</H3>
                    <P className="text-sm text-muted-foreground">
                      Standard layout with sidebar navigation and main content area
                    </P>
                  </div>
                  <div className="grid grid-cols-12 gap-4 p-4 bg-muted/20 rounded-lg">
                    <div className="col-span-12 md:col-span-3 h-20 bg-blue-100 dark:bg-blue-900/20 rounded flex items-center justify-center">
                      <span className="text-sm font-medium">Sidebar</span>
                    </div>
                    <div className="col-span-12 md:col-span-9 h-20 bg-green-100 dark:bg-green-900/20 rounded flex items-center justify-center">
                      <span className="text-sm font-medium">Main Content</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cards" className="space-y-4">
                  <div className="space-y-2">
                    <H3>Card Grid</H3>
                    <P className="text-sm text-muted-foreground">
                      Responsive card layout that adapts from 1 column on mobile to 3 on desktop
                    </P>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-32 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium">Card {i}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="form" className="space-y-4">
                  <div className="space-y-2">
                    <H3>Form Layout</H3>
                    <P className="text-sm text-muted-foreground">
                      Form layout with labels and input fields using grid alignment
                    </P>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-12 md:col-span-3 h-10 bg-gray-100 dark:bg-gray-800 rounded flex items-center px-3">
                          <span className="text-sm">Label {i}</span>
                        </div>
                        <div className="col-span-12 md:col-span-9 h-10 bg-white dark:bg-gray-700 border rounded flex items-center px-3">
                          <span className="text-sm text-muted-foreground">Input field {i}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="dashboard" className="space-y-4">
                  <div className="space-y-2">
                    <H3>Dashboard Layout</H3>
                    <P className="text-sm text-muted-foreground">
                      Complex dashboard layout with header, sidebar, main content, and widgets
                    </P>
                  </div>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 h-16 bg-red-100 dark:bg-red-900/20 rounded flex items-center justify-center">
                      <span className="text-sm font-medium">Header</span>
                    </div>
                    <div className="col-span-12 md:col-span-3 h-64 bg-blue-100 dark:bg-blue-900/20 rounded flex items-center justify-center">
                      <span className="text-sm font-medium">Sidebar</span>
                    </div>
                    <div className="col-span-12 md:col-span-6 h-64 bg-green-100 dark:bg-green-900/20 rounded flex items-center justify-center">
                      <span className="text-sm font-medium">Main Content</span>
                    </div>
                    <div className="col-span-12 md:col-span-3 h-64 bg-yellow-100 dark:bg-yellow-900/20 rounded flex items-center justify-center">
                      <span className="text-sm font-medium">Widget</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </Section>

        {/* Grid Specifications */}
        <Section paddingY="lg">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="settings-3-line" className="h-5 w-5" />
                Grid Specifications
              </CardTitle>
              <CardDescription>
                Technical details and implementation guidelines for the grid system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <H3 className="mb-3">Column System</H3>
                  <div className="grid grid-cols-12 gap-2 p-4 bg-muted/20 rounded-lg">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="h-8 bg-primary/20 rounded flex items-center justify-center text-xs font-medium">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <H3 className="mb-3">Spacing Scale</H3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Gutter (gap)</span>
                        <Badge variant="outline">1rem (16px)</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Margin</span>
                        <Badge variant="outline">1.5rem (24px)</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Container max-width</span>
                        <Badge variant="outline">1200px</Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Mobile breakpoint</span>
                        <Badge variant="outline">≥ 320px</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Tablet breakpoint</span>
                        <Badge variant="outline">≥ 768px</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Desktop breakpoint</span>
                        <Badge variant="outline">≥ 1024px</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <H3 className="mb-3">Usage Guidelines</H3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="check-line" className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Use semantic class names</span>
                        <P className="text-sm text-muted-foreground">
                          Prefer descriptive class names like <code>col-span-6</code> over arbitrary values
                        </P>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="check-line" className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Plan for mobile first</span>
                        <P className="text-sm text-muted-foreground">
                          Design layouts starting from mobile and progressively enhance for larger screens
                        </P>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="check-line" className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Maintain visual hierarchy</span>
                        <P className="text-sm text-muted-foreground">
                          Use grid spans to create clear visual relationships between content areas
                        </P>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>
      </Container>
    </AppShell>
    </PageWrapper>
  )
}
