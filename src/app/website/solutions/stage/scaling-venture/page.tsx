"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"

export default function WireframesScalingVenturePage() {
  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="wireframes" />}
      >
        <Container size="2xl">
          <Section paddingY="xl">
            <PageHeader
              title="Scaling Venture Wireframe"
              description="Wireframe for growth-stage company solutions"
              size="lg"
              centered
            />
          </Section>

          <Section paddingY="lg">
            <div className="text-center">
              <p className="text-muted-foreground">Wireframe content for Scaling Venture page will go here</p>
            </div>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
