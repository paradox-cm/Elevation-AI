"use client"

import React from 'react'
import { PageSection } from '@/types/cms'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { FileUpload } from '@/components/ui/file-upload'
import { 
  Plus,
  Trash2,
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'

type BlogListingSectionProps = {
  section: PageSection
  onSectionDataChange: (key: string, value: unknown) => void
  onNestedFieldChange: (parentKey: string, fieldKey: string, value: unknown) => void
  onArrayItemAdd: (key: string, item: unknown) => void
  onArrayItemRemove: (key: string, index: number) => void
  onArrayFieldChange: (key: string, index: number, fieldKey: string, value: unknown) => void
  onFileUpload: (file: File) => void
}

export function BlogListingSection({ 
  section, 
  onSectionDataChange, 
  onNestedFieldChange, 
  onArrayItemAdd, 
  onArrayItemRemove, 
  onArrayFieldChange, 
  onFileUpload 
}: BlogListingSectionProps): React.ReactElement {
  return (
    <div className="space-y-6">
      {/* Blog Listing Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Listing Settings</CardTitle>
          <CardDescription>
            Configure the blog listing section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              value={String(section.section_data?.title || '')}
              onChange={(e) => onSectionDataChange('title', e.target.value)}
              placeholder="Latest Articles"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={String(section.section_data?.description || '')}
              onChange={(e) => onSectionDataChange('description', e.target.value)}
              placeholder="Stay updated with our latest insights and updates"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="limit">Number of Articles</Label>
              <Input
                id="limit"
                type="number"
                value={(section.section_data?.limit as number) || 6}
                onChange={(e) => onSectionDataChange('limit', parseInt(e.target.value))}
                placeholder="6"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="show_featured">Show Featured Article</Label>
              <Switch
                id="show_featured"
                checked={Boolean(section.section_data?.show_featured) || false}
                onCheckedChange={(checked) => onSectionDataChange('show_featured', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Article */}
      {section.section_data?.show_featured && (
        <Card>
          <CardHeader>
            <CardTitle>Featured Article</CardTitle>
            <CardDescription>
              Configure the featured article display
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="featured_title">Article Title</Label>
              <Input
                id="featured_title"
                value={(section.section_data?.featured_article as { title?: string })?.title || ''}
                onChange={(e) => onNestedFieldChange('featured_article', 'title', e.target.value)}
                placeholder="The Future of Business Orchestration"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="featured_slug">Article Slug</Label>
              <Input
                id="featured_slug"
                value={(section.section_data?.featured_article as { slug?: string })?.slug || ''}
                onChange={(e) => onNestedFieldChange('featured_article', 'slug', e.target.value)}
                placeholder="future-business-orchestration"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="featured_excerpt">Article Excerpt</Label>
              <Textarea
                id="featured_excerpt"
                value={(section.section_data?.featured_article as { excerpt?: string })?.excerpt || ''}
                onChange={(e) => onNestedFieldChange('featured_article', 'excerpt', e.target.value)}
                placeholder="Explore how artificial intelligence is revolutionizing..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="featured_author">Author Name</Label>
                <Input
                  id="featured_author"
                  value={(section.section_data?.featured_article as { author?: string })?.author || ''}
                  onChange={(e) => onNestedFieldChange('featured_article', 'author', e.target.value)}
                  placeholder="Sarah Chen"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="featured_author_role">Author Role</Label>
                <Input
                  id="featured_author_role"
                  value={(section.section_data?.featured_article as { authorRole?: string })?.authorRole || ''}
                  onChange={(e) => onNestedFieldChange('featured_article', 'authorRole', e.target.value)}
                  placeholder="VP of Product Strategy"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="featured_date">Publish Date</Label>
                <Input
                  id="featured_date"
                  value={(section.section_data?.featured_article as { publishDate?: string })?.publishDate || ''}
                  onChange={(e) => onNestedFieldChange('featured_article', 'publishDate', e.target.value)}
                  placeholder="2025-01-15"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="featured_read_time">Read Time</Label>
                <Input
                  id="featured_read_time"
                  value={(section.section_data?.featured_article as { readTime?: string })?.readTime || ''}
                  onChange={(e) => onNestedFieldChange('featured_article', 'readTime', e.target.value)}
                  placeholder="8 min read"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="featured_category">Category</Label>
                <Input
                  id="featured_category"
                  value={(section.section_data?.featured_article as { category?: string })?.category || ''}
                  onChange={(e) => onNestedFieldChange('featured_article', 'category', e.target.value)}
                  placeholder="AI & Technology"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Featured Image</Label>
              <FileUpload
                onFileSelect={() => {}}
                onFileUpload={onFileUpload}
                accept="image/*"
                maxSize={5}
              />
              {(section.section_data?.featured_article as { image?: string })?.image && (
                <div className="mt-2">
                  <Label>Current Image URL</Label>
                  <Input
                    value={(section.section_data?.featured_article as { image?: string })?.image || ''}
                    onChange={(e) => onNestedFieldChange('featured_article', 'image', e.target.value)}
                    placeholder="Image URL"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Articles Management */}
      <Card>
        <CardHeader>
          <CardTitle>Articles</CardTitle>
          <CardDescription>
            Manage the list of blog articles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {((section.section_data?.articles as Record<string, unknown>[]) || []).map((article: Record<string, unknown>, index: number): React.ReactElement => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Article {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onArrayItemRemove('articles', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label>Article Title</Label>
                    <Input
                      value={String(article.title || '')}
                      onChange={(e) => onArrayFieldChange('articles', index, 'title', e.target.value)}
                      placeholder="Article title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Article Excerpt</Label>
                    <Textarea
                      value={String(article.excerpt || '')}
                      onChange={(e) => onArrayFieldChange('articles', index, 'excerpt', e.target.value)}
                      placeholder="Article excerpt"
                      rows={2}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Author</Label>
                      <Input
                        value={String(article.author || '')}
                        onChange={(e) => onArrayFieldChange('articles', index, 'author', e.target.value)}
                        placeholder="Author name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Author Role</Label>
                      <Input
                        value={String(article.authorRole || '')}
                        onChange={(e) => onArrayFieldChange('articles', index, 'authorRole', e.target.value)}
                        placeholder="Author role"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Publish Date</Label>
                      <Input
                        value={String(article.publishDate || '')}
                        onChange={(e) => onArrayFieldChange('articles', index, 'publishDate', e.target.value)}
                        placeholder="2025-01-15"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Read Time</Label>
                      <Input
                        value={String(article.readTime || '')}
                        onChange={(e) => onArrayFieldChange('articles', index, 'readTime', e.target.value)}
                        placeholder="5 min read"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Input
                        value={String(article.category || '')}
                        onChange={(e) => onArrayFieldChange('articles', index, 'category', e.target.value)}
                        placeholder="Category"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      value={String(article.image || '')}
                      onChange={(e) => onArrayFieldChange('articles', index, 'image', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input
                      value={String(article.slug || '')}
                      onChange={(e) => onArrayFieldChange('articles', index, 'slug', e.target.value)}
                      placeholder="article-slug"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button
            variant="outline"
            onClick={() => onArrayItemAdd('articles', {
              id: Date.now(),
              title: '',
              excerpt: '',
              author: '',
              authorRole: '',
              publishDate: '',
              readTime: '',
              category: '',
              image: '',
              slug: ''
            })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Article
          </Button>
        </CardContent>
      </Card>

      {/* Categories Management */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Manage available categories for articles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Categories (for reference)</Label>
            <div className="space-y-2">
              <>
                {((section.section_data?.categories as string[]) || []).map((category: string, index: number): React.ReactElement => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={category}
                      onChange={(e) => {
                        const categories = [...((section.section_data?.categories as string[]) || [])]
                        categories[index] = e.target.value
                        onSectionDataChange('categories', categories)
                      }}
                      placeholder={`Category ${index + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const categories = [...((section.section_data?.categories as string[]) || [])]
                        categories.splice(index, 1)
                        onSectionDataChange('categories', categories)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const categories = [...((section.section_data?.categories as string[]) || []), '']
                  onSectionDataChange('categories', categories)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            Resources for managing blog content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/admin/faqs">
                <HelpCircle className="h-4 w-4 mr-2" />
                Manage FAQs
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
