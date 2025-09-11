"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { H1, H2, BodyLarge } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import Link from "next/link"
import React from "react"
import { WIPBanner } from "@/components/ui/wip-banner"

// Pricing Hero Section Component
function PricingHeroSection() {
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
                Transparent Pricing for
                <span className="block">Every Organization</span>
              </H1>
              <BodyLarge className="text-muted-foreground max-w-2xl">
                Choose the plan that fits your organization's needs. From startups to enterprises, we provide flexible pricing options to help you scale your agentic operations.
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
    <Section paddingY="lg" className="bg-muted/30">
      <Container size="2xl">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <H2>Ready to Transform Your Operations?</H2>
            <BodyLarge className="text-muted-foreground leading-relaxed">
              Discover how Elevation AI can unify your knowledge, secure your operations, and orchestrate intelligent workflows across your organization.
            </BodyLarge>
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
    </Section>
  )
}

export default function PricingPage() {
  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader currentPage="pricing" />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="pricing" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            {/* WIP Banner */}
            <div className="pt-8">
              <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
                <WIPBanner />
              </Container>
            </div>
            
            {/* Pricing Hero Section */}
            <PricingHeroSection />

            <Container size="2xl">
              <Section paddingY="lg">
                <div className="text-center">
                  <p className="text-muted-foreground">Pricing content will go here</p>
                </div>
              </Section>
            </Container>

            {/* CTA Section */}
            <CTASection />
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}