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

export default function InstallationPage() {
  const installationSteps = [
    {
      step: "1",
      title: "Install Dependencies",
      description: "Add the required packages to your project",
      code: "npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react",
      language: "bash"
    },
    {
      step: "2",
      title: "Configure Tailwind CSS",
      description: "Set up Tailwind CSS with our custom configuration",
      code: `// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        elevation: {
          50: "#eff6ff",
          500: "#0e62fd",
          900: "#1e3a8a"
        }
      }
    }
  }
}`,
      language: "javascript"
    },
    {
      step: "3",
      title: "Import Components",
      description: "Import and use components in your application",
      code: `import { Button } from "@/components/ui/button"

export default function App() {
  return (
    <Button variant="default">
      Get Started
    </Button>
  )
}`,
      language: "typescript"
    }
  ]

  const requirements = [
    {
      name: "Node.js",
      version: "18.0.0 or higher",
      description: "JavaScript runtime environment",
      status: "Required"
    },
    {
      name: "React",
      version: "18.0.0 or higher",
      description: "UI library for building user interfaces",
      status: "Required"
    },
    {
      name: "TypeScript",
      version: "5.0.0 or higher",
      description: "Type-safe JavaScript development",
      status: "Recommended"
    },
    {
      name: "Tailwind CSS",
      version: "3.0.0 or higher",
      description: "Utility-first CSS framework",
      status: "Required"
    }
  ]

  const frameworks = [
    {
      name: "Next.js",
      description: "React framework for production",
      icon: "nextjs",
      difficulty: "Easy",
      guide: "/design-system/installation/nextjs"
    },
    {
      name: "Vite",
      description: "Fast build tool and dev server",
      icon: "vite",
      difficulty: "Easy",
      guide: "/design-system/installation/vite"
    },
    {
      name: "Create React App",
      description: "Official React build tool",
      icon: "react",
      difficulty: "Medium",
      guide: "/design-system/installation/cra"
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
              title="Installation Guide"
              description="Get up and running with the Elevation AI Design System. Follow our step-by-step guide to install and configure the design system in your project."
              size="lg"
              centered
            />
          </Section>

          {/* Quick Start */}
          <Section paddingY="lg">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">Quick Installation</H2>
              <div className="space-y-6">
                {installationSteps.map((step) => (
                  <Card key={step.step} className="group hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-semibold text-sm">{step.step}</span>
                        </div>
                        <div className="flex-1">
                          <H3 className="text-lg font-semibold mb-2">{step.title}</H3>
                          <BodyLarge className="text-muted-foreground mb-4">{step.description}</BodyLarge>
                          <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                            <pre className="whitespace-pre-wrap">{step.code}</pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          {/* Requirements */}
          <Section paddingY="xl" className="bg-muted/50 rounded-lg">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">System Requirements</H2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {requirements.map((req) => (
                  <Card key={req.name} className="group hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon name="check-line" className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{req.name}</CardTitle>
                            <BodySmall className="text-muted-foreground">{req.version}</BodySmall>
                          </div>
                        </div>
                        <Badge variant={req.status === "Required" ? "default" : "secondary"}>
                          {req.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <BodySmall className="text-muted-foreground">{req.description}</BodySmall>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          {/* Framework Guides */}
          <Section paddingY="xl">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">Framework-Specific Guides</H2>
              <BodyLarge className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Choose your preferred framework for detailed installation instructions and configuration examples.
              </BodyLarge>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {frameworks.map((framework) => (
                  <Card key={framework.name} className="group hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={framework.icon} className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {framework.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-base">{framework.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <BodySmall className="text-muted-foreground mb-4">{framework.description}</BodySmall>
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <Link href={framework.guide}>
                          View Guide
                          <Icon name="arrow-right-line" className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          {/* Additional Resources */}
          <Section paddingY="xl">
            <div className="max-w-6xl mx-auto text-center">
              <H2 className="text-2xl font-bold mb-4">Need Help?</H2>
              <BodyLarge className="text-muted-foreground mb-8">
                If you encounter any issues during installation, check out these resources.
              </BodyLarge>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon name="book-line" className="h-6 w-6 text-blue-500" />
                    </div>
                    <CardTitle>Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BodySmall className="text-muted-foreground mb-4">
                      Explore our comprehensive documentation for detailed guides and examples.
                    </BodySmall>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/design-system/documentation">View Documentation</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon name="lightbulb-line" className="h-6 w-6 text-green-500" />
                    </div>
                    <CardTitle>Design Principles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BodySmall className="text-muted-foreground mb-4">
                      Understand the philosophy and principles behind our design decisions.
                    </BodySmall>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/design-system/principles">View Principles</Link>
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
