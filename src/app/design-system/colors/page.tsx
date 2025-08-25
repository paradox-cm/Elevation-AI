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
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Background</span>
                    <Badge variant="outline">bg-background</Badge>
                  </div>
                  <div className="h-12 rounded-md bg-background border"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Foreground</span>
                    <Badge variant="outline">text-foreground</Badge>
                  </div>
                  <div className="h-12 rounded-md bg-foreground border"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Primary</span>
                    <Badge variant="outline">bg-primary</Badge>
                  </div>
                  <div className="h-12 rounded-md bg-primary border"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Secondary</span>
                    <Badge variant="outline">bg-secondary</Badge>
                  </div>
                  <div className="h-12 rounded-md bg-secondary border"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Utility Colors</CardTitle>
                <CardDescription>Colors for borders, inputs, and states</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Muted</span>
                    <Badge variant="outline">bg-muted</Badge>
                  </div>
                  <div className="h-12 rounded-md bg-muted border"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Accent</span>
                    <Badge variant="outline">bg-accent</Badge>
                  </div>
                  <div className="h-12 rounded-md bg-accent border"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Destructive</span>
                    <Badge variant="outline">bg-destructive</Badge>
                  </div>
                  <div className="h-12 rounded-md bg-destructive border"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Border</span>
                    <Badge variant="outline">border-border</Badge>
                  </div>
                  <div className="h-12 rounded-md border border-border"></div>
                </div>
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
          
          {/* Elevation (Primary Brand Color) */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#0e62fd' }}></div>
                Elevation
                <Badge variant="secondary">Primary Brand</Badge>
              </CardTitle>
              <CardDescription>Primary brand color - #0e62fd</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-10 gap-2">
                {[
                  { shade: 50, hex: '#f5f9ff' },
                  { shade: 100, hex: '#e0efff' },
                  { shade: 200, hex: '#badbff' },
                  { shade: 300, hex: '#94c6ff' },
                  { shade: 400, hex: '#479cff' },
                  { shade: 500, hex: '#0e62fd' },
                  { shade: 600, hex: '#0d58e4' },
                  { shade: 700, hex: '#0a49bd' },
                  { shade: 800, hex: '#083996' },
                  { shade: 900, hex: '#052864' },
                ].map(({ shade, hex }) => (
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

          {/* Other Color Palettes */}
          <div className="space-y-6">
            {[
              { 
                name: 'Periwinkle', 
                color: 'periwinkle', 
                hex: '#7458f4',
                shades: [
                  { shade: 50, hex: '#f8f7fe' },
                  { shade: 100, hex: '#f1eefe' },
                  { shade: 200, hex: '#dcd5fc' },
                  { shade: 300, hex: '#c7bcfb' },
                  { shade: 400, hex: '#9e8af7' },
                  { shade: 500, hex: '#7458f4' },
                  { shade: 600, hex: '#684fdc' },
                  { shade: 700, hex: '#5742b7' },
                  { shade: 800, hex: '#463592' },
                  { shade: 900, hex: '#2e2362' },
                ]
              },
              { 
                name: 'Green', 
                color: 'green', 
                hex: '#12c55d',
                shades: [
                  { shade: 50, hex: '#f6fdf9' },
                  { shade: 100, hex: '#e3faee' },
                  { shade: 200, hex: '#baf2d5' },
                  { shade: 300, hex: '#91eabb' },
                  { shade: 400, hex: '#48db88' },
                  { shade: 500, hex: '#12c55d' },
                  { shade: 600, hex: '#10b055' },
                  { shade: 700, hex: '#0d9147' },
                  { shade: 800, hex: '#0a7239' },
                  { shade: 900, hex: '#064b26' },
                ]
              },
              { 
                name: 'Red', 
                color: 'red', 
                hex: '#df3523',
                shades: [
                  { shade: 50, hex: '#fdf5f4' },
                  { shade: 100, hex: '#fcebe9' },
                  { shade: 200, hex: '#f7ccc8' },
                  { shade: 300, hex: '#f2aea7' },
                  { shade: 400, hex: '#e97265' },
                  { shade: 500, hex: '#df3523' },
                  { shade: 600, hex: '#c93020' },
                  { shade: 700, hex: '#a7281a' },
                  { shade: 800, hex: '#862015' },
                  { shade: 900, hex: '#59150e' },
                ]
              },
              { 
                name: 'Gold', 
                color: 'gold', 
                hex: '#ebbc48',
                shades: [
                  { shade: 50, hex: '#fefcf6' },
                  { shade: 100, hex: '#fdf8ed' },
                  { shade: 200, hex: '#faeed1' },
                  { shade: 300, hex: '#f7e4b6' },
                  { shade: 400, hex: '#f1d07f' },
                  { shade: 500, hex: '#ebbc48' },
                  { shade: 600, hex: '#d3a943' },
                  { shade: 700, hex: '#b38f38' },
                  { shade: 800, hex: '#92752e' },
                  { shade: 900, hex: '#604e1f' },
                ]
              },
              { 
                name: 'Magenta', 
                color: 'magenta', 
                hex: '#e433c3',
                shades: [
                  { shade: 50, hex: '#fef6fb' },
                  { shade: 100, hex: '#fceaf6' },
                  { shade: 200, hex: '#f8ccee' },
                  { shade: 300, hex: '#f4ade5' },
                  { shade: 400, hex: '#ec70d4' },
                  { shade: 500, hex: '#e433c3' },
                  { shade: 600, hex: '#cd2eaf' },
                  { shade: 700, hex: '#aa2691' },
                  { shade: 800, hex: '#861f73' },
                  { shade: 900, hex: '#59144d' },
                ]
              },
              { 
                name: 'Cyan', 
                color: 'cyan', 
                hex: '#5bc8f7',
                shades: [
                  { shade: 50, hex: '#f7fcff' },
                  { shade: 100, hex: '#effafe' },
                  { shade: 200, hex: '#d6f1fd' },
                  { shade: 300, hex: '#bde9fc' },
                  { shade: 400, hex: '#8cd8f9' },
                  { shade: 500, hex: '#5bc8f7' },
                  { shade: 600, hex: '#52b4de' },
                  { shade: 700, hex: '#4496b9' },
                  { shade: 800, hex: '#377894' },
                  { shade: 900, hex: '#245063' },
                ]
              },
              { 
                name: 'Zinc', 
                color: 'zinc', 
                hex: '#71717a',
                shades: [
                  { shade: 50, hex: '#fafafa' },
                  { shade: 100, hex: '#f4f4f5' },
                  { shade: 200, hex: '#e4e4e7' },
                  { shade: 300, hex: '#d4d4d8' },
                  { shade: 400, hex: '#a1a1aa' },
                  { shade: 500, hex: '#71717a' },
                  { shade: 600, hex: '#52525b' },
                  { shade: 700, hex: '#3f3f46' },
                  { shade: 800, hex: '#27272a' },
                  { shade: 900, hex: '#18181b' },
                ]
              },
            ].map(({ name, color, hex, shades }) => (
              <Card key={color}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: hex }}
                    ></div>
                    {name}
                  </CardTitle>
                  <CardDescription>Base color: {hex}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-10 gap-1">
                    {shades.map(({ shade, hex: shadeHex }) => (
                      <div key={shade} className="space-y-1">
                        <div className="text-xs text-center font-mono text-muted-foreground">
                          {shade}
                        </div>
                        <div 
                          className="h-12 rounded border"
                          style={{ backgroundColor: shadeHex }}
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
