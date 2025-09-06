"use client"


import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { H3, H4, BodySmall } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { ResponsiveTabs, ResponsiveTabsContent, ResponsiveTabsList, ResponsiveTabsTrigger } from "@/components/ui/responsive-tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { useInteractiveStatesConfig } from "@/hooks/use-interactive-states-config"
import {
  LoadingSpinner,
  LoadingOverlay,
  SkeletonCard,
  SkeletonList,
  ContentPlaceholder,
  Toast,
  ProgressSteps,
} from "@/components/ui/loading"

export default function InteractiveStatesPage() {
  const {
    config,
    loadingSpinnerConfig,
    loadingOverlayConfig,
    skeletonConfig,
    toastConfig,
    progressStepsConfig,
    buttonStatesConfig
  } = useInteractiveStatesConfig()

  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastType, setToastType] = useState<"success" | "error" | "warning" | "info">("success")
  const [currentStep, setCurrentStep] = useState(2)
  const [showSkeleton, setShowSkeleton] = useState(false)



  const progressSteps = [
    { id: "1", title: "Setup", status: "completed" as const },
    { id: "2", title: "Configure", status: "current" as const },
    { id: "3", title: "Deploy", status: "pending" as const },
    { id: "4", title: "Complete", status: "pending" as const },
  ]

  const handleShowToast = (type: "success" | "error" | "warning" | "info") => {
    setToastType(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 5000)
  }

  const simulateLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 3000)
  }

  const simulateSkeleton = () => {
    setShowSkeleton(true)
    setTimeout(() => setShowSkeleton(false), 3000)
  }

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container>
          <Section paddingY="xl">
            <PageHeader
              title="Interactive States & Loading"
              description="Comprehensive loading states, feedback mechanisms, and interactive components for building responsive user interfaces."
              size="lg"
              centered
            />
          </Section>

          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="loader-4-line" className="h-5 w-5" />
                  Interactive States System Overview
                </CardTitle>
                <CardDescription>
                  Our interactive states system provides comprehensive loading feedback, user notifications, and state management for optimal user experience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="loader-4-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Loading States</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Spinners, skeletons, and overlays for various loading scenarios
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="notification-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">User Feedback</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Toast notifications, progress indicators, and status updates
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="user-settings-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Interactive Elements</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Buttons, forms, and components with proper state management
                    </BodySmall>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Interactive Components */}
          <Section paddingY="lg">
            <ResponsiveTabs defaultValue="loading" className="w-full">
              <ResponsiveTabsList className="grid w-full grid-cols-3">
                <ResponsiveTabsTrigger value="loading">Loading States</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="feedback">User Feedback</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="interactive">Interactive Elements</ResponsiveTabsTrigger>
              </ResponsiveTabsList>

              {/* Loading States */}
              <ResponsiveTabsContent value="loading" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Loading Spinners & Overlays</CardTitle>
                    <CardDescription>
                      Different types of loading indicators for various use cases
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Loading Spinners */}
                      <div>
                        <H3 className="mb-4">Loading Spinners</H3>
                        <div className="flex items-center space-x-8">
                          <LoadingSpinner size="sm" text="Small" />
                          <LoadingSpinner size="md" text="Medium" />
                          <LoadingSpinner size="lg" text="Large" />
                          <LoadingSpinner size="xl" text="Extra Large" />
                        </div>
                      </div>

                      <Separator />

                      {/* Loading Overlay */}
                      <div>
                        <H3 className="mb-4">Loading Overlay</H3>
                        <div className="relative">
                          <Card className="p-6">
                            <div className="space-y-4">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-muted rounded-full" />
                                <div>
                                  <div className="font-medium">Sample Content</div>
                                  <div className="text-sm text-muted-foreground">This content will be covered by the loading overlay</div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="h-4 bg-muted rounded w-full" />
                                <div className="h-4 bg-muted rounded w-3/4" />
                                <div className="h-4 bg-muted rounded w-1/2" />
                              </div>
                            </div>
                          </Card>
                          <LoadingOverlay isLoading={isLoading} text="Loading content...">
                            <div className="absolute inset-0" />
                          </LoadingOverlay>
                        </div>
                        <div className="mt-4">
                          <Button onClick={simulateLoading} disabled={isLoading}>
                            {isLoading ? (
                              <>
                                <Icon name="loader-4-line" className="h-4 w-4 animate-spin" />
                                Loading...
                              </>
                            ) : (
                              "Show Loading Overlay"
                            )}
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      {/* Skeleton Loaders */}
                      <div>
                        <H3 className="mb-4">Skeleton Loaders</H3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <BodySmall className="mb-2">Card Skeleton</BodySmall>
                            <SkeletonCard />
                          </div>
                          <div>
                            <BodySmall className="mb-2">List Skeleton</BodySmall>
                            <SkeletonList />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button onClick={simulateSkeleton} disabled={showSkeleton}>
                            {showSkeleton ? "Showing Skeleton..." : "Show Skeleton Loaders"}
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      {/* Content Placeholders */}
                      <div>
                        <H3 className="mb-4">Content Placeholders</H3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <Card>
                            <CardContent className="p-6">
                              <ContentPlaceholder
                                icon="database-2-line"
                                title="No data available"
                                description="There are no items to display at the moment. Get started by creating your first item."
                                action={{
                                  label: "Create Item",
                                  onClick: () => console.log("Create item"),
                                }}
                              />
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-6">
                              <ContentPlaceholder
                                icon="search-line"
                                title="No search results"
                                description="Try adjusting your search terms or filters to find what you're looking for."
                                action={{
                                  label: "Clear Filters",
                                  onClick: () => console.log("Clear filters"),
                                }}
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* User Feedback */}
              <ResponsiveTabsContent value="feedback" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Toast Notifications</CardTitle>
                    <CardDescription>
                      Different types of toast notifications for user feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <H3 className="mb-4">Toast Types</H3>
                        <div className="flex flex-wrap gap-2">
                          <Button onClick={() => handleShowToast("success")}>
                            Success Toast
                          </Button>
                          <Button onClick={() => handleShowToast("error")} variant="destructive">
                            Error Toast
                          </Button>
                          <Button onClick={() => handleShowToast("warning")} variant="outline">
                            Warning Toast
                          </Button>
                          <Button onClick={() => handleShowToast("info")} variant="secondary">
                            Info Toast
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <H3 className="mb-4">Progress Steps</H3>
                        <ProgressSteps steps={progressSteps} currentStep={currentStep} />
                        <div className="mt-4 flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                            disabled={currentStep === 1}
                          >
                            Previous
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                            disabled={currentStep === 4}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Interactive Elements */}
              <ResponsiveTabsContent value="interactive" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Form Elements</CardTitle>
                    <CardDescription>
                      Form elements with proper loading and disabled states
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              disabled={isLoading}
                            />
                          </div>
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              placeholder="Enter your name"
                              disabled={isLoading}
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch disabled={isLoading} />
                            <Label>Receive notifications</Label>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label>Button States</Label>
                            <div className="space-y-2 mt-2">
                              <Button className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                  <>
                                    <Icon name="loader-4-line" className="h-4 w-4 animate-spin" />
                                    Processing...
                                  </>
                                ) : (
                                  "Submit Form"
                                )}
                              </Button>
                              <Button variant="outline" className="w-full" disabled={isLoading}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                          <div>
                            <Label>Interactive Actions</Label>
                            <div className="space-y-2 mt-2">
                              <Button
                                size="sm"
                                onClick={simulateLoading}
                                disabled={isLoading}
                              >
                                {isLoading ? "Loading..." : "Simulate Loading"}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleShowToast("success")}
                              >
                                Show Success Toast
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>
            </ResponsiveTabs>
          </Section>

          {/* Best Practices */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="information-line" className="h-5 w-5" />
                  Best Practices
                </CardTitle>
                <CardDescription>
                  Guidelines for implementing interactive states effectively
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <H3 className="mb-4">Loading States</H3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Use spinners for quick operations (under 1 second)</li>
                        <li>• Use skeletons for content loading (1-3 seconds)</li>
                        <li>• Use progress indicators for long operations</li>
                        <li>• Always provide feedback for user actions</li>
                      </ul>
                    </div>
                    <div>
                      <H3 className="mb-4">User Feedback</H3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Show success messages for completed actions</li>
                        <li>• Display error messages with clear next steps</li>
                        <li>• Use appropriate toast types for different scenarios</li>
                        <li>• Keep messages concise and actionable</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <H3 className="mb-4">Interactive Elements</H3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Disable buttons during processing</li>
                        <li>• Show loading states within buttons</li>
                        <li>• Provide visual feedback for all interactions</li>
                        <li>• Use consistent patterns across the application</li>
                      </ul>
                    </div>
                    <div>
                      <H3 className="mb-4">Performance</H3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Optimize loading times where possible</li>
                        <li>• Use progressive loading for large datasets</li>
                        <li>• Implement proper error boundaries</li>
                        <li>• Cache frequently accessed data</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>
        </Container>
      </AppShell>

      {/* Toast Notifications */}
      {showToast && (
        <Toast
          type={toastType}
          title={
            toastType === "success" ? "Success!" :
            toastType === "error" ? "Error occurred" :
            toastType === "warning" ? "Warning" :
            "Information"
          }
          message={
            toastType === "success" ? "Your action was completed successfully." :
            toastType === "error" ? "Something went wrong. Please try again." :
            toastType === "warning" ? "Please review your input before proceeding." :
            "Here's some helpful information for you."
          }
          onClose={() => setShowToast(false)}
        />
      )}
    </PageWrapper>
  )
}
