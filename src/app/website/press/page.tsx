"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { H1, H2, H3, P, BodyLarge, BodySmall } from "@/components/ui/typography"
import Icon from "@/components/ui/icon"
import Link from "next/link"
import React from "react"

export default function PressPage() {
  const pressReleases = [
    {
      id: 1,
      title: "Elevation AI Raises $25M Series A to Accelerate Agentic AI Platform Development",
      date: "2024-01-15",
      category: "Funding",
      excerpt: "Company announces major funding round led by leading venture capital firms to expand platform capabilities and accelerate market adoption.",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "Elevation AI Launches Revolutionary Knowledge Graph Technology for Enterprise AI",
      date: "2024-01-10",
      category: "Product",
      excerpt: "New proprietary technology enables enterprises to unify scattered data sources into intelligent, actionable knowledge graphs for enhanced AI performance.",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Elevation AI Partners with Leading Private Equity Firm to Transform Portfolio Operations",
      date: "2024-01-05",
      category: "Partnership",
      excerpt: "Strategic partnership will deploy Elevation AI's platform across portfolio companies to drive operational efficiency and data-driven decision making.",
      readTime: "3 min read"
    },
    {
      id: 4,
      title: "Elevation AI Appoints Former Microsoft Executive as Chief Technology Officer",
      date: "2023-12-20",
      category: "Leadership",
      excerpt: "Industry veteran brings 15+ years of enterprise AI experience to lead technical strategy and platform development.",
      readTime: "2 min read"
    }
  ]

  const mediaCoverage = [
    {
      id: 1,
      title: "The Future of Enterprise AI: How Elevation AI is Redefining Business Operations",
      source: "TechCrunch",
      date: "2024-01-12",
      category: "Feature",
      excerpt: "Deep dive into how Elevation AI's platform is transforming how enterprises approach AI implementation and data orchestration.",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Agentic AI: The Next Frontier in Business Automation",
      source: "Forbes",
      date: "2024-01-08",
      category: "Analysis",
      excerpt: "Industry analysis featuring Elevation AI's approach to agentic AI and its potential impact on enterprise operations.",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "Elevation AI's $25M Series A Signals Growing Interest in Enterprise AI Platforms",
      source: "VentureBeat",
      date: "2024-01-16",
      category: "News",
      excerpt: "Coverage of Elevation AI's recent funding round and what it means for the enterprise AI market.",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "How Knowledge Graphs are Revolutionizing Enterprise AI",
      source: "MIT Technology Review",
      date: "2024-01-03",
      category: "Technology",
      excerpt: "Technical deep dive into Elevation AI's knowledge graph technology and its applications in enterprise environments.",
      readTime: "10 min read"
    }
  ]

  const mediaResources = [
    {
      title: "Company Logo Package",
      description: "High-resolution logos in various formats",
      format: "ZIP",
      size: "15.2 MB"
    },
    {
      title: "Executive Headshots",
      description: "Professional photos of leadership team",
      format: "ZIP",
      size: "8.7 MB"
    },
    {
      title: "Product Screenshots",
      description: "Platform interface and feature screenshots",
      format: "ZIP",
      size: "12.4 MB"
    },
    {
      title: "Brand Guidelines",
      description: "Complete brand identity and usage guidelines",
      format: "PDF",
      size: "3.1 MB"
    }
  ]

  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="resources" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            <Container size="2xl">
              {/* Page Header */}
              <div className="w-full flex items-center justify-center min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]">
                <div className="text-center space-y-1">
                  <H1>
                    Press
                  </H1>
                  <P className="max-w-[42rem] mx-auto">
                    Latest news, press releases, and media resources about Elevation AI
                  </P>
                </div>
              </div>

              {/* Press Releases Section */}
              <Section paddingY="lg">
                <div className="max-w-4xl mx-auto">
                  <H2 className="mb-8">Press Releases</H2>
                  <div className="space-y-6">
                    {pressReleases.map((release) => (
                      <Card key={release.id} className="group hover:shadow-lg transition-all duration-200">
                        <CardHeader>
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" className="text-xs">
                                  {release.category}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(release.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                              <CardTitle className="text-base sm:text-xl mb-3 group-hover:text-primary transition-colors">
                                {release.title}
                              </CardTitle>
                            </div>
                            <div className="flex-shrink-0">
                              <span className="text-sm text-muted-foreground">{release.readTime}</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <BodySmall className="text-muted-foreground mb-4">
                            {release.excerpt}
                          </BodySmall>
                          <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            Read More
                            <Icon name="arrow-right-line" className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </Section>

              {/* Media Coverage Section */}
              <Section paddingY="lg">
                <div className="max-w-4xl mx-auto">
                  <H2 className="mb-8">Media Coverage</H2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {mediaCoverage.map((article) => (
                      <Card key={article.id} className="group hover:shadow-lg transition-all duration-200 h-full">
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {article.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(article.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <CardTitle className="text-base sm:text-base md:text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="font-medium">{article.source}</span>
                            <span>•</span>
                            <span>{article.readTime}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <BodySmall className="text-muted-foreground mb-4 line-clamp-3">
                            {article.excerpt}
                          </BodySmall>
                          <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            Read Article
                            <Icon name="external-link-line" className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </Section>

              {/* Media Resources Section */}
              <Section paddingY="lg">
                <div className="max-w-4xl mx-auto">
                  <H2 className="mb-8">Media Resources</H2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {mediaResources.map((resource, index) => (
                      <Card key={index} className="group hover:shadow-lg transition-all duration-200">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-base mb-1 group-hover:text-primary transition-colors">
                                {resource.title}
                              </CardTitle>
                              <BodySmall className="text-muted-foreground">
                                {resource.description}
                              </BodySmall>
                            </div>
                            <div className="flex-shrink-0 ml-4">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge variant="secondary" className="text-xs">
                                  {resource.format}
                                </Badge>
                                <span>{resource.size}</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Icon name="download-line" className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </Section>

              {/* Contact Section */}
              <Section paddingY="lg">
                <div className="max-w-4xl mx-auto">
                  <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                    <CardHeader className="text-center">
                      <CardTitle className="text-base sm:text-2xl font-semibold tracking-tight text-foreground">
                        Media Inquiries
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <P className="text-muted-foreground text-sm sm:text-base">
                        For media inquiries, interview requests, or additional information about Elevation AI, please contact our press team.
                      </P>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button size="lg" asChild>
                          <Link href="/website/contact">
                            <Icon name="mail-line" className="mr-2 h-4 w-4" />
                            Contact Press Team
                          </Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                          <a href="mailto:press@elevationai.com">
                            <Icon name="mail-line" className="mr-2 h-4 w-4" />
                            press@elevationai.com
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Section>
            </Container>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
