"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { H1, H2, H3, H4, BodyLarge, BodySmall } from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Icon from "@/components/ui/icon"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"

export default function ShadowsElevationPage() {
  const [activeShadow, setActiveShadow] = useState("md")

  const shadowScale = [
    {
      name: "None",
      value: "none",
      class: "shadow-none",
      description: "No shadow for flat, minimal designs",
      elevation: "Ground level"
    },
    {
      name: "Extra Small",
      value: "xs",
      class: "shadow-xs",
      description: "Subtle depth for small interactive elements",
      elevation: "1px above surface"
    },
    {
      name: "Small",
      value: "sm",
      class: "shadow-sm",
      description: "Light shadow for cards and containers",
      elevation: "2px above surface"
    },
    {
      name: "Medium",
      value: "md",
      class: "shadow-md",
      description: "Standard shadow for primary content",
      elevation: "4px above surface"
    },
    {
      name: "Large",
      value: "lg",
      class: "shadow-lg",
      description: "Prominent shadow for important elements",
      elevation: "8px above surface"
    },
    {
      name: "Extra Large",
      value: "xl",
      class: "shadow-xl",
      description: "Strong shadow for hero elements",
      elevation: "16px above surface"
    },
    {
      name: "2XL",
      value: "2xl",
      class: "shadow-2xl",
      description: "Maximum shadow for modal overlays",
      elevation: "24px above surface"
    }
  ]

  const elevationLevels = [
    {
      name: "Ground Level",
      description: "No elevation, flat surfaces",
      usage: "Backgrounds, base containers",
      examples: ["Page backgrounds", "Base cards", "Form fields"]
    },
    {
      name: "Level 1",
      description: "Minimal elevation for subtle depth",
      usage: "Small interactive elements",
      examples: ["Buttons", "Badges", "Small cards"]
    },
    {
      name: "Level 2",
      description: "Light elevation for content areas",
      usage: "Primary content containers",
      examples: ["Content cards", "Navigation bars", "Form sections"]
    },
    {
      name: "Level 3",
      description: "Medium elevation for important content",
      usage: "Key interface elements",
      examples: ["Main cards", "Sidebars", "Toolbars"]
    },
    {
      name: "Level 4",
      description: "High elevation for prominent elements",
      usage: "Hero sections and key actions",
      examples: ["Hero cards", "Call-to-action buttons", "Important alerts"]
    },
    {
      name: "Level 5",
      description: "Maximum elevation for overlays",
      usage: "Modal dialogs and floating elements",
      examples: ["Modals", "Dropdowns", "Tooltips", "Floating action buttons"]
    }
  ]

  const componentExamples = [
    {
      name: "Cards",
      shadow: "shadow-md",
      description: "Content containers use medium shadows for clear hierarchy"
    },
    {
      name: "Buttons",
      shadow: "shadow-xs",
      description: "Interactive elements use subtle shadows for depth"
    },
    {
      name: "Modals",
      shadow: "shadow-2xl",
      description: "Overlay elements use maximum shadows for prominence"
    },
    {
      name: "Navigation",
      shadow: "shadow-sm",
      description: "Navigation bars use light shadows for separation"
    },
    {
      name: "Hero Sections",
      shadow: "shadow-xl",
      description: "Prominent sections use large shadows for impact"
    },
    {
      name: "Floating Elements",
      shadow: "shadow-lg",
      description: "Floating elements use prominent shadows for elevation"
    }
  ]

  const usageGuidelines = [
    {
      title: "Visual Hierarchy",
      description: "Use shadows to create clear visual hierarchy and guide user attention.",
      icon: "layers-line"
    },
    {
      title: "Consistency",
      description: "Maintain consistent shadow usage across similar component types.",
      icon: "grid-line"
    },
    {
      title: "Accessibility",
      description: "Ensure sufficient contrast and avoid relying solely on shadows for information.",
      icon: "eye-line"
    },
    {
      title: "Performance",
      description: "Use shadows sparingly on mobile devices to maintain smooth performance.",
      icon: "speed-line"
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
              title="Shadows & Elevation"
              description="Comprehensive shadow system and elevation levels for creating depth, hierarchy, and modern interfaces with proper visual layering."
              size="lg"
              centered
            />
          </Section>
          
          <Section paddingY="lg">
            <Tabs defaultValue="scale" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="scale">Shadow Scale</TabsTrigger>
                <TabsTrigger value="elevation">Elevation Levels</TabsTrigger>
                <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
                <TabsTrigger value="implementation">Implementation</TabsTrigger>
              </TabsList>

              {/* Shadow Scale Tab */}
              <TabsContent value="scale" className="space-y-8">
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
              </TabsContent>

              {/* Elevation Levels Tab */}
              <TabsContent value="elevation" className="space-y-8">
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
                      {elevationLevels.map((level, index) => (
                        <div key={level.name} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-shrink-0">
                            <div className={`w-16 h-16 bg-card border rounded-lg flex items-center justify-center ${index === 0 ? 'shadow-none' : index === 1 ? 'shadow-xs' : index === 2 ? 'shadow-sm' : index === 3 ? 'shadow-md' : index === 4 ? 'shadow-lg' : 'shadow-xl'}`}>
                              <span className="text-xs font-medium">L{index}</span>
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <H4>{level.name}</H4>
                              <Badge variant="secondary" className="text-xs">
                                Level {index}
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
                        <H4>Interactive Elements</H4>
                        <div className="space-y-3">
                          <Button className="shadow-xs">Button (Level 1)</Button>
                          <div className="p-3 bg-card border rounded-lg shadow-sm">
                            <BodySmall>Small Card (Level 2)</BodySmall>
                          </div>
                          <div className="p-4 bg-card border rounded-lg shadow-md">
                            <BodySmall>Medium Card (Level 3)</BodySmall>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Guidelines Tab */}
              <TabsContent value="guidelines" className="space-y-8">
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
                        <BodySmall>✓ Use shadows to create clear visual hierarchy</BodySmall>
                        <BodySmall>✓ Maintain consistent elevation across similar components</BodySmall>
                        <BodySmall>✓ Consider the relationship between shadows and content</BodySmall>
                        <BodySmall>✓ Test shadows in both light and dark modes</BodySmall>
                        <BodySmall>✓ Use elevation to guide user attention</BodySmall>
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
                        <BodySmall>✗ Use too many different shadow levels randomly</BodySmall>
                        <BodySmall>✗ Rely solely on shadows for information hierarchy</BodySmall>
                        <BodySmall>✗ Apply heavy shadows to small elements</BodySmall>
                        <BodySmall>✗ Ignore performance impact on mobile devices</BodySmall>
                        <BodySmall>✗ Use shadows that don't match your design language</BodySmall>
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
                        <H4 className="mb-3">Visual Considerations</H4>
                        <div className="space-y-2">
                          <BodySmall>• Ensure sufficient contrast between elevated elements</BodySmall>
                          <BodySmall>• Don't rely solely on shadows for information</BodySmall>
                          <BodySmall>• Consider users with visual impairments</BodySmall>
                        </div>
                      </div>
                      <div>
                        <H4 className="mb-3">Performance Considerations</H4>
                        <div className="space-y-2">
                          <BodySmall>• Limit shadow complexity on mobile devices</BodySmall>
                          <BodySmall>• Use hardware acceleration when possible</BodySmall>
                          <BodySmall>• Test performance on lower-end devices</BodySmall>
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
                      <div className="text-muted-foreground">/* Shadow scale values */</div>
                      <div>--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);</div>
                      <div>--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);</div>
                      <div>--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);</div>
                      <div>--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);</div>
                      <div>--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);</div>
                      <div>--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);</div>
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
                      <div className="text-muted-foreground">/* Shadow utilities */</div>
                      <div>shadow-none → box-shadow: none;</div>
                      <div>shadow-xs   → box-shadow: var(--shadow-xs);</div>
                      <div>shadow-sm   → box-shadow: var(--shadow-sm);</div>
                      <div>shadow-md   → box-shadow: var(--shadow-md);</div>
                      <div>shadow-lg   → box-shadow: var(--shadow-lg);</div>
                      <div>shadow-xl   → box-shadow: var(--shadow-xl);</div>
                      <div>shadow-2xl  → box-shadow: var(--shadow-2xl);</div>
                      <div></div>
                      <div className="text-muted-foreground">/* Hover states */</div>
                      <div>hover:shadow-lg → box-shadow: var(--shadow-lg) on hover</div>
                      <div>focus:shadow-lg → box-shadow: var(--shadow-lg) on focus</div>
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
                      <H4 className="mb-3">React Component Example</H4>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        <div className="text-muted-foreground">// Using Tailwind classes</div>
                        <div>function ElevatedCard(props) &#123;</div>
                        <div>  const &#123; children, elevation = 'md' &#125; = props</div>
                        <div>  const shadowClass = `shadow-$&#123;elevation&#125;`</div>
                        <div>  return (</div>
                        <div>    &lt;div className=&#123;cn(</div>
                        <div>      "bg-card border rounded-lg p-6",</div>
                        <div>      shadowClass</div>
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
                        <div className="text-muted-foreground">/* Using CSS custom properties */</div>
                        <div>.elevated-card &#123;</div>
                        <div>  box-shadow: var(--shadow-md);</div>
                        <div>  background: var(--card);</div>
                        <div>  border: 1px solid var(--border);</div>
                        <div>  border-radius: var(--radius-lg);</div>
                        <div>&#125;</div>
                        <div></div>
                        <div className="text-muted-foreground">/* Elevation variants */</div>
                        <div>.elevated-card--high &#123;</div>
                        <div>  box-shadow: var(--shadow-xl);</div>
                        <div>&#125;</div>
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
              </TabsContent>
            </Tabs>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
