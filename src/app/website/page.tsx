"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileOnlyNavigation } from "@/components/ui/mobile-only-navigation"
import { MobileMenu } from "@/components/ui/mobile-menu"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Grid } from "@/components/ui/layout/grid"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, ExternalLink, FileText, Building2, Users, CreditCard, BookOpen, Shield, Briefcase, Handshake, TrendingUp, Code, Newspaper, LogIn, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

interface SiteStructureItem {
  id: string
  title: string
  description: string
  pageNumber?: number
  status: 'completed' | 'to-create' | 'dropdown' | 'wip' | 'pending'
  icon: React.ComponentType<{ className?: string }>
  children?: SiteStructureItem[]
  href?: string
}

const siteStructure: SiteStructureItem[] = [
  {
    id: 'home',
    title: 'Home',
    description: 'Main landing page and entry point',
    pageNumber: 1,
    status: 'completed',
    icon: FileText,
    href: '/'
  },
  {
    id: 'login',
    title: 'Login',
    description: 'User authentication and sign-in page',
    pageNumber: 2,
    status: 'completed',
    icon: LogIn,
    href: '/website/login'
  },
  {
    id: 'sign-up',
    title: 'Create Account',
    description: 'User registration and account creation page',
    pageNumber: 3,
    status: 'completed',
    icon: Users,
    href: '/website/sign-up'
  },
  {
    id: 'demo',
    title: 'Request Demo',
    description: 'Demo request form for potential customers',
    pageNumber: 4,
    status: 'completed',
    icon: MessageSquare,
    href: '/website/demo'
  },
  {
    id: 'platform',
    title: 'Platform',
    description: 'Core platform features and capabilities',
    pageNumber: 5,
    status: 'wip',
    icon: Building2,
    href: '/website/platform'
  },
  {
    id: 'solutions',
    title: 'Solutions',
    description: 'Industry and stage-specific solutions',
    status: 'completed',
    icon: Users,
    children: [
      {
        id: 'solutions-industry',
        title: 'By Industry',
        description: 'Solutions tailored for different industry sectors',
        status: 'dropdown',
        icon: Building2,
        children: [
          {
            id: 'private-markets',
            title: 'Private Market Organizations',
            description: 'Solutions for private equity and venture capital',
            pageNumber: 6,
            status: 'pending',
            icon: TrendingUp,
            href: '/solutions/private-markets'
          },
          {
            id: 'public-markets',
            title: 'Public Market Organizations',
            description: 'Solutions for public market participants',
            pageNumber: 7,
            status: 'pending',
            icon: TrendingUp,
            href: '/solutions/public-markets'
          },
          {
            id: 'banks',
            title: 'Banks',
            description: 'Banking and financial institution solutions',
            pageNumber: 8,
            status: 'pending',
            icon: Building2,
            href: '/solutions/banks'
          },
          {
            id: 'enterprise',
            title: 'Enterprise',
            description: 'Large enterprise organization solutions',
            pageNumber: 9,
            status: 'pending',
            icon: Building2,
            href: '/solutions/enterprise'
          },
          {
            id: 'government',
            title: 'Government',
            description: 'Government and public sector solutions',
            pageNumber: 10,
            status: 'pending',
            icon: Building2,
            href: '/solutions/government'
          }
        ]
      },
      {
        id: 'solutions-stage',
        title: 'By Stage',
        description: 'Solutions for different business lifecycle stages',
        status: 'dropdown',
        icon: TrendingUp,
        children: [
          {
            id: 'creating-growing',
            title: 'Creating & Growing a New Venture',
            description: 'Solutions for startups and new ventures',
            pageNumber: 11,
            status: 'pending',
            icon: TrendingUp,
            href: '/solutions/creating-growing'
          },
          {
            id: 'scaling',
            title: 'Scaling a Venture',
            description: 'Solutions for growth-stage companies',
            pageNumber: 12,
            status: 'pending',
            icon: TrendingUp,
            href: '/solutions/scaling'
          },
          {
            id: 'exiting',
            title: 'Exiting a Venture',
            description: 'Solutions for exit strategies and transitions',
            pageNumber: 13,
            status: 'pending',
            icon: TrendingUp,
            href: '/solutions/exiting'
          },
          {
            id: 'post-ipo',
            title: 'Post-IPO Growth',
            description: 'Solutions for post-IPO companies',
            pageNumber: 14,
            status: 'pending',
            icon: TrendingUp,
            href: '/solutions/post-ipo'
          },
          {
            id: 'family-office',
            title: 'Post-Exit Family Office Creation',
            description: 'Solutions for family office establishment',
            pageNumber: 15,
            status: 'pending',
            icon: TrendingUp,
            href: '/solutions/family-office'
          }
        ]
      }
    ]
  },
  {
    id: 'pricing',
    title: 'Pricing',
    description: 'Pricing plans and packages',
    pageNumber: 16,
    status: 'pending',
    icon: CreditCard,
    href: '/pricing'
  }
]

