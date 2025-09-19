"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { FAQ, FAQCategory } from '@/types/cms'
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
  Eye,
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function FAQEditPage() {
  const params = useParams()
  const router = useRouter()
  const [faq, setFaq] = useState<FAQ | null>(null)
  const [categories, setCategories] = useState<FAQCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const supabase = createClient()

        // Fetch FAQ
        const { data: faqData, error: faqError } = await supabase
          .from('faqs')
          .select(`
            *,
            category:faq_categories(*)
          `)
          .eq('id', params.id)
          .single()

        if (faqError) throw faqError
        setFaq(faqData)

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('faq_categories')
          .select('*')
          .order('title')

        if (categoriesError) throw categoriesError
        setCategories(categoriesData || [])

      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Failed to load FAQ')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleFieldChange = (field: string, value: any) => {
    if (!faq) return
    
    setFaq({
      ...faq,
      [field]: value
    })
    setHasChanges(true)
  }

  const handleSave = async () => {
    if (!faq) return

    try {
      setSaving(true)
      const supabase = createClient()

      const { error } = await supabase
        .from('faqs')
        .update({
          question: faq.question,
          answer: faq.answer,
          category_id: faq.category_id,
          order_index: faq.order_index,
          is_published: faq.is_published,
          updated_at: new Date().toISOString()
        })
        .eq('id', faq.id)

      if (error) throw error

      toast.success('FAQ saved successfully!')
      setHasChanges(false)
      
      // Trigger refresh on the FAQs page and knowledge base
      window.dispatchEvent(new CustomEvent('refresh-page'))
      
      // Also trigger storage event for cross-tab communication
      localStorage.setItem('faq-updated', Date.now().toString())
      localStorage.removeItem('faq-updated')

    } catch (error) {
      console.error('Error saving FAQ:', error)
      toast.error('Failed to save FAQ')
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

  if (!faq) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-semibold">FAQ Not Found</h1>
            <p className="text-muted-foreground">The FAQ you're looking for doesn't exist.</p>
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
              <h1 className="text-2xl font-semibold">Edit FAQ</h1>
              <p className="text-muted-foreground">Edit and manage your FAQ content</p>
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
                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  value={faq.question}
                  onChange={(e) => handleFieldChange('question', e.target.value)}
                  placeholder="What is your question?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="answer">Answer</Label>
                <Textarea
                  id="answer"
                  value={faq.answer}
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
                  checked={faq.is_published}
                  onCheckedChange={(checked) => handleFieldChange('is_published', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader>
              <CardTitle>Category</CardTitle>
              <CardDescription>
                Select the FAQ category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={faq.category_id?.toString() || ''}
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
                  value={faq.order_index}
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
