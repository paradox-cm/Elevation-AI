"use client"

import { useState } from "react"
import { LoadingAnimation, PulsingLoadingAnimation, MinimalLoadingAnimation } from "@/components/animations/loading-animation"
import { LogoLoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { H3, BodyLarge } from "@/components/ui/typography"

export function LoadingAnimationDemo() {
  const [isLoading, setIsLoading] = useState(false)

  const simulateLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 3000)
  }

  return (
    <div className="space-y-8 p-6">
      <div className="text-center">
        <H3>Loading Animation Demo</H3>
        <BodyLarge className="mt-2 text-muted-foreground">
          Custom loading animation using the Elevation AI logo
        </BodyLarge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Primary Animation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg">
              <LoadingAnimation size={82} />
            </div>
            <BodyLarge className="mt-4 text-center text-muted-foreground">
              Full-featured animation with glow effects
            </BodyLarge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pulsing Variant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
              <PulsingLoadingAnimation size={82} />
            </div>
            <BodyLarge className="mt-4 text-center text-muted-foreground">
              Adds subtle pulsing to the glow effect
            </BodyLarge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Minimal Variant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg">
              <MinimalLoadingAnimation size={80} />
            </div>
            <BodyLarge className="mt-4 text-center text-muted-foreground">
              Clean, subtle animation for minimal interfaces
            </BodyLarge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loading Spinner Component</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg">
              <LogoLoadingSpinner size="md" />
            </div>
            <BodyLarge className="mt-4 text-center text-muted-foreground">
              Wrapper component with size variants
            </BodyLarge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <Button onClick={simulateLoading} disabled={isLoading}>
              {isLoading ? "Loading..." : "Simulate Loading"}
            </Button>
            
            {isLoading && (
            <div className="flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg">
              <LoadingAnimation size={82} />
            </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Size Variants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <LoadingAnimation size={60} />
              <BodyLarge className="mt-2 text-sm">Small</BodyLarge>
            </div>
            <div className="text-center">
              <LoadingAnimation size={100} />
              <BodyLarge className="mt-2 text-sm">Medium</BodyLarge>
            </div>
            <div className="text-center">
              <LoadingAnimation size={140} />
              <BodyLarge className="mt-2 text-sm">Large</BodyLarge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
