"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { PageWithSections } from '@/types/cms'
import { DynamicSectionRenderer, renderSections } from '@/components/cms/dynamic-section-renderer'
import { PageWrapper } from '@/components/page-wrapper'
import { MobileOnlyLayout } from '@/components/ui/layout/mobile-only-layout'
import { MainHeader } from '@/components/ui/main-header'
import { WebsiteFooter } from '@/components/ui/website-footer'
import { MobileMenuDrawer } from '@/components/ui/mobile-menu-drawer'
import { LoadingSpinner } from '@/components/ui/loading'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'

export default function DynamicPage() {
  const params = useParams()
  const slug = params.slug as string
  const [pageData, setPageData] = useState<PageWithSections | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        // Fetch page with sections
        const { data: page, error: pageError } = await supabase
          .from('pages')
          .select(`
            *,
            sections (
              id,
              title,
              content,
              section_type,
              section_data,
              section_order,
              is_published,
              metadata
            )
          `)
          .eq('slug', slug)
          .eq('is_published', true)
          .single()

        if (pageError) {
          if (pageError.code === 'PGRST116') {
            setError('Page not found')
          } else {
            throw pageError
          }
          return
        }

        setPageData(page)
      } catch (error) {
        console.error('Error fetching page data:', error)
        setError('Failed to load page')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPageData()
    }
  }, [slug, supabase])

  if (loading) {
    return (
      <PageWrapper>
        <MobileOnlyLayout
          header={<MainHeader />}
          footer={<WebsiteFooter />}
          mobileMenu={<MobileMenuDrawer />}
        >
          <div className="min-h-screen bg-background flex items-center justify-center">
            <LoadingSpinner size="lg" text="Loading page..." />
          </div>
        </MobileOnlyLayout>
      </PageWrapper>
    )
  }

  if (error || !pageData) {
    return (
      <PageWrapper>
        <MobileOnlyLayout
          header={<MainHeader />}
          footer={<WebsiteFooter />}
          mobileMenu={<MobileMenuDrawer />}
        >
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center space-y-6 max-w-md mx-auto px-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-foreground">404</h1>
                <h2 className="text-xl font-semibold text-foreground">Page Not Found</h2>
                <p className="text-muted-foreground">
                  {error || "The page you're looking for doesn't exist."}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="outline">
                  <Link href="/website/home">
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/admin/pages">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Manage Pages
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </MobileOnlyLayout>
      </PageWrapper>
    )
  }

  // Sort sections by order
  const sortedSections = pageData.sections
    ?.filter(section => section.is_published)
    ?.sort((a, b) => a.section_order - b.section_order) || []

  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            {/* Render all sections dynamically */}
            {sortedSections.length > 0 ? (
              renderSections(sortedSections)
            ) : (
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4 max-w-md mx-auto px-4">
                  <h1 className="text-2xl font-bold text-foreground">{pageData.title}</h1>
                  <p className="text-muted-foreground">
                    This page doesn't have any sections yet. Add some content in the admin panel.
                  </p>
                  <Button asChild>
                    <Link href={`/admin/pages/${pageData.id}/edit`}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Edit Page
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
