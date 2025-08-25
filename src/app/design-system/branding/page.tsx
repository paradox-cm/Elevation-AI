"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"

import { PageHeader } from "@/components/ui/marketing/page-header"
import { H1, H2, H3, H4, BodyLarge, BodySmall } from "@/components/ui/typography"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"

export default function BrandingPage() {
  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container>
          <Section paddingY="xl">
            <PageHeader
              title="Brand Identity"
              description="Complete brand identity guidelines including logos, usage standards, and best practices for Elevation AI."
              size="lg"
              centered
            />
          </Section>

          {/* Primary Logo */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="image-line" className="h-5 w-5" />
                  Primary Logo
                </CardTitle>
                <CardDescription>
                  The primary Elevation AI logo used across all applications and marketing materials.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Light Version */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <H4>Light Version</H4>
                      <Badge variant="outline">Primary</Badge>
                    </div>
                    <div className="h-24 bg-background border rounded-lg flex items-center justify-center p-4">
                      <H1 className="text-2xl">Elevation AI</H1>
                    </div>
                    <div className="space-y-2">
                      <BodySmall className="text-muted-foreground">Usage:</BodySmall>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Light backgrounds</li>
                        <li>• Primary brand applications</li>
                        <li>• Marketing materials</li>
                      </ul>
                    </div>
                  </div>

                  {/* Dark Version */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <H4>Dark Version</H4>
                      <Badge variant="outline">Alternative</Badge>
                    </div>
                    <div className="h-24 bg-foreground border rounded-lg flex items-center justify-center p-4">
                      <H1 className="text-2xl text-background">Elevation AI</H1>
                    </div>
                    <div className="space-y-2">
                      <BodySmall className="text-muted-foreground">Usage:</BodySmall>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Dark backgrounds</li>
                        <li>• High contrast situations</li>
                        <li>• Accessibility requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Logo Variations */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="layers-line" className="h-5 w-5" />
                  Logo Variations
                </CardTitle>
                <CardDescription>
                  Different logo formats and variations for various use cases and contexts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Logo Variations Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="h-16 bg-muted rounded-lg flex items-center justify-center p-3">
                      <H2 className="text-lg">Elevation AI</H2>
                    </div>
                    <div className="text-center">
                      <BodySmall className="font-medium">Full Logo</BodySmall>
                      <BodySmall className="text-muted-foreground">Primary usage</BodySmall>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-16 bg-muted rounded-lg flex items-center justify-center p-3">
                      <H2 className="text-lg">EA</H2>
                    </div>
                    <div className="text-center">
                      <BodySmall className="font-medium">Abbreviated</BodySmall>
                      <BodySmall className="text-muted-foreground">Space constraints</BodySmall>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-16 bg-muted rounded-lg flex items-center justify-center p-3">
                      <Icon name="mountain-line" className="h-8 w-8" />
                    </div>
                    <div className="text-center">
                      <BodySmall className="font-medium">Icon Only</BodySmall>
                      <BodySmall className="text-muted-foreground">Favicon, social media</BodySmall>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contextual Variations */}
                <div className="space-y-4">
                  <H4>Contextual Variations</H4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="h-12 bg-primary rounded-lg flex items-center justify-center p-2">
                        <H3 className="text-sm text-primary-foreground">Elevation AI</H3>
                      </div>
                      <div className="text-center">
                        <BodySmall className="font-medium">Primary Background</BodySmall>
                        <BodySmall className="text-muted-foreground">Buttons, CTAs</BodySmall>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="h-12 bg-muted rounded-lg flex items-center justify-center p-2">
                        <H3 className="text-sm">Elevation AI</H3>
                      </div>
                      <div className="text-center">
                        <BodySmall className="font-medium">Muted Background</BodySmall>
                        <BodySmall className="text-muted-foreground">Cards, sections</BodySmall>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Usage Guidelines */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="shield-check-line" className="h-5 w-5" />
                  Usage Guidelines
                </CardTitle>
                <CardDescription>
                  Best practices and rules for maintaining brand consistency.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <H4>Do&apos;s</H4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Icon name="check-line" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Use the logo with adequate clear space</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="check-line" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Maintain proper contrast ratios</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="check-line" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Use approved brand colors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="check-line" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Follow typography hierarchy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="check-line" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Scale proportionally</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <H4>Don&apos;ts</H4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Icon name="close-line" className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Stretch or distort the logo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="close-line" className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Use unauthorized colors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="close-line" className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Place logo on busy backgrounds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="close-line" className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Use outdated logo versions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="close-line" className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Add effects or shadows</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <H4>Clear Space Requirements</H4>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-center h-24 border-2 border-dashed border-muted-foreground/30 rounded-lg">
                      <H2 className="text-lg">Logo</H2>
                    </div>
                    <BodySmall className="text-center mt-2">
                      Minimum clear space should equal the height of the &quot;E&quot; in &quot;Elevation&quot;
                    </BodySmall>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Logo Examples */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="play-circle-line" className="h-5 w-5" />
                  Logo Usage Examples
                </CardTitle>
                <CardDescription>
                  Real-world examples of how the logo should be used across different applications and contexts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Web Applications */}
                <div className="space-y-4">
                  <H4>Web Applications</H4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="h-16 bg-background border rounded-lg flex items-center justify-between px-4">
                        <H3 className="text-lg">Elevation AI</H3>
                        <div className="flex items-center gap-2">
                          <Button size="sm">Dashboard</Button>
                          <Button size="sm" variant="outline">Settings</Button>
                        </div>
                      </div>
                      <div className="text-center">
                        <BodySmall className="font-medium">Navigation Header</BodySmall>
                        <BodySmall className="text-muted-foreground">Primary web app navigation</BodySmall>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="h-16 bg-muted rounded-lg flex items-center justify-center p-3">
                        <div className="flex items-center gap-3">
                          <Icon name="mountain-line" className="h-6 w-6" />
                          <H3 className="text-lg">Elevation AI</H3>
                        </div>
                      </div>
                      <div className="text-center">
                        <BodySmall className="font-medium">Sidebar Logo</BodySmall>
                        <BodySmall className="text-muted-foreground">Collapsed sidebar state</BodySmall>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Marketing Materials */}
                <div className="space-y-4">
                  <H4>Marketing Materials</H4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="h-32 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center p-6">
                        <div className="text-center text-primary-foreground">
                          <H2 className="text-2xl mb-2">Elevation AI</H2>
                          <BodyLarge>Design System for Modern Applications</BodyLarge>
                        </div>
                      </div>
                      <div className="text-center">
                        <BodySmall className="font-medium">Hero Section</BodySmall>
                        <BodySmall className="text-muted-foreground">Landing page hero</BodySmall>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="h-32 bg-card border rounded-lg flex items-center justify-center p-6">
                        <div className="text-center">
                          <H2 className="text-xl mb-2">Elevation AI</H2>
                          <BodySmall className="text-muted-foreground">Professional UI Components</BodySmall>
                        </div>
                      </div>
                      <div className="text-center">
                        <BodySmall className="font-medium">Business Card</BodySmall>
                        <BodySmall className="text-muted-foreground">Print and digital cards</BodySmall>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Digital Assets */}
                <div className="space-y-4">
                  <H4>Digital Assets</H4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <div className="h-16 bg-muted rounded-lg flex items-center justify-center p-3">
                        <Icon name="mountain-line" className="h-8 w-8" />
                      </div>
                      <div className="text-center">
                        <BodySmall className="font-medium">Favicon</BodySmall>
                        <BodySmall className="text-muted-foreground">32px × 32px</BodySmall>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="h-16 bg-muted rounded-lg flex items-center justify-center p-3">
                        <Icon name="mountain-line" className="h-6 w-6" />
                      </div>
                      <div className="text-center">
                        <BodySmall className="font-medium">App Icon</BodySmall>
                        <BodySmall className="text-muted-foreground">Mobile applications</BodySmall>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="h-16 bg-muted rounded-lg flex items-center justify-center p-3">
                        <H3 className="text-sm">EA</H3>
                      </div>
                      <div className="text-center">
                        <BodySmall className="font-medium">Social Media</BodySmall>
                        <BodySmall className="text-muted-foreground">Profile pictures</BodySmall>
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
