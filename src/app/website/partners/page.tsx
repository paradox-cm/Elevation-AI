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
import { H1, H2, H3, P } from "@/components/ui/typography"
import Icon from "@/components/ui/icon"
import React, { useEffect, useState } from "react"
import { pagesService } from "@/lib/cms"
import { PageWithSections } from "@/types/cms"


// Hero Section Component
function HeroSection({ data }: { data?: Record<string, unknown> }) {
  const title = (typeof data?.title === 'string' ? data.title : "Partner with Elevation AI")
  const description = (typeof data?.description === 'string' ? data.description : "Join our ecosystem of trusted ambassadors, consulting firms, and experts to help bring the power of agentic AI to businesses everywhere.")

  return (
    <div className="w-full flex items-center justify-center min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]">
      <div className="text-center space-y-1">
        <H1>{title}</H1>
        <P className="max-w-[42rem] mx-auto">{description}</P>
      </div>
    </div>
  )
}

// Ambassador Program Section Component
function AmbassadorSection({ data }: { data?: Record<string, unknown> }) {
  const title = (typeof data?.title === 'string' ? data.title : "Become an Ambassador")
  const content = (typeof data?.content === 'string' ? data.content : "Our Ambassador program is for well-connected leaders who can provide warm introductions to their network. We believe that the best partnerships start with trust, and we value your ability to open the right doors. In return, we offer a generous referral program and the opportunity to be at the center of the agentic AI ecosystem.")
  const ctaText = (typeof data?.cta_text === 'string' ? data.cta_text : "Inquire About Our Ambassador Program")
  const ctaUrl = (typeof data?.cta_url === 'string' ? data.cta_url : "#ambassador")

  return (
    <Section paddingY="lg">
      <div className="max-w-4xl mx-auto space-y-4">
        <H2>{title}</H2>
        <P>{content}</P>
        <div className="pt-2">
          <Button size="lg" asChild>
            <a href={ctaUrl}>{ctaText}</a>
          </Button>
        </div>
      </div>
    </Section>
  )
}

// Partner Network Section Component
function PartnerNetworkSection({ data }: { data?: Record<string, unknown> }) {
  const sectionTitle = (typeof data?.section_title === 'string' ? data.section_title : "Join Our Partner Network")
  const description = (typeof data?.description === 'string' ? data.description : "We are building a network of specialized consulting firms and individual experts who natively use our platform to serve their clients and extend their own capabilities. By partnering with us, you can:")
  const features = (Array.isArray(data?.features) ? data.features : [
    {
      title: "Deliver AI-Powered Solutions",
      description: "Use our platform as the agentic backbone to build and deliver scalable, high-margin solutions for your clients.",
      order: 1
    },
    {
      title: "Seamlessly Embed with Clients",
      description: "Collaborate directly within your clients' workspaces, giving you an unprecedented level of integration and partnership.",
      order: 2
    },
    {
      title: "Extend Your Capacity",
      description: "Leverage our library of agents and tools to augment your own expertise and take on more complex challenges.",
      order: 3
    }
  ])
  const ctaText = (typeof data?.cta_text === 'string' ? data.cta_text : "Apply to Our Partner Network")
  const ctaUrl = (typeof data?.cta_url === 'string' ? data.cta_url : "#partner-network")

  return (
    <Section paddingY="lg">
      <div className="max-w-4xl mx-auto space-y-4">
        <H2>{sectionTitle}</H2>
        <P>{description}</P>
        <div className="space-y-3 text-muted-foreground">
          {features.map((feature: unknown, index: number) => { const f = feature as Record<string, unknown>; return (
            <Card key={index} className="border-border">
              <CardHeader>
                <CardTitle className="text-base sm:text-base md:text-lg">
                  {typeof f.title === 'string' ? f.title : ''}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <P className="text-sm">
                  {typeof f.description === 'string' ? f.description : ''}
                </P>
              </CardContent>
            </Card>
          ); })}
        </div>
        <div className="pt-2">
          <Button size="lg" asChild>
            <a href={ctaUrl}>{ctaText}</a>
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default function PartnersPage() {
  const [pageData, setPageData] = useState<PageWithSections | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch CMS data
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const data = await pagesService.getWithSections('partners')
        setPageData(data)
      } catch (error) {
        console.error('Error fetching partners page data:', error)
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
          const data = await pagesService.getWithSections('partners')
          setPageData(data)
        } catch (error) {
          console.error('Error fetching partners page data:', error)
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
                  <LoadingSpinner size="lg" text="Loading partners page..." />
                </div>
              ) : (
                <>
                  <HeroSection data={pageData?.sections?.[0]?.section_data || undefined} />
                  <AmbassadorSection data={pageData?.sections?.[1]?.section_data || undefined} />
                  <PartnerNetworkSection data={pageData?.sections?.[2]?.section_data || undefined} />
                </>
              )}
            </Container>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
