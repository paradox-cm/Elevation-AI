"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { H1, P } from "@/components/ui/typography"

export default function SecurityPage() {
  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="resources" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            <Container size="2xl">
              <Section paddingY="xl">
                {/* Page Header */}
                <div className="w-full flex items-center justify-center min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]">
                  <div className="text-center space-y-1">
                    <H1>
                      Security
                    </H1>
                    <P className="max-w-[42rem] mx-auto">
                      Learn about Elevation AI's enterprise-grade security, compliance, and data protection measures
                    </P>
                  </div>
                </div>
              </Section>

              <Section paddingY="lg">
                <div className="text-center">
                  <p className="text-muted-foreground">Security content will go here</p>
                </div>
              </Section>
            </Container>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
