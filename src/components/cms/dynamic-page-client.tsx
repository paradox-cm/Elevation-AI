"use client"

import React from 'react'
import { PageWrapper } from '@/components/page-wrapper'
import { MobileOnlyLayout } from '@/components/ui/layout/mobile-only-layout'
import { MainHeader } from '@/components/ui/main-header'
import { WebsiteFooter } from '@/components/ui/website-footer'
import { MobileMenuDrawer } from '@/components/ui/mobile-menu-drawer'
import { CookiesBanner } from '@/components/ui/cookies-banner'
import { DynamicSectionRenderer } from './dynamic-section-renderer'
import { Page, PageSection } from '@/types/cms'

interface DynamicPageClientProps {
  page: Page
  sections: PageSection[]
  currentPage?: string
}

export function DynamicPageClient({ page, sections, currentPage }: DynamicPageClientProps) {
  // Filter and sort sections
  const publishedSections = sections
    .filter(section => section.is_published)
    .sort((a, b) => a.section_order - b.section_order)

  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader currentPage={currentPage as string} />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage={currentPage as string} />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            {/* Render all dynamic sections */}
            {publishedSections.map((section) => (
              <DynamicSectionRenderer
                key={section.id}
                section={section}
              />
            ))}
          </main>
        </div>
      </MobileOnlyLayout>
      
      {/* Cookies Banner */}
      <CookiesBanner />
    </PageWrapper>
  )
}

export default DynamicPageClient
