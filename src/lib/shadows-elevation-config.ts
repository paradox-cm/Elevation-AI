// Shadows & Elevation Configuration - Single Source of Truth
// This file defines all shadow and elevation settings used throughout the application
// Changes here will automatically propagate to all components and pages

export interface ShadowItem {
  name: string
  value: string
  class: string
  description: string
  elevation: string
  cssValue: string
  usage: string[]
  category: 'subtle' | 'standard' | 'prominent' | 'maximum'
}

export interface ElevationLevel {
  name: string
  description: string
  usage: string
  examples: string[]
  level: number
  shadowClass: string
  useCases: string[]
}

export interface ComponentExample {
  name: string
  shadow: string
  description: string
  category: 'ui' | 'content' | 'overlay'
  elevationLevel: number
}

export interface UsageGuideline {
  title: string
  description: string
  icon: string
  category: 'do' | 'dont'
  examples: string[]
}

export interface ShadowFoundation {
  baseUnit: string
  description: string
  principles: {
    hierarchy: string
    consistency: string
    accessibility: string
    performance: string
  }
}

// Shadow Scale Configuration
export const shadowScale: ShadowItem[] = [
  {
    name: "None",
    value: "none",
    class: "shadow-none",
    description: "No shadow for flat, minimal designs",
    elevation: "Ground level",
    cssValue: "none",
    usage: ["Backgrounds", "Base containers", "Flat surfaces"],
    category: "subtle"
  },
  {
    name: "Extra Small",
    value: "xs",
    class: "shadow-xs",
    description: "Subtle depth for small interactive elements",
    elevation: "1px above surface",
    cssValue: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    usage: ["Buttons", "Badges", "Small interactive elements"],
    category: "subtle"
  },
  {
    name: "Small",
    value: "sm",
    class: "shadow-sm",
    description: "Light shadow for cards and containers",
    elevation: "2px above surface",
    cssValue: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    usage: ["Cards", "Navigation bars", "Form fields"],
    category: "standard"
  },
  {
    name: "Medium",
    value: "md",
    class: "shadow-md",
    description: "Standard shadow for primary content",
    elevation: "4px above surface",
    cssValue: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    usage: ["Content cards", "Sidebars", "Main containers"],
    category: "standard"
  },
  {
    name: "Large",
    value: "lg",
    class: "shadow-lg",
    description: "Prominent shadow for important elements",
    elevation: "8px above surface",
    cssValue: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    usage: ["Hero sections", "Important cards", "Floating elements"],
    category: "prominent"
  },
  {
    name: "Extra Large",
    value: "xl",
    class: "shadow-xl",
    description: "Strong shadow for hero elements",
    elevation: "16px above surface",
    cssValue: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    usage: ["Hero cards", "Call-to-action buttons", "Important alerts"],
    category: "prominent"
  },
  {
    name: "2XL",
    value: "2xl",
    class: "shadow-2xl",
    description: "Maximum shadow for modal overlays",
    elevation: "24px above surface",
    cssValue: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    usage: ["Modals", "Dropdowns", "Tooltips", "Floating action buttons"],
    category: "maximum"
  }
]

