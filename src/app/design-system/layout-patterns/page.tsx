"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Grid } from "@/components/ui/layout/grid"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { H1, H2, H3, BodyLarge, BodySmall } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { useLayoutPatternsConfig } from "@/hooks/use-layout-patterns-config"
import {
  HeroSection,
  ContentSection,
  FeatureGrid,
  StatsSection,
  TestimonialSection,
  CTASection,
  SidebarLayout,
  TwoColumnLayout,
  Container as LayoutContainer,
} from "@/components/ui/layout-patterns"

export default function LayoutPatternsPage() {
  const [activeTab, setActiveTab] = useState("hero")
  const {
    config,
    heroSectionConfig,
    contentSectionConfig,
    featureGridConfig,
    statsSectionConfig,
    testimonialSectionConfig,
    ctaSectionConfig,
    sidebarLayoutConfig,
    twoColumnLayoutConfig,
    containerConfig,
    pageLayoutConfig,
  } = useLayoutPatternsConfig()

  // Sample data for components
  const features = [
    {
      icon: "shield-check-line",
      title: "Security First",
      description: "Built with security best practices to keep your data safe and protected.",
      link: { label: "Learn more", href: "#" },
    },
    {
      icon: "speed-line",
      title: "Lightning Fast",
      description: "Optimized for performance with blazing fast load times and smooth interactions.",
      link: { label: "Learn more", href: "#" },
    },
    {
      icon: "smartphone-line",
      title: "Mobile Ready",
      description: "Fully responsive design that works perfectly on all devices and screen sizes.",
      link: { label: "Learn more", href: "#" },
    },
    {
      icon: "customer-service-line",
      title: "24/7 Support",
      description: "Round-the-clock customer support to help you whenever you need assistance.",
      link: { label: "Learn more", href: "#" },
    },
  ]

  const stats = [
    {
      value: "10M+",
      label: "Active Users",
      description: "Worldwide user base",
      trend: { value: "+12%", isPositive: true },
    },
    {
      value: "99.9%",
      label: "Uptime",
      description: "Reliable service",
      trend: { value: "+0.1%", isPositive: true },
    },
    {
      value: "50+",
      label: "Countries",
      description: "Global presence",
      trend: { value: "+5", isPositive: true },
    },
    {
      value: "24/7",
      label: "Support",
      description: "Always available",
    },
  ]

  const testimonials = [
    {
      content: "This platform has completely transformed how we handle our workflow. The efficiency gains are incredible!",
      author: {
        name: "Sarah Johnson",
        role: "Product Manager",
        avatar: "https://github.com/shadcn.png",
      },
      rating: 5,
    },
    {
      content: "The best solution we've found for our team. Easy to use and incredibly powerful.",
      author: {
        name: "Michael Chen",
        role: "CTO",
      },
      rating: 5,
    },
    {
      content: "Outstanding customer support and a product that actually delivers on its promises.",
      author: {
        name: "Emily Rodriguez",
        role: "Operations Director",
      },
      rating: 5,
    },
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
              title="Layout Patterns & Page Structures"
              description="Comprehensive layout components and page patterns for building professional user interfaces with consistent structure and design."
              size="lg"
              centered
            />
          </Section>

          {/* Layout Patterns Overview */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="layout-line" className="h-5 w-5" />
                  Layout Patterns System Overview
                </CardTitle>
                <CardDescription>
                  Our layout patterns system provides comprehensive page structures, content sections, and layout components for building professional user interfaces.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="layout-top-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Page Layouts</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Hero sections, content areas, and complete page structures
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="grid-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Content Sections</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Feature grids, testimonials, stats, and call-to-action sections
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="sidebar-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Layout Components</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Sidebars, two-column layouts, and container systems
                    </BodySmall>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>



          {/* Layout Components Showcase */}
          <Section paddingY="lg">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="hero">Hero Sections</TabsTrigger>
                <TabsTrigger value="content">Content Sections</TabsTrigger>
                <TabsTrigger value="layouts">Layout Components</TabsTrigger>
                <TabsTrigger value="complete">Complete Pages</TabsTrigger>
              </TabsList>

              {/* Hero Sections */}
              <TabsContent value="hero" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Hero Section Variations</CardTitle>
                    <CardDescription>
                      Different hero section styles and configurations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Default Hero */}
                    <div>
                      <H3 className="mb-4">Default Hero</H3>
                      <HeroSection
                        title="Design System for Modern Applications"
                        subtitle="Professional UI Components"
                        description="Build consistent, accessible, and beautiful user interfaces with our comprehensive design system. Includes 100+ components, dark mode support, and TypeScript definitions."
                        actions={[
                          {
                            label: "Explore Components",
                            onClick: () => console.log("Explore Components"),
                            icon: "apps-line",
                          },
                          {
                            label: "View Documentation",
                            onClick: () => console.log("View Documentation"),
                            variant: "outline",
                            icon: "book-open-line",
                          },
                        ]}
                      />
                    </div>

                    <Separator />

                    {/* Gradient Hero */}
                    <div>
                      <H3 className="mb-4">Gradient Background Hero</H3>
                      <HeroSection
                        title="Enterprise-Grade Development Platform"
                        subtitle="Built for Scale"
                        description="Accelerate your development with enterprise-ready tools, CI/CD pipelines, and scalable infrastructure. Trusted by 10,000+ developers worldwide."
                        background="gradient"
                        actions={[
                          {
                            label: "Start Free Trial",
                            onClick: () => console.log("Start Trial"),
                            icon: "rocket-line",
                          },
                          {
                            label: "Schedule Demo",
                            onClick: () => console.log("Schedule Demo"),
                            variant: "outline",
                            icon: "calendar-line",
                          },
                        ]}
                      />
                    </div>

                    <Separator />

                    {/* Left-aligned Hero */}
                    <div>
                      <H3 className="mb-4">Left-aligned Hero</H3>
                      <HeroSection
                        title="Powerful analytics for modern teams"
                        subtitle="Analytics Platform"
                        description="Get insights into your data with our advanced analytics platform. Track metrics, visualize trends, and make data-driven decisions."
                        centered={false}
                        actions={[
                          {
                            label: "View Demo",
                            onClick: () => console.log("View Demo"),
                            icon: "play-line",
                          },
                          {
                            label: "Contact Sales",
                            onClick: () => console.log("Contact Sales"),
                            variant: "outline",
                          },
                        ]}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Content Sections */}
              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Section Components</CardTitle>
                    <CardDescription>
                      Reusable content sections for building comprehensive pages
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Feature Grid */}
                    <div>
                      <H3 className="mb-4">Feature Grid</H3>
                      <ContentSection
                        title="Why choose our platform"
                        description="Built with modern technologies and best practices to deliver exceptional user experiences."
                      >
                        <FeatureGrid features={features} columns={4} />
                      </ContentSection>
                    </div>

                    <Separator />

                    {/* Stats Section */}
                    <div>
                      <H3 className="mb-4">Stats Section</H3>
                      <StatsSection
                        stats={stats}
                        title="Trusted by millions"
                        description="Join thousands of satisfied customers worldwide"
                      />
                    </div>

                    <Separator />

                    {/* Testimonials */}
                    <div>
                      <H3 className="mb-4">Testimonials Section</H3>
                      <ContentSection
                        title="What our customers say"
                        description="Hear from real users about their experience with our platform."
                      >
                        <TestimonialSection testimonials={testimonials} />
                      </ContentSection>
                    </div>

                    <Separator />

                    {/* CTA Section */}
                    <div>
                      <H3 className="mb-4">Call-to-Action Section</H3>
                      <CTASection
                        title="Ready to get started?"
                        description="Join thousands of users who have already transformed their workflow with our platform."
                        background="gradient"
                        actions={[
                          {
                            label: "Start Free Trial",
                            onClick: () => console.log("Start Trial"),
                            icon: "rocket-line",
                          },
                          {
                            label: "Schedule Demo",
                            onClick: () => console.log("Schedule Demo"),
                            variant: "outline",
                            icon: "calendar-line",
                          },
                        ]}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Layout Components */}
              <TabsContent value="layouts" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Layout Components</CardTitle>
                    <CardDescription>
                      Flexible layout components for different page structures
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Two Column Layout */}
                    <div>
                      <H3 className="mb-4">Two Column Layout</H3>
                      <TwoColumnLayout
                        left={
                          <div className="space-y-4">
                            <H2>Build faster with our design system</H2>
                            <BodyLarge className="text-muted-foreground">
                              Our comprehensive design system provides all the components and patterns you need to build professional user interfaces quickly and consistently.
                            </BodyLarge>
                            <div className="flex gap-4">
                              <Button>
                                <Icon name="download-line" className="h-4 w-4" />
                                Download
                              </Button>
                              <Button variant="outline">
                                <Icon name="book-open-line" className="h-4 w-4" />
                                Documentation
                              </Button>
                            </div>
                          </div>
                        }
                        right={
                          <div className="bg-muted/50 rounded-lg p-8 flex items-center justify-center">
                            <div className="text-center">
                              <Icon name="image-line" className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                              <BodySmall className="text-muted-foreground">
                                Product screenshot or illustration
                              </BodySmall>
                            </div>
                          </div>
                        }
                      />
                    </div>

                    <Separator />

                    {/* Reversed Two Column */}
                    <div>
                      <H3 className="mb-4">Reversed Two Column Layout</H3>
                      <TwoColumnLayout
                        reverse
                        left={
                          <div className="bg-muted/50 rounded-lg p-8 flex items-center justify-center">
                            <div className="text-center">
                              <Icon name="chart-line" className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                              <BodySmall className="text-muted-foreground">
                                Analytics dashboard preview
                              </BodySmall>
                            </div>
                          </div>
                        }
                        right={
                          <div className="space-y-4">
                            <H2>Advanced analytics and insights</H2>
                            <BodyLarge className="text-muted-foreground">
                              Get deep insights into your data with our advanced analytics platform. Track metrics, visualize trends, and make data-driven decisions.
                            </BodyLarge>
                            <div className="flex gap-4">
                              <Button>
                                <Icon name="bar-chart-line" className="h-4 w-4" />
                                View Analytics
                              </Button>
                              <Button variant="outline">
                                <Icon name="information-line" className="h-4 w-4" />
                                Learn More
                              </Button>
                            </div>
                          </div>
                        }
                      />
                    </div>

                    <Separator />

                    {/* Container Examples */}
                    <div>
                      <H3 className="mb-4">Container Variations</H3>
                      <div className="space-y-4">
                        <div>
                          <BodySmall className="mb-2">Small Container</BodySmall>
                          <LayoutContainer maxWidth="sm" className="border rounded-lg p-4">
                            <div className="text-center">
                              <BodySmall>Small container content</BodySmall>
                            </div>
                          </LayoutContainer>
                        </div>
                        <div>
                          <BodySmall className="mb-2">Medium Container</BodySmall>
                          <LayoutContainer maxWidth="md" className="border rounded-lg p-4">
                            <div className="text-center">
                              <BodySmall>Medium container content</BodySmall>
                            </div>
                          </LayoutContainer>
                        </div>
                        <div>
                          <BodySmall className="mb-2">Large Container</BodySmall>
                          <LayoutContainer maxWidth="lg" className="border rounded-lg p-4">
                            <div className="text-center">
                              <BodySmall>Large container content</BodySmall>
                            </div>
                          </LayoutContainer>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Complete Pages */}
              <TabsContent value="complete" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Complete Page Examples</CardTitle>
                    <CardDescription>
                      Full page layouts combining multiple layout patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Landing Page Example */}
                    <div>
                      <H3 className="mb-4">Landing Page Structure</H3>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-muted/30 p-4 border-b">
                          <BodySmall className="font-medium">Landing Page Example</BodySmall>
                        </div>
                        <div className="p-6 space-y-6">
                          <div className="text-center">
                            <Badge variant="secondary" className="mb-2">Hero Section</Badge>
                            <div className="h-20 bg-muted/50 rounded flex items-center justify-center">
                              <BodySmall className="text-muted-foreground">Hero Section</BodySmall>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <Badge variant="secondary" className="mb-2">Features Section</Badge>
                            <div className="h-16 bg-muted/50 rounded flex items-center justify-center">
                              <BodySmall className="text-muted-foreground">Features Grid</BodySmall>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <Badge variant="secondary" className="mb-2">Stats Section</Badge>
                            <div className="h-16 bg-muted/50 rounded flex items-center justify-center">
                              <BodySmall className="text-muted-foreground">Statistics</BodySmall>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <Badge variant="secondary" className="mb-2">Testimonials</Badge>
                            <div className="h-16 bg-muted/50 rounded flex items-center justify-center">
                              <BodySmall className="text-muted-foreground">Customer Testimonials</BodySmall>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <Badge variant="secondary" className="mb-2">CTA Section</Badge>
                            <div className="h-16 bg-muted/50 rounded flex items-center justify-center">
                              <BodySmall className="text-muted-foreground">Call to Action</BodySmall>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Dashboard Layout Example */}
                    <div>
                      <H3 className="mb-4">Dashboard Layout Structure</H3>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-muted/30 p-4 border-b">
                          <BodySmall className="font-medium">Dashboard Example</BodySmall>
                        </div>
                        <div className="flex">
                          <div className="w-64 bg-muted/50 p-4 border-r">
                            <BodySmall className="text-muted-foreground">Sidebar Navigation</BodySmall>
                          </div>
                          <div className="flex-1 p-4">
                            <div className="space-y-4">
                              <div className="h-12 bg-muted/50 rounded flex items-center justify-center">
                                <BodySmall className="text-muted-foreground">Header</BodySmall>
                              </div>
                              <div className="h-32 bg-muted/50 rounded flex items-center justify-center">
                                <BodySmall className="text-muted-foreground">Main Content Area</BodySmall>
                              </div>
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

          {/* Available Variants */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="palette-line" className="h-5 w-5" />
                  Available Variants & Options
                </CardTitle>
                <CardDescription>
                  Complete list of available layout pattern variants and configuration options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="hero" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="hero">Hero</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="grids">Grids</TabsTrigger>
                    <TabsTrigger value="layouts">Layouts</TabsTrigger>
                    <TabsTrigger value="pages">Pages</TabsTrigger>
                  </TabsList>

                  <TabsContent value="hero" className="space-y-4">
                    <div>
                      <H3 className="mb-3">Hero Section Variants</H3>
                      <div className="grid gap-3">
                        {config.heroSections.variants.map((variant) => (
                          <div key={variant.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{variant.name}</div>
                              <div className="text-sm text-muted-foreground">{variant.description}</div>
                            </div>
                            <Badge variant="secondary">{variant.id}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <H3 className="mb-3">Hero Section Sizes</H3>
                      <div className="grid gap-3">
                        {config.heroSections.sizes.map((size) => (
                          <div key={size.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{size.name}</div>
                              <div className="text-sm text-muted-foreground">Padding: {size.padding}</div>
                            </div>
                            <Badge variant="secondary">{size.id}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="content" className="space-y-4">
                    <div>
                      <H3 className="mb-3">Content Section Variants</H3>
                      <div className="grid gap-3">
                        {config.contentSections.variants.map((variant) => (
                          <div key={variant.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{variant.name}</div>
                              <div className="text-sm text-muted-foreground">{variant.description}</div>
                            </div>
                            <Badge variant="secondary">{variant.id}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <H3 className="mb-3">Padding Options</H3>
                      <div className="grid gap-3">
                        {config.contentSections.padding.map((padding) => (
                          <div key={padding.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{padding.name}</div>
                              <div className="text-sm text-muted-foreground">Padding: {padding.padding}</div>
                            </div>
                            <Badge variant="secondary">{padding.id}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="grids" className="space-y-4">
                    <div>
                      <H3 className="mb-3">Feature Grid Variants</H3>
                      <div className="grid gap-3">
                        {config.featureGrids.variants.map((variant) => (
                          <div key={variant.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{variant.name}</div>
                              <div className="text-sm text-muted-foreground">{variant.description}</div>
                            </div>
                            <Badge variant="secondary">{variant.id}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <H3 className="mb-3">Column Options</H3>
                      <div className="grid gap-3">
                        {config.featureGrids.columns.map((columns) => (
                          <div key={columns.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{columns.name}</div>
                              <div className="text-sm text-muted-foreground">{columns.columns} columns, {columns.responsive ? "Responsive" : "Fixed"}</div>
                            </div>
                            <Badge variant="secondary">{columns.id}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="layouts" className="space-y-4">
                    <div>
                      <H3 className="mb-3">Sidebar Layout Variants</H3>
                      <div className="grid gap-3">
                        {config.sidebarLayouts.variants.map((variant) => (
                          <div key={variant.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{variant.name}</div>
                              <div className="text-sm text-muted-foreground">{variant.description}</div>
                            </div>
                            <Badge variant="secondary">{variant.id}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <H3 className="mb-3">Two Column Layout Variants</H3>
                      <div className="grid gap-3">
                        {config.twoColumnLayouts.variants.map((variant) => (
                          <div key={variant.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{variant.name}</div>
                              <div className="text-sm text-muted-foreground">{variant.description}</div>
                            </div>
                            <Badge variant="secondary">{variant.id}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="pages" className="space-y-4">
                    <div>
                      <H3 className="mb-3">Page Layout Variants</H3>
                      <div className="grid gap-3">
                        {config.pageLayouts.variants.map((variant) => (
                          <div key={variant.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{variant.name}</div>
                              <div className="text-sm text-muted-foreground">{variant.description}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Sections: {variant.sections.join(", ")}
                              </div>
                            </div>
                            <Badge variant="secondary">{variant.id}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </Section>

          {/* Best Practices */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="information-line" className="h-5 w-5" />
                  Layout Best Practices
                </CardTitle>
                <CardDescription>
                  Guidelines for implementing layout patterns effectively
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <H3 className="mb-4">Page Structure</H3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Use hero sections for landing pages and key content</li>
                        <li>• Organize content in logical sections with clear hierarchy</li>
                        <li>• Include call-to-action sections at strategic points</li>
                        <li>• Maintain consistent spacing and alignment</li>
                      </ul>
                    </div>
                    <div>
                      <H3 className="mb-4">Responsive Design</H3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Test layouts on different screen sizes</li>
                        <li>• Use flexible grid systems for content</li>
                        <li>• Ensure touch targets are appropriately sized</li>
                        <li>• Optimize for mobile-first experiences</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <H3 className="mb-4">Content Organization</H3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Group related content in sections</li>
                        <li>• Use visual hierarchy to guide users</li>
                        <li>• Include clear navigation between sections</li>
                        <li>• Balance content density with whitespace</li>
                      </ul>
                    </div>
                    <div>
                      <H3 className="mb-4">Performance</H3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Optimize images and media for web</li>
                        <li>• Use lazy loading for content below the fold</li>
                        <li>• Minimize layout shifts during loading</li>
                        <li>• Consider progressive enhancement</li>
                      </ul>
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
