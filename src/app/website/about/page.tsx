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
import { H1, H2, H3, H4, P, BodySmall, BodyLarge, HeroHeading } from "@/components/ui/typography"
import Icon from "@/components/ui/icon"
import { VerticalSquareFlow } from "@/components/animations"
import Link from "next/link"
import React, { useEffect } from "react"

// Simple Typewriter Text Component for cycling complete statements
function TypewriterText({ 
  text, 
  speed = 200, 
  delay = 0, 
  skipAnimation = false,
  cyclingWords = [],
  cyclingSpeed = 200,
  cyclingDelay = 3000
}: { 
  text: string; 
  speed?: number; 
  delay?: number; 
  skipAnimation?: boolean;
  cyclingWords?: string[];
  cyclingSpeed?: number;
  cyclingDelay?: number;
}) {
  const [displayText, setDisplayText] = React.useState("")
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0)
  const [isTyping, setIsTyping] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [currentCycleIndex, setCurrentCycleIndex] = React.useState(0)
  const [phase, setPhase] = React.useState<'initial' | 'typing' | 'waiting' | 'deleting' | 'complete'>('initial')

  // Get current text to display
  const getCurrentText = () => {
    if (phase === 'typing' || phase === 'waiting' || phase === 'deleting') {
      return cyclingWords[currentCycleIndex] || text
    }
    return text
  }

  const currentText = getCurrentText()
  const words = React.useMemo(() => currentText.split(" "), [currentText])

  // Reset animation on mount
  React.useEffect(() => {
    if (skipAnimation) {
      setDisplayText(text)
      setCurrentWordIndex(text.split(" ").length)
      setPhase('waiting')
    } else {
      setDisplayText("")
      setCurrentWordIndex(0)
      setPhase('initial')
    }
  }, [skipAnimation, text])

  // Start typing after delay
  React.useEffect(() => {
    if (skipAnimation || phase !== 'initial') return
    
    const timer = setTimeout(() => {
      setPhase('typing')
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, skipAnimation, phase])

  // Typing animation - word by word
  React.useEffect(() => {
    if (skipAnimation || phase !== 'typing' || !isTyping || isDeleting) return

    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        const newWordIndex = currentWordIndex + 1
        setCurrentWordIndex(newWordIndex)
        setDisplayText(words.slice(0, newWordIndex).join(" "))
      }, speed)

      return () => clearTimeout(timer)
    } else if (currentWordIndex === words.length) {
      // Finished typing, start waiting
      setPhase('waiting')
      setIsTyping(false)
    }
  }, [currentWordIndex, words.length, speed, phase, isTyping, isDeleting, skipAnimation])

  // Waiting phase - show text for 3 seconds
  React.useEffect(() => {
    if (phase !== 'waiting') return

    const timer = setTimeout(() => {
      // Check if this is the last statement
      if (currentCycleIndex >= cyclingWords.length - 1) {
        // This is the final statement, mark as complete
        setPhase('complete')
      } else if (currentCycleIndex === 0 && cyclingWords.length > 0) {
        // First statement finished, start cycling
        setCurrentCycleIndex(1)
        setPhase('deleting')
        setIsDeleting(true)
      } else if (currentCycleIndex > 0) {
        // Already cycling, start deleting
        setPhase('deleting')
        setIsDeleting(true)
      }
    }, cyclingDelay)

    return () => clearTimeout(timer)
  }, [phase, currentCycleIndex, cyclingDelay, cyclingWords.length])

  // Deleting animation - word by word
  React.useEffect(() => {
    if (phase !== 'deleting' || !isDeleting || currentWordIndex <= 0) return

    const timer = setTimeout(() => {
      const newWordIndex = currentWordIndex - 1
      setCurrentWordIndex(newWordIndex)
      setDisplayText(words.slice(0, newWordIndex).join(" "))
    }, cyclingSpeed)

    return () => clearTimeout(timer)
  }, [phase, isDeleting, currentWordIndex, words, cyclingSpeed])

  // Move to next cycle word or complete
  React.useEffect(() => {
    if (phase !== 'deleting' || !isDeleting || currentWordIndex > 0) return

    // Check if this is the last statement
    if (currentCycleIndex >= cyclingWords.length - 1) {
      // Finished all statements, mark as complete
      setPhase('complete')
      setIsDeleting(false)
      setCurrentWordIndex(0)
      setDisplayText("")
    } else {
      // Move to next word
      const nextIndex = currentCycleIndex + 1
      setCurrentCycleIndex(nextIndex)
      setIsDeleting(false)
      setCurrentWordIndex(0)
      setDisplayText("")
      setPhase('typing')
      setIsTyping(true)
    }
  }, [phase, isDeleting, currentWordIndex, cyclingWords.length, currentCycleIndex])

  // Show final statement when complete
  React.useEffect(() => {
    if (phase === 'complete' && cyclingWords.length > 0) {
      const finalText = cyclingWords[cyclingWords.length - 1]
      setDisplayText(finalText)
      setCurrentWordIndex(finalText.split(" ").length)
    }
  }, [phase, cyclingWords])


  return (
    <>
      {/* Mobile: Two-line layout */}
      <div className="block sm:hidden">
        {displayText}
        {!skipAnimation && phase !== 'complete' && (
          <span className="animate-pulse inline-block w-3 h-[0.8em] bg-current ml-1"></span>
        )}
      </div>
      
      {/* Desktop: Single-line layout */}
      <span className="hidden sm:inline-block leading-tight">
        {displayText}
        {!skipAnimation && phase !== 'complete' && (
          <span className="animate-pulse inline-block w-3 h-[0.8em] bg-current ml-1"></span>
        )}
      </span>
    </>
  )
}

