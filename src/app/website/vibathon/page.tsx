"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useForm, type UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel } from "@/components/ui/carousel"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { FormStatus, useFormStatus } from "@/components/ui/form-status"
import { HeroHeading, H1, H2, H3, H4, BodyLarge, BodySmall, P } from "@/components/ui/typography"
import { JsonLd } from "@/components/seo/json-ld"
import { ArrowRight, Check, Compass, FileCode2, Flame, Gauge, Layers, MonitorSmartphone, Rocket, Sparkles, Trophy, Users } from "lucide-react"
import { StarFieldAnimation } from "@/components/animations/star-field-animation"
import { BusinessDataAnimation } from "@/components/animations/business-data-animation"
import { cn } from "@/lib/utils"

const differentiators = [
  {
    title: "It isn&apos;t a hackathon",
    description: "Vibathon is a vibe coding sprint—no boilerplate problem sets or mass grading, just an invite-only build with purpose.",
    icon: Compass,
  },
  {
    title: "Product intuition over specs",
    description: "We&apos;re evaluating how you frame the customer insight, storyboard the flow, and ship something people can feel.",
    icon: Gauge,
  },
  {
    title: "Real client challenges",
    description: "You tackle live Elevation AI briefs so your prototype maps to the work our Vibe Prototypers run every week.",
    icon: FileCode2,
  },
  {
    title: "Access to our platform",
    description: "Build on Elevation AI with our private libraries, data, and agentic toolchain while you iterate at speed.",
    icon: Layers,
  },
  {
    title: "Obsessed with experience",
    description: "We care as much about the storytelling, UX polish, and handoff clarity as the underlying stack.",
    icon: Flame,
  },
]

const vibeCoderTraits = [
  "Designer who refuses to ship ugly",
  "Hacker who prototypes at the speed of thought",
  "Product mind that hears the user in every decision",
  "Systems thinker who can hand off cleanly by day's end",
]

const tools = [
  "Replit",
  "Cursor",
  "Lovable",
  "Windsurf",
  "Supabase",
  "n8n",
  "Zapier",
  "Make",
]

const benefits = [
  {
    title: "Full-time Vibe Prototyper offer",
    description: "Top performers earn a direct offer to join Elevation AI as a Vibe Prototyper—no recruiting maze required.",
    icon: Trophy,
  },
  {
    title: "Cutting-edge agentic tools",
    description: "Build with the newest orchestration layers, knowledge graph assets, and AI-first workflows alongside our platform team.",
    icon: Rocket,
  },
  {
    title: "Executive stage time",
    description: "Demo to the CEO, CTO, and CPO collective so the work you ship influences how we brief customers and investors.",
    icon: Users,
  },
  {
    title: "Exclusive Elevation swag",
    description: "Lock in the limited-edition Elevation AI swag kit and post-event amplification across our channels.",
    icon: Sparkles,
  },
]

const eventHighlights = [
  {
    label: "Format",
    value: "One-day remote sprint",
    icon: MonitorSmartphone,
  },
  {
    label: "Focus",
    value: "AI-first proof of concept",
    icon: Flame,
  },
  {
    label: "Prize",
    value: "Vibe Prototyper offer",
    icon: Trophy,
  },
]

const evaluationCriteria = [
  {
    label: "Insight & Creativity",
    value: 40,
    description: "Did you uncover a sharp user insight and translate it into a differentiated concept?",
  },
  {
    label: "User Experience & Design",
    value: 30,
    description: "Is the flow obvious, intentional, and intuitive across surfaces?",
  },
  {
    label: "Build & Execution",
    value: 20,
    description: "Does the prototype run, integrate, and show momentum toward production?",
  },
  {
    label: "Handoff Readiness",
    value: 10,
    description: "Could a squad ship this without redoing your work?",
  },
]

const urgencyPoints = [
  "Limited cohort. We review applications weekly until all seats are filled.",
  "Invite-only. Every applicant is vetted for portfolio quality and storytelling.",
  "Remote-first. A global window so you can vibe from anywhere.",
]

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  portfolio: z.string().url("Share a valid portfolio or project link"),
  experience: z
    .string()
    .min(30, "Tell us a bit more about your recent vibe-worthy build")
    .max(600, "Keep it under 600 characters"),
})

