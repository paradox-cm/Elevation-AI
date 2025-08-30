"use client"

import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Icon from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useContext } from "react"
import { MobileMenuContext } from "@/components/ui/layout/mobile-only-layout"


interface NavigationProps {
  currentPage?: string
  showBadge?: boolean
  badgeText?: string
  onMobileMenuToggle?: () => void
  showMobileMenuButton?: boolean
}

// Main navigation component
export function Navigation({ 
  currentPage,
  showBadge = true,
  badgeText = "Design System",
  onMobileMenuToggle,
  showMobileMenuButton = true
}: NavigationProps) {
  // Safely access mobile menu context if available
  const mobileMenuContext = useContext(MobileMenuContext)
  const mobileMenuOpen = mobileMenuContext?.mobileMenuOpen || false
  const setMobileMenuOpen = mobileMenuContext?.setMobileMenuOpen || (() => {})

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/design-system", label: "Design System", active: currentPage === "overview" },
    { href: "/wireframes", label: "Wireframes", active: currentPage === "wireframes" }
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 flex h-14 sm:h-16 items-center justify-between">
        {/* Logo - Mobile Optimized */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo width={110} height={20} />
            </Link>
            {showBadge && (
              <Badge variant="secondary" className="text-xs sm:text-sm px-2 py-1">
                {badgeText}
              </Badge>
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80 px-3 py-2 rounded-md",
                link.active ? "text-foreground bg-muted" : "text-foreground/60 hover:bg-muted/50"
              )}
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile & Tablet Navigation - Optimized Touch Targets */}
        <div className="flex items-center space-x-1 sm:space-x-2 lg:hidden">
          <ThemeToggle />
          {showMobileMenuButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 sm:h-11 sm:w-11"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "close-line" : "menu-line"} className="h-5 w-5" />
              <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Toggle menu"}</span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
