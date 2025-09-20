"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { H1, H2, H3, P, BodyLarge, BodySmall } from '@/components/ui/typography'
import { 
  Eye, 
  Smartphone, 
  Monitor, 
  Mail, 
  Copy, 
  Send,
  ExternalLink,
  Sun,
  Moon
} from 'lucide-react'
import Icon from '@/components/ui/icon'
import { Logo } from '@/components/ui/logo'
import { useTheme } from 'next-themes'

interface EmailTemplate {
  id: string
  name: string
  description: string
  category: 'confirmation' | 'marketing' | 'notification' | 'transactional'
  status: 'active' | 'draft' | 'archived'
  lastModified: string
  usage: number
  icon: string
  color: string
}

interface EmailTemplatePreviewProps {
  template: EmailTemplate
}

// Sample email content based on template type
const getEmailContent = (template: EmailTemplate) => {
  const baseContent = {
    subject: '',
    preview: '',
    content: ''
  }

  switch (template.id) {
    case 'newsletter-welcome':
      return {
        subject: 'Welcome to Elevation AI Newsletter!',
        preview: 'Thank you for subscribing to our newsletter. Get ready for the latest insights on agentic AI...',
        content: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #111827;">
            <!-- Header -->
            <div style="background-color: #06b6d4; padding: 32px; text-align: left;">
              <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 32px; margin-bottom: 16px; filter: brightness(0) invert(1);">
              <div style="color: white; font-size: 24px; font-weight: 700; margin-bottom: 8px;">Welcome to Elevation AI</div>
              <div style="color: rgba(255,255,255,0.9); font-size: 16px;">The business orchestration platform</div>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 32px;">
              <div style="margin-bottom: 24px;">
                <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin-bottom: 16px;">Hello [First Name],<br>Welcome to Our Newsletter!</h1>
                <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
                  Thank you for subscribing! You're now part of a community that's shaping the future of agentic AI and business automation.
                </p>
              </div>
              
              <div style="background-color: #ecfeff; border: 1px solid #a5f3fc; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <h2 style="color: #111827; font-size: 18px; font-weight: 600; margin-bottom: 16px; display: flex; align-items: center;">
                  <span style="width: 4px; height: 18px; background-color: #06b6d4; margin-right: 12px;"></span>
                  What to Expect
                </h2>
                <ul style="color: #111827; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 0; list-style: none;">
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Monthly insights on agentic AI trends and developments</span>
                  </li>
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Platform updates and new feature announcements</span>
                  </li>
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Industry best practices and real-world case studies</span>
                  </li>
                  <li style="margin-bottom: 0; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Exclusive content from our expert network</span>
                  </li>
                </ul>
              </div>
              
              <div style="margin: 32px 0;">
                <a href="#" style="background-color: #06b6d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">
                  Explore Our Platform
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 24px; text-align: left; border-top: 1px solid #e2e8f0;">
              <div style="margin-bottom: 12px;">
                <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 18px; margin-bottom: 8px;">
                <div style="color: #6b7280; font-size: 14px;">The business orchestration platform</div>
              </div>
              <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.5;">
                © 2025 Elevation AI. All rights reserved.<br>
                You received this email because you subscribed to our newsletter.
              </p>
              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                <p style="color: #9ca3af; font-size: 11px; margin: 0; line-height: 1.4;">
                  <a href="#" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a> from our newsletter | 
                  <a href="#" style="color: #6b7280; text-decoration: underline;">Update preferences</a> | 
                  <a href="#" style="color: #6b7280; text-decoration: underline;">View in browser</a>
                </p>
              </div>
            </div>
          </div>
        `
      }
    
    case 'contact-confirmation':
      return {
        subject: 'We received your message - Elevation AI',
        preview: 'Thank you for contacting us. We\'ll get back to you within 24 hours...',
        content: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #111827;">
            <!-- Header -->
            <div style="background-color: #10b981; padding: 32px; text-align: left;">
              <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 32px; margin-bottom: 16px; filter: brightness(0) invert(1);">
              <div style="color: white; font-size: 24px; font-weight: 700; margin-bottom: 8px;">Message Received</div>
              <div style="color: rgba(255,255,255,0.9); font-size: 16px;">We'll get back to you soon</div>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 32px;">
              <div style="margin-bottom: 24px;">
                <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin-bottom: 16px;">Hello [First Name],<br>Thank You for Contacting Us!</h1>
                <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
                  We've received your message and our team will review it carefully. You can expect to hear from us within 24 hours.
                </p>
              </div>
              
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <h2 style="color: #111827; font-size: 18px; font-weight: 600; margin-bottom: 16px; display: flex; align-items: center;">
                  <span style="width: 4px; height: 18px; background-color: #10b981; margin-right: 12px;"></span>
                  What happens next?
                </h2>
                <ul style="color: #111827; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 0; list-style: none;">
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Our team will review your inquiry and requirements</span>
                  </li>
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>We'll assign it to the appropriate specialist</span>
                  </li>
                  <li style="margin-bottom: 0; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>You'll receive a detailed response within 24 hours</span>
                  </li>
                </ul>
              </div>
              
              <div style="margin: 32px 0;">
                <a href="#" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">
                  Visit Our Website
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 24px; text-align: left; border-top: 1px solid #e2e8f0;">
              <div style="margin-bottom: 12px;">
                <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 18px; margin-bottom: 8px;">
                <div style="color: #6b7280; font-size: 14px;">The business orchestration platform</div>
              </div>
              <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.5;">
                © 2025 Elevation AI. All rights reserved.<br>
                This is an automated confirmation email.
              </p>
            </div>
          </div>
        `
      }
    
    case 'demo-request-confirmation':
      return {
        subject: 'Demo Request Confirmed - Elevation AI',
        preview: 'Thank you for requesting a demo. Our team will contact you within 24 hours to schedule...',
        content: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #111827;">
            <!-- Header -->
            <div style="background-color: #8b5cf6; padding: 32px; text-align: left;">
              <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 32px; margin-bottom: 16px; filter: brightness(0) invert(1);">
              <div style="color: white; font-size: 24px; font-weight: 700; margin-bottom: 8px;">Demo Request Confirmed</div>
              <div style="color: rgba(255,255,255,0.9); font-size: 16px;">Let's show you what's possible</div>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 32px;">
              <div style="margin-bottom: 24px;">
                <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin-bottom: 16px;">Hello [First Name],<br>Your Demo is Scheduled!</h1>
                <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
                  Thank you for your interest in Elevation AI! Our team will contact you within 24 hours to schedule your personalized demo.
                </p>
              </div>
              
              <div style="background-color: #faf5ff; border: 1px solid #d8b4fe; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <h2 style="color: #111827; font-size: 18px; font-weight: 600; margin-bottom: 16px; display: flex; align-items: center;">
                  <span style="width: 4px; height: 18px; background-color: #8b5cf6; margin-right: 12px;"></span>
                  What to expect in your demo:
                </h2>
                <ul style="color: #111827; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 0; list-style: none;">
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Personalized walkthrough of our platform</span>
                  </li>
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Real-world use cases relevant to your industry</span>
                  </li>
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Q&A session with our product experts</span>
                  </li>
                  <li style="margin-bottom: 0; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Custom recommendations for your business</span>
                  </li>
                </ul>
              </div>
              
              <div style="margin: 32px 0;">
                <a href="#" style="background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">
                  Prepare for Your Demo
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 24px; text-align: left; border-top: 1px solid #e2e8f0;">
              <div style="margin-bottom: 12px;">
                <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 18px; margin-bottom: 8px;">
                <div style="color: #6b7280; font-size: 14px;">The business orchestration platform</div>
              </div>
              <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.5;">
                © 2025 Elevation AI. All rights reserved.<br>
                This is an automated confirmation email.
              </p>
            </div>
          </div>
        `
      }
    
    case 'partnership-application':
      return {
        subject: 'Partnership Application Received - Elevation AI',
        preview: 'Thank you for your partnership application. We\'ll review it carefully and get back to you...',
        content: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #111827;">
            <!-- Header -->
            <div style="background-color: #f59e0b; padding: 32px; text-align: left;">
              <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 32px; margin-bottom: 16px; filter: brightness(0) invert(1);">
              <div style="color: white; font-size: 24px; font-weight: 700; margin-bottom: 8px;">Partnership Application Received</div>
              <div style="color: rgba(255,255,255,0.9); font-size: 16px;">Let's build something great together</div>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 32px;">
              <div style="margin-bottom: 24px;">
                <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin-bottom: 16px;">Hello [First Name],<br>Thank You for Your Interest!</h1>
                <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
                  We've received your partnership application and our team will review it carefully. We'll get back to you within 2-3 business days with next steps.
                </p>
              </div>
              
              <div style="background-color: #fffbeb; border: 1px solid #fed7aa; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <h2 style="color: #111827; font-size: 18px; font-weight: 600; margin-bottom: 16px; display: flex; align-items: center;">
                  <span style="width: 4px; height: 18px; background-color: #f59e0b; margin-right: 12px;"></span>
                  Our review process:
                </h2>
                <ul style="color: #111827; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 0; list-style: none;">
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Initial review of your application and background</span>
                  </li>
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Assessment of partnership fit and alignment</span>
                  </li>
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Internal discussion with our partnership team</span>
                  </li>
                  <li style="margin-bottom: 0; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Follow-up with next steps and timeline</span>
                  </li>
                </ul>
              </div>
              
              <div style="margin: 32px 0;">
                <a href="#" style="background-color: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">
                  Learn More About Partnerships
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 24px; text-align: left; border-top: 1px solid #e2e8f0;">
              <div style="margin-bottom: 12px;">
                <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 18px; margin-bottom: 8px;">
                <div style="color: #6b7280; font-size: 14px;">The business orchestration platform</div>
              </div>
              <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.5;">
                © 2025 Elevation AI. All rights reserved.<br>
                This is an automated confirmation email.
              </p>
            </div>
          </div>
        `
      }
    
    case 'consultation-request':
      return {
        subject: 'Consultation Request Confirmed - Elevation AI',
        preview: 'Thank you for your consultation request. Our team will contact you within 24 hours...',
        content: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #111827;">
            <!-- Header -->
            <div style="background-color: #6366f1; padding: 32px; text-align: left;">
              <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 32px; margin-bottom: 16px; filter: brightness(0) invert(1);">
              <div style="color: white; font-size: 24px; font-weight: 700; margin-bottom: 8px;">Consultation Request Confirmed</div>
              <div style="color: rgba(255,255,255,0.9); font-size: 16px;">Let's discuss your needs</div>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 32px;">
              <div style="margin-bottom: 24px;">
                <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin-bottom: 16px;">Hello [First Name],<br>Thank You for Your Request!</h1>
                <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
                  We've received your consultation request and our team will contact you within 24 hours to schedule your personalized consultation.
                </p>
              </div>
              
              <div style="background-color: #eef2ff; border: 1px solid #c7d2fe; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <h2 style="color: #111827; font-size: 18px; font-weight: 600; margin-bottom: 16px; display: flex; align-items: center;">
                  <span style="width: 4px; height: 18px; background-color: #6366f1; margin-right: 12px;"></span>
                  What to expect in your consultation:
                </h2>
                <ul style="color: #111827; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 0; list-style: none;">
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>In-depth discussion of your business needs</span>
                  </li>
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Custom solution recommendations</span>
                  </li>
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Implementation timeline and next steps</span>
                  </li>
                  <li style="margin-bottom: 0; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Q&A session with our experts</span>
                  </li>
                </ul>
              </div>
              
              <div style="margin: 32px 0;">
                <a href="#" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">
                  Prepare for Your Consultation
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 24px; text-align: left; border-top: 1px solid #e2e8f0;">
              <div style="margin-bottom: 12px;">
                <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 18px; margin-bottom: 8px;">
                <div style="color: #6b7280; font-size: 14px;">The business orchestration platform</div>
              </div>
              <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.5;">
                © 2025 Elevation AI. All rights reserved.<br>
                This is an automated confirmation email.
              </p>
            </div>
          </div>
        `
      }
    
    case 'account-created':
      return {
        subject: 'Welcome to Elevation AI - Your Account is Ready!',
        preview: 'Welcome to Elevation AI! Your account has been created and you can now access our platform...',
        content: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #111827;">
            <!-- Header -->
            <div style="background-color: #3b82f6; padding: 32px; text-align: left;">
              <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 32px; margin-bottom: 16px; filter: brightness(0) invert(1);">
              <div style="color: white; font-size: 24px; font-weight: 700; margin-bottom: 8px;">Welcome to Elevation AI</div>
              <div style="color: rgba(255,255,255,0.9); font-size: 16px;">Your account is ready!</div>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 32px;">
              <div style="margin-bottom: 24px;">
                <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin-bottom: 16px;">Hello [First Name],<br>Your Account is Ready!</h1>
                <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
                  Welcome to Elevation AI! Your account has been created and you can now access our platform to start building with agentic AI.
                </p>
              </div>
              
              <div style="background-color: #dbeafe; border: 1px solid #93c5fd; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <h2 style="color: #111827; font-size: 18px; font-weight: 600; margin-bottom: 16px; display: flex; align-items: center;">
                  <span style="width: 4px; height: 18px; background-color: #3b82f6; margin-right: 12px;"></span>
                  Get started with:
                </h2>
                <ul style="color: #111827; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 0; list-style: none;">
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Access to our comprehensive platform</span>
                  </li>
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Pre-built agent templates and workflows</span>
                  </li>
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>24/7 support and documentation</span>
                  </li>
                  <li style="margin-bottom: 0; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Community access and expert network</span>
                  </li>
                </ul>
              </div>
              
              <div style="margin: 32px 0;">
                <a href="#" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">
                  Access Your Account
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 24px; text-align: left; border-top: 1px solid #e2e8f0;">
              <div style="margin-bottom: 12px;">
                <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 18px; margin-bottom: 8px;">
                <div style="color: #6b7280; font-size: 14px;">The business orchestration platform</div>
              </div>
              <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.5;">
                © 2025 Elevation AI. All rights reserved.<br>
                This is an automated welcome email.
              </p>
            </div>
          </div>
        `
      }
    
    case 'password-reset':
      return {
        subject: 'Reset Your Password - Elevation AI',
        preview: 'We received a request to reset your password. Click the link below to create a new password...',
        content: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #111827;">
            <!-- Header -->
            <div style="background-color: #ef4444; padding: 32px; text-align: left;">
              <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 32px; margin-bottom: 16px; filter: brightness(0) invert(1);">
              <div style="color: white; font-size: 24px; font-weight: 700; margin-bottom: 8px;">Password Reset Request</div>
              <div style="color: rgba(255,255,255,0.9); font-size: 16px;">Secure your account</div>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 32px;">
              <div style="margin-bottom: 24px;">
                <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin-bottom: 16px;">Hello [First Name],<br>Reset Your Password</h1>
                <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
                  We received a request to reset your password. Click the button below to create a new password. This link will expire in 24 hours.
                </p>
              </div>
              
              <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <h2 style="color: #111827; font-size: 18px; font-weight: 600; margin-bottom: 16px; display: flex; align-items: center;">
                  <span style="width: 4px; height: 18px; background-color: #ef4444; margin-right: 12px;"></span>
                  Security Information:
                </h2>
                <ul style="color: #111827; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 0; list-style: none;">
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>This link expires in 24 hours for security</span>
                  </li>
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>If you didn't request this, please ignore this email</span>
                  </li>
                  <li style="margin-bottom: 0; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Your password will remain unchanged until you reset it</span>
                  </li>
                </ul>
              </div>
              
              <div style="margin: 32px 0;">
                <a href="#" style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">
                  Reset Password
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 24px; text-align: left; border-top: 1px solid #e2e8f0;">
              <div style="margin-bottom: 12px;">
                <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 18px; margin-bottom: 8px;">
                <div style="color: #6b7280; font-size: 14px;">The business orchestration platform</div>
              </div>
              <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.5;">
                © 2025 Elevation AI. All rights reserved.<br>
                This is an automated security email.
              </p>
            </div>
          </div>
        `
      }
    
    case 'security-code':
      return {
        subject: 'Your Security Code - Elevation AI',
        preview: 'Your one-time security code for secure access to your Elevation AI account...',
        content: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #111827;">
            <!-- Header -->
            <div style="background-color: #ef4444; padding: 32px; text-align: left;">
              <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 32px; margin-bottom: 16px; filter: brightness(0) invert(1);">
              <div style="color: white; font-size: 24px; font-weight: 700; margin-bottom: 8px;">Security Code</div>
              <div style="color: rgba(255,255,255,0.9); font-size: 16px;">Secure your account access</div>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 32px;">
              <div style="margin-bottom: 24px;">
                <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin-bottom: 16px;">Hello [First Name],<br>Your Security Code</h1>
                <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
                  Use this one-time security code to complete your secure login or verification process. This code will expire in 10 minutes.
                </p>
              </div>
              
              <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <div style="background-color: #ffffff; border: 2px solid #ef4444; border-radius: 8px; padding: 20px; text-align: center; margin: 16px 0;">
                  <div style="font-family: 'Courier New', monospace; font-size: 20px; font-weight: 700; color: #ef4444; letter-spacing: 2px;">123456</div>
                </div>
                <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
                  Enter this code in the verification field
                </p>
              </div>
              
              <div style="margin: 32px 0;">
                <a href="#" style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">
                  Complete Verification
                </a>
              </div>
              
              <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 32px;">
                <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
                  <strong>Security Notice:</strong> If you didn't request this code, please ignore this email or contact our support team immediately. Never share this code with anyone.
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 24px; text-align: left; border-top: 1px solid #e2e8f0;">
              <div style="margin-bottom: 12px;">
                <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 18px; margin-bottom: 8px;">
                <div style="color: #6b7280; font-size: 14px;">The business orchestration platform</div>
              </div>
              <div style="color: #9ca3af; font-size: 12px; line-height: 1.5;">
                <p style="margin: 0 0 8px 0;">This is an automated security email.</p>
                <p style="margin: 0;">This code expires in 10 minutes for your security.</p>
              </div>
            </div>
          </div>
        `
      }
    
    case 'monthly-digest':
      return {
        subject: 'Monthly Digest - Elevation AI Platform Updates',
        preview: 'Your monthly summary of Elevation AI platform updates, new features, and industry insights...',
        content: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #111827;">
            <!-- Header -->
            <div style="background-color: #8b5cf6; padding: 32px; text-align: left;">
              <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 32px; margin-bottom: 16px; filter: brightness(0) invert(1);">
              <div style="color: white; font-size: 24px; font-weight: 700; margin-bottom: 8px;">Monthly Digest</div>
              <div style="color: rgba(255,255,255,0.9); font-size: 16px;">Platform updates and insights</div>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 32px;">
              <div style="margin-bottom: 24px;">
                <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin-bottom: 16px;">Hello [First Name],<br>Your Monthly Update</h1>
                <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
                  Here's what's new this month at Elevation AI. We've been busy building features and insights to help you succeed with agentic AI.
                </p>
              </div>
              
              <div style="background-color: #faf5ff; border: 1px solid #d8b4fe; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <h2 style="color: #111827; font-size: 18px; font-weight: 600; margin-bottom: 16px; display: flex; align-items: center;">
                  <span style="width: 4px; height: 18px; background-color: #8b5cf6; margin-right: 12px;"></span>
                  This Month's Highlights:
                </h2>
                <ul style="color: #111827; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 0; list-style: none;">
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>New agent templates for common business workflows</span>
                  </li>
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Enhanced analytics dashboard with real-time insights</span>
                  </li>
                  <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Industry case studies and success stories</span>
                  </li>
                  <li style="margin-bottom: 0; display: flex; align-items: flex-start;">
                    <span style="margin-right: 12px; font-weight: 600;">•</span>
                    <span>Upcoming webinars and training sessions</span>
                  </li>
                </ul>
              </div>
              
              <div style="margin: 32px 0;">
                <a href="#" style="background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">
                  View Full Update
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 24px; text-align: left; border-top: 1px solid #e2e8f0;">
              <div style="margin-bottom: 12px;">
                <img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 18px; margin-bottom: 8px;">
                <div style="color: #6b7280; font-size: 14px;">The business orchestration platform</div>
              </div>
              <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.5;">
                © 2025 Elevation AI. All rights reserved.<br>
                You received this email because you subscribed to our monthly digest.
              </p>
              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                <p style="color: #9ca3af; font-size: 11px; margin: 0; line-height: 1.4;">
                  <a href="#" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a> from our monthly digest | 
                  <a href="#" style="color: #6b7280; text-decoration: underline;">Update preferences</a> | 
                  <a href="#" style="color: #6b7280; text-decoration: underline;">View in browser</a>
                </p>
              </div>
            </div>
          </div>
        `
      }
    
    default:
      return {
        subject: 'Email from Elevation AI',
        preview: 'Thank you for your interest in Elevation AI...',
        content: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #111827;">
            <div style="padding: 32px; text-align: left;">
              <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin-bottom: 16px;">Hello [First Name],<br>Email Template Preview</h1>
              <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">This is a preview of the ${template.name} email template.</p>
            </div>
          </div>
        `
      }
  }
}

