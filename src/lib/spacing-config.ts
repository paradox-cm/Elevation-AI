// Spacing Configuration - Single Source of Truth
// This file defines all spacing settings used throughout the application
// Changes here will automatically propagate to all components and pages

export interface SpacingItem {
  name: string
  value: number
  class: string
  description: string
  category: 'component' | 'layout' | 'page'
  usage: string[]
}

export interface ContainerSize {
  name: string
  value: number
  class: string
  description: string
  breakpoint?: string
}

export interface SpacingExample {
  title: string
  description: string
  examples: {
    label: string
    spacing: string
    class: string
    context: string
  }[]
}

export interface SpacingRule {
  title: string
  description: string
  icon: string
  examples: string[]
  category: 'do' | 'dont'
}

// Spacing Scale Configuration
export const spacingScale: SpacingItem[] = [
  { name: "0", value: 0, class: "0", description: "No spacing", category: "component", usage: ["Reset margins", "Tight layouts", "Overlapping elements"] },
  { name: "0.5", value: 2, class: "0.5", description: "Tiny spacing", category: "component", usage: ["Icon spacing", "Tight text", "Minimal padding"] },
  { name: "1", value: 4, class: "1", description: "Extra small spacing", category: "component", usage: ["Button padding", "Icon buttons", "Tight components"] },
  { name: "1.5", value: 6, class: "1.5", description: "Small spacing", category: "component", usage: ["Form fields", "Small components", "Tight layouts"] },
  { name: "2", value: 8, class: "2", description: "Small spacing", category: "component", usage: ["Card padding", "Button spacing", "Component margins"] },
  { name: "2.5", value: 10, class: "2.5", description: "Small-medium spacing", category: "component", usage: ["Form spacing", "Component gaps", "Medium padding"] },
  { name: "3", value: 12, class: "3", description: "Medium spacing", category: "component", usage: ["Section padding", "Component spacing", "Form layouts"] },
  { name: "3.5", value: 14, class: "3.5", description: "Medium spacing", category: "component", usage: ["Content spacing", "Component margins", "Medium layouts"] },
  { name: "4", value: 16, class: "4", description: "Medium spacing", category: "component", usage: ["Card padding", "Section margins", "Standard spacing"] },
  { name: "5", value: 20, class: "5", description: "Medium-large spacing", category: "layout", usage: ["Grid gaps", "Section spacing", "Content margins"] },
  { name: "6", value: 24, class: "6", description: "Large spacing", category: "layout", usage: ["Grid spacing", "Section padding", "Component separation"] },
  { name: "7", value: 28, class: "7", description: "Large spacing", category: "layout", usage: ["Major sections", "Content blocks", "Layout spacing"] },
  { name: "8", value: 32, class: "8", description: "Extra large spacing", category: "layout", usage: ["Page sections", "Major content", "Layout separation"] },
  { name: "9", value: 36, class: "9", description: "Extra large spacing", category: "layout", usage: ["Hero sections", "Major spacing", "Page layouts"] },
  { name: "10", value: 40, class: "10", description: "Extra large spacing", category: "page", usage: ["Page sections", "Hero content", "Major spacing"] },
  { name: "11", value: 44, class: "11", description: "Extra large spacing", category: "page", usage: ["Large sections", "Page layouts", "Major content"] },
  { name: "12", value: 48, class: "12", description: "Extra large spacing", category: "page", usage: ["Page sections", "Major layouts", "Content separation"] },
  { name: "14", value: 56, class: "14", description: "Huge spacing", category: "page", usage: ["Hero sections", "Major page sections", "Large layouts"] },
  { name: "16", value: 64, class: "16", description: "Huge spacing", category: "page", usage: ["Page sections", "Hero content", "Major layouts"] },
  { name: "20", value: 80, class: "20", description: "Massive spacing", category: "page", usage: ["Full page sections", "Hero layouts", "Major content"] },
  { name: "24", value: 96, class: "24", description: "Massive spacing", category: "page", usage: ["Page sections", "Hero layouts", "Major spacing"] },
  { name: "28", value: 112, class: "28", description: "Massive spacing", category: "page", usage: ["Full page layouts", "Hero sections", "Major content"] },
  { name: "32", value: 128, class: "32", description: "Massive spacing", category: "page", usage: ["Full page sections", "Hero layouts", "Maximum spacing"] }
]

