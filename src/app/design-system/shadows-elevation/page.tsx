"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { H4, BodySmall } from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ResponsiveTabs, ResponsiveTabsContent, ResponsiveTabsList, ResponsiveTabsTrigger } from "@/components/ui/responsive-tabs"

import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import {
  shadowScale,
  elevationLevels,
  componentExamples,
  usageGuidelines,
  cssCustomProperties,
  tailwindClasses,
  accessibilityConsiderations,
  implementationExamples
} from "@/lib/shadows-elevation-config"

export default function ShadowsElevationPage() {
  const [activeShadow, setActiveShadow] = useState("md")

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container>
          <Section paddingY="xl">
            <PageHeader
              title="Shadows & Elevation"
              description="Comprehensive shadow system and elevation levels for creating depth, hierarchy, and modern interfaces with proper visual layering."
              size="lg"
              centered
            />
          </Section>
          
          <Section paddingY="lg">
            <ResponsiveTabs defaultValue="scale" className="space-y-8">
              <ResponsiveTabsList className="grid w-full grid-cols-4">
                <ResponsiveTabsTrigger value="scale">Shadow Scale</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="elevation">Elevation Levels</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="guidelines">Guidelines</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="implementation">Implementation</ResponsiveTabsTrigger>
              </ResponsiveTabsList>

              {/* Shadow Scale Tab */}
              <ResponsiveTabsContent value="scale" className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name="stack-line" className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Shadow Scale</CardTitle>
                        <CardDescription>
                          Our shadow system provides consistent depth values for different interface elements.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {shadowScale.map((shadow) => (
                        <div key={shadow.name} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <H4>{shadow.name}</H4>
                              <BodySmall className="text-muted-foreground">{shadow.elevation}</BodySmall>
                            </div>
                            <Badge variant="secondary" className="font-mono text-xs">
                              {shadow.class}
                            </Badge>
                          </div>
                          
                          <div 
                            className={`w-full h-24 bg-card border rounded-lg flex items-center justify-center ${shadow.class}`}
                          >
                            <BodySmall className="text-muted-foreground font-medium">
                              {shadow.name}
                            </BodySmall>
                          </div>
                          
                          <BodySmall className="text-muted-foreground leading-relaxed">
                            {shadow.description}
                          </BodySmall>
                          <div className="mt-2">
                            <div className="text-xs text-muted-foreground">
                              Usage: {shadow.usage.slice(0, 2).join(', ')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Interactive Demo */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Icon name="play-circle-line" className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <CardTitle>Interactive Preview</CardTitle>
                        <CardDescription>
                          Select different shadow values to see how they affect the appearance of elements.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {shadowScale.map((shadow) => (
                        <Button
                          key={shadow.name}
                          variant={activeShadow === shadow.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveShadow(shadow.value)}
                        >
                          {shadow.name}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <H4>Card Example</H4>
                        <div className={`p-6 bg-card border rounded-lg ${activeShadow === 'none' ? 'shadow-none' : activeShadow === 'xs' ? 'shadow-xs' : activeShadow === 'sm' ? 'shadow-sm' : activeShadow === 'md' ? 'shadow-md' : activeShadow === 'lg' ? 'shadow-lg' : activeShadow === 'xl' ? 'shadow-xl' : 'shadow-2xl'}`}>
                          <H4 className="mb-2">Sample Card</H4>
                          <BodySmall className="text-muted-foreground">
                            This card demonstrates how shadows create depth and visual hierarchy.
                          </BodySmall>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <H4>Button Example</H4>
                        <Button className={activeShadow === 'none' ? 'shadow-none' : activeShadow === 'xs' ? 'shadow-xs' : activeShadow === 'sm' ? 'shadow-sm' : activeShadow === 'md' ? 'shadow-md' : activeShadow === 'lg' ? 'shadow-lg' : activeShadow === 'xl' ? 'shadow-xl' : 'shadow-2xl'}>
                          Sample Button
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <H4>Input Example</H4>
                        <Input 
                          placeholder="Sample input field"
                          className={activeShadow === 'none' ? 'shadow-none' : activeShadow === 'xs' ? 'shadow-xs' : activeShadow === 'sm' ? 'shadow-sm' : activeShadow === 'md' ? 'shadow-md' : activeShadow === 'lg' ? 'shadow-lg' : activeShadow === 'xl' ? 'shadow-xl' : 'shadow-2xl'}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Elevation Levels Tab */}
              <ResponsiveTabsContent value="elevation" className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <Icon name="layers-line" className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <CardTitle>Elevation Levels</CardTitle>
                        <CardDescription>
                          Systematic approach to elevation that creates clear visual hierarchy and depth.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      {elevationLevels.map((level) => (
                        <div key={level.name} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-shrink-0">
                            <div className={`w-16 h-16 bg-card border rounded-lg flex items-center justify-center ${level.shadowClass}`}>
                              <span className="text-xs font-medium">L{level.level}</span>
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <H4>{level.name}</H4>
                              <Badge variant="secondary" className="text-xs">
                                Level {level.level}
                              </Badge>
                            </div>
                            <BodySmall className="text-muted-foreground mb-3">
                              {level.description}
                            </BodySmall>
                            <div>
                              <BodySmall className="font-medium mb-1">Usage:</BodySmall>
                              <BodySmall className="text-muted-foreground mb-2">{level.usage}</BodySmall>
                              <BodySmall className="font-medium mb-1">Examples:</BodySmall>
                              <div className="flex flex-wrap gap-1">
                                {level.examples.map((example) => (
                                  <Badge key={example} variant="outline" className="text-xs">
                                    {example}
                                  </Badge>
                                ))}
                              </div>
                              <div className="mt-2">
                                <BodySmall className="font-medium mb-1">Use Cases:</BodySmall>
                                <div className="flex flex-wrap gap-1">
                                  {level.useCases.slice(0, 2).map((useCase) => (
                                    <Badge key={useCase} variant="secondary" className="text-xs">
                                      {useCase}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Real Component Examples */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Icon name="component-line" className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <CardTitle>Component Elevation Examples</CardTitle>
                        <CardDescription>
                          See how elevation works in actual component combinations.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <H4>Card Stack Example</H4>
                        <div className="relative">
                          <div className="absolute inset-0 bg-card border rounded-lg shadow-2xl transform translate-y-2"></div>
                          <div className="absolute inset-0 bg-card border rounded-lg shadow-xl transform translate-y-1"></div>
                          <div className="relative bg-card border rounded-lg shadow-lg p-4">
                            <H4 className="mb-2">Primary Card</H4>
                            <BodySmall className="text-muted-foreground">
                              This demonstrates how multiple elevation levels create depth.
                            </BodySmall>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <H4>Component Examples</H4>
                        <div className="space-y-3">
                          {componentExamples.slice(0, 3).map((example) => (
                            <div key={example.name} className="p-3 bg-card border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <BodySmall className="font-medium">{example.name}</BodySmall>
                                <Badge variant="outline" className="text-xs">
                                  {example.elevationLevel}
                                </Badge>
                              </div>
                              <BodySmall className="text-muted-foreground text-xs">
                                {example.description}
                              </BodySmall>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Guidelines Tab */}
              <ResponsiveTabsContent value="guidelines" className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Icon name="book-line" className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <CardTitle>Usage Guidelines</CardTitle>
                        <CardDescription>
                          Best practices for applying shadows and elevation effectively in your designs.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {usageGuidelines.map((guideline) => (
                        <div key={guideline.title} className="flex items-start space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                            <Icon name={guideline.icon} className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <H4>{guideline.title}</H4>
                              <Badge variant={guideline.category === 'do' ? 'default' : 'destructive'} className="text-xs">
                                {guideline.category === 'do' ? 'Do' : "Don't"}
                              </Badge>
                            </div>
                            <BodySmall className="text-muted-foreground leading-relaxed mb-2">
                              {guideline.description}
                            </BodySmall>
                            <div className="space-y-1">
                              {guideline.examples.slice(0, 2).map((example, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                                  <BodySmall className="text-xs">{example}</BodySmall>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon name="check-line" className="h-5 w-5 text-green-500" />
                        <span>Do</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {usageGuidelines.filter(guideline => guideline.category === 'do').map((guideline, index) => (
                          <BodySmall key={index}>✓ {guideline.examples[0]}</BodySmall>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon name="close-line" className="h-5 w-5 text-red-500" />
                        <span>Don't</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {usageGuidelines.filter(guideline => guideline.category === 'dont').map((guideline, index) => (
                          <BodySmall key={index}>✗ {guideline.examples[0]}</BodySmall>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <Icon name="eye-line" className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <CardTitle>Accessibility Considerations</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <H4 className="mb-3">{accessibilityConsiderations.visual.title}</H4>
                        <div className="space-y-2">
                          {accessibilityConsiderations.visual.points.map((point, index) => (
                            <BodySmall key={index}>• {point}</BodySmall>
                          ))}
                        </div>
                      </div>
                      <div>
                        <H4 className="mb-3">{accessibilityConsiderations.performance.title}</H4>
                        <div className="space-y-2">
                          {accessibilityConsiderations.performance.points.map((point, index) => (
                            <BodySmall key={index}>• {point}</BodySmall>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Implementation Tab */}
              <ResponsiveTabsContent value="implementation" className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Icon name="code-line" className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <CardTitle>CSS Custom Properties</CardTitle>
                        <CardDescription>
                          The shadow system is built on CSS custom properties for easy customization.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">/* {cssCustomProperties.description} */</div>
                      {cssCustomProperties.values.map((value, index) => (
                        <div key={index}>{value}</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <Icon name="settings-line" className="h-5 w-5 text-cyan-500" />
                      </div>
                      <div>
                        <CardTitle>Tailwind CSS Classes</CardTitle>
                        <CardDescription>
                          Utility classes for applying shadows in your components.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">/* {tailwindClasses.description} */</div>
                      {tailwindClasses.utilities.map((utility, index) => (
                        <div key={index}>{utility}</div>
                      ))}
                      <div></div>
                      <div className="text-muted-foreground">/* States */</div>
                      {tailwindClasses.states.map((state, index) => (
                        <div key={index}>{state}</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <Icon name="reactjs-line" className="h-5 w-5 text-indigo-500" />
                      </div>
                      <div>
                        <CardTitle>Component Implementation</CardTitle>
                        <CardDescription>
                          Examples of how to implement shadows in your components.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <H4 className="mb-3">{implementationExamples.reactComponent.title}</H4>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        <div className="text-muted-foreground">// {implementationExamples.reactComponent.description}</div>
                        {implementationExamples.reactComponent.code.split('\n').map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <H4 className="mb-3">{implementationExamples.customCSS.title}</H4>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        <div className="text-muted-foreground">/* {implementationExamples.customCSS.description} */</div>
                        {implementationExamples.customCSS.code.split('\n').map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-pink-500/10 rounded-lg">
                        <Icon name="palette-line" className="h-5 w-5 text-pink-500" />
                      </div>
                      <div>
                        <CardTitle>Customization</CardTitle>
                        <CardDescription>
                          How to customize the shadow system for your brand.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">/* Override shadow values */</div>
                      <div>:root &#123;</div>
                      <div>  --shadow-sm: 0 2px 4px rgb(0 0 0 / 0.1);</div>
                      <div>  --shadow-md: 0 6px 12px rgb(0 0 0 / 0.15);</div>
                      <div>  --shadow-lg: 0 12px 24px rgb(0 0 0 / 0.2);</div>
                      <div>&#125;</div>
                      <div></div>
                      <div className="text-muted-foreground">/* Custom shadow with brand colors */</div>
                      <div>:root &#123;</div>
                      <div>  --shadow-primary: 0 4px 12px rgb(14 98 253 / 0.3);</div>
                      <div>&#125;</div>
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
