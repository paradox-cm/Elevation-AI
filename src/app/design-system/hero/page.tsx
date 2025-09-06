"use client"



import React from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { H1, H2, H3, H4, P, BodyLarge, BodySmall, DisplayLarge, DisplayMedium, DisplaySmall } from "@/components/ui/typography"
import { AnimatedFavicon } from "@/components/ui/animated-favicon"
import { cn } from "@/lib/utils"
import Icon from "@/components/ui/icon"

// Typewriter Text Component (from home page)
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
    <>
      {/* Mobile: Two-line layout with fixed height */}
      <div className="block sm:hidden">
        <div className="min-h-[3em] relative">
          {!isScrolling ? (
            // Show the typing animation text
            <div className="inline">
              {displayText}
              {!skipAnimation && currentWordIndex < (beforeCyclingWord + " " + (cyclingWords[0] || "business") + " " + afterCyclingWord).split(" ").length && (
                <span className="animate-pulse inline-block w-3 h-[0.8em] bg-current ml-1"></span>
              )}
            </div>
          ) : (
            // Show the cycling words animation - same as desktop but with mobile spacing
            <div className="inline">
              {beforeCyclingWord}
              {beforeCyclingWord && " "}
               <span className="inline-block relative min-h-[1.5em] w-[200px]" style={{ lineHeight: 'inherit' }}>
                 {/* Cycling word with sliding animation - no overflow control */}
                {cyclingWords.length > 0 && (
                  <>
                    {/* Current word sliding up */}
                    <span 
                      className={`inline-block transition-transform duration-600 ease-in-out ${
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
                        className="absolute top-0 left-0 inline-block transition-all duration-600 ease-in-out sm:top-0 top-4 animate-[slideInFromBottomMobile_0.6s_ease-in-out_forwards] sm:animate-[slideInFromBottomAligned_0.6s_ease-in-out_forwards]"
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
            </div>
          )}
        </div>
      </div>
      
      {/* Desktop: Single-line layout */}
      <span className="hidden sm:inline-block leading-tight">
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
             <span className="inline-block relative" style={{ lineHeight: 'inherit' }}>
               {/* Cycling word with sliding animation - no overflow control */}
              {cyclingWords.length > 0 && (
                <>
                  {/* Current word sliding up */}
                  <span 
                    className={`inline-block transition-transform duration-600 ease-in-out ${
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
                      className="absolute top-0 left-0 inline-block transition-all duration-600 ease-in-out sm:top-0 top-4 animate-[slideInFromBottomMobile_0.6s_ease-in-out_forwards] sm:animate-[slideInFromBottomAligned_0.6s_ease-in-out_forwards]"
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
    </>
  )
}

// Original Typewriter Text Component (for "The AI Control Panel for" format)
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

  // Cycling animation
  React.useEffect(() => {
    if (!isCycling || cyclingWords.length === 0) return

    const currentCycleWord = cyclingWords[currentCycleIndex]
    const fullText = baseWords.join(" ") + " " + currentCycleWord

    if (isDeleting) {
      // Delete only the cycling word, keep base text
      const timer = setTimeout(() => {
        setDisplayText(baseWords.join(" "))
        setIsDeleting(false)
        setCurrentCycleIndex((prev) => (prev + 1) % cyclingWords.length)
      }, cyclingSpeed)

      return () => clearTimeout(timer)
    } else {
      // Type the entire word at once (faster after deletion)
      const timer = setTimeout(() => {
        setDisplayText(fullText)
      }, cyclingSpeed / 2) // Type faster after deletion

      return () => clearTimeout(timer)
    }
  }, [isCycling, currentCycleIndex, isDeleting, baseWords, cyclingWords, cyclingSpeed])

  // Handle the 2-second display duration after typing
  React.useEffect(() => {
    if (!isCycling || isDeleting) return
    
    const timer = setTimeout(() => {
      setIsDeleting(true)
    }, 2000) // Show each word for exactly 2 seconds

    return () => clearTimeout(timer)
  }, [isCycling, isDeleting, currentCycleIndex])

  return (
    <>
      {/* Mobile: Two-line layout */}
      <div className="block sm:hidden">
        {!isCycling ? (
          // Show the typing animation text
          <>
            {displayText}
            {!skipAnimation && currentWordIndex < words.length && (
              <span className="animate-pulse inline-block w-3 h-[0.8em] bg-current ml-1"></span>
            )}
          </>
        ) : (
          // Show the cycling words animation - same as desktop but with mobile spacing
          <>
            {displayText}
            {!skipAnimation && (
              <span className="animate-pulse inline-block w-3 h-[0.8em] bg-current ml-1"></span>
            )}
          </>
        )}
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

// Hero Section Component
function HeroSection({ 
  title, 
  description, 
  subheadline,
  showAnimation = true, 
  variant = "current" 
}: { 
  title: string; 
  description: string; 
  subheadline: string;
  showAnimation?: boolean; 
  variant: "current" | "original" | "original-animated" | "enterprise-orchestration" 
}) {
  return (
    <Section 
      paddingY="lg" 
      className="flex items-center min-h-[300px] sm:min-h-[400px] bg-muted/30 rounded-lg"
    >
      <Container size="2xl" className="px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Content */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-left">
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-semibold leading-tight">
                {variant === "current" && showAnimation ? (
                  <TypewriterText 
                    text="Bringing into the agentic era." 
                    speed={100} 
                    delay={500}
                    cyclingSpeed={300}
                    cyclingDelay={2000}
                    cyclingWords={[
                      "business",
                      "ventures",
                      "teams",
                      "enterprise",
                      "startups",
                      "family offices",
                      "private capital",
                      "investors",
                      "hedge funds",
                      "banks",
                      "government",
                      "consultancies",
                      "institutions"
                    ]}
                  />
                ) : variant === "original-animated" && showAnimation ? (
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
                ) : variant === "original" && showAnimation ? (
                  <TypewriterText 
                    text="Your Universe. Intelligently Orchestrated." 
                    speed={100} 
                    delay={500}
                    cyclingSpeed={300}
                    cyclingDelay={2000}
                    cyclingWords={[]}
                  />
                ) : variant === "enterprise-orchestration" && showAnimation ? (
                  <OriginalTypewriterText 
                    text="The Platform & Partnership for" 
                    speed={100} 
                    delay={500}
                    cyclingSpeed={300}
                    cyclingDelay={0}
                    cyclingWords={[
                      "Enterprise.",
                      "Startups.",
                      "Ventures.",
                      "Teams.",
                      "Family Offices.",
                      "Private Capital.",
                      "Investors.",
                      "Hedge Funds.",
                      "Institutions.",
                      "Banks.",
                      "Government.",
                      "Consultancies."
                    ]}
                  />
                ) : (
                  title
                )}
              </div>
              <BodyLarge className="text-muted-foreground max-w-2xl xl:max-w-4xl 2xl:max-w-5xl text-sm sm:text-base lg:text-lg leading-relaxed">
                {subheadline}
              </BodyLarge>
            </div>
          </div>

          {/* Visual */}
          <div className="relative h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[350px] 2xl:h-[400px] rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center border border-border/50 overflow-hidden">
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
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36 flex items-center justify-center relative z-10 mx-auto">
              <AnimatedFavicon 
                width={256}
                height={256}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default function HeroPage() {
  const heroVariants = [
    {
      id: "current-animated",
      title: "Option A",
      description: "Our previous hero headline with the full typewriter effect and cycling words animation.",
      subheadline: "Your Universe. Intelligently Orchestrated. Elevation AI is the agentic knowledge and work orchestration platform & team—unifying knowledge, orchestrating workflows and securing your use of AI.",
      variant: "current" as const,
      showAnimation: true,
      badge: "Previous"
    },
    {
      id: "original-animated",
      title: "Option B",
      description: "The current hero headline with typewriter effect and cycling words animation that is now implemented on the website.",
      subheadline: "Elevation AI is the agentic knowledge and work orchestration platform, powered by a concierge team, unifying knowledge, streamlining workflows and securing your use of AI. Your Universe. Intelligently Orchestrated.",
      variant: "original-animated" as const,
      showAnimation: true,
      badge: "Current"
    },
    {
      id: "original",
      title: "Option C",
      description: "Our original hero headline with typewriter effect animation.",
      subheadline: "Elevation AI is the agentic knowledge and work orchestration platform, powered by a concierge team, unifying knowledge, orchestrating workflows and securing your use of AI.",
      variant: "original" as const,
      showAnimation: true,
      badge: "Original"
    },
    {
      id: "enterprise-orchestration",
      title: "Option D",
      description: "The enterprise orchestration approach with cycling business segments, emphasizing Elevation AI as the definitive platform and partnership for business transformation.",
      subheadline: "Elevation AI is the agentic knowledge and work orchestration platform—powered by a concierge team, unifying knowledge, streamlining workflows, and securing your AI.",
      variant: "enterprise-orchestration" as const,
      showAnimation: true,
      badge: "Alternate"
    }
  ]

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="hero" />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container size="2xl" className="px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <Section paddingY="xl">
            <PageHeader
              title="Hero Headlines"
              description="Explore our hero headline variations, from the original static version to our current animated typewriter effect with cycling words."
              size="lg"
              centered
            />
          </Section>

          {/* Hero Variants */}
          <Section paddingY="lg">
            <div className="space-y-8">
              <div>
                <H2 className="mb-4">Hero Headline Variations</H2>
                <P className="text-muted-foreground mb-8">
                  Our hero section has evolved from a simple static headline to an engaging animated experience. 
                  Here are the different versions we've used and their characteristics.
                </P>
              </div>

              <div className="space-y-12">
                {heroVariants.map((variant, index) => (
                  <Card key={variant.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {variant.title}
                            <Badge variant={variant.badge === "Current" ? "default" : "secondary"}>
                              {variant.badge}
                            </Badge>
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {variant.description}
                          </CardDescription>
                        </div>
                        {variant.showAnimation && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // We need to pass the replay function from the parent
                              // For now, we'll add a simple window reload approach
                              window.location.reload()
                            }}
                            className="flex items-center gap-2"
                          >
                            <Icon name="refresh-line" className="h-4 w-4" />
                            Replay Animation
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <HeroSection
                        title={variant.variant === "original" ? "Your Universe. Intelligently Orchestrated." : ""}
                        description={variant.description}
                        subheadline={variant.subheadline}
                        showAnimation={variant.showAnimation}
                        variant={variant.variant}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          {/* Cycling Words Options */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="refresh-line" className="h-5 w-5" />
                  Cycling Words Options
                </CardTitle>
                <CardDescription>
                  Alternative word sets for the hero headline cycling animation. Each option targets different messaging approaches and audience segments.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Option 1: Action-Oriented */}
                  <div className="space-y-3">
                    <H4 className="text-blue-600">Option 1: Action-Oriented (What We Do)</H4>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <BodySmall className="font-mono text-sm">
                        "The Agentic Platform for"<br/>
                        • Transformation.<br/>
                        • Innovation.<br/>
                        • Automation.<br/>
                        • Orchestration.<br/>
                        • Optimization.<br/>
                        • Acceleration.<br/>
                        • Evolution.<br/>
                        • Revolution.
                      </BodySmall>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      <strong>Focus:</strong> Emphasizes what Elevation AI does and the actions it enables.
                    </BodySmall>
                  </div>

                  {/* Option 2: Outcome-Focused */}
                  <div className="space-y-3">
                    <H4 className="text-green-600">Option 2: Outcome-Focused (What You Get)</H4>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <BodySmall className="font-mono text-sm">
                        "The Agentic Platform for"<br/>
                        • Breakthroughs.<br/>
                        • Excellence.<br/>
                        • Growth.<br/>
                        • Success.<br/>
                        • Impact.<br/>
                        • Results.<br/>
                        • Victories.<br/>
                        • Achievements.
                      </BodySmall>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      <strong>Focus:</strong> Highlights the results and outcomes customers can expect.
                    </BodySmall>
                  </div>

                  {/* Option 3: Process-Focused */}
                  <div className="space-y-3">
                    <H4 className="text-purple-600">Option 3: Process-Focused (How We Work)</H4>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <BodySmall className="font-mono text-sm">
                        "The Agentic Platform for"<br/>
                        • Intelligence.<br/>
                        • Insights.<br/>
                        • Decisions.<br/>
                        • Workflows.<br/>
                        • Operations.<br/>
                        • Processes.<br/>
                        • Strategies.<br/>
                        • Solutions.
                      </BodySmall>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      <strong>Focus:</strong> Describes the processes and methodologies Elevation AI uses.
                    </BodySmall>
                  </div>

                  {/* Option 4: Partnership-Focused */}
                  <div className="space-y-3">
                    <H4 className="text-orange-600">Option 4: Partnership-Focused (Who We Serve)</H4>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <BodySmall className="font-mono text-sm">
                        "The Agentic Platform for"<br/>
                        • Leaders.<br/>
                        • Pioneers.<br/>
                        • Visionaries.<br/>
                        • Innovators.<br/>
                        • Entrepreneurs.<br/>
                        • Teams.<br/>
                        • Organizations.<br/>
                        • Enterprises.
                      </BodySmall>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      <strong>Focus:</strong> Emphasizes the types of people and organizations Elevation AI serves.
                    </BodySmall>
                  </div>

                  {/* Option 5: Future-Focused */}
                  <div className="space-y-3">
                    <H4 className="text-cyan-600">Option 5: Future-Focused (What's Possible)</H4>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <BodySmall className="font-mono text-sm">
                        "The Agentic Platform for"<br/>
                        • Tomorrow.<br/>
                        • The Future.<br/>
                        • What's Next.<br/>
                        • Possibilities.<br/>
                        • Potential.<br/>
                        • Opportunities.<br/>
                        • Advancement.<br/>
                        • Progress.
                      </BodySmall>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      <strong>Focus:</strong> Looks forward to what's possible and what the future holds.
                    </BodySmall>
                  </div>

                  {/* Option 6: Hybrid (Current) */}
                  <div className="space-y-3">
                    <H4 className="text-emerald-600">Option 6: Hybrid (Current Implementation)</H4>
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <BodySmall className="font-mono text-sm">
                        "The Agentic Platform for"<br/>
                        • Intelligent Operations.<br/>
                        • Seamless Workflows.<br/>
                        • Data-Driven Decisions.<br/>
                        • Automated Processes.<br/>
                        • Strategic Growth.<br/>
                        • Operational Excellence.<br/>
                        • Business Transformation.<br/>
                        • Digital Innovation.
                      </BodySmall>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      <strong>Focus:</strong> Combines what we do, how we work, and what you get. <strong>Currently implemented.</strong>
                    </BodySmall>
                  </div>

                </div>

                <Separator />

                <div className="space-y-4">
                  <H4>Alternative Creative Approach</H4>
                  <div className="space-y-3">
                    <H4 className="text-rose-600">Inclusive Universal Appeal</H4>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <BodySmall className="font-mono text-sm">
                        "The Agentic Platform for"<br/>
                        • Every Business.<br/>
                        • Every Team.<br/>
                        • Every Vision.<br/>
                        • Every Goal.<br/>
                        • Every Challenge.<br/>
                        • Every Opportunity.<br/>
                        • Every Success.<br/>
                        • Every Future.
                      </BodySmall>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      <strong>Focus:</strong> Emphasizes inclusivity and universal appeal while maintaining the powerful cycling animation.
                    </BodySmall>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <BodySmall className="text-blue-800 dark:text-blue-200">
                    <strong>💡 Recommendation:</strong> Option 6 (Hybrid) is currently implemented as it clearly communicates what Elevation AI does while being inclusive to all business sizes and maintaining professional, campaign-worthy language.
                  </BodySmall>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Hero Headlines Analysis */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="text" className="h-5 w-5" />
                  Hero Headlines Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <H4 className="mb-2">Option A: "Bringing [word] into the agentic era."</H4>
                    <BodySmall className="text-muted-foreground">
                      <strong>Messaging:</strong> Positions Elevation AI as a transformative force, bringing various business types into the future of AI. The cycling words create inclusivity and broad appeal.
                      <br/><br/>
                      <strong>Strengths:</strong> Dynamic, forward-looking, emphasizes transformation and innovation.
                    </BodySmall>
                  </div>
                  <div>
                    <H4 className="mb-2">Option B: "The Agentic Platform for [word]."</H4>
                    <BodySmall className="text-muted-foreground">
                      <strong>Messaging:</strong> Establishes Elevation AI as "the" definitive platform for different business types. More direct and authoritative in tone.
                      <br/><br/>
                      <strong>Strengths:</strong> Confident, platform-focused, clear value proposition for specific audiences.
                    </BodySmall>
                  </div>
                  <div>
                    <H4 className="mb-2">Option C: "Your Universe. Intelligently Orchestrated."</H4>
                    <BodySmall className="text-muted-foreground">
                      <strong>Messaging:</strong> Poetic and aspirational, suggesting complete control and intelligent management of one's entire business ecosystem.
                      <br/><br/>
                      <strong>Strengths:</strong> Memorable, elegant, emphasizes comprehensive orchestration and intelligence.
                    </BodySmall>
                  </div>
                  <div>
                    <H4 className="mb-2">Option D: "The Platform & Partnership for [word]."</H4>
                    <BodySmall className="text-muted-foreground">
                      <strong>Messaging:</strong> Positions Elevation AI as both the definitive platform and trusted partnership, cycling through specific business segments to show comprehensive coverage and human expertise.
                      <br/><br/>
                      <strong>Strengths:</strong> Balances technology and human partnership, enterprise-grade, clear positioning as both platform and concierge team.
                    </BodySmall>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <H4 className="mb-2 text-blue-900 dark:text-blue-100">
                    <Icon name="lightbulb-line" className="h-4 w-4 inline mr-1" />
                    Strategic Considerations
                  </H4>
                  <BodySmall className="text-blue-800 dark:text-blue-200">
                    <strong>Option A</strong> appeals to forward-thinking businesses ready for transformation. 
                    <strong>Option B</strong> targets specific industries with clear platform positioning. 
                    <strong>Option C</strong> resonates with leaders seeking comprehensive business orchestration. 
                    <strong>Option D</strong> positions Elevation AI as both the definitive platform and trusted partnership across all business segments.
                    Each headline serves different market segments and messaging strategies.
                  </BodySmall>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Detailed Pros and Cons Analysis */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="search-line" className="h-5 w-5" />
                  Detailed Pros and Cons Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <H4 className="mb-3 text-green-700 dark:text-green-400">Option A: "Bringing [word] into the agentic era."</H4>
                      <div className="space-y-2">
                        <div>
                          <strong className="text-green-600 dark:text-green-300">Pros:</strong>
                          <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                            <li>• Highly dynamic and engaging animation</li>
                            <li>• Positions Elevation AI as a transformative force</li>
                            <li>• Broad appeal across all business types</li>
                            <li>• Future-focused messaging aligns with AI trends</li>
                            <li>• Creates emotional connection through transformation narrative</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-red-600 dark:text-red-300">Cons:</strong>
                          <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                            <li>• May feel too abstract for enterprise decision-makers</li>
                            <li>• "Agentic era" requires explanation for some audiences</li>
                            <li>• Less specific about Elevation AI's unique value</li>
                            <li>• Could be perceived as marketing fluff by technical buyers</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <H4 className="mb-3 text-green-700 dark:text-green-400">Option B: "The Agentic Platform for [word]."</H4>
                      <div className="space-y-2">
                        <div>
                          <strong className="text-green-600 dark:text-green-300">Pros:</strong>
                          <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                            <li>• Clear, authoritative positioning as "the" platform</li>
                            <li>• Direct value proposition for specific audiences</li>
                            <li>• Professional tone suitable for enterprise buyers</li>
                            <li>• Cycling words show comprehensive market coverage</li>
                            <li>• Platform-focused messaging aligns with Elevation AI's positioning</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-red-600 dark:text-red-300">Cons:</strong>
                          <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                            <li>• Less emotionally engaging than Option A</li>
                            <li>• "Agentic" still requires some explanation</li>
                            <li>• May feel too generic compared to unique differentiators</li>
                            <li>• Doesn't emphasize the concierge team advantage</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <H4 className="mb-3 text-green-700 dark:text-green-400">Option C: "Your Universe. Intelligently Orchestrated."</H4>
                      <div className="space-y-2">
                        <div>
                          <strong className="text-green-600 dark:text-green-300">Pros:</strong>
                          <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                            <li>• Memorable and elegant phrasing</li>
                            <li>• Emphasizes comprehensive control and intelligence</li>
                            <li>• Appeals to leaders seeking business orchestration</li>
                            <li>• Poetic quality makes it stand out from typical SaaS messaging</li>
                            <li>• "Universe" suggests complete business ecosystem coverage</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-red-600 dark:text-red-300">Cons:</strong>
                          <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                            <li>• May be too abstract for practical enterprise buyers</li>
                            <li>• "Universe" could feel hyperbolic or vague</li>
                            <li>• Doesn't clearly communicate what Elevation AI does</li>
                            <li>• Less specific about target market segments</li>
                            <li>• Could be perceived as marketing speak</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                      <H4 className="mb-3 text-green-700 dark:text-green-400">Option D: "The Platform & Partnership for [word]."</H4>
                      <div className="space-y-2">
                        <div>
                          <strong className="text-green-600 dark:text-green-300">Pros:</strong>
                          <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                            <li>• Perfectly captures Elevation AI's dual value: platform + concierge team</li>
                            <li>• Enterprise-grade terminology that resonates with technical buyers</li>
                            <li>• Clear positioning as both technology and human partnership</li>
                            <li>• Cycling through specific business segments shows comprehensive coverage</li>
                            <li>• Positions Elevation AI as the orchestration layer with human expertise</li>
                            <li>• Aligns perfectly with Elevation AI's middleware + partnership positioning</li>
                            <li>• Professional tone suitable for enterprise decision-makers</li>
                            <li>• Differentiates from pure technology platforms</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-red-600 dark:text-red-300">Cons:</strong>
                          <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                            <li>• Less emotionally engaging than poetic options</li>
                            <li>• "Platform & Partnership" might feel slightly longer than other options</li>
                            <li>• Could be perceived as less innovative than transformative messaging</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Objective Recommendation */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="star-line" className="h-5 w-5" />
                  Objective Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg border">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Icon name="check-line" className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <H3 className="mb-2 text-green-800 dark:text-green-200">Current Implementation: Option B</H3>
                      <H4 className="mb-3 text-gray-800 dark:text-gray-200">"The Agentic Platform for [Enterprise Segments]."</H4>
                      <BodyLarge className="text-gray-700 dark:text-gray-300 mb-4">
                        Option B is now the current implementation on the website, providing a strong balance of technical sophistication and market appeal. Option D remains available as an alternate approach for future consideration.
                      </BodyLarge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border">
                  <H4 className="mb-3 text-gray-800 dark:text-gray-200">Current Status: Option B Implementation</H4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-gray-700 dark:text-gray-300">Option B (Current):</strong>
                      <p className="text-muted-foreground mt-1">"The Agentic Platform for" provides strong technical positioning with clear enterprise appeal. The cycling words demonstrate comprehensive market coverage while maintaining focus on Elevation AI's core value proposition.</p>
                    </div>
                    <div>
                      <strong className="text-gray-700 dark:text-gray-300">Option A (Previous):</strong>
                      <p className="text-muted-foreground mt-1">While dynamic and engaging, "bringing into the agentic era" was too abstract for enterprise buyers who need concrete value propositions. Option B's "Agentic Platform" is more immediately clear and actionable.</p>
                    </div>
                    <div>
                      <strong className="text-gray-700 dark:text-gray-300">Option C (Original):</strong>
                      <p className="text-muted-foreground mt-1">"Your Universe. Intelligently Orchestrated." is poetic but too abstract for enterprise decision-makers. Option B provides concrete positioning that enterprise buyers can immediately understand and evaluate.</p>
                    </div>
                    <div>
                      <strong className="text-gray-700 dark:text-gray-300">Option D (Alternate):</strong>
                      <p className="text-muted-foreground mt-1">"The Platform & Partnership for" captures both technology and human expertise, but Option B's "Agentic Platform" provides stronger technical differentiation while maintaining enterprise appeal.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <H4 className="text-blue-800 dark:text-blue-200">Strategic Alignment</H4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Icon name="check-line" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Perfectly aligns with Elevation AI's middleware positioning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="check-line" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Category-defining language that owns the "Platform & Partnership" space</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="check-line" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Enterprise-grade terminology that resonates with target buyers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="check-line" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Clear positioning that balances technology and human expertise</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <H4 className="text-blue-800 dark:text-blue-200">Market Positioning</H4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Icon name="check-line" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Positions Elevation AI as both the orchestration layer and trusted partner</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="check-line" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Cycling through specific segments shows comprehensive market coverage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="check-line" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Professional tone suitable for enterprise decision-makers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="check-line" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Differentiates from pure technology platforms by emphasizing human partnership</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <H4 className="mb-2 text-amber-800 dark:text-amber-200">
                    <Icon name="lightbulb-line" className="h-4 w-4 inline mr-1" />
                    Recommended Subheadline
                  </H4>
                  <BodyLarge className="text-amber-700 dark:text-amber-300 mb-2">
                    "Elevation AI is the agentic knowledge and work orchestration platform—powered by a concierge team, unifying knowledge, streamlining workflows, and securing your AI."
                  </BodyLarge>
                  <BodySmall className="text-amber-600 dark:text-amber-400">
                    This subheadline complements the headline by explaining what Elevation AI does while maintaining the enterprise tone. The use of "orchestration" in the platform description and "streamlining" in the triad avoids redundancy while maintaining clarity.
                  </BodySmall>
                </div>

                <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Icon name="star-line" className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <H3 className="mb-3 text-green-800 dark:text-green-200">Final Recommendation</H3>
                      <BodyLarge className="text-green-700 dark:text-green-300 mb-4">
                        <strong>Option D: "The Platform & Partnership for [Enterprise Segments]."</strong> is the objectively best choice for Elevation AI's homepage hero headline.
                      </BodyLarge>
                      <div className="space-y-2 text-sm text-green-600 dark:text-green-400">
                        <p><strong>Why it wins:</strong> It's the only option that captures Elevation AI's complete value proposition—both the sophisticated platform AND the concierge team partnership—while maintaining enterprise-grade clarity that resonates with technical decision-makers.</p>
                        <p><strong>Market fit:</strong> Perfectly positions Elevation AI as the orchestration layer with human expertise, differentiating from pure technology platforms in the enterprise AI space.</p>
                        <p><strong>Strategic advantage:</strong> The cycling words show comprehensive market coverage without redundancy, and the messaging aligns with Elevation AI's unique positioning as both platform and partnership.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
