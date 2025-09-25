"use client"

import React, { useEffect, useState } from "react"
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
import { LoadingSpinner } from "@/components/ui/loading"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { Users, Building2, Shield, Zap, Target, Sparkles, CheckCircle, ArrowRight, Star, Award, UserCheck, Brain, Globe, Handshake, GitMerge } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Icon from "@/components/ui/icon"
import { VerticalSquareFlow, LogoCarousel, TunnelShader } from "@/components/animations"
import { Carousel, CarouselItem } from "@/components/ui/carousel"
import { PeopleCarousel, PlatformCarouselItem } from "@/components/ui/people-carousel"
import { pagesService } from "@/lib/cms"
import { PageWithSections } from "@/types/cms"

// Creative Hero Section Component
function CreativeHeroSection({ data }: { data?: Record<string, unknown> | null }) {
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
                {typeof data?.title === 'string' ? data.title : 'Scale Your Execution with a Trusted Ecosystem of Specialized Firms'}
              </H1>
              <BodyLarge className="text-muted-foreground max-w-2xl">
                {typeof data?.description === 'string' ? data.description : 'For large-scale initiatives, leverage our Partner Network—a curated ecosystem of specialized consulting firms and agencies that bring deep domain expertise and a full team of resources to solve your most complex challenges.'}
              </BodyLarge>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {(Array.isArray(data?.ctaButtons) ? data.ctaButtons as unknown[] : [
                { text: 'Learn More', href: '#challenge-solution', variant: 'default' },
                { text: 'Learn More', href: '#challenge-solution', variant: 'outline' }
              ]).map((button: unknown, index: number) => {
                const btn = button as Record<string, unknown>
                return (
                <Button 
                  key={index}
                  size="lg" 
                  variant={typeof btn.variant === "string" ? (btn.variant as any) : undefined}
                  className="text-base sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
                  asChild
                >
                  <Link href={typeof btn.href === 'string' ? btn.href : '#'}>{typeof btn.text === 'string' ? btn.text : 'Button'}</Link>
                </Button>
                )
              })}
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
                   src={typeof data?.logoImage === 'string' ? data.logoImage : "/images/branding/E-AI-Squircle.svg"}
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
function LogoCarouselSection({ data }: { data?: Record<string, unknown> | null }) {
  return (
     <Section paddingY="lg" className={typeof data?.backgroundColor === 'string' ? data.backgroundColor : "bg-muted/20"}>
      <Container size="2xl">
        <div className="space-y-6 sm:space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-2">
            <H3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-muted-foreground">
              {typeof data?.title === 'string' ? data.title : 'Led by industry veterans from:'}
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

export default function PeoplePartnersPage() {
  const [pageData, setPageData] = useState<PageWithSections | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const data = await pagesService.getWithSections('people-partners')
        setPageData(data)
      } catch (error) {
        console.error('Error fetching people partners page data:', error)
        setPageData(null) // Fallback to static content
      } finally {
        setLoading(false)
      }
    }
    fetchPageData()
  }, [])

  useEffect(() => {
    const handleRefresh = () => {
      const fetchPageData = async () => {
        try {
          const data = await pagesService.getWithSections('people-partners')
          setPageData(data)
        } catch (error) {
          console.error('Error fetching people partners page data:', error)
          setPageData(null)
        }
      }
      fetchPageData()
    }
    window.addEventListener('refresh-page', handleRefresh)
    return () => window.removeEventListener('refresh-page', handleRefresh)
  }, [])

  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader currentPage="people-partners" />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="people-partners" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" text="Loading partners page..." />
              </div>
            ) : (
              <>
                {/* Creative Hero Section */}
                <CreativeHeroSection data={pageData?.sections.find(s => s.section_type === 'hero_simple')?.section_data} />

                {/* Challenge and Solution Section */}
                <div id="challenge-solution">
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
                                  <span className="text-sm font-semibold text-orange-500">
                                    {(pageData?.sections.find(s => s.section_type === 'problem_cards')?.section_data as any)?.challenge?.badgeText || 'The Challenge'}
                                  </span>
                                </div>
                                <H2>
                                  {(pageData?.sections.find(s => s.section_type === 'problem_cards')?.section_data as any)?.challenge?.title || 'The Disconnect of Traditional Consulting'}
                                </H2>
                              </div>
                              
                              <div className="relative w-full">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-orange-500/10 to-transparent rounded-3xl"></div>
                                <div className="relative p-8 sm:p-12 lg:p-16 rounded-3xl border border-orange-500/20 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm">
                                  <div className="max-w-5xl lg:max-w-[1144px] mx-auto">
                                    <P className="text-lg leading-relaxed text-center">
                                      {(pageData?.sections.find(s => s.section_type === 'problem_cards')?.section_data as any)?.challenge?.statement || "Large-scale projects often require the horsepower of a dedicated consulting firm. However, traditional engagements can be disjointed. External firms often work in their own systems, leading to siloed communication, a painful knowledge transfer process at the end of the project, and a lack of real integration with your team."}
                                    </P>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Our Solution Section - Single Container */}
                          <div id="our-solution-section" className="relative">
                            <Card className="border-border bg-transparent">
                              <CardContent className="p-6">
                                <div className="space-y-12">
                                  {/* Header Section */}
                                  <div className="text-center space-y-8">
                                    <div className="space-y-4">
                                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
                                        <Users className="w-5 h-5 text-primary" />
                                        <span className="text-sm font-semibold text-primary">
                                          {(pageData?.sections.find(s => s.section_type === 'problem_cards')?.section_data as any)?.solution?.badgeText || 'Our Solution: A Natively Integrated Partnership'}
                                        </span>
                                      </div>
                                      <H2>
                                        {(pageData?.sections.find(s => s.section_type === 'problem_cards')?.section_data as any)?.solution?.subtitle || 'A New Model for Consulting Engagement'}
                                      </H2>
                                    </div>
                                    
                                    <BodyLarge className="text-muted-foreground leading-relaxed text-center text-lg max-w-5xl mx-auto">
                                      {(pageData?.sections.find(s => s.section_type === 'problem_cards')?.section_data as any)?.solution?.description || 'Our Partner Network consists of leading, highly specialized consulting firms who are experts on the Elevation AI platform. This creates a fundamentally better engagement model, providing a level of integrated expertise that a single expert cannot offer.'}
                                    </BodyLarge>
                                  </div>

                                  {/* Process Flow Section */}
                                  <div className="space-y-8">
                                    {/* Three Column Process Flow */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                      {((pageData?.sections.find(s => s.section_type === 'problem_cards')?.section_data as any)?.solution?.processSteps || [
                                        {
                                          title: 'A Unified Workspace',
                                          description: 'Instead of working in separate systems, our partners embed directly into your Elevation AI Workspaces. This creates a single, shared environment for all communication, deliverables, and project management, providing you with unprecedented transparency.',
                                          icon: 'building-2-line'
                                        },
                                        {
                                          title: 'No Lost Knowledge',
                                          description: 'Because the entire engagement happens on your platform, all of the work product, research, and strategic insights generated by the consulting team are automatically captured in your private Knowledge Base. When the project ends, the knowledge stays with you.',
                                          icon: 'shield-check-line'
                                        },
                                        {
                                          title: 'Accelerated Execution',
                                          description: 'Our partners leverage our platform\'s library of pre-built agents and workflows to deliver results faster. They spend less time on manual data gathering and more time on high-value strategic work, resulting in a more efficient and impactful engagement.',
                                          icon: 'zap-line'
                                        }
                                      ]).map((step: Record<string, unknown>, index: number) => (
                                        <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50 transition-colors duration-300 relative overflow-hidden h-full bg-transparent">
                                          {/* Background Pattern */}
                                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                          
                                          <CardHeader className="pb-4 relative z-10">
                                            <div className="flex items-center gap-3 mb-3">
                                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                                {step.icon === 'building-2-line' && <Building2 className="w-5 h-5 text-primary" />}
                                                {step.icon === 'shield-check-line' && <Shield className="w-5 h-5 text-primary" />}
                                                {step.icon === 'zap-line' && <Zap className="w-5 h-5 text-primary" />}
                                              </div>
                                              <CardTitle className="text-base">{typeof step.title === 'string' ? step.title : 'Step'}</CardTitle>
                                            </div>
                                          </CardHeader>
                                          <CardContent className="relative z-10">
                                            <P className="text-muted-foreground leading-relaxed">
                                              {typeof step.description === 'string' ? step.description : 'Description'}
                                            </P>
                                          </CardContent>
                                        </Card>
                                      ))}
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
                                      <span className="text-sm font-semibold text-primary">
                                        {(pageData?.sections.find(s => s.section_type === 'approach_cards')?.section_data as any)?.badgeText || 'Who This Is For'}
                                      </span>
                                    </div>
                                    
                                    <div>
                                      <H2>
                                        {(pageData?.sections.find(s => s.section_type === 'approach_cards')?.section_data as any)?.title || 'Strategic Horsepower for Your Biggest Initiatives'}
                                      </H2>
                                      <P className="text-muted-foreground leading-relaxed text-lg">
                                        {(pageData?.sections.find(s => s.section_type === 'approach_cards')?.section_data as any)?.description || 'Our Partner Network is ideal for organizations undertaking:'}
                                      </P>
                                    </div>
                                  </div>
                                  
                                  {/* Tunnel Shader Animation Container - Fills remaining height */}
                                  <div className="flex-1 w-full rounded-lg overflow-hidden mt-6 h-[400px] sm:h-auto flex flex-col items-center justify-center bg-muted/5 relative">
                                    {/* E-AI-Square Logo - Centered in container */}
                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                      <Image
                                        src={(pageData?.sections.find(s => s.section_type === 'approach_cards')?.section_data as any)?.logoImage || "/images/branding/E-AI-Sqaure.svg"}
                                        alt="Elevation AI Logo"
                                        width={123}
                                        height={123}
                                        className="w-[123px] h-[123px] dark:brightness-0 dark:invert"
                                        priority
                                      />
                                    </div>
                                    
                                    {/* Tunnel Shader Animation */}
                                    <div className="w-full h-full max-w-full max-h-full">
                                      <TunnelShader />
                                    </div>
                                  </div>
                                </div>

                                {/* Right Column - Four Characteristic Cards */}
                                <div className="space-y-6">
                                  {((pageData?.sections.find(s => s.section_type === 'approach_cards')?.section_data as any)?.characteristics || [
                                    {
                                      number: '1',
                                      title: 'Large-Scale Transformation',
                                      description: 'Large-scale digital or agentic transformation projects.'
                                    },
                                    {
                                      number: '2',
                                      title: 'Post-Merger Integration',
                                      description: 'Post-merger integration for a newly acquired company.'
                                    },
                                    {
                                      number: '3',
                                      title: 'New Market Entry',
                                      description: 'The rollout of a new product or entry into a new market.'
                                    },
                                    {
                                      number: '4',
                                      title: 'Operational Overhaul',
                                      description: 'A comprehensive operational overhaul to prepare for an exit.'
                                    }
                                  ]).map((characteristic: Record<string, unknown>, index: number) => (
                                    <Card key={index} className="border-border/50 bg-transparent">
                                      <CardHeader className="pb-3">
                                        <CardTitle className="text-base font-semibold flex items-center gap-3">
                                          <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">{typeof characteristic.number === 'string' ? characteristic.number : '1'}</span>
                                          {typeof characteristic.title === 'string' ? characteristic.title : 'Title'}
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <P className="text-muted-foreground leading-relaxed text-sm">
                                          {typeof characteristic.description === 'string' ? characteristic.description : 'Description'}
                                        </P>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </Container>
                  </Section>
                </div>

                {/* Partner Network Section */}
                <div id="partner-network">
                  <Section paddingY="lg" className={(pageData?.sections.find(s => s.section_type === 'solutions_carousel')?.section_data as any)?.backgroundColor || 'bg-green-500/10 dark:bg-green-500/15'}>
                    <Container size="2xl">
                      <div className="space-y-12">
                        {/* Header */}
                        <div className="text-center space-y-6">
                          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 rounded-full border border-green-500/20">
                            <Handshake className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-semibold text-green-500">
                              {(pageData?.sections.find(s => s.section_type === 'solutions_carousel')?.section_data as any)?.badgeText || 'Partner Network'}
                            </span>
                          </div>
                          <H1>
                            {(pageData?.sections.find(s => s.section_type === 'solutions_carousel')?.section_data as any)?.title || 'Trusted Consulting Partners'}
                          </H1>
                          <BodyLarge className="text-muted-foreground leading-relaxed max-w-3xl mx-auto text-lg">
                            {(pageData?.sections.find(s => s.section_type === 'solutions_carousel')?.section_data as any)?.description || 'Our Partner Network consists of leading consulting firms and agencies that are experts on the Elevation AI platform, bringing deep domain expertise and full team resources to solve your most complex challenges.'}
                          </BodyLarge>
                        </div>

                        {/* Partner Categories Carousel */}
                        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
                          <PeopleCarousel
                            cardStyle="green"
                            indicatorColor="green"
                            items={(pageData?.sections.find(s => s.section_type === 'solutions_carousel')?.section_data as any)?.partnerCategories?.map((category: Record<string, unknown>) => ({
                              id: category.id,
                              title: category.title,
                              description: category.description,
                              icon: category.icon === 'building-2-line' ? Building2 : 
                                    category.icon === 'shield-check-line' ? Shield : 
                                    category.icon === 'global-line' ? Globe : 
                                    category.icon === 'handshake-line' ? Handshake : Building2,
                              content: (
                                <div className="flex flex-wrap gap-2">
                                  {(Array.isArray(category.specialties) ? category.specialties : []).map((specialty: string) => (
                                    <Badge key={specialty} variant="secondary" className="text-sm bg-green-500/10 text-green-500 border-green-500/20">
                                      {specialty}
                                    </Badge>
                                  ))}
                                </div>
                              )
                            })) || [
                              {
                                id: 'digital-transformation',
                                title: 'Digital Transformation',
                                description: 'Strategic guidance on large-scale digital transformation initiatives and change management.',
                                icon: Building2,
                                content: (
                                  <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="text-sm bg-green-500/10 text-green-500 border-green-500/20">Strategy</Badge>
                                    <Badge variant="secondary" className="text-sm bg-green-500/10 text-green-500 border-green-500/20">Change Management</Badge>
                                    <Badge variant="secondary" className="text-sm bg-green-500/10 text-green-500 border-green-500/20">Implementation</Badge>
                                    <Badge variant="secondary" className="text-sm bg-green-500/10 text-green-500 border-green-500/20">ROI Analysis</Badge>
                                  </div>
                                )
                              },
                              {
                                id: 'merger-integration',
                                title: 'Merger & Integration',
                                description: 'Expert support for post-merger integration and organizational restructuring.',
                                icon: GitMerge,
                                content: (
                                  <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="text-sm bg-green-500/10 text-green-500 border-green-500/20">Integration Planning</Badge>
                                    <Badge variant="secondary" className="text-sm bg-green-500/10 text-green-500 border-green-500/20">Due Diligence</Badge>
                                    <Badge variant="secondary" className="text-sm bg-green-500/10 text-green-500 border-green-500/20">Cultural Alignment</Badge>
                                    <Badge variant="secondary" className="text-sm bg-green-500/10 text-green-500 border-green-500/20">System Integration</Badge>
                                  </div>
                                )
                              },
                              {
                                id: 'market-expansion',
                                title: 'Market Expansion',
                                description: 'Strategic support for new market entry and product rollout initiatives.',
                                icon: Globe,
                                content: (
                                  <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="text-sm bg-green-500/10 text-green-500 border-green-500/20">Market Research</Badge>
                                    <Badge variant="secondary" className="text-sm bg-green-500/10 text-green-500 border-green-500/20">Go-to-Market</Badge>
                                    <Badge variant="secondary" className="text-sm bg-green-500/10 text-green-500 border-green-500/20">Partnership Development</Badge>
                                    <Badge variant="secondary" className="text-sm bg-green-500/10 text-green-500 border-green-500/20">Launch Strategy</Badge>
                                  </div>
                                )
                              },
                              {
                                id: 'exit-preparation',
                                title: 'Exit Preparation',
                                description: 'Comprehensive operational overhaul and preparation for successful exits.',
                                icon: Handshake,
                                content: (
                                  <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="text-sm bg-green-500/10 text-green-500 border-green-500/20">Operational Excellence</Badge>
                                    <Badge variant="secondary" className="text-sm bg-green-500/10 text-green-500 border-green-500/20">Financial Optimization</Badge>
                                    <Badge variant="secondary" className="text-sm bg-green-500/10 text-green-500 border-green-500/20">Due Diligence Prep</Badge>
                                    <Badge variant="secondary" className="text-sm bg-green-500/10 text-green-500 border-green-500/20">Value Maximization</Badge>
                                  </div>
                                )
                              }
                            ]}
                            autoPlay={(pageData?.sections.find(s => s.section_type === 'solutions_carousel')?.section_data as any)?.carouselSettings?.autoPlay ?? true}
                            autoPlayInterval={(pageData?.sections.find(s => s.section_type === 'solutions_carousel')?.section_data as any)?.carouselSettings?.autoPlayInterval || 5000}
                            showProgressIndicators={(pageData?.sections.find(s => s.section_type === 'solutions_carousel')?.section_data as any)?.carouselSettings?.showProgressIndicators ?? true}
                            cardWidth={(pageData?.sections.find(s => s.section_type === 'solutions_carousel')?.section_data as any)?.carouselSettings?.cardWidth || 320}
                            cardGap={(pageData?.sections.find(s => s.section_type === 'solutions_carousel')?.section_data as any)?.carouselSettings?.cardGap || 24}
                            highlightActiveCard={(pageData?.sections.find(s => s.section_type === 'solutions_carousel')?.section_data as any)?.carouselSettings?.highlightActiveCard ?? true}
                            className="w-full"
                            naturalScroll={(pageData?.sections.find(s => s.section_type === 'solutions_carousel')?.section_data as any)?.carouselSettings?.naturalScroll ?? false}
                            flexibleWidth={(pageData?.sections.find(s => s.section_type === 'solutions_carousel')?.section_data as any)?.carouselSettings?.flexibleWidth ?? true}
                            responsive={{
                              sm: { cardWidth: 320, cardGap: 16 },
                              md: { cardWidth: 320, cardGap: 20 },
                              lg: { cardWidth: 320, cardGap: 24 },
                              xl: { cardWidth: 320, cardGap: 28 },
                              '2xl': { cardWidth: 320, cardGap: 32 }
                            }}
                          />
                        </div>
                      </div>
                    </Container>
                  </Section>
                </div>

                {/* Logo Carousel Section */}
                <LogoCarouselSection data={pageData?.sections.find(s => s.section_type === 'logo_carousel')?.section_data} />

                {/* CTA Section */}
                <div id="connect-partners">
                  <Section paddingY="lg" className={(pageData?.sections.find(s => s.section_type === 'cta')?.section_data as any)?.backgroundColor || 'bg-muted/30'}>
                    <Container size="2xl">
                      <div className="max-w-4xl mx-auto text-center space-y-8">
                        <div className="space-y-4">
                          <H2>
                            {(pageData?.sections.find(s => s.section_type === 'cta')?.section_data as any)?.title || 'Find the Right Partner for Your Next Big Move'}
                          </H2>
                          <P className="text-muted-foreground leading-relaxed">
                            {(pageData?.sections.find(s => s.section_type === 'cta')?.section_data as any)?.description || 'Discover our ecosystem of trusted consulting firms and agencies.'}
                          </P>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          {((pageData?.sections.find(s => s.section_type === 'cta')?.section_data as any)?.ctaButtons || [
                            { text: 'Meet Our Partners', href: '/website/demo', variant: 'default' },
                            { text: 'About Us', href: '/website/about', variant: 'outline' }
                          ]).map((button: Record<string, unknown>, index: number) => (
                            <Button key={index} size="lg" variant={typeof button.variant === 'string' && ["default", "link", "destructive", "outline", "secondary", "ghost"].includes(button.variant) ? button.variant as "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" : "default"} asChild>
                              <Link href={typeof button.href === 'string' ? button.href : '/'}>{typeof button.text === 'string' ? button.text : 'Button'}</Link>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </Container>
                  </Section>
                </div>
              </>
            )}
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