function SiteStructureCard({ item }: { item: SiteStructureItem }) {
  const router = useRouter()
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Completed</Badge>
      case 'wip':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">WIP</Badge>
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>
      case 'to-create':
        return <Badge variant="secondary">To Create</Badge>
      case 'dropdown':
        return <Badge variant="outline">Dropdown Menu</Badge>
      default:
        return null
    }
  }

  const IconComponent = item.icon

  const handleCardClick = () => {
    // Map item IDs to website page routes
    const websiteRoutes: { [key: string]: string } = {
      'home': '/website/home',
      'platform': '/website/platform',
      'pricing': '/website/pricing',
      'solutions': '/website/solutions',
      'resources': '/website/resources',
      'private-markets': '/website/solutions/industry/private-market-organizations',
      'public-markets': '/website/solutions/industry/public-market-organizations',
      'banks': '/website/solutions/industry/banks',
      'enterprise': '/website/solutions/industry/enterprise',
      'government': '/website/solutions/industry/government',
      'creating-growing': '/website/solutions/stage/creating-growing-new-venture',
      'scaling': '/website/solutions/stage/scaling-venture',
      'exiting': '/website/solutions/stage/exiting-venture',
      'post-ipo': '/website/solutions/stage/post-ipo-growth',
      'family-office': '/website/solutions/stage/post-exit-family-office-creation',
      'security': '/website/security',
      'careers': '/website/careers',
      'partners': '/website/partners',
      'investors': '/website/investors',
      'developers': '/website/developers',
      'blog-news': '/website/blog',
      'faq': '/website/faq',
      'about': '/website/about',
      'people': '/website/people',
      'contact': '/website/contact',
      'press': '/website/press',
      'login': '/website/login',
      'demo': '/website/demo',
      'sign-up': '/website/sign-up'
    }

    const websiteRoute = websiteRoutes[item.id]
    
    if (websiteRoute) {
      router.push(websiteRoute)
    }
  }

  return (
    <Card 
      className={`h-full transition-all duration-200 cursor-pointer hover:shadow-lg hover:bg-primary/5 hover:border-primary/20`}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
              <IconComponent className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base leading-tight">{item.title}</CardTitle>
              {item.pageNumber && (
                <p className="text-sm text-muted-foreground mt-1">Page {item.pageNumber}</p>
              )}
            </div>
          </div>
          <div className="flex-shrink-0">
            {getStatusBadge(item.status)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4 text-sm leading-relaxed">{item.description}</CardDescription>
        
        {item.children && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Sub-sections:</p>
            <div className="space-y-2">
              {item.children.map((child) => (
                <div key={child.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 text-sm">
                  <span className="flex items-center gap-2 text-foreground">
                    <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{child.title}</span>
                  </span>
                  {child.pageNumber && (
                    <span className="text-xs text-muted-foreground sm:text-sm">Page {child.pageNumber}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function WebsitePage() {
  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MobileOnlyNavigation currentPage="website" />}
        mobileMenu={<MobileMenu currentPage="website" />}
      >
        <Container size="2xl">
          <Section paddingY="xl">
            <PageHeader
              title="Elevation AI Site"
              description="Comprehensive overview of our website structure and navigation hierarchy"
              size="lg"
              centered
            />
          </Section>

          <Section paddingY="lg">
            <PageHeader
              title="Main Navigation Structure"
              description="Primary navigation items and their hierarchical organization"
              size="md"
            />
            <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6} className="mt-8">
              {siteStructure.map((item) => (
                <SiteStructureCard key={item.id} item={item} />
              ))}
            </Grid>
          </Section>

          <Section paddingY="lg">
            <PageHeader
              title="Resources & Company Pages"
              description="Quick access to key pages organized by navigation sections"
              size="md"
            />
            <Grid cols={{ base: 1, sm: 2 }} gap={6} className="mt-8">
              {/* Resources Card - Updated */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Resources
                  </CardTitle>
                  <CardDescription>
                    Supporting resources and information from the Resources dropdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { href: "/website/about", label: "About", icon: Users },
                      { href: "/website/partners", label: "Partners", icon: Handshake },
                      { href: "/website/investors", label: "Investors", icon: TrendingUp },
                      { href: "/website/developers", label: "For Developers & Platforms", icon: Code },
                      { href: "/website/blog", label: "Blog", icon: Newspaper },
                      { href: "/website/faq", label: "FAQ", icon: MessageSquare }
                    ].map((item) => (
                      <div key={item.href} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                        <item.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <a 
                          href={item.href} 
                          className="text-sm text-foreground hover:text-primary transition-colors flex-1"
                        >
                          {item.label}
                        </a>
                        <ChevronRight className="w-3 h-3 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Company Card - New */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Company
                  </CardTitle>
                  <CardDescription>
                    Company information and pages from the footer Company column
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { href: "/website/about", label: "About", icon: Users },
                      { href: "/website/pricing", label: "Pricing", icon: CreditCard },
                      { href: "/website/careers", label: "Careers", icon: Briefcase },
                      { href: "/website/press", label: "Press", icon: Newspaper },
                      { href: "/website/contact", label: "Contact", icon: MessageSquare }
                    ].map((item) => (
                      <div key={item.href} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                        <item.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <a 
                          href={item.href} 
                          className="text-sm text-foreground hover:text-primary transition-colors flex-1"
                        >
                          {item.label}
                        </a>
                        <ChevronRight className="w-3 h-3 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Section>

          <Section paddingY="lg">
            <PageHeader
              title="Navigation Statistics"
              description="Overview of our site structure and completion status"
              size="md"
            />
            <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={6} className="mt-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                    Total Pages
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl sm:text-3xl font-bold">17</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total pages</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    Completed
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">14</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Pages completed</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                    Pending
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600">3</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Pages to be developed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">82%</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Completion rate</p>
                </CardContent>
              </Card>
            </Grid>
          </Section>
        </Container>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
