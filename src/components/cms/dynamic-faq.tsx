"use client"

import { useEffect, useState } from 'react'
import { faqCategoriesService, FAQCategoryWithFAQs } from '@/lib/cms'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { H3, P } from '@/components/ui/typography'
import Icon from '@/components/ui/icon'

export function DynamicFAQ() {
  const [faqCategories, setFaqCategories] = useState<FAQCategoryWithFAQs[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const categories = await faqCategoriesService.getAll()
        setFaqCategories(categories)
      } catch (err) {
        console.error('Error fetching FAQs:', err)
        setError('Failed to load FAQs')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFAQs()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (faqCategories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No FAQs available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Accordion type="multiple" className="w-full space-y-4">
        {faqCategories.map((category) => (
          <AccordionItem 
            key={category.id} 
            value={`category-${category.id}`}
            className="border border-border rounded-lg bg-card"
          >
            <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6 px-6">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name={category.icon} className="h-4 w-4 text-primary" />
                </div>
                <div className="text-left">
                  <H3 className="text-lg font-semibold">
                    {category.title}
                  </H3>
                  <P className="text-sm text-muted-foreground mt-1">
                    {category.description} • {category.faqs.length} questions
                  </P>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-4">
                {category.faqs.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    No questions in this category yet
                  </div>
                ) : (
                  category.faqs.map((faq) => (
                    <Accordion key={`${category.id}-${faq.id}`} type="single" collapsible className="w-full">
                      <AccordionItem 
                        value={`faq-${category.id}-${faq.id}`}
                        className="border border-border/50 rounded-lg bg-muted/30"
                      >
                        <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4 px-4 text-base sm:text-base md:text-lg">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4 px-4 text-sm sm:text-base leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
