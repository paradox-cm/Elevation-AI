// Content Components Configuration
// Defines all content layouts, media components, and interactive content patterns

export interface ArticleLayoutConfig {
  variant: "default" | "featured" | "minimal" | "magazine" | "blog"
  showAuthor: boolean
  showDate: boolean
  showReadTime: boolean
  showTags: boolean
  showSocialShare: boolean
  maxTags: number
  authorAvatarSize: "sm" | "md" | "lg"
  metadataPosition: "top" | "bottom" | "sidebar"
}

export interface MediaCardConfig {
  variant: "default" | "overlay" | "minimal" | "featured" | "gallery"
  aspectRatio: "square" | "16:9" | "4:3" | "3:2" | "auto"
  showOverlay: boolean
  showActions: boolean
  maxActions: number
  imageFit: "cover" | "contain" | "fill"
  borderRadius: "none" | "sm" | "md" | "lg" | "xl"
  hoverEffect: "scale" | "glow" | "shadow" | "none"
}

export interface GalleryConfig {
  variant: "grid" | "masonry" | "carousel" | "lightbox"
  columns: number
  gap: "sm" | "md" | "lg" | "xl"
  showCaptions: boolean
  showTags: boolean
  showOverlay: boolean
  pagination: boolean
  itemsPerPage: number
  responsive: boolean
}

export interface TimelineConfig {
  variant: "default" | "vertical" | "horizontal" | "compact" | "detailed"
  showIcons: boolean
  showDates: boolean
  showDescriptions: boolean
  iconSize: "sm" | "md" | "lg"
  lineStyle: "solid" | "dashed" | "dotted"
  statusColors: boolean
  clickable: boolean
}

export interface FAQConfig {
  variant: "default" | "accordion" | "tabs" | "cards"
  showIcons: boolean
  expandable: boolean
  defaultExpanded: boolean
  maxExpanded: number
  animation: "slide" | "fade" | "none"
  searchable: boolean
  categorized: boolean
}

export interface ContentBlockConfig {
  variant: "default" | "highlighted" | "bordered" | "card" | "minimal"
  padding: "sm" | "md" | "lg" | "xl"
  margin: "none" | "sm" | "md" | "lg" | "xl"
  showTitle: boolean
  titlePosition: "top" | "left" | "center"
  background: "none" | "muted" | "primary" | "secondary"
  borderStyle: "none" | "solid" | "dashed" | "dotted"
}

export interface QuoteConfig {
  variant: "default" | "large" | "highlighted" | "minimal" | "card"
  showAuthor: boolean
  showSource: boolean
  showIcon: boolean
  iconPosition: "left" | "top" | "right"
  alignment: "left" | "center" | "right"
  fontSize: "sm" | "md" | "lg" | "xl"
  maxWidth: "sm" | "md" | "lg" | "xl" | "full"
}

export interface SocialShareConfig {
  variant: "default" | "minimal" | "buttons" | "icons"
  platforms: Array<"twitter" | "facebook" | "linkedin" | "email" | "copy">
  showLabels: boolean
  showCounts: boolean
  position: "top" | "bottom" | "sidebar" | "floating"
  size: "sm" | "md" | "lg"
  colorScheme: "default" | "branded" | "monochrome"
}