// Mission Section
function MissionSection() {
  return (
    <Section id="mission-section" paddingY="lg" className="relative overflow-hidden pt-20 min-h-[60vh] flex items-center">
      {/* Background Animation */}
      <VerticalSquareFlow 
        className="opacity-20 absolute inset-0 w-full h-full"
        squareCount={800}
        maxSpeed={0.08}
      />
      
      {/* Content */}
      <Container size="2xl" className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <H1>Our Mission</H1>
          <H1 className="text-primary leading-relaxed">
            We're here to help complex organizations operate with clarity, precision and trust—unifying knowledge and orchestrating secure, agentic AI across their business.
          </H1>
        </div>
      </Container>
    </Section>
  )
}

// Problem & Solution Section
function ProblemSolutionSection() {
  return (
    <Section id="our-solution-section" paddingY="xl" className="relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-transparent to-muted/10" />
      
      <Container size="2xl" className="relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Icon name="lightbulb-line" className="w-4 h-4" />
              Our Vision
            </div>
            <H2>The Problem We Solve</H2>
          </div>

          {/* Problem & Solution Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Problem Side */}
            <div className="space-y-6">
              <Card className="bg-transparent border border-border/50 h-full">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <H3>The Challenge</H3>
                      <P className="text-lg text-muted-foreground leading-relaxed">
                        Leaders manage a universe of systems that don't talk to each other. Information is trapped in silos; context gets lost in personal AI chats; collaboration devolves into copy‑paste. The result: generic output, bottlenecks, and risk.
                      </P>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Solution Side */}
            <div className="space-y-6">
              <Card className="bg-transparent border border-border/50 h-full">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <H3>Our Solution</H3>
                    <P className="text-lg text-muted-foreground leading-relaxed">
                      Elevation AI is the orchestration platform that unifies your company's data, people, and workflows into a single command center—powered by a private Knowledge Graph and securely connected to the world of agentic AI.
                    </P>
                  </div>
                </CardContent>
              </Card>
            </div>
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
      description: "Clarity, repeatability, and measurable outcomes drive everything we build.",
      icon: "focus-3-line",
      color: "bg-blue-50 dark:bg-blue-950/30",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Security and trust",
      description: "Privacy by default; least‑privilege access; auditability built into every feature.",
      icon: "shield-check-line",
      color: "bg-green-50 dark:bg-green-950/30",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      title: "Collaboration as a feature",
      description: "Shared context is the default, not an afterthought in our platform design.",
      icon: "team-line",
      color: "bg-purple-50 dark:bg-purple-950/30",
      iconColor: "text-purple-600 dark:text-purple-400"
    },
    {
      title: "Versatility without chaos",
      description: "Many use cases, one coherent platform that adapts to your needs.",
      icon: "layout-grid-line",
      color: "bg-orange-50 dark:bg-orange-950/30",
      iconColor: "text-orange-600 dark:text-orange-400"
    },
    {
      title: "Build for longevity",
      description: "Scalable design systems and maintainable implementations for the future.",
      icon: "building-line",
      color: "bg-indigo-50 dark:bg-indigo-950/30",
      iconColor: "text-indigo-600 dark:text-indigo-400"
    }
  ]

  return (
    <Section paddingY="xl" className="relative overflow-hidden">
      <Container size="2xl" className="relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Icon name="star-line" className="w-4 h-4" />
              Our Foundation
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-8 relative z-10">
                  <div className="space-y-6">
                    {/* Icon with enhanced styling */}
                      <div className={`w-16 h-16 ${principle.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon name={principle.icon} size="2xl" className={principle.iconColor} />
                      </div>
                    
                    {/* Content */}
                    <div className="space-y-3">
                      <H3 className="text-foreground group-hover:text-primary transition-colors duration-300">
                        {principle.title}
                      </H3>
                      <P className="text-muted-foreground leading-relaxed text-base">
                        {principle.description}
                      </P>
                    </div>
                    
                  </div>
                </CardContent>
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
    <Section paddingY="xl" className="relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-transparent to-muted/10" />
      
      <Container size="2xl" className="relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Icon name="share-line" className="w-4 h-4" />
              Integration Hub
            </div>
            <H2>The Ecosystem We Orchestrate</H2>
            <P className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Elevation connects your core systems (from finance and cap tables to communications and docs) with specialized AI tools and open agent standards—so you can compose the right stack for your business and evolve it over time.
            </P>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border border-border/50 bg-transparent h-80">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex flex-col items-start text-left space-y-6 h-full justify-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon name="database-2-line" size="2xl" className="text-primary" />
                  </div>
                  <div className="space-y-4">
                    <H3>Core Systems Integration</H3>
                    <BodyLarge className="text-muted-foreground leading-relaxed">
                      Seamlessly connect finance, cap tables, communications, and documentation systems into a unified platform.
                    </BodyLarge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-border/50 bg-transparent h-80">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex flex-col items-start text-left space-y-6 h-full justify-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon name="cpu-line" size="2xl" className="text-primary" />
                  </div>
                  <div className="space-y-4">
                    <H3>AI Tools & Agent Standards</H3>
                    <BodyLarge className="text-muted-foreground leading-relaxed">
                      Connect with specialized AI tools and open agent standards to build the perfect stack for your business needs.
                    </BodyLarge>
                  </div>
                </div>
              </CardContent>
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
    <Section paddingY="xl" className="relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <Container size="2xl" className="relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Icon name="road-map-line" className="w-4 h-4" />
              Future Vision
            </div>
            <H2>The Path Ahead</H2>
            <H1 className="text-muted-foreground leading-relaxed">
              We're building the agentic backbone for how complex organizations operate—one shared knowledge graph, one secure control plane, and a growing ecosystem of agents and integrations that make work feel orchestrated, not overloaded.
            </H1>
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
        <div className="max-w-6xl mx-auto">
          <Card className="border-border/50 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
            <CardHeader className="text-center space-y-4">
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="team-line" className="text-primary" />
                  </div>
                  <H3>Careers</H3>
                </div>
                <P className="text-muted-foreground leading-relaxed">
                  We're looking for systems thinkers, security‑minded engineers, and product designers who love turning complexity into clarity. If that's you, reach out.
                </P>
                <div className="pt-4">
                  <Button size="lg" asChild>
                    <Link href="/website/careers">
                      View Open Positions
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </Container>
    </Section>
  )
}


export default function AboutPage() {
  // Handle hash navigation with header offset
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash
      if (hash === '#our-solution-section') {
        const targetSection = document.getElementById('our-solution-section')
        if (targetSection) {
          const header = document.querySelector('header')
          const headerHeight = header ? header.offsetHeight : 0
          const sectionTop = targetSection.offsetTop
          const scrollToPosition = sectionTop - headerHeight
          
          window.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth'
          })
        }
      }
    }

    // Handle initial load
    handleHashNavigation()

    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation)

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation)
    }
  }, [])

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
              <Section paddingY="xl" className="min-h-screen flex flex-col items-center justify-between relative">
                <div className="text-center flex-1 flex items-center justify-center">
                  <HeroHeading>
                    <TypewriterText 
                      text="Transforming business orchestration."
                      cyclingWords={[
                        "Transforming business orchestration.",
                        "Unifying knowledge across organizations.",
                        "Orchestrating secure, agentic AI.",
                        "Building the future of intelligent operations.",
                        "Welcome to Elevation AI"
                      ]}
                      speed={100}
                      cyclingDelay={3000}
                      cyclingSpeed={80}
                    />
                  </HeroHeading>
                </div>
                
                {/* Down Arrow Button */}
                <button
                  onClick={() => {
                    const nextSection = document.getElementById('mission-section')
                    if (nextSection) {
                      // Get the top navigation height to offset the scroll
                      const header = document.querySelector('header')
                      const headerHeight = header ? header.offsetHeight : 0
                      
                      // Calculate the position to scroll to (section top minus header height)
                      const sectionTop = nextSection.offsetTop
                      const scrollToPosition = sectionTop - headerHeight
                      
                      window.scrollTo({
                        top: scrollToPosition,
                        behavior: 'smooth'
                      })
                    } else {
                      // Fallback: scroll to the next section by finding the first section after hero
                      const sections = document.querySelectorAll('section')
                      if (sections.length > 1) {
                        const header = document.querySelector('header')
                        const headerHeight = header ? header.offsetHeight : 0
                        const sectionTop = sections[1].offsetTop
                        const scrollToPosition = sectionTop - headerHeight
                        
                        window.scrollTo({
                          top: scrollToPosition,
                          behavior: 'smooth'
                        })
                      }
                    }
                  }}
                  className="relative z-50 p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110 group mb-8 animate-bounce cursor-pointer"
                  aria-label="Scroll to next section"
                  style={{ pointerEvents: 'auto' }}
                >
                  <Icon 
                    name="arrow-down-s-line" 
                    className="w-6 h-6 text-primary group-hover:text-primary/80 transition-colors duration-300" 
                  />
                </button>
              </Section>
            </Container>

            <MissionSection />
            <ProblemSolutionSection />
            <PrinciplesSection />
            <EcosystemSection />
            <PathAheadSection />
            <CareersSection />
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}

