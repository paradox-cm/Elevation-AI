import React from 'react'
import { DynamicPageClient } from './dynamic-page-client'
import { Page, PageSection } from '@/types/cms'

interface DynamicPageProps {
  page: Page
  sections: PageSection[]
  currentPage?: string
}

export function DynamicPage({ page, sections, currentPage }: DynamicPageProps) {
  return (
    <DynamicPageClient 
      page={page} 
      sections={sections} 
      currentPage={currentPage} 
    />
  )
}

// Helper function to load page data (server-side)
export async function loadPageData(slug: string) {
  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  
  try {
    // Load page data
    const { data: page, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (pageError || !page) {
      console.error('Error loading page:', pageError)
      return { page: null, sections: [] }
    }

    // Load page sections
    const { data: sections, error: sectionsError } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_id', page.id)
      .eq('is_published', true)
      .order('section_order', { ascending: true })

    if (sectionsError) {
      console.error('Error loading sections:', sectionsError)
      return { page, sections: [] }
    }

    return { page, sections: sections || [] }
  } catch (error) {
    console.error('Error loading page data:', error)
    return { page: null, sections: [] }
  }
}

export default DynamicPage
