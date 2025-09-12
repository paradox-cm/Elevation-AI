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
import { Separator } from '@/components/ui/separator'
import Icon from '@/components/ui/icon'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

interface PricingCalculatorModalProps {
  isOpen: boolean
  onClose: () => void
}

const formSchema = z.object({
  industry: z.string().min(1, "Please select an industry"),
  teamSize: z.array(z.number()).length(1),
  entities: z.array(z.number()).length(1),
  addOns: z.array(z.string()).optional(),
  supportLevel: z.string().min(1, "Please select a support level"),
})

type FormData = z.infer<typeof formSchema>

const industries = [
  "Private Market Organization",
  "Enterprise", 
  "Government",
  "Bank",
  "Investment Firm",
  "Consulting Firm",
  "Other"
]

const teamSizeOptions = [
  { value: [1, 10], label: "1-10" },
  { value: [11, 50], label: "11-50" },
  { value: [51, 250], label: "51-250" },
  { value: [251, 1000], label: "250+" }
]

const entitiesOptions = [
  { value: [1, 5], label: "1-5" },
  { value: [6, 25], label: "6-25" },
  { value: [26, 100], label: "26-100" },
  { value: [101, 500], label: "100+" }
]

const addOnCapabilities = [
  {
    id: "investment-management",
    title: "Advanced Investment Management",
    description: "For organizations that source and manage equity deals. Includes features for deal flow management, SPV & LP management, and portfolio monitoring."
  },
  {
    id: "private-credit",
    title: "Advanced Private Credit", 
    description: "For organizations that originate and service debt. Includes features for application management, automated diligence support, and vendor management."
  },
  {
    id: "consulting-management",
    title: "Advanced Consulting Firm Management",
    description: "For firms that manage external clients. Includes features for client project management, client workspaces, and team management."
  }
]

const supportLevels = [
  {
    id: "platform-support",
    title: "Platform & Community Support",
    description: "For self-sufficient organizations ready to build their own agentic solutions, backed by our comprehensive documentation and community resources."
  },
  {
    id: "concierge-support", 
    title: "Concierge Support",
    description: "For organizations who want a full-service partnership. Includes a dedicated allotment of AI Engineer hours each month, strategic guidance, and custom agent development."
  }
]

export function PricingCalculatorModal({ isOpen, onClose }: PricingCalculatorModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showResults, setShowResults] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      teamSize: [1],
      entities: [1],
      addOns: [],
      supportLevel: ""
    }
  })

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data)
    setShowResults(true)
  }

  const handleNext = () => {
    if (currentStep < 3) {
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
        <H3>How many distinct entities do you manage?</H3>
        <P className="text-sm text-muted-foreground">e.g., Portfolio Companies, Funds, SPVs</P>
        <FormField
          control={form.control}
          name="entities"
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
                    {entitiesOptions.map((option, index) => (
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
        <H3>The Core Platform</H3>
        <P className="text-sm text-muted-foreground">Included in all plans - foundational features that create your secure knowledge and work orchestration layer.</P>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Core Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="check-line" className="h-4 w-4 text-green-500" />
            <span className="text-sm">Team & Data Management</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="check-line" className="h-4 w-4 text-green-500" />
            <span className="text-sm">Secure Knowledge Base</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="check-line" className="h-4 w-4 text-green-500" />
            <span className="text-sm">Collaborative Workspaces</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="check-line" className="h-4 w-4 text-green-500" />
            <span className="text-sm">Core Agent Library & Co-Pilot</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="check-line" className="h-4 w-4 text-green-500" />
            <span className="text-sm">Secure Middleware & Data De-identification</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <H3>Add-On Capabilities</H3>
        <P className="text-sm text-muted-foreground">Select all that apply</P>
        
        <FormField
          control={form.control}
          name="addOns"
          render={() => (
            <FormItem>
              <div className="space-y-4">
                {addOnCapabilities.map((capability) => (
                  <FormField
                    key={capability.id}
                    control={form.control}
                    name="addOns"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={capability.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(capability.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), capability.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== capability.id
                                      ) || []
                                    )
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-medium">
                              {capability.title}
                            </FormLabel>
                            <P className="text-xs text-muted-foreground">
                              {capability.description}
                            </P>
                          </div>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )

  const renderStep3 = () => (
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

  const renderResults = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <H2>Your Custom Plan is Ready</H2>
        <P className="text-muted-foreground">
          Thank you. Based on your selections, we have generated a custom plan tailored to the unique needs of your organization. The next step is a brief, 15-minute call with our team to review your plan, discuss the specific pricing, and answer any questions you may have.
        </P>
      </div>

      <div className="space-y-4">
        <H3>Your Selections Summary</H3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Industry:</span>
            <span className="text-sm font-medium">{form.getValues("industry")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Team Size:</span>
            <span className="text-sm font-medium">{teamSizeOptions[form.getValues("teamSize")[0] - 1]?.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Entities:</span>
            <span className="text-sm font-medium">{entitiesOptions[form.getValues("entities")[0] - 1]?.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Add-ons:</span>
            <span className="text-sm font-medium">
              {form.getValues("addOns")?.length || 0} selected
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Support:</span>
            <span className="text-sm font-medium">
              {supportLevels.find(l => l.id === form.getValues("supportLevel"))?.title}
            </span>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <Button size="lg" className="w-full" asChild>
          <a href="mailto:sales@elevationai.com?subject=Custom Plan Review Request">
            Schedule a Call to Review Your Plan
            <Icon name="arrow-right-line" className="h-4 w-4 ml-2" />
          </a>
        </Button>
        <Button variant="outline" size="lg" className="w-full" onClick={handleClose}>
          Close
        </Button>
      </div>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="backdrop-blur-md bg-black/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-md bg-background/95 border border-border/50">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <span>Build Your Custom Plan</span>
              {!showResults && (
                <Badge variant="secondary">
                  Step {currentStep} of 3
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
                  
                  {currentStep < 3 ? (
                    <Button type="button" onClick={handleNext}>
                      Next
                      <Icon name="arrow-right-line" className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit">
                      Generate My Plan
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
