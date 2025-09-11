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
import { BusinessDataAnimation } from "@/components/animations/business-data-animation"
import { H1, H2, P } from "@/components/ui/typography"
import React from "react"


export default function DevelopersPage() {
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
              {/* Hero - centered with balanced spacing and animation */}
              <div className="relative w-full flex items-center justify-center min-h-[200px] sm:min-h-[240px] lg:min-h-[280px] overflow-hidden">
                <BusinessDataAnimation />
                <div className="relative z-10 text-center space-y-1">
                  <H1>
                    Build on the Operating System for the Agentic Era
                  </H1>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-[42rem] mx-auto">
                    Integrate your agents and platforms with Elevation AI to gain access to a high-value customer base and participate in a thriving, collaborative ecosystem.
                  </p>
                </div>
              </div>

              {/* Why Integrate with Elevation AI? */}
              <Section paddingY="sm">
                <div className="max-w-4xl mx-auto space-y-4">
                  <H2>
                    We Handle the Integration, You Focus on Innovation
                  </H2>
                  <p className="text-muted-foreground">
                    Elevation AI is the essential middleware layer for the agentic era. By integrating with our platform, you gain instant, secure access to our entire network of enterprise and private market clients. We handle the complexities of security, data integration, and the client relationship, allowing you to focus on what you do best: building world-class agents and agentic tools.
                  </p>
                </div>
              </Section>

              {/* How It Works: Credit-Based Economy */}
              <Section paddingY="sm">
                <div className="max-w-4xl mx-auto space-y-4">
                  <H2>
                    A Clear Path to Revenue
                  </H2>

                  <div className="space-y-3">
                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">1. Clients Receive Credits</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Our clients subscribe to packages that include a monthly allotment of credits, which they can use for any resource in our ecosystem.
                      </CardContent>
                    </Card>

                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">2. Your Agent is Discoverable</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Your agent or tool is listed in our central Library. Any agent available through standard protocols (like A2A or MCP) can be discovered and integrated.
                      </CardContent>
                    </Card>

                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">3. Clients Deploy Your Agent</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        When a client uses their credits to deploy your agent in one of their workflows, you get paid. These credits translate directly into revenue for you.
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </Section>

              {/* Our Commitment to the Ecosystem */}
              <Section paddingY="lg">
                <div className="max-w-4xl mx-auto">
                  <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                    <CardHeader className="text-center pt-8 pb-2">
                      <CardTitle className="text-2xl sm:text-2xl font-semibold tracking-tight text-foreground">
                        Let's Build the Future, Together
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4 pt-2">
                      <p className="text-muted-foreground">
                        We believe that the future of agentic AI is not a walled garden, but a vibrant, open ecosystem. We are committed to fostering a community where the best ideas can be discovered, deployed, and monetized. By building on Elevation AI, you are not just integrating with a platform; you are joining a movement to build the agentic future.
                      </p>
                      <div className="pt-2">
                        <Button size="lg" asChild>
                          <a href="#apply">Apply to Our Developer Program</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Section>
            </Container>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
