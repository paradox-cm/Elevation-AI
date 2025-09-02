"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTabs, ResponsiveTabsContent, ResponsiveTabsList, ResponsiveTabsTrigger } from "@/components/ui/responsive-tabs"
import { H3, H4, BodyLarge, BodySmall } from "@/components/ui/typography"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { Carousel, CarouselItem } from "@/components/ui/carousel"
import { Clock, Shield, Zap, TrendingUp, Star, Heart, Award, Rocket } from "lucide-react"

export default function CarouselsPage() {
  // Sample data for carousel examples
  const benefitsData: CarouselItem[] = [
    {
      id: 1,
      title: "Fast Onboarding",
      description: "Get up and running quickly with guided implementation and expert support.",
      icon: Clock
    },
    {
      id: 2,
      title: "Enterprise-Grade Security",
      description: "Data de-identification, auditability, and compliance built into every workflow.",
      icon: Shield
    },
    {
      id: 3,
      title: "Context-Aware Intelligence",
      description: "Work with AI that understands your organization's full history and context.",
      icon: Zap
    },
    {
      id: 4,
      title: "Proven Partnership",
      description: "Trusted by leading firms across private capital, banking, and enterprise.",
      icon: TrendingUp
    }
  ]

  const featuresData: CarouselItem[] = [
    {
      id: 1,
      title: "Premium Quality",
      description: "Built with the finest materials and craftsmanship for lasting durability.",
      icon: Star
    },
    {
      id: 2,
      title: "Customer Love",
      description: "Rated 5-stars by thousands of satisfied customers worldwide.",
      icon: Heart
    },
    {
      id: 3,
      title: "Industry Recognition",
      description: "Winner of multiple design and innovation awards in 2024.",
      icon: Award
    },
    {
      id: 4,
      title: "Lightning Fast",
      description: "Optimized for speed and performance in every interaction.",
      icon: Rocket
    }
  ]

  const testimonialsData: CarouselItem[] = [
    {
      id: 1,
      title: "Sarah Johnson",
      description: "The carousel component transformed our product showcase. Clean, professional, and incredibly smooth.",
      icon: Star
    },
    {
      id: 2,
      title: "Michael Chen",
      description: "Perfect for our dashboard metrics. The auto-play feature keeps our data fresh and engaging.",
      icon: Star
    },
    {
      id: 3,
      title: "Emily Rodriguez",
      description: "We use it for team introductions. The progress indicators make navigation intuitive for users.",
      icon: Star
    },
    {
      id: 4,
      title: "David Kim",
      description: "The gradient effects and active card highlighting create a premium feel that matches our brand.",
      icon: Star
    }
  ]

  const teamData: CarouselItem[] = [
    {
      id: 1,
      title: "Alex Thompson",
      description: "Lead Designer - 8+ years crafting exceptional user experiences",
      icon: Shield
    },
    {
      id: 2,
      title: "Jordan Lee",
      description: "Senior Developer - Full-stack expertise with React and Node.js",
      icon: Zap
    },
    {
      id: 3,
      title: "Casey Morgan",
      description: "Product Manager - Strategic vision and user-centered design",
      icon: TrendingUp
    },
    {
      id: 4,
      title: "Riley Chen",
      description: "UX Researcher - Data-driven insights and user behavior analysis",
      icon: Clock
    }
  ]

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="carousels" />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container size="2xl">
          {/* Hero Section */}
          <Section paddingY="xl" className="relative overflow-hidden">
            <div className="relative z-10">
              <PageHeader
                title="Carousels"
                description="Interactive carousel components with auto-play, progress indicators, and smart gradient effects. Perfect for showcasing content, features, and testimonials."
                size="xl"
                centered
              />
            </div>
          </Section>

          {/* Overview Section */}
          <Section paddingY="lg">
            <PageHeader
              title="Overview"
              description="Our carousel component provides a rich, interactive way to present multiple items in a scrollable format."
              size="md"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Zap className="w-4 h-4 text-primary" />
                    Auto-Play
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <BodySmall className="text-muted-foreground">
                    Automatic slide transitions with configurable timing and smooth animations.
                  </BodySmall>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Shield className="w-4 h-4 text-primary" />
                    Smart Gradients
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <BodySmall className="text-muted-foreground">
                    Edge gradients that automatically show/hide based on scroll position and slide count.
                  </BodySmall>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Active Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <BodySmall className="text-muted-foreground">
                    Interactive progress indicators with animated bars and clickable navigation.
                  </BodySmall>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Examples Section */}
          <Section paddingY="lg">
            <PageHeader
              title="Examples & Use Cases"
              description="Explore different carousel configurations and see how they adapt to various content types and design requirements."
              size="md"
            />
            
            <ResponsiveTabs defaultValue="default" className="mt-8">
              <ResponsiveTabsList className="grid w-full grid-cols-4">
                <ResponsiveTabsTrigger value="default">Default</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="custom">Custom</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="minimal">Minimal</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="advanced">Advanced</ResponsiveTabsTrigger>
              </ResponsiveTabsList>
              
              <ResponsiveTabsContent value="default" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Default Carousel
                    </CardTitle>
                    <CardDescription>
                      Full-featured carousel with auto-play, progress indicators, smart gradients, and active card highlighting. Perfect for feature showcases and product benefits.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <Carousel 
                        items={benefitsData}
                        autoPlay={true}
                        autoPlayInterval={4000}
                        showProgressIndicators={true}
                        showGradients={true}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong>Features:</strong> Auto-play every 4 seconds, progress indicators, edge gradients, active card highlighting with blue borders and backgrounds.
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>
              
              <ResponsiveTabsContent value="custom" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Custom Configuration
                    </CardTitle>
                    <CardDescription>
                      Tailored carousel with larger cards, faster transitions, and optimized spacing. Ideal for detailed content presentation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <Carousel 
                        items={featuresData}
                        autoPlay={true}
                        autoPlayInterval={3000}
                        showProgressIndicators={true}
                        showGradients={true}
                        cardWidth={320}
                        cardGap={24}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong>Features:</strong> Larger cards (320px), increased spacing (24px), faster auto-play (3 seconds), enhanced visual hierarchy.
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>
              
              <ResponsiveTabsContent value="minimal" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Minimal Carousel
                    </CardTitle>
                    <CardDescription>
                      Clean, distraction-free carousel focused on content. Perfect for static presentations and user-controlled navigation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <Carousel 
                        items={benefitsData}
                        autoPlay={false}
                        showProgressIndicators={false}
                        showGradients={true}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong>Features:</strong> No auto-play, no progress indicators, clean gradients only, user-controlled scrolling experience.
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              <ResponsiveTabsContent value="advanced" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Advanced Configuration
                    </CardTitle>
                    <CardDescription>
                      High-performance carousel with rapid transitions and compact layout. Designed for data-dense applications and dashboards.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <Carousel 
                        items={featuresData}
                        autoPlay={true}
                        autoPlayInterval={2000}
                        showProgressIndicators={true}
                        showGradients={true}
                        cardWidth={240}
                        cardGap={12}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong>Features:</strong> Compact cards (240px), tight spacing (12px), rapid auto-play (2 seconds), optimized for high-density layouts.
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>
            </ResponsiveTabs>

            {/* Real-World Use Cases */}
            <div className="mt-12">
              <PageHeader
                title="Real-World Applications"
                description="See how the carousel component adapts to different business scenarios and content types."
                size="sm"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <Card className="border-l-4 border-l-primary">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Product Features</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <BodySmall className="text-muted-foreground">
                      Showcase product capabilities with auto-advancing slides, progress indicators, and interactive navigation.
                    </BodySmall>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Testimonials</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <BodySmall className="text-muted-foreground">
                      Display customer reviews and success stories with smooth transitions and professional presentation.
                    </BodySmall>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Team Members</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <BodySmall className="text-muted-foreground">
                      Introduce team profiles with custom card layouts and controlled navigation for better user engagement.
                    </BodySmall>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Service Offerings</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <BodySmall className="text-muted-foreground">
                      Present service packages with detailed information and interactive progress tracking.
                    </BodySmall>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Portfolio Items</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <BodySmall className="text-muted-foreground">
                      Showcase work samples with high-quality visuals and smooth scrolling for professional presentation.
                    </BodySmall>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Statistics & Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <BodySmall className="text-muted-foreground">
                      Display key performance indicators with auto-advancing slides and clear visual hierarchy.
                    </BodySmall>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Configuration Examples */}
            <div className="mt-12">
              <PageHeader
                title="Configuration Examples"
                description="Common carousel configurations for different use cases and design requirements."
                size="sm"
              />
              
              <div className="mt-6 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Marketing Landing Page</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                      {`<Carousel
  items={marketingData}
  autoPlay={true}
  autoPlayInterval={5000}
  showProgressIndicators={true}
  showGradients={true}
  cardWidth={280}
  cardGap={16}
