"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { H1, H3, P } from "@/components/ui/typography"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { ResponsiveTabs, ResponsiveTabsContent, ResponsiveTabsList, ResponsiveTabsTrigger } from "@/components/ui/responsive-tabs"

import { 
  typeScale, 
  fontWeights, 
  fontFamilies, 
  typographyPrinciples, 
  fontSpecifications, 
  usageGuidelines 
} from "@/lib/typography-config"

export default function TypographyPage() {
  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
    >
      <Container>
        <Section paddingY="xl">
          <PageHeader
            title="Typography"
            description="A comprehensive typography system built with Helvetica Now variable fonts, providing consistent type hierarchy and readability across all screen sizes."
            size="lg"
            centered
          />
        </Section>

        {/* Typography Overview */}
        <Section paddingY="lg">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="text" className="h-5 w-5" />
                Typography Overview
              </CardTitle>
              <CardDescription>
                Our typography system is built on Helvetica Now variable fonts, providing exceptional 
                readability and a modern, professional appearance across all devices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <H3 className="mb-3">Key Principles</H3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name={typographyPrinciples.readability.icon} className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{typographyPrinciples.readability.title}</span>
                      </div>
                      <P className="text-sm text-muted-foreground">
                        {typographyPrinciples.readability.description}
                      </P>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name={typographyPrinciples.consistency.icon} className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{typographyPrinciples.consistency.title}</span>
                      </div>
                      <P className="text-sm text-muted-foreground">
                        {typographyPrinciples.consistency.description}
                      </P>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name={typographyPrinciples.performance.icon} className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{typographyPrinciples.performance.title}</span>
                      </div>
                      <P className="text-sm text-muted-foreground">
                        {typographyPrinciples.performance.description}
                      </P>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <H3 className="mb-3">Font Specifications</H3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Primary Font</span>
                        <Badge variant="outline">{fontSpecifications.primary.name}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Variable Font</span>
                        <Badge variant="outline">{fontSpecifications.primary.variable ? "Yes" : "No"}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Weight Range</span>
                        <Badge variant="outline">{fontSpecifications.primary.weightRange}</Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Monospace Font</span>
                        <Badge variant="outline">{fontSpecifications.monospace.name}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Font Type</span>
                        <Badge variant="outline">Monospace</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Usage</span>
                        <Badge variant="outline">Code & Technical</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Type Scale */}
        <Section paddingY="lg">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="ruler-line" className="h-5 w-5" />
                Type Scale
              </CardTitle>
              <CardDescription>
                A systematic type scale that maintains consistent visual hierarchy and readability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {typeScale.map((type, index) => (
                  <div key={type.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold">{type.name}</span>
                        <div className="text-sm text-muted-foreground">{type.usage}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{type.class}</Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          {type.weight} • {type.lineHeight} • {type.tracking}
                        </div>
                      </div>
                    </div>
                    <div className={`${type.class} ${type.weight} ${type.lineHeight} ${type.tracking} border-l-4 border-primary/20 pl-4`}>
                      {type.example}
                    </div>
                    {index < typeScale.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Font Weights */}
        <Section paddingY="lg">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="bold" className="h-5 w-5" />
                Font Weights
              </CardTitle>
              <CardDescription>
                Available font weights in the Helvetica Now variable font
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {fontWeights.map((weight) => (
                  <div key={weight.weight} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{weight.name}</span>
                      <Badge variant="outline">{weight.weight}</Badge>
                    </div>
                    <div className={`${weight.class} text-lg`}>
                      The quick brown fox
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Font Families */}
        <Section paddingY="lg">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="font-family" className="h-5 w-5" />
                Font Families
              </CardTitle>
              <CardDescription>
                Available font families and their usage guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {fontFamilies.map((font) => (
                  <div key={font.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold">{font.name}</span>
                        <div className="text-sm text-muted-foreground">{font.description}</div>
                      </div>
                      <Badge variant="outline">{font.class}</Badge>
                    </div>
                    <div className={`${font.class} text-lg p-4 bg-muted/20 rounded-lg`}>
                      {font.example}
                    </div>
                  </div>
                ))}
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
                Best practices for implementing typography in your designs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <H3 className="mb-3">Hierarchy</H3>
                  <div className="space-y-4">
                    {usageGuidelines.hierarchy.map((guideline, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Icon name="check-line" className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <span className="font-medium">{guideline.title}</span>
                          <P className="text-sm text-muted-foreground">
                            {guideline.description}
                          </P>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <H3 className="mb-3">Accessibility</H3>
                  <div className="space-y-4">
                    {usageGuidelines.accessibility.map((guideline, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Icon name="check-line" className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <span className="font-medium">{guideline.title}</span>
                          <P className="text-sm text-muted-foreground">
                            {guideline.description}
                          </P>
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
