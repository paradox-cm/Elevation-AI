"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { 
  Save, 
  ArrowLeft, 
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function NewFAQCategoryPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'help-circle',
    order_index: 0,
    is_published: true
  })

  const handleFieldChange = (field: string, value: unknown) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error('Please enter a category title')
      return
    }

    try {
      setSaving(true)
      const supabase = createClient()

      const { data, error } = await supabase
        .from('faq_categories')
        .insert({
          title: formData.title,
          description: formData.description,
          icon: formData.icon,
          order_index: formData.order_index,
          is_published: formData.is_published
        })
        .select()
        .single()

      if (error) throw error

      toast.success('FAQ category created successfully!')
      
      // Trigger refresh on the FAQs page
      window.dispatchEvent(new CustomEvent('refresh-page'))
      
      // Redirect to the FAQs page
      router.push('/admin/faqs')

    } catch (error) {
      console.error('Error creating FAQ category:', error)
      toast.error('Failed to create FAQ category')
    } finally {
      setSaving(false)
    }
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
              <h1 className="text-2xl font-semibold">New FAQ Category</h1>
              <p className="text-muted-foreground">Create a new FAQ category</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleSave} 
              disabled={saving}
              size="sm"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Creating...' : 'Create Category'}
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
                <Label htmlFor="title">Category Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="Enter category title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  placeholder="Describe this category..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Input
                  id="icon"
                  value={formData.icon}
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
                  checked={formData.is_published}
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
                  value={formData.order_index}
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
