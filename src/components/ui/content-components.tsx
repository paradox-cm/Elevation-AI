"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Icon from "@/components/ui/icon"
import { H1, H2, H3, H4, BodyLarge, BodySmall } from "@/components/ui/typography"

// Article Layout Component
interface ArticleLayoutProps {
  title: string
  subtitle?: string
  author?: {
    name: string
    avatar?: string
    role?: string
  }
  date?: string
  readTime?: string
  tags?: string[]
  children: React.ReactNode
  className?: string
}

export function ArticleLayout({
  title,
  subtitle,
  author,
  date,
  readTime,
  tags,
  children,
  className,
}: ArticleLayoutProps) {
  return (
    <article className={cn("max-w-4xl mx-auto", className)}>
      {/* Article Header */}
      <header className="mb-12">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <H1 className="mb-6">{title}</H1>
        
        {subtitle && (
          <BodyLarge className="text-muted-foreground mb-8">
            {subtitle}
          </BodyLarge>
        )}
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {author && (
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback>{author.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{author.name}</div>
                {author.role && (
                  <BodySmall className="text-muted-foreground">{author.role}</BodySmall>
                )}
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            {date && (
              <div className="flex items-center">
                <Icon name="calendar-line" className="mr-2 h-4 w-4" />
                {date}
              </div>
            )}
            {readTime && (
              <div className="flex items-center">
                <Icon name="time-line" className="mr-2 h-4 w-4" />
                {readTime}
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Article Content */}
      <div className="prose prose-lg max-w-none space-y-8">
        {children}
      </div>
    </article>
  )
}

// Media Card Component
interface MediaCardProps {
  title: string
  description?: string
  image?: string
  video?: string
  aspectRatio?: number
  overlay?: boolean
  actions?: {
    label: string
    onClick: () => void
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    icon?: string
  }[]
  className?: string
}

export function MediaCard({
  title,
  description,
  image,
  video,
  aspectRatio = 16 / 9,
  overlay = false,
  actions,
  className,
}: MediaCardProps) {
  return (
    <Card className={cn("group overflow-hidden", className)}>
      {(image || video) && (
        <div className="relative">
          <AspectRatio ratio={aspectRatio}>
            {image ? (
              <img
                src={image}
                alt={title}
                className="object-cover w-full h-full"
              />
            ) : video ? (
              <video
                src={video}
                className="object-cover w-full h-full"
                controls
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Icon name="image-line" className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </AspectRatio>
          
          {overlay && (
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center backdrop-blur-sm">
              <div className="flex gap-3">
                {actions?.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || "default"}
                    size="sm"
                    onClick={action.onClick}
                    className="shadow-lg"
                  >
                    {action.icon && (
                      <Icon name={action.icon} className="mr-2 h-4 w-4" />
                    )}
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && (
          <CardDescription className="mt-2">{description}</CardDescription>
        )}
      </CardHeader>
      
      {actions && !overlay && (
        <CardContent className="pt-0">
          <div className="flex gap-3">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "default"}
                size="sm"
                onClick={action.onClick}
              >
                {action.icon && (
                  <Icon name={action.icon} className="mr-2 h-4 w-4" />
                )}
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

// Gallery Component
interface GalleryProps {
  items: {
    id: string
    title: string
    description?: string
    image: string
    tags?: string[]
  }[]
  columns?: 2 | 3 | 4
  className?: string
}

export function Gallery({ items, columns = 3, className }: GalleryProps) {
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={cn("grid gap-6", gridClasses[columns], className)}>
      {items.map((item) => (
        <MediaCard
          key={item.id}
          title={item.title}
          description={item.description}
          image={item.image}
          overlay
          actions={[
            {
              label: "View",
              onClick: () => console.log("View", item.id),
              icon: "eye-line",
            },
            {
              label: "Download",
              onClick: () => console.log("Download", item.id),
              variant: "outline",
              icon: "download-line",
            },
          ]}
        />
      ))}
    </div>
  )
}

// Timeline Component
interface TimelineItem {
  id: string
  title: string
  description?: string
  date: string
  icon?: string
  status?: "completed" | "current" | "upcoming"
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {items.map((item, index) => {
        const isCompleted = item.status === "completed"
        const isCurrent = item.status === "current"
        
        return (
          <div key={item.id} className="flex items-start space-x-6">
            {/* Timeline Icon */}
            <div className={cn(
              "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2",
              isCompleted && "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 dark:border-green-400/20",
              isCurrent && "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 dark:border-blue-400/20",
              !isCompleted && !isCurrent && "bg-muted text-muted-foreground border-muted-foreground/20"
            )}>
              {item.icon ? (
                <Icon name={item.icon} className="h-6 w-6" />
              ) : (
                <div className="w-3 h-3 rounded-full bg-current" />
              )}
            </div>
            
            {/* Timeline Content */}
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <H4 className={cn(
                  "text-lg",
                  isCompleted && "text-green-600 dark:text-green-400",
                  isCurrent && "text-blue-600 dark:text-blue-400"
                )}>
                  {item.title}
                </H4>
                <BodySmall className="text-muted-foreground font-medium">
                  {item.date}
                </BodySmall>
              </div>
              {item.description && (
                <BodySmall className="text-muted-foreground leading-relaxed">
                  {item.description}
                </BodySmall>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// FAQ Component
interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
  title?: string
  description?: string
  className?: string
}

export function FAQ({ items, title, description, className }: FAQProps) {
  const [openItems, setOpenItems] = React.useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className={cn("space-y-6", className)}>
      {(title || description) && (
        <div className="text-center mb-8">
          {title && <H2 className="mb-4">{title}</H2>}
          {description && (
            <BodyLarge className="text-muted-foreground max-w-2xl mx-auto">
              {description}
            </BodyLarge>
          )}
        </div>
      )}
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader
              className="cursor-pointer hover:bg-muted/50 transition-colors p-6"
              onClick={() => toggleItem(index)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-left text-lg">{item.question}</CardTitle>
                <Icon
                  name={openItems.has(index) ? "arrow-up-s-line" : "arrow-down-s-line"}
                  className={`h-5 w-5 text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-200 ${
                    openItems.has(index) ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
            </CardHeader>
            {openItems.has(index) && (
              <CardContent className="pt-0 pb-6 px-6">
                <BodySmall className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </BodySmall>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

// Social Share Component
interface SocialShareProps {
  title: string
  url: string
  platforms?: ("twitter" | "facebook" | "linkedin" | "email")[]
  className?: string
}

export function SocialShare({ title, url, platforms = ["twitter", "facebook", "linkedin", "email"], className }: SocialShareProps) {
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  }

  const platformIcons = {
    twitter: "twitter-line",
    facebook: "facebook-circle-line",
    linkedin: "linkedin-box-line",
    email: "mail-line",
  }

  const platformLabels = {
    twitter: "Twitter",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    email: "Email",
  }

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <BodySmall className="text-muted-foreground font-medium">Share:</BodySmall>
      {platforms.map((platform) => (
        <Button
          key={platform}
          variant="ghost"
          size="sm"
          onClick={() => window.open(shareLinks[platform], "_blank")}
          className="h-10 w-10 p-0 hover:bg-muted/50 transition-colors"
          title={`Share on ${platformLabels[platform]}`}
        >
          <Icon name={platformIcons[platform]} className="h-5 w-5" />
          <span className="sr-only">Share on {platformLabels[platform]}</span>
        </Button>
      ))}
    </div>
  )
}

// Content Block Component
interface ContentBlockProps {
  title?: string
  children: React.ReactNode
  variant?: "default" | "highlighted" | "bordered"
  className?: string
}

export function ContentBlock({ title, children, variant = "default", className }: ContentBlockProps) {
  const variantClasses = {
    default: "bg-background",
    highlighted: "bg-muted/50",
    bordered: "border border-border bg-background",
  }

  return (
    <div className={cn(
      "rounded-lg p-8",
      variantClasses[variant],
      className
    )}>
      {title && (
        <H3 className="mb-6">{title}</H3>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

// Quote Component
interface QuoteProps {
  content: string
  author?: string
  source?: string
  variant?: "default" | "large" | "highlighted"
  className?: string
}

export function Quote({ content, author, source, variant = "default", className }: QuoteProps) {
  const variantClasses = {
    default: "border-l-4 border-primary pl-8",
    large: "border-l-4 border-primary pl-10 text-lg",
    highlighted: "bg-primary/5 border-l-4 border-primary pl-8",
  }

  return (
    <blockquote className={cn(
      "italic text-muted-foreground",
      variantClasses[variant],
      className
    )}>
      <BodyLarge className="mb-6 leading-relaxed">"{content}"</BodyLarge>
      {(author || source) && (
        <footer className="text-sm">
          {author && <cite className="font-medium not-italic">{author}</cite>}
          {author && source && <span className="text-muted-foreground">, </span>}
          {source && <span className="text-muted-foreground">{source}</span>}
        </footer>
      )}
    </blockquote>
  )
}
