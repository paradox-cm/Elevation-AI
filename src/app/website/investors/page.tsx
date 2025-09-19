"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { MainHeader } from "@/components/ui/main-header"
import { LoadingSpinner } from "@/components/ui/loading"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { Button } from "@/components/ui/button"
import { H1, H2, H3, P, BodyLarge } from "@/components/ui/typography"
import Icon from "@/components/ui/icon"
import { StarfieldAnimationHero } from "@/app/design-system/animations/starfield-animation"
import React, { useEffect, useState } from "react"
import { pagesService } from "@/lib/cms"
import { PageWithSections } from "@/types/cms"

// Logo Grid Section
function LogoGridSection({ data }: { data?: Record<string, unknown> }) {
  const title = (typeof data?.title === 'string' ? data.title : "Led by industry veterans from:")
  const logos = (Array.isArray(data?.logos) ? data.logos : [
    { name: "Accenture", filename: "Accenture.svg", showText: true },
    { name: "Apple", filename: "Apple.svg", showText: false },
    { name: "Bank of America", filename: "Bank-of-America.svg", showText: true },
    { name: "BCG Consulting", filename: "BCG-Consulting.svg", showText: false },
    { name: "Morgan Stanley", filename: "Morgan-Stanley.svg", showText: true },
    { name: "Barclays", filename: "Barclays.svg", showText: true },
    { name: "eBay", filename: "ebay.svg", showText: false },
    { name: "Google", filename: "Google.svg", showText: true },
    { name: "Indeed", filename: "Indeed.svg", showText: true },
    { name: "JPM", filename: "JPM.svg", showText: true },
    { name: "McKinsey", filename: "McKinsey.svg", showText: true },
    { name: "Meta", filename: "Meta.svg", showText: true },
    { name: "Tesla", filename: "Tesla.svg", showText: true },
    { name: "Visa", filename: "Visa.svg", showText: true },
    { name: "Microsoft", filename: "Windows.svg", showText: true }
  ])

  return (
    <Section paddingY="lg" className="bg-muted/20">
      <Container size="2xl">
        <div className="space-y-6 sm:space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-2">
            <H3 className="text-muted-foreground">
              {title}
            </H3>
          </div>
          
          {/* Logo Grid */}
          <div className="py-4 sm:py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
              {logos.map((logo, index) => (
                <div
                  key={`${logo.filename}-${index}`}
                  className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg hover:bg-muted/40 transition-colors duration-200"
                >
                  {/* Logo */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center">
                    <img
                      src={`/images/logos/${logo.filename}`}
                      alt={`${logo.name} logo`}
                      className="w-full h-full object-contain filter dark:brightness-0 dark:invert opacity-80 hover:opacity-100 transition-opacity duration-200"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Company name - only show if showText is true */}
                  {logo.showText && (
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground text-center leading-tight">
                      {logo.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Hero Section Component
function HeroSection({ data }: { data?: Record<string, unknown> }) {
  const title = (typeof data?.title === 'string' ? data.title : "Investing in the Agentic Era")
  const description = (typeof data?.description === 'string' ? data.description : "Led by a top-tier team of enterprise leaders, we are building the essential platform for the agentic era.")
  const faviconUrl = (typeof data?.favicon_url === 'string' ? data.favicon_url : "/images/Favicon-Stroke.png")
  const backgroundAnimation = data?.background_animation

  return (
    <div className="relative w-full flex items-center justify-center min-h-[300px] sm:min-h-[360px] lg:min-h-[420px] border-b border-border/50 overflow-hidden">
      {/* Background - Centralized Starfield */}
      {backgroundAnimation === "starfield" && (
        <div className="absolute inset-0 w-full h-full z-0">
          <StarfieldAnimationHero className="w-full h-full" />
        </div>
      )}
      
      <Container size="2xl" className="relative z-10">
        <div className="text-center space-y-4">
          {/* Favicon Icon */}
          <div className="flex justify-center">
            <img 
              src={faviconUrl} 
              alt="Elevation AI" 
              className="w-10 h-10"
            />
          </div>
          
          <div className="space-y-1">
            <H1>{title}</H1>
            <BodyLarge className="max-w-[42rem] mx-auto">
              {description}
            </BodyLarge>
          </div>
        </div>
      </Container>
    </div>
  )
}

// Content Section Component
function ContentSection({ data }: { data?: Record<string, unknown> }) {
  const title = (typeof data?.title === 'string' ? data.title : "")
  const content = (typeof data?.content === 'string' ? data.content : "")

  return (
    <Section paddingY="xl">
      <div className="max-w-4xl mx-auto space-y-6 py-16">
        <H2>{title}</H2>
        <BodyLarge>{content}</BodyLarge>
      </div>
    </Section>
  )
}

// CTA Section Component
function CTASection({ data }: { data?: Record<string, unknown> }) {
  const title = (typeof data?.title === 'string' ? data.title : "")
  const description = (typeof data?.description === 'string' ? data.description : "")
  const ctaText = (typeof data?.cta_primary_text === 'string' ? data.cta_primary_text : "Contact Us")
  const ctaUrl = (typeof data?.cta_primary_url === 'string' ? data.cta_primary_url : "/website/contact")

  return (
    <Section paddingY="xl">
      <div className="max-w-4xl mx-auto space-y-6 py-16">
        <H2>{title}</H2>
        <BodyLarge>{description}</BodyLarge>
        <div className="pt-4">
          <Button size="lg" asChild>
            <a href={ctaUrl}>{ctaText}</a>
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default function InvestorsPage() {
  const [pageData, setPageData] = useState<PageWithSections | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch CMS data
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const data = await pagesService.getWithSections('investors')
        setPageData(data)
      } catch (error) {
        console.error('Error fetching investors page data:', error)
        setPageData(null) // Fallback to static content
      } finally {
        setLoading(false)
      }
    }
    fetchPageData()
  }, [])

  // Add refresh mechanism
  useEffect(() => {
    const handleRefresh = () => {
      const fetchPageData = async () => {
        try {
          const data = await pagesService.getWithSections('investors')
          setPageData(data)
        } catch (error) {
          console.error('Error fetching investors page data:', error)
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
        header={<MainHeader />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="resources" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" text="Loading investors page..." />
              </div>
            ) : (
              <>
                <HeroSection data={pageData?.sections?.[0]?.section_data || undefined} />
                <LogoGridSection data={pageData?.sections?.[1]?.section_data || undefined} />
                
                <Container size="2xl">
                  <ContentSection data={pageData?.sections?.[2]?.section_data || undefined} />
                  <ContentSection data={pageData?.sections?.[3]?.section_data || undefined} />
                  <CTASection data={pageData?.sections?.[4]?.section_data || undefined} />
                </Container>
              </>
            )}
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
