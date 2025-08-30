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
  radiusScale,
  componentExamples,
  usageGuidelines,
  cssCustomProperties,
  tailwindClasses,
  accessibilityConsiderations,
  implementationExamples,
  customizationExamples
} from "@/lib/corner-radius-config"

export default function CornerRadiusPage() {
  const [activeRadius, setActiveRadius] = useState("md")

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container>
          <Section paddingY="xl">
            <PageHeader
              title="Corner Radius"
              description="Border radius scale and usage guidelines for creating consistent, accessible interfaces with appropriate visual hierarchy."
              size="lg"
              centered
            />
                      </Section>
            
            <Section paddingY="lg">
              <ResponsiveTabs defaultValue="scale" className="space-y-8">
              <ResponsiveTabsList className="grid w-full grid-cols-4">
                <ResponsiveTabsTrigger value="scale">Radius Scale</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="components">Components</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="guidelines">Guidelines</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="implementation">Implementation</ResponsiveTabsTrigger>
              </ResponsiveTabsList>

              {/* Radius Scale Tab */}
              <ResponsiveTabsContent value="scale" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Corner Radius Scale</CardTitle>
                    <CardDescription>
                      Our corner radius system provides consistent rounding values for different interface elements.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {radiusScale.map((radius) => (
                        <div key={radius.name} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <H4>{radius.name}</H4>
                              <BodySmall className="text-muted-foreground">{radius.value}</BodySmall>
                            </div>
                            <Badge variant="secondary" className="font-mono text-xs">
                              {radius.class}
                            </Badge>
                          </div>
                          
                          <div 
                            className={`w-full h-24 bg-primary/20 border-2 border-primary/40 flex items-center justify-center ${radius.class}`}
                          >
                            <BodySmall className="text-primary font-medium">
                              {radius.value}
                            </BodySmall>
                          </div>
                          
                          <BodySmall className="text-muted-foreground leading-relaxed">
                            {radius.description}
                          </BodySmall>
                          <div className="mt-2">
                            <div className="text-xs text-muted-foreground">
                              Usage: {radius.usage.slice(0, 2).join(', ')}
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
                    <CardTitle>Interactive Preview</CardTitle>
                    <CardDescription>
                      Select different radius values to see how they affect the appearance of elements.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {radiusScale.map((radius) => (
                        <Button
                          key={radius.name}
                          variant={activeRadius === radius.class.split('-')[1] ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveRadius(radius.class.split('-')[1] || radius.class)}
                        >
                          {radius.name}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <H4>Card Example</H4>
                        <div className={`p-6 bg-card border shadow-sm ${activeRadius === 'none' ? 'rounded-none' : activeRadius === 'sm' ? 'rounded-sm' : activeRadius === 'md' ? 'rounded-md' : activeRadius === 'lg' ? 'rounded-lg' : activeRadius === 'xl' ? 'rounded-xl' : 'rounded-full'}`}>
                          <H4 className="mb-2">Sample Card</H4>
                          <BodySmall className="text-muted-foreground">
                            This card demonstrates how corner radius affects the overall feel of components.
                          </BodySmall>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <H4>Button Example</H4>
                        <Button className={activeRadius === 'none' ? 'rounded-none' : activeRadius === 'sm' ? 'rounded-sm' : activeRadius === 'md' ? 'rounded-md' : activeRadius === 'lg' ? 'rounded-lg' : activeRadius === 'xl' ? 'rounded-xl' : 'rounded-full'}>
                          Sample Button
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <H4>Input Example</H4>
                        <Input 
                          placeholder="Sample input field"
                          className={activeRadius === 'none' ? 'rounded-none' : activeRadius === 'sm' ? 'rounded-sm' : activeRadius === 'md' ? 'rounded-md' : activeRadius === 'lg' ? 'rounded-lg' : activeRadius === 'xl' ? 'rounded-xl' : 'rounded-full'}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Components Tab */}
              <ResponsiveTabsContent value="components" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Component Usage</CardTitle>
                    <CardDescription>
                      How corner radius is applied across different component types in our design system.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      {componentExamples.map((component) => (
                        <div key={component.name} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <H4>{component.name}</H4>
                              <Badge variant="secondary" className="font-mono text-xs">
                                {component.radiusClass}
                              </Badge>
                            </div>
                            <BodySmall className="text-muted-foreground mb-2">
                              {component.description}
                            </BodySmall>
                            <div className="space-y-1">
                              {component.useCases.slice(0, 2).map((useCase, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                                  <BodySmall className="text-xs">{useCase}</BodySmall>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex-shrink-0">
                            {component.name === "Buttons" && (
                              <Button className={component.radiusClass}>Example</Button>
                            )}
                            {component.name === "Cards" && (
                              <div className={`w-20 h-16 bg-card border shadow-sm ${component.radiusClass} flex items-center justify-center`}>
                                <BodySmall>Card</BodySmall>
                              </div>
                            )}
                            {component.name === "Inputs" && (
                              <Input placeholder="Input" className={`w-20 ${component.radiusClass}`} />
                            )}
                            {component.name === "Badges" && (
                              <Badge className={component.radiusClass}>Badge</Badge>
                            )}
                            {component.name === "Avatars" && (
                              <div className={`w-10 h-10 bg-primary/20 ${component.radiusClass} flex items-center justify-center`}>
                                <BodySmall className="text-xs">AV</BodySmall>
                              </div>
                            )}
                            {component.name === "Icons" && (
                              <div className={`p-2 bg-primary/10 ${component.radiusClass}`}>
                                <Icon name="star-line" className="h-4 w-4 text-primary" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Real Component Examples */}
                <Card>
                  <CardHeader>
                    <CardTitle>Real-World Examples</CardTitle>
                    <CardDescription>
                      See how corner radius works in actual component combinations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <H4>Form Layout</H4>
                        <div className="space-y-3">
                          <Input placeholder="Email address" />
                          <Input placeholder="Password" type="password" />
                          <Button className="w-full">Sign In</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <H4>Card with Actions</H4>
                        <Card>
                          <CardHeader>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                <BodySmall className="text-xs">JD</BodySmall>
                              </div>
                              <div>
                                <CardTitle>John Doe</CardTitle>
                                <CardDescription>Software Engineer</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <BodySmall className="text-muted-foreground">
                              Experienced developer with expertise in React and TypeScript.
                            </BodySmall>
                            <div className="flex gap-2">
                              <Button size="sm">Connect</Button>
                              <Button size="sm" variant="outline">Message</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Guidelines Tab */}
              <ResponsiveTabsContent value="guidelines" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Usage Guidelines</CardTitle>
                    <CardDescription>
                      Best practices for applying corner radius effectively in your designs.
                    </CardDescription>
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
                        <span>Don&apos;t</span>
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
                    <CardTitle>Accessibility Considerations</CardTitle>
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
                        <H4 className="mb-3">{accessibilityConsiderations.interactive.title}</H4>
                        <div className="space-y-2">
                          {accessibilityConsiderations.interactive.points.map((point, index) => (
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
                    <CardTitle>CSS Custom Properties</CardTitle>
                    <CardDescription>
                      The corner radius system is built on CSS custom properties for easy customization.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">/* {cssCustomProperties.description} */</div>
                      <div>{cssCustomProperties.baseValue}</div>
                      <div></div>
                      <div className="text-muted-foreground">/* Calculated radius scale */</div>
                      {cssCustomProperties.calculatedValues.map((value, index) => (
                        <div key={index}>{value}</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tailwind CSS Classes</CardTitle>
                    <CardDescription>
                      Utility classes for applying corner radius in your components.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">/* {tailwindClasses.description} */</div>
                      {tailwindClasses.utilities.map((utility, index) => (
                        <div key={index}>{utility}</div>
                      ))}
                      <div></div>
                      <div className="text-muted-foreground">/* Directional radius */</div>
                      {tailwindClasses.directional.map((direction, index) => (
                        <div key={index}>{direction}</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Component Implementation</CardTitle>
                    <CardDescription>
                      Examples of how to implement corner radius in your components.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <H4 className="mb-3">{implementationExamples.reactComponent.title}</H4>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        <div className="text-muted-foreground">/* {implementationExamples.reactComponent.description} */</div>
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
                    <CardTitle>Customization</CardTitle>
                    <CardDescription>
                      How to customize the corner radius system for your brand.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">/* {customizationExamples.subtle.title} */</div>
                      <div className="text-muted-foreground">/* {customizationExamples.subtle.description} */</div>
                      {customizationExamples.subtle.code.split('\n').map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                      <div></div>
                      <div className="text-muted-foreground">/* {customizationExamples.technical.title} */</div>
                      <div className="text-muted-foreground">/* {customizationExamples.technical.description} */</div>
                      {customizationExamples.technical.code.split('\n').map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                      <div></div>
                      <div className="text-muted-foreground">/* {customizationExamples.friendly.title} */</div>
                      <div className="text-muted-foreground">/* {customizationExamples.friendly.description} */</div>
                      {customizationExamples.friendly.code.split('\n').map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
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
