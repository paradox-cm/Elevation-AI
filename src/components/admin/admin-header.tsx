"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, Bell, User, Eye, Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { NotificationsDropdown } from './notifications-dropdown'

interface AdminHeaderProps {
  onMenuClick: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-background">
      <div className="flex h-16 items-center justify-between px-3 sm:px-4 border-b border-border">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden -ml-1"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="ml-2 sm:ml-4 lg:ml-0">
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">
              <span className="hidden sm:inline">Content Management</span>
              <span className="sm:hidden">CMS</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
          {/* View Site Button - Hidden on mobile */}
          <Button variant="outline" size="sm" asChild className="hidden sm:flex">
            <Link href="/" target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              <span className="hidden lg:inline">View Site</span>
            </Link>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-8 w-8 sm:h-9 sm:w-9 p-0"
          >
            <Sun className="h-3 w-3 sm:h-4 sm:w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-3 w-3 sm:h-4 sm:w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications */}
          <NotificationsDropdown />

          {/* User Menu */}
          <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0" asChild>
            <Link href="/admin/profile">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
