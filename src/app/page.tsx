"use client"

import { AppShell, Container, Section } from "@/components/ui/layout";
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation";
import { PageWrapper } from "@/components/page-wrapper";
import { AnimatedFavicon } from "@/components/ui/animated-favicon";

export default function Home() {
  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="home" showBadge={false} />}
      >
        <Container>
          <Section paddingY="xl" className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center">
              <AnimatedFavicon width={200} height={200} />
            </div>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  );
}
