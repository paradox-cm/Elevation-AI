// Border Configuration - Single Source of Truth
// This file defines all border system settings used throughout the application
// Changes here will automatically propagate to all components and pages

export interface BorderWidth {
  name: string
  value: string
  description: string
  usage: string[]
  category: 'none' | 'thin' | 'medium' | 'thick' | 'extra-thick'
  pixelValue: number
}

export interface BorderStyle {
  name: string
  value: string
  description: string
  usage: string[]
  category: 'solid' | 'dashed' | 'dotted' | 'double' | 'none'
  cssValue: string
}

export interface BorderColor {
  name: string
  value: string
  description: string
  usage: string[]
  category: 'default' | 'input' | 'focus' | 'primary' | 'secondary' | 'destructive' | 'muted'
  semantic: string
}

export interface BorderRadius {
  name: string
  value: string
  description: string
  usage: string[]
  category: 'none' | 'small' | 'default' | 'medium' | 'large' | 'xl' | '2xl' | '3xl' | 'full'
  pixelValue: number
}

export interface BorderPrinciple {
  title: string
  description: string
  icon: string
  examples: string[]
  category: 'consistency' | 'clarity' | 'hierarchy'
}

export interface BorderFoundation {
  baseWidth: string
  description: string
  principles: {
    consistency: string
    clarity: string
    hierarchy: string
  }
}

// Border Widths Configuration
export const borderWidths: BorderWidth[] = [
  {
    name: "border-0",
    value: "0px",
    description: "No border",
    usage: ["Remove borders", "Clean interfaces", "Minimal designs"],
    category: "none",
    pixelValue: 0
  },
  {
    name: "border",
    value: "1px",
    description: "Default border width",
    usage: ["Standard borders", "Card boundaries", "Form inputs"],
    category: "thin",
    pixelValue: 1
  },
  {
    name: "border-2",
    value: "2px",
    description: "Thick border",
    usage: ["Emphasis", "Focus states", "Important elements"],
    category: "medium",
    pixelValue: 2
  },
  {
    name: "border-4",
    value: "4px",
    description: "Very thick border",
    usage: ["Decorative elements", "Heavy emphasis", "Call-to-action buttons"],
    category: "thick",
    pixelValue: 4
  },
  {
    name: "border-8",
    value: "8px",
    description: "Extra thick border",
    usage: ["Heavy emphasis", "Decorative frames", "Special elements"],
    category: "extra-thick",
    pixelValue: 8
  }
]

// Border Styles Configuration
export const borderStyles: BorderStyle[] = [
  {
    name: "border-solid",
    value: "solid",
    description: "Solid line border",
    usage: ["Standard borders", "Component boundaries", "Form elements"],
    category: "solid",
    cssValue: "solid"
  },
  {
    name: "border-dashed",
    value: "dashed",
    description: "Dashed line border",
    usage: ["Draft states", "Placeholders", "Drag and drop areas"],
    category: "dashed",
    cssValue: "dashed"
  },
  {
    name: "border-dotted",
    value: "dotted",
    description: "Dotted line border",
    usage: ["Subtle separators", "Light boundaries", "Decorative elements"],
    category: "dotted",
    cssValue: "dotted"
  },
  {
    name: "border-double",
    value: "double",
    description: "Double line border",
    usage: ["Formal elements", "Premium content", "Special emphasis"],
    category: "double",
    cssValue: "double"
  },
  {
    name: "border-none",
    value: "none",
    description: "No border style",
    usage: ["Remove borders", "Clean interfaces", "Background elements"],
    category: "none",
    cssValue: "none"
  }
]

// Border Colors Configuration
export const borderColors: BorderColor[] = [
  {
    name: "border-border",
    value: "hsl(var(--border))",
    description: "Default border color",
    usage: ["Standard borders", "Component boundaries", "General use"],
    category: "default",
    semantic: "Default border for general use"
  },
  {
    name: "border-input",
    value: "hsl(var(--input))",
    description: "Input border color",
    usage: ["Form inputs", "Text fields", "Interactive elements"],
    category: "input",
    semantic: "Border for form input elements"
  },
  {
    name: "border-ring",
    value: "hsl(var(--ring))",
    description: "Focus ring color",
    usage: ["Focus states", "Active elements", "Keyboard navigation"],
    category: "focus",
    semantic: "Border for focus and active states"
  },
  {
    name: "border-primary",
    value: "hsl(var(--primary))",
    description: "Primary border color",
    usage: ["Primary elements", "Call-to-action buttons", "Important content"],
    category: "primary",
    semantic: "Border for primary brand elements"
  },
  {
    name: "border-secondary",
    value: "hsl(var(--secondary))",
    description: "Secondary border color",
    usage: ["Secondary elements", "Alternative buttons", "Supporting content"],
    category: "secondary",
    semantic: "Border for secondary elements"
  },
  {
    name: "border-destructive",
    value: "hsl(var(--destructive))",
    description: "Destructive border color",
    usage: ["Error states", "Warning elements", "Destructive actions"],
    category: "destructive",
    semantic: "Border for error and destructive states"
  },
  {
    name: "border-muted",
    value: "hsl(var(--muted))",
    description: "Muted border color",
    usage: ["Subtle separators", "Background elements", "Disabled states"],
    category: "muted",
    semantic: "Border for subtle and muted elements"
  }
]

