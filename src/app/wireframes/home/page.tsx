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
import { calculateActiveSlide, getScrollSpacerHeight } from "@/lib/scroll-standards"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { useMobileMenu } from "@/components/ui/layout/mobile-only-layout"

// Typewriter Text Component
function TypewriterText({ text, speed = 200, delay = 0, skipAnimation = false }: { text: string; speed?: number; delay?: number; skipAnimation?: boolean }) {
  const [displayText, setDisplayText] = React.useState("")
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0)
  const [isTyping, setIsTyping] = React.useState(false)

  // Split text into words
  const words = text.split(" ")

  // Reset animation on mount and when text changes
  React.useEffect(() => {
    if (skipAnimation) {
      // If skipping animation, show full text immediately
      setDisplayText(text)
      setCurrentWordIndex(words.length)
      setIsTyping(false)
    } else {
      setDisplayText("")
      setCurrentWordIndex(0)
      setIsTyping(false)
    }
  }, [text, words.length]) // Removed skipAnimation from dependencies to prevent reset

  // Handle skipAnimation changes
  React.useEffect(() => {
    if (skipAnimation) {
      // If skipping animation, show full text immediately
      setDisplayText(text)
      setCurrentWordIndex(words.length)
      setIsTyping(false)
    }
  }, [skipAnimation, text, words.length])

  React.useEffect(() => {
    if (skipAnimation) return // Don't start typing if skipping animation
    
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setIsTyping(true)
      }, delay)
      return () => clearTimeout(delayTimer)
    } else {
      setIsTyping(true)
    }
  }, [delay, skipAnimation])

  React.useEffect(() => {
    if (skipAnimation || !isTyping || currentWordIndex >= words.length) return

    const timer = setTimeout(() => {
      setDisplayText(words.slice(0, currentWordIndex + 1).join(" "))
      setCurrentWordIndex(currentWordIndex + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [currentWordIndex, words, speed, isTyping, skipAnimation])

  return (
    <span className="inline-block min-h-[1.2em] leading-tight">
      {displayText}
      {isTyping && currentWordIndex < words.length && !skipAnimation && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  )
}

// Header Component
function Header() {
  const { setMobileMenuOpen } = useMobileMenu()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <div className="w-full px-4 sm:px-4 md:px-6 lg:px-8 flex h-14 sm:h-18 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo width={110} height={20} />
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
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 sm:h-10 sm:w-10 hover:bg-muted/50"
            onClick={() => setMobileMenuOpen(true)}
          >
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
    <Section paddingY="xl" className="min-h-[70vh] sm:min-h-[80vh] flex items-center">
      <Container size="2xl" className="px-4 sm:px-6">
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 text-left">
            <div className="space-y-4 sm:space-y-6">
              <H1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                Your Universe. Intelligently Orchestrated.
              </H1>
              <BodyLarge className="text-muted-foreground max-w-2xl text-base sm:text-lg leading-relaxed">
                We are an agentic knowledge and work orchestration platform, helping you adapt to the agentic era through our platform and concierge team.
              </BodyLarge>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                Request a Demo
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative h-[250px] sm:h-[400px] lg:h-[500px] rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center border border-border/50 overflow-hidden">
            {/* Static Grid of Dots Background */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm">
              {/* Light mode dots */}
              <div 
                className="absolute inset-0 dark:hidden"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.1) 2px, transparent 0)
                  `,
                  backgroundSize: '24px 24px',
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
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0'
                }}
              />
            </div>

            {/* Perlin Icon */}
            <div className="w-29 h-29 sm:w-60 sm:h-60 lg:w-72 lg:h-72 flex items-center justify-center relative z-10 mx-auto">
              <AnimatedFavicon 
                width={116} 
                height={116} 
                className="sm:w-60 sm:h-60 lg:w-72 lg:h-72"
              />
            </div>
          </div>
        </div>
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

  // Scroll-triggered carousel with standardized behavior
  React.useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      // Responsive container height calculation matching actual container heights
      let containerHeight
      if (window.innerWidth >= 1536) { // 2XL
        containerHeight = 550 // matches h-[550px]
      } else if (window.innerWidth >= 1400) { // XL (adjusted for 14" MacBook Pro)
        containerHeight = 500 // matches h-[500px]
      } else { // LG
        containerHeight = 450 // matches h-[450px]
      }
      
      // Calculate which step should be active based on scroll position
      if (rect.top <= 0 && rect.bottom >= containerHeight) {
        // Section is in viewport, use custom calculation for ProblemSection
        const scrollProgress = Math.abs(rect.top) / containerHeight
        
        // Custom logic: All slides get 400px more scroll space, third slide gets additional 100px (500px total), fourth slide gets additional 100px (500px total)
        const baseSlideHeight = containerHeight
        const firstSlideHeight = baseSlideHeight + 400 // 400px extra for first slide
        const secondSlideHeight = baseSlideHeight + 400 // 400px extra for second slide
        const thirdSlideHeight = baseSlideHeight + 500 // 500px extra for third slide (400px + 100px additional)
        const fourthSlideHeight = baseSlideHeight + 500 // 500px extra for fourth slide (400px + 100px additional)
        
        let activeStep = 0
        if (scrollProgress < (firstSlideHeight / containerHeight)) {
          // First slide
          activeStep = 0
        } else if (scrollProgress < ((firstSlideHeight + secondSlideHeight) / containerHeight)) {
          // Second slide with extra scroll space
          activeStep = 1
        } else if (scrollProgress < ((firstSlideHeight + secondSlideHeight + thirdSlideHeight) / containerHeight)) {
          // Third slide with extra scroll space
          activeStep = 2
        } else if (scrollProgress < ((firstSlideHeight + secondSlideHeight + thirdSlideHeight + fourthSlideHeight) / containerHeight)) {
          // Fourth slide
          activeStep = 3
        } else {
          // Section complete, stay on last slide
          activeStep = problems.length - 1
        }
        
        setActiveStep(activeStep)
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
      <Container size="2xl" className="px-4 sm:px-6">
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Mobile Header */}
          <div className="block lg:hidden text-left sm:text-center space-y-4 sm:space-y-6 max-w-3xl sm:mx-auto mb-8">
            <H2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">From Fragmentation to Focus</H2>
            <BodyLarge className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Your business's greatest asset—its collective knowledge and data—is trapped. It's scattered across disconnected applications, siloed in team conversations, and buried in documents. Elevation AI fixes this.
            </BodyLarge>
          </div>

          {/* Mobile Layout */}
          <div className="block lg:hidden">
            <div className="space-y-6">
              {problems.map((problem, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader className="pb-6">
                    <div className="space-y-6">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={problem.icon} size="2xl" className="text-primary" />
                        </div>
                        <H3 className="text-xl sm:text-2xl">{problem.title}</H3>
                      </div>
                      
                      {/* Description */}
                      <BodyLarge className="text-muted-foreground leading-relaxed">
                        {problem.description}
                      </BodyLarge>
                      
                      {/* Visual Placeholder */}
                      <div className="h-[200px] sm:h-[250px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center border border-border/50">
                        <BodyLarge className="text-muted-foreground">Visual Placeholder</BodyLarge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Desktop Layout - Scroll-triggered Carousel */}
          <div className="hidden lg:block relative" ref={sectionRef}>
            {/* Carousel Container */}
            <div className="sticky top-20 h-[calc(100vh-8rem)] flex items-center py-2 lg:py-2 xl:py-3 2xl:py-4">
              <div className="w-full h-[calc(100vh-12rem)] lg:h-[calc(100vh-11rem)] xl:h-[calc(100vh-10rem)] 2xl:h-[calc(100vh-9rem)] relative flex items-center">
                <div className="w-full flex flex-col items-center justify-center min-h-0">
                  {/* Section Header */}
                  <div className="text-center space-y-4 lg:space-y-6 xl:space-y-8 max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto mb-8 lg:mb-10 xl:mb-12">
                    <H2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">From Fragmentation to Focus</H2>
                    <BodyLarge className="text-muted-foreground text-lg lg:text-xl xl:text-2xl leading-relaxed">
                      Your business's greatest asset—its collective knowledge and data—is trapped. It's scattered across disconnected applications, siloed in team conversations, and buried in documents. Elevation AI fixes this.
                    </BodyLarge>
                  </div>
                  {/* Carousel Container */}
                  <div className="relative w-full h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[550px]">
                  {problems.map((problem, index) => (
                    <div
                      key={index}
                      className={`transition-opacity duration-75 absolute inset-0 ${
                        index === activeStep
                          ? 'opacity-100'
                          : 'opacity-0 pointer-events-none'
                      }`}
                    >
                    <div className="flex h-full">
                      {/* Step Indicators */}
                      <div className="flex flex-col w-20">
                        {problems.map((_, stepIndex) => (
                          <button
                            key={stepIndex}
                            onClick={() => setActiveStep(stepIndex)}
                            className={`flex-1 border-2 flex items-center justify-center text-lg font-medium transition-all duration-300 ${
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
                      <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 transition-colors duration-300 flex-1 rounded-l-none h-full">
                        <CardHeader className="h-full flex flex-col justify-center p-6 lg:p-8 xl:p-10 2xl:p-12">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 items-center h-full">
                            {/* Content */}
                            <div className="space-y-3 lg:space-y-4 xl:space-y-5 2xl:space-y-6">
                              <H3 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">{problem.title}</H3>
                              <BodyLarge className="text-muted-foreground leading-relaxed text-sm lg:text-base xl:text-lg 2xl:text-xl">
                                {problem.description}
                              </BodyLarge>
                            </div>
                            
                            {/* Image Placeholder */}
                            <div className="h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center border border-border/50">
                              <BodyLarge className="text-muted-foreground text-sm lg:text-base xl:text-lg 2xl:text-xl">Visual Placeholder</BodyLarge>
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
            </div>
            
            {/* Scroll Spacer */}
            <div style={{ height: `${850 + 850 + 950 + 950 + 200}px` }}></div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Unifying Statement Section
function UnifyingStatementSection() {
  const [activeStep, setActiveStep] = React.useState(0)
  const sectionRef = React.useRef<HTMLDivElement>(null)
  
  // State for tracking animation completion
  const [hasFirstAnimationEverCompleted, setHasFirstAnimationEverCompleted] = React.useState(false)
  const [hasSecondAnimationEverCompleted, setHasSecondAnimationEverCompleted] = React.useState(false)
  const [hasThirdAnimationEverCompleted, setHasThirdAnimationEverCompleted] = React.useState(false)
  
  const texts = [
    {
      text: "Elevation AI unifies your universe, transforming this chaos into your most powerful competitive advantage.",
      key: "first-text"
    },
    {
      text: "Turn scattered knowledge into precision, collaboration, and clarity at enterprise scale.",
      key: "second-text"
    },
    {
      text: "So your organization moves faster, thinks smarter, and always stays one step ahead.",
      key: "third-text"
    }
  ]

  // Scroll-triggered carousel with standardized behavior
  React.useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const containerHeight = 400 // Height of the carousel container
      
      // Calculate which step should be active based on scroll position
      if (rect.top <= 0 && rect.bottom >= containerHeight) {
        // Section is in viewport, use custom calculation for UnifyingStatementSection
        const scrollProgress = Math.abs(rect.top) / containerHeight
        
        // Custom logic: All slides get 400px more scroll space, third slide gets additional 100px (500px total)
        const baseSlideHeight = 450 // Standard slide height
        const firstSlideHeight = baseSlideHeight + 400 // 400px extra for first slide
        const secondSlideHeight = baseSlideHeight + 400 // 400px extra for second slide
        const thirdSlideHeight = baseSlideHeight + 500 // 500px extra for third slide (400px + 100px additional)
        
        let activeStep = 0
        if (scrollProgress < (firstSlideHeight / containerHeight)) {
          // First slide
          activeStep = 0
        } else if (scrollProgress < ((firstSlideHeight + secondSlideHeight) / containerHeight)) {
          // Second slide
          activeStep = 1
        } else if (scrollProgress < ((firstSlideHeight + secondSlideHeight + thirdSlideHeight) / containerHeight)) {
          // Third slide with extra scroll space
          activeStep = 2
        } else {
          // Section complete, stay on last slide
          activeStep = 2
        }
        
        setActiveStep(activeStep)
        
        // Mark animations as completed when they become active
        if (activeStep >= 0 && !hasFirstAnimationEverCompleted) {
          setHasFirstAnimationEverCompleted(true)
        }
        if (activeStep >= 1 && !hasSecondAnimationEverCompleted) {
          setHasSecondAnimationEverCompleted(true)
        }
        if (activeStep >= 2 && !hasThirdAnimationEverCompleted) {
          setHasThirdAnimationEverCompleted(true)
        }
      } else if (rect.top > 0) {
        // Section is above viewport
        setActiveStep(0)
      } else {
        // Section is below viewport
        setActiveStep(texts.length - 1)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [texts.length, hasFirstAnimationEverCompleted, hasSecondAnimationEverCompleted])

  return (
    <Section paddingY="xl" className="relative">
      {/* Blue Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-600/15 to-blue-500/10"></div>
      <Container size="2xl" className="px-4 sm:px-6 relative z-10">
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Mobile Layout */}
          <div className="block lg:hidden">
            <div className="space-y-6">
              {texts.map((textItem, index) => (
                <div key={index} className="text-left">
                  <DisplayLarge className="text-primary">
                    <TypewriterText 
                      key={textItem.key}
                      text={textItem.text}
                      speed={50}
                      delay={0}
                      skipAnimation={index === 0 ? hasFirstAnimationEverCompleted : index === 1 ? hasSecondAnimationEverCompleted : hasThirdAnimationEverCompleted}
                    />
                  </DisplayLarge>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Layout - Scroll-triggered Carousel */}
          <div className="hidden lg:block relative" ref={sectionRef}>
                         {/* Carousel Container */}
             <div className="sticky top-20 h-[calc(100vh-5rem)] flex items-center py-4">
               <div className="w-full max-w-4xl relative">
                 {/* Text Container */}
                 <div className="relative h-96">
                   {texts.map((textItem, index) => (
                     <div
                       key={index}
                       className={`transition-opacity duration-75 absolute inset-0 ${
                         index === activeStep
                           ? 'opacity-100'
                           : 'opacity-0 pointer-events-none'
                       }`}
                     >
                       <div className="h-full flex items-center">
                         <DisplayLarge className="text-primary text-left">
                           <TypewriterText 
                             key={textItem.key}
                             text={textItem.text}
                             speed={50}
                             delay={0}
                             skipAnimation={index === 0 ? hasFirstAnimationEverCompleted : index === 1 ? hasSecondAnimationEverCompleted : hasThirdAnimationEverCompleted}
                           />
                         </DisplayLarge>
                       </div>
                     </div>
                   ))}
                 </div>
                 
                                   {/* Slide Indicators */}
                  <div className="absolute bottom-0 left-0 flex gap-2">
                  {texts.map((_, index) => (
                    <div 
                      key={index}
                      className={`h-1 w-22 transition-colors duration-300 rounded-full ${
                        index === activeStep
                          ? 'bg-blue-600 dark:bg-blue-400' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Scroll Spacer */}
            <div style={{ height: `${850 + 850 + 950 + 200}px` }}></div>
          </div>
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
      title: "Knowledge Blocks",
      description: "The private intelligence layer of your business—capturing and connecting all your data into a live Knowledge Graph that powers every decision and workflow.",
      icon: "node-tree"
    },
    {
      title: "Workspaces & Canvases",
      description: "The collaborative fabric where teams and AI agents work together. Every task, document, and conversation enriches the shared context automatically.",
      icon: "layout-grid-line"
    },
    {
      title: "Agentic Engine",
      description: "Your secure middleware layer—connecting knowledge to external AI tools and agents with enterprise-grade security and orchestration.",
      icon: "cpu-line"
    },
    {
      title: "Your Personal Co-pilot",
      description: "A conversational interface to your entire universe—delivering context-aware answers, insights, and actions from your Knowledge Graph.",
      icon: "message-3-line"
    }
  ]

  // Scroll-triggered tab switching with standardized behavior
  React.useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      // Responsive container height calculation matching actual container heights
      let containerHeight
      if (window.innerWidth >= 1536) { // 2XL
        containerHeight = 550 // matches h-[550px]
      } else if (window.innerWidth >= 1400) { // XL (adjusted for 14" MacBook Pro)
        containerHeight = 500 // matches h-[500px]
      } else { // LG
        containerHeight = 450 // matches h-[450px]
      }
      
      // Calculate which tab should be active based on scroll position
      if (rect.top <= 0 && rect.bottom >= containerHeight) {
        // Section is in viewport, use custom calculation for PlatformSection
        const scrollProgress = Math.abs(rect.top) / containerHeight
        
        // Custom logic: All tabs get 400px more scroll space, third tab gets additional 100px (500px total), fourth tab gets additional 100px (500px total) (matching ProblemSection)
        const baseSlideHeight = containerHeight
        const firstSlideHeight = baseSlideHeight + 400 // 400px extra for first tab
        const secondSlideHeight = baseSlideHeight + 400 // 400px extra for second tab
        const thirdSlideHeight = baseSlideHeight + 500 // 500px extra for third tab (400px + 100px additional)
        const fourthSlideHeight = baseSlideHeight + 500 // 500px extra for fourth tab (400px + 100px additional)
        
        let activeTab = 0
        if (scrollProgress < (firstSlideHeight / containerHeight)) {
          // First tab with extra scroll space
          activeTab = 0
        } else if (scrollProgress < ((firstSlideHeight + secondSlideHeight) / containerHeight)) {
          // Second tab with extra scroll space
          activeTab = 1
        } else if (scrollProgress < ((firstSlideHeight + secondSlideHeight + thirdSlideHeight) / containerHeight)) {
          // Third tab with extra scroll space
          activeTab = 2
        } else if (scrollProgress < ((firstSlideHeight + secondSlideHeight + thirdSlideHeight + fourthSlideHeight) / containerHeight)) {
          // Fourth tab with extra scroll space
          activeTab = 3
        } else {
          // Section complete, stay on last tab
          activeTab = features.length - 1
        }
        
        setActiveTab(activeTab)
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
      <Container size="2xl" className="px-4 sm:px-6">
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Mobile Header */}
          <div className="block lg:hidden text-left sm:text-center space-y-4 sm:space-y-6 max-w-3xl sm:mx-auto mb-8">
            <H2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">The Elevation AI Platform</H2>
            <BodyLarge className="text-muted-foreground text-base sm:text-lg">
              A unified, agentic platform to power your entire operation.
            </BodyLarge>
          </div>

          {/* Mobile Layout */}
          <div className="block lg:hidden">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader className="pb-6">
                    <div className="space-y-6">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon name={feature.icon} size="2xl" className="text-blue-600" />
                        </div>
                        <CardTitle className="text-xl sm:text-2xl">{feature.title}</CardTitle>
                      </div>
                      
                      {/* Description */}
                      <BodyLarge className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </BodyLarge>
                      
                      {/* CTA Button */}
                      <Button size="lg" className="w-full sm:w-auto">
                        Explore the Platform
                      </Button>
                      
                      {/* Visual Placeholder */}
                      <div className="h-[200px] sm:h-[250px] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl flex items-center justify-center">
                        <BodyLarge className="text-muted-foreground">Platform Visualization</BodyLarge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Desktop Layout - Scroll-triggered Tabbed Interface */}
          <div className="hidden lg:block relative" ref={sectionRef}>
            {/* Sticky Tab Container */}
            <div className="sticky top-20 h-[calc(100vh-8rem)] flex items-center py-2 lg:py-2 xl:py-3 2xl:py-4">
              <div className="w-full h-[calc(100vh-12rem)] lg:h-[calc(100vh-11rem)] xl:h-[calc(100vh-10rem)] 2xl:h-[calc(100vh-9rem)] relative flex items-center">
                <div className="w-full flex flex-col items-center justify-center min-h-0">
                  {/* Section Header */}
                  <div className="text-center space-y-4 lg:space-y-6 xl:space-y-8 max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto mb-8 lg:mb-10 xl:mb-12">
                    <H2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">The Elevation AI Platform</H2>
                    <BodyLarge className="text-muted-foreground text-lg lg:text-xl xl:text-2xl leading-relaxed">
                      A unified, agentic platform to power your entire operation.
                    </BodyLarge>
                  </div>

                  {/* Tab Content Container */}
                  <div className="relative w-full h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[550px]">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className={`transition-opacity duration-75 absolute inset-0 ${
                          activeTab === index
                            ? 'opacity-100'
                            : 'opacity-0 pointer-events-none'
                        }`}
                      >
                        <Card className="border-border/50 transition-colors duration-300 h-full">
                          <CardHeader className="h-full flex flex-col justify-center p-6 lg:p-8 xl:p-10 2xl:p-12">
                            {/* Tab Navigation - Positioned at top of card */}
                            <div className="flex flex-wrap justify-center gap-2 lg:gap-4 xl:gap-6 mb-4 lg:mb-6 xl:mb-8">
                              {features.map((featureTab, tabIndex) => (
                                <button
                                  key={tabIndex}
                                  onClick={() => setActiveTab(tabIndex)}
                                  className={`px-4 py-2 lg:px-5 lg:py-2.5 xl:px-6 xl:py-3 rounded-lg text-sm lg:text-base xl:text-lg font-medium transition-all duration-300 ${
                                    activeTab === tabIndex
                                      ? 'bg-blue-600 text-white shadow-lg'
                                      : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                                  }`}
                                >
                                  {featureTab.title}
                                </button>
                              ))}
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 items-center h-full w-full">
                              <div className="space-y-3 lg:space-y-4 xl:space-y-5 2xl:space-y-6 w-full">
                                <div className="flex items-center gap-4 lg:gap-6 xl:gap-8">
                                  <div className="w-16 h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Icon name={feature.icon} size="2xl" className="text-blue-600" />
                                  </div>
                                  <CardTitle className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">{feature.title}</CardTitle>
                                </div>
                                <BodyLarge className="text-muted-foreground text-sm lg:text-base xl:text-lg 2xl:text-xl leading-relaxed">
                                  {feature.description}
                                </BodyLarge>
                                <Button size="lg" className="text-base lg:text-lg px-6 lg:px-7 xl:px-8 py-3 lg:py-3.5 xl:py-4">
                                  Explore the Platform
                                </Button>
                              </div>
                              <div className="h-[200px] lg:h-[250px] xl:h-[300px] 2xl:h-[350px] w-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl flex items-center justify-center">
                                <BodyLarge className="text-muted-foreground text-sm lg:text-base xl:text-lg 2xl:text-xl">Platform Visualization</BodyLarge>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Scroll Spacer */}
            <div style={{ height: `${850 + 850 + 950 + 950 + 200}px` }}></div>
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
          <div className="text-left lg:text-center space-y-4 lg:space-y-6 max-w-3xl lg:mx-auto">
            <H2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">More Than a Platform. A Partnership.</H2>
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
          <div className="text-left lg:text-center space-y-4 lg:space-y-6 max-w-3xl lg:mx-auto">
            <H2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">Solutions for Your Unique Universe</H2>
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
                <li><Link href="/investors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Investors</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <Separator className="my-4 lg:my-6" />
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
            {/* Content Column */}
            <div className="flex-1 text-left space-y-2">
              <H3 className="text-sm font-medium uppercase tracking-wider">Stay Updated</H3>
              <BodyLarge className="text-muted-foreground">
                Get the latest insights on agentic AI, platform updates, and industry trends delivered to your inbox.
              </BodyLarge>
            </div>
            
            {/* Form Column */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border border-border rounded-md bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
              <Button variant="secondary" className="px-6 py-2">
                Subscribe
              </Button>
            </div>
          </div>
          
          <Separator className="my-4 lg:my-6" />
          
                     <div className="flex flex-col md:flex-row justify-between items-center gap-4">
             <BodySmall className="text-muted-foreground text-left">
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
      <MobileOnlyLayout
        header={<Header />}
        footer={<Footer />}
        mobileMenu={<MobileMenuDrawer currentPage="homepage" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            <HeroSection />
            <ProblemSection />
            <UnifyingStatementSection />
            <PlatformSection />
            <HowWeDoItSection />
            <WhoWeServeSection />
            <ClosingCTASection />
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
