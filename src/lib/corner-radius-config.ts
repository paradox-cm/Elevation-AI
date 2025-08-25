// Corner Radius Configuration - Single Source of Truth
// This file defines all corner radius settings used throughout the application
// Changes here will automatically propagate to all components and pages

export interface RadiusItem {
  name: string
  value: string
  class: string
  description: string
  cssVar?: string
  usage: string[]
  category: 'sharp' | 'subtle' | 'standard' | 'prominent' | 'circular'
  pixelValue: number
}

export interface ComponentExample {
  name: string
  radius: string
  description: string
  category: 'ui' | 'content' | 'media' | 'form'
  radiusClass: string
  useCases: string[]
}

export interface UsageGuideline {
  title: string
  description: string
  icon: string
  category: 'do' | 'dont'
  examples: string[]
}

export interface RadiusFoundation {
  baseUnit: string
  description: string
  principles: {
    hierarchy: string
    consistency: string
    context: string
    accessibility: string
  }
}

// Corner Radius Scale Configuration
export const radiusScale: RadiusItem[] = [
  {
    name: "None",
    value: "0px",
    class: "rounded-none",
    description: "Sharp corners for technical or data-heavy interfaces",
    usage: ["Data tables", "Technical components", "Sharp designs"],
    category: "sharp",
    pixelValue: 0
  },
  {
    name: "Small",
    value: "6px",
    class: "rounded-sm",
    cssVar: "--radius-sm",
    description: "Subtle rounding for compact elements",
    usage: ["Small buttons", "Compact cards", "Tight layouts"],
    category: "subtle",
    pixelValue: 6
  },
  {
    name: "Medium",
    value: "8px",
    class: "rounded-md",
    cssVar: "--radius-md",
    description: "Default radius for most interactive elements",
    usage: ["Buttons", "Input fields", "Standard components"],
    category: "standard",
    pixelValue: 8
  },
  {
    name: "Default",
    value: "10px",
    class: "rounded-lg",
    cssVar: "--radius-lg",
    description: "Base radius for cards and containers",
    usage: ["Cards", "Containers", "Base components"],
    category: "standard",
    pixelValue: 10
  },
  {
    name: "Large",
    value: "14px",
    class: "rounded-xl",
    cssVar: "--radius-xl",
    description: "Prominent elements and hero components",
    usage: ["Hero sections", "Prominent cards", "Important elements"],
    category: "prominent",
    pixelValue: 14
  },
  {
    name: "Full",
    value: "9999px",
    class: "rounded-full",
    description: "Circular elements like avatars and pills",
    usage: ["Avatars", "Pills", "Circular buttons"],
    category: "circular",
    pixelValue: 9999
  }
]

// Component Examples Configuration
export const componentExamples: ComponentExample[] = [
  {
    name: "Buttons",
    radius: "rounded-md",
    description: "Standard interactive elements use medium radius for balance between modern and accessible",
    category: "ui",
    radiusClass: "rounded-md",
    useCases: ["Primary buttons", "Secondary buttons", "Action buttons"]
  },
  {
    name: "Cards",
    radius: "rounded-xl",
    description: "Content containers use large radius to create clear visual hierarchy",
    category: "content",
    radiusClass: "rounded-xl",
    useCases: ["Content cards", "Feature cards", "Product cards"]
  },
  {
    name: "Inputs",
    radius: "rounded-md",
    description: "Form elements use medium radius for consistency with buttons",
    category: "form",
    radiusClass: "rounded-md",
    useCases: ["Text inputs", "Search fields", "Form controls"]
  },
  {
    name: "Badges",
    radius: "rounded-md",
    description: "Small informational elements use medium radius",
    category: "ui",
    radiusClass: "rounded-md",
    useCases: ["Status badges", "Category tags", "Notification badges"]
  },
  {
    name: "Avatars",
    radius: "rounded-full",
    description: "Profile images are fully rounded for recognition and friendliness",
    category: "media",
    radiusClass: "rounded-full",
    useCases: ["User avatars", "Profile pictures", "Circular images"]
  },
  {
    name: "Icons",
    radius: "rounded-lg",
    description: "Icon containers use default radius to complement the overall design",
    category: "ui",
    radiusClass: "rounded-lg",
    useCases: ["Icon buttons", "Icon containers", "Feature icons"]
  }
]

// Usage Guidelines Configuration
export const usageGuidelines: UsageGuideline[] = [
  {
    title: "Hierarchy",
    description: "Larger radius values create more visual prominence. Use sparingly for hero elements.",
    icon: "stack-line",
    category: "do",
    examples: ["Use larger radius for important elements", "Create visual hierarchy through radius variation", "Apply prominent radius to hero sections"]
  },
  {
    title: "Consistency",
    description: "Maintain consistent radius across similar component types throughout your interface.",
    icon: "grid-line",
    category: "do",
    examples: ["Use same radius for similar components", "Follow established patterns", "Maintain design system consistency"]
  },
  {
    title: "Context",
    description: "Consider the overall design language - more rounded for friendly, less for technical.",
    icon: "palette-line",
    category: "do",
    examples: ["Match radius to brand personality", "Consider user expectations", "Align with design language"]
  },
  {
    title: "Accessibility",
    description: "Ensure sufficient contrast at rounded corners and avoid extremely small radii.",
    icon: "eye-line",
    category: "do",
    examples: ["Test with screen readers", "Ensure sufficient contrast", "Avoid extremely small radius"]
  },
  {
    title: "Random Usage",
    description: "Avoid mixing too many different radius values randomly",
    icon: "close-line",
    category: "dont",
    examples: ["Don't mix radius values randomly", "Avoid inconsistent patterns", "Don't break visual hierarchy"]
  },
  {
    title: "Over-sizing",
    description: "Don't use extremely large radius on small elements",
    icon: "close-line",
    category: "dont",
    examples: ["Don't apply large radius to small elements", "Consider element size", "Maintain proportion"]
  }
]

