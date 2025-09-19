"use client"

import { useState, useEffect } from 'react'
import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { Button } from "@/components/ui/button"
import { H1, P } from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"
import { H2, H3, BodyLarge, BodySmall } from "@/components/ui/typography"
import Link from "next/link"
import Icon from "@/components/ui/icon"
import React from "react"
import { usePageCache } from '@/hooks/use-page-cache'
import { useBlogListCache } from '@/hooks/use-blog-cache'
import { LogoLoadingSpinner } from '@/components/ui/loading-spinner'
import { isRecord } from "@/lib/types"
import { toText } from "@/lib/react"

// Mock blog data
const featuredArticle = {
  id: 1,
  title: "The Future of Business Orchestration: How AI is Transforming Enterprise Operations",
  excerpt: "Explore how artificial intelligence is revolutionizing the way businesses orchestrate complex operations, from supply chain management to customer experience optimization.",
  author: "Sarah Chen",
  authorRole: "VP of Product Strategy",
  publishDate: "2025-01-15",
  readTime: "8 min read",
  category: "AI & Technology",
  image: "/images/blog/featured-article.jpg",
  featured: true
}

const blogArticles = [
  {
    id: 2,
    title: "Building Scalable AI Workflows: Best Practices for Enterprise Implementation",
    excerpt: "Learn the key principles and strategies for implementing AI workflows that can scale with your organization's growth and evolving needs.",
    author: "Michael Rodriguez",
    authorRole: "Lead AI Engineer",
    publishDate: "2025-01-12",
    readTime: "6 min read",
    category: "Technical Insights",
    image: "/images/blog/ai-workflows.jpg"
  },
  {
    id: 3,
    title: "The ROI of Intelligent Process Automation: A Data-Driven Analysis",
    excerpt: "Discover the measurable benefits of implementing intelligent process automation across different industries and business functions.",
    author: "Dr. Emily Watson",
    authorRole: "Head of Analytics",
    publishDate: "2025-01-10",
    readTime: "7 min read",
    category: "Business Intelligence",
    image: "/images/blog/roi-analysis.jpg"
  },
  {
    id: 4,
    title: "Security First: Building Trust in AI-Powered Business Systems",
    excerpt: "Understanding the critical security considerations and best practices for deploying AI systems in enterprise environments.",
    author: "James Park",
    authorRole: "Chief Security Officer",
    publishDate: "2025-01-08",
    readTime: "5 min read",
    category: "Security & Compliance",
    image: "/images/blog/ai-security.jpg"
  },
  {
    id: 5,
    title: "From Data Silos to Unified Intelligence: A Transformation Guide",
    excerpt: "How organizations can break down data silos and create unified intelligence platforms that drive better decision-making.",
    author: "Lisa Thompson",
    authorRole: "Data Strategy Director",
    publishDate: "2025-01-05",
    readTime: "9 min read",
    category: "Data Strategy",
    image: "/images/blog/data-unification.jpg"
  },
  {
    id: 6,
    title: "The Human-AI Collaboration Model: Maximizing Team Performance",
    excerpt: "Explore how to design effective collaboration between human teams and AI systems for optimal business outcomes.",
    author: "David Kim",
    authorRole: "VP of Human Resources",
    publishDate: "2025-01-03",
    readTime: "6 min read",
    category: "Workplace Innovation",
    image: "/images/blog/human-ai-collab.jpg"
  },
  {
    id: 7,
    title: "Industry Spotlight: AI Transformation in Financial Services",
    excerpt: "A deep dive into how financial institutions are leveraging AI for risk management, fraud detection, and customer service.",
    author: "Rachel Green",
    authorRole: "Industry Solutions Lead",
    publishDate: "2025-01-01",
    readTime: "8 min read",
    category: "Industry Insights",
    image: "/images/blog/financial-services.jpg"
  }
]

const categories = [
  "All Posts",
  "AI & Technology", 
  "Technical Insights",
  "Business Intelligence",
  "Security & Compliance",
  "Data Strategy",
  "Workplace Innovation",
  "Industry Insights"
]


