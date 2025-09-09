# Design System Source of Truth Guide

## 🎯 **Overview**

This document explains how the `/design-system` page serves as the **single source of truth** for all UI components, colors, typography, and design tokens used throughout the application.

## 📐 **Page Layout Standards**

### **Hero Section Pattern**
For all `/website` pages, use this pattern to ensure balanced spacing:

```tsx
{/* Hero Section - Perfect Centering */}
<div className="w-full flex items-center justify-center min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]">
  <div className="text-center space-y-1">
    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
      Page Title
    </h1>
    <p className="text-base sm:text-lg text-muted-foreground max-w-[42rem] mx-auto">
      Page description
    </p>
  </div>
</div>

{/* Content Sections - Reduced Padding */}
<Section paddingY="sm">
  {/* Page content */}
</Section>
```

**Key Points:**
- Use flexbox centering for hero sections (not padding-based approaches)
- Use `Section paddingY="sm"` for content sections (not `paddingY="lg"`)
- This prevents the hero from appearing off-center due to excessive content padding

### **Content Width Standards**
For consistent visual alignment across page sections:

```tsx
{/* Standardized Content Width */}
<Section paddingY="sm">
  <div className="max-w-4xl mx-auto space-y-6">
    {/* Section content */}
  </div>
</Section>
```

**Width Guidelines:**
- Use `max-w-4xl` for most content sections to maintain consistency
- Avoid mixing different max-width values (e.g., `max-w-5xl` vs `max-w-4xl`) on the same page
- This ensures visual alignment and prevents jarring width differences between sections

### **Two-Tier Responsive System**
Our sophisticated approach to responsive design that optimizes for both container growth and content readability:

#### **Tier 1: Container Level**
All pages use `Container size="2xl"` with progressive max-width growth:
- **LG (1024px+)**: `max-w-[1400px]`
- **XL (1600px+)**: `max-w-[1920px]` 
- **2XL (2560px+)**: `max-w-[2560px]`

#### **Tier 2: Content Level**
Content sections adapt their width based on content type:

**Full Width Content** (no max-width constraints):
- Home page hero sections
- Product showcases
- Team grids and profiles
- Visual galleries
- Marketing content

**Constrained Content** (`max-w-4xl mx-auto`):
- FAQ pages
- Technical documentation
- Investment information
- Partnership details
- Developer resources

#### **Implementation Pattern**
```tsx
<Container size="2xl">
  {/* Tier 1: Container grows with screen size */}
  
  <Section>
    <div className="max-w-4xl mx-auto">
      {/* Tier 2: Content optimized for readability */}
      <p>Text content here...</p>
    </div>
  </Section>
</Container>
```

**Why This Approach?**
This two-tier system follows industry best practices used by companies like Stripe, Linear, and GitHub. It optimizes for both visual impact (full-width containers) and content readability (constrained text), creating a more sophisticated and user-friendly experience.

## 🎨 **Color System**

### **Hybrid Color Approach**
The design system uses a **hybrid approach** that combines:

1. **Neutral Palette** (Zinc/Gray) - For core UI elements (backgrounds, text, borders)
2. **Elevation Blue** - For primary actions and brand identity
3. **Custom Colors** - For specific use cases (success, warning, error, etc.)

### **Primary Color Palette**
The design system includes a full custom color palette defined in `tailwind.config.js`:

