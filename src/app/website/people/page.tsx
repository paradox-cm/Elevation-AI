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
import { VerticalSquareFlow } from "@/components/animations"

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

  // Auto-play functionality
  React.useEffect(() => {
    const progressIncrement = 2 // 2% every 80ms
    const progressInterval = 80 // 80ms intervals
    
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
  }, [texts.length, autoPlayInterval])

  return (
    <div className="space-y-6">
      {/* Text Display */}
      <div className="relative h-32 flex items-center justify-center">
        {texts.map((text, index) => (
          <div
            key={index}
            className={`transition-opacity duration-300 absolute inset-0 flex items-center justify-center ${
              index === currentIndex
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <H3 className="text-orange-500 leading-relaxed">
              {text}
            </H3>
          </div>
        ))}
      </div>
      
      {/* Thin Line Indicators */}
      <div className="flex gap-2 justify-center">
        {texts.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setProgress(0)
            }}
            className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
            aria-label={`Go to statement ${index + 1}`}
          >
            <div 
              className={`h-1 w-22 transition-colors duration-300 rounded-full cursor-pointer hover:opacity-80 ${
                index === currentIndex
                  ? 'bg-orange-500' 
                  : 'bg-muted-foreground/30'
              }`}
            />
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
                          <div className="max-w-5xl mx-auto">
                            <AnimatedTextCarousel 
                              texts={[
                                "Adopting agentic AI is not just about adding another app to your tech stack; it's a fundamental shift in how your business operates.",
                                "The transition requires a unique blend of strategic foresight to identify opportunities, the technical expertise to build the solutions, and a hands-on partnership to ensure successful implementation and adoption.",
                                "Most organizations don't have this specialized, multi-disciplinary team in-house."
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
                      <CardContent className="p-8 sm:p-12 lg:p-16">
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
                            
                            <div className="relative w-full">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent rounded-3xl"></div>
                              <div className="relative p-8 sm:p-12 lg:p-16 rounded-3xl border border-primary/20 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm">
                                <BodyLarge className="text-muted-foreground leading-relaxed text-center text-lg max-w-5xl mx-auto">
                                  Our Concierge service is a deep, hands-on partnership. We embed our team of expert engineers and strategists directly into your operations to accelerate your journey into the agentic era.
                                </BodyLarge>
                              </div>
                            </div>
                          </div>

                          {/* Process Flow Section */}
                          <div className="space-y-8">
                            {/* Four Column Process Flow */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <Card className="border-border h-full bg-transparent">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Target className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">Design & Strategize</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <P className="text-muted-foreground leading-relaxed">
                          Our engagement begins with a deep-dive discovery process. We work alongside your leadership to map your unique challenges, identify the highest-value automation opportunities, and co-design a clear, phased roadmap for your agentic transformation.
                        </P>
                      </CardContent>
                    </Card>

                    <Card className="border-border h-full bg-transparent">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">Build & Implement</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <P className="text-muted-foreground leading-relaxed">
                          Our agentic engineers get to work building the custom solutions you need. This includes creating specialized agents, designing complex automated workflows, and configuring your Workspaces and Canvases for your specific operational needs.
                        </P>
                      </CardContent>
                    </Card>

                    <Card className="border-border h-full bg-transparent">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">Integrate & Orchestrate</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <P className="text-muted-foreground leading-relaxed">
                          We handle the complexity of connecting our platform to your existing systems of record. We ensure a seamless flow of data, allowing your new agentic workflows to orchestrate your entire tech stack.
                        </P>
                      </CardContent>
                    </Card>

                    <Card className="border-border h-full bg-transparent">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">Support & Iterate</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
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
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
                      <Target className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold text-primary">Who This Is For</span>
                    </div>
                    <H2>A Partnership for Ambitious Leaders</H2>
                    <P className="text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto">
                      Our Concierge service is designed for growth-oriented leaders who understand that the future belongs to those who act decisively today.
                    </P>
                  </div>
                  
                  <div className="relative w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent rounded-3xl"></div>
                    <div className="relative p-8 sm:p-12 rounded-3xl border border-primary/20 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex items-start gap-4 group">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                            <CheckCircle className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <P className="font-medium text-foreground">First-Mover Advantage</P>
                            <P className="text-sm text-muted-foreground leading-relaxed">Want to move quickly and capture a first-mover advantage in their industry.</P>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 group">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                            <CheckCircle className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <P className="font-medium text-foreground">Complex Workflows</P>
                            <P className="text-sm text-muted-foreground leading-relaxed">Have complex, mission-critical workflows that require a bespoke, tailored solution.</P>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 group">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                            <CheckCircle className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <P className="font-medium text-foreground">Strategic Partnership</P>
                            <P className="text-sm text-muted-foreground leading-relaxed">Prefer a strategic partner to act as their dedicated agentic implementation team.</P>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 group">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                            <CheckCircle className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <P className="font-medium text-foreground">Specialized Talent</P>
                            <P className="text-sm text-muted-foreground leading-relaxed">Need to augment their existing team's capacity with specialized, hard-to-find talent.</P>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