/>`}
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground">
                      <strong>Use case:</strong> Feature highlights, customer testimonials, product benefits
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Dashboard Widget</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                      {`<Carousel
  items={dashboardData}
  autoPlay={true}
  autoPlayInterval={8000}
  showProgressIndicators={false}
  showGradients={false}
  cardWidth={200}
  cardGap={8}
/>`}
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground">
                      <strong>Use case:</strong> Key metrics, system status, quick insights
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Interactive Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                      {`<Carousel
  items={galleryData}
  autoPlay={false}
  showProgressIndicators={true}
  showGradients={true}
  cardWidth={400}
  cardGap={20}
  onSlideChange={(index) => setActiveImage(index)}
/>`}
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground">
                      <strong>Use case:</strong> Image galleries, portfolio showcases, interactive presentations
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          {/* Props Documentation */}
          <Section paddingY="lg">
            <PageHeader
              title="Props & Configuration"
              description="Customize the carousel behavior and appearance with these configuration options."
              size="md"
            />
            
            <div className="mt-8 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>CarouselProps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <H4 className="text-sm font-semibold mb-2">items: CarouselItem[]</H4>
                      <BodySmall className="text-muted-foreground">
                        Array of items to display in the carousel. Each item should have an id, title, description, and optional icon and content.
                      </BodySmall>
                    </div>
                    
                    <div>
                      <H4 className="text-sm font-semibold mb-2">autoPlay?: boolean</H4>
                      <BodySmall className="text-muted-foreground">
                        Whether the carousel should automatically advance to the next slide. Default: true
                      </BodySmall>
                    </div>
                    
                    <div>
                      <H4 className="text-sm font-semibold mb-2">autoPlayInterval?: number</H4>
                      <BodySmall className="text-muted-foreground">
                        Time in milliseconds between auto-play transitions. Default: 4000
                      </BodySmall>
                    </div>
                    
                    <div>
                      <H4 className="text-sm font-semibold mb-2">showProgressIndicators?: boolean</H4>
                      <BodySmall className="text-muted-foreground">
                        Whether to show the progress indicator dots below the carousel. Default: true
                      </BodySmall>
                    </div>
                    
                    <div>
                      <H4 className="text-sm font-semibold mb-2">showGradients?: boolean</H4>
                      <BodySmall className="text-muted-foreground">
                        Whether to show edge fade gradients. Default: true
                      </BodySmall>
                    </div>
                    
                    <div>
                      <H4 className="text-sm font-semibold mb-2">cardWidth?: number</H4>
                      <BodySmall className="text-muted-foreground">
                        Width of each carousel card in pixels. Default: 260
                      </BodySmall>
                    </div>
                    
                    <div>
                      <H4 className="text-sm font-semibold mb-2">cardGap?: number</H4>
                      <BodySmall className="text-muted-foreground">
                        Gap between carousel cards in pixels. Default: 16
                      </BodySmall>
                    </div>
                    
                    <div>
                      <H4 className="text-sm font-semibold mb-2">onSlideChange?: (index: number) =&gt; void</H4>
                      <BodySmall className="text-muted-foreground">
                        Callback function called when the active slide changes. Receives the new slide index.
                      </BodySmall>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>CarouselItem Interface</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <H4 className="text-sm font-semibold mb-2">id: string | number</H4>
                      <BodySmall className="text-muted-foreground">
                        Unique identifier for the carousel item.
                      </BodySmall>
                    </div>
                    
                    <div>
                      <H4 className="text-sm font-semibold mb-2">title: string</H4>
                      <BodySmall className="text-muted-foreground">
                        Main heading text for the carousel item.
                      </BodySmall>
                    </div>
                    
                    <div>
                      <H4 className="text-sm font-semibold mb-2">description: string</H4>
                      <BodySmall className="text-muted-foreground">
                        Descriptive text displayed below the title.
                      </BodySmall>
                    </div>
                    
                    <div>
                      <H4 className="text-sm font-semibold mb-2">icon?: React.ComponentType</H4>
                      <BodySmall className="text-muted-foreground">
                        Optional icon component to display alongside the content.
                      </BodySmall>
                    </div>
                    
                    <div>
                      <H4 className="text-sm font-semibold mb-2">content?: React.ReactNode</H4>
                      <BodySmall className="text-muted-foreground">
                        Optional custom content to render below the description.
                      </BodySmall>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Best Practices */}
          <Section paddingY="lg">
            <PageHeader
              title="Best Practices"
              description="Guidelines for creating effective and accessible carousels."
              size="md"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>✅ Do's</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <BodySmall>• Keep carousel items concise and focused</BodySmall>
                  <BodySmall>• Use consistent card dimensions for visual harmony</BodySmall>
                  <BodySmall>• Enable auto-play for engaging content presentation</BodySmall>
                  <BodySmall>• Include progress indicators for navigation clarity</BodySmall>
                  <BodySmall>• Test on mobile devices for touch scrolling</BodySmall>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>❌ Don'ts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <BodySmall>• Don't overload cards with too much information</BodySmall>
                  <BodySmall>• Avoid extremely fast auto-play that's hard to read</BodySmall>
                  <BodySmall>• Don't disable gradients without considering scroll context</BodySmall>
                  <BodySmall>• Avoid inconsistent card heights that create visual noise</BodySmall>
                  <BodySmall>• Don't forget to handle edge cases in mobile layouts</BodySmall>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Interactive Examples */}
          <Section paddingY="lg">
            <PageHeader
              title="Interactive Examples"
              description="Try different carousel configurations in real-time to see how they affect the user experience."
              size="md"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Testimonials Carousel</CardTitle>
                  <CardDescription>
                    Customer feedback with star ratings and professional presentation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Carousel 
                      items={testimonialsData}
                      autoPlay={true}
                      autoPlayInterval={6000}
                      showProgressIndicators={true}
                      showGradients={true}
                      cardWidth={280}
                      cardGap={16}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Introduction</CardTitle>
                  <CardDescription>
                    Professional team profiles with role descriptions and expertise.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Carousel 
                      items={teamData}
                      autoPlay={false}
                      showProgressIndicators={true}
                      showGradients={true}
                      cardWidth={300}
                      cardGap={20}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Performance Tips */}
          <Section paddingY="lg">
            <PageHeader
              title="Performance & Best Practices"
              description="Optimize your carousel implementation for the best user experience and performance."
              size="md"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Performance Optimization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm">Use appropriate auto-play intervals</div>
                      <div className="text-xs text-muted-foreground">Avoid intervals shorter than 2 seconds to prevent overwhelming users</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm">Optimize card dimensions</div>
                      <div className="text-xs text-muted-foreground">Balance card size with content density for optimal readability</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm">Consider mobile performance</div>
                      <div className="text-xs text-muted-foreground">Test touch scrolling and auto-play on mobile devices</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Accessibility Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm">Keyboard navigation</div>
                      <div className="text-xs text-muted-foreground">Progress indicators are fully keyboard accessible</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm">Screen reader support</div>
                      <div className="text-xs text-muted-foreground">Proper ARIA labels and semantic structure</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm">Focus management</div>
                      <div className="text-xs text-muted-foreground">Clear focus indicators and logical tab order</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
