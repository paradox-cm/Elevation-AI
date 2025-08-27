import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GridProps {
  children: ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | {
    base?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    '2xl'?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  }
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  gapX?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  gapY?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  as?: keyof React.JSX.IntrinsicElements
}

const gridCols = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3", 
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12"
}

const responsiveGridCols = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3", 
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12"
}

const gapSizes = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16"
}

const gapXSizes = {
  0: "gap-x-0",
  1: "gap-x-1",
  2: "gap-x-2",
  3: "gap-x-3",
  4: "gap-x-4",
  5: "gap-x-5",
  6: "gap-x-6",
  8: "gap-x-8",
  10: "gap-x-10",
  12: "gap-x-12",
  16: "gap-x-16"
}

const gapYSizes = {
  0: "gap-y-0",
  1: "gap-y-1",
  2: "gap-y-2",
  3: "gap-y-3",
  4: "gap-y-4",
  5: "gap-y-5",
  6: "gap-y-6",
  8: "gap-y-8",
  10: "gap-y-10",
  12: "gap-y-12",
  16: "gap-y-16"
}

export function Grid({ 
  children, 
  className, 
  cols = 12,
  gap,
  gapX,
  gapY,
  as: Component = "div"
}: GridProps) {
  // Handle responsive column configuration
  const getResponsiveClasses = () => {
    if (typeof cols === 'object') {
      const classes = []
      
      // Base (mobile-first)
      if (cols.base) {
        classes.push(responsiveGridCols[cols.base])
      } else {
        classes.push("grid-cols-1") // Default to 1 column on mobile
      }
      
      // Small screens and up
      if (cols.sm) {
        classes.push(`sm:${responsiveGridCols[cols.sm]}`)
      }
      
      // Medium screens and up
      if (cols.md) {
        classes.push(`md:${responsiveGridCols[cols.md]}`)
      }
      
      // Large screens and up
      if (cols.lg) {
        classes.push(`lg:${responsiveGridCols[cols.lg]}`)
      }
      
      // Extra large screens and up
      if (cols.xl) {
        classes.push(`xl:${responsiveGridCols[cols.xl]}`)
      }
      
      // 2XL screens and up
      if (cols['2xl']) {
        classes.push(`2xl:${responsiveGridCols[cols['2xl']]}`)
      }
      
      return classes
    }
    
    // Fallback to legacy responsive behavior for single number
    return [
      gridCols[cols],
      cols > 1 && "sm:grid-cols-2",
      cols > 2 && "md:grid-cols-3",
      cols > 3 && "lg:grid-cols-4",
      cols > 4 && "xl:grid-cols-6",
      cols > 6 && "2xl:grid-cols-12"
    ].filter(Boolean)
  }

  return (
    <Component
      className={cn(
        "grid",
        ...getResponsiveClasses(),
        gap && gapSizes[gap],
        gapX && gapXSizes[gapX],
        gapY && gapYSizes[gapY],
        className
      )}
    >
      {children}
    </Component>
  )
}
