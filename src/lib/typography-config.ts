// Typography Configuration - Single Source of Truth
// This file defines all typography settings used throughout the application
// Changes here will automatically propagate to all components and pages

export interface TypeScaleItem {
  name: string
  class: string
  weight: string
  lineHeight: string
  tracking: string
  usage: string
  example: string
  component?: string
}

export interface FontWeight {
  weight: string
  name: string
  class: string
}

export interface FontFamily {
  name: string
  class: string
  description: string
  example: string
  variable?: string
}

// Type Scale Configuration
export const typeScale: TypeScaleItem[] = [
  {
    name: "Display Large",
    class: "text-6xl",
    weight: "font-semibold",
    lineHeight: "leading-normal",
    tracking: "tracking-normal",
    usage: "Hero headlines, page titles",
    example: "Display Large",
    component: "DisplayLarge"
  },
  {
    name: "Display Medium", 
    class: "text-5xl",
    weight: "font-semibold",
    lineHeight: "leading-normal",
    tracking: "tracking-normal",
    usage: "Section headlines, major headings",
    example: "Display Medium",
    component: "DisplayMedium"
  },
  {
    name: "Display Small",
    class: "text-4xl", 
    weight: "font-semibold",
    lineHeight: "leading-normal",
    tracking: "tracking-normal",
    usage: "Subsection headlines",
    example: "Display Small",
    component: "DisplaySmall"
  },
  {
    name: "Heading Large",
    class: "text-3xl",
    weight: "font-medium", 
    lineHeight: "leading-normal",
    tracking: "tracking-normal",
    usage: "Page headings, article titles",
    example: "Heading Large",
    component: "H1"
  },
  {
    name: "Heading Medium",
    class: "text-2xl",
    weight: "font-medium",
    lineHeight: "leading-normal",
    tracking: "tracking-normal",
    usage: "Section headings, card titles",
    example: "Heading Medium",
    component: "H2"
  },
  {
    name: "Heading Small",
    class: "text-xl",
    weight: "font-medium",
    lineHeight: "leading-normal",
    tracking: "tracking-normal",
    usage: "Subsection headings, form labels",
    example: "Heading Small",
    component: "H3"
  },
  {
    name: "Body Large",
    class: "text-lg",
    weight: "font-normal",
    lineHeight: "leading-relaxed",
    tracking: "tracking-normal",
    usage: "Lead paragraphs, important content",
    example: "Body Large - This is the large body text used for important content and lead paragraphs.",
    component: "BodyLarge"
  },
  {
    name: "Body",
    class: "text-base",
    weight: "font-normal", 
    lineHeight: "leading-relaxed",
    tracking: "tracking-normal",
    usage: "Main content, paragraphs",
    example: "Body - This is the standard body text used throughout the application for main content.",
    component: "P"
  },
  {
    name: "Body Small",
    class: "text-sm",
    weight: "font-normal",
    lineHeight: "leading-relaxed",
    tracking: "tracking-normal",
    usage: "Secondary content, captions",
    example: "Body Small - This is smaller text used for captions and secondary information.",
    component: "BodySmall"
  },
  {
    name: "Caption",
    class: "text-xs",
    weight: "font-normal",
    lineHeight: "leading-relaxed",
    tracking: "tracking-normal",
    usage: "Labels, metadata, fine print",
    example: "Caption - This is the smallest text used for labels and metadata.",
    component: "Caption"
  }
]

// Font Weights Configuration
export const fontWeights: FontWeight[] = [
  { weight: "100", name: "Thin", class: "font-thin" },
  { weight: "200", name: "Extra Light", class: "font-extralight" },
  { weight: "300", name: "Light", class: "font-light" },
  { weight: "400", name: "Regular", class: "font-normal" },
  { weight: "500", name: "Medium", class: "font-medium" },
  { weight: "600", name: "Semi Bold", class: "font-semibold" },
  { weight: "700", name: "Bold", class: "font-bold" },
  { weight: "800", name: "Extra Bold", class: "font-extrabold" },
  { weight: "900", name: "Black", class: "font-black" }
]

// Font Families Configuration
export const fontFamilies: FontFamily[] = [
  {
    name: "Helvetica Now",
    class: "font-sans",
    description: "Primary sans-serif font for all UI text",
    example: "The quick brown fox jumps over the lazy dog",
    variable: "--font-helvetica-now"
  },
  {
    name: "Geist Mono",
    class: "font-mono", 
    description: "Monospace font for code and technical content",
    example: "const example = 'code snippet';",
    variable: "--font-geist-mono"
  }
]

// Typography Principles
export const typographyPrinciples = {
  readability: {
    title: "Readability",
    description: "Optimized for maximum readability across all screen sizes and contexts",
    icon: "eye-line"
  },
  consistency: {
    title: "Consistency", 
    description: "Systematic type scale with predictable sizing and spacing relationships",
    icon: "ruler-line"
  },
  performance: {
    title: "Performance",
    description: "Variable fonts for optimal loading performance and smooth weight transitions",
    icon: "responsive-line"
  }
}

// Font Specifications
export const fontSpecifications = {
  primary: {
    name: "Helvetica Now",
    type: "Variable",
    weightRange: "100-900",
    display: "swap",
    subset: "Latin"
  },
  monospace: {
    name: "Geist Mono",
    type: "Google Font",
    display: "swap", 
    subset: "Latin"
  }
}

// Usage Guidelines
export const usageGuidelines = {
  hierarchy: [
    {
      title: "Use consistent heading levels",
      description: "Maintain a clear visual hierarchy with H1 → H2 → H3 progression"
    },
    {
      title: "Limit font weight variations", 
      description: "Use 2-3 weights maximum per page to maintain visual consistency"
    },
    {
      title: "Consider line length",
      description: "Aim for 45-75 characters per line for optimal readability"
    }
  ],
  accessibility: [
    {
      title: "Maintain sufficient contrast",
      description: "Ensure text meets WCAG AA contrast requirements (4.5:1 for normal text)"
    },
    {
      title: "Use semantic HTML",
      description: "Use proper heading tags (h1-h6) for screen readers and SEO"
    },
    {
      title: "Scale with user preferences",
      description: "Respect user font size preferences and zoom settings"
    }
  ]
}

// Helper function to get type scale item by component name
export function getTypeScaleByComponent(componentName: string): TypeScaleItem | undefined {
  return typeScale.find(item => item.component === componentName)
}

// Helper function to get type scale item by class name
export function getTypeScaleByClass(className: string): TypeScaleItem | undefined {
  return typeScale.find(item => item.class === className)
}

// Helper function to get font weight by class
export function getFontWeightByClass(className: string): FontWeight | undefined {
  return fontWeights.find(weight => weight.class === className)
}

// Helper function to get font family by class
export function getFontFamilyByClass(className: string): FontFamily | undefined {
  return fontFamilies.find(font => font.class === className)
}
