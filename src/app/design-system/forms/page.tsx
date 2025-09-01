"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { H3, H4, BodyLarge, BodySmall } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTabs, ResponsiveTabsContent, ResponsiveTabsList, ResponsiveTabsTrigger } from "@/components/ui/responsive-tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { useFormsConfig } from "@/hooks/use-forms-config"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
  FormTextarea,
  FormSelect,
  FormFieldGroup,
  FormSection,
  FormStatus,
  FormActions,
  FormProgress,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"

// Form validation schemas
const basicFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
})

const advancedFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  role: z.string().min(1, "Please select your role"),
  experience: z.string().min(1, "Please select your experience level"),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  newsletter: z.boolean().default(false).optional(),
  notifications: z.boolean().default(true).optional(),
  bio: z.string().min(20, "Bio must be at least 20 characters"),
})

const wizardFormSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
  }),
  preferences: z.object({
    theme: z.string().min(1, "Please select a theme"),
    notifications: z.boolean().default(true).optional(),
    newsletter: z.boolean().default(false).optional(),
  }),
  confirmation: z.object({
    terms: z.boolean().refine((val) => val === true, "You must accept the terms"),
  }),
})

type BasicFormData = z.infer<typeof basicFormSchema>
type AdvancedFormData = z.infer<typeof advancedFormSchema>
type WizardFormData = z.infer<typeof wizardFormSchema>

