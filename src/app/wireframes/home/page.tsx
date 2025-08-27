"use client"

import React from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Grid } from "@/components/ui/layout/grid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/ui/logo"
import { Separator } from "@/components/ui/separator"
import Icon from "@/components/ui/icon"
import { H1, H2, H3, H4, BodyLarge, BodySmall, DisplayLarge } from "@/components/ui/typography"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedFavicon } from "@/components/ui/animated-favicon"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Header Component
function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 flex h-16 sm:h-18 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo width={100} height={18} className="sm:w-[120px] sm:h-[21px]" />
          </Link>
        </div>

        {/* Center Navigation */}
        <nav className="hidden xl:flex items-center space-x-4">
          {/* Home */}
          <Link href="/" className="text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-muted/50 px-3 py-2 rounded-md">
            Home
          </Link>
          
          {/* Platform */}
          <Link href="/platform" className="text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-muted/50 px-3 py-2 rounded-md">
            Platform
          </Link>
          
          {/* Solutions Dropdown */}
          <div className="relative group">
            <button className="text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-muted/50 px-3 py-2 rounded-md flex items-center gap-1">
              Solutions
              <Icon name="arrow-down-s-line" className="h-4 w-4" />
            </button>
            {/* Mega menu for Solutions */}
            <div className="absolute top-full left-0 mt-2 w-[600px] bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-6 grid grid-cols-2 gap-8">
                {/* By Industry */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">By Industry</h3>
                  <ul className="space-y-3">
                    <li><Link href="/solutions/private-markets" className="text-sm hover:text-primary transition-colors">Private Market Organizations</Link></li>
                    <li><Link href="/solutions/public-markets" className="text-sm hover:text-primary transition-colors">Public Market Organizations</Link></li>
                    <li><Link href="/solutions/banks" className="text-sm hover:text-primary transition-colors">Banks</Link></li>
                    <li><Link href="/solutions/enterprise" className="text-sm hover:text-primary transition-colors">Enterprise</Link></li>
                    <li><Link href="/solutions/government" className="text-sm hover:text-primary transition-colors">Government</Link></li>
                  </ul>
                </div>
                
                {/* By Stage */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">By Stage</h3>
                  <ul className="space-y-3">
                    <li><Link href="/solutions/creating-growing" className="text-sm hover:text-primary transition-colors">Creating & Growing a New Venture</Link></li>
                    <li><Link href="/solutions/scaling" className="text-sm hover:text-primary transition-colors">Scaling a Venture</Link></li>
                    <li><Link href="/solutions/exiting" className="text-sm hover:text-primary transition-colors">Exiting a Venture</Link></li>
                    <li><Link href="/solutions/post-ipo" className="text-sm hover:text-primary transition-colors">Post-IPO Growth</Link></li>
                    <li><Link href="/solutions/family-office" className="text-sm hover:text-primary transition-colors">Post-Exit Family Office Creation</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pricing */}
          <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-muted/50 px-3 py-2 rounded-md">
            Pricing
          </Link>
          
          {/* Resources Dropdown */}
          <div className="relative group">
            <button className="text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-muted/50 px-3 py-2 rounded-md flex items-center gap-1">
              Resources
              <Icon name="arrow-down-s-line" className="h-4 w-4" />
            </button>
            {/* Dropdown menu for Resources */}
            <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-4 space-y-3">
                <Link href="/security" className="block text-sm hover:text-primary transition-colors">Security</Link>
                <Link href="/careers" className="block text-sm hover:text-primary transition-colors">Careers</Link>
                <Link href="/partners" className="block text-sm hover:text-primary transition-colors">Partners</Link>
                <Link href="/investors" className="block text-sm hover:text-primary transition-colors">Investors</Link>
                <Link href="/developers" className="block text-sm hover:text-primary transition-colors">For Developers & Platforms</Link>
                <Link href="/blog" className="block text-sm hover:text-primary transition-colors">Blog + News</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Right CTAs */}
        <div className="hidden lg:flex items-center space-x-3">
          <Button variant="outline" size="sm" className="text-xs xl:text-sm hover:bg-muted/50">
            Explore the Platform
          </Button>
          <Button size="sm" className="text-xs xl:text-sm hover:bg-primary/90">
            Request a Demo
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-muted/50">
            <Icon name="menu-line" className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