// Container Sizes Configuration
export const containerSizes: ContainerSize[] = [
  { name: "xs", value: 475, class: "max-w-xs", description: "Extra small containers", breakpoint: "sm" },
  { name: "sm", value: 640, class: "max-w-sm", description: "Small containers", breakpoint: "sm" },
  { name: "md", value: 768, class: "max-w-md", description: "Medium containers", breakpoint: "md" },
  { name: "lg", value: 1024, class: "max-w-lg", description: "Large containers", breakpoint: "lg" },
  { name: "xl", value: 1280, class: "max-w-xl", description: "Extra large containers", breakpoint: "xl" },
  { name: "2xl", value: 1536, class: "max-w-2xl", description: "2X large containers", breakpoint: "2xl" },
  { name: "3xl", value: 1920, class: "max-w-3xl", description: "3X large containers", breakpoint: "3xl" },
  { name: "4xl", value: 2560, class: "max-w-4xl", description: "4X large containers", breakpoint: "4xl" },
  { name: "5xl", value: 3200, class: "max-w-5xl", description: "5X large containers", breakpoint: "5xl" },
  { name: "6xl", value: 3840, class: "max-w-6xl", description: "6X large containers", breakpoint: "6xl" },
  { name: "7xl", value: 4480, class: "max-w-7xl", description: "7X large containers", breakpoint: "7xl" }
]

// Spacing Usage Examples
export const spacingExamples: SpacingExample[] = [
  {
    title: "Component Internal Spacing",
    description: "Spacing within individual components",
    examples: [
      { label: "Button padding", spacing: "2", class: "p-2", context: "Standard button padding" },
      { label: "Card padding", spacing: "4", class: "pt-4 pb-4", context: "Card top and bottom padding" },
      { label: "Form field spacing", spacing: "2", class: "space-y-2", context: "Form field vertical spacing (label to input) - use FormItem component" },
      { label: "Form container spacing", spacing: "6", class: "space-y-6", context: "Spacing between form fields - use Form component" },
      { label: "Form section spacing", spacing: "5", class: "space-y-5", context: "Spacing between form sections" },
      { label: "Section bottom margin", spacing: "6", class: "mb-6", context: "Default bottom margin for sections without paddingY" },
      { label: "Icon button", spacing: "2", class: "p-2", context: "Icon button padding" }
    ]
  },
  {
    title: "Component External Spacing",
    description: "Spacing between components and sections",
    examples: [
      { label: "Card margins", spacing: "4", class: "m-4", context: "Card container margins" },
      { label: "Section padding", spacing: "8", class: "py-8", context: "Section vertical padding" },
      { label: "Grid gaps", spacing: "6", class: "gap-6", context: "Grid item spacing" },
      { label: "List item spacing", spacing: "2", class: "space-y-2", context: "List item vertical spacing" }
    ]
  },
  {
    title: "Layout Spacing",
    description: "Spacing for page layouts and major sections",
    examples: [
      { label: "Page sections", spacing: "12", class: "py-12", context: "Major page section spacing" },
      { label: "Hero sections", spacing: "16", class: "py-16", context: "Hero section vertical spacing" },
      { label: "Container padding", spacing: "4", class: "px-4", context: "Container horizontal padding" },
      { label: "Footer spacing", spacing: "8", class: "py-8", context: "Footer section spacing" }
    ]
  }
]

