"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { H1, H2, H3, P, BodyLarge, BodySmall } from "@/components/ui/typography"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { Mail, Phone, MapPin, Clock, MessageSquare, Users, Building, Globe, FileText } from "lucide-react"
import React from "react"


export default function ContactPage() {
  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            <Container size="2xl">
              {/* Page Header */}
              <div className="w-full flex items-center justify-center min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]">
                <div className="text-center space-y-1">
                  <H1>
                    Contact Us
                  </H1>
                  <P className="max-w-[42rem] mx-auto">
                    Get in touch with Elevation AI
                  </P>
                </div>
              </div>

              {/* Contact Options Section */}
              <Section paddingY="lg">
                <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Sales Card */}
                    <Card className="hover:shadow-lg transition-shadow duration-200">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Building className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-base sm:text-base md:text-lg">Sales</CardTitle>
                        </div>
                        <CardDescription>
                          We'd love to talk about how we can work together.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full" asChild>
                          <a href="mailto:sales@elevationai.com">
                            Contact sales
                            <Icon name="arrow-right-line" className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Help & Support Card */}
                    <Card className="hover:shadow-lg transition-shadow duration-200">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-base sm:text-base md:text-lg">Help & Support</CardTitle>
                        </div>
                        <CardDescription>
                          Get in touch and let us know how we can help.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full" asChild>
                          <a href="mailto:support@elevationai.com">
                            Get support
                            <Icon name="arrow-right-line" className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Media & Press Card */}
                    <Card className="hover:shadow-lg transition-shadow duration-200">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-base sm:text-base md:text-lg">Media & Press</CardTitle>
                        </div>
                        <CardDescription>
                          Get Elevation AI news, company info, and media resources.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full" asChild>
                          <a href="mailto:press@elevationai.com">
                            Visit newsroom
                            <Icon name="arrow-right-line" className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Additional Contact Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="text-center md:text-left">
                      <H3 className="mb-2">Send us a message</H3>
                      <BodyLarge className="text-muted-foreground">
                        Have a question or need help?{" "}
                        <a href="/website/contact/message" className="text-primary hover:underline">
                          Send us a message
                        </a>{" "}
                        and we'll get back to you as soon as possible.
                      </BodyLarge>
                    </div>
                    <div className="text-center md:text-left">
                      <H3 className="mb-2">General communications</H3>
                      <BodyLarge className="text-muted-foreground">
                        For general queries, including partnership opportunities, please{" "}
                        <a href="mailto:support@elevationai.com" className="text-primary hover:underline">
                          contact support for help
                        </a>
                      </BodyLarge>
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