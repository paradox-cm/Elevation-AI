"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/layout/container'
import { Section } from '@/components/ui/layout/section'
import { H1, P } from '@/components/ui/typography'
import Icon from '@/components/ui/icon'
import Link from 'next/link'
import { useMediaQuery } from '@/hooks/use-media-query'
import { PageSection } from '@/types/cms'

interface SolutionsCarouselSectionProps {
  data: {
    title?: string
    description?: string
    solutions?: Array<{
      title: string
      description: string
      icon: string
      href: string
    }>
    smallCards?: string[]
  }
  section?: PageSection
}

export function SolutionsCarouselSection({ data, section }: SolutionsCarouselSectionProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  
  const solutions = data.solutions || []
  const smallCards = data.smallCards || []

  return (
    <Section paddingY="lg">
      <Container size="2xl">
        <div className="space-y-8 lg:space-y-12">
          {/* Section Header */}
          <div className="text-left space-y-3 lg:space-y-2 max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl lg:mx-0">
            <H1>{data.title || 'Intelligent Solutions for Every Domain'}</H1>
            <P className="text-muted-foreground max-w-4xl text-base sm:text-base md:text-lg md:text-xl">
              {data.description || 'Powered by Elevation AI and guided by experts.'}
            </P>
          </div>

          {/* Solutions Carousel */}
          <div className="mt-8 lg:mt-12 -mx-4 sm:-mx-6 lg:-mx-8">
            {/* Mobile & Tablet Layout */}
            <div className="block lg:hidden pt-8">
              <div className="overflow-x-auto pb-1">
                <div className="flex gap-4 w-max pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8">
                  {solutions.map((solution, index) => (
                    <div
                      key={index}
                      className="w-[320px] sm:w-[380px] flex-shrink-0"
                    >
                      <Link href={solution.href} className="block">
                        <Card className="h-[300px] border-border/50 bg-transparent transition-colors duration-200 ease-out flex flex-col gap-0 hover:shadow-lg hover:-translate-y-1">
                          <CardHeader className="pt-4 pb-4 px-4 flex-shrink-0">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon name={solution.icon} size="lg" className="text-primary" />
                              </div>
                              <CardTitle className="text-base font-semibold">{solution.title}</CardTitle>
                            </div>
                            <P className="text-muted-foreground text-sm leading-relaxed">
                              {solution.description}
                            </P>
                          </CardHeader>
                        </Card>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {solutions.map((solution, index) => (
                  <Link key={index} href={solution.href} className="block">
                    <Card className="h-[300px] border-border/50 bg-transparent transition-colors duration-200 ease-out flex flex-col gap-0 hover:shadow-lg hover:-translate-y-1">
                      <CardHeader className="pt-6 pb-4 px-6 flex-shrink-0">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Icon name={solution.icon} size="xl" className="text-primary" />
                            </div>
                            <CardTitle className="text-xl font-semibold">{solution.title}</CardTitle>
                          </div>
                          <P className="text-muted-foreground text-base leading-relaxed">
                            {solution.description}
                          </P>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Small Cards */}
      {smallCards.length > 0 && (
        <div className="w-full mt-8 lg:mt-12">
          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="overflow-x-auto pb-1">
              <div className="flex gap-4 w-max pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8">
                {smallCards.map((card, index) => {
                  const cardIdMap: { [key: string]: string } = {
                    "Creating a Venture": "creating-venture",
                    "Scaling a Venture": "scaling-venture", 
                    "Exiting a Venture": "exiting-venture",
                    "Post-IPO Growth": "post-ipo-growth",
                    "Post-Exit/Family Office": "family-office"
                  }
                  
                  const cardId = cardIdMap[card] || ""
                  
                  return (
                    <Link
                      key={index}
                      href={`/website/solutions?open=${cardId}`}
                      className="group border border-border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-transparent min-h-[200px] flex flex-col w-[200px] sm:w-[220px] flex-shrink-0"
                    >
                      <div className="flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2 flex-shrink-0">
                          {card}
                        </h3>
                        <div className="flex-1 flex items-end">
                          <div className="text-left">
                            <h4 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                              →
                            </h4>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <Container size="2xl">
              <div className="grid grid-cols-5 gap-4">
                {smallCards.map((card, index) => {
                  const cardIdMap: { [key: string]: string } = {
                    "Creating a Venture": "creating-venture",
                    "Scaling a Venture": "scaling-venture", 
                    "Exiting a Venture": "exiting-venture",
                    "Post-IPO Growth": "post-ipo-growth",
                    "Post-Exit/Family Office": "family-office"
                  }
                  
                  const cardId = cardIdMap[card] || ""
                  
                  return (
                    <Link
                      key={index}
                      href={`/website/solutions?open=${cardId}`}
                      className="group border border-border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-transparent min-h-[320px] flex flex-col"
                    >
                      <div className="flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2 flex-shrink-0">
                          {card}
                        </h3>
                        <div className="flex-1 flex items-end">
                          <div className="text-left">
                            <h4 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                              →
                            </h4>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </Container>
          </div>
        </div>
      )}
    </Section>
  )
}
