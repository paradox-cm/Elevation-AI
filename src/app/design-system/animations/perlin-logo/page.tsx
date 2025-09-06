"use client"

import React from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { H1, H2, H3, H4, P, BodyLarge, BodySmall, DisplayLarge, DisplayMedium, DisplaySmall } from "@/components/ui/typography"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { AnimatedFavicon } from "@/components/ui/animated-favicon"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function PerlinLogoAnimationPage() {
  const [selectedPreset, setSelectedPreset] = React.useState<'high-detail' | 'balanced' | 'dramatic'>('dramatic')

  const presets = {
    'high-detail': {
      name: "High Detail",
      description: "High detail settings with smaller, more detailed filaments",
      scaleX: 0.005,
      scaleY: 0.005,
      waveMultiplier: 3072,
      threshold: 0.15
    },
    'balanced': {
      name: "Balanced", 
      description: "Balanced settings with larger, more prominent filaments",
      scaleX: 0.0015,
      scaleY: 0.0015,
      waveMultiplier: 1536,
      threshold: 0.08
    },
    'dramatic': {
      name: "Dramatic",
      description: "Dramatic settings with the largest, most dramatic filaments",
      scaleX: 0.0008,
      scaleY: 0.0008,
      waveMultiplier: 1024,
      threshold: 0.04
    }
  }

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="animations" />}
        sidebar={<DesignSystemSidebar />}
        footer={null}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            {/* Hero Section */}
            <Section paddingY="lg" className="border-b border-border/50">
              <Container size="2xl">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Badge variant="secondary" className="w-fit">
                      Animation System
                    </Badge>
                    <H1>Perlin Logo Animation</H1>
                    <BodyLarge className="text-muted-foreground max-w-3xl">
                      A dynamic plasma animation using Perlin noise that creates flowing, organic patterns within the Elevation AI logo shape. This animation is used across the platform for branding and visual interest.
                    </BodyLarge>
                  </div>
                </div>
              </Container>
            </Section>

            {/* Live Demo Section */}
            <Section paddingY="lg">
              <Container size="2xl">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <H2>Live Demo</H2>
                    <BodyLarge className="text-muted-foreground">
                      Switch between different preset configurations to see how the parameters affect the plasma animation.
                    </BodyLarge>
                    
                    {/* Preset Selector */}
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(presets).map(([key, preset]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedPreset(key as 'high-detail' | 'balanced' | 'dramatic')}
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                            selectedPreset === key
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                          )}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <H4 className="mb-2">{presets[selectedPreset].name}</H4>
                      <P className="text-sm text-muted-foreground">{presets[selectedPreset].description}</P>
                    </div>
                  </div>

                  {/* Animation Demo */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle>Current Animation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center space-y-6">
                        {/* Large Demo */}
                        <div className="space-y-4 text-center">
                          <H4>Large Size (Hero Section)</H4>
                          <div className="w-52 h-52 mx-auto flex items-center justify-center relative">
                            <AnimatedFavicon
                              width={256}
                              height={256}
                              className="w-52 h-52"
                              preset={selectedPreset}
                            />
                          </div>
                        </div>

                        {/* Medium Demo */}
                        <div className="space-y-4 text-center">
                          <H4>Medium Size (Navigation)</H4>
                          <div className="w-32 h-32 mx-auto flex items-center justify-center relative">
                            <AnimatedFavicon
                              width={128}
                              height={128}
                              className="w-32 h-32"
                              preset={selectedPreset}
                            />
                          </div>
                        </div>

                        {/* Small Demo */}
                        <div className="space-y-4 text-center">
                          <H4>Small Size (Favicon)</H4>
                          <div className="w-16 h-16 mx-auto flex items-center justify-center relative">
                            <AnimatedFavicon
                              width={64}
                              height={64}
                              className="w-16 h-16"
                              preset={selectedPreset}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Container>
            </Section>

            {/* Current Parameters Section */}
            <Section paddingY="lg" className="bg-muted/30">
              <Container size="2xl">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <H2>Current Parameters</H2>
                    <BodyLarge className="text-muted-foreground">
                      The animation uses these parameters for the selected preset: <strong>{presets[selectedPreset].name}</strong>
                    </BodyLarge>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-border/50">
                      <CardHeader>
                        <CardTitle>Scale Parameters</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <H4>scaleX: {presets[selectedPreset].scaleX}</H4>
                          <P className="text-sm text-muted-foreground">
                            Controls the horizontal scale of the Perlin noise pattern. Lower values create larger, broader plasma structures.
                          </P>
                        </div>
                        <div className="space-y-2">
                          <H4>scaleY: {presets[selectedPreset].scaleY}</H4>
                          <P className="text-sm text-muted-foreground">
                            Controls the vertical scale of the Perlin noise pattern. Lower values create larger, broader plasma structures.
                          </P>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50">
                      <CardHeader>
                        <CardTitle>Visual Parameters</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <H4>waveMultiplier: {presets[selectedPreset].waveMultiplier}</H4>
                          <P className="text-sm text-muted-foreground">
                            Controls how the noise translates to visible filaments. Lower values make filaments more prominent and visible.
                          </P>
                        </div>
                        <div className="space-y-2">
                          <H4>threshold: {presets[selectedPreset].threshold}</H4>
                          <P className="text-sm text-muted-foreground">
                            Determines which parts of the noise pattern become visible. Lower values show more of the pattern, creating fuller effects.
                          </P>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50">
                      <CardHeader>
                        <CardTitle>Animation Parameters</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <H4>speed: 0.0002</H4>
                          <P className="text-sm text-muted-foreground">
                            Controls the animation speed. Higher values make the plasma move faster.
                          </P>
                        </div>
                        <div className="space-y-2">
                          <H4>colorTransitionSpeed: 0.005</H4>
                          <P className="text-sm text-muted-foreground">
                            Controls how fast colors transition between the brand color palette.
                          </P>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50">
                      <CardHeader>
                        <CardTitle>Color Range</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <H4>rmin: -1, rmax: 1</H4>
                          <P className="text-sm text-muted-foreground">
                            Defines the range of Perlin noise values. These are typically left unchanged.
                          </P>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </Container>
            </Section>

            {/* Editing Instructions Section */}
            <Section paddingY="lg">
              <Container size="2xl">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <H2>How to Edit the Animation</H2>
                    <BodyLarge className="text-muted-foreground">
                      Follow these steps to modify the Perlin animation parameters and achieve different visual effects.
                    </BodyLarge>
                  </div>

                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle>Step-by-Step Instructions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <H4>1. Locate the Animation File</H4>
                          <P className="text-sm text-muted-foreground">
                            Navigate to: <code className="bg-muted px-2 py-1 rounded text-xs">src/components/ui/animated-favicon.tsx</code>
                          </P>
                        </div>

                        <div className="space-y-2">
                          <H4>2. Find the Parameters Section</H4>
                          <P className="text-sm text-muted-foreground">
                            Look for the comment "Performance optimization: Pre-calculate constants" around line 61 and line 355.
                          </P>
                        </div>

                        <div className="space-y-2">
                          <H4>3. Update Both Parameter Sets</H4>
                          <P className="text-sm text-muted-foreground">
                            There are two identical parameter sets in the file - one for the shared animation state (around line 61) and one for the fallback animation (around line 355). Update both to maintain consistency.
                          </P>
                        </div>

                        <div className="space-y-2">
                          <H4>4. Test Your Changes</H4>
                          <P className="text-sm text-muted-foreground">
                            Save the file and refresh your browser to see the changes. The animation will update in real-time.
                          </P>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle>Parameter Effects Guide</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <H4>Making Filaments Larger</H4>
                          <P className="text-sm text-muted-foreground">
                            • <strong>Reduce scaleX and scaleY</strong> (e.g., from 0.0015 to 0.001) for much larger structures<br/>
                            • <strong>Lower the threshold</strong> (e.g., from 0.08 to 0.06) to show more of the pattern<br/>
                            • <strong>Reduce waveMultiplier</strong> (e.g., from 1536 to 1024) for more prominent filaments
                          </P>
                        </div>

                        <div className="space-y-2">
                          <H4>Making Filaments Smaller</H4>
                          <P className="text-sm text-muted-foreground">
                            • <strong>Increase scaleX and scaleY</strong> (e.g., from 0.0015 to 0.003) for smaller, more detailed structures<br/>
                            • <strong>Raise the threshold</strong> (e.g., from 0.08 to 0.12) to show less of the pattern<br/>
                            • <strong>Increase waveMultiplier</strong> (e.g., from 1536 to 2048) for more subtle filaments
                          </P>
                        </div>

                        <div className="space-y-2">
                          <H4>Adjusting Animation Speed</H4>
                          <P className="text-sm text-muted-foreground">
                            • <strong>Increase speed</strong> (e.g., from 0.0002 to 0.0004) for faster plasma movement<br/>
                            • <strong>Decrease speed</strong> (e.g., from 0.0002 to 0.0001) for slower, more gentle movement
                          </P>
                        </div>

                        <div className="space-y-2">
                          <H4>Color Transition Speed</H4>
                          <P className="text-sm text-muted-foreground">
                            • <strong>Increase colorTransitionSpeed</strong> (e.g., from 0.005 to 0.01) for faster color changes<br/>
                            • <strong>Decrease colorTransitionSpeed</strong> (e.g., from 0.005 to 0.002) for slower color transitions
                          </P>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Container>
            </Section>

            {/* Parameter History Section */}
            <Section paddingY="lg" className="bg-muted/30">
              <Container size="2xl">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <H2>Preset Configurations</H2>
                    <BodyLarge className="text-muted-foreground">
                      Three preset configurations available for easy switching between different animation styles.
                    </BodyLarge>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {Object.entries(presets).map(([key, preset]) => (
                      <Card key={key} className="border-border/50">
                        <CardHeader>
                          <CardTitle>{preset.name}</CardTitle>
                          <Badge variant="outline" className="w-fit">
                            scaleX: {preset.scaleX}, scaleY: {preset.scaleY}
                          </Badge>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <P className="text-sm text-muted-foreground">
                              <strong>scaleX:</strong> {preset.scaleX}<br/>
                              <strong>scaleY:</strong> {preset.scaleY}<br/>
                              <strong>waveMultiplier:</strong> {preset.waveMultiplier}<br/>
                              <strong>threshold:</strong> {preset.threshold}<br/>
                              <strong>speed:</strong> 0.0002<br/>
                              <strong>colorTransitionSpeed:</strong> 0.005
                            </P>
                          </div>
                          <P className="text-sm text-muted-foreground">
                            {preset.description}
                          </P>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </Container>
            </Section>

            {/* Technical Details Section */}
            <Section paddingY="lg">
              <Container size="2xl">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <H2>Technical Implementation</H2>
                    <BodyLarge className="text-muted-foreground">
                      Understanding how the Perlin animation works and its integration with the design system.
                    </BodyLarge>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-border/50">
                      <CardHeader>
                        <CardTitle>Animation Architecture</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <H4>Global Animation Context</H4>
                          <P className="text-sm text-muted-foreground">
                            Uses a shared animation context to avoid reloading the Perlin noise when navigating between pages, improving performance.
                          </P>
                        </div>
                        <div className="space-y-2">
                          <H4>SVG Masking</H4>
                          <P className="text-sm text-muted-foreground">
                            The animation is masked using the E-AI-Arrow.svg to create the logo shape, ensuring the plasma stays within brand boundaries.
                          </P>
                        </div>
                        <div className="space-y-2">
                          <H4>Performance Optimization</H4>
                          <P className="text-sm text-muted-foreground">
                            Throttled to 60fps, pauses when tab is not visible, and uses efficient pixel manipulation for smooth animation.
                          </P>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50">
                      <CardHeader>
                        <CardTitle>Usage Across Platform</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <H4>Hero Section</H4>
                          <P className="text-sm text-muted-foreground">
                            Large size (256x256px) for maximum visual impact in the main hero area.
                          </P>
                        </div>
                        <div className="space-y-2">
                          <H4>Navigation</H4>
                          <P className="text-sm text-muted-foreground">
                            Medium size (128x128px) in headers and navigation elements.
                          </P>
                        </div>
                        <div className="space-y-2">
                          <H4>Favicon</H4>
                          <P className="text-sm text-muted-foreground">
                            Small size (64x64px) for browser tabs and bookmarks.
                          </P>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </Container>
            </Section>

            {/* Navigation */}
            <Section paddingY="lg" className="border-t border-border/50">
              <Container size="2xl">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <Link 
                    href="/design-system/animations" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Back to Animations
                  </Link>
                  <Link 
                    href="/design-system" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Design System Home
                  </Link>
                </div>
              </Container>
            </Section>
          </main>
        </div>
      </AppShell>
    </PageWrapper>
  )
}
