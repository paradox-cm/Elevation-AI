"use client"

import { useEffect, useState } from 'react'
import { blogPostsService, BlogPostWithCategory } from '@/lib/cms'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { H2, P } from '@/components/ui/typography'
import Link from 'next/link'

interface BlogListingProps {
  limit?: number
  showTitle?: boolean
  title?: string
  description?: string
}

export function DynamicBlogListing({ 
  limit = 6, 
  showTitle = true, 
  title = "Latest Blog Posts",
  description = "Stay updated with our latest insights and updates"
}: BlogListingProps) {
  const [posts, setPosts] = useState<BlogPostWithCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await blogPostsService.getAll()
        setPosts(allPosts.slice(0, limit))
      } catch (err) {
        console.error('Error fetching blog posts:', err)
        setError('Failed to load blog posts')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [limit])

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

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No blog posts available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {showTitle && (
        <div className="text-center space-y-4">
          <H2>{title}</H2>
          <P className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </P>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              {post.featured_image && (
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="space-y-2">
                {post.category && (
                  <Badge variant="outline" className="text-xs">
                    {post.category.name}
                  </Badge>
                )}
                <CardTitle className="text-lg line-clamp-2">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-sm">
                  {formatDate(post.published_at || post.created_at)}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {post.excerpt && (
                <P className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {post.excerpt}
                </P>
              )}
              <Button variant="outline" size="sm" asChild>
                <Link href={`/blog/${post.slug}`}>
                  Read More
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts.length >= limit && (
        <div className="text-center">
          <Button asChild>
            <Link href="/blog">
              View All Posts
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
