"use client"

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save, Upload, X } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { LoadingSpinner } from '@/components/ui/loading'
import Image from 'next/image'

export default function NewMediaCoveragePage() {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    source: '',
    external_url: '',
    read_time: '',
    featured_image_url: '',
    is_published: true
  })
  const router = useRouter()
  const supabase = createClient()

  const generateSlug = (title: string) => {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
    
    // Add timestamp to ensure uniqueness
    return `${baseSlug}-${Date.now()}`
  }

  const handleImageUpload = async (file: File) => {
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file')
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }

    setUploading(true)

    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `press-images/${fileName}`

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('media')
        .upload(filePath, file)

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath)

      // Update form data
      setFormData(prev => ({
        ...prev,
        featured_image_url: publicUrl
      }))

      // Set preview
      setPreviewUrl(publicUrl)

    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      featured_image_url: ''
    }))
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const slug = generateSlug(formData.title)
      
      const { data, error } = await supabase
        .from('press_articles')
        .insert({
          ...formData,
          slug,
          article_type: 'media_coverage',
          published_at: formData.is_published ? new Date().toISOString() : null
        })
        .select()
        .single()

      if (error) throw error

      router.push('/admin/press')
    } catch (error) {
      console.error('Error creating media coverage:', error)
      console.error('Error type:', typeof error)
      console.error('Error constructor:', error?.constructor?.name)
      console.error('Error details:', JSON.stringify(error, null, 2))
      console.error('Error keys:', error && typeof error === 'object' ? Object.keys(error) : 'N/A')
      
      // Check if it's a table doesn't exist error
      if (error && typeof error === 'object' && 'code' in error && error.code === 'PGRST205') {
        alert('Press articles table does not exist yet. Please create the database table first. Check the PRESS_SETUP_GUIDE.md file for instructions.')
      } else if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
        alert('A media coverage article with this title already exists. Please choose a different title.')
      } else {
        let errorMessage = 'Unknown error'
        
        if (error instanceof Error) {
          errorMessage = error.message
        } else if (error && typeof error === 'object') {
          if ('message' in error) {
            errorMessage = String(error.message)
          } else if ('error' in error) {
            errorMessage = String(error.error)
          } else if ('details' in error) {
            errorMessage = String(error.details)
          } else if ('hint' in error) {
            errorMessage = String(error.hint)
          } else {
            errorMessage = `Error object: ${JSON.stringify(error)}`
          }
        } else if (typeof error === 'string') {
          errorMessage = error
        }
        
        alert(`Error creating media coverage: ${errorMessage}. Please try again.`)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/press">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Press
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">New Media Coverage</h1>
          <p className="text-muted-foreground">
            Add a new media coverage article
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter article title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder="Brief description of the article"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Article content or summary"
                    rows={10}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Media Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="source">Source *</Label>
                  <Input
                    id="source"
                    value={formData.source}
                    onChange={(e) => handleInputChange('source', e.target.value)}
                    placeholder="e.g., TechCrunch, Forbes, VentureBeat"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="external_url">External URL *</Label>
                  <Input
                    id="external_url"
                    value={formData.external_url}
                    onChange={(e) => handleInputChange('external_url', e.target.value)}
                    placeholder="https://example.com/article"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="e.g., Feature, Analysis, News"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="read_time">Read Time</Label>
                  <Input
                    id="read_time"
                    value={formData.read_time}
                    onChange={(e) => handleInputChange('read_time', e.target.value)}
                    placeholder="e.g., 8 min read"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  
                  {/* Image Upload Area */}
                  <div className="space-y-3">
                    {previewUrl ? (
                      <div className="relative">
                        <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                          <Image
                            src={previewUrl}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-1">
                          Click to upload an image
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    )}
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    
                    {uploading && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <LoadingSpinner size="sm" />
                        Uploading image...
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => handleInputChange('is_published', checked)}
                  />
                  <Label htmlFor="is_published">Publish immediately</Label>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? (
                  <LoadingSpinner size="sm" className="mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {loading ? 'Creating...' : 'Create Media Coverage'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
