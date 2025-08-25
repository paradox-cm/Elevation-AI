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

export default function TypographyPage() {
  
  const typeScale = [
    {
      name: "Display Large",
      class: "text-6xl",
      weight: "font-semibold",
      lineHeight: "leading-normal",
      tracking: "tracking-normal",
      usage: "Hero headlines, page titles",
      example: "Display Large"
    },
    {
      name: "Display Medium", 
      class: "text-5xl",
      weight: "font-semibold",
      lineHeight: "leading-normal",
      tracking: "tracking-normal",
      usage: "Section headlines, major headings",
      example: "Display Medium"
    },
    {
      name: "Display Small",
      class: "text-4xl", 
      weight: "font-semibold",
      lineHeight: "leading-normal",
      tracking: "tracking-normal",
      usage: "Subsection headlines",
      example: "Display Small"
    },
    {
      name: "Heading Large",
      class: "text-3xl",
      weight: "font-medium", 
      lineHeight: "leading-normal",
      tracking: "tracking-normal",
      usage: "Page headings, article titles",
      example: "Heading Large"
    },
    {
      name: "Heading Medium",
      class: "text-2xl",
      weight: "font-medium",
      lineHeight: "leading-normal",
      tracking: "tracking-normal",
      usage: "Section headings, card titles",
      example: "Heading Medium"
    },
    {
      name: "Heading Small",
      class: "text-xl",
      weight: "font-medium",
      lineHeight: "leading-normal",
      tracking: "tracking-normal",
      usage: "Subsection headings, form labels",
      example: "Heading Small"
    },
    {
      name: "Body Large",
      class: "text-lg",
      weight: "font-normal",
      lineHeight: "leading-relaxed",
      usage: "Lead paragraphs, important content",
      example: "Body Large - This is the large body text used for important content and lead paragraphs."
    },
    {
      name: "Body",
      class: "text-base",
      weight: "font-normal", 
      lineHeight: "leading-relaxed",
      usage: "Main content, paragraphs",
      example: "Body - This is the standard body text used throughout the application for main content."
    },
    {
      name: "Body Small",
      class: "text-sm",
      weight: "font-normal",
      lineHeight: "leading-relaxed",
      usage: "Secondary content, captions",
      example: "Body Small - This is smaller text used for captions and secondary information."
    },
    {
      name: "Caption",
      class: "text-xs",
      weight: "font-normal",
      lineHeight: "leading-relaxed",
      usage: "Labels, metadata, fine print",
      example: "Caption - This is the smallest text used for labels and metadata."
    }
  ]

  const fontWeights = [
    { weight: "100", name: "Thin", class: "font-thin" },
    { weight: "200", name: "Extra Light", class: "font-extralight" },
    { weight: "300", name: "Light", class: "font-light" },
    { weight: "400", name: "Regular", class: "font-normal" },
    { weight: "500", name: "Medium", class: "font-medium" },
    { weight: "600", name: "Semi Bold", class: "font-semibold" },
    { weight: "700", name: "Bold", class: "font-bold" },
    { weight: "800", name: "Extra Bold", class: "font-extrabold" },
    { weight: "900", name: "Black", class: "font-black" }
  ]

  const fontFamilies = [
    {
      name: "Helvetica Now",
      class: "font-sans",
      description: "Primary sans-serif font for all UI text",
      example: "The quick brown fox jumps over the lazy dog"
    },
    {
      name: "Geist Mono",
      class: "font-mono", 
      description: "Monospace font for code and technical content",
      example: "const example = 'code snippet';"
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
                        <Icon name="eye-line" className="h-4 w-4 text-primary" />
                        <span className="font-semibold">Readability</span>
                      </div>
                      <P className="text-sm text-muted-foreground">
                        Optimized for maximum readability across all screen sizes and contexts
                      </P>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name="ruler-line" className="h-4 w-4 text-primary" />
                        <span className="font-semibold">Consistency</span>
                      </div>
                      <P className="text-sm text-muted-foreground">
                        Systematic type scale with predictable sizing and spacing relationships
                      </P>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name="responsive-line" className="h-4 w-4 text-primary" />
                        <span className="font-semibold">Performance</span>
                      </div>
                      <P className="text-sm text-muted-foreground">
                        Variable fonts for optimal loading performance and smooth weight transitions
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
                        <Badge variant="outline">Helvetica Now</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Font Type</span>
                        <Badge variant="outline">Variable</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Weight Range</span>
                        <Badge variant="outline">100-900</Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Monospace Font</span>
                        <Badge variant="outline">Geist Mono</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Display</span>
                        <Badge variant="outline">swap</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Subset</span>
                        <Badge variant="outline">Latin</Badge>
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
                    <div className="flex items-start gap-3">
                      <Icon name="check-line" className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Use consistent heading levels</span>
                        <P className="text-sm text-muted-foreground">
                          Maintain a clear visual hierarchy with H1 → H2 → H3 progression
                        </P>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="check-line" className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Limit font weight variations</span>
                        <P className="text-sm text-muted-foreground">
                          Use 2-3 weights maximum per page to maintain visual consistency
                        </P>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="check-line" className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Consider line length</span>
                        <P className="text-sm text-muted-foreground">
                          Aim for 45-75 characters per line for optimal readability
                        </P>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <H3 className="mb-3">Accessibility</H3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="check-line" className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Maintain sufficient contrast</span>
                        <P className="text-sm text-muted-foreground">
                          Ensure text meets WCAG AA contrast requirements (4.5:1 for normal text)
                        </P>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="check-line" className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Use semantic HTML</span>
                        <P className="text-sm text-muted-foreground">
                          Use proper heading tags (h1-h6) for screen readers and SEO
                        </P>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="check-line" className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Scale with user preferences</span>
                        <P className="text-sm text-muted-foreground">
                          Respect user font size preferences and zoom settings
                        </P>
                      </div>
                    </div>
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
