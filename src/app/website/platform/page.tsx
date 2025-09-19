"use client"

import { useEffect, useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { MainHeader } from "@/components/ui/main-header"
import { LoadingSpinner } from "@/components/ui/loading"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { PlatformSubNav } from "@/components/ui/platform-sub-nav"
import { H1, H2, H3, P } from "@/components/ui/typography"
import { CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { FutureReadyColored } from "@/components/animations"
import { ShaderAnimation } from "@/components/animations/shader-animation"
import { ShaderAnimationLight } from "@/components/animations/shader-animation-light"
import { useThemeProvider } from "@/hooks/use-theme"
import { Carousel, CarouselItem } from "@/components/ui/carousel"
import { PlatformPageCarousel, PlatformCarouselItem } from "@/components/ui/platform-page-carousel"
import { useMediaQuery } from "@/hooks/use-media-query"
import { usePageCache } from '@/hooks/use-page-cache'

// Platform Hero Section Component
function PlatformHeroSection({ data }: { data?: Record<string, unknown> }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  
  // Extract CMS data with fallbacks
  const title = data?.title || 'The Operating System for'
  const titleLine2 = data?.titleLine2 || 'the Agentic Era'
  const description = data?.description || 'The Elevation AI platform is the central, agentic backbone that unifies your universe, provides intelligent workspaces, and securely connects you to the world of AI.'
  const ctaButtons = data?.ctaButtons || [
    { text: 'Get Started', href: '/website/sign-up', variant: 'default' },
    { text: 'Request a Demo', href: '/website/demo', variant: 'outline' }
  ]

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
                  {title}
                  <span className="block">{titleLine2}</span>
               </H1>
              <P className="text-muted-foreground max-w-2xl">
                {description}
              </P>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {ctaButtons.map((button: Record<string, unknown>, index: number) => (
                <Button 
                  key={index}
                  size="lg" 
                  variant={button.variant}
                  asChild 
                  className="text-base sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
                >
                  <Link href={button.href}>
                    {button.text}
                </Link>
              </Button>
              ))}
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

              {/* Future Ready Colored Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <FutureReadyColored 
                  width={isDesktop ? 600 : 280} 
                  height={isDesktop ? 400 : 187} 
                  showBorder={false}
                  className="w-[280px] h-[187px] sm:w-[320px] sm:h-[213px] md:w-[400px] md:h-[267px] lg:w-[600px] lg:h-[400px]"
                />
              </div>

            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}


// Platform Features Section
function PlatformFeaturesSection({ data }: { data?: Record<string, unknown> }) {
  // Extract CMS data with fallbacks
  const title = data?.title || 'Platform Features'
  const description = data?.description || 'Our platform consists of five core features that work together to create a comprehensive AI-powered operating system for your organization.'
  const features = data?.features || []

  return (
    <Section paddingY="lg">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="space-y-16">
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <H1>{title}</H1>
            <P className="text-muted-foreground">
              {description}
            </P>
          </div>

          {/* Dynamic Features */}
          {features.map((feature: Record<string, unknown>, index: number) => (
            <div 
              key={feature.id || index}
              data-section={feature.id} 
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[400px] lg:h-[845px] ${feature.imagePosition === 'left' ? '' : ''}`}
            >
              <div className={`lg:col-span-6 space-y-6 flex flex-col justify-center ${feature.imagePosition === 'left' ? 'order-2 lg:order-2' : 'order-1 lg:order-1'}`}>
                <H2>{feature.title}</H2>
              <P className="text-muted-foreground">
                  {feature.description}
              </P>
              <ul className="space-y-4">
                  {feature.features?.map((item: string, itemIndex: number) => (
                    <li key={itemIndex} className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                      <P className="font-medium">{item}</P>
                </li>
                  ))}
              </ul>
            </div>
              <div className={`lg:col-span-6 h-[300px] lg:h-[845px] rounded-3xl border border-border/50 flex items-center justify-center ${feature.imagePosition === 'left' ? 'order-1 lg:order-1' : 'order-2 lg:order-2'}`}>
                <P className="text-muted-foreground text-lg">{feature.imagePlaceholder}</P>
            </div>
          </div>
          ))}

        </div>
      </Container>
    </Section>
  )
}

// Security Section
function SecuritySection({ data }: { data?: Record<string, unknown> }) {
  // Extract CMS data with fallbacks
  const title = data?.title || 'Enterprise-Grade Security & Compliance'
  const description = data?.description || 'Your data security is our top priority. We implement industry-leading security measures and maintain compliance with the highest standards.'
  const features = data?.features || []
  const carouselSettings = data?.carouselSettings || {}

  // Convert features to carousel items
  const securityFeatures: PlatformCarouselItem[] = features.map((feature: Record<string, unknown>) => ({
    id: feature.id,
    title: feature.title,
    description: feature.description,
      content: (
        <div className="p-6 bg-background/50 rounded-lg border border-border/50 h-full flex flex-col justify-start min-h-[200px]">
          <div className="flex justify-start mb-4">
          <Icon name={feature.icon} size="2xl" className="text-primary text-4xl" />
          </div>
          <P className="text-muted-foreground">
          {feature.description}
          </P>
        </div>
      )
  }))

  return (
    <Section paddingY="lg">
      <Container size="2xl">
        <div className="space-y-12">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <H1>{title}</H1>
            <P className="text-muted-foreground">
              {description}
            </P>
          </div>
          
          {/* Interactive Carousel for All Breakpoints */}
          <div className="-mx-4 sm:-mx-6 lg:-mx-8">
            <PlatformPageCarousel 
              items={securityFeatures}
              autoPlay={carouselSettings.autoPlay ?? true}
              autoPlayInterval={carouselSettings.autoPlayInterval ?? 4000}
              showProgressIndicators={carouselSettings.showProgressIndicators ?? true}
              showGradients={carouselSettings.showGradients ?? false}
              cardWidth={carouselSettings.cardWidth ?? 320}
              cardGap={carouselSettings.cardGap ?? 24}
              className="w-full"
              highlightActiveCard={carouselSettings.highlightActiveCard ?? true}
              hugContent={carouselSettings.hugContent ?? true}
              minHeight={carouselSettings.minHeight ?? "320px"}
              stopWhenAllVisible={carouselSettings.stopWhenAllVisible ?? false}
              naturalScroll={carouselSettings.naturalScroll ?? false}
              flexibleWidth={carouselSettings.flexibleWidth ?? true}
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
  )
}

// Integrations Section
function IntegrationsSection({ data }: { data?: Record<string, unknown> }) {
  // Extract CMS data with fallbacks
  const title = data?.title || 'Connect Your Entire Universe'
  const description = data?.description || 'Elevation AI is built to be the central hub of your operations. We connect with the tools you already use, bringing all your data and workflows into one secure control plane.'
  const categories = data?.categories || []

  return (
    <Section paddingY="lg">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="space-y-12">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <H1>{title}</H1>
            <P className="text-muted-foreground">
              {description}
            </P>
          </div>
          
          {/* Masonry/Pinterest Style Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 relative">
            {/* Mobile connecting line - only visible on mobile */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2 sm:hidden z-0"></div>
            
            {categories.map((category: Record<string, unknown>, index: number) => {
              return (
                <div
                  key={category.id}
                  className="group break-inside-avoid border border-border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-background flex flex-col relative z-10"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={category.icon} size="lg" className="text-primary" />
              </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {category.title}
                      </h3>
            </div>
                    <div className="border-b border-border/50 mb-4"></div>
                    <div className="space-y-4 mb-4">
                      {category.logos.map((logo, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 text-xs text-muted-foreground"
                        >
                          <div className="w-10 h-10 flex items-center justify-center">
                            <Image
                              src={`/images/platform-logos/${logo.file}`}
                              alt={logo.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 object-contain filter dark:brightness-0 dark:invert opacity-80"
                            />
              </div>
                          <span>{logo.name}</span>
            </div>
                      ))}
              </div>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
            </div>
              </div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Use Cases Section
function UseCasesSection({ data }: { data?: Record<string, unknown> }) {
  const { isDark } = useThemeProvider()
  const [mounted, setMounted] = React.useState(false)
  
  // Ensure component is mounted before accessing theme to prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  // Extract CMS data with fallbacks
  const title = data?.title || 'Built for Every Industry, Every Team'
  const description = data?.description || 'From startups to enterprises, Elevation AI adapts to your unique needs and industry requirements.'
  const useCases = data?.useCases || []

  // Determine which colors and component to use based on theme
  // Use default light mode during SSR to prevent hydration mismatch
  const isDarkMode = mounted ? isDark : false
  const ShaderComponent = isDarkMode ? ShaderAnimation : ShaderAnimationLight

  const industryCategories: PlatformCarouselItem[] = useCases.map((useCase: Record<string, unknown>) => ({
    id: useCase.id,
    title: useCase.title,
    description: useCase.description,
      icon: () => (
      <div className={`w-16 h-16 bg-gradient-to-br ${useCase.id === 'sales-marketing' ? 'from-blue-500/10 to-blue-600/10' : useCase.id === 'customer-support' ? 'from-green-500/10 to-green-600/10' : useCase.id === 'product-development' ? 'from-purple-500/10 to-purple-600/10' : useCase.id === 'operations' ? 'from-orange-500/10 to-orange-600/10' : 'from-indigo-500/10 to-indigo-600/10'} rounded-lg flex items-center justify-center`}>
        <Icon name={useCase.icon} size="2xl" className={useCase.id === 'sales-marketing' ? 'text-blue-600' : useCase.id === 'customer-support' ? 'text-green-600' : useCase.id === 'product-development' ? 'text-purple-600' : useCase.id === 'operations' ? 'text-orange-600' : 'text-indigo-600'} />
        </div>
      ),
      content: (
      <Link href={useCase.href} className="block w-full h-full">
        <div className={`w-full h-[120px] sm:h-[140px] md:h-[160px] lg:h-[200px] bg-gradient-to-br ${useCase.id === 'sales-marketing' ? 'from-blue-500 via-cyan-500 to-teal-600' : useCase.id === 'customer-support' ? 'from-green-500 via-emerald-500 to-teal-600' : useCase.id === 'product-development' ? 'from-purple-500 via-violet-500 to-indigo-600' : useCase.id === 'operations' ? 'from-orange-500 via-amber-500 to-yellow-500' : 'from-indigo-500 via-blue-500 to-cyan-500'} relative hover:opacity-90 transition-all duration-300 group overflow-hidden rounded-b-lg`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${useCase.id === 'sales-marketing' ? 'from-blue-300 via-cyan-300 to-teal-400' : useCase.id === 'customer-support' ? 'from-green-300 via-emerald-300 to-teal-400' : useCase.id === 'product-development' ? 'from-purple-300 via-violet-300 to-indigo-400' : useCase.id === 'operations' ? 'from-orange-300 via-amber-300 to-yellow-300' : 'from-indigo-300 via-blue-300 to-cyan-300'} opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-150 group-hover:rotate-3`}></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform group-hover:translate-x-full group-hover:-translate-y-full"></div>
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
              <Icon name="arrow-right-line" size="lg" className="text-white" />
            </div>
          </div>
        </Link>
      )
  }))

  return (
    <Section paddingY="lg">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="space-y-12">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <H1>{title}</H1>
            <P className="text-muted-foreground">
              {description}
            </P>
          </div>
          
          {/* Mobile/Tablet Carousel Layout */}
          <div className="lg:hidden -mx-4 sm:-mx-6">
            <div className="overflow-x-auto scrollbar-hide py-4">
              <div className="flex gap-4 px-4 sm:px-6" style={{ width: 'max-content' }}>
                {industryCategories.map((category, index) => {
                  const useCase = useCases[index]
                  return (
                  <div
                    key={category.id}
                    className="flex-shrink-0 w-[280px] sm:w-[300px]"
                    style={{ 
                      height: '280px'
                    }}
                  >
                    <div className="group border border-border rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-transparent relative overflow-hidden h-full min-h-[280px]">
                      <div className="p-6 pb-0">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {category.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {category.description}
                        </p>
                        <div className="text-left">
                          <div className={`w-16 h-16 bg-gradient-to-br ${category.id === 'sales-marketing' ? 'from-blue-500/10 to-blue-600/10' : category.id === 'customer-support' ? 'from-green-500/10 to-green-600/10' : category.id === 'product-development' ? 'from-purple-500/10 to-purple-600/10' : category.id === 'operations' ? 'from-orange-500/10 to-orange-600/10' : 'from-indigo-500/10 to-indigo-600/10'} rounded-lg flex items-center justify-center`}>
                            <Icon name={category.id === 'sales-marketing' ? 'line-chart-line' : category.id === 'customer-support' ? 'customer-service-line' : category.id === 'product-development' ? 'code-s-slash-line' : category.id === 'operations' ? 'settings-3-line' : 'microscope-line'} size="2xl" className={category.id === 'sales-marketing' ? 'text-blue-600' : category.id === 'customer-support' ? 'text-green-600' : category.id === 'product-development' ? 'text-purple-600' : category.id === 'operations' ? 'text-orange-600' : 'text-indigo-600'} />
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0">
                        <Link href={useCase.href} className="block w-full h-full">
                          <div className="w-full h-[60px] relative hover:opacity-90 transition-all duration-300 group overflow-hidden rounded-b-lg">
                            <ShaderComponent 
                              className="absolute inset-0 w-full h-full"
                              width={320}
                              height={60}
                              colors={useCase.colors}
                            />
                            <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/20' : 'bg-white/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
                              <Icon name="arrow-right-line" size="lg" className={isDarkMode ? 'text-white' : 'text-gray-700'} />
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Desktop Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {industryCategories.map((category, index) => {
              const useCase = useCases[index]
              // Get the appropriate icon, color, and gradient for each category
              let iconName = "line-chart-line"
              let gradientClass = "from-blue-500/10 to-blue-600/10"
              let iconColor = "text-blue-600"
              let imageGradient = "from-slate-500 via-gray-500 to-zinc-600"
              
              switch (category.id) {
                case "sales-marketing": 
                  iconName = "line-chart-line"
                  gradientClass = "from-blue-500/10 to-blue-600/10"
                  iconColor = "text-blue-600"
                  imageGradient = "from-blue-500 via-cyan-500 to-teal-600"
                  break
                case "customer-support": 
                  iconName = "customer-service-line"
                  gradientClass = "from-green-500/10 to-green-600/10"
                  iconColor = "text-green-600"
                  imageGradient = "from-green-500 via-emerald-500 to-teal-600"
                  break
                case "product-development": 
                  iconName = "code-s-slash-line"
                  gradientClass = "from-purple-500/10 to-purple-600/10"
                  iconColor = "text-purple-600"
                  imageGradient = "from-purple-500 via-violet-500 to-indigo-600"
                  break
                case "operations": 
                  iconName = "settings-3-line"
                  gradientClass = "from-orange-500/10 to-orange-600/10"
                  iconColor = "text-orange-600"
                  imageGradient = "from-orange-500 via-amber-500 to-yellow-500"
                  break
                case "research-development": 
                  iconName = "microscope-line"
                  gradientClass = "from-indigo-500/10 to-indigo-600/10"
                  iconColor = "text-indigo-600"
                  imageGradient = "from-indigo-500 via-blue-500 to-cyan-500"
                  break
                default:
                  iconName = "line-chart-line"
                  gradientClass = "from-blue-500/10 to-blue-600/10"
                  iconColor = "text-blue-600"
                  imageGradient = "from-slate-500 via-gray-500 to-zinc-600"
              }
              
              return (
                <div
                  key={category.id}
                  className="group border border-border rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-transparent relative overflow-hidden min-h-[400px]"
                >
                  <div className="p-6 pb-0">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="text-left">
                      <div className={`w-16 h-16 bg-gradient-to-br ${gradientClass} rounded-lg flex items-center justify-center`}>
                        <Icon name={iconName} size="2xl" className={iconColor} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0">
                    <Link href={useCase.href} className="block w-full h-full">
                      <div className="w-full h-[60px] sm:h-[70px] md:h-[120px] lg:h-[180px] relative hover:opacity-90 transition-all duration-300 group overflow-hidden rounded-b-lg">
                        <ShaderComponent 
                          className="absolute inset-0 w-full h-full"
                          width={400}
                          height={180}
                          colors={useCase.colors}
                        />
                        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/20' : 'bg-white/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
                          <Icon name="arrow-right-line" size="lg" className={isDarkMode ? 'text-white' : 'text-black'} />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}

// CTA Section
function CTASection({ data }: { data?: Record<string, unknown> }) {
  // Extract CMS data with fallbacks
  const title = data?.title || 'Ready to Transform Your Organization?'
  const description = data?.description || 'Custom plans built for your organization\'s specific needs and growth trajectory. Join thousands of organizations already using Elevation AI to unlock the power of intelligent automation.'
  const ctaButtons = data?.ctaButtons || [
    { text: 'Get Started', href: '/website/sign-up', variant: 'default' },
    { text: 'Get Custom Pricing', href: '/website/pricing', variant: 'outline' }
  ]
  const backgroundColor = data?.backgroundColor || 'bg-muted/30'

  return (
    <Section paddingY="lg" className={backgroundColor}>
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <H1>{title}</H1>
            <P className="text-muted-foreground leading-relaxed">
              {description}
            </P>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctaButtons.map((button: Record<string, unknown>, index: number) => (
              <Button key={index} size="lg" variant={button.variant} asChild>
                <Link href={button.href}>
                  {button.text}
              </Link>
            </Button>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default function WireframesPlatformPage() {
  // Use the page cache hook for intelligent loading
  const { pageData, isLoading: loading } = usePageCache({ 
    pageId: 'platform',
    enableCache: true
  })

  // Handle scroll to section on page load with hash
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash
      if (hash) {
        // Remove the # from the hash
        const targetId = hash.substring(1)
        const targetElement = document.getElementById(targetId)
        
        if (targetElement) {
          // Add a small delay to ensure the page is fully rendered
          setTimeout(() => {
            const offset = 120 // Account for header height
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY
            const offsetPosition = elementPosition - offset
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }, 100)
        }
      }
    }

    // Handle initial load
    handleHashScroll()

    // Handle hash changes (in case user navigates with hash)
    window.addEventListener('hashchange', handleHashScroll)

    return () => {
      window.removeEventListener('hashchange', handleHashScroll)
    }
  }, [])

  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader currentPage="platform" />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="platform" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          {/* Sticky Sub Navigation */}
          <PlatformSubNav />
          
          <main>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" text="Loading platform..." />
              </div>
            ) : (
              <>
                {/* Platform Hero Section */}
                <PlatformHeroSection data={pageData?.sections.find(s => s.section_type === 'platform_hero')?.section_data} />

                {/* Platform Features Section */}
                <div id="features" className="pt-14">
                  <PlatformFeaturesSection data={pageData?.sections.find(s => s.section_type === 'platform_features')?.section_data} />
                </div>

                {/* Security Section */}
                <div id="security" className="pt-14">
                  <SecuritySection data={pageData?.sections.find(s => s.section_type === 'security_features')?.section_data} />
                </div>

                {/* Integrations Section */}
                <div id="integrations" className="pt-14">
                  <IntegrationsSection data={pageData?.sections.find(s => s.section_type === 'integrations_grid')?.section_data} />
                </div>

                {/* Use Cases Section */}
                <UseCasesSection data={pageData?.sections.find(s => s.section_type === 'use_cases_carousel')?.section_data} />

                {/* CTA Section */}
                <CTASection data={pageData?.sections.find(s => s.section_type === 'platform_cta')?.section_data} />
              </>
            )}
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
