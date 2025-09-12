"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { H2, H3, H4, P, BodyLarge } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { BusinessDataAnimation } from "@/components/animations/business-data-animation"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"
import Link from "next/link"

export default function BusinessDataAnimationPage() {
  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="animations" />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container size="2xl">
          {/* Header Section */}
          <Section paddingY="xl">
            <PageHeader
              title="Business Data Animation"
              description="Dynamic vertical line animation simulating data flow and business metrics. Features 192 animated lines in a grid pattern with oscillating movement, perfect for illustrating data processing and business intelligence concepts."
              size="xl"
              centered
            />
          </Section>

          {/* Animation Demo Section */}
          <Section paddingY="lg">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <H2>Live Demo</H2>
                <P className="text-muted-foreground max-w-2xl mx-auto">
                  Experience the dynamic data flow animation. Toggle between light and dark mode to see how the animation adapts to different themes.
                </P>
              </div>

              {/* Animation Container */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
                    <BusinessDataAnimation className="w-full h-full" />
                    
                    {/* Theme Toggle Instructions */}
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        <Icon name="palette-line" className="h-3 w-3 mr-1" />
                        Toggle theme to see color change
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Usage Examples Section */}
          <Section paddingY="lg">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <H2>Usage Examples</H2>
                <P className="text-muted-foreground max-w-2xl mx-auto">
                  The Business Data Animation is currently used in multiple sections to create engaging background effects that illustrate data processing and business intelligence concepts.
                </P>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Problem Section Example */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="home-line" className="h-5 w-5 text-primary" />
                      <span>Problem Section (Home)</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <P className="text-sm text-muted-foreground">
                      Used as a fixed background animation in the "Orchestrate Your Universe" section, creating a subtle data flow effect behind the problem cards.
                    </P>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Badge variant="outline" className="text-xs">Fixed Background</Badge>
                        <Badge variant="outline" className="text-xs">Data Visualization</Badge>
                        <Badge variant="outline" className="text-xs">Theme Adaptive</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href="/website/home">
                        View Home Page
                        <Icon name="arrow-right-line" className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Developers Page Example */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="code-s-slash-line" className="h-5 w-5 text-primary" />
                      <span>Developers Page</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <P className="text-sm text-muted-foreground">
                      Used as a full-width background animation to create an engaging visual backdrop that reinforces the technical and data-driven nature of the platform.
                    </P>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Badge variant="outline" className="text-xs">Full Width</Badge>
                        <Badge variant="outline" className="text-xs">Technical Theme</Badge>
                        <Badge variant="outline" className="text-xs">Background Effect</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href="/website/developers">
                        View Developers Page
                        <Icon name="arrow-right-line" className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          {/* Technical Details Section */}
          <Section paddingY="lg">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <H2>Technical Details</H2>
                <P className="text-muted-foreground max-w-2xl mx-auto">
                  Built with HTML5 Canvas and mathematical algorithms for smooth, efficient animation that adapts to different screen sizes and themes.
                </P>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="grid-line" className="h-5 w-5 text-blue-500" />
                      <span>Grid Pattern</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Creates a 8x24 grid of animated lines (192 total) that oscillate independently, creating a complex data flow visualization.
                    </P>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="palette-line" className="h-5 w-5 text-green-500" />
                      <span>Theme Adaptive</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Automatically switches between white lines (dark mode) and black lines (light mode) with appropriate opacity for optimal visibility.
                    </P>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="smartphone-line" className="h-5 w-5 text-purple-500" />
                      <span>Responsive Design</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Automatically adapts to different screen sizes and resolutions, maintaining the grid pattern across all devices.
                    </P>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="speed-line" className="h-5 w-5 text-orange-500" />
                      <span>Performance Optimized</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Uses requestAnimationFrame for smooth 60fps animation with efficient canvas rendering and proper cleanup.
                    </P>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="settings-3-line" className="h-5 w-5 text-cyan-500" />
                      <span>Oscillating Movement</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Each line oscillates independently with random speed and direction changes, creating natural, organic movement patterns.
                    </P>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="eye-line" className="h-5 w-5 text-pink-500" />
                      <span>Subtle Effect</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Designed to be visually engaging without being distracting, perfect for background animations that support content.
                    </P>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          {/* Implementation Section */}
          <Section paddingY="lg">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <H2>Implementation</H2>
                <P className="text-muted-foreground max-w-2xl mx-auto">
                  Easy to integrate into any page or component with automatic theme detection and responsive behavior.
                </P>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`import { BusinessDataAnimation } from "@/components/animations/business-data-animation"

// Basic usage
<BusinessDataAnimation className="w-full h-full" />

// With fixed positioning for background effect
<div className="relative h-screen">
  <div className="absolute inset-0">
    <BusinessDataAnimation className="w-full h-full" />
  </div>
  <div className="relative z-10">
    {/* Your content here */}
  </div>
</div>

// With custom container
<div className="relative h-[400px] overflow-hidden">
  <BusinessDataAnimation className="w-full h-full" />
  <div className="absolute inset-0 flex items-center justify-center">
    <h1>Your Content</h1>
  </div>
</div>`}
                    </pre>
                  </div>
                  <P className="text-sm text-muted-foreground">
                    The component automatically handles theme detection, canvas sizing, animation lifecycle management, and cleanup.
                  </P>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Features Section */}
          <Section paddingY="lg">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <H2>Key Features</H2>
                <P className="text-muted-foreground max-w-2xl mx-auto">
                  Advanced animation features that create an engaging data visualization effect without overwhelming the content.
                </P>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <H3>Visual Effects</H3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <Icon name="check-line" className="h-4 w-4 text-green-500" />
                      <span>192 animated vertical lines in 8x24 grid pattern</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="check-line" className="h-4 w-4 text-green-500" />
                      <span>Independent oscillation for each line</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="check-line" className="h-4 w-4 text-green-500" />
                      <span>Random speed and direction changes</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="check-line" className="h-4 w-4 text-green-500" />
                      <span>Subtle opacity for non-intrusive background effect</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <H3>Technical Features</H3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <Icon name="check-line" className="h-4 w-4 text-green-500" />
                      <span>Automatic theme adaptation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="check-line" className="h-4 w-4 text-green-500" />
                      <span>Responsive grid sizing</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="check-line" className="h-4 w-4 text-green-500" />
                      <span>High performance canvas rendering</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="check-line" className="h-4 w-4 text-green-500" />
                      <span>Memory-efficient with proper cleanup</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          {/* Use Cases Section */}
          <Section paddingY="lg">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <H2>Perfect For</H2>
                <P className="text-muted-foreground max-w-2xl mx-auto">
                  Ideal use cases where you want to convey data processing, business intelligence, or technical sophistication.
                </P>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="bar-chart-2-line" className="h-5 w-5 text-blue-500" />
                      <span>Data Visualization</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Perfect for sections discussing data processing, analytics, or business intelligence capabilities.
                    </P>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="code-s-slash-line" className="h-5 w-5 text-green-500" />
                      <span>Technical Pages</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Great for developer-focused pages or technical documentation that needs a subtle tech aesthetic.
                    </P>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="building-line" className="h-5 w-5 text-purple-500" />
                      <span>Business Sections</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Ideal for problem statements or solution sections that need to convey data-driven insights.
                    </P>
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
