import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppShell, Container, Section } from "@/components/ui/layout";
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation";
import { H1 } from "@/components/ui/typography";
import { PageWrapper } from "@/components/page-wrapper";
import { Logo } from "@/components/ui/logo";
import { getBrandName } from "@/lib/brand-config";
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
              <AnimatedFavicon width={200} height={200} priority />
            </div>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  );
}
