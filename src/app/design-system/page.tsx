"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Icon from "@/components/ui/icon"
import { H1, H2, H3, H4, BodyLarge, BodySmall } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import Link from "next/link"

export default function DesignSystemPage() {
  const designSystemCategories = [
    {
      title: "Foundation",
      description: "Core design principles and fundamental elements",
      items: [
        { name: "Brand Identity", href: "/design-system/branding", icon: "image-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Colors", href: "/design-system/colors", icon: "palette-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Typography", href: "/design-system/typography", icon: "text", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Spacing", href: "/design-system/spacing", icon: "ruler-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Corner Radius", href: "/design-system/corner-radius", icon: "shape-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Shadows & Elevation", href: "/design-system/shadows-elevation", icon: "stack-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Design Tokens", href: "/design-system/design-tokens", icon: "palette-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Icons", href: "/design-system/icons", icon: "star-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Grid", href: "/design-system/grid", icon: "grid-line", color: "text-blue-500", bgColor: "bg-blue-500/10" }
      ]
    },
    {
      title: "Components",
      description: "Reusable UI components and patterns",
      items: [
        { name: "Components", href: "/design-system/components", icon: "apps-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Content Components", href: "/design-system/content-components", icon: "article-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Dashboard Components", href: "/design-system/dashboard", icon: "dashboard-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Analytics", href: "/design-system/analytics", icon: "bar-chart-box-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Data Display", href: "/design-system/data-display", icon: "database-2-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Forms", href: "/design-system/forms", icon: "file-list-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "User Management", href: "/design-system/user-management", icon: "user-settings-line", color: "text-blue-500", bgColor: "bg-blue-500/10" }
      ]
    },
    {
      title: "Guidelines",
      description: "Design patterns, layouts, and best practices",
      items: [
        { name: "Layout Patterns", href: "/design-system/layout-patterns", icon: "layout-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Interactive States", href: "/design-system/interactive-states", icon: "loader-4-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Motion & Animation", href: "/design-system/motion", icon: "play-circle-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Error States & Feedback", href: "/design-system/error-states", icon: "error-warning-line", color: "text-blue-500", bgColor: "bg-blue-500/10" }
      ]
    },
    {
      title: "Standards",
      description: "Accessibility guidelines and responsive design",
      items: [
        { name: "Accessibility", href: "/design-system/accessibility", icon: "shield-check-line", color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { name: "Responsive Design", href: "/design-system/responsive", icon: "smartphone-line", color: "text-blue-500", bgColor: "bg-blue-500/10" }
      ]
    }
  ]

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="overview" />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container>
          {/* Hero Section */}
          <Section paddingY="xl" className="relative overflow-hidden">
            <div className="relative z-10">
              <PageHeader
                title="Elevation AI Design System"
                description="A comprehensive design system built for modern applications. Discover our design principles, components, and guidelines to create consistent, accessible, and beautiful user experiences."
                size="xl"
                centered
              />
              
              {/* Hero Image Placeholder */}
              <div className="mt-12 w-full">
                <div className="relative bg-muted/50 rounded-2xl border border-border overflow-hidden">
                  <div className="aspect-video bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                        <Icon name="palette-line" className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <H3 className="text-lg font-semibold text-foreground">Design System Hero</H3>
                        <BodySmall className="text-muted-foreground">Placeholder for hero image or illustration</BodySmall>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Font Verification Section */}
              <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border">
                <H4 className="text-base font-semibold mb-4">Font Verification</H4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Primary Font (Helvetica Now):</span>
                    <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-helvetica-now)' }}>
                      The quick brown fox jumps over the lazy dog
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Fallback Font (System):</span>
                    <span className="text-sm font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      The quick brown fox jumps over the lazy dog
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    If the fonts look different, Helvetica Now is working correctly.
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/design-system/components">
                    <Icon name="apps-line" className="h-4 w-4 mr-2" />
                    Browse Components
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/design-system/colors">
                    <Icon name="palette-line" className="h-4 w-4 mr-2" />
                    View Foundation
                  </Link>
                </Button>
              </div>
            </div>
          </Section>

          {/* Design System Categories */}
          <Section paddingY="xl">
            <div className="space-y-16">
              {designSystemCategories.map((category) => (
                <div key={category.title}>
                  <div className="mb-8">
                    <H2 className="text-2xl font-bold mb-2">{category.title}</H2>
                    <BodyLarge className="text-muted-foreground max-w-2xl">
                      {category.description}
                    </BodyLarge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.items.map((item) => (
                      <Card key={item.name} className="group hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${item.bgColor}`}>
                              <Icon name={item.icon} className={`h-5 w-5 ${item.color}`} />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{item.name}</CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <Button variant="ghost" size="sm" asChild className="group-hover:bg-muted hover:bg-primary/10 dark:hover:bg-blue-600/20">
                              <Link href={item.href}>
                                Explore
                                <Icon name="arrow-right-line" className="h-4 w-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Getting Started Section */}
          <Section paddingY="xl" className="bg-muted/50">
            <div className="max-w-4xl mx-auto text-center">
              <H2 className="text-2xl font-bold mb-4">Getting Started</H2>
              <BodyLarge className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Ready to start building with our design system? Follow our comprehensive guides to get up and running quickly.
              </BodyLarge>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon name="book-line" className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Read the Docs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BodySmall className="text-muted-foreground mb-4">
                      Explore our comprehensive documentation to understand design principles and component usage.
                    </BodySmall>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/design-system/components">View Documentation</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon name="code-line" className="h-6 w-6 text-green-500" />
                    </div>
                    <CardTitle>Install Components</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BodySmall className="text-muted-foreground mb-4">
                      Get started with our component library and start building your application.
                    </BodySmall>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/design-system/implementation">Install Guide</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon name="lightbulb-line" className="h-6 w-6 text-purple-500" />
                    </div>
                    <CardTitle>Design Principles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BodySmall className="text-muted-foreground mb-4">
                      Learn about our design philosophy and principles that guide our component decisions.
                    </BodySmall>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/design-system/accessibility">View Principles</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
