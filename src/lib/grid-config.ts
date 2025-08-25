// Grid Configuration - Single Source of Truth
// This file defines all grid system settings used throughout the application
// Changes here will automatically propagate to all components and pages

export interface Breakpoint {
  id: string
  name: string
  width: string
  cols: number
  minWidth: number
  maxWidth?: number
  description: string
  usage: string[]
  category: 'mobile' | 'tablet' | 'desktop' | 'wide'
}

export interface GridPrinciple {
  title: string
  description: string
  icon: string
  examples: string[]
  category: 'responsive' | 'consistency' | 'flexibility'
}

export interface GridLayout {
  name: string
  description: string
  category: 'content' | 'cards' | 'form' | 'dashboard'
  breakpoints: {
    mobile: number[]
    tablet: number[]
    desktop: number[]
    wide: number[]
  }
  examples: string[]
  implementation: string
}

export interface GridSpecification {
  name: string
  value: string
  description: string
  category: 'spacing' | 'breakpoint' | 'container'
  cssValue: string
  usage: string[]
}

export interface GridFoundation {
  baseColumns: number
  description: string
  principles: {
    responsive: string
    consistent: string
    flexible: string
  }
}

// Breakpoints Configuration
export const breakpoints: Breakpoint[] = [
  {
    id: "mobile",
    name: "Mobile",
    width: "320px",
    cols: 4,
    minWidth: 320,
    maxWidth: 767,
    description: "Small screens with limited space",
    usage: ["Single column layouts", "Stacked content", "Touch-friendly interfaces"],
    category: "mobile"
  },
  {
    id: "tablet",
    name: "Tablet",
    width: "768px",
    cols: 8,
    minWidth: 768,
    maxWidth: 1023,
    description: "Medium screens with moderate space",
    usage: ["Two-column layouts", "Sidebar navigation", "Card grids"],
    category: "tablet"
  },
  {
    id: "desktop",
    name: "Desktop",
    width: "1024px",
    cols: 12,
    minWidth: 1024,
    maxWidth: 1439,
    description: "Large screens with ample space",
    usage: ["Multi-column layouts", "Complex dashboards", "Rich content displays"],
    category: "desktop"
  },
  {
    id: "wide",
    name: "Wide",
    width: "1440px",
    cols: 12,
    minWidth: 1440,
    description: "Extra large screens with maximum space",
    usage: ["Wide layouts", "Large dashboards", "Multi-panel interfaces"],
    category: "wide"
  }
]

// Grid Principles Configuration
export const gridPrinciples: GridPrinciple[] = [
  {
    title: "Responsive",
    description: "Automatically adapts to different screen sizes with appropriate column counts",
    icon: "responsive-line",
    examples: ["Mobile-first design", "Progressive enhancement", "Adaptive layouts"],
    category: "responsive"
  },
  {
    title: "Consistent",
    description: "Uniform spacing and alignment using standardized gutters and margins",
    icon: "ruler-line",
    examples: ["Standardized gutters", "Consistent margins", "Uniform spacing"],
    category: "consistency"
  },
  {
    title: "Flexible",
    description: "Supports various layout patterns from simple cards to complex dashboards",
    icon: "flexibility-line",
    examples: ["Multiple layout patterns", "Adaptable components", "Scalable designs"],
    category: "flexibility"
  }
]

// Grid Layouts Configuration
export const gridLayouts: GridLayout[] = [
  {
    name: "Content Layout",
    description: "Standard layout with sidebar navigation and main content area",
    category: "content",
    breakpoints: {
      mobile: [12, 12],
      tablet: [3, 9],
      desktop: [3, 9],
      wide: [3, 9]
    },
    examples: ["Documentation pages", "Blog layouts", "Article pages"],
    implementation: "grid grid-cols-12 gap-4"
  },
  {
    name: "Card Grid",
    description: "Responsive card layout that adapts from 1 column on mobile to 3 on desktop",
    category: "cards",
    breakpoints: {
      mobile: [12, 12, 12],
      tablet: [6, 6, 12],
      desktop: [4, 4, 4],
      wide: [4, 4, 4]
    },
    examples: ["Product grids", "Feature cards", "Gallery layouts"],
    implementation: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  },
  {
    name: "Form Layout",
    description: "Form layout with labels and input fields using grid alignment",
    category: "form",
    breakpoints: {
      mobile: [12, 12],
      tablet: [3, 9],
      desktop: [3, 9],
      wide: [3, 9]
    },
    examples: ["Contact forms", "Settings pages", "Data entry forms"],
    implementation: "grid grid-cols-12 gap-4 items-center"
  },
  {
    name: "Dashboard Layout",
    description: "Complex dashboard layout with header, sidebar, main content, and widgets",
    category: "dashboard",
    breakpoints: {
      mobile: [12, 12, 12, 12],
      tablet: [12, 3, 6, 3],
      desktop: [12, 3, 6, 3],
      wide: [12, 3, 6, 3]
    },
    examples: ["Admin dashboards", "Analytics pages", "Control panels"],
    implementation: "grid grid-cols-12 gap-4"
  }
]