export interface ContentComponentsConfig {
  articleLayouts: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      layoutClass: string
    }>
    authorAvatarSizes: Array<{
      id: string
      name: string
      width: number
      height: number
      className: string
    }>
    defaultConfig: ArticleLayoutConfig
  }
  mediaCards: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      overlayClass: string
    }>
    aspectRatios: Array<{
      id: string
      name: string
      ratio: string
      className: string
    }>
    defaultConfig: MediaCardConfig
  }
  galleries: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      gridClass: string
    }>
    gaps: Array<{
      id: string
      name: string
      className: string
      pixels: number
    }>
    defaultConfig: GalleryConfig
  }
  timelines: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      itemClass: string
    }>
    lineStyles: Array<{
      id: string
      name: string
      className: string
      description: string
    }>
    defaultConfig: TimelineConfig
  }
  faqs: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      itemClass: string
    }>
    animations: Array<{
      id: string
      name: string
      className: string
      duration: string
    }>
    defaultConfig: FAQConfig
  }
  contentBlocks: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      backgroundClass: string
    }>
    paddings: Array<{
      id: string
      name: string
      className: string
      pixels: number
    }>
    defaultConfig: ContentBlockConfig
  }
  quotes: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      iconClass: string
    }>
    alignments: Array<{
      id: string
      name: string
      className: string
      description: string
    }>
    defaultConfig: QuoteConfig
  }
  socialShare: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      buttonClass: string
    }>
    platforms: Array<{
      id: string
      name: string
      icon: string
      color: string
      url: string
    }>
    defaultConfig: SocialShareConfig
  }
}

