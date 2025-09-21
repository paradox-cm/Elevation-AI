"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  X, 
  Home, 
  FileText, 
  HelpCircle, 
  BookOpen, 
  Image, 
  Settings,
  Users,
  LogOut,
  MessageSquare,
  Bell,
  Mail,
  ChevronDown,
  ChevronRight,
  CheckSquare,
  LifeBuoy
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { SupportModal } from '@/components/admin/support-modal'

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const pageSlugs = [
  { name: 'Home', slug: 'home' },
  { name: 'Platform', slug: 'platform' },
  { name: 'People - Concierge', slug: 'people-concierge' },
  { name: 'People - Experts', slug: 'people-experts' },
  { name: 'Solutions', slug: 'solutions' },
  { name: 'Pricing', slug: 'pricing' },
  { name: 'About', slug: 'about' },
  { name: 'Partners', slug: 'partners' },
  { name: 'Investors', slug: 'investors' },
  { name: 'Developers', slug: 'developers' }
]

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { 
    name: 'Pages', 
    href: '/admin/pages', 
    icon: FileText, 
    hasSubmenu: true, 
    submenu: pageSlugs 
  },
  { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { name: 'Blog', href: '/admin/blog', icon: BookOpen },
  { name: 'Press', href: '/admin/press', icon: FileText },
  { name: 'Media', href: '/admin/media', icon: Image },
  { name: 'Submissions', href: '/admin/submissions', icon: MessageSquare },
  { name: 'Emails', href: '/admin/emails', icon: Mail },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  { name: 'To-Do', href: '/admin/todo', icon: CheckSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const supabase = createClient()
  const router = useRouter()
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set())
  const [pageIdMap, setPageIdMap] = useState<Record<string, string>>({})
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false)

  // Fetch page IDs for direct edit navigation
  useEffect(() => {
    const fetchPageIds = async () => {
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('id, slug')
          .in('slug', pageSlugs.map(p => p.slug))

        if (error) {
          console.error('Error fetching page IDs:', error)
          return
        }

        const idMap: Record<string, string> = {}
        data?.forEach((page: { slug: string; id: string }) => {
          idMap[page.slug] = page.id
        })
        setPageIdMap(idMap)
      } catch (error) {
        console.error('Error fetching page IDs:', error)
      }
    }

    fetchPageIds()
  }, [supabase])

  const getEditUrl = (slug: string) => {
    const pageId = pageIdMap[slug]
    return pageId ? `/admin/pages/${pageId}/edit` : '/admin/pages'
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const toggleMenu = (menuName: string) => {
    const newExpanded = new Set(expandedMenus)
    if (newExpanded.has(menuName)) {
      newExpanded.delete(menuName)
    } else {
      newExpanded.add(menuName)
    }
    setExpandedMenus(newExpanded)
  }

  const isMenuExpanded = (menuName: string) => expandedMenus.has(menuName)

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-80 sm:w-72 lg:w-64 bg-background shadow-lg border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <img
                className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
                src="/images/Favicon-Stroke.png"
                alt="Elevation AI"
              />
              <span className="text-sm font-semibold text-foreground">
                <span className="hidden sm:inline">Elevation AI CMS</span>
                <span className="sm:hidden">E-AI CMS</span>
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden -mr-1 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto space-y-1 px-2 py-3 sm:py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const isExpanded = item.hasSubmenu ? isMenuExpanded(item.name) : false
              
              if (item.hasSubmenu) {
                return (
                  <div key={item.name}>
                    <div className={cn(
                      "flex items-center rounded-md transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}>
                      {/* Main clickable area - links to the main page */}
                      <Link
                        href={item.href}
                        className="flex-1 flex items-center px-2 py-3 sm:py-2 text-sm font-medium"
                        onClick={() => {
                          // Close mobile sidebar when navigating
                          if (window.innerWidth < 1024) {
                            onClose()
                          }
                        }}
                      >
                        <item.icon
                          className={cn(
                            "mr-3 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0",
                            isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                          )}
                        />
                        {item.name}
                      </Link>
                      
                      {/* Expand/collapse button */}
                      <button
                        onClick={() => toggleMenu(item.name)}
                        className="px-2 py-3 sm:py-2 text-sm font-medium flex items-center justify-center min-w-[44px] hover:bg-black/10 rounded-r-md"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="h-4 w-4 flex-shrink-0" />
                        )}
                      </button>
                    </div>
                    
                    {isExpanded && item.submenu && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.submenu.map((subItem) => {
                          const editUrl = getEditUrl(subItem.slug)
                          const isSubActive = pathname === editUrl
                          return (
                            <Link
                              key={subItem.slug}
                              href={editUrl}
                              className={cn(
                                "group flex items-center px-2 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors",
                                isSubActive
                                  ? "bg-primary/20 text-primary"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              )}
                              onClick={() => {
                                // Close mobile sidebar when navigating
                                if (window.innerWidth < 1024) {
                                  onClose()
                                }
                              }}
                            >
                              <div className="w-1 h-1 rounded-full bg-current mr-2 flex-shrink-0" />
                              {subItem.name}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              }
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-3 sm:py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  onClick={() => {
                    // Close mobile sidebar when navigating
                    if (window.innerWidth < 1024) {
                      onClose()
                    }
                  }}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0",
                      isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-2 sm:p-3 lg:p-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground py-3 sm:py-2"
              onClick={() => setIsSupportModalOpen(true)}
            >
              <LifeBuoy className="mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              Support
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground py-3 sm:py-2"
              onClick={handleSignOut}
            >
              <LogOut className="mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Support Modal */}
      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
    </>
  )
}
