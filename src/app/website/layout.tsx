"use client"

// Force dynamic rendering for all website pages to support CMS functionality
export const dynamic = 'force-dynamic'
// Optional hardening to prevent cache issues with dynamic content
export const fetchCache = 'force-no-store'

import { useEffect } from "react"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Add data attribute to body for website pages
    document.body.setAttribute('data-page-type', 'website')
    
    // Cleanup on unmount
    return () => {
      document.body.removeAttribute('data-page-type')
    }
  }, [])

  return (
    <>
      {children}
      <ScrollToTopButton />
    </>
  )
}
