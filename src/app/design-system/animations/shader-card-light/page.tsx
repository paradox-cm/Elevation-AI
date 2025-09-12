"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { ShaderAnimationLight } from "@/components/animations/shader-animation-light"
import { H1, H2, H3, P, Code } from "@/components/ui/typography"
import Icon from "@/components/ui/icon"
import Link from "next/link"

export default function ShaderCardLightPage() {
  // Light mode optimized color palettes
  const lightModeColorPalettes = {
    'sales-marketing': {
      primary: [0.1, 0.4, 0.8] as [number, number, number], // softer blue
      secondary: [0.0, 0.6, 0.9] as [number, number, number], // softer cyan
      tertiary: [0.0, 0.4, 0.7] as [number, number, number] // softer teal
    },
    'customer-support': {
      primary: [0.1, 0.6, 0.3] as [number, number, number], // softer green
      secondary: [0.0, 0.5, 0.4] as [number, number, number], // softer emerald
      tertiary: [0.0, 0.4, 0.5] as [number, number, number] // softer teal
    },
    'product-development': {
      primary: [0.4, 0.2, 0.8] as [number, number, number], // softer purple
      secondary: [0.3, 0.1, 0.7] as [number, number, number], // softer violet
      tertiary: [0.2, 0.0, 0.5] as [number, number, number] // softer indigo
    },
    'operations': {
      primary: [0.8, 0.4, 0.0] as [number, number, number], // softer orange
      secondary: [0.9, 0.5, 0.0] as [number, number, number], // softer amber
      tertiary: [0.9, 0.6, 0.0] as [number, number, number] // softer yellow
    },
    'research-development': {
      primary: [0.3, 0.2, 0.7] as [number, number, number], // softer indigo
      secondary: [0.2, 0.1, 0.5] as [number, number, number], // softer indigo
      tertiary: [0.1, 0.0, 0.3] as [number, number, number] // softer indigo
    }
  }

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
              title="Shader Card Light Animation"
              description="Light mode optimized WebGL shader animation designed for white backgrounds. Features softer colors, subtle transparency, and enhanced visibility in light themes."
              size="xl"
              centered
            />
          </Section>

          {/* Overview Section */}
          <Section paddingY="lg">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <H2>Overview</H2>
                <P className="text-muted-foreground max-w-3xl mx-auto">
                  The Shader Card Light animation is specifically optimized for light backgrounds and themes. 
                  It uses softer color palettes, subtle transparency effects, and white-based color mixing 
                  to ensure excellent visibility and aesthetic appeal on light surfaces.
                </P>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="sun-line" className="h-5 w-5 text-amber-600" />
                      Light Mode Optimized
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Specifically designed for white and light backgrounds with softer color palettes 
                      and enhanced contrast for better visibility.
                    </P>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="eye-line" className="h-5 w-5 text-amber-600" />
                      Subtle Transparency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Features subtle transparency effects that blend beautifully with light backgrounds 
                      while maintaining visual interest.
                    </P>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="palette-line" className="h-5 w-5 text-amber-600" />
                      Softer Colors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Uses muted, softer color variations that are easier on the eyes and work 
                      harmoniously with light UI elements.
                    </P>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          {/* Live Examples Section */}
          <Section paddingY="lg">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <H2>Live Examples</H2>
                <P className="text-muted-foreground">
                  Interactive light mode shader animations optimized for white backgrounds.
                </P>
              </div>

              {/* Light Mode Shader Examples Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(lightModeColorPalettes).map(([category, colors]) => (
                  <Card key={category} className="overflow-hidden bg-white border-2">
                    <CardHeader>
                      <CardTitle className="capitalize text-sm">
                        {category.replace('-', ' & ')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="relative h-32 w-full bg-white">
                        <ShaderAnimationLight
                          className="absolute inset-0 w-full h-full"
                          width={400}
                          height={128}
                          colors={colors}
                        />
                        <div className="absolute bottom-4 right-4">
                          <Icon name="arrow-right-line" size="lg" className="text-gray-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          {/* Comparison Section */}
          <Section paddingY="lg">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <H2>Dark vs Light Mode Comparison</H2>
                <P className="text-muted-foreground">
                  See the differences between the standard and light mode versions.
                </P>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Dark Mode Example */}
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="moon-line" className="h-5 w-5 text-violet-600" />
                      Standard (Dark Mode)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative h-32 w-full bg-gray-900">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                        <P className="text-white text-sm">Standard Shader Animation</P>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Light Mode Example */}
                <Card className="overflow-hidden bg-white border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="sun-line" className="h-5 w-5 text-amber-600" />
                      Light Mode Optimized
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative h-32 w-full bg-white">
                      <ShaderAnimationLight
                        className="absolute inset-0 w-full h-full"
                        width={400}
                        height={128}
                        colors={lightModeColorPalettes['sales-marketing']}
                      />
                    </div>
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
                <P className="text-muted-foreground">
                  How to use the ShaderAnimationLight component in your projects.
                </P>
              </div>

              <div className="space-y-6">
                {/* Basic Usage */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Usage</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <P className="text-sm text-muted-foreground">
                      Import and use the ShaderAnimationLight component with default light mode colors:
                    </P>
                    <div className="bg-muted p-4 rounded-lg">
                      <Code className="text-sm">
{`import { ShaderAnimationLight } from "@/components/animations/shader-animation-light"

<ShaderAnimationLight
  className="w-full h-32"
  width={400}
  height={128}
/>`}
                      </Code>
                    </div>
                  </CardContent>
                </Card>

                {/* Custom Colors */}
                <Card>
                  <CardHeader>
                    <CardTitle>Custom Light Mode Colors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <P className="text-sm text-muted-foreground">
                      Define custom light mode color palettes using softer RGB values:
                    </P>
                    <div className="bg-muted p-4 rounded-lg">
                      <Code className="text-sm">
{`const lightModeColors = {
  primary: [0.1, 0.4, 0.8] as [number, number, number], // softer blue
  secondary: [0.0, 0.6, 0.9] as [number, number, number], // softer cyan
  tertiary: [0.0, 0.4, 0.7] as [number, number, number] // softer teal
}

<ShaderAnimationLight
  className="w-full h-32"
  width={400}
  height={128}
  colors={lightModeColors}
/>`}
                      </Code>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Differences */}
                <Card>
                  <CardHeader>
                    <CardTitle>Key Differences from Standard Version</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <H3 className="text-sm font-medium mb-2">Background Color</H3>
                          <P className="text-xs text-muted-foreground">White (1.0, 1.0, 1.0) instead of black</P>
                        </div>
                        <div>
                          <H3 className="text-sm font-medium mb-2">Color Mixing</H3>
                          <P className="text-xs text-muted-foreground">Mixes with white tones instead of black</P>
                        </div>
                        <div>
                          <H3 className="text-sm font-medium mb-2">Transparency</H3>
                          <P className="text-xs text-muted-foreground">Alpha value of 0.8 for subtle blending</P>
                        </div>
                        <div>
                          <H3 className="text-sm font-medium mb-2">Color Intensity</H3>
                          <P className="text-xs text-muted-foreground">Softer, more muted color palettes</P>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          {/* Use Cases */}
          <Section paddingY="lg">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <H2>Use Cases</H2>
                <P className="text-muted-foreground">
                  When to use the light mode shader animation.
                </P>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Light Theme Applications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <P className="text-sm text-muted-foreground">
                      Perfect for applications with light themes:
                    </P>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Light mode dashboards</li>
                      <li>• White background cards</li>
                      <li>• Light-themed marketing pages</li>
                      <li>• Print-friendly designs</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Accessibility</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <P className="text-sm text-muted-foreground">
                      Better accessibility features:
                    </P>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Higher contrast on light backgrounds</li>
                      <li>• Reduced eye strain</li>
                      <li>• Better readability</li>
                      <li>• Works well with light text overlays</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          {/* Related Components */}
          <Section paddingY="lg">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <H2>Related Components</H2>
                <P className="text-muted-foreground">
                  Explore other shader animation variants.
                </P>
              </div>

              <div className="flex gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/design-system/animations/shader-card">
                    <Icon name="moon-line" className="h-4 w-4 mr-2" />
                    Standard Shader Card
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/design-system/animations">
                    <Icon name="grid-line" className="h-4 w-4 mr-2" />
                    All Animations
                  </Link>
                </Button>
              </div>
            </div>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
