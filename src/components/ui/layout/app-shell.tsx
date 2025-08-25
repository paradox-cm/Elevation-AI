"use client"

import { ReactNode, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

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
    <div className={cn("min-h-screen", className)}>
      {header && (
        <header className="fixed top-0 left-0 right-0 z-50">
          {header}
        </header>
      )}
      
      <main className={cn("flex-1 flex", mainClassName, header && "pt-16")}>
        {/* Mobile sidebar overlay */}
        {sidebar && sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        {sidebar && (
          <aside className={cn(
            "flex-shrink-0 bg-background border-r border-border",
            "fixed top-16 bottom-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:fixed",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
              <h2 className="text-lg font-semibold">Design System</h2>
              <Button
                variant="ghost"
                size="sm"
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
        
        {/* Main content */}
        <div className={cn("flex-1 flex flex-col", sidebar && "lg:ml-64")}>
          {/* Mobile menu button */}
          {sidebar && (
            <div className="lg:hidden p-4 border-b border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
              >
                <Icon name="menu-line" className="h-5 w-5 mr-2" />
                Menu
              </Button>
            </div>
          )}
          
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
  )
}
