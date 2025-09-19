"use client"

import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Page } from '@/types/cms'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Plus, 
  Search, 
  Edit, 
  Eye, 
  FileText,
  Calendar,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import { LoadingSpinner } from '@/components/ui/loading'

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const supabase = createClient()

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('updated_at', { ascending: false })

      if (error) {
        console.error('Error fetching pages:', error)
      } else {
        // Filter out blog and FAQ pages since they have their own admin sections
        const filteredData = (data || []).filter(page => 
          page.slug !== 'blog' && 
          page.slug !== 'faq' && 
          page.slug !== 'faqs'
        )
        setPages(filteredData)
      }
    } catch (error) {
      console.error('Error fetching pages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Define the custom page order
  const pageOrder = [
    'home',
    'platform', 
    'people-concierge',
    'people-experts',
    'solutions',
    'pricing',
    'about',
    'partners',
    'investors',
    'developers'
  ]

  // Separate People pages from other pages
  const peoplePages = pages.filter(page => 
    page.slug === 'people-concierge' || page.slug === 'people-experts'
  )
  
  const otherPages = pages.filter(page => 
    page.slug !== 'people-concierge' && page.slug !== 'people-experts'
  )

  // Custom sort function for pages
  const sortPages = (pages: Page[]) => {
    return pages.sort((a, b) => {
      const aIndex = pageOrder.indexOf(a.slug)
      const bIndex = pageOrder.indexOf(b.slug)
      
      // If both pages are in the order list, sort by their position
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }
      
      // If only one page is in the order list, prioritize it
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1
      
      // If neither page is in the order list, sort alphabetically
      return a.title.localeCompare(b.title)
    })
  }

  const filteredOtherPages = sortPages(otherPages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  ))

  const filteredPeoplePages = peoplePages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // People Card Component
  const PeopleCard = ({ peoplePages }: { peoplePages: Page[] }) => {
    if (peoplePages.length === 0) return null

    const conciergePage = peoplePages.find(p => p.slug === 'people-concierge')
    const expertsPage = peoplePages.find(p => p.slug === 'people-experts')
    
    return (
      <Card className="hover:shadow-md transition-shadow border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle className="text-lg text-primary">People</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Concierge Support & Expert Network
                </CardDescription>
              </div>
            </div>
            <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
              Grouped
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Manage your concierge support and expert network pages
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>
                  Updated {Math.max(
                    conciergePage ? new Date(conciergePage.updated_at).getTime() : 0,
                    expertsPage ? new Date(expertsPage.updated_at).getTime() : 0
                  ) ? formatDate(new Date(Math.max(
                    conciergePage ? new Date(conciergePage.updated_at).getTime() : 0,
                    expertsPage ? new Date(expertsPage.updated_at).getTime() : 0
                  )).toISOString()) : 'Never'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit People Pages
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {conciergePage && (
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/pages/${conciergePage.id}/edit`} className="flex items-center">
                        <Edit className="h-4 w-4 mr-2" />
                        <div>
                          <div className="font-medium">Concierge Support</div>
                          <div className="text-xs text-muted-foreground">Dedicated team services</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {expertsPage && (
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/pages/${expertsPage.id}/edit`} className="flex items-center">
                        <Edit className="h-4 w-4 mr-2" />
                        <div>
                          <div className="font-medium">Expert Network</div>
                          <div className="text-xs text-muted-foreground">On-demand expertise</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="h-3 w-3" />
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {conciergePage && (
                    <DropdownMenuItem asChild>
                      <Link href={`/website/${conciergePage.slug}`} target="_blank" className="flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        <div>
                          <div className="font-medium">View Concierge</div>
                          <div className="text-xs text-muted-foreground">Preview page</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {expertsPage && (
                    <DropdownMenuItem asChild>
                      <Link href={`/website/${expertsPage.slug}`} target="_blank" className="flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        <div>
                          <div className="font-medium">View Experts</div>
                          <div className="text-xs text-muted-foreground">Preview page</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading pages..." variant="css" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Pages</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your website pages and content</p>
        </div>
        <Button asChild>
          <Link href="/admin/pages/new">
            <Plus className="h-4 w-4 mr-2" />
            New Page
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Render pages in custom order */}
        {filteredOtherPages.map((page, index) => {
          // Show People card after Platform (index 1) if it exists and matches search
          if (index === 2 && filteredPeoplePages.length > 0) {
            return (
              <React.Fragment key="people-card">
                <PeopleCard peoplePages={filteredPeoplePages} />
                <Card key={page.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <CardTitle className="text-lg">{page.title}</CardTitle>
                          <CardDescription className="text-sm text-muted-foreground">
                            /{page.slug}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {page.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {page.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <Badge variant={page.is_published ? "default" : "secondary"}>
                          {page.is_published ? "Published" : "Draft"}
                        </Badge>
                        
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(page.updated_at)}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <Link href={`/admin/pages/${page.id}/edit`}>
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/${page.slug}`} target="_blank">
                            <Eye className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </React.Fragment>
            )
          }
          
          // Regular page card
          return (
            <Card key={page.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <CardTitle className="text-lg">{page.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        /{page.slug}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {page.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {page.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <Badge variant={page.is_published ? "default" : "secondary"}>
                      {page.is_published ? "Published" : "Draft"}
                    </Badge>
                    
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(page.updated_at)}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href={`/admin/pages/${page.id}/edit`}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/${page.slug}`} target="_blank">
                        <Eye className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
        
        {/* Show People card at the end if it wasn't inserted in the middle */}
        {filteredOtherPages.length <= 2 && filteredPeoplePages.length > 0 && (
          <PeopleCard peoplePages={filteredPeoplePages} />
        )}
      </div>

      {filteredOtherPages.length === 0 && filteredPeoplePages.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchTerm ? 'No pages found' : 'No pages yet'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : 'Get started by creating your first page'
                }
              </p>
              {!searchTerm && (
                <Button asChild>
                  <Link href="/admin/pages/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Page
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
