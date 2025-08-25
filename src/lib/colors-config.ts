// Colors Configuration - Single Source of Truth
// This file defines all color settings used throughout the application
// Changes here will automatically propagate to all components and pages

export interface ColorShade {
  shade: number
  hex: string
  hsl?: string
  rgb?: string
}

export interface ColorPalette {
  name: string
  color: string
  hex: string
  description?: string
  usage?: string
  shades: ColorShade[]
  isPrimary?: boolean
  isBrand?: boolean
}

export interface SemanticColor {
  name: string
  class: string
  description: string
  usage: string
  lightValue: string
  darkValue: string
}

export interface ColorUsage {
  context: string
  description: string
  examples: string[]
}

// Semantic Colors Configuration
export const semanticColors: SemanticColor[] = [
  {
    name: "Background",
    class: "bg-background",
    description: "Primary background color for the application",
    usage: "Main page backgrounds, card backgrounds",
    lightValue: "#ffffff",
    darkValue: "#09090b"
  },
  {
    name: "Foreground",
    class: "text-foreground",
    description: "Primary text color",
    usage: "Main text content, headings",
    lightValue: "#09090b",
    darkValue: "#fafafa"
  },
  {
    name: "Primary",
    class: "bg-primary",
    description: "Primary brand color for actions and highlights",
    usage: "Primary buttons, links, brand elements",
    lightValue: "#0e62fd",
    darkValue: "#479cff"
  },
  {
    name: "Primary Foreground",
    class: "text-primary-foreground",
    description: "Text color on primary backgrounds",
    usage: "Text on primary buttons, primary backgrounds",
    lightValue: "#ffffff",
    darkValue: "#09090b"
  },
  {
    name: "Secondary",
    class: "bg-secondary",
    description: "Secondary color for subtle elements",
    usage: "Secondary buttons, subtle backgrounds",
    lightValue: "#f4f4f5",
    darkValue: "#27272a"
  },
  {
    name: "Secondary Foreground",
    class: "text-secondary-foreground",
    description: "Text color on secondary backgrounds",
    usage: "Text on secondary buttons, secondary backgrounds",
    lightValue: "#18181b",
    darkValue: "#fafafa"
  },
  {
    name: "Muted",
    class: "bg-muted",
    description: "Muted background for subtle content",
    usage: "Subtle backgrounds, disabled states",
    lightValue: "#f4f4f5",
    darkValue: "#27272a"
  },
  {
    name: "Muted Foreground",
    class: "text-muted-foreground",
    description: "Text color for muted content",
    usage: "Secondary text, captions, metadata",
    lightValue: "#71717a",
    darkValue: "#a1a1aa"
  },
  {
    name: "Accent",
    class: "bg-accent",
    description: "Accent color for highlights",
    usage: "Hover states, focus indicators",
    lightValue: "#f4f4f5",
    darkValue: "#27272a"
  },
  {
    name: "Accent Foreground",
    class: "text-accent-foreground",
    description: "Text color on accent backgrounds",
    usage: "Text on accent backgrounds, hover states",
    lightValue: "#18181b",
    darkValue: "#fafafa"
  },
  {
    name: "Destructive",
    class: "bg-destructive",
    description: "Color for destructive actions",
    usage: "Error states, delete buttons, warnings",
    lightValue: "#df3523",
    darkValue: "#c93020"
  },
  {
    name: "Destructive Foreground",
    class: "text-destructive-foreground",
    description: "Text color on destructive backgrounds",
    usage: "Text on error states, delete buttons",
    lightValue: "#ffffff",
    darkValue: "#ffffff"
  },
  {
    name: "Border",
    class: "border-border",
    description: "Border color for containers and dividers",
    usage: "Card borders, input borders, dividers",
    lightValue: "#e4e4e7",
    darkValue: "#3f3f46"
  },
  {
    name: "Input",
    class: "bg-input",
    description: "Background color for input fields",
    usage: "Text inputs, form fields",
    lightValue: "#ffffff",
    darkValue: "#18181b"
  },
  {
    name: "Ring",
    class: "ring-ring",
    description: "Focus ring color for interactive elements",
    usage: "Focus indicators, active states",
    lightValue: "#0e62fd",
    darkValue: "#479cff"
  }
]

