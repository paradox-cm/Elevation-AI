"use client"



import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { H1, H2, H3, BodyLarge, BodySmall } from "@/components/ui/typography"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { GlobalHeader } from "@/components/ui/global-header"
import { 
  Building2, 
  Users, 
  Mail, 
  Phone, 
  ArrowRight, 
  ArrowLeft,
  Clock, 
  Shield, 
  Zap, 
  TrendingUp,
  MessageSquare,
  Calendar,
  MapPin,
  Check
} from "lucide-react"
import Icon from "@/components/ui/icon"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormFieldGroup } from "@/components/ui/form"
import { AnimatedFavicon } from "@/components/ui/animated-favicon"

// Typewriter Text Component
function TypewriterText({ text, speed = 200, delay = 0 }: { text: string; speed?: number; delay?: number }) {
  const [displayText, setDisplayText] = React.useState("")
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0)

  React.useEffect(() => {
    // Reset on mount
    setDisplayText("")
    setCurrentWordIndex(0)
    
    // Split text into words
    const words = text.split(" ")
    
    // Start typing after delay
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentWordIndex(prev => {
          if (prev >= words.length) {
            clearInterval(interval)
            return prev
          }
          setDisplayText(words.slice(0, prev + 1).join(" "))
          return prev + 1
        })
      }, speed)
      
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [text, speed, delay])

  return (
    <span className="inline-block min-h-[1.2em] leading-tight">
      {displayText}
      {currentWordIndex < text.split(" ").length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  )
}

// Form validation schemas
const demoFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().min(1, "Company name is required"),
  companySize: z.string().min(1, "Please select company size"),
  industry: z.string().min(1, "Please select industry"),
  useCase: z.string().min(10, "Use case must be at least 10 characters"),
  timeline: z.string().min(1, "Please select timeline"),
})

type DemoFormData = z.infer<typeof demoFormSchema>

// Step indicator component
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors relative z-10",
                index < currentStep
                  ? "bg-primary text-primary-foreground"
                  : index === currentStep
                  ? "bg-primary/20 text-primary border-2 border-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {index < currentStep - 1 ? (
                <Check className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "w-20 h-1 mx-1 transition-colors relative",
                  index < currentStep ? "bg-primary" : "bg-muted/30"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Step titles
const stepTitles = [
  "Personal Information",
  "Company Details", 
  "Project Requirements"
]

// Demo Request Form Component
function DemoRequestForm() {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const form = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      companySize: '',
      industry: '',
      useCase: '',
      timeline: '',
    },
  })

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: DemoFormData) => {
    setIsSubmitted(true)
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Here you would typically show a success message or redirect
    }, 2000)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormFieldGroup title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your first name"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    {isSubmitted && <FormMessage />}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                                              <Input
                          placeholder="Enter your last name"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      {isSubmitted && <FormMessage />}
                    </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 h-11"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    {isSubmitted && <FormMessage />}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          className="pl-10 h-11"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    {isSubmitted && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>
          </FormFieldGroup>
        )
      
      case 2:
        return (
          <FormFieldGroup title="Company Details">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                              <Input
                          placeholder="Enter your company name"
                          className="pl-10 h-11"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    {isSubmitted && <FormMessage />}
                  </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Size *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-1000">201-1000 employees</SelectItem>
                        <SelectItem value="1001-5000">1001-5000 employees</SelectItem>
                        <SelectItem value="5000+">5000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                    {isSubmitted && <FormMessage />}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="financial-services">Financial Services</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="energy">Energy</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {isSubmitted && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>
          </FormFieldGroup>
        )
      
      case 3:
        return (
          <FormFieldGroup title="Project Requirements">
            <FormField
              control={form.control}
              name="useCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Use Case *</FormLabel>
                                      <FormControl>
                      <Textarea
                        placeholder="Describe how you plan to use Elevation AI"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    {isSubmitted && <FormMessage />}
                  </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Implementation Timeline *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (0-3 months)</SelectItem>
                      <SelectItem value="short-term">Short-term (3-6 months)</SelectItem>
                      <SelectItem value="medium-term">Medium-term (6-12 months)</SelectItem>
                      <SelectItem value="long-term">Long-term (12+ months)</SelectItem>
                      <SelectItem value="exploring">Just exploring</SelectItem>
                    </SelectContent>
                  </Select>
                  {isSubmitted && <FormMessage />}
                </FormItem>
              )}
            />
            
          </FormFieldGroup>
        )
      
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center space-y-4 pt-6 sm:pt-8">
        {/* Perlin SVG Animation Logo */}
                <div className="flex justify-center mb-4">
          <Link href="/website/home" className="hover:opacity-80 transition-opacity">
            <div className="relative h-10 w-28 sm:h-12 sm:w-32">
              <AnimatedFavicon
                width={128}
                height={48}
                className="w-full h-full"
              />
            </div>
          </Link>
        </div>
        
        <CardTitle>
          <h2 className="text-xl font-semibold text-foreground sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">Request a Demo</h2>
        </CardTitle>
        <CardDescription>
          <BodyLarge className="text-muted-foreground">
            See how Elevation AI can transform your organization's decision-making
          </BodyLarge>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <StepIndicator currentStep={currentStep} totalSteps={3} />
            
            {renderStepContent()}

            <div className="flex justify-between pt-4">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
              )}
              
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="ml-auto flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Submitting request...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Request Demo
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

