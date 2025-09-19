"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Bell, 
  MessageSquare, 
  AlertCircle, 
  Info, 
  CheckCircle,
  Archive,
  Filter,
  Search,
  ExternalLink,
  Trash2
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Notification {
  id: string
  type: string
  title: string
  message: string
  data: any
  is_read: boolean
  is_archived: boolean
  priority: string
  related_type: string | null
  related_id: string | null
  created_at: string
  updated_at: string
  read_at: string | null
}

const typeLabels = {
  form_submission: 'Form Submission',
  system: 'System',
  alert: 'Alert',
  info: 'Information'
}

const typeIcons = {
  form_submission: MessageSquare,
  system: Info,
  alert: AlertCircle,
  info: Info
}

const typeColors = {
  form_submission: 'text-blue-600 dark:text-blue-400',
  system: 'text-green-600 dark:text-green-400',
  alert: 'text-red-600 dark:text-red-400',
  info: 'text-gray-600 dark:text-gray-400'
}

const statusLabels = {
  unread: 'Unread',
  read: 'Read',
  archived: 'Archived'
}

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent'
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600',
  medium: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
  high: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700',
  urgent: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700'
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/admin/login')
        return
      }

      const { data: notificationsData, error: notificationsError } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (notificationsError) throw notificationsError

      setNotifications(notificationsData || [])
    } catch (error) {
      console.error('Error fetching notifications:', error)
      setError('Failed to load notifications')
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ 
          is_read: true,
          read_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error

      setNotifications(prev => prev.map(notification => 
        notification.id === id 
          ? { ...notification, is_read: true, read_at: new Date().toISOString() }
          : notification
      ))
    } catch (error) {
      console.error('Error marking notification as read:', error)
      setError('Failed to update notification')
    }
  }

  const markAllAsRead = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('notifications')
        .update({ 
          is_read: true,
          read_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('is_read', false)

      if (error) throw error

      setNotifications(prev => prev.map(notification => 
        ({ ...notification, is_read: true, read_at: new Date().toISOString() })
      ))
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
      setError('Failed to update notifications')
    }
  }

  const archiveNotification = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_archived: true })
        .eq('id', id)

      if (error) throw error

      setNotifications(prev => prev.map(notification => 
        notification.id === id 
          ? { ...notification, is_archived: true }
          : notification
      ))
    } catch (error) {
      console.error('Error archiving notification:', error)
      setError('Failed to archive notification')
    }
  }

  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id)

      if (error) throw error

      setNotifications(prev => prev.filter(notification => notification.id !== id))
    } catch (error) {
      console.error('Error deleting notification:', error)
      setError('Failed to delete notification')
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = searchTerm === '' || 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'unread' && !notification.is_read) ||
      (statusFilter === 'read' && notification.is_read) ||
      (statusFilter === 'archived' && notification.is_archived)
    
    const matchesType = typeFilter === 'all' || notification.type === typeFilter
    const matchesPriority = priorityFilter === 'all' || notification.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getNotificationLink = (notification: Notification) => {
    if (notification.related_type === 'form_submission') {
      return '/admin/submissions'
    }
    return '#'
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading notifications..." variant="css" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your system notifications and alerts
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={markAllAsRead}
            disabled={notifications.filter(n => !n.is_read).length === 0}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="form_submission">Form Submission</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="alert">Alert</SelectItem>
                  <SelectItem value="info">Information</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Results</label>
              <div className="flex items-center h-10 px-3 text-sm text-muted-foreground border rounded-md bg-muted/50">
                {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground py-8">
                <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>No notifications found</p>
                <p className="text-sm">Notifications will appear here when they are created</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => {
            const IconComponent = typeIcons[notification.type as keyof typeof typeIcons] || Info
            const iconColor = typeColors[notification.type as keyof typeof typeColors] || 'text-gray-600'
            
            return (
              <Card 
                key={notification.id}
                className={`transition-colors ${
                  !notification.is_read 
                    ? 'ring-2 ring-blue-200 bg-blue-50/50 dark:bg-blue-950/20' 
                    : notification.is_archived
                    ? 'opacity-60'
                    : ''
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 ${iconColor}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-foreground">
                              {notification.title}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {typeLabels[notification.type as keyof typeof typeLabels]}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${priorityColors[notification.priority as keyof typeof priorityColors]}`}
                            >
                              {priorityLabels[notification.priority as keyof typeof priorityLabels]}
                            </Badge>
                            {!notification.is_read && (
                              <Badge variant="default" className="text-xs">
                                Unread
                              </Badge>
                            )}
                            {notification.is_archived && (
                              <Badge variant="secondary" className="text-xs">
                                Archived
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Created: {formatDate(notification.created_at)}</span>
                            {notification.read_at && (
                              <span>Read: {formatDate(notification.read_at)}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {!notification.is_read && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Mark Read
                            </Button>
                          )}
                          
                          {getNotificationLink(notification) !== '#' && (
                            <Button
                              size="sm"
                              variant="outline"
                              asChild
                            >
                              <Link href={getNotificationLink(notification)}>
                                <ExternalLink className="h-3 w-3 mr-1" />
                                View
                              </Link>
                            </Button>
                          )}
                          
                          {!notification.is_archived && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => archiveNotification(notification.id)}
                            >
                              <Archive className="h-3 w-3 mr-1" />
                              Archive
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
