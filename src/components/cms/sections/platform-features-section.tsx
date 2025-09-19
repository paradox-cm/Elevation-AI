"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/layout/container'
import { Section } from '@/components/ui/layout/section'
import { H1, P, BodyLarge } from '@/components/ui/typography'
import Icon from '@/components/ui/icon'
import Link from 'next/link'
import { useMediaQuery } from '@/hooks/use-media-query'
import { PageSection } from '@/types/cms'

interface PlatformFeaturesSectionProps {
  data: {
    title?: string
    description?: string
    features?: Array<{
      title: string
      description: string
      icon: string
    }>
  }
  section?: PageSection
}

export function PlatformFeaturesSection({ data, section }: PlatformFeaturesSectionProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  
  const features = data.features || []

  return (
    <Section paddingY="lg" className="relative">
      <Container size="2xl">
        <div className="space-y-6 sm:space-y-8 lg:space-y-12">
          {/* Mobile Layout */}
          {!isDesktop && (
            <div className="block lg:hidden -mx-4 sm:-mx-6 lg:-mx-8 mb-0">
              {/* Section Headline */}
              <div className="text-left lg:text-center space-y-3 lg:space-y-2 mb-4 sm:mb-6 md:mb-8 pl-4 sm:pl-6 lg:pl-8">
                <H1>{data.title || 'The Agentic Platform'}</H1>
                <P className="text-muted-foreground max-w-4xl text-base sm:text-base md:text-lg md:text-xl">
                  {data.description || 'So your business moves faster, thinks smarter, and stays ahead.'}
                </P>
              </div>
              <div className="overflow-x-auto pb-1">
                <div className="flex gap-4 w-max pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="w-[320px] sm:w-[380px] flex-shrink-0"
                    >
                      <Card className="h-[500px] sm:h-[550px] md:h-[600px] xl:h-[650px] 2xl:h-[700px] border-border/50 transition-colors duration-300 flex flex-col gap-0">
                        <CardHeader className="pt-4 pb-4 px-4 flex-shrink-0">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon name={feature.icon} className="text-blue-600" />
                            </div>
                            <CardTitle className="text-base font-semibold">{feature.title}</CardTitle>
                          </div>
                          <BodyLarge className="text-muted-foreground text-sm leading-relaxed">
                            {feature.description}
                          </BodyLarge>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col pb-6 xl:pb-8 2xl:pb-10 px-4 min-h-0">
                          {/* Spacer to push animation to bottom */}
                          <div className="flex-1"></div>
                          {/* Animation Container */}
                          <div className="rounded-xl flex items-center justify-center border border-border/50 relative overflow-hidden mb-2 h-[220px] sm:h-[260px] md:h-[300px]">
                            <div className="text-muted-foreground text-center">
                              <Icon name={feature.icon} size="xl" className="mx-auto mb-2" />
                              <p className="text-sm">Platform Feature</p>
                            </div>
                          </div>
                          {/* Learn more Link */}
                          <div className="mt-4 text-left">
                            <Link 
                              href="/website/platform" 
                              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200"
                            >
                              Learn more →
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Desktop Layout - Simplified for CMS */}
          {isDesktop && (
            <div className="hidden lg:block">
              {/* Section Headline */}
              <div className="text-center space-y-3 lg:space-y-2 mb-4 lg:mb-6 xl:mb-8">
                <H1>{data.title || 'The Agentic Platform'}</H1>
                <P className="text-muted-foreground max-w-4xl mx-auto">
                  {data.description || 'So your business moves faster, thinks smarter, and stays ahead.'}
                </P>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="border-border/50 transition-colors duration-300 h-full">
                    <CardHeader className="pt-6 pb-4 px-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg flex items-center justify-center">
                            <Icon name={feature.icon} size="xl" className="text-blue-600" />
                          </div>
                          <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                        </div>
                        <BodyLarge className="text-muted-foreground text-base leading-relaxed">
                          {feature.description}
                        </BodyLarge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-6 px-6">
                      <div className="h-[200px] rounded-lg flex items-center justify-center border border-border/50 relative overflow-hidden">
                        <div className="text-muted-foreground text-center">
                          <Icon name={feature.icon} size="xl" className="mx-auto mb-2" />
                          <p className="text-sm">Platform Feature</p>
                        </div>
                      </div>
                      {/* Learn more Link */}
                      <div className="mt-4 text-left">
                        <Link 
                          href="/website/platform" 
                          className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200"
                        >
                          Learn more →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
