import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  className?: string
  padding?: "none" | "sm" | "md" | "lg" | "xl" | "2xl"
  paddingY?: "none" | "sm" | "md" | "lg" | "xl" | "2xl"
  paddingX?: "none" | "sm" | "md" | "lg" | "xl" | "2xl"
  as?: keyof React.JSX.IntrinsicElements
}

const paddingSizes = {
  none: "",
  sm: "p-4 sm:p-6",
  md: "p-6 sm:p-8 lg:p-12",
  lg: "p-8 sm:p-12 lg:p-16",
  xl: "p-12 sm:p-16 lg:p-24",
  "2xl": "p-16 sm:p-24 lg:p-32"
}

const paddingYSizes = {
  none: "",
  sm: "py-4 sm:py-6",
  md: "py-6 sm:py-8 lg:py-12",
  lg: "py-8 sm:py-12 lg:py-16",
  xl: "py-12 sm:py-16 lg:py-24",
  "2xl": "py-16 sm:py-24 lg:py-32"
}

const paddingXSizes = {
  none: "",
  sm: "px-4 sm:px-6",
  md: "px-6 sm:px-8 lg:px-12",
  lg: "px-8 sm:px-12 lg:px-16",
  xl: "px-12 sm:px-16 lg:px-24",
  "2xl": "px-16 sm:px-24 lg:px-32"
}

export function Section({ 
  children, 
  className,
  padding,
  paddingY,
  paddingX,
  as: Component = "section"
}: SectionProps) {
  return (
    <Component
      className={cn(
        "w-full",
        padding && paddingSizes[padding],
        paddingY && paddingYSizes[paddingY],
        paddingX && paddingXSizes[paddingX],
        className
      )}
    >
      {children}
    </Component>
  )
}
