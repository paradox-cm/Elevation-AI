"use client"


import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"

export default function WireframesPostExitFamilyOfficeCreationPage() {
  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="wireframes" />}
      >
        <Container size="2xl">
          <Section paddingY="xl">
            <PageHeader
              title="Post-Exit Family Office Creation Wireframe"
              description="Wireframe for family office establishment solutions"
              size="lg"
              centered
            />
          </Section>

          <Section paddingY="lg">
            <div className="text-center">
              <p className="text-muted-foreground">Wireframe content for Post-Exit Family Office Creation page will go here</p>
            </div>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
