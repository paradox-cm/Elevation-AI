"use client"

import { createClient } from '@/lib/supabase/client'

export interface NavigationItem {
  id: string
  title: string
  slug: string
  category: 'main_nav' | 'footer' | 'resources' | 'standalone'
  position?: string
  order: number
  is_published: boolean
  meta_title?: string
  meta_description?: string
}

export interface NavigationConfig {
  mainNav: NavigationItem[]
  footer: NavigationItem[]
  resources: NavigationItem[]
}

const supabase = createClient()

export const navigationService = {
  // Get all pages organized by navigation category
  async getNavigationConfig(): Promise<NavigationConfig> {
    const { data: pages, error } = await supabase
      .from('pages')
      .select('*')
      .eq('is_published', true)
      .order('updated_at', { ascending: false })

    if (error) throw error

    const config: NavigationConfig = {
      mainNav: [],
      footer: [],
      resources: []
    }

    pages?.forEach((page: any, index: number) => {
      const navItem: NavigationItem = {
        id: page.id,
        title: page.title,
        slug: page.slug,
        category: page.page_category || 'standalone',
        position: page.navigation_position,
        order: page.navigation_order || index,
        is_published: page.is_published,
        meta_title: page.meta_title,
        meta_description: page.meta_description
      }

      switch (page.page_category) {
        case 'main_nav':
          config.mainNav.push(navItem)
          break
        case 'footer':
          config.footer.push(navItem)
          break
        case 'resources':
          config.resources.push(navItem)
          break
        default:
          // Standalone pages don't appear in navigation
          break
      }
    })

    return config
  },

  // Update page navigation settings
  async updatePageNavigation(pageId: string, navigationSettings: {
    category: 'main_nav' | 'footer' | 'resources' | 'standalone'
    position?: string
    order?: number
  }): Promise<void> {
    const { error } = await supabase
      .from('pages')
      .update({
        page_category: navigationSettings.category,
        navigation_position: navigationSettings.position || null,
        navigation_order: navigationSettings.order || 0,
        updated_at: new Date().toISOString()
      })
      .eq('id', pageId)

    if (error) throw error
  },

  // Get pages by category
  async getPagesByCategory(category: 'main_nav' | 'footer' | 'resources' | 'standalone'): Promise<NavigationItem[]> {
    const { data: pages, error } = await supabase
      .from('pages')
      .select('*')
      .eq('page_category', category)
      .eq('is_published', true)
      .order('navigation_order', { ascending: true })

    if (error) throw error

    return pages?.map((page: any, index: number) => ({
      id: page.id,
      title: page.title,
      slug: page.slug,
      category: page.page_category || 'standalone',
      position: page.navigation_position,
      order: page.navigation_order || index,
      is_published: page.is_published,
      meta_title: page.meta_title,
      meta_description: page.meta_description
    })) || []
  },

  // Reorder navigation items
  async reorderNavigationItems(category: 'main_nav' | 'footer' | 'resources', items: { id: string; order: number }[]): Promise<void> {
    const updates = items.map(item => ({
      id: item.id,
      navigation_order: item.order
    }))

    for (const update of updates) {
      const { error } = await supabase
        .from('pages')
        .update({
          navigation_order: update.navigation_order,
          updated_at: new Date().toISOString()
        })
        .eq('id', update.id)

      if (error) throw error
    }
  },

  // Get navigation structure for rendering
  async getNavigationStructure(): Promise<{
    mainNav: {
      platform: NavigationItem[]
      people: NavigationItem[]
      solutions: NavigationItem[]
      resources: NavigationItem[]
    }
    footer: {
      company: NavigationItem[]
      resources: NavigationItem[]
      legal: NavigationItem[]
    }
    resources: {
      about: NavigationItem[]
      partners: NavigationItem[]
      investors: NavigationItem[]
      developers: NavigationItem[]
    }
  }> {
    const config = await this.getNavigationConfig()

    const structure = {
      mainNav: {
        platform: config.mainNav.filter(item => item.position === 'platform'),
        people: config.mainNav.filter(item => item.position === 'people'),
        solutions: config.mainNav.filter(item => item.position === 'solutions'),
        resources: config.mainNav.filter(item => item.position === 'resources')
      },
      footer: {
        company: config.footer.filter(item => item.position === 'company'),
        resources: config.footer.filter(item => item.position === 'resources'),
        legal: config.footer.filter(item => item.position === 'legal')
      },
      resources: {
        about: config.resources.filter(item => item.position === 'about'),
        partners: config.resources.filter(item => item.position === 'partners'),
        investors: config.resources.filter(item => item.position === 'investors'),
        developers: config.resources.filter(item => item.position === 'developers')
      }
    }

    return structure
  }
}
