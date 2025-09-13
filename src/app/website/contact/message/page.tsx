"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { H1, P, BodyLarge, BodySmall } from "@/components/ui/typography"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormFieldGroup } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Icon from "@/components/ui/icon"
import { Mail, Phone, MessageSquare, Building } from "lucide-react"

// Form schema
const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  industry: z.string().min(1, "Please select an industry"),
  companySize: z.string().min(1, "Please select company size"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  newsletter: z.boolean(),
  privacy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function ContactMessagePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      jobTitle: "",
      industry: "",
      companySize: "",
      inquiryType: "",
      message: "",
      newsletter: false,
      privacy: false,
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      // Reset form on success
      form.reset()
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            <Container size="2xl">
              {/* Page Header */}
              <div className="w-full flex items-center justify-center min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]">
                <div className="text-center space-y-1">
                  <H1>
                    Send us a Message
                  </H1>
                  <P className="max-w-[42rem] mx-auto">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </P>
                </div>
              </div>

              {/* Contact Form Section */}
              <Section paddingY="lg">
                <div className="max-w-4xl mx-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Contact Form
                      </CardTitle>
                      <CardDescription>
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          {/* Personal Information */}
                          <FormFieldGroup title="Personal Information">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Name</FormLabel>
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
                                    <FormLabel>Last Name</FormLabel>
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
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input className="pl-10" placeholder="Enter your email address" {...field} />
                                    </div>
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
                                    <div className="relative">
                                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input className="pl-10" placeholder="Enter your phone number" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </FormFieldGroup>

                          {/* Company Information */}
                          <FormFieldGroup title="Company Information">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input className="pl-10" placeholder="Enter your company name" {...field} />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="jobTitle"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Enter your job title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="industry"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Industry</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select your industry" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="private-markets">Private Market Organizations</SelectItem>
                                        <SelectItem value="public-markets">Public Market Organizations</SelectItem>
                                        <SelectItem value="banking">Banking & Financial Services</SelectItem>
                                        <SelectItem value="enterprise">Enterprise</SelectItem>
                                        <SelectItem value="government">Government</SelectItem>
                                        <SelectItem value="healthcare">Healthcare</SelectItem>
                                        <SelectItem value="technology">Technology</SelectItem>
                                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                        <SelectItem value="retail">Retail & E-commerce</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="companySize"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Company Size</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select company size" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                                        <SelectItem value="small">Small (11-50 employees)</SelectItem>
                                        <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                                        <SelectItem value="large">Large (201-1000 employees)</SelectItem>
                                        <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </FormFieldGroup>

                          {/* Inquiry Details */}
                          <FormFieldGroup title="Inquiry Details">
                            <FormField
                              control={form.control}
                              name="inquiryType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>How can we help you?</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select inquiry type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="general">General Inquiry</SelectItem>
                                      <SelectItem value="demo">Request a Demo</SelectItem>
                                      <SelectItem value="pricing">Pricing Information</SelectItem>
                                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                                      <SelectItem value="support">Technical Support</SelectItem>
                                      <SelectItem value="media">Media & Press</SelectItem>
                                      <SelectItem value="careers">Career Opportunities</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="message"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Message</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Tell us more about your needs, goals, or questions..."
                                      className="min-h-[120px]"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </FormFieldGroup>

                          {/* Preferences */}
                          <FormFieldGroup title="Preferences">
                            <FormField
                              control={form.control}
                              name="newsletter"
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
                                      Subscribe to our newsletter
                                    </FormLabel>
                                    <BodySmall className="text-muted-foreground">
                                      Get the latest insights on AI, platform updates, and industry trends.
                                    </BodySmall>
                                  </div>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="privacy"
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
                                      I agree to the privacy policy
                                    </FormLabel>
                                    <BodySmall className="text-muted-foreground">
                                      By submitting this form, you agree to our{" "}
                                      <a href="/privacy" className="text-primary hover:underline">
                                        Privacy Policy
                                      </a>{" "}
                                      and{" "}
                                      <a href="/terms-of-service" className="text-primary hover:underline">
                                        Terms of Service
                                      </a>.
                                    </BodySmall>
                                  </div>
                                </FormItem>
                              )}
                            />
                          </FormFieldGroup>

                          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (
                              <>
                                <Icon name="loader-2-line" className="w-4 h-4 mr-2 animate-spin" />
                                Sending Message...
                              </>
                            ) : (
                              <>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Send Message
                              </>
                            )}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </div>
              </Section>
            </Container>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
