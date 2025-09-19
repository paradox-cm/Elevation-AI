/**
 * Section Utilities
 * 
 * Utility functions to prevent common section spacing and height issues
 */

/**
 * Safe height calculations for containers
 * Prevents content cutoff by providing adequate space
 */
export const safeHeights = {
  // Animation containers - provides space for visual content
  animation: {
    small: "h-[320px] lg:h-[370px] xl:h-[420px] 2xl:h-[470px]",
    medium: "h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[550px]",
    large: "h-[500px] lg:h-[550px] xl:h-[600px] 2xl:h-[650px]"
  },
  
  // Content containers - provides space for text and interactive elements
  content: {
    small: "h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]",
    medium: "h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[550px]",
    large: "h-[500px] lg:h-[600px] xl:h-[650px] 2xl:h-[700px]"
  },
  
  // Card containers - flexible height for card content
  card: {
    small: "min-h-[200px] lg:min-h-[250px]",
    medium: "min-h-[300px] lg:min-h-[350px]",
    large: "min-h-[400px] lg:min-h-[450px]"
  }
} as const

/**
 * Standard spacing classes to prevent cutoff issues
 */
export const safeSpacing = {
  // Container bottom padding - prevents content cutoff
  containerBottom: "pb-6",
  containerBottomLarge: "pb-8",
  
  // Section spacing
  sectionGap: "space-y-6",
  sectionGapLarge: "space-y-8",
  
  // Grid spacing
  gridGap: "gap-4 lg:gap-8",
  gridGapLarge: "gap-6 lg:gap-10"
} as const

/**
 * Accordion styling that prevents border cutoff
 */
export const accordionStyles = {
  // Standard accordion item with proper borders
  item: "border border-border/50 rounded-lg px-6",
  
  // Trigger styling
  trigger: "text-left text-lg font-medium text-primary hover:no-underline py-6",
  
  // Content styling with proper padding
  content: "pb-6"
} as const

/**
 * Grid column configurations that prevent layout issues
 */
export const gridConfigs = {
  // Two-column layout with proper proportions
  twoColumn: {
    container: "grid grid-cols-12 gap-4 lg:gap-8 items-start",
    left: "col-span-12 lg:col-span-4 space-y-6",
    right: "col-span-12 lg:col-span-8 space-y-4 pb-6"
  },
  
  // Three-column layout
  threeColumn: {
    container: "grid grid-cols-12 gap-4 lg:gap-6 items-start",
    left: "col-span-12 lg:col-span-3 space-y-6",
    center: "col-span-12 lg:col-span-6 space-y-4 pb-6",
    right: "col-span-12 lg:col-span-3 space-y-6"
  }
} as const

/**
 * Helper function to create safe section structure
 */
export function createSafeSection({
  paddingY = "xl",
  className = "relative"
}: {
  paddingY?: "sm" | "md" | "lg" | "xl" | "2xl"
  className?: string
}) {
  return {
    sectionProps: {
      paddingY,
      className
    },
    containerProps: {
      size: "2xl" as const,
      className: "px-4 sm:px-6 lg:px-8 lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px] relative z-10"
    },
    contentProps: {
      className: `${safeSpacing.sectionGap} ${safeSpacing.containerBottom}`
    }
  }
}

/**
 * Helper function to create safe accordion structure
 */
export function createSafeAccordion(_items: Array<{
  title: string
  content: string
  value: string
}>) {
  return {
    accordionProps: {
      type: "single" as const,
      collapsible: true,
      className: "w-full"
    },
    itemProps: (value: string) => ({
      key: value,
      value,
      className: accordionStyles.item
    }),
    triggerProps: {
      className: accordionStyles.trigger
    },
    contentProps: {
      className: accordionStyles.content
    }
  }
}

/**
 * Validation function to check for common spacing issues
 */
export function validateSectionSpacing(className: string): string[] {
  const warnings: string[] = []
  
  // Check for insufficient bottom padding
  if (!className.includes('pb-') && !className.includes('space-y-')) {
    warnings.push("Missing bottom padding - consider adding pb-6")
  }
  
  // Check for complex height calculations
  if (className.includes('calc(')) {
    warnings.push("Complex height calculations detected - consider using safeHeights utility")
  }
  
  // Check for very small heights
  if (className.includes('h-[2') || className.includes('h-[3')) {
    warnings.push("Small height detected - may cause content cutoff")
  }
  
  return warnings
}
