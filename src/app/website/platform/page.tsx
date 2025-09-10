"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { H1, H2, H3, BodyLarge, P } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { FutureReady } from "@/components/animations"
import { WIPBanner } from "@/components/ui/wip-banner"

// Platform Hero Section Component
function PlatformHeroSection() {

  return (
    <Section 
      paddingY="lg" 
      className="flex items-center min-h-screen pt-8 sm:pt-0 relative overflow-hidden"
    >
      <Container size="2xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-semibold leading-tight">
                The Operating System for
                <span className="block">the Agentic Era</span>
              </div>
              <BodyLarge className="text-muted-foreground max-w-2xl">
                The Elevation AI platform is the central, agentic backbone that unifies your universe, provides intelligent workspaces, and securely connects you to the world of AI.
              </BodyLarge>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                <Link href="/website/sign-up">
                  Get Started
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
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

              {/* Future Ready Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <FutureReady 
                  width={600} 
                  height={400} 
                  showBorder={false}
                />
              </div>

            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}


// Platform Components Section
function PlatformComponentsSection() {
  return (
    <Section paddingY="lg" className="bg-muted/30">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="space-y-16">
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <H2>Platform Components</H2>
            <BodyLarge className="text-muted-foreground">
              Our platform consists of five core components that work together to create a comprehensive AI-powered operating system for your organization.
            </BodyLarge>
          </div>

          {/* Knowledge Graph */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[70vh]">
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
              <H3>Your Company's Private Brain</H3>
              <BodyLarge className="text-muted-foreground">
                We start by creating a secure, dynamic Knowledge Graph of your entire business—capturing the unstructured information from meetings, emails, and documents. This becomes your unique, private intelligence layer, the single source of truth that powers everything.
              </BodyLarge>
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
            <div className="lg:col-span-6 h-[70vh] bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-border/50 flex items-center justify-center">
              <P className="text-muted-foreground text-lg">Knowledge Graph Visualization</P>
            </div>
          </div>

          {/* Workspaces & Canvases */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[70vh]">
            <div className="lg:col-span-6 h-[70vh] bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-border/50 flex items-center justify-center order-2 lg:order-1">
              <P className="text-muted-foreground text-lg">Workspace Interface</P>
            </div>
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2 flex flex-col justify-center">
              <H3>A Place to Work</H3>
              <BodyLarge className="text-muted-foreground">
                Our platform's Workspaces are the collaborative fabric where your teams, clients, and partners come together. Within a workspace, your unique knowledge graph informs every task and conversation, creating a single, intelligent place to execute both manual and automated work using our suite of Canvases, such as Pipelines and Flows.
              </BodyLarge>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[70vh]">
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
              <H3>Connect to the World of AI, Securely</H3>
              <BodyLarge className="text-muted-foreground">
                We act as the essential middleware layer for the agentic era. You plug into our platform once, and we handle the rest. Our team continuously searches for and integrates the best models, agents, and tools into our ecosystem. We then de-identify your sensitive data before it's used by these external resources and re-identify the results upon return, ensuring you can leverage the best of AI without the complexity or the security risk.
              </BodyLarge>
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
            <div className="lg:col-span-6 h-[70vh] bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-border/50 flex items-center justify-center">
              <P className="text-muted-foreground text-lg">AI Integration Hub</P>
            </div>
          </div>

          {/* Library */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[70vh]">
            <div className="lg:col-span-6 h-[70vh] bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-border/50 flex items-center justify-center order-2 lg:order-1">
              <P className="text-muted-foreground text-lg">Library Interface</P>
            </div>
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2 flex flex-col justify-center">
              <H3>Your Arsenal of Reusable Intelligence</H3>
              <BodyLarge className="text-muted-foreground">
                The Library is your central repository for all agentic resources. Here you can store, share, and reuse powerful Prompts, complex automated Flows, and specialized Agents. This allows you to codify your best practices and scale your most effective workflows across the entire organization.
              </BodyLarge>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[70vh]">
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
              <H3>Your Conversational Command Center</H3>
              <BodyLarge className="text-muted-foreground">
                Every user gets their own personal Co-pilot. Accessible via text, voice, or directly within the platform, it's your primary conversational interface to your entire universe. Use it to ask complex questions, create tasks, and trigger automated workflows using simple, natural language.
              </BodyLarge>
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
            <div className="lg:col-span-6 h-[70vh] bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-border/50 flex items-center justify-center">
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
  return (
    <Section paddingY="lg">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="space-y-12">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <H2>Enterprise-Grade Security & Compliance</H2>
            <BodyLarge className="text-muted-foreground">
              Your data security is our top priority. We implement industry-leading security measures and maintain compliance with the highest standards.
            </BodyLarge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="p-6 bg-background/50 rounded-2xl border border-border/50 space-y-4">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                <P className="text-muted-foreground text-sm font-medium">Data Protection Icon</P>
              </div>
              <H3>Data Protection</H3>
              <P className="text-muted-foreground">
                End-to-end encryption, zero-knowledge architecture
              </P>
            </div>
            <div className="p-6 bg-background/50 rounded-2xl border border-border/50 space-y-4">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                <P className="text-muted-foreground text-sm font-medium">Compliance Icon</P>
              </div>
              <H3>Compliance</H3>
              <P className="text-muted-foreground">
                SOC 2 Type II, GDPR, HIPAA ready
              </P>
            </div>
            <div className="p-6 bg-background/50 rounded-2xl border border-border/50 space-y-4">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                <P className="text-muted-foreground text-sm font-medium">Access Control Icon</P>
              </div>
              <H3>Access Control</H3>
              <P className="text-muted-foreground">
                Role-based permissions, multi-factor authentication
              </P>
            </div>
            <div className="p-6 bg-background/50 rounded-2xl border border-border/50 space-y-4">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                <P className="text-muted-foreground text-sm font-medium">Audit Trail Icon</P>
              </div>
              <H3>Audit Trail</H3>
              <P className="text-muted-foreground">
                Complete activity logging and monitoring
              </P>
            </div>
            <div className="p-6 bg-background/50 rounded-2xl border border-border/50 space-y-4">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                <P className="text-muted-foreground text-sm font-medium">Data Residency Icon</P>
              </div>
              <H3>Data Residency</H3>
              <P className="text-muted-foreground">
                Choose your data location and retention policies
              </P>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Integrations Section
function IntegrationsSection() {
  return (
    <Section paddingY="lg" className="bg-muted/30">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="space-y-12">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <H2>Connect Your Entire Universe</H2>
            <BodyLarge className="text-muted-foreground">
              Elevation AI is built to be the central hub of your operations. We connect with the tools you already use, bringing all your data and workflows into one secure control plane.
            </BodyLarge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="p-6 bg-background/50 rounded-2xl border border-border/50 space-y-4">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                <P className="text-muted-foreground text-sm font-medium">Productivity Icon</P>
              </div>
              <H3>Productivity</H3>
              <P className="text-muted-foreground">
                Google Workspace, Microsoft 365, Slack, Notion
              </P>
            </div>
            <div className="p-6 bg-background/50 rounded-2xl border border-border/50 space-y-4">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                <P className="text-muted-foreground text-sm font-medium">CRM & Sales Icon</P>
              </div>
              <H3>CRM & Sales</H3>
              <P className="text-muted-foreground">
                Salesforce, HubSpot, Pipedrive
              </P>
            </div>
            <div className="p-6 bg-background/50 rounded-2xl border border-border/50 space-y-4">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                <P className="text-muted-foreground text-sm font-medium">Development Icon</P>
              </div>
              <H3>Development</H3>
              <P className="text-muted-foreground">
                GitHub, GitLab, Jira, Confluence
              </P>
            </div>
            <div className="p-6 bg-background/50 rounded-2xl border border-border/50 space-y-4">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                <P className="text-muted-foreground text-sm font-medium">Communication Icon</P>
              </div>
              <H3>Communication</H3>
              <P className="text-muted-foreground">
                Zoom, Teams, Discord
              </P>
            </div>
            <div className="p-6 bg-background/50 rounded-2xl border border-border/50 space-y-4">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                <P className="text-muted-foreground text-sm font-medium">Data & Analytics Icon</P>
              </div>
              <H3>Data & Analytics</H3>
              <P className="text-muted-foreground">
                Tableau, Power BI, Google Analytics
              </P>
            </div>
            <div className="p-6 bg-background/50 rounded-2xl border border-border/50 space-y-4">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                <P className="text-muted-foreground text-sm font-medium">Custom APIs Icon</P>
              </div>
              <H3>Custom APIs</H3>
              <P className="text-muted-foreground">
                RESTful APIs, webhooks, custom connectors
              </P>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Use Cases Section
function UseCasesSection() {
  return (
    <Section paddingY="lg">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="space-y-12">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <H2>Built for Every Industry, Every Team</H2>
            <BodyLarge className="text-muted-foreground">
              From startups to enterprises, Elevation AI adapts to your unique needs and industry requirements.
            </BodyLarge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="p-4 bg-background/30 rounded-xl border border-border/30 hover:bg-background/50 transition-colors">
              <div className="flex gap-4 h-full">
                <div className="w-16 h-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="line-chart-line" size="2xl" className="text-blue-600" />
                </div>
                <div className="flex flex-col justify-center space-y-2">
                  <H3 className="text-lg">Sales & Marketing</H3>
                  <P className="text-muted-foreground text-sm">
                    Lead qualification, content generation, campaign optimization
                  </P>
                </div>
              </div>
            </div>
            <div className="p-4 bg-background/30 rounded-xl border border-border/30 hover:bg-background/50 transition-colors">
              <div className="flex gap-4 h-full">
                <div className="w-16 h-full bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="customer-service-line" size="2xl" className="text-green-600" />
                </div>
                <div className="flex flex-col justify-center space-y-2">
                  <H3 className="text-lg">Customer Support</H3>
                  <P className="text-muted-foreground text-sm">
                    Intelligent ticketing, knowledge base automation
                  </P>
                </div>
              </div>
            </div>
            <div className="p-4 bg-background/30 rounded-xl border border-border/30 hover:bg-background/50 transition-colors">
              <div className="flex gap-4 h-full">
                <div className="w-16 h-full bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="code-s-slash-line" size="2xl" className="text-purple-600" />
                </div>
                <div className="flex flex-col justify-center space-y-2">
                  <H3 className="text-lg">Product Development</H3>
                  <P className="text-muted-foreground text-sm">
                    Requirements analysis, testing automation
                  </P>
                </div>
              </div>
            </div>
            <div className="p-4 bg-background/30 rounded-xl border border-border/30 hover:bg-background/50 transition-colors">
              <div className="flex gap-4 h-full">
                <div className="w-16 h-full bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="settings-3-line" size="2xl" className="text-orange-600" />
                </div>
                <div className="flex flex-col justify-center space-y-2">
                  <H3 className="text-lg">Operations</H3>
                  <P className="text-muted-foreground text-sm">
                    Process optimization, compliance monitoring
                  </P>
                </div>
              </div>
            </div>
            <div className="p-4 bg-background/30 rounded-xl border border-border/30 hover:bg-background/50 transition-colors">
              <div className="flex gap-4 h-full">
                <div className="w-16 h-full bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="microscope-line" size="2xl" className="text-indigo-600" />
                </div>
                <div className="flex flex-col justify-center space-y-2">
                  <H3 className="text-lg">Research & Development</H3>
                  <P className="text-muted-foreground text-sm">
                    Data analysis, hypothesis testing
                  </P>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Pricing Section
function PricingSection() {
  return (
    <Section paddingY="lg" className="bg-blue-500/10">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="space-y-12">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <H2>Flexible Plans for Every Organization</H2>
            <BodyLarge className="text-muted-foreground">
              Choose the plan that fits your needs, with the ability to scale as you grow.
            </BodyLarge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="p-8 border border-border rounded-3xl bg-blue-500/10 backdrop-blur-sm space-y-6 hover:border-primary/50 transition-colors">
              <div className="flex justify-center">
                <Image
                  src="/images/branding/E-AI-Circle.svg"
                  alt="Elevation AI Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16 dark:invert"
                />
              </div>
              <div className="space-y-3 text-center">
                <H3>Starter</H3>
                <P className="text-muted-foreground">For small teams getting started</P>
              </div>
            </div>
            <div className="p-8 border border-border rounded-3xl bg-blue-500/10 backdrop-blur-sm space-y-6 hover:border-primary/50 transition-colors">
              <div className="flex justify-center">
                <Image
                  src="/images/branding/E-AI-Circle.svg"
                  alt="Elevation AI Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16 dark:invert"
                />
              </div>
              <div className="space-y-3 text-center">
                <H3>Professional</H3>
                <P className="text-muted-foreground">For growing organizations</P>
              </div>
            </div>
            <div className="p-8 border border-border rounded-3xl bg-blue-500/10 backdrop-blur-sm space-y-6 hover:border-primary/50 transition-colors">
              <div className="flex justify-center">
                <Image
                  src="/images/branding/E-AI-Circle.svg"
                  alt="Elevation AI Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16 dark:invert"
                />
              </div>
              <div className="space-y-3 text-center">
                <H3>Enterprise</H3>
                <P className="text-muted-foreground">For large organizations with custom needs</P>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/website/pricing">
                View our Pricing
              </Link>
            </Button>
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
            <H2>Ready to Transform Your Organization?</H2>
            <BodyLarge className="text-muted-foreground leading-relaxed">
              Join thousands of organizations already using Elevation AI to unlock the power of intelligent automation.
            </BodyLarge>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/website/sign-up">
                Get Started
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/website/demo">
                Request a Demo
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default function WireframesPlatformPage() {
  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader currentPage="platform" />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="platform" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            {/* WIP Banner */}
            <div className="pt-8">
              <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
                <WIPBanner />
              </Container>
            </div>
            
            {/* Platform Hero Section */}
            <PlatformHeroSection />


            {/* Platform Components Section */}
            <PlatformComponentsSection />

            {/* Security Section */}
            <SecuritySection />

            {/* Integrations Section */}
            <IntegrationsSection />

            {/* Use Cases Section */}
            <UseCasesSection />

            {/* Pricing Section */}
            <PricingSection />

            {/* CTA Section */}
            <CTASection />
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