function TypewriterHeadline({
  text,
  typingSpeed = 110,
  startDelay = 300,
}: {
  text: string
  typingSpeed?: number
  startDelay?: number
}) {
  const [displayText, setDisplayText] = useState("")
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    let mediaQuery: MediaQueryList | null = null

    if (typeof window !== "undefined") {
      mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setShouldAnimate(!mediaQuery.matches)

      const handleChange = (event: MediaQueryListEvent) => {
        setShouldAnimate(!event.matches)
      }

      mediaQuery.addEventListener("change", handleChange)

      return () => {
        mediaQuery?.removeEventListener("change", handleChange)
      }
    }

    return undefined
  }, [])

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayText(text)
      return
    }

    setDisplayText("")
    let charIndex = 0
    let typingInterval: ReturnType<typeof setInterval> | undefined

    const startTimeout = setTimeout(() => {
      typingInterval = setInterval(() => {
        charIndex += 1
        setDisplayText(text.slice(0, charIndex))

        if (charIndex >= text.length) {
          if (typingInterval) {
            clearInterval(typingInterval)
          }
        }
      }, typingSpeed)
    }, startDelay)

    return () => {
      clearTimeout(startTimeout)
      if (typingInterval) {
        clearInterval(typingInterval)
      }
    }
  }, [text, typingSpeed, startDelay, shouldAnimate])

  const showCursor = shouldAnimate && displayText.length < text.length

  return (
    <HeroHeading className="text-center text-balance tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
      {displayText}
      <span className={cn("inline-block transition-opacity", showCursor ? "opacity-100" : "opacity-0")}>|</span>
    </HeroHeading>
  )
}

