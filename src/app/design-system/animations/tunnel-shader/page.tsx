"use client"

import React from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { H1, H3, P, Code } from "@/components/ui/typography"
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
        <div className="flex-1 overflow-auto">
          <Container size="2xl" className="py-8">
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <H1>Tunnel Shader Animation</H1>
                <P className="text-muted-foreground">
                  A mesmerizing tunnel effect with animated rings and particles that creates depth and movement.
                </P>
                <div className="flex gap-2">
                  <Badge variant="secondary">Animation</Badge>
                  <Badge variant="secondary">Canvas</Badge>
                  <Badge variant="secondary">Shader</Badge>
                </div>
              </div>

              {/* Live Demo */}
              <Section>
                <Card>
                  <CardHeader>
                    <CardTitle>Live Demo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <H3>Default Size</H3>
                          <div className="border border-border rounded-lg p-4 bg-muted/20">
                            <TunnelShader />
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <H3>Custom Size</H3>
                          <div className="border border-border rounded-lg p-4 bg-muted/20">
                            <div className="w-[300px] h-[200px]">
                              <TunnelShader />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <H3>With Border</H3>
                        <div className="border border-border rounded-lg p-4 bg-muted/20">
                          <TunnelShader />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Section>

              {/* Usage */}
              <Section>
                <Card>
                  <CardHeader>
                    <CardTitle>Usage</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <H3>Basic Usage</H3>
                      <Code className="block mt-2 p-4">
{`import { TunnelShader } from "@/components/animations"

<TunnelShader />`}
                      </Code>
                    </div>
                    
                    <div>
                      <H3>With Custom Props</H3>
                      <Code className="block mt-2 p-4">
{`import { TunnelShader } from "@/components/animations"

<TunnelShader 
  width={400}
  height={300}
  className="my-custom-class"
  showBorder={true}
/>`}
                      </Code>
                    </div>
                  </CardContent>
                </Card>
              </Section>

              {/* Props */}
              <Section>
                <Card>
                  <CardHeader>
                    <CardTitle>Props</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Prop</th>
                            <th className="text-left p-2">Type</th>
                            <th className="text-left p-2">Default</th>
                            <th className="text-left p-2">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2 font-mono">width</td>
                            <td className="p-2">number</td>
                            <td className="p-2">400</td>
                            <td className="p-2">Width of the canvas in pixels</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-mono">height</td>
                            <td className="p-2">number</td>
                            <td className="p-2">300</td>
                            <td className="p-2">Height of the canvas in pixels</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-mono">className</td>
                            <td className="p-2">string</td>
                            <td className="p-2">&ldquo;&rdquo;</td>
                            <td className="p-2">Additional CSS classes</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-mono">showBorder</td>
                            <td className="p-2">boolean</td>
                            <td className="p-2">false</td>
                            <td className="p-2">Whether to show a border around the canvas</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </Section>

              {/* Features */}
              <Section>
                <Card>
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Icon name="check" className="h-4 w-4 text-green-500" />
                        <span>Animated tunnel rings with depth</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="check" className="h-4 w-4 text-green-500" />
                        <span>Particle effects for enhanced visual appeal</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="check" className="h-4 w-4 text-green-500" />
                        <span>Theme-aware colors (light/dark mode)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="check" className="h-4 w-4 text-green-500" />
                        <span>Customizable dimensions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="check" className="h-4 w-4 text-green-500" />
                        <span>Responsive design</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="check" className="h-4 w-4 text-green-500" />
                        <span>Performance optimized with requestAnimationFrame</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </Section>
            </div>
          </Container>
        </div>
      </AppShell>
    </PageWrapper>
  )
}
