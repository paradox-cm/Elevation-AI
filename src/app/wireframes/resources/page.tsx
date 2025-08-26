"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Grid } from "@/components/ui/layout/grid"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { Shield, Briefcase, Handshake, TrendingUp, Code, Newspaper, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface ResourceItem {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  route: string
  status: 'completed' | 'to-create'
}

const resourceItems: ResourceItem[] = [
  {
    id: 'security',
    title: 'Security',
    description: 'Security information and compliance',
    icon: Shield,
    route: '/wireframes/resources/security',
    status: 'to-create'
  },
  {
    id: 'careers',
    title: 'Careers',
    description: 'Career opportunities and job listings',
    icon: Briefcase,
    route: '/wireframes/resources/careers',
    status: 'completed'
  },
  {
    id: 'partners',
    title: 'Partners',
    description: 'Partnership opportunities and programs',
    icon: Handshake,
    route: '/wireframes/resources/partners',
    status: 'completed'
  },
  {
    id: 'investors',
    title: 'Investors',
    description: 'Information for investors and stakeholders',
    icon: TrendingUp,
    route: '/wireframes/resources/investors',
    status: 'completed'
  },
  {
    id: 'developers',
    title: 'For Developers & Platforms',
    description: 'Developer resources and platform integrations',
    icon: Code,
    route: '/wireframes/resources/developers-platforms',
    status: 'completed'
  },
  {
    id: 'blog-news',
    title: 'Blog & News',
    description: 'Latest updates, insights, and company news',
    icon: Newspaper,
    route: '/wireframes/resources/blog-news',
    status: 'to-create'
  }
]

function ResourceCard({ item }: { item: ResourceItem }) {
  const router = useRouter()
  const IconComponent = item.icon

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Completed</Badge>
      case 'to-create':
        return <Badge variant="secondary">To Create</Badge>
      default:
        return null
    }
  }

  return (
    <Card 
      className="h-full transition-all duration-200 cursor-pointer hover:shadow-lg hover:bg-primary/5 hover:border-primary/20"
      onClick={() => router.push(item.route)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <IconComponent className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </div>
          </div>
          {getStatusBadge(item.status)}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default function WireframesResourcesPage() {
  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="wireframes" />}
      >
        <Container size="2xl">
          <Section paddingY="xl">
            <PageHeader
              title="Resources Wireframes"
              description="Supporting resources and information for all stakeholders"
              size="lg"
              centered
            />
          </Section>

          <Section paddingY="lg">
            <PageHeader
              title="Resource Categories"
              description="Browse all available resources and supporting materials"
              size="md"
            />
            <Grid cols={3} gap={6} className="mt-8">
              {resourceItems.map((item) => (
                <ResourceCard key={item.id} item={item} />
              ))}
            </Grid>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
