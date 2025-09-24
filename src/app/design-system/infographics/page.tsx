"use client";
import React from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { AppShell } from "@/components/ui/layout/app-shell";
import { Container } from "@/components/ui/layout/container";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/marketing/page-header";
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar";
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation";
import { SectionTitle, Canvas } from "@/components/infographics/primitives";
import HomeKnowledgeBlocks from "@/components/infographics/HomeKnowledgeBlocks";
import HomeAgenticEngine from "@/components/infographics/HomeAgenticEngine";
import HomeWorkspaces from "@/components/infographics/HomeWorkspaces";
import HomeCopilot from "@/components/infographics/HomeCopilot";
import HomeSecurity from "@/components/infographics/HomeSecurity";
import PlatformPrivateBrain from "@/components/infographics/PlatformPrivateBrain";
import PlatformWorkspaces from "@/components/infographics/PlatformWorkspaces";
import PlatformConnectSecurely from "@/components/infographics/PlatformConnectSecurely";
import PlatformLibrary from "@/components/infographics/PlatformLibrary";
import PlatformCommandCenter from "@/components/infographics/PlatformCommandCenter";

export default function InfographicsIndexPage() {
  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="infographics" />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container size="2xl">
          <Section paddingY="xl">
            <PageHeader
              title="Infographics"
              description="Marketing infographics for homepage and platform sections. Each infographic is designed for a 600×360 canvas with responsive layouts, subtle animations, and accessibility features."
              size="lg"
            />
          </Section>

          <Section paddingY="lg">
            <div className="space-y-12">
              <section>
                <SectionTitle title="Homepage Infographics" subtitle="Centralized previews for design QA" />
                <div className="grid grid-cols-1 gap-10">
                  <div>
                    <h4 className="mb-3 text-sm font-medium text-muted-foreground">Home – Knowledge Blocks</h4>
                    <HomeKnowledgeBlocks />
                  </div>
                  <div>
                    <h4 className="mb-3 text-sm font-medium text-muted-foreground">Home – Agentic Engine</h4>
                    <HomeAgenticEngine />
                  </div>
                  <div>
                    <h4 className="mb-3 text-sm font-medium text-muted-foreground">Home – Workspaces & Canvases</h4>
                    <HomeWorkspaces />
                  </div>
                  <div>
                    <h4 className="mb-3 text-sm font-medium text-muted-foreground">Home – Personal Co-pilot</h4>
                    <HomeCopilot />
                  </div>
                  <div>
                    <h4 className="mb-3 text-sm font-medium text-muted-foreground">Home – Enterprise Security</h4>
                    <HomeSecurity />
                  </div>
                </div>
              </section>

              <section>
                <SectionTitle title="Platform Infographics" subtitle="Centralized previews for design QA" />
                <div className="grid grid-cols-1 gap-10">
                  <div>
                    <h4 className="mb-3 text-sm font-medium text-muted-foreground">Platform – Private Brain</h4>
                    <PlatformPrivateBrain />
                  </div>
                  <div>
                    <h4 className="mb-3 text-sm font-medium text-muted-foreground">Platform – Workspaces</h4>
                    <PlatformWorkspaces />
                  </div>
                  <div>
                    <h4 className="mb-3 text-sm font-medium text-muted-foreground">Platform – Connect Securely</h4>
                    <PlatformConnectSecurely />
                  </div>
                  <div>
                    <h4 className="mb-3 text-sm font-medium text-muted-foreground">Platform – Library</h4>
                    <PlatformLibrary />
                  </div>
                  <div>
                    <h4 className="mb-3 text-sm font-medium text-muted-foreground">Platform – Command Center</h4>
                    <PlatformCommandCenter />
                  </div>
                </div>
              </section>
            </div>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  );
}


