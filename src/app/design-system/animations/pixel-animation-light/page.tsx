"use client"

import { useState } from 'react'
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PixelAnimationLight } from "@/components/ui/pixel-animation-light"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BodyLarge, BodySmall, H2, H3, P, Code } from "@/components/ui/typography"
import Icon from "@/components/ui/icon"
import Link from "next/link"

export default function PixelAnimationLightPage() {
  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(300)
  const [gap, setGap] = useState(6)
  const [speed, setSpeed] = useState(0.1)
  const [maxSize, setMaxSize] = useState(2)
  const [autoPlay, setAutoPlay] = useState(true)
  const [customColors, setCustomColors] = useState(['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'])

  const lightModePresets = [
    {
      name: "Soft Pastels",
      description: "Gentle, muted colors perfect for light backgrounds",
      width: 400,
      height: 300,
      gap: 6,
      speed: 0.08,
      maxSize: 2,
      colors: ['#93C5FD', '#C4B5FD', '#86EFAC', '#FDE68A', '#F9A8D4']
    },
    {
      name: "Professional Blue",
      description: "Corporate-friendly blue tones",
      width: 400,
      height: 300,
      gap: 5,
      speed: 0.1,
      maxSize: 1.8,
      colors: ['#3B82F6', '#1D4ED8', '#1E40AF', '#1E3A8A', '#312E81']
    },
    {
      name: "Warm Earth",
      description: "Natural, warm earth tones",
      width: 400,
      height: 300,
      gap: 7,
      speed: 0.12,
      maxSize: 2.2,
      colors: ['#F59E0B', '#D97706', '#B45309', '#92400E', '#78350F']
    },
    {
      name: "Cool Grays",
      description: "Sophisticated monochrome palette",
      width: 400,
      height: 300,
      gap: 6,
      speed: 0.09,
      maxSize: 2,
      colors: ['#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB', '#F3F4F6']
    },
    {
      name: "Vibrant Light",
      description: "Bright but light-optimized colors",
      width: 400,
      height: 300,
      gap: 4,
      speed: 0.15,
      maxSize: 1.5,
      colors: ['#60A5FA', '#A78BFA', '#34D399', '#FBBF24', '#F472B6']
    }
  ]

  const applyPreset = (preset: typeof lightModePresets[0]) => {
    setWidth(preset.width)
    setHeight(preset.height)
    setGap(preset.gap)
    setSpeed(preset.speed)
    setMaxSize(preset.maxSize)
    setCustomColors(preset.colors)
  }

  const updateColor = (index: number, color: string) => {
    const newColors = [...customColors]
    newColors[index] = color
    setCustomColors(newColors)
  }

  const addColor = () => {
    if (customColors.length < 10) {
      setCustomColors([...customColors, '#000000'])
    }
  }

  const removeColor = (index: number) => {
    if (customColors.length > 1) {
      const newColors = customColors.filter((_, i) => i !== index)
      setCustomColors(newColors)
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
              title="Pixel Animation Light"
              description="Light mode optimized pixel animation designed for white backgrounds. Features softer colors, subtle transparency, and enhanced visibility in light themes with automatic color adaptation for better contrast and readability."
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
                  The Pixel Animation Light is specifically optimized for light backgrounds and themes. 
                  It automatically adapts colors to be softer and more muted, uses white canvas backgrounds, 
                  and includes subtle transparency effects to ensure excellent visibility and aesthetic appeal on light surfaces.
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
                      Specifically designed for white and light backgrounds with automatic color adaptation 
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
                      Features subtle transparency effects (80% opacity) that blend beautifully with light backgrounds 
                      while maintaining visual interest.
                    </P>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="palette-line" className="h-5 w-5 text-amber-600" />
                      Auto Color Adaptation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <P className="text-sm text-muted-foreground">
                      Automatically creates lighter, more muted versions of your colors by mixing with white 
                      for optimal light mode appearance.
                    </P>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Animation Preview */}
            <div className="lg:col-span-2">
              <Card className="bg-white border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="sun-line" className="h-5 w-5 text-amber-600" />
                    Light Mode Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <PixelAnimationLight
                      width={width}
                      height={height}
                      gap={gap}
                      speed={speed}
                      maxSize={maxSize}
                      colors={customColors}
                      autoPlay={autoPlay}
                      className="w-full max-w-2xl"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <BodySmall className="text-muted-foreground">
                      <Icon name="sun-line" className="h-4 w-4 inline mr-1" />
                      Optimized for white backgrounds with softer colors and subtle transparency
                    </BodySmall>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controls Panel */}
            <div className="space-y-6">
              {/* Light Mode Presets */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="settings-3-line" className="h-5 w-5" />
                    Light Mode Presets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {lightModePresets.map((preset) => (
                    <div key={preset.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <BodySmall className="font-medium">{preset.name}</BodySmall>
                          <BodySmall className="text-muted-foreground text-xs">
                            {preset.description}
                          </BodySmall>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => applyPreset(preset)}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Animation Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="slider-line" className="h-5 w-5" />
                    Animation Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Auto Play */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoplay">Auto Play</Label>
                    <Switch
                      id="autoplay"
                      checked={autoPlay}
                      onCheckedChange={setAutoPlay}
                    />
                  </div>

                  <Separator />

                  {/* Dimensions */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="width">Width: {width}px</Label>
                      <Slider
                        id="width"
                        min={200}
                        max={800}
                        step={10}
                        value={[width]}
                        onValueChange={(value) => setWidth(value[0])}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height: {height}px</Label>
                      <Slider
                        id="height"
                        min={150}
                        max={600}
                        step={10}
                        value={[height]}
                        onValueChange={(value) => setHeight(value[0])}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Animation Parameters */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="gap">Gap: {gap}px</Label>
                      <Slider
                        id="gap"
                        min={2}
                        max={20}
                        step={1}
                        value={[gap]}
                        onValueChange={(value) => setGap(value[0])}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="speed">Speed: {speed.toFixed(2)}</Label>
                      <Slider
                        id="speed"
                        min={0.01}
                        max={0.5}
                        step={0.01}
                        value={[speed]}
                        onValueChange={(value) => setSpeed(value[0])}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxSize">Max Size: {maxSize}px</Label>
                      <Slider
                        id="maxSize"
                        min={0.5}
                        max={5}
                        step={0.1}
                        value={[maxSize]}
                        onValueChange={(value) => setMaxSize(value[0])}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Color Palette */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="palette-line" className="h-5 w-5" />
                    Color Palette
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {customColors.map((color, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          type="color"
                          value={color}
                          onChange={(e) => updateColor(index, e.target.value)}
                          className="w-12 h-8 p-1 border rounded"
                        />
                        <Input
                          value={color}
                          onChange={(e) => updateColor(index, e.target.value)}
                          className="flex-1 text-xs"
                        />
                        {customColors.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeColor(index)}
                            className="h-8 w-8 p-0"
                          >
                            <Icon name="close-line" className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  {customColors.length < 10 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addColor}
                      className="w-full"
                    >
                      <Icon name="add-line" className="h-4 w-4 mr-2" />
                      Add Color
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Implementation Section */}
          <Section paddingY="xl">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <H2>Implementation</H2>
                <P className="text-muted-foreground">
                  How to use the PixelAnimationLight component in your projects.
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
                      Import and use the PixelAnimationLight component with default light mode optimization:
                    </P>
                    <div className="bg-muted p-4 rounded-lg">
                      <Code className="text-sm">
{`import { PixelAnimationLight } from "@/components/ui/pixel-animation-light"

<PixelAnimationLight
  width={400}
  height={300}
  gap={6}
  speed={0.1}
  maxSize={2}
  colors={['#3B82F6', '#8B5CF6', '#06B6D4']}
  autoPlay={true}
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
                          <P className="text-xs text-muted-foreground">White (#ffffff) instead of dark (#1D1E22)</P>
                        </div>
                        <div>
                          <H3 className="text-sm font-medium mb-2">Color Adaptation</H3>
                          <P className="text-xs text-muted-foreground">Automatically creates lighter, muted versions</P>
                        </div>
                        <div>
                          <H3 className="text-sm font-medium mb-2">Transparency</H3>
                          <P className="text-xs text-muted-foreground">80% opacity for subtle blending with light backgrounds</P>
                        </div>
                        <div>
                          <H3 className="text-sm font-medium mb-2">UI Elements</H3>
                          <P className="text-xs text-muted-foreground">Light-themed controls and hints</P>
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
                  When to use the light mode pixel animation.
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
                  Explore other pixel animation variants.
                </P>
              </div>

              <div className="flex gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/design-system/animations/pixel-animation">
                    <Icon name="moon-line" className="h-4 w-4 mr-2" />
                    Standard Pixel Animation
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
