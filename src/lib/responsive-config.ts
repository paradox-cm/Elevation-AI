// Responsive Design Configuration
// Defines all responsive breakpoints, patterns, grid systems, and responsive components

export interface BreakpointConfig {
  name: string
  prefix: string
  minWidth: string
  maxWidth: string
  description: string
  usage: string
  deviceType: "mobile" | "tablet" | "desktop" | "large-desktop" | "extra-large"
  priority: number
  containerMaxWidth: string
  gutterSize: string
  columnCount: number
}

export interface ResponsivePatternConfig {
  pattern: "mobileFirst" | "desktopFirst" | "containerQueries" | "fluidDesign"
  name: string
  description: string
  icon: string
  benefits: string[]
  implementation: string
  cssClasses: string[]
  bestPractices: string[]
  testing: string[]
}

export interface GridSystemConfig {
  system: "flexbox" | "cssGrid" | "bootstrap" | "custom"
  name: string
  description: string
  columns: number
  gutters: string
  breakpoints: string[]
  utilities: string[]
  responsive: boolean
  containerQueries: boolean
}

export interface ResponsiveComponentConfig {
  component: "navigation" | "cards" | "forms" | "tables" | "modals" | "galleries"
  name: string
  description: string
  mobile: {
    layout: string
    spacing: string
    typography: string
    interactions: string[]
  }
  tablet: {
    layout: string
    spacing: string
    typography: string
    interactions: string[]
  }
  desktop: {
    layout: string
    spacing: string
    typography: string
    interactions: string[]
  }
  cssClasses: string[]
  implementation: string
}

export interface FluidTypographyConfig {
  type: "heading" | "body" | "caption" | "button"
  name: string
  minSize: string
  maxSize: string
  minWidth: string
  maxWidth: string
  scale: number
  lineHeight: string
  fontWeight: string
  implementation: string
  cssClasses: string[]
}

export interface ResponsiveImageConfig {
  type: "hero" | "card" | "gallery" | "avatar" | "icon"
  name: string
  description: string
  mobile: {
    width: string
    height: string
    quality: number
    format: string
  }
  tablet: {
    width: string
    height: string
    quality: number
    format: string
  }
  desktop: {
    width: string
    height: string
    quality: number
    format: string
  }
  lazyLoading: boolean
  srcSet: boolean
  artDirection: boolean
  implementation: string
}

export interface ContainerConfig {
  type: "fluid" | "fixed" | "responsive" | "custom"
  name: string
  description: string
  maxWidths: Record<string, string>
  padding: string
  margin: string
  breakpoints: string[]
  cssClasses: string[]
  implementation: string
}

export interface ResponsiveConfig {
  breakpoints: {
    variants: Array<{
      id: string
      name: string
      description: string
      prefix: string
      className: string
    }>
    devices: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: BreakpointConfig
  }
  patterns: {
    types: Array<{
      id: string
      name: string
      description: string
      icon: string
      className: string
    }>
    approaches: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: ResponsivePatternConfig
  }
  gridSystems: {
    types: Array<{
      id: string
      name: string
      description: string
      columns: number
      className: string
    }>
    layouts: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: GridSystemConfig
  }
  components: {
    types: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    layouts: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: ResponsiveComponentConfig
  }
  typography: {
    types: Array<{
      id: string
      name: string
      description: string
      scale: number
      className: string
    }>
    scales: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: FluidTypographyConfig
  }
  images: {
    types: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    formats: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: ResponsiveImageConfig
  }
  containers: {
    types: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    sizes: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: ContainerConfig
  }
}

