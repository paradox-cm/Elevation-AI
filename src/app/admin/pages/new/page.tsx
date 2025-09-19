"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { 
  ArrowLeft, 
  Save, 
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function NewPagePage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    is_published: false
  })
  
  const supabase = createClient()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    handleInputChange('title', title)
    if (!formData.slug || formData.slug === generateSlug(formData.title)) {
      handleInputChange('slug', generateSlug(title))
    }
  }

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error('Please enter a page title')
      return
    }

    if (!formData.slug.trim()) {
      toast.error('Please enter a page slug')
      return
    }

    setIsSaving(true)
    try {
      const { data, error } = await supabase
        .from('pages')
        .insert({
          title: formData.title.trim(),
          slug: formData.slug.trim(),
          description: formData.description.trim() || null,
          is_published: formData.is_published,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating page:', error)
        if (error.code === '23505') {
          toast.error('A page with this slug already exists')
        } else {
          toast.error('Failed to create page')
        }
        return
      }

      toast.success('Page created successfully')
      router.push(`/admin/pages/${data.id}/edit`)
    } catch (error) {
      console.error('Error creating page:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/pages">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New Page</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Add a new page to your website
            </p>
          </div>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving || !formData.title.trim()}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Creating...' : 'Create Page'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Page Details</CardTitle>
              <CardDescription>
                Basic information for your new page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter page title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="page-slug"
                />
                <p className="text-xs text-muted-foreground">
                  URL: /{formData.slug || 'page-slug'}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of this page"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Status */}
          <Card>
            <CardHeader>
              <CardTitle>Publish Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published">Published</Label>
                <Switch
                  id="published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => handleInputChange('is_published', checked)}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                {formData.is_published ? (
                  <span className="text-green-600">This page will be live and visible to visitors</span>
                ) : (
                  <span className="text-orange-600">This page will be saved as a draft</span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Help */}
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Page Title</p>
                  <p>Choose a clear, descriptive title for your page</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Slug</p>
                  <p>The URL-friendly version of your page title</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Description</p>
                  <p>Optional description for SEO and page organization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
