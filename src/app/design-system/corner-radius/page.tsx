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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Icon from "@/components/ui/icon"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"

export default function CornerRadiusPage() {
  const [activeRadius, setActiveRadius] = useState("md")

  const radiusScale = [
    {
      name: "None",
      value: "0px",
      class: "rounded-none",
      description: "Sharp corners for technical or data-heavy interfaces"
    },
    {
      name: "Small",
      value: "6px",
      class: "rounded-sm",
      cssVar: "--radius-sm",
      description: "Subtle rounding for compact elements"
    },
    {
      name: "Medium",
      value: "8px", 
      class: "rounded-md",
      cssVar: "--radius-md",
      description: "Default radius for most interactive elements"
    },
    {
      name: "Default",
      value: "10px",
      class: "rounded-lg",
      cssVar: "--radius-lg",
      description: "Base radius for cards and containers"
    },
    {
      name: "Large",
      value: "14px",
      class: "rounded-xl",
      cssVar: "--radius-xl", 
      description: "Prominent elements and hero components"
    },
    {
      name: "Full",
      value: "9999px",
      class: "rounded-full",
      description: "Circular elements like avatars and pills"
    }
  ]

  const componentExamples = [
    {
      name: "Buttons",
      radius: "rounded-md",
      description: "Standard interactive elements use medium radius for balance between modern and accessible"
    },
    {
      name: "Cards",
      radius: "rounded-xl",
      description: "Content containers use large radius to create clear visual hierarchy"
    },
    {
      name: "Inputs",
      radius: "rounded-md", 
      description: "Form elements use medium radius for consistency with buttons"
    },
    {
      name: "Badges",
      radius: "rounded-md",
      description: "Small informational elements use medium radius"
    },
    {
      name: "Avatars",
      radius: "rounded-full",
      description: "Profile images are fully rounded for recognition and friendliness"
    },
    {
      name: "Icons",
      radius: "rounded-lg",
      description: "Icon containers use default radius to complement the overall design"
    }
  ]

  const usageGuidelines = [
    {
      title: "Hierarchy",
      description: "Larger radius values create more visual prominence. Use sparingly for hero elements.",
      icon: "stack-line"
    },
    {
      title: "Consistency",
      description: "Maintain consistent radius across similar component types throughout your interface.",
      icon: "grid-line"
    },
    {
      title: "Context",
      description: "Consider the overall design language - more rounded for friendly, less for technical.",
      icon: "palette-line"
    },
    {
      title: "Accessibility",
      description: "Ensure sufficient contrast at rounded corners and avoid extremely small radii.",
      icon: "eye-line"
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
              title="Corner Radius"
              description="Border radius scale and usage guidelines for creating consistent, accessible interfaces with appropriate visual hierarchy."
              size="lg"
              centered
            />
                      </Section>
            
            <Section paddingY="lg">
              <Tabs defaultValue="scale" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="scale">Radius Scale</TabsTrigger>
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
                <TabsTrigger value="implementation">Implementation</TabsTrigger>
              </TabsList>

              {/* Radius Scale Tab */}
              <TabsContent value="scale" className="space-y-8">
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
              </TabsContent>

              {/* Components Tab */}
              <TabsContent value="components" className="space-y-8">
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
                                {component.radius}
                              </Badge>
                            </div>
                            <BodySmall className="text-muted-foreground">
                              {component.description}
                            </BodySmall>
                          </div>
                          
                          <div className="flex-shrink-0">
                            {component.name === "Buttons" && (
                              <Button className={component.radius}>Example</Button>
                            )}
                            {component.name === "Cards" && (
                              <div className={`w-20 h-16 bg-card border shadow-sm ${component.radius} flex items-center justify-center`}>
                                <BodySmall>Card</BodySmall>
                              </div>
                            )}
                            {component.name === "Inputs" && (
                              <Input placeholder="Input" className={`w-20 ${component.radius}`} />
                            )}
                            {component.name === "Badges" && (
                              <Badge className={component.radius}>Badge</Badge>
                            )}
                            {component.name === "Avatars" && (
                              <Avatar className={component.radius}>
                                <AvatarFallback>AV</AvatarFallback>
                              </Avatar>
                            )}
                            {component.name === "Icons" && (
                              <div className={`p-2 bg-primary/10 ${component.radius}`}>
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
                              <Avatar>
                                <AvatarFallback>JD</AvatarFallback>
                              </Avatar>
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
              </TabsContent>

              {/* Guidelines Tab */}
              <TabsContent value="guidelines" className="space-y-8">
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
                            <H4 className="mb-2">{guideline.title}</H4>
                            <BodySmall className="text-muted-foreground leading-relaxed">
                              {guideline.description}
                            </BodySmall>
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
                        <BodySmall>✓ Use consistent radius values within component families</BodySmall>
                        <BodySmall>✓ Apply larger radius to more prominent elements</BodySmall>
                        <BodySmall>✓ Consider the overall brand personality</BodySmall>
                        <BodySmall>✓ Test accessibility with screen readers</BodySmall>
                        <BodySmall>✓ Maintain visual hierarchy through radius variation</BodySmall>
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
                        <BodySmall>✗ Mix too many different radius values randomly</BodySmall>
                        <BodySmall>✗ Use extremely large radius on small elements</BodySmall>
                        <BodySmall>✗ Apply inconsistent radius to similar components</BodySmall>
                        <BodySmall>✗ Ignore the relationship between radius and element size</BodySmall>
                        <BodySmall>✗ Compromise accessibility for aesthetic preferences</BodySmall>
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
                        <H4 className="mb-3">Visual Considerations</H4>
                        <div className="space-y-2">
                          <BodySmall>• Ensure sufficient contrast at rounded corners</BodySmall>
                          <BodySmall>• Avoid extremely small radius that may appear broken</BodySmall>
                          <BodySmall>• Consider how radius affects focus indicators</BodySmall>
                        </div>
                      </div>
                      <div>
                        <H4 className="mb-3">Interactive Considerations</H4>
                        <div className="space-y-2">
                          <BodySmall>• Maintain consistent touch targets regardless of radius</BodySmall>
                          <BodySmall>• Ensure hover states work well with rounded corners</BodySmall>
                          <BodySmall>• Test with keyboard navigation and focus states</BodySmall>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Implementation Tab */}
              <TabsContent value="implementation" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>CSS Custom Properties</CardTitle>
                    <CardDescription>
                      The corner radius system is built on CSS custom properties for easy customization.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">&#123;/* Base radius value */&#125;</div>
                      <div>--radius: 0.625rem; /* 10px */</div>
                      <div></div>
                      <div className="text-muted-foreground">&#123;/* Calculated radius scale */&#125;</div>
                      <div>--radius-sm: calc(var(--radius) - 4px); /* 6px */</div>
                      <div>--radius-md: calc(var(--radius) - 2px); /* 8px */</div>
                      <div>--radius-lg: var(--radius);              /* 10px */</div>
                      <div>--radius-xl: calc(var(--radius) + 4px); /* 14px */</div>
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
                      <div className="text-muted-foreground">&#123;/* Corner radius utilities */&#125;</div>
                      <div>rounded-none → border-radius: 0px;</div>
                      <div>rounded-sm   → border-radius: 6px;</div>
                      <div>rounded-md   → border-radius: 8px;</div>
                      <div>rounded-lg   → border-radius: 10px;</div>
                      <div>rounded-xl   → border-radius: 14px;</div>
                      <div>rounded-full → border-radius: 9999px;</div>
                      <div></div>
                      <div className="text-muted-foreground">&#123;/* Directional radius */&#125;</div>
                      <div>rounded-t-lg → border-top-left-radius: 10px;</div>
                      <div>             border-top-right-radius: 10px;</div>
                      <div>rounded-l-lg → border-top-left-radius: 10px;</div>
                      <div>             border-bottom-left-radius: 10px;</div>
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
                      <H4 className="mb-3">React Component Example</H4>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        <div className="text-muted-foreground">&#123;/* Using Tailwind classes */&#125;</div>
                        <div>function Card(props) &#123;</div>
                        <div>  const &#123; children, className &#125; = props</div>
                        <div>  return (</div>
                        <div>    &lt;div className=&#123;cn(</div>
                        <div>      &quot;bg-card border rounded-xl shadow-sm&quot;,</div>
                        <div>      className</div>
                        <div>    )&#125;&gt;</div>
                        <div>      &#123;children&#125;</div>
                        <div>    &lt;/div&gt;</div>
                        <div>  )</div>
                        <div>&#125;</div>
                      </div>
                    </div>

                    <div>
                      <H4 className="mb-3">Custom CSS Example</H4>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        <div className="text-muted-foreground">&#123;/* Using CSS custom properties */&#125;</div>
                        <div>.custom-card &#123;</div>
                        <div>  border-radius: var(--radius-lg);</div>
                        <div>  background: var(--card);</div>
                        <div>  border: 1px solid var(--border);</div>
                        <div>&#125;</div>
                        <div></div>
                        <div className="text-muted-foreground">&#123;/* Responsive radius */&#125;</div>
                        <div>@media (max-width: 768px) &#123;</div>
                        <div>  .custom-card &#123;</div>
                        <div>    border-radius: var(--radius-md);</div>
                        <div>  &#125;</div>
                        <div>&#125;</div>
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
                      <div className="text-muted-foreground">&#123;/* Override in your CSS */&#125;</div>
                      <div>:root &#123;</div>
                      <div>  --radius: 0.5rem; /* More subtle rounding */</div>
                      <div>&#125;</div>
                      <div></div>
                      <div className="text-muted-foreground">&#123;/* Or for sharp, technical look */&#125;</div>
                      <div>:root &#123;</div>
                      <div>  --radius: 0.25rem; /* Minimal rounding */</div>
                      <div>&#125;</div>
                      <div></div>
                      <div className="text-muted-foreground">&#123;/* For friendly, approachable feel */&#125;</div>
                      <div>:root &#123;</div>
                      <div>  --radius: 1rem; /* More pronounced rounding */</div>
                      <div>&#125;</div>
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
