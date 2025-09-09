"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
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
            <Container size="2xl">
              {/* Hero - centered */}
              <div className="w-full flex items-center justify-center min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]">
                <div className="text-center space-y-1">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                    Investing in the Agentic Era
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-[42rem] mx-auto">
                    Led by a top-tier team of enterprise leaders, we are building the essential platform for the agentic era.
                  </p>
                </div>
              </div>

              {/* Our Vision */}
              <Section paddingY="sm">
                <div className="max-w-4xl mx-auto space-y-4">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                    The Opportunity
                  </h2>
                  <p className="text-muted-foreground">
                    The world is undergoing a platform shift to agentic AI, creating a massive new market category. Elevation AI is positioned to lead this shift by providing the essential middleware for the agentic era. Our platform orchestrates an organization's resources—its people, data, and agents—creating a deep, defensible competitive advantage through proprietary knowledge graphs and powerful network effects.
                  </p>
                </div>
              </Section>

              {/* Our Model */}
              <Section paddingY="sm">
                <div className="max-w-4xl mx-auto space-y-4">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                    A Scalable Business Model
                  </h2>
                  <p className="text-muted-foreground">
                    Our unique model combines a scalable SaaS platform with a high-touch concierge support team that drives adoption and creates deep, trusted relationships with our clients. This allows us to deliver the strategic impact of a dedicated expert partnership while maintaining the scalable model of a platform company.
                  </p>
                </div>
              </Section>

              {/* Who We're Looking For */}
              <Section paddingY="sm">
                <div className="max-w-4xl mx-auto space-y-4">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                    Our Ideal Partners
                  </h2>
                  <p className="text-muted-foreground">
                    We are currently engaging with a select group of strategic investors. We seek partners who believe in the profound shift to the agentic era. Our ideal partners are investing aggressively into this change. They can create a "1+1=3" effect through their network and expertise. We are also interested in investors who are already starting to use this technology in their own operations.
                  </p>
                  <div className="pt-2">
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
