"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { H2, BodyLarge } from "@/components/ui/typography"
import { Container, Section } from "@/components/ui/layout"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { IntelligentProcessAutomation, IntelligentProcessAutomationMobile } from "@/components/animations"
import Icon from "@/components/ui/icon"

import Link from "next/link"

export default function IntelligentProcessAutomationAnimation() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
              title="Intelligent-Process-Automation Animation"
              description="Smart workflow automation that streamlines business processes. This animation demonstrates the intelligent orchestration of automated workflows."
              size="xl"
              centered
            />
          </Section>

          {/* Animation Display */}
          <Section paddingY="lg">
            <Card className="p-8 text-center">
              <div className="mb-6">
                <H2 className="text-2xl font-bold mb-4">Automated Workflow Grid</H2>
                <BodyLarge className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  This animation represents the Intelligent-Process-Automation system&apos;s ability to orchestrate complex workflows through a structured grid-based approach, demonstrating automated process flows and intelligent routing.
                </BodyLarge>
              </div>
              
              {/* Canvas Container */}
              <div className="flex justify-center mb-6">
                {isMobile ? (
                  <IntelligentProcessAutomationMobile 
                    width={600} 
                    height={500} 
                    showBorder={true}
                  />
                ) : (
                  <IntelligentProcessAutomation 
                    width={600} 
                    height={400} 
                    showBorder={true}
                  />
                )}
              </div>

              <Button variant="outline" asChild>
                <Link href="/design-system/animations">
                  <Icon name="arrow-left-line" className="h-4 w-4 mr-2" />
                  Back to Animations
                </Link>
              </Button>
            </Card>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
