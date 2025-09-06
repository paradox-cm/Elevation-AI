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

export default function PrinciplesPage() {
  const corePrinciples = [
    {
      title: "Consistency",
      description: "Maintain visual and behavioral consistency across all components and interfaces",
      icon: "repeat-line",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      examples: [
        "Uniform spacing and typography scales",
        "Consistent color usage and semantic meaning",
        "Standardized component patterns and interactions"
      ]
    },
    {
      title: "Accessibility",
      description: "Ensure all components are accessible to users with diverse abilities and needs",
      icon: "shield-check-line",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      examples: [
        "WCAG 2.1 AA compliance standards",
        "Keyboard navigation support",
        "Screen reader compatibility",
        "High contrast ratios"
      ]
    },
    {
      title: "Simplicity",
      description: "Design interfaces that are intuitive and easy to understand",
      icon: "magic-line",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      examples: [
        "Clear visual hierarchy",
        "Minimal cognitive load",
        "Progressive disclosure of complexity",
        "Familiar interaction patterns"
      ]
    },
    {
      title: "Flexibility",
      description: "Create components that adapt to different contexts and requirements",
      icon: "settings-3-line",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      examples: [
        "Responsive design patterns",
        "Customizable component variants",
        "Theme and brand adaptation",
        "Scalable design tokens"
      ]
    }
  ]

  const designValues = [
    {
      title: "User-Centered",
      description: "Every design decision prioritizes user needs and experiences",
      icon: "user-heart-line",
      color: "text-red-500",
      bgColor: "bg-red-500/10"
    },
    {
      title: "Performance-First",
      description: "Optimize for speed and efficiency in all implementations",
      icon: "speed-line",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10"
    },
    {
      title: "Future-Proof",
      description: "Build with scalability and long-term maintainability in mind",
      icon: "rocket-line",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10"
    }
  ]

  const decisionFramework = [
    {
      step: "1",
      title: "Understand Context",
      description: "Consider the user's context, goals, and constraints",
      questions: [
        "Who are the primary users?",
        "What are they trying to accomplish?",
        "What are the technical constraints?"
      ]
    },
    {
      step: "2",
      title: "Evaluate Options",
      description: "Consider multiple design approaches and their trade-offs",
      questions: [
        "What are the available design patterns?",
        "How do they impact accessibility?",
        "What are the performance implications?"
      ]
    },
    {
      step: "3",
      title: "Test & Iterate",
      description: "Validate decisions through user testing and feedback",
      questions: [
        "Does this solve the user's problem?",
        "Is it accessible to all users?",
        "Can it scale with our needs?"
      ]
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
              title="Design Principles"
              description="The philosophy and principles that guide our design decisions. Understanding these principles helps create consistent, accessible, and effective user experiences."
              size="lg"
              centered
            />
          </Section>

          {/* Core Principles */}
          <Section paddingY="lg">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">Core Design Principles</H2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {corePrinciples.map((principle) => (
                  <Card key={principle.title} className="group hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 ${principle.bgColor} rounded-lg flex items-center justify-center`}>
                          <Icon name={principle.icon} className={`h-6 w-6 ${principle.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{principle.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <BodyLarge className="text-muted-foreground mb-4">{principle.description}</BodyLarge>
                      <div className="space-y-2">
                        {principle.examples.map((example, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <BodySmall className="text-muted-foreground">{example}</BodySmall>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          {/* Design Values */}
          <Section paddingY="xl" className="bg-muted/50 rounded-lg">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">Our Design Values</H2>
              <BodyLarge className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                These values shape our approach to design and guide our decision-making process.
              </BodyLarge>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {designValues.map((value) => (
                  <Card key={value.title} className="text-center group hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className={`w-16 h-16 ${value.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                        <Icon name={value.icon} className={`h-8 w-8 ${value.color}`} />
                      </div>
                      <CardTitle className="text-lg">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <BodySmall className="text-muted-foreground">{value.description}</BodySmall>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          {/* Decision Framework */}
          <Section paddingY="xl">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">Design Decision Framework</H2>
              <BodyLarge className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Use this framework to guide your design decisions and ensure they align with our principles.
              </BodyLarge>
              
              <div className="space-y-6">
                {decisionFramework.map((step) => (
                  <Card key={step.step} className="group hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-semibold text-sm">{step.step}</span>
                        </div>
                        <div className="flex-1">
                          <H3 className="text-lg font-semibold mb-2">{step.title}</H3>
                          <BodyLarge className="text-muted-foreground mb-4">{step.description}</BodyLarge>
                          <div className="space-y-2">
                            {step.questions.map((question, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <Icon name="question-line" className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <BodySmall className="text-muted-foreground">{question}</BodySmall>
                              </div>
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

          {/* Implementation Guidelines */}
          <Section paddingY="xl">
            <div className="max-w-6xl mx-auto text-center">
              <H2 className="text-2xl font-bold mb-4">Putting Principles Into Practice</H2>
              <BodyLarge className="text-muted-foreground mb-8">
                Ready to apply these principles? Explore our implementation guides and examples.
              </BodyLarge>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon name="book-line" className="h-6 w-6 text-blue-500" />
                    </div>
                    <CardTitle>Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BodySmall className="text-muted-foreground mb-4">
                      Explore our comprehensive documentation with practical examples.
                    </BodySmall>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/design-system/documentation">View Documentation</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon name="code-line" className="h-6 w-6 text-green-500" />
                    </div>
                    <CardTitle>Installation Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BodySmall className="text-muted-foreground mb-4">
                      Get started with implementing the design system in your project.
                    </BodySmall>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/design-system/installation">View Guide</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon name="shield-check-line" className="h-6 w-6 text-purple-500" />
                    </div>
                    <CardTitle>Accessibility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BodySmall className="text-muted-foreground mb-4">
                      Learn about our accessibility guidelines and best practices.
                    </BodySmall>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/design-system/accessibility">View Guidelines</Link>
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