export default function BlogPage() {
  // Use the page cache hook for intelligent loading
  const { pageData, isLoading: pageLoading } = usePageCache({ 
    pageId: 'blog',
    enableCache: true
  })
  
  // Use the blog list cache hook for intelligent loading
  const { posts: blogPosts, isLoading: postsLoading } = useBlogListCache({
    enableCache: true
  })
  
  // Show loading only if both are loading and we don't have cached data
  const loading = pageLoading && postsLoading

  // Fallback to static content if CMS data is not available
  if (loading) {
    return (
      <PageWrapper>
        <MobileOnlyLayout
          header={<MainHeader />}
          footer={<WebsiteFooter />}
          mobileMenu={<MobileMenuDrawer currentPage="resources" />}
        >
          <div className="min-h-screen bg-background transition-colors duration-300 flex items-center justify-center">
            <LogoLoadingSpinner size="md" />
          </div>
        </MobileOnlyLayout>
      </PageWrapper>
    )
  }

  // Get section data with fallbacks
  const headerSection = pageData?.sections.find(s => s.section_type === 'hero_simple')
  const categoriesSection = pageData?.sections.find(s => s.section_type === 'custom')
  const featuredSection = pageData?.sections.find(s => s.section_type === 'blog_listing' && s.section_data?.show_featured)
  const articlesSection = pageData?.sections.find(s => s.section_type === 'blog_listing' && !s.section_data?.show_featured)
  const ctaSection = pageData?.sections.find(s => s.section_type === 'cta')

  // Extract data with fallbacks
  const pageTitle = typeof headerSection?.section_data?.title === 'string' ? headerSection.section_data.title : "Blog"
  const pageDescription = typeof headerSection?.section_data?.subtitle === 'string' ? headerSection.section_data.subtitle : "Insights, strategies, and thought leadership on AI, business orchestration, and digital transformation"
  const categories = Array.isArray(categoriesSection?.section_data?.categories) 
    ? categoriesSection.section_data.categories as string[]
    : [
        "All Posts",
        "AI & Technology", 
        "Technical Insights",
        "Business Intelligence",
        "Security & Compliance",
        "Data Strategy",
        "Workplace Innovation",
        "Industry Insights"
      ]
  // Use actual featured article from database, with fallback to static data
  const featuredArticle = blogPosts.length > 0 ? {
    id: blogPosts[0].id,
    title: blogPosts[0].title,
    excerpt: blogPosts[0].excerpt,
    author: "Elevation AI Team", // Default author since author_id is null
    authorRole: "Content Team",
    publishDate: blogPosts[0].published_at ? new Date(blogPosts[0].published_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '',
    readTime: "8 min read", // Default read time
    category: (blogPosts[0].category && typeof blogPosts[0].category === 'object' && 'name' in blogPosts[0].category && typeof blogPosts[0].category.name === 'string') ? blogPosts[0].category.name : 'Uncategorized',
    image: blogPosts[0].featured_image,
    featured: true,
    slug: blogPosts[0].slug
  } : (typeof featuredSection?.section_data?.featured_article === 'object' && featuredSection?.section_data?.featured_article !== null ? featuredSection.section_data.featured_article as Record<string, unknown> : {
    id: 1,
    title: "The Future of Business Orchestration: How AI is Transforming Enterprise Operations",
    excerpt: "Explore how artificial intelligence is revolutionizing the way businesses orchestrate complex operations, from supply chain management to customer experience optimization.",
    author: "Sarah Chen",
    authorRole: "VP of Product Strategy",
    publishDate: "2025-01-15",
    readTime: "8 min read",
    category: "AI & Technology",
    image: "/images/blog/featured-article.jpg",
    featured: true,
    slug: "future-business-orchestration"
  })

  // Derived safe fields for featured article
  const f = isRecord(featuredArticle) ? featuredArticle : {}
  const featuredTitle = toText(f["title"])
  const featuredExcerpt = toText(f["excerpt"])
  const featuredSlug = toText(f["slug"])
  const featuredImage = toText(f["cover_image"]) || toText(f["image"]) // support either key if present
  const fc = isRecord(f["category"]) ? (f["category"] as Record<string, unknown>) : null
  const featuredCategoryName = fc ? toText(fc["name"]) : toText(f["category"]) // fallback if category is a string

  // Safe featured article reads
  const fa = isRecord(featuredArticle) ? featuredArticle : {}
  const faCategory = toText(fa['category'])
  const faTitle = toText(fa['title'])
  const faExcerpt = toText(fa['excerpt'])
  const faAuthor = toText(fa['author'])
  const faAuthorRole = toText(fa['authorRole'])
  const faPublishDate = toText(fa['publishDate'])
  const faReadTime = toText(fa['readTime'])
  const faSlug = toText(fa['slug'])
  const faImage = toText(fa['image'])
  // Use actual blog posts from database, with fallback to static data
  const blogArticles = blogPosts.length > 0 ? blogPosts.slice(1).map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    author: "Elevation AI Team", // Default author since author_id is null
    authorRole: "Content Team",
    publishDate: post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '',
    readTime: "6 min read", // Default read time
    category: post.category?.name || 'Uncategorized',
    image: post.featured_image,
    slug: post.slug
  })) : [
    {
      id: 2,
      title: "Building Scalable AI Workflows: Best Practices for Enterprise Implementation",
      excerpt: "Learn the key principles and strategies for implementing AI workflows that can scale with your organization's growth and evolving needs.",
      author: "Michael Rodriguez",
      authorRole: "Lead AI Engineer",
      publishDate: "2025-01-12",
      readTime: "6 min read",
      category: "Technical Insights",
      image: "/images/blog/ai-workflows.jpg",
      slug: "scalable-ai-workflows"
    },
    {
      id: 3,
      title: "The ROI of Intelligent Process Automation: A Data-Driven Analysis",
      excerpt: "Discover the measurable benefits of implementing intelligent process automation across different industries and business functions.",
      author: "Dr. Emily Watson",
      authorRole: "Head of Analytics",
      publishDate: "2025-01-10",
      readTime: "7 min read",
      category: "Business Intelligence",
      image: "/images/blog/roi-analysis.jpg",
      slug: "roi-intelligent-process-automation"
    },
    {
      id: 4,
      title: "Security First: Building Trust in AI-Powered Business Systems",
      excerpt: "Understanding the critical security considerations and best practices for deploying AI systems in enterprise environments.",
      author: "James Park",
      authorRole: "Chief Security Officer",
      publishDate: "2025-01-08",
      readTime: "5 min read",
      category: "Security & Compliance",
      image: "/images/blog/ai-security.jpg",
      slug: "security-first-ai-systems"
    },
    {
      id: 5,
      title: "From Data Silos to Unified Intelligence: A Transformation Guide",
      excerpt: "How organizations can break down data silos and create unified intelligence platforms that drive better decision-making.",
      author: "Lisa Thompson",
      authorRole: "Data Strategy Director",
      publishDate: "2025-01-05",
      readTime: "9 min read",
      category: "Data Strategy",
      image: "/images/blog/data-unification.jpg",
      slug: "data-silos-unified-intelligence"
    },
    {
      id: 6,
      title: "The Human-AI Collaboration Model: Maximizing Team Performance",
      excerpt: "Explore how to design effective collaboration between human teams and AI systems for optimal business outcomes.",
      author: "David Kim",
      authorRole: "VP of Human Resources",
      publishDate: "2025-01-03",
      readTime: "6 min read",
      category: "Workplace Innovation",
      image: "/images/blog/human-ai-collab.jpg",
      slug: "human-ai-collaboration-model"
    },
    {
      id: 7,
      title: "Industry Spotlight: AI Transformation in Financial Services",
      excerpt: "A deep dive into how financial institutions are leveraging AI for risk management, fraud detection, and customer service.",
      author: "Rachel Green",
      authorRole: "Industry Solutions Lead",
      publishDate: "2025-01-01",
      readTime: "8 min read",
      category: "Industry Insights",
      image: "/images/blog/financial-services.jpg",
      slug: "ai-transformation-financial-services"
    }
  ]
  const ctaTitle = (typeof ctaSection?.section_data?.title === 'string' ? ctaSection.section_data.title : "Stay Updated")
  const ctaDescription = (typeof ctaSection?.section_data?.description === 'string' ? ctaSection.section_data.description : "Get the latest insights on AI, business orchestration, and industry trends delivered to your inbox.")
  const ctaPlaceholder = (typeof ctaSection?.section_data?.email_placeholder === 'string' ? ctaSection.section_data.email_placeholder : "Enter your email")
  const ctaButtonText = (typeof ctaSection?.section_data?.cta_primary_text === 'string' ? ctaSection.section_data.cta_primary_text : "Subscribe")

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
              <Section paddingY="xl">
                {/* Page Header */}
                <div className="w-full flex items-center justify-center min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]">
                  <div className="text-center space-y-1">
                    <H1>
                      {pageTitle}
                    </H1>
                    <P className="max-w-[42rem] mx-auto">
                      {pageDescription}
                    </P>
                  </div>
                </div>
              </Section>

              {/* Category Filter */}
              <Section paddingY="lg">
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={category === "All Posts" ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </Section>

              {/* Featured Article */}
              <Section paddingY="lg">
                <div className="bg-gradient-to-br from-primary/5 to-blue-50 dark:to-blue-950/20 rounded-2xl p-8 lg:p-12 border border-primary/10">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          Featured Article
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {featuredCategoryName}
                        </Badge>
                      </div>
                      
                      <H2 className="text-2xl lg:text-3xl leading-tight">
                        {featuredTitle}
                      </H2>
                      
                      <P className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                        {featuredExcerpt}
                      </P>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Icon name="user-line" className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                          <div className="font-medium text-foreground">{toText(f["author"])}</div>
                          <div className="text-xs">{toText(f["authorRole"])}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span>{toText(f["publishDate"])}</span>
                          <span>•</span>
                          <span>{toText(f["readTime"])}</span>
                        </div>
                      </div>
                      
                      <Button size="lg" className="w-fit" asChild>
                        <Link href={`/website/blog/${featuredSlug || ''}`}>
                          Read Full Article
                          <Icon name="arrow-right-s-line" className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="relative">
                      <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-xl flex items-center justify-center overflow-hidden">
                        {featuredImage ? (
                          <img 
                            src={featuredImage} 
                            alt={featuredTitle || ""}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              e.currentTarget.style.display = 'none'
                              const sib = e.currentTarget.nextElementSibling as HTMLElement | null
                              if (sib) {
                                sib.style.display = 'flex'
                              }
                            }}
                          />
                        ) : null}
                        <div className="text-center space-y-4" style={{ display: featuredImage ? 'none' : 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto">
                            <Icon name="article-line" className="h-8 w-8 text-primary" />
                          </div>
                          <div className="text-sm text-muted-foreground">Featured Article Image</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>

              {/* Blog Articles Grid */}
              <Section paddingY="lg">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <H3 className="text-xl font-semibold">Latest Articles</H3>
                    <Button variant="outline" size="sm">
                      View All
                      <Icon name="arrow-right-s-line" className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogArticles.map((article) => (
                      <article key={article.id} className="group h-full">
                        <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/20 h-full flex flex-col">
                          <div className="aspect-[16/10] bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {article.image ? (
                              <img 
                                src={article.image} 
                                alt={article.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback to placeholder if image fails to load
                                  e.currentTarget.style.display = 'none'
                                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement | null
                                  if (nextElement) {
                                    nextElement.style.display = 'flex'
                                  }
                                }}
                              />
                            ) : null}
                            <div className="text-center space-y-2" style={{ display: article.image ? 'none' : 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                                <Icon name="article-line" className="h-6 w-6 text-primary" />
                              </div>
                              <div className="text-xs text-muted-foreground">Article Image</div>
                            </div>
                          </div>
                          
                          <div className="p-6 space-y-4 flex-1 flex flex-col">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {article.category}
                              </Badge>
                            </div>
                            
                            <H3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                              {article.title}
                            </H3>
                            
                            <BodySmall className="text-muted-foreground line-clamp-3 flex-1">
                              {article.excerpt}
                            </BodySmall>
                            
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                                  <Icon name="user-line" className="h-3 w-3 text-primary" />
                                </div>
                                <span>{article.author}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>{article.publishDate}</span>
                                <span>•</span>
                                <span>{article.readTime}</span>
                              </div>
                            </div>
                            
                            <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary/10 mt-auto" asChild>
                              <Link href={`/website/blog/${article.slug}`}>
                                Read More
                                <Icon name="arrow-right-s-line" className="h-4 w-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </Section>

              {/* Newsletter CTA */}
              <Section paddingY="xl">
                <div className="bg-gradient-to-r from-primary/5 to-blue-50 dark:to-blue-950/20 rounded-2xl p-8 lg:p-12 text-center border border-primary/10">
                  <div className="max-w-2xl mx-auto space-y-6">
                    <H3 className="text-2xl font-semibold">{ctaTitle}</H3>
                    <P className="text-muted-foreground text-sm sm:text-base">
                      {ctaDescription}
                    </P>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                      <input
                        type="email"
                        placeholder={ctaPlaceholder}
                        className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                      <Button size="lg" className="px-8">
                        {ctaButtonText}
                      </Button>
                    </div>
                  </div>
                </div>
              </Section>
            </Container>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
