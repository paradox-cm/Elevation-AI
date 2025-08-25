// Brand Configuration - Single Source of Truth for Elevation AI Brand Identity

export interface BrandConfig {
  name: string
  tagline: string
  logo: {
    primary: string
    abbreviated: string
    icon: string
    favicon: string
  }
  colors: {
    primary: string
    secondary: string
    accent: string
    muted: string
  }
  typography: {
    fontFamily: string
    fontWeights: {
      normal: string
      medium: string
      semibold: string
      bold: string
    }
  }
  spacing: {
    logoPadding: string
    clearSpace: string
  }
}

export const brandConfig: BrandConfig = {
  name: "Elevation AI",
  tagline: "Elevating design through intelligent systems",
  
  logo: {
    primary: "Elevation AI",
    abbreviated: "EA",
    icon: "mountain-line", // Remix Icon name for the brand icon
    favicon: "/favicon.ico"
  },
  
  colors: {
    primary: "#3B82F6", // Blue-500
    secondary: "#F8FAFC", // Slate-50
    accent: "#FEF3C7", // Amber-100
    muted: "#F1F5F9" // Slate-100
  },
  
  typography: {
    fontFamily: "Helvetica Now",
    fontWeights: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700"
    }
  },
  
  spacing: {
    logoPadding: "0.5rem",
    clearSpace: "1rem"
  }
}

// Helper functions for brand consistency
export const getBrandLogo = (variant: 'primary' | 'abbreviated' | 'icon' = 'primary') => {
  return brandConfig.logo[variant]
}

export const getBrandName = () => {
  return brandConfig.name
}

export const getBrandTagline = () => {
  return brandConfig.tagline
}

export const getBrandColor = (color: keyof BrandConfig['colors']) => {
  return brandConfig.colors[color]
}

// Logo component props for consistent usage
export const getLogoProps = (variant: 'primary' | 'abbreviated' | 'icon' = 'primary') => {
  const baseProps = {
    className: "text-xl font-medium"
  }
  
  switch (variant) {
    case 'abbreviated':
      return {
        ...baseProps,
        children: brandConfig.logo.abbreviated
      }
    case 'icon':
      return {
        name: brandConfig.logo.icon,
        className: "h-6 w-6"
      }
    default:
      return {
        ...baseProps,
        children: brandConfig.logo.primary
      }
  }
}
