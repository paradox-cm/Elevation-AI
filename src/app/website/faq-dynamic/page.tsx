"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { Button } from "@/components/ui/button"
import { H1, P } from "@/components/ui/typography"
import Icon from "@/components/ui/icon"
import { DynamicFAQ } from "@/components/cms"
import Link from "next/link"

export default function DynamicFAQPage() {
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
              {/* Page Header */}
              <div className="w-full flex items-center justify-center min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]">
                <div className="text-center space-y-1">
                  <H1>
                    Frequently Asked Questions
                  </H1>
                  <P className="max-w-[42rem] mx-auto">
                    Your questions, answered. Find comprehensive information about Elevation AI, our platform, and our partnership model organized by category.
                  </P>
                </div>
              </div>

              {/* Dynamic FAQ Section */}
              <Section paddingY="lg">
                <DynamicFAQ />
              </Section>

              {/* Still Have Questions Card */}
              <Section paddingY="lg">
                <div className="max-w-6xl mx-auto">
                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-8 text-center">
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon name="question-line" className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <H1>
                        Still have questions?
                      </H1>
                      <P className="max-w-md mx-auto">
                        Can't find what you're looking for? Our team is here to help. Reach out and we'll get back to you as soon as possible.
                      </P>
                      <div className="pt-2">
                        <Link href="/website/contact">
                          <Button size="lg" className="gap-2">
                            <Icon name="mail-line" className="h-4 w-4" />
                            Contact Us
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
            </Container>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
