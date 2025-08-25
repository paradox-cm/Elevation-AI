"use client"

import { H1 } from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/ui/navigation"
import { Logo } from "@/components/ui/logo"
import { getBrandName } from "@/lib/brand-config"

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
  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/design-system", label: "Design System", active: currentPage === "overview" }
  ]

  return (
    <Navigation
      logo={
        <div className="flex items-center space-x-2">
          <Logo width={100} height={18} />
          {showBadge && <Badge variant="secondary">{badgeText}</Badge>}
        </div>
      }
      links={navigationLinks}
    />
  )
}
