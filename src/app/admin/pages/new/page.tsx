"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { navigationService } from '@/lib/navigation-service'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Save, 
  FileText,
  Eye,
  Navigation,
  Globe,
  Settings,
  CheckCircle,
  AlertCircle
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
    meta_title: '',
    meta_description: '',
    page_category: 'standalone',
    navigation_position: 'none',
    is_published: false,
    template: 'blank'
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
    // Validation
    if (!formData.title.trim()) {
      toast.error('Please enter a page title')
      return
    }

    if (!formData.slug.trim()) {
      toast.error('Please enter a page slug')
      return
    }

    if (formData.slug.includes(' ')) {
      toast.error('Page slug cannot contain spaces')
      return
    }

    if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      toast.error('Page slug can only contain lowercase letters, numbers, and hyphens')
      return
    }

    if (formData.navigation_position !== 'none' && !formData.meta_title.trim()) {
      toast.error('Pages in navigation must have an SEO title')
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
          meta_title: formData.meta_title.trim() || null,
          meta_description: formData.meta_description.trim() || null,
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

      // Update navigation settings
      await navigationService.updatePageNavigation(data.id, {
        category: formData.page_category as 'main_nav' | 'footer' | 'resources' | 'standalone',
        position: formData.navigation_position !== 'none' ? formData.navigation_position : undefined,
        order: 0
      })

      // Create initial page sections based on template
      if (formData.template !== 'blank') {
        await createPageSections(data.id, formData.template)
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

  const createPageSections = async (pageId: string, template: string) => {
    const templates = {
      'landing': [
        { section_type: 'hero_simple', title: 'Hero Section', section_order: 1 },
        { section_type: 'introduction_accordion', title: 'Introduction', section_order: 2 },
        { section_type: 'problem_cards', title: 'Problem Cards', section_order: 3 },
        { section_type: 'cta', title: 'Call to Action', section_order: 4 }
      ],
      'about': [
        { section_type: 'hero_simple', title: 'About Hero', section_order: 1 },
        { section_type: 'introduction_accordion', title: 'Our Story', section_order: 2 },
        { section_type: 'cta', title: 'Get in Touch', section_order: 3 }
      ],
      'contact': [
        { section_type: 'hero_simple', title: 'Contact Us', section_order: 1 },
        { section_type: 'cta', title: 'Contact Form', section_order: 2 }
      ]
    }

    const sections = templates[template as keyof typeof templates] || []
    
    for (const section of sections) {
      await supabase
        .from('page_sections')
        .insert({
          page_id: pageId,
          ...section,
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/pages">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Create New Page</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Add a new page to your website
            </p>
          </div>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving || !formData.title.trim()}
          className="w-full sm:w-auto"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Creating...' : 'Create Page'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Page Information</span>
              </CardTitle>
              <CardDescription>
                Basic information and settings for your new page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter page title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug *</Label>
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
                <Label htmlFor="description">Page Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of this page"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template">Page Template</Label>
                <Select value={formData.template} onValueChange={(value) => handleInputChange('template', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blank">Blank Page</SelectItem>
                    <SelectItem value="landing">Landing Page</SelectItem>
                    <SelectItem value="about">About Page</SelectItem>
                    <SelectItem value="contact">Contact Page</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Choose a template to pre-populate your page with common sections
                </p>
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>SEO Settings</span>
              </CardTitle>
              <CardDescription>
                Search engine optimization settings for better discoverability
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta_title">SEO Title</Label>
                <Input
                  id="meta_title"
                  value={formData.meta_title}
                  onChange={(e) => handleInputChange('meta_title', e.target.value)}
                  placeholder="Page title for search engines"
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 50-60 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_description">SEO Description</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => handleInputChange('meta_description', e.target.value)}
                  placeholder="Description for search engines"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 150-160 characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Navigation className="h-5 w-5" />
                <span>Navigation Settings</span>
              </CardTitle>
              <CardDescription>
                Configure where this page appears in your website navigation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="page_category">Page Category</Label>
                <Select value={formData.page_category} onValueChange={(value) => handleInputChange('page_category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select page category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standalone">Standalone Page</SelectItem>
                    <SelectItem value="main_nav">Main Navigation</SelectItem>
                    <SelectItem value="footer">Footer Links</SelectItem>
                    <SelectItem value="resources">Resources Section</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.page_category !== 'standalone' && (
                <div className="space-y-2">
                  <Label htmlFor="navigation_position">Navigation Position</Label>
                  <Select value={formData.navigation_position} onValueChange={(value) => handleInputChange('navigation_position', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.page_category === 'main_nav' && (
                        <>
                          <SelectItem value="platform">Platform Dropdown</SelectItem>
                          <SelectItem value="people">People Dropdown</SelectItem>
                          <SelectItem value="solutions">Solutions Dropdown</SelectItem>
                          <SelectItem value="resources">Resources Dropdown</SelectItem>
                        </>
                      )}
                      {formData.page_category === 'footer' && (
                        <>
                          <SelectItem value="company">Company Links</SelectItem>
                          <SelectItem value="resources">Resources Links</SelectItem>
                          <SelectItem value="legal">Legal Links</SelectItem>
                        </>
                      )}
                      {formData.page_category === 'resources' && (
                        <>
                          <SelectItem value="about">About Section</SelectItem>
                          <SelectItem value="partners">Partners Section</SelectItem>
                          <SelectItem value="investors">Investors Section</SelectItem>
                          <SelectItem value="developers">Developers Section</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Navigation Preview */}
              {formData.navigation_position !== 'none' && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Navigation Preview</h4>
                  <div className="text-xs text-muted-foreground">
                    This page will appear in the <Badge variant="secondary">{formData.page_category}</Badge> section
                    {formData.navigation_position !== 'none' && (
                      <span> under <Badge variant="outline">{formData.navigation_position}</Badge></span>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Publish Status</span>
              </CardTitle>
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
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>This page will be live and visible to visitors</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-orange-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>This page will be saved as a draft</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <Link href="/admin/pages">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to All Pages
                </Link>
              </Button>
              {formData.slug && (
                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                  <Link href={`/website/${formData.slug}`} target="_blank">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Page
                  </Link>
                </Button>
              )}
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
                <Navigation className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Navigation</p>
                  <p>Specify where this page appears in your site navigation</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Globe className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">SEO</p>
                  <p>Add SEO titles and descriptions for better search visibility</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
