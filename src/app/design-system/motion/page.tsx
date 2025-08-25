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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"

export default function MotionPage() {
  const [activeEasing, setActiveEasing] = useState("ease-out")
  const [isAnimating, setIsAnimating] = useState(false)



  const easingCurves = [
    {
      name: "Linear",
      value: "linear",
      description: "Constant speed, no acceleration",
      usage: "Simple progress indicators, loading bars"
    },
    {
      name: "Ease In",
      value: "ease-in",
      description: "Slow start, fast finish",
      usage: "Elements entering the screen, expanding content"
    },
    {
      name: "Ease Out",
      value: "ease-out",
      description: "Fast start, slow finish",
      usage: "Elements leaving the screen, collapsing content"
    },
    {
      name: "Ease In Out",
      value: "ease-in-out",
      description: "Slow start and finish, fast middle",
      usage: "Most UI interactions, button presses"
    },
    {
      name: "Bounce",
      value: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      description: "Playful bounce effect",
      usage: "Success states, celebratory interactions"
    }
  ]

  const durationScale = [
    {
      name: "Instant",
      value: "0ms",
      class: "duration-0",
      description: "No animation, immediate change",
      usage: "Critical feedback, error states"
    },
    {
      name: "Fast",
      value: "150ms",
      class: "duration-150",
      description: "Quick, snappy transitions",
      usage: "Hover states, micro-interactions"
    },
    {
      name: "Normal",
      value: "300ms",
      class: "duration-300",
      description: "Standard transition speed",
      usage: "Most UI interactions, button presses"
    },
    {
      name: "Slow",
      value: "500ms",
      class: "duration-500",
      description: "Smooth, deliberate transitions",
      usage: "Page transitions, modal animations"
    },
    {
      name: "Very Slow",
      value: "700ms",
      class: "duration-700",
      description: "Slow, dramatic animations",
      usage: "Hero animations, attention-grabbing elements"
    }
  ]

  const animationPrinciples = [
    {
      title: "Purposeful",
      description: "Every animation should serve a clear purpose and enhance the user experience.",
      icon: "target-line",
      examples: ["Providing feedback", "Guiding attention", "Showing relationships"]
    },
    {
      title: "Subtle",
      description: "Animations should be noticeable but not distracting or overwhelming.",
      icon: "eye-line",
      examples: ["Gentle transitions", "Appropriate timing", "Smooth easing"]
    },
    {
      title: "Consistent",
      description: "Use consistent animation patterns throughout your interface.",
      icon: "grid-line",
      examples: ["Standard durations", "Consistent easing", "Unified patterns"]
    },
    {
      title: "Accessible",
      description: "Respect user preferences and provide options to reduce motion.",
      icon: "heart-line",
      examples: ["Reduced motion support", "No motion preferences", "Performance considerations"]
    }
  ]

  const microInteractions = [
    {
      name: "Button Hover",
      description: "Subtle scale and shadow changes on hover",
      trigger: "Hover",
      duration: "150ms"
    },
    {
      name: "Form Focus",
      description: "Smooth border color and shadow transitions",
      trigger: "Focus",
      duration: "200ms"
    },
    {
      name: "Loading States",
      description: "Gentle pulse or spin animations",
      trigger: "Loading",
      duration: "1000ms"
    },
    {
      name: "Success Feedback",
      description: "Quick scale and color change",
      trigger: "Success",
      duration: "300ms"
    },
    {
      name: "Error States",
      description: "Gentle shake animation",
      trigger: "Error",
      duration: "500ms"
    }
  ]

  const animationTypes = [
    {
      name: "Fade",
      description: "Opacity transitions for smooth appearance/disappearance",
      examples: ["Modal overlays", "Tooltips", "Loading states"]
    },
    {
      name: "Slide",
      description: "Position-based animations for directional movement",
      examples: ["Navigation menus", "Sidebars", "Page transitions"]
    },
    {
      name: "Scale",
      description: "Size changes for emphasis and feedback",
      examples: ["Button interactions", "Card hover effects", "Focus states"]
    },
    {
      name: "Rotate",
      description: "Rotation for loading and directional indicators",
      examples: ["Loading spinners", "Expand/collapse icons", "Direction indicators"]
    }
  ]

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
            <Tabs defaultValue="principles" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="principles">Principles</TabsTrigger>
                <TabsTrigger value="timing">Timing</TabsTrigger>
                <TabsTrigger value="interactions">Interactions</TabsTrigger>
                <TabsTrigger value="implementation">Implementation</TabsTrigger>
              </TabsList>

              {/* Principles Tab */}
              <TabsContent value="principles" className="space-y-8">
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
                              <Badge variant="secondary">Animation Type</Badge>
                            </div>
                            <BodySmall className="text-muted-foreground mb-3">
                              {type.description}
                            </BodySmall>
                            <div className="flex flex-wrap gap-1">
                              {type.examples.map((example) => (
                                <Badge key={example} variant="outline" className="text-xs">
                                  {example}
                                </Badge>
                              ))}
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
                        <BodySmall>✓ Use animations to provide feedback</BodySmall>
                        <BodySmall>✓ Keep animations subtle and purposeful</BodySmall>
                        <BodySmall>✓ Maintain consistent timing and easing</BodySmall>
                        <BodySmall>✓ Respect reduced motion preferences</BodySmall>
                        <BodySmall>✓ Test performance on slower devices</BodySmall>
                        <BodySmall>✓ Use animations to guide user attention</BodySmall>
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
                        <BodySmall>✗ Animate everything just because you can</BodySmall>
                        <BodySmall>✗ Use overly long or complex animations</BodySmall>
                        <BodySmall>✗ Ignore user motion preferences</BodySmall>
                        <BodySmall>✗ Create animations that cause motion sickness</BodySmall>
                        <BodySmall>✗ Use animations to hide poor UX</BodySmall>
                        <BodySmall>✗ Ignore performance implications</BodySmall>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Timing Tab */}
              <TabsContent value="timing" className="space-y-8">
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
                              <BodySmall className="text-muted-foreground">{duration.usage}</BodySmall>
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
                          <BodySmall className="text-muted-foreground">
                            {easing.description}
                          </BodySmall>
                          <BodySmall className="text-muted-foreground">
                            <strong>Usage:</strong> {easing.usage}
                          </BodySmall>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Interactions Tab */}
              <TabsContent value="interactions" className="space-y-8">
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
                            <div className="flex items-center space-x-4">
                              <BodySmall className="font-medium">Trigger:</BodySmall>
                              <Badge variant="outline">{interaction.trigger}</Badge>
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
              </TabsContent>

              {/* Implementation Tab */}
              <TabsContent value="implementation" className="space-y-8">
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
                      <div className="text-muted-foreground">/* Animation timing variables */</div>
                      <div>--duration-fast: 150ms;</div>
                      <div>--duration-normal: 300ms;</div>
                      <div>--duration-slow: 500ms;</div>
                      <div></div>
                      <div className="text-muted-foreground">/* Easing functions */</div>
                      <div>--ease-out: cubic-bezier(0, 0, 0.2, 1);</div>
                      <div>--ease-in: cubic-bezier(0.4, 0, 1, 1);</div>
                      <div>--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);</div>
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
                      <div className="text-muted-foreground">/* Duration utilities */</div>
                      <div>duration-150 → transition-duration: 150ms;</div>
                      <div>duration-300 → transition-duration: 300ms;</div>
                      <div>duration-500 → transition-duration: 500ms;</div>
                      <div></div>
                      <div className="text-muted-foreground">/* Easing utilities */</div>
                      <div>ease-out → transition-timing-function: cubic-bezier(0, 0, 0.2, 1);</div>
                      <div>ease-in → transition-timing-function: cubic-bezier(0.4, 0, 1, 1);</div>
                      <div>ease-in-out → transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);</div>
                      <div></div>
                      <div className="text-muted-foreground">/* Animation utilities */</div>
                      <div>animate-pulse → pulsing animation</div>
                      <div>animate-spin → spinning animation</div>
                      <div>animate-bounce → bouncing animation</div>
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
                        <div className="text-muted-foreground">&#123;/* Animated button with accessibility */&#125;</div>
                        <div>function AnimatedButton(&#123; children, className, ...props &#125;) &#123;</div>
                        <div>  const [isPressed, setIsPressed] = useState(false)</div>
                        <div></div>
                        <div>  return (</div>
                        <div>    &lt;button</div>
                        <div>      className=&#123;cn(</div>
                        <div>        &quot;transition-all duration-150 ease-out&quot;,</div>
                        <div>        &quot;hover:scale-105 hover:shadow-md&quot;,</div>
                        <div>        &quot;active:scale-95&quot;,</div>
                        <div>        &quot;focus-visible:ring-2 focus-visible:ring-ring&quot;,</div>
                        <div>        className</div>
                        <div>      )&#125;</div>
                                                 <div>      onMouseDown=&#123;() =&gt; setIsPressed(true)&#125;</div>
                                                 <div>      onMouseUp=&#123;() =&gt; setIsPressed(false)&#125;</div>
                                                 <div>      onMouseLeave=&#123;() =&gt; setIsPressed(false)&#125;</div>
                        <div>      &#123;...props&#125;</div>
                        <div>    &gt;</div>
                        <div>      &#123;children&#125;</div>
                        <div>    &lt;/button&gt;</div>
                        <div>  )</div>
                        <div>&#125;</div>
                      </div>
                    </div>

                    <div>
                      <H4 className="mb-3">Reduced Motion Hook</H4>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        <div className="text-muted-foreground">&#123;/* Hook to respect user motion preferences */&#125;</div>
                        <div>function useReducedMotion() &#123;</div>
                        <div>  const [prefersReduced, setPrefersReduced] = useState(false)</div>
                        <div></div>
                                                 <div>  useEffect(() =&gt; &#123;</div>
                        <div>    const mediaQuery = window.matchMedia(&apos;(prefers-reduced-motion: reduce)&apos;)</div>
                        <div>    setPrefersReduced(mediaQuery.matches)</div>
                        <div></div>
                                                                         <div>    const handleChange = (e) =&gt; setPrefersReduced(e.matches)</div>
                        <div>    mediaQuery.addEventListener(&apos;change&apos;, handleChange)</div>
                        <div>    return () =&gt; mediaQuery.removeEventListener(&apos;change&apos;, handleChange)</div>
                        <div>  &#125;, [])</div>
                        <div></div>
                        <div>  return prefersReduced</div>
                        <div>&#125;</div>
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
                        <H4 className="mb-3">Motion Preferences</H4>
                        <div className="space-y-2">
                          <BodySmall>• Respect `prefers-reduced-motion` media query</BodySmall>
                          <BodySmall>• Provide options to disable animations</BodySmall>
                          <BodySmall>• Test with motion-sensitive users</BodySmall>
                        </div>
                      </div>
                      <div>
                        <H4 className="mb-3">Performance</H4>
                        <div className="space-y-2">
                          <BodySmall>• Use `transform` and `opacity` for smooth animations</BodySmall>
                          <BodySmall>• Avoid animating layout-triggering properties</BodySmall>
                          <BodySmall>• Test on lower-end devices</BodySmall>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
