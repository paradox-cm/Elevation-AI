"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"

import { PageHeader } from "@/components/ui/marketing/page-header"
import { H2, H3, H4, BodyLarge, BodySmall } from "@/components/ui/typography"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ResponsiveTabs, ResponsiveTabsContent, ResponsiveTabsList, ResponsiveTabsTrigger } from "@/components/ui/responsive-tabs"
import Icon from "@/components/ui/icon"
import { Logo } from "@/components/ui/logo"
import { Favicon, AppIcon, CircleIcon, CompactLogo } from "@/components/ui/brand-icons"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { useBrandingConfig } from "@/hooks/use-branding-config"
import { PlasmaBackground } from "@/components/ui/plasma-background"

export default function BrandingPage() {
  const {
    config,
    logoConfig,
    brandColorConfig,
    typographyConfig,
    brandVoiceConfig,
    brandGuidelineConfig,
    brandAssetConfig,
    brandApplicationConfig
  } = useBrandingConfig()

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







          {/* Elevation AI Logo */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="image-line" className="h-5 w-5" />
                  Elevation AI Logo
                </CardTitle>
                <CardDescription>
                  The primary Elevation AI logo used across all applications and marketing materials.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 border rounded-lg flex items-center justify-center p-6 relative overflow-hidden">
                  <PlasmaBackground className="absolute inset-0" />
                  <div className="relative z-10">
                    <Logo width={300} height={52} />
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
                    <div className="h-20 bg-muted rounded-lg flex items-center justify-center p-3">
                      <Logo width={150} height={26} />
                    </div>
                    <div className="text-center">
                      <BodySmall className="font-medium">Full Logo</BodySmall>
                      <BodySmall className="text-muted-foreground">Primary usage</BodySmall>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-20 bg-muted rounded-lg flex items-center justify-center p-3">
                      <CompactLogo width={75} height={26} />
                    </div>
                    <div className="text-center">
                      <BodySmall className="font-medium">Compact Logo</BodySmall>
                      <BodySmall className="text-muted-foreground">Space constraints</BodySmall>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-20 bg-muted rounded-lg flex items-center justify-center p-3">
                      <Favicon width={40} height={40} />
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
                      <div className="h-15 bg-primary rounded-lg flex items-center justify-center p-2">
                        <Logo width={100} height={18} variant="dark" />
                      </div>
                      <div className="text-center">
                        <BodySmall className="font-medium">Primary Background</BodySmall>
                        <BodySmall className="text-muted-foreground">Buttons, CTAs</BodySmall>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="h-15 bg-muted rounded-lg flex items-center justify-center p-2">
                        <Logo width={100} height={18} />
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
                        <Logo width={100} height={18} />
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
                          <Logo width={150} height={26} variant="dark" />
                          <BodyLarge className="mt-4">Your Universe. Intelligently Orchestrated.</BodyLarge>
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
                          <Logo width={150} height={26} />
                          <BodySmall className="text-muted-foreground mt-4">The Command Center for Enterprise AI.</BodySmall>
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
                      <div className="h-20 bg-muted rounded-lg flex items-center justify-center p-3">
                        <Favicon width={40} height={40} />
                      </div>
                      <div className="text-center">
                        <BodySmall className="font-medium">Favicon</BodySmall>
                        <BodySmall className="text-muted-foreground">40px × 40px</BodySmall>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="h-20 bg-muted rounded-lg flex items-center justify-center p-3">
                        <AppIcon width={60} height={60} />
                      </div>
                      <div className="text-center">
                        <BodySmall className="font-medium">App Icon</BodySmall>
                        <BodySmall className="text-muted-foreground">Mobile applications</BodySmall>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="h-20 bg-muted rounded-lg flex items-center justify-center p-3">
                        <CircleIcon width={50} height={50} />
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
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
