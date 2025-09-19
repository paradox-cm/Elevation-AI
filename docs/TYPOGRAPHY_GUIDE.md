# Typography System Guide

## Overview
This document serves as the **source of truth** for all typography usage across the Elevation AI application. All pages must follow these guidelines to maintain consistency and visual hierarchy.

## Font Family
- **Primary**: Helvetica Now (Variable Font)
- **Monospace**: Geist Mono
- **Implementation**: Variable fonts for optimal performance

## Type Scale

### Display Styles (Normal Weight - 400)
Use for hero headlines and major page titles.

| Component | Class | Usage |
|-----------|-------|-------|
| `DisplayLarge` | `text-6xl font-normal leading-normal tracking-normal` | Hero headlines, page titles |
| `DisplayMedium` | `text-5xl font-normal leading-normal tracking-normal` | Section headlines, major headings |
| `DisplaySmall` | `text-4xl font-normal leading-normal tracking-normal` | Subsection headlines |

### Heading Styles (Medium Weight - 500)
Use for content hierarchy and section organization.

| Component | Class | Usage |
|-----------|-------|-------|
| `H1` | `text-3xl font-medium leading-normal tracking-normal` | Page headings, article titles |
| `H2` | `text-2xl font-medium leading-normal tracking-normal` | Section headings, card titles |
| `H3` | `text-xl font-medium leading-normal tracking-normal` | Subsection headings, form labels |
| `H4` | `text-lg font-medium leading-normal tracking-normal` | Minor headings, list titles |

### Body Styles (Normal Weight - 400)
Use for main content and readable text.

| Component | Class | Usage |
|-----------|-------|-------|
| `BodyLarge` | `text-lg font-normal leading-relaxed` | Lead paragraphs, important content |
| `P` | `text-base font-normal leading-relaxed` | Main content, paragraphs |
| `BodySmall` | `text-sm font-normal leading-relaxed` | Secondary content, captions |
| `Caption` | `text-xs font-normal leading-relaxed` | Labels, metadata, fine print |

## Typography Spacing Rules

### Line Height & Letter Spacing
- **Line Height**: All text uses `leading-normal` (1.5x) for optimal readability
- **Letter Spacing**: All text uses `tracking-normal` (0) - no negative or positive tracking
- **No Tight Leading**: Removed `leading-tight` and `leading-snug` for better readability
- **Consistent Spacing**: Uniform spacing across all text styles for visual consistency

## Usage Guidelines

### ✅ DO
- Use semantic HTML elements (`h1`, `h2`, `h3`, `p`, etc.)
- Maintain consistent visual hierarchy
- Use appropriate line lengths (45-75 characters)
- Respect user font size preferences
- Ensure sufficient contrast ratios (WCAG AA: 4.5:1)
- Use normal line height and letter spacing for optimal readability

### ❌ DON'T
- Mix multiple font weights on the same page
- Use inline styles for typography
- Override typography classes with custom styles
- Use non-semantic elements for headings
- Use tight leading or negative letter spacing
- Apply custom tracking or line-height overrides

## Implementation Examples

### Page Headers
```tsx
import { DisplayMedium, BodyLarge } from "@/components/ui/typography"

<DisplayMedium>Page Title</DisplayMedium>
<BodyLarge className="text-muted-foreground">
  Page description and context
</BodyLarge>
```

### Content Sections
```tsx
import { H2, H3, P, BodySmall } from "@/components/ui/typography"

<H2>Section Heading</H2>
<P>Main content paragraph with proper line height and spacing.</P>
<H3>Subsection</H3>
<BodySmall className="text-muted-foreground">
  Supporting information or metadata
</BodySmall>
```

### Navigation and UI Elements
```tsx
import { H1, Caption } from "@/components/ui/typography"

<H1 className="text-xl">Navigation Title</H1>
<Caption>Status or metadata</Caption>
```

## File Updates Required

### ✅ Updated Files
- `src/components/ui/typography.tsx` - Core typography components
- `src/app/design-system/typography/page.tsx` - Typography documentation
- `src/app/design-system/page.tsx` - Design system overview
- `src/app/page.tsx` - Home page
- `src/app/design-system/components/page.tsx` - Components page
- `src/app/design-system/colors/page.tsx` - Colors page
- `src/app/design-system/grid/page.tsx` - Grid page
- `src/app/design-system/spacing/page.tsx` - Spacing page
- `src/app/design-system/icons/page.tsx` - Icons page

### 🔄 Future Pages
All new pages must:
1. Import typography components from `@/components/ui/typography`
2. Use semantic typography components instead of raw HTML
3. Follow the established hierarchy patterns
4. Maintain consistent spacing and line heights

## Accessibility Standards
- **Contrast Ratio**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Font Size**: Minimum 16px for body text
- **Line Height**: 1.5x for optimal readability
- **Semantic HTML**: Proper heading hierarchy (h1 → h2 → h3)
- **User Preferences**: Respect user font size and zoom settings

## Performance Considerations
- Variable fonts for smooth weight transitions
- Font display: swap for better loading performance
- Optimized font subsets (Latin only)
- Preloaded critical fonts

## Maintenance
- Review this guide when adding new pages
- Ensure all typography follows these patterns
- Update component library when adding new text styles
- Test accessibility compliance regularly
