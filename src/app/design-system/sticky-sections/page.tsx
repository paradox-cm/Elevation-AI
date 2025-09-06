"use client"


import React from 'react'
import { PageWrapper } from '@/components/page-wrapper'
import { AppShell } from '@/components/ui/layout/app-shell'
import { Container } from '@/components/ui/layout/container'
import { Section } from '@/components/ui/layout/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { H1, H2, H3, BodyLarge, BodySmall } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import { SCROLL_STANDARDS } from '@/lib/scroll-standards'
import { DesignSystemSidebar } from '@/components/ui/design-system-sidebar'
import { DesignSystemNavigation } from '@/components/ui/design-system-navigation'

export default function StickySectionsPage() {
  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="sticky-sections" />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container size="2xl">
          <Section paddingY="xl">
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <H1>Sticky Sections</H1>
                <BodyLarge className="text-muted-foreground">
                  Global standards for sticky sections with scroll-triggered content progression.
                </BodyLarge>
              </div>

          {/* Standards Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Scroll Standards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <H3>Slide Dimensions</H3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <BodySmall>Slide Height:</BodySmall>
                      <Badge variant="secondary">{SCROLL_STANDARDS.SLIDE_HEIGHT}px</Badge>
                    </div>
                    <div className="flex justify-between">
                      <BodySmall>Buffer Size:</BodySmall>
                      <Badge variant="secondary">{SCROLL_STANDARDS.BUFFER_SIZE}px</Badge>
                    </div>
                    <div className="flex justify-between">
                      <BodySmall>Main Content:</BodySmall>
                      <Badge variant="secondary">{SCROLL_STANDARDS.MAIN_CONTENT}px</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <H3>Input Methods</H3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <BodySmall>Spacebar:</BodySmall>
                      <Badge variant="secondary">1 press per slide</Badge>
                    </div>
                    <div className="flex justify-between">
                      <BodySmall>Mouse Wheel:</BodySmall>
                      <Badge variant="secondary">{SCROLL_STANDARDS.MOUSE_WHEEL_CLICKS_PER_SLIDE} clicks per slide</Badge>
                    </div>
                    <div className="flex justify-between">
                      <BodySmall>Trackpad:</BodySmall>
                      <Badge variant="secondary">{SCROLL_STANDARDS.TRACKPAD_SWIPES_PER_SLIDE} swipes per slide</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Buffer Zone Structure */}
          <Card>
            <CardHeader>
              <CardTitle>Buffer Zone Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span>Enter Buffer (20%)</span>
                    <span>80px</span>
                  </div>
                  <div className="h-2 bg-primary/20 rounded mt-2"></div>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span>Main Content (60%)</span>
                    <span>240px</span>
                  </div>
                  <div className="h-2 bg-primary rounded mt-2"></div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span>Exit Buffer (20%)</span>
                    <span>80px</span>
                  </div>
                  <div className="h-2 bg-primary/20 rounded mt-2"></div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <BodySmall className="text-blue-700 dark:text-blue-300">
                  <strong>Total per slide:</strong> {SCROLL_STANDARDS.SLIDE_HEIGHT}px (Enter Buffer + Main Content + Exit Buffer)
                </BodySmall>
              </div>
              
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <BodySmall className="text-green-700 dark:text-green-300">
                  <strong>Scroll Spacer:</strong> Dynamic height based on number of slides ({SCROLL_STANDARDS.SLIDE_HEIGHT}px × slides + 200px buffer)
                </BodySmall>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <H3>1. Import ScrollEventManager</H3>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`import { ScrollEventManager } from '@/lib/scroll-standards'`}
                </pre>
              </div>
              
              <div className="space-y-2">
                <H3>2. Initialize ScrollEventManager</H3>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`const [activeTab, setActiveTab] = React.useState(0)
const sectionRef = React.useRef<HTMLDivElement>(null)
const scrollManagerRef = React.useRef<ScrollEventManager | null>(null)

React.useEffect(() => {
  if (!sectionRef.current) return
  scrollManagerRef.current = new ScrollEventManager(totalSlides, (tabIndex) => {
    setActiveTab(tabIndex)
  })
  // ... event listeners
}, [totalSlides])`}
                </pre>
              </div>
              
              <div className="space-y-2">
                <H3>3. Handle Manual Interactions</H3>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`const handleTabClick = (tabIndex: number) => {
  setActiveTab(tabIndex)
  if (scrollManagerRef.current) {
    scrollManagerRef.current.setCurrentSlide(tabIndex)
  }
}`}
                </pre>
              </div>
              
              <div className="space-y-2">
                <H3>4. Container Structure</H3>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<div ref={sectionRef} className="sticky top-20 h-[calc(100vh-5rem)]">
  {/* Content with activeTab state */}
</div>
<div className="h-[400px * slides + 200px]">
  {/* Scroll spacer */}
</div>`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* ScrollEventManager Features */}
          <Card>
            <CardHeader>
              <CardTitle>ScrollEventManager Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <H3>Core Features</H3>
                  <ul className="space-y-1 text-sm">
                    <li>• One-action-one-slide behavior</li>
                    <li>• Manual slide setting with setCurrentSlide()</li>
                    <li>• Debounced scroll events (150ms)</li>
                    <li>• Cooldown periods (500ms)</li>
                    <li>• Automatic cleanup on destroy()</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <H3>Event Handling</H3>
                  <ul className="space-y-1 text-sm">
                    <li>• Wheel events with passive: false</li>
                    <li>• Scroll events with passive: true</li>
                    <li>• Prevents default on wheel events</li>
                    <li>• Handles both mouse and trackpad input</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <H3>PlatformSection (Tab Navigation)</H3>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`// Features array with 5 tabs
const features = [/* ... */]
const [activeTab, setActiveTab] = React.useState(0)
const scrollManagerRef = React.useRef<ScrollEventManager | null>(null)

// Initialize with 5 slides
scrollManagerRef.current = new ScrollEventManager(features.length, (tabIndex) => {
  setActiveTab(tabIndex)
})

// Handle tab clicks
const handleTabClick = (tabIndex: number) => {
  setActiveTab(tabIndex)
  if (scrollManagerRef.current) {
    scrollManagerRef.current.setCurrentSlide(tabIndex)
  }
}`}
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <H3>ProblemSection (Step Indicators)</H3>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`// 5 steps with step indicators
const steps = [/* ... */]
const [activeStep, setActiveStep] = React.useState(0)
const scrollManagerRef = React.useRef<ScrollEventManager | null>(null)

// Initialize with 5 slides
scrollManagerRef.current = new ScrollEventManager(steps.length, (stepIndex) => {
  setActiveStep(stepIndex)
})

// Handle step clicks
const handleStepClick = (stepIndex: number) => {
  setActiveStep(stepIndex)
  if (scrollManagerRef.current) {
    scrollManagerRef.current.setCurrentSlide(stepIndex)
  }
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accessibility Features */}
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <H3>Keyboard Navigation</H3>
                  <ul className="space-y-1 text-sm">
                    <li>• Spacebar: One slide per press</li>
                    <li>• Arrow keys: One slide per press</li>
                    <li>• Tab: Navigate between interactive elements</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <H3>Mouse/Trackpad</H3>
                  <ul className="space-y-1 text-sm">
                    <li>• Mouse wheel: 3-4 clicks per slide</li>
                    <li>• Trackpad: 2-3 swipes per slide</li>
                    <li>• Smooth transitions between slides</li>
                  </ul>
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
