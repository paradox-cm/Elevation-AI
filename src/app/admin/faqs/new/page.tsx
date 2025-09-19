"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { FAQCategory } from '@/types/cms'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { 
  Save, 
  ArrowLeft, 
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function NewFAQPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<FAQCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category_id: '',
    order_index: 0,
    is_published: true
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const supabase = createClient()

        const { data: categoriesData, error: categoriesError } = await supabase
          .from('faq_categories')
          .select('*')
          .order('title')

        if (categoriesError) throw categoriesError
        setCategories(categoriesData || [])

      } catch (error) {
        console.error('Error fetching categories:', error)
        toast.error('Failed to load categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleFieldChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  const handleSave = async () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error('Please fill in both question and answer')
      return
    }

    if (!formData.category_id) {
      toast.error('Please select a category')
      return
    }

    try {
      setSaving(true)
      const supabase = createClient()

      const { data, error } = await supabase
        .from('faqs')
        .insert({
          question: formData.question,
          answer: formData.answer,
          category_id: formData.category_id,
          order_index: formData.order_index,
          is_published: formData.is_published
        })
        .select()
        .single()

      if (error) throw error

      toast.success('FAQ created successfully!')
      
      // Trigger refresh on the FAQs page and knowledge base
      window.dispatchEvent(new CustomEvent('refresh-page'))
      
      // Also trigger storage event for cross-tab communication
      localStorage.setItem('faq-updated', Date.now().toString())
      localStorage.removeItem('faq-updated')
      
      // Redirect to the FAQs page
      router.push('/admin/faqs')

    } catch (error) {
      console.error('Error creating FAQ:', error)
      toast.error('Failed to create FAQ')
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
              <h1 className="text-2xl font-semibold">New FAQ</h1>
              <p className="text-muted-foreground">Create a new frequently asked question</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleSave} 
              disabled={saving}
              size="sm"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Creating...' : 'Create FAQ'}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* FAQ Content */}
          <Card>
            <CardHeader>
              <CardTitle>FAQ Content</CardTitle>
              <CardDescription>
                The question and answer for this FAQ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question *</Label>
                <Input
                  id="question"
                  value={formData.question}
                  onChange={(e) => handleFieldChange('question', e.target.value)}
                  placeholder="What is your question?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="answer">Answer *</Label>
                <Textarea
                  id="answer"
                  value={formData.answer}
                  onChange={(e) => handleFieldChange('answer', e.target.value)}
                  placeholder="Provide a detailed answer..."
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>

          {/* Publishing */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
              <CardDescription>
                Control when and how this FAQ is published
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

          {/* Category */}
          <Card>
            <CardHeader>
              <CardTitle>Category *</CardTitle>
              <CardDescription>
                Select the FAQ category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={formData.category_id}
                onValueChange={(value) => handleFieldChange('category_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Order */}
          <Card>
            <CardHeader>
              <CardTitle>Display Order</CardTitle>
              <CardDescription>
                Control the order of this FAQ within its category
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