// Function to get theme-aware email content
function getThemeAwareEmailContent(template: EmailTemplate, theme: 'light' | 'dark') {
  const baseContent = getEmailContent(template)
  
  if (theme === 'dark') {
    // Convert light theme email to dark theme
    const darkContent = baseContent.content
      .replace(/background-color: #ffffff/g, 'background-color: #1a1a1a')
      .replace(/color: #111827/g, 'color: #ffffff')
      .replace(/color: #6b7280/g, 'color: #d1d5db')
      .replace(/color: #4b5563/g, 'color: #e5e7eb')
      .replace(/color: #9ca3af/g, 'color: #9ca3af')
      .replace(/background-color: #f8fafc/g, 'background-color: #2d2d2d')
      .replace(/border-top: 1px solid #e2e8f0/g, 'border-top: 1px solid #404040')
      .replace(/border: 1px solid #e2e8f0/g, 'border: 1px solid #404040')
      .replace(/border: 1px solid #bbf7d0/g, 'border: 1px solid #404040')
      .replace(/border: 1px solid #d8b4fe/g, 'border: 1px solid #404040')
      .replace(/border: 1px solid #fed7aa/g, 'border: 1px solid #404040')
      .replace(/border: 1px solid #c7d2fe/g, 'border: 1px solid #404040')
      .replace(/border: 1px solid #a5f3fc/g, 'border: 1px solid #404040')
      .replace(/border: 1px solid #fecaca/g, 'border: 1px solid #404040')
      .replace(/background-color: #ecfeff[^>]*>/g, 'background-color: rgba(8, 51, 68, 0.15); border: 1px solid #06b6d4; border-radius: 12px; padding: 24px; margin: 24px 0;">')
      .replace(/background-color: #f0fdf4[^>]*>/g, 'background-color: rgba(5, 46, 22, 0.15); border: 1px solid #10b981; border-radius: 12px; padding: 24px; margin: 24px 0;">')
      .replace(/background-color: #faf5ff[^>]*>/g, 'background-color: rgba(76, 29, 149, 0.15); border: 1px solid #8b5cf6; border-radius: 12px; padding: 24px; margin: 24px 0;">')
      .replace(/background-color: #fffbeb[^>]*>/g, 'background-color: rgba(120, 53, 15, 0.15); border: 1px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 24px 0;">')
      .replace(/background-color: #eef2ff[^>]*>/g, 'background-color: rgba(30, 27, 75, 0.15); border: 1px solid #6366f1; border-radius: 12px; padding: 24px; margin: 24px 0;">')
      .replace(/background-color: #dbeafe[^>]*>/g, 'background-color: rgba(30, 58, 138, 0.15); border: 1px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 24px 0;">')
      .replace(/background-color: #fef2f2[^>]*>/g, 'background-color: rgba(127, 29, 29, 0.15); border: 1px solid #ef4444; border-radius: 12px; padding: 24px; margin: 24px 0;">')
      .replace(/background-color: #f0fdf4/g, 'background-color: #1f2937')
      .replace(/background-color: #faf5ff/g, 'background-color: #1f2937')
      .replace(/background-color: #fffbeb/g, 'background-color: #1f2937')
      .replace(/background-color: #eef2ff/g, 'background-color: #1f2937')
      .replace(/background-color: #dbeafe/g, 'background-color: #1f2937')
      .replace(/background-color: #ecfeff/g, 'background-color: #1f2937')
      .replace(/background-color: #fef2f2/g, 'background-color: #1f2937')
      .replace(/color: #166534/g, 'color: #10b981')
      .replace(/color: #7c2d12/g, 'color: #8b5cf6')
      .replace(/color: #92400e/g, 'color: #f59e0b')
      .replace(/color: #3730a3/g, 'color: #6366f1')
      .replace(/color: #155e75/g, 'color: #06b6d4')
      .replace(/color: #dc2626/g, 'color: #ef4444')
      .replace(/color: #111827/g, 'color: #ffffff')
      .replace(/<img src="https:\/\/elevationai\.vercel\.app\/images\/branding\/E-AI\.Logo\.svg" alt="Elevation AI" style="height: 18px; margin-bottom: 8px;">/g, '<img src="https://elevationai.vercel.app/images/branding/E-AI.Logo.svg" alt="Elevation AI" style="height: 18px; margin-bottom: 8px; filter: brightness(0) invert(1);">')
      .replace(/color: #06b6d4; font-size: 32px;/g, 'color: #06b6d4; font-size: 32px;')
      .replace(/color: #10b981; font-size: 32px;/g, 'color: #10b981; font-size: 32px;')
      .replace(/color: #8b5cf6; font-size: 32px;/g, 'color: #8b5cf6; font-size: 32px;')
      .replace(/color: #f59e0b; font-size: 32px;/g, 'color: #f59e0b; font-size: 32px;')
      .replace(/color: #6366f1; font-size: 32px;/g, 'color: #6366f1; font-size: 32px;')
      .replace(/color: #3b82f6; font-size: 32px;/g, 'color: #3b82f6; font-size: 32px;')
      .replace(/color: #ef4444; font-size: 32px;/g, 'color: #ef4444; font-size: 32px;')
      .replace(/border-top: 1px solid #e2e8f0;/g, 'border-top: 1px solid #404040;')
    
    return {
      ...baseContent,
      content: darkContent
    }
  }
  
  return baseContent
}

export function EmailTemplatePreview({ template }: EmailTemplatePreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light')
  const { theme, systemTheme } = useTheme()

  // Update preview theme based on site theme
  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme
    setPreviewTheme(currentTheme === 'dark' ? 'dark' : 'light')
  }, [theme, systemTheme])

  const emailContent = getThemeAwareEmailContent(template, previewTheme)

  return (
    <div className="space-y-4">
      {/* Email Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Email Preview</CardTitle>
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'desktop' | 'mobile')}>
              <TabsList>
                <TabsTrigger value="desktop">
                  <Monitor className="h-4 w-4 mr-2" />
                  Desktop
                </TabsTrigger>
                <TabsTrigger value="mobile">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`border rounded-lg overflow-hidden ${
            viewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
          }`}>
            <div className="bg-muted/50 p-3 border-b">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-4 text-xs text-muted-foreground">
                  {emailContent.subject}
                </div>
              </div>
            </div>
            <div 
              className={`${
                previewTheme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white'
              } ${
                viewMode === 'mobile' ? 'max-h-96 overflow-y-auto' : 'max-h-[600px] overflow-y-auto'
              }`}
              dangerouslySetInnerHTML={{ __html: emailContent.content }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Icon name={template.icon} className={`h-5 w-5 ${template.color}`} />
                {template.name}
              </CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPreviewTheme(previewTheme === 'light' ? 'dark' : 'light')}
              >
                {previewTheme === 'light' ? (
                  <Moon className="h-4 w-4 mr-2" />
                ) : (
                  <Sun className="h-4 w-4 mr-2" />
                )}
                {previewTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy HTML
              </Button>
              <Button size="sm">
                <Send className="h-4 w-4 mr-2" />
                Send Test
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={previewTheme === 'dark' ? 'default' : 'secondary'}>
                  {previewTheme === 'dark' ? (
                    <>
                      <Moon className="h-3 w-3 mr-1" />
                      Dark Mode Preview
                    </>
                  ) : (
                    <>
                      <Sun className="h-3 w-3 mr-1" />
                      Light Mode Preview
                    </>
                  )}
                </Badge>
                <P className="text-xs text-muted-foreground">
                  Theme automatically syncs with site settings
                </P>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <H3 className="text-sm font-medium mb-1">Subject Line</H3>
                <P className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded">
                  {emailContent.subject}
                </P>
              </div>
              <div>
                <H3 className="text-sm font-medium mb-1">Preview Text</H3>
                <P className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded">
                  {emailContent.preview}
                </P>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Info */}
      <Card>
        <CardHeader>
          <CardTitle>Template Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <H3 className="text-sm font-medium mb-1">Category</H3>
              <Badge variant="secondary" className="capitalize">
                {template.category}
              </Badge>
            </div>
            <div>
              <H3 className="text-sm font-medium mb-1">Status</H3>
              <Badge className={
                template.status === 'active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : template.status === 'draft'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
              }>
                {template.status}
              </Badge>
            </div>
            <div>
              <H3 className="text-sm font-medium mb-1">Usage</H3>
              <P className="text-sm text-muted-foreground">{template.usage.toLocaleString()} sent</P>
            </div>
            <div>
              <H3 className="text-sm font-medium mb-1">Last Modified</H3>
              <P className="text-sm text-muted-foreground">{template.lastModified}</P>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