export default function FormsPage() {
  const {
    config,
    formLayoutConfig,
    formValidationConfig,
    formInputConfig,
    formSelectConfig,
    formCheckboxConfig,
    formRadioConfig,
    formSwitchConfig,
    formTextareaConfig,
    formWizardConfig,
    formStatusConfig
  } = useFormsConfig()

  const [wizardStep, setWizardStep] = useState(1)
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error" | "loading">("idle")

  // Basic Form
  const basicForm = useForm<BasicFormData>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      email: "",
      name: "",
      message: "",
      category: "",
    },
  })

  const onBasicSubmit = (data: BasicFormData) => {
    console.log("Basic form data:", data)
    setFormStatus("success")
    setTimeout(() => setFormStatus("idle"), 3000)
  }

  // Advanced Form
  const advancedForm = useForm<AdvancedFormData>({
    resolver: zodResolver(advancedFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      role: "",
      experience: "",
      skills: [],
      newsletter: false,
      notifications: true,
      bio: "",
    },
  })

  const onAdvancedSubmit = (data: AdvancedFormData) => {
    console.log("Advanced form data:", data)
    setFormStatus("success")
    setTimeout(() => setFormStatus("idle"), 3000)
  }

  // Wizard Form
  const wizardForm = useForm<WizardFormData>({
    resolver: zodResolver(wizardFormSchema),
    defaultValues: {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
      },
      preferences: {
        theme: "",
        notifications: true,
        newsletter: false,
      },
      confirmation: {
        terms: false,
      },
    },
  })

  const onWizardSubmit = (data: WizardFormData) => {
    console.log("Wizard form data:", data)
    setFormStatus("success")
    setTimeout(() => setFormStatus("idle"), 3000)
  }

  const nextWizardStep = () => {
    if (wizardStep < 3) {
      setWizardStep(wizardStep + 1)
    }
  }

  const prevWizardStep = () => {
    if (wizardStep > 1) {
      setWizardStep(wizardStep - 1)
    }
  }

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container>
          <Section paddingY="xl">
            <PageHeader
              title="Enhanced Form System"
              description="Comprehensive form components with validation states, layouts, and advanced patterns for building professional user interfaces with proper accessibility and user experience."
              size="lg"
              centered
            />
          </Section>

          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="questionnaire-line" className="h-5 w-5" />
                  Form System Overview
                </CardTitle>
                <CardDescription>
                  Our enhanced form system provides comprehensive validation, status feedback, and flexible layouts for all your form needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="shield-check-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Validation States</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Real-time validation with success, error, and warning states
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="layout-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Flexible Layouts</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Form sections, field groups, and responsive layouts
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="user-settings-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Advanced Patterns</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Multi-step wizards, progress indicators, and status feedback
                    </BodySmall>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Form Examples */}
          <Section paddingY="lg">
                      <ResponsiveTabs defaultValue="basic" className="w-full">
            <ResponsiveTabsList className="grid w-full grid-cols-3">
              <ResponsiveTabsTrigger value="basic">Basic Form</ResponsiveTabsTrigger>
              <ResponsiveTabsTrigger value="advanced">Advanced Form</ResponsiveTabsTrigger>
              <ResponsiveTabsTrigger value="wizard">Form Wizard</ResponsiveTabsTrigger>
            </ResponsiveTabsList>

              {/* Basic Form */}
              <ResponsiveTabsContent value="basic" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Support Contact Form</CardTitle>
                    <CardDescription>
                      A comprehensive contact form with real-time validation, status feedback, and proper accessibility features
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...basicForm}>
                      <form onSubmit={basicForm.handleSubmit(onBasicSubmit)} className="space-y-6">
                        {formStatus === "success" && (
                          <FormStatus
                            status="success"
                            title="Form submitted successfully!"
                            message="Thank you for your message. We'll get back to you soon."
                          />
                        )}

                        <FormFieldGroup title="Contact Information">
                          <FormField
                            control={basicForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <FormInput
                                    placeholder="Enter your full name"
                                    icon="user-line"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={basicForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <FormInput
                                    type="email"
                                    placeholder="Enter your email"
                                    icon="mail-line"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={basicForm.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <FormSelect>
                                      <SelectValue placeholder="Select a category" />
                                    </FormSelect>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="general">General Inquiry</SelectItem>
                                    <SelectItem value="support">Technical Support</SelectItem>
                                    <SelectItem value="feedback">Feedback</SelectItem>
                                    <SelectItem value="partnership">Partnership</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={basicForm.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <FormTextarea
                                    placeholder="Type your message here..."
                                    className="min-h-[120px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Please provide as much detail as possible
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </FormFieldGroup>

                        <FormActions>
                          <Button type="submit" disabled={formStatus === "loading"}>
                            {formStatus === "loading" ? (
                              <>
                                <Icon name="loader-4-line" className="h-4 w-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Icon name="send-plane-line" className="h-4 w-4" />
                                Send Message
                              </>
                            )}
                          </Button>
                        </FormActions>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Advanced Form */}
              <ResponsiveTabsContent value="advanced" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Developer Profile Registration</CardTitle>
                    <CardDescription>
                      A comprehensive developer profile form with multiple sections, conditional fields, skill selection, and preference settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...advancedForm}>
                      <form onSubmit={advancedForm.handleSubmit(onAdvancedSubmit)} className="space-y-8">
                        {formStatus === "success" && (
                          <FormStatus
                            status="success"
                            title="Profile updated successfully!"
                            message="Your profile has been saved and updated."
                          />
                        )}

                        <FormSection
                          title="Personal Information"
                          description="Basic details about yourself"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={advancedForm.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                    <FormInput placeholder="Enter first name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={advancedForm.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                    <FormInput placeholder="Enter last name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={advancedForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <FormInput
                                    type="email"
                                    placeholder="Enter email address"
                                    icon="mail-line"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={advancedForm.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number (Optional)</FormLabel>
                                  <FormControl>
                                    <FormInput
                                      placeholder="Enter phone number"
                                      icon="phone-line"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={advancedForm.control}
                              name="company"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Company (Optional)</FormLabel>
                                  <FormControl>
                                    <FormInput placeholder="Enter company name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </FormSection>

                        <FormSection
                          title="Professional Information"
                          description="Your work experience and skills"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={advancedForm.control}
                              name="role"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Current Role</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <FormSelect>
                                        <SelectValue placeholder="Select your role" />
                                      </FormSelect>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="developer">Developer</SelectItem>
                                      <SelectItem value="designer">Designer</SelectItem>
                                      <SelectItem value="manager">Manager</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={advancedForm.control}
                              name="experience"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Experience Level</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <FormSelect>
                                        <SelectValue placeholder="Select experience level" />
                                      </FormSelect>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                                      <SelectItem value="mid">Mid-level (3-5 years)</SelectItem>
                                      <SelectItem value="senior">Senior (5+ years)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={advancedForm.control}
                            name="bio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                  <FormTextarea
                                    placeholder="Tell us about yourself..."
                                    className="min-h-[100px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  A brief description about your background and interests
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </FormSection>

                        <FormSection
                          title="Preferences"
                          description="Your communication and notification preferences"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <FormLabel>Email Newsletter</FormLabel>
                                <FormDescription>
                                  Receive updates about new features and products
                                </FormDescription>
                              </div>
                              <FormField
                                control={advancedForm.control}
                                name="newsletter"
                                render={({ field }) => (
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                )}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <FormLabel>Push Notifications</FormLabel>
                                <FormDescription>
                                  Receive real-time notifications in your browser
                                </FormDescription>
                              </div>
                              <FormField
                                control={advancedForm.control}
                                name="notifications"
                                render={({ field }) => (
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                )}
                              />
                            </div>
                          </div>
                        </FormSection>

                        <FormActions>
                          <Button type="button" variant="outline">
                            Cancel
                          </Button>
                          <Button type="submit" disabled={formStatus === "loading"}>
                            {formStatus === "loading" ? (
                              <>
                                <Icon name="loader-4-line" className="h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Icon name="save-line" className="h-4 w-4" />
                                Save Profile
                              </>
                            )}
                          </Button>
                        </FormActions>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Wizard Form */}
              <ResponsiveTabsContent value="wizard" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Setup Wizard</CardTitle>
                    <CardDescription>
                      A step-by-step project configuration wizard with progress tracking, validation, and user guidance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...wizardForm}>
                      <form onSubmit={wizardForm.handleSubmit(onWizardSubmit)} className="space-y-6">
                        {formStatus === "success" && (
                          <FormStatus
                            status="success"
                            title="Account created successfully!"
                            message="Welcome to our platform. Your account has been set up."
                          />
                        )}

                        <FormProgress
                          currentStep={wizardStep}
                          totalSteps={3}
                          steps={["Personal Info", "Preferences", "Confirmation"]}
                        />

                        {wizardStep === 1 && (
                          <FormSection
                            title="Personal Information"
                            description="Let's start with your basic details"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={wizardForm.control}
                                name="personalInfo.firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                      <FormInput placeholder="Enter first name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={wizardForm.control}
                                name="personalInfo.lastName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                      <FormInput placeholder="Enter last name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={wizardForm.control}
                              name="personalInfo.email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <FormInput
                                      type="email"
                                      placeholder="Enter email address"
                                      icon="mail-line"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </FormSection>
                        )}

                        {wizardStep === 2 && (
                          <FormSection
                            title="Preferences"
                            description="Customize your experience"
                          >
                            <FormField
                              control={wizardForm.control}
                              name="preferences.theme"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Theme Preference</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <FormSelect>
                                        <SelectValue placeholder="Select a theme" />
                                      </FormSelect>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="light">Light Theme</SelectItem>
                                      <SelectItem value="dark">Dark Theme</SelectItem>
                                      <SelectItem value="auto">Auto (System)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <FormLabel>Email Notifications</FormLabel>
                                  <FormDescription>
                                    Receive important updates via email
                                  </FormDescription>
                                </div>
                                <FormField
                                  control={wizardForm.control}
                                  name="preferences.notifications"
                                  render={({ field }) => (
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  )}
                                />
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <FormLabel>Newsletter Subscription</FormLabel>
                                  <FormDescription>
                                    Receive weekly newsletters and updates
                                  </FormDescription>
                                </div>
                                <FormField
                                  control={wizardForm.control}
                                  name="preferences.newsletter"
                                  render={({ field }) => (
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  )}
                                />
                              </div>
                            </div>
                          </FormSection>
                        )}

                        {wizardStep === 3 && (
                          <FormSection
                            title="Confirmation"
                            description="Review and confirm your information"
                          >
                            <FormStatus
                              status="info"
                              title="Review Your Information"
                              message="Please review the information below and accept the terms to complete your registration."
                            />

                            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <BodySmall className="text-muted-foreground">Name</BodySmall>
                                  <BodyLarge>
                                    {wizardForm.watch("personalInfo.firstName")} {wizardForm.watch("personalInfo.lastName")}
                                  </BodyLarge>
                                </div>
                                <div>
                                  <BodySmall className="text-muted-foreground">Email</BodySmall>
                                  <BodyLarge>{wizardForm.watch("personalInfo.email")}</BodyLarge>
                                </div>
                                <div>
                                  <BodySmall className="text-muted-foreground">Theme</BodySmall>
                                  <BodyLarge className="capitalize">{wizardForm.watch("preferences.theme")}</BodyLarge>
                                </div>
                                <div>
                                  <BodySmall className="text-muted-foreground">Notifications</BodySmall>
                                  <BodyLarge>
                                    {wizardForm.watch("preferences.notifications") ? "Enabled" : "Disabled"}
                                  </BodyLarge>
                                </div>
                              </div>
                            </div>

                            <FormField
                              control={wizardForm.control}
                              name="confirmation.terms"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>
                                      I agree to the{" "}
                                      <Button variant="link" className="p-0 h-auto">
                                        Terms of Service
                                      </Button>{" "}
                                      and{" "}
                                      <Button variant="link" className="p-0 h-auto">
                                        Privacy Policy
                                      </Button>
                                    </FormLabel>
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              )}
                            />
                          </FormSection>
                        )}

                        <FormActions>
                          {wizardStep > 1 && (
                            <Button type="button" variant="outline" onClick={prevWizardStep}>
                              <Icon name="arrow-left-line" className="mr-2 h-4 w-4" />
                              Previous
                            </Button>
                          )}
                          
                          {wizardStep < 3 ? (
                            <Button type="button" onClick={nextWizardStep}>
                              Next
                              <Icon name="arrow-right-line" className="ml-2 h-4 w-4" />
                            </Button>
                          ) : (
                            <Button type="submit" disabled={formStatus === "loading"}>
                              {formStatus === "loading" ? (
                                <>
                                  <Icon name="loader-4-line" className="h-4 w-4 animate-spin" />
                                  Creating Account...
                                </>
                              ) : (
                                <>
                                  <Icon name="check-line" className="h-4 w-4" />
                                  Create Account
                                </>
                              )}
                            </Button>
                          )}
                        </FormActions>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>
            </ResponsiveTabs>
          </Section>

          {/* Form Components Showcase */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="component-line" className="h-5 w-5" />
                  Form Components
                </CardTitle>
                <CardDescription>
                  Individual form components and their usage patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <H3>Input States</H3>
                    <Form>
                      <div className="space-y-3">
                        <FormItem>
                          <FormLabel>Default Input</FormLabel>
                          <FormControl>
                            <Input placeholder="Default state" />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Success Input</FormLabel>
                          <FormControl>
                            <Input placeholder="Success state" className="border-green-500 focus:border-green-500" />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Error Input</FormLabel>
                          <FormControl>
                            <Input placeholder="Error state" className="border-red-500 focus:border-red-500" />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Warning Input</FormLabel>
                          <FormControl>
                            <Input placeholder="Warning state" className="border-yellow-500 focus:border-yellow-500" />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Input with Icon</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="With icon" className="pl-10" />
                              <Icon name="search-line" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            </div>
                          </FormControl>
                        </FormItem>
                      </div>
                    </Form>
                  </div>

                  <div className="space-y-4">
                    <H3>Status Messages</H3>
                    <div className="space-y-3">
                      <FormStatus
                        status="success"
                        title="Success Message"
                        message="This is a success status message"
                      />
                      <FormStatus
                        status="error"
                        title="Error Message"
                        message="This is an error status message"
                      />
                      <FormStatus
                        status="warning"
                        title="Warning Message"
                        message="This is a warning status message"
                      />
                      <FormStatus
                        status="info"
                        title="Info Message"
                        message="This is an info status message"
                      />
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