function TypewriterHeroSection() {
  return (
    <Section
      paddingY="xl"
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <StarFieldAnimation className="opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </div>
      <Container size="2xl" className="relative z-10">
        <div className="flex flex-col items-center text-center space-y-6">
          <TypewriterHeadline text="Vibathon 2025" />
          <BodyLarge className="max-w-2xl text-muted-foreground">
            Elevation AI&apos;s invite-only builder sprint returns for 2025. Bring your sharpest ideas, your fastest tools, and your best product instincts.
          </BodyLarge>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs uppercase tracking-wide text-muted-foreground/80">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-primary">Virtual</span>
            <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1">One-day sprint</span>
            <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1">Invite-only</span>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function EventSnapshotSection() {
  return (
    <Section paddingY="lg" className="bg-muted/20">
      <Container size="2xl">
        <Card className="border-primary/20 bg-background/90 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Event Snapshot</CardTitle>
            <CardDescription>
              Everything you need to know before you apply.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {eventHighlights.map((item) => (
                <div key={item.label} className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <item.icon className="mb-3 h-5 w-5 text-primary" />
                  <BodySmall className="uppercase tracking-wide text-xs text-muted-foreground">
                    {item.label}
                  </BodySmall>
                  <P className="font-medium leading-snug">
                    {item.value}
                  </P>
                </div>
              ))}
            </div>
            <div className="space-y-3 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                What sets Vibathon apart
              </div>
              <P className="text-sm text-muted-foreground">
                No boilerplate prompts. No mass grading. You&apos;ll collaborate directly with Elevation AI&apos;s platform team and build on our agentic stack with real user stories.
              </P>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

function SolutionsHeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const animate = () => {
      const currentCanvas = canvasRef.current
      if (!currentCanvas) return

      const width = currentCanvas.offsetWidth
      const height = currentCanvas.offsetHeight

      if (width <= 0 || height <= 0) {
        animationId = requestAnimationFrame(animate)
        return
      }

      if (currentCanvas.width !== width || currentCanvas.height !== height) {
        currentCanvas.width = width
        currentCanvas.height = height
      }

      const context = currentCanvas.getContext("2d")
      if (!context) {
        animationId = requestAnimationFrame(animate)
        return
      }

      context.clearRect(0, 0, width, height)

      const imageData = context.createImageData(width, height)
      const data = imageData.data

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          const index = (y * width + x) * 4

          const scale = 0.05
          const r1 = 0.3
          const r2 = 0.7
          const r3 = 0.2

          const col =
            Math.sin(Math.sqrt((x * r1 + time * 50) ** 2 + (y * r2) ** 2) * scale) +
            Math.sin(Math.sqrt((x * r2) ** 2 + (y * r1 + time * 30) ** 2) * scale) +
            Math.sin(Math.sqrt((x * r3 + time * 40) ** 2 + (y * r3 + time * 20) ** 2) * scale)

          const r = Math.floor(128 + 127 * Math.sin(col))
          const g = Math.floor(128 + 127 * Math.cos(col))
          const b = Math.floor(128 + 127 * (Math.cos(col) - Math.sin(col)))

          const checkerboard = Math.floor(x / 2) % 2 === 0 ? 0 : 102
          const finalR = Math.min(255, r + checkerboard)
          const finalG = Math.min(255, g + checkerboard)
          const finalB = Math.min(255, b + checkerboard)

          data[index] = finalR
          data[index + 1] = finalG
          data[index + 2] = finalB
          data[index + 3] = 255
        }
      }

      context.putImageData(imageData, 0, 0)
      time += 0.005
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div className="relative w-full" style={{ maxWidth: 740 }}>
      <div className="relative w-full overflow-hidden rounded-3xl">
        <div className="relative w-full" style={{ paddingBottom: `${(480 / 740) * 100}%` }}>
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/40 bg-primary/15 backdrop-blur">
              <Image
                src="/images/branding/E-AI-Arrow.svg"
                alt="Elevation AI Arrow"
                width={56}
                height={56}
                className="h-12 w-12"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <Section
      paddingY="xl"
      className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background"
    >
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_60%)]" aria-hidden="true" />
      <Container size="2xl" className="relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-3xl space-y-6">
            <Badge variant="secondary" className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" />
              Invite-only • Limited seats • Remote
            </Badge>
            <H1 className="text-balance leading-tight">
              Can You Vibe? 💡
            </H1>
            <BodyLarge className="text-muted-foreground max-w-3xl">
              Elevation AI&apos;s Vibathon is not a hackathon. It&apos;s a lightning-fast talent sprint built to surface the builders who combine product intuition, design taste, and agentic AI muscle.
            </BodyLarge>
            <div className="space-y-3">
              <P className="text-foreground/80">
                Ship a working proof of concept in a single day, narrate the user journey, and show us how you orchestrate modern AI-first tools.
              </P>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {urgencyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="text-base" asChild>
                <Link href="#apply" scroll={true}>
                  Apply to Participate in the Vibathon
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base" asChild>
                <Link href="#evaluation" scroll={true}>
                  View evaluation criteria
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <SolutionsHeroVisual />
          </div>
        </div>
      </Container>
    </Section>
  )
}

function DifferentiatorsSection() {
  const carouselItems = differentiators.map((item, index) => ({
    id: index,
    title: item.title,
    description: item.description,
    icon: item.icon,
  }))

  return (
    <Section paddingY="lg" className="bg-muted/30">
      <Container size="2xl" className="space-y-10">
        <div className="max-w-3xl space-y-4">
          <H2>What makes Vibathon different</H2>
          <BodyLarge className="text-muted-foreground">
            Think of this as an elite product studio audition. It&apos;s about how you frame the problem, choreograph the build, and communicate the impact.
          </BodyLarge>
        </div>
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
          <Carousel
            items={carouselItems}
            autoPlay={false}
            showProgressIndicators={false}
            showGradients={false}
            cardWidth={320}
            cardGap={24}
            className="w-full"
            cardStyle="blue"
            highlightActiveCard={false}
            responsive={{
              sm: { cardWidth: 260, cardGap: 16 },
              md: { cardWidth: 280, cardGap: 18 },
              lg: { cardWidth: 300, cardGap: 20 },
              xl: { cardWidth: 320, cardGap: 24 },
              '2xl': { cardWidth: 340, cardGap: 28 },
            }}
          />
        </div>
      </Container>
    </Section>
  )
}