// Custom Color Palettes Configuration
export const colorPalettes: ColorPalette[] = [
  {
    name: "Elevation",
    color: "elevation",
    hex: "#0e62fd",
    description: "Primary brand color - the foundation of our design system",
    usage: "Primary actions, brand elements, main CTAs",
    isPrimary: true,
    isBrand: true,
    shades: [
      { shade: 50, hex: "#f5f9ff" },
      { shade: 100, hex: "#e0efff" },
      { shade: 200, hex: "#badbff" },
      { shade: 300, hex: "#94c6ff" },
      { shade: 400, hex: "#479cff" },
      { shade: 500, hex: "#0e62fd" },
      { shade: 600, hex: "#0d58e4" },
      { shade: 700, hex: "#0a49bd" },
      { shade: 800, hex: "#083996" },
      { shade: 900, hex: "#052864" }
    ]
  },
  {
    name: "Periwinkle",
    color: "periwinkle",
    hex: "#7458f4",
    description: "Secondary brand color for variety and depth",
    usage: "Secondary actions, highlights, accents",
    shades: [
      { shade: 50, hex: "#f8f7fe" },
      { shade: 100, hex: "#f1eefe" },
      { shade: 200, hex: "#dcd5fc" },
      { shade: 300, hex: "#c7bcfb" },
      { shade: 400, hex: "#9e8af7" },
      { shade: 500, hex: "#7458f4" },
      { shade: 600, hex: "#684fdc" },
      { shade: 700, hex: "#5742b7" },
      { shade: 800, hex: "#463592" },
      { shade: 900, hex: "#2e2362" }
    ]
  },
  {
    name: "Green",
    color: "green",
    hex: "#12c55d",
    description: "Success and positive action color",
    usage: "Success states, positive feedback, confirmations",
    shades: [
      { shade: 50, hex: "#f6fdf9" },
      { shade: 100, hex: "#e3faee" },
      { shade: 200, hex: "#baf2d5" },
      { shade: 300, hex: "#91eabb" },
      { shade: 400, hex: "#48db88" },
      { shade: 500, hex: "#12c55d" },
      { shade: 600, hex: "#10b055" },
      { shade: 700, hex: "#0d9147" },
      { shade: 800, hex: "#0a7239" },
      { shade: 900, hex: "#064b26" }
    ]
  },
  {
    name: "Red",
    color: "red",
    hex: "#df3523",
    description: "Error and destructive action color",
    usage: "Error states, destructive actions, warnings",
    shades: [
      { shade: 50, hex: "#fdf5f4" },
      { shade: 100, hex: "#fcebe9" },
      { shade: 200, hex: "#f7ccc8" },
      { shade: 300, hex: "#f2aea7" },
      { shade: 400, hex: "#e97265" },
      { shade: 500, hex: "#df3523" },
      { shade: 600, hex: "#c93020" },
      { shade: 700, hex: "#a7281a" },
      { shade: 800, hex: "#862015" },
      { shade: 900, hex: "#59150e" }
    ]
  },
  {
    name: "Gold",
    color: "gold",
    hex: "#ebbc48",
    description: "Warning and attention color",
    usage: "Warning states, attention-grabbing elements",
    shades: [
      { shade: 50, hex: "#fefcf6" },
      { shade: 100, hex: "#fdf8ed" },
      { shade: 200, hex: "#faeed1" },
      { shade: 300, hex: "#f7e4b6" },
      { shade: 400, hex: "#f1d07f" },
      { shade: 500, hex: "#ebbc48" },
      { shade: 600, hex: "#d3a943" },
      { shade: 700, hex: "#b38f38" },
      { shade: 800, hex: "#92752e" },
      { shade: 900, hex: "#604e1f" }
    ]
  },
  {
    name: "Magenta",
    color: "magenta",
    hex: "#e433c3",
    description: "Creative and vibrant accent color",
    usage: "Creative elements, highlights, special features",
    shades: [
      { shade: 50, hex: "#fef6fb" },
      { shade: 100, hex: "#fceaf6" },
      { shade: 200, hex: "#f8ccee" },
      { shade: 300, hex: "#f4ade5" },
      { shade: 400, hex: "#ec70d4" },
      { shade: 500, hex: "#e433c3" },
      { shade: 600, hex: "#cd2eaf" },
      { shade: 700, hex: "#aa2691" },
      { shade: 800, hex: "#861f73" },
      { shade: 900, hex: "#59144d" }
    ]
  },
  {
    name: "Cyan",
    color: "cyan",
    hex: "#5bc8f7",
    description: "Information and data visualization color",
    usage: "Info states, data visualizations, charts",
    shades: [
      { shade: 50, hex: "#f7fcff" },
      { shade: 100, hex: "#effafe" },
      { shade: 200, hex: "#d6f1fd" },
      { shade: 300, hex: "#bde9fc" },
      { shade: 400, hex: "#8cd8f9" },
      { shade: 500, hex: "#5bc8f7" },
      { shade: 600, hex: "#52b4de" },
      { shade: 700, hex: "#4496b9" },
      { shade: 800, hex: "#377894" },
      { shade: 900, hex: "#245063" }
    ]
  },
  {
    name: "Zinc",
    color: "zinc",
    hex: "#71717a",
    description: "Neutral grays for text and subtle elements",
    usage: "Text, borders, subtle backgrounds",
    shades: [
      { shade: 50, hex: "#fafafa" },
      { shade: 100, hex: "#f4f4f5" },
      { shade: 200, hex: "#e4e4e7" },
      { shade: 300, hex: "#d4d4d8" },
      { shade: 400, hex: "#a1a1aa" },
      { shade: 500, hex: "#71717a" },
      { shade: 600, hex: "#52525b" },
      { shade: 700, hex: "#3f3f46" },
      { shade: 800, hex: "#27272a" },
      { shade: 900, hex: "#18181b" }
    ]
  }
]

