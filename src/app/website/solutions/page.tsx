"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Grid } from "@/components/ui/layout/grid"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { H1, BodyLarge } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Building2, TrendingUp, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import React from "react"
import Icon from "@/components/ui/icon"

// Solutions Hero Section Component
function SolutionsHeroSection() {

  return (
    <Section 
      paddingY="lg" 
      className="flex items-center min-h-screen pt-8 sm:pt-0 relative overflow-hidden"
    >
      <Container size="2xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-semibold leading-tight">
                Solutions for Every
                <span className="block">Industry & Stage</span>
              </div>
              <BodyLarge className="text-muted-foreground max-w-2xl">
                Tailored AI solutions driving growth, efficiency, and innovation across your organization. From startups to enterprises, we provide the right tools for every business lifecycle stage.
              </BodyLarge>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                <Link href="/website/sign-up">
                  Get Started
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                <Link href="/website/demo">
                  Request a Demo
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Main Visual Container */}
            <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-3xl bg-gradient-to-br from-background/50 to-background/30 border border-border/50 overflow-hidden backdrop-blur-sm">
              {/* Animated Grid Background */}
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 dark:hidden opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '32px 32px'
                  }}
                />
                <div 
                  className="absolute inset-0 hidden dark:block opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '32px 32px'
                  }}
                />
              </div>


            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

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
      <MobileOnlyLayout
        header={<MainHeader currentPage="solutions" />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="solutions" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
              {/* Solutions Hero Section */}
              <SolutionsHeroSection />

              <Section paddingY="lg">
                <Container size="2xl">
                  <PageHeader
                    title="Solution Categories"
                    description="Browse solutions by industry sector or business lifecycle stage"
                    size="md"
                  />
                  <Grid cols={{ base: 1, md: 2 }} gap={6} className="mt-8">
                    {solutionCategories.map((category) => (
                      <SolutionCategoryCard key={category.id} category={category} />
                    ))}
                  </Grid>
                </Container>
              </Section>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
