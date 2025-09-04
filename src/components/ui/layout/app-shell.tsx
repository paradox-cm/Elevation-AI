"use client"

import { ReactNode, useState, createContext, useContext } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

// Create context for sidebar state
interface SidebarContextType {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | null>(null)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
      throw new Error("useSidebar must be used within an AppShell")
  }
  return context
}

interface AppShellProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  sidebar?: ReactNode
  className?: string
  mainClassName?: string
}

export function AppShell({ 
  children, 
  header, 
  footer,
  sidebar,
  className,
  mainClassName
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <div className={cn("min-h-screen", className)}>
        {header && (
          <header className="fixed top-0 left-0 right-0 z-50">
            {header}
          </header>
        )}
        
        <main className={cn("flex-1 flex", mainClassName, header && "pt-14 sm:pt-16")}>
          {/* Mobile sidebar overlay */}
          {sidebar && sidebarOpen && (
            <div 
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          {/* Desktop Sidebar */}
          {sidebar && (
            <aside className={cn(
              "flex-shrink-0 bg-background border-r border-border dark:border-muted",
              "hidden lg:block lg:relative lg:translate-x-0 lg:fixed lg:top-16 lg:bottom-0 lg:left-0 lg:z-30 lg:w-64"
            )}>
              <div className="h-full overflow-y-auto">
                {sidebar}
              </div>
            </aside>
          )}
          
          {/* Mobile & Tablet Sidebar - Optimized for Touch */}
          {sidebar && (
            <aside className={cn(
              "flex-shrink-0 bg-background border-l border-border dark:border-muted",
              "fixed top-0 bottom-0 right-0 z-50 w-72 sm:w-80 transform transition-transform duration-300 ease-in-out lg:hidden",
              sidebarOpen ? "translate-x-0" : "translate-x-full"
            )}>
              <div className="flex items-center justify-between p-4 border-b border-border dark:border-muted">
                <h2 className="text-lg font-semibold">Design System</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon name="close-line" className="h-5 w-5" />
                </Button>
              </div>
              <div className="h-full overflow-y-auto">
                {sidebar}
              </div>
            </aside>
          )}
          
          {/* Main content - Mobile Optimized */}
          <div className={cn("flex-1 flex flex-col min-w-0", sidebar && "lg:ml-64")}>
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
    </SidebarContext.Provider>
  )
}
