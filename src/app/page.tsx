"use client"

import { Container, Section } from "@/components/ui/layout";
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout";
import { MobileOnlyNavigation } from "@/components/ui/mobile-only-navigation";
import { MobileMenu } from "@/components/ui/mobile-menu";
import { PageWrapper } from "@/components/page-wrapper";
import { AnimatedFavicon } from "@/components/ui/animated-favicon";

export default function Home() {
  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MobileOnlyNavigation currentPage="home" showBadge={false} />}
        mobileMenu={<MobileMenu currentPage="home" />}
      >
        <Container>
          <Section paddingY="xl" className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center">
              <AnimatedFavicon width={200} height={200} />
            </div>
          </Section>
        </Container>
      </MobileOnlyLayout>
    </PageWrapper>
  );
}
