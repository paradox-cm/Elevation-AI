import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppShell, Container, Section } from "@/components/ui/layout";
import { Navigation } from "@/components/ui/navigation";
import { H1 } from "@/components/ui/typography";
import { PageWrapper } from "@/components/page-wrapper";
import { getBrandName } from "@/lib/brand-config";

export default function Home() {
  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/design-system", label: "Design System" },
  ]

  return (
    <PageWrapper>
      <AppShell
                    header={
              <Navigation
                logo={
                  <div className="flex items-center space-x-2">
                    <H1 className="text-xl">{getBrandName()}</H1>
                  </div>
                }
                links={navigationLinks}
              />
            }
      >
        <Container>
          <Section paddingY="xl" className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                            <div className="text-center space-y-8">
                  <H1 className="text-6xl font-bold">{getBrandName()}</H1>
              <Link href="/design-system">
                <Button size="lg">
                  View Design System
                </Button>
              </Link>
            </div>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  );
}
