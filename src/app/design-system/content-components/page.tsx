"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { H3, H4, BodyLarge, BodySmall } from "@/components/ui/typography"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { useContentComponentsConfig } from "@/hooks/use-content-components-config"
import {
  ArticleLayout,
  MediaCard,
  Gallery,
  Timeline,
  FAQ,
  SocialShare,
  ContentBlock,
  Quote,
} from "@/components/ui/content-components"

export default function ContentComponentsPage() {
  const {
    config,
    articleLayoutConfig,
    mediaCardConfig,
    galleryConfig,
    timelineConfig,
    faqConfig,
    contentBlockConfig,
    quoteConfig,
    socialShareConfig
  } = useContentComponentsConfig()

  const [activeTab, setActiveTab] = useState("articles")

  // Sample data for components
  const galleryItems = [
    {
      id: "1",
      title: "Product Showcase",
      description: "Beautiful product photography",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      tags: ["Product", "Photography"],
    },
    {
      id: "2",
      title: "Team Meeting",
      description: "Collaborative workspace",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
      tags: ["Team", "Office"],
    },
    {
      id: "3",
      title: "Design Process",
      description: "Creative workflow",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      tags: ["Design", "Process"],
    },
    {
      id: "4",
      title: "Code Review",
      description: "Development workflow",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      tags: ["Development", "Code"],
    },
  ]

  const timelineItems = [
    {
      id: "1",
      title: "Project Kickoff",
      description: "Initial planning and requirements gathering",
      date: "January 15, 2024",
      icon: "rocket-line",
      status: "completed" as const,
    },
    {
      id: "2",
      title: "Design Phase",
      description: "UI/UX design and prototyping",
      date: "February 1, 2024",
      icon: "palette-line",
      status: "completed" as const,
    },
    {
      id: "3",
      title: "Development",
      description: "Frontend and backend implementation",
      date: "March 1, 2024",
      icon: "code-line",
      status: "current" as const,
    },
    {
      id: "4",
      title: "Testing & Launch",
      description: "Quality assurance and deployment",
      date: "April 15, 2024",
      icon: "check-line",
      status: "upcoming" as const,
    },
  ]

  const faqItems = [
    {
      question: "What is included in the design system?",
      answer: "Our design system includes comprehensive UI components, typography, color palettes, spacing guidelines, and interactive patterns for building consistent user interfaces.",
    },
    {
      question: "How do I get started with the components?",
      answer: "You can start by exploring our component library, reading the documentation, and copying the code examples to integrate into your project.",
    },
    {
      question: "Is the design system customizable?",
      answer: "Yes, all components are built with customization in mind. You can modify colors, spacing, typography, and other design tokens to match your brand.",
    },
    {
      question: "Do you provide support and updates?",
      answer: "We regularly update our design system with new components, improvements, and bug fixes. Support is available through our documentation and community channels.",
    },
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
              title="Content Components & Rich Media"
              description="Comprehensive content components for building rich, engaging user experiences with articles, media, timelines, and interactive content patterns."
              size="lg"
              centered
            />
          </Section>



          {/* Available Variants & Options */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="list-check" className="h-5 w-5" />
                  Available Variants & Options
                </CardTitle>
                <CardDescription>
                  All available variants, sizes, and configuration options for content components.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="articles" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="articles">Articles</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                    <TabsTrigger value="interactive">Interactive</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                  </TabsList>

                  <TabsContent value="articles" className="space-y-6">
                    <div>
                      <H4 className="mb-3">Article Layout Variants</H4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {config.articleLayouts.variants.map((variant) => (
                          <div key={variant.id} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm">{variant.name}</div>
                            <div className="text-xs text-muted-foreground">{variant.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <H4 className="mb-3">Author Avatar Sizes</H4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {config.articleLayouts.authorAvatarSizes.map((size) => (
                          <div key={size.id} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm">{size.name}</div>
                            <div className="text-xs text-muted-foreground">{size.width}×{size.height}px</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="media" className="space-y-6">
                    <div>
                      <H4 className="mb-3">Media Card Variants</H4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {config.mediaCards.variants.map((variant) => (
                          <div key={variant.id} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm">{variant.name}</div>
                            <div className="text-xs text-muted-foreground">{variant.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <H4 className="mb-3">Aspect Ratios</H4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {config.mediaCards.aspectRatios.map((ratio) => (
                          <div key={ratio.id} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm">{ratio.name}</div>
                            <div className="text-xs text-muted-foreground">{ratio.ratio}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <H4 className="mb-3">Gallery Variants</H4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {config.galleries.variants.map((variant) => (
                          <div key={variant.id} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm">{variant.name}</div>
                            <div className="text-xs text-muted-foreground">{variant.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="interactive" className="space-y-6">
                    <div>
                      <H4 className="mb-3">Timeline Variants</H4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {config.timelines.variants.map((variant) => (
                          <div key={variant.id} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm">{variant.name}</div>
                            <div className="text-xs text-muted-foreground">{variant.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <H4 className="mb-3">FAQ Variants</H4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {config.faqs.variants.map((variant) => (
                          <div key={variant.id} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm">{variant.name}</div>
                            <div className="text-xs text-muted-foreground">{variant.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <H4 className="mb-3">FAQ Animations</H4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {config.faqs.animations.map((animation) => (
                          <div key={animation.id} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm">{animation.name}</div>
                            <div className="text-xs text-muted-foreground">{animation.duration}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="content" className="space-y-6">
                    <div>
                      <H4 className="mb-3">Content Block Variants</H4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {config.contentBlocks.variants.map((variant) => (
                          <div key={variant.id} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm">{variant.name}</div>
                            <div className="text-xs text-muted-foreground">{variant.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <H4 className="mb-3">Quote Variants</H4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {config.quotes.variants.map((variant) => (
                          <div key={variant.id} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm">{variant.name}</div>
                            <div className="text-xs text-muted-foreground">{variant.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <H4 className="mb-3">Social Share Variants</H4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {config.socialShare.variants.map((variant) => (
                          <div key={variant.id} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm">{variant.name}</div>
                            <div className="text-xs text-muted-foreground">{variant.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <H4 className="mb-3">Social Share Platforms</H4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {config.socialShare.platforms.map((platform) => (
                          <div key={platform.id} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm">{platform.name}</div>
                            <div className="text-xs text-muted-foreground">{platform.color}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </Section>

          {/* Content Components Overview */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="article-line" className="h-5 w-5" />
                  Content Components System Overview
                </CardTitle>
                <CardDescription>
                  Our content components system provides comprehensive patterns for building rich, engaging content experiences with articles, media, and interactive elements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="file-text-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Rich Content</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Article layouts, content blocks, and typography patterns
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="image-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Media Components</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Media cards, galleries, and video components
                    </BodySmall>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="time-line" className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Interactive Content</span>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Timelines, FAQs, and social sharing components
                    </BodySmall>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Content Components Showcase */}
          <Section paddingY="lg">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="interactive">Interactive</TabsTrigger>
                <TabsTrigger value="content">Content Blocks</TabsTrigger>
              </TabsList>

              {/* Articles */}
              <TabsContent value="articles" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Article Layout Components</CardTitle>
                    <CardDescription>
                      Professional article layouts with metadata, author information, and social sharing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Article Layout Example */}
                    <div>
                      <H3 className="mb-6">Article Layout</H3>
                      <ArticleLayout
                        title="The Complete Guide to Building Enterprise Design Systems"
                        subtitle="From concept to implementation: A comprehensive approach to creating scalable design systems that drive business value"
                        author={{
                          name: "Sarah Johnson",
                          role: "Senior Design Systems Lead",
                          avatar: "https://github.com/shadcn.png",
                        }}
                        date="March 15, 2024"
                        readTime="12 min read"
                        tags={["Design System", "Enterprise", "UI/UX", "Development", "Strategy"]}
                      >
                        <div className="space-y-8">
                          <p>
                            In today&apos;s fast-paced digital landscape, organizations are increasingly recognizing the strategic value of design systems. 
                            What was once considered a nice-to-have has become a critical business imperative, driving efficiency, consistency, 
                            and innovation across product development teams.
                          </p>
                          
                          <ContentBlock title="The Business Case for Design Systems" variant="highlighted">
                            <p className="mb-6">Design systems deliver measurable business value through:</p>
                            <ul className="space-y-3">
                              <li>• <strong>50-80% reduction</strong> in design and development time for new features</li>
                              <li>• <strong>Consistent brand experience</strong> across all customer touchpoints</li>
                              <li>• <strong>Improved accessibility</strong> and compliance with WCAG guidelines</li>
                              <li>• <strong>Enhanced team collaboration</strong> between design and engineering</li>
                              <li>• <strong>Reduced maintenance overhead</strong> and technical debt</li>
                            </ul>
                          </ContentBlock>
                          
                          <p>
                            The journey from concept to implementation requires careful planning, stakeholder alignment, 
                            and a phased approach that balances immediate needs with long-term scalability.
                          </p>
                          
                          <Quote
                            content="A design system is not a project, it&apos;s a product serving products. It requires ongoing investment, maintenance, and evolution to remain valuable."
                            author="Nathan Curtis"
                            source="Design Systems Handbook"
                            variant="highlighted"
                          />
                          
                          <p>
                            Successful design systems are built on three foundational pillars: <strong>consistency</strong> in visual and interaction patterns, 
                            <strong> flexibility</strong> to accommodate diverse use cases, and <strong>maintainability</strong> to ensure long-term viability.
                          </p>
                          
                          <ContentBlock title="Implementation Strategy" variant="bordered">
                            <div className="grid md:grid-cols-3 gap-6">
                              <div>
                                <h4 className="font-semibold mb-3">Phase 1: Foundation</h4>
                                <p className="text-sm text-muted-foreground">Establish core design tokens, typography, and basic components</p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-3">Phase 2: Expansion</h4>
                                <p className="text-sm text-muted-foreground">Build comprehensive component library and documentation</p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-3">Phase 3: Optimization</h4>
                                <p className="text-sm text-muted-foreground">Refine based on usage data and team feedback</p>
                              </div>
                            </div>
                          </ContentBlock>
                        </div>
                      </ArticleLayout>
                      
                      <div className="mt-8">
                        <SocialShare
                          title="Building a Comprehensive Design System"
                          url="https://example.com/article"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Media */}
              <TabsContent value="media" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Media Components</CardTitle>
                    <CardDescription>
                      Media cards, galleries, and video components for rich content display
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Media Cards */}
                    <div>
                      <H3 className="mb-6">Media Cards</H3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MediaCard
                          title="Product Showcase"
                          description="Beautiful product photography with overlay actions"
                          image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
                          overlay
                          actions={[
                            {
                              label: "View",
                              onClick: () => console.log("View product"),
                              icon: "eye-line",
                            },
                            {
                              label: "Download",
                              onClick: () => console.log("Download"),
                              variant: "outline",
                              icon: "download-line",
                            },
                          ]}
                        />
                        <MediaCard
                          title="Team Collaboration"
                          description="Video content with controls"
                          video="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
                          actions={[
                            {
                              label: "Watch",
                              onClick: () => console.log("Watch video"),
                              icon: "play-line",
                            },
                          ]}
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Gallery */}
                    <div>
                      <H3 className="mb-6">Image Gallery</H3>
                      <Gallery items={galleryItems} columns={4} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Interactive */}
              <TabsContent value="interactive" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Content Components</CardTitle>
                    <CardDescription>
                      Timelines, FAQs, and other interactive content patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Timeline */}
                    <div>
                      <H3 className="mb-6">Project Timeline</H3>
                      <Timeline items={timelineItems} />
                    </div>

                    <Separator />

                    {/* FAQ */}
                    <div>
                      <H3 className="mb-6">Frequently Asked Questions</H3>
                      <FAQ
                        items={faqItems}
                        title="Common Questions"
                        description="Find answers to the most frequently asked questions about our design system."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Content Blocks */}
              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Block Patterns</CardTitle>
                    <CardDescription>
                      Reusable content blocks and typography patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Content Blocks */}
                    <div>
                      <H3 className="mb-6">Content Block Variations</H3>
                      <div className="space-y-4">
                        <ContentBlock title="Default Content Block">
                          <BodyLarge>
                            This is a default content block with standard styling and spacing.
                            It&apos;s perfect for general content sections.
                          </BodyLarge>
                        </ContentBlock>
                        
                        <ContentBlock title="Highlighted Content Block" variant="highlighted">
                          <BodyLarge>
                            This content block has a highlighted background to draw attention
                            to important information or key points.
                          </BodyLarge>
                        </ContentBlock>
                        
                        <ContentBlock title="Bordered Content Block" variant="bordered">
                          <BodyLarge>
                            This content block has a border to create visual separation
                            and define content boundaries.
                          </BodyLarge>
                        </ContentBlock>
                      </div>
                    </div>

                    <Separator />

                    {/* Quote Variations */}
                    <div>
                      <H3 className="mb-6">Quote Components</H3>
                      <div className="space-y-6">
                        <Quote
                          content="Design is not just what it looks like and feels like. Design is how it works."
                          author="Steve Jobs"
                          source="Apple Inc."
                        />
                        
                        <Quote
                          content="Good design is obvious. Great design is transparent."
                          author="Joe Sparano"
                          variant="large"
                        />
                        
                        <Quote
                          content="The best way to predict the future is to invent it."
                          author="Alan Kay"
                          variant="highlighted"
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Social Sharing */}
                    <div>
                      <H3 className="mb-6">Social Sharing</H3>
                                              <div className="space-y-6">
                          <div>
                            <BodySmall className="mb-3 font-medium">Default Social Share</BodySmall>
                            <SocialShare
                              title="Amazing Article Title"
                              url="https://example.com/article"
                            />
                          </div>
                          
                          <div>
                            <BodySmall className="mb-3 font-medium">Custom Platform Selection</BodySmall>
                            <SocialShare
                              title="Amazing Article Title"
                              url="https://example.com/article"
                              platforms={["twitter", "linkedin"]}
                            />
                          </div>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Section>

          {/* Best Practices */}
          <Section paddingY="lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="information-line" className="h-5 w-5" />
                  Content Best Practices
                </CardTitle>
                <CardDescription>
                  Guidelines for implementing content components effectively
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <H3 className="mb-4">Content Structure</H3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Use clear hierarchy with headings and subheadings</li>
                        <li>• Break content into digestible sections</li>
                        <li>• Include relevant metadata and author information</li>
                        <li>• Provide social sharing options for engagement</li>
                      </ul>
                    </div>
                    <div>
                      <H3 className="mb-4">Media Optimization</H3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Optimize images for web performance</li>
                        <li>• Use appropriate aspect ratios for consistency</li>
                        <li>• Provide alt text for accessibility</li>
                        <li>• Consider lazy loading for large galleries</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <H3 className="mb-4">Interactive Elements</H3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Make interactive elements clearly identifiable</li>
                        <li>• Provide clear feedback for user actions</li>
                        <li>• Ensure keyboard navigation support</li>
                        <li>• Test interactions across different devices</li>
                      </ul>
                    </div>
                    <div>
                      <H3 className="mb-4">Content Accessibility</H3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Use semantic HTML structure</li>
                        <li>• Provide sufficient color contrast</li>
                        <li>• Include proper ARIA labels</li>
                        <li>• Test with screen readers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
