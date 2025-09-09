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
import { ResponsiveTabs, ResponsiveTabsContent, ResponsiveTabsList, ResponsiveTabsTrigger } from "@/components/ui/responsive-tabs"
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
      maxWidth: "1599px",
      description: "Standard desktop screens and 14-inch MacBooks (1512px)",
      usage: "Full desktop experience with 1400px max-width"
    },
    {
      name: "Large Desktop",
      prefix: "xl",
      minWidth: "1600px",
      maxWidth: "2559px",
      description: "Large desktop monitors and ultra-wide displays",
      usage: "Enhanced desktop experience with 1920px max-width"
    },
    {
      name: "Extra Large",
      prefix: "2xl",
      minWidth: "2560px",
      maxWidth: "∞",
      description: "Ultra-wide displays, 4K monitors, and 3360px+ screens",
      usage: "Maximum desktop experience with 2560px max-width"
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
      name: "Progressive Typography Scaling",
      description: "Typography that scales progressively from mobile to 2XL with specific breakpoint behavior",
      icon: "text",
      benefits: ["Consistent reading experience", "LG breakpoint preservation", "XL/2XL enhancement"]
    },
    {
      name: "Container Width Optimization",
      description: "Containers that grow to fill full width on larger screens with proper padding",
      icon: "layout-line",
      benefits: ["Full-width content utilization", "Proper padding on all breakpoints", "No content stacking"]
    },
    {
      name: "Component Size Scaling",
      description: "Components like logos and icons that scale appropriately across breakpoints",
      icon: "image-line",
      benefits: ["Visual balance", "Proper proportions", "Consistent sizing"]
    }
  ]

  const gridExamples = [
    {
      name: "Footer Grid",
      mobile: "grid-cols-2",
      tablet: "md:grid-cols-5",
      desktop: "lg:grid-cols-5",
      description: "Two-column mobile footer, five-column desktop"
    },
    {
      name: "Container Padding",
      mobile: "px-4 sm:px-6 lg:px-8",
      tablet: "px-4 sm:px-6 lg:px-8",
      desktop: "px-4 sm:px-6 lg:px-8",
      description: "Consistent padding across all breakpoints"
    },
    {
      name: "Container Max-Width",
      mobile: "Standard container sizing",
      tablet: "Standard container sizing",
      desktop: "lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]",
      description: "Progressive container growth for optimal content utilization"
    },
    {
      name: "Typography Scaling",
      mobile: "text-3xl sm:text-4xl md:text-5xl",
      tablet: "lg:text-4xl",
      desktop: "xl:text-5xl 2xl:text-6xl",
      description: "Progressive typography scaling with LG preservation"
    },
    {
      name: "Component Sizing",
      mobile: "w-29 h-29 sm:w-40 sm:h-40",
      tablet: "lg:w-48 lg:h-48",
      desktop: "xl:w-48 xl:h-48 2xl:w-64 2xl:h-64",
      description: "Responsive component sizing with breakpoint-specific values"
    }
  ]

  const responsiveComponents = [
    {
      name: "Perlin Logo",
      mobile: "w-29 h-29 (116px)",
      tablet: "sm:w-40 sm:h-40 (160px), lg:w-48 lg:h-48 (192px)",
      desktop: "xl:w-48 xl:h-48 (192px), 2xl:w-64 2xl:h-64 (256px)"
    },
    {
      name: "Typography",
      mobile: "text-3xl sm:text-4xl md:text-5xl",
      tablet: "lg:text-4xl (preserved from MD)",
      desktop: "xl:text-5xl 2xl:text-6xl (enhanced scaling)"
    },
    {
      name: "Containers",
      mobile: "px-4 sm:px-6 lg:px-8",
      tablet: "px-4 sm:px-6 lg:px-8",
      desktop: "size='2xl' with lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]"
    },
    {
      name: "Footer Layout",
      mobile: "grid-cols-2 (two-column layout)",
      tablet: "md:grid-cols-5 (five-column layout)",
      desktop: "Consistent five-column layout with left-justified copyright"
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
            <ResponsiveTabs defaultValue="breakpoints" className="space-y-8">
              <ResponsiveTabsList className="grid w-full grid-cols-4">
                <ResponsiveTabsTrigger value="breakpoints">Breakpoints</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="patterns">Patterns</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="components">Components</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="implementation">Implementation</ResponsiveTabsTrigger>
              </ResponsiveTabsList>

              {/* Breakpoints Tab */}
              <ResponsiveTabsContent value="breakpoints" className="space-y-8">
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
              </ResponsiveTabsContent>

              {/* Patterns Tab */}
              <ResponsiveTabsContent value="patterns" className="space-y-8">
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

                {/* Two-Tier Responsive System */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="layout-line" className="h-5 w-5 text-primary" />
                      <span>Two-Tier Responsive System</span>
                    </CardTitle>
                    <CardDescription>
                      Our sophisticated approach to responsive design that optimizes for both container growth and content readability.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6">
                      <H4 className="mb-3">System Overview</H4>
                      <BodySmall className="text-muted-foreground mb-4">
                        We use a two-tier responsive system that separates container-level responsiveness from content-level optimization. 
                        This approach ensures optimal user experience across different content types and screen sizes.
                      </BodySmall>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Icon name="maximize-line" className="h-4 w-4 text-primary" />
                            <BodySmall className="font-medium">Tier 1: Container Level</BodySmall>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <BodySmall className="text-muted-foreground text-xs">
                              <strong>Full Responsive Width:</strong><br/>
                              lg: 1400px → xl: 1920px → 2xl: 2560px
                            </BodySmall>
                          </div>
                          <BodySmall className="text-muted-foreground text-xs">
                            All pages use Container size="2xl" with progressive max-width growth for optimal screen utilization.
                          </BodySmall>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Icon name="text-wrap" className="h-4 w-4 text-primary" />
                            <BodySmall className="font-medium">Tier 2: Content Level</BodySmall>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <BodySmall className="text-muted-foreground text-xs">
                              <strong>Content-Appropriate Width:</strong><br/>
                              max-w-4xl (~900px) for text-heavy content
                            </BodySmall>
                          </div>
                          <BodySmall className="text-muted-foreground text-xs">
                            Content sections adapt their width based on content type and readability requirements.
                          </BodySmall>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <H4>Content Type Guidelines</H4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Icon name="fullscreen-line" className="h-4 w-4 text-green-500" />
                            <BodySmall className="font-medium">Full Width Content</BodySmall>
                          </div>
                          <div className="space-y-2">
                            <BodySmall className="text-muted-foreground text-xs">• Home page hero sections</BodySmall>
                            <BodySmall className="text-muted-foreground text-xs">• Product showcases</BodySmall>
                            <BodySmall className="text-muted-foreground text-xs">• Team grids and profiles</BodySmall>
                            <BodySmall className="text-muted-foreground text-xs">• Visual galleries</BodySmall>
                            <BodySmall className="text-muted-foreground text-xs">• Marketing content</BodySmall>
                          </div>
                          <div className="bg-muted p-2 rounded font-mono text-xs">
                            No max-width constraints
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Icon name="text-line" className="h-4 w-4 text-blue-500" />
                            <BodySmall className="font-medium">Constrained Content</BodySmall>
                          </div>
                          <div className="space-y-2">
                            <BodySmall className="text-muted-foreground text-xs">• FAQ pages</BodySmall>
                            <BodySmall className="text-muted-foreground text-xs">• Technical documentation</BodySmall>
                            <BodySmall className="text-muted-foreground text-xs">• Investment information</BodySmall>
                            <BodySmall className="text-muted-foreground text-xs">• Partnership details</BodySmall>
                            <BodySmall className="text-muted-foreground text-xs">• Developer resources</BodySmall>
                          </div>
                          <div className="bg-muted p-2 rounded font-mono text-xs">
                            max-w-4xl mx-auto
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <H4>Implementation Example</H4>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2">
                        <div className="text-muted-foreground">// Container: Full responsive width</div>
                        <div>&lt;Container size="2xl"&gt;</div>
                        <div>  &lt;!-- Tier 1: Container grows with screen size --&gt;</div>
                        <div>  </div>
                        <div>  &lt;Section&gt;</div>
                        <div>    &lt;div className="max-w-4xl mx-auto"&gt;</div>
                        <div>      &lt;!-- Tier 2: Content optimized for readability --&gt;</div>
                        <div>      &lt;p&gt;Text content here...&lt;/p&gt;</div>
                        <div>    &lt;/div&gt;</div>
                        <div>  &lt;/Section&gt;</div>
                        <div>&lt;/Container&gt;</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Icon name="information-line" className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <BodySmall className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                            Why This Approach?
                          </BodySmall>
                          <BodySmall className="text-blue-700 dark:text-blue-300 text-xs">
                            This two-tier system follows industry best practices used by companies like Stripe, Linear, and GitHub. 
                            It optimizes for both visual impact (full-width containers) and content readability (constrained text), 
                            creating a more sophisticated and user-friendly experience.
                          </BodySmall>
                        </div>
                      </div>
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
              </ResponsiveTabsContent>

              {/* Components Tab */}
              <ResponsiveTabsContent value="components" className="space-y-8">
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
              </ResponsiveTabsContent>

              {/* Implementation Tab */}
              <ResponsiveTabsContent value="implementation" className="space-y-8">
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
                      <div>--breakpoint-xl: 1600px;</div>
                      <div>--breakpoint-2xl: 2560px;</div>
                      <div></div>
                      <div className="text-muted-foreground">/* Container max-widths */</div>
                      <div>--container-sm: 640px;</div>
                      <div>--container-md: 768px;</div>
                      <div>--container-lg: 1400px;</div>
                      <div>--container-xl: 1920px;</div>
                      <div>--container-2xl: 2560px;</div>
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
                      <div>xl: → @media (min-width: 1600px)</div>
                      <div>2xl: → @media (min-width: 2560px)</div>
                      <div></div>
                      <div className="text-muted-foreground">/* Common patterns */</div>
                      <div>grid-cols-1 md:grid-cols-2 lg:grid-cols-3</div>
                      <div>flex-col md:flex-row</div>
                      <div>text-sm md:text-base lg:text-lg</div>
                      <div>p-4 md:p-6 lg:p-8</div>
                      <div></div>
                      <div className="text-muted-foreground">/* Container standards */</div>
                      <div>Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]"</div>
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
                        <div className="text-muted-foreground">// Responsive page container</div>
                        <div>function ResponsivePage(&#123; children &#125;) &#123;</div>
                        <div>  return (</div>
                        <div>    &lt;Container </div>
                        <div>      size="2xl" </div>
                        <div>      className="px-4 sm:px-6 lg:px-8 lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]"</div>
                        <div>    &gt;</div>
                        <div>      &#123;children&#125;</div>
                        <div>    &lt;/Container&gt;</div>
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
                        <div>      if (width &gt;= 2560) setBreakpoint(&apos;2xl&apos;)</div>
                        <div>      else if (width &gt;= 1600) setBreakpoint(&apos;xl&apos;)</div>
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
              </ResponsiveTabsContent>
            </ResponsiveTabs>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
