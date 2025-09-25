import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/client'

// Static pages that don't require database lookup
const staticPages = [
  {
    url: 'https://elevationai.com',
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  },
  {
    url: 'https://elevationai.com/website/home',
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  },
  {
    url: 'https://elevationai.com/website/platform',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  {
    url: 'https://elevationai.com/website/solutions',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  {
    url: 'https://elevationai.com/website/pricing',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
  {
    url: 'https://elevationai.com/website/about',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
  {
    url: 'https://elevationai.com/website/contact',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
  {
    url: 'https://elevationai.com/website/demo',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: 'https://elevationai.com/website/sign-up',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: 'https://elevationai.com/website/login',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  },
  {
    url: 'https://elevationai.com/website/partners',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  },
  {
    url: 'https://elevationai.com/website/investors',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  },
  {
    url: 'https://elevationai.com/website/developers',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  },
  {
    url: 'https://elevationai.com/website/careers',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  },
  {
    url: 'https://elevationai.com/website/security',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
  {
    url: 'https://elevationai.com/website/press',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  },
  {
    url: 'https://elevationai.com/website/knowledge-base',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  },
  {
    url: 'https://elevationai.com/website/people-concierge',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  },
  {
    url: 'https://elevationai.com/website/people-experts',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  },
  {
    url: 'https://elevationai.com/website/people-partners',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  },
  {
    url: 'https://elevationai.com/website/resources',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  },
  {
    url: 'https://elevationai.com/privacy',
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  },
  {
    url: 'https://elevationai.com/terms-of-service',
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  },
  {
    url: 'https://elevationai.com/design-system/seo-implementation',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  },
]

// Resource pages
const resourcePages = [
  {
    url: 'https://elevationai.com/website/resources/blog-news',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  },
  {
    url: 'https://elevationai.com/website/resources/careers',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  },
  {
    url: 'https://elevationai.com/website/resources/developers-platforms',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  },
  {
    url: 'https://elevationai.com/website/resources/investors',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  },
  {
    url: 'https://elevationai.com/website/resources/partners',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  },
  {
    url: 'https://elevationai.com/website/resources/security',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  },
]

// Press pages
const pressPages = [
  {
    url: 'https://elevationai.com/website/press/media-coverage',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  },
  {
    url: 'https://elevationai.com/website/press/press-releases',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient()
  
  // Fetch dynamic pages from database
  let dynamicPages: MetadataRoute.Sitemap = []
  
  try {
    const { data: pages, error } = await supabase
      .from('pages')
      .select('slug, updated_at, is_published')
      .eq('is_published', true)
      .order('updated_at', { ascending: false })

    if (!error && pages) {
      dynamicPages = pages.map((page) => ({
        url: `https://elevationai.com/website/${page.slug}`,
        lastModified: new Date(page.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
    }
  } catch (error) {
    console.error('Error fetching dynamic pages for sitemap:', error)
  }

  // Fetch blog posts
  let blogPages: MetadataRoute.Sitemap = []
  
  try {
    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, is_published')
      .eq('is_published', true)
      .order('updated_at', { ascending: false })

    if (!error && blogPosts) {
      blogPages = blogPosts.map((post) => ({
        url: `https://elevationai.com/website/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }))
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  // Combine all pages
  return [
    ...staticPages,
    ...resourcePages,
    ...pressPages,
    ...dynamicPages,
    ...blogPages,
  ]
}
