"use client"

import { useSidebar } from "@/components/ui/layout/app-shell"
import { Navigation } from "@/components/ui/navigation"

interface DesignSystemNavigationProps {
  currentPage?: string
  showBadge?: boolean
  badgeText?: string
}

export function DesignSystemNavigation({ 
  currentPage,
  showBadge = true,
  badgeText = "Design System"
}: DesignSystemNavigationProps) {
  const { sidebarOpen, setSidebarOpen } = useSidebar()

  return (
    <Navigation
      currentPage={currentPage}
      showBadge={showBadge}
      badgeText={badgeText}
      onMobileMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      showMobileMenuButton={true}
    />
  )
}
