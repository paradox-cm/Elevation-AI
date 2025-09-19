"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/layout/container'
import { Section } from '@/components/ui/layout/section'
import { H1, P } from '@/components/ui/typography'
import Icon from '@/components/ui/icon'
import Link from 'next/link'

interface ApproachCardsSectionProps {
  data: {
    title?: string
    description?: string
    approaches?: Array<{
      title: string
      description: string
      icon: string
      href: string
    }>
  }
  section?: any
}

export function ApproachCardsSection({ data, section }: ApproachCardsSectionProps) {
  const approaches = data.approaches || []

  return (
    <Section paddingY="lg" className="bg-muted/30">
      <Container size="2xl">
        <div className="space-y-8 lg:space-y-12">
          {/* Section Header */}
          <div className="text-left space-y-3 lg:space-y-2 max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl lg:mx-0">
            <H1>{data.title || 'More Than a Platform.'}</H1>
            <P className="text-muted-foreground max-w-4xl text-base sm:text-base md:text-lg md:text-xl">
              {data.description || 'Your partner at every step.'}
            </P>
          </div>

          {/* Approach Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {approaches.map((approach, index) => (
              <Link key={index} href={approach.href} className="block">
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50 transition-colors duration-300 relative overflow-hidden cursor-pointer h-full">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardHeader className="pt-3 px-4 pb-3 lg:pt-4 lg:px-6 lg:pb-4 xl:pt-5 lg:px-6 xl:pb-5 2xl:pt-6 2xl:px-8 2xl:pb-6 relative z-10">
                    <div className="space-y-4 lg:space-y-5 xl:space-y-6">
                      {/* Icon and Title Row */}
                      <div className="flex items-center gap-3 lg:gap-4">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                          {approach.icon === "elevation-ai-logo" ? (
                            <img 
                              src="/images/Favicon-Stroke.png" 
                              alt="Elevation AI" 
                              className="w-6 h-6 lg:w-7 lg:h-7"
                            />
                          ) : (
                            <Icon name={approach.icon} size="2xl" className="text-primary" />
                          )}
                        </div>
                        <CardTitle className="text-base font-semibold">{approach.title}</CardTitle>
                      </div>
                      
                      {/* Description */}
                      <P className="text-muted-foreground leading-relaxed">
                        {approach.description}
                      </P>
                      
                      {/* View People Link */}
                      <div className="pt-2">
                        <span className="inline-flex items-center text-primary group">
                          <span className="group-hover:translate-x-1 transition-transform duration-200">View People →</span>
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
