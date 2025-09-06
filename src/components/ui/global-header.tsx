"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import Icon from "@/components/ui/icon"

interface GlobalHeaderProps {
  showLogin?: boolean
  showDemo?: boolean
}

export function GlobalHeader({ showLogin = true, showDemo = false }: GlobalHeaderProps) {
  return (
    <header className="border-b border-border dark:border-muted bg-background/40 backdrop-blur-2xl flex-shrink-0">
      <div className="w-full px-4 sm:px-4 md:px-6 lg:px-8 flex h-14 sm:h-18 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/wireframes/home" className="hover:opacity-80 transition-opacity">
            <Logo width={127} height={23} />
          </Link>
        </div>

        {/* Right side - Theme toggle, login, and demo button */}
        <div className="flex items-center space-x-3">
          {showLogin && (
            <Button variant="ghost" size="sm" asChild className="text-xs xl:text-sm hover:bg-muted/50">
              <Link href="/wireframes/login">
                <Icon name="login-box-line" className="h-4 w-4 mr-1" />
                Login
              </Link>
            </Button>
          )}
          {showDemo && (
            <Button size="sm" asChild className="text-xs xl:text-sm hover:bg-primary/90">
              <Link href="/wireframes/demo">
                Request a Demo
              </Link>
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
