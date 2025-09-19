"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { MainHeader } from "@/components/ui/main-header"
import { LoadingSpinner } from "@/components/ui/loading"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { BusinessDataAnimation } from "@/components/animations/business-data-animation"
import { H1, H2, H3, P } from "@/components/ui/typography"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { pagesService } from "@/lib/cms"
import { PageWithSections } from "@/types/cms"


// Hero Section Component
function HeroSection({ data }: { data?: Record<string, unknown> }) {
  const title = (typeof data?.title === 'string' ? data.title : "Build on the Operating System for the Agentic Era")
  const description = (typeof data?.description === 'string' ? data.description : "Integrate your agents and platforms with Elevation AI to gain access to a high-value customer base and participate in a thriving, collaborative ecosystem.")

  return (
    <div className="relative w-full flex items-center justify-center min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]">
      <div className="text-center space-y-1">
        <H1>{title}</H1>
        <P className="max-w-[42rem] mx-auto">{description}</P>
      </div>
    </div>
  )
}

// Content Section Component
function ContentSection({ data }: { data?: Record<string, unknown> }) {
  const title = (typeof data?.title === 'string' ? data.title : "")
  const content = (typeof data?.content === 'string' ? data.content : "")

  return (
    <Section paddingY="lg">
      <div className="max-w-4xl mx-auto space-y-4">
        <H2>{title}</H2>
        <P>{content}</P>
      </div>
    </Section>
  )
}

// Animation Section Component
function AnimationSection({ data }: { data?: Record<string, unknown> }) {
  const title = (typeof data?.title === 'string' ? data.title : "Visual Integration")
  const content = (typeof data?.content === 'string' ? data.content : "Experience the power of our platform through our interactive business data visualization.")
  const animationType = (typeof data?.animation_type === 'string' ? data.animation_type : "business_data")
  const overlayImage = (typeof data?.overlay_image === 'string' ? data.overlay_image : "/images/E-Arrow.svg")
  const overlayAlt = (typeof data?.overlay_alt === 'string' ? data.overlay_alt : "Elevation AI Arrow")
  const minHeight = (typeof data?.min_height === 'string' ? data.min_height : "400px")
  const overlayWidth = (typeof data?.overlay_width === 'number' ? data.overlay_width : 120)
  const overlayHeight = (typeof data?.overlay_height === 'number' ? data.overlay_height : 120)
  const overlayOpacity = (typeof data?.overlay_opacity === 'number' ? data.overlay_opacity : 0.8)

  return (
    <>
      <Section paddingY="lg">
        <div className="max-w-4xl mx-auto space-y-4">
          <H2>{title}</H2>
          <P>{content}</P>
        </div>
      </Section>
      
      {/* Full-width Animation Section */}
      <div className="relative w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] overflow-hidden">
        <BusinessDataAnimation />
        {/* E-Arrow Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src={overlayImage}
            alt={overlayAlt}
            width={overlayWidth}
            height={overlayHeight}
            className="opacity-80"
          />
        </div>
      </div>
    </>
  )
}

// Revenue Path Section Component
function RevenuePathSection({ data }: { data?: Record<string, unknown> }) {
  const sectionTitle = (typeof data?.section_title === 'string' ? data.section_title : "A Clear Path to Revenue")
  const features = (Array.isArray(data?.features) ? data.features : [
    {
      title: "1. Clients Receive Credits",
      description: "Our clients subscribe to packages that include a monthly allotment of credits, which they can use for any resource in our ecosystem.",
      order: 1
    },
    {
      title: "2. Your Agent is Discoverable",
      description: "Your agent or tool is listed in our central Library. Any agent available through standard protocols (like A2A or MCP) can be discovered and integrated.",
      order: 2
    },
    {
      title: "3. Clients Deploy Your Agent",
      description: "When a client uses their credits to deploy your agent in one of their workflows, you get paid. These credits translate directly into revenue for you.",
      order: 3
    }
  ])

  return (
    <Section paddingY="lg">
      <div className="max-w-4xl mx-auto space-y-4">
        <H2>{sectionTitle}</H2>
        <div className="space-y-3">
          {features.map((feature: unknown, index: number) => { const f = feature as Record<string, unknown>; return (
            <Card key={index} className="border-border">
              <CardHeader>
                <CardTitle className="text-base sm:text-base md:text-lg">
                  {typeof f.title === 'string' ? f.title : ''}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {typeof f.description === 'string' ? f.description : ''}
              </CardContent>
            </Card>
          ); })}
        </div>
      </div>
    </Section>
  )
}

// Commitment Section Component
function CommitmentSection({ data }: { data?: Record<string, unknown> }) {
  const title = (typeof data?.title === 'string' ? data.title : "Let's Build the Future, Together")
  const description = (typeof data?.description === 'string' ? data.description : "We believe that the future of agentic AI is not a walled garden, but a vibrant, open ecosystem. We are committed to fostering a community where the best ideas can be discovered, deployed, and monetized. By building on Elevation AI, you are not just integrating with a platform; you are joining a movement to build the agentic future.")
  const ctaText = (typeof data?.cta_primary_text === 'string' ? data.cta_primary_text : "Apply to Our Developer Program")
  const ctaUrl = (typeof data?.cta_primary_url === 'string' ? data.cta_primary_url : "#apply")
  const backgroundGradient = (typeof data?.background_gradient === 'string' ? data.background_gradient : "from-primary/10 to-primary/5")
  const borderColor = (typeof data?.border_color === 'string' ? data.border_color : "primary/20")

  return (
    <Section paddingY="lg">
      <div className="max-w-4xl mx-auto">
        <Card className={`bg-gradient-to-r ${backgroundGradient} border-${borderColor}`}>
          <CardHeader className="text-center pt-8 pb-2">
            <CardTitle className="text-base sm:text-base md:text-lg">{title}</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4 pt-2">
            <P>{description}</P>
            <div className="pt-2">
              <Button size="lg" asChild>
                <a href={ctaUrl}>{ctaText}</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}

export default function DevelopersPage() {
  const [pageData, setPageData] = useState<PageWithSections | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch CMS data
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const data = await pagesService.getWithSections('developers')
        setPageData(data)
      } catch (error) {
        console.error('Error fetching developers page data:', error)
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
          const data = await pagesService.getWithSections('developers')
          setPageData(data)
        } catch (error) {
          console.error('Error fetching developers page data:', error)
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
            <Container size="2xl">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <LoadingSpinner size="lg" text="Loading developers page..." />
                </div>
              ) : (
                <>
                  <HeroSection data={pageData?.sections?.[0]?.section_data || undefined} />
                  <ContentSection data={pageData?.sections?.[1]?.section_data || undefined} />
                  <AnimationSection data={pageData?.sections?.[2]?.section_data || undefined} />
                  <RevenuePathSection data={pageData?.sections?.[3]?.section_data || undefined} />
                  <CommitmentSection data={pageData?.sections?.[4]?.section_data || undefined} />
                </>
              )}
            </Container>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
