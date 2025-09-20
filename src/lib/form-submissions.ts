import { createClient } from '@/lib/supabase/client'

export interface PartnershipFormData {
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

export async function submitPartnershipForm(formData: PartnershipFormData): Promise<void> {
  const supabase = createClient()

  // Determine form type based on partnership type
  const formType = formData.partnershipType === 'ambassador' ? 'partnership_ambassador' : 'partnership_network'

  // Prepare form data for submission
  const submissionData = {
    form_type: formType,
    status: 'new',
    priority: 'medium',
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone: formData.phone || null,
    company: formData.company,
    job_title: formData.jobTitle,
    form_data: {
      partnershipType: formData.partnershipType,
      website: formData.website,
      linkedinProfile: formData.linkedinProfile,
      experience: formData.experience,
      networkSize: formData.networkSize,
      referralSources: formData.referralSources,
      specificInterests: formData.specificInterests,
      currentClients: formData.currentClients,
      expectedVolume: formData.expectedVolume,
      timeline: formData.timeline,
      additionalInfo: formData.additionalInfo,
      hearAboutUs: formData.hearAboutUs,
      agreeToTerms: formData.agreeToTerms,
      agreeToMarketing: formData.agreeToMarketing,
      submittedAt: new Date().toISOString()
    },
    ip_address: null, // Will be set by server-side processing
    user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
    referrer_url: typeof window !== 'undefined' ? document.referrer : null,
    page_url: typeof window !== 'undefined' ? window.location.href : null,
    assigned_to: null,
    notes: null,
    read_at: null,
    replied_at: null
  }

  const { error } = await supabase
    .from('form_submissions')
    .insert([submissionData])

  if (error) {
    console.error('Error submitting partnership form:', error)
    throw new Error('Failed to submit partnership form')
  }
}

export async function submitContactForm(formData: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  jobTitle?: string
  message: string
  hearAboutUs?: string
  agreeToTerms: boolean
  agreeToMarketing: boolean
}): Promise<void> {
  const supabase = createClient()

  const submissionData = {
    form_type: 'contact',
    status: 'new',
    priority: 'medium',
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone: formData.phone || null,
    company: formData.company || null,
    job_title: formData.jobTitle || null,
    form_data: {
      message: formData.message,
      hearAboutUs: formData.hearAboutUs,
      agreeToTerms: formData.agreeToTerms,
      agreeToMarketing: formData.agreeToMarketing,
      submittedAt: new Date().toISOString()
    },
    ip_address: null,
    user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
    referrer_url: typeof window !== 'undefined' ? document.referrer : null,
    page_url: typeof window !== 'undefined' ? window.location.href : null,
    assigned_to: null,
    notes: null,
    read_at: null,
    replied_at: null
  }

  const { error } = await supabase
    .from('form_submissions')
    .insert([submissionData])

  if (error) {
    console.error('Error submitting contact form:', error)
    throw new Error('Failed to submit contact form')
  }
}

export async function submitDemoRequest(formData: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company: string
  jobTitle: string
  useCase: string
  timeline: string
  teamSize: string
  additionalInfo?: string
  hearAboutUs?: string
  agreeToTerms: boolean
  agreeToMarketing: boolean
}): Promise<void> {
  const supabase = createClient()

  const submissionData = {
    form_type: 'demo',
    status: 'new',
    priority: 'high',
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone: formData.phone || null,
    company: formData.company,
    job_title: formData.jobTitle,
    form_data: {
      useCase: formData.useCase,
      timeline: formData.timeline,
      teamSize: formData.teamSize,
      additionalInfo: formData.additionalInfo,
      hearAboutUs: formData.hearAboutUs,
      agreeToTerms: formData.agreeToTerms,
      agreeToMarketing: formData.agreeToMarketing,
      submittedAt: new Date().toISOString()
    },
    ip_address: null,
    user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
    referrer_url: typeof window !== 'undefined' ? document.referrer : null,
    page_url: typeof window !== 'undefined' ? window.location.href : null,
    assigned_to: null,
    notes: null,
    read_at: null,
    replied_at: null
  }

  const { error } = await supabase
    .from('form_submissions')
    .insert([submissionData])

  if (error) {
    console.error('Error submitting demo request:', error)
    throw new Error('Failed to submit demo request')
  }
}
