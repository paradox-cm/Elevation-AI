"use client"


import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { H2, H3, BodyLarge, BodySmall } from "@/components/ui/typography"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import Link from "next/link"

export default function DocumentationPage() {
  const designSystemBenefits = [
    {
      title: "Consistency",
      description: "Ensure visual and behavioral consistency across all products and platforms",
      icon: "repeat-line",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Efficiency",
      description: "Speed up development with pre-built, tested components and patterns",
      icon: "speed-line",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Accessibility",
      description: "Build inclusive experiences that work for users of all abilities",
      icon: "shield-check-line",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Scalability",
      description: "Scale design and development across teams and products",
      icon: "rocket-line",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    }
  ]

  const whenToUse = [
    {
      title: "Building New Products",
      description: "Start with our foundation and components to ensure consistency from day one",
      icon: "add-line",
      examples: ["New applications", "Product features", "Marketing websites"]
    },
    {
      title: "Updating Existing Products",
      description: "Gradually adopt design system components to improve consistency and user experience",
      icon: "refresh-line",
      examples: ["UI refreshes", "Component updates", "Brand alignment"]
    },
    {
      title: "Team Collaboration",
      description: "Use shared design tokens and components to align design and development teams",
      icon: "team-line",
      examples: ["Design reviews", "Code reviews", "Cross-team projects"]
    }
  ]

  const coreConcepts = [
    {
      title: "Design Tokens",
      description: "Centralized values for colors, typography, spacing, and other design properties",
      href: "/design-system/design-tokens",
      icon: "palette-line"
    },
    {
      title: "Component Library",
      description: "Reusable UI components built with accessibility and consistency in mind",
      href: "/design-system/components",
      icon: "apps-line"
    },
    {
      title: "Design Patterns",
      description: "Proven solutions for common user interface challenges and interactions",
      href: "/design-system/layout-patterns",
      icon: "layout-line"
    },
    {
      title: "Accessibility Guidelines",
      description: "Standards and best practices for creating inclusive user experiences",
      href: "/design-system/accessibility",
      icon: "shield-check-line"
    }
  ]

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container size="2xl">
          <Section paddingY="xl">
            <PageHeader
              title="Documentation"
              description="Learn about the Elevation AI Design System, its benefits, and how to use it effectively. This comprehensive guide explains why design systems matter and how they can improve your products and workflows."
              size="lg"
              centered
            />
          </Section>

          {/* What is a Design System */}
          <Section paddingY="lg">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">What is a Design System?</H2>
              <div className="prose prose-lg mx-auto text-center mb-8">
                <BodyLarge className="text-muted-foreground leading-relaxed">
                  A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications. It provides a single source of truth for design decisions, ensuring consistency, efficiency, and accessibility across all products and platforms.
                </BodyLarge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {designSystemBenefits.map((benefit) => (
                  <Card key={benefit.title} className="group hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 ${benefit.bgColor} rounded-lg flex items-center justify-center`}>
                          <Icon name={benefit.icon} className={`h-6 w-6 ${benefit.color}`} />
                        </div>
                        <CardTitle className="text-xl">{benefit.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <BodyLarge className="text-muted-foreground">{benefit.description}</BodyLarge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          {/* When to Use */}
          <Section paddingY="xl" className="bg-muted/50 rounded-lg">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">When to Use a Design System</H2>
              <BodyLarge className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Design systems are valuable in various scenarios, from building new products to improving existing ones. Here are the most common use cases and their benefits.
              </BodyLarge>
              
              <div className="space-y-6">
                {whenToUse.map((useCase) => (
                  <Card key={useCase.title} className="group hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={useCase.icon} className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <H3 className="text-lg font-semibold mb-2">{useCase.title}</H3>
                          <BodyLarge className="text-muted-foreground mb-4">{useCase.description}</BodyLarge>
                          <div className="flex flex-wrap gap-2">
                            {useCase.examples.map((example, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          {/* Core Concepts */}
          <Section paddingY="xl">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">Core Concepts</H2>
              <BodyLarge className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Understanding these fundamental concepts will help you make the most of the design system and create better user experiences.
              </BodyLarge>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {coreConcepts.map((concept) => (
                  <Card key={concept.title} className="group hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={concept.icon} className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{concept.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <BodyLarge className="text-muted-foreground mb-4">{concept.description}</BodyLarge>
                      <Button variant="ghost" size="sm" asChild className="group-hover:bg-muted">
                        <Link href={concept.href}>
                          Learn More
                          <Icon name="arrow-right-line" className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          {/* Getting Started */}
          <Section paddingY="xl">
            <div className="max-w-6xl mx-auto text-center">
              <H2 className="text-2xl font-bold mb-4">Ready to Get Started?</H2>
              <BodyLarge className="text-muted-foreground mb-8">
                Now that you understand the value of design systems, explore our practical guides and resources to begin implementing the Elevation AI Design System.
              </BodyLarge>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon name="code-line" className="h-6 w-6 text-green-500" />
                    </div>
                    <CardTitle>Installation Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BodySmall className="text-muted-foreground mb-4">
                      Step-by-step instructions for setting up the design system in your project.
                    </BodySmall>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/design-system/installation">View Guide</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon name="lightbulb-line" className="h-6 w-6 text-purple-500" />
                    </div>
                    <CardTitle>Design Principles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BodySmall className="text-muted-foreground mb-4">
                      Learn the philosophy and principles that guide our design decisions.
                    </BodySmall>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/design-system/principles">View Principles</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon name="apps-line" className="h-6 w-6 text-blue-500" />
                    </div>
                    <CardTitle>Component Library</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BodySmall className="text-muted-foreground mb-4">
                      Explore our comprehensive library of reusable UI components.
                    </BodySmall>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/design-system/components">Browse Components</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
