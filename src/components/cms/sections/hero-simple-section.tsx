"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/layout/container'
import { Section } from '@/components/ui/layout/section'
import { H1, P } from '@/components/ui/typography'
import { PageSection } from '@/types/cms'
import Link from 'next/link'

interface HeroSimpleSectionProps {
  data: any
  section: PageSection
}

export function HeroSimpleSection({ data, section }: HeroSimpleSectionProps) {
  const {
    title = "Welcome to Elevation AI",
    description = "Your platform description here",
    ctaButtons = [
      { text: "Get Started", href: "/demo", variant: "default" }
    ]
  } = data

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
              {ctaButtons.map((button: any, index: number) => (
                <Button
                  key={index}
                  asChild
                  variant={button.variant || "default"}
                  size="lg"
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
