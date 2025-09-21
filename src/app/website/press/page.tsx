"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
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
import React, { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

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

// Press Releases Section Component
function PressReleasesSection({ articles }: { articles: PressArticle[] }) {
  const pressReleases = articles.filter(article => article.article_type === 'press_release')

  return (
    <Section paddingY="lg">
      <div className="max-w-4xl mx-auto">
        <H2 className="mb-8">Press Releases</H2>
        <P className="text-muted-foreground mb-8">Latest announcements and news from Elevation AI</P>
        <div className="space-y-6">
          {pressReleases.map((release) => (
            <Card key={release.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {release.category && (
                          <Badge variant="secondary" className="text-xs">
                            {release.category}
                          </Badge>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {release.published_at ? new Date(release.published_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : ''}
                        </span>
                      </div>
                      <CardTitle className="text-lg sm:text-xl mb-3 group-hover:text-primary transition-colors">
                        {release.title}
                      </CardTitle>
                    </div>
                    <div className="flex-shrink-0">
                      {release.read_time && (
                        <span className="text-sm text-muted-foreground">{release.read_time}</span>
                      )}
                    </div>
                  </div>
                  {release.excerpt && (
                    <BodySmall className="text-muted-foreground mb-4">
                      {release.excerpt}
                    </BodySmall>
                  )}
                  <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                    <Link href={`/website/press/press-releases/${release.slug}`}>
                      Read More
                      <Icon name="arrow-right-line" className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                {release.featured_image_url && (
                  <div className="relative w-full lg:w-80 h-48 lg:h-auto lg:min-h-full p-4">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image
                        src={release.featured_image_url}
                        alt={release.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}

// Media Coverage Section Component
function MediaCoverageSection({ articles }: { articles: PressArticle[] }) {
  const mediaCoverage = articles.filter(article => article.article_type === 'media_coverage')

  return (
    <Section paddingY="lg">
      <div className="max-w-4xl mx-auto">
        <H2 className="mb-8">Media Coverage</H2>
        <P className="text-muted-foreground mb-8">Recent coverage and analysis of Elevation AI in the media</P>
        <div className="space-y-6">
          {mediaCoverage.map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {article.category && (
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {article.published_at ? new Date(article.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : ''}
                    </span>
                  </div>
                  <CardTitle className="text-lg sm:text-xl mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    {article.source && <span className="font-medium">{article.source}</span>}
                    {article.source && article.read_time && <span>•</span>}
                    {article.read_time && <span>{article.read_time}</span>}
                  </div>
                  {article.excerpt && (
                    <BodySmall className="text-muted-foreground mb-4">
                      {article.excerpt}
                    </BodySmall>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <Link href={`/website/press/media-coverage/${article.slug}`}>
                      Read Article
                      <Icon name="arrow-right-line" className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                {article.featured_image_url && (
                  <div className="relative w-full lg:w-80 h-48 lg:h-auto lg:min-h-full p-4">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image
                        src={article.featured_image_url}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}

// Media Resources Section Component (Hardcoded)
function MediaResourcesSection() {
  const mediaResources = [
    {
      title: "Company Logo Package",
      description: "High-resolution logos in various formats",
      format: "ZIP",
      size: "15.2 MB"
    }
  ]

  return (
    <Section paddingY="lg">
      <div className="max-w-4xl mx-auto">
        <H2 className="mb-8">Media Resources</H2>
        <P className="text-muted-foreground mb-8">Downloadable assets and resources for media and press</P>
        <div className="grid gap-4 md:grid-cols-2">
          {mediaResources.map((resource, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base mb-1 group-hover:text-primary transition-colors">
                      {resource.title}
                    </CardTitle>
                    <BodySmall className="text-muted-foreground">
                      {resource.description}
                    </BodySmall>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">
                        {resource.format}
                      </Badge>
                      <span>{resource.size}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon name="download-line" className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}

// Media Contact Section Component (Hardcoded)
function MediaContactSection() {
  return (
    <Section paddingY="lg">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-base sm:text-2xl font-semibold tracking-tight text-foreground">
              Media Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <P className="text-muted-foreground text-sm sm:text-base">
              For media inquiries, interview requests, or additional information about Elevation AI, please contact our press team.
            </P>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <Link href="/website/contact">
                  <Icon name="mail-line" className="mr-2 h-4 w-4" />
                  Contact Press Team
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:press@elevationai.com">
                  <Icon name="mail-line" className="mr-2 h-4 w-4" />
                  press@elevationai.com
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}

export default function PressPage() {
  const [articles, setArticles] = useState<PressArticle[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('press_articles')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false })

        if (error) {
          if (error.code === 'PGRST205') {
            console.log('Press articles table does not exist yet. Please create it first.')
            setArticles([])
            return
          }
          throw error
        }
        setArticles(data || [])
      } catch (error) {
        console.error('Error fetching press articles:', error)
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [supabase])

  if (loading) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading press page..." />
        </div>
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
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            <Container size="2xl">
              {/* Page Header */}
              <div className="w-full flex items-center justify-center min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]">
                <div className="text-center space-y-1">
                  <H1>Press</H1>
                  <P className="max-w-[42rem] mx-auto">
                    Latest news, press releases, and media resources about Elevation AI
                  </P>
                </div>
              </div>

              {/* Press Sections */}
              <PressReleasesSection articles={articles} />
              <MediaCoverageSection articles={articles} />
              <MediaResourcesSection />
              <MediaContactSection />
            </Container>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
