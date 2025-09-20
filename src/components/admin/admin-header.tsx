"use client"

import { Button } from '@/components/ui/button'
import { Menu, Bell, User, Eye } from 'lucide-react'
import Link from 'next/link'
import { NotificationsDropdown } from './notifications-dropdown'
import { ThemeToggle } from '@/components/theme-toggle'

interface AdminHeaderProps {
  onMenuClick: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {

  return (
    <header className="bg-background">
      <div className="flex h-14 sm:h-16 items-center justify-between px-2 sm:px-3 lg:px-4 border-b border-border">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden -ml-1 h-9 w-9"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          
          <div className="ml-1 sm:ml-2 lg:ml-0">
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground">
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
          <ThemeToggle />

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
