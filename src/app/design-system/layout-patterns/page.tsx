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
import { ResponsiveTabs, ResponsiveTabsContent, ResponsiveTabsList, ResponsiveTabsTrigger } from "@/components/ui/responsive-tabs"
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
            <ResponsiveTabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <ResponsiveTabsList className="grid w-full grid-cols-4">
                <ResponsiveTabsTrigger value="hero">Hero Sections</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="content">Content Sections</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="layouts">Layout Components</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="complete">Complete Pages</ResponsiveTabsTrigger>
              </ResponsiveTabsList>

              {/* Hero Sections */}
              <ResponsiveTabsContent value="hero" className="space-y-6 mt-6">
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
              </ResponsiveTabsContent>

              {/* Content Sections */}
              <ResponsiveTabsContent value="content" className="space-y-6 mt-6">
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
              </ResponsiveTabsContent>

              {/* Layout Components */}
              <ResponsiveTabsContent value="layouts" className="space-y-6 mt-6">
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
              </ResponsiveTabsContent>

              {/* Complete Pages */}
              <ResponsiveTabsContent value="complete" className="space-y-6 mt-6">
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
              </ResponsiveTabsContent>
            </ResponsiveTabs>
          </Section>

          {/* Mobile Padding Standards */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="smartphone-line" className="h-5 w-5" />
                  Mobile Padding Standards
                </CardTitle>
                <CardDescription>
                  Global mobile padding rules for consistent spacing across all pages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-6">
                    <H3 className="mb-4">Global Mobile Padding Rules</H3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <H3 className="mb-2 text-sm font-semibold">Container Component</H3>
                          <div className="bg-background border rounded-lg p-4">
                            <code className="text-sm">
                              px-3 sm:px-6 lg:px-8
                            </code>
                          </div>
                          <BodySmall className="text-muted-foreground mt-2">
                            Standard mobile padding: 12px (px-3) on mobile, 24px (px-6) on small screens and up
                          </BodySmall>
                        </div>
                        <div>
                          <H3 className="mb-2 text-sm font-semibold">Max Width Rules</H3>
                          <div className="bg-background border rounded-lg p-4">
                            <code className="text-sm">
                              sm: max-w-full<br/>
                              md: max-w-full<br/>
                              lg: max-w-[1400px]
                            </code>
                          </div>
                          <BodySmall className="text-muted-foreground mt-2">
                            Full width on mobile/tablet, constrained width on desktop
                          </BodySmall>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <H3 className="mb-3">Implementation Guidelines</H3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <H3 className="mb-2 text-sm font-semibold">✅ DO</H3>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Use Container component for all page content</li>
                              <li>• Apply px-3 on mobile for consistent spacing</li>
                              <li>• Use max-w-full on mobile/tablet</li>
                              <li>• Let Container handle responsive padding</li>
                            </ul>
                          </div>
                          <div>
                            <H3 className="mb-2 text-sm font-semibold">❌ DON'T</H3>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Override Container padding with custom classes</li>
                              <li>• Use px-4 or px-6 on mobile</li>
                              <li>• Add custom max-width constraints on mobile</li>
                              <li>• Create double padding with nested Containers</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <H3 className="mb-3">Code Examples</H3>
                        <div className="space-y-4">
                          <div>
                            <H3 className="mb-2 text-sm font-semibold">✅ Correct Implementation</H3>
                            <div className="bg-background border rounded-lg p-4">
                              <pre className="text-sm overflow-x-auto">
{`<Container size="2xl">
  <Section paddingY="lg">
    <div className="text-center">
      <h1>Page Title</h1>
      <p>Page content</p>
    </div>
  </Section>
</Container>`}
                              </pre>
                            </div>
                          </div>
                          <div>
                            <H3 className="mb-2 text-sm font-semibold">❌ Incorrect Implementation</H3>
                            <div className="bg-background border rounded-lg p-4">
                              <pre className="text-sm overflow-x-auto text-red-600">
{`<Container size="2xl" className="px-4 sm:px-6 lg:px-8">
  <Section paddingY="lg">
    <div className="text-center">
      <h1>Page Title</h1>
      <p>Page content</p>
    </div>
  </Section>
</Container>`}
                              </pre>
                            </div>
                            <BodySmall className="text-red-600 mt-2">
                              This creates double padding and inconsistent mobile spacing
                            </BodySmall>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
