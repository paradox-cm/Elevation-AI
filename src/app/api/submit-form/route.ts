import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { formType, formData, ...contactInfo } = body

    // Validate required fields
    if (!formType || !contactInfo.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Insert form submission
    const { data, error } = await supabase
      .from('form_submissions')
      .insert({
        form_type: formType,
        first_name: contactInfo.firstName || contactInfo.first_name,
        last_name: contactInfo.lastName || contactInfo.last_name,
        email: contactInfo.email,
        phone: contactInfo.phone,
        company: contactInfo.company,
        job_title: contactInfo.jobTitle || contactInfo.job_title,
        form_data: formData || {},
        ip_address: request.ip || request.headers.get('x-forwarded-for'),
        user_agent: request.headers.get('user-agent'),
        referrer_url: request.headers.get('referer'),
        page_url: request.headers.get('origin'),
        status: 'new',
        priority: determinePriority(formType, formData)
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        id: data.id,
        message: 'Form submitted successfully' 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function determinePriority(formType: string, formData: Record<string, unknown>): string {
  // Set priority based on form type and content
  switch (formType) {
    case 'consultation':
      return 'high'
    case 'demo':
      return 'medium'
    case 'contact':
      // Check if it's a partnership or urgent inquiry
      if (formData?.inquiryType === 'Partnership' || formData?.inquiryType === 'Urgent') {
        return 'high'
      }
      return 'medium'
    case 'newsletter':
      return 'low'
    case 'signup':
      return 'low'
    default:
      return 'medium'
  }
}
