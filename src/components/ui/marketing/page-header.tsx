import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  centered?: boolean
}

const sizeClasses = {
  sm: "space-y-2",
  md: "space-y-3",
  lg: "space-y-4",
  xl: "space-y-6"
}

const titleSizes = {
  sm: "text-2xl font-bold tracking-tight",
  md: "text-3xl font-bold tracking-tight",
  lg: "text-4xl font-bold tracking-tight",
  xl: "text-5xl font-bold tracking-tight"
}

const descriptionSizes = {
  sm: "text-sm text-muted-foreground",
  md: "text-base text-muted-foreground",
  lg: "text-lg text-muted-foreground",
  xl: "text-xl text-muted-foreground"
}

export function PageHeader({ 
  title, 
  description, 
  children,
  className,
  size = "md",
  centered = false
}: PageHeaderProps) {
  return (
    <div className={cn(
      "w-full",
      sizeClasses[size],
      centered && "text-center",
      className
    )}>
      <div className="space-y-1">
        <h1 className={cn(
          titleSizes[size],
          "text-foreground"
        )}>
          {title}
        </h1>
        {description && (
          <p className={cn(
            descriptionSizes[size],
            "max-w-[42rem]",
            centered && "mx-auto"
          )}>
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex flex-wrap items-center gap-2">
          {children}
        </div>
      )}
    </div>
  )
}
