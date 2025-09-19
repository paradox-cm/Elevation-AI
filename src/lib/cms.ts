import { createClient } from '@/lib/supabase/client'
import { activityService } from '@/lib/activity-service'
import { 
  Page, 
  PageSection, 
  FAQCategory, 
  FAQ, 
  BlogPost, 
  BlogCategory,
  Media,
  SiteSetting,
  PageWithSections,
  FAQCategoryWithFAQs,
  BlogPostWithCategory
} from '@/types/cms'

// Export types for use in components
export type {
  Page,
  PageSection,
  FAQCategory,
  FAQ,
  BlogPost,
  BlogCategory,
  Media,
  SiteSetting,
  PageWithSections,
  FAQCategoryWithFAQs,
  BlogPostWithCategory
}

const supabase = createClient()

// Pages CRUD Operations
export const pagesService = {
  async getAll(): Promise<Page[]> {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('updated_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getBySlug(slug: string): Promise<Page | null> {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()
    
    if (error) return null
    return data
  },

  async getWithSections(slug: string): Promise<PageWithSections | null> {
    const { data: page, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()
    
    if (pageError || !page) return null

    const { data: sections, error: sectionsError } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_id', page.id)
      .eq('is_published', true)
      .order('section_order', { ascending: true })
    
    if (sectionsError) throw sectionsError

    return {
      ...page,
      sections: sections || []
    }
  },

  async create(page: Omit<Page, 'id' | 'created_at' | 'updated_at'>): Promise<Page> {
    const { data, error } = await supabase
      .from('pages')
      .insert(page)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<Page>): Promise<Page> {
    const { data, error } = await supabase
      .from('pages')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Page Sections CRUD Operations
export const pageSectionsService = {
  async getByPageId(pageId: string): Promise<PageSection[]> {
    const { data, error } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_id', pageId)
      .eq('is_published', true)
      .order('section_order', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  async create(section: Omit<PageSection, 'id' | 'created_at' | 'updated_at'>): Promise<PageSection> {
    const { data, error } = await supabase
      .from('page_sections')
      .insert(section)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<PageSection>): Promise<PageSection> {
    console.log('Updating page section:', id, updates)
    
    // Get the current section to track changes
    const { data: currentSection } = await supabase
      .from('page_sections')
      .select('*, pages(title)')
      .eq('id', id)
      .single()
    
    const { data, error } = await supabase
      .from('page_sections')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating page section:', error)
      throw error
    }
    
    // Log the activity if we have the current section data
    if (currentSection) {
      try {
        await activityService.logPageSectionUpdate(
          id,
          currentSection.title || 'Untitled Section',
          currentSection.pages?.title || 'Unknown Page',
          updates
        )
      } catch (logError) {
        console.error('Error logging page section update:', logError)
        // Don't throw here, as the main operation succeeded
      }
    }
    
    console.log('Page section updated successfully:', data)
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('page_sections')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// FAQ Categories CRUD Operations
export const faqCategoriesService = {
  async getAll(): Promise<FAQCategoryWithFAQs[]> {
    const { data: categories, error: categoriesError } = await supabase
      .from('faq_categories')
      .select('*')
      .eq('is_published', true)
      .order('order_index', { ascending: true })
    
    if (categoriesError) throw categoriesError

    const categoriesWithFAQs = await Promise.all(
      (categories || []).map(async (category: any) => {
        const { data: faqs, error: faqsError } = await supabase
          .from('faqs')
          .select('*')
          .eq('category_id', category.id)
          .eq('is_published', true)
          .order('order_index', { ascending: true })
        
        if (faqsError) throw faqsError

        return {
          ...category,
          faqs: faqs || []
        }
      })
    )

    return categoriesWithFAQs
  },

  async create(category: Omit<FAQCategory, 'id' | 'created_at' | 'updated_at'>): Promise<FAQCategory> {
    const { data, error } = await supabase
      .from('faq_categories')
      .insert(category)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<FAQCategory>): Promise<FAQCategory> {
    const { data, error } = await supabase
      .from('faq_categories')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('faq_categories')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// FAQs CRUD Operations
export const faqsService = {
  async getByCategoryId(categoryId: string): Promise<FAQ[]> {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('category_id', categoryId)
      .eq('is_published', true)
      .order('order_index', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  async create(faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>): Promise<FAQ> {
    const { data, error } = await supabase
      .from('faqs')
      .insert(faq)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<FAQ>): Promise<FAQ> {
    const { data, error } = await supabase
      .from('faqs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Blog Posts CRUD Operations
export const blogPostsService = {
  async getAll(): Promise<BlogPostWithCategory[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*)
      `)
      .eq('is_published', true)
      .order('published_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getBySlug(slug: string): Promise<BlogPostWithCategory | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*)
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .single()
    
    if (error) return null
    return data
  },

  async getByCategory(categorySlug: string): Promise<BlogPostWithCategory[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*)
      `)
      .eq('category.slug', categorySlug)
      .eq('is_published', true)
      .order('published_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async create(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Blog Categories CRUD Operations
export const blogCategoriesService = {
  async getAll(): Promise<BlogCategory[]> {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .eq('is_published', true)
      .order('name', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  async getBySlug(slug: string): Promise<BlogCategory | null> {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()
    
    if (error) return null
    return data
  },

  async create(category: Omit<BlogCategory, 'id' | 'created_at' | 'updated_at'>): Promise<BlogCategory> {
    const { data, error } = await supabase
      .from('blog_categories')
      .insert(category)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<BlogCategory>): Promise<BlogCategory> {
    const { data, error } = await supabase
      .from('blog_categories')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('blog_categories')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Media CRUD Operations
export const mediaService = {
  async getAll(): Promise<Media[]> {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<Media | null> {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) return null
    return data
  },

  async create(media: Omit<Media, 'id' | 'created_at'>): Promise<Media> {
    const { data, error } = await supabase
      .from('media')
      .insert(media)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<Media>): Promise<Media> {
    const { data, error } = await supabase
      .from('media')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Site Settings CRUD Operations
export const siteSettingsService = {
  async getAll(): Promise<SiteSetting[]> {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('key', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  async getByKey(key: string): Promise<string | null> {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .single()
    
    if (error) return null
    return data?.value || null
  },

  async set(key: string, value: string, description?: string): Promise<SiteSetting> {
    // Get the current value to track changes
    const { data: currentSetting } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .single()
    
    const { data, error } = await supabase
      .from('site_settings')
      .upsert({
        key,
        value,
        description,
        updated_at: new Date().toISOString(),
        updated_by: (await supabase.auth.getUser()).data.user?.id || ''
      })
      .select()
      .single()
    
    if (error) throw error
    
    // Log the activity if the value changed
    if (currentSetting && currentSetting.value !== value) {
      try {
        await activityService.logSiteSettingUpdate(key, currentSetting.value, value)
      } catch (logError) {
        console.error('Error logging site setting update:', logError)
        // Don't throw here, as the main operation succeeded
      }
    }
    
    return data
  }
}
