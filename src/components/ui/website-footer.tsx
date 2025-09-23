"use client"

import Link from "next/link"
import { useState } from "react"
import { Container } from "@/components/ui/layout/container"
import { H3, H4, BodySmall } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/ui/logo"
import { FormStatus, useFormStatus } from "@/components/ui/form-status"
import Icon from "@/components/ui/icon"

// Newsletter Form Component
function NewsletterForm() {
  const [email, setEmail] = useState("")
  const { status, message, title, setLoading, setSuccess, setError, reset } = useFormStatus()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError("Email Required", "Please enter your email address")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid Email", "Please enter a valid email address")
      return
    }

    setLoading("Subscribing...")

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate success/error randomly for demo
      if (Math.random() > 0.1) {
        setSuccess("Successfully Subscribed!", "Thank you for subscribing to our newsletter. You'll receive updates soon.")
        setEmail("")
        // Auto-reset after 5 seconds
        setTimeout(() => reset(), 5000)
      } else {
        setError("Subscription Failed", "Unable to subscribe at this time. Please try again later.")
      }
    } catch (error) {
      setError("Subscription Failed", "Something went wrong. Please try again.")
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:flex-shrink-0">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 h-10 border border-border rounded-md bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          disabled={status === "loading"}
        />
        <Button 
          type="submit" 
          variant="secondary" 
          className="px-6 h-10"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Icon name="loader-2-line" className="w-4 h-4 mr-2 animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
      
      <FormStatus
        status={status}
        title={title}
        message={message}
        variant="inline"
        onDismiss={reset}
      />
    </div>
  )
}

export function WebsiteFooter() {
  return (
    <footer className="border-t border-muted bg-muted/30 transition-colors duration-300">
      <Container size="2xl" className="px-4 sm:px-6 lg:px-8 lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <Logo width={120} height={21} />
              <BodySmall className="text-muted-foreground">
                The business orchestration platform.
              </BodySmall>
              {/* LinkedIn Icon */}
              <div className="pt-2">
                <Link 
                  href="https://www.linkedin.com/company/elevationai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-200"
                  aria-label="Follow Elevation AI on LinkedIn"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Platform & People */}
            <div className="space-y-6">
            {/* Platform */}
            <div className="space-y-4">
              <Link href="/website/platform" className="block">
                <H4 className="hover:text-primary transition-colors">Platform</H4>
              </Link>
              <ul className="space-y-2">
                <li><Link href="/website/platform#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="/website/platform#security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Security</Link></li>
                <li><Link href="/website/platform#integrations" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Integrations</Link></li>
              </ul>
              </div>
              
              {/* People */}
              <div className="space-y-4">
                <Link href="/website/people-concierge" className="block">
                  <H4 className="hover:text-primary transition-colors">People</H4>
                </Link>
                <ul className="space-y-2">
                  <li><Link href="/website/people-concierge" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Concierge Team</Link></li>
                  <li><Link href="/website/people-experts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Expert Network</Link></li>
                  <li><Link href="/website/people-partners" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Partner Network</Link></li>
                </ul>
              </div>
            </div>
            
            {/* Solutions */}
            <div className="space-y-4">
              <Link href="/website/solutions" className="block">
                <H4 className="hover:text-primary transition-colors">Solutions</H4>
              </Link>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2">By Industry</h4>
                  <ul className="space-y-2">
                    <li><Link href="/website/solutions?open=private-markets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Private Market Organizations</Link></li>
                    <li><Link href="/website/solutions?open=public-markets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Public Market Organizations</Link></li>
                    <li><Link href="/website/solutions?open=banks" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Banks</Link></li>
                    <li><Link href="/website/solutions?open=enterprise" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Enterprise</Link></li>
                    <li><Link href="/website/solutions?open=government" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Government</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2">By Stage</h4>
                  <ul className="space-y-2">
                    <li><Link href="/website/solutions?open=creating-venture" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Creating a New Venture</Link></li>
                    <li><Link href="/website/solutions?open=scaling-venture" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Scaling a Venture</Link></li>
                    <li><Link href="/website/solutions?open=exiting-venture" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Exiting a Venture</Link></li>
                    <li><Link href="/website/solutions?open=post-ipo-growth" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Post-IPO Growth</Link></li>
                    <li><Link href="/website/solutions?open=family-office" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Post-Exit Family Office</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Resources */}
            <div className="space-y-4">
              <H4>Resources</H4>
              <ul className="space-y-2">
                <li><Link href="/website/partners" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Partners</Link></li>
                <li><Link href="/website/investors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Investors</Link></li>
                <li><Link href="/website/developers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Developers & Platforms</Link></li>
                <li><Link href="/website/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="/website/knowledge-base" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Knowledge Base</Link></li>
              </ul>
            </div>
            
            {/* Company */}
            <div className="space-y-4">
              <H4>Company</H4>
              <ul className="space-y-2">
                <li><Link href="/website/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/website/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="/website/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="/website/press" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Press</Link></li>
                <li><Link href="/website/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <Separator className="mt-20 lg:mt-24 mb-4 lg:mb-6 bg-border/60" />
          
          {/* Newsletter Section */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
            {/* Newsletter Content */}
            <div className="text-left space-y-4 flex-1">
              <H3 className="text-xs font-medium uppercase tracking-wider text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs">Stay Updated</H3>
              <BodySmall className="text-muted-foreground">
                Get the latest insights on agentic AI, platform updates, and industry trends delivered to your inbox.
              </BodySmall>
            </div>
            
            {/* Newsletter Form */}
            <NewsletterForm />
          </div>
          
          <Separator className="my-4 lg:my-6 bg-border/60" />
          
          <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-4 pb-0 md:pb-3">
            <BodySmall className="text-muted-foreground text-left">
              © 2025 Elevation AI. All rights reserved.
            </BodySmall>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
