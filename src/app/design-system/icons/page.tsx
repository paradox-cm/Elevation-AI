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
