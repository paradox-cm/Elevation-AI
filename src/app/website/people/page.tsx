"use client"

import React from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Grid } from "@/components/ui/layout/grid"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { H1, H2, H3, H4, P, BodyLarge, BodySmall } from "@/components/ui/typography"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { Users, Headphones, Brain, Shield, Clock, Globe, CheckCircle, ArrowRight, Star, Award, UserCheck, Zap, Target, Sparkles } from "lucide-react"
import Link from "next/link"

interface ConciergeService {
  id: string
  title: string
  description: string
  features: string[]
  icon: React.ComponentType<{ className?: string }>
}

interface ExpertCategory {
  id: string
  title: string
  description: string
  expertCount: string
  specialties: string[]
  icon: React.ComponentType<{ className?: string }>
}

const conciergeServices: ConciergeService[] = [
  {
    id: 'dedicated-support',
    title: 'Dedicated Concierge Support',
    description: 'Your personal success team, available 24/7 to ensure your platform runs smoothly and your team maximizes value.',
    features: [
      '24/7 Priority Support',
      'Dedicated Success Manager',
      'Custom Training Programs',
      'Proactive Health Monitoring'
    ],
    icon: Headphones
  },
  {
    id: 'implementation',
    title: 'White-Glove Implementation',
    description: 'Complete platform setup and integration with your existing systems, handled by our expert implementation team.',
    features: [
      'Custom Integration Planning',
      'Data Migration Services',
      'Security Configuration',
      'Go-Live Support'
    ],
    icon: Shield
  },
  {
    id: 'optimization',
    title: 'Continuous Optimization',
    description: 'Ongoing platform optimization and performance tuning to ensure you\'re always getting maximum value.',
    features: [
      'Performance Analytics',
      'Workflow Optimization',
      'Feature Adoption Guidance',
      'ROI Measurement'
    ],
    icon: Brain
  }
]

const expertCategories: ExpertCategory[] = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Specialists in artificial intelligence, machine learning, and advanced automation technologies.',
    expertCount: '150+',
    specialties: ['Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'Robotic Process Automation'],
    icon: Brain
  },
  {
    id: 'enterprise-architecture',
    title: 'Enterprise Architecture',
    description: 'Senior architects with deep experience in large-scale system design and integration.',
    expertCount: '200+',
    specialties: ['Cloud Architecture', 'Microservices', 'API Design', 'Security Architecture'],
    icon: Shield
  },
  {
    id: 'industry-experts',
    title: 'Industry Specialists',
    description: 'Domain experts across finance, healthcare, manufacturing, and other key industries.',
    expertCount: '300+',
    specialties: ['Financial Services', 'Healthcare', 'Manufacturing', 'Government'],
    icon: Globe
  },
  {
    id: 'data-analytics',
    title: 'Data & Analytics',
    description: 'Data scientists and analysts specializing in business intelligence and advanced analytics.',
    expertCount: '180+',
    specialties: ['Business Intelligence', 'Data Engineering', 'Statistical Analysis', 'Visualization'],
    icon: Award
  }
]