// Elevation Levels Configuration
export const elevationLevels: ElevationLevel[] = [
  {
    name: "Ground Level",
    description: "No elevation, flat surfaces",
    usage: "Backgrounds, base containers",
    examples: ["Page backgrounds", "Base cards", "Form fields"],
    level: 0,
    shadowClass: "shadow-none",
    useCases: ["Base surfaces", "Background elements", "Flat content"]
  },
  {
    name: "Level 1",
    description: "Minimal elevation for subtle depth",
    usage: "Small interactive elements",
    examples: ["Buttons", "Badges", "Small cards"],
    level: 1,
    shadowClass: "shadow-xs",
    useCases: ["Interactive elements", "Small components", "Subtle depth"]
  },
  {
    name: "Level 2",
    description: "Light elevation for content areas",
    usage: "Primary content containers",
    examples: ["Content cards", "Navigation bars", "Form sections"],
    level: 2,
    shadowClass: "shadow-sm",
    useCases: ["Content containers", "Navigation", "Form elements"]
  },
  {
    name: "Level 3",
    description: "Medium elevation for important content",
    usage: "Key interface elements",
    examples: ["Main cards", "Sidebars", "Toolbars"],
    level: 3,
    shadowClass: "shadow-md",
    useCases: ["Main content", "Sidebars", "Important UI elements"]
  },
  {
    name: "Level 4",
    description: "High elevation for prominent elements",
    usage: "Hero sections and key actions",
    examples: ["Hero cards", "Call-to-action buttons", "Important alerts"],
    level: 4,
    shadowClass: "shadow-lg",
    useCases: ["Hero sections", "Key actions", "Prominent content"]
  },
  {
    name: "Level 5",
    description: "Maximum elevation for overlays",
    usage: "Modal dialogs and floating elements",
    examples: ["Modals", "Dropdowns", "Tooltips", "Floating action buttons"],
    level: 5,
    shadowClass: "shadow-xl",
    useCases: ["Overlays", "Modals", "Floating elements"]
  }
]

// Component Examples Configuration
export const componentExamples: ComponentExample[] = [
  {
    name: "Cards",
    shadow: "shadow-md",
    description: "Content containers use medium shadows for clear hierarchy",
    category: "content",
    elevationLevel: 3
  },
  {
    name: "Buttons",
    shadow: "shadow-xs",
    description: "Interactive elements use subtle shadows for depth",
    category: "ui",
    elevationLevel: 1
  },
  {
    name: "Modals",
    shadow: "shadow-2xl",
    description: "Overlay elements use maximum shadows for prominence",
    category: "overlay",
    elevationLevel: 5
  },
  {
    name: "Navigation",
    shadow: "shadow-sm",
    description: "Navigation bars use light shadows for separation",
    category: "ui",
    elevationLevel: 2
  },
  {
    name: "Hero Sections",
    shadow: "shadow-xl",
    description: "Prominent sections use large shadows for impact",
    category: "content",
    elevationLevel: 4
  },
  {
    name: "Floating Elements",
    shadow: "shadow-lg",
    description: "Floating elements use prominent shadows for elevation",
    category: "ui",
    elevationLevel: 4
  }
]

// Usage Guidelines Configuration
export const usageGuidelines: UsageGuideline[] = [
  {
    title: "Visual Hierarchy",
    description: "Use shadows to create clear visual hierarchy and guide user attention.",
    icon: "layers-line",
    category: "do",
    examples: ["Use higher elevation for important content", "Create clear depth relationships", "Guide user focus with elevation"]
  },
  {
    title: "Consistency",
    description: "Maintain consistent shadow usage across similar component types.",
    icon: "grid-line",
    category: "do",
    examples: ["Use same elevation for similar components", "Follow established patterns", "Maintain design system consistency"]
  },
  {
    title: "Accessibility",
    description: "Ensure sufficient contrast and avoid relying solely on shadows for information.",
    icon: "eye-line",
    category: "do",
    examples: ["Don't rely only on shadows for information", "Ensure sufficient contrast", "Consider visual impairments"]
  },
  {
    title: "Performance",
    description: "Use shadows sparingly on mobile devices to maintain smooth performance.",
    icon: "speed-line",
    category: "do",
    examples: ["Limit shadow complexity on mobile", "Use hardware acceleration", "Test on lower-end devices"]
  },
  {
    title: "Random Usage",
    description: "Avoid using too many different shadow levels randomly",
    icon: "close-line",
    category: "dont",
    examples: ["Don't mix shadow levels randomly", "Avoid inconsistent elevation", "Don't break visual hierarchy"]
  },
  {
    title: "Over-reliance",
    description: "Don't rely solely on shadows for information hierarchy",
    icon: "close-line",
    category: "dont",
    examples: ["Don't use shadows as the only visual cue", "Combine with other design elements", "Ensure accessibility without shadows"]
  }
]

