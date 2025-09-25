"use client"

import React from 'react'
import { Container } from '@/components/ui/layout/container'
import { Section } from '@/components/ui/layout/section'
import { H3 } from '@/components/ui/typography'
import { PageSection } from '@/types/cms'
import Image from 'next/image'

interface LogoCarouselSectionProps {
  data: Record<string, unknown> | null | undefined
  section?: PageSection
}

export function LogoCarouselSection({ data, section }: LogoCarouselSectionProps) {
  const title = typeof data?.title === 'string' ? data.title : "Trusted By"
  const logos = Array.isArray(data?.logos) ? data.logos as Record<string, unknown>[] : [
    { name: "Company 1", logo: "/images/logos/company1.svg" },
    { name: "Company 2", logo: "/images/logos/company2.svg" }
  ]

  return (
    <Section paddingY="lg">
      <Container size="2xl">
        <div className="space-y-8">
          {title && (
            <div className="text-center">
              <H3 className="text-sm sm:text-lg text-muted-foreground">{title}</H3>
            </div>
          )}
          <div className="flex items-center justify-center space-x-8 overflow-x-auto">
            {logos.map((logo: Record<string, unknown>, index: number) => {
              const logoSrc = typeof logo.logo === 'string' ? logo.logo : "/images/logos/default.svg"
              const logoName = typeof logo.name === 'string' ? logo.name : "Company"
              
              return (
                <div key={index} className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">
                  <Image
                    src={logoSrc}
                    alt={logoName}
                    width={120}
                    height={60}
                    className="h-8 w-auto"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
