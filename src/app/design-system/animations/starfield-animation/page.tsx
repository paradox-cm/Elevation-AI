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
import { StarFieldAnimation } from "@/components/animations/star-field-animation"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"
import Link from "next/link"

export default function StarfieldAnimationPage() {
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
              title="Starfield Animation"
              description="Cinematic 3D starfield animation with perspective projection creating a 'flying through space' effect. Features 300 stars with fade trails, variable opacity, and theme adaptation for immersive backgrounds."
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
                  Experience the immersive 3D starfield effect. Toggle between light and dark mode to see how the animation adapts to different themes.
                </P>
              </div>

              {/* Animation Container */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
                    <StarFieldAnimation className="w-full h-full" />
                    
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
                  The Starfield Animation is currently used in the PlatformSection to create an immersive background effect that enhances the futuristic, space-age aesthetic.
                </P>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Platform Section Example */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="layout-grid-line" className="h-5 w-5 text-primary" />
                      <span>Platform Section</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <P className="text-sm text-muted-foreground">
                      Used as a full-width background animation with fixed positioning, creating a parallax effect as content scrolls over it.
                    </P>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Badge variant="outline" className="text-xs">3D Perspective</Badge>
                        <Badge variant="outline" className="text-xs">Fixed Background</Badge>
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

                {/* Design System Example */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="palette-line" className="h-5 w-5 text-primary" />
                      <span>Design System</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <P className="text-sm text-muted-foreground">
                      Centralized component that can be imported and used across different pages and sections for consistent visual effects.
                    </P>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Badge variant="outline" className="text-xs">Reusable</Badge>
                        <Badge variant="outline" className="text-xs">Customizable</Badge>
                        <Badge variant="outline" className="text-xs">High Performance</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href="/design-system/animations">
                        View All Animations
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
                  Built with HTML5 Canvas and advanced 3D mathematics for optimal performance and visual fidelity.
                </P>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="code-s-slash-line" className="h-5 w-5 text-blue-500" />
                      <span>3D Perspective</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Uses perspective projection mathematics to create realistic 3D depth and movement effects.
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
                      Automatically switches between white stars (dark mode) and black stars (light mode) with appropriate backgrounds.
                    </P>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="smartphone-line" className="h-5 w-5 text-purple-500" />
                      <span>High DPI Support</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Automatically adapts to different screen densities and resolutions for crisp rendering on all devices.
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
                      Uses requestAnimationFrame for smooth 60fps animation with proper cleanup and memory management.
                    </P>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="eye-line" className="h-5 w-5 text-cyan-500" />
                      <span>Fade Trails</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Creates motion blur effects with fade trails as stars move, enhancing the sense of speed and depth.
                    </P>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="settings-3-line" className="h-5 w-5 text-pink-500" />
                      <span>Configurable</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Customizable star count, speed, depth, and colors for different use cases and visual requirements.
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
                  Easy to integrate into any page or component with minimal configuration and automatic theme detection.
                </P>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`import { StarFieldAnimation } from "@/components/animations/star-field-animation"

// Basic usage
<StarFieldAnimation className="w-full h-full" />

// With fixed positioning for parallax effect
<div className="relative h-screen">
  <div className="absolute inset-0">
    <StarFieldAnimation className="w-full h-full" />
  </div>
  <div className="relative z-10">
    {/* Your content here */}
  </div>
</div>

// With custom container
<div className="relative h-[400px] overflow-hidden">
  <StarFieldAnimation className="w-full h-full" />
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
                  Advanced animation features that create an immersive, cinematic experience.
                </P>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <H3>Visual Effects</H3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <Icon name="check-line" className="h-4 w-4 text-green-500" />
                      <span>300 animated stars with realistic 3D movement</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="check-line" className="h-4 w-4 text-green-500" />
                      <span>Perspective projection for depth and realism</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="check-line" className="h-4 w-4 text-green-500" />
                      <span>Fade trails creating motion blur effects</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="check-line" className="h-4 w-4 text-green-500" />
                      <span>Variable opacity based on star distance</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <H3>Technical Features</H3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <Icon name="check-line" className="h-4 w-4 text-green-500" />
                      <span>High DPI support for crisp rendering</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="check-line" className="h-4 w-4 text-green-500" />
                      <span>Automatic theme adaptation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="check-line" className="h-4 w-4 text-green-500" />
                      <span>Responsive canvas sizing</span>
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
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
