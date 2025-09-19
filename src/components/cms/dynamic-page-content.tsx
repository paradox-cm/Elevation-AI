"use client"

import { useEffect, useState } from 'react'
import { pagesService, PageWithSections } from '@/lib/cms'
import { Container } from '@/components/ui/layout/container'
import { Section } from '@/components/ui/layout/section'
import { DynamicHero } from './dynamic-hero'
import { DynamicFAQ } from './dynamic-faq'
import { DynamicBlogListing } from './dynamic-blog-listing'

interface DynamicPageContentProps {
  pageSlug: string
  fallbackContent?: React.ReactNode
}

export function DynamicPageContent({ pageSlug, fallbackContent }: DynamicPageContentProps) {
  const [page, setPage] = useState<PageWithSections | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const pageData = await pagesService.getWithSections(pageSlug)
        setPage(pageData)
      } catch (err) {
        console.error('Error fetching page:', err)
        setError('Failed to load page content')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPage()
  }, [pageSlug])

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

  if (!page) {
    return fallbackContent || (
      <div className="text-center py-8">
        <p className="text-gray-500">Page not found or not published.</p>
      </div>
    )
  }

  const renderSection = (section: any) => {
    switch (section.section_type) {
      case 'hero':
        return (
          <Section key={section.id} paddingY="lg" className="flex items-center h-screen pt-8 sm:pt-0">
            <Container size="2xl">
              <DynamicHero 
                pageSlug={pageSlug}
                fallbackTitle={section.metadata?.title}
                fallbackSubtitle={section.metadata?.subtitle}
                fallbackCtaPrimary={section.metadata?.cta_primary_text}
                fallbackCtaSecondary={section.metadata?.cta_secondary_text}
                fallbackCtaPrimaryUrl={section.metadata?.cta_primary_url}
                fallbackCtaSecondaryUrl={section.metadata?.cta_secondary_url}
              />
            </Container>
          </Section>
        )

      case 'faq':
        return (
          <Section key={section.id} paddingY="lg">
            <Container size="2xl">
              <DynamicFAQ />
            </Container>
          </Section>
        )

      case 'blog_listing':
        return (
          <Section key={section.id} paddingY="lg">
            <Container size="2xl">
              <DynamicBlogListing 
                limit={section.metadata?.limit || 6}
                showTitle={section.metadata?.show_title !== false}
                title={section.metadata?.title || "Latest Blog Posts"}
                description={section.metadata?.description || "Stay updated with our latest insights and updates"}
              />
            </Container>
          </Section>
        )

      case 'custom':
        return (
          <Section key={section.id} paddingY="lg">
            <Container size="2xl">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: section.content || '' }}
              />
            </Container>
          </Section>
        )

      default:
        return (
          <Section key={section.id} paddingY="lg">
            <Container size="2xl">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: section.content || '' }}
              />
            </Container>
          </Section>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <main>
        {page.sections.map(renderSection)}
      </main>
    </div>
  )
}
