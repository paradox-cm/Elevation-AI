export interface LayoutPatternsConfig {
  heroSections: {
    variants: HeroSectionVariant[]
    sizes: HeroSectionSize[]
    backgrounds: HeroSectionBackground[]
    defaultConfig: HeroSectionConfig
  }
  contentSections: {
    variants: ContentSectionVariant[]
    padding: ContentSectionPadding[]
    maxWidths: ContentSectionMaxWidth[]
    defaultConfig: ContentSectionConfig
  }
  featureGrids: {
    variants: FeatureGridVariant[]
    columns: FeatureGridColumns[]
    defaultConfig: FeatureGridConfig
  }
  statsSections: {
    variants: StatsSectionVariant[]
    columns: StatsSectionColumns[]
    defaultConfig: StatsSectionConfig
  }
  testimonialSections: {
    variants: TestimonialSectionVariant[]
    layouts: TestimonialSectionLayout[]
    defaultConfig: TestimonialSectionConfig
  }
  ctaSections: {
    variants: CTASectionVariant[]
    backgrounds: CTASectionBackground[]
    defaultConfig: CTASectionConfig
  }
  sidebarLayouts: {
    variants: SidebarLayoutVariant[]
    widths: SidebarLayoutWidth[]
    defaultConfig: SidebarLayoutConfig
  }
  twoColumnLayouts: {
    variants: TwoColumnLayoutVariant[]
    gaps: TwoColumnLayoutGap[]
    defaultConfig: TwoColumnLayoutConfig
  }
  containers: {
    variants: ContainerVariant[]
    maxWidths: ContainerMaxWidth[]
    padding: ContainerPadding[]
    defaultConfig: ContainerConfig
  }
  pageLayouts: {
    variants: PageLayoutVariant[]
    defaultConfig: PageLayoutConfig
  }
}

// Hero Section Types
export interface HeroSectionVariant {
  id: string
  name: string
  description: string
  className: string
  centered: boolean
  background: string
  size: string
}

export interface HeroSectionSize {
  id: string
  name: string
  className: string
  padding: string
}

export interface HeroSectionBackground {
  id: string
  name: string
  className: string
  description: string
}

export interface HeroSectionConfig {
  variant: string
  size: string
  background: string
  centered: boolean
  showSubtitle: boolean
  showDescription: boolean
  showActions: boolean
  maxActions: number
}

// Content Section Types
export interface ContentSectionVariant {
  id: string
  name: string
  description: string
  className: string
  centered: boolean
}

export interface ContentSectionPadding {
  id: string
  name: string
  className: string
  padding: string
}

export interface ContentSectionMaxWidth {
  id: string
  name: string
  className: string
  maxWidth: string
}

export interface ContentSectionConfig {
  variant: string
  padding: string
  maxWidth: string
  centered: boolean
  showTitle: boolean
  showDescription: boolean
}

// Feature Grid Types
export interface FeatureGridVariant {
  id: string
  name: string
  description: string
  className: string
  cardStyle: string
}

export interface FeatureGridColumns {
  id: string
  name: string
  className: string
  columns: number
  responsive: boolean
}

export interface FeatureGridConfig {
  variant: string
  columns: string
  showIcons: boolean
  showLinks: boolean
  hoverEffects: boolean
}

// Stats Section Types
export interface StatsSectionVariant {
  id: string
  name: string
  description: string
  className: string
  background: string
}

export interface StatsSectionColumns {
  id: string
  name: string
  className: string
  columns: number
  responsive: boolean
}

export interface StatsSectionConfig {
  variant: string
  columns: string
  showTrends: boolean
  showDescriptions: boolean
  background: string
}

// Testimonial Section Types
export interface TestimonialSectionVariant {
  id: string
  name: string
  description: string
  className: string
  cardStyle: string
}

export interface TestimonialSectionLayout {
  id: string
  name: string
  className: string
  columns: number
  responsive: boolean
}

export interface TestimonialSectionConfig {
  variant: string
  layout: string
  showRatings: boolean
  showAvatars: boolean
  maxTestimonials: number
}

// CTA Section Types
export interface CTASectionVariant {
  id: string
  name: string
  description: string
  className: string
  background: string
}