function ConciergeServiceCard({ service }: { service: ConciergeService }) {
  const IconComponent = service.icon

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <IconComponent className="w-5 h-5 text-primary" />
          </div>
          {service.title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ExpertCategoryCard({ category }: { category: ExpertCategory }) {
  const IconComponent = category.icon

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <IconComponent className="w-5 h-5 text-primary" />
          </div>
          {category.title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {category.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{category.expertCount} Experts Available</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Creative Hero Section Component
function CreativeHeroSection() {
  const [activeExpert, setActiveExpert] = React.useState(0)
  
  const expertTypes = [
    { icon: Brain },
    { icon: Shield },
    { icon: Globe },
    { icon: Award }
  ]

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveExpert((prev) => (prev + 1) % expertTypes.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [expertTypes.length])

  return (
    <Section 
      paddingY="lg" 
      className="flex items-center min-h-screen pt-8 sm:pt-0 relative overflow-hidden"
    >

      <Container size="2xl" className="px-4 sm:px-6 lg:px-8 lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4 sm:space-y-6">
                        <div className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-semibold leading-tight">
                          Your Expert Network Awaits
                        </div>
              <BodyLarge className="text-muted-foreground max-w-2xl">
                Access world-class expertise and dedicated support through our Concierge Team and global Expert Network. Get the specialized knowledge and hands-on assistance you need to maximize your platform's potential.
              </BodyLarge>
            </div>


            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                <Link href="/website/sign-up">
                  Get Started
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                <Link href="/website/demo">
                  Request a Demo
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Main Visual Container */}
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl bg-gradient-to-br from-background/50 to-background/30 border border-border/50 overflow-hidden backdrop-blur-sm">
              {/* Animated Grid Background */}
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 dark:hidden opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '32px 32px'
                  }}
                />
                <div 
                  className="absolute inset-0 hidden dark:block opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '32px 32px'
                  }}
                />
              </div>

              {/* Central Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center border-4 border-primary/30 animate-pulse">
                  <Users className="w-16 h-16 text-primary" />
                </div>
              </div>

              {/* Orbiting Expert Cards */}
              {expertTypes.map((expert, index) => {
                const angle = (index * 90) * (Math.PI / 180)
                const radius = 120
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
                
                return (
                  <div
                    key={index}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      animationDelay: `${index * 0.5}s`
                    }}
                  >
                    <div className={`w-20 h-20 bg-background/80 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-border/50 shadow-lg transition-all duration-500 ${
                      activeExpert === index ? 'scale-110 shadow-xl border-primary/50' : 'hover:scale-105'
                    }`}>
                      <expert.icon className={`w-8 h-8 transition-colors duration-500 ${
                        activeExpert === index ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                  </div>
                )
              })}

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {expertTypes.map((_, index) => {
                  const angle = (index * 90) * (Math.PI / 180)
                  const radius = 120
                  const x1 = 50 + Math.cos(angle) * 15
                  const y1 = 50 + Math.sin(angle) * 15
                  const x2 = 50 + Math.cos(angle) * 30
                  const y2 = 50 + Math.sin(angle) * 30
                  
                  return (
                    <line
                      key={index}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="text-primary/30 animate-pulse"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />
                  )
                })}
              </svg>
            </div>

          </div>
        </div>
      </Container>
    </Section>
  )
}

export default function PeoplePage() {
  return (
            <PageWrapper>
              <MobileOnlyLayout
                header={<MainHeader />}
                footer={<WebsiteFooter />}
                mobileMenu={<MobileMenuDrawer currentPage="people" />}
              >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            <Container size="2xl">
          {/* Creative Hero Section */}
          <CreativeHeroSection />

          {/* Hidden Content - Uncomment to show */}
          {/*
          Concierge Team Section
          <div id="concierge-team">
            <Section paddingY="lg">
              <div className="text-center space-y-6 mb-12">
                <H1>Your Concierge Team</H1>
                <BodyLarge className="text-muted-foreground max-w-3xl mx-auto">
                  A dedicated team of Elevation AI experts at your service, providing personalized support, strategic guidance, and hands-on implementation to ensure your success.
                </BodyLarge>
              </div>

              Team Overview
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
                <div className="space-y-6">
                  <H3>Always-On Support</H3>
                  <P className="text-muted-foreground leading-relaxed">
                    Your Concierge Team consists of senior Elevation AI experts who understand your business, your goals, and your unique challenges. They're not just support—they're strategic partners dedicated to your success.
                  </P>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Dedicated Success Manager</div>
                        <div className="text-sm text-muted-foreground">Your single point of contact for all strategic initiatives</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">24/7 Priority Support</div>
                        <div className="text-sm text-muted-foreground">Round-the-clock assistance when you need it most</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Strategic Advisory</div>
                        <div className="text-sm text-muted-foreground">Expert guidance on AI strategy and implementation</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="relative h-[400px] rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                          <Users className="w-12 h-12 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-primary">Dedicated Team</div>
                          <div className="text-sm text-muted-foreground">Always at your service</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              Services Grid
              <div className="space-y-8">
                <H3 className="text-center">What Your Concierge Team Provides</H3>
                <Grid cols={3} gap={6}>
                  {conciergeServices.map((service) => (
                    <ConciergeServiceCard key={service.id} service={service} />
                  ))}
                </Grid>
              </div>
            </Section>
          </div>

          Expert Network Section
          <div id="expert-network">
            <Section paddingY="lg" className="bg-muted/30">
              <div className="text-center space-y-6 mb-12">
                <H1>Expert Network</H1>
                <BodyLarge className="text-muted-foreground max-w-3xl mx-auto">
                  Tap into our curated network of 800+ specialists across AI, enterprise architecture, and industry domains. These are independent experts who have been vetted and integrated into our ecosystem.
                </BodyLarge>
              </div>

              Network Overview
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
                <div className="relative order-2 lg:order-1">
                  <div className="relative h-[400px] rounded-2xl bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/20 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                          <Globe className="w-12 h-12 text-blue-500" />
                        </div>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-blue-500">800+ Experts</div>
                          <div className="text-sm text-muted-foreground">Vetted and ready to help</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 order-1 lg:order-2">
                  <H3>Curated Excellence</H3>
                  <P className="text-muted-foreground leading-relaxed">
                    Our Expert Network consists of independent specialists who have been carefully vetted for their expertise, experience, and proven results. They're not employees—they're trusted partners who can be seamlessly integrated into your projects.
                  </P>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium">Rigorous Vetting Process</div>
                        <div className="text-sm text-muted-foreground">Every expert is thoroughly evaluated for skills and experience</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium">Seamless Integration</div>
                        <div className="text-sm text-muted-foreground">Experts work directly within your Elevation AI workspace</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium">Flexible Engagement</div>
                        <div className="text-sm text-muted-foreground">From one-time consultations to ongoing partnerships</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              Expert Categories
              <div className="space-y-8">
                <H3 className="text-center">Expert Categories</H3>
                <Grid cols={2} gap={6}>
                  {expertCategories.map((category) => (
                    <ExpertCategoryCard key={category.id} category={category} />
                  ))}
                </Grid>
              </div>

              How It Works
              <div className="mt-16 space-y-8">
                <H3 className="text-center">How It Works</H3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto">
                      <Target className="w-8 h-8 text-blue-500" />
                    </div>
                    <H4>1. Define Your Needs</H4>
                    <BodySmall className="text-muted-foreground">Tell us what expertise you need and we'll match you with the right specialists.</BodySmall>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto">
                      <Users className="w-8 h-8 text-blue-500" />
                    </div>
                    <H4>2. Meet Your Expert</H4>
                    <BodySmall className="text-muted-foreground">Connect with vetted experts who understand your industry and challenges.</BodySmall>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto">
                      <Zap className="w-8 h-8 text-blue-500" />
                    </div>
                    <H4>3. Collaborate & Execute</H4>
                    <BodySmall className="text-muted-foreground">Work together seamlessly within your Elevation AI workspace.</BodySmall>
                  </div>
                </div>
              </div>
            </Section>
          </div>

          Benefits Section
          <Section paddingY="lg">
            <div className="text-center space-y-6 mb-12">
              <H1>Why Choose Our People Services</H1>
              <BodyLarge className="text-muted-foreground max-w-3xl mx-auto">
                The advantages of working with our Concierge Team and Expert Network
              </BodyLarge>
            </div>
            <Grid cols={3} gap={6} className="mt-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <H4>Immediate Access</H4>
                </CardHeader>
                <CardContent>
                  <BodySmall className="text-muted-foreground">
                    Get instant access to experts and support when you need it most. No waiting, no delays.
                  </BodySmall>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <H4>Vetted Excellence</H4>
                </CardHeader>
                <CardContent>
                  <BodySmall className="text-muted-foreground">
                    Every expert in our network is carefully vetted for expertise, experience, and proven results.
                  </BodySmall>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <H4>Secure & Compliant</H4>
                </CardHeader>
                <CardContent>
                  <BodySmall className="text-muted-foreground">
                    All interactions are secure, compliant, and designed to meet enterprise security standards.
                  </BodySmall>
                </CardContent>
              </Card>
            </Grid>
          </Section>

          CTA Section
          <Section paddingY="lg">
            <Card className="text-center">
              <CardHeader>
                <H3 className="flex items-center justify-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  Ready to Get Started?
                </H3>
                <BodyLarge className="text-muted-foreground">
                  Connect with our Concierge Team to discuss your specific needs and discover how our Expert Network can accelerate your success.
                </BodyLarge>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="flex items-center gap-2">
                    Schedule a Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    View Expert Directory
                    <Users className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Section>
          */}
            </Container>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
