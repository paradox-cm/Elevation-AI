"use client"

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Save, AlertCircle, CheckCircle, Globe, Mail, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SiteSetting {
  id: string
  key: string
  value: string
  description: string
  type: string
  created_at: string
  updated_at: string
}

export default function AdminSettingsPage() {
  const [, setSettings] = useState<SiteSetting[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState({
    site_name: '',
    site_description: '',
    admin_email: '',
    maintenance_mode: false,
    max_upload_size: ''
  })

  const supabase = createClient()
  const router = useRouter()

  const fetchSettings = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/admin/login')
        return
      }

      const { data: settingsData, error: settingsError } = await supabase
        .from('site_settings')
        .select('*')
        .order('key')

      if (settingsError) throw settingsError

      setSettings(settingsData || [])

      // Initialize form data
      const initialData = {
        site_name: settingsData?.find((s: any) => s.key === 'site_name')?.value || '',
        site_description: settingsData?.find((s: any) => s.key === 'site_description')?.value || '',
        admin_email: settingsData?.find((s: any) => s.key === 'admin_email')?.value || '',
        maintenance_mode: settingsData?.find((s: any) => s.key === 'maintenance_mode')?.value === 'true',
        max_upload_size: settingsData?.find((s: any) => s.key === 'max_upload_size')?.value || ''
      }

      setFormData(initialData)
    } catch (error) {
      console.error('Error fetching settings:', error)
      setError('Failed to load settings')
    } finally {
      setIsLoading(false)
    }
  }, [supabase, router])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')
    setSuccess('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/admin/login')
        return
      }

      // Update each setting
      const updates = [
        { key: 'site_name', value: formData.site_name },
        { key: 'site_description', value: formData.site_description },
        { key: 'admin_email', value: formData.admin_email },
        { key: 'maintenance_mode', value: formData.maintenance_mode.toString() },
        { key: 'max_upload_size', value: formData.max_upload_size }
      ]

      for (const update of updates) {
        const { error: updateError } = await supabase
          .from('site_settings')
          .update({ 
            value: update.value,
            updated_at: new Date().toISOString()
          })
          .eq('key', update.key)

        if (updateError) throw updateError
      }

      setSuccess('Settings updated successfully!')
      
      // Refresh settings data
      await fetchSettings()
    } catch (error) {
      console.error('Error updating settings:', error)
      setError('Failed to update settings')
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading settings..." variant="css" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Site Settings</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Configure your site settings and preferences
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>
              Basic site information and configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site_name">Site Name</Label>
              <Input
                id="site_name"
                value={formData.site_name}
                onChange={(e) => handleInputChange('site_name', e.target.value)}
                placeholder="Enter site name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="site_description">Site Description</Label>
              <Input
                id="site_description"
                value={formData.site_description}
                onChange={(e) => handleInputChange('site_description', e.target.value)}
                placeholder="Enter site description"
              />
            </div>
          </CardContent>
        </Card>

        {/* Admin Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Admin Settings
            </CardTitle>
            <CardDescription>
              Administrator contact and notification settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin_email">Admin Email</Label>
              <Input
                id="admin_email"
                type="email"
                value={formData.admin_email}
                onChange={(e) => handleInputChange('admin_email', e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Settings
            </CardTitle>
            <CardDescription>
              System configuration and security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="maintenance_mode">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable maintenance mode to temporarily disable the site
                </p>
              </div>
              <Switch
                id="maintenance_mode"
                checked={formData.maintenance_mode}
                onCheckedChange={(checked) => handleInputChange('maintenance_mode', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max_upload_size">Max Upload Size (bytes)</Label>
              <Input
                id="max_upload_size"
                type="number"
                value={formData.max_upload_size}
                onChange={(e) => handleInputChange('max_upload_size', e.target.value)}
                placeholder="10485760"
                min="1024"
              />
              <p className="text-xs text-muted-foreground">
                Current: {formatFileSize(parseInt(formData.max_upload_size) || 0)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
