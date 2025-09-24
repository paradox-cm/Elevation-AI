"use client"


import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Grid } from "@/components/ui/layout/grid"
import { PageHeader } from "@/components/ui/marketing/page-header"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import {
  lineIcons,
  fillIcons,
  iconCategories,
  iconSizes,
  iconStyles,
  iconFoundation,
  usageGuidelines,
  implementationExamples
} from "@/lib/icons-config"

export default function IconsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredLineIcons = lineIcons.filter(icon => 
    icon.toLowerCase().includes(searchTerm.toLowerCase()) ||
    icon.replace(/-line$/, '').replace(/-/g, ' ').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredFillIcons = fillIcons.filter(icon => 
    icon.toLowerCase().includes(searchTerm.toLowerCase()) ||
    icon.replace(/-fill$/, '').replace(/-/g, ' ').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
    >
      <Container>
        <Section paddingY="xl">
          <PageHeader
            title="Icon System"
            description="Consistent icon usage and available icon sets."
            size="lg"
            centered
          />
          
          <div className="max-w-md mx-auto mt-8">
            <div className="relative">
              <Icon name="search-line" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size="sm" />
              <Input
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </Section>
        
        <Grid cols={1} gap={6}>
          {/* Installation Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Installation Guide</CardTitle>
              <CardDescription>How to install and set up Remix Icons in your project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Installation Steps */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="download-line" size="sm" />
                    Installation Steps
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">1. Install the Package</h4>
                      <div className="bg-background p-3 rounded font-mono text-sm border">
                        npm install remixicon
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">2. Import CSS (Recommended)</h4>
                      <div className="bg-background p-3 rounded font-mono text-sm border">
                        {`// In your main CSS file or _app.js
import 'remixicon/fonts/remixicon.css'`}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        This method includes all icons and provides the best performance for most use cases.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">3. Alternative: Import Individual Icons</h4>
                      <div className="bg-background p-3 rounded font-mono text-sm border">
                        {`// For tree-shaking optimization
import 'remixicon/fonts/remixicon.css'
// Or import specific icon fonts
import 'remixicon/fonts/remixicon.css'`}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Use this approach if you need to minimize bundle size and only use specific icons.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Usage Methods */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="code-line" size="sm" />
                    Usage Methods
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">CSS Classes (Recommended)</h4>
                      <div className="bg-background p-3 rounded font-mono text-sm border mb-2">
                        {`<i class="ri-home-line"></i>
<i class="ri-star-fill"></i>`}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Use CSS classes for the best performance and consistency with our design system.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">React Component</h4>
                      <div className="bg-background p-3 rounded font-mono text-sm border mb-2">
                        {`import Icon from '@/components/ui/icon'

<Icon name="home-line" />
<Icon name="star-fill" size="lg" />`}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Use our Icon component for type safety and consistent sizing.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="lightbulb-line" size="sm" />
                    Best Practices
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600">Do's</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Icon name="check-line" size="sm" className="text-green-500 mt-0.5" />
                          <span className="text-sm">Use consistent icon styles (line vs fill) throughout your app</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Icon name="check-line" size="sm" className="text-green-500 mt-0.5" />
                          <span className="text-sm">Import the CSS file once in your main entry point</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Icon name="check-line" size="sm" className="text-green-500 mt-0.5" />
                          <span className="text-sm">Use semantic icon names that clearly indicate their purpose</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Icon name="check-line" size="sm" className="text-green-500 mt-0.5" />
                          <span className="text-sm">Test icons at different sizes to ensure readability</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-red-600">Don'ts</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Icon name="close-line" size="sm" className="text-red-500 mt-0.5" />
                          <span className="text-sm">Don't mix different icon libraries in the same project</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Icon name="close-line" size="sm" className="text-red-500 mt-0.5" />
                          <span className="text-sm">Don't use icons smaller than 16px for interactive elements</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Icon name="close-line" size="sm" className="text-red-500 mt-0.5" />
                          <span className="text-sm">Don't forget to add proper alt text or aria-labels for accessibility</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Icon name="close-line" size="sm" className="text-red-500 mt-0.5" />
                          <span className="text-sm">Don't override icon styles unless absolutely necessary</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Tips */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="speed-line" size="sm" />
                    Performance Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <h4 className="font-medium mb-1">Bundle Size Optimization</h4>
                      <p className="text-sm text-muted-foreground">
                        The full Remix Icons CSS is ~1.2MB. For production apps, consider using a build tool to tree-shake unused icons.
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <h4 className="font-medium mb-1">CDN Alternative</h4>
                      <p className="text-sm text-muted-foreground">
                        For quick prototyping, you can use the CDN: <code className="bg-muted px-1 rounded text-xs">https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css</code>
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                      <h4 className="font-medium mb-1">Font Loading</h4>
                      <p className="text-sm text-muted-foreground">
                        Consider using <code className="bg-muted px-1 rounded text-xs">font-display: swap</code> to improve loading performance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Remix Icons - Line Style ({filteredLineIcons.length} icons)</CardTitle>
              <CardDescription>Comprehensive collection of the most commonly used Remix Icons in line style</CardDescription>
            </CardHeader>
            <CardContent>
              <Grid cols={8} gap={2}>
                {filteredLineIcons.map((name) => (
                  <div key={name} className="flex flex-col items-center space-y-1 p-2 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Icon name={name} size="lg" />
                    <span className="text-xs text-muted-foreground text-center leading-tight">{name.replace(/-line$/, '').replace(/-/g, ' ')}</span>
                  </div>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Remix Icons - Fill Style ({filteredFillIcons.length} icons)</CardTitle>
              <CardDescription>The same icons in fill (solid) style</CardDescription>
            </CardHeader>
            <CardContent>
              <Grid cols={8} gap={2}>
                {filteredFillIcons.map((name) => (
                  <div key={name} className="flex flex-col items-center space-y-1 p-2 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Icon name={name} size="lg" />
                    <span className="text-xs text-muted-foreground text-center leading-tight">{name.replace(/-fill$/, '').replace(/-/g, ' ')}</span>
                  </div>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Icon Sizes</CardTitle>
              <CardDescription>Available icon sizes using the Icon component</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-8">
                {[
                  { size: "xs", label: "Extra Small" },
                  { size: "sm", label: "Small" },
                  { size: "md", label: "Medium" },
                  { size: "lg", label: "Large" },
                  { size: "xl", label: "Extra Large" },
                  { size: "2xl", label: "2XL" },
                ].map(({ size, label }) => (
                  <div key={size} className="flex flex-col items-center space-y-2">
                    <Icon name="star-line" size={size as "xs" | "sm" | "md" | "lg" | "xl" | "2xl"} />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Examples</CardTitle>
              <CardDescription>How to use the Icon component in your code</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Basic Usage</h4>
                  <code className="text-sm">
                    {`<Icon name="home-line" />`}
                  </code>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">With Size</h4>
                  <code className="text-sm">
                    {`<Icon name="star-fill" size="xl" />`}
                  </code>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">With Custom Classes</h4>
                  <code className="text-sm">
                    {`<Icon name="heart-line" className="text-red-500" />`}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Icon Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Icon Categories</CardTitle>
              <CardDescription>
                Organized icon categories with usage examples and best practices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {iconCategories.map((category) => (
                  <div key={category.name} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon name={category.icons[0] || "star-line"} size="sm" />
                      <h3 className="font-semibold">{category.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-muted-foreground">Examples:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {category.examples.slice(0, 3).map((example) => (
                            <span key={example} className="text-xs bg-muted px-2 py-1 rounded">
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-muted-foreground">Best Practices:</span>
                        <div className="space-y-1 mt-1">
                          {category.bestPractices.slice(0, 2).map((practice) => (
                            <div key={practice} className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full mt-2"></div>
                              <span className="text-xs text-muted-foreground">{practice}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Icon Principles */}
          <Card>
            <CardHeader>
              <CardTitle>Icon Principles</CardTitle>
              <CardDescription>
                Core principles for effective icon usage in our design system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon name="grid-line" size="sm" />
                    <h3 className="font-semibold">Consistency</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{iconFoundation.principles.consistency}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon name="eye-line" size="sm" />
                    <h3 className="font-semibold">Clarity</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{iconFoundation.principles.clarity}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon name="heart-line" size="sm" />
                    <h3 className="font-semibold">Accessibility</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{iconFoundation.principles.accessibility}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon name="zoom-in-line" size="sm" />
                    <h3 className="font-semibold">Scalability</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{iconFoundation.principles.scalability}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Guidelines</CardTitle>
              <CardDescription>
                Best practices for using icons effectively in your interfaces
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-green-600">Do's</h3>
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
                  <h3 className="font-semibold mb-3 text-red-600">Don'ts</h3>
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

          {/* Implementation Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Examples</CardTitle>
              <CardDescription>
                Code examples for implementing icons in your components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{implementationExamples.basicUsage.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{implementationExamples.basicUsage.description}</p>
                  <div className="bg-muted p-3 rounded font-mono text-sm">
                    {implementationExamples.basicUsage.code}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{implementationExamples.withSize.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{implementationExamples.withSize.description}</p>
                  <div className="bg-muted p-3 rounded font-mono text-sm">
                    {implementationExamples.withSize.code}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{implementationExamples.withCustomClasses.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{implementationExamples.withCustomClasses.description}</p>
                  <div className="bg-muted p-3 rounded font-mono text-sm">
                    {implementationExamples.withCustomClasses.code}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{implementationExamples.withAccessibility.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{implementationExamples.withAccessibility.description}</p>
                  <div className="bg-muted p-3 rounded font-mono text-sm">
                    {implementationExamples.withAccessibility.code}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{implementationExamples.inButton.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{implementationExamples.inButton.description}</p>
                  <div className="bg-muted p-3 rounded font-mono text-sm">
                    {implementationExamples.inButton.code}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </AppShell>
    </PageWrapper>
  )
}
