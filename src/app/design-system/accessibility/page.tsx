"use client"


import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { H4, BodySmall } from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"

export default function AccessibilityPage() {



  const wcagLevels = [
    {
      name: "WCAG A",
      description: "Basic accessibility requirements",
      compliance: "Minimum compliance level",
      examples: ["Keyboard navigation", "Alt text for images", "Form labels"]
    },
    {
      name: "WCAG AA",
      description: "Standard accessibility requirements",
      compliance: "Recommended compliance level",
      examples: ["Color contrast ratios", "Focus indicators", "Error identification"]
    },
    {
      name: "WCAG AAA",
      description: "Enhanced accessibility requirements",
      compliance: "Highest compliance level",
      examples: ["Enhanced contrast", "Sign language", "Extended time limits"]
    }
  ]

  const accessibilityPrinciples = [
    {
      title: "Perceivable",
      description: "Information and user interface components must be presentable to users in ways they can perceive.",
      icon: "eye-line",
      guidelines: [
        "Provide text alternatives for non-text content",
        "Create content that can be presented in different ways",
        "Make it easier for users to see and hear content"
      ]
    },
    {
      title: "Operable",
      description: "User interface components and navigation must be operable by all users.",
      icon: "mouse-line",
      guidelines: [
        "Make all functionality available from a keyboard",
        "Provide users enough time to read and use content",
        "Do not design content that could cause seizures"
      ]
    },
    {
      title: "Understandable",
      description: "Information and operation of user interface must be understandable.",
      icon: "lightbulb-line",
      guidelines: [
        "Make text readable and understandable",
        "Make web pages appear and operate in predictable ways",
        "Help users avoid and correct mistakes"
      ]
    },
    {
      title: "Robust",
      description: "Content must be robust enough to be interpreted by a wide variety of user agents.",
      icon: "shield-check-line",
      guidelines: [
        "Maximize compatibility with current and future user tools",
        "Ensure content works with assistive technologies",
        "Use valid HTML and semantic markup"
      ]
    }
  ]

  const colorContrastExamples = [
    {
      name: "Normal Text",
      ratio: "4.5:1",
      description: "Minimum contrast for normal text",
      examples: ["Body text", "Paragraphs", "Descriptions"]
    },
    {
      name: "Large Text",
      ratio: "3:1",
      description: "Minimum contrast for large text (18pt+)",
      examples: ["Headings", "Large buttons", "Display text"]
    },
    {
      name: "UI Components",
      ratio: "3:1",
      description: "Minimum contrast for UI elements",
      examples: ["Icons", "Form borders", "Interactive elements"]
    }
  ]

  const keyboardNavigationExamples = [
    {
      name: "Tab Navigation",
      description: "All interactive elements must be reachable via keyboard",
      examples: ["Buttons", "Links", "Form inputs", "Custom controls"]
    },
    {
      name: "Focus Indicators",
      description: "Clear visual indication of keyboard focus",
      examples: ["Focus rings", "Highlighted states", "Outline indicators"]
    },
    {
      name: "Skip Links",
      description: "Allow users to skip to main content",
      examples: ["Skip to main content", "Skip to navigation", "Skip to footer"]
    }
  ]

  const testingTools = [
    {
      name: "axe DevTools",
      description: "Browser extension for automated accessibility testing",
      features: ["Automated testing", "Issue reporting", "WCAG compliance"]
    },
    {
      name: "WAVE",
      description: "Web accessibility evaluation tool",
      features: ["Visual feedback", "Detailed reports", "Educational content"]
    },
    {
      name: "Lighthouse",
      description: "Google's automated testing tool",
      features: ["Performance metrics", "Accessibility scoring", "Best practices"]
    },
    {
      name: "Screen Readers",
      description: "Test with actual assistive technology",
      features: ["NVDA", "JAWS", "VoiceOver", "TalkBack"]
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
              title="Accessibility Guidelines"
              description="Comprehensive accessibility standards and best practices for creating inclusive, WCAG-compliant interfaces that work for everyone."
              size="lg"
              centered
            />
          </Section>
          
          <Section paddingY="lg">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
                <TabsTrigger value="testing">Testing</TabsTrigger>
                <TabsTrigger value="implementation">Implementation</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>WCAG Compliance Levels</CardTitle>
                    <CardDescription>
                      Understanding the different levels of Web Content Accessibility Guidelines (WCAG) compliance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {wcagLevels.map((level) => (
                        <div key={level.name} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <H4>{level.name}</H4>
                            <Badge variant={level.name === "WCAG AA" ? "default" : "secondary"}>
                              {level.compliance}
                            </Badge>
                          </div>
                          
                          <BodySmall className="text-muted-foreground">
                            {level.description}
                          </BodySmall>
                          
                          <div className="space-y-2">
                            <BodySmall className="font-medium">Examples:</BodySmall>
                            <div className="space-y-1">
                              {level.examples.map((example) => (
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
                    <CardTitle>Accessibility Principles</CardTitle>
                    <CardDescription>
                      The four core principles of web accessibility that guide our design decisions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {accessibilityPrinciples.map((principle) => (
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
                              {principle.guidelines.map((guideline) => (
                                <BodySmall key={guideline} className="text-muted-foreground">
                                  • {guideline}
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
                    <CardTitle>Why Accessibility Matters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <H4 className="mb-3">Legal Requirements</H4>
                        <div className="space-y-2">
                          <BodySmall>• ADA compliance for public services</BodySmall>
                          <BodySmall>• Section 508 for federal agencies</BodySmall>
                          <BodySmall>• International accessibility laws</BodySmall>
                          <BodySmall>• Risk of legal action and lawsuits</BodySmall>
                        </div>
                      </div>
                      <div>
                        <H4 className="mb-3">Business Benefits</H4>
                        <div className="space-y-2">
                          <BodySmall>• Reach broader audience (15% of world population)</BodySmall>
                          <BodySmall>• Improved SEO and search rankings</BodySmall>
                          <BodySmall>• Better user experience for everyone</BodySmall>
                          <BodySmall>• Enhanced brand reputation</BodySmall>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Guidelines Tab */}
              <TabsContent value="guidelines" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Color Contrast Guidelines</CardTitle>
                    <CardDescription>
                      Ensuring sufficient color contrast for text and interactive elements.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {colorContrastExamples.map((contrast) => (
                        <div key={contrast.name} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <H4>{contrast.name}</H4>
                            <Badge variant="secondary">{contrast.ratio}</Badge>
                          </div>
                          
                          <BodySmall className="text-muted-foreground">
                            {contrast.description}
                          </BodySmall>
                          
                          <div className="space-y-1">
                            {contrast.examples.map((example) => (
                              <BodySmall key={example} className="text-muted-foreground">
                                • {example}
                              </BodySmall>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Keyboard Navigation</CardTitle>
                    <CardDescription>
                      Ensuring all functionality is accessible via keyboard navigation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      {keyboardNavigationExamples.map((nav) => (
                        <div key={nav.name} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <H4>{nav.name}</H4>
                              <Badge variant="secondary">Required</Badge>
                            </div>
                            <BodySmall className="text-muted-foreground mb-3">
                              {nav.description}
                            </BodySmall>
                            <div className="flex flex-wrap gap-1">
                              {nav.examples.map((example) => (
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
                        <BodySmall>✓ Use semantic HTML elements</BodySmall>
                        <BodySmall>✓ Provide alt text for images</BodySmall>
                        <BodySmall>✓ Ensure sufficient color contrast</BodySmall>
                        <BodySmall>✓ Test with keyboard navigation</BodySmall>
                        <BodySmall>✓ Use descriptive link text</BodySmall>
                        <BodySmall>✓ Provide focus indicators</BodySmall>
                        <BodySmall>✓ Test with screen readers</BodySmall>
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
                        <BodySmall>✗ Rely solely on color to convey information</BodySmall>
                        <BodySmall>✗ Use generic link text like &quot;click here&quot;</BodySmall>
                        <BodySmall>✗ Create keyboard traps</BodySmall>
                        <BodySmall>✗ Use images without alt text</BodySmall>
                        <BodySmall>✗ Remove focus indicators</BodySmall>
                        <BodySmall>✗ Use low contrast text</BodySmall>
                        <BodySmall>✗ Create flashing content</BodySmall>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Common Accessibility Issues</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <H4 className="mb-3">Visual Issues</H4>
                        <div className="space-y-2">
                          <BodySmall>• Insufficient color contrast</BodySmall>
                          <BodySmall>• Missing focus indicators</BodySmall>
                          <BodySmall>• Small text that&apos;s hard to read</BodySmall>
                          <BodySmall>• Images without alt text</BodySmall>
                        </div>
                      </div>
                      <div>
                        <H4 className="mb-3">Interaction Issues</H4>
                        <div className="space-y-2">
                          <BodySmall>• Elements not keyboard accessible</BodySmall>
                          <BodySmall>• Missing form labels</BodySmall>
                          <BodySmall>• No error identification</BodySmall>
                          <BodySmall>• Complex navigation structures</BodySmall>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Testing Tab */}
              <TabsContent value="testing" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Testing Tools & Methods</CardTitle>
                    <CardDescription>
                      Tools and techniques for testing accessibility compliance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      {testingTools.map((tool) => (
                        <div key={tool.name} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <H4>{tool.name}</H4>
                              <Badge variant="secondary">Tool</Badge>
                            </div>
                            <BodySmall className="text-muted-foreground mb-3">
                              {tool.description}
                            </BodySmall>
                            <div className="flex flex-wrap gap-1">
                              {tool.features.map((feature) => (
                                <Badge key={feature} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
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
                    <CardTitle>Manual Testing Checklist</CardTitle>
                    <CardDescription>
                      Essential manual tests to perform during development.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <H4 className="mb-3">Keyboard Testing</H4>
                        <div className="space-y-2">
                          <BodySmall>• Tab through all interactive elements</BodySmall>
                          <BodySmall>• Verify focus indicators are visible</BodySmall>
                          <BodySmall>• Test all functionality with keyboard</BodySmall>
                          <BodySmall>• Check for keyboard traps</BodySmall>
                        </div>
                      </div>
                      <div>
                        <H4 className="mb-3">Screen Reader Testing</H4>
                        <div className="space-y-2">
                          <BodySmall>• Test with NVDA or VoiceOver</BodySmall>
                          <BodySmall>• Verify proper heading structure</BodySmall>
                          <BodySmall>• Check alt text for images</BodySmall>
                          <BodySmall>• Test form labels and errors</BodySmall>
                        </div>
                      </div>
                      <div>
                        <H4 className="mb-3">Visual Testing</H4>
                        <div className="space-y-2">
                          <BodySmall>• Test with high contrast mode</BodySmall>
                          <BodySmall>• Zoom to 200% and test layout</BodySmall>
                          <BodySmall>• Check color contrast ratios</BodySmall>
                          <BodySmall>• Test with grayscale filter</BodySmall>
                        </div>
                      </div>
                      <div>
                        <H4 className="mb-3">Content Testing</H4>
                        <div className="space-y-2">
                          <BodySmall>• Verify descriptive link text</BodySmall>
                          <BodySmall>• Check form error messages</BodySmall>
                          <BodySmall>• Test skip navigation links</BodySmall>
                          <BodySmall>• Verify page titles and headings</BodySmall>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Automated Testing Integration</CardTitle>
                    <CardDescription>
                      How to integrate accessibility testing into your development workflow.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">&#123;/* Example: Jest + axe-core integration */&#125;</div>
                      <div>import &#123; axe, toHaveNoViolations &#125; from &apos;jest-axe&apos;;</div>
                      <div></div>
                      <div>expect.extend(toHaveNoViolations);</div>
                      <div></div>
                      <div>test(&apos;should not have accessibility violations&apos;, async () =&gt; &#123;</div>
                      <div>  const &#123; container &#125; = render(&lt;MyComponent /&gt;);</div>
                      <div>  const results = await axe(container);</div>
                      <div>  expect(results).toHaveNoViolations();</div>
                      <div>&#125;);</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Implementation Tab */}
              <TabsContent value="implementation" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Semantic HTML</CardTitle>
                    <CardDescription>
                      Using proper HTML semantics for better accessibility.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <H4 className="mb-3">Good Examples</H4>
                        <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                          <div>&lt;button&gt;Submit Form&lt;/button&gt;</div>
                          <div>&lt;nav&gt;&lt;ul&gt;&lt;li&gt;&lt;a&gt;Home&lt;/a&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/nav&gt;</div>
                          <div>&lt;main&gt;&lt;h1&gt;Page Title&lt;/h1&gt;&lt;/main&gt;</div>
                          <div>&lt;label for=&quot;email&quot;&gt;Email:&lt;/label&gt;</div>
                          <div>&lt;input id=&quot;email&quot; type=&quot;email&quot; /&gt;</div>
                        </div>
                      </div>
                      <div>
                        <H4 className="mb-3">Bad Examples</H4>
                        <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                          <div>&lt;div onClick=&quot;submit()&quot;&gt;Submit&lt;/div&gt;</div>
                          <div>&lt;div&gt;&lt;div&gt;&lt;div&gt;Home&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;</div>
                          <div>&lt;div&gt;&lt;div&gt;Page Title&lt;/div&gt;&lt;/div&gt;</div>
                          <div>&lt;div&gt;Email:&lt;/div&gt;</div>
                          <div>&lt;input type=&quot;email&quot; /&gt;</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>ARIA Attributes</CardTitle>
                    <CardDescription>
                      Using ARIA attributes to enhance accessibility when HTML semantics aren&apos;t sufficient.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      <div>
                        <H4 className="mb-3">Common ARIA Attributes</H4>
                        <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                                                      <div className="text-muted-foreground">&#123;/* Roles */&#125;</div>
                          <div>role=&quot;button&quot;</div>
                          <div>role=&quot;navigation&quot;</div>
                          <div>role=&quot;main&quot;</div>
                          <div>role=&quot;dialog&quot;</div>
                          <div></div>
                                                      <div className="text-muted-foreground">&#123;/* States */&#125;</div>
                          <div>aria-expanded=&quot;true&quot;</div>
                          <div>aria-hidden=&quot;true&quot;</div>
                          <div>aria-selected=&quot;false&quot;</div>
                          <div></div>
                                                      <div className="text-muted-foreground">&#123;/* Labels */&#125;</div>
                          <div>aria-label=&quot;Close dialog&quot;</div>
                          <div>aria-labelledby=&quot;dialog-title&quot;</div>
                          <div>aria-describedby=&quot;dialog-description&quot;</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Focus Management</CardTitle>
                    <CardDescription>
                      Proper focus management for keyboard navigation and screen readers.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <H4 className="mb-3">Focus Indicators</H4>
                        <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                          <div className="text-muted-foreground">&#123;/* Custom focus styles */&#125;</div>
                          <div>.button:focus &#123;</div>
                          <div>  outline: 2px solid var(--primary);</div>
                          <div>  outline-offset: 2px;</div>
                          <div>&#125;</div>
                        </div>
                      </div>
                      <div>
                        <H4 className="mb-3">Focus Trapping</H4>
                        <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                          <div className="text-muted-foreground">&#123;/* Modal focus trap */&#125;</div>
                          <div>const focusableElements =</div>
                          <div>  modal.querySelectorAll(</div>
                          <div>    &apos;button, [href], input, select, textarea, [tabindex]:not([tabindex=&quot;-1&quot;])&apos;</div>
                          <div>  );</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Error Handling</CardTitle>
                    <CardDescription>
                      Providing clear error messages and validation feedback.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <H4 className="mb-3">Form Validation</H4>
                        <div className="space-y-3">
                          <Input 
                            placeholder="Email address"
                            aria-describedby="email-error"
                            aria-invalid="true"
                          />
                          <div id="email-error" className="text-sm text-red-500">
                            Please enter a valid email address
                          </div>
                        </div>
                      </div>
                      <div>
                        <H4 className="mb-3">Live Regions</H4>
                        <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                          <div>&lt;div aria-live=&quot;polite&quot;&gt;</div>
                          <div>  Status messages appear here</div>
                          <div>&lt;/div&gt;</div>
                          <div></div>
                          <div>&lt;div aria-live=&quot;assertive&quot;&gt;</div>
                          <div>  Important alerts appear here</div>
                          <div>&lt;/div&gt;</div>
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
