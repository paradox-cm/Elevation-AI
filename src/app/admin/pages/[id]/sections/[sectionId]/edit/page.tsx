"use client"

import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { PageSection, Page } from '@/types/cms'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { FileUpload } from '@/components/ui/file-upload'
import { 
  ArrowLeft, 
  Save, 
  Plus,
  Trash2,
  Loader2
} from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'
import { pageSectionsService } from '@/lib/cms'
import { useCMSRefresh } from '@/hooks/use-cms-refresh'
import { BlogListingSection } from '@/components/sections/blog-listing-section'

export default function SectionEditPage() {
  const params = useParams()
  const pageId = params.id as string
  const sectionId = params.sectionId as string
  
  const [section, setSection] = useState<PageSection | null>(null)
  const [page, setPage] = useState<Page | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  const supabase = createClient()
  const router = useRouter()
  const { refreshCurrentPage } = useCMSRefresh()

  const fetchSectionData = useCallback(async () => {
    try {
      setIsLoading(true)
      
      // Fetch section data
      const { data: sectionData, error: sectionError } = await supabase
        .from('page_sections')
        .select('*')
        .eq('id', sectionId)
        .single()

      if (sectionError) {
        console.error('Error fetching section:', sectionError)
        toast.error('Failed to load section data')
        return
      }

      setSection(sectionData)

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
    } catch (error) {
      console.error('Error fetching section data:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [sectionId, pageId, supabase, refreshCurrentPage]) // eslint-disable-line react-hooks/exhaustive-deps -- refreshCurrentPage is used in the function

  useEffect(() => {
    if (sectionId) {
      fetchSectionData()
    }
  }, [sectionId, fetchSectionData])

  const handleFieldChange = (field: string, value: string | number | boolean) => {
    if (!section) return
    
    setSection({ ...section, [field]: value })
  }

  const handleSectionDataChange = (key: string, value: unknown) => {
    if (!section) return
    
    setSection({
      ...section,
      section_data: {
        ...section.section_data,
        [key]: value
      }
    })
  }

  const addArrayItem = (key: string, item: unknown) => {
    if (!section) return
    
    const existingValue = section.section_data?.[key]
    const array = [...(Array.isArray(existingValue) ? existingValue : []), item]
    handleSectionDataChange(key, array)
  }

  const removeArrayItem = (key: string, index: number) => {
    if (!section) return
    
    const existingValue = section.section_data?.[key]
    const array = [...(Array.isArray(existingValue) ? existingValue : [])]
    array.splice(index, 1)
    handleSectionDataChange(key, array)
  }

  const handleArrayFieldChange = (key: string, index: number, field: string, value: unknown) => {
    if (!section) return
    
    const existingValue = section.section_data?.[key]
    const array = [...(Array.isArray(existingValue) ? existingValue : [])]
    array[index] = { ...array[index], [field]: value }
    handleSectionDataChange(key, array)
  }

  const handleNestedFieldChange = (parentKey: string, childKey: string, value: unknown) => {
    if (!section) return
    
    const existingParentValue = section.section_data?.[parentKey]
    const parentObject = typeof existingParentValue === 'object' && existingParentValue !== null ? existingParentValue : {}
    
    setSection({
      ...section,
      section_data: {
        ...section.section_data,
        [parentKey]: {
          ...parentObject,
          [childKey]: value
        }
      }
    })
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
    return result.path
  }

  const handleSave = async () => {
    if (!section) {
      toast.error('No section data to save')
      return
    }

    setIsSaving(true)
    try {
      console.log('Saving section:', section.id, {
        title: section.title,
        content: section.content,
        section_data: section.section_data,
        section_order: section.section_order,
        is_published: section.is_published
      })

      const updatedSection = await pageSectionsService.update(section.id, {
        title: section.title,
        content: section.content,
        section_data: section.section_data,
        section_order: section.section_order,
        is_published: section.is_published
      })
      
      console.log('Section updated successfully:', updatedSection)
      toast.success('Section updated successfully! Changes will appear on the home page.')
      
      // Refresh the current page to show updated data
      refreshCurrentPage()
      
    } catch (error) {
      console.error('Error saving section:', error)
      toast.error(`Failed to save section: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSaving(false)
    }
  }

  const renderSectionFields = (): React.ReactElement | null => {
    if (!section) return null

    const sectionType = section.section_type

    switch (sectionType) {
      case 'hero_typewriter':
        return (
          <div className="space-y-6">
            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Main Content</CardTitle>
                <CardDescription>
                  Primary heading and description for the hero section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Main Title</Label>
                  <Input
                    id="title"
                    value={String(section.section_data?.title || '')}
                    onChange={(e) => handleSectionDataChange('title', e.target.value)}
                    placeholder="The Agentic Platform for"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={String(section.section_data?.description || '')}
                    onChange={(e) => handleSectionDataChange('description', e.target.value)}
                    placeholder="Elevation AI is the agentic knowledge and work orchestration platform..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Typewriter Animation Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Typewriter Animation</CardTitle>
                <CardDescription>
                  Configure the typewriter animation behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="speed">Typing Speed (ms)</Label>
                    <Input
                      id="speed"
                      type="number"
                      value={String(section.section_data?.speed || 100)}
                      onChange={(e) => handleSectionDataChange('speed', parseInt(e.target.value))}
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="delay">Initial Delay (ms)</Label>
                    <Input
                      id="delay"
                      type="number"
                      value={String(section.section_data?.delay || 1000)}
                      onChange={(e) => handleSectionDataChange('delay', parseInt(e.target.value))}
                      placeholder="1000"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Typewriter Words</Label>
                  <div className="space-y-3">
                    {(Array.isArray(section.section_data?.words) ? section.section_data.words : []).map((word: unknown, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={String(word || '')}
                          onChange={(e) => {
                            const words = [...(Array.isArray(section.section_data?.words) ? section.section_data.words : [])]
                            words[index] = e.target.value
                            handleSectionDataChange('words', words)
                          }}
                          placeholder={`Word ${index + 1}`}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const words = [...(Array.isArray(section.section_data?.words) ? section.section_data.words : [])]
                            words.splice(index, 1)
                            handleSectionDataChange('words', words)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => addArrayItem('words', '')}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Word
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'introduction_accordion':
        return (
          <div className="space-y-6">
            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Main Content</CardTitle>
                <CardDescription>
                  Title and accordion items for the introduction section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Section Title</Label>
                  <Input
                    id="title"
                    value={String(section.section_data?.title || '')}
                    onChange={(e) => handleSectionDataChange('title', e.target.value)}
                    placeholder="Why Elevation AI?"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Accordion Items</Label>
                  <div className="space-y-3">
                    {(Array.isArray(section.section_data?.accordionItems) ? section.section_data.accordionItems : []).map((item: unknown, index: number) => (
                      <Card key={index} className="border-dashed">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm">Item {index + 1}</CardTitle>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeArrayItem('accordionItems', index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label htmlFor={`accordion-${index}-title`}>Title</Label>
                            <Input
                              id={`accordion-${index}-title`}
                              value={String((item as { title?: string })?.title || '')}
                              onChange={(e) => handleArrayFieldChange('accordionItems', index, 'title', e.target.value)}
                              placeholder="Accordion item title"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`accordion-${index}-content`}>Content</Label>
                            <Textarea
                              id={`accordion-${index}-content`}
                              value={String((item as { content?: string })?.content || '')}
                              onChange={(e) => handleArrayFieldChange('accordionItems', index, 'content', e.target.value)}
                              placeholder="Accordion item content"
                              rows={3}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => addArrayItem('accordionItems', { title: '', content: '' })}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Accordion Item
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'logo_carousel':
        return (
          <div className="space-y-6">
            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Main Content</CardTitle>
                <CardDescription>
                  Title for the Logo Carousel section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={String(section.section_data?.title || '')}
                    onChange={(e) => handleSectionDataChange('title', e.target.value)}
                    placeholder="Led by industry veterans from:"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Logos */}
            <Card>
              <CardHeader>
                <CardTitle>Company Logos</CardTitle>
                <CardDescription>
                  Manage the logos displayed in the carousel. Upload new logos or edit existing ones.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {(Array.isArray(section.section_data?.logos) ? section.section_data.logos : []).map((logo: unknown, index: number) => (
                    <Card key={index} className="border">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          {/* Logo Preview */}
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-muted rounded-lg border flex items-center justify-center overflow-hidden">
                              {((logo as { logo?: string; filename?: string }).logo || (logo as { logo?: string; filename?: string }).filename) ? (
                                <Image
                                  src={(logo as { logo?: string; filename?: string }).logo || `/images/logos/${(logo as { logo?: string; filename?: string }).filename}`}
                                  alt={(logo as { name?: string }).name || 'Logo preview'}
                                  width={80}
                                  height={80}
                                  className="w-full h-full object-contain filter dark:brightness-0 dark:invert opacity-80"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                  }}
                                />
                              ) : null}
                              <div className={`${((logo as { logo?: string; filename?: string }).logo || (logo as { logo?: string; filename?: string }).filename) ? 'hidden' : ''} text-muted-foreground text-xs text-center p-2`}>
                                No logo
                              </div>
                            </div>
                          </div>

                          {/* Form Fields */}
                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              {/* Company Name */}
                              <div>
                                <Label htmlFor={`logo-${index}-name`}>Company Name</Label>
                                <Input
                                  id={`logo-${index}-name`}
                                  value={String((logo as { name?: string })?.name || '')}
                                  onChange={(e) => handleArrayFieldChange('logos', index, 'name', e.target.value)}
                                  placeholder="Accenture"
                                />
                              </div>
                              
                              {/* Show Text Toggle */}
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id={`logo-${index}-showText`}
                                  checked={(logo as { showText?: boolean })?.showText !== false}
                                  onCheckedChange={(checked) => handleArrayFieldChange('logos', index, 'showText', checked)}
                                />
                                <Label htmlFor={`logo-${index}-showText`} className="text-sm">
                                  Show company name
                                </Label>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              {/* File Upload */}
                              <div>
                                <Label className="text-sm font-medium">Upload New Logo</Label>
                                <FileUpload
                                  onFileSelect={(file) => {
                                    // Auto-fill company name if empty
                                    if (!(logo as { name?: string })?.name) {
                                      const nameWithoutExt = file.name.split('.')[0]
                                      handleArrayFieldChange('logos', index, 'name', nameWithoutExt)
                                    }
                                    // Auto-fill filename
                                    handleArrayFieldChange('logos', index, 'filename', file.name)
                                  }}
                                  onFileUpload={async (file) => {
                                    const path = await handleFileUpload(file)
                                    handleArrayFieldChange('logos', index, 'logo', path)
                                    return path
                                  }}
                                  accept="image/*"
                                  maxSize={5}
                                />
                              </div>
                            </div>

                            {/* Advanced Options - Collapsible */}
                            <details className="group">
                              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Advanced Options
                              </summary>
                              <div className="mt-3 space-y-3">
                                <div>
                                  <Label htmlFor={`logo-${index}-filename`} className="text-xs">Filename</Label>
                                  <Input
                                    id={`logo-${index}-filename`}
                                    value={String((logo as { filename?: string })?.filename || '')}
                                    onChange={(e) => handleArrayFieldChange('logos', index, 'filename', e.target.value)}
                                    placeholder="Accenture.svg"
                                    className="font-mono text-sm"
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    Logo filename (e.g., Accenture.svg)
                                  </p>
                                </div>
                                <div>
                                  <Label htmlFor={`logo-${index}-logo`} className="text-xs">Logo Path (Advanced)</Label>
                                  <Input
                                    id={`logo-${index}-logo`}
                                    value={String((logo as { logo?: string })?.logo || '')}
                                    onChange={(e) => handleArrayFieldChange('logos', index, 'logo', e.target.value)}
                                    placeholder="/images/logos/Accenture.svg"
                                    className="font-mono text-sm"
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    Full logo path. Usually not needed when using filename.
                                  </p>
                                </div>
                              </div>
                            </details>
                          </div>

                          {/* Delete Button */}
                          <div className="flex-shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeArrayItem('logos', index)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Add Logo Button */}
                <div className="pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => addArrayItem('logos', {
                      name: '',
                      logo: ''
                    })}
                    className="w-full border-dashed border-2 hover:border-primary/50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Logo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'problem_cards':
        // Check if this is a Pricing page How It Works section
        if (page?.slug === 'pricing') {
          return (
            <div className="space-y-6">
              {/* Main Content */}
              <Card>
                <CardHeader>
                  <CardTitle>How It Works Content</CardTitle>
                  <CardDescription>
                    Edit the How It Works section content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Section Title</Label>
                    <Input
                      value={String(section.section_data?.title || '')}
                      onChange={(e) => handleSectionDataChange('title', e.target.value)}
                      placeholder="How It Works"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      value={String(section.section_data?.description || '')}
                      onChange={(e) => handleSectionDataChange('description', e.target.value)}
                      placeholder="Three simple steps to get your custom plan"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Steps Cards */}
              <Card>
                <CardHeader>
                  <CardTitle>Steps</CardTitle>
                  <CardDescription>
                    Configure the three steps in the How It Works section
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {(Array.isArray(section.section_data?.cards) ? section.section_data.cards : []).map((card: Record<string, unknown>, index: number) => (
                      <div key={index} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Step {index + 1}</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const cards = [...(Array.isArray(section.section_data?.cards) ? section.section_data.cards : [])]
                              cards.splice(index, 1)
                              handleSectionDataChange('cards', cards)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <Label>Step Title</Label>
                            <Input
                              value={String((card as { title?: string })?.title || '')}
                              onChange={(e) => handleArrayFieldChange('cards', index, 'title', e.target.value)}
                              placeholder="Tell Us About Your Universe"
                            />
                          </div>
                          <div>
                            <Label>Step Description</Label>
                            <Textarea
                              value={String((card as { description?: string })?.description || '')}
                              onChange={(e) => handleArrayFieldChange('cards', index, 'description', e.target.value)}
                              placeholder="Share key details about your organization and core needs."
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label>Icon Name</Label>
                            <Input
                              value={String((card as { icon?: string })?.icon || '')}
                              onChange={(e) => handleArrayFieldChange('cards', index, 'icon', e.target.value)}
                              placeholder="user-line"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => {
                        const cards = [...(Array.isArray(section.section_data?.cards) ? section.section_data.cards : []), { title: '', description: '', icon: '' }]
                        handleSectionDataChange('cards', cards)
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Step
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        }
        
        // Check if this is a People page challenge/solution section
        if (page?.slug === 'people' || page?.slug === 'people-concierge' || page?.slug === 'people-experts') {
          return (
            <div className="space-y-6">
              {/* Challenge Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Challenge Section</CardTitle>
                  <CardDescription>
                    Edit the challenge section content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="challenge.badgeText">Badge Text</Label>
                    <Input
                      value={String((section.section_data?.challenge as { badgeText?: string })?.badgeText || '')}
                      onChange={(e) => handleNestedFieldChange('challenge', 'badgeText', e.target.value)}
                      placeholder="The Challenge"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="challenge.title">Challenge Title</Label>
                    <Input
                      value={String((section.section_data?.challenge as { title?: string })?.title || '')}
                      onChange={(e) => handleNestedFieldChange('challenge', 'title', e.target.value)}
                      placeholder="Technology Alone Isn't Transformation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="challenge.statement">Challenge Statement</Label>
                    <Textarea
                      value={String((section.section_data?.challenge as { statement?: string })?.statement || '')}
                      onChange={(e) => handleNestedFieldChange('challenge', 'statement', e.target.value)}
                      placeholder="Adopting agentic AI is not just about adding another app..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Solution Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Solution Section</CardTitle>
                  <CardDescription>
                    Edit the solution section content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="solution.badgeText">Badge Text</Label>
                    <Input
                      value={String((section.section_data?.solution as { badgeText?: string })?.badgeText || '')}
                      onChange={(e) => handleNestedFieldChange('solution', 'badgeText', e.target.value)}
                      placeholder="Our Solution"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="solution.subtitle">Subtitle</Label>
                    <Input
                      value={String((section.section_data?.solution as { subtitle?: string })?.subtitle || '')}
                      onChange={(e) => handleNestedFieldChange('solution', 'subtitle', e.target.value)}
                      placeholder="We Become Your Agentic Operations Team"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="solution.description">Description</Label>
                    <Textarea
                      value={String((section.section_data?.solution as { description?: string })?.description || '')}
                      onChange={(e) => handleNestedFieldChange('solution', 'description', e.target.value)}
                      placeholder="Our Concierge service is a deep, hands-on partnership..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Process Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>Process Steps</CardTitle>
                  <CardDescription>
                    Manage the process flow steps
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(Array.isArray((section.section_data?.solution as { processSteps?: unknown[] })?.processSteps) ? ((section.section_data?.solution as { processSteps?: unknown[] })?.processSteps || []) : []).map((step: unknown, index: number) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Step {index + 1}</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('solution.processSteps', index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={String((step as { title?: string })?.title || '')}
                            onChange={(e) => handleArrayFieldChange('solution.processSteps', index, 'title', e.target.value)}
                            placeholder="Design & Strategize"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Icon</Label>
                          <select
                            value={String((step as { icon?: string })?.icon || 'target-line')}
                            onChange={(e) => handleArrayFieldChange('solution.processSteps', index, 'icon', e.target.value)}
                            className="w-full px-3 py-2 border border-input bg-background rounded-md"
                          >
                            <option value="target-line">Target</option>
                            <option value="flash-line">Flash</option>
                            <option value="shield-check-line">Shield</option>
                            <option value="sparkles-line">Sparkles</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={String((step as { description?: string })?.description || '')}
                          onChange={(e) => handleArrayFieldChange('solution.processSteps', index, 'description', e.target.value)}
                          placeholder="Step description..."
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addArrayItem('solution.processSteps', { title: '', description: '', icon: 'target-line' })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Step
                  </Button>
                </CardContent>
              </Card>
            </div>
          )
        }
        // Default problem_cards case for other pages
        return (
          <div className="space-y-6">
            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Main Content</CardTitle>
                <CardDescription>
                  Title and description for the problem cards section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Section Title</Label>
                  <Input
                    id="title"
                    value={String(section.section_data?.title || '')}
                    onChange={(e) => handleSectionDataChange('title', e.target.value)}
                    placeholder="The Problems We Solve"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={String(section.section_data?.description || '')}
                    onChange={(e) => handleSectionDataChange('description', e.target.value)}
                    placeholder="Brief description of the problems section"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Problem Cards */}
            <Card>
              <CardHeader>
                <CardTitle>Problem Cards</CardTitle>
                <CardDescription>
                  Manage the problem cards displayed in this section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {(Array.isArray(section.section_data?.problems) ? section.section_data.problems : []).map((problem: unknown, index: number) => (
                    <Card key={index} className="border-dashed">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Problem {index + 1}</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem('problems', index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor={`problem-${index}-title`}>Title</Label>
                          <Input
                            id={`problem-${index}-title`}
                            value={String((problem as { title?: string })?.title || '')}
                            onChange={(e) => handleArrayFieldChange('problems', index, 'title', e.target.value)}
                            placeholder="Problem title"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`problem-${index}-description`}>Description</Label>
                          <Textarea
                            id={`problem-${index}-description`}
                            value={String((problem as { description?: string })?.description || '')}
                            onChange={(e) => handleArrayFieldChange('problems', index, 'description', e.target.value)}
                            placeholder="Problem description"
                            rows={3}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => addArrayItem('problems', { title: '', description: '' })}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Problem Card
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case 'platform_features':
        return (
          <div className="space-y-6">
            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Main Content</CardTitle>
                <CardDescription>
                  Primary heading and description for the Platform Features section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Section Title</Label>
                  <Input
                    id="title"
                    value={String(section.section_data?.title || '')}
                    onChange={(e) => handleSectionDataChange('title', e.target.value)}
                    placeholder="Platform Features"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={String(section.section_data?.description || '')}
                    onChange={(e) => handleSectionDataChange('description', e.target.value)}
                    placeholder="Brief description of the platform features"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Platform Features */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Features</CardTitle>
                <CardDescription>
                  Manage the platform features displayed in this section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {(Array.isArray(section.section_data?.features) ? section.section_data.features : []).map((feature: unknown, index: number) => (
                    <Card key={index} className="border-dashed">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Feature {index + 1}</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem('features', index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor={`feature-${index}-title`}>Title</Label>
                          <Input
                            id={`feature-${index}-title`}
                            value={String((feature as { title?: string })?.title || '')}
                            onChange={(e) => handleArrayFieldChange('features', index, 'title', e.target.value)}
                            placeholder="Feature title"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`feature-${index}-description`}>Description</Label>
                          <Textarea
                            id={`feature-${index}-description`}
                            value={String((feature as { description?: string })?.description || '')}
                            onChange={(e) => handleArrayFieldChange('features', index, 'description', e.target.value)}
                            placeholder="Feature description"
                            rows={3}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => addArrayItem('features', { title: '', description: '' })}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case 'solutions_carousel':
        // Check if this is a People page expert network section
        if (page?.slug === 'people-concierge' || page?.slug === 'people-experts') {
          return (
            <div className="space-y-6">
              {/* Main Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Main Content</CardTitle>
                  <CardDescription>
                    Title and description for the Expert Network section
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="badgeText">Badge Text</Label>
                    <Input
                      id="badgeText"
                      value={String(section.section_data?.badgeText || '')}
                      onChange={(e) => handleSectionDataChange('badgeText', e.target.value)}
                      placeholder="Expert Network"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Section Title</Label>
                    <Input
                      id="title"
                      value={String(section.section_data?.title || '')}
                      onChange={(e) => handleSectionDataChange('title', e.target.value)}
                      placeholder="Access World-Class Expertise"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={String(section.section_data?.description || '')}
                      onChange={(e) => handleSectionDataChange('description', e.target.value)}
                      placeholder="Tap into our curated network of specialists across AI, enterprise architecture, and industry domains."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backgroundColor">Background Color Class</Label>
                    <Input
                      id="backgroundColor"
                      value={String(section.section_data?.backgroundColor || '')}
                      onChange={(e) => handleSectionDataChange('backgroundColor', e.target.value)}
                      placeholder="bg-blue-500/10"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Expert Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Expert Categories</CardTitle>
                  <CardDescription>
                    Manage the expert categories displayed in the carousel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {(Array.isArray(section.section_data?.expertCategories) ? section.section_data.expertCategories : []).map((category: unknown, index: number) => (
                      <Card key={index} className="border-dashed">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm">Category {index + 1}</CardTitle>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeArrayItem('expertCategories', index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label>Title</Label>
                              <Input
                                value={String((category as { title?: string })?.title || '')}
                                onChange={(e) => handleArrayFieldChange('expertCategories', index, 'title', e.target.value)}
                                placeholder="AI & Machine Learning"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Icon</Label>
                              <select
                                value={String((category as { icon?: string })?.icon || 'brain-line')}
                                onChange={(e) => handleArrayFieldChange('expertCategories', index, 'icon', e.target.value)}
                                className="w-full px-3 py-2 border border-input bg-background rounded-md"
                              >
                                <option value="brain-line">Brain</option>
                                <option value="shield-check-line">Shield</option>
                                <option value="global-line">Globe</option>
                                <option value="award-line">Award</option>
                              </select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={String((category as { description?: string })?.description || '')}
                              onChange={(e) => handleArrayFieldChange('expertCategories', index, 'description', e.target.value)}
                              placeholder="Specialists in artificial intelligence, machine learning, and advanced automation technologies."
                              rows={3}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Specialties (one per line)</Label>
                            <Textarea
                              value={((category as { specialties?: string[] })?.specialties || []).join('\n')}
                              onChange={(e) => {
                                const specialties = e.target.value.split('\n').filter(s => s.trim())
                                handleArrayFieldChange('expertCategories', index, 'specialties', specialties)
                              }}
                              placeholder="Natural Language Processing&#10;Computer Vision&#10;Predictive Analytics&#10;Robotic Process Automation"
                              rows={4}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => addArrayItem('expertCategories', { 
                      title: '', 
                      description: '', 
                      icon: 'brain-line',
                      specialties: []
                    })}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Expert Category
                  </Button>
                </CardContent>
              </Card>

              {/* Carousel Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Carousel Settings</CardTitle>
                  <CardDescription>
                    Configure the carousel behavior and appearance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="autoPlay">Auto Play</Label>
                      <select
                        id="autoPlay"
                        value={((section.section_data?.carouselSettings as Record<string, unknown>)?.autoPlay as boolean) ? 'true' : 'false'}
                        onChange={(e) => handleNestedFieldChange('carouselSettings', 'autoPlay', e.target.value === 'true')}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md"
                      >
                        <option value="true">Enabled</option>
                        <option value="false">Disabled</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="autoPlayInterval">Auto Play Interval (ms)</Label>
                      <Input
                        id="autoPlayInterval"
                        type="number"
                        value={((section.section_data?.carouselSettings as Record<string, unknown>)?.autoPlayInterval as number) || 5000}
                        onChange={(e) => handleNestedFieldChange('carouselSettings', 'autoPlayInterval', parseInt(e.target.value))}
                        placeholder="5000"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardWidth">Card Width (px)</Label>
                      <Input
                        id="cardWidth"
                        type="number"
                        value={((section.section_data?.carouselSettings as Record<string, unknown>)?.cardWidth as number) || 320}
                        onChange={(e) => handleNestedFieldChange('carouselSettings', 'cardWidth', parseInt(e.target.value))}
                        placeholder="320"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardGap">Card Gap (px)</Label>
                      <Input
                        id="cardGap"
                        type="number"
                        value={((section.section_data?.carouselSettings as Record<string, unknown>)?.cardGap as number) || 24}
                        onChange={(e) => handleNestedFieldChange('carouselSettings', 'cardGap', parseInt(e.target.value))}
                        placeholder="24"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        }
        // Default solutions_carousel case for other pages
        return (
          <div className="space-y-6">
            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Main Content</CardTitle>
                <CardDescription>
                  Title and description for the Solutions Carousel section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Section Title</Label>
                  <Input
                    id="title"
                    value={String(section.section_data?.title || '')}
                    onChange={(e) => handleSectionDataChange('title', e.target.value)}
                    placeholder="Who We Serve"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={String(section.section_data?.description || '')}
                    onChange={(e) => handleSectionDataChange('description', e.target.value)}
                    placeholder="Brief description of the solutions"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Solutions */}
            <Card>
              <CardHeader>
                <CardTitle>Solutions</CardTitle>
                <CardDescription>
                  Manage the solutions displayed in the carousel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {((section.section_data?.solutions as unknown[]) || []).map((solution: unknown, index: number) => (
                    <Card key={index} className="border-dashed">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Solution {index + 1}</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem('solutions', index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor={`solution-${index}-title`}>Title</Label>
                          <Input
                            id={`solution-${index}-title`}
                            value={String((solution as { title?: string })?.title || '')}
                            onChange={(e) => handleArrayFieldChange('solutions', index, 'title', e.target.value)}
                            placeholder="Solution title"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`solution-${index}-description`}>Description</Label>
                          <Textarea
                            id={`solution-${index}-description`}
                            value={String((solution as { description?: string })?.description || '')}
                            onChange={(e) => handleArrayFieldChange('solutions', index, 'description', e.target.value)}
                            placeholder="Solution description"
                            rows={3}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => addArrayItem('solutions', { title: '', description: '' })}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Solution
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case 'approach_cards':
        // Check if this is a People page approach section
        if (page?.slug === 'people-concierge' || page?.slug === 'people-experts') {
          return (
            <div className="space-y-6">
              {/* Main Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Main Content</CardTitle>
                  <CardDescription>
                    Title and description for the &quot;Who This Is For&quot; section
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="badgeText">Badge Text</Label>
                    <Input
                      id="badgeText"
                      value={String(section.section_data?.badgeText || '')}
                      onChange={(e) => handleSectionDataChange('badgeText', e.target.value)}
                      placeholder="Who This Is For"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Section Title</Label>
                    <Input
                      id="title"
                      value={String(section.section_data?.title || '')}
                      onChange={(e) => handleSectionDataChange('title', e.target.value)}
                      placeholder="A Partnership for Ambitious Leaders"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={String(section.section_data?.description || '')}
                      onChange={(e) => handleSectionDataChange('description', e.target.value)}
                      placeholder="Our Concierge service is designed for growth-oriented leaders who:"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logoImage">Logo Image Path</Label>
                    <Input
                      id="logoImage"
                      value={(section.section_data?.logoImage as string) || ''}
                      onChange={(e) => handleSectionDataChange('logoImage', e.target.value)}
                      placeholder="/images/branding/E-AI-Sqaure.svg"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Characteristics */}
              <Card>
                <CardHeader>
                  <CardTitle>Characteristics</CardTitle>
                  <CardDescription>
                    Manage the characteristics displayed in this section
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {((section.section_data?.characteristics as unknown[]) || []).map((characteristic: unknown, index: number) => {
                      const char = characteristic as Record<string, unknown>;
                      return (
                      <Card key={index} className="border-dashed">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm">Characteristic {index + 1}</CardTitle>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeArrayItem('characteristics', index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-2">
                              <Label>Number</Label>
                              <Input
                                value={(char.number as string) || ''}
                                onChange={(e) => handleArrayFieldChange('characteristics', index, 'number', e.target.value)}
                                placeholder="1"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Title</Label>
                              <Input
                                value={String((char as { title?: string })?.title || '')}
                                onChange={(e) => handleArrayFieldChange('characteristics', index, 'title', e.target.value)}
                                placeholder="First-Mover Advantage"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={String((char as { description?: string })?.description || '')}
                              onChange={(e) => handleArrayFieldChange('characteristics', index, 'description', e.target.value)}
                              placeholder="Want to move quickly and capture a first-mover advantage in their industry."
                              rows={3}
                            />
                          </div>
                        </CardContent>
                      </Card>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => addArrayItem('characteristics', { number: '', title: '', description: '' })}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Characteristic
                  </Button>
                </CardContent>
              </Card>
            </div>
          )
        }
        // Default approach_cards case for other pages
        return (
          <div className="space-y-6">
            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Main Content</CardTitle>
                <CardDescription>
                  Title and description for the How We Do It section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Section Title</Label>
                  <Input
                    id="title"
                    value={String(section.section_data?.title || '')}
                    onChange={(e) => handleSectionDataChange('title', e.target.value)}
                    placeholder="How We Do It"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={String(section.section_data?.description || '')}
                    onChange={(e) => handleSectionDataChange('description', e.target.value)}
                    placeholder="Brief description of the approach"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Approach Cards */}
            <Card>
              <CardHeader>
                <CardTitle>Approach Cards</CardTitle>
                <CardDescription>
                  Manage the approach cards displayed in this section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {((section.section_data?.approaches as unknown[]) || []).map((approach: unknown, index: number) => {
                    const app = approach as Record<string, unknown>;
                    return (
                    <Card key={index} className="border-dashed">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Approach {index + 1}</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem('approaches', index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor={`approach-${index}-title`}>Title</Label>
                          <Input
                            id={`approach-${index}-title`}
                            value={String((app as { title?: string })?.title || '')}
                            onChange={(e) => handleArrayFieldChange('approaches', index, 'title', e.target.value)}
                            placeholder="Approach title"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`approach-${index}-description`}>Description</Label>
                          <Textarea
                            id={`approach-${index}-description`}
                            value={String((app as { description?: string })?.description || '')}
                            onChange={(e) => handleArrayFieldChange('approaches', index, 'description', e.target.value)}
                            placeholder="Approach description"
                            rows={3}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  onClick={() => addArrayItem('approaches', { title: '', description: '' })}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Approach Card
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case 'cta':
        // Check if this is a Pricing page CTA section
        if (page?.slug === 'pricing') {
          // Determine which CTA section this is based on section order
          const isCalculateSection = section.section_order === 3
          
          return (
            <div className="space-y-6">
              {/* Main Content */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isCalculateSection ? 'Get Custom Quote Section' : 'Final CTA Section'}
                  </CardTitle>
                  <CardDescription>
                    {isCalculateSection 
                      ? 'Configure the Get Custom Quote section with animation'
                      : 'Configure the final call-to-action section'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isCalculateSection ? (
                    // Simplified form for Calculate/Quote section
                    <>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="hasAnimation"
                          checked={section.section_data?.hasAnimation !== false}
                          onCheckedChange={(checked) => handleSectionDataChange('hasAnimation', checked)}
                        />
                        <Label htmlFor="hasAnimation">Enable Background Animation</Label>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="animationType">Animation Type</Label>
                        <Input
                          value={(section.section_data?.animationType as string) || 'growth'}
                          onChange={(e) => handleSectionDataChange('animationType', e.target.value)}
                          placeholder="growth"
                        />
                      </div>
                    </>
                  ) : (
                    // Full form for Final CTA section
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="title">Section Title</Label>
                        <Input
                          value={String(section.section_data?.title || '')}
                          onChange={(e) => handleSectionDataChange('title', e.target.value)}
                          placeholder="Ready to Transform Your Operations?"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          value={String(section.section_data?.description || '')}
                          onChange={(e) => handleSectionDataChange('description', e.target.value)}
                          placeholder="Discover how Elevation AI can unify your knowledge, secure your operations, and orchestrate intelligent workflows across your organization."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="backgroundColor">Background Color Class</Label>
                        <Input
                          value={(section.section_data?.backgroundColor as string) || 'bg-muted/30'}
                          onChange={(e) => handleSectionDataChange('backgroundColor', e.target.value)}
                          placeholder="bg-muted/30"
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* CTA Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle>Call-to-Action Buttons</CardTitle>
                  <CardDescription>
                    {isCalculateSection 
                      ? 'Configure the main quote button (typically just one button)'
                      : 'Configure the section buttons'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {((section.section_data?.ctaButtons as unknown[]) || []).map((button, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>{isCalculateSection ? 'Quote Button' : `Button ${index + 1}`}</Label>
                          {!isCalculateSection && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const buttons = [...((section.section_data?.ctaButtons as unknown[]) || [])]
                                buttons.splice(index, 1)
                                handleSectionDataChange('ctaButtons', buttons)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Button Text</Label>
                            <Input
                              value={((button as Record<string, unknown>).text as string) || ''}
                              onChange={(e) => handleArrayFieldChange('ctaButtons', index, 'text', e.target.value)}
                              placeholder={isCalculateSection ? 'Get a Custom Quote' : 'Request a Demo'}
                            />
                          </div>
                          <div>
                            <Label>Button Variant</Label>
                            <Input
                              value={((button as Record<string, unknown>).variant as string) || ''}
                              onChange={(e) => handleArrayFieldChange('ctaButtons', index, 'variant', e.target.value)}
                              placeholder="default"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Link/Action</Label>
                            <Input
                              value={((button as Record<string, unknown>).href as string) || ((button as Record<string, unknown>).action as string) || ''}
                              onChange={(e) => {
                                const field = ((button as Record<string, unknown>).action as string) ? 'action' : 'href'
                                handleArrayFieldChange('ctaButtons', index, field, e.target.value)
                              }}
                              placeholder={isCalculateSection ? 'openConsultation' : '/website/demo'}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {!isCalculateSection && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          const buttons = [...((section.section_data?.ctaButtons as unknown[]) || []), { text: '', variant: 'default', href: '' }]
                          handleSectionDataChange('ctaButtons', buttons)
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Button
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        }
        
        // Check if this is a People page CTA section
        if (page?.slug === 'people-concierge' || page?.slug === 'people-experts') {
          return (
            <div className="space-y-6">
              {/* Main Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Call to Action</CardTitle>
                  <CardDescription>
                    Configure the closing call-to-action section
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={String(section.section_data?.title || '')}
                      onChange={(e) => handleSectionDataChange('title', e.target.value)}
                      placeholder="Ready to Build Your Agentic Future?"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={String(section.section_data?.description || '')}
                      onChange={(e) => handleSectionDataChange('description', e.target.value)}
                      placeholder="Let's discuss how our Concierge Support Team can help you achieve your goals."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backgroundColor">Background Color Class</Label>
                    <Input
                      id="backgroundColor"
                      value={(section.section_data?.backgroundColor as string) || ''}
                      onChange={(e) => handleSectionDataChange('backgroundColor', e.target.value)}
                      placeholder="bg-muted/30"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* CTA Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle>Call-to-Action Buttons</CardTitle>
                  <CardDescription>
                    Configure the action buttons for the CTA section
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {((section.section_data?.ctaButtons as unknown[]) || []).map((button: unknown, index: number) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Button {index + 1}</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('ctaButtons', index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-2">
                          <Label>Button Text</Label>
                          <Input
                            value={((button as Record<string, unknown>).text as string) || ''}
                            onChange={(e) => handleArrayFieldChange('ctaButtons', index, 'text', e.target.value)}
                            placeholder="Speak With Our Team"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Button URL</Label>
                          <Input
                            value={((button as Record<string, unknown>).href as string) || ''}
                            onChange={(e) => handleArrayFieldChange('ctaButtons', index, 'href', e.target.value)}
                            placeholder="/website/demo"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Button Variant</Label>
                          <select
                            value={((button as Record<string, unknown>).variant as string) || 'default'}
                            onChange={(e) => handleArrayFieldChange('ctaButtons', index, 'variant', e.target.value)}
                            className="w-full px-3 py-2 border border-input bg-background rounded-md"
                          >
                            <option value="default">Default</option>
                            <option value="outline">Outline</option>
                            <option value="secondary">Secondary</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addArrayItem('ctaButtons', { text: '', href: '', variant: 'default' })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Button
                  </Button>
                </CardContent>
              </Card>
            </div>
          )
        }
        // Default CTA case for other pages
        return (
          <div className="space-y-6">
            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Call to Action</CardTitle>
                <CardDescription>
                  Configure the closing call-to-action section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={String(section.section_data?.title || '')}
                    onChange={(e) => handleSectionDataChange('title', e.target.value)}
                    placeholder="Ready to Transform Your Enterprise?"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={String(section.section_data?.description || '')}
                    onChange={(e) => handleSectionDataChange('description', e.target.value)}
                    placeholder="Brief description for the CTA section"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                     value={(section.section_data?.buttonText as string) || ''}
                    onChange={(e) => handleSectionDataChange('buttonText', e.target.value)}
                    placeholder="Get Started"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buttonLink">Button Link</Label>
                  <Input
                    id="buttonLink"
                     value={(section.section_data?.buttonLink as string) || ''}
                    onChange={(e) => handleSectionDataChange('buttonLink', e.target.value)}
                    placeholder="/contact"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'hero_simple':
        // Check if this is a Pricing page hero section
        if (page?.slug === 'pricing') {
          return (
            <div className="space-y-6">
              {/* Main Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Hero Content</CardTitle>
                  <CardDescription>
                    Edit the pricing hero section content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Section Title</Label>
                    <Input
                      value={String(section.section_data?.title || '')}
                      onChange={(e) => handleSectionDataChange('title', e.target.value)}
                      placeholder="Transparent Pricing for Every Organization"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      value={String(section.section_data?.description || '')}
                      onChange={(e) => handleSectionDataChange('description', e.target.value)}
                      placeholder="Our platform is not one-size-fits-all, and neither is our pricing..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logoPath">Logo Path</Label>
                    <Input
                       value={(section.section_data?.logoPath as string) || ''}
                      onChange={(e) => handleSectionDataChange('logoPath', e.target.value)}
                      placeholder="/images/branding/E-AI-Circle.svg"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* CTA Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle>Call-to-Action Buttons</CardTitle>
                  <CardDescription>
                    Configure the hero section buttons
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {((section.section_data?.ctaButtons as unknown[]) || []).map((button, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Button {index + 1}</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const buttons = [...((section.section_data?.ctaButtons as unknown[]) || [])]
                              buttons.splice(index, 1)
                              handleSectionDataChange('ctaButtons', buttons)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Button Text</Label>
                            <Input
                              value={((button as Record<string, unknown>).text as string) || ''}
                              onChange={(e) => handleArrayFieldChange('ctaButtons', index, 'text', e.target.value)}
                              placeholder="Build Your Custom Plan"
                            />
                          </div>
                          <div>
                            <Label>Button Variant</Label>
                            <Input
                              value={((button as Record<string, unknown>).variant as string) || ''}
                              onChange={(e) => handleArrayFieldChange('ctaButtons', index, 'variant', e.target.value)}
                              placeholder="default"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Link/Action</Label>
                            <Input
                              value={((button as Record<string, unknown>).href as string) || ((button as Record<string, unknown>).action as string) || ''}
                              onChange={(e) => {
                                const field = ((button as Record<string, unknown>).action as string) ? 'action' : 'href'
                                handleArrayFieldChange('ctaButtons', index, field, e.target.value)
                              }}
                              placeholder="/website/demo or openCalculator"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => {
                        const buttons = [...((section.section_data?.ctaButtons as unknown[]) || []), { text: '', variant: 'default', href: '' }]
                        handleSectionDataChange('ctaButtons', buttons)
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Button
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        }
        
        // Check if this is a People page hero section
        if (page?.slug === 'people' || page?.slug === 'people-concierge' || page?.slug === 'people-experts') {
          return (
            <div className="space-y-6">
              {/* Main Content */}
              <Card>
                <CardHeader>
                  <CardTitle>People Hero Content</CardTitle>
                  <CardDescription>
                    Edit the people hero section content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Section Title</Label>
                    <Input
                      value={String(section.section_data?.title || '')}
                      onChange={(e) => handleSectionDataChange('title', e.target.value)}
                      placeholder="Your Dedicated Team for the Agentic Era"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      value={String(section.section_data?.description || '')}
                      onChange={(e) => handleSectionDataChange('description', e.target.value)}
                      placeholder="Your concierge support team, acting as an extension..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logoImage">Logo Image Path</Label>
                    <Input
                       value={(section.section_data?.logoImage as string) || ''}
                      onChange={(e) => handleSectionDataChange('logoImage', e.target.value)}
                      placeholder="/images/branding/E-AI-Squircle.svg"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* CTA Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle>Call-to-Action Buttons</CardTitle>
                  <CardDescription>
                    Configure the action buttons for the hero section
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {((section.section_data?.ctaButtons as unknown[]) || []).map((button: unknown, index: number) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Button {index + 1}</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('ctaButtons', index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-2">
                          <Label>Button Text</Label>
                          <Input
                            value={((button as Record<string, unknown>).text as string) || ''}
                            onChange={(e) => handleArrayFieldChange('ctaButtons', index, 'text', e.target.value)}
                            placeholder="Learn More"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Button URL</Label>
                          <Input
                            value={((button as Record<string, unknown>).href as string) || ''}
                            onChange={(e) => handleArrayFieldChange('ctaButtons', index, 'href', e.target.value)}
                            placeholder="#concierge-team"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Button Variant</Label>
                          <select
                            value={((button as Record<string, unknown>).variant as string) || 'default'}
                            onChange={(e) => handleArrayFieldChange('ctaButtons', index, 'variant', e.target.value)}
                            className="w-full px-3 py-2 border border-input bg-background rounded-md"
                          >
                            <option value="default">Default</option>
                            <option value="outline">Outline</option>
                            <option value="secondary">Secondary</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`scrollButton-${index}`}
                          checked={((button as Record<string, unknown>).isScrollButton as boolean) || false}
                          onChange={(e) => handleArrayFieldChange('ctaButtons', index, 'isScrollButton', e.target.checked)}
                          className="rounded"
                        />
                        <Label htmlFor={`scrollButton-${index}`} className="text-sm">
                          Is Scroll Button (for internal page navigation)
                        </Label>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addArrayItem('ctaButtons', { text: '', href: '', variant: 'default', isScrollButton: false })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Button
                  </Button>
                </CardContent>
              </Card>
            </div>
          )
        }
        // Default hero_simple case for other pages
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section Content</CardTitle>
                <CardDescription>
                  Edit the hero section content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Section Title</Label>
                  <Input
                    value={String(section.section_data?.title || '')}
                    onChange={(e) => handleSectionDataChange('title', e.target.value)}
                    placeholder="Hero Title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    value={String(section.section_data?.description || '')}
                    onChange={(e) => handleSectionDataChange('description', e.target.value)}
                    placeholder="Hero description..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'platform_hero':
        return (
          <div className="space-y-6">
            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Hero Section Content</CardTitle>
                <CardDescription>
                  Edit the main hero section content for the platform page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title Line 1</Label>
                  <Input
                    value={String(section.section_data?.title || '')}
                    onChange={(e) => handleSectionDataChange('title', e.target.value)}
                    placeholder="The Operating System for"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleLine2">Title Line 2</Label>
                  <Input
                    value={(section.section_data?.titleLine2 as string) || ''}
                    onChange={(e) => handleSectionDataChange('titleLine2', e.target.value)}
                    placeholder="the Agentic Era"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    value={String(section.section_data?.description || '')}
                    onChange={(e) => handleSectionDataChange('description', e.target.value)}
                    placeholder="The Elevation AI platform is the central, agentic backbone..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Call-to-Action Buttons</CardTitle>
                <CardDescription>
                  Configure the action buttons for the hero section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {((section.section_data?.ctaButtons as unknown[]) || []).map((button: unknown, index: number) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Button {index + 1}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('ctaButtons', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label>Button Text</Label>
                        <Input
                          value={((button as Record<string, unknown>).text as string) || ''}
                          onChange={(e) => handleArrayFieldChange('ctaButtons', index, 'text', e.target.value)}
                          placeholder="Get Started"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Button URL</Label>
                        <Input
                          value={((button as Record<string, unknown>).href as string) || ''}
                          onChange={(e) => handleArrayFieldChange('ctaButtons', index, 'href', e.target.value)}
                          placeholder="/website/sign-up"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Button Variant</Label>
                        <select
                          value={((button as Record<string, unknown>).variant as string) || 'default'}
                          onChange={(e) => handleArrayFieldChange('ctaButtons', index, 'variant', e.target.value)}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md"
                        >
                          <option value="default">Default</option>
                          <option value="outline">Outline</option>
                          <option value="secondary">Secondary</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addArrayItem('ctaButtons', { text: '', href: '', variant: 'default' })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Button
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case 'security_features':
        return (
          <div className="space-y-6">
            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Security Features Content</CardTitle>
                <CardDescription>
                  Edit the security features section content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Section Title</Label>
                  <Input
                    value={String(section.section_data?.title || '')}
                    onChange={(e) => handleSectionDataChange('title', e.target.value)}
                    placeholder="Enterprise-Grade Security & Compliance"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    value={String(section.section_data?.description || '')}
                    onChange={(e) => handleSectionDataChange('description', e.target.value)}
                    placeholder="Your data security is our top priority..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card>
              <CardHeader>
                <CardTitle>Security Features</CardTitle>
                <CardDescription>
                  Manage the security features displayed in the carousel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {((section.section_data?.features as unknown[]) || []).map((feature: unknown, index: number) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Feature {index + 1}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('features', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={String((feature as { title?: string })?.title || '')}
                          onChange={(e) => handleArrayFieldChange('features', index, 'title', e.target.value)}
                          placeholder="Data Protection"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                          value={String((feature as { description?: string })?.description || '')}
                          onChange={(e) => handleArrayFieldChange('features', index, 'description', e.target.value)}
                          placeholder="End-to-end encryption..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Icon</Label>
                        <Input
                          value={String((feature as { icon?: string })?.icon || '')}
                          onChange={(e) => handleArrayFieldChange('features', index, 'icon', e.target.value)}
                          placeholder="shield-check-line"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addArrayItem('features', { title: '', description: '', icon: '' })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case 'integrations_grid':
        return (
          <div className="space-y-6">
            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Integrations Content</CardTitle>
                <CardDescription>
                  Edit the integrations section content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Section Title</Label>
                  <Input
                    value={String(section.section_data?.title || '')}
                    onChange={(e) => handleSectionDataChange('title', e.target.value)}
                    placeholder="Connect Your Entire Universe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    value={String(section.section_data?.description || '')}
                    onChange={(e) => handleSectionDataChange('description', e.target.value)}
                    placeholder="Elevation AI is built to be the central hub..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Integration Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Integration Categories</CardTitle>
                <CardDescription>
                  Manage the integration categories and their logos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {((section.section_data?.categories as unknown[]) || []).map((category: unknown, index: number) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Category {index + 1}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('categories', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={String((category as { title?: string })?.title || '')}
                          onChange={(e) => handleArrayFieldChange('categories', index, 'title', e.target.value)}
                          placeholder="Productivity"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Icon</Label>
                        <Input
                          value={((category as Record<string, unknown>).icon as string) || ''}
                          onChange={(e) => handleArrayFieldChange('categories', index, 'icon', e.target.value)}
                          placeholder="file-text-line"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={String((category as { description?: string })?.description || '')}
                        onChange={(e) => handleArrayFieldChange('categories', index, 'description', e.target.value)}
                        placeholder="Streamline document collaboration..."
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addArrayItem('categories', { title: '', description: '', icon: '', logos: [] })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case 'use_cases_carousel':
        return (
          <div className="space-y-6">
            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Use Cases Content</CardTitle>
                <CardDescription>
                  Edit the use cases section content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Section Title</Label>
                  <Input
                    value={String(section.section_data?.title || '')}
                    onChange={(e) => handleSectionDataChange('title', e.target.value)}
                    placeholder="Built for Every Industry, Every Team"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    value={String(section.section_data?.description || '')}
                    onChange={(e) => handleSectionDataChange('description', e.target.value)}
                    placeholder="From startups to enterprises..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Use Cases</CardTitle>
                <CardDescription>
                  Manage the use cases displayed in the carousel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {((section.section_data?.useCases as unknown[]) || []).map((useCase: unknown, index: number) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Use Case {index + 1}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('useCases', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={String((useCase as { title?: string })?.title || '')}
                          onChange={(e) => handleArrayFieldChange('useCases', index, 'title', e.target.value)}
                          placeholder="Sales & Marketing"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                          value={String((useCase as { description?: string })?.description || '')}
                          onChange={(e) => handleArrayFieldChange('useCases', index, 'description', e.target.value)}
                          placeholder="Lead qualification, content generation..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Icon</Label>
                        <Input
                          value={String((useCase as { icon?: string })?.icon || '')}
                          onChange={(e) => handleArrayFieldChange('useCases', index, 'icon', e.target.value)}
                          placeholder="line-chart-line"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Link URL</Label>
                      <Input
                        value={((useCase as Record<string, unknown>).href as string) || ''}
                        onChange={(e) => handleArrayFieldChange('useCases', index, 'href', e.target.value)}
                        placeholder="/website/solutions#sales-marketing"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addArrayItem('useCases', { title: '', description: '', icon: '', href: '', colors: { primary: [0.2, 0.6, 1.0], secondary: [0.0, 0.8, 1.0], tertiary: [0.0, 0.5, 0.6] } })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Use Case
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case 'platform_cta':
        return (
          <div className="space-y-6">
            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Platform CTA Content</CardTitle>
                <CardDescription>
                  Edit the platform call-to-action section content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Section Title</Label>
                  <Input
                    value={String(section.section_data?.title || '')}
                    onChange={(e) => handleSectionDataChange('title', e.target.value)}
                    placeholder="Ready to Transform Your Organization?"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    value={String(section.section_data?.description || '')}
                    onChange={(e) => handleSectionDataChange('description', e.target.value)}
                    placeholder="Custom plans built for your organization..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backgroundColor">Background Color Class</Label>
                  <Input
                    value={(section.section_data?.backgroundColor as string) || ''}
                    onChange={(e) => handleSectionDataChange('backgroundColor', e.target.value)}
                    placeholder="bg-muted/30"
                  />
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Call-to-Action Buttons</CardTitle>
                <CardDescription>
                  Configure the action buttons for the CTA section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {((section.section_data?.ctaButtons as unknown[]) || []).map((button: unknown, index: number) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Button {index + 1}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('ctaButtons', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label>Button Text</Label>
                        <Input
                          value={((button as Record<string, unknown>).text as string) || ''}
                          onChange={(e) => handleArrayFieldChange('ctaButtons', index, 'text', e.target.value)}
                          placeholder="Get Started"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Button URL</Label>
                        <Input
                          value={((button as Record<string, unknown>).href as string) || ''}
                          onChange={(e) => handleArrayFieldChange('ctaButtons', index, 'href', e.target.value)}
                          placeholder="/website/sign-up"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Button Variant</Label>
                        <select
                          value={((button as Record<string, unknown>).variant as string) || 'default'}
                          onChange={(e) => handleArrayFieldChange('ctaButtons', index, 'variant', e.target.value)}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md"
                        >
                          <option value="default">Default</option>
                          <option value="outline">Outline</option>
                          <option value="secondary">Secondary</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addArrayItem('ctaButtons', { text: '', href: '', variant: 'default' })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Button
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case 'blog_listing':
        return (
          <BlogListingSection
            section={section}
            onSectionDataChange={handleSectionDataChange}
            onNestedFieldChange={handleNestedFieldChange}
            onArrayItemAdd={addArrayItem}
            onArrayItemRemove={removeArrayItem}
            onArrayFieldChange={handleArrayFieldChange}
            onFileUpload={handleFileUpload}
          />
        )

      case 'hero_simple':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>
                  Configure the hero section content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Hero content</p>
              </CardContent>
            </Card>
          </div>
        )

      case 'custom':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Section</CardTitle>
                <CardDescription>
                  Configure custom section content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Custom content</p>
              </CardContent>
            </Card>
          </div>
        )

      case 'faq':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>FAQ Section</CardTitle>
                <CardDescription>
                  Configure FAQ section content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>FAQ content</p>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Section Content</CardTitle>
              <CardDescription>
                Edit the content for this section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={section.title || ''}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="Section title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={section.content || ''}
                  onChange={(e) => handleFieldChange('content', e.target.value)}
                  placeholder="Section content"
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        )
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading section..." variant="css" />
      </div>
    )
  }

  if (!section) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Section not found</p>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mt-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Edit Section</h1>
          <p className="text-muted-foreground">
            {section.title || 'Untitled Section'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {renderSectionFields()}
    </div>
  )
}
