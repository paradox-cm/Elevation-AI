"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { H1, H2, P } from "@/components/ui/typography"
import { CheckCircle, AlertCircle, Users, Building2, Handshake } from "lucide-react"
import { submitPartnershipForm } from "@/lib/form-submissions"

interface FormData {
  partnershipType: 'ambassador' | 'partner' | ''
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  jobTitle: string
  website: string
  linkedinProfile: string
  experience: string
  networkSize: string
  referralSources: string[]
  specificInterests: string[]
  currentClients: string
  expectedVolume: string
  timeline: string
  additionalInfo: string
  hearAboutUs: string
  agreeToTerms: boolean
  agreeToMarketing: boolean
}

const initialFormData: FormData = {
  partnershipType: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
  website: '',
  linkedinProfile: '',
  experience: '',
  networkSize: '',
  referralSources: [],
  specificInterests: [],
  currentClients: '',
  expectedVolume: '',
  timeline: '',
  additionalInfo: '',
  hearAboutUs: '',
  agreeToTerms: false,
  agreeToMarketing: false
}

// Component that uses useSearchParams - needs to be wrapped in Suspense
function PartnershipFormContent() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Handle URL parameters to pre-select partnership type
  useEffect(() => {
    const type = searchParams.get('type')
    if (type === 'ambassador' || type === 'partner') {
      setFormData(prev => ({ ...prev, partnershipType: type }))
    }
  }, [searchParams])

  const handleInputChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: 'referralSources' | 'specificInterests', value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      await submitPartnershipForm(formData)
      setSubmitStatus('success')
      setFormData(initialFormData)
    } catch (error) {
      console.error('Error submitting partnership form:', error)
      setSubmitStatus('error')
      setErrorMessage('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isAmbassador = formData.partnershipType === 'ambassador'
  const isPartner = formData.partnershipType === 'partner'

  if (submitStatus === 'success') {
    return (
      <PageWrapper>
        <MobileOnlyLayout
          header={<MainHeader />}
          footer={<WebsiteFooter />}
          mobileMenu={<MobileMenuDrawer currentPage="partnership" />}
        >
          <div className="min-h-screen bg-background transition-colors duration-300">
            <main>
              <Container size="2xl">
                <Section paddingY="lg">
                  <div className="max-w-2xl mx-auto text-center space-y-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <H1>Thank You for Your Interest!</H1>
                    <P className="text-lg text-muted-foreground">
                      We've received your partnership application and will review it carefully. 
                      Our team will get back to you within 2-3 business days with next steps.
                    </P>
                    <div className="pt-4">
                      <Button asChild>
                        <a href="/website/partners">Back to Partners Page</a>
                      </Button>
                    </div>
                  </div>
                </Section>
              </Container>
            </main>
          </div>
        </MobileOnlyLayout>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="partnership" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            <Container size="2xl">
              <Section paddingY="lg">
                <div className="max-w-4xl mx-auto space-y-8">
                  {/* Header */}
                  <div className="text-center space-y-4">
                    <H1>Join Our Partnership Program</H1>
                    <P className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      Whether you're interested in becoming an Ambassador or joining our Partner Network, 
                      we'd love to learn more about you and how we can work together.
                    </P>
                  </div>

                  {/* Partnership Type Selection */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Handshake className="w-5 h-5" />
                        Partnership Type
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup
                        value={formData.partnershipType}
                        onValueChange={(value) => handleInputChange('partnershipType', value)}
                        className="space-y-4"
                      >
                        <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="ambassador" id="ambassador" className="mt-1" />
                          <div className="flex-1 space-y-2">
                            <Label htmlFor="ambassador" className="text-base font-medium cursor-pointer">
                              Ambassador Program
                            </Label>
                            <P className="text-sm text-muted-foreground">
                              For well-connected leaders who can provide warm introductions to their network. 
                              Perfect for those who want to be at the center of the agentic AI ecosystem.
                            </P>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="partner" id="partner" className="mt-1" />
                          <div className="flex-1 space-y-2">
                            <Label htmlFor="partner" className="text-base font-medium cursor-pointer">
                              Partner Network
                            </Label>
                            <P className="text-sm text-muted-foreground">
                              For consulting firms and individual experts who want to use our platform 
                              to deliver AI-powered solutions to their clients.
                            </P>
                          </div>
                        </div>
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  {/* Form */}
                  {formData.partnershipType && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Contact Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Contact Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name *</Label>
                              <Input
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name *</Label>
                              <Input
                                id="lastName"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address *</Label>
                              <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Professional Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Building2 className="w-5 h-5" />
                            Professional Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="company">Company/Organization *</Label>
                              <Input
                                id="company"
                                value={formData.company}
                                onChange={(e) => handleInputChange('company', e.target.value)}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="jobTitle">Job Title *</Label>
                              <Input
                                id="jobTitle"
                                value={formData.jobTitle}
                                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="website">Website</Label>
                              <Input
                                id="website"
                                type="url"
                                placeholder="https://example.com"
                                value={formData.website}
                                onChange={(e) => handleInputChange('website', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
                              <Input
                                id="linkedinProfile"
                                type="url"
                                placeholder="https://linkedin.com/in/yourname"
                                value={formData.linkedinProfile}
                                onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Experience & Background */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Experience & Background</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="experience">Tell us about your relevant experience *</Label>
                            <Textarea
                              id="experience"
                              placeholder="Describe your background in AI, enterprise software, consulting, or related fields..."
                              value={formData.experience}
                              onChange={(e) => handleInputChange('experience', e.target.value)}
                              rows={4}
                              required
                            />
                          </div>
                          
                          {isAmbassador && (
                            <div className="space-y-2">
                              <Label htmlFor="networkSize">Estimated Network Size</Label>
                              <Select value={formData.networkSize} onValueChange={(value) => handleInputChange('networkSize', value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your network size" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="100-500">100-500 contacts</SelectItem>
                                  <SelectItem value="500-1000">500-1,000 contacts</SelectItem>
                                  <SelectItem value="1000-5000">1,000-5,000 contacts</SelectItem>
                                  <SelectItem value="5000+">5,000+ contacts</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          {isPartner && (
                            <div className="space-y-2">
                              <Label htmlFor="currentClients">Current Client Base</Label>
                              <Textarea
                                id="currentClients"
                                placeholder="Describe your current client base and the types of projects you work on..."
                                value={formData.currentClients}
                                onChange={(e) => handleInputChange('currentClients', e.target.value)}
                                rows={3}
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Partnership-Specific Questions */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Partnership-Specific Questions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {isAmbassador && (
                            <>
                              <div className="space-y-3">
                                <Label>How did you hear about our Ambassador Program? (Select all that apply)</Label>
                                <div className="space-y-2">
                                  {[
                                    'LinkedIn',
                                    'Industry conference',
                                    'Referral from existing partner',
                                    'Website',
                                    'Social media',
                                    'Other'
                                  ].map((source) => (
                                    <div key={source} className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`referral-${source}`}
                                        checked={formData.referralSources.includes(source)}
                                        onCheckedChange={(checked) => 
                                          handleArrayChange('referralSources', source, checked as boolean)
                                        }
                                      />
                                      <Label htmlFor={`referral-${source}`} className="text-sm">
                                        {source}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}

                          {isPartner && (
                            <>
                              <div className="space-y-3">
                                <Label>What aspects of our platform interest you most? (Select all that apply)</Label>
                                <div className="space-y-2">
                                  {[
                                    'AI-powered automation',
                                    'Knowledge management',
                                    'Client collaboration tools',
                                    'Integration capabilities',
                                    'Scalable solutions',
                                    'Custom agent development'
                                  ].map((interest) => (
                                    <div key={interest} className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`interest-${interest}`}
                                        checked={formData.specificInterests.includes(interest)}
                                        onCheckedChange={(checked) => 
                                          handleArrayChange('specificInterests', interest, checked as boolean)
                                        }
                                      />
                                      <Label htmlFor={`interest-${interest}`} className="text-sm">
                                        {interest}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}

                          <div className="space-y-2">
                            <Label htmlFor="expectedVolume">Expected Partnership Volume</Label>
                            <Select value={formData.expectedVolume} onValueChange={(value) => handleInputChange('expectedVolume', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select expected volume" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-5">1-5 referrals/engagements per year</SelectItem>
                                <SelectItem value="5-10">5-10 referrals/engagements per year</SelectItem>
                                <SelectItem value="10-25">10-25 referrals/engagements per year</SelectItem>
                                <SelectItem value="25+">25+ referrals/engagements per year</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="timeline">When would you like to start?</Label>
                            <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="immediately">Immediately</SelectItem>
                                <SelectItem value="1-3-months">Within 1-3 months</SelectItem>
                                <SelectItem value="3-6-months">Within 3-6 months</SelectItem>
                                <SelectItem value="6-months+">6+ months from now</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Additional Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Additional Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="additionalInfo">Anything else you'd like us to know?</Label>
                            <Textarea
                              id="additionalInfo"
                              placeholder="Share any additional information about your background, goals, or questions..."
                              value={formData.additionalInfo}
                              onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                              rows={4}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="hearAboutUs">How did you hear about Elevation AI?</Label>
                            <Input
                              id="hearAboutUs"
                              value={formData.hearAboutUs}
                              onChange={(e) => handleInputChange('hearAboutUs', e.target.value)}
                            />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Terms and Conditions */}
                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="flex items-start space-x-2">
                              <Checkbox
                                id="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                                required
                              />
                              <Label htmlFor="agreeToTerms" className="text-sm">
                                I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> *
                              </Label>
                            </div>
                            <div className="flex items-start space-x-2">
                              <Checkbox
                                id="agreeToMarketing"
                                checked={formData.agreeToMarketing}
                                onCheckedChange={(checked) => handleInputChange('agreeToMarketing', checked as boolean)}
                              />
                              <Label htmlFor="agreeToMarketing" className="text-sm">
                                I'd like to receive updates about Elevation AI's products and services
                              </Label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Error Message */}
                      {submitStatus === 'error' && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                      )}

                      {/* Submit Button */}
                      <div className="flex justify-center">
                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting || !formData.agreeToTerms}
                          className="px-8"
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </Section>
            </Container>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}

// Loading component for Suspense fallback
function PartnershipFormLoading() {
  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="partnership" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            <Container size="2xl">
              <Section paddingY="lg">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Handshake className="w-8 h-8 text-gray-400" />
                  </div>
                  <H1>Loading Partnership Form...</H1>
                  <P className="text-lg text-muted-foreground">
                    Please wait while we prepare the partnership application form.
                  </P>
                </div>
              </Section>
            </Container>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}

// Main export with Suspense boundary
export default function PartnershipPage() {
  return (
    <Suspense fallback={<PartnershipFormLoading />}>
      <PartnershipFormContent />
    </Suspense>
  )
}
