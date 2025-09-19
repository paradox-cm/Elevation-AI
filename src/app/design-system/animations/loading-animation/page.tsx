"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BodyLarge, H3 } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { PulsingLoadingAnimation, TravelingLoadingAnimation } from "@/components/animations/loading-animation"
import { useState } from "react"
import { Play, Pause, RotateCcw, Settings } from "lucide-react"

export default function LoadingAnimationPage() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [size, setSize] = useState(60)
  const [strokeWidth, setStrokeWidth] = useState(6)
  const [glowIntensity, setGlowIntensity] = useState(0.2)
  const [duration, setDuration] = useState(1.0)

  const resetAnimation = () => {
    setIsPlaying(false)
    setTimeout(() => setIsPlaying(true), 100)
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
              title="Loading Animation"
              description="Custom loading animation using the Elevation AI logo with tracing stroke effects and glowing blue highlights."
              size="xl"
              centered
            />
          </Section>

          {/* Animation Demo Section */}
          <Section paddingY="lg">
                <div className="grid gap-8">
                  {/* Main Animation Demo */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Interactive Loading Animation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-center justify-center p-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg">
                          {isPlaying && (
                            <TravelingLoadingAnimation
                              size={size}
                              strokeWidth={strokeWidth}
                              glowIntensity={glowIntensity}
                              duration={duration}
                            />
                          )}
                        </div>
                        
                        <div className="flex items-center justify-center gap-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsPlaying(!isPlaying)}
                          >
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            {isPlaying ? 'Pause' : 'Play'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={resetAnimation}
                          >
                            <RotateCcw className="h-4 w-4" />
                            Reset
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Animation Variants */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Traveling Variant</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                          <TravelingLoadingAnimation size={60} />
                        </div>
                        <BodyLarge className="mt-4 text-center text-muted-foreground">
                          Trail draws first, then head follows - best traveling effect
                        </BodyLarge>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Pulsing Variant</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                          <PulsingLoadingAnimation size={60} />
                        </div>
                        <BodyLarge className="mt-4 text-center text-muted-foreground">
                          Adds a subtle pulsing effect to the glow
                        </BodyLarge>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Controls */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Animation Controls
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Size: {size}px</label>
                            <input
                              type="range"
                              min="60"
                              max="200"
                              value={size}
                              onChange={(e) => setSize(Number(e.target.value))}
                              className="w-full mt-2"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Stroke Width: {strokeWidth}px</label>
                            <input
                              type="range"
                              min="1"
                              max="8"
                              value={strokeWidth}
                              onChange={(e) => setStrokeWidth(Number(e.target.value))}
                              className="w-full mt-2"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Glow Intensity: {glowIntensity}</label>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={glowIntensity}
                              onChange={(e) => setGlowIntensity(Number(e.target.value))}
                              className="w-full mt-2"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Duration: {duration}s</label>
                            <input
                              type="range"
                              min="0.5"
                              max="5"
                              step="0.5"
                              value={duration}
                              onChange={(e) => setDuration(Number(e.target.value))}
                              className="w-full mt-2"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Usage Examples */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Usage Examples</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <H3>Basic Usage</H3>
                          <div className="mt-2 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                            <pre className="text-sm">
                              <code>{`import { LoadingAnimation } from '@/components/animations/loading-animation'

<LoadingAnimation size={120} strokeWidth={3} />`}</code>
                            </pre>
                          </div>
                        </div>

                        <div>
                          <H3>With Custom Props</H3>
                          <div className="mt-2 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                            <pre className="text-sm">
                              <code>{`<LoadingAnimation
  size={80}
  strokeWidth={2}
  glowIntensity={0.6}
  duration={1.5}
  className="my-4"
/>`}</code>
                            </pre>
                          </div>
                        </div>

                        <div>
                          <H3>Variants</H3>
                          <div className="mt-2 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                            <pre className="text-sm">
                              <code>{`// Trail draws first, then head follows (best traveling effect)
<TravelingLoadingAnimation size={60} />

// Pulsing effect
<PulsingLoadingAnimation size={60} />`}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Implementation Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Implementation Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <H3>Animation Technique</H3>
                          <BodyLarge>
                            The animation uses SVG path tracing with <code>stroke-dasharray</code> and <code>stroke-dashoffset</code> 
                            to create a smooth tracing effect that follows the contours of the E-Arrow logo.
                          </BodyLarge>
                        </div>
                        
                        <div>
                          <H3>Visual Effects</H3>
                          <BodyLarge>
                            • <strong>Gradient Stroke:</strong> Blue gradient from light to dark blue<br/>
                            • <strong>Glow Effect:</strong> CSS filters and drop-shadows for the glowing appearance<br/>
                            • <strong>Background Stroke:</strong> Subtle background stroke for depth<br/>
                            • <strong>Smooth Animation:</strong> Cubic-bezier easing for natural motion
                          </BodyLarge>
                        </div>

                        <div>
                          <H3>Performance</H3>
                          <BodyLarge>
                            The animation is optimized for performance using CSS transitions and SVG path manipulation. 
                            It&apos;s lightweight and suitable for use as a loading indicator across the application.
                          </BodyLarge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
