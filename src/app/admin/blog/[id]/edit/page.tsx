"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { BlogPost, BlogCategory } from '@/types/cms'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { FileUpload } from '@/components/ui/file-upload'
import { 
  Save, 
  ArrowLeft, 
  Eye,
  Calendar,
  User,
  Clock,
  Image as ImageIcon
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface BlogPostWithCategory extends BlogPost {
  category?: BlogCategory
}

export default function BlogPostEditPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPostWithCategory | null>(null)
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const supabase = createClient()

        // Fetch blog post
        const { data: postData, error: postError } = await supabase
          .from('blog_posts')
          .select(`
            *,
            category:blog_categories(*)
          `)
          .eq('id', params.id)
          .single()

        if (postError) throw postError
        setPost(postData)

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('blog_categories')
          .select('*')
          .order('name')

        if (categoriesError) throw categoriesError
        setCategories(categoriesData || [])

      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Failed to load blog post')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleFieldChange = (field: string, value: unknown) => {
    if (!post) return
    
    setPost({
      ...post,
      [field]: value
    })
    setHasChanges(true)
  }

  const handleFileUpload = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Upload failed')
    }

    const result = await response.json()
    
    // Update the blog post with the new image path
    if (post) {
      setPost({
        ...post,
        featured_image: result.path
      })
      setHasChanges(true)
      toast.success('Image uploaded successfully! Don\'t forget to save your changes.')
    }
    
    return result.path
  }

  const handleSave = async () => {
    if (!post) return

    try {
      setSaving(true)
      const supabase = createClient()

      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          author_role: post.author_role,
          category_id: post.category_id,
          featured_image: post.featured_image,
          read_time: post.read_time,
          is_published: post.is_published,
          published_at: post.is_published ? (post.published_at || new Date().toISOString()) : null,
          updated_at: new Date().toISOString()
        })
        .eq('id', post.id)

      if (error) throw error

      toast.success('Blog post saved successfully!')
      setHasChanges(false)
      
      // Trigger refresh on the blog page
      window.dispatchEvent(new CustomEvent('refresh-page'))

    } catch (error) {
      console.error('Error saving blog post:', error)
      toast.error('Failed to save blog post')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-semibold">Blog Post Not Found</h1>
            <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/admin/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-semibold">Edit Blog Post</h1>
              <p className="text-muted-foreground">Edit and manage your blog post content</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/website/blog/${post.slug}`} target="_blank">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Link>
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!hasChanges || saving}
              size="sm"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Essential details about your blog post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={post.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    placeholder="Enter blog post title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={post.slug}
                    onChange={(e) => handleFieldChange('slug', e.target.value)}
                    placeholder="blog-post-slug"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={post.excerpt}
                    onChange={(e) => handleFieldChange('excerpt', e.target.value)}
                    placeholder="Brief description of the blog post"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={post.content}
                    onChange={(e) => handleFieldChange('content', e.target.value)}
                    placeholder="Write your blog post content here..."
                    rows={20}
                    className="font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publishing */}
            <Card>
              <CardHeader>
                <CardTitle>Publishing</CardTitle>
                <CardDescription>
                  Control when and how your post is published
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Published</Label>
                  <Switch
                    id="published"
                    checked={post.is_published}
                    onCheckedChange={(checked) => handleFieldChange('is_published', checked)}
                  />
                </div>

                {post.is_published && (
                  <div className="space-y-2">
                    <Label htmlFor="published_at">Published Date</Label>
                    <Input
                      id="published_at"
                      type="datetime-local"
                      value={post.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : ''}
                      onChange={(e) => handleFieldChange('published_at', e.target.value ? new Date(e.target.value).toISOString() : null)}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Author Information */}
            <Card>
              <CardHeader>
                <CardTitle>Author Information</CardTitle>
                <CardDescription>
                  Details about the post author
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author Name</Label>
                  <Input
                    id="author"
                    value={post.author}
                    onChange={(e) => handleFieldChange('author', e.target.value)}
                    placeholder="Author name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author_role">Author Role</Label>
                  <Input
                    id="author_role"
                    value={post.author_role}
                    onChange={(e) => handleFieldChange('author_role', e.target.value)}
                    placeholder="Author role/title"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Category */}
            <Card>
              <CardHeader>
                <CardTitle>Category</CardTitle>
                <CardDescription>
                  Select the blog category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={post.category_id?.toString() || ''}
                  onValueChange={(value) => handleFieldChange('category_id', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
                <CardDescription>
                  Upload an image for your blog post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FileUpload
                  onFileSelect={() => {}}
                  onFileUpload={handleFileUpload}
                  accept="image/*"
                  maxSize={5}
                  label="Upload Featured Image"
                  description="PNG, JPG, SVG up to"
                />
                
                {post.featured_image && (
                  <div className="space-y-2">
                    <Label>Current Featured Image</Label>
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden border">
                      <img
                        src={post.featured_image}
                        alt="Featured image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Image URL:</Label>
                      <Input
                        value={post.featured_image}
                        onChange={(e) => handleFieldChange('featured_image', e.target.value)}
                        placeholder="Image URL"
                        className="text-xs font-mono"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reading Time */}
            <Card>
              <CardHeader>
                <CardTitle>Reading Time</CardTitle>
                <CardDescription>
                  Estimated reading time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="read_time">Reading Time</Label>
                  <Input
                    id="read_time"
                    value={post.read_time}
                    onChange={(e) => handleFieldChange('read_time', e.target.value)}
                    placeholder="e.g., 5 min read"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
