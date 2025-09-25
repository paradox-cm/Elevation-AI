#!/usr/bin/env node

/**
 * Sync Blog Page Content to CMS
 * 
 * This script extracts the static blog page content and creates
 * corresponding CMS entries for dynamic management.
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Blog page content data
const blogPageData = {
  title: "Blog",
  slug: "blog",
  description: "Insights, strategies, and thought leadership on AI, business orchestration, and digital transformation",
  meta_title: "Blog - Elevation AI",
  meta_description: "Insights, strategies, and thought leadership on AI, business orchestration, and digital transformation",
  is_published: true
}

const blogSections = [
  {
    section_type: "hero_simple",
    section_order: 1,
    title: "Blog Header",
    section_data: {
      title: "Blog",
      subtitle: "Insights, strategies, and thought leadership on AI, business orchestration, and digital transformation",
      cta_primary_text: "",
      cta_primary_url: "",
      cta_secondary_text: "",
      cta_secondary_url: ""
    }
  },
  {
    section_type: "custom",
    section_order: 2,
    title: "Blog Categories",
    content: `<div class="flex flex-wrap gap-2 justify-center">
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 text-xs">All Posts</button>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 text-xs">AI & Technology</button>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 text-xs">Technical Insights</button>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 text-xs">Business Intelligence</button>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 text-xs">Security & Compliance</button>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 text-xs">Data Strategy</button>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 text-xs">Workplace Innovation</button>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 text-xs">Industry Insights</button>
    </div>`,
    section_data: {
      categories: [
        "All Posts",
        "AI & Technology", 
        "Technical Insights",
        "Business Intelligence",
        "Security & Compliance",
        "Data Strategy",
        "Workplace Innovation",
        "Industry Insights"
      ]
    }
  },
  {
    section_type: "blog_listing",
    section_order: 3,
    title: "Featured Article",
    section_data: {
      title: "Featured Article",
      description: "The Future of Business Orchestration: How AI is Transforming Enterprise Operations",
      limit: 1,
      show_featured: true,
      featured_article: {
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
      }
    }
  },
  {
    section_type: "blog_listing",
    section_order: 4,
    title: "Blog Articles Grid",
    section_data: {
      title: "Latest Articles",
      description: "Stay updated with our latest insights and updates",
      limit: 6,
      show_featured: false,
      articles: [
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
    }
  },
  {
    section_type: "cta",
    section_order: 5,
    title: "Newsletter CTA",
    section_data: {
      title: "Stay Updated",
      description: "Get the latest insights on AI, business orchestration, and industry trends delivered to your inbox.",
      cta_primary_text: "Subscribe",
      cta_primary_url: "#",
      cta_secondary_text: "",
      cta_secondary_url: "",
      background_style: "gradient",
      email_placeholder: "Enter your email"
    }
  }
]

async function syncBlogToCMS() {
  try {
    console.log('🚀 Starting blog page sync to CMS...')

    // Check if blog page already exists
    const { data: existingPage, error: pageCheckError } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', 'blog')
      .single()

    let pageId

    if (existingPage) {
      console.log('📄 Blog page already exists, updating...')
      pageId = existingPage.id
      
      // Update existing page
      const { error: updateError } = await supabase
        .from('pages')
        .update({
          ...blogPageData,
          updated_at: new Date().toISOString()
        })
        .eq('id', pageId)

      if (updateError) throw updateError
    } else {
      console.log('📄 Creating new blog page...')
      
      // Create new page
      const { data: newPage, error: createError } = await supabase
        .from('pages')
        .insert({
          ...blogPageData,
          created_by: 'system'
        })
        .select()
        .single()

      if (createError) throw createError
      pageId = newPage.id
    }

    console.log(`✅ Blog page created/updated with ID: ${pageId}`)

    // Delete existing sections for this page
    console.log('🗑️ Removing existing blog page sections...')
    const { error: deleteError } = await supabase
      .from('page_sections')
      .delete()
      .eq('page_id', pageId)

    if (deleteError) throw deleteError

    // Create new sections
    console.log('📝 Creating blog page sections...')
    
    for (const section of blogSections) {
      const { data: newSection, error: sectionError } = await supabase
        .from('page_sections')
        .insert({
          page_id: pageId,
          section_type: section.section_type,
          section_order: section.section_order,
          title: section.title,
          section_data: section.section_data,
          is_published: true
        })
        .select()
        .single()

      if (sectionError) {
        console.error(`❌ Error creating section ${section.section_type}:`, sectionError)
        throw sectionError
      }

      console.log(`✅ Created section: ${section.section_type}`)
    }

    console.log('🎉 Blog page sync completed successfully!')
    console.log(`📊 Created ${blogSections.length} sections for blog page`)

  } catch (error) {
    console.error('❌ Error syncing blog page to CMS:', error)
    process.exit(1)
  }
}

// Run the sync
syncBlogToCMS()
