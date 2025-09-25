# Component Templates

## Safe Section Template

Use this template for all new sections to prevent spacing issues:

```tsx
import { Section } from "@/components/ui/layout/section"
import { Container } from "@/components/ui/layout/container"
import { safeHeights, safeSpacing, gridConfigs } from "@/lib/section-utils"

function YourSection() {
  return (
    <Section paddingY="xl" className="relative">
      <Container size="2xl" className="px-4 sm:px-6 lg:px-8 lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px] relative z-10">
        <div className={`${safeSpacing.sectionGap} ${safeSpacing.containerBottom}`}>
          {/* Your content here */}
        </div>
      </Container>
    </Section>
  )
}
```

## Safe Accordion Template

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { accordionStyles } from "@/lib/section-utils"

function YourAccordionSection() {
  const items = [
    { title: "Title 1", content: "Content 1", value: "item-1" },
    { title: "Title 2", content: "Content 2", value: "item-2" },
    { title: "Title 3", content: "Content 3", value: "item-3" }
  ]

  return (
    <div className={`${safeSpacing.containerBottom}`}>
      <Accordion type="single" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem 
            key={item.value} 
            value={item.value} 
            className={accordionStyles.item}
          >
            <AccordionTrigger className={accordionStyles.trigger}>
              {item.title}
            </AccordionTrigger>
            <AccordionContent className={accordionStyles.content}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
```

## Safe Two-Column Layout Template

```tsx
import { gridConfigs, safeSpacing } from "@/lib/section-utils"

function YourTwoColumnSection() {
  return (
    <div className={gridConfigs.twoColumn.container}>
      {/* Left Column */}
      <div className={gridConfigs.twoColumn.left}>
        {/* Left content */}
      </div>
      
      {/* Right Column */}
      <div className={gridConfigs.twoColumn.right}>
        {/* Right content */}
      </div>
    </div>
  )
}
```

## Safe Animation Container Template

```tsx
import { safeHeights, safeSpacing } from "@/lib/section-utils"

function YourAnimationSection() {
  return (
    <div className={`relative w-full ${safeHeights.content.large} ${safeSpacing.containerBottom}`}>
      <div className={`${safeHeights.animation.medium} w-full rounded-xl flex items-center justify-center border border-border/50 relative`}>
        {/* Your animation component */}
      </div>
    </div>
  )
}
```

## Safe Card Container Template

```tsx
import { safeHeights, safeSpacing } from "@/lib/section-utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

function YourCardSection() {
  return (
    <Card className={`border-border/50 transition-colors duration-300 ${safeHeights.card.medium}`}>
      <CardHeader className={`h-full flex flex-col pt-2 px-6 ${safeSpacing.containerBottom}`}>
        {/* Card content */}
      </CardHeader>
    </Card>
  )
}
```

## Testing Checklist Template

Copy this checklist for every new section:

```markdown
## Section Testing Checklist

- [ ] Test with longest possible content
- [ ] Verify bottom borders are visible (if applicable)
- [ ] Check all breakpoints (mobile, tablet, desktop, wide)
- [ ] Ensure no content is cut off
- [ ] Verify proper spacing between sections
- [ ] Test interactive elements (accordions, tabs, etc.)
- [ ] Check sticky positioning doesn't cause overflow
- [ ] Validate using section-utils functions
- [ ] Run ESLint spacing rules
```

## Common Patterns to Avoid

### ❌ Don't do this:
```tsx
// Complex height calculations
<div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-7rem)]">

// Missing bottom padding
<div className="space-y-4">

// Small fixed heights
<div className="h-[200px]">

// Accordion without proper borders
<AccordionItem className="border rounded-lg px-6">
```

### ✅ Do this instead:
```tsx
// Simple, predictable heights
<div className={safeHeights.content.large}>

// Proper spacing
<div className={`space-y-4 ${safeSpacing.containerBottom}`}>

// Adequate heights
<div className={safeHeights.animation.medium}>

// Proper accordion styling
<AccordionItem className={accordionStyles.item}>
```
