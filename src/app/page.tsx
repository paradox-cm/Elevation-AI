import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppShell, Container, Section } from "@/components/ui/layout";
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation";
import { H1 } from "@/components/ui/typography";
import { PageWrapper } from "@/components/page-wrapper";
import { Logo } from "@/components/ui/logo";
import { getBrandName } from "@/lib/brand-config";


export default function Home() {
  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="home" showBadge={false} />}
      >
        <Container>
          <Section paddingY="xl" className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center">
              <Logo className="w-32 h-32 mx-auto mb-8" />
              <H1 className="mb-4">{getBrandName()}</H1>
              <p className="text-lg text-muted-foreground mb-8">
                A comprehensive design system built for modern applications
              </p>
              <Link href="/design-system">
                <Button size="lg">Explore Design System</Button>
              </Link>
            </div>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  );
}
