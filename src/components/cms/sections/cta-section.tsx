"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/layout/container'
import { Section } from '@/components/ui/layout/section'
import { H2, P } from '@/components/ui/typography'
import { PageSection } from '@/types/cms'
import Link from 'next/link'

interface CTASectionProps {
  data: Record<string, unknown>
  section?: PageSection
}

export function CTASection({ data, section }: CTASectionProps) {
  const title = typeof data?.title === 'string' ? data.title : "Ready to Get Started?"
  const description = typeof data?.description === 'string' ? data.description : "Take the next step with Elevation AI and transform your business operations."
  const ctaButtons = Array.isArray(data?.ctaButtons) ? data.ctaButtons as Record<string, unknown>[] : [
    { text: "Get Started", href: "/demo", variant: "default" },
    { text: "Learn More", href: "/platform", variant: "outline" }
  ]
  const backgroundColor = typeof data?.backgroundColor === 'string' ? data.backgroundColor : "bg-gradient-to-r from-primary/10 to-primary/5"
  const textAlign = typeof data?.textAlign === 'string' ? data.textAlign : "center"

  return (
    <Section paddingY="xl" className={`relative ${backgroundColor}`}>
      <Container size="lg">
        <div className={`space-y-6 ${textAlign === 'center' ? 'text-center' : 'text-left'}`}>
          {/* Content */}
          <div className="space-y-4">
            <H2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {title}
            </H2>
            {description && (
              <P className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {description}
              </P>
            )}
          </div>

          {/* CTA Buttons */}
          {ctaButtons && ctaButtons.length > 0 && (
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${textAlign === 'center' ? 'justify-center' : 'justify-start'}`}>
              {ctaButtons.map((button: Record<string, unknown>, index: number) => {
                const buttonVariant = typeof button.variant === 'string' ? button.variant : "default"
                const buttonHref = typeof button.href === 'string' ? button.href : "/"
                const buttonText = typeof button.text === 'string' ? button.text : "Button"
                
                return (
                  <Button
                    key={index}
                    asChild
                    variant={buttonVariant as "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"}
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Link href={buttonHref}>
                      {buttonText}
                    </Link>
                  </Button>
                )
              })}
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
