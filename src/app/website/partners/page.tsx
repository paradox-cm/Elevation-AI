"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import React from "react"


export default function PartnersPage() {
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
                    Partner with Elevation AI
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-[42rem] mx-auto">
                    Join our ecosystem of trusted ambassadors, consulting firms, and experts to help bring the power of agentic AI to businesses everywhere.
                  </p>
                </div>
              </div>

              {/* For Ambassadors */}
              <Section paddingY="sm">
                <div className="max-w-4xl mx-auto space-y-4">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                    Become an Ambassador
                  </h2>
                  <p className="text-muted-foreground">
                    Our Ambassador program is for well-connected leaders who can provide warm introductions to their network. We believe that the best partnerships start with trust, and we value your ability to open the right doors. In return, we offer a generous referral program and the opportunity to be at the center of the agentic AI ecosystem.
                  </p>
                  <div className="pt-2">
                    <Button size="lg" asChild>
                      <a href="#ambassador">Inquire About Our Ambassador Program</a>
                    </Button>
                  </div>
                </div>
              </Section>

              {/* For Consulting Firms & Experts */}
              <Section paddingY="sm">
                <div className="max-w-4xl mx-auto space-y-4">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                    Join Our Partner Network
                  </h2>
                  <div className="space-y-3 text-muted-foreground">
                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">Deliver AI-Powered Solutions</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        Use our platform as the agentic backbone to build and deliver scalable, high-margin solutions for your clients.
                      </CardContent>
                    </Card>

                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">Seamlessly Embed with Clients</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        Collaborate directly within your clients' workspaces, giving you an unprecedented level of integration and partnership.
                      </CardContent>
                    </Card>

                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">Extend Your Capacity</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        Leverage our library of agents and tools to augment your own expertise and take on more complex challenges.
                      </CardContent>
                    </Card>
                  </div>
                  <div className="pt-2">
                    <Button size="lg" asChild>
                      <a href="#partner-network">Apply to Our Partner Network</a>
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
