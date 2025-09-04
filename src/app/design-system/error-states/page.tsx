"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { H3, H4, BodySmall } from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ResponsiveTabs, ResponsiveTabsContent, ResponsiveTabsList, ResponsiveTabsTrigger } from "@/components/ui/responsive-tabs"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { useErrorStatesConfig } from "@/hooks/use-error-states-config"

export default function ErrorStatesPage() {
  const {
    config,
    errorTypeConfig,
    validationPatternConfig,
    errorMessageConfig,
    feedbackTypeConfig,
    errorBoundaryConfig,
    formErrorConfig,
    alertConfig,
    emptyStateConfig
  } = useErrorStatesConfig()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    message: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)



  const errorTypes = [
    {
      name: "Validation Errors",
      description: "Errors that occur when user input doesn't meet requirements",
      icon: "error-warning-line",
      examples: ["Required fields", "Format validation", "Length constraints", "Pattern matching"]
    },
    {
      name: "System Errors",
      description: "Errors that occur due to technical issues or server problems",
      icon: "server-line",
      examples: ["Network failures", "Server errors", "Database issues", "API timeouts"]
    },
    {
      name: "User Errors",
      description: "Errors that occur due to user actions or decisions",
      icon: "user-line",
      examples: ["Incorrect credentials", "Invalid selections", "Permission denied", "Resource not found"]
    },
    {
      name: "Warning States",
      description: "Non-critical issues that users should be aware of",
      icon: "alert-line",
      examples: ["Deprecated features", "Performance warnings", "Storage limits", "Version updates"]
    }
  ]

  const feedbackTypes = [
    {
      name: "Success Feedback",
      description: "Positive confirmation when actions complete successfully",
      icon: "check-line",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      examples: ["Form submissions", "Data saves", "Account creation", "Payment processing"]
    },
    {
      name: "Error Feedback",
      description: "Clear indication when something goes wrong",
      icon: "close-line",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      examples: ["Validation failures", "Network errors", "Permission denied", "Invalid input"]
    },
    {
      name: "Warning Feedback",
      description: "Cautionary information about potential issues",
      icon: "alert-line",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      examples: ["Storage limits", "Deprecated features", "Performance issues", "Security warnings"]
    },
    {
      name: "Info Feedback",
      description: "Helpful information and guidance for users",
      icon: "information-line",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      examples: ["Feature announcements", "Help text", "Status updates", "Guidance messages"]
    }
  ]

  const validationPatterns = [
    {
      name: "Inline Validation",
      description: "Real-time validation as users type or interact with fields",
      pros: ["Immediate feedback", "Prevents form submission errors", "Better UX"],
      cons: ["Can be distracting", "Requires careful timing", "More complex implementation"]
    },
    {
      name: "On-Submit Validation",
      description: "Validation occurs when the form is submitted",
      pros: ["Simpler implementation", "Less distracting", "Clear error summary"],
      cons: ["Delayed feedback", "User frustration", "Multiple errors at once"]
    },
    {
      name: "On-Blur Validation",
      description: "Validation occurs when users leave a field",
      pros: ["Good balance", "Not too intrusive", "Clear context"],
      cons: ["May miss some errors", "Requires field interaction"]
    }
  ]

  const errorMessageGuidelines = [
    {
      title: "Be Clear and Specific",
      description: "Tell users exactly what went wrong and how to fix it",
      example: "❌ 'Error occurred' → ✅ 'Email address is invalid. Please enter a valid email format.'"
    },
    {
      title: "Use Positive Language",
      description: "Focus on what users can do rather than what they did wrong",
      example: "❌ 'You entered an invalid password' → ✅ 'Please enter a password with at least 8 characters'"
    },
    {
      title: "Provide Actionable Guidance",
      description: "Give users clear next steps to resolve the issue",
      example: "❌ 'File too large' → ✅ 'File size must be under 10MB. Please choose a smaller file.'"
    },
    {
      title: "Maintain Consistent Tone",
      description: "Use the same voice and style across all error messages",
      example: "Keep language professional but friendly, avoid technical jargon"
    }
  ]

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    
    // Validation logic
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    
    if (!formData.message) {
      newErrors.message = "Message is required"
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
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
              title="Error States & Feedback"
              description="Comprehensive error handling and user feedback system for creating clear, helpful, and accessible error experiences."
              size="lg"
              centered
            />
          </Section>

          <Section paddingY="lg">
            <ResponsiveTabs defaultValue="overview" className="space-y-8">
              <ResponsiveTabsList className="grid w-full grid-cols-4">
                <ResponsiveTabsTrigger value="overview">Overview</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="patterns">Patterns</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="examples">Examples</ResponsiveTabsTrigger>
                <ResponsiveTabsTrigger value="implementation">Implementation</ResponsiveTabsTrigger>
              </ResponsiveTabsList>

              {/* Overview Tab */}
              <ResponsiveTabsContent value="overview" className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-500/10 rounded-lg">
                        <Icon name="error-warning-line" className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <CardTitle>Error Types</CardTitle>
                        <CardDescription>
                          Different categories of errors and their characteristics.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {errorTypes.map((type) => (
                        <div key={type.name} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="p-2 bg-red-500/10 rounded-lg flex-shrink-0">
                            <Icon name={type.icon} className="h-5 w-5 text-red-500" />
                          </div>
                          <div className="flex-1">
                            <H4 className="mb-2">{type.name}</H4>
                            <BodySmall className="text-muted-foreground mb-3">
                              {type.description}
                            </BodySmall>
                            <div className="space-y-1">
                              {type.examples.map((example) => (
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
                        <Icon name="message-2-line" className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <CardTitle>Feedback Types</CardTitle>
                        <CardDescription>
                          Different types of user feedback and when to use them.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      {feedbackTypes.map((feedback) => (
                        <div key={feedback.name} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className={`p-2 ${feedback.bgColor} rounded-lg flex-shrink-0`}>
                            <Icon name={feedback.icon} className={`h-5 w-5 ${feedback.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <H4>{feedback.name}</H4>
                              <Badge variant="secondary">Feedback Type</Badge>
                            </div>
                            <BodySmall className="text-muted-foreground mb-3">
                              {feedback.description}
                            </BodySmall>
                            <div className="flex flex-wrap gap-1">
                              {feedback.examples.map((example) => (
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
                        <span>Best Practices</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <BodySmall>✓ Provide clear, actionable error messages</BodySmall>
                        <BodySmall>✓ Use appropriate error types and colors</BodySmall>
                        <BodySmall>✓ Validate input in real-time when possible</BodySmall>
                        <BodySmall>✓ Group related errors together</BodySmall>
                        <BodySmall>✓ Offer suggestions for fixing errors</BodySmall>
                        <BodySmall>✓ Test error states thoroughly</BodySmall>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon name="close-line" className="h-5 w-5 text-red-500" />
                        <span>Avoid</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <BodySmall>✗ Generic error messages</BodySmall>
                        <BodySmall>✗ Technical jargon users can&apos;t understand</BodySmall>
                        <BodySmall>✗ Blaming users for errors</BodySmall>
                        <BodySmall>✗ Showing too many errors at once</BodySmall>
                        <BodySmall>✗ Inconsistent error styling</BodySmall>
                        <BodySmall>✗ Ignoring accessibility requirements</BodySmall>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ResponsiveTabsContent>

              {/* Patterns Tab */}
              <ResponsiveTabsContent value="patterns" className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <Icon name="shield-check-line" className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <CardTitle>Validation Patterns</CardTitle>
                        <CardDescription>
                          Different approaches to form validation and error handling.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      {validationPatterns.map((pattern) => (
                        <div key={pattern.name} className="p-4 border rounded-lg">
                          <div className="flex items-center space-x-3 mb-3">
                            <H4>{pattern.name}</H4>
                            <Badge variant="secondary">Validation Pattern</Badge>
                          </div>
                          <BodySmall className="text-muted-foreground mb-4">
                            {pattern.description}
                          </BodySmall>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <BodySmall className="font-medium mb-2 text-green-600 dark:text-green-400">Pros:</BodySmall>
                              <ul className="space-y-1">
                                {pattern.pros.map((pro) => (
                                  <BodySmall key={pro} className="text-muted-foreground">
                                    • {pro}
                                  </BodySmall>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <BodySmall className="font-medium mb-2 text-red-600 dark:text-red-400">Cons:</BodySmall>
                              <ul className="space-y-1">
                                {pattern.cons.map((con) => (
                                  <BodySmall key={con} className="text-muted-foreground">
                                    • {con}
                                  </BodySmall>
                                ))}
                              </ul>
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
                        <Icon name="file-text-line" className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <CardTitle>Error Message Guidelines</CardTitle>
                        <CardDescription>
                          Best practices for writing clear, helpful error messages.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      {errorMessageGuidelines.map((guideline) => (
                        <div key={guideline.title} className="p-4 border rounded-lg">
                          <H4 className="mb-3">{guideline.title}</H4>
                          <BodySmall className="text-muted-foreground mb-3">
                            {guideline.description}
                          </BodySmall>
                          <div className="bg-muted p-3 rounded-lg">
                            <BodySmall className="font-mono text-sm">{guideline.example}</BodySmall>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Icon name="list-settings-line" className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <CardTitle>Error State Hierarchy</CardTitle>
                        <CardDescription>
                          How to prioritize and display multiple errors effectively.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <H4>Critical Errors</H4>
                        <Badge variant="destructive">Blocking</Badge>
                      </div>
                      <BodySmall className="text-muted-foreground ml-7">
                        Errors that prevent the user from proceeding. Display prominently and require immediate attention.
                      </BodySmall>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <H4>Warnings</H4>
                        <Badge variant="secondary">Non-blocking</Badge>
                      </div>
                      <BodySmall className="text-muted-foreground ml-7">
                        Issues that should be addressed but don&apos;t prevent progress. Display as warnings or suggestions.
                      </BodySmall>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <H4>Information</H4>
                        <Badge variant="outline">Informational</Badge>
                      </div>
                      <BodySmall className="text-muted-foreground ml-7">
                        Helpful information or guidance. Display as info messages or tooltips.
                      </BodySmall>
                    </div>
                  </CardContent>
                </Card>
              </ResponsiveTabsContent>

              {/* Examples Tab */}
              <ResponsiveTabsContent value="examples" className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name="form-line" className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Form Validation Example</CardTitle>
                        <CardDescription>
                          Interactive form demonstrating various error states and validation patterns.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {showSuccess && (
                      <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                        <Icon name="check-line" className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <AlertTitle className="text-green-800 dark:text-green-200">Success!</AlertTitle>
                        <AlertDescription className="text-green-700 dark:text-green-300">
                          Your form has been submitted successfully.
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="space-y-6">
                      <H3 className="mb-4">Form Fields</H3>
                      <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className={errors.email ? "border-red-500 focus:border-red-500" : ""}
                            placeholder="Enter your email"
                          />
                          {errors.email && (
                            <BodySmall className="text-red-500 mt-1 flex items-center space-x-1">
                              <Icon name="error-warning-line" className="h-3 w-3" />
                              <span>{errors.email}</span>
                            </BodySmall>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className={errors.password ? "border-red-500 focus:border-red-500" : ""}
                            placeholder="Enter your password"
                          />
                          {errors.password && (
                            <BodySmall className="text-red-500 mt-1 flex items-center space-x-1">
                              <Icon name="error-warning-line" className="h-3 w-3" />
                              <span>{errors.password}</span>
                            </BodySmall>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            className={errors.confirmPassword ? "border-red-500 focus:border-red-500" : ""}
                            placeholder="Confirm your password"
                          />
                          {errors.confirmPassword && (
                            <BodySmall className="text-red-500 mt-1 flex items-center space-x-1">
                              <Icon name="error-warning-line" className="h-3 w-3" />
                              <span>{errors.confirmPassword}</span>
                            </BodySmall>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            className={errors.message ? "border-red-500 focus:border-red-500" : ""}
                            placeholder="Enter your message"
                          />
                          {errors.message && (
                            <BodySmall className="text-red-500 mt-1 flex items-center space-x-1">
                              <Icon name="error-warning-line" className="h-3 w-3" />
                              <span>{errors.message}</span>
                            </BodySmall>
                          )}
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Submit Form
                      </Button>
                    </form>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Icon name="alert-line" className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <CardTitle>Alert Examples</CardTitle>
                        <CardDescription>
                          Different types of alerts and their appropriate use cases.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-6">
                      <Alert>
                        <Icon name="information-line" className="h-4 w-4" />
                        <AlertTitle>Information</AlertTitle>
                        <AlertDescription>
                          This is an informational message. Use for helpful guidance and general information.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                                                        <Icon name="alert-line" className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        <AlertTitle className="text-yellow-800 dark:text-yellow-200">Warning</AlertTitle>
                        <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                          This is a warning message. Use for cautionary information and potential issues.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                                                        <Icon name="error-warning-line" className="h-4 w-4 text-red-600 dark:text-red-400" />
                        <AlertTitle className="text-red-800 dark:text-red-200">Error</AlertTitle>
                        <AlertDescription className="text-red-700 dark:text-red-300">
                          This is an error message. Use for critical issues that need immediate attention.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                        <Icon name="check-line" className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <AlertTitle className="text-green-800 dark:text-green-200">Success</AlertTitle>
                        <AlertDescription className="text-green-700 dark:text-green-300">
                          This is a success message. Use for positive confirmations and completed actions.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-500/10 rounded-lg">
                        <Icon name="apps-line" className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div>
                        <CardTitle>Error State Components</CardTitle>
                        <CardDescription>
                          Reusable components for different error scenarios.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <H4>Empty State</H4>
                        <div className="p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center">
                          <Icon name="inbox-line" className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <H4 className="mb-2">No items found</H4>
                          <BodySmall className="text-muted-foreground mb-4">
                            There are no items to display. Try adjusting your search or filters.
                          </BodySmall>
                          <Button variant="outline">Add New Item</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <H4>Loading Error</H4>
                        <div className="p-6 border rounded-lg text-center">
                          <Icon name="error-warning-line" className="h-12 w-12 text-red-500 mx-auto mb-4" />
                          <H4 className="mb-2">Failed to load data</H4>
                          <BodySmall className="text-muted-foreground mb-4">
                            We couldn&apos;t load the requested data. Please try again.
                          </BodySmall>
                          <Button>Retry</Button>
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
                      <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <Icon name="hook-line" className="h-5 w-5 text-indigo-500" />
                      </div>
                      <div>
                        <CardTitle>Error Handling Hook</CardTitle>
                        <CardDescription>
                          Custom React hook for managing form errors and validation.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">// Custom hook for form validation</div>
                      <div>function useFormValidation() &#123;</div>
                      <div>  const [errors, setErrors] = useState(&#123;&#125;)</div>
                      <div>  const [touched, setTouched] = useState(&#123;&#125;)</div>
                      <div></div>
                                             <div>  const validateField = (name, value, rules) =&gt; &#123;</div>
                      <div>    const fieldErrors = []</div>
                      <div></div>
                      <div>    if (rules.required && !value) &#123;</div>
                      <div>      fieldErrors.push(`$&#123;name&#125; is required`)</div>
                      <div>    &#125;</div>
                      <div></div>
                      <div>    if (rules.email && !/\S+@\S+\.\S+/.test(value)) &#123;</div>
                      <div>      fieldErrors.push(&apos;Please enter a valid email&apos;)</div>
                      <div>    &#125;</div>
                      <div></div>
                      <div>    if (rules.minLength && value.length &lt; rules.minLength) &#123;</div>
                      <div>      fieldErrors.push(`$&#123;name&#125; must be at least $&#123;rules.minLength&#125; characters`)</div>
                      <div>    &#125;</div>
                      <div></div>
                      <div>    return fieldErrors</div>
                      <div>  &#125;</div>
                      <div></div>
                                             <div>  const handleBlur = (name) =&gt; &#123;</div>
                                             <div>    setTouched(prev =&gt; (&#123; ...prev, [name]: true &#125;))</div>
                      <div>  &#125;</div>
                      <div></div>
                      <div>  return &#123; errors, touched, validateField, handleBlur &#125;</div>
                      <div>&#125;</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-500/10 rounded-lg">
                        <Icon name="shield-cross-line" className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <CardTitle>Error Boundary Component</CardTitle>
                        <CardDescription>
                          React error boundary for catching and handling JavaScript errors.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">// Error boundary component</div>
                      <div>class ErrorBoundary extends React.Component &#123;</div>
                      <div>  constructor(props) &#123;</div>
                      <div>    super(props)</div>
                      <div>    this.state = &#123; hasError: false, error: null &#125;</div>
                      <div>  &#125;</div>
                      <div></div>
                      <div>  static getDerivedStateFromError(error) &#123;</div>
                      <div>    return &#123; hasError: true, error &#125;</div>
                      <div>  &#125;</div>
                      <div></div>
                      <div>  componentDidCatch(error, errorInfo) &#123;</div>
                      <div>    console.error(&apos;Error caught by boundary:&apos;, error, errorInfo)</div>
                      <div>    // Log to error reporting service</div>
                      <div>  &#125;</div>
                      <div></div>
                      <div>  render() &#123;</div>
                      <div>    if (this.state.hasError) &#123;</div>
                      <div>      return (</div>
                      <div>        &lt;div className=&quot;error-boundary&quot;&gt;</div>
                      <div>          &lt;h2&gt;Something went wrong&lt;/h2&gt;</div>
                      <div>          &lt;button onClick=&quot;handleReload&quot;&gt;</div>
                      <div>            Reload Page</div>
                      <div>          &lt;/button&gt;</div>
                      <div>        &lt;/div&gt;</div>
                      <div>      )</div>
                      <div>    &#125;</div>
                      <div></div>
                      <div>    return this.props.children</div>
                      <div>  &#125;</div>
                      <div>&#125;</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Icon name="code-line" className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <CardTitle>CSS for Error States</CardTitle>
                        <CardDescription>
                          CSS classes and custom properties for styling error states.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">/* Error state variables */</div>
                      <div>--error-50: #fef2f2;</div>
                      <div>--error-100: #fee2e2;</div>
                      <div>--error-500: #ef4444;</div>
                      <div>--error-600: #dc2626;</div>
                      <div></div>
                      <div className="text-muted-foreground">/* Error input styles */</div>
                      <div>.input-error &#123;</div>
                      <div>  border-color: var(--error-500);</div>
                      <div>  box-shadow: 0 0 0 1px var(--error-500);</div>
                      <div>&#125;</div>
                      <div></div>
                      <div className="text-muted-foreground">/* Error message styles */</div>
                      <div>.error-message &#123;</div>
                      <div>  color: var(--error-600);</div>
                      <div>  font-size: 0.875rem;</div>
                      <div>  margin-top: 0.25rem;</div>
                      <div>&#125;</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <Icon name="eye-line" className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <CardTitle>Accessibility Considerations</CardTitle>
                        <CardDescription>
                          Ensuring error states are accessible to all users.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <H4 className="mb-3">Screen Readers</H4>
                        <div className="space-y-2">
                          <BodySmall>• Use `aria-invalid` for form fields</BodySmall>
                          <BodySmall>• Provide `aria-describedby` for error messages</BodySmall>
                          <BodySmall>• Use `role=&quot;alert&quot;` for important errors</BodySmall>
                          <BodySmall>• Announce errors immediately when they occur</BodySmall>
                        </div>
                      </div>
                      <div>
                        <H4 className="mb-3">Keyboard Navigation</H4>
                        <div className="space-y-2">
                          <BodySmall>• Ensure error messages are focusable</BodySmall>
                          <BodySmall>• Provide clear focus indicators</BodySmall>
                          <BodySmall>• Allow users to navigate to errors</BodySmall>
                          <BodySmall>• Support keyboard shortcuts for common actions</BodySmall>
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
