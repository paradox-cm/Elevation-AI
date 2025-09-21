"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { H1, H2, H3, P, BodyLarge, BodySmall } from "@/components/ui/typography"
import { LoadingSpinner } from "@/components/ui/loading"
import Icon from "@/components/ui/icon"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import type { ComponentProps } from "react"

type BadgeVariant = ComponentProps<typeof Badge>["variant"]

interface PressArticle {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  article_type: 'press_release' | 'media_coverage'
  category: string | null
  source: string | null
  external_url: string | null
  read_time: string | null
  featured_image_url: string | null
  is_published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export default function MediaCoveragePage() {
  const params = useParams()
  const slug = params.slug as string
  const [article, setArticle] = useState<PressArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from('press_articles')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single()

        if (error) {
          if (error.code === 'PGRST116') {
            setError('Article not found')
          } else {
            throw error
          }
          return
        }

        setArticle(data)
      } catch (error) {
        console.error('Error fetching article:', error)
        setError('Failed to load article')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchArticle()
    }
  }, [slug, supabase])

  if (loading) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading article..." />
        </div>
      </PageWrapper>
    )
  }

  if (error || !article) {
    return (
      <PageWrapper>
        <MobileOnlyLayout
          header={<MainHeader />}
          footer={<WebsiteFooter />}
          mobileMenu={<MobileMenuDrawer currentPage="resources" />}
        >
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
              <H1 className="mb-4">Article Not Found</H1>
              <P className="text-muted-foreground mb-6">
                The article you're looking for doesn't exist or has been removed.
              </P>
              <Button asChild>
                <Link href="/website/press">
                  <Icon name="arrow-left-line" className="mr-2 h-4 w-4" />
                  Back to Press
                </Link>
              </Button>
            </div>
          </div>
        </MobileOnlyLayout>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="resources" />}
      >
        <div className="min-h-screen bg-background">
          <main>
            <Container size="2xl">
              {/* Article Header */}
              <Section paddingY="lg">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-6">
                    <Button variant="ghost" size="sm" asChild className="mb-4">
                      <Link href="/website/press">
                        <Icon name="arrow-left-line" className="mr-2 h-4 w-4" />
                        Back to Press
                      </Link>
                    </Button>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant={(article.article_type === 'press_release' ? 'default' : 'secondary') as BadgeVariant}>
                        {article.article_type === 'press_release' ? 'Press Release' : 'Media Coverage'}
                      </Badge>
                      {article.category && (
                        <Badge variant="outline">{article.category}</Badge>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {article.published_at ? new Date(article.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : ''}
                      </span>
                    </div>
                    
                    <H1 className="mb-4">{article.title}</H1>
                    
                    {article.excerpt && (
                      <P className="text-lg text-muted-foreground mb-4">{article.excerpt}</P>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {article.read_time && <span>{article.read_time}</span>}
                      {article.source && <span>Source: {article.source}</span>}
                    </div>
                  </div>

                  {/* Featured Image */}
                  {article.featured_image_url && (
                    <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden mb-8">
                      <Image
                        src={article.featured_image_url}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Article Content */}
                  <div className="prose prose-lg max-w-none">
                    {article.content ? (
                      <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    ) : (
                      <P>{article.excerpt}</P>
                    )}
                  </div>

                  {/* External Link for Media Coverage */}
                  {article.article_type === 'media_coverage' && article.external_url && (
                    <div className="mt-8 pt-8 border-t">
                      <Button asChild size="lg">
                        <a href={article.external_url} target="_blank" rel="noopener noreferrer">
                          Read Full Article
                          <Icon name="external-link-line" className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </Section>
            </Container>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
