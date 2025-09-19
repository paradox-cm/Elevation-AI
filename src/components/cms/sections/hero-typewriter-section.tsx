"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/layout/container'
import { Section } from '@/components/ui/layout/section'
import { HeroHeading, P } from '@/components/ui/typography'
import { PageSection } from '@/types/cms'
import Link from 'next/link'

// Typewriter component (simplified version of the original)
function TypewriterText({ 
  text, 
  cyclingWords = [],
  speed = 200,
  delay = 0
}: { 
  text: string
  cyclingWords?: string[]
  speed?: number
  delay?: number
}) {
  const [displayText, setDisplayText] = React.useState("")
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0)
  const [isTyping, setIsTyping] = React.useState(false)
  const [isCycling, setIsCycling] = React.useState(false)
  const [currentCycleIndex, setCurrentCycleIndex] = React.useState(0)

  const words = text.split(" ")

  React.useEffect(() => {
    setDisplayText("")
    setCurrentWordIndex(0)
    setIsTyping(false)
  }, [text])

  React.useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setIsTyping(true)
      }, delay)
      return () => clearTimeout(delayTimer)
    } else {
      setIsTyping(true)
    }
  }, [delay])

  // Initial typing animation
  React.useEffect(() => {
    if (!isTyping || currentWordIndex >= words.length) return

    const timer = setTimeout(() => {
      const newWordIndex = currentWordIndex + 1
      setDisplayText(words.slice(0, newWordIndex).join(" "))
      setCurrentWordIndex(newWordIndex)
      
      if (newWordIndex >= words.length && cyclingWords.length > 0) {
        setTimeout(() => {
          setIsCycling(true)
        }, 1000)
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [currentWordIndex, words, speed, isTyping, cyclingWords.length])

  // Cycling animation
  React.useEffect(() => {
    if (!isCycling || cyclingWords.length === 0) return

    const currentCycleWord = cyclingWords[currentCycleIndex]
    const baseText = words.join(" ") + " "

    const timer = setTimeout(() => {
      setDisplayText(baseText + currentCycleWord)
      
      setTimeout(() => {
        setCurrentCycleIndex((prev) => (prev + 1) % cyclingWords.length)
      }, 2000)
    }, 500)

    return () => clearTimeout(timer)
  }, [isCycling, currentCycleIndex, cyclingWords, words])

  return (
    <span>
      {displayText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  )
}

interface HeroTypewriterSectionProps {
  data: Record<string, unknown>
  section?: PageSection
}

export function HeroTypewriterSection({ data, section }: HeroTypewriterSectionProps) {
  const title = typeof data?.title === 'string' ? data.title : "The Agentic Platform for"
  const cyclingWords = Array.isArray(data?.cyclingWords) ? data.cyclingWords as string[] : [
    "Intelligent Operations.",
    "Seamless Workflows.", 
    "Data-Driven Decisions.",
    "Automated Processes.",
    "Strategic Growth.",
    "Operational Excellence.",
    "Business Transformation.",
    "Digital Innovation."
  ]
  const description = typeof data?.description === 'string' ? data.description : "Elevation AI is the agentic knowledge and work orchestration platform, powered by a concierge team, unifying knowledge, streamlining workflows and securing your use of AI. Your universe, intelligently orchestrated."
  const ctaButtons = Array.isArray(data?.ctaButtons) ? data.ctaButtons as Record<string, unknown>[] : [
    { text: "Get Started", href: "/demo", variant: "default" },
    { text: "Learn More", href: "/platform", variant: "outline" }
  ]
  const speed = typeof data?.speed === 'number' ? data.speed : 100
  const delay = typeof data?.delay === 'number' ? data.delay : 500

  return (
    <Section 
      paddingY="lg" 
      className="flex items-center h-screen pt-8 sm:pt-0"
    >
      <Container size="2xl">
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 text-left">
            <div className="space-y-4 sm:space-y-6">
              <HeroHeading>
                <TypewriterText 
                  text={title}
                  cyclingWords={cyclingWords}
                  speed={speed}
                  delay={delay}
                />
              </HeroHeading>
              <P className="text-muted-foreground max-w-2xl xl:max-w-4xl 2xl:max-w-5xl text-base sm:text-base md:text-lg leading-relaxed">
                {description}
              </P>
            </div>
            
            {/* CTA Buttons */}
            {ctaButtons && ctaButtons.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {ctaButtons.map((button: Record<string, unknown>, index: number) => {
                  const buttonVariant = typeof button.variant === 'string' ? button.variant : "default"
                  const buttonHref = typeof button.href === 'string' ? button.href : "/"
                  const buttonText = typeof button.text === 'string' ? button.text : "Button"
                  
                  return (
                    <Button
                      key={index}
                      asChild
                      variant={buttonVariant as any}
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      <Link href={buttonHref}>
                        {buttonText}
                      </Link>
                    </Button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
