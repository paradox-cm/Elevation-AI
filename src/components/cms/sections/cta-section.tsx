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
  const {
    title = "Ready to Get Started?",
    description = "Take the next step with Elevation AI and transform your business operations.",
    ctaButtons = [
      { text: "Get Started", href: "/demo", variant: "default" },
      { text: "Learn More", href: "/platform", variant: "outline" }
    ],
    backgroundColor = "bg-gradient-to-r from-primary/10 to-primary/5",
    textAlign = "center"
  } = data

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
              {ctaButtons.map((button: Record<string, unknown>, index: number) => (
                <Button
                  key={index}
                  asChild
                  variant={button.variant || "default"}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Link href={button.href}>
                    {button.text}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