// Grid Specifications Configuration
export const gridSpecifications: GridSpecification[] = [
  {
    name: "Gutter (gap)",
    value: "1rem (16px)",
    description: "Standard spacing between grid columns",
    category: "spacing",
    cssValue: "1rem",
    usage: ["Column spacing", "Grid gaps", "Component spacing"]
  },
  {
    name: "Margin",
    value: "1.5rem (24px)",
    description: "Outer margin for grid containers",
    category: "spacing",
    cssValue: "1.5rem",
    usage: ["Container margins", "Page spacing", "Section padding"]
  },
  {
    name: "Container max-width",
    value: "1200px",
    description: "Maximum width for grid containers",
    category: "container",
    cssValue: "1200px",
    usage: ["Page containers", "Content width", "Layout constraints"]
  },
  {
    name: "Mobile breakpoint",
    value: "≥ 320px",
    description: "Minimum width for mobile devices",
    category: "breakpoint",
    cssValue: "320px",
    usage: ["Mobile layouts", "Responsive design", "Touch interfaces"]
  },
  {
    name: "Tablet breakpoint",
    value: "≥ 768px",
    description: "Minimum width for tablet devices",
    category: "breakpoint",
    cssValue: "768px",
    usage: ["Tablet layouts", "Medium screens", "Hybrid interfaces"]
  },
  {
    name: "Desktop breakpoint",
    value: "≥ 1024px",
    description: "Minimum width for desktop devices",
    category: "breakpoint",
    cssValue: "1024px",
    usage: ["Desktop layouts", "Large screens", "Full interfaces"]
  }
]

// Grid System Foundation
export const gridFoundation: GridFoundation = {
  baseColumns: 12,
  description: "A responsive 12-column grid system that adapts to different screen sizes and provides consistent spacing and alignment.",
  principles: {
    responsive: "Automatically adapts to different screen sizes with appropriate column counts",
    consistent: "Uniform spacing and alignment using standardized gutters and margins",
    flexible: "Supports various layout patterns from simple cards to complex dashboards"
  }
}

// CSS Custom Properties
export const cssCustomProperties = {
  description: "CSS variables for consistent grid spacing and breakpoints across your application.",
  spacing: [
    "--grid-gutter: 1rem",
    "--grid-margin: 1.5rem",
    "--grid-container-max-width: 1200px"
  ],
  breakpoints: [
    "--breakpoint-mobile: 320px",
    "--breakpoint-tablet: 768px",
    "--breakpoint-desktop: 1024px",
    "--breakpoint-wide: 1440px"
  ]
}

// Tailwind CSS Classes
export const tailwindClasses = {
  description: "Utility classes for implementing grid layouts in your components.",
  grid: [
    "grid → display: grid",
    "grid-cols-1 → grid-template-columns: repeat(1, minmax(0, 1fr))",
    "grid-cols-2 → grid-template-columns: repeat(2, minmax(0, 1fr))",
    "grid-cols-3 → grid-template-columns: repeat(3, minmax(0, 1fr))",
    "grid-cols-4 → grid-template-columns: repeat(4, minmax(0, 1fr))",
    "grid-cols-6 → grid-template-columns: repeat(6, minmax(0, 1fr))",
    "grid-cols-8 → grid-template-columns: repeat(8, minmax(0, 1fr))",
    "grid-cols-12 → grid-template-columns: repeat(12, minmax(0, 1fr))"
  ],
  columns: [
    "col-span-1 → grid-column: span 1 / span 1",
    "col-span-2 → grid-column: span 2 / span 2",
    "col-span-3 → grid-column: span 3 / span 3",
    "col-span-4 → grid-column: span 4 / span 4",
    "col-span-6 → grid-column: span 6 / span 6",
    "col-span-8 → grid-column: span 8 / span 8",
    "col-span-12 → grid-column: span 12 / span 12"
  ],
  responsive: [
    "md:grid-cols-2 → grid-template-columns: repeat(2, minmax(0, 1fr)) on medium screens",
    "lg:grid-cols-3 → grid-template-columns: repeat(3, minmax(0, 1fr)) on large screens",
    "xl:grid-cols-4 → grid-template-columns: repeat(4, minmax(0, 1fr)) on extra large screens"
  ]
}

