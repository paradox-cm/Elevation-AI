import { cn } from "@/lib/utils"

type IconProps = {
  name: string
  className?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
}

const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm", 
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl"
}

export default function Icon({ name, className, size = "md" }: IconProps) {
  return (
    <i 
      className={cn(
        `ri-${name}`,
        sizeClasses[size],
        "inline-flex items-center justify-center",
        className
      )} 
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}
