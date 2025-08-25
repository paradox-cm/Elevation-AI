// Branding Configuration
// Defines all brand identity elements, logo variations, usage guidelines, and brand standards

export interface LogoConfig {
  type: "primary" | "secondary" | "icon" | "wordmark" | "symbol"
  name: string
  description: string
  filePath: string
  width: number
  height: number
  format: "svg" | "png" | "jpg" | "webp"
  variants: string[]
  usage: string[]
  restrictions: string[]
  clearSpace: number
  minSize: number
  maxSize: number
}

export interface BrandColorConfig {
  color: "primary" | "secondary" | "accent" | "neutral" | "semantic"
  name: string
  description: string
  hex: string
  rgb: string
  hsl: string
  usage: string[]
  accessibility: {
    contrastRatio: number
    wcagLevel: "A" | "AA" | "AAA"
    notes: string
  }
  variants: {
    light: string
    dark: string
    muted: string
  }
}

export interface TypographyConfig {
  type: "heading" | "body" | "display" | "monospace"
  name: string
  description: string
  fontFamily: string
  weights: number[]
  sizes: string[]
  lineHeights: string[]
  usage: string[]
  examples: string[]
}

export interface BrandVoiceConfig {
  tone: "professional" | "friendly" | "authoritative" | "innovative" | "trustworthy"
  name: string
  description: string
  characteristics: string[]
  do: string[]
  dont: string[]
  examples: string[]
  contexts: string[]
}

export interface BrandGuidelineConfig {
  category: "logo" | "color" | "typography" | "spacing" | "imagery" | "tone"
  name: string
  description: string
  rules: string[]
  examples: string[]
  exceptions: string[]
  enforcement: "strict" | "flexible" | "recommended"
  documentation: string[]
}

export interface BrandAssetConfig {
  type: "logo" | "icon" | "pattern" | "illustration" | "photography"
  name: string
  description: string
  filePath: string
  formats: string[]
  sizes: string[]
  usage: string[]
  restrictions: string[]
  downloadUrl?: string
}

export interface BrandApplicationConfig {
  context: "web" | "mobile" | "print" | "social" | "presentation" | "merchandise"
  name: string
  description: string
  requirements: string[]
  specifications: Record<string, string>
  examples: string[]
  bestPractices: string[]
  restrictions: string[]
}

export interface BrandConfig {
  logos: {
    types: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    variations: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: LogoConfig
  }
  colors: {
    types: Array<{
      id: string
      name: string
      description: string
      hex: string
      className: string
    }>
    palettes: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: BrandColorConfig
  }
  typography: {
    types: Array<{
      id: string
      name: string
      description: string
      fontFamily: string
      className: string
    }>
    scales: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: TypographyConfig
  }
  voice: {
    tones: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    contexts: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: BrandVoiceConfig
  }
  guidelines: {
    categories: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    rules: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: BrandGuidelineConfig
  }
  assets: {
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
    defaultConfig: BrandAssetConfig
  }
  applications: {
    contexts: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    specifications: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: BrandApplicationConfig
  }
}

