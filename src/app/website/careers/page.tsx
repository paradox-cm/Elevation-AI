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
import { H1, H2, H3, P } from "@/components/ui/typography"
import Icon from "@/components/ui/icon"
import React from "react"


export default function CareersPage() {
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
                  <H1>
                    Build the Future of Work
                  </H1>
                  <P className="max-w-[42rem] mx-auto">
                    We are a team of entrepreneurs, world-class engineers, and strategic thinkers on a mission to build the operating system for the agentic era. If you are driven by solving complex problems and want to be at the forefront of the AI revolution, we want to hear from you.
                  </P>
                </div>
              </div>

              {/* Our Culture */}
              <Section paddingY="lg">
                <div className="max-w-4xl mx-auto space-y-6">
                  <H2 className="text-center">
                    Our Culture
                  </H2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-base md:text-lg">Solve Meaningful Problems</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <P className="text-sm">We're not just building software; we're helping our clients orchestrate their entire universe. The work you do here will have a tangible impact on how businesses operate and compete.</P>
                      </CardContent>
                    </Card>

                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-base md:text-lg">A Team of Experts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <P className="text-sm">You'll work alongside a diverse and talented team with experience from world-class organizations like Tesla, Visa, Accenture, and McKinsey, all backed by Google's highest-tier AI program.</P>
                      </CardContent>
                    </Card>

                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-base md:text-lg">Ownership & Growth</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <P className="text-sm">We are a culture of builders. We value ownership, curiosity, and a relentless drive to learn and grow. You will have the opportunity to make a significant impact from day one.</P>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </Section>

              {/* Open Roles */}
              <Section paddingY="lg">
                <div className="max-w-4xl mx-auto space-y-6">
                  <H2 className="text-center">
                    Join Our Team
                  </H2>

                  {/* Placeholder roles - replace with real job data or a CMS later */}
                  <div className="space-y-3">
                    <Card className="border-border">
                      <CardHeader>
                        <div className="flex items-center justify-between gap-4">
                          <CardTitle className="text-base sm:text-base md:text-lg">Agentic AI Engineer</CardTitle>
                          <Button size="sm" asChild>
                            <a href="#apply-ai-engineer">Apply Now</a>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <P className="text-sm">Design and build production-grade agentic systems that orchestrate tools, data, and workflows.</P>
                      </CardContent>
                    </Card>

                    <Card className="border-border">
                      <CardHeader>
                        <div className="flex items-center justify-between gap-4">
                          <CardTitle className="text-base sm:text-base md:text-lg">Product Manager, Agentic Platform</CardTitle>
                          <Button size="sm" asChild>
                            <a href="#apply-pm">Apply Now</a>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <P className="text-sm">Drive roadmap and execution for platform capabilities that power mission-critical business workflows.</P>
                      </CardContent>
                    </Card>

                    <Card className="border-border">
                      <CardHeader>
                        <div className="flex items-center justify-between gap-4">
                          <CardTitle className="text-base sm:text-base md:text-lg">Solutions Architect</CardTitle>
                          <Button size="sm" asChild>
                            <a href="#apply-solutions">Apply Now</a>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <P className="text-sm">Partner with clients to design and implement agentic solutions using Elevation AI's platform.</P>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center pt-2">
                    <P className="text-sm">
                      Don't see your role? We're always looking for exceptional talent.
                    </P>
                    <Button variant="outline" className="mt-3" asChild>
                      <a href="/website/contact">Get in Touch</a>
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
