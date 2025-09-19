import { createClient } from '@/lib/supabase/client'
import { ActivityLog } from '@/types/cms'

const supabase = createClient()

// Activity Service for tracking CMS activities
export const activityService = {
  // Get recent activities with pagination
  async getRecent(limit: number = 20, offset: number = 0): Promise<ActivityLog[]> {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
    
    if (error) throw error
    return data || []
  },

  // Get activities by entity type
  async getByEntityType(entityType: string, limit: number = 20): Promise<ActivityLog[]> {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('entity_type', entityType)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data || []
  },

  // Get activities by user
  async getByUser(userId: string, limit: number = 20): Promise<ActivityLog[]> {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data || []
  },

  // Get activities by action type
  async getByAction(action: string, limit: number = 20): Promise<ActivityLog[]> {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('action', action)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data || []
  },

  // Get activities for a specific entity
  async getByEntity(entityType: string, entityId: string, limit: number = 20): Promise<ActivityLog[]> {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data || []
  },

  // Get activity statistics
  async getStats(): Promise<{
    totalActivities: number
    activitiesToday: number
    activitiesThisWeek: number
    activitiesThisMonth: number
    topActions: Array<{ action: string; count: number }>
    topEntityTypes: Array<{ entity_type: string; count: number }>
    topUsers: Array<{ user_name: string; count: number }>
  }> {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Get total activities
    const { count: totalActivities } = await supabase
      .from('activity_logs')
      .select('*', { count: 'exact', head: true })

    // Get activities today
    const { count: activitiesToday } = await supabase
      .from('activity_logs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString())

    // Get activities this week
    const { count: activitiesThisWeek } = await supabase
      .from('activity_logs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgo.toISOString())

    // Get activities this month
    const { count: activitiesThisMonth } = await supabase
      .from('activity_logs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', monthAgo.toISOString())

    // Get top actions
    const { data: topActionsData } = await supabase
      .from('activity_logs')
      .select('action')
      .gte('created_at', monthAgo.toISOString())

    const topActions = topActionsData?.reduce((acc, item) => {
      const existing = acc.find(a => a.action === item.action)
      if (existing) {
        existing.count++
      } else {
        acc.push({ action: item.action, count: 1 })
      }
      return acc
    }, [] as Array<{ action: string; count: number }>) || []

    // Get top entity types
    const { data: topEntityTypesData } = await supabase
      .from('activity_logs')
      .select('entity_type')
      .gte('created_at', monthAgo.toISOString())

    const topEntityTypes = topEntityTypesData?.reduce((acc, item) => {
      const existing = acc.find(a => a.entity_type === item.entity_type)
      if (existing) {
        existing.count++
      } else {
        acc.push({ entity_type: item.entity_type, count: 1 })
      }
      return acc
    }, [] as Array<{ entity_type: string; count: number }>) || []

    // Get top users
    const { data: topUsersData } = await supabase
      .from('activity_logs')
      .select('user_name')
      .gte('created_at', monthAgo.toISOString())
      .not('user_name', 'is', null)

    const topUsers = topUsersData?.reduce((acc, item) => {
      if (!item.user_name) return acc
      const existing = acc.find(a => a.user_name === item.user_name)
      if (existing) {
        existing.count++
      } else {
        acc.push({ user_name: item.user_name, count: 1 })
      }
      return acc
    }, [] as Array<{ user_name: string; count: number }>) || []

    return {
      totalActivities: totalActivities || 0,
      activitiesToday: activitiesToday || 0,
      activitiesThisWeek: activitiesThisWeek || 0,
      activitiesThisMonth: activitiesThisMonth || 0,
      topActions: topActions.sort((a, b) => b.count - a.count).slice(0, 5),
      topEntityTypes: topEntityTypes.sort((a, b) => b.count - a.count).slice(0, 5),
      topUsers: topUsers.sort((a, b) => b.count - a.count).slice(0, 5)
    }
  },

  // Manually log an activity (for cases not covered by triggers)
  async logActivity(
    action: ActivityLog['action'],
    entityType: ActivityLog['entity_type'],
    entityId?: string,
    entityTitle?: string,
    description?: string,
    details?: Record<string, unknown>
  ): Promise<ActivityLog> {
    const { data, error } = await supabase
      .from('activity_logs')
      .insert({
        action,
        entity_type: entityType,
        entity_id: entityId || null,
        entity_title: entityTitle || null,
        description: description || `${action} ${entityType}${entityTitle ? ': ' + entityTitle : ''}`,
        details: details || {}
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Log user login
  async logLogin(userName: string): Promise<ActivityLog> {
    return this.logActivity(
      'login',
      'user',
      undefined,
      userName,
      `User logged in: ${userName}`,
      { timestamp: new Date().toISOString() }
    )
  },

  // Log user logout
  async logLogout(userName: string): Promise<ActivityLog> {
    return this.logActivity(
      'logout',
      'user',
      undefined,
      userName,
      `User logged out: ${userName}`,
      { timestamp: new Date().toISOString() }
    )
  },

  // Log page section updates (not covered by triggers)
  async logPageSectionUpdate(
    sectionId: string,
    sectionTitle: string,
    pageTitle: string,
    changes: Record<string, unknown>
  ): Promise<ActivityLog> {
    return this.logActivity(
      'update',
      'page_section',
      sectionId,
      sectionTitle,
      `Updated page section "${sectionTitle}" on page "${pageTitle}"`,
      { page_title: pageTitle, changes }
    )
  },

  // Log site setting changes
  async logSiteSettingUpdate(
    settingKey: string,
    oldValue: string,
    newValue: string
  ): Promise<ActivityLog> {
    return this.logActivity(
      'update',
      'site_setting',
      settingKey,
      settingKey,
      `Updated site setting: ${settingKey}`,
      { old_value: oldValue, new_value: newValue }
    )
  }
}
