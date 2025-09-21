"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  ExternalLink,
  Calendar,
  Clock
} from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { LoadingSpinner } from '@/components/ui/loading'

interface PressArticle {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  article_type: 'press_release' | 'media_coverage'
  category: string | null
  source: string | null
  external_url: string | null
  read_time: string | null
  featured_image_url: string | null
  is_published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export default function PressPage() {
  const [articles, setArticles] = useState<PressArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const supabase = createClient()

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('press_articles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        if (error.code === 'PGRST205') {
          console.log('Press articles table does not exist yet. Please create it first.')
          setArticles([])
          return
        }
        throw error
      }
      setArticles(data || [])
    } catch (error) {
      console.error('Error fetching articles:', error)
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('press_articles')
        .update({ 
          is_published: !currentStatus,
          published_at: !currentStatus ? new Date().toISOString() : null
        })
        .eq('id', id)

      if (error) throw error
      fetchArticles()
    } catch (error) {
      console.error('Error toggling publish status:', error)
    }
  }

  const deleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return

    try {
      const { error } = await supabase
        .from('press_articles')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchArticles()
    } catch (error) {
      console.error('Error deleting article:', error)
    }
  }

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category?.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (activeTab === 'all') return matchesSearch
    if (activeTab === 'press_releases') return matchesSearch && article.article_type === 'press_release'
    if (activeTab === 'media_coverage') return matchesSearch && article.article_type === 'media_coverage'
    if (activeTab === 'published') return matchesSearch && article.is_published
    if (activeTab === 'drafts') return matchesSearch && !article.is_published
    
    return matchesSearch
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading press articles..." />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Press</h1>
          <p className="text-muted-foreground">
            Manage press releases and media coverage
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/press/press-releases/new">
              <Plus className="h-4 w-4 mr-2" />
              New Press Release
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/press/media-coverage/new">
              <Plus className="h-4 w-4 mr-2" />
              New Media Coverage
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Articles</TabsTrigger>
          <TabsTrigger value="press_releases">Press Releases</TabsTrigger>
          <TabsTrigger value="media_coverage">Media Coverage</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredArticles.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  {searchTerm ? 'No articles found matching your search.' : 'No articles found.'}
                </p>
                <Button asChild>
                  <Link href="/admin/press/press-releases/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Article
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={article.article_type === 'press_release' ? 'default' : 'secondary'}>
                            {article.article_type === 'press_release' ? 'Press Release' : 'Media Coverage'}
                          </Badge>
                          <Badge variant={article.is_published ? 'default' : 'outline'}>
                            {article.is_published ? 'Published' : 'Draft'}
                          </Badge>
                          {article.category && (
                            <Badge variant="outline">{article.category}</Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                        {article.excerpt && (
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {article.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(article.created_at).toLocaleDateString()}
                          </div>
                          {article.read_time && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {article.read_time}
                            </div>
                          )}
                          {article.source && (
                            <span>Source: {article.source}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePublish(article.id, article.is_published)}
                        >
                          {article.is_published ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/press/${article.article_type === 'press_release' ? 'press-releases' : 'media-coverage'}/${article.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        {article.external_url && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={article.external_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteArticle(article.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
