"use client"


import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { H3, P } from "@/components/ui/typography"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ResponsiveTabs, ResponsiveTabsContent, ResponsiveTabsList, ResponsiveTabsTrigger } from "@/components/ui/responsive-tabs"
import { Separator } from "@/components/ui/separator"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import {
  borderWidths,
  borderStyles,
  borderColors,
  borderRadius,
  borderPrinciples,
  usageGuidelines,
  implementationExamples,
  cssCustomProperties,
  tailwindClasses
} from "@/lib/border-config"

export default function BorderPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container>
          <Section paddingY="xl">
            <PageHeader
              title="Border System"
              description="Consistent border widths, styles, colors, and radius values for creating clear visual boundaries and component styling."
              size="lg"
              centered
            />
          </Section>

          {/* Border Overview */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="shape-line" className="h-5 w-5" />
                  Border Overview
                </CardTitle>
                <CardDescription>
                  Our border system provides consistent visual boundaries through standardized widths, styles, colors, and radius values.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <H3 className="mb-3">Key Principles</H3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {borderPrinciples.map((principle) => (
                        <div key={principle.title} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Icon name={principle.icon as "ruler-line" | "eye-line" | "palette-line"} className="h-4 w-4 text-primary" />
                            <span className="font-semibold">{principle.title}</span>
                          </div>
                          <P className="text-sm text-muted-foreground">
                            {principle.description}
                          </P>
                          <div className="space-y-1">
                            {principle.examples.slice(0, 2).map((example) => (
                              <div key={example} className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full"></div>
                                <P className="text-xs text-muted-foreground">{example}</P>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <H3 className="mb-3">Border Components</H3>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Widths</span>
                          <Badge variant="outline">{borderWidths.length}</Badge>
                        </div>
                        <P className="text-sm text-muted-foreground">
                          Border thickness values from 0px to 8px
                        </P>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Styles</span>
                          <Badge variant="outline">{borderStyles.length}</Badge>
                        </div>
                        <P className="text-sm text-muted-foreground">
                          Border line styles including solid, dashed, and dotted
                        </P>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Colors</span>
                          <Badge variant="outline">{borderColors.length}</Badge>
                        </div>
                        <P className="text-sm text-muted-foreground">
                          Semantic border colors for different contexts
                        </P>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Radius</span>
                          <Badge variant="outline">{borderRadius.length}</Badge>
                        </div>
                        <P className="text-sm text-muted-foreground">
                          Border radius values for rounded corners
                        </P>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Border Specifications */}
          <Section paddingY="lg">
            <ResponsiveTabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <ResponsiveTabsList className="grid w-full grid-cols-4">
                <ResponsiveTabsTrigger value="widths">Widths</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="styles">Styles</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="colors">Colors</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="radius">Radius</ResponsiveTabsTrigger>
              </ResponsiveTabsList>

              <ResponsiveTabsContent value="widths" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Border Widths</CardTitle>
                    <CardDescription>
                      Standardized border width values for consistent visual boundaries
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {borderWidths.map((border) => (
                        <div key={border.name} className="space-y-3 p-4 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{border.name}</span>
                            <Badge variant="outline">{border.value}</Badge>
                          </div>
                          <P className="text-sm text-muted-foreground">{border.description}</P>
                          <div className="h-16 border rounded flex items-center justify-center bg-muted/20">
                            <div 
                              className="w-full h-full border rounded"
                              style={{ 
                                borderWidth: border.value,
                                borderColor: 'hsl(var(--border))'
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground">Usage:</span>
                            <P className="text-xs text-muted-foreground">{border.usage}</P>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              <ResponsiveTabsContent value="styles" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Border Styles</CardTitle>
                    <CardDescription>
                      Different border line styles for various visual effects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {borderStyles.map((border) => (
                        <div key={border.name} className="space-y-3 p-4 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{border.name}</span>
                            <Badge variant="outline">{border.value}</Badge>
                          </div>
                          <P className="text-sm text-muted-foreground">{border.description}</P>
                          <div className="h-16 border rounded flex items-center justify-center bg-muted/20">
                            <div 
                              className="w-full h-full border rounded"
                              style={{ 
                                borderStyle: border.value,
                                borderWidth: '2px',
                                borderColor: 'hsl(var(--border))'
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground">Usage:</span>
                            <P className="text-xs text-muted-foreground">{border.usage}</P>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              <ResponsiveTabsContent value="colors" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Border Colors</CardTitle>
                    <CardDescription>
                      Semantic border colors for different contexts and states
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {borderColors.map((border) => (
                        <div key={border.name} className="space-y-3 p-4 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{border.name}</span>
                            <Badge variant="outline">{border.category}</Badge>
                          </div>
                          <P className="text-sm text-muted-foreground">{border.description}</P>
                          <div className="h-16 border rounded flex items-center justify-center bg-muted/20">
                            <div 
                              className="w-full h-full border rounded"
                              style={{ 
                                borderWidth: '2px',
                                borderColor: border.value
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground">Usage:</span>
                            <P className="text-xs text-muted-foreground">{border.usage}</P>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              <ResponsiveTabsContent value="radius" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Border Radius</CardTitle>
                    <CardDescription>
                      Border radius values for creating rounded corners and shapes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {borderRadius.map((border) => (
                        <div key={border.name} className="space-y-3 p-4 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{border.name}</span>
                            <Badge variant="outline">{border.value}</Badge>
                          </div>
                          <P className="text-sm text-muted-foreground">{border.description}</P>
                          <div className="h-16 border rounded flex items-center justify-center bg-muted/20">
                            <div 
                              className="w-full h-full border bg-background"
                              style={{ 
                                borderRadius: border.value,
                                borderWidth: '2px',
                                borderColor: 'hsl(var(--border))'
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground">Usage:</span>
                            <P className="text-xs text-muted-foreground">{border.usage}</P>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>
            </ResponsiveTabs>
          </Section>

          {/* Usage Examples */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="code-line" className="h-5 w-5" />
                  Usage Examples
                </CardTitle>
                <CardDescription>
                  Common border usage patterns and implementation examples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <H3 className="mb-3">Form Inputs</H3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Default State</span>
                        <div className="h-10 border border-input rounded-md bg-background px-3 flex items-center">
                          <span className="text-sm text-muted-foreground">Input text</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Focus State</span>
                        <div className="h-10 border-2 border-ring rounded-md bg-background px-3 flex items-center">
                          <span className="text-sm">Focused input</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Error State</span>
                        <div className="h-10 border-2 border-destructive rounded-md bg-background px-3 flex items-center">
                          <span className="text-sm text-destructive">Error input</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <H3 className="mb-3">Cards and Containers</H3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Standard Card</span>
                        <div className="p-4 border rounded-lg bg-card">
                          <span className="text-sm">Card content</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Emphasized Card</span>
                        <div className="p-4 border-2 border-primary rounded-lg bg-card">
                          <span className="text-sm">Emphasized content</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Subtle Container</span>
                        <div className="p-4 border border-muted rounded-md bg-muted/20">
                          <span className="text-sm text-muted-foreground">Subtle content</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <H3 className="mb-3">Buttons and Interactive Elements</H3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Primary Button</span>
                        <div className="h-10 border border-primary rounded-md bg-primary px-4 flex items-center justify-center">
                          <span className="text-sm text-primary-foreground">Primary Button</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Secondary Button</span>
                        <div className="h-10 border border-input rounded-md bg-background px-4 flex items-center justify-center">
                          <span className="text-sm">Secondary Button</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Outline Button</span>
                        <div className="h-10 border-2 border-primary rounded-md bg-transparent px-4 flex items-center justify-center">
                          <span className="text-sm text-primary">Outline Button</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Usage Guidelines */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="guide-line" className="h-5 w-5" />
                  Usage Guidelines
                </CardTitle>
                <CardDescription>
                  Best practices for using borders effectively in your interfaces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-green-600">Do&apos;s</h3>
                    <div className="space-y-2">
                      {usageGuidelines.do.map((guideline, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Icon name="check-line" size="sm" className="text-green-500 mt-0.5" />
                          <span className="text-sm">{guideline}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-red-600">Don&apos;ts</h3>
                    <div className="space-y-2">
                      {usageGuidelines.dont.map((guideline, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Icon name="close-line" size="sm" className="text-red-500 mt-0.5" />
                          <span className="text-sm">{guideline}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* CSS Custom Properties & Tailwind Classes */}
          <Section paddingY="lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="code-line" className="h-5 w-5" />
                    CSS Custom Properties
                  </CardTitle>
                  <CardDescription>
                    CSS variables for consistent border values across your application.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <H3 className="mb-3">Border Widths</H3>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        {cssCustomProperties.widths.map((width, index) => (
                          <div key={index}>{width};</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <H3 className="mb-3">Border Radius</H3>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        {cssCustomProperties.radius.map((radius, index) => (
                          <div key={index}>{radius};</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="settings-line" className="h-5 w-5" />
                    Tailwind CSS Classes
                  </CardTitle>
                  <CardDescription>
                    Utility classes for implementing borders in your components.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <H3 className="mb-3">Border Widths</H3>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        {tailwindClasses.widths.map((width, index) => (
                          <div key={index}>{width}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <H3 className="mb-3">Border Styles</H3>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        {tailwindClasses.styles.map((style, index) => (
                          <div key={index}>{style}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <H3 className="mb-3">Border Radius</H3>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        {tailwindClasses.radius.map((radius, index) => (
                          <div key={index}>{radius}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Implementation Examples */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="reactjs-line" className="h-5 w-5" />
                  Implementation Examples
                </CardTitle>
                <CardDescription>
                  Code examples for implementing borders in your components.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <H3 className="mb-3">{implementationExamples.formInputs.title}</H3>
                    <P className="text-sm text-muted-foreground mb-3">
                      {implementationExamples.formInputs.description}
                    </P>
                    <div className="space-y-3">
                      {implementationExamples.formInputs.examples.map((example) => (
                        <div key={example.name} className="space-y-2">
                          <h4 className="font-semibold">{example.name}</h4>
                          <P className="text-sm text-muted-foreground">{example.description}</P>
                          <div className="bg-muted p-3 rounded font-mono text-sm">
                            {example.code}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <H3 className="mb-3">{implementationExamples.cards.title}</H3>
                    <P className="text-sm text-muted-foreground mb-3">
                      {implementationExamples.cards.description}
                    </P>
                    <div className="space-y-3">
                      {implementationExamples.cards.examples.map((example) => (
                        <div key={example.name} className="space-y-2">
                          <h4 className="font-semibold">{example.name}</h4>
                          <P className="text-sm text-muted-foreground">{example.description}</P>
                          <div className="bg-muted p-3 rounded font-mono text-sm">
                            {example.code}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <H3 className="mb-3">{implementationExamples.buttons.title}</H3>
                    <P className="text-sm text-muted-foreground mb-3">
                      {implementationExamples.buttons.description}
                    </P>
                    <div className="space-y-3">
                      {implementationExamples.buttons.examples.map((example) => (
                        <div key={example.name} className="space-y-2">
                          <h4 className="font-semibold">{example.name}</h4>
                          <P className="text-sm text-muted-foreground">{example.description}</P>
                          <div className="bg-muted p-3 rounded font-mono text-sm">
                            {example.code}
                          </div>
                        </div>
                      ))}
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
