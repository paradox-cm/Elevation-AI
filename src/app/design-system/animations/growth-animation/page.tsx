"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { H2, H3, BodyLarge, P } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { GrowthAnimation } from "@/components/animations/growth-animation"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"
import Link from "next/link"

export default function GrowthAnimationPage() {
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
              title="Growth Animation"
              description="Dynamic dot growth animation that adapts to light and dark themes. Features expanding and contracting dots in a grid pattern, perfect for illustrating business growth and scaling concepts."
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
                  Watch the animation adapt automatically to your current theme. Toggle between light and dark mode to see the dots change from black to white.
                </P>
              </div>

              {/* Animation Container */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
                    <GrowthAnimation className="w-full h-full" />
                    
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
                  The Growth Animation is currently used in the pricing page to create an engaging background effect that reinforces the growth and scaling theme.
                </P>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pricing Page Example */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="price-tag-3-line" className="h-5 w-5 text-primary" />
                      <span>Pricing Page</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <P className="text-sm text-muted-foreground">
                      Used as a full-width background animation with a centered "Calculate Your Plan" button overlay.
                    </P>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Badge variant="outline" className="text-xs">Full Width</Badge>
                        <Badge variant="outline" className="text-xs">Background</Badge>
                        <Badge variant="outline" className="text-xs">Theme Adaptive</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href="/website/pricing">
                        View Pricing Page
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
                      Centralized component that can be imported and used across different pages and sections.
                    </P>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Badge variant="outline" className="text-xs">Reusable</Badge>
                        <Badge variant="outline" className="text-xs">Customizable</Badge>
                        <Badge variant="outline" className="text-xs">Responsive</Badge>
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
                  Built with HTML5 Canvas and React hooks for optimal performance and theme integration.
                </P>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="code-s-slash-line" className="h-5 w-5 text-blue-500" />
                      <span>Canvas API</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Uses HTML5 Canvas for smooth 60fps animation with efficient rendering.
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
                      Automatically switches between black (light mode) and white (dark mode) dots.
                    </P>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="smartphone-line" className="h-5 w-5 text-purple-500" />
                      <span>Responsive</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Adapts to different screen sizes and container dimensions automatically.
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
                  Easy to integrate into any page or component with minimal configuration.
                </P>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`import { GrowthAnimation } from "@/components/animations/growth-animation"

// Basic usage
<GrowthAnimation className="w-full h-full" />

// With custom styling
<div className="relative h-[400px]">
  <GrowthAnimation className="w-full h-full" />
  <div className="absolute inset-0 flex items-center justify-center">
    <Button>Your Content Here</Button>
  </div>
</div>`}
                    </pre>
                  </div>
                  <P className="text-sm text-muted-foreground">
                    The component automatically handles theme detection, canvas sizing, and animation lifecycle management.
                  </P>
                </CardContent>
              </Card>
            </div>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