// Spacing Rules and Guidelines
export const spacingRules: SpacingRule[] = [
  {
    title: "Consistency",
    description: "Use the spacing scale consistently throughout your application",
    icon: "ruler-line",
    examples: ["Always use predefined spacing values", "Don't mix different spacing systems", "Maintain visual rhythm"],
    category: "do"
  },
  {
    title: "Hierarchy",
    description: "Use spacing to create visual hierarchy and relationships",
    icon: "layout-line",
    examples: ["Related elements should have less spacing", "Unrelated elements should have more spacing", "Use spacing to group content"],
    category: "do"
  },
  {
    title: "Responsiveness",
    description: "Adjust spacing for different screen sizes",
    icon: "smartphone-line",
    examples: ["Reduce spacing on mobile devices", "Increase spacing on larger screens", "Use responsive spacing utilities"],
    category: "do"
  },
  {
    title: "Accessibility",
    description: "Ensure spacing doesn't interfere with accessibility",
    icon: "eye-line",
    examples: ["Maintain sufficient touch targets", "Don't make elements too close together", "Consider screen reader navigation"],
    category: "do"
  },
  {
    title: "Arbitrary Values",
    description: "Avoid using arbitrary spacing values outside the scale",
    icon: "close-line",
    examples: ["Don't use random pixel values", "Avoid mixing different spacing systems", "Don't create inconsistent patterns"],
    category: "dont"
  },
  {
    title: "Over-spacing",
    description: "Don't use excessive spacing that breaks visual relationships",
    icon: "close-line",
    examples: ["Don't over-space related elements", "Avoid too much white space", "Don't break content flow"],
    category: "dont"
  },
  {
    title: "Form Implementation",
    description: "Always use design system Form components for consistent spacing",
    icon: "form-line",
    examples: ["Use FormItem for 8px label-to-input spacing", "Use Form component with space-y-6 for field spacing", "Don't create custom form spacing patterns"],
    category: "do"
  }
]

// Spacing System Foundation
export const spacingFoundation = {
  baseUnit: 4,
  unit: "px",
  description: "Our spacing system is built on a 4px base unit, creating a consistent and scalable foundation.",
  principles: {
    consistency: "Use the spacing scale consistently throughout your application",
    hierarchy: "Use spacing to create visual hierarchy and relationships",
    responsiveness: "Adjust spacing for different screen sizes",
    accessibility: "Ensure spacing doesn't interfere with accessibility"
  }
}

// Spacing Categories
export const spacingCategories = {
  component: {
    title: "Component Spacing",
    description: "Internal spacing within components (padding, margins between elements)",
    range: "0px - 16px",
    examples: ["p-2, p-4, space-y-2", "Button padding", "Card content", "Form fields"],
    icon: "component-line"
  },
  layout: {
    title: "Layout Spacing",
    description: "Spacing between components and major sections (grids, sections)",
    range: "20px - 64px",
    examples: ["gap-6, py-8, my-12", "Grid spacing", "Section padding", "Component separation"],
    icon: "layout-line"
  },
  page: {
    title: "Page Spacing",
    description: "Large spacing for page-level layouts and major sections",
    range: "64px+",
    examples: ["py-16, my-20, px-8", "Page sections", "Hero sections", "Major layouts"],
    icon: "fullscreen-line"
  }
}

// Implementation Details
export const implementationDetails = {
  tailwindClasses: {
    description: "Tailwind CSS spacing utilities",
    examples: [
      "p-4 → padding: 1rem (16px)",
      "m-6 → margin: 1.5rem (24px)",
      "space-y-2 → gap: 0.5rem (8px)",
      "gap-4 → gap: 1rem (16px)"
    ]
  },
  cssVariables: {
    description: "Available CSS custom properties",
    examples: [
      "--spacing-1: 0.25rem (4px)",
      "--spacing-2: 0.5rem (8px)",
      "--spacing-4: 1rem (16px)",
      "--spacing-8: 2rem (32px)"
    ]
  }
}

// Helper functions
export function getSpacingByName(name: string): SpacingItem | undefined {
  return spacingScale.find(spacing => spacing.name === name)
}

export function getSpacingByValue(value: number): SpacingItem | undefined {
  return spacingScale.find(spacing => spacing.value === value)
}

export function getSpacingByCategory(category: 'component' | 'layout' | 'page'): SpacingItem[] {
  return spacingScale.filter(spacing => spacing.category === category)
}

export function getContainerSizeByName(name: string): ContainerSize | undefined {
  return containerSizes.find(container => container.name === name)
}

export function getContainerSizeByValue(value: number): ContainerSize | undefined {
  return containerSizes.find(container => container.value === value)
}

export function getSpacingExamplesByCategory(category: string): SpacingExample | undefined {
  return spacingExamples.find(example => 
    example.title.toLowerCase().includes(category.toLowerCase())
  )
}

export function getSpacingRulesByCategory(category: 'do' | 'dont'): SpacingRule[] {
  return spacingRules.filter(rule => rule.category === category)
}