// Color Usage Guidelines
export const colorUsage: ColorUsage[] = [
  {
    context: "Buttons & Interactive Elements",
    description: "How to use colors for interactive elements",
    examples: [
      "Primary buttons use Elevation 500",
      "Secondary buttons use Periwinkle 500",
      "Success actions use Green 500",
      "Destructive actions use Red 500",
      "Warning states use Gold 500"
    ]
  },
  {
    context: "Background & Surface Colors",
    description: "How to use colors for backgrounds and surfaces",
    examples: [
      "Main backgrounds use semantic background colors",
      "Card backgrounds use semantic card colors",
      "Subtle backgrounds use muted colors",
      "Accent backgrounds use light shades (50-100)",
      "Dark backgrounds use dark shades (800-900)"
    ]
  },
  {
    context: "Text & Typography",
    description: "How to use colors for text content",
    examples: [
      "Primary text uses semantic foreground colors",
      "Secondary text uses muted foreground colors",
      "Links use primary brand colors",
      "Error text uses destructive colors",
      "Success text uses green colors"
    ]
  },
  {
    context: "Borders & Dividers",
    description: "How to use colors for borders and dividers",
    examples: [
      "Main borders use semantic border colors",
      "Input borders use semantic input colors",
      "Focus rings use semantic ring colors",
      "Subtle dividers use muted colors",
      "Accent borders use brand colors"
    ]
  }
]

// Color Principles
export const colorPrinciples = {
  accessibility: {
    title: "Accessibility",
    description: "Ensure sufficient contrast ratios for all color combinations",
    icon: "eye-line"
  },
  consistency: {
    title: "Consistency",
    description: "Use semantic colors consistently across the application",
    icon: "palette-line"
  },
  hierarchy: {
    title: "Visual Hierarchy",
    description: "Use color to establish clear visual hierarchy and importance",
    icon: "stack-line"
  }
}

// Helper functions
export function getColorPaletteByName(name: string): ColorPalette | undefined {
  return colorPalettes.find(palette => palette.name.toLowerCase() === name.toLowerCase())
}

export function getColorPaletteByColor(color: string): ColorPalette | undefined {
  return colorPalettes.find(palette => palette.color === color)
}

export function getSemanticColorByName(name: string): SemanticColor | undefined {
  return semanticColors.find(color => color.name.toLowerCase() === name.toLowerCase())
}

export function getSemanticColorByClass(className: string): SemanticColor | undefined {
  return semanticColors.find(color => color.class === className)
}

export function getPrimaryColor(): ColorPalette | undefined {
  return colorPalettes.find(palette => palette.isPrimary)
}

export function getBrandColors(): ColorPalette[] {
  return colorPalettes.filter(palette => palette.isBrand)
}