// Border Radius Configuration
export const borderRadius: BorderRadius[] = [
  {
    name: "rounded-none",
    value: "0px",
    description: "No border radius",
    usage: ["Sharp corners", "Geometric designs", "Technical interfaces"],
    category: "none",
    pixelValue: 0
  },
  {
    name: "rounded-sm",
    value: "0.125rem",
    description: "Small border radius",
    usage: ["Inputs", "Small elements", "Subtle rounding"],
    category: "small",
    pixelValue: 2
  },
  {
    name: "rounded",
    value: "0.25rem",
    description: "Default border radius",
    usage: ["Buttons", "Cards", "Standard elements"],
    category: "default",
    pixelValue: 4
  },
  {
    name: "rounded-md",
    value: "0.375rem",
    description: "Medium border radius",
    usage: ["Larger elements", "Containers", "Moderate rounding"],
    category: "medium",
    pixelValue: 6
  },
  {
    name: "rounded-lg",
    value: "0.5rem",
    description: "Large border radius",
    usage: ["Containers", "Modals", "Prominent elements"],
    category: "large",
    pixelValue: 8
  },
  {
    name: "rounded-xl",
    value: "0.75rem",
    description: "Extra large border radius",
    usage: ["Hero sections", "Large containers", "Modern designs"],
    category: "xl",
    pixelValue: 12
  },
  {
    name: "rounded-2xl",
    value: "1rem",
    description: "2XL border radius",
    usage: ["Large containers", "Feature sections", "Bold designs"],
    category: "2xl",
    pixelValue: 16
  },
  {
    name: "rounded-3xl",
    value: "1.5rem",
    description: "3XL border radius",
    usage: ["Very large elements", "Hero containers", "Modern layouts"],
    category: "3xl",
    pixelValue: 24
  },
  {
    name: "rounded-full",
    value: "9999px",
    description: "Full border radius",
    usage: ["Circular elements", "Avatars", "Pills"],
    category: "full",
    pixelValue: 9999
  }
]

// Border Principles Configuration
export const borderPrinciples: BorderPrinciple[] = [
  {
    title: "Consistency",
    description: "Use standardized border values across all components for visual harmony",
    icon: "ruler-line",
    examples: ["Standard border widths", "Consistent radius values", "Unified color palette"],
    category: "consistency"
  },
  {
    title: "Clarity",
    description: "Borders should enhance readability and define clear boundaries",
    icon: "eye-line",
    examples: ["Clear component separation", "Improved content hierarchy", "Enhanced user experience"],
    category: "clarity"
  },
  {
    title: "Hierarchy",
    description: "Use border variations to establish visual hierarchy and importance",
    icon: "palette-line",
    examples: ["Emphasis through thickness", "Importance through color", "Context through style"],
    category: "hierarchy"
  }
]

// Border System Foundation
export const borderFoundation: BorderFoundation = {
  baseWidth: "1px",
  description: "A comprehensive border system providing consistent visual boundaries through standardized widths, styles, colors, and radius values.",
  principles: {
    consistency: "Use standardized border values across all components for visual harmony",
    clarity: "Borders should enhance readability and define clear boundaries",
    hierarchy: "Use border variations to establish visual hierarchy and importance"
  }
}

// Usage Guidelines
export const usageGuidelines = {
  do: [
    "Use consistent border widths for similar elements",
    "Apply semantic border colors for different contexts",
    "Use border radius to soften harsh edges and improve aesthetics",
    "Ensure sufficient contrast between border and background colors",
    "Use borders to create clear visual separation between elements",
    "Consider accessibility when choosing border styles and colors"
  ],
  dont: [
    "Don't use too many different border widths in the same interface",
    "Don't use borders that compete with content for attention",
    "Don't use border radius that doesn't match the design language",
    "Don't use border colors that don't provide sufficient contrast",
    "Don't use borders as the only way to indicate interactive elements",
    "Don't use decorative borders that don't serve a functional purpose"
  ]
}

