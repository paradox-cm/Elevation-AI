"use client"

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Bell, 
  MessageSquare, 
  AlertCircle, 
  Info, 
  CheckCircle,
  X,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

interface Notification {
  id: string
  type: string
  title: string
  message: string
  data: Record<string, unknown>
  is_read: boolean
  priority: string
  related_type: string | null
  related_id: string | null
  created_at: string
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

const priorityColors = {
  low: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600',
  medium: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
  high: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700',
  urgent: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700'
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const supabase = createClient()

  useEffect(() => {
    fetchNotifications()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: notificationsData, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_archived', false)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error

      setNotifications(notificationsData || [])
      setUnreadCount(notificationsData?.filter((n: any) => !n.is_read).length || 0)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ 
          is_read: true,
          read_at: new Date().toISOString()
        })
        .eq('id', notificationId)

      if (error) throw error

      // Update local state
      setNotifications(prev => prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, is_read: true }
          : notification
      ))
      
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (error) {
      console.error('Error marking notification as read:', error)
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

      // Update local state
      setNotifications(prev => prev.map(notification => 
        ({ ...notification, is_read: true })
      ))
      
      setUnreadCount(0)
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    return date.toLocaleDateString()
  }

  const getNotificationLink = (notification: Notification) => {
    if (notification.related_type === 'form_submission') {
      return '/admin/submissions'
    }
    return '/admin/notifications'
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 sm:h-9 sm:w-9 p-0 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-background border border-border rounded-lg shadow-lg z-50">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs h-7 px-2"
                    >
                      Mark all read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-xs h-7 px-2"
                  >
                    <Link href="/admin/notifications">
                      View all
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => {
                    const IconComponent = typeIcons[notification.type as keyof typeof typeIcons] || Info
                    const iconColor = typeColors[notification.type as keyof typeof typeColors] || 'text-gray-600'
                    
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors ${
                          !notification.is_read ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 ${iconColor}`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-foreground line-clamp-1">
                                  {notification.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-xs text-muted-foreground">
                                    {formatTimeAgo(notification.created_at)}
                                  </span>
                                  {notification.priority !== 'medium' && (
                                    <Badge 
                                      variant="outline" 
                                      className={`text-xs h-4 px-1 ${priorityColors[notification.priority as keyof typeof priorityColors]}`}
                                    >
                                      {notification.priority}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                {!notification.is_read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <CheckCircle className="h-3 w-3" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  asChild
                                  className="h-6 w-6 p-0"
                                >
                                  <Link href={getNotificationLink(notification)}>
                                    <ExternalLink className="h-3 w-3" />
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-border bg-muted/30">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="w-full text-xs"
                  >
                    <Link href="/admin/notifications">
                      View all notifications
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
