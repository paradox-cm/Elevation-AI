"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { activityService } from '@/lib/activity-service'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { User, Save, AlertCircle, CheckCircle, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface AdminProfile {
  id: string
  user_id: string
  display_name: string | null
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
  preferences: Record<string, unknown>
  created_at: string
  updated_at: string
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState({
    display_name: '',
    first_name: '',
    last_name: '',
    avatar_url: ''
  })

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/admin/login')
        return
      }

      // Try to fetch existing profile
      const { data: profileData, error: profileError } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError
      }

      if (profileData) {
        setProfile(profileData)
        setFormData({
          display_name: profileData.display_name || '',
          first_name: profileData.first_name || '',
          last_name: profileData.last_name || '',
          avatar_url: profileData.avatar_url || ''
        })
      } else {
        // Create initial profile
        const { data: newProfile, error: createError } = await supabase
          .from('admin_profiles')
          .insert({
            user_id: user.id,
            display_name: user.email?.split('@')[0] || 'Admin',
            first_name: '',
            last_name: '',
            avatar_url: '',
            preferences: {}
          })
          .select()
          .single()

        if (createError) throw createError

        setProfile(newProfile)
        setFormData({
          display_name: newProfile.display_name || '',
          first_name: newProfile.first_name || '',
          last_name: newProfile.last_name || '',
          avatar_url: newProfile.avatar_url || ''
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setError('Failed to load profile')
    } finally {
      setIsLoading(false)
    }
  }

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

      const { error: updateError } = await supabase
        .from('admin_profiles')
        .update({
          display_name: formData.display_name,
          first_name: formData.first_name,
          last_name: formData.last_name,
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)

      if (updateError) throw updateError

      setSuccess('Profile updated successfully!')
      
      // Refresh profile data
      await fetchProfile()
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLogout = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      // Log the logout activity
      if (user) {
        try {
          await activityService.logLogout(user.email || 'Unknown User')
        } catch (logError) {
          console.error('Error logging logout activity:', logError)
          // Don't block logout if logging fails
        }
      }
      
      // Sign out
      await supabase.auth.signOut()
      router.push('/admin/login')
    } catch (error) {
      console.error('Error during logout:', error)
      setError('Failed to logout properly')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading profile..." variant="css" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your admin profile information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          <CardDescription>
            Update your display name and personal details. Your display name will be shown in the dashboard welcome message.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="display_name">Display Name *</Label>
                <Input
                  id="display_name"
                  value={formData.display_name}
                  onChange={(e) => handleInputChange('display_name', e.target.value)}
                  placeholder="Enter your display name"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  This will be shown in the dashboard welcome message
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar_url">Avatar URL</Label>
                <Input
                  id="avatar_url"
                  value={formData.avatar_url}
                  onChange={(e) => handleInputChange('avatar_url', e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  type="url"
                />
                <p className="text-xs text-muted-foreground">
                  Optional: URL to your profile picture
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                variant="destructive" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
              
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
