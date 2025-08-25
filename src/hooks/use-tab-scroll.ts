"use client"

import { useEffect, useLayoutEffect } from "react"

export function useTabScroll(activeTab: string) {
  // Use useLayoutEffect to scroll BEFORE the browser paints
  useLayoutEffect(() => {
    // Immediately scroll to top before any rendering
    window.scrollTo(0, 0)
  }, [activeTab])
}