function VibeCoderSection() {
  return (
    <Section paddingY="lg">
      <Container size="2xl" className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
        <div className="space-y-8">
          <div className="space-y-4">
            <H2>Who we&apos;re looking for</H2>
            <BodyLarge className="text-muted-foreground max-w-2xl">
              We call them vibe coders: product-minded builders who can dream, design, and demo in a single sprint.
            </BodyLarge>
          </div>
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-base font-semibold">The vibe coder profile</CardTitle>
              <CardDescription>
                If you resonate with these statements, you&apos;ll thrive here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {vibeCoderTraits.map((trait) => (
                  <li key={trait} className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/80 p-5">
                    <Check className="mt-1 h-5 w-5 text-primary" />
                    <span className="text-lg leading-relaxed text-muted-foreground">
                      {trait}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <Card className="border-border/60 bg-background/80">
          <CardHeader>
            <CardTitle className="text-base">Tool stack fluency</CardTitle>
            <CardDescription>
              Show us how you stitch modern AI-first tools into an elegant flow.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {tools.map((tool) => (
                <Badge
                  key={tool}
                  variant="outline"
                  className="flex h-16 sm:h-20 w-full items-center justify-center rounded-xl border-border/60 bg-muted/30 text-base sm:text-lg md:text-xl font-medium"
                >
                  {tool}
                </Badge>
              ))}
            </div>
            <BodySmall className="text-muted-foreground">
              We&apos;re platform-agnostic, but we love seeing fluency in agent orchestration, low-code automation, and rapid prototyping environments.
            </BodySmall>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

function BenefitsSection() {
  return (
    <Section paddingY="lg" className="bg-gradient-to-b from-background via-background to-primary/10">
      <Container size="2xl" className="space-y-10">
        <div className="max-w-3xl space-y-4">
          <H2>Why participate</H2>
          <BodyLarge className="text-muted-foreground">
            Elevation AI is the operating platform for the agentic era, backed by Google&apos;s AI program and used by teams orchestrating mission-critical work. Vibathon puts you on that stage.
          </BodyLarge>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="h-full border-border/60 bg-background/90 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <benefit.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base font-semibold">
                    {benefit.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xl sm:text-2xl leading-relaxed text-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function EvaluationSection() {
  return (
    <Section paddingY="lg" id="evaluation">
      <Container size="2xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="space-y-5 max-w-3xl lg:max-w-xl">
            <div className="space-y-3">
              <H2>How we evaluate</H2>
              <BodyLarge className="text-muted-foreground">
                Every team member on the review panel scores independently. Use the percentages below to prioritize your time and storytelling.
              </BodyLarge>
            </div>
            <Card className="border-border/60 bg-background/90">
              <CardContent className="space-y-5 p-5">
                {evaluationCriteria.map((criterion) => (
                  <div key={criterion.label} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <H4 className="text-base font-semibold">
                        {criterion.label}
                      </H4>
                      <span className="text-sm font-medium text-primary">{criterion.value}%</span>
                    </div>
                    <Progress value={criterion.value} className="h-2" />
                    <BodySmall className="text-muted-foreground">
                      {criterion.description}
                    </BodySmall>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <Card className="border-border/60 bg-background/95 lg:p-2 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">What great submissions include</CardTitle>
              <CardDescription>
                Lifted from the application brief—hit these beats to stand out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 text-sm text-muted-foreground lg:text-base lg:leading-relaxed flex-1 flex flex-col">
              <div className="rounded-xl border border-border/50 bg-muted/15 p-5">
                <p className="font-medium text-foreground text-base lg:text-lg">Start with user insight</p>
                <p>Show the signal you uncovered in the real client scenario and how it shaped the product story.</p>
              </div>
              <div className="rounded-xl border border-border/50 bg-muted/15 p-5">
                <p className="font-medium text-foreground text-base lg:text-lg">Highlight your AI-first toolchain</p>
                <p>Document how you combined tools like Replit, Cursor, Supabase, or n8n to move from prompt to prototype.</p>
              </div>
              <div className="rounded-xl border border-border/50 bg-muted/15 p-5">
                <p className="font-medium text-foreground text-base lg:text-lg">Deliver the handoff package</p>
                <p>Wrap with a clear user journey, decisions made, and what the team can ship next without rework.</p>
              </div>
              <div className="rounded-xl border border-border/50 bg-muted/15 p-5">
                <p className="font-medium text-foreground text-base lg:text-lg">Make it feel ship-ready</p>
                <p>Include Figma frames, Loom walkthroughs, or repo links so our product squads can keep momentum.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  )
}

type ApplicationFormData = z.infer<typeof applicationSchema>

function ApplicationFormSection({
  onSubmit,
  form,
  status,
  title,
  message,
  resetStatus,
}: {
  onSubmit: (values: ApplicationFormData) => Promise<void>
  form: UseFormReturn<ApplicationFormData>
  status: "idle" | "loading" | "success" | "error"
  title: string
  message: string
  resetStatus: () => void
}) {
  return (
    <Section paddingY="lg" id="apply">
      <Container size="2xl" className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <H2>Submit your application</H2>
            <BodyLarge className="text-muted-foreground">
              Tell us about your sharpest build in the last 6 months. Include what you scoped, how you prototyped, and how users responded.
            </BodyLarge>
          </div>
          <Card className="border-border/60 bg-background/90">
            <CardHeader>
              <CardTitle className="text-base">Application form</CardTitle>
              <CardDescription>
                Keep it concise-we want signal over buzzwords.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full name</FormLabel>
                        <FormControl>
                          <Input placeholder="Taylor Morgan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@awesomeproduct.dev" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="portfolio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Portfolio or recent project link</FormLabel>
                        <FormControl>
                          <Input placeholder="https://" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Describe the most vibe product you shipped recently.</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Share context, your role, tools you used, and the impact."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <BodySmall className="text-muted-foreground">
                      We review applications on a rolling basis. If selected, you&apos;ll receive a prep kit and scheduling link.
                    </BodySmall>
                    <Button type="submit" size="lg" disabled={status === "loading"}>
                      {status === "loading" ? "Submitting..." : "Submit application"}
                    </Button>
                  </div>
                </form>
              </Form>
              <div className="pt-4">
                <FormStatus
                  status={status}
                  title={title}
                  message={message}
                  onDismiss={resetStatus}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="h-fit border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base">What happens next</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="rounded-lg border border-border/40 bg-background/90 p-4">
              <BodySmall className="mb-1 text-primary font-semibold">1. Review & invite</BodySmall>
              <p>Our team evaluates fit across product thinking, craft, and tool fluency. Standouts get an invite to lock your sprint date.</p>
            </div>
            <div className="rounded-lg border border-border/40 bg-background/90 p-4">
              <BodySmall className="mb-1 text-primary font-semibold">2. Prep kit</BodySmall>
              <p>We send a real user story, recommended APIs, and environment access so you can hit the ground running.</p>
            </div>
            <div className="rounded-lg border border-border/40 bg-background/90 p-4">
              <BodySmall className="mb-1 text-primary font-semibold">3. One-day sprint</BodySmall>
              <p>Jam with Elevation AI mentors, ship your prototype, and demo to our executive panel.</p>
            </div>
            <div className="rounded-lg border border-border/40 bg-background/90 p-4">
              <BodySmall className="mb-1 text-primary font-semibold">4. Offer window</BodySmall>
              <p>Top performers receive a fast-track offer for the Vibe Prototyper role within days.</p>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

function AdditionalInfoSection() {
  return (
    <Section paddingY="lg" className="bg-muted/20 px-0">
      <div className="space-y-10">
        <Container size="2xl" className="space-y-6">
          <div className="space-y-4">
            <H3 className="text-lg font-semibold">About Elevation AI</H3>
            <P className="text-muted-foreground">
              Elevation AI is the operating system for the agentic era. We help teams orchestrate intelligent workflows, governed knowledge graphs, and AI-native experiences for high-stakes industries. Vibathon is how we hire the builders who shape that future.
            </P>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="border border-primary/30 bg-primary/10 text-primary">
                Backed by Google&apos;s AI program
              </Badge>
              <Badge variant="outline" className="border-border/60 bg-background/80">
                Platform, concierge, and partner ecosystem
              </Badge>
            </div>
          </div>
        </Container>
        <div className="relative w-full overflow-hidden rounded-none lg:rounded-3xl border-y border-border/40 lg:border lg:mx-auto lg:max-w-6xl bg-background/80">
          <div className="absolute inset-0">
            <BusinessDataAnimation />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src="/images/branding/E-AI-Arrow.svg"
              alt="Elevation AI Arrow"
              width={120}
              height={120}
              className="opacity-80 dark:invert"
            />
          </div>
          <div className="relative pt-[42.5%]" />
        </div>
      </div>
    </Section>
  )
}

function QuestionsSection() {
  return (
    <Section paddingY="lg" className="bg-background">
      <Container size="2xl">
        <Card className="border-border/60 bg-background/95">
          <CardHeader>
            <CardTitle className="text-base">Questions?</CardTitle>
            <CardDescription>
              We&apos;re here to help you prep and bring your best energy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Start with the <Link href="/website/contact" className="text-primary hover:underline">contact form</Link> and select &quot;Careers &amp; Vibathon&quot;. Our team will respond within 48 hours.
            </p>
            <p>
              Want to learn more about our product vision first? Explore the <Link href="/website/platform" className="text-primary hover:underline">platform overview</Link> or browse the <Link href="/website/resources" className="text-primary hover:underline">resource hub</Link>.
            </p>
            <p className="text-xs text-muted-foreground/80">
              Due to volume, we cannot offer feedback on every submission. Apply early to maximize your chance of joining the next cohort.
            </p>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

export default function VibathonPage() {
  const { status, message, title, setLoading, setSuccess, setError, reset } = useFormStatus()

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      portfolio: "",
      experience: "",
    },
  })

  const handleSubmit = async (values: ApplicationFormData) => {
    setLoading("Submitting your application...")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const firstName = values.name.trim().split(" ")[0] || "there"
      setSuccess(
        "Application received!",
        `Thanks, ${firstName}! We'll review and reach out if you're selected for the upcoming Vibathon cohort.`
      )
      form.reset()
      setTimeout(() => reset(), 5000)
    } catch (error) {
      console.error("Vibathon application submission failed", error)
      setError("Unable to submit", "Please try again in a few minutes.")
    }
  }

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Elevation AI Vibathon",
      description:
        "Invite-only, single-day remote competition from Elevation AI to identify Vibe Prototyper talent who blend product intuition, design, and AI-first execution.",
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      organizer: {
        "@type": "Organization",
        name: "Elevation AI",
        url: "https://elevationai.com",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/LimitedAvailability",
        url: "https://elevationai.com/website/vibathon",
      },
      location: {
        "@type": "VirtualLocation",
        url: "https://elevationai.com/website/vibathon",
      },
      performer: {
        "@type": "Organization",
        name: "Elevation AI Vibe Team",
      },
    }),
    []
  )

  return (
    <PageWrapper>
      <JsonLd data={structuredData} />
      <MobileOnlyLayout
        header={<MainHeader />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer />}
      >
        <div className="bg-background transition-colors duration-300">
          <main className="space-y-0">
            <TypewriterHeroSection />
            <EventSnapshotSection />
            <HeroSection />
            <DifferentiatorsSection />
            <VibeCoderSection />
            <BenefitsSection />
            <EvaluationSection />
            <ApplicationFormSection
              onSubmit={handleSubmit}
              form={form}
              status={status}
              title={title}
              message={message}
              resetStatus={reset}
            />
            <AdditionalInfoSection />
            <QuestionsSection />
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
