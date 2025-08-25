"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Grid } from "@/components/ui/layout/grid"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { H1, H2, H3, H4, BodyLarge, BodySmall, Caption } from "@/components/ui/typography"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"

export default function SpacingPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showGrid, setShowGrid] = useState(false)
  const [selectedSpacing, setSelectedSpacing] = useState("4")

  // Comprehensive spacing scale
  const spacingScale = [
    { name: "0", value: 0, class: "0", description: "No spacing" },
    { name: "0.5", value: 2, class: "0.5", description: "Tiny spacing" },
    { name: "1", value: 4, class: "1", description: "Extra small spacing" },
    { name: "1.5", value: 6, class: "1.5", description: "Small spacing" },
    { name: "2", value: 8, class: "2", description: "Small spacing" },
    { name: "2.5", value: 10, class: "2.5", description: "Small-medium spacing" },
    { name: "3", value: 12, class: "3", description: "Medium spacing" },
    { name: "3.5", value: 14, class: "3.5", description: "Medium spacing" },
    { name: "4", value: 16, class: "4", description: "Medium spacing" },
    { name: "5", value: 20, class: "5", description: "Medium-large spacing" },
    { name: "6", value: 24, class: "6", description: "Large spacing" },
    { name: "7", value: 28, class: "7", description: "Large spacing" },
    { name: "8", value: 32, class: "8", description: "Extra large spacing" },
    { name: "9", value: 36, class: "9", description: "Extra large spacing" },
    { name: "10", value: 40, class: "10", description: "Extra large spacing" },
    { name: "11", value: 44, class: "11", description: "Extra large spacing" },
    { name: "12", value: 48, class: "12", description: "Extra large spacing" },
    { name: "14", value: 56, class: "14", description: "Huge spacing" },
    { name: "16", value: 64, class: "16", description: "Huge spacing" },
    { name: "20", value: 80, class: "20", description: "Massive spacing" },
    { name: "24", value: 96, class: "24", description: "Massive spacing" },
    { name: "28", value: 112, class: "28", description: "Massive spacing" },
    { name: "32", value: 128, class: "32", description: "Massive spacing" },
  ]

  // Container sizes
  const containerSizes = [
    { name: "xs", value: 475, class: "max-w-xs", description: "Extra small containers" },
    { name: "sm", value: 640, class: "max-w-sm", description: "Small containers" },
    { name: "md", value: 768, class: "max-w-md", description: "Medium containers" },
    { name: "lg", value: 1024, class: "max-w-lg", description: "Large containers" },
    { name: "xl", value: 1280, class: "max-w-xl", description: "Extra large containers" },
    { name: "2xl", value: 1536, class: "max-w-2xl", description: "2X large containers" },
    { name: "3xl", value: 1920, class: "max-w-3xl", description: "3X large containers" },
    { name: "4xl", value: 2560, class: "max-w-4xl", description: "4X large containers" },
    { name: "5xl", value: 3200, class: "max-w-5xl", description: "5X large containers" },
    { name: "6xl", value: 3840, class: "max-w-6xl", description: "6X large containers" },
    { name: "7xl", value: 4480, class: "max-w-7xl", description: "7X large containers" },
  ]

  // Spacing usage examples
  const spacingExamples = [
    {
      title: "Component Internal Spacing",
      description: "Spacing within individual components",
      examples: [
        { label: "Button padding", spacing: "2", class: "p-2" },
        { label: "Card padding", spacing: "4", class: "p-4" },
        { label: "Form field spacing", spacing: "3", class: "space-y-3" },
        { label: "Icon button", spacing: "2", class: "p-2" },
      ]
    },
    {
      title: "Component External Spacing",
      description: "Spacing between components and sections",
      examples: [
        { label: "Card margins", spacing: "4", class: "m-4" },
        { label: "Section padding", spacing: "8", class: "py-8" },
        { label: "Grid gaps", spacing: "6", class: "gap-6" },
        { label: "List item spacing", spacing: "2", class: "space-y-2" },
      ]
    },
    {
      title: "Layout Spacing",
      description: "Spacing for page layouts and major sections",
      examples: [
        { label: "Page sections", spacing: "12", class: "py-12" },
        { label: "Hero sections", spacing: "16", class: "py-16" },
        { label: "Container padding", spacing: "4", class: "px-4" },
        { label: "Footer spacing", spacing: "8", class: "py-8" },
      ]
    }
  ]

  // Spacing rules and guidelines
  const spacingRules = [
    {
      title: "Consistency",
      description: "Use the spacing scale consistently throughout your application",
      icon: "ruler-line",
      examples: ["Always use predefined spacing values", "Don't mix different spacing systems", "Maintain visual rhythm"]
    },
    {
      title: "Hierarchy",
      description: "Use spacing to create visual hierarchy and relationships",
      icon: "layout-line",
      examples: ["Related elements should have less spacing", "Unrelated elements should have more spacing", "Use spacing to group content"]
    },
    {
      title: "Responsiveness",
      description: "Adjust spacing for different screen sizes",
      icon: "smartphone-line",
      examples: ["Reduce spacing on mobile devices", "Increase spacing on larger screens", "Use responsive spacing utilities"]
    },
    {
      title: "Accessibility",
      description: "Ensure spacing doesn't interfere with accessibility",
      icon: "eye-line",
      examples: ["Maintain sufficient touch targets", "Don't make elements too close together", "Consider screen reader navigation"]
    }
  ]

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container>
          <Section paddingY="xl">
            <PageHeader
              title="Spacing System"
              description="A comprehensive spacing system that provides consistent, scalable spacing values for creating harmonious layouts and maintaining visual hierarchy across all components and pages."
              size="lg"
              centered
            />
          </Section>

          {/* Spacing System Overview */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ruler-line" className="h-5 w-5" />
                  Spacing System Overview
                </CardTitle>
                <CardDescription>
                  Our spacing system is built on a consistent scale that ensures visual harmony and maintains proper relationships between elements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="check-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Consistent Scale</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Based on a 4px base unit with consistent multipliers for predictable spacing relationships.
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="check-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Responsive Design</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Spacing adapts to different screen sizes while maintaining visual hierarchy and relationships.
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="check-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Accessibility First</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Spacing values ensure proper touch targets and screen reader navigation without compromising design.
                    </BodySmall>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Interactive Spacing Documentation */}
          <Section paddingY="lg">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="scale">Spacing Scale</TabsTrigger>
                <TabsTrigger value="usage">Usage Examples</TabsTrigger>
                <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Spacing Scale Foundation</CardTitle>
                    <CardDescription>
                      Our spacing system is built on a 4px base unit, creating a consistent and scalable foundation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <H4>Base Unit: 4px</H4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <span className="font-mono text-sm">4px</span>
                            <div className="w-4 h-4 bg-primary rounded"></div>
                          </div>
                          <BodySmall className="text-muted-foreground">
                            All spacing values are multiples of 4px, ensuring consistency and predictability.
                          </BodySmall>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <H4>Common Multipliers</H4>
                        <div className="space-y-2">
                          {[1, 2, 4, 8, 16].map((multiplier) => (
                            <div key={multiplier} className="flex items-center justify-between p-2 border rounded">
                              <span className="font-mono text-sm">{multiplier}x</span>
                              <span className="font-mono text-sm">{multiplier * 4}px</span>
                              <div className="w-2 h-2 bg-muted-foreground rounded" style={{ width: `${Math.min(multiplier * 4, 32)}px` }}></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Spacing Categories</CardTitle>
                    <CardDescription>
                      Different types of spacing serve different purposes in your design system.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Icon name="component-line" className="h-4 w-4 text-blue-500" />
                          <H4>Component Spacing</H4>
                        </div>
                        <BodySmall className="text-muted-foreground">
                          Internal spacing within components (padding, margins between elements).
                        </BodySmall>
                        <div className="space-y-1">
                          <div className="text-xs font-mono">p-2, p-4, space-y-2</div>
                          <div className="text-xs font-mono">4px - 16px range</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Icon name="layout-line" className="h-4 w-4 text-green-500" />
                          <H4>Layout Spacing</H4>
                        </div>
                        <BodySmall className="text-muted-foreground">
                          Spacing between components and major sections (grids, sections).
                        </BodySmall>
                        <div className="space-y-1">
                          <div className="text-xs font-mono">gap-6, py-8, my-12</div>
                          <div className="text-xs font-mono">24px - 64px range</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Icon name="fullscreen-line" className="h-4 w-4 text-purple-500" />
                          <H4>Page Spacing</H4>
                        </div>
                        <BodySmall className="text-muted-foreground">
                          Large spacing for page-level layouts and major sections.
                        </BodySmall>
                        <div className="space-y-1">
                          <div className="text-xs font-mono">py-16, my-20, px-8</div>
                          <div className="text-xs font-mono">64px+ range</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Spacing Scale Tab */}
              <TabsContent value="scale" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Complete Spacing Scale</CardTitle>
                    <CardDescription>
                      Interactive spacing scale with visual representations and usage examples.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {spacingScale.map((spacing) => (
                        <div key={spacing.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-16 text-center">
                              <div className="font-mono font-bold">{spacing.name}</div>
                              <Caption className="text-muted-foreground">{spacing.value}px</Caption>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div 
                                  className="bg-primary rounded transition-all duration-200"
                                  style={{ 
                                    width: `${Math.min(spacing.value, 200)}px`, 
                                    height: '8px',
                                    opacity: selectedSpacing === spacing.name ? 1 : 0.6
                                  }}
                                ></div>
                                <Badge variant="outline" className="text-xs">
                                  {spacing.class}
                                </Badge>
                              </div>
                              <BodySmall className="text-muted-foreground">
                                {spacing.description}
                              </BodySmall>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant={selectedSpacing === spacing.name ? "default" : "outline"}
                              onClick={() => setSelectedSpacing(spacing.name)}
                            >
                              Select
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Container Sizes</CardTitle>
                    <CardDescription>
                      Responsive container sizes for different content types and screen sizes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {containerSizes.map((container) => (
                        <div key={container.name} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-16 text-center">
                              <div className="font-mono font-bold">{container.name}</div>
                              <Caption className="text-muted-foreground">{container.value}px</Caption>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div 
                                  className="bg-muted-foreground rounded"
                                  style={{ 
                                    width: `${Math.min(container.value / 10, 200)}px`, 
                                    height: '6px' 
                                  }}
                                ></div>
                                <Badge variant="outline" className="text-xs">
                                  {container.class}
                                </Badge>
                              </div>
                              <BodySmall className="text-muted-foreground">
                                {container.description}
                              </BodySmall>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Usage Examples Tab */}
              <TabsContent value="usage" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Spacing Usage Examples</CardTitle>
                    <CardDescription>
                      Real-world examples of how to apply spacing in different contexts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {spacingExamples.map((category, index) => (
                        <div key={index} className="space-y-4">
                          <div>
                            <H4>{category.title}</H4>
                            <BodySmall className="text-muted-foreground">{category.description}</BodySmall>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            {category.examples.map((example, exampleIndex) => (
                              <div key={exampleIndex} className="p-4 border rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium">{example.label}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {example.spacing} ({parseFloat(example.spacing) * 4}px)
                                  </Badge>
                                </div>
                                <div className={`bg-muted rounded p-2 ${example.class}`}>
                                  <div className="bg-background rounded p-2 text-center text-sm">
                                    Example content
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <code className="text-xs bg-muted px-2 py-1 rounded">
                                    {example.class}
                                  </code>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Spacing Demo</CardTitle>
                    <CardDescription>
                      Experiment with different spacing values to see how they affect layout.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Label htmlFor="spacing-demo">Spacing Value:</Label>
                        <Input
                          id="spacing-demo"
                          type="range"
                          min="0"
                          max="16"
                          step="0.5"
                          value={selectedSpacing}
                          onChange={(e) => setSelectedSpacing(e.target.value)}
                          className="w-32"
                        />
                        <Badge variant="outline">
                          {selectedSpacing} ({parseFloat(selectedSpacing) * 4}px)
                        </Badge>
                        <Switch
                          checked={showGrid}
                          onCheckedChange={setShowGrid}
                        />
                        <Label>Show Grid</Label>
                      </div>
                      
                      <div className={`border rounded-lg p-4 ${showGrid ? 'bg-grid-pattern' : ''}`}>
                        <div 
                          className="bg-primary/20 rounded transition-all duration-200"
                          style={{ 
                            padding: `${parseFloat(selectedSpacing) * 4}px`,
                            margin: `${parseFloat(selectedSpacing) * 2}px`
                          }}
                        >
                          <div className="bg-primary/40 rounded p-2 text-center text-sm">
                            Content with {selectedSpacing} spacing
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Guidelines Tab */}
              <TabsContent value="guidelines" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Spacing Guidelines & Best Practices</CardTitle>
                    <CardDescription>
                      Essential rules and guidelines for using spacing effectively in your designs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {spacingRules.map((rule, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Icon name={rule.icon} className="h-5 w-5 text-primary" />
                            <H4>{rule.title}</H4>
                          </div>
                          <BodySmall className="text-muted-foreground ml-8">
                            {rule.description}
                          </BodySmall>
                          <div className="ml-8 space-y-1">
                            {rule.examples.map((example, exampleIndex) => (
                              <div key={exampleIndex} className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full"></div>
                                <BodySmall>{example}</BodySmall>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Spacing Do's and Don'ts</CardTitle>
                    <CardDescription>
                      Quick reference for spacing best practices and common mistakes to avoid.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <H4 className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <Icon name="check-line" className="h-4 w-4" />
                          Do's
                        </H4>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-green-500 rounded-full mt-2"></div>
                            <BodySmall>Use consistent spacing values from the scale</BodySmall>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-green-500 rounded-full mt-2"></div>
                            <BodySmall>Increase spacing for visual hierarchy</BodySmall>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-green-500 rounded-full mt-2"></div>
                            <BodySmall>Use responsive spacing for different screen sizes</BodySmall>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-green-500 rounded-full mt-2"></div>
                            <BodySmall>Group related elements with consistent spacing</BodySmall>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <H4 className="flex items-center gap-2 text-red-600 dark:text-red-400">
                          <Icon name="close-line" className="h-4 w-4" />
                          Don'ts
                        </H4>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-red-500 rounded-full mt-2"></div>
                            <BodySmall>Mix different spacing systems or arbitrary values</BodySmall>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-red-500 rounded-full mt-2"></div>
                            <BodySmall>Use too much spacing between related elements</BodySmall>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-red-500 rounded-full mt-2"></div>
                            <BodySmall>Ignore spacing on mobile devices</BodySmall>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-red-500 rounded-full mt-2"></div>
                            <BodySmall>Create inconsistent spacing patterns</BodySmall>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Implementation Notes</CardTitle>
                    <CardDescription>
                      Technical details and implementation guidance for developers.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <H4>Tailwind CSS Classes</H4>
                        <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                          <div>// Spacing utilities</div>
                          <div>p-4 → padding: 1rem (16px)</div>
                          <div>m-6 → margin: 1.5rem (24px)</div>
                          <div>space-y-2 → gap: 0.5rem (8px)</div>
                          <div>gap-4 → gap: 1rem (16px)</div>
                        </div>
                      </div>
                      <div>
                        <H4>CSS Custom Properties</H4>
                        <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                          <div>// Available CSS variables</div>
                          <div>--spacing-1: 0.25rem (4px)</div>
                          <div>--spacing-2: 0.5rem (8px)</div>
                          <div>--spacing-4: 1rem (16px)</div>
                          <div>--spacing-8: 2rem (32px)</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
