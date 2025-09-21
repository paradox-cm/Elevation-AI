"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LoadingSpinner } from '@/components/ui/loading'
import { activityService } from '@/lib/activity-service'
import { ActivityLog } from '@/types/cms'
import { 
  Clock, 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  FileText, 
  BookOpen, 
  HelpCircle, 
  Image, 
  Settings, 
  User,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  TrendingUp,
  Users,
  Activity
} from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'
import Link from 'next/link'

interface ActivityStats {
  totalActivities: number
  activitiesToday: number
  activitiesThisWeek: number
  activitiesThisMonth: number
  topActions: Array<{ action: string; count: number }>
  topEntityTypes: Array<{ entity_type: string; count: number }>
  topUsers: Array<{ user_name: string; count: number }>
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [stats, setStats] = useState<ActivityStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [actionFilter, setActionFilter] = useState('all')
  const [entityFilter, setEntityFilter] = useState('all')
  const [userFilter, setUserFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  
  const itemsPerPage = 20

  const actionIcons = {
    create: Plus,
    update: Edit,
    delete: Trash2,
    publish: Eye,
    unpublish: EyeOff,
    login: User,
    logout: User
  }

  const entityIcons = {
    page: FileText,
    page_section: FileText,
    blog_post: BookOpen,
    blog_category: BookOpen,
    faq: HelpCircle,
    faq_category: HelpCircle,
    media: Image,
    site_setting: Settings,
    user: User
  }

  const actionColors = {
    create: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    update: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    delete: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
    publish: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800',
    unpublish: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
    login: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
    logout: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800'
  }

  const fetchActivities = async (page: number = 0, reset: boolean = false) => {
    try {
      if (reset) {
        setIsLoading(true)
        setCurrentPage(0)
      } else {
        setIsLoadingMore(true)
      }
      
      setError(null)
      
      const offset = page * itemsPerPage
      let data: ActivityLog[]
      
      // Apply filters
      if (actionFilter !== 'all') {
        data = await activityService.getByAction(actionFilter, itemsPerPage)
      } else {
        data = await activityService.getRecent(itemsPerPage, offset)
      }
      
      if (reset) {
        setActivities(data)
      } else {
        setActivities(prev => [...prev, ...data])
      }
      
      setHasMore(data.length === itemsPerPage)
      setCurrentPage(page)
    } catch (err) {
      console.error('Error fetching activities:', err)
      setError('Failed to load activities')
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  const fetchStats = async () => {
    try {
      const statsData = await activityService.getStats()
      setStats(statsData)
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  useEffect(() => {
    fetchActivities(0, true)
    fetchStats()
  }, [])

  useEffect(() => {
    // Refetch when filters change
    fetchActivities(0, true)
  }, [actionFilter, entityFilter, userFilter, dateFilter])

  const loadMore = () => {
    if (!isLoadingMore && hasMore) {
      fetchActivities(currentPage + 1, false)
    }
  }

  const refresh = () => {
    fetchActivities(0, true)
    fetchStats()
  }

  const getActionIcon = (action: string) => {
    const IconComponent = actionIcons[action as keyof typeof actionIcons] || Clock
    return <IconComponent className="h-4 w-4" />
  }

  const getEntityIcon = (entityType: string) => {
    const IconComponent = entityIcons[entityType as keyof typeof entityIcons] || FileText
    return <IconComponent className="h-4 w-4" />
  }

  const getActionColor = (action: string) => {
    return actionColors[action as keyof typeof actionColors] || 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800'
  }

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
    } catch {
      return 'Unknown time'
    }
  }

  const formatFullDate = (timestamp: string) => {
    try {
      return format(new Date(timestamp), 'MMM d, yyyy \'at\' h:mm a')
    } catch {
      return 'Unknown date'
    }
  }

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = searchTerm === '' || 
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.entity_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user_name?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesEntity = entityFilter === 'all' || activity.entity_type === entityFilter
    const matchesUser = userFilter === 'all' || activity.user_name === userFilter
    
    return matchesSearch && matchesEntity && matchesUser
  })

  if (isLoading && activities.length === 0) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Activity Log</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Track all system activities and changes
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" text="Loading activity log..." />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Activity Log</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Track all system activities and changes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={refresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalActivities.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activitiesToday}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activitiesThisWeek}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activitiesThisMonth}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Action</label>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="create">Created</SelectItem>
                  <SelectItem value="update">Updated</SelectItem>
                  <SelectItem value="delete">Deleted</SelectItem>
                  <SelectItem value="publish">Published</SelectItem>
                  <SelectItem value="unpublish">Unpublished</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="logout">Logout</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Entity Type</label>
              <Select value={entityFilter} onValueChange={setEntityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All entities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Entities</SelectItem>
                  <SelectItem value="page">Pages</SelectItem>
                  <SelectItem value="page_section">Page Sections</SelectItem>
                  <SelectItem value="blog_post">Blog Posts</SelectItem>
                  <SelectItem value="faq">FAQs</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="user">Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">User</label>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {stats?.topUsers.map((user) => (
                    <SelectItem key={user.user_name} value={user.user_name}>
                      {user.user_name} ({user.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activities
            {filteredActivities.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {filteredActivities.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <Button variant="outline" onClick={refresh}>
                Retry
              </Button>
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg font-medium">No activities found</p>
              <p className="text-sm">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      {getActionIcon(activity.action)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getActionColor(activity.action)}`}
                      >
                        {activity.action}
                      </Badge>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        {getEntityIcon(activity.entity_type)}
                        <span className="text-xs capitalize">
                          {activity.entity_type.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm font-medium text-foreground mb-2">
                      {truncateText(activity.description)}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {activity.user_name || 'System'}
                      </span>
                      <div className="text-right">
                        <div>{formatTimestamp(activity.created_at)}</div>
                        <div className="text-xs opacity-75">
                          {formatFullDate(activity.created_at)}
                        </div>
                      </div>
                    </div>
                    
                    {activity.entity_title && (
                      <div className="mt-2">
                        <span className="text-xs text-muted-foreground">
                          {activity.entity_type}: {truncateText(activity.entity_title, 60)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center pt-4">
                  <Button 
                    variant="outline" 
                    onClick={loadMore}
                    disabled={isLoadingMore}
                    className="w-full sm:w-auto"
                  >
                    {isLoadingMore ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Loading...
                      </>
                    ) : (
                      'Load More'
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
