"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  FileText, 
  HelpCircle, 
  BookOpen, 
  Settings
} from 'lucide-react'
import Link from 'next/link'
import { LoadingSpinner } from '@/components/ui/loading'
import { RecentActivity } from '@/components/admin/recent-activity'

interface DashboardStats {
  totalPages: number
  publishedPages: number
  totalBlogPosts: number
  publishedBlogPosts: number
  totalFAQs: number
  publishedFAQs: number
  totalMedia: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 0,
    publishedPages: 0,
    totalBlogPosts: 0,
    publishedBlogPosts: 0,
    totalFAQs: 0,
    publishedFAQs: 0,
    totalMedia: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<{ display_name: string | null } | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase
            .from('admin_profiles')
            .select('display_name')
            .eq('user_id', user.id)
            .single()
          
          setUserProfile(profile)
        }

        // Fetch pages stats
        const { count: totalPages } = await supabase
          .from('pages')
          .select('*', { count: 'exact', head: true })

        const { count: publishedPages } = await supabase
          .from('pages')
          .select('*', { count: 'exact', head: true })
          .eq('is_published', true)

        // Fetch blog posts stats
        const { count: totalBlogPosts } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true })

        const { count: publishedBlogPosts } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true })
          .eq('is_published', true)

        // Fetch FAQs stats
        const { count: totalFAQs } = await supabase
          .from('faqs')
          .select('*', { count: 'exact', head: true })

        const { count: publishedFAQs } = await supabase
          .from('faqs')
          .select('*', { count: 'exact', head: true })
          .eq('is_published', true)

        // Fetch media stats
        const { count: totalMedia } = await supabase
          .from('media')
          .select('*', { count: 'exact', head: true })

        setStats({
          totalPages: totalPages || 0,
          publishedPages: publishedPages || 0,
          totalBlogPosts: totalBlogPosts || 0,
          publishedBlogPosts: publishedBlogPosts || 0,
          totalFAQs: totalFAQs || 0,
          publishedFAQs: publishedFAQs || 0,
          totalMedia: totalMedia || 0
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [supabase])

  const quickActions = [
    {
      title: 'Manage Pages',
      description: 'Edit page content and sections',
      icon: FileText,
      href: '/admin/pages',
      color: 'bg-blue-500'
    },
    {
      title: 'Manage FAQs',
      description: 'Add and edit FAQ categories and questions',
      icon: HelpCircle,
      href: '/admin/faqs',
      color: 'bg-green-500'
    },
    {
      title: 'Manage Blog',
      description: 'Create and edit blog posts',
      icon: BookOpen,
      href: '/admin/blog',
      color: 'bg-purple-500'
    },
    {
      title: 'Media Library',
      description: 'Manage uploaded images and files',
      icon: Settings,
      href: '/admin/media',
      color: 'bg-orange-500'
    }
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading dashboard..." variant="css" />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {userProfile?.display_name 
            ? `Welcome back, ${userProfile.display_name}!` 
            : 'Welcome to the Elevation AI CMS'
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedPages}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalPages} total pages
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedBlogPosts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalBlogPosts} total posts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FAQs</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedFAQs}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalFAQs} total FAQs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Media Files</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMedia}</div>
            <p className="text-xs text-muted-foreground">
              uploaded files
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-2`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-base">{action.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {action.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <RecentActivity limit={10} showFilters={true} />
      </div>
    </div>
  )
}