- **Elevation** (#0e62fd) - Primary brand color for actions
- **Periwinkle** (#7458f4) - Purple variant
- **Green** (#12c55d) - Success/positive actions
- **Red** (#df3523) - Error/destructive actions
- **Gold** (#ebbc48) - Warning/attention
- **Magenta** (#e433c3) - Vibrant accent
- **Cyan** (#5bc8f7) - Info/action

### **How Colors Work**
1. **Definition**: Colors are defined in `tailwind.config.js` with full 50-900 ramps
2. **Application**: CSS variables in `globals.css` map semantic tokens to your custom colors
3. **Usage**: Components use semantic tokens (e.g., `bg-primary`, `text-destructive`)
4. **Consistency**: All colors throughout the app reference the same source

### **Color Mapping**
```css
/* Light Mode - Neutral UI with Elevation Accents */
--background: #ffffff;
--foreground: #09090b; /* zinc-950 */
--primary: #0e62fd; /* elevation-500 - brand color */
--secondary: #f4f4f5; /* zinc-100 */
--muted: #f4f4f5; /* zinc-100 */
--accent: #f4f4f5; /* zinc-100 */
--destructive: #df3523; /* red-500 */
--border: #e4e4e7; /* zinc-200 */

/* Dark Mode - Neutral UI with Elevation Accents */
--background: #09090b; /* zinc-950 */
--foreground: #fafafa; /* zinc-50 */
--primary: #479cff; /* elevation-400 - brand color */
--secondary: #27272a; /* zinc-800 */
--muted: #27272a; /* zinc-800 */
--accent: #27272a; /* zinc-800 */
--destructive: #c93020; /* red-600 */
--border: #3f3f46; /* zinc-700 */
```

## 🔧 **Component System**

### **shadcn/ui Components**
All shadcn/ui components are automatically styled using your custom color palette through CSS variables. This means:

- ✅ **Buttons** use your primary color (`bg-primary`)
- ✅ **Cards** use your background and border colors
- ✅ **Inputs** use your input and border colors
- ✅ **Alerts** use your destructive and accent colors
- ✅ **All components** automatically adapt to your palette

### **Custom Components**
Components in `@/components/ui/` are built using:
- Your custom color palette
- Consistent spacing and typography
- Responsive design patterns
- Accessibility best practices

## 📝 **Typography System**

### **Font Stack**
- **Primary**: Geist Sans (via Google Fonts)
- **Monospace**: Geist Mono (via Google Fonts)

### **Type Scale**
Defined in `@/components/ui/typography.tsx`:
- **Display Large**: `text-5xl font-extrabold`
- **Display Medium**: `text-4xl font-bold`
- **Heading Large**: `text-3xl font-semibold`
- **Heading Medium**: `text-2xl font-semibold`
- **Heading Small**: `text-xl font-semibold`
- **Body Large**: `text-lg`
- **Body**: `text-base`
- **Body Small**: `text-sm`
- **Caption**: `text-xs`

## 📐 **Layout System**

### **Grid System**
- **12-column responsive grid**
- **Container sizes**: sm, md, lg, xl, full
- **Spacing scale**: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16
- **Responsive breakpoints**: sm, md, lg, xl, 2xl

### **Layout Components**
- `Container` - Responsive max-width containers
- `Grid` - 12-column grid system
- `GridItem` - Grid items with responsive spans
- `Section` - Consistent vertical spacing
- `AppShell` - Page layout structure

## 🎨 **Design System Page**

### **Purpose**
The `/design-system` page serves as:
1. **Documentation** - Shows all available components and tokens
2. **Testing Ground** - Demonstrates components in context
3. **Reference** - Provides usage examples and code snippets
4. **Source of Truth** - Displays the exact colors and styles used

### **Tabs**
- **Components** - All shadcn/ui components with examples
- **Colors** - Complete color palette with usage examples
- **Typography** - Type scale and font families
- **Grid** - Grid system demonstrations
- **Spacing** - Spacing scale and container sizes
- **Icons** - Icon library and usage

## 🔄 **How Changes Propagate**

### **Making Changes**
1. **Colors**: Update `tailwind.config.js` and `globals.css`
2. **Typography**: Update `@/components/ui/typography.tsx`
3. **Components**: Update individual component files
4. **Layout**: Update layout components in `@/components/ui/layout/`

### **Automatic Updates**
- ✅ **Color changes** automatically apply to all components
- ✅ **Typography changes** update all text elements
- ✅ **Component changes** reflect across all pages
- ✅ **Layout changes** affect all page structures

## 🚀 **Best Practices**

### **For Developers**
1. **Always use semantic tokens** (`bg-primary`, not `bg-elevation-500`)
2. **Use the design system page** as reference
3. **Test changes** in the design system first
4. **Follow established patterns** for consistency

### **For Designers**
1. **Update the design system** when making changes
2. **Use the color palette** consistently
3. **Follow the type scale** for text sizing
4. **Use the grid system** for layouts

### **For Content Creators**
1. **Use semantic color names** in content
2. **Follow typography hierarchy** for headings
3. **Use consistent spacing** patterns
4. **Reference the design system** for guidance

## 🔍 **Verification**

### **How to Verify the System Works**
1. **Visit `/design-system`** - See all components and colors
2. **Switch between tabs** - Each tab loads at the top of the page
3. **Navigate between pages** - All pages load at the top
4. **Check any page** - Verify colors match the design system
5. **Toggle dark mode** - Confirm colors adapt properly
6. **Test responsiveness** - Ensure layouts work on all devices

### **Testing Changes**
1. **Make a change** to the color palette
2. **Check the design system page** - Should reflect immediately
3. **Visit other pages** - Should use the new colors
4. **Test dark mode** - Should adapt appropriately

## 📚 **Resources**

- **Design System**: `/design-system`
- **Tailwind Config**: `tailwind.config.js`
- **Global Styles**: `src/app/globals.css`
- **Component Library**: `@/components/ui/`
- **Typography**: `@/components/ui/typography.tsx`
- **Layout Components**: `@/components/ui/layout/`

---

**Remember**: The design system is the **single source of truth**. Any changes made here will automatically propagate throughout the entire application.
