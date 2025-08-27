"use client"

import { useMobileMenu } from "@/components/ui/layout/mobile-only-layout"
import { Navigation } from "@/components/ui/navigation"

interface MobileOnlyNavigationProps {
  currentPage?: string
  showBadge?: boolean
  badgeText?: string
}

export function MobileOnlyNavigation({ 
  currentPage,
  showBadge = true,
  badgeText = "Design System"
}: MobileOnlyNavigationProps) {
  const { setMobileMenuOpen } = useMobileMenu()

  return (
    <Navigation
      currentPage={currentPage}
      showBadge={showBadge}
      badgeText={badgeText}
      onMobileMenuToggle={() => setMobileMenuOpen(true)}
      showMobileMenuButton={true}
    />
  )
}
