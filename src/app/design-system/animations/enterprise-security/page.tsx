"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card } from "@/components/ui/card"
import Icon from "@/components/ui/icon"
import { H2, BodyLarge } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { EnterpriseSecurity } from "@/components/animations"

import Link from "next/link"

export default function EnterpriseSecurityAnimation() {
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
              title="Enterprise-Security Animation"
              description="Advanced security protocols and compliance frameworks for enterprise environments. This animation demonstrates the robust security measures."
              size="xl"
              centered
            />
          </Section>

          {/* Animation Display */}
          <Section paddingY="lg">
            <Card className="p-8 text-center">
              <div className="mb-6">
                <H2 className="text-2xl font-bold mb-4">Impenetrable Security Layers</H2>
                <BodyLarge className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  This animation represents the Enterprise-Security system&apos;s multiple layers of protection, showing concentric security perimeters that rotate independently to create an impenetrable defense.
                </BodyLarge>
              </div>
              
              {/* Canvas Container */}
              <div className="flex justify-center mb-6">
                <EnterpriseSecurity 
                  width={480} 
                  height={320} 
                  showBorder={true}
                />
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
