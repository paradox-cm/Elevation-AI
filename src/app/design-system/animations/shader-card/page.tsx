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
import { ShaderAnimation } from "@/components/animations/shader-animation"
import { ShaderAnimationLight } from "@/components/animations/shader-animation-light"
import { useTheme } from "next-themes"
import { H1, H2, H3, P, Code } from "@/components/ui/typography"
import Icon from "@/components/ui/icon"
import Link from "next/link"

export default function ShaderCardPage() {
  const { theme } = useTheme()
  
  // Dark mode color palettes (original platform colors)
  const darkModeColorPalettes = {
    'sales-marketing': {
      primary: [0.2, 0.6, 1.0] as [number, number, number], // blue-500
      secondary: [0.0, 0.8, 1.0] as [number, number, number], // cyan-500  
      tertiary: [0.0, 0.5, 0.6] as [number, number, number] // teal-600
    },
    'customer-support': {
      primary: [0.2, 0.8, 0.2] as [number, number, number], // green-500
      secondary: [0.0, 0.7, 0.5] as [number, number, number], // emerald-500
      tertiary: [0.0, 0.5, 0.6] as [number, number, number] // teal-600
    },
    'product-development': {
      primary: [0.6, 0.2, 1.0] as [number, number, number], // purple-500
      secondary: [0.5, 0.0, 1.0] as [number, number, number], // violet-500
      tertiary: [0.3, 0.0, 0.6] as [number, number, number] // indigo-600
    },
    'operations': {
      primary: [1.0, 0.5, 0.0] as [number, number, number], // orange-500
      secondary: [1.0, 0.7, 0.0] as [number, number, number], // amber-500
      tertiary: [1.0, 0.8, 0.0] as [number, number, number] // yellow-500
    },
    'research-development': {
      primary: [0.4, 0.2, 0.8] as [number, number, number], // indigo-500
      secondary: [0.3, 0.0, 0.6] as [number, number, number], // indigo-600
      tertiary: [0.2, 0.0, 0.4] as [number, number, number] // indigo-800
    }
  }

  // Light mode optimized color palettes for different card categories
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

  // Determine which colors and component to use based on theme
  const isDarkMode = theme === 'dark'
  const colorPalettes = isDarkMode ? darkModeColorPalettes : lightModeColorPalettes
  const ShaderComponent = isDarkMode ? ShaderAnimation : ShaderAnimationLight

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
              title="Shader Card Animation"
              description="Dynamic WebGL shader animation with Perlin noise creating fluid, organic patterns. Automatically switches between dark and light mode optimized versions based on the current theme."
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
                  The Shader Card animation creates dynamic, fluid backgrounds using WebGL fragment shaders. 
                  It automatically adapts to your theme - using vibrant colors with dark backgrounds in dark mode, 
                  and softer colors with white backgrounds in light mode. Features Perlin noise-based patterns 
                  that create organic, flowing movements with customizable color palettes.
                </P>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="palette-line" className="h-5 w-5 text-violet-600" />
                      Custom Colors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Each shader can use a unique color palette with primary, secondary, and tertiary colors 
                      that blend together in the animation.
                    </P>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="magic-line" className="h-5 w-5 text-violet-600" />
                      Perlin Noise
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Uses Perlin noise algorithms to create natural, organic patterns that flow and 
                      transform smoothly over time.
                    </P>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="cpu-line" className="h-5 w-5 text-violet-600" />
                      WebGL Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Hardware-accelerated rendering using WebGL for smooth 60fps animations 
                      with minimal CPU usage.
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
                  Interactive shader animations with different color palettes used throughout the platform.
                </P>
              </div>

              {/* Shader Examples Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(colorPalettes).map(([category, colors]) => (
                  <Card key={category} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="capitalize text-sm">
                        {category.replace('-', ' & ')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="relative h-32 w-full">
                        <ShaderComponent
                          className="absolute inset-0 w-full h-full"
                          width={400}
                          height={128}
                          colors={colors}
                        />
                        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/20' : 'bg-white/10'}`}></div>
                        <div className="absolute bottom-4 right-4">
                          <Icon name="arrow-right-line" size="lg" className={isDarkMode ? 'text-white' : 'text-gray-700'} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          {/* Implementation Section */}
          <Section paddingY="lg">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <H2>Implementation</H2>
                <P className="text-muted-foreground">
                  How to use the ShaderAnimation component in your projects.
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
                      Import and use the appropriate shader component based on your theme:
                    </P>
                    <div className="bg-muted p-4 rounded-lg">
                      <Code className="text-sm">
{`// For dark mode
import { ShaderAnimation } from "@/components/animations/shader-animation"

// For light mode  
import { ShaderAnimationLight } from "@/components/animations/shader-animation-light"

// Dynamic usage with theme detection
const ShaderComponent = isDarkMode ? ShaderAnimation : ShaderAnimationLight

<ShaderComponent
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
                    <CardTitle>Custom Colors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <P className="text-sm text-muted-foreground">
                      Define custom color palettes using RGB values (0-1 range):
                    </P>
                    <div className="bg-muted p-4 rounded-lg">
                      <Code className="text-sm">
{`// Dark mode colors (vibrant)
const darkColors = {
  primary: [0.2, 0.6, 1.0] as [number, number, number], // blue-500
  secondary: [0.0, 0.8, 1.0] as [number, number, number], // cyan-500
  tertiary: [0.0, 0.5, 0.6] as [number, number, number] // teal-600
}

// Light mode colors (softer)
const lightColors = {
  primary: [0.1, 0.4, 0.8] as [number, number, number], // softer blue
  secondary: [0.0, 0.6, 0.9] as [number, number, number], // softer cyan
  tertiary: [0.0, 0.4, 0.7] as [number, number, number] // softer teal
}

const colors = isDarkMode ? darkColors : lightColors

<ShaderComponent
  className="w-full h-32"
  width={400}
  height={128}
  colors={colors}
/>`}
                      </Code>
                    </div>
                  </CardContent>
                </Card>

                {/* Props */}
                <Card>
                  <CardHeader>
                    <CardTitle>Component Props</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <H3 className="text-sm font-medium mb-2">className</H3>
                          <P className="text-xs text-muted-foreground">CSS classes for styling the canvas element</P>
                        </div>
                        <div>
                          <H3 className="text-sm font-medium mb-2">width</H3>
                          <P className="text-xs text-muted-foreground">Canvas width in pixels (default: 400)</P>
                        </div>
                        <div>
                          <H3 className="text-sm font-medium mb-2">height</H3>
                          <P className="text-xs text-muted-foreground">Canvas height in pixels (default: 200)</P>
                        </div>
                        <div>
                          <H3 className="text-sm font-medium mb-2">colors</H3>
                          <P className="text-xs text-muted-foreground">Optional color palette object with primary, secondary, tertiary RGB arrays</P>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          {/* Technical Details */}
          <Section paddingY="lg">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <H2>Technical Details</H2>
                <P className="text-muted-foreground">
                  Under the hood implementation and performance considerations.
                </P>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>WebGL Shaders</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <P className="text-sm text-muted-foreground">
                      Uses custom GLSL fragment shaders with:
                    </P>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Perlin noise generation</li>
                      <li>• Smooth color interpolation</li>
                      <li>• Time-based animation</li>
                      <li>• Mouse interaction support</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <P className="text-sm text-muted-foreground">
                      Optimized for smooth performance:
                    </P>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Hardware-accelerated rendering</li>
                      <li>• 60fps target frame rate</li>
                      <li>• Minimal CPU usage</li>
                      <li>• Automatic cleanup on unmount</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          {/* Usage in Platform */}
          <Section paddingY="lg">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <H2>Usage in Platform</H2>
                <P className="text-muted-foreground">
                  The Shader Card animation is currently used in the platform page for industry category cards.
                </P>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Integration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <P className="text-sm text-muted-foreground">
                    The shader animation replaces static gradient backgrounds in the "Built for Every Industry, Every Team" 
                    section, providing dynamic visual interest while maintaining the original color schemes for each category.
                  </P>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Platform Page</Badge>
                    <Badge variant="secondary">Industry Cards</Badge>
                    <Badge variant="secondary">Dynamic Backgrounds</Badge>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/website/platform">
                      View Platform Page
                      <Icon name="arrow-right-line" className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
