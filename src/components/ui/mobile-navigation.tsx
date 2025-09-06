"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Icon from "@/components/ui/icon"
import { cn } from "@/lib/utils"

export function MobileNavigation() {
  const pathname = usePathname()

  const navigationLinks = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/design-system", label: "Design System", active: pathname === "/design-system" },
    { href: "/website", label: "Website", active: pathname.startsWith("/website") }
  ]

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Navigation
          </h2>
          <nav className="space-y-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  link.active
                    ? "text-blue-500 bg-blue-500/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <div className="w-6 h-6 rounded flex items-center justify-center bg-blue-500/10">
                  <Icon 
                    name={
                      link.href === "/" ? "home-line" :
                      link.href === "/design-system" ? "palette-line" :
                      "layout-line"
                    } 
                    className="h-4 w-4 text-blue-500" 
                  />
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
