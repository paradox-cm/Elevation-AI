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
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                    Build the Future of Work
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-[42rem] mx-auto">
                    We are a team of entrepreneurs, world-class engineers, and strategic thinkers on a mission to build the operating system for the agentic era. If you are driven by solving complex problems and want to be at the forefront of the AI revolution, we want to hear from you.
                  </p>
                </div>
              </div>

              {/* Our Culture */}
              <Section paddingY="sm">
                <div className="max-w-4xl mx-auto space-y-6">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground text-center">
                    Our Culture
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">Solve Meaningful Problems</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        We're not just building software; we're helping our clients orchestrate their entire universe. The work you do here will have a tangible impact on how businesses operate and compete.
                      </CardContent>
                    </Card>

                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">A Team of Experts</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        You'll work alongside a diverse and talented team with experience from world-class organizations like Tesla, Visa, Accenture, and McKinsey, all backed by Google's highest-tier AI program.
                      </CardContent>
                    </Card>

                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">Ownership & Growth</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        We are a culture of builders. We value ownership, curiosity, and a relentless drive to learn and grow. You will have the opportunity to make a significant impact from day one.
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </Section>

              {/* Open Roles */}
              <Section paddingY="sm">
                <div className="max-w-4xl mx-auto space-y-6">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground text-center">
                    Join Our Team
                  </h2>

                  {/* Placeholder roles - replace with real job data or a CMS later */}
                  <div className="space-y-3">
                    <Card className="border-border">
                      <CardHeader>
                        <div className="flex items-center justify-between gap-4">
                          <CardTitle className="text-base sm:text-lg">Agentic AI Engineer</CardTitle>
                          <Button size="sm" asChild>
                            <a href="#apply-ai-engineer">Apply Now</a>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Design and build production-grade agentic systems that orchestrate tools, data, and workflows.
                      </CardContent>
                    </Card>

                    <Card className="border-border">
                      <CardHeader>
                        <div className="flex items-center justify-between gap-4">
                          <CardTitle className="text-base sm:text-lg">Product Manager, Agentic Platform</CardTitle>
                          <Button size="sm" asChild>
                            <a href="#apply-pm">Apply Now</a>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Drive roadmap and execution for platform capabilities that power mission-critical business workflows.
                      </CardContent>
                    </Card>

                    <Card className="border-border">
                      <CardHeader>
                        <div className="flex items-center justify-between gap-4">
                          <CardTitle className="text-base sm:text-lg">Solutions Architect</CardTitle>
                          <Button size="sm" asChild>
                            <a href="#apply-solutions">Apply Now</a>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Partner with clients to design and implement agentic solutions using Elevation AI's platform.
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-sm text-muted-foreground">
                      Don't see your role? We're always looking for exceptional talent.
                    </p>
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
