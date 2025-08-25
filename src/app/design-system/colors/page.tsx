"use client"

import { useTheme } from "next-themes"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Grid } from "@/components/ui/layout/grid"
import { PageHeader } from "@/components/ui/marketing/page-header"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"

import {
  semanticColors,
  colorPalettes
} from "@/lib/colors-config"

export default function ColorsPage() {
  const { theme, resolvedTheme } = useTheme()
  
  // Use resolvedTheme for more reliable theme detection
  const currentTheme = resolvedTheme || theme

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
    >
      <Container>
        <Section paddingY="xl">
          <PageHeader
            title="Colors"
            description="Our comprehensive color system with semantic tokens and custom color ramps."
            size="lg"
            centered
          />
        </Section>
        
        {/* Semantic Colors */}
        <Section paddingY="lg">
          <PageHeader
            title="Semantic Colors"
            description="Colors used throughout the interface for consistent theming"
            size="md"
          />
          <Grid cols={2} gap={6} className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>UI Colors</CardTitle>
                <CardDescription>Core interface colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {semanticColors.slice(0, 4).map((color) => (
                  <div key={color.class} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{color.name}</span>
                      <Badge variant="outline">{color.class}</Badge>
                    </div>
                    <div className={`h-12 rounded-md border ${color.class}`}></div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Utility Colors</CardTitle>
                <CardDescription>Colors for borders, inputs, and states</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {semanticColors.slice(4, 8).map((color) => (
                  <div key={color.class} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{color.name}</span>
                      <Badge variant="outline">{color.class}</Badge>
                    </div>
                    <div className={`h-12 rounded-md border ${color.class}`}></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Section>

        {/* Custom Color Palette */}
        <Section paddingY="lg">
          <PageHeader
            title="Custom Color Palette"
            description="Our custom color ramps with 500 as the base color for each palette"
            size="md"
          />
          
          {/* Primary Brand Color */}
          {colorPalettes.filter(palette => palette.isPrimary).map((palette) => (
            <Card key={palette.color} className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: palette.hex }}></div>
                  {palette.name}
                  <Badge variant="secondary">Primary Brand</Badge>
                </CardTitle>
                <CardDescription>{palette.description} - {palette.hex}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-10 gap-2">
                  {palette.shades.map(({ shade, hex }) => (
                    <div key={shade} className="space-y-2">
                      <div className="text-xs text-center font-mono text-muted-foreground">
                        {shade}
                      </div>
                      <div 
                        className="h-16 rounded-md border"
                        style={{ backgroundColor: hex }}
                      ></div>
                      <div className="text-xs text-center font-mono text-muted-foreground">
                        {shade === 500 ? hex : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Other Color Palettes */}
          <div className="space-y-6">
            {colorPalettes.filter(palette => !palette.isPrimary).map((palette) => (
              <Card key={palette.color}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: palette.hex }}
                    ></div>
                    {palette.name}
                  </CardTitle>
                  <CardDescription>{palette.description} - {palette.hex}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-10 gap-1">
                    {palette.shades.map(({ shade, hex }) => (
                      <div key={shade} className="space-y-1">
                        <div className="text-xs text-center font-mono text-muted-foreground">
                          {shade}
                        </div>
                        <div 
                          className="h-12 rounded border"
                          style={{ backgroundColor: hex }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* Color Usage Examples */}
        <Section paddingY="lg">
          <PageHeader
            title="Color Usage Examples"
            description="How to use our color palette in different contexts"
            size="md"
          />
          <Grid cols={2} gap={6} className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Buttons & Interactive Elements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button className="bg-primary hover:opacity-90">Primary</Button>
                  <Button 
                    variant="outline" 
                    style={{ 
                      borderColor: '#7458f4', 
                      color: currentTheme === 'dark' ? '#9e8af7' : '#5742b7' 
                    }} 
                    className="hover:bg-periwinkle-50 dark:hover:bg-periwinkle-950/20"
                  >
                    Periwinkle
                  </Button>
                  <Button 
                    variant="outline" 
                    style={{ 
                      borderColor: '#12c55d', 
                      color: currentTheme === 'dark' ? '#48db88' : '#0d9147' 
                    }} 
                    className="hover:bg-green-50 dark:hover:bg-green-950/20"
                  >
                    Green
                  </Button>
                  <Button 
                    variant="outline" 
                    style={{ 
                      borderColor: '#ebbc48', 
                      color: currentTheme === 'dark' ? '#f1d07f' : '#b38f38' 
                    }} 
                    className="hover:bg-gold-50 dark:hover:bg-gold-950/20"
                  >
                    Gold
                  </Button>
                  <Button 
                    variant="outline" 
                    style={{ 
                      borderColor: '#e433c3', 
                      color: currentTheme === 'dark' ? '#ec70d4' : '#aa2691' 
                    }} 
                    className="hover:bg-magenta-50 dark:hover:bg-magenta-950/20"
                  >
                    Magenta
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge style={{ backgroundColor: '#df3523' }}>Error</Badge>
                  <Badge style={{ backgroundColor: '#5bc8f7' }}>Info</Badge>
                  <Badge style={{ backgroundColor: '#fbbf24' }}>Warning</Badge>
                  <Badge style={{ backgroundColor: currentTheme === 'dark' ? '#48db88' : '#12c55d' }}>Success</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Background & Surface Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className="p-4 rounded-lg border"
                    style={{ 
                      backgroundColor: currentTheme === 'dark' ? '#052864' : '#f5f9ff',
                      borderColor: currentTheme === 'dark' ? '#0a49bd' : '#badbff'
                    }}
                  >
                    <div 
                      className="text-sm font-medium"
                      style={{ color: currentTheme === 'dark' ? '#e0efff' : '#052864' }}
                    >
                      {currentTheme === 'dark' ? 'Elevation 900' : 'Elevation 50'}
                    </div>
                    <div 
                      className="text-xs"
                      style={{ color: currentTheme === 'dark' ? '#94c6ff' : '#0a49bd' }}
                    >
                      {currentTheme === 'dark' ? 'Dark background' : 'Light background'}
                    </div>
                  </div>
                  <div 
                    className="p-4 rounded-lg border"
                    style={{ 
                      backgroundColor: currentTheme === 'dark' ? '#2e2362' : '#f8f7fe',
                      borderColor: currentTheme === 'dark' ? '#5742b7' : '#dcd5fc'
                    }}
                  >
                    <div 
                      className="text-sm font-medium"
                      style={{ color: currentTheme === 'dark' ? '#f1eefe' : '#2e2362' }}
                    >
                      {currentTheme === 'dark' ? 'Periwinkle 900' : 'Periwinkle 50'}
                    </div>
                    <div 
                      className="text-xs"
                      style={{ color: currentTheme === 'dark' ? '#c7bcfb' : '#5742b7' }}
                    >
                      {currentTheme === 'dark' ? 'Dark background' : 'Light background'}
                    </div>
                  </div>
                </div>
                <div 
                  className="p-4 rounded-lg text-white"
                  style={{ 
                    background: currentTheme === 'dark' 
                      ? 'linear-gradient(to right, #479cff, #9e8af7)'
                      : 'linear-gradient(to right, #0e62fd, #7458f4)'
                  }}
                >
                  <div className="text-sm font-medium">Gradient Example</div>
                  <div className="text-xs opacity-90">Elevation to Periwinkle</div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Section>


      </Container>
    </AppShell>
    </PageWrapper>
  )
}
