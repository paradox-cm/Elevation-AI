"use client"


import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { H3, H4, BodySmall } from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTabs, ResponsiveTabsContent, ResponsiveTabsList, ResponsiveTabsTrigger } from "@/components/ui/responsive-tabs"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"

export default function DesignTokensPage() {

  const colorTokens = [
    {
      category: "Primary Colors",
      tokens: [
        { name: "primary", value: "hsl(var(--primary))", description: "Main brand color", usage: "Buttons, links, primary actions" },
        { name: "primary-foreground", value: "hsl(var(--primary-foreground))", description: "Text on primary background", usage: "Button text, primary text" },
        { name: "primary/10", value: "hsl(var(--primary) / 0.1)", description: "Primary with 10% opacity", usage: "Subtle backgrounds, hover states" },
        { name: "primary/50", value: "hsl(var(--primary) / 0.5)", description: "Primary with 50% opacity", usage: "Disabled states, overlays" }
      ]
    },
    {
      category: "Neutral Colors",
      tokens: [
        { name: "background", value: "hsl(var(--background))", description: "Main background color", usage: "Page backgrounds, card backgrounds" },
        { name: "foreground", value: "hsl(var(--foreground))", description: "Main text color", usage: "Body text, headings" },
        { name: "muted", value: "hsl(var(--muted))", description: "Muted background color", usage: "Subtle backgrounds, disabled states" },
        { name: "muted-foreground", value: "hsl(var(--muted-foreground))", description: "Muted text color", usage: "Secondary text, captions" }
      ]
    },
    {
      category: "Semantic Colors",
      tokens: [
        { name: "destructive", value: "hsl(var(--destructive))", description: "Error and danger color", usage: "Error states, delete actions" },
        { name: "destructive-foreground", value: "hsl(var(--destructive-foreground))", description: "Text on destructive background", usage: "Error message text" },
        { name: "success", value: "hsl(var(--success))", description: "Success and positive color", usage: "Success states, confirmations" },
        { name: "warning", value: "hsl(var(--warning))", description: "Warning and caution color", usage: "Warning states, alerts" }
      ]
    }
  ]

  const spacingTokens = [
    {
      category: "Base Spacing",
      tokens: [
        { name: "0", value: "0px", description: "No spacing", usage: "Reset margins, tight layouts" },
        { name: "1", value: "0.25rem", description: "4px spacing", usage: "Tight spacing, icons" },
        { name: "2", value: "0.5rem", description: "8px spacing", usage: "Small gaps, padding" },
        { name: "3", value: "0.75rem", description: "12px spacing", usage: "Standard gaps" },
        { name: "4", value: "1rem", description: "16px spacing", usage: "Base spacing unit" },
        { name: "6", value: "1.5rem", description: "24px spacing", usage: "Section spacing" },
        { name: "8", value: "2rem", description: "32px spacing", usage: "Large gaps, margins" }
      ]
    },
    {
      category: "Component Spacing",
      tokens: [
        { name: "xs", value: "0.5rem", description: "Extra small spacing", usage: "Tight component spacing" },
        { name: "sm", value: "1rem", description: "Small spacing", usage: "Component padding" },
        { name: "md", value: "1.5rem", description: "Medium spacing", usage: "Standard component spacing" },
        { name: "lg", value: "2rem", description: "Large spacing", usage: "Section spacing" },
        { name: "xl", value: "3rem", description: "Extra large spacing", usage: "Page sections" }
      ]
    }
  ]

  const typographyTokens = [
    {
      category: "Font Sizes",
      tokens: [
        { name: "text-xs", value: "0.75rem", description: "Extra small text", usage: "Captions, metadata" },
        { name: "text-sm", value: "0.875rem", description: "Small text", usage: "Secondary text, labels" },
        { name: "text-base", value: "1rem", description: "Base text size", usage: "Body text, paragraphs (mobile)" },
        { name: "text-lg", value: "1.125rem", description: "Large text size", usage: "Body text, paragraphs (desktop), subheadings, emphasis" },
        { name: "text-xl", value: "1.25rem", description: "Extra large text", usage: "Headings, titles" },
        { name: "text-2xl", value: "1.5rem", description: "2X large text", usage: "Page titles, main headings" }
      ]
    },
    {
      category: "Font Weights",
      tokens: [
        { name: "font-normal", value: "400", description: "Normal weight", usage: "Body text, regular content" },
        { name: "font-medium", value: "500", description: "Medium weight", usage: "Emphasis, labels" },
        { name: "font-semibold", value: "600", description: "Semi-bold weight", usage: "Subheadings, buttons" },
        { name: "font-bold", value: "700", description: "Bold weight", usage: "Headings, important text" }
      ]
    },
    {
      category: "Line Heights",
      tokens: [
        { name: "leading-tight", value: "1.25", description: "Tight line height", usage: "Headings, titles" },
        { name: "leading-normal", value: "1.5", description: "Normal line height", usage: "Body text, paragraphs" },
        { name: "leading-relaxed", value: "1.75", description: "Relaxed line height", usage: "Long-form content" }
      ]
    }
  ]

  const borderTokens = [
    {
      category: "Border Radius",
      tokens: [
        { name: "rounded-none", value: "0px", description: "No border radius", usage: "Sharp corners, cards" },
        { name: "rounded-sm", value: "0.125rem", description: "Small border radius", usage: "Inputs, small elements" },
        { name: "rounded", value: "0.25rem", description: "Default border radius", usage: "Buttons, cards" },
        { name: "rounded-md", value: "0.375rem", description: "Medium border radius", usage: "Larger elements" },
        { name: "rounded-lg", value: "0.5rem", description: "Large border radius", usage: "Containers, modals" },
        { name: "rounded-xl", value: "0.75rem", description: "Extra large border radius", usage: "Hero sections" }
      ]
    },
    {
      category: "Border Widths",
      tokens: [
        { name: "border", value: "1px", description: "Default border width", usage: "Standard borders" },
        { name: "border-0", value: "0px", description: "No border", usage: "Remove borders" },
        { name: "border-2", value: "2px", description: "Thick border", usage: "Emphasis, focus states" },
        { name: "border-4", value: "4px", description: "Very thick border", usage: "Decorative elements" }
      ]
    }
  ]

  const shadowTokens = [
    {
      category: "Shadow Scale",
      tokens: [
        { name: "shadow-sm", value: "0 1px 2px 0 rgb(0 0 0 / 0.05)", description: "Small shadow", usage: "Subtle elevation" },
        { name: "shadow", value: "0 1px 3px 0 rgb(0 0 0 / 0.1)", description: "Default shadow", usage: "Cards, buttons" },
        { name: "shadow-md", value: "0 4px 6px -1px rgb(0 0 0 / 0.1)", description: "Medium shadow", usage: "Modals, dropdowns" },
        { name: "shadow-lg", value: "0 10px 15px -3px rgb(0 0 0 / 0.1)", description: "Large shadow", usage: "Tooltips, overlays" },
        { name: "shadow-xl", value: "0 20px 25px -5px rgb(0 0 0 / 0.1)", description: "Extra large shadow", usage: "Hero elements" }
      ]
    }
  ]

  const tokenCategories = [
    { name: "Colors", icon: "palette-line", count: colorTokens.reduce((acc, cat) => acc + cat.tokens.length, 0) },
    { name: "Spacing", icon: "ruler-line", count: spacingTokens.reduce((acc, cat) => acc + cat.tokens.length, 0) },
    { name: "Typography", icon: "text", count: typographyTokens.reduce((acc, cat) => acc + cat.tokens.length, 0) },
    { name: "Borders", icon: "shape-line", count: borderTokens.reduce((acc, cat) => acc + cat.tokens.length, 0) },
    { name: "Shadows", icon: "stack-line", count: shadowTokens.reduce((acc, cat) => acc + cat.tokens.length, 0) }
  ]

  const getTokenValue = (tokenName: string) => {
    // This would typically come from your actual design tokens
    const tokenMap: Record<string, string> = {
      primary: "hsl(222.2 84% 4.9%)",
      "primary-foreground": "hsl(210 40% 98%)",
      background: "hsl(0 0% 100%)",
      foreground: "hsl(222.2 84% 4.9%)",
      muted: "hsl(210 40% 96.1%)",
      "muted-foreground": "hsl(215.4 16.3% 46.9%)",
      destructive: "hsl(0 84.2% 60.2%)",
      "destructive-foreground": "hsl(210 40% 98%)"
    }
    return tokenMap[tokenName] || "hsl(var(--" + tokenName + "))"
  }

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container>
          <Section paddingY="xl">
            <PageHeader
              title="Design Tokens"
              description="Comprehensive design token system providing consistent values for colors, spacing, typography, and other design properties across your application."
              size="lg"
              centered
            />
          </Section>
          
          <Section paddingY="lg">
            <ResponsiveTabs defaultValue="overview" className="space-y-8">
              <ResponsiveTabsList className="grid w-full grid-cols-5">
                <ResponsiveTabsTrigger value="overview">Overview</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="colors">Colors</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="spacing">Spacing</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="typography">Typography</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="implementation">Implementation</ResponsiveTabsTrigger>
              </ResponsiveTabsList>

              {/* Overview Tab */}
              <ResponsiveTabsContent value="overview" className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name="palette-line" className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>What are Design Tokens?</CardTitle>
                        <CardDescription>
                          Design tokens are the atomic design decisions that form the foundation of your design system.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <H4 className="mb-3">Definition</H4>
                        <BodySmall className="text-muted-foreground">
                          Design tokens are named entities that store visual design attributes. They are the single source of truth for design decisions, ensuring consistency across platforms and technologies.
                        </BodySmall>
                      </div>
                      <div>
                        <H4 className="mb-3">Benefits</H4>
                        <BodySmall className="text-muted-foreground">
                          • Consistent design across platforms<br/>
                          • Easier maintenance and updates<br/>
                          • Better collaboration between designers and developers<br/>
                          • Scalable design system foundation
                        </BodySmall>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Icon name="grid-line" className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <CardTitle>Token Categories</CardTitle>
                        <CardDescription>
                          Overview of all design token categories and their usage.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {tokenCategories.map((category) => (
                        <div key={category.name} className="p-4 border rounded-lg">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Icon name={category.icon} className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <H4>{category.name}</H4>
                              <Badge variant="secondary">{category.count} tokens</Badge>
                            </div>
                          </div>
                          <BodySmall className="text-muted-foreground">
                            {category.name === "Colors" && "Color values for backgrounds, text, and semantic states"}
                            {category.name === "Spacing" && "Consistent spacing values for margins, padding, and gaps"}
                            {category.name === "Typography" && "Font sizes, weights, and line heights for text hierarchy"}
                            {category.name === "Borders" && "Border radius and width values for consistent shapes"}
                            {category.name === "Shadows" && "Shadow values for depth and elevation effects"}
                          </BodySmall>
                        </div>
                      ))}
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
                        <BodySmall>✓ Use semantic naming conventions</BodySmall>
                        <BodySmall>✓ Maintain a clear token hierarchy</BodySmall>
                        <BodySmall>✓ Document token usage and purpose</BodySmall>
                        <BodySmall>✓ Version control your tokens</BodySmall>
                        <BodySmall>✓ Test tokens across different contexts</BodySmall>
                        <BodySmall>✓ Keep tokens simple and reusable</BodySmall>
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
                        <BodySmall>✗ Hard-coding values in components</BodySmall>
                        <BodySmall>✗ Inconsistent naming patterns</BodySmall>
                        <BodySmall>✗ Too many similar tokens</BodySmall>
                        <BodySmall>✗ Platform-specific tokens</BodySmall>
                        <BodySmall>✗ Unclear token relationships</BodySmall>
                        <BodySmall>✗ Ignoring token documentation</BodySmall>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ResponsiveTabsContent>

              {/* Colors Tab */}
              <ResponsiveTabsContent value="colors" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Color Token System</CardTitle>
                    <CardDescription>
                      Comprehensive color tokens for consistent theming and semantic color usage.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {colorTokens.map((category) => (
                      <div key={category.category}>
                        <H3 className="mb-4">{category.category}</H3>
                        <div className="grid gap-4">
                          {category.tokens.map((token) => (
                            <div key={token.name} className="flex items-center space-x-4 p-4 border rounded-lg">
                              <div 
                                className="w-16 h-16 rounded-lg border"
                                style={{ backgroundColor: getTokenValue(token.name) }}
                              ></div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <H4 className="font-mono">{token.name}</H4>
                                  <Badge variant="secondary">Color Token</Badge>
                                </div>
                                <BodySmall className="text-muted-foreground mb-2">
                                  {token.description}
                                </BodySmall>
                                <div className="flex items-center space-x-4">
                                  <BodySmall className="font-medium">Usage:</BodySmall>
                                  <BodySmall className="text-muted-foreground">{token.usage}</BodySmall>
                                </div>
                              </div>
                              <div className="text-right">
                                <BodySmall className="font-mono text-muted-foreground">
                                  {token.value}
                                </BodySmall>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Spacing Tab */}
              <ResponsiveTabsContent value="spacing" className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <Icon name="ruler-line" className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <CardTitle>Spacing Token System</CardTitle>
                        <CardDescription>
                          Consistent spacing values for margins, padding, and gaps throughout your application.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {spacingTokens.map((category) => (
                      <div key={category.category}>
                        <H3 className="mb-4">{category.category}</H3>
                        <div className="grid gap-4">
                          {category.tokens.map((token) => (
                            <div key={token.name} className="flex items-center space-x-4 p-4 border rounded-lg">
                              <div className="flex items-center space-x-2">
                                <div 
                                  className="bg-primary rounded"
                                  style={{ width: token.value, height: token.value }}
                                ></div>
                                <BodySmall className="font-mono">{token.value}</BodySmall>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <H4 className="font-mono">{token.name}</H4>
                                  <Badge variant="secondary">Spacing Token</Badge>
                                </div>
                                <BodySmall className="text-muted-foreground mb-2">
                                  {token.description}
                                </BodySmall>
                                <div className="flex items-center space-x-4">
                                  <BodySmall className="font-medium">Usage:</BodySmall>
                                  <BodySmall className="text-muted-foreground">{token.usage}</BodySmall>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Typography Tab */}
              <ResponsiveTabsContent value="typography" className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Icon name="text" className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <CardTitle>Typography Token System</CardTitle>
                        <CardDescription>
                          Typography tokens for consistent text styling and hierarchy.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {typographyTokens.map((category) => (
                      <div key={category.category}>
                        <H3 className="mb-4">{category.category}</H3>
                        <div className="grid gap-4">
                          {category.tokens.map((token) => (
                            <div key={token.name} className="p-4 border rounded-lg">
                              <div className="flex items-center space-x-3 mb-3">
                                <H4 className="font-mono">{token.name}</H4>
                                <Badge variant="secondary">Typography Token</Badge>
                                <BodySmall className="font-mono text-muted-foreground">
                                  {token.value}
                                </BodySmall>
                              </div>
                              <BodySmall className="text-muted-foreground mb-3">
                                {token.description}
                              </BodySmall>
                              <div className="flex items-center space-x-4">
                                <BodySmall className="font-medium">Usage:</BodySmall>
                                <BodySmall className="text-muted-foreground">{token.usage}</BodySmall>
                              </div>
                              {token.name.startsWith('text-') && (
                                <div className="mt-3 p-3 bg-muted rounded">
                                  <div className={token.name}>Sample text with {token.name}</div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Implementation Tab */}
              <ResponsiveTabsContent value="implementation" className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Icon name="code-line" className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <CardTitle>CSS Custom Properties</CardTitle>
                        <CardDescription>
                          How to define and use design tokens with CSS custom properties.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">/* Define design tokens as CSS custom properties */</div>
                      <div>:root &#123;</div>
                      <div>  /* Color tokens */</div>
                      <div>  --primary: 222.2 84% 4.9%;</div>
                      <div>  --primary-foreground: 210 40% 98%;</div>
                      <div>  --background: 0 0% 100%;</div>
                      <div>  --foreground: 222.2 84% 4.9%;</div>
                      <div></div>
                      <div>  /* Spacing tokens */</div>
                      <div>  --spacing-1: 0.25rem;</div>
                      <div>  --spacing-2: 0.5rem;</div>
                      <div>  --spacing-4: 1rem;</div>
                      <div>  --spacing-6: 1.5rem;</div>
                      <div></div>
                      <div>  /* Typography tokens */</div>
                      <div>  --font-size-sm: 0.875rem;</div>
                      <div>  --font-size-base: 1rem;</div>
                      <div>  --font-size-lg: 1.125rem;</div>
                      <div>  --font-weight-medium: 500;</div>
                      <div>  --font-weight-bold: 700;</div>
                      <div>&#125;</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <Icon name="settings-line" className="h-5 w-5 text-cyan-500" />
                      </div>
                      <div>
                        <CardTitle>Tailwind CSS Configuration</CardTitle>
                        <CardDescription>
                          How to integrate design tokens with Tailwind CSS.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">// tailwind.config.js</div>
                      <div>module.exports = &#123;</div>
                      <div>  theme: &#123;</div>
                      <div>    extend: &#123;</div>
                      <div>      colors: &#123;</div>
                      <div>        primary: &#123;</div>
                      <div>          DEFAULT: &apos;hsl(var(--primary))&apos;,</div>
                      <div>          foreground: &apos;hsl(var(--primary-foreground))&apos;,</div>
                      <div>        &#125;,</div>
                      <div>        background: &apos;hsl(var(--background))&apos;,</div>
                      <div>        foreground: &apos;hsl(var(--foreground))&apos;,</div>
                      <div>      &#125;,</div>
                      <div>      spacing: &#123;</div>
                      <div>        &apos;1&apos;: &apos;var(--spacing-1)&apos;,</div>
                      <div>        &apos;2&apos;: &apos;var(--spacing-2)&apos;,</div>
                      <div>        &apos;4&apos;: &apos;var(--spacing-4)&apos;,</div>
                      <div>        &apos;6&apos;: &apos;var(--spacing-6)&apos;,</div>
                      <div>      &#125;,</div>
                      <div>      fontSize: &#123;</div>
                      <div>        sm: &apos;var(--font-size-sm)&apos;,</div>
                      <div>        base: &apos;var(--font-size-base)&apos;,</div>
                      <div>        lg: &apos;var(--font-size-lg)&apos;,</div>
                      <div>      &#125;,</div>
                      <div>    &#125;,</div>
                      <div>  &#125;,</div>
                      <div>&#125;</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <Icon name="reactjs-line" className="h-5 w-5 text-indigo-500" />
                      </div>
                      <div>
                        <CardTitle>React Component Usage</CardTitle>
                        <CardDescription>
                          How to use design tokens in React components.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">&#123;/* Using design tokens in components */&#125;</div>
                      <div>function Button(&#123; children, variant = &apos;primary&apos; &#125;) &#123;</div>
                      <div>  const baseClasses = [</div>
                      <div>    &apos;px-4 py-2 rounded font-medium transition-colors&apos;,</div>
                      <div>    &apos;focus:outline-none focus:ring-2 focus:ring-offset-2&apos;</div>
                      <div>  ]</div>
                      <div></div>
                      <div>  const variantClasses = &#123;</div>
                      <div>    primary: &apos;bg-primary text-primary-foreground hover:bg-primary/90&apos;,</div>
                      <div>    secondary: &apos;bg-muted text-muted-foreground hover:bg-muted/80&apos;,</div>
                      <div>    destructive: &apos;bg-destructive text-destructive-foreground hover:bg-destructive/90&apos;</div>
                      <div>  &#125;</div>
                      <div></div>
                      <div>  return (</div>
                      <div>    &lt;button className=&#123;cn(baseClasses, variantClasses[variant])&#125;&gt;</div>
                      <div>      &#123;children&#125;</div>
                      <div>    &lt;/button&gt;</div>
                      <div>  )</div>
                      <div>&#125;</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Token Management Tools</CardTitle>
                    <CardDescription>
                      Tools and workflows for managing design tokens effectively.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <H4 className="mb-3">Design Tools</H4>
                        <div className="space-y-2">
                          <BodySmall>• Figma Tokens plugin</BodySmall>
                          <BodySmall>• Sketch with Tokens plugin</BodySmall>
                          <BodySmall>• Adobe XD with design tokens</BodySmall>
                          <BodySmall>• InVision Design System Manager</BodySmall>
                        </div>
                      </div>
                      <div>
                        <H4 className="mb-3">Development Tools</H4>
                        <div className="space-y-2">
                          <BodySmall>• Style Dictionary</BodySmall>
                          <BodySmall>• Theo (Salesforce)</BodySmall>
                          <BodySmall>• Design Tokens Studio</BodySmall>
                          <BodySmall>• Custom token generators</BodySmall>
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
