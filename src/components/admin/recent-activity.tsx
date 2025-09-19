"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading'
import { activityService } from '@/lib/activity-service'
import { ActivityLog } from '@/types/cms'
import { 
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
  Clock,
  MoreHorizontal
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface RecentActivityProps {
  limit?: number
  showFilters?: boolean
  className?: string
}

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

export function RecentActivity({ 
  limit = 10, 
  showFilters = false, 
  className = '' 
}: RecentActivityProps) {
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        let data: ActivityLog[]
        if (filter === 'all') {
          data = await activityService.getRecent(limit)
        } else {
          data = await activityService.getByAction(filter, limit)
        }
        
        setActivities(data)
      } catch (err) {
        console.error('Error fetching activities:', err)
        setError('Failed to load recent activities')
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivities()
  }, [limit, filter])

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
    } catch {
      return 'Unknown time'
    }
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

  const truncateText = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner size="sm" text="Loading activities..." />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          {showFilters && (
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'create' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('create')}
              >
                Created
              </Button>
              <Button
                variant={filter === 'update' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('update')}
              >
                Updated
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>No recent activity</p>
            <p className="text-sm">Activities will appear here as you make changes</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    {getActionIcon(activity.action)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
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
                  
                  <p className="text-sm font-medium text-foreground mb-1">
                    {truncateText(activity.description)}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {activity.user_name || 'System'}
                    </span>
                    <span>
                      {formatTimestamp(activity.created_at)}
                    </span>
                  </div>
                  
                  {activity.entity_title && (
                    <div className="mt-2">
                      <span className="text-xs text-muted-foreground">
                        {activity.entity_type}: {truncateText(activity.entity_title, 40)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
