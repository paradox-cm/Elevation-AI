"use client"

import React from 'react'
import { Container } from '@/components/ui/layout/container'
import { Section } from '@/components/ui/layout/section'
import { H3 } from '@/components/ui/typography'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { PageSection } from '@/types/cms'

interface IntroductionAccordionSectionProps {
  data: Record<string, unknown>
  section?: PageSection
}

export function IntroductionAccordionSection({ data, section }: IntroductionAccordionSectionProps) {
  const title = typeof data?.title === 'string' ? data.title : "The Agentic Era is Here"
  const accordionItems = Array.isArray(data?.accordionItems) ? data.accordionItems as Record<string, unknown>[] : [
    {
      title: "Your greatest asset is your knowledge",
      content: "Knowledge is the foundation of every successful business. It's what drives innovation, informs decisions, and creates competitive advantage.",
      value: "greatest-asset"
    }
  ]

  return (
    <Section paddingY="xl" className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-600/15 to-blue-500/10"></div>
      <Container size="2xl" className="relative z-10">
        <div className="grid grid-cols-12 gap-4 lg:gap-8 items-start">
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <H3>{title}</H3>
          </div>
          <div className="col-span-12 lg:col-span-8 space-y-4 pb-6">
            <Accordion type="single" collapsible className="w-full" defaultValue={typeof accordionItems[0]?.value === 'string' ? accordionItems[0].value : undefined}>
              {accordionItems.map((item: Record<string, unknown>, index: number) => {
                const itemValue = typeof item.value === 'string' ? item.value : `item-${index}`
                const itemTitle = typeof item.title === 'string' ? item.title : "Item"
                const itemContent = typeof item.content === 'string' ? item.content : "Content"
                
                return (
                  <AccordionItem key={itemValue} value={itemValue} className="border-b border-border/50">
                    <AccordionTrigger className="text-left text-sm md:text-base lg:text-lg font-medium leading-tight text-primary hover:no-underline py-4">
                      {itemTitle}
                    </AccordionTrigger>
                    <AccordionContent className="text-base md:text-lg lg:text-xl font-medium leading-tight text-muted-foreground pb-4">
                      {itemContent}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </div>
      </Container>
    </Section>
  )
}
