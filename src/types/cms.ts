// Database Types for Elevation AI CMS

// Activity Log Types
export interface ActivityLog {
  id: string
  action: 'create' | 'update' | 'delete' | 'publish' | 'unpublish' | 'login' | 'logout'
  entity_type: 'page' | 'page_section' | 'blog_post' | 'blog_category' | 'faq' | 'faq_category' | 'media' | 'site_setting' | 'user'
  entity_id: string | null
  entity_title: string | null
  user_id: string | null
  user_name: string | null
  description: string
  details: Record<string, unknown>
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          id: string
          action: string
          entity_type: string
          entity_id: string | null
          entity_title: string | null
          user_id: string | null
          user_name: string | null
          description: string
          details: Record<string, unknown>
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          action: string
          entity_type: string
          entity_id?: string | null
          entity_title?: string | null
          user_id?: string | null
          user_name?: string | null
          description: string
          details?: Record<string, unknown>
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          action?: string
          entity_type?: string
          entity_id?: string | null
          entity_title?: string | null
          user_id?: string | null
          user_name?: string | null
          description?: string
          details?: Record<string, unknown>
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      pages: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          meta_title: string | null
          meta_description: string | null
          is_published: boolean
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          meta_title?: string | null
          meta_description?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          meta_title?: string | null
          meta_description?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
      page_sections: {
        Row: {
          id: string
          page_id: string
          section_type: string
          section_order: number
          title: string | null
          content: string | null
          metadata: Record<string, unknown> | null
          section_data: Record<string, unknown> | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          page_id: string
          section_type: string
          section_order: number
          title?: string | null
          content?: string | null
          metadata?: Record<string, unknown> | null
          section_data?: Record<string, unknown> | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          page_id?: string
          section_type?: string
          section_order?: number
          title?: string | null
          content?: string | null
          metadata?: Record<string, unknown> | null
          section_data?: Record<string, unknown> | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      faq_categories: {
        Row: {
          id: string
          title: string
          description: string | null
          icon: string
          order_index: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          icon: string
          order_index: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          icon?: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      faqs: {
        Row: {
          id: string
          category_id: string
          question: string
          answer: string
          order_index: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          question: string
          answer: string
          order_index: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          question?: string
          answer?: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      blog_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          color?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          color?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          featured_image: string | null
          category_id: string | null
          author_id: string
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          featured_image?: string | null
          category_id?: string | null
          author_id: string
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          featured_image?: string | null
          category_id?: string | null
          author_id?: string
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      media: {
        Row: {
          id: string
          filename: string
          original_filename: string
          mime_type: string
          size: number
          url: string
          alt_text: string | null
          uploaded_by: string
          created_at: string
        }
        Insert: {
          id?: string
          filename: string
          original_filename: string
          mime_type: string
          size: number
          url: string
          alt_text?: string | null
          uploaded_by: string
          created_at?: string
        }
        Update: {
          id?: string
          filename?: string
          original_filename?: string
          mime_type?: string
          size?: number
          url?: string
          alt_text?: string | null
          uploaded_by?: string
          created_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: string
          description: string | null
          updated_at: string
          updated_by: string
        }
        Insert: {
          id?: string
          key: string
          value: string
          description?: string | null
          updated_at?: string
          updated_by: string
        }
        Update: {
          id?: string
          key?: string
          value?: string
          description?: string | null
          updated_at?: string
          updated_by?: string
        }
      }
    }
  }
}

// Helper types for easier usage
export type Page = Database['public']['Tables']['pages']['Row']
export type PageInsert = Database['public']['Tables']['pages']['Insert']
export type PageUpdate = Database['public']['Tables']['pages']['Update']

export type PageSection = Database['public']['Tables']['page_sections']['Row']
export type PageSectionInsert = Database['public']['Tables']['page_sections']['Insert']
export type PageSectionUpdate = Database['public']['Tables']['page_sections']['Update']

export type FAQCategory = Database['public']['Tables']['faq_categories']['Row']
export type FAQCategoryInsert = Database['public']['Tables']['faq_categories']['Insert']
export type FAQCategoryUpdate = Database['public']['Tables']['faq_categories']['Update']

export type FAQ = Database['public']['Tables']['faqs']['Row']
export type FAQInsert = Database['public']['Tables']['faqs']['Insert']
export type FAQUpdate = Database['public']['Tables']['faqs']['Update']

export type BlogCategory = Database['public']['Tables']['blog_categories']['Row']
export type BlogCategoryInsert = Database['public']['Tables']['blog_categories']['Insert']
export type BlogCategoryUpdate = Database['public']['Tables']['blog_categories']['Update']

export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']

export type Media = Database['public']['Tables']['media']['Row']
export type MediaInsert = Database['public']['Tables']['media']['Insert']
export type MediaUpdate = Database['public']['Tables']['media']['Update']

export type SiteSetting = Database['public']['Tables']['site_settings']['Row']
export type SiteSettingInsert = Database['public']['Tables']['site_settings']['Insert']
export type SiteSettingUpdate = Database['public']['Tables']['site_settings']['Update']

// Extended types with relationships
export interface PageWithSections extends Page {
  sections: PageSection[]
}

export interface FAQCategoryWithFAQs extends FAQCategory {
  faqs: FAQ[]
}

export interface BlogPostWithCategory extends BlogPost {
  category: BlogCategory | null
}

// Section types for different page sections
export interface HeroSectionData {
  title: string
  subtitle: string
  cta_primary_text: string
  cta_primary_url: string
  cta_secondary_text: string
  cta_secondary_url: string
  background_image?: string
}

export interface ProblemCardData {
  title: string
  description: string
  icon: string
  order: number
}

export interface PlatformFeatureData {
  title: string
  description: string
  icon: string
  order: number
}

export interface CTASectionData {
  title: string
  description: string
  cta_primary_text: string
  cta_primary_url: string
  cta_secondary_text: string
  cta_secondary_url: string
}
