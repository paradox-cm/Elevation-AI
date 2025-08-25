"use client"

import { PageWrapper } from "./page-wrapper"
import { AppShell, Container, Section } from "@/components/ui/layout"
import { Navigation } from "@/components/ui/navigation"
import { H1 } from "@/components/ui/typography"
import { Logo } from "@/components/ui/logo"

interface PageTemplateProps {
  children: React.ReactNode
  title?: string
  navigationLinks?: Array<{
    href: string
    label: string
    external?: boolean
  }>
}

export function PageTemplate({ 
  children, 
  title = "Page",
  navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/design-system", label: "Design System" },
  ]
}: PageTemplateProps) {
  return (
    <PageWrapper>
      <AppShell
        header={
          <Navigation
            logo={
              <div className="flex items-center space-x-2">
                <Logo width={100} height={18} />
              </div>
            }
            links={navigationLinks}
          />
        }
      >
        <Container>
          <Section paddingY="xl">
            {children}
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