// Benefits Section
function BenefitsSection() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [showGradient, setShowGradient] = React.useState(true)
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const autoPlayInterval = React.useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  
  const benefits = [
    {
      icon: Clock,
      title: "Fast Onboarding",
      description: "Get up and running quickly with guided implementation and expert support."
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Data de-identification, auditability, and compliance built into every workflow."
    },
    {
      icon: Zap,
      title: "Context-Aware Intelligence",
      description: "Work with AI that understands your organization's full history and context."
    },
    {
      icon: TrendingUp,
      title: "Proven Partnership",
      description: "Trusted by leading firms across private capital, banking, and enterprise."
    }
  ]

  // Auto-play functionality
  React.useEffect(() => {
    autoPlayInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % benefits.length)
    }, 4000) // 4 second interval

    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current)
      }
    }
  }, [benefits.length])

  // Auto-scroll carousel when currentSlide changes
  React.useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = 260 + 16 // card width + gap
      carouselRef.current.scrollTo({
        left: currentSlide * cardWidth,
        behavior: 'smooth'
      })
    }
  }, [currentSlide])

  // Add scroll event listener to check position
  React.useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollPosition)
      // Check initial position
      checkScrollPosition()
      
      return () => carousel.removeEventListener('scroll', checkScrollPosition)
    }
  }, [])

  // Progress animation
  React.useEffect(() => {
    setProgress(0)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + 2 // Increment by 2% every ~80ms for smooth animation
      })
    }, 80)

    return () => clearInterval(progressInterval)
  }, [currentSlide])

  // Check if we're at the end of the carousel
  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1 // -1 for rounding errors
      setShowGradient(!isAtEnd)
    }
  }

  // Scroll to specific slide
  const scrollToSlide = (index: number) => {
    setCurrentSlide(index)
    setProgress(0)
    
    if (carouselRef.current) {
      const cardWidth = 260 + 16 // card width + gap
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <H2 className="mb-3">
          <TypewriterText text="Transform your organization." speed={150} delay={500} />
        </H2>
        <BodyLarge className="text-muted-foreground">
          A unified, agentic platform built to power your entire operation—securely and at scale.
        </BodyLarge>
      </div>
      
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" ref={carouselRef}>
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-3 min-w-[260px] max-w-[260px] flex-shrink-0 p-3 border rounded-lg transition-colors duration-200 ${
                index === currentSlide 
                  ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm' 
                  : 'border-border bg-card'
              }`}
            >
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <benefit.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground leading-tight">{benefit.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Left-side gradient fade - appears on 3rd and 4th slides on desktop, only 4th slide on mobile */}
        <>
          {/* Desktop: 3rd and 4th slides */}
          <div className="hidden md:block absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none transition-opacity duration-300" 
               style={{ opacity: currentSlide >= 2 ? 1 : 0 }} />
          {/* Mobile: only 4th slide */}
          <div className="md:hidden absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none transition-opacity duration-300" 
               style={{ opacity: currentSlide >= 3 ? 1 : 0 }} />
        </>
        
        {/* Right-side gradient fade - Light and Dark mode adapted */}
        {showGradient && (
          <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none transition-opacity duration-300" />
        )}
        
        {/* Animated Progress Indicators */}
        <div className="flex justify-center mt-4">
          <div className="flex gap-2">
            {benefits.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div className="relative">
                  {index === currentSlide ? (
                    // Active slide: Animated progress bar
                    <div className="w-6 h-2.5 bg-primary/30 rounded-[0.625rem] overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-75 ease-linear"
                        style={{ 
                          width: `${Math.max(10, Math.min(24, progress * 0.24))}px` 
                        }}
                      />
                    </div>
                  ) : (
                    // Inactive slide: Simple dot
                    <div className="w-2.5 h-2.5 bg-primary/30 rounded-full" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Process */}
      <div className="border border-border rounded-xl p-6 space-y-4">
        <h4 className="text-lg font-semibold text-foreground">What to Expect From Your Demo</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <Check className="h-6 w-6 text-primary flex-shrink-0" />
            <BodySmall>A personalized 30-minute walkthrough of the platform.</BodySmall>
          </div>
          <div className="flex items-center gap-4">
            <Check className="h-6 w-6 text-primary flex-shrink-0" />
            <BodySmall>A look at how Elevation AI unifies your data, workflows, and teams.</BodySmall>
          </div>
          <div className="flex items-center gap-4">
            <Check className="h-6 w-6 text-primary flex-shrink-0" />
            <BodySmall>Guidance on pricing, implementation, and tailored solutions.</BodySmall>
          </div>
          <div className="flex items-center gap-4">
            <Check className="h-6 w-6 text-primary flex-shrink-0" />
            <BodySmall>No pressure, no commitment—see if we fit your needs.</BodySmall>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Demo Page
export default function DemoPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-background transition-colors duration-300 flex flex-col">
        {/* Global Header */}
        <GlobalHeader showLogin={true} showDemo={false} />

        <main className="flex-1 flex flex-col lg:items-center justify-center px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8">
          <Container>
            <div className="max-w-7xl mx-auto w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 lg:items-center">
                {/* Left Column - Benefits */}
                <div className="order-2 lg:order-1 space-y-6 sm:space-y-8">
                  <BenefitsSection />
                </div>
                
                {/* Right Column - Form */}
                <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
                  <DemoRequestForm />
                </div>
              </div>
            </div>
          </Container>
        </main>
      </div>
    </PageWrapper>
  )
}
