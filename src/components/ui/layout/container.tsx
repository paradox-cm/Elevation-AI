import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: keyof React.JSX.IntrinsicElements
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
}

const containerSizes = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md", 
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full"
}

export function Container({ 
  children, 
  className, 
  as: Component = "div",
  size = "xl" 
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8",
        containerSizes[size],
        className
      )}
    >
      {children}
    </Component>
  )
}
