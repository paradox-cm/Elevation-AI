"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { H2, H3, H4, BodyLarge, BodySmall } from "@/components/ui/typography"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"

export default function TransparencyPage() {
  const [activeGlass, setActiveGlass] = useState("subtle")

  const glassVariants = [
    {
      name: "Subtle",
      description: "Light transparency for subtle depth and layering",
      class: "bg-white/10 backdrop-blur-sm border border-white/20",
      darkClass: "bg-black/10 backdrop-blur-sm border border-white/10",
      usage: ["Cards", "Overlays", "Subtle depth"],
      intensity: "Low",
      blur: "4px"
    },
    {
      name: "Medium",
      description: "Balanced transparency for prominent glass effects",
      class: "bg-white/20 backdrop-blur-md border border-white/30",
      darkClass: "bg-black/20 backdrop-blur-md border border-white/20",
      usage: ["Modals", "Navigation", "Content cards"],
      intensity: "Medium",
      blur: "12px"
    },
    {
      name: "Strong",
      description: "High transparency for dramatic glass morphism",
      class: "bg-white/30 backdrop-blur-lg border border-white/40",
      darkClass: "bg-black/30 backdrop-blur-lg border border-white/30",
      usage: ["Hero sections", "Feature cards", "Prominent elements"],
      intensity: "High",
      blur: "16px"
    },
    {
      name: "Frosted",
      description: "Heavy blur with minimal transparency for privacy",
      class: "bg-white/40 backdrop-blur-xl border border-white/50",
      darkClass: "bg-black/40 backdrop-blur-xl border border-white/40",
      usage: ["Privacy overlays", "Background blur", "Heavy depth"],
      intensity: "Maximum",
      blur: "24px"
    }
  ]

  const transparencyLevels = [
    {
      name: "10%",
      value: "/10",
      description: "Very subtle transparency",
      usage: ["Subtle overlays", "Background elements", "Depth hints"]
    },
    {
      name: "20%",
      value: "/20",
      description: "Light transparency",
      usage: ["Cards", "Navigation", "Content containers"]
    },
    {
      name: "30%",
      value: "/30",
      description: "Medium transparency",
      usage: ["Modals", "Overlays", "Feature sections"]
    },
    {
      name: "40%",
      value: "/40",
      description: "Strong transparency",
      usage: ["Hero elements", "Prominent cards", "Dramatic effects"]
    },
    {
      name: "50%",
      value: "/50",
      description: "Heavy transparency",
      usage: ["Privacy screens", "Background blur", "Maximum depth"]
    }
  ]

  const usageGuidelines = [
    {
      title: "Background Considerations",
      description: "Ensure sufficient contrast and readability",
      icon: "contrast-line",
      guidelines: [
        "Use glass effects on complex, colorful backgrounds",
        "Avoid glass on plain white or black backgrounds",
        "Ensure text remains readable with minimum 4.5:1 contrast ratio",
        "Test glass effects across different background patterns"
      ]
    },
    {
      title: "Performance Optimization",
      description: "Balance visual effects with performance",
      icon: "speed-line",
      guidelines: [
        "Limit backdrop-blur usage to essential elements",
        "Use hardware acceleration when possible",
        "Consider reducing blur on mobile devices",
        "Test performance on lower-end devices"
      ]
    },
    {
      title: "Accessibility",
      description: "Ensure glass effects don't compromise accessibility",
      icon: "shield-check-line",
      guidelines: [
        "Provide alternative styles for users with motion sensitivity",
        "Ensure sufficient contrast ratios are maintained",
        "Test with screen readers and assistive technologies",
        "Offer high contrast mode alternatives"
      ]
    },
    {
      title: "Responsive Design",
      description: "Adapt glass effects for different screen sizes",
      icon: "smartphone-line",
      guidelines: [
        "Reduce blur intensity on mobile devices",
        "Adjust transparency levels for smaller screens",
        "Consider touch interaction requirements",
        "Test on various device types and orientations"
      ]
    }
  ]

  const implementationExamples = [
    {
      title: "Navigation Bar",
      description: "Subtle glass effect for modern navigation",
      code: `className="bg-white/10 backdrop-blur-sm border-b border-white/20"`,
      preview: "bg-white/10 backdrop-blur-sm border-b border-white/20"
    },
    {
      title: "Modal Overlay",
      description: "Medium glass effect for modal backgrounds",
      code: `className="bg-black/20 backdrop-blur-md"`,
      preview: "bg-black/20 backdrop-blur-md"
    },
    {
      title: "Feature Card",
      description: "Strong glass effect for prominent content",
      code: `className="bg-white/30 backdrop-blur-lg border border-white/40"`,
      preview: "bg-white/30 backdrop-blur-lg border border-white/40"
    },
    {
      title: "Hero Section",
      description: "Frosted glass for dramatic hero elements",
      code: `className="bg-white/40 backdrop-blur-xl border border-white/50"`,
      preview: "bg-white/40 backdrop-blur-xl border border-white/50"
    }
  ]

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container size="2xl">
          <Section paddingY="xl">
            <PageHeader
              title="Transparency & Glass"
              description="Modern glass morphism effects and transparency guidelines for creating depth, hierarchy, and visual interest in our interfaces."
              size="lg"
              centered
            />
          </Section>

          {/* Glass Variants */}
          <Section paddingY="lg">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">Glass Variants</H2>
              <BodyLarge className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Our glass morphism system provides four distinct variants, each optimized for different use cases and visual impact levels.
              </BodyLarge>

              <Tabs value={activeGlass} onValueChange={setActiveGlass} className="space-y-8">
                <TabsList className="grid w-full grid-cols-4">
                  {glassVariants.map((variant) => (
                    <TabsTrigger key={variant.name} value={variant.name.toLowerCase()}>
                      {variant.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {glassVariants.map((variant) => (
                  <TabsContent key={variant.name} value={variant.name.toLowerCase()} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Preview */}
                      <div className="space-y-4">
                        <H3 className="text-xl font-semibold">Preview</H3>
                        <div 
                          className={`h-64 rounded-lg p-6 flex items-center justify-center ${variant.class} dark:${variant.darkClass}`}
                          style={{
                            backgroundImage: `
                              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
                              radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
                            `
                          }}
                        >
                          <div className="text-center">
                            <H4 className="text-lg font-semibold mb-2">{variant.name} Glass</H4>
                            <BodySmall className="text-muted-foreground">
                              Blur: {variant.blur} | Intensity: {variant.intensity}
                            </BodySmall>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-4">
                        <H3 className="text-xl font-semibold">Details</H3>
                        <div className="space-y-4">
                          <div>
                            <BodyLarge className="font-medium mb-2">Description</BodyLarge>
                            <BodySmall className="text-muted-foreground">{variant.description}</BodySmall>
                          </div>
                          
                          <div>
                            <BodyLarge className="font-medium mb-2">Usage</BodyLarge>
                            <div className="flex flex-wrap gap-2">
                              {variant.usage.map((use) => (
                                <Badge key={use} variant="secondary" className="text-xs">
                                  {use}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <BodyLarge className="font-medium mb-2">Classes</BodyLarge>
                            <div className="space-y-2">
                              <div className="bg-muted rounded p-3 font-mono text-sm">
                                <div className="text-muted-foreground text-xs mb-1">Light Mode:</div>
                                {variant.class}
                              </div>
                              <div className="bg-muted rounded p-3 font-mono text-sm">
                                <div className="text-muted-foreground text-xs mb-1">Dark Mode:</div>
                                {variant.darkClass}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </Section>

          {/* Transparency Levels */}
          <Section paddingY="xl" className="bg-muted/50 rounded-lg">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">Transparency Levels</H2>
              <BodyLarge className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Fine-tune transparency levels to achieve the perfect balance of visibility and visual effect.
              </BodyLarge>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {transparencyLevels.map((level) => (
                  <Card key={level.name} className="group hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-primary font-semibold">{level.name}</span>
                        </div>
                        <Badge variant="secondary" className="font-mono text-xs">
                          {level.value}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{level.name} Transparency</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <BodyLarge className="text-muted-foreground mb-4">{level.description}</BodyLarge>
                      <div className="space-y-2">
                        {level.usage.map((use, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <BodySmall className="text-muted-foreground">{use}</BodySmall>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          {/* Usage Guidelines */}
          <Section paddingY="xl">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">Usage Guidelines</H2>
              <BodyLarge className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Follow these guidelines to ensure glass effects enhance rather than hinder user experience.
              </BodyLarge>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {usageGuidelines.map((guideline) => (
                  <Card key={guideline.title} className="group hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={guideline.icon} className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{guideline.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <BodyLarge className="text-muted-foreground mb-4">{guideline.description}</BodyLarge>
                      <div className="space-y-2">
                        {guideline.guidelines.map((item, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <BodySmall className="text-muted-foreground">{item}</BodySmall>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          {/* Implementation Examples */}
          <Section paddingY="xl">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">Implementation Examples</H2>
              <BodyLarge className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Common implementation patterns and code examples for different use cases.
              </BodyLarge>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {implementationExamples.map((example) => (
                  <Card key={example.title} className="group hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <BodyLarge className="text-muted-foreground">{example.description}</BodyLarge>
                      
                      <div className="bg-muted rounded p-3 font-mono text-sm">
                        {example.code}
                      </div>

                      <div 
                        className="h-20 rounded border-2 border-dashed border-muted-foreground/20 flex items-center justify-center relative overflow-hidden"
                        style={{
                          backgroundImage: `
                            radial-gradient(circle at 20% 20%, rgba(14, 98, 253, 0.4) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(116, 88, 244, 0.4) 0%, transparent 50%),
                            radial-gradient(circle at 40% 60%, rgba(18, 197, 93, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 60% 40%, rgba(91, 200, 247, 0.3) 0%, transparent 50%)
                          `
                        }}
                      >
                        <div className={`px-4 py-2 rounded ${example.preview}`}>
                          <BodySmall className="font-medium">Preview</BodySmall>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