// Hero Section
function HeroSection() {
  return (
    <Section paddingY="2xl" className="min-h-[80vh] flex items-center">
      <Container size="2xl">
        <Grid cols={{ base: 1, lg: 2 }} className="items-center gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <H1 className="text-4xl sm:text-5xl lg:text-6xl">
                Your Universe. Intelligently Orchestrated.
              </H1>
              <BodyLarge className="text-muted-foreground max-w-2xl">
                We are an agentic knowledge and work orchestration platform, helping you adapt to the agentic era through our platform and concierge team.
              </BodyLarge>
            </div>
            <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              Request a Demo
            </Button>
          </div>

          {/* Right Visual */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl lg:rounded-2xl flex items-center justify-center border border-border/50 overflow-hidden">
            {/* Static Grid of Dots Background */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm">
              {/* Light mode dots */}
              <div 
                className="absolute inset-0 dark:hidden"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.1) 2px, transparent 0)
                  `,
                  backgroundSize: '32px 32px',
                  backgroundPosition: '0 0'
                }}
              />
              
              {/* Dark mode dots */}
              <div 
                className="absolute inset-0 hidden dark:block"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 2px, transparent 0)
                  `,
                  backgroundSize: '32px 32px',
                  backgroundPosition: '0 0'
                }}
              />
            </div>

            {/* Perlin Icon */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex items-center justify-center relative z-10">
              <AnimatedFavicon 
                width={128} 
                height={128} 
                className="sm:w-40 sm:h-40 lg:w-48 lg:h-48"
              />
            </div>
          </div>
        </Grid>
      </Container>
    </Section>
  )
}

