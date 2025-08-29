"use client"

import { ReactNode, useState, createContext, useContext } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { ThemeToggle } from "@/components/theme-toggle"

// Create context for mobile menu state
interface MobileMenuContextType {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

const MobileMenuContext = createContext<MobileMenuContextType | null>(null)

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

  return (
    <MobileMenuContext.Provider value={{ mobileMenuOpen, setMobileMenuOpen }}>
      <div className={cn("min-h-screen", className)}>
        {header && (
          <header className="fixed top-0 left-0 right-0 z-50">
            {header}
          </header>
        )}
        
        <main className={cn("flex-1 flex", mainClassName, header && "pt-14 sm:pt-16")}>
          {/* Mobile menu overlay */}
          {mobileMenu && mobileMenuOpen && (
            <div 
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
          
          {/* Mobile Menu Drawer - Only visible on mobile/tablet */}
          {mobileMenu && (
            <aside className={cn(
              "flex-shrink-0 bg-background border-l border-border",
              "fixed top-0 bottom-0 right-0 z-50 w-61 sm:w-68 transform transition-transform duration-300 ease-in-out lg:hidden",
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-border h-14 sm:h-16">
                <h2 className="text-lg font-semibold">Menu</h2>
                <div className="flex items-center space-x-2">
                  <ThemeToggle />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 sm:h-10 sm:w-10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon name="close-line" className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="h-full overflow-y-auto">
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
