"use client"

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
