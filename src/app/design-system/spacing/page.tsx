"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { H4, BodySmall, Caption } from "@/components/ui/typography"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ResponsiveTabs, ResponsiveTabsContent, ResponsiveTabsList, ResponsiveTabsTrigger } from "@/components/ui/responsive-tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import {
  spacingScale,
  containerSizes,
  spacingExamples,
  spacingRules,
  spacingFoundation,
  spacingCategories
} from "@/lib/spacing-config"

export default function SpacingPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showGrid, setShowGrid] = useState(false)
  const [selectedSpacing, setSelectedSpacing] = useState("4")

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
            <ResponsiveTabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <ResponsiveTabsList className="grid w-full grid-cols-4">
                <ResponsiveTabsTrigger value="overview">Overview</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="scale">Spacing Scale</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="usage">Usage Examples</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="guidelines">Guidelines</ResponsiveTabsTrigger>
              </ResponsiveTabsList>

              {/* Overview Tab */}
              <ResponsiveTabsContent value="overview" className="space-y-6">
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
                        <H4>Base Unit: {spacingFoundation.baseUnit}{spacingFoundation.unit}</H4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <span className="font-mono text-sm">{spacingFoundation.baseUnit}{spacingFoundation.unit}</span>
                            <div className="w-4 h-4 bg-primary rounded"></div>
                          </div>
                          <BodySmall className="text-muted-foreground">
                            {spacingFoundation.description}
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
                      {Object.entries(spacingCategories).map(([key, category]) => (
                        <div key={key} className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Icon name={category.icon} className="h-4 w-4 text-blue-500" />
                            <H4>{category.title}</H4>
                          </div>
                          <BodySmall className="text-muted-foreground">
                            {category.description}
                          </BodySmall>
                          <div className="space-y-1">
                            <div className="text-xs font-mono">{category.examples[0]}</div>
                            <div className="text-xs font-mono">{category.range} range</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Spacing Scale Tab */}
              <ResponsiveTabsContent value="scale" className="space-y-6">
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
                              <div className="mt-1">
                                <div className="text-xs text-muted-foreground">
                                  Usage: {spacing.usage.slice(0, 2).join(', ')}
                                </div>
                              </div>
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
                                {container.breakpoint && (
                                  <Badge variant="secondary" className="text-xs">
                                    {container.breakpoint}
                                  </Badge>
                                )}
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
              </ResponsiveTabsContent>

              {/* Usage Examples Tab */}
              <ResponsiveTabsContent value="usage" className="space-y-6">
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
                                <div className="mt-1">
                                  <div className="text-xs text-muted-foreground">
                                    {example.context}
                                  </div>
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
              </ResponsiveTabsContent>

              {/* Guidelines Tab */}
              <ResponsiveTabsContent value="guidelines" className="space-y-6">
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
                            <Badge variant={rule.category === 'do' ? 'default' : 'destructive'} className="text-xs">
                              {rule.category === 'do' ? 'Do' : "Don't"}
                            </Badge>
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
                          {spacingRules.filter(rule => rule.category === 'do').map((rule, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-green-500 rounded-full mt-2"></div>
                              <BodySmall>{rule.examples[0]}</BodySmall>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <H4 className="flex items-center gap-2 text-red-600 dark:text-red-400">
                          <Icon name="close-line" className="h-4 w-4" />
                          Don'ts
                        </H4>
                        <div className="space-y-2">
                          {spacingRules.filter(rule => rule.category === 'dont').map((rule, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-red-500 rounded-full mt-2"></div>
                              <BodySmall>{rule.examples[0]}</BodySmall>
                            </div>
                          ))}
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
              </ResponsiveTabsContent>
            </ResponsiveTabs>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