export const brandingConfig: BrandConfig = {
  logos: {
    types: [
      {
        id: "primary",
        name: "Primary Logo",
        description: "Main brand logo for primary applications",
        type: "primary",
        className: "logo-primary"
      },
      {
        id: "secondary",
        name: "Secondary Logo",
        description: "Alternative logo for specific contexts",
        type: "secondary",
        className: "logo-secondary"
      },
      {
        id: "icon",
        name: "Icon Only",
        description: "Symbol-only version for small spaces",
        type: "icon",
        className: "logo-icon"
      },
      {
        id: "wordmark",
        name: "Wordmark",
        description: "Text-only version of the logo",
        type: "wordmark",
        className: "logo-wordmark"
      },
      {
        id: "symbol",
        name: "Symbol",
        description: "Graphic symbol without text",
        type: "symbol",
        className: "logo-symbol"
      }
    ],
    variations: [
      {
        id: "light",
        name: "Light Version",
        description: "Logo for light backgrounds",
        className: "variation-light"
      },
      {
        id: "dark",
        name: "Dark Version",
        description: "Logo for dark backgrounds",
        className: "variation-dark"
      },
      {
        id: "monochrome",
        name: "Monochrome",
        description: "Single color version",
        className: "variation-monochrome"
      },
      {
        id: "reversed",
        name: "Reversed",
        description: "Inverted color version",
        className: "variation-reversed"
      }
    ],
    defaultConfig: {
      type: "primary",
      name: "Elevation AI Logo",
      description: "Primary brand logo for Elevation AI",
      filePath: "/images/branding/E-AI.Logo.svg",
      width: 200,
      height: 35,
      format: "svg",
      variants: ["light", "dark", "monochrome"],
      usage: [
        "Primary brand applications",
        "Marketing materials",
        "Web applications",
        "Business communications"
      ],
      restrictions: [
        "Do not stretch or distort",
        "Maintain clear space requirements",
        "Use approved colors only",
        "Do not add effects or shadows"
      ],
      clearSpace: 35,
      minSize: 60,
      maxSize: 400
    }
  },
  colors: {
    types: [
      {
        id: "primary",
        name: "Primary Blue",
        description: "Main brand color",
        hex: "#3B82F6",
        className: "color-primary"
      },
      {
        id: "secondary",
        name: "Secondary Gray",
        description: "Supporting brand color",
        hex: "#6B7280",
        className: "color-secondary"
      },
      {
        id: "accent",
        name: "Accent Orange",
        description: "Highlight and accent color",
        hex: "#F59E0B",
        className: "color-accent"
      },
      {
        id: "neutral",
        name: "Neutral Gray",
        description: "Neutral brand color",
        hex: "#9CA3AF",
        className: "color-neutral"
      },
      {
        id: "success",
        name: "Success Green",
        description: "Success and positive states",
        hex: "#10B981",
        className: "color-success"
      },
      {
        id: "error",
        name: "Error Red",
        description: "Error and warning states",
        hex: "#EF4444",
        className: "color-error"
      }
    ],
    palettes: [
      {
        id: "primary-palette",
        name: "Primary Palette",
        description: "Main brand color variations",
        className: "palette-primary"
      },
      {
        id: "neutral-palette",
        name: "Neutral Palette",
        description: "Neutral color variations",
        className: "palette-neutral"
      },
      {
        id: "semantic-palette",
        name: "Semantic Palette",
        description: "Semantic color meanings",
        className: "palette-semantic"
      }
    ],
    defaultConfig: {
      color: "primary",
      name: "Primary Blue",
      description: "Main brand color for Elevation AI",
      hex: "#3B82F6",
      rgb: "rgb(59, 130, 246)",
      hsl: "hsl(217, 91%, 60%)",
      usage: [
        "Primary brand elements",
        "Call-to-action buttons",
        "Links and interactive elements",
        "Brand highlights"
      ],
      accessibility: {
        contrastRatio: 4.5,
        wcagLevel: "AA",
        notes: "Meets WCAG AA standards for normal text"
      },
      variants: {
        light: "#60A5FA",
        dark: "#2563EB",
        muted: "#DBEAFE"
      }
    }
  },
  typography: {
    types: [
      {
        id: "heading",
        name: "Heading Font",
        description: "Primary font for headings and titles",
        fontFamily: "Helvetica Now Display",
        className: "font-heading"
      },
      {
        id: "body",
        name: "Body Font",
        description: "Primary font for body text and content",
        fontFamily: "Helvetica Now Text",
        className: "font-body"
      },
      {
        id: "display",
        name: "Display Font",
        description: "Font for large display text",
        fontFamily: "Helvetica Now Display",
        className: "font-display"
      },
      {
        id: "monospace",
        name: "Monospace Font",
        description: "Font for code and technical content",
        fontFamily: "JetBrains Mono",
        className: "font-mono"
      }
    ],
    scales: [
      {
        id: "heading-scale",
        name: "Heading Scale",
        description: "Typography scale for headings",
        className: "scale-heading"
      },
      {
        id: "body-scale",
        name: "Body Scale",
        description: "Typography scale for body text",
        className: "scale-body"
      },
      {
        id: "display-scale",
        name: "Display Scale",
        description: "Typography scale for display text",
        className: "scale-display"
      }
    ],
    defaultConfig: {
      type: "heading",
      name: "Helvetica Now Display",
      description: "Primary heading font for Elevation AI",
      fontFamily: "Helvetica Now Display",
      weights: [300, 400, 500, 600, 700, 800],
      sizes: ["2rem", "1.75rem", "1.5rem", "1.25rem", "1.125rem", "1rem"],
      lineHeights: ["1.2", "1.3", "1.4", "1.5", "1.6"],
      usage: [
        "Page titles and headings",
        "Section headers",
        "Brand messaging",
        "Marketing headlines"
      ],
      examples: [
        "Elevation AI Design System",
        "Modern UI Components",
        "Professional Interface Design"
      ]
    }
  },
  voice: {
    tones: [
      {
        id: "professional",
        name: "Professional",
        description: "Formal and authoritative tone",
        className: "tone-professional"
      },
      {
        id: "friendly",
        name: "Friendly",
        description: "Approachable and welcoming tone",
        className: "tone-friendly"
      },
      {
        id: "innovative",
        name: "Innovative",
        description: "Forward-thinking and creative tone",
        className: "tone-innovative"
      },
      {
        id: "trustworthy",
        name: "Trustworthy",
        description: "Reliable and dependable tone",
        className: "tone-trustworthy"
      }
    ],
    contexts: [
      {
        id: "marketing",
        name: "Marketing",
        description: "Brand communication and promotion",
        className: "context-marketing"
      },
      {
        id: "product",
        name: "Product",
        description: "Product documentation and guides",
        className: "context-product"
      },
      {
        id: "support",
        name: "Support",
        description: "Customer service and help content",
        className: "context-support"
      }
    ],
    defaultConfig: {
      tone: "professional",
      name: "Professional",
      description: "Professional and authoritative brand voice",
      characteristics: [
        "Clear and concise",
        "Authoritative but approachable",
        "Technically accurate",
        "Solution-focused"
      ],
      do: [
        "Use clear, direct language",
        "Focus on benefits and solutions",
        "Maintain technical accuracy",
        "Be consistent across all channels"
      ],
      dont: [
        "Use overly casual language",
        "Make unsubstantiated claims",
        "Use jargon without explanation",
        "Inconsistent messaging"
      ],
      examples: [
        "Elevation AI provides comprehensive design system solutions for modern applications.",
        "Our components are built with accessibility and performance in mind.",
        "Transform your user interface with our professional design system."
      ],
      contexts: ["marketing", "product", "documentation", "support"]
    }
  },
  guidelines: {
    categories: [
      {
        id: "logo-usage",
        name: "Logo Usage",
        description: "Guidelines for logo application",
        className: "category-logo"
      },
      {
        id: "color-usage",
        name: "Color Usage",
        description: "Guidelines for brand color application",
        className: "category-color"
      },
      {
        id: "typography-usage",
        name: "Typography Usage",
        description: "Guidelines for typography application",
        className: "category-typography"
      },
      {
        id: "spacing-usage",
        name: "Spacing Usage",
        description: "Guidelines for spacing and layout",
        className: "category-spacing"
      },
      {
        id: "imagery-usage",
        name: "Imagery Usage",
        description: "Guidelines for photography and illustrations",
        className: "category-imagery"
      },
      {
        id: "tone-usage",
        name: "Tone Usage",
        description: "Guidelines for brand voice and messaging",
        className: "category-tone"
      }
    ],
    rules: [
      {
        id: "clear-space",
        name: "Clear Space",
        description: "Minimum clear space around logo",
        className: "rule-clear-space"
      },
      {
        id: "color-consistency",
        name: "Color Consistency",
        description: "Use approved brand colors only",
        className: "rule-color-consistency"
      },
      {
        id: "typography-hierarchy",
        name: "Typography Hierarchy",
        description: "Maintain proper typography hierarchy",
        className: "rule-typography-hierarchy"
      }
    ],
    defaultConfig: {
      category: "logo",
      name: "Logo Usage Guidelines",
      description: "Comprehensive guidelines for logo usage",
      rules: [
        "Maintain minimum clear space around logo",
        "Use approved logo variations only",
        "Do not stretch, distort, or modify the logo",
        "Ensure proper contrast and visibility",
        "Scale proportionally within size limits"
      ],
      examples: [
        "Logo in navigation header",
        "Logo on business card",
        "Logo in email signature",
        "Logo on presentation slides"
      ],
      exceptions: [
        "Partner co-branding (requires approval)",
        "Special event materials (requires approval)",
        "Limited edition products (requires approval)"
      ],
      enforcement: "strict",
      documentation: [
        "Brand Guidelines PDF",
        "Logo Usage Manual",
        "Digital Asset Library",
        "Brand Review Process"
      ]
    }
  },
  assets: {
    types: [
      {
        id: "logo",
        name: "Logo Assets",
        description: "All logo variations and formats",
        className: "asset-logo"
      },
      {
        id: "icon",
        name: "Icon Assets",
        description: "Brand icons and symbols",
        className: "asset-icon"
      },
      {
        id: "pattern",
        name: "Pattern Assets",
        description: "Brand patterns and textures",
        className: "asset-pattern"
      },
      {
        id: "illustration",
        name: "Illustration Assets",
        description: "Brand illustrations and graphics",
        className: "asset-illustration"
      },
      {
        id: "photography",
        name: "Photography Assets",
        description: "Brand photography and images",
        className: "asset-photography"
      }
    ],
    formats: [
      {
        id: "svg",
        name: "SVG",
        description: "Scalable vector graphics",
        className: "format-svg"
      },
      {
        id: "png",
        name: "PNG",
        description: "Portable network graphics",
        className: "format-png"
      },
      {
        id: "jpg",
        name: "JPEG",
        description: "Joint photographic experts group",
        className: "format-jpg"
      },
      {
        id: "webp",
        name: "WebP",
        description: "Modern web image format",
        className: "format-webp"
      }
    ],
    defaultConfig: {
      type: "logo",
      name: "Primary Logo Asset",
      description: "Main logo asset for brand applications",
      filePath: "/images/branding/E-AI.Logo.svg",
      formats: ["svg", "png", "webp"],
      sizes: ["60px", "120px", "200px", "400px"],
      usage: [
        "Web applications",
        "Marketing materials",
        "Business communications",
        "Digital assets"
      ],
      restrictions: [
        "Do not modify without approval",
        "Use only approved variations",
        "Maintain brand guidelines",
        "Follow clear space requirements"
      ],
      downloadUrl: "/downloads/brand-assets.zip"
    }
  },
  applications: {
    contexts: [
      {
        id: "web",
        name: "Web Applications",
        description: "Digital applications and websites",
        className: "context-web"
      },
      {
        id: "mobile",
        name: "Mobile Applications",
        description: "Mobile apps and responsive design",
        className: "context-mobile"
      },
      {
        id: "print",
        name: "Print Materials",
        description: "Printed materials and publications",
        className: "context-print"
      },
      {
        id: "social",
        name: "Social Media",
        description: "Social media platforms and content",
        className: "context-social"
      },
      {
        id: "presentation",
        name: "Presentations",
        description: "Presentation materials and slides",
        className: "context-presentation"
      },
      {
        id: "merchandise",
        name: "Merchandise",
        description: "Branded merchandise and products",
        className: "context-merchandise"
      }
    ],
    specifications: [
      {
        id: "web-specs",
        name: "Web Specifications",
        description: "Technical specifications for web use",
        className: "specs-web"
      },
      {
        id: "print-specs",
        name: "Print Specifications",
        description: "Technical specifications for print use",
        className: "specs-print"
      },
      {
        id: "mobile-specs",
        name: "Mobile Specifications",
        description: "Technical specifications for mobile use",
        className: "specs-mobile"
      }
    ],
    defaultConfig: {
      context: "web",
      name: "Web Applications",
      description: "Brand guidelines for web applications",
      requirements: [
        "Responsive design compatibility",
        "Accessibility compliance",
        "Performance optimization",
        "Cross-browser compatibility"
      ],
      specifications: {
        "logo-min-size": "60px",
        "logo-max-size": "400px",
        "color-contrast": "4.5:1 minimum",
        "font-loading": "Optimized font loading",
        "image-formats": "SVG, WebP, PNG"
      },
      examples: [
        "Navigation header logo",
        "Footer branding",
        "Email signature",
        "Social media profiles"
      ],
      bestPractices: [
        "Use vector formats when possible",
        "Optimize images for web",
        "Maintain consistent spacing",
        "Test across different devices"
      ],
      restrictions: [
        "No unauthorized modifications",
        "Follow accessibility guidelines",
        "Maintain brand consistency",
        "Respect clear space requirements"
      ]
    }
  }
}

// Helper functions to get specific configurations
export function getLogoType(typeId: string) {
  return brandingConfig.logos.types.find(t => t.id === typeId)
}

export function getBrandColor(colorId: string) {
  return brandingConfig.colors.types.find(c => c.id === colorId)
}

export function getTypographyType(typeId: string) {
  return brandingConfig.typography.types.find(t => t.id === typeId)
}

export function getBrandVoice(toneId: string) {
  return brandingConfig.voice.tones.find(t => t.id === toneId)
}

export function getBrandGuideline(categoryId: string) {
  return brandingConfig.guidelines.categories.find(c => c.id === categoryId)
}

export function getBrandAsset(typeId: string) {
  return brandingConfig.assets.types.find(t => t.id === typeId)
}

export function getBrandApplication(contextId: string) {
  return brandingConfig.applications.contexts.find(c => c.id === contextId)
}
