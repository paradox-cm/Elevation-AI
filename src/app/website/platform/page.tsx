"use client"

import { useEffect } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { PlatformSubNav } from "@/components/ui/platform-sub-nav"
import { H1, H2, H3, P } from "@/components/ui/typography"
import { CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { FutureReadyColored } from "@/components/animations"
import { ShaderAnimation } from "@/components/animations/shader-animation"
import { ShaderAnimationLight } from "@/components/animations/shader-animation-light"
import { useTheme } from "next-themes"
import { Carousel, CarouselItem } from "@/components/ui/carousel"
import { PlatformCarousel, PlatformCarouselItem } from "@/components/ui/platform-carousel"
import { useMediaQuery } from "@/hooks/use-media-query"

// Platform Hero Section Component
function PlatformHeroSection() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
    <Section 
      paddingY="lg" 
      className="flex items-center py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      <Container size="2xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
               <H1>
                  The Operating System for
                  <span className="block">the Agentic Era</span>
               </H1>
              <P className="text-muted-foreground max-w-2xl">
                The Elevation AI platform is the central, agentic backbone that unifies your universe, provides intelligent workspaces, and securely connects you to the world of AI.
              </P>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" asChild className="text-base sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                <Link href="/website/sign-up">
                  Get Started
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                <Link href="/website/demo">
                  Request a Demo
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Main Visual Container */}
            <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-3xl bg-gradient-to-br from-background/50 to-background/30 border border-border/50 overflow-hidden backdrop-blur-sm">
              {/* Animated Grid Background */}
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 dark:hidden opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '32px 32px'
                  }}
                />
                <div 
                  className="absolute inset-0 hidden dark:block opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '32px 32px'
                  }}
                />
              </div>

              {/* Future Ready Colored Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <FutureReadyColored 
                  width={isDesktop ? 600 : 280} 
                  height={isDesktop ? 400 : 187} 
                  showBorder={false}
                  className="w-[280px] h-[187px] sm:w-[320px] sm:h-[213px] md:w-[400px] md:h-[267px] lg:w-[600px] lg:h-[400px]"
                />
              </div>

            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}


// Platform Features Section
function PlatformFeaturesSection() {
  return (
    <Section paddingY="lg">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="space-y-16">
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <H1>Platform Features</H1>
            <P className="text-muted-foreground">
              Our platform consists of five core features that work together to create a comprehensive AI-powered operating system for your organization.
            </P>
          </div>

          {/* Knowledge Graph */}
          <div data-section="knowledge-graph" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[400px] lg:h-[845px]">
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
              <H2>Your Company's Private Brain</H2>
              <P className="text-muted-foreground">
                We start by creating a secure, dynamic Knowledge Graph of your entire business—capturing the unstructured information from meetings, emails, and documents. This becomes your unique, private intelligence layer, the single source of truth that powers everything.
              </P>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Real-time knowledge extraction</P>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Cross-platform data unification</P>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Intelligent relationship mapping</P>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Privacy-first architecture</P>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-6 h-[300px] lg:h-[845px] rounded-3xl border border-border/50 flex items-center justify-center">
              <P className="text-muted-foreground text-lg">Knowledge Graph Visualization</P>
            </div>
          </div>

          {/* Workspaces & Canvases */}
          <div data-section="workspace" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[400px] lg:h-[845px]">
            <div className="lg:col-span-6 h-[300px] lg:h-[845px]  rounded-3xl border border-border/50 flex items-center justify-center order-2 lg:order-1">
              <P className="text-muted-foreground text-lg">Workspace Interface</P>
            </div>
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2 flex flex-col justify-center">
              <H2>A Place to Work</H2>
              <P className="text-muted-foreground">
                Our platform's Workspaces are the collaborative fabric where your teams, clients, and partners come together. Within a workspace, your unique knowledge graph informs every task and conversation, creating a single, intelligent place to execute both manual and automated work using our suite of Canvases, such as Pipelines and Flows.
              </P>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Collaborative workspaces</P>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Intelligent task automation</P>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Pipeline management</P>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Real-time collaboration</P>
                </li>
              </ul>
            </div>
          </div>

          {/* Agentic Engine */}
          <div data-section="integration-hub" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[400px] lg:h-[845px]">
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
              <H2>Connect to the World of AI, Securely</H2>
              <P className="text-muted-foreground">
                We act as the essential middleware layer for the agentic era. You plug into our platform once, and we handle the rest. Our team continuously searches for and integrates the best models, agents, and tools into our ecosystem. We then de-identify your sensitive data before it's used by these external resources and re-identify the results upon return, ensuring you can leverage the best of AI without the complexity or the security risk.
              </P>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">50+ AI model integrations</P>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Automatic data de-identification</P>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Secure API management</P>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Cost optimization</P>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-6 h-[300px] lg:h-[845px] rounded-3xl border border-border/50 flex items-center justify-center">
              <P className="text-muted-foreground text-lg">AI Integration Hub</P>
            </div>
          </div>

          {/* Library */}
          <div data-section="library" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[400px] lg:h-[845px]">
            <div className="lg:col-span-6 h-[300px] lg:h-[845px]  rounded-3xl border border-border/50 flex items-center justify-center order-2 lg:order-1">
              <P className="text-muted-foreground text-lg">Library Interface</P>
            </div>
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2 flex flex-col justify-center">
              <H2>Your Arsenal of Reusable Intelligence</H2>
              <P className="text-muted-foreground">
                The Library is your central repository for all agentic resources. Here you can store, share, and reuse powerful Prompts, complex automated Flows, and specialized Agents. This allows you to codify your best practices and scale your most effective workflows across the entire organization.
              </P>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Prompt library management</P>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Flow templates</P>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Agent marketplace</P>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Team sharing</P>
                </li>
              </ul>
            </div>
          </div>

          {/* Primary Agent */}
          <div data-section="co-pilot" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[400px] lg:h-[845px]">
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
              <H2>Your Conversational Command Center</H2>
              <P className="text-muted-foreground">
                Every user gets their own personal Co-pilot. Accessible via text, voice, or directly within the platform, it's your primary conversational interface to your entire universe. Use it to ask complex questions, create tasks, and trigger automated workflows using simple, natural language.
              </P>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Natural language processing</P>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Voice interaction</P>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Task automation</P>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <P className="font-medium">Context-aware responses</P>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-6 h-[300px] lg:h-[845px] rounded-3xl border border-border/50 flex items-center justify-center">
              <P className="text-muted-foreground text-lg">Co-pilot Interface</P>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Security Section
