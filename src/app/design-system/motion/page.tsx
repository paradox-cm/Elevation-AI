"use client"


import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { H4, BodySmall } from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ResponsiveTabs, ResponsiveTabsContent, ResponsiveTabsList, ResponsiveTabsTrigger } from "@/components/ui/responsive-tabs"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import {
  easingCurves,
  durationScale,
  animationPrinciples,
  microInteractions,
  animationTypes,
  cssCustomProperties,
  tailwindClasses,
  accessibilityConsiderations,
  implementationExamples,
  usageGuidelines
} from "@/lib/motion-config"

export default function MotionPage() {
  const [activeEasing, setActiveEasing] = useState("ease-out")
  const [isAnimating, setIsAnimating] = useState(false)

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container>
          <Section paddingY="xl">
            <PageHeader
              title="Motion & Animation"
              description="Comprehensive animation system with timing, easing, and micro-interactions for creating polished, accessible user experiences."
              size="lg"
              centered
            />
          </Section>
          
          <Section paddingY="lg">
            <ResponsiveTabs defaultValue="principles" className="space-y-8">
              <ResponsiveTabsList className="grid w-full grid-cols-4">
                <ResponsiveTabsTrigger value="principles">Principles</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="timing">Timing</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="interactions">Interactions</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="implementation">Implementation</ResponsiveTabsTrigger>
              </ResponsiveTabsList>

              {/* Principles Tab */}
              <ResponsiveTabsContent value="principles" className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name="lightbulb-line" className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Animation Principles</CardTitle>
                        <CardDescription>
                          Core principles that guide our animation decisions and ensure consistent, purposeful motion.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {animationPrinciples.map((principle) => (
                        <div key={principle.title} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                            <Icon name={principle.icon} className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <H4 className="mb-2">{principle.title}</H4>
                            <BodySmall className="text-muted-foreground mb-3">
                              {principle.description}
                            </BodySmall>
                            <div className="space-y-1">
                              {principle.examples.map((example) => (
                                <BodySmall key={example} className="text-muted-foreground">
                                  • {example}
                                </BodySmall>
                              ))}
                            </div>
                            <div className="mt-2">
                              <Badge variant="outline" className="text-xs">
                                {principle.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Icon name="layers-line" className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <CardTitle>Animation Types</CardTitle>
                        <CardDescription>
                          Common animation patterns and their appropriate use cases.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      {animationTypes.map((type) => (
                        <div key={type.name} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <H4>{type.name}</H4>
                              <Badge variant="secondary">{type.category}</Badge>
                            </div>
                            <BodySmall className="text-muted-foreground mb-3">
                              {type.description}
                            </BodySmall>
                            <div className="space-y-2">
                              <div>
                                <BodySmall className="font-medium mb-1">Examples:</BodySmall>
                                <div className="flex flex-wrap gap-1">
                                  {type.examples.map((example) => (
                                    <Badge key={example} variant="outline" className="text-xs">
                                      {example}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <BodySmall className="font-medium mb-1">Best Practices:</BodySmall>
                                <div className="space-y-1">
                                  {type.bestPractices.map((practice, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                                      <BodySmall className="text-xs">{practice}</BodySmall>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon name="check-line" className="h-5 w-5 text-green-500" />
                        <span>Do</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {usageGuidelines.do.map((guideline, index) => (
                          <BodySmall key={index}>✓ {guideline}</BodySmall>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon name="close-line" className="h-5 w-5 text-red-500" />
                        <span>Don&apos;t</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {usageGuidelines.dont.map((guideline, index) => (
                          <BodySmall key={index}>✗ {guideline}</BodySmall>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ResponsiveTabsContent>

              {/* Timing Tab */}
              <ResponsiveTabsContent value="timing" className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <Icon name="time-line" className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <CardTitle>Duration Scale</CardTitle>
                        <CardDescription>
                          Standardized duration values for consistent animation timing across the interface.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      {durationScale.map((duration) => (
                        <div key={duration.name} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-shrink-0">
                            <div className={`w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center ${duration.class} transition-all`}>
                              <Icon name="time-line" className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <H4>{duration.name}</H4>
                              <Badge variant="secondary" className="font-mono">
                                {duration.class}
                              </Badge>
                            </div>
                            <BodySmall className="text-muted-foreground mb-3">
                              {duration.description}
                            </BodySmall>
                            <div>
                              <BodySmall className="font-medium mb-1">Usage:</BodySmall>
                              <div className="space-y-1">
                                {duration.usage.map((usage, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                                    <BodySmall className="text-xs">{usage}</BodySmall>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Icon name="function-line" className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <CardTitle>Easing Curves</CardTitle>
                        <CardDescription>
                          Different easing functions that control how animations accelerate and decelerate.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {easingCurves.map((easing) => (
                        <Button
                          key={easing.name}
                          variant={activeEasing === easing.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveEasing(easing.value)}
                        >
                          {easing.name}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <H4>Easing Preview</H4>
                      <div className="relative h-20 bg-muted rounded-lg overflow-hidden">
                        <div 
                          className={`absolute top-4 w-8 h-8 bg-primary rounded-full transition-all duration-1000 ${activeEasing === 'linear' ? 'ease-linear' : activeEasing === 'ease-in' ? 'ease-in' : activeEasing === 'ease-out' ? 'ease-out' : activeEasing === 'ease-in-out' ? 'ease-in-out' : ''}`}
                          style={{
                            left: isAnimating ? 'calc(100% - 2rem)' : '0.5rem',
                            transitionTimingFunction: activeEasing === 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' : undefined
                          }}
                        />
                      </div>
                      <Button 
                        onClick={() => {
                          setIsAnimating(true)
                          setTimeout(() => setIsAnimating(false), 1000)
                        }}
                        className="w-full"
                      >
                        Animate Ball
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {easingCurves.map((easing) => (
                        <div key={easing.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <H4 className="text-sm">{easing.name}</H4>
                            <Badge variant="secondary" className="text-xs font-mono">
                              {easing.value}
                            </Badge>
                          </div>
                          <BodySmall className="text-muted-foreground mb-2">
                            {easing.description}
                          </BodySmall>
                          <div>
                            <BodySmall className="font-medium mb-1">Usage:</BodySmall>
                            <div className="space-y-1">
                              {easing.usage.map((usage, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                                  <BodySmall className="text-xs">{usage}</BodySmall>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Interactions Tab */}
              <ResponsiveTabsContent value="interactions" className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-500/10 rounded-lg">
                        <Icon name="magic-line" className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div>
                        <CardTitle>Micro-Interactions</CardTitle>
                        <CardDescription>
                          Small, purposeful animations that provide feedback and enhance the user experience.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      {microInteractions.map((interaction) => (
                        <div key={interaction.name} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <H4>{interaction.name}</H4>
                              <Badge variant="secondary">{interaction.duration}</Badge>
                            </div>
                            <BodySmall className="text-muted-foreground mb-3">
                              {interaction.description}
                            </BodySmall>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-4">
                                <BodySmall className="font-medium">Trigger:</BodySmall>
                                <Badge variant="outline">{interaction.trigger}</Badge>
                                <BodySmall className="font-medium">Duration:</BodySmall>
                                <Badge variant="outline">{interaction.duration}</Badge>
                              </div>
                              <div>
                                <BodySmall className="font-medium mb-1">Examples:</BodySmall>
                                <div className="flex flex-wrap gap-1">
                                  {interaction.examples.map((example) => (
                                    <Badge key={example} variant="outline" className="text-xs">
                                      {example}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <Icon name="play-circle-line" className="h-5 w-5 text-indigo-500" />
                      </div>
                      <div>
                        <CardTitle>Interactive Examples</CardTitle>
                        <CardDescription>
                          See micro-interactions in action with real component examples.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <H4>Button Interactions</H4>
                        <div className="space-y-3">
                          <Button className="transition-all duration-150 hover:scale-105 hover:shadow-md">
                            Hover Me
                          </Button>
                          <Button variant="outline" className="transition-all duration-200 hover:bg-primary hover:text-primary-foreground">
                            Color Transition
                          </Button>
                          <Button variant="secondary" className="transition-all duration-300 hover:rotate-1">
                            Subtle Rotation
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <H4>Form Interactions</H4>
                        <div className="space-y-3">
                          <Input 
                            placeholder="Focus me for animation"
                            className="transition-all duration-200 focus:scale-[1.02] focus:shadow-md"
                          />
                          <div className="flex items-center space-x-2">
                            <Switch />
                            <BodySmall>Toggle with smooth transition</BodySmall>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Icon name="loader-line" className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <CardTitle>Loading States</CardTitle>
                        <CardDescription>
                          Smooth loading animations that keep users engaged during wait times.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <H4>Pulse Animation</H4>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                          <BodySmall>Loading...</BodySmall>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <H4>Spin Animation</H4>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          <BodySmall>Processing...</BodySmall>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <H4>Bounce Animation</H4>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
                          <BodySmall>Updating...</BodySmall>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Implementation Tab */}
              <ResponsiveTabsContent value="implementation" className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Icon name="code-line" className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <CardTitle>CSS Custom Properties</CardTitle>
                        <CardDescription>
                          CSS variables for consistent animation timing and easing across your application.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">/* {cssCustomProperties.description} */</div>
                      <div className="text-muted-foreground">/* Timing variables */</div>
                      {cssCustomProperties.timing.map((timing, index) => (
                        <div key={index}>{timing};</div>
                      ))}
                      <div></div>
                      <div className="text-muted-foreground">/* Easing functions */</div>
                      {cssCustomProperties.easing.map((easing, index) => (
                        <div key={index}>{easing};</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <Icon name="settings-line" className="h-5 w-5 text-cyan-500" />
                      </div>
                      <div>
                        <CardTitle>Tailwind CSS Classes</CardTitle>
                        <CardDescription>
                          Utility classes for implementing animations in your components.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">/* {tailwindClasses.description} */</div>
                      <div className="text-muted-foreground">/* Duration utilities */</div>
                      {tailwindClasses.duration.map((duration, index) => (
                        <div key={index}>{duration}</div>
                      ))}
                      <div></div>
                      <div className="text-muted-foreground">/* Easing utilities */</div>
                      {tailwindClasses.easing.map((easing, index) => (
                        <div key={index}>{easing}</div>
                      ))}
                      <div></div>
                      <div className="text-muted-foreground">/* Animation utilities */</div>
                      {tailwindClasses.animations.map((animation, index) => (
                        <div key={index}>{animation}</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <Icon name="reactjs-line" className="h-5 w-5 text-indigo-500" />
                      </div>
                      <div>
                        <CardTitle>React Component Example</CardTitle>
                        <CardDescription>
                          How to implement animations in React components with proper accessibility.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <H4 className="mb-3">Animated Button Component</H4>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        <div className="text-muted-foreground">/* {implementationExamples.reactComponent.description} */</div>
                        {implementationExamples.reactComponent.code.split('\n').map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <H4 className="mb-3">Reduced Motion Hook</H4>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        <div className="text-muted-foreground">/* {implementationExamples.reducedMotionHook.description} */</div>
                        {implementationExamples.reducedMotionHook.code.split('\n').map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Accessibility Considerations</CardTitle>
                    <CardDescription>
                      Ensuring animations are accessible and respect user preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <H4 className="mb-3">{accessibilityConsiderations.motion.title}</H4>
                        <div className="space-y-2">
                          {accessibilityConsiderations.motion.points.map((point, index) => (
                            <BodySmall key={index}>• {point}</BodySmall>
                          ))}
                        </div>
                      </div>
                      <div>
                        <H4 className="mb-3">{accessibilityConsiderations.performance.title}</H4>
                        <div className="space-y-2">
                          {accessibilityConsiderations.performance.points.map((point, index) => (
                            <BodySmall key={index}>• {point}</BodySmall>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>
            </ResponsiveTabs>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
