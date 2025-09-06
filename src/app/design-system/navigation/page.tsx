"use client"



import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { GlobalHeader } from "@/components/ui/global-header"
import { MainHeader } from "@/components/ui/main-header"
import { Navigation } from "@/components/ui/navigation"
import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import Icon from "@/components/ui/icon"
import { BodyLarge, BodySmall } from "@/components/ui/typography"
import Link from "next/link"

// Static versions of navigation components for examples (no sticky positioning)
function StaticMainHeader() {
  return (
    <header className="w-full border-b border-border dark:border-muted bg-background/40 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/20 transition-colors duration-300" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
      <div className="w-full px-4 sm:px-4 md:px-6 lg:px-8 flex h-14 sm:h-18 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo width={114} height={21} className="lg:w-[127px] lg:h-[23px]" />
          </Link>
        </div>
        <nav className="hidden xl:flex items-center space-x-4">
          {/* Platform Dropdown */}
          <div className="relative group">
            <button className="text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-muted/50 px-3 py-2 rounded-md flex items-center gap-1">
              Platform
              <Icon name="arrow-down-s-line" className="h-4 w-4" />
            </button>
            {/* Dropdown menu for Platform */}
            <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2 space-y-1">
                <Link href="/platform" className="block text-sm hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
                  Overview
                </Link>
                <Link href="/platform/features" className="block text-sm hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
                  Features
                </Link>
                <Link href="/platform/security" className="block text-sm hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
                  Security
                </Link>
                <Link href="/platform/integrations" className="block text-sm hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
                  Integrations
                </Link>
              </div>
            </div>
          </div>
          <div className="relative group">
            <button className="text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-muted/50 px-3 py-2 rounded-md flex items-center gap-1">
              People
              <Icon name="arrow-down-s-line" className="h-4 w-4" />
            </button>
            {/* Dropdown menu for People */}
            <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2 space-y-1">
                <Link href="/wireframes/people/concierge-team" className="block text-sm hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
                  Concierge Team
                </Link>
                <Link href="/wireframes/people/expert-network" className="block text-sm hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
                  Expert Network
                </Link>
              </div>
            </div>
          </div>
          <div className="relative group">
            <button className="text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-muted/50 px-3 py-2 rounded-md flex items-center gap-1">
              Solutions
              <Icon name="arrow-down-s-line" className="h-4 w-4" />
            </button>
            {/* Mega menu for Solutions */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[800px] bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-6 grid grid-cols-3 gap-8">
                {/* Featured Content */}
                <div className="space-y-4">
                  <div className="w-full h-32 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0">
                      <canvas 
                        className="w-full h-full"
                        ref={(canvas) => {
                          if (!canvas) return;
                          
                          const ctx = canvas.getContext('2d');
                          if (!ctx) return;
                          
                          let time = 0;
                          let animationId: number;
                          
                          function animate() {
                            if (!canvas) return;
                            const width = canvas.offsetWidth;
                            const height = canvas.offsetHeight;
                            
                            // Only animate if canvas has valid dimensions
                            if (width <= 0 || height <= 0) {
                              animationId = requestAnimationFrame(animate);
                              return;
                            }
                            
                            canvas.width = width;
                            canvas.height = height;
                            
                            if (!ctx) return;
                            ctx.clearRect(0, 0, width, height);
                            
                            const imageData = ctx.createImageData(width, height);
                            const data = imageData.data;
                            
                            for (let x = 0; x < width; x++) {
                              for (let y = 0; y < height; y++) {
                                const index = (y * width + x) * 4;
                                
                                // More intense, smaller-scale plasma for dropdown
                                const scale = 0.05;
                                const r1 = 0.3;
                                const r2 = 0.7;
                                const r3 = 0.2;
                                
                                const col = 
                                  Math.sin(Math.sqrt((x * r1 + time * 50) ** 2 + (y * r2) ** 2) * scale) +
                                  Math.sin(Math.sqrt((x * r2) ** 2 + (y * r1 + time * 30) ** 2) * scale) +
                                  Math.sin(Math.sqrt((x * r3 + time * 40) ** 2 + (y * r3 + time * 20) ** 2) * scale);
                                
                                // Use original plasma color palette
                                const r = Math.floor(128 + 127 * Math.sin(col));
                                const g = Math.floor(128 + 127 * Math.cos(col));
                                const b = Math.floor(128 + 127 * (Math.cos(col) - Math.sin(col)));
                                
                                // Add the original checkerboard pattern
                                const checkerboard = Math.floor(x / 2) % 2 === 0 ? 0 : 102;
                                const finalR = Math.min(255, r + checkerboard);
                                const finalG = Math.min(255, g + checkerboard);
                                const finalB = Math.min(255, b + checkerboard);
                                
                                data[index] = finalR;
                                data[index + 1] = finalG;
                                data[index + 2] = finalB;
                                data[index + 3] = 255;
                              }
                            }
                            
                            ctx.putImageData(imageData, 0, 0);
                            time += 0.005;
                            animationId = requestAnimationFrame(animate);
                          }
                          
                          // Start animation
                          animate();
                          
                          // Cleanup function
                          return () => {
                            if (animationId) {
                              cancelAnimationFrame(animationId);
                            }
                          };
                        }}
                      />
                    </div>
                    <div className="text-center relative z-10">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                        <img 
                          src="/images/branding/E-AI-Arrow.svg" 
                          alt="Elevation AI Arrow" 
                          className="h-6 w-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-foreground mb-2">Transform Your Business</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Tailored AI solutions driving growth, efficiency, and innovation across your organization.
                    </p>
                  </div>
                </div>

                {/* By Industry */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">By Industry</h3>
                  <ul className="space-y-3">
                    <li><Link href="/solutions/private-markets" className="text-sm hover:text-primary transition-colors">Private Market Organizations</Link></li>
                    <li><Link href="/solutions/public-markets" className="text-sm hover:text-primary transition-colors">Public Market Organizations</Link></li>
                    <li><Link href="/solutions/banks" className="text-sm hover:text-primary transition-colors">Banks</Link></li>
                    <li><Link href="/solutions/enterprise" className="text-sm hover:text-primary transition-colors">Enterprise</Link></li>
                    <li><Link href="/solutions/government" className="text-sm hover:text-primary transition-colors">Government</Link></li>
                  </ul>
                </div>
                
                {/* By Stage */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">By Stage</h3>
                  <ul className="space-y-3">
                    <li><Link href="/solutions/creating-growing" className="text-sm hover:text-primary transition-colors">Creating & Growing a New Venture</Link></li>
                    <li><Link href="/solutions/scaling" className="text-sm hover:text-primary transition-colors">Scaling a Venture</Link></li>
                    <li><Link href="/solutions/exiting" className="text-sm hover:text-primary transition-colors">Exiting a Venture</Link></li>
                    <li><Link href="/solutions/post-ipo" className="text-sm hover:text-primary transition-colors">Post-IPO Growth</Link></li>
                    <li><Link href="/solutions/family-office" className="text-sm hover:text-primary transition-colors">Post-Exit/Family Office</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-muted/50 px-3 py-2 rounded-md">
            Pricing
          </Link>
          <div className="relative group">
            <button className="text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-muted/50 px-3 py-2 rounded-md flex items-center gap-1">
              Resources
              <Icon name="arrow-down-s-line" className="h-4 w-4" />
            </button>
            {/* Dropdown menu for Resources */}
            <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-4 space-y-3">
                <Link href="/security" className="block text-sm hover:text-primary transition-colors">Security</Link>
                <Link href="/careers" className="block text-sm hover:text-primary transition-colors">Careers</Link>
                <Link href="/partners" className="block text-sm hover:text-primary transition-colors">Partners</Link>
                <Link href="/investors" className="text-sm hover:text-primary transition-colors">Investors</Link>
                <Link href="/developers" className="text-sm hover:text-primary transition-colors">For Developers & Platforms</Link>
                <Link href="/blog" className="text-sm hover:text-primary transition-colors">Blog + News</Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex items-center space-x-3">
          <div className="hidden xl:flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild className="text-xs xl:text-sm hover:bg-muted/50">
              <Link href="/website/login">
                <Icon name="login-box-line" className="h-4 w-4 mr-1" />
                Login
              </Link>
            </Button>
            <Button size="sm" asChild className="text-xs xl:text-sm hover:bg-primary/90">
              <Link href="/website/sign-up">
                Get Started
              </Link>
            </Button>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

function StaticGlobalHeader() {
  return (
    <header className="border-b border-border dark:border-muted bg-background/40 backdrop-blur-2xl flex-shrink-0">
      <div className="w-full px-4 sm:px-4 md:px-6 lg:px-8 flex h-14 sm:h-18 items-center justify-between">
        <div className="flex items-center">
          <Link href="/website/home" className="hover:opacity-80 transition-opacity">
            <Logo width={114} height={21} className="lg:w-[127px] lg:h-[23px]" />
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild className="text-xs xl:text-sm hover:bg-muted/50">
            <Link href="/website/login">
              <Icon name="login-box-line" className="h-4 w-4 mr-1" />
              Login
            </Link>
          </Button>
          <Button size="sm" asChild className="text-xs xl:text-sm hover:bg-primary/90">
              <Link href="/website/demo">
              Request a Demo
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

function StaticDesignSystemNavigation() {
  return (
    <nav className="w-full border-b border-border dark:border-muted bg-background/40 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/20" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 flex h-14 sm:h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo width={114} height={21} className="lg:w-[127px] lg:h-[23px]" />
            </Link>
            <Badge variant="secondary" className="text-xs sm:text-sm px-2 py-1">
              Design System
            </Badge>
          </div>
        </div>
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-foreground/80 px-3 py-2 rounded-md text-foreground/60 hover:bg-muted/50">
            Home
          </Link>
          <a href="/design-system" className="text-sm font-medium transition-colors hover:text-foreground/80 px-3 py-2 rounded-md text-foreground bg-muted">
            Design System
          </a>
          <a href="/website" className="text-sm font-medium transition-colors hover:text-foreground/80 px-3 py-2 rounded-md text-foreground/60 hover:bg-muted/50">
            Website
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

function StaticNavigation() {
  return (
    <nav className="w-full border-b border-border dark:border-muted bg-background/40 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/20" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 flex h-14 sm:h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo width={114} height={21} className="lg:w-[127px] lg:h-[23px]" />
            </Link>
            <Badge variant="secondary" className="text-xs sm:text-sm px-2 py-1">
              Design System
            </Badge>
          </div>
        </div>
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-foreground/80 px-3 py-2 rounded-md text-foreground/60 hover:bg-muted/50">
            Home
          </Link>
          <a href="/design-system" className="text-sm font-medium transition-colors hover:text-foreground/80 px-3 py-2 rounded-md text-foreground bg-muted">
            Design System
          </a>
          <a href="/website" className="text-sm font-medium transition-colors hover:text-foreground/80 px-3 py-2 rounded-md text-foreground/60 hover:bg-muted/50">
            Website
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default function NavigationPage() {
  const navigationComponents = [
    {
      name: "MainHeader",
      description: "Main site navigation for website pages with Platform link, People dropdown, Solutions dropdown, and Resources dropdown",
      usage: "Used on website subpages (home, demo, login, etc.) - NOT on main /website page",
      features: ["Logo", "Platform link", "People dropdown", "Solutions dropdown with mega menu", "Pricing link", "Resources dropdown", "Login/Get Started buttons", "Theme toggle", "Mobile menu"],
      file: "src/components/ui/main-header.tsx",
      example: <StaticMainHeader />
    },
    {
      name: "GlobalHeader",
      description: "Simple navigation for basic website pages with login and demo buttons",
      usage: "Used on simple website pages that don't need the full navigation",
      features: ["Logo", "Login button", "Get Started button", "Theme toggle"],
      file: "src/components/ui/global-header.tsx",
      example: <StaticGlobalHeader />
    },
    {
      name: "DesignSystemNavigation", 
      description: "Navigation component for design system documentation pages",
      usage: "Used on all design system pages",
      features: ["Logo", "Design System badge", "Navigation links", "Theme toggle", "Mobile menu"],
      file: "src/components/ui/design-system-navigation.tsx",
      example: <StaticDesignSystemNavigation />
    },
    {
      name: "Navigation (Base)",
      description: "Base navigation component used by other navigation variants",
      usage: "Base component for DesignSystemNavigation and MobileOnlyNavigation",
      features: ["Logo", "Badge support", "Navigation links", "Theme toggle", "Mobile responsive"],
      file: "src/components/ui/navigation.tsx",
      example: <StaticNavigation />
    }
  ]


  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="navigation" />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container size="2xl" className="px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <Section paddingY="xl">
            <PageHeader
              title="Navigation"
              description="Master top navigation components used across the Elevation AI site. These components provide consistent navigation patterns and user experience."
              size="lg"
              centered
            />
          </Section>

          {/* Overview Section */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="navigation-line" className="h-5 w-5" />
                  Navigation Overview
                </CardTitle>
                <CardDescription>
                  The site currently uses 4 distinct top navigation implementations, each optimized for different sections and use cases.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">MainHeader</h4>
                    <BodySmall className="text-muted-foreground text-sm">
                      Main navigation for wireframe subpages with full menu
                    </BodySmall>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">GlobalHeader</h4>
                    <BodySmall className="text-muted-foreground text-sm">
                      Simple navigation for basic wireframe pages
                    </BodySmall>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">DesignSystemNavigation</h4>
                    <BodySmall className="text-muted-foreground text-sm">
                      Navigation for design system documentation
                    </BodySmall>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Navigation (Base)</h4>
                    <BodySmall className="text-muted-foreground text-sm">
                      Base component used by other navigation variants
                    </BodySmall>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Navigation Components */}
          <Section paddingY="lg">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Reusable Navigation Components</h2>
                <div className="space-y-8">
                  {navigationComponents.map((component, index) => (
                    <Card key={index} className="overflow-visible">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {component.name}
                              <Badge variant="secondary" className="text-xs">
                                Component
                              </Badge>
                            </CardTitle>
                            <CardDescription className="mt-2">
                              {component.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 p-6">
                        {/* Usage */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">Usage</h4>
                          <BodySmall className="text-muted-foreground text-sm">
                            {component.usage}
                          </BodySmall>
                        </div>

                        {/* Features */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {component.features.map((feature, featureIndex) => (
                              <Badge key={featureIndex} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* File Path */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">File Path</h4>
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {component.file}
                          </code>
                        </div>

                        {/* Live Example */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">Live Example</h4>
                          <div className="border rounded-lg overflow-visible min-h-[200px] p-4">
                            {component.example}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

            </div>
          </Section>

          {/* Implementation Guidelines */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="code-line" className="h-5 w-5" />
                  Implementation Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-sm mb-2">When to Use MainHeader</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Website subpages (/website/home, /website/demo, etc.)</li>
                      <li>• Pages requiring full navigation menu</li>
                      <li>• Pages with Solutions dropdown</li>
                      <li>• NOT on main /website page</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">When to Use GlobalHeader</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Simple website pages</li>
                      <li>• Pages requiring only login/demo buttons</li>
                      <li>• Basic marketing pages</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">When to Use DesignSystemNavigation</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Design system pages (/design-system/*)</li>
                      <li>• Documentation pages</li>
                      <li>• Pages requiring design system badge</li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <h4 className="font-medium text-sm mb-2 text-blue-900 dark:text-blue-100">
                    <Icon name="information-line" className="h-4 w-4 inline mr-1" />
                    Best Practice
                  </h4>
                  <BodySmall className="text-sm text-blue-800 dark:text-blue-200">
                    Use the appropriate navigation component for each section to maintain consistency and provide the right user experience for each context.
                  </BodySmall>
                </div>
              </CardContent>
            </Card>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
