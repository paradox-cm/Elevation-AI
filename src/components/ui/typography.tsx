import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { getTypeScaleByComponent } from "@/lib/typography-config"

interface TypographyProps {
  children: ReactNode
  className?: string
  as?: keyof React.JSX.IntrinsicElements
}

// Display Components
export function DisplayLarge({ children, className, as: Component = "h1" }: TypographyProps) {
  const typeScaleItem = getTypeScaleByComponent("DisplayLarge")
  const classes = typeScaleItem ? `${typeScaleItem.class} ${typeScaleItem.weight} ${typeScaleItem.lineHeight} ${typeScaleItem.tracking}` : ""
  return (
    <Component className={cn(classes, className)}>
      {children}
    </Component>
  )
}

export function DisplayMedium({ children, className, as: Component = "h1" }: TypographyProps) {
  const typeScaleItem = getTypeScaleByComponent("DisplayMedium")
  const classes = typeScaleItem ? `${typeScaleItem.class} ${typeScaleItem.weight} ${typeScaleItem.lineHeight} ${typeScaleItem.tracking}` : ""
  return (
    <Component className={cn(classes, className)}>
      {children}
    </Component>
  )
}

export function DisplaySmall({ children, className, as: Component = "h1" }: TypographyProps) {
  const typeScaleItem = getTypeScaleByComponent("DisplaySmall")
  const classes = typeScaleItem ? `${typeScaleItem.class} ${typeScaleItem.weight} ${typeScaleItem.lineHeight} ${typeScaleItem.tracking}` : ""
  return (
    <Component className={cn(classes, className)}>
      {children}
    </Component>
  )
}

// Heading Components
export function H1({ children, className, as: Component = "h1" }: TypographyProps) {
  const typeScaleItem = getTypeScaleByComponent("H1")
  const classes = typeScaleItem ? `${typeScaleItem.class} ${typeScaleItem.weight} ${typeScaleItem.lineHeight} ${typeScaleItem.tracking}` : ""
  return (
    <Component className={cn(classes, className)}>
      {children}
    </Component>
  )
}

export function H2({ children, className, as: Component = "h2" }: TypographyProps) {
  const typeScaleItem = getTypeScaleByComponent("H2")
  const classes = typeScaleItem ? `${typeScaleItem.class} ${typeScaleItem.weight} ${typeScaleItem.lineHeight} ${typeScaleItem.tracking}` : ""
  return (
    <Component className={cn(classes, className)}>
      {children}
    </Component>
  )
}

export function H3({ children, className, as: Component = "h3" }: TypographyProps) {
  const typeScaleItem = getTypeScaleByComponent("H3")
  const classes = typeScaleItem ? `${typeScaleItem.class} ${typeScaleItem.weight} ${typeScaleItem.lineHeight} ${typeScaleItem.tracking}` : ""
  return (
    <Component className={cn(classes, className)}>
      {children}
    </Component>
  )
}

export function H4({ children, className, as: Component = "h4" }: TypographyProps) {
  return (
    <Component className={cn(
      "text-lg font-medium leading-normal tracking-normal",
      className
    )}>
      {children}
    </Component>
  )
}

// Text Components
export function P({ children, className, as: Component = "p" }: TypographyProps) {
  const typeScaleItem = getTypeScaleByComponent("P")
  const classes = typeScaleItem ? `${typeScaleItem.class} ${typeScaleItem.weight} ${typeScaleItem.lineHeight} ${typeScaleItem.tracking}` : ""
  return (
    <Component className={cn(classes, className)}>
      {children}
    </Component>
  )
}

export function BodyLarge({ children, className, as: Component = "p" }: TypographyProps) {
  const typeScaleItem = getTypeScaleByComponent("BodyLarge")
  const classes = typeScaleItem ? `${typeScaleItem.class} ${typeScaleItem.weight} ${typeScaleItem.lineHeight} ${typeScaleItem.tracking}` : ""
  return (
    <Component className={cn(classes, className)}>
      {children}
    </Component>
  )
}

export function BodySmall({ children, className, as: Component = "p" }: TypographyProps) {
  const typeScaleItem = getTypeScaleByComponent("BodySmall")
  const classes = typeScaleItem ? `${typeScaleItem.class} ${typeScaleItem.weight} ${typeScaleItem.lineHeight} ${typeScaleItem.tracking}` : ""
  return (
    <Component className={cn(classes, className)}>
      {children}
    </Component>
  )
}

export function Caption({ children, className, as: Component = "span" }: TypographyProps) {
  const typeScaleItem = getTypeScaleByComponent("Caption")
  const classes = typeScaleItem ? `${typeScaleItem.class} ${typeScaleItem.weight} ${typeScaleItem.lineHeight} ${typeScaleItem.tracking}` : ""
  return (
    <Component className={cn(classes, className)}>
      {children}
    </Component>
  )
}

// Legacy components for backward compatibility
export function Lead({ children, className, as: Component = "p" }: TypographyProps) {
  return (
    <Component className={cn(
      "text-lg font-normal leading-relaxed text-muted-foreground",
      className
    )}>
      {children}
    </Component>
  )
}

export function Large({ children, className, as: Component = "div" }: TypographyProps) {
  return (
    <Component className={cn(
      "text-lg font-medium leading-snug",
      className
    )}>
      {children}
    </Component>
  )
}

export function Small({ children, className, as: Component = "small" }: TypographyProps) {
  return (
    <Component className={cn(
      "text-sm font-normal leading-relaxed",
      className
    )}>
      {children}
    </Component>
  )
}

export function Muted({ children, className, as: Component = "p" }: TypographyProps) {
  return (
    <Component className={cn(
      "text-sm font-normal leading-relaxed text-muted-foreground",
      className
    )}>
      {children}
    </Component>
  )
}

// List Components
export function Ul({ children, className, as: Component = "ul" }: TypographyProps) {
  return (
    <Component className={cn(
      "my-6 ml-6 list-disc [&>li]:mt-2",
      className
    )}>
      {children}
    </Component>
  )
}

export function Ol({ children, className, as: Component = "ol" }: TypographyProps) {
  return (
    <Component className={cn(
      "my-6 ml-6 list-decimal [&>li]:mt-2",
      className
    )}>
      {children}
    </Component>
  )
}

export function Li({ children, className, as: Component = "li" }: TypographyProps) {
  return (
    <Component className={cn("", className)}>
      {children}
    </Component>
  )
}

// Code Components
export function Code({ children, className, as: Component = "code" }: TypographyProps) {
  return (
    <Component className={cn(
      "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      className
    )}>
      {children}
    </Component>
  )
}

export function Pre({ children, className, as: Component = "pre" }: TypographyProps) {
  return (
    <Component className={cn(
      "mt-6 overflow-x-auto rounded-lg border bg-black py-4",
      className
    )}>
      {children}
    </Component>
  )
}

// Blockquote Component
export function Blockquote({ children, className, as: Component = "blockquote" }: TypographyProps) {
  return (
    <Component className={cn(
      "mt-6 border-l-2 pl-6 italic",
      className
    )}>
      {children}
    </Component>
  )
}