// Usage Guidelines
export const usageGuidelines = {
  do: [
    "Use semantic class names like col-span-6 over arbitrary values",
    "Plan for mobile first and progressively enhance for larger screens",
    "Maintain visual hierarchy using grid spans to create clear relationships",
    "Use consistent spacing with standardized gutters and margins",
    "Test layouts across all breakpoints to ensure proper adaptation",
    "Consider content priority when designing grid layouts"
  ],
  dont: [
    "Don't use arbitrary column spans without considering the 12-column system",
    "Don't ignore mobile layouts in favor of desktop-only designs",
    "Don't create inconsistent spacing by mixing different gutter values",
    "Don't use grid for simple flexbox layouts that don't need alignment",
    "Don't forget to test grid layouts on actual devices and screen sizes",
    "Don't create overly complex grid systems that are difficult to maintain"
  ]
}

// Implementation Examples
export const implementationExamples = {
  basicGrid: {
    title: "Basic 12-Column Grid",
    description: "Simple grid layout with responsive columns",
    code: `<div className="grid grid-cols-12 gap-4">
  <div className="col-span-12 md:col-span-6 lg:col-span-4">
    Content 1
  </div>
  <div className="col-span-12 md:col-span-6 lg:col-span-4">
    Content 2
  </div>
  <div className="col-span-12 md:col-span-12 lg:col-span-4">
    Content 3
  </div>
</div>`
  },
  cardGrid: {
    title: "Responsive Card Grid",
    description: "Card layout that adapts to different screen sizes",
    code: `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {cards.map((card) => (
    <div key={card.id} className="bg-card border rounded-lg p-4">
      {card.content}
    </div>
  ))}
</div>`
  },
  formLayout: {
    title: "Form Layout with Grid",
    description: "Form with labels and inputs using grid alignment",
    code: `<div className="grid grid-cols-12 gap-4 items-center">
  <label className="col-span-12 md:col-span-3">
    Email Address
  </label>
  <input 
    type="email" 
    className="col-span-12 md:col-span-9"
  />
</div>`
  }
}

// Helper functions
export function getBreakpointById(id: string): Breakpoint | undefined {
  return breakpoints.find(breakpoint => breakpoint.id === id)
}

export function getBreakpointByCategory(category: 'mobile' | 'tablet' | 'desktop' | 'wide'): Breakpoint[] {
  return breakpoints.filter(breakpoint => breakpoint.category === category)
}

export function getBreakpointByWidth(width: number): Breakpoint | undefined {
  return breakpoints.find(breakpoint => 
    width >= breakpoint.minWidth && (!breakpoint.maxWidth || width <= breakpoint.maxWidth)
  )
}

export function getGridPrincipleByCategory(category: 'responsive' | 'consistency' | 'flexibility'): GridPrinciple[] {
  return gridPrinciples.filter(principle => principle.category === category)
}

export function getGridLayoutByName(name: string): GridLayout | undefined {
  return gridLayouts.find(layout => layout.name === name)
}

export function getGridLayoutsByCategory(category: 'content' | 'cards' | 'form' | 'dashboard'): GridLayout[] {
  return gridLayouts.filter(layout => layout.category === category)
}

export function getGridSpecificationByName(name: string): GridSpecification | undefined {
  return gridSpecifications.find(spec => spec.name === name)
}

export function getGridSpecificationsByCategory(category: 'spacing' | 'breakpoint' | 'container'): GridSpecification[] {
  return gridSpecifications.filter(spec => spec.category === category)
}
