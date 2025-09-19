"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { MainHeader } from "@/components/ui/main-header"
import { LoadingSpinner } from "@/components/ui/loading"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { H1, H2, H3, H4, BodyLarge, P } from "@/components/ui/typography"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { GrowthAnimation } from "@/components/animations/growth-animation"
import { ConsultationRequestModal } from "@/components/ui/consultation-request-modal"
import { pagesService } from "@/lib/cms"
import { PageWithSections } from "@/types/cms"

// Pricing Hero Section Component
function PricingHeroSection({ onOpenConsultation, data }: { onOpenConsultation: () => void, data?: Record<string, unknown> }) {
  // Extract CMS data with fallbacks
  const title = typeof data?.title === 'string' ? data.title : 'Transparent Pricing for Every Organization'
  const description = typeof data?.description === 'string' ? data.description : 'Our platform is not one-size-fits-all, and neither is our pricing. We believe in a transparent, value-aligned model that provides the specific capabilities you need to succeed.'
  const ctaButtons = Array.isArray(data?.ctaButtons) ? data.ctaButtons as unknown[] : [
    { text: 'Get a Custom Quote', href: '#consultation', variant: 'default', action: 'openConsultation' },
    { text: 'Request a Demo', href: '/website/demo', variant: 'outline' }
  ]
  const logoPath = typeof data?.logoPath === 'string' ? data.logoPath : '/images/branding/E-AI-Circle.svg'

  return (
    <Section 
      paddingY="md" 
      className="flex items-center pt-8 sm:pt-10 lg:pt-12 pb-4 sm:pb-6 lg:pb-8 relative overflow-hidden"
    >
      <Container size="2xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <H1 className="lg:hidden">
                {title}
              </H1>
              <H2 className="hidden lg:block">
                {title}
              </H2>
              <BodyLarge className="text-muted-foreground max-w-2xl">
                {description}
              </BodyLarge>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {ctaButtons.map((button: unknown, index: number) => { const btn = button as Record<string, unknown>; return (
                <Button 
                  key={index}
                  size="lg" 
                  variant={btn.variant as any}
                  onClick={btn.action === 'openConsultation' ? onOpenConsultation : undefined}
                  asChild={!btn.action}
                  className="text-base sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto cursor-pointer group"
                >
                  {btn.action === 'openConsultation' ? (
                    <>
                      {typeof btn.text === 'string' ? btn.text : 'Button'}
                      <Icon name="calendar-line" className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:scale-110" />
                    </>
                  ) : (
                    <Link href={typeof btn.href === 'string' ? btn.href : '/'}>
                      {typeof btn.text === 'string' ? btn.text : 'Button'}
                    </Link>
                  )}
                </Button>
              ); })}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Main Visual Container */}
              <div className="relative h-[132px] sm:h-[149px] md:h-[165px] lg:h-[198px] rounded-3xl bg-gradient-to-br from-background/50 to-background/30 border border-border/50 overflow-hidden backdrop-blur-sm">
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
              
              {/* E-AI-Circle Logo - Centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
                  <Image
                    src={logoPath}
                    alt="Elevation AI Logo"
                    fill
                    className="object-contain dark:invert invert-0"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// How It Works Section (Mobile: Full width, Desktop: Left column)
function HowItWorksSection({ data }: { data?: Record<string, unknown> }) {
  // Extract CMS data with fallbacks
  const title = typeof data?.title === 'string' ? data.title : 'How It Works'
  const description = typeof data?.description === 'string' ? data.description : 'Three simple steps to get your custom plan'
  const cards = Array.isArray(data?.cards) ? data.cards as unknown[] : [
    {
      title: 'Tell Us About Your Universe',
      description: 'Share key details about your organization and core needs.',
      icon: 'user-line'
    },
    {
      title: 'Select Your Core Capabilities',
      description: 'Select platform features and support levels that match your goals.',
      icon: 'settings-line'
    },
    {
      title: 'Receive Your Custom Plan',
      description: 'Get your custom plan and pricing estimate ready for review.',
      icon: 'file-text-line'
    }
  ]

  return (
    <Section paddingY="none" className="bg-muted/30 pb-0 lg:hidden">
      <Container size="2xl" className="py-6 lg:py-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <H2>{title}</H2>
            {description && (
              <P className="text-muted-foreground">{description}</P>
            )}
          </div>

          {/* Three Steps */}
          <div className="space-y-4">
            {cards.map((card: unknown, index: number) => { const c = card as Record<string, unknown>; return (
              <Card key={index} className="group hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                <CardContent className="px-4 py-3 flex flex-col">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold text-lg">{index + 1}</span>
                    </div>
                    <H4 className="text-base">{typeof c.title === 'string' ? c.title : 'Title'}</H4>
                  </div>
                  <P className="text-muted-foreground text-sm leading-relaxed">
                    {typeof c.description === 'string' ? c.description : 'Description'}
                  </P>
                </CardContent>
              </Card>
            ); })}
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Get Custom Quote Section (Mobile: Full width with animation, Desktop: Right column)
function GetCustomQuoteSection({ onOpenConsultation, data }: { onOpenConsultation: () => void, data?: Record<string, unknown> }) {
  // Extract CMS data with fallbacks
  const title = typeof data?.title === 'string' ? data.title : 'Get a Custom Quote'
  const description = typeof data?.description === 'string' ? data.description : 'Schedule a consultation to receive your personalized pricing'
  const ctaButton = (data?.ctaButton as Record<string, unknown>) || { text: 'Get a Custom Quote', action: 'openConsultation' }
  const hasAnimation = data?.hasAnimation !== false
  const animationType = typeof data?.animationType === 'string' ? data.animationType : 'growth'

  return (
    <div className="relative overflow-hidden min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] pb-0 lg:hidden">
      {/* Background Animation */}
      {hasAnimation && (
        <div className="absolute inset-0">
          <GrowthAnimation className="w-full h-full" />
        </div>
      )}
      
      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl mx-auto">
          <div className="text-center group">
            <div className="inline-block bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <Button size="lg" onClick={onOpenConsultation} className="flex items-center mx-auto cursor-pointer group">
                {typeof ctaButton.text === 'string' ? ctaButton.text : 'Button'}
                <Icon name="calendar-line" className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:scale-110" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Desktop Combined Section (Side-by-side layout)
function DesktopCombinedSection({ onOpenConsultation, howItWorksData, quoteData }: { onOpenConsultation: () => void, howItWorksData?: Record<string, unknown>, quoteData?: Record<string, unknown> }) {
  // Extract CMS data with fallbacks
  const howItWorksTitle = typeof howItWorksData?.title === 'string' ? howItWorksData.title : 'How It Works'
  const howItWorksCards = Array.isArray(howItWorksData?.cards) ? howItWorksData.cards as unknown[] : [
    {
      title: 'Tell Us About Your Universe',
      description: 'Share key details about your organization and core needs.',
      icon: 'user-line'
    },
    {
      title: 'Select Your Core Capabilities',
      description: 'Select platform features and support levels that match your goals.',
      icon: 'settings-line'
    },
    {
      title: 'Receive Your Custom Plan',
      description: 'Get your custom plan and pricing estimate ready for review.',
      icon: 'file-text-line'
    }
  ]
  const quoteButton = (quoteData?.ctaButton as Record<string, unknown>) || { text: 'Get a Custom Quote', action: 'openConsultation' }

  return (
    <Section 
      paddingY="none"
      className="relative overflow-hidden min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] flex items-center pb-0 hidden lg:flex"
    >
      {/* Left Column - How It Works */}
      <div className="absolute inset-y-0 left-0 w-1/4 bg-muted/30"></div>
      {/* Right Column - Background Animation */}
      <div className="absolute inset-y-0 right-0 w-3/4">
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <div className="w-full h-full aspect-square max-w-none">
            <GrowthAnimation className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Content Overlay */}
      <Container size="2xl" className="relative z-10 h-full py-6 lg:py-8 pb-0">
        <div className="grid grid-cols-4 gap-0 h-full">
          {/* Left Column - How It Works (1 column) */}
          <div className="col-span-1 flex items-center pl-1 pr-12 py-8 pb-0">
            <div className="w-full space-y-6">
              <div className="space-y-4">
                <H2>{howItWorksTitle}</H2>
              </div>

              {/* Three Steps */}
              <div className="space-y-4">
                {howItWorksCards.map((card: unknown, index: number) => { const c = card as Record<string, unknown>; return (
                  <Card key={index} className="group hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <CardContent className="px-4 py-3 flex flex-col">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-semibold text-lg">{index + 1}</span>
                        </div>
                        <H4 className="text-base">{typeof c.title === 'string' ? c.title : 'Title'}</H4>
                      </div>
                      <P className="text-muted-foreground text-sm leading-relaxed">
                        {typeof c.description === 'string' ? c.description : 'Description'}
                      </P>
                    </CardContent>
                  </Card>
                ); })}
              </div>
            </div>
          </div>

          {/* Right Column - Get Custom Quote (3 columns) */}
          <div className="col-span-3 flex items-center justify-center p-8 pb-0">
            <div className="text-center group">
              <div className="inline-block bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <Button size="lg" onClick={onOpenConsultation} className="flex items-center mx-auto cursor-pointer group">
                  {typeof quoteButton.text === 'string' ? quoteButton.text : 'Button'}
                  <Icon name="calendar-line" className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:scale-110" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// CTA Section
function CTASection({ data }: { data?: Record<string, unknown> }) {
  // Extract CMS data with fallbacks
  const title = typeof data?.title === 'string' ? data.title : 'Ready to Transform Your Operations?'
  const description = typeof data?.description === 'string' ? data.description : 'Discover how Elevation AI can unify your knowledge, secure your operations, and orchestrate intelligent workflows across your organization.'
  const ctaButtons = Array.isArray(data?.ctaButtons) ? data.ctaButtons as unknown[] : [
    { text: 'Request a Demo', href: '/website/demo', variant: 'default' },
    { text: 'Get in Touch', href: '/website/contact', variant: 'outline' }
  ]
  const backgroundColor = typeof data?.backgroundColor === 'string' ? data.backgroundColor : 'bg-muted/30'

  return (
    <div className={`${backgroundColor} -mt-px`}>
      <Container size="2xl" className="py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <H2>{title}</H2>
            <P className="text-muted-foreground leading-relaxed">
              {description}
            </P>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctaButtons.map((button: unknown, index: number) => { 
              const btn = button as Record<string, unknown>; 
              const v = typeof btn.variant === "string" ? (btn.variant as any) : undefined;
              return (
              <Button key={index} size="lg" variant={v} asChild>
                <Link href={typeof btn.href === 'string' ? btn.href : '/'}>
                  {typeof btn.text === 'string' ? btn.text : 'Button'}
                </Link>
              </Button>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default function PricingPage() {
  const [isConsultationOpen, setIsConsultationOpen] = React.useState(false)
  const [pageData, setPageData] = useState<PageWithSections | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const data = await pagesService.getWithSections('pricing')
        setPageData(data)
      } catch (error) {
        console.error('Error fetching pricing page data:', error)
        setPageData(null) // Fallback to static content
      } finally {
        setLoading(false)
      }
    }
    fetchPageData()
  }, [])

  // Add refresh mechanism for admin updates
  useEffect(() => {
    const handleRefresh = () => {
      const fetchPageData = async () => {
        try {
          const data = await pagesService.getWithSections('pricing')
          setPageData(data)
        } catch (error) {
          console.error('Error fetching pricing page data:', error)
          setPageData(null)
        }
      }
      fetchPageData()
    }
    window.addEventListener('refresh-page', handleRefresh)
    return () => window.removeEventListener('refresh-page', handleRefresh)
  }, [])

  const handleOpenConsultation = () => {
    setIsConsultationOpen(true)
  }

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false)
  }

  // Extract section data
  const heroData = pageData?.sections?.find(s => s.section_type === 'hero_simple')?.section_data || undefined
  const howItWorksData = pageData?.sections?.find(s => s.section_type === 'problem_cards')?.section_data || undefined
  const quoteData = pageData?.sections?.find(s => s.section_type === 'cta' && s.section_order === 3)?.section_data || undefined
  const ctaData = pageData?.sections?.find(s => s.section_type === 'cta' && s.section_order === 4)?.section_data || undefined

  if (loading) {
    return (
      <PageWrapper>
        <MobileOnlyLayout
          header={<MainHeader currentPage="pricing" />}
          footer={<WebsiteFooter />}
          mobileMenu={<MobileMenuDrawer currentPage="pricing" />}
        >
          <div className="bg-background transition-colors duration-300">
            <main className="flex items-center justify-center min-h-screen">
                <LoadingSpinner size="lg" text="Loading pricing page..." />
            </main>
          </div>
        </MobileOnlyLayout>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader currentPage="pricing" />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="pricing" />}
      >
        <div className="bg-background transition-colors duration-300">
          <main>
            {/* Pricing Hero Section */}
            <PricingHeroSection onOpenConsultation={handleOpenConsultation} data={heroData} />
            
            {/* Mobile Layout - Stacked Sections */}
            <HowItWorksSection data={howItWorksData} />
            <GetCustomQuoteSection onOpenConsultation={handleOpenConsultation} data={quoteData} />
            
            {/* Desktop Layout - Side-by-Side Section */}
            <DesktopCombinedSection 
              onOpenConsultation={handleOpenConsultation} 
              howItWorksData={howItWorksData}
              quoteData={quoteData}
            />
            
            <CTASection data={ctaData} />
          </main>
        </div>

        {/* Consultation Request Modal */}
        <ConsultationRequestModal 
          isOpen={isConsultationOpen} 
          onClose={handleCloseConsultation} 
        />
      </MobileOnlyLayout>
    </PageWrapper>
  )
}