export interface CTASectionBackground {
  id: string
  name: string
  className: string
  description: string
}

export interface CTASectionConfig {
  variant: string
  background: string
  showDescription: boolean
  maxActions: number
  centered: boolean
}

// Sidebar Layout Types
export interface SidebarLayoutVariant {
  id: string
  name: string
  description: string
  className: string
  sidebarPosition: 'left' | 'right'
}

export interface SidebarLayoutWidth {
  id: string
  name: string
  className: string
  width: string
}

export interface SidebarLayoutConfig {
  variant: string
  width: string
  sidebarPosition: 'left' | 'right'
  sticky: boolean
  collapsible: boolean
}

// Two Column Layout Types
export interface TwoColumnLayoutVariant {
  id: string
  name: string
  description: string
  className: string
  responsive: boolean
}

export interface TwoColumnLayoutGap {
  id: string
  name: string
  className: string
  gap: string
}

export interface TwoColumnLayoutConfig {
  variant: string
  gap: string
  reverse: boolean
  responsive: boolean
  equalHeight: boolean
}

// Container Types
export interface ContainerVariant {
  id: string
  name: string
  description: string
  className: string
  fluid: boolean
}

export interface ContainerMaxWidth {
  id: string
  name: string
  className: string
  maxWidth: string
}

export interface ContainerPadding {
  id: string
  name: string
  className: string
  padding: string
}

export interface ContainerConfig {
  variant: string
  maxWidth: string
  padding: string
  fluid: boolean
  centered: boolean
}

// Page Layout Types
export interface PageLayoutVariant {
  id: string
  name: string
  description: string
  className: string
  sections: string[]
}

export interface PageLayoutConfig {
  variant: string
  showHeader: boolean
  showFooter: boolean
  showSidebar: boolean
  sections: string[]
}

