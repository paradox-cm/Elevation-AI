"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

interface MobileMenuProps {
  currentPage?: string
}

export function MobileMenu({ currentPage }: MobileMenuProps) {
  const navigationLinks = [
    { href: "/", label: "Home", icon: "home-line" },
    { href: "/design-system", label: "Design System", icon: "apps-line" },
    { href: "/wireframes", label: "Wireframes", icon: "layout-line" }
  ]

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-3 sm:space-y-4">
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Navigation
          </h3>
          <nav className="space-y-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-3 sm:py-2 text-sm rounded-lg transition-colors",
                  currentPage === link.label.toLowerCase().replace(/\s+/g, '-') || 
                  (link.href === "/" && currentPage === "home")
                    ? "text-blue-500 bg-blue-500/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <div className="w-6 h-6 rounded flex items-center justify-center bg-blue-500/10 flex-shrink-0">
                  <Icon name={link.icon} className="h-3 w-3 text-blue-500" />
                </div>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
