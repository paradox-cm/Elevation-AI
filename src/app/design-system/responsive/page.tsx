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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { useResponsiveConfig } from "@/hooks/use-responsive-config"

export default function ResponsivePage() {
  const {
    config,
    breakpointConfig,
    responsivePatternConfig,
    gridSystemConfig,
    responsiveComponentConfig,
    fluidTypographyConfig,
    responsiveImageConfig,
    containerConfig
  } = useResponsiveConfig()

  const [activeBreakpoint, setActiveBreakpoint] = useState("md")

  const breakpoints = [
    {
      name: "Mobile",
      prefix: "sm",
      minWidth: "640px",
      maxWidth: "767px",
      description: "Small mobile devices and tablets",
      usage: "Primary mobile experience"
    },
    {
      name: "Tablet",
      prefix: "md",
      minWidth: "768px",
      maxWidth: "1023px",
      description: "Tablets and small laptops",
      usage: "Enhanced tablet experience"
    },
    {
      name: "Desktop",
      prefix: "lg",
      minWidth: "1024px",
      maxWidth: "1279px",
      description: "Standard desktop screens",
      usage: "Full desktop experience"
    },
    {
      name: "Large Desktop",
      prefix: "xl",
      minWidth: "1280px",
      maxWidth: "1535px",
      description: "Large desktop monitors",
      usage: "Enhanced desktop experience"
    },
    {
      name: "Extra Large",
      prefix: "2xl",
      minWidth: "1536px",
      maxWidth: "∞",
      description: "Ultra-wide and 4K displays",
      usage: "Maximum desktop experience"
    }
  ]

  const responsivePatterns = [
    {
      name: "Mobile First",
      description: "Design for mobile first, then enhance for larger screens",
      icon: "smartphone-line",
      benefits: ["Better performance", "Simpler codebase", "Progressive enhancement"]
    },
    {
      name: "Container Queries",
      description: "Style elements based on their container size, not viewport",
      icon: "layout-line",
      benefits: ["Component-based design", "Reusable components", "Better modularity"]
    },
    {
      name: "Fluid Typography",
      description: "Typography that scales smoothly across screen sizes",
      icon: "text",
      benefits: ["Consistent reading experience", "No layout shifts", "Better accessibility"]
    },
    {
      name: "Responsive Images",
      description: "Images that adapt to different screen sizes and resolutions",
      icon: "image-line",
      benefits: ["Faster loading", "Better performance", "Optimal quality"]
    }
  ]

  const gridExamples = [
    {
      name: "Basic Grid",
      mobile: "grid-cols-1",
      tablet: "md:grid-cols-2",
      desktop: "lg:grid-cols-3",
      description: "Simple responsive grid layout"
    },
    {
      name: "Card Grid",
      mobile: "grid-cols-1 gap-4",
      tablet: "md:grid-cols-2 md:gap-6",
      desktop: "lg:grid-cols-3 lg:gap-8",
      description: "Responsive card layout with spacing"
    },
    {
      name: "Sidebar Layout",
      mobile: "flex-col",
      tablet: "md:flex-row md:space-x-6",
      desktop: "lg:space-x-8",
      description: "Responsive sidebar and main content"
    },
    {
      name: "Navigation",
      mobile: "flex-col space-y-2",
      tablet: "md:flex-row md:space-x-4 md:space-y-0",
      desktop: "lg:space-x-6",
      description: "Responsive navigation menu"
    }
  ]

  const responsiveComponents = [
    {
      name: "Navigation",
      mobile: "Hamburger menu, stacked items",
      tablet: "Horizontal menu, reduced items",
      desktop: "Full horizontal menu, all items visible"
    },
    {
      name: "Cards",
      mobile: "Single column, full width",
      tablet: "Two columns, medium spacing",
      desktop: "Three columns, generous spacing"
    },
    {
      name: "Forms",
      mobile: "Stacked fields, full width",
      tablet: "Side-by-side fields where appropriate",
      desktop: "Multi-column layouts, optimal spacing"
    },
    {
      name: "Tables",
      mobile: "Card-based layout, scrollable",
      tablet: "Compact table, horizontal scroll",
      desktop: "Full table, all columns visible"
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
              title="Responsive Design"
              description="Comprehensive responsive design system with breakpoints, patterns, and mobile-first approach for creating adaptive interfaces."
              size="lg"
              centered
            />
          </Section>

          <Section paddingY="lg">
            <Tabs defaultValue="breakpoints" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="breakpoints">Breakpoints</TabsTrigger>
                <TabsTrigger value="patterns">Patterns</TabsTrigger>
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="implementation">Implementation</TabsTrigger>
              </TabsList>

              {/* Breakpoints Tab */}
              <TabsContent value="breakpoints" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Breakpoint System</CardTitle>
                    <CardDescription>
                      Our responsive breakpoint system follows a mobile-first approach with consistent screen size definitions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      {breakpoints.map((breakpoint) => (
                        <div key={breakpoint.name} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Icon name="smartphone-line" className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <H4>{breakpoint.name}</H4>
                              <Badge variant="secondary" className="font-mono">
                                {breakpoint.prefix}
                              </Badge>
                            </div>
                            <BodySmall className="text-muted-foreground mb-3">
                              {breakpoint.description}
                            </BodySmall>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <BodySmall className="font-medium mb-1">Screen Size:</BodySmall>
                                <BodySmall className="text-muted-foreground">
                                  {breakpoint.minWidth} - {breakpoint.maxWidth}
                                </BodySmall>
                              </div>
                              <div>
                                <BodySmall className="font-medium mb-1">Usage:</BodySmall>
                                <BodySmall className="text-muted-foreground">
                                  {breakpoint.usage}
                                </BodySmall>
                              </div>
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
                    <CardTitle>Interactive Breakpoint Preview</CardTitle>
                    <CardDescription>
                      Select different breakpoints to see how layouts adapt across screen sizes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {breakpoints.map((breakpoint) => (
                        <Button
                          key={breakpoint.name}
                          variant={activeBreakpoint === breakpoint.prefix ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveBreakpoint(breakpoint.prefix)}
                        >
                          {breakpoint.name}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <H4>Layout Preview</H4>
                      <div className={`grid gap-4 ${
                        activeBreakpoint === 'sm' ? 'grid-cols-1' :
                        activeBreakpoint === 'md' ? 'grid-cols-2' :
                        activeBreakpoint === 'lg' ? 'grid-cols-3' :
                        activeBreakpoint === 'xl' ? 'grid-cols-4' : 'grid-cols-5'
                      }`}>
                        {[1, 2, 3, 4, 5].map((item) => (
                          <div key={item} className="p-4 bg-card border rounded-lg">
                            <BodySmall className="font-medium">Item {item}</BodySmall>
                            <BodySmall className="text-muted-foreground">
                              {activeBreakpoint === 'sm' ? 'Single column layout' :
                               activeBreakpoint === 'md' ? 'Two column layout' :
                               activeBreakpoint === 'lg' ? 'Three column layout' :
                               activeBreakpoint === 'xl' ? 'Four column layout' : 'Five column layout'}
                            </BodySmall>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Patterns Tab */}
              <TabsContent value="patterns" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Responsive Design Patterns</CardTitle>
                    <CardDescription>
                      Proven patterns and approaches for creating responsive interfaces.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {responsivePatterns.map((pattern) => (
                        <div key={pattern.name} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                            <Icon name={pattern.icon} className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <H4 className="mb-2">{pattern.name}</H4>
                            <BodySmall className="text-muted-foreground mb-3">
                              {pattern.description}
                            </BodySmall>
                            <div className="space-y-1">
                              {pattern.benefits.map((benefit) => (
                                <BodySmall key={benefit} className="text-muted-foreground">
                                  • {benefit}
                                </BodySmall>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Grid Layout Examples</CardTitle>
                    <CardDescription>
                      Common responsive grid patterns and their implementation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      {gridExamples.map((example) => (
                        <div key={example.name} className="space-y-4">
                          <div className="flex items-center justify-between">
                            <H4>{example.name}</H4>
                            <Badge variant="secondary">{example.description}</Badge>
                          </div>
                          
                          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                            <div className="text-muted-foreground">// Mobile First Approach</div>
                            <div>&lt;div className=&quot;grid {example.mobile} {example.tablet} {example.desktop}&quot;&gt;</div>
                            <div>  &lt;!-- Grid items --&gt;</div>
                            <div>&lt;/div&gt;</div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="p-3 bg-card border rounded text-center">
                              <BodySmall className="font-medium">Mobile</BodySmall>
                              <BodySmall className="text-muted-foreground text-xs">{example.mobile}</BodySmall>
                            </div>
                            <div className="p-3 bg-card border rounded text-center">
                              <BodySmall className="font-medium">Tablet</BodySmall>
                              <BodySmall className="text-muted-foreground text-xs">{example.tablet}</BodySmall>
                            </div>
                            <div className="p-3 bg-card border rounded text-center">
                              <BodySmall className="font-medium">Desktop</BodySmall>
                              <BodySmall className="text-muted-foreground text-xs">{example.desktop}</BodySmall>
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
                        <span>Best Practices</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <BodySmall>✓ Design mobile-first, enhance for larger screens</BodySmall>
                        <BodySmall>✓ Use relative units (rem, em, %) instead of fixed pixels</BodySmall>
                        <BodySmall>✓ Test on actual devices, not just browser dev tools</BodySmall>
                        <BodySmall>✓ Consider touch targets (minimum 44px)</BodySmall>
                        <BodySmall>✓ Optimize images for different screen densities</BodySmall>
                        <BodySmall>✓ Use container queries for component-based design</BodySmall>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon name="close-line" className="h-5 w-5 text-red-500" />
                        <span>Avoid</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <BodySmall>✗ Desktop-first design approach</BodySmall>
                        <BodySmall>✗ Fixed pixel widths and heights</BodySmall>
                        <BodySmall>✗ Hiding content on mobile devices</BodySmall>
                        <BodySmall>✗ Tiny touch targets</BodySmall>
                        <BodySmall>✗ Horizontal scrolling on mobile</BodySmall>
                        <BodySmall>✗ Ignoring performance on slower devices</BodySmall>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Components Tab */}
              <TabsContent value="components" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Responsive Component Examples</CardTitle>
                    <CardDescription>
                      How common components adapt across different screen sizes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      {responsiveComponents.map((component) => (
                        <div key={component.name} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <H4>{component.name}</H4>
                              <Badge variant="secondary">Component</Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <BodySmall className="font-medium mb-1">Mobile:</BodySmall>
                                <BodySmall className="text-muted-foreground">{component.mobile}</BodySmall>
                              </div>
                              <div>
                                <BodySmall className="font-medium mb-1">Tablet:</BodySmall>
                                <BodySmall className="text-muted-foreground">{component.tablet}</BodySmall>
                              </div>
                              <div>
                                <BodySmall className="font-medium mb-1">Desktop:</BodySmall>
                                <BodySmall className="text-muted-foreground">{component.desktop}</BodySmall>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Real-World Examples</CardTitle>
                    <CardDescription>
                      See responsive design in action with actual component layouts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <H4>Responsive Navigation</H4>
                        <div className="space-y-2">
                          <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                            <Button size="sm" variant="ghost">Home</Button>
                            <Button size="sm" variant="ghost">About</Button>
                            <Button size="sm" variant="ghost">Services</Button>
                            <Button size="sm" variant="ghost">Contact</Button>
                          </div>
                          <BodySmall className="text-muted-foreground">
                            Mobile: Stacked vertically • Desktop: Horizontal layout
                          </BodySmall>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <H4>Responsive Cards</H4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="p-3 bg-card border rounded">
                            <BodySmall className="font-medium">Card 1</BodySmall>
                          </div>
                          <div className="p-3 bg-card border rounded">
                            <BodySmall className="font-medium">Card 2</BodySmall>
                          </div>
                        </div>
                        <BodySmall className="text-muted-foreground">
                          Mobile: Single column • Tablet+: Two columns
                        </BodySmall>
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
                      CSS variables for consistent responsive design implementation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">/* Breakpoint variables */</div>
                      <div>--breakpoint-sm: 640px;</div>
                      <div>--breakpoint-md: 768px;</div>
                      <div>--breakpoint-lg: 1024px;</div>
                      <div>--breakpoint-xl: 1280px;</div>
                      <div>--breakpoint-2xl: 1536px;</div>
                      <div></div>
                      <div className="text-muted-foreground">/* Container max-widths */</div>
                      <div>--container-sm: 640px;</div>
                      <div>--container-md: 768px;</div>
                      <div>--container-lg: 1024px;</div>
                      <div>--container-xl: 1280px;</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tailwind CSS Classes</CardTitle>
                    <CardDescription>
                      Utility classes for responsive design implementation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">/* Responsive utilities */</div>
                      <div>sm: → @media (min-width: 640px)</div>
                      <div>md: → @media (min-width: 768px)</div>
                      <div>lg: → @media (min-width: 1024px)</div>
                      <div>xl: → @media (min-width: 1280px)</div>
                      <div>2xl: → @media (min-width: 1536px)</div>
                      <div></div>
                      <div className="text-muted-foreground">/* Common patterns */</div>
                      <div>grid-cols-1 md:grid-cols-2 lg:grid-cols-3</div>
                      <div>flex-col md:flex-row</div>
                      <div>text-sm md:text-base lg:text-lg</div>
                      <div>p-4 md:p-6 lg:p-8</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>React Component Example</CardTitle>
                    <CardDescription>
                      How to implement responsive design in React components.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <H4 className="mb-3">Responsive Card Component</H4>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        <div className="text-muted-foreground">// Responsive card component</div>
                        <div>function ResponsiveCard(&#123; children, className &#125;) &#123;</div>
                        <div>  return (</div>
                        <div>    &lt;div className=&#123;cn(</div>
                        <div>      &quot;grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3&quot;,</div>
                        <div>      &quot;gap-4 md:gap-6 lg:gap-8&quot;,</div>
                        <div>      &quot;p-4 md:p-6 lg:p-8&quot;,</div>
                        <div>      &quot;bg-card border rounded-lg&quot;,</div>
                        <div>      className</div>
                        <div>    )&#125;&gt;</div>
                        <div>      &#123;children&#125;</div>
                        <div>    &lt;/div&gt;</div>
                        <div>  )</div>
                        <div>&#125;</div>
                      </div>
                    </div>

                    <div>
                      <H4 className="mb-3">Custom Hook for Breakpoints</H4>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        <div className="text-muted-foreground">// Custom hook for responsive logic</div>
                        <div>function useBreakpoint() &#123;</div>
                        <div>  const [breakpoint, setBreakpoint] = useState(&apos;sm&apos;)</div>
                        <div></div>
                        <div>  useEffect(() =&gt; &#123;</div>
                        <div>    const handleResize = () =&gt; &#123;</div>
                        <div>      const width = window.innerWidth</div>
                        <div>      if (width &gt;= 1536) setBreakpoint(&apos;2xl&apos;)</div>
                        <div>      else if (width &gt;= 1280) setBreakpoint(&apos;xl&apos;)</div>
                        <div>      else if (width &gt;= 1024) setBreakpoint(&apos;lg&apos;)</div>
                        <div>      else if (width &gt;= 768) setBreakpoint(&apos;md&apos;)</div>
                        <div>      else setBreakpoint(&apos;sm&apos;)</div>
                        <div>    &#125;</div>
                        <div></div>
                        <div>    handleResize()</div>
                        <div>    window.addEventListener('resize', handleResize)</div>
                        <div>    return () =&gt; window.removeEventListener('resize', handleResize)</div>
                        <div>  &#125;, [])</div>
                        <div></div>
                        <div>  return breakpoint</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Testing Responsive Design</CardTitle>
                    <CardDescription>
                      Tools and techniques for testing responsive interfaces.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <H4 className="mb-3">Browser Dev Tools</H4>
                        <div className="space-y-2">
                          <BodySmall>• Chrome DevTools Device Toolbar</BodySmall>
                          <BodySmall>• Firefox Responsive Design Mode</BodySmall>
                          <BodySmall>• Safari Web Inspector</BodySmall>
                          <BodySmall>• Edge DevTools</BodySmall>
                        </div>
                      </div>
                      <div>
                        <H4 className="mb-3">Real Device Testing</H4>
                        <div className="space-y-2">
                          <BodySmall>• Test on actual mobile devices</BodySmall>
                          <BodySmall>• Check touch interactions</BodySmall>
                          <BodySmall>• Verify performance on slower networks</BodySmall>
                          <BodySmall>• Test with different screen orientations</BodySmall>
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
