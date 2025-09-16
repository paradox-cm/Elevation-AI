"use client"

import React from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { Separator } from "@/components/ui/separator"
import Icon from "@/components/ui/icon"
import { Carousel, CarouselItem } from "@/components/ui/carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { H1, H2, H3, H4, P, BodyLarge, BodySmall, HeroHeading } from "@/components/ui/typography"
import { MainHeader } from "@/components/ui/main-header"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedFavicon } from "@/components/ui/animated-favicon"
import { CookiesBanner } from "@/components/ui/cookies-banner"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { calculateActiveSlide, getScrollSpacerHeight } from "@/lib/scroll-standards"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { StarfieldAnimationPlatform } from "@/app/design-system/animations/starfield-animation"
import { 
  UnifiedKnowledge, 
  IntelligentProcessAutomation, 
  IntelligentProcessAutomationMobile,
  RealTimeBusinessIntelligence, 
  RealTimeBusinessIntelligenceMobile,
  FutureReady,
  FutureReadyMobile,
  KnowledgeBlocks,
  KnowledgeBlocksMobile,
  WorkspacesCanvases,
  AgenticEngine,
  PersonalCopilot,
  EnterpriseSecurity,
  LogoCarousel
} from "@/components/animations"

// Original Typewriter Text Component (for "The Agentic Platform for" format)
function OriginalTypewriterText({ 
  text, 
  speed = 200, 
  delay = 0, 
  skipAnimation = false,
  cyclingWords = [],
  cyclingSpeed = 300,
  cyclingDelay = 0
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
  const [isCycling, setIsCycling] = React.useState(false)
  const [currentCycleIndex, setCurrentCycleIndex] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isTypingComplete, setIsTypingComplete] = React.useState(false)
  const [cyclingWordIndex, setCyclingWordIndex] = React.useState(0)
  const [isTypingCyclingWord, setIsTypingCyclingWord] = React.useState(false)

  // Split text into words
  const words = text.split(" ")
  const baseWords = words // Keep all words as base text

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
  }, [text, words.length])

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

  // Initial typing animation
  React.useEffect(() => {
    if (skipAnimation || !isTyping || currentWordIndex >= words.length) return

    const timer = setTimeout(() => {
      const newWordIndex = currentWordIndex + 1
      setDisplayText(words.slice(0, newWordIndex).join(" "))
      setCurrentWordIndex(newWordIndex)
      
      // Start cycling after initial text is complete
      if (newWordIndex >= words.length && cyclingWords.length > 0) {
        setTimeout(() => {
          setIsCycling(true)
        }, cyclingDelay) // Wait before starting to cycle
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [currentWordIndex, words, speed, isTyping, skipAnimation, cyclingWords.length, cyclingDelay])

  // Cycling animation - word by word typing and deletion
  React.useEffect(() => {
    if (!isCycling || cyclingWords.length === 0) return

    const currentCycleWord = cyclingWords[currentCycleIndex]
    const cyclingWordParts = currentCycleWord.split(" ")
    const baseText = baseWords.join(" ") + " "

    if (isDeleting) {
      // Delete word by word
      if (cyclingWordIndex > 0) {
        const timer = setTimeout(() => {
          const remainingWords = cyclingWordParts.slice(0, cyclingWordIndex - 1)
          setDisplayText(baseText + remainingWords.join(" "))
          setCyclingWordIndex(cyclingWordIndex - 1)
        }, cyclingSpeed / 2)

        return () => clearTimeout(timer)
      } else {
        // All words deleted, move to next cycle
        const timer = setTimeout(() => {
          setDisplayText(baseText)
          setIsDeleting(false)
          setCyclingWordIndex(0)
          setCurrentCycleIndex((prev) => (prev + 1) % cyclingWords.length)
        }, cyclingSpeed / 2)

        return () => clearTimeout(timer)
      }
    } else {
      // Type word by word
      if (cyclingWordIndex < cyclingWordParts.length) {
        const timer = setTimeout(() => {
          const currentWords = cyclingWordParts.slice(0, cyclingWordIndex + 1)
          setDisplayText(baseText + currentWords.join(" "))
          setCyclingWordIndex(cyclingWordIndex + 1)
        }, cyclingSpeed / 2)

        return () => clearTimeout(timer)
      } else {
        // All words typed, mark as complete and start 2-second timer
        setIsTypingComplete(true)
      }
    }
  }, [isCycling, currentCycleIndex, isDeleting, cyclingWordIndex, baseWords, cyclingWords, cyclingSpeed])

  // Handle the 2-second display duration after typing is complete
  React.useEffect(() => {
    if (!isCycling || isDeleting || !isTypingComplete) return
    
    const timer = setTimeout(() => {
      setIsDeleting(true)
      setIsTypingComplete(false) // Reset for next cycle
    }, 2000) // Show each word for exactly 2 seconds

    return () => clearTimeout(timer)
  }, [isCycling, isDeleting, isTypingComplete, currentCycleIndex])

  return (
    <>
      {/* Mobile: Two-line layout with fixed height */}
      <div className="block sm:hidden">
        <div className="min-h-[3em] relative">
          {!isCycling ? (
            // Show the typing animation text
            <div className="inline">
              {displayText}
              {!skipAnimation && currentWordIndex < words.length && (
                <span className="animate-pulse inline-block w-3 h-[0.8em] bg-current ml-1"></span>
              )}
            </div>
          ) : (
            // Show the cycling words animation - same as desktop but with mobile spacing
            <div className="inline">
              {displayText}
              {!skipAnimation && (
                <span className="animate-pulse inline-block w-3 h-[0.8em] bg-current ml-1"></span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Desktop: Single-line layout */}
      <span className="hidden sm:inline-block leading-tight">
        {displayText}
        {!skipAnimation && (
          <span className="animate-pulse inline-block w-3 h-[0.8em] bg-current ml-1"></span>
        )}
      </span>
    </>
  )
}

// Typewriter Text Component
function TypewriterText({ 
  text, 
  speed = 200, 
  delay = 0, 
  skipAnimation = false,
  cyclingWords = [],
  cyclingSpeed = 300,
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
  const [isCycling, setIsCycling] = React.useState(false)
  const [currentCycleIndex, setCurrentCycleIndex] = React.useState(0)
  const [isScrolling, setIsScrolling] = React.useState(false)
  const [isTransitioning, setIsTransitioning] = React.useState(false)
  const [previousWord, setPreviousWord] = React.useState("")

  // Split text into words to find where to insert cycling word
  const words = text.split(" ")
  const cyclingWordIndex = words.findIndex(word => word === "into") // Find "into" position to insert before it
  
  // Create base text without the cycling word
  const beforeCyclingWord = words.slice(0, cyclingWordIndex).join(" ")
  const afterCyclingWord = words.slice(cyclingWordIndex).join(" ")

  // Reset animation on mount and when text changes
  React.useEffect(() => {
    if (skipAnimation) {
      // If skipping animation, show full text immediately
      const firstCycleWord = cyclingWords.length > 0 ? cyclingWords[0] : "business"
      setDisplayText(beforeCyclingWord + " " + firstCycleWord + " " + afterCyclingWord)
      setCurrentWordIndex(999) // Set high to indicate complete
      setIsTyping(false)
    } else {
      setDisplayText("")
      setCurrentWordIndex(0)
      setIsTyping(false)
    }
  }, [text, cyclingWords, beforeCyclingWord, afterCyclingWord])

  // Handle skipAnimation changes
  React.useEffect(() => {
    if (skipAnimation) {
      // If skipping animation, show full text immediately
      const firstCycleWord = cyclingWords.length > 0 ? cyclingWords[0] : "business"
      setDisplayText(beforeCyclingWord + " " + firstCycleWord + " " + afterCyclingWord)
      setCurrentWordIndex(999) // Set high to indicate complete
      setIsTyping(false)
    }
  }, [skipAnimation, text, cyclingWords, beforeCyclingWord, afterCyclingWord])

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

  // Initial typing animation - types out the complete text with first cycling word word by word
  React.useEffect(() => {
    if (skipAnimation || !isTyping) return

    const firstCycleWord = cyclingWords.length > 0 ? cyclingWords[0] : "business"
    const fullText = beforeCyclingWord + " " + firstCycleWord + " " + afterCyclingWord
    const fullWords = fullText.split(" ")

    // Show first word immediately when typing starts
    if (currentWordIndex === 0) {
      setDisplayText(fullWords[0])
      setCurrentWordIndex(1)
      return
    }

    if (currentWordIndex < fullWords.length) {
      const timer = setTimeout(() => {
        const newWordIndex = currentWordIndex + 1
        setDisplayText(fullWords.slice(0, newWordIndex).join(" "))
        setCurrentWordIndex(newWordIndex)
        
        // Start scrolling animation after initial text is complete
        if (newWordIndex >= fullWords.length && cyclingWords.length > 1) {
          setTimeout(() => {
            setIsCycling(true)
            setIsScrolling(true)
          }, cyclingDelay) // Wait before starting to cycle
        }
      }, speed)

      return () => clearTimeout(timer)
    }
  }, [currentWordIndex, text, speed, isTyping, skipAnimation, cyclingWords, cyclingDelay, beforeCyclingWord, afterCyclingWord])

  // Scrolling animation for cycling words
  React.useEffect(() => {
    if (!isScrolling || cyclingWords.length <= 1) return

      const timer = setTimeout(() => {
      // Start transition
      setIsTransitioning(true)
      setPreviousWord(cyclingWords[currentCycleIndex])
      
      // After transition starts, change the word
      setTimeout(() => {
        setCurrentCycleIndex((prev) => (prev + 1) % cyclingWords.length)
        setIsTransitioning(false)
      }, 300) // Half of the transition duration
    }, cyclingDelay) // Wait before switching to next word

      return () => clearTimeout(timer)
  }, [isScrolling, currentCycleIndex, cyclingWords.length, cyclingDelay, cyclingWords])

  // Update display text when cycling word changes
  React.useEffect(() => {
    if (isScrolling && cyclingWords.length > 0) {
      const currentCycleWord = cyclingWords[currentCycleIndex]
      const fullText = beforeCyclingWord + " " + currentCycleWord + " " + afterCyclingWord
      setDisplayText(fullText)
    }
  }, [isScrolling, currentCycleIndex, beforeCyclingWord, afterCyclingWord, cyclingWords])

  return (
    <span className="inline-block leading-tight">
      {!isScrolling ? (
        // Show the typing animation text
        <>
          {displayText}
          {!skipAnimation && currentWordIndex < (beforeCyclingWord + " " + (cyclingWords[0] || "business") + " " + afterCyclingWord).split(" ").length && (
            <span className="animate-pulse inline-block w-3 h-[0.8em] bg-current ml-1"></span>
          )}
        </>
      ) : (
        // Show the cycling words animation
        <>
          {beforeCyclingWord}
          {beforeCyclingWord && " "}
          <span className="inline-block relative w-[200px]" style={{ lineHeight: 'inherit' }}>
            {/* Top gradient mask for fade effect - positioned above container to catch sliding words - hidden on mobile and small */}
            <div className="hidden md:block absolute left-0 right-0 pointer-events-none z-10 bg-gradient-to-b from-background via-background/80 via-background/40 to-transparent" style={{ top: '-32px', height: '32px' }}></div>
            {/* Cycling word with sliding animation - no overflow control */}
            {cyclingWords.length > 0 && (
              <>
                {/* Current word sliding up */}
                <span 
                  className={`inline-block transition-transform duration-300 ease-out will-change-transform ${
                    isTransitioning ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
                  }`}
                  style={{ 
                    lineHeight: 'inherit',
                    clipPath: isTransitioning ? 'inset(0 0 100% 0)' : 'inset(0 0 0 0)'
                  }}
                >
                  {cyclingWords[currentCycleIndex]}
                </span>
                {/* Next word sliding in from bottom */}
                {isTransitioning && (
                  <span 
                    className="absolute top-0 left-0 inline-block transition-transform duration-300 ease-out will-change-transform sm:top-0 top-4"
                    style={{
                      lineHeight: 'inherit',
                      transform: 'translateY(12px)',
                      clipPath: 'inset(100% 0 0 0)'
                    }}
                  >
                    {cyclingWords[(currentCycleIndex + 1) % cyclingWords.length]}
                  </span>
                )}
              </>
            )}
          </span>
          {afterCyclingWord && " "}
          {afterCyclingWord}
        </>
      )}
    </span>
  )
}

// Hero Section
function HeroSection() {
  return (
    <Section 
      paddingY="lg" 
      className="flex items-center h-screen pt-8 sm:pt-0"
    >
      <Container size="2xl" >
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 text-left">
            <div className="space-y-4 sm:space-y-6">
                              <HeroHeading>
                  <OriginalTypewriterText 
                    text="The Agentic Platform for" 
                    speed={100} 
                    delay={500}
                    cyclingSpeed={300}
                    cyclingDelay={0}
                    cyclingWords={[
                      "Intelligent Operations.",
                      "Seamless Workflows.",
                      "Data-Driven Decisions.",
                      "Automated Processes.",
                      "Strategic Growth.",
                      "Operational Excellence.",
                      "Business Transformation.",
                      "Digital Innovation."
                    ]}
                  />
                              </HeroHeading>
              <P className="text-muted-foreground max-w-2xl xl:max-w-4xl 2xl:max-w-5xl text-base sm:text-base md:text-lg leading-relaxed">
                Elevation AI is the agentic knowledge and work orchestration platform, powered by a concierge team, unifying knowledge, streamlining workflows and securing your use of AI. Your universe, intelligently orchestrated.
              </P>
            </div>
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

          {/* Visual */}
          <div className="relative h-[30vh] sm:h-[35vh] lg:h-[40vh] xl:h-[45vh] 2xl:h-[50vh] rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center border border-border/50 overflow-hidden">
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
            <div className="w-29 h-29 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-48 xl:h-48 2xl:w-52 2xl:h-52 flex items-center justify-center relative z-10 mx-auto">
              <AnimatedFavicon 
                width={256}
                height={256}
                className="w-29 h-29 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-48 xl:h-48 2xl:w-52 2xl:h-52"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Introduction Section
function IntroductionSection() {
  const accordionItems = [
    {
      title: "Securely Orchestrate Your Business",
      content: "Your business's greatest asset—its collective data and knowledge—unlocked and ready to power every decision.",
      value: "greatest-asset"
    },
    {
      title: "Seamless Collaboration, Shared Context", 
      content: "Instead of being siloed across apps, conversations, and documents, your knowledge lives in one intelligent network—accessible, contextual, and aligned for action.",
      value: "scattered-to-connected"
    },
    {
      title: "Clarity That Drives Action",
      content: "Elevation AI transforms complexity into focus—delivering clarity, precision, and control so your organization can move faster and stay ahead.",
      value: "clarity-drives-action"
    }
  ]

  return (
    <Section paddingY="xl" className="relative">
      {/* Blue Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-600/15 to-blue-500/10"></div>
      <Container size="2xl" className="px-4 sm:px-6 lg:px-8 lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px] relative z-10">
        <div className="grid grid-cols-12 gap-4 lg:gap-8 items-start">
          {/* Left Column - Heading */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <H3>
              The Agentic Era is Here
            </H3>
          </div>

          {/* Right Column - Accordion */}
          <div className="col-span-12 lg:col-span-8 space-y-4 pb-6">
            <Accordion type="single" collapsible className="w-full" defaultValue="greatest-asset">
              {accordionItems.map((item, index) => (
                <AccordionItem key={item.value} value={item.value} className="border-b border-border/50">
                  <AccordionTrigger className="text-left text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium leading-tight sm:leading-normal tracking-normal text-primary hover:no-underline py-4">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-base sm:text-base md:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-medium leading-tight sm:leading-normal tracking-normal text-muted-foreground pb-4">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Problem We Solve Section
function ProblemSection() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  
  const problems = [
      {
        title: "The Business Orchestration Platform",
        description: "Work from a single source of truth. Break down the walls between departments and tools, work from a unified platform where all your knowledge is connected, accessible, and actionable in one place.",
        icon: "database-2-line"
      },
    {
      title: "Intelligent Process Automation",
      description: "Eliminate bottlenecks with context-aware automation. Elevation AI identifies and automates the repetitive processes that hold you back—freeing your people from busywork so they can focus on high-value work that drives growth.",
      icon: "brain-line"
    },
    {
      title: "Real-Time Business Intelligence",
              description: "Convert blind spots into detailed, actionable insights with a unified command center—delivering real-time visibility across operations and the confidence to act.",
      icon: "eye-line"
    },
    {
      title: "Future-Ready Strategic Advantage",
      description: "Mitigate strategic risk, lead the agentic era. Elevation AI is the platform and partnership which ensures you are not just keeping up, but leading the way in the new AI-powered business landscape.",
      icon: "shield-check-line"
    }
  ]


    return (
    <Section paddingY="lg">
      <Container size="2xl">
        <div className="space-y-6 sm:space-y-8 lg:space-y-12">
          {/* Mobile Layout */}
          {!isDesktop && (
            <div key="mobile-layout" className="-mx-4 sm:-mx-6 lg:-mx-8 mb-0">
              {/* Section Headline */}
              <div className="text-left lg:text-center space-y-3 lg:space-y-2 mb-4 sm:mb-6 md:mb-8 pl-4 sm:pl-6 lg:pl-8">
                <H1>Orchestrate Your Universe</H1>
              <P className="text-muted-foreground max-w-4xl text-base sm:text-base md:text-lg md:text-xl">
                Turn scattered knowledge into precision, collaboration, and clarity—securely at enterprise scale.
              </P>
            </div>
            <div className="overflow-x-auto overflow-y-hidden pb-1">
              <div className="flex gap-4 w-max pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8 items-stretch">
                {problems.map((problem, index) => (
                  <div
                    key={index}
                    data-problem-card
                    className="w-[320px] sm:w-[380px] flex-shrink-0"
                  >
                    <Card className="h-[520px] sm:h-[570px] md:h-[620px] border-border/50 transition-colors duration-200 ease-out flex flex-col gap-0">
                      <CardHeader className="pt-4 pb-4 px-4 flex-shrink-0 h-[200px] sm:h-[220px] md:h-[240px]">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name={problem.icon} size="lg" className="text-primary" />
                          </div>
                          <CardTitle className="text-base font-semibold">{problem.title}</CardTitle>
                        </div>
                        <BodyLarge className="text-muted-foreground text-sm leading-relaxed">
                          {problem.description}
                        </BodyLarge>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col pb-6 px-4 min-h-0">
                        {/* Animation Container - Fixed position */}
                        <div className="h-[220px] sm:h-[260px] md:h-[300px] rounded-lg flex items-center justify-center border border-border/50 relative overflow-hidden">
                          {index === 0 && (
                            <UnifiedKnowledge 
                              width={154} 
                              height={154} 
                              showBorder={false}
                              className=""
                            />
                          )}
                          {index === 1 && (
                            <IntelligentProcessAutomationMobile 
                              width={196} 
                              height={112} 
                              showBorder={false}
                              className=""
                            />
                          )}
                          {index === 2 && (
                            <RealTimeBusinessIntelligenceMobile 
                              width={140} 
                              height={140} 
                              showBorder={false}
                              className=""
                            />
                          )}
                          {index === 3 && (
                            <FutureReadyMobile 
                              width={140} 
                              height={112} 
                              showBorder={false}
                              className=""
                            />
                          )}
                        </div>
                        {/* Calculate Your Plan Link */}
                        <div className="mt-4 text-left">
                          <Link 
                            href="/website/pricing" 
                            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200"
                          >
                            Calculate Your Plan →
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            </div>
          )}

          {/* Desktop Layout - Natural Scrolling Carousel */}
          {isDesktop && (
            <div key="desktop-layout" className="relative">
              {/* Section Headline */}
              <div className="text-center space-y-3 lg:space-y-2 mb-4 lg:mb-6 xl:mb-8">
                <H1>Orchestrate Your Universe</H1>
                <P className="text-muted-foreground max-w-4xl mx-auto">
                  Turn scattered knowledge into precision, collaboration, and clarity—securely at enterprise scale.
                </P>
              </div>

              {/* Natural Scrolling Container */}
              <div className="overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide">
                <div className="flex gap-6 w-max pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8 items-stretch">
                  {problems.map((problem, index) => (
                    <div
                      key={index}
                      className="w-[480px] lg:w-[520px] xl:w-[560px] 2xl:w-[600px] flex-shrink-0"
                    >
                      <Card className="h-[500px] lg:h-[550px] xl:h-[600px] 2xl:h-[650px] border-border/50 transition-colors duration-200 ease-out flex flex-col gap-0">
                        <CardHeader className="pt-6 pb-4 px-6 flex-shrink-0 h-[240px] lg:h-[260px] xl:h-[280px] 2xl:h-[300px]">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Icon name={problem.icon} size="xl" className="text-primary" />
                              </div>
                              <CardTitle className="text-xl font-semibold">{problem.title}</CardTitle>
                            </div>
                            <BodyLarge className="text-muted-foreground text-base leading-relaxed">
                              {problem.description}
                            </BodyLarge>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col pb-6 px-6 min-h-0">
                          {/* Animation Container - Fixed position */}
                          <div className="h-[280px] lg:h-[320px] xl:h-[360px] 2xl:h-[400px] rounded-lg flex items-center justify-center border border-border/50 relative overflow-hidden">
                            {index === 0 && (
                              <UnifiedKnowledge 
                                width={308} 
                                height={308} 
                                showBorder={false}
                              />
                            )}
                            {index === 1 && (
                              <IntelligentProcessAutomation 
                                width={420} 
                                height={280} 
                                showBorder={false}
                              />
                            )}
                            {index === 2 && (
                              <RealTimeBusinessIntelligence 
                                width={308} 
                                height={308} 
                                showBorder={false}
                              />
                            )}
                            {index === 3 && (
                              <FutureReady 
                                width={420} 
                                height={280} 
                                showBorder={false}
                              />
                            )}
                          </div>
                          {/* Calculate Your Plan Link */}
                          <div className="mt-4 text-left">
                            <Link 
                              href="/website/pricing" 
                              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200"
                            >
                              Calculate Your Plan →
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}



// Platform Overview Section
function PlatformSection() {
  const [activeTab, setActiveTab] = React.useState(0)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
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
    // Only run on desktop - use a more reliable check
    if (typeof window === 'undefined' || window.innerWidth < 1024) return
    
    const handleScroll = () => {
      if (!sectionRef.current) return
      
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
    <Section paddingY="lg" className="relative">
      {/* Background Animation - Centralized Starfield */}
      <div className="absolute inset-0 z-0">
        <div className={`${isDesktop ? 'sticky top-0 h-screen' : 'h-full'}`}>
          <StarfieldAnimationPlatform className="w-full h-full" />
        </div>
      </div>
      
      <Container size="2xl" className="relative z-10">
        <div className="space-y-6 sm:space-y-8 lg:space-y-12">
          {/* Mobile Layout */}
          <div className="block lg:hidden -mx-4 sm:-mx-6 lg:-mx-8 mb-0">
            {/* Section Headline */}
            <div className="text-left lg:text-center space-y-3 lg:space-y-2 mb-4 sm:mb-6 md:mb-8 pl-4 sm:pl-6 lg:pl-8">
              <H1>The Agentic Platform</H1>
              <P className="text-muted-foreground max-w-4xl text-base sm:text-base md:text-lg md:text-xl">
                So your business moves faster, thinks smarter, and stays ahead.
              </P>
            </div>
            <div className="overflow-x-auto pb-1">
              <div className="flex gap-4 w-max pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    data-platform-card
                    className="w-[320px] sm:w-[380px] flex-shrink-0"
                  >
                                         <Card className="h-[500px] sm:h-[550px] md:h-[600px] xl:h-[650px] 2xl:h-[700px] border-border/50 transition-colors duration-300 flex flex-col gap-0">
                      <CardHeader className="pt-4 pb-4 px-4 flex-shrink-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name={feature.icon} className="text-blue-600" />
                          </div>
                          <CardTitle className="text-base font-semibold">{feature.title}</CardTitle>
                        </div>
                        <BodyLarge className="text-muted-foreground text-sm leading-relaxed">
                          {feature.description}
                        </BodyLarge>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col pb-6 xl:pb-8 2xl:pb-10 px-4 min-h-0">
                        {/* Spacer to push animation to bottom */}
                        <div className="flex-1"></div>
                        {/* Animation Container */}
                        <div className="rounded-xl flex items-center justify-center border border-border/50 relative overflow-hidden mb-2">
                          {index === 0 && (
                            <KnowledgeBlocksMobile 
                              key={isDesktop ? "lg" : "sm"}
                              width={220} 
                              height={220} 
                              showBorder={false}
                            />
                          )}
                          {index === 1 && (
                            <WorkspacesCanvases 
                              key={isDesktop ? "lg" : "sm"}
                              width={220} 
                              height={220} 
                              showBorder={false}
                            />
                          )}
                          {index === 2 && (
                            <AgenticEngine 
                              key={isDesktop ? "lg" : "sm"}
                              width={220} 
                              height={220} 
                              showBorder={false}
                            />
                          )}
                          {index === 3 && (
                            <PersonalCopilot 
                              key={isDesktop ? "lg" : "sm"}
                              width={220} 
                              height={220} 
                              showBorder={false}
                            />
                          )}
                          {index === 4 && (
                            <EnterpriseSecurity 
                              width={220} 
                              height={220} 
                              showBorder={false}
                            />
                          )}
                        </div>
                        {/* Learn more Link */}
                        <div className="mt-4 text-left">
                          <Link 
                            href="/website/platform" 
                            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200"
                          >
                            Learn more →
                          </Link>
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
                                  <div className="w-full flex flex-col items-center justify-center">
                  {/* Section Headline */}
                  <div className="text-center space-y-3 lg:space-y-2 mb-4 lg:mb-6 xl:mb-8">
                    <H1>The Agentic Platform</H1>
                    <P className="text-muted-foreground max-w-4xl mx-auto">
                      So your business moves faster, thinks smarter, and stays ahead.
                    </P>
                  </div>
                  {/* Tab Content Container */}
                  <div className="relative w-full h-[500px] lg:h-[600px] xl:h-[650px] 2xl:h-[700px] pb-6">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 pb-6 ${
                          activeTab === index
                            ? 'opacity-100'
                            : 'opacity-0 pointer-events-none'
                        }`}
                      >
                        <Card className="border-border/50 transition-colors duration-300 h-full">
                          <CardHeader className="h-full flex flex-col pt-2 px-6 pb-6 lg:pt-4 lg:px-8 lg:pb-8 xl:pt-6 xl:px-10 xl:pb-10 2xl:pt-8 2xl:px-12 2xl:pb-12">
                            {/* Tab Navigation - Positioned at top of card with proper spacing */}
                            <div className="flex flex-wrap justify-center gap-2 lg:gap-4 xl:gap-6 mb-2 lg:mb-4 xl:mb-6 2xl:mb-8">
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
                                {/* View Platform Link */}
                                <div className="pt-2">
                                  <Link 
                                    href="/website/platform" 
                                    className="text-primary hover:text-primary/80 text-sm lg:text-base font-medium transition-colors duration-200"
                                  >
                                    View Platform →
                                  </Link>
                                </div>
                              </div>
                              <div className="h-[320px] lg:h-[370px] xl:h-[420px] 2xl:h-[470px] w-full rounded-xl flex items-center justify-center border border-border/50 relative">
                                {activeTab === 0 && (
                                  <KnowledgeBlocks 
                                    key={isDesktop ? "lg" : "sm"}
                                    width={480} 
                                    height={320} 
                                    showBorder={false}
                                  />
                                )}
                                {activeTab === 1 && (
                                  <WorkspacesCanvases 
                                    key={isDesktop ? "lg" : "sm"}
                                    width={440} 
                                    height={440} 
                                    showBorder={false}
                                  />
                                )}
                                {activeTab === 2 && (
                                  <AgenticEngine 
                                    key={isDesktop ? "lg" : "sm"}
                                    width={440} 
                                    height={440} 
                                    showBorder={false}
                                  />
                                )}
                                {activeTab === 3 && (
                                  <PersonalCopilot 
                                    key={isDesktop ? "lg" : "sm"}
                                    width={352} 
                                    height={352} 
                                    showBorder={false}
                                  />
                                )}
                                {activeTab === 4 && (
                                  <EnterpriseSecurity 
                                    width={440} 
                                    height={440} 
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

// Logo Carousel Section
function LogoCarouselSection() {
  return (
    <Section paddingY="lg" className="bg-muted/20">
      <Container size="2xl">
        <div className="space-y-6 sm:space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-2">
            <H3 className="text-muted-foreground">
              Led by industry veterans from:
            </H3>
          </div>
          
          {/* Logo Carousel */}
          <div className="py-4 sm:py-6">
            <LogoCarousel />
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



  return (
    <Section paddingY="lg" className="bg-muted/30">
      <Container size="2xl" >
        <div className="space-y-8 lg:space-y-12">
          {/* Section Header */}
          <div className="text-left space-y-3 lg:space-y-2 max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl lg:mx-0">
            <H1>More Than a Platform.</H1>
            <P className="text-muted-foreground max-w-4xl text-base sm:text-base md:text-lg md:text-xl">
              Your partner at every step.
            </P>
          </div>

          {/* Modern Tech Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {approaches.map((approach, index) => (
              <Link key={index} href="/website/people" className="block">
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
                        <CardTitle className="text-base font-semibold">{approach.title}</CardTitle>
                      </div>
                      
                      {/* Description */}
                      <P className="text-muted-foreground leading-relaxed">
                        {approach.description}
                      </P>
                      
                      {/* View People Link */}
                      <div className="pt-2">
                        <span className="inline-flex items-center text-primary group">
                          <span className="group-hover:translate-x-1 transition-transform duration-200">View People →</span>
                        </span>
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

// Who We Serve Section
function WhoWeServeSection() {

  const solutions: CarouselItem[] = [
    {
      id: "private-markets",
      title: "Private Market Organizations",
      description: "The agentic backbone for the entire private capital lifecycle.",
      icon: ({ className }) => <Icon name="building-2-line" className={className} />,
      href: "/website/solutions?open=private-markets"
    },
    {
      id: "public-markets",
      title: "Public Market Organizations",
      description: "A unified intelligence platform for modern investment management.",
      icon: ({ className }) => <Icon name="store-line" className={className} />,
      href: "/website/solutions?open=public-markets"
    },
    {
      id: "banks",
      title: "Banks",
      description: "Automate compliance, enhance risk management, and improve customer service.",
      icon: ({ className }) => <Icon name="bank-line" className={className} />,
      href: "/website/solutions?open=banks"
    },
    {
      id: "enterprise",
      title: "Enterprise",
      description: "The secure control plane for growing and established organizations.",
      icon: ({ className }) => <Icon name="briefcase-line" className={className} />,
      href: "/website/solutions?open=enterprise"
    },
    {
      id: "government",
      title: "Government",
      description: "A secure, compliant, and auditable platform for the public sector.",
      icon: ({ className }) => <Icon name="government-line" className={className} />,
      href: "/website/solutions?open=government"
    }
  ]

  const smallCards = [
    "Creating a Venture",
    "Scaling a Venture", 
    "Exiting a Venture",
    "Post-IPO Growth",
    "Post-Exit/Family Office"
  ]

  // Convert smallCards to CarouselItem format
  const smallCardsCarouselItems = smallCards.map((card, index) => {
    // Map card names to their corresponding stage solution IDs
    const cardIdMap: { [key: string]: string } = {
      "Creating a Venture": "creating-venture",
      "Scaling a Venture": "scaling-venture", 
      "Exiting a Venture": "exiting-venture",
      "Post-IPO Growth": "post-ipo-growth",
      "Post-Exit/Family Office": "family-office"
    }
    
    const cardId = cardIdMap[card] || ""
    
    return {
      id: index,
      title: card,
      description: "→",
      href: `/website/solutions?open=${cardId}`
    }
  })




  return (
    <Section paddingY="lg">
      <Container size="2xl" >
        <div className="space-y-8 lg:space-y-12">
          {/* Section Header */}
          <div className="text-left space-y-3 lg:space-y-2 max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl lg:mx-0">
            <H1>Intelligent Solutions for Every Domain</H1>
            <P className="text-muted-foreground max-w-4xl text-base sm:text-base md:text-lg md:text-xl">
              Powered by Elevation AI and guided by experts.
            </P>
          </div>
          {/* Carousel Layout */}
          <div className="mt-8 lg:mt-12 -mx-4 sm:-mx-6 lg:-mx-8">
            <Carousel 
              items={solutions}
              autoPlay={true}
              autoPlayInterval={5000}
              showProgressIndicators={true}
              showGradients={false}
              cardWidth={400}
              cardGap={32}
              className="w-full"
              naturalScroll={true}
              cardStyle="blue"
              highlightActiveCard={true}
              responsive={{
                sm: { cardWidth: 288, cardGap: 12 },
                md: { cardWidth: 336, cardGap: 16 },
                lg: { cardWidth: 320, cardGap: 24 }
              }}
            />
          </div>
        </div>
      </Container>

      {/* Small Cards - Carousel for Small Breakpoints / Grid for Large */}
      <div className="w-full mt-8 lg:mt-12">
        {/* Carousel for Small Breakpoints */}
        <div className="lg:hidden">
          <Carousel 
            items={smallCardsCarouselItems}
            autoPlay={false}
            showProgressIndicators={false}
            showGradients={false}
            cardWidth={200}
            cardGap={16}
            className="w-full"
            highlightActiveCard={false}
            cardStyle="outline"
            naturalScroll={true}
            responsive={{
              sm: { cardWidth: 200, cardGap: 12 },
              md: { cardWidth: 220, cardGap: 14 }
            }}
          />
        </div>

        {/* Grid Layout for Large Breakpoints */}
        <div className="hidden lg:block">
          <Container size="2xl">
            <div className="grid grid-cols-5 gap-4">
              {smallCards.map((card, index) => {
                // Map card names to their corresponding stage solution IDs
                const cardIdMap: { [key: string]: string } = {
                  "Creating a Venture": "creating-venture",
                  "Scaling a Venture": "scaling-venture", 
                  "Exiting a Venture": "exiting-venture",
                  "Post-IPO Growth": "post-ipo-growth",
                  "Post-Exit/Family Office": "family-office"
                }
                
                const cardId = cardIdMap[card] || ""
                
                return (
                  <Link
                    key={index}
                    href={`/website/solutions?open=${cardId}`}
                    className="group border border-border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-transparent min-h-[320px] flex flex-col"
                  >
                    <div className="flex flex-col flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2 flex-shrink-0">
                        {card}
                      </h3>
                      <div className="flex-1 flex items-end">
                        <div className="text-left">
                          <h4 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                            →
                          </h4>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </Container>
        </div>
      </div>
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
          <div className="text-left sm:text-center space-y-8 max-w-3xl mx-auto">
            <div className="space-y-6">
              <H1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl">Orchestrate Your Universe</H1>
              <P className="text-muted-foreground text-base sm:text-base md:text-lg md:text-xl max-w-2xl mx-auto">
                From strategy to execution, Elevation AI unifies your knowledge, secures your operation, and empowers your teams to move with clarity.
              </P>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-base sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4">
                <Link href="/website/sign-up">
                  Get Started
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4">
                <Link href="/website/demo">
                  Request a Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Original Design */}
        <div className="hidden lg:block">
          <div className="text-center space-y-8 lg:space-y-12 max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
            <div className="space-y-4 lg:space-y-6">
              <H1>Orchestrate Your Universe</H1>
              <P className="text-muted-foreground max-w-2xl mx-auto">
                From strategy to execution, Elevation AI unifies your knowledge, secures your operation, and empowers your teams to move with clarity.
              </P>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-base sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4">
                <Link href="/website/sign-up">
                  Get Started
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4">
                <Link href="/website/demo">
                  Request a Demo
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


export default function WireframesHomePage() {
  // Use media query to determine if we're on desktop or mobile
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  
  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader currentPage="home" />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="homepage" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
                      <main>
              <HeroSection />
              <IntroductionSection />
              <LogoCarouselSection />
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
      
      {/* Cookies Banner */}
      <CookiesBanner />
    </PageWrapper>
  )
}
