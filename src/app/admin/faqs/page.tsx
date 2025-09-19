"use client"

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { FAQCategory, FAQ } from '@/types/cms'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  HelpCircle,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

interface FAQCategoryWithFAQs extends FAQCategory {
  faqs: FAQ[]
}

export default function FAQsPage() {
  const [categories, setCategories] = useState<FAQCategoryWithFAQs[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const supabase = createClient()

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  // Add refresh mechanism for when changes are made
  useEffect(() => {
    const handleRefresh = () => {
      fetchCategories()
    }
    window.addEventListener('refresh-page', handleRefresh)
    return () => window.removeEventListener('refresh-page', handleRefresh)
  }, [fetchCategories])

  const fetchCategories = useCallback(async () => {
    try {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('faq_categories')
        .select('*')
        .order('order_index', { ascending: true })

      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError)
        return
      }

      // Fetch FAQs for each category
      const categoriesWithFAQs = await Promise.all(
        (categoriesData || []).map(async (category) => {
          const { data: faqsData, error: faqsError } = await supabase
            .from('faqs')
            .select('*')
            .eq('category_id', category.id)
            .order('order_index', { ascending: true })

          if (faqsError) {
            console.error('Error fetching FAQs for category:', category.id, faqsError)
          }

          return {
            ...category,
            faqs: faqsData || []
          }
        })
      )

      setCategories(categoriesWithFAQs)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const filteredCategories = categories.filter(category => {
    if (!searchTerm) return true
    
    const categoryMatches = category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          category.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const faqMatches = category.faqs.some(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    return categoryMatches || faqMatches
  })

  const handleDeleteFAQ = async (faqId: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return

    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', faqId)

      if (error) {
        console.error('Error deleting FAQ:', error)
        alert('Error deleting FAQ')
      } else {
        fetchCategories() // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error)
      alert('Error deleting FAQ')
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category? This will also delete all FAQs in this category.')) return

    try {
      const { error } = await supabase
        .from('faq_categories')
        .delete()
        .eq('id', categoryId)

      if (error) {
        console.error('Error deleting category:', error)
        alert('Error deleting category')
      } else {
        fetchCategories() // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Error deleting category')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading FAQs..." variant="css" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">FAQs</h1>
          <p className="text-muted-foreground">Manage FAQ categories and questions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/admin/faqs/categories/new">
              <Plus className="h-4 w-4 mr-2" />
              New Category
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/faqs/new">
              <Plus className="h-4 w-4 mr-2" />
              New FAQ
            </Link>
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search FAQs and categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories and FAQs */}
      <div className="space-y-4">
        {filteredCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCategory(category.id)}
                  >
                    {expandedCategories.has(category.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription>
                        {category.description} • {category.faqs.length} questions
                      </CardDescription>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={category.is_published ? "default" : "secondary"}>
                    {category.is_published ? "Published" : "Draft"}
                  </Badge>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/faqs/categories/${category.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            {expandedCategories.has(category.id) && (
              <CardContent>
                <div className="space-y-3">
                  {category.faqs.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      No FAQs in this category yet
                    </div>
                  ) : (
                    category.faqs.map((faq) => (
                      <div key={faq.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground mb-2">
                              {faq.question}
                            </h4>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {faq.answer}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <Badge variant={faq.is_published ? "default" : "secondary"}>
                              {faq.is_published ? "Published" : "Draft"}
                            </Badge>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/faqs/${faq.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteFAQ(faq.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <HelpCircle className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchTerm ? 'No FAQs found' : 'No FAQs yet'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : 'Get started by creating your first FAQ category'
                }
              </p>
              {!searchTerm && (
                <div className="flex justify-center space-x-2">
                  <Button asChild>
                    <Link href="/admin/faqs/categories/new">
                      <Plus className="h-4 w-4 mr-2" />
                      New Category
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/admin/faqs/new">
                      <Plus className="h-4 w-4 mr-2" />
                      New FAQ
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