export const responsiveConfig: ResponsiveConfig = {
  breakpoints: {
    variants: [
      {
        id: "sm",
        name: "Small",
        description: "Mobile devices and small tablets",
        prefix: "sm",
        className: "breakpoint-sm"
      },
      {
        id: "md",
        name: "Medium",
        description: "Tablets and small laptops",
        prefix: "md",
        className: "breakpoint-md"
      },
      {
        id: "lg",
        name: "Large",
        description: "Desktop screens and laptops",
        prefix: "lg",
        className: "breakpoint-lg"
      },
      {
        id: "xl",
        name: "Extra Large",
        description: "Large desktop monitors",
        prefix: "xl",
        className: "breakpoint-xl"
      },
      {
        id: "2xl",
        name: "2X Large",
        description: "Ultra-wide and 4K displays",
        prefix: "2xl",
        className: "breakpoint-2xl"
      }
    ],
    devices: [
      {
        id: "mobile",
        name: "Mobile",
        description: "Smartphones and small mobile devices",
        className: "device-mobile"
      },
      {
        id: "tablet",
        name: "Tablet",
        description: "Tablets and phablets",
        className: "device-tablet"
      },
      {
        id: "desktop",
        name: "Desktop",
        description: "Desktop computers and laptops",
        className: "device-desktop"
      },
      {
        id: "large-desktop",
        name: "Large Desktop",
        description: "Large monitors and displays",
        className: "device-large-desktop"
      }
    ],
    defaultConfig: {
      name: "Medium",
      prefix: "md",
      minWidth: "768px",
      maxWidth: "1023px",
      description: "Tablets and small laptops",
      usage: "Enhanced tablet experience",
      deviceType: "tablet",
      priority: 2,
      containerMaxWidth: "768px",
      gutterSize: "1rem",
      columnCount: 12
    }
  },
  patterns: {
    types: [
      {
        id: "mobile-first",
        name: "Mobile First",
        description: "Design for mobile first, then enhance for larger screens",
        icon: "smartphone-line",
        className: "pattern-mobile-first"
      },
      {
        id: "desktop-first",
        name: "Desktop First",
        description: "Design for desktop first, then adapt for smaller screens",
        icon: "computer-line",
        className: "pattern-desktop-first"
      },
      {
        id: "container-queries",
        name: "Container Queries",
        description: "Style elements based on their container size",
        icon: "layout-line",
        className: "pattern-container-queries"
      },
      {
        id: "fluid-design",
        name: "Fluid Design",
        description: "Smooth scaling across all screen sizes",
        icon: "scale-line",
        className: "pattern-fluid-design"
      }
    ],
    approaches: [
      {
        id: "progressive-enhancement",
        name: "Progressive Enhancement",
        description: "Start with basic functionality, add features for capable browsers",
        className: "approach-progressive-enhancement"
      },
      {
        id: "graceful-degradation",
        name: "Graceful Degradation",
        description: "Start with full features, ensure basic functionality in older browsers",
        className: "approach-graceful-degradation"
      },
      {
        id: "adaptive-design",
        name: "Adaptive Design",
        description: "Create different layouts for different screen sizes",
        className: "approach-adaptive-design"
      }
    ],
    defaultConfig: {
      pattern: "mobileFirst",
      name: "Mobile First",
      description: "Design for mobile first, then enhance for larger screens",
      icon: "smartphone-line",
      benefits: [
        "Better performance",
        "Simpler codebase",
        "Progressive enhancement",
        "Better user experience"
      ],
      implementation: "Start with mobile styles, use min-width media queries",
      cssClasses: [
        "mobile-first",
        "progressive-enhancement"
      ],
      bestPractices: [
        "Start with mobile layout",
        "Use min-width media queries",
        "Test on actual devices",
        "Consider touch interactions"
      ],
      testing: [
        "Mobile device testing",
        "Browser dev tools",
        "Performance testing",
        "Touch interaction testing"
      ]
    }
  },
  gridSystems: {
    types: [
      {
        id: "flexbox",
        name: "Flexbox Grid",
        description: "CSS Flexbox-based grid system",
        columns: 12,
        className: "grid-flexbox"
      },
      {
        id: "css-grid",
        name: "CSS Grid",
        description: "CSS Grid-based layout system",
        columns: 12,
        className: "grid-css-grid"
      },
      {
        id: "bootstrap",
        name: "Bootstrap Grid",
        description: "Bootstrap-style grid system",
        columns: 12,
        className: "grid-bootstrap"
      },
      {
        id: "custom",
        name: "Custom Grid",
        description: "Custom grid system with specific requirements",
        columns: 16,
        className: "grid-custom"
      }
    ],
    layouts: [
      {
        id: "single-column",
        name: "Single Column",
        description: "Single column layout for mobile",
        className: "layout-single-column"
      },
      {
        id: "two-column",
        name: "Two Column",
        description: "Two column layout for tablets",
        className: "layout-two-column"
      },
      {
        id: "three-column",
        name: "Three Column",
        description: "Three column layout for desktop",
        className: "layout-three-column"
      },
      {
        id: "sidebar",
        name: "Sidebar Layout",
        description: "Sidebar with main content area",
        className: "layout-sidebar"
      }
    ],
    defaultConfig: {
      system: "flexbox",
      name: "Flexbox Grid",
      description: "CSS Flexbox-based responsive grid system",
      columns: 12,
      gutters: "1rem",
      breakpoints: ["sm", "md", "lg", "xl", "2xl"],
      utilities: [
        "grid-cols-1",
        "grid-cols-2",
        "grid-cols-3",
        "grid-cols-4",
        "grid-cols-6",
        "grid-cols-12"
      ],
      responsive: true,
      containerQueries: false
    }
  },
  components: {
    types: [
      {
        id: "navigation",
        name: "Navigation",
        description: "Responsive navigation components",
        className: "component-navigation"
      },
      {
        id: "cards",
        name: "Cards",
        description: "Responsive card layouts",
        className: "component-cards"
      },
      {
        id: "forms",
        name: "Forms",
        description: "Responsive form layouts",
        className: "component-forms"
      },
      {
        id: "tables",
        name: "Tables",
        description: "Responsive table layouts",
        className: "component-tables"
      },
      {
        id: "modals",
        name: "Modals",
        description: "Responsive modal dialogs",
        className: "component-modals"
      },
      {
        id: "galleries",
        name: "Galleries",
        description: "Responsive image galleries",
        className: "component-galleries"
      }
    ],
    layouts: [
      {
        id: "stacked",
        name: "Stacked",
        description: "Vertical stacked layout for mobile",
        className: "layout-stacked"
      },
      {
        id: "horizontal",
        name: "Horizontal",
        description: "Horizontal layout for desktop",
        className: "layout-horizontal"
      },
      {
        id: "grid",
        name: "Grid",
        description: "Grid layout for multiple items",
        className: "layout-grid"
      },
      {
        id: "sidebar",
        name: "Sidebar",
        description: "Sidebar with main content",
        className: "layout-sidebar"
      }
    ],
    defaultConfig: {
      component: "navigation",
      name: "Navigation",
      description: "Responsive navigation component",
      mobile: {
        layout: "flex-col space-y-2",
        spacing: "p-4",
        typography: "text-sm",
        interactions: ["hamburger-menu", "touch-friendly"]
      },
      tablet: {
        layout: "flex-row space-x-4",
        spacing: "p-6",
        typography: "text-base",
        interactions: ["horizontal-menu", "hover-effects"]
      },
      desktop: {
        layout: "flex-row space-x-6",
        spacing: "p-8",
        typography: "text-lg",
        interactions: ["full-menu", "keyboard-navigation"]
      },
      cssClasses: [
        "flex",
        "items-center",
        "justify-between",
        "responsive-navigation"
      ],
      implementation: "Use flexbox with responsive breakpoints"
    }
  },
  typography: {
    types: [
      {
        id: "heading",
        name: "Heading",
        description: "Responsive heading typography",
        scale: 1.25,
        className: "typography-heading"
      },
      {
        id: "body",
        name: "Body",
        description: "Responsive body text",
        scale: 1.125,
        className: "typography-body"
      },
      {
        id: "caption",
        name: "Caption",
        description: "Responsive caption text",
        scale: 1.0,
        className: "typography-caption"
      },
      {
        id: "button",
        name: "Button",
        description: "Responsive button text",
        scale: 1.0,
        className: "typography-button"
      }
    ],
    scales: [
      {
        id: "small",
        name: "Small Scale",
        description: "Conservative typography scaling",
        className: "scale-small"
      },
      {
        id: "medium",
        name: "Medium Scale",
        description: "Balanced typography scaling",
        className: "scale-medium"
      },
      {
        id: "large",
        name: "Large Scale",
        description: "Aggressive typography scaling",
        className: "scale-large"
      }
    ],
    defaultConfig: {
      type: "body",
      name: "Body Text",
      minSize: "14px",
      maxSize: "18px",
      minWidth: "320px",
      maxWidth: "1920px",
      scale: 1.125,
      lineHeight: "1.6",
      fontWeight: "400",
      implementation: "Use CSS clamp() for fluid typography",
      cssClasses: [
        "text-sm",
        "md:text-base",
        "lg:text-lg",
        "xl:text-xl"
      ]
    }
  },
  images: {
    types: [
      {
        id: "hero",
        name: "Hero Image",
        description: "Large hero/banner images",
        className: "image-hero"
      },
      {
        id: "card",
        name: "Card Image",
        description: "Images for card components",
        className: "image-card"
      },
      {
        id: "gallery",
        name: "Gallery Image",
        description: "Images for galleries and grids",
        className: "image-gallery"
      },
      {
        id: "avatar",
        name: "Avatar",
        description: "Profile and avatar images",
        className: "image-avatar"
      },
      {
        id: "icon",
        name: "Icon",
        description: "Icon and small images",
        className: "image-icon"
      }
    ],
    formats: [
      {
        id: "webp",
        name: "WebP",
        description: "Modern image format with good compression",
        className: "format-webp"
      },
      {
        id: "avif",
        name: "AVIF",
        description: "Next-generation image format",
        className: "format-avif"
      },
      {
        id: "jpeg",
        name: "JPEG",
        description: "Traditional image format with wide support",
        className: "format-jpeg"
      },
      {
        id: "png",
        name: "PNG",
        description: "Lossless image format for graphics",
        className: "format-png"
      }
    ],
    defaultConfig: {
      type: "card",
      name: "Card Image",
      description: "Responsive image for card components",
      mobile: {
        width: "100%",
        height: "200px",
        quality: 80,
        format: "webp"
      },
      tablet: {
        width: "100%",
        height: "250px",
        quality: 85,
        format: "webp"
      },
      desktop: {
        width: "100%",
        height: "300px",
        quality: 90,
        format: "webp"
      },
      lazyLoading: true,
      srcSet: true,
      artDirection: false,
      implementation: "Use Next.js Image component with responsive sizes"
    }
  },
  containers: {
    types: [
      {
        id: "fluid",
        name: "Fluid Container",
        description: "Full-width fluid container",
        className: "container-fluid"
      },
      {
        id: "fixed",
        name: "Fixed Container",
        description: "Fixed-width container with max-width",
        className: "container-fixed"
      },
      {
        id: "responsive",
        name: "Responsive Container",
        description: "Responsive container with breakpoint-based widths",
        className: "container-responsive"
      },
      {
        id: "custom",
        name: "Custom Container",
        description: "Custom container with specific requirements",
        className: "container-custom"
      }
    ],
    sizes: [
      {
        id: "sm",
        name: "Small",
        description: "Small container for mobile",
        className: "size-sm"
      },
      {
        id: "md",
        name: "Medium",
        description: "Medium container for tablet",
        className: "size-md"
      },
      {
        id: "lg",
        name: "Large",
        description: "Large container for desktop",
        className: "size-lg"
      },
      {
        id: "xl",
        name: "Extra Large",
        description: "Extra large container for wide screens",
        className: "size-xl"
      }
    ],
    defaultConfig: {
      type: "responsive",
      name: "Responsive Container",
      description: "Responsive container with breakpoint-based max-widths",
      maxWidths: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px"
      },
      padding: "1rem",
      margin: "0 auto",
      breakpoints: ["sm", "md", "lg", "xl", "2xl"],
      cssClasses: [
        "container",
        "mx-auto",
        "px-4",
        "responsive-container"
      ],
      implementation: "Use CSS max-width with responsive breakpoints"
    }
  }
}

// Helper functions to get specific configurations
export function getBreakpoint(breakpointId: string) {
  return responsiveConfig.breakpoints.variants.find(b => b.id === breakpointId)
}

export function getResponsivePattern(patternId: string) {
  return responsiveConfig.patterns.types.find(p => p.id === patternId)
}

export function getGridSystem(systemId: string) {
  return responsiveConfig.gridSystems.types.find(g => g.id === systemId)
}

export function getResponsiveComponent(componentId: string) {
  return responsiveConfig.components.types.find(c => c.id === componentId)
}

export function getFluidTypography(typeId: string) {
  return responsiveConfig.typography.types.find(t => t.id === typeId)
}

export function getResponsiveImage(typeId: string) {
  return responsiveConfig.images.types.find(i => i.id === typeId)
}

export function getContainer(typeId: string) {
  return responsiveConfig.containers.types.find(c => c.id === typeId)
}
