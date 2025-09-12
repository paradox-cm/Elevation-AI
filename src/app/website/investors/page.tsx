"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { Button } from "@/components/ui/button"
import { H1, H2, P, BodyLarge } from "@/components/ui/typography"
import Icon from "@/components/ui/icon"
import { StarFieldAnimationPlatform } from "@/components/animations/star-field-animation-platform"
import React from "react"


export default function InvestorsPage() {
  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="resources" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            {/* Hero - centered with edge-to-edge border */}
            <div className="relative w-full flex items-center justify-center min-h-[300px] sm:min-h-[360px] lg:min-h-[420px] border-b border-border overflow-hidden">
              {/* Starfield Animation Background */}
              <StarFieldAnimationPlatform className="z-0" />
              
              <Container size="2xl" className="relative z-10">
                <div className="text-center space-y-4">
                  {/* Favicon Icon */}
                  <div className="flex justify-center">
                    <img 
                      src="/images/Favicon-Stroke.png" 
                      alt="Elevation AI" 
                      className="w-10 h-10"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <H1>
                      Investing in the Agentic Era
                    </H1>
                    <BodyLarge className="max-w-[42rem] mx-auto">
                      Led by a top-tier team of enterprise leaders, we are building the essential platform for the agentic era.
                    </BodyLarge>
                  </div>
                </div>
              </Container>
            </div>

            <Container size="2xl">

              {/* Our Vision */}
              <Section paddingY="xl">
                <div className="max-w-4xl mx-auto space-y-6 py-16">
                  <H2>
                    The Opportunity
                  </H2>
                  <BodyLarge>
                    The world is undergoing a platform shift to agentic AI, creating a massive new market category. Elevation AI is positioned to lead this shift by providing the essential middleware for the agentic era. Our platform orchestrates an organization's resources—its people, data, and agents—creating a deep, defensible competitive advantage through proprietary knowledge graphs and powerful network effects.
                  </BodyLarge>
                </div>
              </Section>

              {/* Our Model */}
              <Section paddingY="xl">
                <div className="max-w-4xl mx-auto space-y-6 py-16">
                  <H2>
                    A Scalable Business Model
                  </H2>
                  <BodyLarge>
                    Our unique model combines a scalable SaaS platform with a high-touch concierge support team that drives adoption and creates deep, trusted relationships with our clients. This allows us to deliver the strategic impact of a dedicated expert partnership while maintaining the scalable model of a platform company.
                  </BodyLarge>
                </div>
              </Section>

              {/* Who We're Looking For */}
              <Section paddingY="xl">
                <div className="max-w-4xl mx-auto space-y-6 py-16">
                  <H2>
                    Our Ideal Partners
                  </H2>
                  <BodyLarge>
                    We are currently engaging with a select group of strategic investors. We seek partners who believe in the profound shift to the agentic era. Our ideal partners are investing aggressively into this change. They can create a "1+1=3" effect through their network and expertise. We are also interested in investors who are already starting to use this technology in their own operations.
                  </BodyLarge>
                  <div className="pt-4">
                    <Button size="lg" asChild>
                      <a href="/website/contact">Contact Us</a>
                    </Button>
                  </div>
                </div>
              </Section>
            </Container>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
