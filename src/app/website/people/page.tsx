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
import Icon from "@/components/ui/icon"
import { VerticalSquareFlow, LogoCarousel } from "@/components/animations"

// Animated Text Carousel Component
function AnimatedTextCarousel({ 
  texts, 
  autoPlayInterval = 4000 
}: { 
  texts: string[]
  autoPlayInterval?: number 
}) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [screenSize, setScreenSize] = React.useState<'sm' | 'md' | 'lg' | 'xl'>('lg')
  const [hasManualInteraction, setHasManualInteraction] = React.useState(false)
  const manualInteractionTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Responsive screen size detection
  React.useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setScreenSize('sm')
      } else if (width < 768) {
        setScreenSize('md')
      } else if (width < 1024) {
        setScreenSize('lg')
      } else {
        setScreenSize('xl')
      }
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  // Detect manual interaction (desktop only - mobile uses natural scroll)
  const handleManualInteraction = React.useCallback(() => {
    // Only stop auto-play on desktop devices (screen size 'lg' or 'xl')
    // Mobile devices will use natural horizontal scrolling
    if (screenSize === 'lg' || screenSize === 'xl') {
      setHasManualInteraction(true)
      
      // Clear existing timeout
      if (manualInteractionTimeoutRef.current) {
        clearTimeout(manualInteractionTimeoutRef.current)
      }
      
      // Set 5-second timer for auto-play resume
      manualInteractionTimeoutRef.current = setTimeout(() => {
        setHasManualInteraction(false)
      }, 5000)
    }
  }, [screenSize])

  // Auto-play functionality with manual interaction detection
  React.useEffect(() => {
    // Don't auto-play if user has manually interacted (desktop only)
    // Mobile devices use natural scrolling, so auto-play is disabled on mobile
    if ((hasManualInteraction && (screenSize === 'lg' || screenSize === 'xl')) || screenSize === 'sm' || screenSize === 'md') return
    
    // Variable slide timing: first and third slides = 5s, second slide = 9s
    const getSlideDuration = (index: number) => {
      return index === 1 ? 9000 : 5000 // Second slide (index 1) gets 9 seconds, others get 5 seconds
    }
    
    const currentSlideDuration = getSlideDuration(currentIndex)
    const progressInterval = 80 // 80ms intervals
    const progressIncrement = (100 / (currentSlideDuration / progressInterval)) // Dynamic progress increment based on slide duration
    
    let currentProgress = 0
    const progressTimer = setInterval(() => {
      currentProgress += progressIncrement
      setProgress(currentProgress)
      
      if (currentProgress >= 100) {
        currentProgress = 0
        setProgress(0)
        setCurrentIndex((prev) => (prev + 1) % texts.length)
      }
    }, progressInterval)

    return () => clearInterval(progressTimer)
  }, [texts.length, autoPlayInterval, hasManualInteraction, screenSize, currentIndex])

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (manualInteractionTimeoutRef.current) {
        clearTimeout(manualInteractionTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Text Display */}
      <div className="relative h-64 flex items-center justify-center">
        {texts.map((text, index) => (
          <div
            key={index}
            className={`transition-opacity duration-300 absolute inset-0 flex items-center justify-center ${
              index === currentIndex
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <H1 className="text-orange-500 leading-relaxed">
              {text}
            </H1>
          </div>
        ))}
      </div>
      
      {/* Progress Bar Indicators */}
      <div className="flex gap-2 justify-center">
        {texts.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setProgress(0)
              handleManualInteraction()
            }}
            className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
            aria-label={`Go to statement ${index + 1}`}
          >
            {index === currentIndex ? (
              // Active slide: Animated progress bar
              <div className="w-6 h-2.5 bg-orange-500/30 rounded-[0.625rem] overflow-hidden">
                <div 
                  className="h-full bg-orange-500 transition-all duration-75 ease-linear"
                  style={{ 
                    width: `${Math.max(10, Math.min(24, progress * 0.24))}px` 
                  }}
                />
              </div>
            ) : (
              // Inactive slide: Simple dot
              <div className="w-2.5 h-2.5 bg-orange-500/30 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

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
    <Card className="h-full bg-blue-500/5 border-blue-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <IconComponent className="w-5 h-5 text-blue-500" />
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
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">{category.expertCount} Experts Available</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs bg-blue-500/10 text-blue-500 border-blue-500/20">
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

  return (
    <Section 
      paddingY="lg" 
      className="flex items-center py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >

      <Container size="2xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 sm:space-y-8">
             <div className="space-y-4 sm:space-y-6">
                        <H1>
                          Your Dedicated Team for the Agentic Era
                        </H1>
              <BodyLarge className="text-muted-foreground max-w-2xl">
                Your concierge support team, acting as an extension of your own team, providing the strategic guidance and technical expertise to design, build, and implement transformative agentic solutions.
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
            <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-3xl bg-gradient-to-br from-background/50 to-background/30 border border-border/50 overflow-hidden backdrop-blur-sm">
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

              {/* Center Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/images/branding/E-AI-Squircle.svg" 
                  alt="Elevation AI Logo"
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 dark:brightness-0 dark:invert"
                />
              </div>

            </div>

          </div>
        </div>
      </Container>
    </Section>
  )
}


// Logo Carousel Section
function LogoCarouselSection() {
  return (
    <Section paddingY="lg" className="bg-muted/20">
      <Container size="2xl">
        <div className="space-y-6 sm:space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-2">
            <H3 className="text-muted-foreground">
              Led by industry veterans from:
            </H3>
          </div>
          
          {/* Logo Carousel */}
          <div className="py-4 sm:py-6">
            <LogoCarousel />
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
                header={<MainHeader currentPage="people" />}
                footer={<WebsiteFooter />}
                mobileMenu={<MobileMenuDrawer currentPage="people" />}
              >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            
            {/* Creative Hero Section */}
            <CreativeHeroSection />


            {/* Concierge Details Section */}
            <div id="concierge-team">
              <Section paddingY="sm">
                <Container size="2xl">
                  <div className="space-y-6">

                {/* Challenge and Solution - Full Width Layout */}
                <div className="space-y-8">
                  {/* The Challenge Section */}
                  <div className="relative">
                    <div className="text-center space-y-8">
                      <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500/10 rounded-full border border-orange-500/20">
                          <Brain className="w-5 h-5 text-orange-500" />
                          <span className="text-sm font-semibold text-orange-500">The Challenge</span>
                        </div>
                        <H2>Technology Alone Isn't Transformation</H2>
                      </div>
                      
                      <div className="relative w-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-orange-500/10 to-transparent rounded-3xl"></div>
                        <div className="relative p-8 sm:p-12 lg:p-16 rounded-3xl border border-orange-500/20 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm">
                          <div className="max-w-5xl lg:max-w-[1144px] mx-auto">
                            <AnimatedTextCarousel 
                              texts={[
                                "Adopting agentic AI is not just about adding another app to your tech stack—it's a fundamental shift in how your business operates.",
                                "The transition requires a unique blend of strategic foresight to identify opportunities, technical expertise to build the solutions, and a hands-on partnership to ensure successful implementation.",
                                "Most organizations don't have this specialized, multi-disciplinary team in-house. This is where Elevation AI comes in."
                              ]}
                              autoPlayInterval={5000}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Our Solution Section - Single Container */}
                  <div className="relative">
                    <Card className="border-border bg-transparent">
                      <CardContent className="p-6">
                        <div className="space-y-12">
                          {/* Header Section */}
                          <div className="text-center space-y-8">
                            <div className="space-y-4">
                              <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
                                <Users className="w-5 h-5 text-primary" />
                                <span className="text-sm font-semibold text-primary">Our Solution</span>
                              </div>
                              <H2>We Become Your Agentic Operations Team</H2>
                            </div>
                            
                            <BodyLarge className="text-muted-foreground leading-relaxed text-center text-lg max-w-5xl mx-auto">
                              Our Concierge service is a deep, hands-on partnership. We embed our team of expert engineers and strategists directly into your operations to accelerate your journey into the agentic era.
                            </BodyLarge>
                          </div>

                          {/* Process Flow Section */}
                          <div className="space-y-8">
                            {/* Four Column Process Flow */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50 transition-colors duration-300 relative overflow-hidden h-full bg-transparent">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <CardHeader className="pb-4 relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                            <Target className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">Design & Strategize</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <P className="text-muted-foreground leading-relaxed">
                          Our engagement begins with a deep-dive discovery process. We work alongside your leadership to map your unique challenges, identify the highest-value automation opportunities, and co-design a clear, phased roadmap for your agentic transformation.
                        </P>
                      </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50 transition-colors duration-300 relative overflow-hidden h-full bg-transparent">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <CardHeader className="pb-4 relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                            <Zap className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">Build & Implement</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <P className="text-muted-foreground leading-relaxed">
                          Our agentic engineers get to work building the custom solutions you need. This includes creating specialized agents, designing complex automated workflows, and configuring your Workspaces and Canvases for your specific operational needs.
                        </P>
                      </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50 transition-colors duration-300 relative overflow-hidden h-full bg-transparent">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <CardHeader className="pb-4 relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                            <Shield className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">Integrate & Orchestrate</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <P className="text-muted-foreground leading-relaxed">
                          We handle the complexity of connecting our platform to your existing systems of record. We ensure a seamless flow of data, allowing your new agentic workflows to orchestrate your entire tech stack.
                        </P>
                      </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50 transition-colors duration-300 relative overflow-hidden h-full bg-transparent">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <CardHeader className="pb-4 relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                            <Sparkles className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">Support & Iterate</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <P className="text-muted-foreground leading-relaxed">
                          Our partnership doesn't end at launch. We provide ongoing support, monitor agent performance, and continuously work with you to identify new opportunities for optimization and automation as your business evolves.
                        </P>
                      </CardContent>
                    </Card>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Who This Is For Section - Enhanced */}
                <div className="space-y-8">
                  {/* Two-Column Card Layout */}
                  <Card className="border-border bg-transparent">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="flex flex-col h-full">
                          <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
                              <Target className="w-5 h-5 text-primary" />
                              <span className="text-sm font-semibold text-primary">Who This Is For</span>
                            </div>
                            
                            <div>
                              <H2>A Partnership for Ambitious Leaders</H2>
                              <P className="text-muted-foreground leading-relaxed text-lg">
                                Our Concierge service is designed for growth-oriented leaders who understand that the future belongs to those who act decisively today. These are the visionaries who recognize that transformative change requires more than just technology—it demands strategic partnership, specialized expertise, and unwavering commitment to excellence.
                              </P>
                            </div>
                          </div>
                          
                          {/* Image Placeholder Container - Fills remaining height */}
                          <div className="flex-1 w-full bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center mt-6">
                            <div className="text-center">
                              <div className="w-12 h-12 bg-muted-foreground/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <p className="text-sm text-muted-foreground/70">Image placeholder</p>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Four Characteristic Cards */}
                        <div className="space-y-6">
                          <Card className="border-border/50 bg-transparent">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg font-semibold flex items-center gap-3">
                                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">1</span>
                                First-Mover Advantage
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <P className="text-muted-foreground leading-relaxed text-sm">
                                Want to move quickly and capture a first-mover advantage in their industry.
                              </P>
                            </CardContent>
                          </Card>

                          <Card className="border-border/50 bg-transparent">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg font-semibold flex items-center gap-3">
                                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">2</span>
                                Complex Workflows
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <P className="text-muted-foreground leading-relaxed text-sm">
                                Have complex, mission-critical workflows that require a bespoke, tailored solution.
                              </P>
                            </CardContent>
                          </Card>

                          <Card className="border-border/50 bg-transparent">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg font-semibold flex items-center gap-3">
                                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">3</span>
                                Strategic Partnership
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <P className="text-muted-foreground leading-relaxed text-sm">
                                Prefer a strategic partner to act as their dedicated agentic implementation team.
                              </P>
                            </CardContent>
                          </Card>

                          <Card className="border-border/50 bg-transparent">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg font-semibold flex items-center gap-3">
                                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">4</span>
                                Specialized Talent
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <P className="text-muted-foreground leading-relaxed text-sm">
                                Need to augment their existing team's capacity with specialized, hard-to-find talent.
                              </P>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                  </div>
                </Container>
              </Section>
            </div>

            {/* Expert Network Section */}
            <div id="expert-network">
              <Section paddingY="lg" className="bg-blue-500/10">
                <Container size="2xl">
                  <div className="space-y-12">
                    {/* Header */}
                    <div className="text-center space-y-6">
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="text-sm font-semibold text-primary">Expert Network</span>
                      </div>
                      <H1>Access World-Class Expertise</H1>
                      <BodyLarge className="text-muted-foreground leading-relaxed max-w-3xl mx-auto text-lg">
                        Tap into our curated network of specialists across AI, enterprise architecture, and industry domains. These are independent experts who have been vetted and integrated into our ecosystem.
                      </BodyLarge>
                    </div>

                    {/* Expert Categories Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {expertCategories.map((category) => (
                        <ExpertCategoryCard key={category.id} category={category} />
                      ))}
                    </div>

                  </div>
                </Container>
              </Section>
            </div>

            {/* Logo Carousel Section */}
            <LogoCarouselSection />

            {/* CTA Section */}
            <div id="connect-experts">
              <Section paddingY="lg" className="bg-muted/30">
                <Container size="2xl">
                  <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="space-y-4">
                      <H2>Ready to Connect with Experts?</H2>
                      <P className="text-muted-foreground leading-relaxed">
                        Our expert network is ready to help you tackle your most complex challenges. Connect with the right specialists for your specific needs.
                      </P>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" asChild>
                        <Link href="/website/contact">Connect with Experts</Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <Link href="/website/demo">Schedule a Demo</Link>
                      </Button>
                    </div>
                  </div>
                </Container>
              </Section>
            </div>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
