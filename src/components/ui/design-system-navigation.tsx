"use client"

import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/ui/logo"
import { useSidebar } from "@/components/ui/layout/app-shell"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Icon from "@/components/ui/icon"
import { cn } from "@/lib/utils"

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
  const { setSidebarOpen } = useSidebar()

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/design-system", label: "Design System", active: currentPage === "overview" }
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <Logo width={100} height={18} />
            {showBadge && <Badge variant="secondary">{badgeText}</Badge>}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80",
                link.active ? "text-foreground" : "text-foreground/60"
              )}
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile & Tablet Navigation */}
        <div className="flex items-center space-x-2 lg:hidden">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Icon name="menu-line" className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}
