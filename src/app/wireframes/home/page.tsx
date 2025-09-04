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
import { H1, H2, H3, H4, P, BodyLarge, BodySmall, DisplayLarge, DisplayMedium, DisplaySmall } from "@/components/ui/typography"
import { GlobalHeader } from "@/components/ui/global-header"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedFavicon } from "@/components/ui/animated-favicon"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { calculateActiveSlide, getScrollSpacerHeight } from "@/lib/scroll-standards"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { useMobileMenu } from "@/components/ui/layout/mobile-only-layout"
import { CollapsibleCard } from "@/components/ui/collapsible-card"
import { 
  UnifiedKnowledge, 
  IntelligentProcessAutomation, 
  RealTimeBusinessIntelligence, 
  RealTimeBusinessIntelligenceMobile,
  FutureReady,
  FutureReadyMobile,
  KnowledgeBlocks,
  KnowledgeBlocksMobile,
  WorkspacesCanvases,
  AgenticEngine,
  PersonalCopilot,
  EnterpriseSecurity
} from "@/components/animations"

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
  const { mobileMenuOpen, setMobileMenuOpen } = useMobileMenu()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border dark:border-muted bg-background/40 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/20 transition-colors duration-300" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
      <div className="w-full px-4 sm:px-4 md:px-6 lg:px-8 flex h-14 sm:h-18 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo width={110} height={20} />
          </Link>
        </div>

        {/* Center Navigation */}
        <nav className="hidden xl:flex items-center space-x-4">
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
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[800px] bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-6 grid grid-cols-3 gap-8">
                {/* Featured Content */}
                <div className="space-y-4">
                  <div className="w-full h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Icon name="lightbulb-line" className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-xs text-muted-foreground">AI-Powered Solutions</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-foreground mb-2">Transform Your Business</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Discover tailored solutions that leverage AI to drive growth, efficiency, and innovation across your organization.
                    </p>
                  </div>
                </div>

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
                    <li><Link href="/solutions/family-office" className="text-sm hover:text-primary transition-colors">Post-Exit/Family Office</Link></li>
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
                <Link href="/investors" className="text-sm hover:text-primary transition-colors">Investors</Link>
                <Link href="/developers" className="text-sm hover:text-primary transition-colors">For Developers & Platforms</Link>
                <Link href="/blog" className="text-sm hover:text-primary transition-colors">Blog + News</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Right side - CTAs and Mobile Menu */}
        <div className="flex items-center space-x-3">
          {/* Desktop CTAs - Hidden below xl */}
          <div className="hidden xl:flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild className="text-xs xl:text-sm hover:bg-muted/50">
              <Link href="/wireframes/login">
                <Icon name="login-box-line" className="h-4 w-4 mr-1" />
                Login
              </Link>
            </Button>
            <Button size="sm" asChild className="text-xs xl:text-sm hover:bg-primary/90">
              <Link href="/wireframes/demo">
                Request a Demo
              </Link>
            </Button>
          </div>
          
          {/* Mobile/Tablet CTAs - Hidden on small screens, visible on medium+ */}
          <div className="hidden lg:flex xl:hidden items-center space-x-3">
            <Button variant="ghost" size="sm" asChild className="text-xs lg:text-sm hover:bg-muted/50">
              <Link href="/wireframes/login">
                <Icon name="login-box-line" className="h-4 w-4 mr-1" />
                Login
              </Link>
            </Button>
            <Button size="sm" asChild className="text-xs lg:text-sm hover:bg-primary/90">
              <Link href="/wireframes/demo">
                Request a Demo
              </Link>
            </Button>
          </div>
          
          {/* Theme Toggle - Always visible */}
          <ThemeToggle />
          
          {/* Mobile Menu Button - Only visible below xl */}
          <div className="xl:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 sm:h-10 sm:w-10 hover:bg-muted/50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "close-line" : "menu-line"} className="h-5 w-5" />
              <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Toggle menu"}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