function SecuritySection() {
  const securityFeatures: PlatformCarouselItem[] = [
    {
      id: "data-protection",
      title: "Data Protection",
      description: "",
      content: (
        <div className="p-6 bg-background/50 rounded-2xl border border-border/50 h-full flex flex-col justify-start min-h-[200px]">
          <div className="flex justify-start mb-4">
            <Icon name="shield-check-line" size="2xl" className="text-primary text-4xl" />
          </div>
          <P className="text-muted-foreground">
            End-to-end encryption, zero-knowledge architecture
          </P>
        </div>
      )
    },
    {
      id: "compliance",
      title: "Compliance",
      description: "",
      content: (
        <div className="p-6 bg-background/50 rounded-2xl border border-border/50 h-full flex flex-col justify-start min-h-[200px]">
          <div className="flex justify-start mb-4">
            <Icon name="file-shield-line" size="2xl" className="text-primary text-4xl" />
          </div>
          <P className="text-muted-foreground">
            SOC 2 Type II, GDPR, HIPAA ready
          </P>
        </div>
      )
    },
    {
      id: "access-control",
      title: "Access Control",
      description: "",
      content: (
        <div className="p-6 bg-background/50 rounded-2xl border border-border/50 h-full flex flex-col justify-start min-h-[200px]">
          <div className="flex justify-start mb-4">
            <Icon name="key-line" size="2xl" className="text-primary text-4xl" />
          </div>
          <P className="text-muted-foreground">
            Role-based permissions, multi-factor authentication
          </P>
        </div>
      )
    },
    {
      id: "audit-trail",
      title: "Audit Trail",
      description: "",
      content: (
        <div className="p-6 bg-background/50 rounded-2xl border border-border/50 h-full flex flex-col justify-start min-h-[200px]">
          <div className="flex justify-start mb-4">
            <Icon name="history-line" size="2xl" className="text-primary text-4xl" />
          </div>
          <P className="text-muted-foreground">
            Complete activity logging and monitoring
          </P>
        </div>
      )
    },
    {
      id: "data-residency",
      title: "Data Residency",
      description: "",
      content: (
        <div className="p-6 bg-background/50 rounded-2xl border border-border/50 h-full flex flex-col justify-start min-h-[200px]">
          <div className="flex justify-start mb-4">
            <Icon name="database-2-line" size="2xl" className="text-primary text-4xl" />
          </div>
          <P className="text-muted-foreground">
            Choose your data location and retention policies
          </P>
        </div>
      )
    }
  ]

  return (
    <Section paddingY="lg">
      <Container size="full">
        <div className="space-y-12">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <H1>Enterprise-Grade Security & Compliance</H1>
            <P className="text-muted-foreground">
              Your data security is our top priority. We implement industry-leading security measures and maintain compliance with the highest standards.
            </P>
          </div>
          
          {/* Interactive Carousel for All Breakpoints */}
          <div className="-mx-4 sm:-mx-6 lg:-mx-8">
             <PlatformCarousel 
               items={securityFeatures}
               autoPlay={true}
               autoPlayInterval={4000}
               showProgressIndicators={true}
               showGradients={false}
               cardWidth={320}
               cardGap={24}
               className="w-full"
               highlightActiveCard={true}
               cardStyle="blue"
               hugContent={true}
               minHeight="320px"
               stopWhenAllVisible={true}
               responsive={{
                 sm: { cardWidth: 320, cardGap: 16 },
                 md: { cardWidth: 320, cardGap: 20 },
                 lg: { cardWidth: 320, cardGap: 24 }
               }}
             />
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Integrations Section
function IntegrationsSection() {
  // Logo mapping for each category
  const logoMapping = {
    productivity: [
      { name: "Google Workspace", file: "Google-Workspace-Docs.svg" },
      { name: "Microsoft 365", file: "Microsoft-365.svg" },
      { name: "Slack", file: "slack.svg" },
      { name: "Notion", file: "notion.svg" }
    ],
    "crm-sales": [
      { name: "Salesforce", file: "Salesforce.svg" },
      { name: "HubSpot", file: "hubspot.svg" },
      { name: "Pipedrive", file: "Pipedrive.svg" }
    ],
    development: [
      { name: "GitHub", file: "github.svg" },
      { name: "GitLab", file: "gitlab.svg" },
      { name: "Jira", file: "jira.svg" },
      { name: "Confluence", file: "confluence.svg" }
    ],
    communication: [
      { name: "Zoom", file: "zoom.svg" },
      { name: "Teams", file: "microsoft-teams.svg" },
      { name: "Discord", file: "discord.svg" }
    ],
    "data-analytics": [
      { name: "Tableau", file: "tableau.svg" },
      { name: "Power BI", file: "Power_BI.svg" },
      { name: "Google Analytics", file: "google-analytics.svg" }
    ],
    "custom-apis": [
      { name: "REST API", file: "rest-api.svg" },
      { name: "GraphQL", file: "graphql.svg" },
      { name: "Webhooks", file: "webhooks.svg" }
    ],
    finance: [
      { name: "QuickBooks", file: "Quickbooks.svg" },
      { name: "Xero", file: "xero.svg" },
      { name: "Stripe", file: "stripe.svg" }
    ],
    marketing: [
      { name: "Mailchimp", file: "mailchimp.svg" },
      { name: "Hootsuite", file: "hootsuite.svg" },
      { name: "Google Ads", file: "Google-Ads.svg" }
    ],
    hr: [
      { name: "BambooHR", file: "bamboo.svg" },
      { name: "Workday", file: "workday.svg" },
      { name: "ADP", file: "ADP.svg" }
    ]
  }

  const integrationCategories = [
    {
      id: "productivity",
      title: "Productivity",
      description: "Streamline document collaboration and project management across your favorite productivity suites, ensuring seamless workflow integration.",
      icon: "file-text-line",
      logos: logoMapping.productivity
    },
    {
      id: "crm-sales",
      title: "CRM & Sales",
      description: "Unify customer data and sales processes across platforms, enabling intelligent lead management and automated follow-ups.",
      icon: "user-line",
      logos: logoMapping["crm-sales"]
    },
    {
      id: "development",
      title: "Development",
      description: "Connect your development workflow from code repositories to project management, enabling AI-powered code assistance and automated deployments.",
      icon: "code-s-slash-line",
      logos: logoMapping.development
    },
    {
      id: "communication",
      title: "Communication",
      description: "Integrate video conferencing and team chat platforms to create a unified communication hub with intelligent meeting insights.",
      icon: "message-3-line",
      logos: logoMapping.communication
    },
    {
      id: "data-analytics",
      title: "Data & Analytics",
      description: "Transform raw data into actionable insights by connecting business intelligence tools and creating intelligent dashboards.",
      icon: "bar-chart-line",
      logos: logoMapping["data-analytics"]
    },
    {
      id: "custom-apis",
      title: "Custom APIs",
      description: "Build powerful integrations with your existing systems through flexible API connections and custom webhook configurations.",
      icon: "links-line",
      logos: logoMapping["custom-apis"]
    },
    {
      id: "finance",
      title: "Finance & Accounting",
      description: "Automate financial processes and gain real-time insights into your business performance through integrated accounting systems.",
      icon: "money-dollar-circle-line",
      logos: logoMapping.finance
    },
    {
      id: "marketing",
      title: "Marketing",
      description: "Orchestrate multi-channel marketing campaigns with AI-driven personalization and automated content optimization.",
      icon: "megaphone-line",
      logos: logoMapping.marketing
    },
    {
      id: "hr",
      title: "Human Resources",
      description: "Streamline HR operations with intelligent talent management, automated onboarding, and data-driven workforce insights.",
      icon: "team-line",
      logos: logoMapping.hr
    }
  ]

  return (
    <Section paddingY="lg">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="space-y-12">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <H1>Connect Your Entire Universe</H1>
            <P className="text-muted-foreground">
              Elevation AI is built to be the central hub of your operations. We connect with the tools you already use, bringing all your data and workflows into one secure control plane.
            </P>
          </div>
          
          {/* Masonry/Pinterest Style Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 relative">
            {/* Mobile connecting line - only visible on mobile */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2 sm:hidden z-0"></div>
            
            {integrationCategories.map((category, index) => {
              return (
                <div
                  key={category.id}
                  className="group break-inside-avoid border border-border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-background flex flex-col relative z-10"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={category.icon} size="lg" className="text-primary" />
              </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {category.title}
                      </h3>
            </div>
                    <div className="border-b border-border/50 mb-4"></div>
                    <div className="space-y-4 mb-4">
                      {category.logos.map((logo, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 text-xs text-muted-foreground"
                        >
                          <div className="w-10 h-10 flex items-center justify-center">
                            <Image
                              src={`/images/platform-logos/${logo.file}`}
                              alt={logo.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 object-contain filter dark:brightness-0 dark:invert opacity-80"
                            />
              </div>
                          <span>{logo.name}</span>
            </div>
                      ))}
              </div>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
            </div>
              </div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Use Cases Section
function UseCasesSection() {
  const { theme } = useTheme()
  
  // Dark mode color mappings for each category (RGB values 0-1)
  const darkModeCategoryColors = {
    'sales-marketing': {
      primary: [0.2, 0.6, 1.0] as [number, number, number], // blue-500
      secondary: [0.0, 0.8, 1.0] as [number, number, number], // cyan-500  
      tertiary: [0.0, 0.5, 0.6] as [number, number, number] // teal-600
    },
    'customer-support': {
      primary: [0.2, 0.8, 0.2] as [number, number, number], // green-500
      secondary: [0.0, 0.7, 0.5] as [number, number, number], // emerald-500
      tertiary: [0.0, 0.5, 0.6] as [number, number, number] // teal-600
    },
    'product-development': {
      primary: [0.6, 0.2, 1.0] as [number, number, number], // purple-500
      secondary: [0.5, 0.0, 1.0] as [number, number, number], // violet-500
      tertiary: [0.3, 0.0, 0.6] as [number, number, number] // indigo-600
    },
    'operations': {
      primary: [1.0, 0.5, 0.0] as [number, number, number], // orange-500
      secondary: [1.0, 0.7, 0.0] as [number, number, number], // amber-500
      tertiary: [1.0, 0.8, 0.0] as [number, number, number] // yellow-500
    },
    'research-development': {
      primary: [0.3, 0.0, 1.0] as [number, number, number], // indigo-500
      secondary: [0.2, 0.6, 1.0] as [number, number, number], // blue-500
      tertiary: [0.0, 0.8, 1.0] as [number, number, number] // cyan-500
    }
  }

  // Light mode color mappings for each category (RGB values 0-1)
  const lightModeCategoryColors = {
    'sales-marketing': {
      primary: [0.1, 0.4, 0.8] as [number, number, number], // softer blue
      secondary: [0.0, 0.6, 0.9] as [number, number, number], // softer cyan
      tertiary: [0.0, 0.4, 0.7] as [number, number, number] // softer teal
    },
    'customer-support': {
      primary: [0.1, 0.6, 0.3] as [number, number, number], // softer green
      secondary: [0.0, 0.5, 0.4] as [number, number, number], // softer emerald
      tertiary: [0.0, 0.4, 0.5] as [number, number, number] // softer teal
    },
    'product-development': {
      primary: [0.4, 0.2, 0.8] as [number, number, number], // softer purple
      secondary: [0.3, 0.1, 0.7] as [number, number, number], // softer violet
      tertiary: [0.2, 0.0, 0.5] as [number, number, number] // softer indigo
    },
    'operations': {
      primary: [0.8, 0.4, 0.0] as [number, number, number], // softer orange
      secondary: [0.9, 0.5, 0.0] as [number, number, number], // softer amber
      tertiary: [0.9, 0.6, 0.0] as [number, number, number] // softer yellow
    },
    'research-development': {
      primary: [0.3, 0.2, 0.7] as [number, number, number], // softer indigo
      secondary: [0.2, 0.1, 0.5] as [number, number, number], // softer indigo
      tertiary: [0.1, 0.0, 0.3] as [number, number, number] // softer indigo
    }
  }

  // Determine which colors and component to use based on theme
  const isDarkMode = theme === 'dark'
  const categoryColors = isDarkMode ? darkModeCategoryColors : lightModeCategoryColors
  const ShaderComponent = isDarkMode ? ShaderAnimation : ShaderAnimationLight

  const industryCategories: PlatformCarouselItem[] = [
    {
      id: "sales-marketing",
      title: "Sales & Marketing",
      description: "Lead qualification, content generation, campaign optimization",
      icon: () => (
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg flex items-center justify-center">
          <Icon name="line-chart-line" size="2xl" className="text-blue-600" />
        </div>
      ),
      content: (
        <Link href="/website/solutions#sales-marketing" className="block w-full h-full">
          <div className="w-full h-[120px] sm:h-[140px] md:h-[160px] lg:h-[200px] bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-600 relative hover:opacity-90 transition-all duration-300 group overflow-hidden rounded-b-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-cyan-300 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-150 group-hover:rotate-3"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform group-hover:translate-x-full group-hover:-translate-y-full"></div>
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
              <Icon name="arrow-right-line" size="lg" className="text-white" />
            </div>
          </div>
        </Link>
      )
    },
    {
      id: "customer-support",
      title: "Customer Support",
      description: "Intelligent ticketing, knowledge base automation",
      icon: () => (
        <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg flex items-center justify-center">
          <Icon name="customer-service-line" size="2xl" className="text-green-600" />
        </div>
      ),
      content: (
        <Link href="/website/solutions#customer-support" className="block w-full h-full">
          <div className="w-full h-[120px] sm:h-[140px] md:h-[160px] lg:h-[200px] bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 relative hover:opacity-90 transition-all duration-300 group overflow-hidden rounded-b-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-green-300 via-emerald-300 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-150 group-hover:rotate-3"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform group-hover:translate-x-full group-hover:-translate-y-full"></div>
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
              <Icon name="arrow-right-line" size="lg" className="text-white" />
            </div>
          </div>
        </Link>
      )
    },
    {
      id: "product-development",
      title: "Product Development",
      description: "Requirements analysis, testing automation",
      icon: () => (
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg flex items-center justify-center">
          <Icon name="code-s-slash-line" size="2xl" className="text-purple-600" />
        </div>
      ),
      content: (
        <Link href="/website/solutions#product-development" className="block w-full h-full">
          <div className="w-full h-[120px] sm:h-[140px] md:h-[160px] lg:h-[200px] bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600 relative hover:opacity-90 transition-all duration-300 group overflow-hidden rounded-b-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-300 via-violet-300 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-150 group-hover:rotate-3"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform group-hover:translate-x-full group-hover:-translate-y-full"></div>
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
              <Icon name="arrow-right-line" size="lg" className="text-white" />
            </div>
          </div>
        </Link>
      )
    },
    {
      id: "operations",
      title: "Operations",
      description: "Process optimization, compliance monitoring",
      icon: () => (
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg flex items-center justify-center">
          <Icon name="settings-3-line" size="2xl" className="text-orange-600" />
        </div>
      ),
      content: (
        <Link href="/website/solutions#operations" className="block w-full h-full">
          <div className="w-full h-[120px] sm:h-[140px] md:h-[160px] lg:h-[200px] bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 relative hover:opacity-90 transition-all duration-300 group overflow-hidden rounded-b-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-300 via-amber-300 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-150 group-hover:rotate-3"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform group-hover:translate-x-full group-hover:-translate-y-full"></div>
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
              <Icon name="arrow-right-line" size="lg" className="text-white" />
            </div>
          </div>
        </Link>
      )
    },
    {
      id: "research-development",
      title: "Research & Development",
      description: "Data analysis, hypothesis testing",
      icon: () => (
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 rounded-lg flex items-center justify-center">
          <Icon name="microscope-line" size="2xl" className="text-indigo-600" />
        </div>
      ),
      content: (
        <Link href="/website/solutions#research-development" className="block w-full h-full">
          <div className="w-full h-[120px] sm:h-[140px] md:h-[160px] lg:h-[200px] bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 relative hover:opacity-90 transition-all duration-300 group overflow-hidden rounded-b-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-300 via-blue-300 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-150 group-hover:rotate-3"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform group-hover:translate-x-full group-hover:-translate-y-full"></div>
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
              <Icon name="arrow-right-line" size="lg" className="text-white" />
            </div>
          </div>
        </Link>
      )
    }
  ]

  return (
    <Section paddingY="lg">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="space-y-12">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <H1>Built for Every Industry, Every Team</H1>
            <P className="text-muted-foreground">
              From startups to enterprises, Elevation AI adapts to your unique needs and industry requirements.
            </P>
          </div>
          
          {/* Mobile/Tablet Carousel Layout */}
          <div className="lg:hidden -mx-4 sm:-mx-6">
            <div className="overflow-x-auto scrollbar-hide py-4">
              <div className="flex gap-4 px-4 sm:px-6" style={{ width: 'max-content' }}>
                {industryCategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex-shrink-0 w-[280px] sm:w-[300px]"
                    style={{ 
                      height: '280px'
                    }}
                  >
                    <div className="group border border-border rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-transparent relative overflow-hidden h-full min-h-[280px]">
                      <div className="p-6 pb-0">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {category.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {category.description}
                        </p>
                        <div className="text-left">
                          <div className={`w-16 h-16 bg-gradient-to-br ${category.id === 'sales-marketing' ? 'from-blue-500/10 to-blue-600/10' : category.id === 'customer-support' ? 'from-green-500/10 to-green-600/10' : category.id === 'product-development' ? 'from-purple-500/10 to-purple-600/10' : category.id === 'operations' ? 'from-orange-500/10 to-orange-600/10' : 'from-indigo-500/10 to-indigo-600/10'} rounded-lg flex items-center justify-center`}>
                            <Icon name={category.id === 'sales-marketing' ? 'line-chart-line' : category.id === 'customer-support' ? 'customer-service-line' : category.id === 'product-development' ? 'code-s-slash-line' : category.id === 'operations' ? 'settings-3-line' : 'microscope-line'} size="2xl" className={category.id === 'sales-marketing' ? 'text-blue-600' : category.id === 'customer-support' ? 'text-green-600' : category.id === 'product-development' ? 'text-purple-600' : category.id === 'operations' ? 'text-orange-600' : 'text-indigo-600'} />
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0">
                        <Link href={`/website/solutions#${category.id}`} className="block w-full h-full">
                          <div className="w-full h-[60px] relative hover:opacity-90 transition-all duration-300 group overflow-hidden rounded-b-lg">
                            <ShaderComponent 
                              className="absolute inset-0 w-full h-full"
                              width={320}
                              height={60}
                              colors={categoryColors[category.id as keyof typeof categoryColors]}
                            />
                            <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/20' : 'bg-white/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
                              <Icon name="arrow-right-line" size="lg" className={isDarkMode ? 'text-white' : 'text-gray-700'} />
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {industryCategories.map((category) => {
              // Get the appropriate icon, color, and gradient for each category
              let iconName = "line-chart-line"
              let gradientClass = "from-blue-500/10 to-blue-600/10"
              let iconColor = "text-blue-600"
              let imageGradient = "from-slate-500 via-gray-500 to-zinc-600"
              
              switch (category.id) {
                case "sales-marketing": 
                  iconName = "line-chart-line"
                  gradientClass = "from-blue-500/10 to-blue-600/10"
                  iconColor = "text-blue-600"
                  imageGradient = "from-blue-500 via-cyan-500 to-teal-600"
                  break
                case "customer-support": 
                  iconName = "customer-service-line"
                  gradientClass = "from-green-500/10 to-green-600/10"
                  iconColor = "text-green-600"
                  imageGradient = "from-green-500 via-emerald-500 to-teal-600"
                  break
                case "product-development": 
                  iconName = "code-s-slash-line"
                  gradientClass = "from-purple-500/10 to-purple-600/10"
                  iconColor = "text-purple-600"
                  imageGradient = "from-purple-500 via-violet-500 to-indigo-600"
                  break
                case "operations": 
                  iconName = "settings-3-line"
                  gradientClass = "from-orange-500/10 to-orange-600/10"
                  iconColor = "text-orange-600"
                  imageGradient = "from-orange-500 via-amber-500 to-yellow-500"
                  break
                case "research-development": 
                  iconName = "microscope-line"
                  gradientClass = "from-indigo-500/10 to-indigo-600/10"
                  iconColor = "text-indigo-600"
                  imageGradient = "from-indigo-500 via-blue-500 to-cyan-500"
                  break
                default:
                  iconName = "line-chart-line"
                  gradientClass = "from-blue-500/10 to-blue-600/10"
                  iconColor = "text-blue-600"
                  imageGradient = "from-slate-500 via-gray-500 to-zinc-600"
              }
              
              return (
                <div
                  key={category.id}
                  className="group border border-border rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-transparent relative overflow-hidden min-h-[400px]"
                >
                  <div className="p-6 pb-0">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="text-left">
                      <div className={`w-16 h-16 bg-gradient-to-br ${gradientClass} rounded-lg flex items-center justify-center`}>
                        <Icon name={iconName} size="2xl" className={iconColor} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0">
                    <Link href={`/website/solutions#${category.id}`} className="block w-full h-full">
                      <div className="w-full h-[60px] sm:h-[70px] md:h-[120px] lg:h-[180px] relative hover:opacity-90 transition-all duration-300 group overflow-hidden rounded-b-lg">
                        <ShaderComponent 
                          className="absolute inset-0 w-full h-full"
                          width={400}
                          height={180}
                          colors={categoryColors[category.id as keyof typeof categoryColors]}
                        />
                        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/20' : 'bg-white/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
                          <Icon name="arrow-right-line" size="lg" className={isDarkMode ? 'text-white' : 'text-gray-700'} />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}

// CTA Section
function CTASection() {
  return (
    <Section paddingY="lg" className="bg-muted/30">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <H1>Ready to Transform Your Organization?</H1>
            <P className="text-muted-foreground leading-relaxed">
              Custom plans built for your organization's specific needs and growth trajectory. Join thousands of organizations already using Elevation AI to unlock the power of intelligent automation.
            </P>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/website/sign-up">
                Get Started
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/website/pricing">
                Get Custom Pricing
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default function WireframesPlatformPage() {
  // Handle scroll to section on page load with hash
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash
      if (hash) {
        // Remove the # from the hash
        const targetId = hash.substring(1)
        const targetElement = document.getElementById(targetId)
        
        if (targetElement) {
          // Add a small delay to ensure the page is fully rendered
          setTimeout(() => {
            const offset = 120 // Account for header height
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY
            const offsetPosition = elementPosition - offset
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }, 100)
        }
      }
    }

    // Handle initial load
    handleHashScroll()

    // Handle hash changes (in case user navigates with hash)
    window.addEventListener('hashchange', handleHashScroll)

    return () => {
      window.removeEventListener('hashchange', handleHashScroll)
    }
  }, [])

  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader currentPage="platform" />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="platform" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          {/* Sticky Sub Navigation */}
          <PlatformSubNav />
          
          <main>
            {/* Platform Hero Section */}
            <PlatformHeroSection />


            {/* Platform Features Section */}
            <div id="features" className="pt-14">
              <PlatformFeaturesSection />
            </div>

            {/* Security Section */}
            <div id="security" className="pt-14">
              <SecuritySection />
            </div>

            {/* Integrations Section */}
            <div id="integrations" className="pt-14">
              <IntegrationsSection />
            </div>

            {/* Use Cases Section */}
            <UseCasesSection />

            {/* CTA Section */}
            <CTASection />
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