export const layoutPatternsConfig: LayoutPatternsConfig = {
  heroSections: {
    variants: [
      {
        id: "default",
        name: "Default Hero",
        description: "Standard hero section with centered content",
        className: "text-center",
        centered: true,
        background: "default",
        size: "lg"
      },
      {
        id: "left-aligned",
        name: "Left Aligned Hero",
        description: "Hero section with left-aligned content",
        className: "text-left",
        centered: false,
        background: "default",
        size: "lg"
      },
      {
        id: "gradient",
        name: "Gradient Hero",
        description: "Hero section with gradient background",
        className: "text-center bg-gradient-to-br from-primary/5 via-background to-secondary/5",
        centered: true,
        background: "gradient",
        size: "lg"
      },
      {
        id: "minimal",
        name: "Minimal Hero",
        description: "Clean, minimal hero section",
        className: "text-center py-12",
        centered: true,
        background: "default",
        size: "sm"
      }
    ],
    sizes: [
      {
        id: "sm",
        name: "Small",
        className: "py-12",
        padding: "3rem"
      },
      {
        id: "md",
        name: "Medium",
        className: "py-16",
        padding: "4rem"
      },
      {
        id: "lg",
        name: "Large",
        className: "py-20",
        padding: "5rem"
      },
      {
        id: "xl",
        name: "Extra Large",
        className: "py-24",
        padding: "6rem"
      }
    ],
    backgrounds: [
      {
        id: "default",
        name: "Default",
        className: "bg-background",
        description: "Standard background"
      },
      {
        id: "gradient",
        name: "Gradient",
        className: "bg-gradient-to-br from-primary/5 via-background to-secondary/5",
        description: "Subtle gradient background"
      },
      {
        id: "muted",
        name: "Muted",
        className: "bg-muted/50",
        description: "Muted background"
      }
    ],
    defaultConfig: {
      variant: "default",
      size: "lg",
      background: "default",
      centered: true,
      showSubtitle: true,
      showDescription: true,
      showActions: true,
      maxActions: 2
    }
  },
  contentSections: {
    variants: [
      {
        id: "default",
        name: "Default Section",
        description: "Standard content section",
        className: "w-full",
        centered: true
      },
      {
        id: "narrow",
        name: "Narrow Section",
        description: "Content section with narrow width",
        className: "w-full max-w-4xl mx-auto",
        centered: true
      },
      {
        id: "wide",
        name: "Wide Section",
        description: "Content section with full width",
        className: "w-full max-w-none",
        centered: false
      }
    ],
    padding: [
      {
        id: "sm",
        name: "Small",
        className: "py-8",
        padding: "2rem"
      },
      {
        id: "md",
        name: "Medium",
        className: "py-12",
        padding: "3rem"
      },
      {
        id: "lg",
        name: "Large",
        className: "py-16",
        padding: "4rem"
      },
      {
        id: "xl",
        name: "Extra Large",
        className: "py-20",
        padding: "5rem"
      }
    ],
    maxWidths: [
      {
        id: "sm",
        name: "Small",
        className: "max-w-2xl",
        maxWidth: "42rem"
      },
      {
        id: "md",
        name: "Medium",
        className: "max-w-4xl",
        maxWidth: "56rem"
      },
      {
        id: "lg",
        name: "Large",
        className: "max-w-6xl",
        maxWidth: "72rem"
      },
      {
        id: "xl",
        name: "Extra Large",
        className: "max-w-7xl",
        maxWidth: "80rem"
      },
      {
        id: "full",
        name: "Full Width",
        className: "max-w-none",
        maxWidth: "100%"
      }
    ],
    defaultConfig: {
      variant: "default",
      padding: "lg",
      maxWidth: "lg",
      centered: true,
      showTitle: true,
      showDescription: true
    }
  },
  featureGrids: {
    variants: [
      {
        id: "default",
        name: "Default Grid",
        description: "Standard feature grid with cards",
        className: "grid gap-8",
        cardStyle: "card"
      },
      {
        id: "minimal",
        name: "Minimal Grid",
        description: "Clean feature grid without cards",
        className: "grid gap-6",
        cardStyle: "minimal"
      },
      {
        id: "elevated",
        name: "Elevated Grid",
        description: "Feature grid with elevated cards",
        className: "grid gap-8",
        cardStyle: "elevated"
      }
    ],
    columns: [
      {
        id: "2",
        name: "2 Columns",
        className: "grid-cols-1 md:grid-cols-2",
        columns: 2,
        responsive: true
      },
      {
        id: "3",
        name: "3 Columns",
        className: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        columns: 3,
        responsive: true
      },
      {
        id: "4",
        name: "4 Columns",
        className: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        columns: 4,
        responsive: true
      }
    ],
    defaultConfig: {
      variant: "default",
      columns: "3",
      showIcons: true,
      showLinks: true,
      hoverEffects: true
    }
  },
  statsSections: {
    variants: [
      {
        id: "default",
        name: "Default Stats",
        description: "Standard statistics section",
        className: "py-16",
        background: "default"
      },
      {
        id: "muted",
        name: "Muted Stats",
        description: "Statistics section with muted background",
        className: "py-16 bg-muted/50",
        background: "muted"
      },
      {
        id: "gradient",
        name: "Gradient Stats",
        description: "Statistics section with gradient background",
        className: "py-16 bg-gradient-to-r from-primary/5 to-secondary/5",
        background: "gradient"
      }
    ],
    columns: [
      {
        id: "2",
        name: "2 Columns",
        className: "grid-cols-1 md:grid-cols-2",
        columns: 2,
        responsive: true
      },
      {
        id: "3",
        name: "3 Columns",
        className: "grid-cols-1 md:grid-cols-3",
        columns: 3,
        responsive: true
      },
      {
        id: "4",
        name: "4 Columns",
        className: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        columns: 4,
        responsive: true
      }
    ],
    defaultConfig: {
      variant: "default",
      columns: "4",
      showTrends: true,
      showDescriptions: true,
      background: "default"
    }
  },
  testimonialSections: {
    variants: [
      {
        id: "default",
        name: "Default Testimonials",
        description: "Standard testimonial section with cards",
        className: "py-16",
        cardStyle: "card"
      },
      {
        id: "minimal",
        name: "Minimal Testimonials",
        description: "Clean testimonial section without cards",
        className: "py-16",
        cardStyle: "minimal"
      },
      {
        id: "elevated",
        name: "Elevated Testimonials",
        description: "Testimonial section with elevated cards",
        className: "py-16",
        cardStyle: "elevated"
      }
    ],
    layouts: [
      {
        id: "2-columns",
        name: "2 Columns",
        className: "grid gap-8 md:grid-cols-2",
        columns: 2,
        responsive: true
      },
      {
        id: "3-columns",
        name: "3 Columns",
        className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3",
        columns: 3,
        responsive: true
      },
      {
        id: "carousel",
        name: "Carousel",
        className: "flex gap-4 overflow-x-auto",
        columns: 1,
        responsive: false
      }
    ],
    defaultConfig: {
      variant: "default",
      layout: "3-columns",
      showRatings: true,
      showAvatars: true,
      maxTestimonials: 6
    }
  },
  ctaSections: {
    variants: [
      {
        id: "default",
        name: "Default CTA",
        description: "Standard call-to-action section",
        className: "py-16",
        background: "default"
      },
      {
        id: "gradient",
        name: "Gradient CTA",
        description: "Call-to-action with gradient background",
        className: "py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
        background: "gradient"
      },
      {
        id: "primary",
        name: "Primary CTA",
        description: "Call-to-action with primary background",
        className: "py-16 bg-primary text-primary-foreground",
        background: "primary"
      }
    ],
    backgrounds: [
      {
        id: "default",
        name: "Default",
        className: "bg-muted/50",
        description: "Muted background"
      },
      {
        id: "gradient",
        name: "Gradient",
        className: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
        description: "Primary gradient background"
      },
      {
        id: "primary",
        name: "Primary",
        className: "bg-primary text-primary-foreground",
        description: "Solid primary background"
      }
    ],
    defaultConfig: {
      variant: "default",
      background: "default",
      showDescription: true,
      maxActions: 2,
      centered: true
    }
  },
  sidebarLayouts: {
    variants: [
      {
        id: "default",
        name: "Default Sidebar",
        description: "Standard sidebar layout",
        className: "flex min-h-screen",
        sidebarPosition: 'left'
      },
      {
        id: "right-sidebar",
        name: "Right Sidebar",
        description: "Sidebar positioned on the right",
        className: "flex min-h-screen flex-row-reverse",
        sidebarPosition: 'right'
      },
      {
        id: "collapsible",
        name: "Collapsible Sidebar",
        description: "Sidebar that can be collapsed",
        className: "flex min-h-screen",
        sidebarPosition: 'left'
      }
    ],
    widths: [
      {
        id: "sm",
        name: "Small",
        className: "w-64",
        width: "16rem"
      },
      {
        id: "md",
        name: "Medium",
        className: "w-80",
        width: "20rem"
      },
      {
        id: "lg",
        name: "Large",
        className: "w-96",
        width: "24rem"
      }
    ],
    defaultConfig: {
      variant: "default",
      width: "md",
      sidebarPosition: 'left',
      sticky: true,
      collapsible: false
    }
  },
  twoColumnLayouts: {
    variants: [
      {
        id: "default",
        name: "Default Two Column",
        description: "Standard two-column layout",
        className: "grid md:grid-cols-2",
        responsive: true
      },
      {
        id: "asymmetric",
        name: "Asymmetric Two Column",
        description: "Two-column layout with different column widths",
        className: "grid md:grid-cols-3",
        responsive: true
      },
      {
        id: "stacked",
        name: "Stacked Two Column",
        description: "Two-column layout that stacks on mobile",
        className: "flex flex-col md:flex-row",
        responsive: true
      }
    ],
    gaps: [
      {
        id: "sm",
        name: "Small Gap",
        className: "gap-4",
        gap: "1rem"
      },
      {
        id: "md",
        name: "Medium Gap",
        className: "gap-8",
        gap: "2rem"
      },
      {
        id: "lg",
        name: "Large Gap",
        className: "gap-12",
        gap: "3rem"
      },
      {
        id: "xl",
        name: "Extra Large Gap",
        className: "gap-16",
        gap: "4rem"
      }
    ],
    defaultConfig: {
      variant: "default",
      gap: "lg",
      reverse: false,
      responsive: true,
      equalHeight: false
    }
  },
  containers: {
    variants: [
      {
        id: "default",
        name: "Default Container",
        description: "Standard container with max-width",
        className: "mx-auto",
        fluid: false
      },
      {
        id: "fluid",
        name: "Fluid Container",
        description: "Container that takes full width",
        className: "w-full",
        fluid: true
      },
      {
        id: "narrow",
        name: "Narrow Container",
        description: "Container with narrow max-width",
        className: "mx-auto max-w-4xl",
        fluid: false
      }
    ],
    maxWidths: [
      {
        id: "sm",
        name: "Small",
        className: "max-w-2xl",
        maxWidth: "42rem"
      },
      {
        id: "md",
        name: "Medium",
        className: "max-w-4xl",
        maxWidth: "56rem"
      },
      {
        id: "lg",
        name: "Large",
        className: "max-w-6xl",
        maxWidth: "72rem"
      },
      {
        id: "xl",
        name: "Extra Large",
        className: "max-w-7xl",
        maxWidth: "80rem"
      },
      {
        id: "full",
        name: "Full Width",
        className: "max-w-none",
        maxWidth: "100%"
      }
    ],
    padding: [
      {
        id: "sm",
        name: "Small",
        className: "px-4",
        padding: "1rem"
      },
      {
        id: "md",
        name: "Medium",
        className: "px-6",
        padding: "1.5rem"
      },
      {
        id: "lg",
        name: "Large",
        className: "px-8",
        padding: "2rem"
      },
      {
        id: "xl",
        name: "Extra Large",
        className: "px-12",
        padding: "3rem"
      }
    ],
    defaultConfig: {
      variant: "default",
      maxWidth: "lg",
      padding: "md",
      fluid: false,
      centered: true
    }
  },
  pageLayouts: {
    variants: [
      {
        id: "landing",
        name: "Landing Page",
        description: "Complete landing page layout",
        className: "min-h-screen",
        sections: ["hero", "features", "stats", "testimonials", "cta"]
      },
      {
        id: "dashboard",
        name: "Dashboard",
        description: "Dashboard layout with sidebar",
        className: "flex min-h-screen",
        sections: ["header", "sidebar", "main", "footer"]
      },
      {
        id: "content",
        name: "Content Page",
        description: "Content-focused page layout",
        className: "min-h-screen",
        sections: ["header", "main", "footer"]
      },
      {
        id: "form",
        name: "Form Page",
        description: "Form-focused page layout",
        className: "min-h-screen",
        sections: ["header", "form", "footer"]
      }
    ],
    defaultConfig: {
      variant: "landing",
      showHeader: true,
      showFooter: true,
      showSidebar: false,
      sections: ["hero", "features", "stats", "testimonials", "cta"]
    }
  }
}