export const contentComponentsConfig: ContentComponentsConfig = {
  articleLayouts: {
    variants: [
      {
        id: "default",
        name: "Default Article",
        description: "Standard article layout with metadata and social sharing",
        className: "max-w-4xl mx-auto",
        layoutClass: "space-y-8"
      },
      {
        id: "featured",
        name: "Featured Article",
        description: "Prominent article layout with large hero image",
        className: "max-w-6xl mx-auto",
        layoutClass: "space-y-12"
      },
      {
        id: "minimal",
        name: "Minimal Article",
        description: "Clean, minimal article layout",
        className: "max-w-3xl mx-auto",
        layoutClass: "space-y-6"
      },
      {
        id: "magazine",
        name: "Magazine Layout",
        description: "Multi-column magazine-style layout",
        className: "max-w-7xl mx-auto",
        layoutClass: "grid grid-cols-1 lg:grid-cols-3 gap-8"
      },
      {
        id: "blog",
        name: "Blog Layout",
        description: "Blog-style layout with sidebar",
        className: "max-w-5xl mx-auto",
        layoutClass: "grid grid-cols-1 lg:grid-cols-4 gap-8"
      }
    ],
    authorAvatarSizes: [
      {
        id: "sm",
        name: "Small",
        width: 32,
        height: 32,
        className: "w-8 h-8"
      },
      {
        id: "md",
        name: "Medium",
        width: 40,
        height: 40,
        className: "w-10 h-10"
      },
      {
        id: "lg",
        name: "Large",
        width: 48,
        height: 48,
        className: "w-12 h-12"
      }
    ],
    defaultConfig: {
      variant: "default",
      showAuthor: true,
      showDate: true,
      showReadTime: true,
      showTags: true,
      showSocialShare: true,
      maxTags: 5,
      authorAvatarSize: "md",
      metadataPosition: "top"
    }
  },
  mediaCards: {
    variants: [
      {
        id: "default",
        name: "Default Card",
        description: "Standard media card with title and description",
        className: "bg-background border rounded-lg overflow-hidden",
        overlayClass: "absolute inset-0 bg-black/50"
      },
      {
        id: "overlay",
        name: "Overlay Card",
        description: "Card with overlay text and actions",
        className: "relative bg-background border rounded-lg overflow-hidden",
        overlayClass: "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
      },
      {
        id: "minimal",
        name: "Minimal Card",
        description: "Clean, minimal media card",
        className: "bg-background rounded-lg overflow-hidden",
        overlayClass: "absolute inset-0 bg-black/30"
      },
      {
        id: "featured",
        name: "Featured Card",
        description: "Large featured media card",
        className: "bg-background border-2 border-primary/20 rounded-xl overflow-hidden",
        overlayClass: "absolute inset-0 bg-primary/10"
      },
      {
        id: "gallery",
        name: "Gallery Card",
        description: "Compact card for gallery layouts",
        className: "bg-background border rounded-md overflow-hidden",
        overlayClass: "absolute inset-0 bg-black/40"
      }
    ],
    aspectRatios: [
      {
        id: "square",
        name: "Square",
        ratio: "1:1",
        className: "aspect-square"
      },
      {
        id: "16:9",
        name: "Widescreen",
        ratio: "16:9",
        className: "aspect-video"
      },
      {
        id: "4:3",
        name: "Standard",
        ratio: "4:3",
        className: "aspect-[4/3]"
      },
      {
        id: "3:2",
        name: "Photo",
        ratio: "3:2",
        className: "aspect-[3/2]"
      },
      {
        id: "auto",
        name: "Auto",
        ratio: "Auto",
        className: "h-auto"
      }
    ],
    defaultConfig: {
      variant: "default",
      aspectRatio: "16:9",
      showOverlay: false,
      showActions: true,
      maxActions: 3,
      imageFit: "cover",
      borderRadius: "md",
      hoverEffect: "scale"
    }
  },
  galleries: {
    variants: [
      {
        id: "grid",
        name: "Grid Gallery",
        description: "Uniform grid layout for images",
        className: "grid gap-4",
        gridClass: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      },
      {
        id: "masonry",
        name: "Masonry Gallery",
        description: "Pinterest-style masonry layout",
        className: "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4",
        gridClass: "break-inside-avoid mb-4"
      },
      {
        id: "carousel",
        name: "Carousel Gallery",
        description: "Horizontal scrolling carousel",
        className: "flex overflow-x-auto gap-4 pb-4",
        gridClass: "flex-shrink-0"
      },
      {
        id: "lightbox",
        name: "Lightbox Gallery",
        description: "Gallery with lightbox functionality",
        className: "grid gap-4 cursor-pointer",
        gridClass: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      }
    ],
    gaps: [
      {
        id: "sm",
        name: "Small Gap",
        className: "gap-2",
        pixels: 8
      },
      {
        id: "md",
        name: "Medium Gap",
        className: "gap-4",
        pixels: 16
      },
      {
        id: "lg",
        name: "Large Gap",
        className: "gap-6",
        pixels: 24
      },
      {
        id: "xl",
        name: "Extra Large Gap",
        className: "gap-8",
        pixels: 32
      }
    ],
    defaultConfig: {
      variant: "grid",
      columns: 3,
      gap: "md",
      showCaptions: true,
      showTags: true,
      showOverlay: true,
      pagination: false,
      itemsPerPage: 12,
      responsive: true
    }
  },
  timelines: {
    variants: [
      {
        id: "default",
        name: "Default Timeline",
        description: "Standard vertical timeline",
        className: "space-y-6",
        itemClass: "flex items-start space-x-4"
      },
      {
        id: "vertical",
        name: "Vertical Timeline",
        description: "Vertical timeline with connecting lines",
        className: "relative space-y-6",
        itemClass: "flex items-start space-x-4 relative"
      },
      {
        id: "horizontal",
        name: "Horizontal Timeline",
        description: "Horizontal timeline layout",
        className: "flex space-x-6 overflow-x-auto pb-4",
        itemClass: "flex-shrink-0 w-64"
      },
      {
        id: "compact",
        name: "Compact Timeline",
        description: "Compact timeline for dense information",
        className: "space-y-3",
        itemClass: "flex items-center space-x-3"
      },
      {
        id: "detailed",
        name: "Detailed Timeline",
        description: "Detailed timeline with rich content",
        className: "space-y-8",
        itemClass: "flex items-start space-x-6"
      }
    ],
    lineStyles: [
      {
        id: "solid",
        name: "Solid Line",
        className: "border-solid",
        description: "Continuous solid line"
      },
      {
        id: "dashed",
        name: "Dashed Line",
        className: "border-dashed",
        description: "Dashed line pattern"
      },
      {
        id: "dotted",
        name: "Dotted Line",
        className: "border-dotted",
        description: "Dotted line pattern"
      }
    ],
    defaultConfig: {
      variant: "default",
      showIcons: true,
      showDates: true,
      showDescriptions: true,
      iconSize: "md",
      lineStyle: "solid",
      statusColors: true,
      clickable: false
    }
  },
  faqs: {
    variants: [
      {
        id: "default",
        name: "Default FAQ",
        description: "Standard FAQ with expandable answers",
        className: "space-y-4",
        itemClass: "border rounded-lg"
      },
      {
        id: "accordion",
        name: "Accordion FAQ",
        description: "Accordion-style FAQ with smooth animations",
        className: "space-y-2",
        itemClass: "border-b"
      },
      {
        id: "tabs",
        name: "Tabs FAQ",
        description: "FAQ organized in tabs by category",
        className: "space-y-6",
        itemClass: "space-y-4"
      },
      {
        id: "cards",
        name: "Cards FAQ",
        description: "FAQ displayed as individual cards",
        className: "grid gap-4",
        itemClass: "bg-card border rounded-lg p-4"
      }
    ],
    animations: [
      {
        id: "slide",
        name: "Slide Animation",
        className: "transition-all duration-300 ease-in-out",
        duration: "300ms"
      },
      {
        id: "fade",
        name: "Fade Animation",
        className: "transition-opacity duration-200 ease-in-out",
        duration: "200ms"
      },
      {
        id: "none",
        name: "No Animation",
        className: "",
        duration: "0ms"
      }
    ],
    defaultConfig: {
      variant: "default",
      showIcons: true,
      expandable: true,
      defaultExpanded: false,
      maxExpanded: 1,
      animation: "slide",
      searchable: false,
      categorized: false
    }
  },
  contentBlocks: {
    variants: [
      {
        id: "default",
        name: "Default Block",
        description: "Standard content block",
        className: "space-y-4",
        backgroundClass: "bg-transparent"
      },
      {
        id: "highlighted",
        name: "Highlighted Block",
        description: "Content block with highlighted background",
        className: "space-y-4 bg-primary/5 border-l-4 border-primary p-4",
        backgroundClass: "bg-primary/5"
      },
      {
        id: "bordered",
        name: "Bordered Block",
        description: "Content block with border",
        className: "space-y-4 border rounded-lg p-4",
        backgroundClass: "bg-transparent"
      },
      {
        id: "card",
        name: "Card Block",
        description: "Content block styled as a card",
        className: "space-y-4 bg-card border rounded-lg p-6 shadow-sm",
        backgroundClass: "bg-card"
      },
      {
        id: "minimal",
        name: "Minimal Block",
        description: "Minimal content block",
        className: "space-y-2",
        backgroundClass: "bg-transparent"
      }
    ],
    paddings: [
      {
        id: "sm",
        name: "Small Padding",
        className: "p-2",
        pixels: 8
      },
      {
        id: "md",
        name: "Medium Padding",
        className: "p-4",
        pixels: 16
      },
      {
        id: "lg",
        name: "Large Padding",
        className: "p-6",
        pixels: 24
      },
      {
        id: "xl",
        name: "Extra Large Padding",
        className: "p-8",
        pixels: 32
      }
    ],
    defaultConfig: {
      variant: "default",
      padding: "md",
      margin: "none",
      showTitle: true,
      titlePosition: "top",
      background: "none",
      borderStyle: "none"
    }
  },
  quotes: {
    variants: [
      {
        id: "default",
        name: "Default Quote",
        description: "Standard quote with author and source",
        className: "border-l-4 border-primary pl-4 space-y-2",
        iconClass: "text-primary"
      },
      {
        id: "large",
        name: "Large Quote",
        description: "Large, prominent quote",
        className: "text-2xl border-l-4 border-primary pl-6 space-y-4",
        iconClass: "text-primary text-4xl"
      },
      {
        id: "highlighted",
        name: "Highlighted Quote",
        description: "Quote with highlighted background",
        className: "bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-3",
        iconClass: "text-primary"
      },
      {
        id: "minimal",
        name: "Minimal Quote",
        description: "Clean, minimal quote",
        className: "space-y-2 italic",
        iconClass: "text-muted-foreground"
      },
      {
        id: "card",
        name: "Card Quote",
        description: "Quote styled as a card",
        className: "bg-card border rounded-lg p-6 shadow-sm space-y-3",
        iconClass: "text-primary"
      }
    ],
    alignments: [
      {
        id: "left",
        name: "Left Aligned",
        className: "text-left",
        description: "Left-aligned quote"
      },
      {
        id: "center",
        name: "Center Aligned",
        className: "text-center",
        description: "Center-aligned quote"
      },
      {
        id: "right",
        name: "Right Aligned",
        className: "text-right",
        description: "Right-aligned quote"
      }
    ],
    defaultConfig: {
      variant: "default",
      showAuthor: true,
      showSource: true,
      showIcon: true,
      iconPosition: "left",
      alignment: "left",
      fontSize: "md",
      maxWidth: "lg"
    }
  },
  socialShare: {
    variants: [
      {
        id: "default",
        name: "Default Share",
        description: "Standard social sharing buttons",
        className: "flex items-center space-x-2",
        buttonClass: "flex items-center space-x-2 px-4 py-2 rounded-lg"
      },
      {
        id: "minimal",
        name: "Minimal Share",
        description: "Minimal social sharing icons",
        className: "flex items-center space-x-1",
        buttonClass: "p-2 rounded-full"
      },
      {
        id: "buttons",
        name: "Button Share",
        description: "Full-width button sharing",
        className: "grid grid-cols-2 gap-2",
        buttonClass: "flex items-center justify-center space-x-2 px-4 py-3 rounded-lg"
      },
      {
        id: "icons",
        name: "Icon Share",
        description: "Icon-only social sharing",
        className: "flex items-center space-x-3",
        buttonClass: "p-3 rounded-full"
      }
    ],
    platforms: [
      {
        id: "twitter",
        name: "Twitter",
        icon: "twitter-line",
        color: "#1DA1F2",
        url: "https://twitter.com/intent/tweet"
      },
      {
        id: "facebook",
        name: "Facebook",
        icon: "facebook-line",
        color: "#1877F2",
        url: "https://www.facebook.com/sharer/sharer.php"
      },
      {
        id: "linkedin",
        name: "LinkedIn",
        icon: "linkedin-line",
        color: "#0A66C2",
        url: "https://www.linkedin.com/sharing/share-offsite"
      },
      {
        id: "email",
        name: "Email",
        icon: "mail-line",
        color: "#EA4335",
        url: "mailto:"
      },
      {
        id: "copy",
        name: "Copy Link",
        icon: "link-line",
        color: "#6B7280",
        url: ""
      }
    ],
    defaultConfig: {
      variant: "default",
      platforms: ["twitter", "facebook", "linkedin", "email", "copy"],
      showLabels: true,
      showCounts: false,
      position: "bottom",
      size: "md",
      colorScheme: "default"
    }
  }
}

// Helper functions to get specific configurations
export function getArticleLayoutVariant(variantId: string) {
  return contentComponentsConfig.articleLayouts.variants.find(v => v.id === variantId)
}

export function getMediaCardVariant(variantId: string) {
  return contentComponentsConfig.mediaCards.variants.find(v => v.id === variantId)
}

export function getGalleryVariant(variantId: string) {
  return contentComponentsConfig.galleries.variants.find(v => v.id === variantId)
}

export function getTimelineVariant(variantId: string) {
  return contentComponentsConfig.timelines.variants.find(v => v.id === variantId)
}

export function getFAQVariant(variantId: string) {
  return contentComponentsConfig.faqs.variants.find(v => v.id === variantId)
}

export function getContentBlockVariant(variantId: string) {
  return contentComponentsConfig.contentBlocks.variants.find(v => v.id === variantId)
}

export function getQuoteVariant(variantId: string) {
  return contentComponentsConfig.quotes.variants.find(v => v.id === variantId)
}

export function getSocialShareVariant(variantId: string) {
  return contentComponentsConfig.socialShare.variants.find(v => v.id === variantId)
}

export function getSocialSharePlatform(platformId: string) {
  return contentComponentsConfig.socialShare.platforms.find(p => p.id === platformId)
}
