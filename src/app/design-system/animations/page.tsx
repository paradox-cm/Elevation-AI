"use client"



import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Icon from "@/components/ui/icon"
import { BodyLarge } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"

import Link from "next/link"

export default function AnimationsPage() {
  // Animation components used across the application
  const animations = [
    {
      name: "Perlin Logo Animation",
      description: "Dynamic plasma animation using Perlin noise within the Elevation AI logo shape",
      href: "/design-system/animations/perlin-logo",
      icon: "magic-line",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      name: "Agentic-Engine",
      description: "AI-powered automation engine that learns and adapts to your business processes",
      href: "/design-system/animations/agentic-engine",
      icon: "cpu-line",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      name: "Enterprise-Security",
      description: "Advanced security protocols and compliance frameworks for enterprise environments",
      href: "/design-system/animations/enterprise-security",
      icon: "shield-keyhole-line",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      name: "Future-Ready",
      description: "Scalable architecture designed to evolve with emerging technologies",
      href: "/design-system/animations/future-ready",
      icon: "shield-check-line",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      name: "Intelligent-Process-Automation",
      description: "Smart workflow automation that optimizes business operations",
      href: "/design-system/animations/intelligent-process-automation",
      icon: "brain-line",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      name: "Knowledge-Blocks",
      description: "Modular knowledge management system for organized information access",
      href: "/design-system/animations/knowledge-blocks",
      icon: "node-tree",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10"
    },
    {
      name: "Personal-Copilot",
      description: "AI assistant that adapts to individual user needs and preferences",
      href: "/design-system/animations/personal-copilot",
      icon: "message-3-line",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10"
    },
    {
      name: "Real-Time-Business-Intelligence",
      description: "Live data analytics and insights for immediate decision-making",
      href: "/design-system/animations/real-time-business-intelligence",
      icon: "eye-line",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10"
    },
    {
      name: "Unified-Knowledge",
      description: "Centralized knowledge platform that connects all information sources",
      href: "/design-system/animations/unified-knowledge",
      icon: "database-2-line",
      color: "text-teal-500",
      bgColor: "bg-teal-500/10"
    },
    {
      name: "Workspaces-Canvases",
      description: "Collaborative digital environments for team creativity and productivity",
      href: "/design-system/animations/workspaces-canvases",
      icon: "layout-grid-line",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      name: "Solutions Hero Shader",
      description: "Interactive Three.js shader animation with Perlin noise creating dynamic plasma effects in brand colors",
      href: "/design-system/animations/solutions-hero-shader",
      icon: "magic-line",
      color: "text-blue-600",
      bgColor: "bg-blue-600/10"
    },
    {
      name: "Tunnel Shader",
      description: "Immersive tunnel effect animation used in the 'Who this is for' section, creating depth and visual interest",
      href: "/design-system/animations/tunnel-shader",
      icon: "eye-line",
      color: "text-purple-600",
      bgColor: "bg-purple-600/10"
    },
    {
      name: "Typewriter Effects",
      description: "Animated text effects that type out words and cycle through multiple statements. Features both looping and non-looping versions for different use cases.",
      href: "/design-system/typewriter",
      icon: "text",
      color: "text-green-600",
      bgColor: "bg-green-600/10"
    },
    {
      name: "Shader Card",
      description: "Dynamic WebGL shader animation with Perlin noise creating fluid, organic patterns. Used in platform cards with customizable color palettes for different categories.",
      href: "/design-system/animations/shader-card",
      icon: "palette-line",
      color: "text-violet-600",
      bgColor: "bg-violet-600/10"
    },
    {
      name: "Shader Card Light",
      description: "Light mode optimized version of the shader animation designed for white backgrounds. Features softer colors, subtle transparency, and enhanced visibility in light themes.",
      href: "/design-system/animations/shader-card-light",
      icon: "sun-line",
      color: "text-amber-600",
      bgColor: "bg-amber-600/10"
    },
    {
      name: "Growth Animation",
      description: "Dynamic dot growth animation that adapts to light and dark themes. Features expanding and contracting dots in a grid pattern, perfect for illustrating business growth and scaling concepts.",
      href: "/design-system/animations/growth-animation",
      icon: "bar-chart-line",
      color: "text-emerald-600",
      bgColor: "bg-emerald-600/10"
    },
    {
      name: "Starfield Animation",
      description: "Cinematic 3D starfield animation with perspective projection creating a 'flying through space' effect. Features 300 stars with fade trails, variable opacity, and theme adaptation for immersive backgrounds.",
      href: "/design-system/animations/starfield-animation",
      icon: "star-line",
      color: "text-purple-600",
      bgColor: "bg-purple-600/10"
    },
    {
      name: "Business Data Animation",
      description: "Dynamic vertical line animation simulating data flow and business metrics. Features 192 animated lines in a grid pattern with oscillating movement, perfect for illustrating data processing and business intelligence concepts.",
      href: "/design-system/animations/business-data-animation",
      icon: "bar-chart-2-line",
      color: "text-blue-600",
      bgColor: "bg-blue-600/10"
    }
  ]

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="animations" />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container size="2xl">
          {/* Header Section */}
          <Section paddingY="xl">
            <PageHeader
              title="Animations"
              description="A comprehensive collection of interactive animations used throughout the Elevation AI application. These animations enhance user experience and demonstrate key platform capabilities across various sections and components."
              size="xl"
              centered
            />
          </Section>

          {/* Animations Grid */}
          <Section paddingY="lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {animations.map((animation) => (
                <Card key={animation.name} className="group hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${animation.bgColor} flex-shrink-0`}>
                        <Icon name={animation.icon} className={`h-6 w-6 ${animation.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base leading-tight">{animation.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <BodyLarge className="text-muted-foreground mb-4 text-sm">
                      {animation.description}
                    </BodyLarge>
                    <Button variant="outline" size="sm" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Link href={animation.href} className="flex items-center justify-center">
                        View Animation
                        <Icon name="arrow-right-line" className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
