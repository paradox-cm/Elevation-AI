"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay, DialogPortal } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { H2, H3, H4, P, BodyLarge } from '@/components/ui/typography'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Icon from '@/components/ui/icon'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

interface ConsultationRequestModalProps {
  isOpen: boolean
  onClose: () => void
}

const formSchema = z.object({
  industry: z.string().min(1, "Please select an industry"),
  teamSize: z.array(z.number()).length(1),
  operatingEntities: z.array(z.number()).length(1),
  nonOperatingEntities: z.array(z.number()).length(1),
  dataSources: z.array(z.number()).length(1).optional(),
  workflowComplexity: z.string().optional(),
  securityLevel: z.string().optional(),
  complianceNeeds: z.array(z.string()).optional(),
  addOns: z.array(z.string()).optional(),
  supportLevel: z.string().min(1, "Please select a support level"),
  planType: z.string().min(1, "Plan type is required"),
  // Scheduling form fields
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  phone: z.string().optional(),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  timezone: z.string().min(1, "Please select your timezone"),
  additionalNotes: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const industries = [
  "Family Office",
  "Enterprise", 
  "Investment Firms",
  "Consulting Firm",
  "Individual Account"
]

const teamSizeOptions = [
  { value: [1, 10], label: "1-10" },
  { value: [11, 50], label: "11-50" },
  { value: [51, 250], label: "51-250" },
  { value: [251, 1000], label: "250+" }
]

const operatingEntitiesOptions = [
  { value: [1, 5], label: "1-5" },
  { value: [6, 25], label: "6-25" },
  { value: [26, 100], label: "26-100" },
  { value: [101, 500], label: "100+" }
]

const nonOperatingEntitiesOptions = [
  { value: [0, 10], label: "0-10" },
  { value: [11, 50], label: "11-50" },
  { value: [51, 200], label: "51-200" },
  { value: [201, 1000], label: "200+" }
]

const planTypes = [
  { value: "paid", label: "Paid Plan", description: "Full features and support" }
]

const addOnCapabilities = [
  {
    id: "investment-management-equity",
    title: "Investment Management - Equity",
    description: "Sourcing & deal flow management, SPV management, LP management, deal pages for equity investments."
  },
  {
    id: "investment-management-credit",
    title: "Investment Management - Private Credit", 
    description: "Application management, applicant data integration, scoring and diligence support, vendor management, invoice management."
  },
  {
    id: "consulting-management",
    title: "Consulting Firm Management",
    description: "Client management, client projects and tasks, client workspaces, consulting firm team management."
  },
  {
    id: "portfolio-management",
    title: "Portfolio Management",
    description: "Private market assets, public market assets, currency assets, liabilities management."
  },
  {
    id: "mobile-app",
    title: "Mobile App Features",
    description: "Voice chat, quick actions for notes and tasks, mobile access to all platform features."
  },
  {
    id: "embedded-experts",
    title: "Embedded Experts",
    description: "Access to embedded experts and partner network for specialized support."
  }
]

const supportLevels = [
  {
    id: "platform-support",
    title: "Platform & Community Support",
    description: "For self-sufficient organizations ready to build their own agentic solutions, backed by our comprehensive documentation and community resources.",
    credits: "Standard credits included",
    conciergeHours: 0
  },
  {
    id: "concierge-support", 
    title: "Concierge Support",
    description: "For organizations who want a full-service partnership. Includes a dedicated allotment of AI Engineer hours each month, strategic guidance, and custom agent development.",
    credits: "Enhanced credits included",
    conciergeHours: "Based on package"
  }
]

const preferredTimes = [
  "Morning (9 AM - 12 PM)",
  "Afternoon (12 PM - 5 PM)", 
  "Evening (5 PM - 8 PM)",
  "Flexible - Any time works"
]

const timezones = [
  "Pacific Time (PT)",
  "Mountain Time (MT)",
  "Central Time (CT)",
  "Eastern Time (ET)",
  "GMT/UTC",
  "Other (please specify in notes)"
]

export function ConsultationRequestModal({ isOpen, onClose }: ConsultationRequestModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showResults, setShowResults] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      teamSize: [1],
      operatingEntities: [1],
      nonOperatingEntities: [1],
      dataSources: [1],
      workflowComplexity: "",
      securityLevel: "",
      complianceNeeds: [],
      addOns: [],
      supportLevel: "",
      planType: "paid",
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      phone: "",
      preferredTime: "",
      timezone: "",
      additionalNotes: ""
    }
  })

  // Consultation data preparation logic
  const prepareConsultationData = (data: FormData) => {
    const teamSize = teamSizeOptions[data.teamSize[0] - 1]?.value || [1, 10]
    const operatingEntities = operatingEntitiesOptions[data.operatingEntities[0] - 1]?.value || [1, 5]
    const nonOperatingEntities = nonOperatingEntitiesOptions[data.nonOperatingEntities[0] - 1]?.value || [0, 10]
    const addOns = data.addOns || []
    
    // Base pricing structure (these would be actual prices in production)
    let basePrice = 0
    let monthlyPrice = 0
    let credits = 0
    let conciergeHours = 0
    
    // Industry-based pricing (paid plans only)
    switch (data.industry) {
      case "Family Office":
        basePrice = 2500
        monthlyPrice = 500
        credits = 1000
        conciergeHours = 20
        break
      case "Enterprise":
        basePrice = 5000
        monthlyPrice = 1000
        credits = 2500
        conciergeHours = 40
        break
      case "Investment Firms":
        basePrice = 3500
        monthlyPrice = 750
        credits = 1500
        conciergeHours = 30
        break
      case "Consulting Firm":
        basePrice = 2000
        monthlyPrice = 400
        credits = 800
        conciergeHours = 15
        break
      case "Individual Account":
        basePrice = 500
        monthlyPrice = 100
        credits = 200
        conciergeHours = 5
        break
    }
    
    // Add-on pricing
    const addOnPricing = {
      "investment-management-equity": { monthly: 200, credits: 300 },
      "investment-management-credit": { monthly: 200, credits: 300 },
      "consulting-management": { monthly: 150, credits: 200 },
      "portfolio-management": { monthly: 100, credits: 150 },
      "mobile-app": { monthly: 50, credits: 100 },
      "embedded-experts": { monthly: 300, credits: 500 }
    }
    
    let addOnMonthly = 0
    let addOnCredits = 0
    
    addOns.forEach(addOn => {
      const pricing = addOnPricing[addOn as keyof typeof addOnPricing]
      if (pricing) {
        addOnMonthly += pricing.monthly
        addOnCredits += pricing.credits
      }
    })
    
    // Entity scaling
    const entityMultiplier = Math.max(1, (operatingEntities[1] + nonOperatingEntities[1]) / 10)
    const teamMultiplier = Math.max(1, teamSize[1] / 10)
    
    const finalMonthlyPrice = Math.round((monthlyPrice + addOnMonthly) * entityMultiplier * teamMultiplier)
    const finalCredits = Math.round((credits + addOnCredits) * entityMultiplier)
    const finalConciergeHours = Math.round(conciergeHours * entityMultiplier)
    
    return {
      basePrice,
      monthlyPrice: finalMonthlyPrice,
      credits: finalCredits,
      conciergeHours: finalConciergeHours,
      addOns: addOns.length,
      teamSize: teamSize,
      operatingEntities: operatingEntities,
      nonOperatingEntities: nonOperatingEntities
    }
  }

  const onSubmit = (data: FormData) => {
    setShowResults(true)
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    setCurrentStep(1)
    setShowResults(false)
    form.reset()
    onClose()
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <H3>What is your primary industry?</H3>
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>


      <div className="space-y-4">
        <H3>How many team members need access?</H3>
        <FormField
          control={form.control}
          name="teamSize"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-4">
                  <Slider
                    value={field.value}
                    onValueChange={field.onChange}
                    min={1}
                    max={4}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    {teamSizeOptions.map((option, index) => (
                      <span key={index} className={field.value[0] === index + 1 ? "text-primary font-medium" : ""}>
                        {option.label}
                      </span>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <H3>How many operating entities do you manage?</H3>
        <P className="text-sm text-muted-foreground">e.g., Family Offices, Businesses, Investment Firms, Consulting Firms, Portfolio Companies</P>
        <FormField
          control={form.control}
          name="operatingEntities"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-4">
                  <Slider
                    value={field.value}
                    onValueChange={field.onChange}
                    min={1}
                    max={4}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    {operatingEntitiesOptions.map((option, index) => (
                      <span key={index} className={field.value[0] === index + 1 ? "text-primary font-medium" : ""}>
                        {option.label}
                      </span>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <H3>How many non-operating entities do you manage?</H3>
        <P className="text-sm text-muted-foreground">e.g., SPVs, Funds, HoldCos</P>
        <FormField
          control={form.control}
          name="nonOperatingEntities"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-4">
                  <Slider
                    value={field.value}
                    onValueChange={field.onChange}
                    min={1}
                    max={4}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    {nonOperatingEntitiesOptions.map((option, index) => (
                      <span key={index} className={field.value[0] === index + 1 ? "text-primary font-medium" : ""}>
                        {option.label}
                      </span>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <H3>Data Complexity & Integration Needs</H3>
        <P className="text-sm text-muted-foreground">Help us understand your data landscape to optimize your plan configuration.</P>
      </div>

      <div className="space-y-4">
        <H3>How many data sources do you currently manage?</H3>
        <P className="text-sm text-muted-foreground">e.g., CRM systems, accounting software, investment platforms, document repositories</P>
        <FormField
          control={form.control}
          name="dataSources"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-4">
                  <Slider
                    value={field.value || [1]}
                    onValueChange={field.onChange}
                    min={1}
                    max={4}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span className={field.value?.[0] === 1 ? "text-primary font-medium" : ""}>1-3</span>
                    <span className={field.value?.[0] === 2 ? "text-primary font-medium" : ""}>4-8</span>
                    <span className={field.value?.[0] === 3 ? "text-primary font-medium" : ""}>9-15</span>
                    <span className={field.value?.[0] === 4 ? "text-primary font-medium" : ""}>15+</span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <H3>What's your primary workflow complexity?</H3>
        <FormField
          control={form.control}
          name="workflowComplexity"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-3"
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="simple" id="simple" className="mt-1" />
                    <div className="space-y-1">
                      <label htmlFor="simple" className="text-sm font-medium leading-none">
                        Simple & Standardized
                      </label>
                      <P className="text-xs text-muted-foreground">
                        Straightforward processes with minimal customization needs
                      </P>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="moderate" id="moderate" className="mt-1" />
                    <div className="space-y-1">
                      <label htmlFor="moderate" className="text-sm font-medium leading-none">
                        Moderate Complexity
                      </label>
                      <P className="text-xs text-muted-foreground">
                        Some custom workflows with standard integrations
                      </P>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="complex" id="complex" className="mt-1" />
                    <div className="space-y-1">
                      <label htmlFor="complex" className="text-sm font-medium leading-none">
                        Highly Complex
                      </label>
                      <P className="text-xs text-muted-foreground">
                        Custom workflows, multiple integrations, and specialized requirements
                      </P>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <H3>Security & Compliance Requirements</H3>
        <P className="text-sm text-muted-foreground">Help us understand your security and compliance needs to ensure proper plan configuration.</P>
      </div>

      <div className="space-y-4">
        <H3>What level of data security do you require?</H3>
        <FormField
          control={form.control}
          name="securityLevel"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-3"
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="standard" id="standard" className="mt-1" />
                    <div className="space-y-1">
                      <label htmlFor="standard" className="text-sm font-medium leading-none">
                        Standard Security
                      </label>
                      <P className="text-xs text-muted-foreground">
                        Basic encryption and access controls for general business data
                      </P>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="enhanced" id="enhanced" className="mt-1" />
                    <div className="space-y-1">
                      <label htmlFor="enhanced" className="text-sm font-medium leading-none">
                        Enhanced Security
                      </label>
                      <P className="text-xs text-muted-foreground">
                        Advanced encryption, audit trails, and compliance features
                      </P>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="enterprise" id="enterprise" className="mt-1" />
                    <div className="space-y-1">
                      <label htmlFor="enterprise" className="text-sm font-medium leading-none">
                        Enterprise Security
                      </label>
                      <P className="text-xs text-muted-foreground">
                        SOC 2, GDPR compliance, custom security protocols, and dedicated infrastructure
                      </P>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <H3>Do you have specific compliance requirements?</H3>
        <FormField
          control={form.control}
          name="complianceNeeds"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="gdpr"
                      checked={field.value?.includes("gdpr")}
                      onCheckedChange={(checked) => {
                        const current = field.value || []
                        if (checked) {
                          field.onChange([...current, "gdpr"])
                        } else {
                          field.onChange(current.filter(item => item !== "gdpr"))
                        }
                      }}
                    />
                    <label htmlFor="gdpr" className="text-sm font-medium">
                      GDPR Compliance
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="soc2"
                      checked={field.value?.includes("soc2")}
                      onCheckedChange={(checked) => {
                        const current = field.value || []
                        if (checked) {
                          field.onChange([...current, "soc2"])
                        } else {
                          field.onChange(current.filter(item => item !== "soc2"))
                        }
                      }}
                    />
                    <label htmlFor="soc2" className="text-sm font-medium">
                      SOC 2 Type II
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="hipaa"
                      checked={field.value?.includes("hipaa")}
                      onCheckedChange={(checked) => {
                        const current = field.value || []
                        if (checked) {
                          field.onChange([...current, "hipaa"])
                        } else {
                          field.onChange(current.filter(item => item !== "hipaa"))
                        }
                      }}
                    />
                    <label htmlFor="hipaa" className="text-sm font-medium">
                      HIPAA Compliance
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="none"
                      checked={field.value?.includes("none")}
                      onCheckedChange={(checked) => {
                        const current = field.value || []
                        if (checked) {
                          field.onChange(["none"])
                        } else {
                          field.onChange(current.filter(item => item !== "none"))
                        }
                      }}
                    />
                    <label htmlFor="none" className="text-sm font-medium">
                      No specific compliance requirements
                    </label>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <H3>Choose Your Level of Support</H3>
      
      <FormField
        control={form.control}
        name="supportLevel"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-4"
              >
                {supportLevels.map((level) => (
                  <div key={level.id} className="flex items-start space-x-3">
                    <RadioGroupItem value={level.id} id={level.id} className="mt-1" />
                    <div className="space-y-1">
                      <label
                        htmlFor={level.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {level.title}
                      </label>
                      <P className="text-xs text-muted-foreground">
                        {level.description}
                      </P>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <H3>Schedule Your Custom Plan Review</H3>
        <P className="text-sm text-muted-foreground">
          Based on your selections, our team will prepare a customized plan and pricing for your organization. 
          Please provide your contact information so we can schedule a brief call to review your plan.
        </P>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name" {...field} />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Address *</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter your email address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="company"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name *</FormLabel>
            <FormControl>
              <Input placeholder="Enter your company name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number (Optional)</FormLabel>
            <FormControl>
              <Input type="tel" placeholder="Enter your phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="preferredTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Meeting Time *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {preferredTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your timezone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="additionalNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Notes (Optional)</FormLabel>
            <FormControl>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Any specific questions or requirements you'd like us to know about?"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )

  const renderResults = () => {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Icon name="check-line" className="h-8 w-8 text-green-600" />
          </div>
          <H2>Thank You!</H2>
          <P className="text-muted-foreground">
            Your custom plan request has been submitted successfully. Our team will review your requirements 
            and prepare a personalized plan and pricing for your organization. We'll contact you within 24 hours 
            to schedule your consultation call.
          </P>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">What Happens Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">1</div>
              <div>
                <p className="font-medium">Review & Analysis</p>
                <p className="text-sm text-muted-foreground">Our team analyzes your requirements and prepares a custom plan</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">2</div>
              <div>
                <p className="font-medium">Personalized Outreach</p>
                <p className="text-sm text-muted-foreground">We'll contact you within 24 hours to schedule your consultation</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">3</div>
              <div>
                <p className="font-medium">Custom Plan Review</p>
                <p className="text-sm text-muted-foreground">15-30 minute call to review your plan, pricing, and answer questions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Button size="lg" className="w-full" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline" size="lg" className="w-full" asChild>
            <a href="mailto:sales@elevationai.com?subject=Follow-up on Custom Plan Request">
              Contact Sales Directly
              <Icon name="arrow-right-line" className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="backdrop-blur-md bg-black/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-md bg-background/95 border border-border/50 w-[calc(100vw-2rem)] sm:w-[calc(100vw-3rem)] md:w-[calc(100vw-4rem)] lg:w-full">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <span>Request Your Custom Quote</span>
              {!showResults && (
                <Badge variant="secondary">
                  Step {currentStep} of 5
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {!showResults ? (
              <>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
                {currentStep === 5 && renderStep5()}

                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                  >
                    <Icon name="arrow-left-line" className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  
                  {currentStep < 5 ? (
                    <Button type="button" onClick={handleNext}>
                      Next
                      <Icon name="arrow-right-line" className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit">
                      Submit Request
                    </Button>
                  )}
                </div>
              </>
            ) : (
              renderResults()
            )}
          </form>
        </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
