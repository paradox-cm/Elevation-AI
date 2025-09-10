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
import { Building2, TrendingUp, ChevronRight, Building, Landmark, Briefcase, Users, Globe } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import React from "react"
import Icon from "@/components/ui/icon"

// Solutions Hero Section Component
function SolutionsHeroSection() {
  const [activeIndustry, setActiveIndustry] = React.useState(0)
  
  const industries = [
    { 
      icon: Building, 
      label: "Private Markets", 
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    { 
      icon: TrendingUp, 
      label: "Public Markets", 
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    { 
      icon: Landmark, 
      label: "Banks", 
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    { 
      icon: Briefcase, 
      label: "Enterprise", 
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    },
    { 
      icon: Users, 
      label: "Government", 
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20"
    }
  ]

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndustry((prev) => (prev + 1) % industries.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [industries.length])

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

              {/* Central Solutions Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/40 rounded-2xl flex items-center justify-center border-4 border-primary/30 animate-pulse">
                  <Globe className="w-16 h-16 text-primary" />
                </div>
              </div>

              {/* Industry Ecosystem Grid */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 w-80 h-80">
                  {/* Top Row */}
                  <div className="flex justify-center">
                    <div className={`w-16 h-16 rounded-xl border-2 shadow-lg transition-all duration-500 flex items-center justify-center ${
                      activeIndustry === 0 ? 'scale-110 shadow-xl border-primary/50 bg-primary/10' : 'bg-background/80 backdrop-blur-sm border-border/50 hover:scale-105'
                    }`}>
                      <Building className={`w-6 h-6 transition-colors duration-500 ${
                        activeIndustry === 0 ? 'text-primary' : 'text-blue-500'
                      }`} />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className={`w-16 h-16 rounded-xl border-2 shadow-lg transition-all duration-500 flex items-center justify-center ${
                      activeIndustry === 1 ? 'scale-110 shadow-xl border-primary/50 bg-primary/10' : 'bg-background/80 backdrop-blur-sm border-border/50 hover:scale-105'
                    }`}>
                      <TrendingUp className={`w-6 h-6 transition-colors duration-500 ${
                        activeIndustry === 1 ? 'text-primary' : 'text-green-500'
                      }`} />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className={`w-16 h-16 rounded-xl border-2 shadow-lg transition-all duration-500 flex items-center justify-center ${
                      activeIndustry === 2 ? 'scale-110 shadow-xl border-primary/50 bg-primary/10' : 'bg-background/80 backdrop-blur-sm border-border/50 hover:scale-105'
                    }`}>
                      <Landmark className={`w-6 h-6 transition-colors duration-500 ${
                        activeIndustry === 2 ? 'text-primary' : 'text-purple-500'
                      }`} />
                    </div>
                  </div>
                  
                  {/* Middle Row */}
                  <div className="flex justify-center">
                    <div className={`w-16 h-16 rounded-xl border-2 shadow-lg transition-all duration-500 flex items-center justify-center ${
                      activeIndustry === 3 ? 'scale-110 shadow-xl border-primary/50 bg-primary/10' : 'bg-background/80 backdrop-blur-sm border-border/50 hover:scale-105'
                    }`}>
                      <Briefcase className={`w-6 h-6 transition-colors duration-500 ${
                        activeIndustry === 3 ? 'text-primary' : 'text-orange-500'
                      }`} />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    {/* Central hub space */}
                  </div>
                  <div className="flex justify-center">
                    <div className={`w-16 h-16 rounded-xl border-2 shadow-lg transition-all duration-500 flex items-center justify-center ${
                      activeIndustry === 4 ? 'scale-110 shadow-xl border-primary/50 bg-primary/10' : 'bg-background/80 backdrop-blur-sm border-border/50 hover:scale-105'
                    }`}>
                      <Users className={`w-6 h-6 transition-colors duration-500 ${
                        activeIndustry === 4 ? 'text-primary' : 'text-cyan-500'
                      }`} />
                    </div>
                  </div>
                  
                  {/* Bottom Row - Stage indicators */}
                  <div className="col-span-3 flex justify-center space-x-4">
                    <div className="w-12 h-8 bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Start</span>
                    </div>
                    <div className="w-12 h-8 bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Scale</span>
                    </div>
                    <div className="w-12 h-8 bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Exit</span>
                    </div>
                    <div className="w-12 h-8 bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Grow</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection Lines to Central Hub */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {industries.map((_, index) => {
                  const positions = [
                    { x: 25, y: 25 }, // Top left
                    { x: 50, y: 25 }, // Top center
                    { x: 75, y: 25 }, // Top right
                    { x: 25, y: 50 }, // Middle left
                    { x: 75, y: 50 }  // Middle right
                  ]
                  
                  if (index < positions.length) {
                    const pos = positions[index]
                    return (
                      <line
                        key={index}
                        x1={`${pos.x}%`}
                        y1={`${pos.y}%`}
                        x2="50%"
                        y2="50%"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="3,3"
                        className="text-primary/20 animate-pulse"
                        style={{ 
                          animationDelay: `${index * 0.3}s`,
                          animationDuration: '4s'
                        }}
                      />
                    )
                  }
                  return null
                })}
              </svg>
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
        header={<MainHeader />}
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
                  <Grid cols={1} gap={6} className="mt-8">
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
