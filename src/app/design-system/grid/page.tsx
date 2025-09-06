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
import { ResponsiveTabs, ResponsiveTabsContent, ResponsiveTabsList, ResponsiveTabsTrigger } from "@/components/ui/responsive-tabs"
import { Separator } from "@/components/ui/separator"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import {
  breakpoints,
  gridPrinciples,
  gridLayouts,
  gridSpecifications,
  gridFoundation,
  cssCustomProperties,
  tailwindClasses,
  usageGuidelines,
  implementationExamples
} from "@/lib/grid-config"

export default function GridPage() {
  const [activeBreakpoint] = useState("desktop")

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
                        {gridPrinciples[0].description}
                      </P>
                      <div className="space-y-1">
                        {gridPrinciples[0].examples.map((example) => (
                          <div key={example} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            <P className="text-xs text-muted-foreground">{example}</P>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name="ruler-line" className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{gridPrinciples[1].title}</span>
                      </div>
                      <P className="text-sm text-muted-foreground">
                        {gridPrinciples[1].description}
                      </P>
                      <div className="space-y-1">
                        {gridPrinciples[1].examples.map((example) => (
                          <div key={example} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            <P className="text-xs text-muted-foreground">{example}</P>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name="flexibility-line" className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{gridPrinciples[2].title}</span>
                      </div>
                      <P className="text-sm text-muted-foreground">
                        {gridPrinciples[2].description}
                      </P>
                      <div className="space-y-1">
                        {gridPrinciples[2].examples.map((example) => (
                          <div key={example} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            <P className="text-xs text-muted-foreground">{example}</P>
                          </div>
                        ))}
                      </div>
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
                        <div className="text-sm text-muted-foreground mb-2">
                          {breakpoint.cols} columns
                        </div>
                        <div className="space-y-1">
                          {breakpoint.usage.map((usage, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full"></div>
                              <P className="text-xs text-muted-foreground">{usage}</P>
                            </div>
                          ))}
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
              <ResponsiveTabs defaultValue="content" className="w-full">
                <ResponsiveTabsList className="grid w-full grid-cols-4">
                  <ResponsiveTabsTrigger value="content">Content</ResponsiveTabsTrigger>
                  <ResponsiveTabsTrigger value="cards">Cards</ResponsiveTabsTrigger>
                  <ResponsiveTabsTrigger value="form">Form</ResponsiveTabsTrigger>
                  <ResponsiveTabsTrigger value="dashboard">Dashboard</ResponsiveTabsTrigger>
                </ResponsiveTabsList>
                
                <ResponsiveTabsContent value="content" className="space-y-4">
                  <div className="space-y-2">
                    <H3>{gridLayouts[0].name}</H3>
                    <P className="text-sm text-muted-foreground">
                      {gridLayouts[0].description}
                    </P>
                    <div className="flex flex-wrap gap-1">
                      {gridLayouts[0].examples.map((example) => (
                        <Badge key={example} variant="outline" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 p-4 bg-muted/20 rounded-lg">
                    <div className="col-span-12 md:col-span-3 h-20 bg-blue-100 dark:bg-blue-900/20 rounded flex items-center justify-center">
                      <span className="text-sm font-medium">Sidebar</span>
                    </div>
                    <div className="col-span-12 md:col-span-9 h-20 bg-green-100 dark:bg-green-900/20 rounded flex items-center justify-center">
                      <span className="text-sm font-medium">Main Content</span>
                    </div>
                  </div>
                </ResponsiveTabsContent>

                <ResponsiveTabsContent value="cards" className="space-y-4">
                  <div className="space-y-2">
                    <H3>{gridLayouts[1].name}</H3>
                    <P className="text-sm text-muted-foreground">
                      {gridLayouts[1].description}
                    </P>
                    <div className="flex flex-wrap gap-1">
                      {gridLayouts[1].examples.map((example) => (
                        <Badge key={example} variant="outline" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-32 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium">Card {i}</span>
                      </div>
                    ))}
                  </div>
                </ResponsiveTabsContent>

                <ResponsiveTabsContent value="form" className="space-y-4">
                  <div className="space-y-2">
                    <H3>{gridLayouts[2].name}</H3>
                    <P className="text-sm text-muted-foreground">
                      {gridLayouts[2].description}
                    </P>
                    <div className="flex flex-wrap gap-1">
                      {gridLayouts[2].examples.map((example) => (
                        <Badge key={example} variant="outline" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
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
                </ResponsiveTabsContent>

                <ResponsiveTabsContent value="dashboard" className="space-y-4">
                  <div className="space-y-2">
                    <H3>{gridLayouts[3].name}</H3>
                    <P className="text-sm text-muted-foreground">
                      {gridLayouts[3].description}
                    </P>
                    <div className="flex flex-wrap gap-1">
                      {gridLayouts[3].examples.map((example) => (
                        <Badge key={example} variant="outline" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
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
                </ResponsiveTabsContent>
              </ResponsiveTabs>
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
                        {gridSpecifications.filter(spec => spec.category === 'spacing' || spec.category === 'container').map((spec) => (
                          <div key={spec.name} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{spec.name}</span>
                            <Badge variant="outline">{spec.value}</Badge>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {gridSpecifications.filter(spec => spec.category === 'breakpoint').map((spec) => (
                          <div key={spec.name} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{spec.name}</span>
                            <Badge variant="outline">{spec.value}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                </div>

                <Separator />

                <div>
                  <H3 className="mb-3">Usage Guidelines</H3>
                  <div className="space-y-4">
                    {usageGuidelines.do.map((guideline, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Icon name="check-line" className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <span className="font-medium">{guideline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* CSS Custom Properties & Tailwind Classes */}
        <Section paddingY="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="code-line" className="h-5 w-5" />
                  CSS Custom Properties
                </CardTitle>
                <CardDescription>
                  CSS variables for consistent grid spacing and breakpoints across your application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <H3 className="mb-3">Spacing Variables</H3>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      {cssCustomProperties.spacing.map((spacing, index) => (
                        <div key={index}>{spacing};</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <H3 className="mb-3">Breakpoint Variables</H3>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      {cssCustomProperties.breakpoints.map((breakpoint, index) => (
                        <div key={index}>{breakpoint};</div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="settings-line" className="h-5 w-5" />
                  Tailwind CSS Classes
                </CardTitle>
                <CardDescription>
                  Utility classes for implementing grid layouts in your components.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <H3 className="mb-3">Grid Classes</H3>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      {tailwindClasses.grid.map((grid, index) => (
                        <div key={index}>{grid}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <H3 className="mb-3">Column Classes</H3>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      {tailwindClasses.columns.map((column, index) => (
                        <div key={index}>{column}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <H3 className="mb-3">Responsive Classes</H3>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      {tailwindClasses.responsive.map((responsive, index) => (
                        <div key={index}>{responsive}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Implementation Examples */}
        <Section paddingY="lg">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="reactjs-line" className="h-5 w-5" />
                Implementation Examples
              </CardTitle>
              <CardDescription>
                Code examples for implementing grid layouts in your components.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <H3 className="mb-3">{implementationExamples.basicGrid.title}</H3>
                  <P className="text-sm text-muted-foreground mb-3">
                    {implementationExamples.basicGrid.description}
                  </P>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                    {implementationExamples.basicGrid.code.split('\n').map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <H3 className="mb-3">{implementationExamples.cardGrid.title}</H3>
                  <P className="text-sm text-muted-foreground mb-3">
                    {implementationExamples.cardGrid.description}
                  </P>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                    {implementationExamples.cardGrid.code.split('\n').map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <H3 className="mb-3">{implementationExamples.formLayout.title}</H3>
                  <P className="text-sm text-muted-foreground mb-3">
                    {implementationExamples.formLayout.description}
                  </P>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                    {implementationExamples.formLayout.code.split('\n').map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
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
