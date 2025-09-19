"use client"

import React from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MainHeader } from "@/components/ui/main-header"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { DynamicPageClient } from "@/components/cms/dynamic-page-client"
import { DynamicPageContent } from "@/components/cms/dynamic-page-content"

export default function DynamicHomePage() {
  // Page data will be fetched by the DynamicPageClient component

  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader currentPage="home" />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="homepage" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            <DynamicPageContent pageSlug="home" />
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
