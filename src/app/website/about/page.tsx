"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { H1, H2, H3, H4, P, BodyLarge, BodySmall, DisplayLarge, DisplayMedium, DisplaySmall } from "@/components/ui/typography"
import Icon from "@/components/ui/icon"
import { VerticalSquareFlow } from "@/components/animations"
import Link from "next/link"
import React from "react"

// Mission Section
function MissionSection() {
  return (
    <Section paddingY="lg" className="relative overflow-hidden">
      {/* Background Animation */}
      <VerticalSquareFlow 
        className="opacity-20"
        squareCount={800}
        maxSpeed={0.08}
      />
      
      {/* Content */}
      <Container size="2xl" className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <H1>Our Mission</H1>
          <DisplayMedium className="text-primary leading-relaxed">
            Help complex organizations operate with clarity, precision, and trust by unifying knowledge and orchestrating secure, agentic AI across their business.
          </DisplayMedium>
        </div>
      </Container>
    </Section>
  )
}

// What We Build Section
function WhatWeBuildSection() {
  return (
    <Section paddingY="lg">
      <Container size="2xl">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <H2>What We Build</H2>
            <BodyLarge className="text-muted-foreground leading-relaxed">
              Elevation AI is the orchestration platform that unifies your company's data, people, and workflows into a single command center—powered by a private Knowledge Graph and securely connected to the world of agentic AI.
            </BodyLarge>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Why Elevation Exists Section
function WhyElevationSection() {
  return (
    <Section paddingY="lg" className="bg-muted/30">
      <Container size="2xl">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <H2>Why Elevation Exists</H2>
            <BodyLarge className="text-muted-foreground leading-relaxed">
              Leaders manage a universe of systems that don't talk to each other. Information is trapped in silos; context gets lost in personal AI chats; collaboration devolves into copy‑paste. The result is generic output, operational bottlenecks, and risk. Elevation AI fixes that by turning scattered knowledge into precision, collaboration, and clarity—securely at enterprise scale.
            </BodyLarge>
          </div>
        </div>
      </Container>
    </Section>
  )
}


// Principles Section
function PrinciplesSection() {
  const principles = [
    {
      title: "Precision over noise",
      description: "Clarity, repeatability, and measurable outcomes.",
      icon: "focus-3-line"
    },
    {
      title: "Security and trust",
      description: "Privacy by default; least‑privilege access; auditability.",
      icon: "shield-check-line"
    },
    {
      title: "Collaboration as a feature",
      description: "Shared context is the default, not an afterthought.",
      icon: "team-line"
    },
    {
      title: "Versatility without chaos",
      description: "Many use cases, one coherent platform.",
      icon: "layout-grid-line"
    },
    {
      title: "Build for longevity",
      description: "Scalable design systems and maintainable implementations.",
      icon: "building-line"
    }
  ]

  return (
    <Section paddingY="lg" className="bg-muted/30">
      <Container size="2xl">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <H2>Principles That Guide Us</H2>
            <BodyLarge className="text-muted-foreground leading-relaxed">
              Our core principles shape every decision we make and every feature we build.
            </BodyLarge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((principle, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon name={principle.icon} className="text-primary" />
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-lg font-semibold">{principle.title}</CardTitle>
                      <BodySmall className="text-muted-foreground leading-relaxed">
                        {principle.description}
                      </BodySmall>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Ecosystem Section
function EcosystemSection() {
  return (
    <Section paddingY="lg">
      <Container size="2xl">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <H2>The Ecosystem We Orchestrate</H2>
            <BodyLarge className="text-muted-foreground leading-relaxed">
              Elevation connects your core systems (from finance and cap tables to communications and docs) with specialized AI tools and open agent standards—so you can compose the right stack for your business and evolve it over time.
            </BodyLarge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="database-2-line" className="text-primary" />
                  </div>
                  <CardTitle>Core Systems Integration</CardTitle>
                </div>
                <BodySmall className="text-muted-foreground">
                  Seamlessly connect finance, cap tables, communications, and documentation systems into a unified platform.
                </BodySmall>
              </CardHeader>
            </Card>
            
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="cpu-line" className="text-primary" />
                  </div>
                  <CardTitle>AI Tools & Agent Standards</CardTitle>
                </div>
                <BodySmall className="text-muted-foreground">
                  Connect with specialized AI tools and open agent standards to build the perfect stack for your business needs.
                </BodySmall>
              </CardHeader>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Path Ahead Section
function PathAheadSection() {
  return (
    <Section paddingY="lg" className="bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
      <Container size="2xl">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <H2>The Path Ahead</H2>
            <BodyLarge className="text-muted-foreground leading-relaxed">
              We're building the agentic backbone for how complex organizations operate—one shared knowledge graph, one secure control plane, and a growing ecosystem of agents and integrations that make work feel orchestrated, not overloaded.
            </BodyLarge>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Careers Section
function CareersSection() {
  return (
    <Section paddingY="lg">
      <Container size="2xl">
        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
            <CardHeader className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="team-line" className="text-primary" />
                </div>
                <H3>Careers</H3>
              </div>
              <BodyLarge className="text-muted-foreground leading-relaxed">
                We're looking for systems thinkers, security‑minded engineers, and product designers who love turning complexity into clarity. If that's you, reach out.
              </BodyLarge>
              <div className="pt-4">
                <Button size="lg" asChild>
                  <Link href="/website/careers">
                    View Open Positions
                  </Link>
                </Button>
              </div>
            </CardHeader>
          </Card>
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

export default function AboutPage() {
  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader currentPage="resources" />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            <Container size="2xl">
              <Section paddingY="xl">
                <PageHeader
                  title="About Elevation AI"
                  description="Learn about our mission to transform business orchestration with AI and our vision for the future of intelligent operations"
                  size="lg"
                  centered
                />
              </Section>
            </Container>

            <MissionSection />
            <WhatWeBuildSection />
            <WhyElevationSection />
            <PrinciplesSection />
            <EcosystemSection />
            <PathAheadSection />
            <CareersSection />
            <CTASection />
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
