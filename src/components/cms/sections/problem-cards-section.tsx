"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/layout/container'
import { Section } from '@/components/ui/layout/section'
import { H2, H3, P } from '@/components/ui/typography'
import { PageSection } from '@/types/cms'
import Icon from '@/components/ui/icon'
import { useMediaQuery } from '@/hooks/use-media-query'

interface ProblemCardsSectionProps {
  data: Record<string, unknown>
  section?: PageSection
}

export function ProblemCardsSection({ data, section }: ProblemCardsSectionProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  
  const title = typeof data?.title === 'string' ? data.title : "Problems We Solve"
  const subtitle = typeof data?.subtitle === 'string' ? data.subtitle : "Transform your business with intelligent solutions"
  const cards = Array.isArray(data?.cards) ? data.cards as Record<string, unknown>[] : [
    {
      title: "The Business Orchestration Platform",
      description: "Work from a single source of truth. Break down the walls between departments and tools, work from a unified platform where all your knowledge is connected, accessible, and actionable in one place.",
      icon: "database-2-line"
    },
    {
      title: "Intelligent Process Automation", 
      description: "Eliminate bottlenecks with context-aware automation, identify and automate the repetitive processes that hold you back—freeing people from busywork so they can focus on the high-value work.",
      icon: "brain-line"
    },
    {
      title: "Real-Time Business Intelligence",
      description: "Convert blind spots into detailed, actionable insights with a unified command center—delivering real-time visibility across operations and the confidence to act.",
      icon: "eye-line"
    },
    {
      title: "Future-Ready Strategic Advantage",
      description: "Mitigate strategic risk, lead the agentic era. Elevation AI is the platform and partnership which ensures you are not just keeping up, but leading the way in the new AI-powered business landscape.",
      icon: "shield-check-line"
    }
  ]

  return (
    <Section paddingY="xl" className="relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-600/10 to-blue-500/5"></div>
      
      <Container size="2xl" className="relative z-10">
        <div className="space-y-8 lg:space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <H2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {title}
            </H2>
            {subtitle && (
              <P className="text-muted-foreground text-lg max-w-3xl mx-auto">
                {subtitle}
              </P>
            )}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {cards.map((card: Record<string, unknown>, index: number) => {
              const cardIcon = typeof card.icon === 'string' ? card.icon : "database-2-line"
              const cardTitle = typeof card.title === 'string' ? card.title : "Card Title"
              const cardDescription = typeof card.description === 'string' ? card.description : "Card description"
              
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon 
                          name={cardIcon} 
                          className="h-6 w-6 text-primary" 
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <CardTitle className="text-lg sm:text-xl font-semibold leading-tight">
                          {cardTitle}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <P className="text-muted-foreground leading-relaxed">
                      {cardDescription}
                    </P>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
