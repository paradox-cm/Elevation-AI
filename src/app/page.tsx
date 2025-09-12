"use client"

import { Container, Section } from "@/components/ui/layout";
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout";
import { MobileOnlyNavigation } from "@/components/ui/mobile-only-navigation";
import { MobileMenu } from "@/components/ui/mobile-menu";
import { PageWrapper } from "@/components/page-wrapper";
import { AnimatedFavicon } from "@/components/ui/animated-favicon";
import Link from "next/link";

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
              <Link href="/website/home" className="block">
                <div className="w-29 h-29 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-48 xl:h-48 2xl:w-64 2xl:h-64 flex items-center justify-center relative z-10 mx-auto transition-transform duration-200 hover:scale-105 cursor-pointer">
                  <AnimatedFavicon
                    width={256}
                    height={256}
                    className="w-29 h-29 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-48 xl:h-48 2xl:w-64 2xl:h-64"
                  />
                </div>
              </Link>
            </div>
          </Section>
        </Container>
      </MobileOnlyLayout>
    </PageWrapper>
  );
}
