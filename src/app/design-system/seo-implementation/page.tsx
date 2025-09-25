"use client"

import React from 'react'
import { PageWrapper } from '@/components/page-wrapper'
import { MobileOnlyLayout } from '@/components/ui/layout/mobile-only-layout'
import { MobileOnlyNavigation } from '@/components/ui/mobile-only-navigation'
import { MobileMenu } from '@/components/ui/mobile-menu'
import { Container } from '@/components/ui/layout/container'
import { Section } from '@/components/ui/layout/section'
import { PageHeader } from '@/components/ui/marketing/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Search, 
  Globe, 
  FileText, 
  Tag, 
  Share2, 
  CheckCircle, 
  ExternalLink,
  Code,
  Database,
  Shield,
  Zap
} from 'lucide-react'
import Link from 'next/link'

export default function SEOImplementationPage() {
  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MobileOnlyNavigation currentPage="design-system" />}
        mobileMenu={<MobileMenu currentPage="design-system" />}
      >
        <Container size="2xl">
          <Section paddingY="xl">
            <PageHeader
              title="SEO Implementation"
              description="Comprehensive documentation of our sitemap.xml, robots.txt, and page title optimization implementation"
              size="lg"
              centered
            />
          </Section>

          <Section paddingY="lg">
            <div className="grid gap-6">
              {/* Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Implementation Overview
                  </CardTitle>
                  <CardDescription>
                    Complete SEO optimization including sitemap generation, robots.txt configuration, and standardized page titles following industry best practices.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium">Sitemap.xml</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium">Robots.txt</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-medium">Page Titles</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sitemap Implementation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Sitemap.xml Implementation
                  </CardTitle>
                  <CardDescription>
                    Dynamic XML sitemap generation with comprehensive page coverage and SEO optimization.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">File Location</h4>
                    <code className="text-sm bg-muted px-2 py-1 rounded">src/app/sitemap.ts</code>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Features</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Dynamic Generation:</strong> Automatically includes all public pages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Database Integration:</strong> Fetches CMS pages and blog posts from Supabase</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span><strong>SEO Optimization:</strong> Proper priority levels and change frequencies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Comprehensive Coverage:</strong> 25+ static pages + dynamic content</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Page Categories</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <h5 className="font-medium text-sm mb-1">Static Pages</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Home, Platform, Solutions</li>
                          <li>• Pricing, About, Contact</li>
                          <li>• Partners, Investors, Careers</li>
                          <li>• Security, Press, Knowledge Base</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-1">Dynamic Content</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• CMS Pages (from database)</li>
                          <li>• Blog Posts (from database)</li>
                          <li>• Resource Pages</li>
                          <li>• Press Releases</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Access URL</h4>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded">https://elevationai.com/sitemap.xml</code>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/sitemap.xml" target="_blank">
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Robots.txt Implementation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Robots.txt Implementation
                  </CardTitle>
                  <CardDescription>
                    Smart crawling directives with AI bot protection and proper SEO configuration.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">File Location</h4>
                    <code className="text-sm bg-muted px-2 py-1 rounded">src/app/robots.ts</code>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Crawling Rules</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-sm mb-2 text-green-600 dark:text-green-400">Allowed</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• All public website pages</li>
                          <li>• Blog and content pages</li>
                          <li>• Resource and press pages</li>
                          <li>• Legal pages (privacy, terms)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-2 text-red-600 dark:text-red-400">Disallowed</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Admin and API routes</li>
                          <li>• Design system pages</li>
                          <li>• Login and signup pages</li>
                          <li>• Internal test pages</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">AI Bot Protection</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">GPTBot</Badge>
                      <Badge variant="outline" className="text-xs">ChatGPT-User</Badge>
                      <Badge variant="outline" className="text-xs">CCBot</Badge>
                      <Badge variant="outline" className="text-xs">anthropic-ai</Badge>
                      <Badge variant="outline" className="text-xs">Claude-Web</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      All AI training bots are blocked from crawling our content.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Access URL</h4>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded">https://elevationai.com/robots.txt</code>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/robots.txt" target="_blank">
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Page Title Standardization */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Page Title Standardization
                  </CardTitle>
                  <CardDescription>
                    Consistent page titles following OpenAI and Stripe conventions for optimal SEO and branding.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Title Format</h4>
                    <div className="bg-muted p-3 rounded-lg">
                      <code className="text-sm">"Page Name — Elevation AI"</code>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Uses em dash (—) separator following industry best practices from OpenAI and Stripe.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Updated Pages</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Home:</span> "The Business Orchestration Platform — Elevation AI"
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Platform:</span> "Platform — Elevation AI"
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Solutions:</span> "Solutions — Elevation AI"
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Pricing:</span> "Pricing — Elevation AI"
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">About:</span> "About — Elevation AI"
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Contact:</span> "Contact — Elevation AI"
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Developers:</span> "Developers — Elevation AI"
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Partners:</span> "Partners — Elevation AI"
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Investors:</span> "Investors — Elevation AI"
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Careers:</span> "Careers — Elevation AI"
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Security:</span> "Security — Elevation AI"
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Press:</span> "Press — Elevation AI"
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Benefits</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Brand Consistency:</strong> Professional appearance across all touchpoints</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span><strong>SEO Optimization:</strong> Better search engine ranking and click-through rates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Social Sharing:</strong> Rich previews when shared on social media</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span><strong>User Experience:</strong> Clear page identification in browser tabs</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Metadata */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Enhanced Metadata Implementation
                  </CardTitle>
                  <CardDescription>
                    Complete Open Graph and Twitter Card optimization for social media sharing.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Metadata Components</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h5 className="font-medium text-sm mb-1">SEO Meta</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Title (50-60 chars)</li>
                          <li>• Description (150-160 chars)</li>
                          <li>• Keywords</li>
                          <li>• Author & Publisher</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h5 className="font-medium text-sm mb-1">Open Graph</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Title & Description</li>
                          <li>• URL & Site Name</li>
                          <li>• Image (1200x630)</li>
                          <li>• Locale & Type</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <h5 className="font-medium text-sm mb-1">Twitter Cards</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Large Image Card</li>
                          <li>• Title & Description</li>
                          <li>• Optimized Images</li>
                          <li>• Social Sharing</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Implementation Files</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <code className="text-sm bg-muted px-2 py-1 rounded">src/app/website/*/layout.tsx</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <code className="text-sm bg-muted px-2 py-1 rounded">src/app/privacy/layout.tsx</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <code className="text-sm bg-muted px-2 py-1 rounded">src/app/terms-of-service/layout.tsx</code>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technical Implementation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Technical Implementation
                  </CardTitle>
                  <CardDescription>
                    Next.js 15 App Router implementation with TypeScript and Supabase integration.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Next.js 15</Badge>
                      <Badge variant="outline">App Router</Badge>
                      <Badge variant="outline">TypeScript</Badge>
                      <Badge variant="outline">Supabase</Badge>
                      <Badge variant="outline">Metadata API</Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Key Features</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Dynamic Generation:</strong> Sitemap updates automatically with new content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Database className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Database Integration:</strong> Fetches published pages and blog posts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span><strong>AI Protection:</strong> Blocks AI training bots from content scraping</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Search className="h-4 w-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                        <span><strong>SEO Optimized:</strong> Proper priority levels and change frequencies</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Performance</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h5 className="font-medium text-sm mb-1 text-green-600 dark:text-green-400">Sitemap Generation</h5>
                        <p className="text-xs text-muted-foreground">~1.4s initial load, cached for performance</p>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h5 className="font-medium text-sm mb-1 text-blue-600 dark:text-blue-400">Robots.txt</h5>
                        <p className="text-xs text-muted-foreground">~139ms response time, static generation</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testing & Validation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Testing & Validation
                  </CardTitle>
                  <CardDescription>
                    Comprehensive testing results and validation of the SEO implementation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Validation Results</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm">Sitemap.xml accessible</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm">Robots.txt properly configured</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm">Page titles displaying correctly</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm">Open Graph tags working</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm">Twitter Cards optimized</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm">No linting errors</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Test URLs</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/sitemap.xml" target="_blank">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Sitemap.xml
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/robots.txt" target="_blank">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Robots.txt
                          </Link>
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/website/home" target="_blank">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Home Page
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/website/platform" target="_blank">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Platform Page
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>
        </Container>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
