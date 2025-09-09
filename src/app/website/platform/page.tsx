"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { H1, BodyLarge } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Database, Cpu, Shield, Zap, Network, Layers } from "lucide-react"
import Link from "next/link"
import React from "react"
import Icon from "@/components/ui/icon"

// Platform Hero Section Component
function PlatformHeroSection() {
  const [activeModule, setActiveModule] = React.useState(0)
  
  const platformModules = [
    { icon: Database, label: "Knowledge Graph", color: "text-blue-500" },
    { icon: Cpu, label: "Agentic Engine", color: "text-green-500" },
    { icon: Shield, label: "Security Layer", color: "text-purple-500" },
    { icon: Zap, label: "AI Processing", color: "text-orange-500" },
    { icon: Network, label: "Integrations", color: "text-cyan-500" },
    { icon: Layers, label: "Workspaces", color: "text-pink-500" }
  ]

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveModule((prev) => (prev + 1) % platformModules.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [platformModules.length])

  return (
    <Section 
      paddingY="lg" 
      className="flex items-center min-h-screen pt-8 sm:pt-0 relative overflow-hidden"
    >
      <Container size="2xl" className="px-4 sm:px-6 lg:px-8 lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-semibold leading-tight">
                The Agentic Platform for
                <span className="block">Intelligent Operations</span>
              </div>
              <BodyLarge className="text-muted-foreground max-w-2xl">
                Elevation AI is the agentic knowledge and work orchestration platform—built for the future of business—powered by a concierge team. Unifying knowledge, orchestrating workflows, securing your use of AI.
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
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl bg-gradient-to-br from-background/50 to-background/30 border border-border/50 overflow-hidden backdrop-blur-sm">
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

              {/* Central Platform Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/40 rounded-2xl flex items-center justify-center border-4 border-primary/30 animate-pulse">
                  <Layers className="w-16 h-16 text-primary" />
                </div>
              </div>

              {/* Modular Architecture Components */}
              {platformModules.map((module, index) => {
                // Fixed positions to avoid hydration mismatch
                const positions = [
                  { top: 'calc(50% - 121px)', left: 'calc(50% - 70px)' }, // 0°
                  { top: 'calc(50% - 70px)', left: 'calc(50% + 121px)' },  // 60°
                  { top: 'calc(50% + 70px)', left: 'calc(50% + 121px)' },  // 120°
                  { top: 'calc(50% + 121px)', left: 'calc(50% - 70px)' },  // 180°
                  { top: 'calc(50% + 70px)', left: 'calc(50% - 121px)' },  // 240°
                  { top: 'calc(50% - 70px)', left: 'calc(50% - 121px)' }   // 300°
                ]
                
                return (
                  <div
                    key={index}
                    className="absolute transition-all duration-1000"
                    style={{
                      top: positions[index].top,
                      left: positions[index].left,
                      transform: 'translate(-50%, -50%)',
                      animationDelay: `${index * 0.3}s`
                    }}
                  >
                    <div className={`w-16 h-16 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-lg transition-all duration-500 flex items-center justify-center ${
                      activeModule === index ? 'scale-110 shadow-xl border-primary/50' : 'hover:scale-105'
                    }`}>
                      <module.icon className={`w-6 h-6 transition-colors duration-500 ${
                        activeModule === index ? 'text-primary' : module.color
                      }`} />
                    </div>
                  </div>
                )
              })}

              {/* Data Flow Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {platformModules.map((_, index) => {
                  // Fixed line endpoints to avoid hydration mismatch
                  const lineEndpoints = [
                    { x2: '32.5%', y2: '32.5%' }, // 0°
                    { x2: '67.5%', y2: '32.5%' }, // 60°
                    { x2: '67.5%', y2: '67.5%' }, // 120°
                    { x2: '32.5%', y2: '67.5%' }, // 180°
                    { x2: '17.5%', y2: '67.5%' }, // 240°
                    { x2: '17.5%', y2: '32.5%' }  // 300°
                  ]
                  
                  return (
                    <line
                      key={index}
                      x1="50%"
                      y1="50%"
                      x2={lineEndpoints[index].x2}
                      y2={lineEndpoints[index].y2}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      className="text-primary/20 animate-pulse"
                      style={{ 
                        animationDelay: `${index * 0.2}s`,
                        animationDuration: '3s'
                      }}
                    />
                  )
                })}
              </svg>

              {/* Flowing Data Particles */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary/40 rounded-full animate-pulse"
                    style={{
                      top: `${20 + (i * 10)}%`,
                      left: `${30 + (i * 5)}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '4s'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}


export default function WireframesPlatformPage() {
  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="platform" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
        <Container size="2xl">
              {/* Platform Hero Section */}
              <PlatformHeroSection />

          <Section paddingY="lg">
            <div className="text-center">
                  <p className="text-muted-foreground">Platform content sections will go here</p>
            </div>
          </Section>
        </Container>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
