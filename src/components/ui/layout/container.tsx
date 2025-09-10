import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: keyof React.JSX.IntrinsicElements
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
}

const containerSizes = {
  sm: "max-w-full",
  md: "max-w-full", 
  lg: "max-w-[1400px]",
  xl: "max-w-[1920px]",
  "2xl": "max-w-[2560px]",
  full: "max-w-full"
}

export function Container({ 
  children, 
  className, 
  as: Component = "div",
  size = "2xl" 
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        containerSizes[size],
        className
      )}
    >
      {children}
    </Component>
  )
}