// Corner Radius System Foundation
export const radiusFoundation: RadiusFoundation = {
  baseUnit: "10px",
  description: "Our corner radius system provides consistent rounding values for different interface elements, creating visual hierarchy and brand personality.",
  principles: {
    hierarchy: "Use larger radius values for more prominent elements",
    consistency: "Maintain consistent radius across similar component types",
    context: "Consider the overall design language and brand personality",
    accessibility: "Ensure sufficient contrast and test with assistive technologies"
  }
}

// CSS Custom Properties
export const cssCustomProperties = {
  description: "The corner radius system is built on CSS custom properties for easy customization.",
  baseValue: "--radius: 0.625rem; /* 10px */",
  calculatedValues: [
    "--radius-sm: calc(var(--radius) - 4px); /* 6px */",
    "--radius-md: calc(var(--radius) - 2px); /* 8px */",
    "--radius-lg: var(--radius);              /* 10px */",
    "--radius-xl: calc(var(--radius) + 4px); /* 14px */"
  ]
}

// Tailwind CSS Classes
export const tailwindClasses = {
  description: "Utility classes for applying corner radius in your components.",
  utilities: [
    "rounded-none → border-radius: 0px",
    "rounded-sm   → border-radius: 6px",
    "rounded-md   → border-radius: 8px",
    "rounded-lg   → border-radius: 10px",
    "rounded-xl   → border-radius: 14px",
    "rounded-full → border-radius: 9999px"
  ],
  directional: [
    "rounded-t-lg → border-top-left-radius: 10px; border-top-right-radius: 10px",
    "rounded-l-lg → border-top-left-radius: 10px; border-bottom-left-radius: 10px",
    "rounded-r-lg → border-top-right-radius: 10px; border-bottom-right-radius: 10px",
    "rounded-b-lg → border-bottom-left-radius: 10px; border-bottom-right-radius: 10px"
  ]
}

// Accessibility Considerations
export const accessibilityConsiderations = {
  visual: {
    title: "Visual Considerations",
    points: [
      "Ensure sufficient contrast at rounded corners",
      "Avoid extremely small radius that may appear broken",
      "Consider how radius affects focus indicators"
    ]
  },
  interactive: {
    title: "Interactive Considerations",
    points: [
      "Maintain consistent touch targets regardless of radius",
      "Ensure hover states work well with rounded corners",
      "Test with keyboard navigation and focus states"
    ]
  }
}

// Implementation Examples
export const implementationExamples = {
  reactComponent: {
    title: "React Component Example",
    description: "Using Tailwind classes",
    code: `function Card(props) {
  const { children, className } = props
  return (
    <div className={cn(
      "bg-card border rounded-xl shadow-sm",
      className
    )}>
      {children}
    </div>
  )
}`
  },
  customCSS: {
    title: "Custom CSS Example",
    description: "Using CSS custom properties",
    code: `.custom-card {
  border-radius: var(--radius-lg);
  background: var(--card);
  border: 1px solid var(--border);
}

/* Responsive radius */
@media (max-width: 768px) {
  .custom-card {
    border-radius: var(--radius-md);
  }
}`
  }
}

// Customization Examples
export const customizationExamples = {
  subtle: {
    title: "Subtle Rounding",
    description: "For more technical, minimal designs",
    code: `:root {
  --radius: 0.5rem; /* More subtle rounding */
}`
  },
  technical: {
    title: "Technical Look",
    description: "For sharp, technical interfaces",
    code: `:root {
  --radius: 0.25rem; /* Minimal rounding */
}`
  },
  friendly: {
    title: "Friendly Feel",
    description: "For approachable, friendly designs",
    code: `:root {
  --radius: 1rem; /* More pronounced rounding */
}`
  }
}

// Helper functions
export function getRadiusByName(name: string): RadiusItem | undefined {
  return radiusScale.find(radius => radius.name === name)
}

export function getRadiusByValue(value: string): RadiusItem | undefined {
  return radiusScale.find(radius => radius.value === value)
}

export function getRadiusByCategory(category: 'sharp' | 'subtle' | 'standard' | 'prominent' | 'circular'): RadiusItem[] {
  return radiusScale.filter(radius => radius.category === category)
}

export function getComponentExampleByName(name: string): ComponentExample | undefined {
  return componentExamples.find(example => example.name === name)
}

export function getComponentExamplesByCategory(category: 'ui' | 'content' | 'media' | 'form'): ComponentExample[] {
  return componentExamples.filter(example => example.category === category)
}

export function getUsageGuidelinesByCategory(category: 'do' | 'dont'): UsageGuideline[] {
  return usageGuidelines.filter(guideline => guideline.category === category)
}
