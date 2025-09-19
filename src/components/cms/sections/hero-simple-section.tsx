"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/layout/container'
import { Section } from '@/components/ui/layout/section'
import { H1, P } from '@/components/ui/typography'
import { PageSection } from '@/types/cms'
import Link from 'next/link'

interface HeroSimpleSectionProps {
  data: Record<string, unknown>
  section?: PageSection
}

export function HeroSimpleSection({ data, section }: HeroSimpleSectionProps) {
  const title = typeof data?.title === 'string' ? data.title : "Welcome to Elevation AI"
  const description = typeof data?.description === 'string' ? data.description : "Your platform description here"
  const ctaButtons = Array.isArray(data?.ctaButtons) ? data.ctaButtons as Record<string, unknown>[] : [
    { text: "Get Started", href: "/demo", variant: "default" }
  ]

  return (
    <Section paddingY="xl" className="flex items-center min-h-[60vh]">
      <Container size="lg">
        <div className="text-center space-y-6">
          <H1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            {title}
          </H1>
          <P className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </P>
          {ctaButtons && ctaButtons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
