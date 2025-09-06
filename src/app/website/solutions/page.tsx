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
import { Building2, TrendingUp, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface SolutionCategory {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  items: {
    id: string
    title: string
    description: string
    route: string
  }[]
}

const solutionCategories: SolutionCategory[] = [
  {
    id: 'industry',
    title: 'By Industry',
    description: 'Solutions tailored for different industry sectors',
    icon: Building2,
    items: [
      {
        id: 'private-markets',
        title: 'Private Market Organizations',
        description: 'Solutions for private equity and venture capital',
        route: '/website/solutions/industry/private-market-organizations'
      },
      {
        id: 'public-markets',
        title: 'Public Market Organizations',
        description: 'Solutions for public market participants',
        route: '/website/solutions/industry/public-market-organizations'
      },
      {
        id: 'banks',
        title: 'Banks',
        description: 'Banking and financial institution solutions',
        route: '/website/solutions/industry/banks'
      },
      {
        id: 'enterprise',
        title: 'Enterprise',
        description: 'Large enterprise organization solutions',
        route: '/website/solutions/industry/enterprise'
      },
      {
        id: 'government',
        title: 'Government',
        description: 'Government and public sector solutions',
        route: '/website/solutions/industry/government'
      }
    ]
  },
  {
    id: 'stage',
    title: 'By Stage',
    description: 'Solutions for different business lifecycle stages',
    icon: TrendingUp,
    items: [
      {
        id: 'creating-growing',
        title: 'Creating & Growing a New Venture',
        description: 'Solutions for startups and new ventures',
        route: '/website/solutions/stage/creating-growing-new-venture'
      },
      {
        id: 'scaling',
        title: 'Scaling a Venture',
        description: 'Solutions for growth-stage companies',
        route: '/website/solutions/stage/scaling-venture'
      },
      {
        id: 'exiting',
        title: 'Exiting a Venture',
        description: 'Solutions for exit strategies and transitions',
        route: '/website/solutions/stage/exiting-venture'
      },
      {
        id: 'post-ipo',
        title: 'Post-IPO Growth',
        description: 'Solutions for post-IPO companies',
        route: '/website/solutions/stage/post-ipo-growth'
      },
      {
        id: 'family-office',
        title: 'Post-Exit Family Office Creation',
        description: 'Solutions for family office establishment',
        route: '/website/solutions/stage/post-exit-family-office-creation'
      }
    ]
  }
]

function SolutionCategoryCard({ category }: { category: SolutionCategory }) {
  const router = useRouter()
  const IconComponent = category.icon

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <IconComponent className="w-5 h-5 text-primary" />
          </div>
          {category.title}
        </CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {category.items.map((item) => (
            <div 
              key={item.id}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => router.push(item.route)}
            >
              <div>
                <div className="font-medium text-sm">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function WireframesSolutionsPage() {
  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="wireframes" />}
      >
        <Container size="2xl">
          <Section paddingY="xl">
            <PageHeader
              title="Solutions Wireframes"
              description="Choose your path: Industry-specific or Stage-based solutions"
              size="lg"
              centered
            />
          </Section>

          <Section paddingY="lg">
            <PageHeader
              title="Solution Categories"
              description="Browse solutions by industry sector or business lifecycle stage"
              size="md"
            />
            <Grid cols={2} gap={6} className="mt-8">
              {solutionCategories.map((category) => (
                <SolutionCategoryCard key={category.id} category={category} />
              ))}
            </Grid>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
