"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Icon from "@/components/ui/icon"
import { H1, H2, H3, BodyLarge, BodySmall } from "@/components/ui/typography"

// Hero Section Component
interface HeroSectionProps {
  title: string
  subtitle?: string
  description?: string
  actions?: {
    label: string
    onClick: () => void
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    icon?: string
  }[]
  background?: "default" | "gradient" | "image"
  size?: "sm" | "md" | "lg" | "xl"
  centered?: boolean
  className?: string
}

export function HeroSection({
  title,
  subtitle,
  description,
  actions,
  background = "default",
  size = "lg",
  centered = true,
  className,
}: HeroSectionProps) {
  const sizeClasses = {
    sm: "py-12",
    md: "py-16",
    lg: "py-20",
    xl: "py-24",
  }

  const backgroundClasses = {
    default: "bg-background",
    gradient: "bg-gradient-to-br from-primary/5 via-background to-secondary/5",
    image: "bg-background",
  }

  return (
    <section className={cn(
      "relative overflow-hidden",
      sizeClasses[size],
      backgroundClasses[background],
      className
    )}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "max-w-4xl",
          centered && "mx-auto text-center"
        )}>
          {subtitle && (
            <Badge variant="secondary" className="mb-4">
              {subtitle}
            </Badge>
          )}
          
          <H1 className="mb-6">
            {title}
          </H1>
          
          {description && (
            <BodyLarge className={cn(
              "text-muted-foreground mb-8 max-w-2xl",
              centered ? "mx-auto" : "mx-0"
            )}>
              {description}
            </BodyLarge>
          )}
          
          {actions && actions.length > 0 && (
            <div className={cn(
              "flex gap-4",
              centered ? "justify-center" : "justify-start"
            )}>
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || "default"}
                  onClick={action.onClick}
                  size="lg"
                >
                  {action.icon && (
                    <Icon name={action.icon} className="h-4 w-4" />
                  )}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// Content Section Component
interface ContentSectionProps {
  title?: string
  description?: string
  children: React.ReactNode
  padding?: "sm" | "md" | "lg" | "xl"
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full"
  className?: string
}

export function ContentSection({
  title,
  description,
  children,
  padding = "lg",
  maxWidth = "lg",
  className,
}: ContentSectionProps) {
  const paddingClasses = {
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
    xl: "py-20",
  }

  const maxWidthClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-none",
  }

  return (
    <section className={cn(
      "w-full",
      paddingClasses[padding],
      className
    )}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "mx-auto",
          maxWidthClasses[maxWidth]
        )}>
          {(title || description) && (
            <div className="mb-12 text-center">
              {title && <H2 className="mb-4">{title}</H2>}
              {description && (
                <BodyLarge className="text-muted-foreground max-w-2xl mx-auto">
                  {description}
                </BodyLarge>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}

// Feature Grid Component
interface Feature {
  icon: string
  title: string
  description: string
  link?: {
    label: string
    href: string
  }
}

interface FeatureGridProps {
  features: Feature[]
  columns?: 2 | 3 | 4
  className?: string
}

export function FeatureGrid({ features, columns = 3, className }: FeatureGridProps) {
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={cn(
      "grid gap-8",
      gridClasses[columns],
      className
    )}>
      {features.map((feature, index) => (
        <Card key={index} className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
              <Icon name={feature.icon} className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-base">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <BodySmall className="text-muted-foreground mb-4">
              {feature.description}
            </BodySmall>
            {feature.link && (
              <Button variant="link" className="p-0 h-auto">
                {feature.link.label}
                <Icon name="arrow-right-line" className="ml-1 h-4 w-4" />
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Stats Section Component
interface Stat {
  value: string
  label: string
  description?: string
  trend?: {
    value: string
    isPositive: boolean
  }
}

interface StatsSectionProps {
  stats: Stat[]
  title?: string
  description?: string
  columns?: 2 | 3 | 4
  className?: string
}

export function StatsSection({ stats, title, description, columns = 4, className }: StatsSectionProps) {
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <section className={cn("py-16 bg-muted/50", className)}>
      <div className="container mx-auto px-4">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && <H2 className="mb-4">{title}</H2>}
            {description && (
              <BodyLarge className="text-muted-foreground max-w-2xl mx-auto">
                {description}
              </BodyLarge>
            )}
          </div>
        )}
        
        <div className={cn("grid gap-8", gridClasses[columns])}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm font-medium mb-1">{stat.label}</div>
              {stat.description && (
                <BodySmall className="text-muted-foreground mb-2">
                  {stat.description}
                </BodySmall>
              )}
              {stat.trend && (
                <div className={cn(
                  "flex items-center justify-center text-sm",
                  stat.trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}>
                  <Icon 
                    name={stat.trend.isPositive ? "arrow-up-line" : "arrow-down-line"} 
                    className="mr-1 h-4 w-4" 
                  />
                  {stat.trend.value}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonial Section Component
interface Testimonial {
  content: string
  author: {
    name: string
    role: string
    avatar?: string
  }
  rating?: number
}

interface TestimonialSectionProps {
  testimonials: Testimonial[]
  title?: string
  description?: string
  className?: string
}

export function TestimonialSection({ testimonials, title, description, className }: TestimonialSectionProps) {
  return (
    <section className={cn("py-16", className)}>
      <div className="container mx-auto px-4">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && <H2 className="mb-4">{title}</H2>}
            {description && (
              <BodyLarge className="text-muted-foreground max-w-2xl mx-auto">
                {description}
              </BodyLarge>
            )}
          </div>
        )}
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-6">
                {testimonial.rating && (
                  <div className="flex items-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        name={i < testimonial.rating! ? "star-fill" : "star-line"}
                        className={cn(
                          "h-4 w-4",
                          i < testimonial.rating! ? "text-yellow-400" : "text-muted-foreground"
                        )}
                      />
                    ))}
                  </div>
                )}
                
                <blockquote className="text-muted-foreground mb-4">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-muted rounded-full mr-3" />
                  <div>
                    <div className="font-medium">{testimonial.author.name}</div>
                    <BodySmall className="text-muted-foreground">
                      {testimonial.author.role}
                    </BodySmall>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section Component
interface CTASectionProps {
  title: string
  description?: string
  actions: {
    label: string
    onClick: () => void
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    icon?: string
  }[]
  background?: "default" | "gradient" | "primary"
  className?: string
}

export function CTASection({
  title,
  description,
  actions,
  background = "default",
  className,
}: CTASectionProps) {
  const backgroundClasses = {
    default: "bg-muted/50",
    gradient: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
    primary: "bg-primary text-primary-foreground",
  }

  return (
    <section className={cn(
      "py-16",
      backgroundClasses[background],
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <H2 className="mb-4">{title}</H2>
          {description && (
            <BodyLarge className="mb-8 opacity-90">
              {description}
            </BodyLarge>
          )}
          
          <div className="flex gap-4 justify-center">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "default"}
                onClick={action.onClick}
                size="lg"
                className={cn(
                  background === "gradient" && action.variant === "outline" && 
                  "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                )}
              >
                {action.icon && (
                  <Icon name={action.icon} className="h-4 w-4" />
                )}
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Sidebar Layout Component
interface SidebarLayoutProps {
  sidebar: React.ReactNode
  children: React.ReactNode
  sidebarWidth?: "sm" | "md" | "lg"
  className?: string
}

export function SidebarLayout({ sidebar, children, sidebarWidth = "md", className }: SidebarLayoutProps) {
  const sidebarClasses = {
    sm: "w-64",
    md: "w-80",
    lg: "w-96",
  }

  return (
    <div className={cn("flex min-h-screen", className)}>
      <aside className={cn(
        "border-r bg-muted/50",
        sidebarClasses[sidebarWidth]
      )}>
        {sidebar}
      </aside>
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

// Two Column Layout Component
interface TwoColumnLayoutProps {
  left: React.ReactNode
  right: React.ReactNode
  reverse?: boolean
  gap?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function TwoColumnLayout({ left, right, reverse = false, gap = "lg", className }: TwoColumnLayoutProps) {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-8",
    lg: "gap-12",
    xl: "gap-16",
  }

  return (
    <div className={cn(
      "grid md:grid-cols-2",
      gapClasses[gap],
      className
    )}>
      <div className={reverse ? "order-2" : "order-1"}>
        {left}
      </div>
      <div className={reverse ? "order-1" : "order-2"}>
        {right}
      </div>
    </div>
  )
}

// Container Component
interface ContainerProps {
  children: React.ReactNode
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full"
  padding?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function Container({ children, maxWidth = "lg", padding = "md", className }: ContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-none",
  }

  const paddingClasses = {
    sm: "px-4",
    md: "px-6",
    lg: "px-8",
    xl: "px-12",
  }

  return (
    <div className={cn(
      "mx-auto",
      maxWidthClasses[maxWidth],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  )
}
