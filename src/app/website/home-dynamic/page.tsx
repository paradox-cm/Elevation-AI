"use client"

import React from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MainHeader } from "@/components/ui/main-header"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { DynamicPageClient } from "@/components/cms/dynamic-page-client"
import { pagesService } from "@/lib/cms"

export default async function DynamicHomePage() {
  // Fetch page data from CMS
  const pageData = await pagesService.getWithSections('home')
  
  if (!pageData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Page not found</h2>
          <p className="text-muted-foreground">The home page could not be loaded from the CMS.</p>
        </div>
      </div>
    )
  }

  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader currentPage="home" />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="homepage" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            <DynamicPageClient page={pageData} />
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