// Shadow System Foundation
export const shadowFoundation: ShadowFoundation = {
  baseUnit: "1px",
  description: "Our shadow system provides consistent depth values for different interface elements, creating clear visual hierarchy and modern interfaces.",
  principles: {
    hierarchy: "Use shadows to create clear visual hierarchy and guide user attention",
    consistency: "Maintain consistent shadow usage across similar component types",
    accessibility: "Ensure sufficient contrast and avoid relying solely on shadows for information",
    performance: "Use shadows sparingly on mobile devices to maintain smooth performance"
  }
}

// CSS Custom Properties
export const cssCustomProperties = {
  description: "The shadow system is built on CSS custom properties for easy customization.",
  values: [
    "--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25)"
  ]
}

// Tailwind CSS Classes
export const tailwindClasses = {
  description: "Utility classes for applying shadows in your components.",
  utilities: [
    "shadow-none → box-shadow: none",
    "shadow-xs   → box-shadow: var(--shadow-xs)",
    "shadow-sm   → box-shadow: var(--shadow-sm)",
    "shadow-md   → box-shadow: var(--shadow-md)",
    "shadow-lg   → box-shadow: var(--shadow-lg)",
    "shadow-xl   → box-shadow: var(--shadow-xl)",
    "shadow-2xl  → box-shadow: var(--shadow-2xl)"
  ],
  states: [
    "hover:shadow-lg → box-shadow: var(--shadow-lg) on hover",
    "focus:shadow-lg → box-shadow: var(--shadow-lg) on focus",
    "active:shadow-sm → box-shadow: var(--shadow-sm) on active"
  ]
}

// Accessibility Considerations
export const accessibilityConsiderations = {
  visual: {
    title: "Visual Considerations",
    points: [
      "Ensure sufficient contrast between elevated elements",
      "Don't rely solely on shadows for information",
      "Consider users with visual impairments"
    ]
  },
  performance: {
    title: "Performance Considerations",
    points: [
      "Limit shadow complexity on mobile devices",
      "Use hardware acceleration when possible",
      "Test performance on lower-end devices"
    ]
  }
}

// Implementation Examples
export const implementationExamples = {
  reactComponent: {
    title: "React Component Example",
    description: "Using Tailwind classes",
    code: `function ElevatedCard(props) {
  const { children, elevation = 'md' } = props
  const shadowClass = \`shadow-\${elevation}\`
  return (
    <div className={cn(
      "bg-card border rounded-lg p-6",
      shadowClass
    )}>
      {children}
    </div>
  )
}`
  },
  customCSS: {
    title: "Custom CSS Example",
    description: "Using CSS custom properties",
    code: `.elevated-card {
  box-shadow: var(--shadow-md);
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.elevated-card--high {
  box-shadow: var(--shadow-xl);
}`
  }
}

// Helper functions
export function getShadowByName(name: string): ShadowItem | undefined {
  return shadowScale.find(shadow => shadow.name === name)
}

export function getShadowByValue(value: string): ShadowItem | undefined {
  return shadowScale.find(shadow => shadow.value === value)
}

export function getShadowByCategory(category: 'subtle' | 'standard' | 'prominent' | 'maximum'): ShadowItem[] {
  return shadowScale.filter(shadow => shadow.category === category)
}

export function getElevationLevelByLevel(level: number): ElevationLevel | undefined {
  return elevationLevels.find(elevation => elevation.level === level)
}

export function getElevationLevelByName(name: string): ElevationLevel | undefined {
  return elevationLevels.find(elevation => elevation.name === name)
}

export function getComponentExampleByName(name: string): ComponentExample | undefined {
  return componentExamples.find(example => example.name === name)
}

export function getComponentExamplesByCategory(category: 'ui' | 'content' | 'overlay'): ComponentExample[] {
  return componentExamples.filter(example => example.category === category)
}

export function getUsageGuidelinesByCategory(category: 'do' | 'dont'): UsageGuideline[] {
  return usageGuidelines.filter(guideline => guideline.category === category)
}
