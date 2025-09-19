"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { FAQCategory } from '@/types/cms'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { 
  Save, 
  ArrowLeft, 
  Eye,
  HelpCircle,
  Plus,
  Trash2
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function FAQCategoryEditPage() {
  const params = useParams()
  const router = useRouter()
  const [category, setCategory] = useState<FAQCategory | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const supabase = createClient()

        // Fetch category
        const { data: categoryData, error: categoryError } = await supabase
          .from('faq_categories')
          .select('*')
          .eq('id', params.id)
          .single()

        if (categoryError) throw categoryError
        setCategory(categoryData)

      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Failed to load FAQ category')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleFieldChange = (field: string, value: any) => {
    if (!category) return
    
    setCategory({
      ...category,
      [field]: value
    })
    setHasChanges(true)
  }

  const handleSave = async () => {
    if (!category) return

    try {
      setSaving(true)
      const supabase = createClient()

      const { error } = await supabase
        .from('faq_categories')
        .update({
          title: category.title,
          description: category.description,
          icon: category.icon,
          order_index: category.order_index,
          is_published: category.is_published,
          updated_at: new Date().toISOString()
        })
        .eq('id', category.id)

      if (error) throw error

      toast.success('FAQ category saved successfully!')
      setHasChanges(false)
      
      // Trigger refresh on the FAQs page and knowledge base
      window.dispatchEvent(new CustomEvent('refresh-page'))
      
      // Also trigger storage event for cross-tab communication
      localStorage.setItem('faq-updated', Date.now().toString())
      localStorage.removeItem('faq-updated')

    } catch (error) {
      console.error('Error saving FAQ category:', error)
      toast.error('Failed to save FAQ category')
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

  if (!category) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-semibold">FAQ Category Not Found</h1>
            <p className="text-muted-foreground">The FAQ category you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/admin/faqs">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to FAQs
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
              <Link href="/admin/faqs">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to FAQs
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-semibold">Edit FAQ Category</h1>
              <p className="text-muted-foreground">Edit and manage your FAQ category</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
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

        <div className="space-y-6">
          {/* Category Information */}
          <Card>
            <CardHeader>
              <CardTitle>Category Information</CardTitle>
              <CardDescription>
                Basic details about this FAQ category
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Category Title</Label>
                <Input
                  id="title"
                  value={category.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="Enter category title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={category.description || ''}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  placeholder="Describe this category..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Input
                  id="icon"
                  value={category.icon || ''}
                  onChange={(e) => handleFieldChange('icon', e.target.value)}
                  placeholder="Icon name or emoji"
                />
              </div>
            </CardContent>
          </Card>

          {/* Publishing */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
              <CardDescription>
                Control when and how this category is published
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published">Published</Label>
                <Switch
                  id="published"
                  checked={category.is_published}
                  onCheckedChange={(checked) => handleFieldChange('is_published', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Order */}
          <Card>
            <CardHeader>
              <CardTitle>Display Order</CardTitle>
              <CardDescription>
                Control the order of this category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="order_index">Order Index</Label>
                <Input
                  id="order_index"
                  type="number"
                  value={category.order_index}
                  onChange={(e) => handleFieldChange('order_index', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
