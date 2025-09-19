"use client"

import { useEffect, useState } from 'react'
import { blogPostsService, BlogPostWithCategory } from '@/lib/cms'
import { Container } from '@/components/ui/layout/container'
import { Section } from '@/components/ui/layout/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { H1, H2, P } from '@/components/ui/typography'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import Link from 'next/link'

interface DynamicBlogPostProps {
  slug: string
  fallbackContent?: React.ReactNode
}

export function DynamicBlogPost({ slug, fallbackContent }: DynamicBlogPostProps) {
  const [post, setPost] = useState<BlogPostWithCategory | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await blogPostsService.getBySlug(slug)
        setPost(postData)
      } catch (err) {
        console.error('Error fetching blog post:', err)
        setError('Failed to load blog post')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

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

  if (!post) {
    return fallbackContent || (
      <div className="text-center py-8">
        <p className="text-gray-500">Blog post not found or not published.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Back Button */}
        <Section paddingY="sm">
          <Container size="2xl">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </Container>
        </Section>

        {/* Featured Image */}
        {post.featured_image && (
          <Section paddingY="none">
            <Container size="2xl">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Container>
          </Section>
        )}

        {/* Post Header */}
        <Section paddingY="lg">
          <Container size="2xl">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {/* Category */}
                {post.category && (
                  <Badge variant="outline">
                    {post.category.name}
                  </Badge>
                )}

                {/* Title */}
                <H1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  {post.title}
                </H1>

                {/* Excerpt */}
                {post.excerpt && (
                  <P className="text-xl text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </P>
                )}

                {/* Meta Information */}
                <div className="flex items-center space-x-6 text-sm text-muted-foreground pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.published_at || post.created_at)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Elevation AI Team</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Post Content */}
        <Section paddingY="lg">
          <Container size="2xl">
            <div className="max-w-4xl mx-auto">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:text-muted-foreground prose-code:text-foreground prose-pre:bg-muted"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </Container>
        </Section>

        {/* Related Posts or CTA */}
        <Section paddingY="lg" className="bg-muted/20">
          <Container size="2xl">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <H2>Stay Updated</H2>
              <P className="text-muted-foreground">
                Get the latest insights and updates from Elevation AI
              </P>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/blog">
                    View All Posts
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/website/sign-up">
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </div>
  )
}
