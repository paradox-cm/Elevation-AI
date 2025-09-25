"use client";
import React, { useState } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { AppShell } from "@/components/ui/layout/app-shell";
import { Container } from "@/components/ui/layout/container";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/marketing/page-header";
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar";
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation";
import { SectionTitle, Canvas } from "@/components/infographics/primitives";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone } from "lucide-react";
import HomeKnowledgeBlocks from "@/components/infographics/HomeKnowledgeBlocks";
import HomeAgenticEngine from "@/components/infographics/HomeAgenticEngine";
import HomeWorkspaces from "@/components/infographics/HomeWorkspaces";
import HomeCopilot from "@/components/infographics/HomeCopilot";
import HomeSecurity from "@/components/infographics/HomeSecurity";
import MobileHomeKnowledgeBlocks from "@/components/infographics/MobileHomeKnowledgeBlocks";
import MobileHomeAgenticEngine from "@/components/infographics/MobileHomeAgenticEngine";
import MobileHomeWorkspaces from "@/components/infographics/MobileHomeWorkspaces";
import MobileHomeCopilot from "@/components/infographics/MobileHomeCopilot";
import MobileHomeSecurity from "@/components/infographics/MobileHomeSecurity";
import PlatformPrivateBrain from "@/components/infographics/PlatformPrivateBrain";
import PlatformWorkspaces from "@/components/infographics/PlatformWorkspaces";
import PlatformConnectSecurely from "@/components/infographics/PlatformConnectSecurely";
import PlatformLibrary from "@/components/infographics/PlatformLibrary";
import PlatformCommandCenter from "@/components/infographics/PlatformCommandCenter";
import MobilePlatformPrivateBrain from "@/components/infographics/MobilePlatformPrivateBrain";
import MobilePlatformWorkspaces from "@/components/infographics/MobilePlatformWorkspaces";
import MobilePlatformConnectSecurely from "@/components/infographics/MobilePlatformConnectSecurely";
import MobilePlatformLibrary from "@/components/infographics/MobilePlatformLibrary";
import MobilePlatformCommandCenter from "@/components/infographics/MobilePlatformCommandCenter";

export default function InfographicsIndexPage() {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

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
              description="Marketing infographics for homepage and platform sections. Each infographic is designed for a 600×360 canvas with responsive layouts, subtle animations, and accessibility features. Use the toggle below to preview mobile vs desktop layouts."
              size="lg"
            />
            
            {/* View Mode Toggle */}
            <div className="mt-6 flex items-center justify-center">
              <div className="inline-flex items-center rounded-lg border bg-background p-1">
                <Button
                  variant={viewMode === "desktop" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("desktop")}
                  className="flex items-center gap-2"
                >
                  <Monitor className="h-4 w-4" />
                  Desktop
                </Button>
                <Button
                  variant={viewMode === "mobile" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("mobile")}
                  className="flex items-center gap-2"
                >
                  <Smartphone className="h-4 w-4" />
                  Mobile
                </Button>
              </div>
            </div>
          </Section>

          <Section paddingY="lg">
            <div className="space-y-12">
              <section>
                <SectionTitle title="Homepage Infographics" subtitle="Centralized previews for design QA" />
                {viewMode === "desktop" ? (
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
                ) : (
                  <div className="flex flex-col items-center gap-12">
                    <div className="w-full flex justify-center">
                      <div className="w-full max-w-md">
                        <h4 className="mb-4 text-sm font-medium text-muted-foreground text-center">Home – Knowledge Blocks</h4>
                        <MobileHomeKnowledgeBlocks />
                      </div>
                    </div>
                    <div className="w-full flex justify-center">
                      <div className="w-full max-w-md">
                        <h4 className="mb-4 text-sm font-medium text-muted-foreground text-center">Home – Agentic Engine</h4>
                        <MobileHomeAgenticEngine />
                      </div>
                    </div>
                    <div className="w-full flex justify-center">
                      <div className="w-full max-w-md">
                        <h4 className="mb-4 text-sm font-medium text-muted-foreground text-center">Home – Workspaces & Canvases</h4>
                        <MobileHomeWorkspaces />
                      </div>
                    </div>
                    <div className="w-full flex justify-center">
                      <div className="w-full max-w-md">
                        <h4 className="mb-4 text-sm font-medium text-muted-foreground text-center">Home – Personal Co-pilot</h4>
                        <MobileHomeCopilot />
                      </div>
                    </div>
                    <div className="w-full flex justify-center">
                      <div className="w-full max-w-md">
                        <h4 className="mb-4 text-sm font-medium text-muted-foreground text-center">Home – Enterprise Security</h4>
                        <MobileHomeSecurity />
                      </div>
                    </div>
                  </div>
                )}
              </section>

              <section>
                <SectionTitle title="Platform Infographics" subtitle="Centralized previews for design QA" />
                {viewMode === "desktop" ? (
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
                ) : (
                  <div className="flex flex-col items-center gap-12">
                    <div className="w-full flex justify-center">
                      <div className="w-full max-w-md">
                        <h4 className="mb-4 text-sm font-medium text-muted-foreground text-center">Platform – Private Brain</h4>
                        <MobilePlatformPrivateBrain />
                      </div>
                    </div>
                    <div className="w-full flex justify-center">
                      <div className="w-full max-w-md">
                        <h4 className="mb-4 text-sm font-medium text-muted-foreground text-center">Platform – Workspaces</h4>
                        <MobilePlatformWorkspaces />
                      </div>
                    </div>
                    <div className="w-full flex justify-center">
                      <div className="w-full max-w-md">
                        <h4 className="mb-4 text-sm font-medium text-muted-foreground text-center">Platform – Connect Securely</h4>
                        <MobilePlatformConnectSecurely />
                      </div>
                    </div>
                    <div className="w-full flex justify-center">
                      <div className="w-full max-w-md">
                        <h4 className="mb-4 text-sm font-medium text-muted-foreground text-center">Platform – Library</h4>
                        <MobilePlatformLibrary />
                      </div>
                    </div>
                    <div className="w-full flex justify-center">
                      <div className="w-full max-w-md">
                        <h4 className="mb-4 text-sm font-medium text-muted-foreground text-center">Platform – Command Center</h4>
                        <MobilePlatformCommandCenter />
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  );
}