// Implementation Examples
export const implementationExamples = {
  formInputs: {
    title: "Form Inputs",
    description: "Border usage in form elements with different states",
    examples: [
      {
        name: "Default State",
        code: "border border-input rounded-md",
        description: "Standard input with default border"
      },
      {
        name: "Focus State",
        code: "border-2 border-ring rounded-md",
        description: "Input with focus border for accessibility"
      },
      {
        name: "Error State",
        code: "border-2 border-destructive rounded-md",
        description: "Input with error border for validation feedback"
      }
    ]
  },
  cards: {
    title: "Cards and Containers",
    description: "Border usage in card and container components",
    examples: [
      {
        name: "Standard Card",
        code: "border rounded-lg",
        description: "Basic card with standard border"
      },
      {
        name: "Emphasized Card",
        code: "border-2 border-primary rounded-lg",
        description: "Card with emphasis border"
      },
      {
        name: "Subtle Container",
        code: "border border-muted rounded-md",
        description: "Container with subtle border"
      }
    ]
  },
  buttons: {
    title: "Buttons and Interactive Elements",
    description: "Border usage in button and interactive components",
    examples: [
      {
        name: "Primary Button",
        code: "border border-primary rounded-md",
        description: "Primary button with brand border"
      },
      {
        name: "Secondary Button",
        code: "border border-input rounded-md",
        description: "Secondary button with neutral border"
      },
      {
        name: "Outline Button",
        code: "border-2 border-primary rounded-md",
        description: "Outline button with thick border"
      }
    ]
  }
}

// CSS Custom Properties
export const cssCustomProperties = {
  description: "CSS variables for consistent border values across your application.",
  widths: [
    "--border-0: 0px",
    "--border: 1px",
    "--border-2: 2px",
    "--border-4: 4px",
    "--border-8: 8px"
  ],
  radius: [
    "--radius-none: 0px",
    "--radius-sm: 0.125rem",
    "--radius: 0.25rem",
    "--radius-md: 0.375rem",
    "--radius-lg: 0.5rem",
    "--radius-xl: 0.75rem",
    "--radius-2xl: 1rem",
    "--radius-3xl: 1.5rem",
    "--radius-full: 9999px"
  ]
}

// Tailwind CSS Classes
export const tailwindClasses = {
  description: "Utility classes for implementing borders in your components.",
  widths: [
    "border-0 → border-width: 0px",
    "border → border-width: 1px",
    "border-2 → border-width: 2px",
    "border-4 → border-width: 4px",
    "border-8 → border-width: 8px"
  ],
  styles: [
    "border-solid → border-style: solid",
    "border-dashed → border-style: dashed",
    "border-dotted → border-style: dotted",
    "border-double → border-style: double",
    "border-none → border-style: none"
  ],
  radius: [
    "rounded-none → border-radius: 0px",
    "rounded-sm → border-radius: 0.125rem",
    "rounded → border-radius: 0.25rem",
    "rounded-md → border-radius: 0.375rem",
    "rounded-lg → border-radius: 0.5rem",
    "rounded-xl → border-radius: 0.75rem",
    "rounded-2xl → border-radius: 1rem",
    "rounded-3xl → border-radius: 1.5rem",
    "rounded-full → border-radius: 9999px"
  ]
}

// Helper functions
export function getBorderWidthByName(name: string): BorderWidth | undefined {
  return borderWidths.find(width => width.name === name)
}

export function getBorderWidthsByCategory(category: 'none' | 'thin' | 'medium' | 'thick' | 'extra-thick'): BorderWidth[] {
  return borderWidths.filter(width => width.category === category)
}

export function getBorderStyleByName(name: string): BorderStyle | undefined {
  return borderStyles.find(style => style.name === name)
}

export function getBorderStylesByCategory(category: 'solid' | 'dashed' | 'dotted' | 'double' | 'none'): BorderStyle[] {
  return borderStyles.filter(style => style.category === category)
}

export function getBorderColorByName(name: string): BorderColor | undefined {
  return borderColors.find(color => color.name === name)
}

export function getBorderColorsByCategory(category: 'default' | 'input' | 'focus' | 'primary' | 'secondary' | 'destructive' | 'muted'): BorderColor[] {
  return borderColors.filter(color => color.category === category)
}

export function getBorderRadiusByName(name: string): BorderRadius | undefined {
  return borderRadius.find(radius => radius.name === name)
}

export function getBorderRadiusByCategory(category: 'none' | 'small' | 'default' | 'medium' | 'large' | 'xl' | '2xl' | '3xl' | 'full'): BorderRadius[] {
  return borderRadius.filter(radius => radius.category === category)
}

export function getBorderPrincipleByCategory(category: 'consistency' | 'clarity' | 'hierarchy'): BorderPrinciple[] {
  return borderPrinciples.filter(principle => principle.category === category)
}
