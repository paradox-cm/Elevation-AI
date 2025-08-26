"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Grid } from "@/components/ui/layout/grid"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { ChevronRight, ExternalLink, FileText, Building2, Users, CreditCard, BookOpen, Shield, Briefcase, Handshake, TrendingUp, Code, Newspaper } from "lucide-react"
import { useRouter } from "next/navigation"

interface SiteStructureItem {
  id: string
  title: string
  description: string
  pageNumber?: number
  status: 'completed' | 'to-create' | 'dropdown'
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
    id: 'platform',
    title: 'Platform',
    description: 'Core platform features and capabilities',
    pageNumber: 2,
    status: 'completed',
    icon: Building2,
    href: '/platform'
  },
  {
    id: 'solutions',
    title: 'Solutions',
    description: 'Industry and stage-specific solutions',
    status: 'dropdown',
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
            pageNumber: 3,
            status: 'completed',
            icon: TrendingUp,
            href: '/solutions/private-markets'
          },
          {
            id: 'public-markets',
            title: 'Public Market Organizations',
            description: 'Solutions for public market participants',
            pageNumber: 4,
            status: 'completed',
            icon: TrendingUp,
            href: '/solutions/public-markets'
          },
          {
            id: 'banks',
            title: 'Banks',
            description: 'Banking and financial institution solutions',
            pageNumber: 5,
            status: 'completed',
            icon: Building2,
            href: '/solutions/banks'
          },
          {
            id: 'enterprise',
            title: 'Enterprise',
            description: 'Large enterprise organization solutions',
            pageNumber: 6,
            status: 'completed',
            icon: Building2,
            href: '/solutions/enterprise'
          },
          {
            id: 'government',
            title: 'Government',
            description: 'Government and public sector solutions',
            pageNumber: 7,
            status: 'completed',
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
            pageNumber: 8,
            status: 'completed',
            icon: TrendingUp,
            href: '/solutions/creating-growing'
          },
          {
            id: 'scaling',
            title: 'Scaling a Venture',
            description: 'Solutions for growth-stage companies',
            pageNumber: 9,
            status: 'completed',
            icon: TrendingUp,
            href: '/solutions/scaling'
          },
          {
            id: 'exiting',
            title: 'Exiting a Venture',
            description: 'Solutions for exit strategies and transitions',
            pageNumber: 10,
            status: 'completed',
            icon: TrendingUp,
            href: '/solutions/exiting'
          },
          {
            id: 'post-ipo',
            title: 'Post-IPO Growth',
            description: 'Solutions for post-IPO companies',
            pageNumber: 11,
            status: 'completed',
            icon: TrendingUp,
            href: '/solutions/post-ipo'
          },
          {
            id: 'family-office',
            title: 'Post-Exit Family Office Creation',
            description: 'Solutions for family office establishment',
            pageNumber: 12,
            status: 'completed',
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
    pageNumber: 13,
    status: 'completed',
    icon: CreditCard,
    href: '/pricing'
  },
  {
    id: 'resources',
    title: 'Resources',
    description: 'Supporting resources and information',
    status: 'dropdown',
    icon: BookOpen,
    children: [
      {
        id: 'security',
        title: 'Security',
        description: 'Security information and compliance',
        status: 'to-create',
        icon: Shield,
        href: '/resources/security'
      },
      {
        id: 'careers',
        title: 'Careers',
        description: 'Career opportunities and job listings',
        pageNumber: 14,
        status: 'completed',
        icon: Briefcase,
        href: '/resources/careers'
      },
      {
        id: 'partners',
        title: 'Partners',
        description: 'Partnership opportunities and programs',
        pageNumber: 15,
        status: 'completed',
        icon: Handshake,
        href: '/resources/partners'
      },
      {
        id: 'investors',
        title: 'Investors',
        description: 'Information for investors and stakeholders',
        pageNumber: 16,
        status: 'completed',
        icon: TrendingUp,
        href: '/resources/investors'
      },
      {
        id: 'developers',
        title: 'For Developers & Platforms',
        description: 'Developer resources and platform integrations',
        pageNumber: 17,
        status: 'completed',
        icon: Code,
        href: '/resources/developers'
      },
      {
        id: 'blog-news',
        title: 'Blog & News',
        description: 'Latest updates, insights, and company news',
        status: 'to-create',
        icon: Newspaper,
        href: '/resources/blog-news'
      }
    ]
  }
]

function SiteStructureCard({ item }: { item: SiteStructureItem }) {
  const router = useRouter()
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Completed</Badge>
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
    // Map item IDs to wireframe page routes
    const wireframeRoutes: { [key: string]: string } = {
      'home': '/wireframes/home',
      'platform': '/wireframes/platform',
      'pricing': '/wireframes/pricing',
      'solutions': '/wireframes/solutions',
      'resources': '/wireframes/resources',
      'private-markets': '/wireframes/solutions/industry/private-market-organizations',
      'public-markets': '/wireframes/solutions/industry/public-market-organizations',
      'banks': '/wireframes/solutions/industry/banks',
      'enterprise': '/wireframes/solutions/industry/enterprise',
      'government': '/wireframes/solutions/industry/government',
      'creating-growing': '/wireframes/solutions/stage/creating-growing-new-venture',
      'scaling': '/wireframes/solutions/stage/scaling-venture',
      'exiting': '/wireframes/solutions/stage/exiting-venture',
      'post-ipo': '/wireframes/solutions/stage/post-ipo-growth',
      'family-office': '/wireframes/solutions/stage/post-exit-family-office-creation',
      'security': '/wireframes/resources/security',
      'careers': '/wireframes/resources/careers',
      'partners': '/wireframes/resources/partners',
      'investors': '/wireframes/resources/investors',
      'developers': '/wireframes/resources/developers-platforms',
      'blog-news': '/wireframes/resources/blog-news'
    }

    const wireframeRoute = wireframeRoutes[item.id]
    
    if (wireframeRoute) {
      router.push(wireframeRoute)
    }
  }

  return (
    <Card 
      className={`h-full transition-all duration-200 cursor-pointer hover:shadow-lg hover:bg-primary/5 hover:border-primary/20`}
      onClick={handleCardClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <IconComponent className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              {item.pageNumber && (
                <p className="text-sm text-muted-foreground">Page {item.pageNumber}</p>
              )}
            </div>
          </div>
          {getStatusBadge(item.status)}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">{item.description}</CardDescription>
        
        {item.children && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Sub-sections:</p>
            <div className="space-y-1">
              {item.children.map((child) => (
                <div key={child.id} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                    {child.title}
                  </span>
                  {child.pageNumber && (
                    <span className="text-xs text-muted-foreground">Page {child.pageNumber}</span>
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

export default function WireframesPage() {
  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="wireframes" />}
      >
        <Container size="2xl">
          <Section paddingY="xl">
            <PageHeader
              title="Site Structure Wireframes"
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
            <Grid cols={3} gap={6} className="mt-8">
              {siteStructure.map((item) => (
                <SiteStructureCard key={item.id} item={item} />
              ))}
            </Grid>
          </Section>

          <Section paddingY="lg">
            <PageHeader
              title="Navigation Statistics"
              description="Overview of our site structure and completion status"
              size="md"
            />
            <Grid cols={3} gap={6} className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Total Pages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">17</div>
                  <p className="text-sm text-muted-foreground">Main content pages</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">15</div>
                  <p className="text-sm text-muted-foreground">Pages ready for production</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    To Create
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">2</div>
                  <p className="text-sm text-muted-foreground">Pages in development</p>
                </CardContent>
              </Card>
            </Grid>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
