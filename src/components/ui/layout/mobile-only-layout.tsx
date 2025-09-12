"use client"

import { ReactNode, useState, createContext, useContext } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/ui/logo"

// Create context for mobile menu state
interface MobileMenuContextType {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  expandedPlatform: boolean
  expandedPeople: boolean
  expandedSolutions: boolean
  expandedResources: boolean
  expandedQuickLinks: boolean
  setExpandedPlatform: (expanded: boolean) => void
  setExpandedPeople: (expanded: boolean) => void
  setExpandedSolutions: (expanded: boolean) => void
  setExpandedResources: (expanded: boolean) => void
  setExpandedQuickLinks: (expanded: boolean) => void
}

export const MobileMenuContext = createContext<MobileMenuContextType | null>(null)

export function useMobileMenu() {
  const context = useContext(MobileMenuContext)
  if (!context) {
      throw new Error("useMobileMenu must be used within a MobileOnlyLayout")
  }
  return context
}

interface MobileOnlyLayoutProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  mobileMenu?: ReactNode
  className?: string
  mainClassName?: string
}

export function MobileOnlyLayout({ 
  children, 
  header, 
  footer,
  mobileMenu,
  className,
  mainClassName
}: MobileOnlyLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Dropdown states - persist across drawer open/close cycles
  const [expandedPlatform, setExpandedPlatform] = useState(false)
  const [expandedPeople, setExpandedPeople] = useState(false)
  const [expandedSolutions, setExpandedSolutions] = useState(false)
  const [expandedResources, setExpandedResources] = useState(false)
  const [expandedQuickLinks, setExpandedQuickLinks] = useState(false)

  return (
    <MobileMenuContext.Provider value={{ 
      mobileMenuOpen, 
      setMobileMenuOpen,
      expandedPlatform,
      expandedPeople,
      expandedSolutions,
      expandedResources,
      expandedQuickLinks,
      setExpandedPlatform,
      setExpandedPeople,
      setExpandedSolutions,
      setExpandedResources,
      setExpandedQuickLinks
    }}>
      <div className={cn("min-h-screen", className)}>
        {header && (
          <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-colors duration-150",
            (mobileMenuOpen || mobileMenu) && "!bg-background/40 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/20"
          )}>
            {header}
          </header>
        )}
        
        <main className={cn("flex-1 flex", mainClassName, header && "pt-14 sm:pt-16")}>
          {/* Mobile menu overlay */}
          {mobileMenu && mobileMenuOpen && (
            <div 
              className="fixed inset-0 z-[45] bg-black/10 backdrop-blur-sm xl:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
          
          {/* Mobile Menu Drawer - Only visible below xl */}
          {mobileMenu && mobileMenuOpen && (
            <aside className={cn(
              "flex-shrink-0 bg-background border-t border-b border-border dark:border-muted",
              "fixed top-0 left-0 right-0 z-[50] transform transition-transform duration-150 ease-out xl:hidden",
              "h-[80vh] translate-y-14 sm:translate-y-16"
            )}>
              <div className="h-full bg-background">
                {mobileMenu}
              </div>
            </aside>
          )}
          
          {/* Main content - Full width on desktop */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1">
              {children}
            </div>
          </div>
        </main>
        
        {footer && (
          <footer className="flex-shrink-0">
            {footer}
          </footer>
        )}
      </div>
    </MobileMenuContext.Provider>
  )
}
