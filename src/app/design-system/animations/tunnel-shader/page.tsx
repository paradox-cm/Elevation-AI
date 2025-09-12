"use client"

import React from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { H1, H2, H3, P, Code } from "@/components/ui/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { TunnelShader } from "@/components/animations"

export default function TunnelShaderPage() {
  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="animations" />}
        sidebar={<DesignSystemSidebar />}
      >
        <div className="min-h-screen bg-background">
          <main>
            {/* Header */}
            <Section paddingY="lg" className="border-b">
              <Container size="2xl">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Icon name="eye-line" size="sm" />
                    Animation Components
                  </div>
                  <H1>Tunnel Shader</H1>
                  <P className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Immersive tunnel effect animation that creates depth and visual interest. Used in the "Who this is for" section of the people page.
                  </P>
                </div>
              </Container>
            </Section>

          {/* Live Demo */}
          <Section paddingY="lg">
            <Container size="2xl">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-4">
                  <H2>Live Demo</H2>
                  <P className="text-muted-foreground">
                    The tunnel shader creates an immersive 3D tunnel effect that draws the viewer's attention and creates a sense of depth and movement.
                  </P>
                </div>

                <Card>
                  <CardContent className="p-8">
                    <div className="relative h-[400px] rounded-lg border border-border/50 overflow-hidden bg-gradient-to-br from-background/50 to-background/30">
                      <div className="w-full h-full flex items-center justify-center">
                        <TunnelShader />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <H3>Usage</H3>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <Code className="text-sm">
{`import { TunnelShader } from "@/components/animations"

// Basic usage
<TunnelShader />

// With custom styling
<div className="w-full h-full flex items-center justify-center">
  <TunnelShader />
</div>`}
                      </Code>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <H3>Component Details</H3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <P className="font-medium">Type</P>
                        <P className="text-muted-foreground">React component with WebGL shader</P>
                      </div>
                      <div>
                        <P className="font-medium">Performance</P>
                        <P className="text-muted-foreground">Optimized for smooth 60fps animation</P>
                      </div>
                      <div>
                        <P className="font-medium">Responsive</P>
                        <P className="text-muted-foreground">Automatically adapts to container size</P>
                      </div>
                      <div>
                        <P className="font-medium">Browser Support</P>
                        <P className="text-muted-foreground">WebGL compatible browsers</P>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <H3>Features</H3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P>3D tunnel perspective effect</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P>Smooth continuous animation</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P>High performance WebGL rendering</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P>Automatic cleanup on unmount</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P>Responsive design support</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P>Memory efficient</P>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <H3>Use Cases</H3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <Icon name="arrow-right-line" size="sm" className="text-primary mt-0.5" />
                        <P>Hero sections requiring visual impact</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="arrow-right-line" size="sm" className="text-primary mt-0.5" />
                        <P>Background animations for content sections</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="arrow-right-line" size="sm" className="text-primary mt-0.5" />
                        <P>Loading states and transitions</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="arrow-right-line" size="sm" className="text-primary mt-0.5" />
                        <P>Interactive elements requiring depth</P>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <H3>Implementation Notes</H3>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-3 text-sm">
                      <P className="font-medium">Performance Considerations:</P>
                      <ul className="space-y-2 ml-4">
                        <li>• The component automatically handles WebGL context creation and cleanup</li>
                        <li>• Animation frame rate is optimized for smooth performance</li>
                        <li>• Memory usage is minimal with proper resource management</li>
                        <li>• Compatible with React's strict mode and development tools</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </Section>
          </main>
        </div>
      </AppShell>
    </PageWrapper>
  )
}
