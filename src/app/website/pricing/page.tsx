"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { H1, H2, H3, H4, BodyLarge, P } from "@/components/ui/typography"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import Link from "next/link"
import React from "react"
import Image from "next/image"
import { GrowthAnimation } from "@/components/animations/growth-animation"
import { PricingCalculatorModal } from "@/components/ui/pricing-calculator-modal"

// Pricing Hero Section Component
function PricingHeroSection({ onOpenCalculator }: { onOpenCalculator: () => void }) {
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
                Transparent Pricing for Every Organization
              </H1>
              <H2 className="hidden lg:block">
                Transparent Pricing for Every Organization
              </H2>
              <BodyLarge className="text-muted-foreground max-w-2xl">
                Our platform is not one-size-fits-all, and neither is our pricing. We believe in a transparent, value-aligned model that provides the specific capabilities you need to succeed.
              </BodyLarge>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" onClick={onOpenCalculator} className="text-base sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto cursor-pointer group">
                Build Your Custom Plan
                <Icon name="calculator-line" className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:scale-110" />
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                <Link href="/website/demo">
                  Request a Demo
                </Link>
              </Button>
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
                    src="/images/branding/E-AI-Circle.svg"
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
function HowItWorksSection() {
  return (
    <Section paddingY="none" className="bg-muted/30 pb-0 lg:hidden">
      <Container size="2xl" className="py-8 lg:py-16">
        <div className="space-y-8">
          <div className="space-y-6">
            <H2>How It Works</H2>
          </div>

          {/* Three Steps */}
          <div className="space-y-6">
            {/* Step 1 */}
            <Card className="group hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-semibold text-lg">1</span>
                  </div>
                  <H4 className="text-base">Tell Us About Your Universe</H4>
                </div>
                <P className="text-muted-foreground text-sm leading-relaxed">
                  Share key details about your organization and core needs.
                </P>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="group hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-semibold text-lg">2</span>
                  </div>
                  <H4 className="text-base">Select Your Core Capabilities</H4>
                </div>
                <P className="text-muted-foreground text-sm leading-relaxed">
                  Select platform features and support levels that match your goals.
                </P>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="group hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-semibold text-lg">3</span>
                  </div>
                  <H4 className="text-base">Receive Your Custom Plan</H4>
                </div>
                <P className="text-muted-foreground text-sm leading-relaxed">
                  Get your custom plan and pricing estimate ready for review.
                </P>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Calculate Your Plan Section (Mobile: Full width with animation, Desktop: Right column)
function CalculateYourPlanSection({ onOpenCalculator }: { onOpenCalculator: () => void }) {
  return (
    <div className="relative overflow-hidden min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] pb-0 lg:hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <GrowthAnimation className="w-full h-full" />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl mx-auto">
          <div className="text-center group">
            <div className="inline-block bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <Button size="lg" onClick={onOpenCalculator} className="flex items-center mx-auto cursor-pointer group">
                Calculate Your Plan
                <Icon name="calculator-line" className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:scale-110" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Desktop Combined Section (Side-by-side layout)
function DesktopCombinedSection({ onOpenCalculator }: { onOpenCalculator: () => void }) {
  return (
    <Section 
      paddingY="none"
      className="relative overflow-hidden min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center pb-0 hidden lg:flex"
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
      <Container size="2xl" className="relative z-10 h-full py-8 lg:py-16 pb-0">
        <div className="grid grid-cols-4 gap-0 h-full">
          {/* Left Column - How It Works (1 column) */}
          <div className="col-span-1 flex items-center pl-1 pr-12 py-12 pb-0">
            <div className="w-full space-y-8">
              <div className="space-y-6">
                <H2>How It Works</H2>
              </div>

              {/* Three Steps */}
              <div className="space-y-6">
                {/* Step 1 */}
                <Card className="group hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold text-lg">1</span>
                      </div>
                      <H4 className="text-base">Tell Us About Your Universe</H4>
                    </div>
                    <P className="text-muted-foreground text-sm leading-relaxed">
                      Share key details about your organization and core needs.
                    </P>
                  </CardContent>
                </Card>

                {/* Step 2 */}
                <Card className="group hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold text-lg">2</span>
                      </div>
                      <H4 className="text-base">Select Your Core Capabilities</H4>
                    </div>
                    <P className="text-muted-foreground text-sm leading-relaxed">
                      Select platform features and support levels that match your goals.
                    </P>
                  </CardContent>
                </Card>

                {/* Step 3 */}
                <Card className="group hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold text-lg">3</span>
                      </div>
                      <H4 className="text-base">Receive Your Custom Plan</H4>
                    </div>
                    <P className="text-muted-foreground text-sm leading-relaxed">
                      Get your custom plan and pricing estimate ready for review.
                    </P>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Right Column - Calculate Your Plan (3 columns) */}
          <div className="col-span-3 flex items-center justify-center p-12 pb-0">
            <div className="text-center group">
              <div className="inline-block bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <Button size="lg" onClick={onOpenCalculator} className="flex items-center mx-auto cursor-pointer group">
                  Calculate Your Plan
                  <Icon name="calculator-line" className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:scale-110" />
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
function CTASection() {
  return (
    <div className="bg-muted/30 -mt-px">
      <Container size="2xl" className="py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <H2>Ready to Transform Your Operations?</H2>
            <P className="text-muted-foreground leading-relaxed">
              Discover how Elevation AI can unify your knowledge, secure your operations, and orchestrate intelligent workflows across your organization.
            </P>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/website/demo">
                Request a Demo
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/website/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default function PricingPage() {
  const [isCalculatorOpen, setIsCalculatorOpen] = React.useState(false)

  const handleOpenCalculator = () => {
    setIsCalculatorOpen(true)
  }

  const handleCloseCalculator = () => {
    setIsCalculatorOpen(false)
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
            <PricingHeroSection onOpenCalculator={handleOpenCalculator} />
            
            {/* Mobile Layout - Stacked Sections */}
            <HowItWorksSection />
            <CalculateYourPlanSection onOpenCalculator={handleOpenCalculator} />
            
            {/* Desktop Layout - Side-by-Side Section */}
            <DesktopCombinedSection onOpenCalculator={handleOpenCalculator} />
            
            <CTASection />
          </main>
        </div>

        {/* Pricing Calculator Modal */}
        <PricingCalculatorModal 
          isOpen={isCalculatorOpen} 
          onClose={handleCloseCalculator} 
        />
      </MobileOnlyLayout>
    </PageWrapper>
  )
}