"use client"

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Page, PageSection } from '@/types/cms'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  FileText,
  Image,
  Type,
  Layout,
  Edit,
  Plus,
  Trash2,
  GripVertical,
  MoreVertical
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { DeleteConfirmationDialog } from '@/components/admin/delete-confirmation-dialog'
import { useCMSRefresh } from '@/hooks/use-cms-refresh'

export default function EditPagePage() {
  const params = useParams()
  const pageId = params.id as string
  
  const [page, setPage] = useState<Page | null>(null)
  const [sections, setSections] = useState<PageSection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  
  // Section editing state
  const [deletingSection, setDeletingSection] = useState<PageSection | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isAddingSection, setIsAddingSection] = useState(false)
  const [showAddSectionModal, setShowAddSectionModal] = useState(false)
  
  const supabase = createClient()
  const { refreshCurrentPage } = useCMSRefresh()

  const fetchPageData = useCallback(async () => {
    try {
      setIsLoading(true)
      
      // Fetch page data
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('id', pageId)
        .single()

      if (pageError) {
        console.error('Error fetching page:', pageError)
        toast.error('Failed to load page data')
        return
      }

      setPage(pageData)

      // Fetch sections
      const { data: sectionsData, error: sectionsError } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_id', pageId)
        .order('section_order', { ascending: true })

      if (sectionsError) {
        console.error('Error fetching sections:', sectionsError)
        toast.error('Failed to load page sections')
        return
      }

      setSections(sectionsData || [])

    } catch (error) {
      console.error('Error fetching page data:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [pageId, supabase, refreshCurrentPage]) // eslint-disable-line react-hooks/exhaustive-deps -- refreshCurrentPage is used in the function

  useEffect(() => {
    if (pageId) {
      fetchPageData()
    }
  }, [pageId, fetchPageData])

  const handlePageUpdate = (field: string, value: string | number | boolean) => {
    if (!page) return
    
    setPage({ ...page, [field]: value })
    setHasChanges(true)
  }

  const handleSave = async () => {
    if (!page) return

    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('pages')
        .update({
          title: page.title,
          slug: page.slug,
          description: page.description,
          meta_title: page.meta_title,
          meta_description: page.meta_description,
          is_published: page.is_published,
          updated_at: new Date().toISOString()
        })
        .eq('id', pageId)

      if (error) {
        console.error('Error updating page:', error)
        toast.error('Failed to save page')
        return
      }

      setHasChanges(false)
      toast.success('Page saved successfully')
      
      // Refresh the live page to show changes
      refreshCurrentPage()
      
    } catch (error) {
      console.error('Error saving page:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditSection = (section: PageSection) => {
    window.location.href = `/admin/pages/${pageId}/sections/${section.id}/edit`
  }

  const confirmDeleteSection = async () => {
    if (!deletingSection) return

    setIsDeleting(true)
    try {
      const { error } = await supabase
        .from('page_sections')
        .delete()
        .eq('id', deletingSection.id)

      if (error) {
        console.error('Error deleting section:', error)
        toast.error('Failed to delete section')
        return
      }

      // Remove from local state
      setSections(sections.filter(s => s.id !== deletingSection.id))
      setDeletingSection(null)
      setIsDeleteModalOpen(false)
      
      toast.success('Section deleted successfully')
    } catch (error) {
      console.error('Error deleting section:', error)
      toast.error('Failed to delete section')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleAddSection = async (sectionType: string, title: string) => {
    if (!page) return

    setIsAddingSection(true)
    try {
      const newSection = {
        page_id: page.id,
        section_type: sectionType,
        title: title,
        section_order: sections.length,
        content: '',
        metadata: {},
        is_published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('page_sections')
        .insert(newSection)
        .select()
        .single()

      if (error) {
        console.error('Error adding section:', error)
        toast.error('Failed to add section')
        return
      }

      // Add to local state
      setSections([...sections, data])
      setShowAddSectionModal(false)
      
      toast.success('Section added successfully')
    } catch (error) {
      console.error('Error adding section:', error)
      toast.error('Failed to add section')
    } finally {
      setIsAddingSection(false)
    }
  }

  const handleReorderSections = async (newOrder: PageSection[]) => {
    try {
      // Update local state immediately for better UX
      setSections(newOrder)

      // Update database
      const updates = newOrder.map((section, index) => ({
        id: section.id,
        section_order: index
      }))

      for (const update of updates) {
        await supabase
          .from('page_sections')
          .update({ 
            section_order: update.section_order,
            updated_at: new Date().toISOString()
          })
          .eq('id', update.id)
      }

      toast.success('Sections reordered successfully')
    } catch (error) {
      console.error('Error reordering sections:', error)
      toast.error('Failed to reorder sections')
      // Revert local state on error
      fetchPageData()
    }
  }


  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'hero_typewriter': return <Layout className="h-4 w-4" />
      case 'hero_simple': return <Layout className="h-4 w-4" />
      case 'problem_cards': return <FileText className="h-4 w-4" />
      case 'cta': return <Type className="h-4 w-4" />
      case 'platform_features': return <Image className="h-4 w-4" /> // eslint-disable-line jsx-a11y/alt-text -- Lucide React icon
      case 'solutions_carousel': return <FileText className="h-4 w-4" />
      case 'logo_carousel': return <Image className="h-4 w-4" /> // eslint-disable-line jsx-a11y/alt-text -- Lucide React icon
      case 'introduction_accordion': return <Type className="h-4 w-4" />
      case 'approach_cards': return <FileText className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading page..." variant="css" />
      </div>
    )
  }

  if (!page) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-foreground mb-2">Page not found</h2>
        <p className="text-muted-foreground mb-4">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild>
          <Link href="/admin/pages">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pages
          </Link>
        </Button>
      </div>
    )
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
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Edit Page</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {page.title} • /{page.slug}
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href={`/website/${page.slug}`} target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Preview {page.title} Page</span>
              <span className="sm:hidden">Preview</span>
            </Link>
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!hasChanges || isSaving}
            className="w-full sm:w-auto"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Page Details */}
          <Card>
            <CardHeader>
              <CardTitle>Page Details</CardTitle>
              <CardDescription>
                Basic information and SEO settings for the {page.title.toLowerCase()} page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={page.title}
                  onChange={(e) => handlePageUpdate('title', e.target.value)}
                  placeholder="Home"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={page.slug}
                  disabled
                  className="bg-muted text-muted-foreground"
                  placeholder="home"
                />
                <p className="text-xs text-muted-foreground">
                  Home page slug is fixed and cannot be changed
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Page Description</Label>
                <Textarea
                  id="description"
                  value={page.description || ''}
                  onChange={(e) => handlePageUpdate('description', e.target.value)}
                  placeholder="Main landing page and entry point for Elevation AI"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_title">SEO Title</Label>
                <Input
                  id="meta_title"
                  value={page.meta_title || ''}
                  onChange={(e) => handlePageUpdate('meta_title', e.target.value)}
                  placeholder="Elevation AI - The Agentic Platform for Enterprise"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_description">SEO Description</Label>
                <Textarea
                  id="meta_description"
                  value={page.meta_description || ''}
                  onChange={(e) => handlePageUpdate('meta_description', e.target.value)}
                  placeholder="Elevation AI is the agentic knowledge and work orchestration platform that transforms how enterprises manage, process, and act on information."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Page Sections */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{page.title} Page Sections</CardTitle>
                  <CardDescription>
                    Manage the content sections for the {page.title.toLowerCase()} page. All sections are connected to the CMS.
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setShowAddSectionModal(true)}
                  disabled={isAddingSection}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {isAddingSection ? 'Adding...' : 'Add Section'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {sections.length > 0 ? (
                <div className="space-y-3">
                  {sections.map((section, index) => (
                    <div key={section.id} className="flex flex-col space-y-3 p-4 border rounded-lg bg-muted/30 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex items-center space-x-2 min-w-0 flex-1">
                          {getSectionIcon(section.section_type)}
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium text-foreground truncate">{section.title}</h4>
                            <p className="text-sm text-muted-foreground capitalize truncate">
                              {section.section_type.replace(/-/g, ' ')}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between space-x-2 sm:justify-end">
                        <Badge variant="secondary" className="text-xs">
                          CMS Connected
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditSection(section)}
                            className="flex-shrink-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setDeletingSection(section)
                              setIsDeleteModalOpen(true)
                            }}
                            className="flex-shrink-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No sections found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Add your first section to start building your page content.
                  </p>
                  <Button
                    onClick={() => setShowAddSectionModal(true)}
                    disabled={isAddingSection}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {isAddingSection ? 'Adding...' : 'Add First Section'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Page Status */}
          <Card>
            <CardHeader>
              <CardTitle>Page Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  Live
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                The {page.title.toLowerCase()} page is always live and visible to visitors
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Sections:</span>
                <span className="font-medium">{sections.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CMS Connected:</span>
                <span className="font-medium text-green-600">{sections.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="font-medium">{new Date(page.updated_at).toLocaleDateString()}</span>
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
                <Link href={`/website/${page.slug}`} target="_blank">
                  <Eye className="h-4 w-4 mr-2" />
                  View {page.title} Page
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <Link href="/admin/pages">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to All Pages
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Section Modal */}
      {showAddSectionModal && (
        <AddSectionModal
          isOpen={showAddSectionModal}
          onClose={() => setShowAddSectionModal(false)}
          onAdd={handleAddSection}
          isLoading={isAddingSection}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setDeletingSection(null)
        }}
        onConfirm={confirmDeleteSection}
        title="Delete Section"
        description={`Are you sure you want to delete "${deletingSection?.title}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  )
}

// Add Section Modal Component
function AddSectionModal({ 
  isOpen, 
  onClose, 
  onAdd, 
  isLoading 
}: { 
  isOpen: boolean
  onClose: () => void
  onAdd: (sectionType: string, title: string) => void
  isLoading: boolean
}) {
  const [sectionType, setSectionType] = useState('hero_simple')
  const [title, setTitle] = useState('')

  const sectionTypes = [
    { value: 'hero_simple', label: 'Hero Section', description: 'Main page header with title and description' },
    { value: 'hero_typewriter', label: 'Animated Hero', description: 'Hero with typewriter animation effect' },
    { value: 'introduction_accordion', label: 'Introduction', description: 'Expandable content sections' },
    { value: 'problem_cards', label: 'Problem Cards', description: 'Cards highlighting problems and solutions' },
    { value: 'logo_carousel', label: 'Logo Carousel', description: 'Rotating display of partner/client logos' },
    { value: 'cta', label: 'Call to Action', description: 'Buttons and forms for user engagement' },
    { value: 'platform_features', label: 'Platform Features', description: 'Feature showcase with icons and descriptions' },
    { value: 'faq', label: 'FAQ Section', description: 'Frequently asked questions and answers' },
    { value: 'team_members', label: 'Team Members', description: 'Team member profiles and bios' },
    { value: 'custom', label: 'Custom Section', description: 'Flexible content block for custom layouts' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAdd(sectionType, title.trim())
      setTitle('')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Section</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Section Type</label>
              <select
                value={sectionType}
                onChange={(e) => setSectionType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {sectionTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                {sectionTypes.find(t => t.value === sectionType)?.description}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Section Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter section title"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm border rounded-md hover:bg-muted"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !title.trim()}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
              >
                {isLoading ? 'Adding...' : 'Add Section'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
