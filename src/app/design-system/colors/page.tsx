"use client"

import { useTheme } from "next-themes"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

import {
  semanticColors,
  colorPalettes,
  colorUsage,
  colorPrinciples
} from "@/lib/colors-config"

export default function ColorsPage() {
  const { theme, resolvedTheme } = useTheme()
  
  // Use resolvedTheme for more reliable theme detection
  const currentTheme = resolvedTheme || theme

  // Color combination examples following Material 3 principles
  const colorCombinations = [
    {
      name: "Primary Surface",
      description: "Primary color with appropriate surface and text colors",
      background: currentTheme === 'dark' ? '#052864' : '#f5f9ff',
      surface: currentTheme === 'dark' ? '#0a49bd' : '#e0efff',
      text: currentTheme === 'dark' ? '#e0efff' : '#052864',
      accent: '#0e62fd'
    },
    {
      name: "Secondary Surface",
      description: "Secondary color with complementary surface colors",
      background: currentTheme === 'dark' ? '#2e2362' : '#f8f7fe',
      surface: currentTheme === 'dark' ? '#5742b7' : '#f1eefe',
      text: currentTheme === 'dark' ? '#f1eefe' : '#2e2362',
      accent: '#7458f4'
    },
    {
      name: "Success Surface",
      description: "Success color with appropriate surface treatment",
      background: currentTheme === 'dark' ? '#064b26' : '#f6fdf9',
      surface: currentTheme === 'dark' ? '#0d9147' : '#e3faee',
      text: currentTheme === 'dark' ? '#baf2d5' : '#064b26',
      accent: '#12c55d'
    },
    {
      name: "Error Surface",
      description: "Error color with appropriate surface treatment",
      background: currentTheme === 'dark' ? '#59150e' : '#fdf5f4',
      surface: currentTheme === 'dark' ? '#a7281a' : '#fcebe9',
      text: currentTheme === 'dark' ? '#f7ccc8' : '#59150e',
      accent: '#df3523'
    }
  ]

  // Accessibility contrast examples
  const contrastExamples = [
    {
      name: "High Contrast",
      description: "WCAG AAA compliant (7:1 ratio)",
      background: currentTheme === 'dark' ? '#18181b' : '#ffffff',
      text: currentTheme === 'dark' ? '#fafafa' : '#09090b',
      ratio: "21:1"
    },
    {
      name: "Medium Contrast",
      description: "WCAG AA compliant (4.5:1 ratio)",
      background: currentTheme === 'dark' ? '#27272a' : '#f4f4f5',
      text: currentTheme === 'dark' ? '#fafafa' : '#18181b',
      ratio: "12:1"
    },
    {
      name: "Low Contrast",
      description: "Not recommended for body text",
      background: currentTheme === 'dark' ? '#3f3f46' : '#e4e4e7',
      text: currentTheme === 'dark' ? '#a1a1aa' : '#71717a',
      ratio: "2.5:1"
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
            title="Colors"
            description="Our comprehensive color system following Material 3 principles with semantic tokens, custom color ramps, and accessibility guidelines."
            size="lg"
            centered
          />
        </Section>
        
        {/* Color Principles */}
        <Section paddingY="lg">
          <PageHeader
            title="Color Principles"
            description="Core principles that guide our color usage"
            size="md"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {Object.entries(colorPrinciples).map(([key, principle]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary text-sm font-bold">{principle.title.charAt(0)}</span>
                    </div>
                    {principle.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* Semantic Colors */}
        <Section paddingY="lg">
          <PageHeader
            title="Semantic Colors"
            description="Colors used throughout the interface for consistent theming"
            size="md"
          />
          <Tabs defaultValue="ui" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ui">UI Colors</TabsTrigger>
              <TabsTrigger value="utility">Utility Colors</TabsTrigger>
              <TabsTrigger value="system">System Colors</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ui" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Core UI Colors</CardTitle>
                    <CardDescription>Primary interface colors</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {semanticColors.slice(0, 4).map((color) => (
                      <div key={color.class} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{color.name}</span>
                          <Badge variant="outline">{color.class}</Badge>
                        </div>
                        <div className={`h-12 rounded-md border ${color.class}`}></div>
                        <p className="text-xs text-muted-foreground">{color.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Secondary UI Colors</CardTitle>
                    <CardDescription>Supporting interface colors</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {semanticColors.slice(4, 8).map((color) => (
                      <div key={color.class} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{color.name}</span>
                          <Badge variant="outline">{color.class}</Badge>
                        </div>
                        <div className={`h-12 rounded-md border ${color.class}`}></div>
                        <p className="text-xs text-muted-foreground">{color.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="utility" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Colors</CardTitle>
                    <CardDescription>Colors for interactive states</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {semanticColors.slice(8, 12).map((color) => (
                      <div key={color.class} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{color.name}</span>
                          <Badge variant="outline">{color.class}</Badge>
                        </div>
                        <div className={`h-12 rounded-md border ${color.class}`}></div>
                        <p className="text-xs text-muted-foreground">{color.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Structural Colors</CardTitle>
                    <CardDescription>Colors for borders and structure</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {semanticColors.slice(12).map((color) => (
                      <div key={color.class} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{color.name}</span>
                          <Badge variant="outline">{color.class}</Badge>
                        </div>
                        <div className={`h-12 rounded-md border ${color.class}`}></div>
                        <p className="text-xs text-muted-foreground">{color.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="system" className="mt-6">
              <Alert>
                <AlertDescription>
                  System colors automatically adapt to the user's system preferences and accessibility settings.
                  They provide the foundation for our semantic color system and ensure compatibility across different platforms.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
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

        {/* Color Combinations */}
        <Section paddingY="lg">
          <PageHeader
            title="Color Combinations"
            description="Material 3 inspired color combinations for surfaces and content"
            size="md"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {colorCombinations.map((combination, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{combination.name}</CardTitle>
                  <CardDescription>{combination.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div 
                    className="p-6 rounded-lg border"
                    style={{ backgroundColor: combination.background }}
                  >
                    <div 
                      className="p-4 rounded-md mb-3"
                      style={{ backgroundColor: combination.surface }}
                    >
                      <div 
                        className="text-sm font-medium mb-2"
                        style={{ color: combination.text }}
                      >
                        Surface Content
                      </div>
                      <div 
                        className="text-xs"
                        style={{ color: combination.text }}
                      >
                        This is how content appears on the surface
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div 
                        className="px-3 py-1 rounded text-xs font-medium"
                        style={{ 
                          backgroundColor: combination.accent,
                          color: '#ffffff'
                        }}
                      >
                        Accent
                      </div>
                      <div 
                        className="px-3 py-1 rounded text-xs font-medium border"
                        style={{ 
                          borderColor: combination.accent,
                          color: combination.accent
                        }}
                      >
                        Outline
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* Accessibility Guidelines */}
        <Section paddingY="lg">
          <PageHeader
            title="Accessibility Guidelines"
            description="WCAG compliant contrast ratios and accessibility best practices"
            size="md"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Contrast Ratios</CardTitle>
                <CardDescription>WCAG compliance levels for text readability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contrastExamples.map((example, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{example.name}</span>
                      <Badge variant="outline">{example.ratio}</Badge>
                    </div>
                    <div 
                      className="p-4 rounded-md border"
                      style={{ backgroundColor: example.background }}
                    >
                      <div 
                        className="text-sm"
                        style={{ color: example.text }}
                      >
                        {example.description}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Color Blindness Considerations</CardTitle>
                <CardDescription>Ensuring accessibility for color vision deficiencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-green-500"></div>
                    <div className="w-4 h-4 rounded bg-red-500"></div>
                    <span className="text-sm">Success/Error indicators</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-blue-500"></div>
                    <div className="w-4 h-4 rounded bg-purple-500"></div>
                    <span className="text-sm">Primary/Secondary actions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-yellow-500"></div>
                    <div className="w-4 h-4 rounded bg-orange-500"></div>
                    <span className="text-sm">Warning/Attention states</span>
                  </div>
                </div>
                <Alert>
                  <AlertDescription>
                    Always provide additional visual cues (icons, patterns, text) beyond color alone to ensure accessibility.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Color Usage Examples */}
        <Section paddingY="lg">
          <PageHeader
            title="Color Usage Examples"
            description="How to use our color palette in different contexts"
            size="md"
          />
          <Tabs defaultValue="interactive" className="mt-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="interactive">Interactive</TabsTrigger>
              <TabsTrigger value="surfaces">Surfaces</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="data">Data & Charts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="interactive" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <CardTitle>Form Elements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 border rounded-md bg-input">
                        <div className="text-sm font-medium">Input Field</div>
                        <div className="text-xs text-muted-foreground">Normal state</div>
                      </div>
                      <div className="p-3 border-2 rounded-md bg-input" style={{ borderColor: '#0e62fd' }}>
                        <div className="text-sm font-medium">Input Field</div>
                        <div className="text-xs text-muted-foreground">Focused state</div>
                      </div>
                      <div className="p-3 border rounded-md bg-muted opacity-50">
                        <div className="text-sm font-medium text-muted-foreground">Input Field</div>
                        <div className="text-xs text-muted-foreground">Disabled state</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="surfaces" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

                <Card>
                  <CardHeader>
                    <CardTitle>Elevation & Depth</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-background border shadow-sm">
                        <div className="text-sm font-medium">Level 1</div>
                        <div className="text-xs text-muted-foreground">Subtle elevation</div>
                      </div>
                      <div className="p-4 rounded-lg bg-background border shadow-md">
                        <div className="text-sm font-medium">Level 2</div>
                        <div className="text-xs text-muted-foreground">Medium elevation</div>
                      </div>
                      <div className="p-4 rounded-lg bg-background border shadow-lg">
                        <div className="text-sm font-medium">Level 3</div>
                        <div className="text-xs text-muted-foreground">High elevation</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="typography" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Text Hierarchy</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h1 className="text-2xl font-bold text-foreground">Primary Heading</h1>
                        <p className="text-sm text-muted-foreground">Uses foreground color for maximum contrast</p>
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-foreground">Secondary Heading</h2>
                        <p className="text-sm text-muted-foreground">Also uses foreground color</p>
                      </div>
                      <div>
                        <p className="text-base text-foreground">Body text uses foreground color for readability</p>
                        <p className="text-sm text-muted-foreground">Secondary text uses muted foreground for hierarchy</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Text</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <a href="#" className="text-primary hover:underline">Primary Link</a>
                        <p className="text-xs text-muted-foreground">Uses primary brand color</p>
                      </div>
                      <div>
                        <span className="text-destructive">Error Text</span>
                        <p className="text-xs text-muted-foreground">Uses destructive color for errors</p>
                      </div>
                      <div>
                        <span className="text-green-600 dark:text-green-400">Success Text</span>
                        <p className="text-xs text-muted-foreground">Uses green for success states</p>
                      </div>
                      <div>
                        <span className="text-yellow-600 dark:text-yellow-400">Warning Text</span>
                        <p className="text-xs text-muted-foreground">Uses yellow for warnings</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="data" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Visualization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0e62fd' }}></div>
                        <span className="text-sm">Primary Data</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#7458f4' }}></div>
                        <span className="text-sm">Secondary Data</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#12c55d' }}></div>
                        <span className="text-sm">Positive Data</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#df3523' }}></div>
                        <span className="text-sm">Negative Data</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Status Indicators</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm">Online</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">Away</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-sm">Offline</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                        <span className="text-sm">Unknown</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </Section>



      </Container>
    </AppShell>
    </PageWrapper>
  )
}