// Problem We Solve Section
function ProblemSection() {
  const [activeStep, setActiveStep] = React.useState(0)
  const sectionRef = React.useRef<HTMLDivElement>(null)
  
  const problems = [
    {
      title: "Unified Knowledge Platform",
      description: "Transform fragmented systems into a single source of truth. We break down the walls between your departments and tools, creating a unified platform where no more hunting for that one file you know you saw in an email three weeks ago.",
      icon: "database-2-line"
    },
    {
      title: "Intelligent Process Automation",
      description: "Eliminate operational bottlenecks with smart automation. We identify and automate the manual, repetitive processes that slow down your growth, freeing your best people from manual data entry to focus on what they were hired to do.",
      icon: "loader-4-line"
    },
    {
      title: "Real-Time Business Intelligence",
      description: "Overcome lack of visibility with comprehensive insights. We provide a unified command center that gives you a real-time, holistic view of your entire business operations.",
      icon: "eye-line"
    },
    {
      title: "Future-Ready Strategic Advantage",
      description: "Mitigate strategic risk and lead the agentic era. We provide the platform and partnership to ensure you are not just keeping up, but leading the way in the new AI-powered business landscape.",
      icon: "shield-check-line"
    }
  ]

  // Scroll-triggered carousel
  React.useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const containerHeight = 400 // Approximate height of the carousel container
      
      // Calculate which step should be active based on scroll position
      if (rect.top <= 0 && rect.bottom >= containerHeight) {
        // Section is in viewport, calculate step based on scroll position
        const scrollProgress = Math.abs(rect.top) / containerHeight
        const step = Math.min(Math.floor(scrollProgress + 0.5), problems.length - 1)
        setActiveStep(Math.max(0, step))
      } else if (rect.top > 0) {
        // Section is above viewport
        setActiveStep(0)
      } else {
        // Section is below viewport
        setActiveStep(problems.length - 1)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [problems.length])

    return (
    <Section paddingY="xl" className="bg-muted/30">
      <Container size="2xl">
        <div className="space-y-12 lg:space-y-16">
          {/* Scroll-triggered Carousel */}
          <div className="relative" ref={sectionRef}>
            {/* Carousel Container */}
            <div className="sticky top-20 h-[calc(100vh-5rem)] flex items-center justify-center py-4">
              <div className="w-full max-w-6xl relative">
                {/* Section Header */}
                <div className="text-center space-y-4 lg:space-y-6 max-w-3xl mx-auto mb-8">
                  <H2 className="text-3xl sm:text-4xl lg:text-5xl">From Fragmentation to Focus</H2>
                  <BodyLarge className="text-muted-foreground text-lg leading-relaxed">
                    Your business's greatest asset—its collective knowledge and data—is trapped. It's scattered across disconnected applications, siloed in team conversations, and buried in documents.
                  </BodyLarge>
                </div>
                {/* Carousel Container */}
                <div className="relative h-96">
                  {problems.map((problem, index) => (
                    <div
                      key={index}
                      className={`transition-opacity duration-75 absolute inset-0 ${
                        index === activeStep
                          ? 'opacity-100'
                          : 'opacity-0 pointer-events-none'
                      }`}
                    >
                    <div className="flex">
                      {/* Step Indicators */}
                      <div className="flex flex-col w-16">
                        {problems.map((_, stepIndex) => (
                          <button
                            key={stepIndex}
                            onClick={() => setActiveStep(stepIndex)}
                            className={`flex-1 border-2 flex items-center justify-center text-base font-medium transition-all duration-300 ${
                              stepIndex === activeStep
                                ? 'bg-primary border-primary text-white shadow-lg'
                                : stepIndex < activeStep
                                ? 'bg-primary/20 border-0 text-primary'
                                : 'bg-background border-muted text-muted-foreground hover:border-primary/50'
                            } ${
                              stepIndex === 0 ? 'rounded-tl-lg' : ''
                            } ${
                              stepIndex === problems.length - 1 ? 'rounded-bl-lg' : ''
                            }`}
                          >
                            {stepIndex + 1}
                          </button>
                        ))}
                      </div>
                      
                      {/* Card Content */}
                      <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 transition-colors duration-300 flex-1 rounded-l-none">
                        <CardHeader className="pt-8 pb-8">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            {/* Image Placeholder */}
                            <div className="h-[300px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center border border-border/50">
                              <BodyLarge className="text-muted-foreground">Visual Placeholder</BodyLarge>
                            </div>
                            
                            {/* Content */}
                            <div className="space-y-4">
                              <H3 className="text-3xl lg:text-4xl">{problem.title}</H3>
                              <BodyLarge className="text-muted-foreground leading-relaxed">
                                {problem.description}
                              </BodyLarge>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
            
            {/* Scroll Spacer */}
            <div className="h-[200vh]"></div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Unifying Statement Section
function UnifyingStatementSection() {
  return (
    <Section paddingY="xl" className="relative overflow-hidden">
      {/* Blue/Transparent Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-blue-600/15 to-blue-500/20" />
      
      <Container size="2xl" className="relative z-10">
        <div className="max-w-4xl">
          <DisplayLarge className="text-primary">
            Elevation AI unifies your universe, transforming this chaos into your most powerful competitive advantage.
          </DisplayLarge>
        </div>
      </Container>
    </Section>
  )
}

// Platform Overview Section
function PlatformSection() {
  const [activeTab, setActiveTab] = React.useState(0)
  const sectionRef = React.useRef<HTMLDivElement>(null)
  
  const features = [
    {
      title: "The Knowledge Graph",
      description: "The secure, private intelligence layer of your business.",
      icon: "node-tree"
    },
    {
      title: "Workspaces & Canvases",
      description: "The collaborative fabric for executing work.",
      icon: "layout-grid-line"
    },
    {
      title: "The Agentic Engine",
      description: "The orchestration layer that connects your knowledge to a world of AI agents or tools, securely.",
      icon: "cpu-line"
    },
    {
      title: "Your Personal Co-pilot",
      description: "A conversational command center to interact with your entire universe using natural language.",
      icon: "message-3-line"
    }
  ]

  // Scroll-triggered tab switching
  React.useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const containerHeight = 400 // Approximate height of the tab container
      
      // Calculate which tab should be active based on scroll position
      if (rect.top <= 0 && rect.bottom >= containerHeight) {
        // Section is in viewport, calculate tab based on scroll position
        const scrollProgress = Math.abs(rect.top) / containerHeight
        const tab = Math.min(Math.floor(scrollProgress + 0.5), features.length - 1)
        setActiveTab(Math.max(0, tab))
      } else if (rect.top > 0) {
        // Section is above viewport
        setActiveTab(0)
      } else {
        // Section is below viewport
        setActiveTab(features.length - 1)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [features.length])

  return (
    <Section paddingY="xl">
      <Container size="2xl">
        <div className="space-y-12 lg:space-y-16">
          {/* Scroll-triggered Tabbed Interface */}
          <div className="relative" ref={sectionRef}>
            {/* Sticky Tab Container */}
            <div className="sticky top-20 h-[calc(100vh-5rem)] flex items-center justify-center bg-background py-4">
              <div className="w-full max-w-6xl">
                {/* Section Header */}
                <div className="text-center space-y-4 lg:space-y-6 max-w-3xl mx-auto mb-8">
                  <H2 className="text-3xl sm:text-4xl lg:text-5xl">The Elevation AI Platform</H2>
                  <BodyLarge className="text-muted-foreground">
                    A unified, agentic platform to power your entire operation.
                  </BodyLarge>
                </div>
                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-8">
                  {features.map((feature, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeTab === index
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {feature.title}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="relative">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`transition-opacity duration-75 ${
                        activeTab === index
                          ? 'opacity-100'
                          : 'opacity-0 absolute inset-0 pointer-events-none'
                      }`}
                    >
                      <Card className="border-border/50 transition-colors duration-300">
                        <CardHeader className="pb-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                  <Icon name={feature.icon} size="2xl" className="text-blue-600" />
                                </div>
                                <CardTitle className="text-2xl lg:text-3xl">{feature.title}</CardTitle>
                              </div>
                              <BodyLarge className="text-muted-foreground text-lg leading-relaxed">
                                {feature.description}
                              </BodyLarge>
                              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                                Explore the Platform
                              </Button>
                            </div>
                            <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl flex items-center justify-center">
                              <BodyLarge className="text-muted-foreground">Platform Visualization</BodyLarge>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Scroll Spacer */}
            <div className="h-[200vh]"></div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// How We Do It Section
function HowWeDoItSection() {
  const approaches = [
    {
      title: "The Elevation AI Platform",
      description: "The central, agentic backbone that unifies your universe, provides intelligent workspaces, and securely connects you to the world of AI.",
      icon: "elevation-ai-logo"
    },
    {
      title: "Your Agentic Concierge Team",
      description: "Technology alone isn't enough. For clients who need a deep, hands-on partnership, our dedicated team of expert engineers and strategists acts as your team to design, build, and implement the specific solutions that solve your biggest challenges.",
      icon: "team-line"
    },
    {
      title: "Our Expert & Partner Network",
      description: "We extend your capabilities with a network of specialized consulting firms and individual experts who natively use our platform. This allows them to seamlessly embed themselves into your organization, collaborating directly within your workspaces to solve specific challenges and extend your team's capacity to execute.",
      icon: "global-line"
    }
  ]

  return (
    <Section paddingY="xl" className="bg-muted/30">
      <Container size="2xl">
        <div className="space-y-12 lg:space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4 lg:space-y-6 max-w-3xl mx-auto">
            <H2 className="text-3xl sm:text-4xl lg:text-5xl">More Than a Platform. A Partnership.</H2>
          </div>

          {/* Modern Tech Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {approaches.map((approach, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50 transition-colors duration-300 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="pb-6 relative z-10">
                  <div className="space-y-4">
                    {/* Icon and Title Row */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                        {approach.icon === "elevation-ai-logo" ? (
                          <img 
                            src="/images/Favicon-Stroke.png" 
                            alt="Elevation AI" 
                            className="w-6 h-6"
                          />
                        ) : (
                          <Icon name={approach.icon} size="2xl" className="text-primary" />
                        )}
                      </div>
                      <CardTitle className="text-lg lg:text-xl">{approach.title}</CardTitle>
                    </div>
                    
                    {/* Description */}
                    <BodyLarge className="text-muted-foreground leading-relaxed">
                      {approach.description}
                    </BodyLarge>
                    
                    {/* Learn More Link */}
                    <div className="pt-2">
                      <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent">
                        Learn more →
                      </Button>
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

// Who We Serve Section
function WhoWeServeSection() {
  const solutions = [
    {
      title: "Private Market Organizations",
      description: "The agentic backbone for the entire private capital lifecycle.",
      icon: "building-2-line"
    },
    {
      title: "Public Market Organizations",
      description: "A unified intelligence platform for modern investment management.",
      icon: "store-line"
    },
    {
      title: "Banks",
      description: "A secure platform to automate compliance, enhance risk management, and improve customer service.",
      icon: "bank-line"
    },
    {
      title: "Enterprise",
      description: "The secure control plane for growing and established organizations.",
      icon: "briefcase-line"
    },
    {
      title: "Government",
      description: "A secure, compliant, and auditable platform for the public sector.",
      icon: "government-line"
    }
  ]

  return (
    <Section paddingY="xl">
      <Container size="2xl">
        <div className="space-y-12 lg:space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4 lg:space-y-6 max-w-3xl mx-auto">
            <H2 className="text-3xl sm:text-4xl lg:text-5xl">Solutions for Your Unique Universe</H2>
            <BodyLarge className="text-muted-foreground">
              We provide tailored solutions for your specific industry, all powered by our core platform and expert concierge team.
            </BodyLarge>
          </div>

          {/* Cards Grid - Better Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50 transition-colors duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                              <Icon name={solution.icon} size="2xl" className="text-primary" />
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-lg lg:text-xl">{solution.title}</CardTitle>
                      <BodyLarge className="text-muted-foreground">{solution.description}</BodyLarge>
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

// Closing CTA Section
function ClosingCTASection() {
  return (
    <Section paddingY="xl" className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
      <Container size="2xl">
        <div className="text-center space-y-8 lg:space-y-12 max-w-4xl mx-auto">
          <div className="space-y-4 lg:space-y-6">
            <H2 className="text-3xl sm:text-4xl lg:text-5xl">Elevate Your Organization</H2>
            <BodyLarge className="text-muted-foreground">
              From strategy to execution, Elevation AI unifies your knowledge, secures your operation, and empowers your teams to operate with clarity in the agentic era.
            </BodyLarge>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              Request a Demo
            </Button>
            <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              Explore the Platform
            </Button>
          </div>
          
          <BodySmall className="text-muted-foreground">
            Private by design · Built for complex organizations
          </BodySmall>
        </div>
      </Container>
    </Section>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="border-t bg-muted/30 transition-colors duration-300">
      <Container size="2xl">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <Logo width={120} height={21} />
              <BodySmall className="text-muted-foreground">
                Your Universe. Intelligently Orchestrated.
              </BodySmall>
            </div>
            
            {/* Platform */}
            <div className="space-y-4">
              <H3 className="text-base font-semibold">Platform</H3>
              <ul className="space-y-2">
                <li><Link href="/platform" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Overview</Link></li>
                <li><Link href="/platform/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="/platform/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Security</Link></li>
                <li><Link href="/platform/integrations" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Integrations</Link></li>
              </ul>
            </div>
            
            {/* Solutions */}
            <div className="space-y-4">
              <H3 className="text-base font-semibold">Solutions</H3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2">By Industry</h4>
                  <ul className="space-y-2">
                    <li><Link href="/solutions/private-markets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Private Markets</Link></li>
                    <li><Link href="/solutions/public-markets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Public Markets</Link></li>
                    <li><Link href="/solutions/banks" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Banks</Link></li>
                    <li><Link href="/solutions/enterprise" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Enterprise</Link></li>
                    <li><Link href="/solutions/government" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Government</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2">By Stage</h4>
                  <ul className="space-y-2">
                    <li><Link href="/solutions/creating-growing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Creating & Growing</Link></li>
                    <li><Link href="/solutions/scaling" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Scaling</Link></li>
                    <li><Link href="/solutions/exiting" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Exiting</Link></li>
                    <li><Link href="/solutions/post-ipo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Post-IPO</Link></li>
                    <li><Link href="/solutions/family-office" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Family Office</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Resources */}
            <div className="space-y-4">
              <H3 className="text-base font-semibold">Resources</H3>
              <ul className="space-y-2">
                <li><Link href="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Security</Link></li>
                <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="/partners" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Partners</Link></li>
                <li><Link href="/investors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Investors</Link></li>
                <li><Link href="/developers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Developers</Link></li>
                <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog + News</Link></li>
              </ul>
            </div>
            
            {/* Company */}
            <div className="space-y-4">
              <H3 className="text-base font-semibold">Company</H3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 lg:my-12" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <BodySmall className="text-muted-foreground">
              © 2025 Elevation AI. All rights reserved.
            </BodySmall>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default function WireframesHomePage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Header />
        
        <main>
          <HeroSection />
          <ProblemSection />
          <UnifyingStatementSection />
          <PlatformSection />
          <HowWeDoItSection />
          <WhoWeServeSection />
          <ClosingCTASection />
        </main>
        
        <Footer />
      </div>
    </PageWrapper>
  )
}
