"use client"

import React from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { H1, H2, H3, P, Code } from "@/components/ui/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"

// Looping Typewriter Text Component
function LoopingTypewriterText({ 
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
  const [phase, setPhase] = React.useState<'initial' | 'typing' | 'waiting' | 'deleting'>('initial')

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
      if (currentCycleIndex === 0 && cyclingWords.length > 0) {
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

  // Move to next cycle word
  React.useEffect(() => {
    if (phase !== 'deleting' || !isDeleting || currentWordIndex > 0) return

    // Finished deleting, move to next word
    const nextIndex = (currentCycleIndex + 1) % cyclingWords.length
    setCurrentCycleIndex(nextIndex)
    setIsDeleting(false)
    setCurrentWordIndex(0)
    setDisplayText("")
    setPhase('typing')
    setIsTyping(true)
  }, [phase, isDeleting, currentWordIndex, cyclingWords.length, currentCycleIndex])

  return (
    <span className="inline-block leading-tight">
      {displayText}
      {!skipAnimation && (
        <span className="animate-pulse inline-block w-3 h-[0.8em] bg-current ml-1"></span>
      )}
    </span>
  )
}

// Non-looping Typewriter Text Component
function NonLoopingTypewriterText({ 
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
    <span className="inline-block leading-tight">
      {displayText}
      {!skipAnimation && phase !== 'complete' && (
        <span className="animate-pulse inline-block w-3 h-[0.8em] bg-current ml-1"></span>
      )}
    </span>
  )
}

export default function TypewriterPage() {
  const loopingStatements = [
    "Transforming business orchestration.",
    "Unifying knowledge across organizations.",
    "Securing AI for enterprise scale.",
    "Building the future of work."
  ]

  const nonLoopingStatements = [
    "Transforming business orchestration.",
    "Unifying knowledge across organizations.",
    "Securing AI for enterprise scale.",
    "Building the future of work.",
    "Welcome to Elevation AI"
  ]

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="typewriter" />}
        sidebar={<DesignSystemSidebar />}
      >
        <div className="min-h-screen bg-background">
          <main>
            {/* Header */}
            <Section paddingY="lg" className="border-b">
              <Container size="2xl">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Icon name="code-s-slash-line" size="sm" />
                    Animation Components
                  </div>
                  <H1>Typewriter Effects</H1>
                  <P className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Animated text effects that type out words and cycle through multiple statements. Perfect for hero sections and engaging user experiences.
                  </P>
                </div>
              </Container>
            </Section>

          {/* Looping Typewriter */}
          <Section paddingY="lg">
            <Container size="2xl">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <H2>Looping Typewriter</H2>
                    <Badge variant="secondary">Standard</Badge>
                  </div>
                  <P className="text-muted-foreground">
                    Continuously cycles through multiple statements, typing each one word by word, displaying for 3 seconds, then deleting word by word before moving to the next statement. Loops infinitely.
                  </P>
                </div>

                {/* Live Demo */}
                <Card>
                  <CardHeader>
                    <CardTitle>Live Demo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-8 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 min-h-[120px] flex items-center justify-center">
                      <div className="text-center">
                        <H3>
                          <LoopingTypewriterText 
                            text="Transforming business orchestration."
                            speed={200}
                            delay={500}
                            cyclingWords={loopingStatements}
                            cyclingSpeed={80}
                            cyclingDelay={3000}
                          />
                        </H3>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <H3>Usage</H3>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <Code className="text-sm">
{`<LoopingTypewriterText 
  text="Transforming business orchestration."
  speed={200}
  delay={500}
  cyclingWords={[
    "Transforming business orchestration.",
    "Unifying knowledge across organizations.",
    "Securing AI for enterprise scale.",
    "Building the future of work."
  ]}
  cyclingSpeed={80}
  cyclingDelay={3000}
/>`}
                        </Code>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <H3>Props</H3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <P className="font-medium">text</P>
                          <P className="text-muted-foreground">Initial text to display</P>
                        </div>
                        <div>
                          <P className="font-medium">speed</P>
                          <P className="text-muted-foreground">Typing speed in ms (default: 200)</P>
                        </div>
                        <div>
                          <P className="font-medium">delay</P>
                          <P className="text-muted-foreground">Delay before starting in ms (default: 0)</P>
                        </div>
                        <div>
                          <P className="font-medium">cyclingWords</P>
                          <P className="text-muted-foreground">Array of statements to cycle through</P>
                        </div>
                        <div>
                          <P className="font-medium">cyclingSpeed</P>
                          <P className="text-muted-foreground">Deletion speed in ms (default: 200)</P>
                        </div>
                        <div>
                          <P className="font-medium">cyclingDelay</P>
                          <P className="text-muted-foreground">Display duration in ms (default: 3000)</P>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Container>
          </Section>

          {/* Non-looping Typewriter */}
          <Section paddingY="lg" className="bg-muted/30">
            <Container size="2xl">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <H2>Non-looping Typewriter</H2>
                    <Badge variant="outline">Alternative</Badge>
                  </div>
                  <P className="text-muted-foreground">
                    Cycles through multiple statements once, ending on the final statement without looping back. Perfect for welcome messages or one-time introductions.
                  </P>
                </div>

                {/* Live Demo */}
                <Card>
                  <CardHeader>
                    <CardTitle>Live Demo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-8 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 min-h-[120px] flex items-center justify-center">
                      <div className="text-center">
                        <H3>
                          <NonLoopingTypewriterText 
                            text="Transforming business orchestration."
                            speed={200}
                            delay={500}
                            cyclingWords={nonLoopingStatements}
                            cyclingSpeed={80}
                            cyclingDelay={3000}
                          />
                        </H3>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <H3>Usage</H3>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <Code className="text-sm">
{`<NonLoopingTypewriterText 
  text="Transforming business orchestration."
  speed={200}
  delay={500}
  cyclingWords={[
    "Transforming business orchestration.",
    "Unifying knowledge across organizations.",
    "Securing AI for enterprise scale.",
    "Building the future of work.",
    "Welcome to Elevation AI"
  ]}
  cyclingSpeed={80}
  cyclingDelay={3000}
/>`}
                        </Code>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <H3>Props</H3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <P className="font-medium">text</P>
                          <P className="text-muted-foreground">Initial text to display</P>
                        </div>
                        <div>
                          <P className="font-medium">speed</P>
                          <P className="text-muted-foreground">Typing speed in ms (default: 200)</P>
                        </div>
                        <div>
                          <P className="font-medium">delay</P>
                          <P className="text-muted-foreground">Delay before starting in ms (default: 0)</P>
                        </div>
                        <div>
                          <P className="font-medium">cyclingWords</P>
                          <P className="text-muted-foreground">Array of statements to cycle through</P>
                        </div>
                        <div>
                          <P className="font-medium">cyclingSpeed</P>
                          <P className="text-muted-foreground">Deletion speed in ms (default: 200)</P>
                        </div>
                        <div>
                          <P className="font-medium">cyclingDelay</P>
                          <P className="text-muted-foreground">Display duration in ms (default: 3000)</P>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Container>
          </Section>

          {/* Implementation Notes */}
          <Section paddingY="lg">
            <Container size="2xl">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-4">
                  <H2>Implementation Notes</H2>
                  <P className="text-muted-foreground">
                    Both components use React hooks for state management and are optimized to prevent infinite re-renders. They support responsive design and can be easily customized for different use cases.
                  </P>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Best Practices</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P className="text-sm">Use for hero sections and key messaging</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P className="text-sm">Keep statements concise and impactful</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P className="text-sm">Test on mobile devices for readability</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P className="text-sm">Consider accessibility with skipAnimation prop</P>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P className="text-sm">Uses useMemo to prevent unnecessary re-renders</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P className="text-sm">Optimized useEffect dependencies</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P className="text-sm">Cleanup timers on unmount</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P className="text-sm">Minimal DOM updates</P>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Container>
          </Section>
          </main>
        </div>
      </AppShell>
    </PageWrapper>
  )
}