// Helper functions for accessing configuration
export function getHeroSectionVariant(id: string): HeroSectionVariant | undefined {
  return layoutPatternsConfig.heroSections.variants.find(v => v.id === id)
}

export function getContentSectionVariant(id: string): ContentSectionVariant | undefined {
  return layoutPatternsConfig.contentSections.variants.find(v => v.id === id)
}

export function getFeatureGridVariant(id: string): FeatureGridVariant | undefined {
  return layoutPatternsConfig.featureGrids.variants.find(v => v.id === id)
}

export function getStatsSectionVariant(id: string): StatsSectionVariant | undefined {
  return layoutPatternsConfig.statsSections.variants.find(v => v.id === id)
}

export function getTestimonialSectionVariant(id: string): TestimonialSectionVariant | undefined {
  return layoutPatternsConfig.testimonialSections.variants.find(v => v.id === id)
}

export function getCTASectionVariant(id: string): CTASectionVariant | undefined {
  return layoutPatternsConfig.ctaSections.variants.find(v => v.id === id)
}

export function getSidebarLayoutVariant(id: string): SidebarLayoutVariant | undefined {
  return layoutPatternsConfig.sidebarLayouts.variants.find(v => v.id === id)
}

export function getTwoColumnLayoutVariant(id: string): TwoColumnLayoutVariant | undefined {
  return layoutPatternsConfig.twoColumnLayouts.variants.find(v => v.id === id)
}

export function getContainerVariant(id: string): ContainerVariant | undefined {
  return layoutPatternsConfig.containers.variants.find(v => v.id === id)
}

export function getPageLayoutVariant(id: string): PageLayoutVariant | undefined {
  return layoutPatternsConfig.pageLayouts.variants.find(v => v.id === id)
}

// Export default configuration
export default layoutPatternsConfig
