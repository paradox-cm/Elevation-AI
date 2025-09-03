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
import { WorkspacesCanvases } from "@/components/animations"

import Link from "next/link"

export default function WorkspacesCanvasesPage() {
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
              title="Workspaces-Canvases Animation"
              description="Collaborative digital environments for team creativity and productivity. This animation demonstrates the collaborative workspace capabilities."
              size="xl"
              centered
            />
          </Section>

          {/* Animation Display */}
          <Section paddingY="lg">
            <Card className="p-8 text-center">
              <div className="mb-6">
                <H2 className="text-2xl font-bold mb-4">Collaborative Workspaces</H2>
                <BodyLarge className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Multiple workspace windows connected in a collaborative network, 
                  with data flowing between them to represent team productivity and creativity.
                </BodyLarge>
              </div>
              
              {/* Canvas Container */}
              <div className="flex justify-center mb-6">
                <WorkspacesCanvases 
                  width={440} 
                  height={440} 
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
