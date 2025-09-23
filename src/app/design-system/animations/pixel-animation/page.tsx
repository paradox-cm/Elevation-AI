"use client"

import { useState } from 'react'
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PixelAnimation } from "@/components/ui/pixel-animation"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BodyLarge, BodySmall } from "@/components/ui/typography"
import Icon from "@/components/ui/icon"
import { useThemeProvider } from "@/hooks/use-theme"

export default function PixelAnimationPage() {
  const { isDark } = useThemeProvider()
  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(300)
  const [gap, setGap] = useState(6)
  const [speed, setSpeed] = useState(0.1)
  const [maxSize, setMaxSize] = useState(2)
  const [autoPlay, setAutoPlay] = useState(true)
  const [customColors, setCustomColors] = useState(['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'])

  const presetConfigs = [
    {
      name: "Default",
      description: "Balanced settings for general use",
      width: 400,
      height: 300,
      gap: 6,
      speed: 0.1,
      maxSize: 2,
      colors: ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#6B7280', '#9CA3AF', '#D1D5DB']
    },
    {
      name: "Dense",
      description: "More pixels, tighter spacing",
      width: 400,
      height: 300,
      gap: 4,
      speed: 0.15,
      maxSize: 1.5,
      colors: ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#6B7280', '#9CA3AF', '#D1D5DB']
    },
    {
      name: "Sparse",
      description: "Fewer pixels, more dramatic effect",
      width: 400,
      height: 300,
      gap: 12,
      speed: 0.08,
      maxSize: 3,
      colors: ['#8B5CF6', '#EC4899', '#06B6D4', '#10B981', '#F59E0B']
    },
    {
      name: "Fast",
      description: "High speed animation",
      width: 400,
      height: 300,
      gap: 6,
      speed: 0.3,
      maxSize: 2,
      colors: ['#DC2626', '#EA580C', '#CA8A04', '#16A34A', '#2563EB']
    },
    {
      name: "Monochrome",
      description: "Single color theme",
      width: 400,
      height: 300,
      gap: 6,
      speed: 0.1,
      maxSize: 2,
      colors: ['#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB', '#F3F4F6']
    }
  ]

  const applyPreset = (preset: typeof presetConfigs[0]) => {
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
              title="Pixel Animation"
              description="A dynamic pixel-based animation that creates mesmerizing patterns through procedural generation. Each pixel grows, flickers, and fades in a wave-like motion, creating organic visual effects perfect for backgrounds and loading states."
              size="xl"
              centered
            />
          </Section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Animation Preview */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="eye-line" className="h-5 w-5" />
                    Animation Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <PixelAnimation
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
                      <Icon name="palette-line" className="h-4 w-4 inline mr-1" />
                      Theme-aware animation that adapts to light and dark modes
                    </BodySmall>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controls Panel */}
            <div className="space-y-6">
              {/* Preset Configurations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="settings-3-line" className="h-5 w-5" />
                    Preset Configurations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {presetConfigs.map((preset) => (
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

          {/* Usage Examples */}
          <Section paddingY="xl">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="code-line" className="h-5 w-5" />
                  Usage Examples
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <BodyLarge className="font-medium mb-2">Standard Mode Usage</BodyLarge>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`import { PixelAnimation } from "@/components/ui/pixel-animation"

<PixelAnimation
  width={400}
  height={300}
  gap={6}
  speed={0.1}
  maxSize={2}
  colors={['#3B82F6', '#8B5CF6', '#06B6D4']}
  autoPlay={true}
/>`}
                    </pre>
                  </div>
                </div>


                <div>
                  <BodyLarge className="font-medium mb-2">Custom Configuration</BodyLarge>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`<PixelAnimation
  width={600}
  height={400}
  gap={4}
  speed={0.2}
  maxSize={3}
  colors={['#EF4444', '#F97316', '#EAB308']}
  autoPlay={false}
  className="rounded-xl border-2"
/>`}
                    </pre>
                  </div>
                </div>

                <div>
                  <BodyLarge className="font-medium mb-2">Props Reference</BodyLarge>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Badge variant="outline">width: number</Badge>
                      <BodySmall className="text-muted-foreground">Canvas width in pixels (default: 400)</BodySmall>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">height: number</Badge>
                      <BodySmall className="text-muted-foreground">Canvas height in pixels (default: 300)</BodySmall>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">gap: number</Badge>
                      <BodySmall className="text-muted-foreground">Spacing between pixels (default: 6)</BodySmall>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">speed: number</Badge>
                      <BodySmall className="text-muted-foreground">Animation speed multiplier (default: 0.1)</BodySmall>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">maxSize: number</Badge>
                      <BodySmall className="text-muted-foreground">Maximum pixel size (default: 2)</BodySmall>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">colors: string[]</Badge>
                      <BodySmall className="text-muted-foreground">Array of hex colors for pixels</BodySmall>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">autoPlay: boolean</Badge>
                      <BodySmall className="text-muted-foreground">Start animation automatically (default: true)</BodySmall>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">className: string</Badge>
                      <BodySmall className="text-muted-foreground">Additional CSS classes</BodySmall>
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