// Hero Section
function HeroSection() {
  return (
    <Section 
      paddingY="xl" 
      className="flex items-center min-h-[70vh] sm:min-h-[80vh] h-screen"
    >
      <Container size="2xl" className="px-4 sm:px-6 lg:px-8 lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 text-left">
            <div className="space-y-4 sm:space-y-6">
                              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-semibold leading-tight">
                  Your Universe. Intelligently Orchestrated.
                </div>
              <BodyLarge className="text-muted-foreground max-w-2xl text-base sm:text-lg leading-relaxed">
                We are an agentic knowledge and work orchestration platform, helping you adapt to the agentic era through our platform and concierge team.
              </BodyLarge>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                <Link href="/wireframes/demo">
                  Request a Demo
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                <Link href="/wireframes/sign-up">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative h-[250px] sm:h-[350px] lg:h-[500px] rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center border border-border/50 overflow-hidden">
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
            <div className="w-29 h-29 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-48 xl:h-48 2xl:w-64 2xl:h-64 flex items-center justify-center relative z-10 mx-auto">
              <AnimatedFavicon 
                width={256}
                height={256}
                className="w-29 h-29 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-48 xl:h-48 2xl:w-64 2xl:h-64"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Problem Introduction Section
function ProblemIntroductionSection() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [mobileActiveStep, setMobileActiveStep] = React.useState(0)
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const mobileSectionRef = React.useRef<HTMLDivElement>(null)
  
  const texts = [
    {
      text: "Your business's greatest asset—its collective data and knowledge—is trapped, locked away and underused.",
      key: "problem-first-text"
    },
    {
      text: "Scattered across apps, trapped in conversations, and buried in documents, it slows decisions and generates blind spots.",
      key: "problem-second-text"
    },
    {
      text: "Elevation AI unlocks it all, transforming fragmentation into focus, delivering clarity, precision and control.",
      key: "problem-third-text"
    }
  ]

  // Desktop scroll-triggered carousel with standardized behavior
  React.useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || window.innerWidth < 1024) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const containerHeight = 400 // Height of the carousel container
      
      // Calculate which step should be active based on scroll position
      if (rect.top <= 0 && rect.bottom >= containerHeight) {
        // Section is in viewport, use custom calculation for ProblemIntroductionSection
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
  }, [texts.length])

  // Mobile scroll-triggered carousel
  React.useEffect(() => {
    const handleMobileScroll = () => {
      if (!mobileSectionRef.current || window.innerWidth >= 1024) return
      
      const rect = mobileSectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate which step should be active based on scroll position for mobile
      if (rect.top <= 0 && rect.bottom >= windowHeight * 0.5) {
        // Section is in viewport, calculate progress based on mobile-appropriate scroll height
        const mobileScrollHeight = windowHeight * 2 // 2x viewport height for comfortable scrolling
        const scrollProgress = Math.abs(rect.top) / mobileScrollHeight
        
        // Equal distribution for all slides
        const slideThreshold = 1 / 3
        
        let mobileActiveStep = 0
        if (scrollProgress < slideThreshold) {
          // First slide - 33.33% of scroll space
          mobileActiveStep = 0
        } else if (scrollProgress < slideThreshold * 2) {
          // Second slide - 33.33% of scroll space
          mobileActiveStep = 1
        } else {
          // Third slide - 33.33% of scroll space
          mobileActiveStep = 2
        }
        
        setMobileActiveStep(mobileActiveStep)
      } else if (rect.top > 0) {
        // Section is above viewport
        setMobileActiveStep(0)
      } else {
        // Section is below viewport
        setMobileActiveStep(texts.length - 1)
      }
    }

    window.addEventListener('scroll', handleMobileScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleMobileScroll)
  }, [texts.length])

  return (
    <Section paddingY="xl" className="relative">
      {/* Blue Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-600/15 to-blue-500/10"></div>
      <Container size="2xl" className="px-4 sm:px-6 lg:px-8 lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px] relative z-10">
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Mobile Layout */}
          <div className="block lg:hidden relative" ref={mobileSectionRef}>
            {/* Carousel Container */}
            <div className="sticky top-20 h-[calc(100vh-5rem)] flex items-center py-4">
              <div className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-full relative">
                {/* Text Container */}
                <div className="relative h-96">
                  {texts.map((textItem, index) => (
                    <div
                      key={index}
                      className={`transition-opacity duration-75 absolute inset-0 ${
                        index === mobileActiveStep
                          ? 'opacity-100'
                          : 'opacity-0 pointer-events-none'
                      }`}
                    >
                                              <div className="h-full flex items-start lg:items-center">
                          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-semibold leading-tight text-primary max-w-3xl lg:max-w-4xl xl:max-w-5xl">
                            {textItem.text}
                          </div>
                        </div>
                    </div>
                  ))}
                </div>
                
                {/* Slide Indicators */}
                <div className="absolute bottom-0 left-0 flex gap-2">
                  {texts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setMobileActiveStep(index)}
                      className={`h-1 w-22 transition-colors duration-300 rounded-full cursor-pointer hover:opacity-80 ${
                        index === mobileActiveStep
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

          {/* Desktop Layout - Scroll-triggered Carousel */}
          <div className="hidden lg:block relative" ref={sectionRef}>
            {/* Carousel Container */}
            <div className="sticky top-20 h-[calc(100vh-5rem)] flex items-center py-4">
              <div className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-full relative">
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
                          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-semibold text-primary max-w-3xl lg:max-w-4xl xl:max-w-5xl">
                            {textItem.text}
                          </div>
                        </div>
                    </div>
                  ))}
                </div>
                
                {/* Slide Indicators */}
                <div className="absolute bottom-0 left-0 flex gap-2">
                  {texts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`h-1 w-22 transition-colors duration-300 rounded-full cursor-pointer hover:opacity-80 ${
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

// Problem We Solve Section
function ProblemSection() {
  const [activeStep, setActiveStep] = React.useState(0)
  const sectionRef = React.useRef<HTMLDivElement>(null)
  
  const problems = [
      {
        title: "The Business Orchestration Platform",
        description: "Work from a single source of truth. We break down the walls between your departments and tools, creating a unified platform where no more hunting for that one file you know you saw in an email three weeks ago.",
        icon: "database-2-line"
      },
    {
      title: "Intelligent Process Automation",
      description: "Eliminate operational bottlenecks with smart automation. We identify and automate the manual, repetitive processes that slow down your growth, freeing your best people from manual data entry to focus on what they were hired to do.",
      icon: "brain-line"
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

  // Mobile scroll-based card activation - REMOVED for normal scrolling
  // Cards now expand/collapse normally without scroll interference

  // Desktop scroll-triggered carousel with standardized behavior
  React.useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || window.innerWidth < 1024) return
      
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
    <Section paddingY="lg" className="bg-muted/30">
      <Container size="2xl" className="px-4 sm:px-6 lg:px-8 lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="space-y-6 sm:space-y-8 lg:space-y-12">
          {/* Mobile Layout */}
          <div className="block lg:hidden -mx-4 sm:-mx-6 lg:-mx-8 mb-0">
            {/* Section Headline */}
            <div className="text-left lg:text-center space-y-0 lg:space-y-1 mb-4 sm:mb-6 md:mb-8 pl-4 sm:pl-6 lg:pl-8">
              <H1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">Unify your systems</H1>
              <BodyLarge className="text-muted-foreground max-w-4xl text-base sm:text-lg md:text-xl">
                Turn scattered knowledge into precision, collaboration, and clarity—securely at enterprise scale.
              </BodyLarge>
            </div>
            <div className="overflow-x-auto pb-1">
              <div className="flex gap-4 w-max pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8">
                {problems.map((problem, index) => (
                  <div
                    key={index}
                    data-problem-card
                    className="w-[320px] sm:w-[380px] flex-shrink-0"
                  >
                    <Card className="h-[500px] sm:h-[550px] md:h-[600px] border-border/50 transition-colors duration-300 flex flex-col">
                      <CardHeader className="pt-4 pb-4 px-4 flex-shrink-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name={problem.icon} size="lg" className="text-primary" />
                          </div>
                          <CardTitle className="text-lg font-semibold">{problem.title}</CardTitle>
                        </div>
                        <BodyLarge className="text-muted-foreground text-sm leading-relaxed">
                          {problem.description}
                        </BodyLarge>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-end pb-6 px-4">
                        {/* Animation Container */}
                        <div className="h-[240px] sm:h-[280px] md:h-[320px] rounded-lg flex items-center justify-center border border-border/50 relative overflow-hidden">
                          {index === 0 && (
                            <UnifiedKnowledge 
                              width={220} 
                              height={220} 
                              showBorder={false}
                              className=""
                            />
                          )}
                          {index === 1 && (
                            <IntelligentProcessAutomation 
                              width={220} 
                              height={160} 
                              showBorder={false}
                              className=""
                            />
                          )}
                          {index === 2 && (
                            <RealTimeBusinessIntelligenceMobile 
                              width={200} 
                              height={200} 
                              showBorder={false}
                              className=""
                            />
                          )}
                          {index === 3 && (
                            <FutureReadyMobile 
                              width={200} 
                              height={160} 
                              showBorder={false}
                              className=""
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout - Scroll-triggered Carousel */}
          <div className="hidden lg:block relative" ref={sectionRef}>
            {/* Carousel Container */}
            <div className="sticky top-20 h-[calc(100vh-8rem)] lg:h-[calc(100vh-7rem)] xl:h-[calc(100vh-7rem)] 2xl:h-[calc(100vh-6rem)] flex items-center py-2 lg:py-2 xl:py-3 2xl:py-4">
              <div className="w-full h-[calc(100vh-10rem)] lg:h-[calc(100vh-9rem)] xl:h-[calc(100vh-8rem)] 2xl:h-[calc(100vh-7rem)] relative flex items-center">
                <div className="w-full flex flex-col items-center justify-center min-h-0">
                  {/* Section Headline */}
                  <div className="text-center space-y-0 lg:space-y-1 mb-4 lg:mb-6 xl:mb-8">
                    <H1>Unify your systems</H1>
                    <BodyLarge className="text-muted-foreground max-w-4xl mx-auto">
                      Turn scattered knowledge into precision, collaboration, and clarity—securely at enterprise scale.
                    </BodyLarge>
                  </div>
                  {/* Carousel Container */}
                  <div className="relative w-full h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
                    {problems.map((problem, index) => (
                    <div
                      key={index}
                      className={`transition-opacity duration-75 absolute inset-0 ${
                        index === activeStep
                          ? 'opacity-100'
                          : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      {/* Card Content */}
                      <Card className="group transition-all duration-300 border-border/50 transition-colors duration-300 h-full rounded-lg relative overflow-hidden">
                        {/* Step Indicators - Positioned inside card on the left */}
                        <div className="absolute left-0 top-0 bottom-0 flex flex-col w-20 z-10">
                          {problems.map((_, stepIndex) => (
                            <button
                              key={stepIndex}
                              onClick={() => setActiveStep(stepIndex)}
                              className={`flex-1 border-r border-border/50 flex items-center justify-center text-lg font-medium transition-all duration-300 ${
                                stepIndex === activeStep
                                  ? 'bg-primary border-primary text-white shadow-lg border-b border-primary'
                                  : stepIndex < activeStep
                                  ? 'bg-primary/20 border-primary/30 text-primary border-b border-primary/30'
                                  : stepIndex < 3
                                  ? 'bg-background/80 border-border/50 text-muted-foreground hover:bg-background/60 border-b border-border/50'
                                  : 'bg-background/80 border-border/50 text-muted-foreground hover:bg-background/60'
                              }`}
                            >
                              {stepIndex + 1}
                            </button>
                          ))}
                        </div>
                        <CardHeader className="h-full flex flex-col justify-center pl-24 pr-6 lg:pl-28 lg:pr-8 xl:pl-32 xl:pr-10 2xl:pl-36 2xl:pr-12">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 items-center h-full w-full">
                            {/* Content */}
                            <div className="space-y-3 lg:space-y-4 xl:space-y-5 2xl:space-y-6 w-full">
                              <H1>{problem.title}</H1>
                              <BodyLarge className="text-muted-foreground leading-relaxed text-sm lg:text-base xl:text-lg 2xl:text-xl">
                                {problem.description}
                              </BodyLarge>
                            </div>
                            
                            {/* Animation Container */}
                            <div className="h-full rounded-lg flex items-center justify-center border border-border/50 overflow-hidden">
                              {index === 0 && (
                                <UnifiedKnowledge 
                                  width={440} 
                                  height={440} 
                                  showBorder={false}
                                />
                              )}
                              {index === 1 && (
                                <IntelligentProcessAutomation 
                                  width={600} 
                                  height={400} 
                                  showBorder={false}
                                />
                              )}
                              {index === 2 && (
                                <RealTimeBusinessIntelligence 
                                  width={440} 
                                  height={440} 
                                  showBorder={false}
                                />
                              )}
                              {index === 3 && (
                                <FutureReady 
                                  width={600} 
                                  height={400} 
                                  showBorder={false}
                                />
                              )}
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
            <div style={{ height: `${650 + 650 + 750 + 750 + 750 + 200}px` }}></div>
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
      title: "Personal Co-pilot",
      description: "A conversational interface to your entire universe—delivering context-aware answers, insights, and actions from your Knowledge Graph.",
      icon: "message-3-line"
    },
    {
      title: "Enterprise Security",
      description: "Enterprise-grade encryption, every action in the platform is auditable, compliant, and secure, ensuring you unlock the full power of AI without ever compromising control.",
      icon: "shield-keyhole-line"
    }
  ]

  // Mobile scroll-based card activation - REMOVED for normal scrolling
  // Cards now expand/collapse normally without scroll interference

  // Desktop scroll-triggered tab interface with standardized behavior (matching ProblemSection)
  React.useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || window.innerWidth < 1024) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      // Responsive container height calculation matching actual container heights
      let containerHeight
      if (window.innerWidth >= 1536) { // 2XL
        containerHeight = 550 // matches h-[550px] for PlatformSection
      } else if (window.innerWidth >= 1400) { // XL
        containerHeight = 500 // matches h-[500px] for PlatformSection
      } else { // LG
        containerHeight = 450 // matches h-[450px] for PlatformSection
      }
      
      // Calculate which tab should be active based on scroll position
      if (rect.top <= 0 && rect.bottom >= containerHeight) {
        // Section is in viewport, use custom calculation for PlatformSection
        const scrollProgress = Math.abs(rect.top) / containerHeight
        
        // Custom logic: All tabs get 400px more scroll space, fourth and fifth tabs get additional 100px (500px total each)
        const baseTabHeight = containerHeight
        const firstTabHeight = baseTabHeight + 400 // 400px extra for first tab
        const secondTabHeight = baseTabHeight + 400 // 400px extra for second tab
        const thirdTabHeight = baseTabHeight + 400 // 400px extra for third tab
        const fourthTabHeight = baseTabHeight + 500 // 500px extra for fourth tab (400px + 100px additional)
        const fifthTabHeight = baseTabHeight + 500 // 500px extra for fifth tab (400px + 100px additional)
        
        let activeTab = 0
        if (scrollProgress < (firstTabHeight / containerHeight)) {
          // First tab
          activeTab = 0
        } else if (scrollProgress < ((firstTabHeight + secondTabHeight) / containerHeight)) {
          // Second tab
          activeTab = 1
        } else if (scrollProgress < ((firstTabHeight + secondTabHeight + thirdTabHeight) / containerHeight)) {
          // Third tab
          activeTab = 2
        } else if (scrollProgress < ((firstTabHeight + secondTabHeight + thirdTabHeight + fourthTabHeight) / containerHeight)) {
          // Fourth tab
          activeTab = 3
        } else if (scrollProgress < ((firstTabHeight + secondTabHeight + thirdTabHeight + fourthTabHeight + fifthTabHeight) / containerHeight)) {
          // Fifth tab
          activeTab = 4
        } else {
          // Section complete, stay on last tab
          activeTab = 4
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

  // Handle manual tab clicks
  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex)
  }

  return (
    <Section paddingY="lg">
      <Container size="2xl" className="px-4 sm:px-6 lg:px-8 lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="space-y-6 sm:space-y-8 lg:space-y-12">
          {/* Mobile Layout */}
          <div className="block lg:hidden -mx-4 sm:-mx-6 lg:-mx-8 mb-0">
            {/* Section Headline */}
            <div className="text-left lg:text-center space-y-0 lg:space-y-1 mb-4 sm:mb-6 md:mb-8 pl-4 sm:pl-6 lg:pl-8">
              <H1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">The agentic platform</H1>
              <BodyLarge className="text-muted-foreground max-w-4xl text-base sm:text-lg md:text-xl">
                So your business moves faster, thinks smarter, and stays ahead.
              </BodyLarge>
            </div>
            <div className="overflow-x-auto pb-1">
              <div className="flex gap-4 w-max pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    data-platform-card
                    className="w-[320px] sm:w-[380px] flex-shrink-0"
                  >
                    <Card className="h-[500px] sm:h-[550px] md:h-[600px] border-border/50 transition-colors duration-300 flex flex-col">
                      <CardHeader className="pt-4 pb-4 px-4 flex-shrink-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name={feature.icon} className="text-blue-600" />
                          </div>
                          <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                        </div>
                        <BodyLarge className="text-muted-foreground text-sm leading-relaxed">
                          {feature.description}
                        </BodyLarge>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-end space-y-4 pb-6 px-4">
                        {/* Animation Container */}
                        <div className="h-[240px] sm:h-[280px] md:h-[320px] rounded-xl flex items-center justify-center relative overflow-hidden">
                          {index === 0 && (
                            <KnowledgeBlocksMobile 
                              width={220} 
                              height={160} 
                              showBorder={false}
                            />
                          )}
                          {index === 1 && (
                            <WorkspacesCanvases 
                              width={220} 
                              height={220} 
                              showBorder={false}
                            />
                          )}
                          {index === 2 && (
                            <AgenticEngine 
                              width={220} 
                              height={220} 
                              showBorder={false}
                            />
                          )}
                          {index === 3 && (
                            <PersonalCopilot 
                              width={220} 
                              height={220} 
                              showBorder={false}
                            />
                          )}
                          {index === 4 && (
                            <EnterpriseSecurity 
                              width={220} 
                              height={160} 
                              showBorder={false}
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout - Scroll-triggered Tabbed Interface */}
          <div className="hidden lg:block relative" ref={sectionRef}>
            {/* Sticky Tab Container */}
            <div className="sticky top-20 h-[calc(100vh-8rem)] lg:h-[calc(100vh-7rem)] xl:h-[calc(100vh-7rem)] 2xl:h-[calc(100vh-6rem)] flex items-center py-2 lg:py-2 xl:py-3 2xl:py-4">
              <div className="w-full h-[calc(100vh-10rem)] lg:h-[calc(100vh-9rem)] xl:h-[calc(100vh-8rem)] 2xl:h-[calc(100vh-7rem)] relative flex items-center">
                                  <div className="w-full flex flex-col items-center justify-center min-h-0">
                  {/* Section Headline */}
                  <div className="text-center space-y-0 lg:space-y-1 mb-4 lg:mb-6 xl:mb-8">
                    <H1>The agentic platform</H1>
                    <BodyLarge className="text-muted-foreground max-w-4xl mx-auto">
                      So your business moves faster, thinks smarter, and stays ahead.
                    </BodyLarge>
                  </div>
                  {/* Tab Content Container */}
                  <div className="relative w-full h-[400px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px]">
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
                          <CardHeader className="h-full flex flex-col pt-2 px-6 pb-6 lg:pt-4 lg:px-8 lg:pb-8 xl:pt-6 xl:px-10 xl:pb-10 2xl:pt-8 2xl:px-12 2xl:pb-12 min-h-0 overflow-hidden">
                            {/* Tab Navigation - Positioned at top of card with proper spacing */}
                            <div className="flex flex-wrap justify-center gap-2 lg:gap-4 xl:gap-6 mb-0.5 lg:mb-1 xl:mb-1.5 2xl:mb-2">
                              {features.map((featureTab, tabIndex) => (
                                <button
                                  key={tabIndex}
                                  onClick={() => handleTabClick(tabIndex)}
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
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 items-center justify-center flex-1 w-full min-h-0 overflow-hidden">
                              <div className="space-y-3 lg:space-y-4 xl:space-y-5 2xl:space-y-6 w-full">
                                <H1>{feature.title}</H1>
                                <BodyLarge className="text-muted-foreground text-sm lg:text-base xl:text-lg 2xl:text-xl leading-relaxed">
                                  {feature.description}
                                </BodyLarge>
                              </div>
                              <div className="h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px] w-full rounded-xl flex items-center justify-center relative overflow-hidden">
                                {activeTab === 0 && (
                                  <KnowledgeBlocks 
                                    width={600} 
                                    height={400} 
                                    showBorder={false}
                                  />
                                )}
                                {activeTab === 1 && (
                                  <WorkspacesCanvases 
                                    width={440} 
                                    height={440} 
                                    showBorder={false}
                                  />
                                )}
                                {activeTab === 2 && (
                                  <AgenticEngine 
                                    width={440} 
                                    height={440} 
                                    showBorder={false}
                                  />
                                )}
                                {activeTab === 3 && (
                                  <PersonalCopilot 
                                    width={440} 
                                    height={440} 
                                    showBorder={false}
                                  />
                                )}
                                {activeTab === 4 && (
                                  <EnterpriseSecurity 
                                    width={600} 
                                    height={400} 
                                    showBorder={false}
                                  />
                                )}
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
            <div style={{ height: `${850 + 850 + 850 + 950 + 950 + 200}px` }}></div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// How We Do It Section
function HowWeDoItSection() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [currentCard, setCurrentCard] = React.useState(0)
  const [isDragging, setIsDragging] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [currentX, setCurrentX] = React.useState(0)
  const [dragOffset, setDragOffset] = React.useState(0)
  const carouselRef = React.useRef<HTMLDivElement>(null)
  
  const approaches = [
    {
      title: "Your Strategic AI Advisory",
      description: "Guidance that goes beyond setup—our team helps you define where AI creates the most impact for your business, aligning technology with long-term strategy.",
      icon: "elevation-ai-logo"
    },
    {
      title: "Your Agentic Concierge Team",
      description: "A hands-on team of engineers and strategists who partner with you to design, build, and customize solutions for your biggest challenges.",
      icon: "team-line"
    },
    {
      title: "Your Expert & Partner Network",
      description: "Specialized consultants and domain experts who extend your team's capacity, embedding seamlessly into your workspaces to solve complex problems.",
      icon: "global-line"
    }
  ]

  const ventureStages = [
    "Creating a Venture",
    "Scaling a Venture", 
    "Exiting a Venture",
    "Post-IPO Growth",
    "Post-Exit/Family Office"
  ]

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % ventureStages.length)
  }

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + ventureStages.length) % ventureStages.length)
  }

  const goToCard = (index: number) => {
    setCurrentCard(index)
  }

  // Touch and drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
    setDragOffset(0)
    
    // Pause auto-play while dragging
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'none'
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.touches[0].clientX
    setCurrentX(x)
    setDragOffset(x - startX)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    // Restore transition
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.3s ease-in-out'
    }
    
    const threshold = 50 // minimum distance to trigger swipe
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // Swipe right - go to previous card
        prevCard()
        // Haptic feedback for mobile
        if ('vibrate' in navigator) {
          navigator.vibrate(50)
        }
      } else {
        // Swipe left - go to next card
        nextCard()
        // Haptic feedback for mobile
        if ('vibrate' in navigator) {
          navigator.vibrate(50)
        }
      }
    }
    setDragOffset(0)
  }

  // Mouse drag handlers for desktop testing
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentX(e.clientX)
    setDragOffset(0)
    
    // Pause auto-play while dragging
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'none'
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const x = e.clientX
    setCurrentX(x)
    setDragOffset(x - startX)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    // Restore transition
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.3s ease-in-out'
    }
    
    const threshold = 50 // minimum distance to trigger swipe
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // Drag right - go to previous card
        prevCard()
      } else {
        // Drag left - go to next card
        nextCard()
      }
    }
    setDragOffset(0)
  }

  // Auto-play functionality for the carousel
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % ventureStages.length)
    }, 3000) // 3 second interval

    return () => clearInterval(interval)
  }, [ventureStages.length])

  return (
    <Section paddingY="lg" className="bg-muted/30">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="space-y-8 lg:space-y-12">
          {/* Section Header */}
          <div className="text-left lg:text-center space-y-0 lg:space-y-1 max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
            <H1 className="text-2xl sm:text-3xl md:text-4xl lg:text-2xl xl:text-3xl 2xl:text-4xl">More Than a Platform.</H1>
            <BodyLarge className="text-muted-foreground max-w-4xl text-base sm:text-lg md:text-xl mx-auto">
              A Partnership to Power Every Stage.
            </BodyLarge>
          </div>

          {/* Modern Tech Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {approaches.map((approach, index) => (
              <Link key={index} href="#" className="block">
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50 transition-colors duration-300 relative overflow-hidden cursor-pointer h-full">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardHeader className="pt-3 px-4 pb-3 lg:pt-4 lg:px-6 lg:pb-4 xl:pt-5 lg:px-6 xl:pb-5 2xl:pt-6 2xl:px-8 2xl:pb-6 relative z-10">
                    <div className="space-y-4 lg:space-y-5 xl:space-y-6">
                      {/* Icon and Title Row */}
                      <div className="flex items-center gap-3 lg:gap-4">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                          {approach.icon === "elevation-ai-logo" ? (
                            <img 
                              src="/images/Favicon-Stroke.png" 
                              alt="Elevation AI" 
                              className="w-6 h-6 lg:w-7 lg:h-7"
                            />
                          ) : (
                            <Icon name={approach.icon} size="2xl" className="text-primary" />
                          )}
                        </div>
                        <CardTitle className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">{approach.title}</CardTitle>
                      </div>
                      
                      {/* Description */}
                      <P className="text-muted-foreground leading-relaxed">
                        {approach.description}
                      </P>
                      
                      {/* Learn More Link */}
                      <div className="pt-2">
                        <span className="inline-flex items-center text-primary group">
                          <span className="group-hover:translate-x-1 transition-transform duration-200">Learn more →</span>
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          {/* Venture Lifecycle Cards */}
          <div className="space-y-4">
            {/* Mobile Carousel */}
            <div className="lg:hidden">
              <div className="relative">
                {/* Carousel Container */}
                <div className="overflow-hidden">
                  <div 
                    ref={carouselRef}
                    className={`flex transition-transform duration-300 ease-in-out touch-pan-y select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                    style={{ 
                      transform: `translateX(calc(-${currentCard * 100}% + ${dragOffset * 0.8}px))`,
                      transition: isDragging ? 'none' : 'transform 0.3s ease-in-out'
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    {ventureStages.map((stage, index) => (
                      <div key={index} className="w-full flex-shrink-0">
                        <Card className="group hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-border/50 transition-colors duration-300 bg-transparent cursor-pointer w-full">
                          <CardHeader className="p-4 sm:p-6 flex items-center justify-center min-h-[80px] sm:min-h-[100px]">
                            <div className="text-center">
                              <CardTitle className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                                {stage} →
                              </CardTitle>
                            </div>
                          </CardHeader>
                        </Card>
                      </div>
                    ))}
                  </div>
                  
                  {/* Drag Direction Indicator */}
                  {isDragging && Math.abs(dragOffset) > 10 && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className={`px-3 py-2 rounded-lg bg-background/90 border border-border text-sm font-medium transition-opacity duration-200 ${
                        dragOffset > 0 ? 'text-blue-600' : 'text-green-600'
                      }`}>
                        {dragOffset > 0 ? '← Previous' : 'Next →'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Arrows */}
                {currentCard > 0 && (
                  <button
                    onClick={prevCard}
                    className="absolute left-2 top-[40px] w-8 h-8 border border-border rounded-full flex items-center justify-center hover:bg-background/20 transition-colors z-10"
                    aria-label="Previous card"
                  >
                    <Icon name="arrow-left-line" className="w-4 h-4" />
                  </button>
                )}
                {currentCard < ventureStages.length - 1 && (
                  <button
                    onClick={nextCard}
                    className="absolute right-2 top-[40px] w-8 h-8 border border-border rounded-full flex items-center justify-center hover:bg-background/20 transition-colors z-10"
                    aria-label="Next card"
                  >
                    <Icon name="arrow-right-line" className="w-4 h-4" />
                  </button>
                )}

                {/* Carousel Indicators */}
                <div className="flex justify-center mt-4 space-x-2">
                  {ventureStages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToCard(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentCard 
                          ? 'bg-primary' 
                          : 'bg-border hover:bg-muted-foreground'
                      }`}
                      aria-label={`Go to card ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Grid Layout */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-5 gap-4">
                {ventureStages.map((stage, index) => (
                  <Card key={index} className="group hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-border/50 transition-colors duration-300 bg-transparent cursor-pointer">
                    <CardHeader className="p-4 h-full flex items-center justify-center">
                      <div className="text-center">
                        <CardTitle className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                          {stage} →
                        </CardTitle>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
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
      description: "Automate compliance, enhance risk management, and improve customer service.",
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
    <Section paddingY="lg">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="space-y-8 lg:space-y-12">
          {/* Section Header */}
          <div className="text-left lg:text-center space-y-0 lg:space-y-1 max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
            <H1 className="text-2xl sm:text-3xl md:text-4xl lg:text-2xl xl:text-3xl 2xl:text-4xl">Intelligent Solutions for Every Domain</H1>
            <BodyLarge className="text-muted-foreground max-w-4xl text-base sm:text-lg md:text-xl lg:mx-auto">
              Powered by Elevation AI and guided by experts.
            </BodyLarge>
          </div>

          {/* Mobile Layout - Single Column */}
          <div className="block lg:hidden space-y-4">
            {solutions.map((solution, index) => (
              <Link key={index} href={`/solutions/${solution.title.toLowerCase().replace(/\s+/g, '-').replace(/organizations?/g, '')}`} className="block">
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50 transition-colors duration-300 bg-transparent">
                  <CardHeader className="pt-4 px-4 pb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={solution.icon} size="xl" className="text-primary" />
                      </div>
                      <div className="space-y-3 flex-1">
                        <CardTitle className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">{solution.title}</CardTitle>
                        <P className="text-muted-foreground leading-relaxed">{solution.description}</P>
                        
                        {/* Learn More Link */}
                        <div className="pt-2">
                          <span className="inline-flex items-center text-primary group">
                            <span className="group-hover:translate-x-1 transition-transform duration-200">Learn more →</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          {/* Desktop Layout - Grid */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {solutions.map((solution, index) => (
              <Link key={index} href={`/solutions/${solution.title.toLowerCase().replace(/\s+/g, '-').replace(/organizations?/g, '')}`} className="block">
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50 transition-colors duration-300 bg-transparent h-full">
                  <CardHeader className="pt-3 px-4 pb-3 lg:pt-4 lg:px-6 lg:pb-4 xl:pt-5 lg:px-6 xl:pb-5 2xl:pt-6 2xl:px-8 2xl:pb-6">
                    <div className="flex items-start gap-4 lg:gap-5">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={solution.icon} size="2xl" className="text-primary" />
                      </div>
                      <div className="space-y-3 lg:space-y-4 flex-1">
                        <CardTitle className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">{solution.title}</CardTitle>
                        <P className="text-muted-foreground leading-relaxed">{solution.description}</P>
                        
                        {/* Learn More Link */}
                        <div className="pt-2">
                          <span className="inline-flex items-center text-primary group">
                            <span className="group-hover:translate-x-1 transition-transform duration-200">Learn more →</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
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
    <Section paddingY="lg" className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        {/* Mobile Layout - Full Viewport Height */}
        <div className="block lg:hidden min-h-screen flex items-center justify-center py-8">
          <div className="text-left space-y-8 max-w-3xl mx-auto">
            <div className="space-y-6">
              <H1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">Elevate Your Organization</H1>
              <BodyLarge className="text-muted-foreground text-base sm:text-lg md:text-xl">
                From strategy to execution, Elevation AI unifies your knowledge, secures your operation, and empowers your teams to operate with clarity in the agentic era.
              </BodyLarge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                <Link href="/wireframes/demo">
                  Request a Demo
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                <Link href="/wireframes/sign-up">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Original Design */}
        <div className="hidden lg:block">
          <div className="text-center space-y-8 lg:space-y-12 max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
            <div className="space-y-4 lg:space-y-6">
              <H1>Elevate Your Organization</H1>
              <BodyLarge className="text-muted-foreground max-w-4xl mx-auto">
                From strategy to execution, Elevation AI unifies your knowledge, secures your operation, and empowers your teams to operate with clarity in the agentic era.
              </BodyLarge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                <Link href="/wireframes/demo">
                  Request a Demo
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                <Link href="/wireframes/sign-up">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Floating Back to Top Component
function FloatingBackToTop() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-background/80 backdrop-blur-sm border border-border/50"
      aria-label="Back to top"
    >
      <Icon name="arrow-up-s-line" className="h-5 w-5" />
    </Button>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="border-t bg-muted/30 transition-colors duration-300">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <Logo width={120} height={21} />
              <BodySmall className="text-muted-foreground">
                The business orchestration platform.
              </BodySmall>
              {/* LinkedIn Icon */}
              <div className="pt-2">
                <Link 
                  href="https://www.linkedin.com/company/elevationai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-200"
                  aria-label="Follow Elevation AI on LinkedIn"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
              </div>
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
          <Separator className="mt-20 lg:mt-24 mb-4 lg:mb-6 bg-border/60" />
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
            {/* Content Column */}
            <div className="flex-1 text-left space-y-2">
              <H3 className="text-xs font-medium uppercase tracking-wider text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs">Stay Updated</H3>
              <BodySmall className="text-muted-foreground">
                Get the latest insights on agentic AI, platform updates, and industry trends delivered to your inbox.
              </BodySmall>
            </div>
            
            {/* Form Column */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 h-10 border border-border rounded-md bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
              <Button variant="secondary" className="px-6 h-10">
                Subscribe
              </Button>
            </div>
          </div>
          
          <Separator className="my-4 lg:my-6 bg-border/60" />
          
          <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-4">
            <BodySmall className="text-muted-foreground text-left">
              © 2025 Elevation AI. All rights reserved.
            </BodySmall>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></div>
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
              <ProblemIntroductionSection />
                      <ProblemSection />
        <PlatformSection />
              <WhoWeServeSection />
              <HowWeDoItSection />
              <ClosingCTASection />
            </main>
          
          {/* Floating Back to Top Button */}
          <FloatingBackToTop />
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
