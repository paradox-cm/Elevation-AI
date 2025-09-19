"use client"

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export function useCMSRefresh() {
  const router = useRouter()

  const refreshPage = useCallback((path?: string) => {
    if (path) {
      // Use window.location to force a full page refresh
      window.location.href = path
    } else {
      router.refresh()
    }
  }, [router])

  const refreshCurrentPage = useCallback(() => {
    router.refresh()
  }, [router])

  const refreshHomePage = useCallback(() => {
    // Trigger custom event to refresh home page data
    window.dispatchEvent(new CustomEvent('refresh-home-page'))
  }, [])

  return {
    refreshPage,
    refreshCurrentPage,
    refreshHomePage
  }
}
