# Section Spacing Guidelines

## Overview
This document provides guidelines to prevent content cutoff issues in sections and components.

## Common Issues and Solutions

### 1. Accordion Border Cutoff
**Problem**: Last accordion item's bottom border is cut off due to `last:border-b-0` CSS.

**Solution**: Always override the default behavior:
```tsx
<AccordionItem className="border border-border/50 rounded-lg px-6 last:border-b border-b">
```

### 2. Fixed Height Container Overflow
**Problem**: Content overflows fixed height containers, causing cutoff.

**Solutions**:
- Use `min-h-` instead of fixed `h-` when possible
- Add adequate bottom padding (`pb-6` minimum)
- Test with longest content scenarios
- Use `overflow-visible` when appropriate

### 3. Sticky Container Height Calculations
**Problem**: Complex `calc()` expressions can cause content cutoff.

**Best Practices**:
```tsx
// ❌ Avoid complex nested calculations
h-[calc(100vh-10rem)] lg:h-[calc(100vh-9rem)] xl:h-[calc(100vh-8rem)]

// ✅ Use simpler, more predictable calculations
h-[500px] lg:h-[600px] xl:h-[650px] 2xl:h-[700px]
```

## Section Component Standards

### Minimum Spacing Requirements
```tsx
// Always include bottom padding for sections
<Section paddingY="xl" className="relative">
  <Container>
    <div className="space-y-6 pb-6"> {/* Minimum pb-6 */}
      {/* Content */}
    </div>
  </Container>
</Section>
```

### Grid Layout Spacing
```tsx
// Use proper grid spacing with bottom padding
<div className="grid grid-cols-12 gap-4 lg:gap-8 items-start">
  <div className="col-span-12 lg:col-span-4 space-y-6">
    {/* Left column */}
  </div>
  <div className="col-span-12 lg:col-span-8 space-y-4 pb-6"> {/* Always pb-6 */}
    {/* Right column */}
  </div>
</div>
```

### Accordion Implementation
```tsx
// Always override default border behavior
<Accordion type="single" collapsible className="w-full">
  {items.map((item) => (
    <AccordionItem 
      key={item.value} 
      value={item.value} 
      className="border border-border/50 rounded-lg px-6 last:border-b border-b"
    >
      <AccordionTrigger className="text-left text-lg font-medium text-primary hover:no-underline py-6">
        {item.title}
      </AccordionTrigger>
      <AccordionContent className="pb-6">
        {item.content}
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```

## Height Calculation Guidelines

### Safe Height Patterns
```tsx
// ✅ Good: Progressive height increases
h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]

// ✅ Good: Using min-height for flexibility
min-h-[400px] lg:min-h-[500px]

// ❌ Avoid: Complex calc() expressions
h-[calc(100vh-8rem)] lg:h-[calc(100vh-7rem)]

// ❌ Avoid: Too small fixed heights
h-[200px] // Often too small for content
```

### Container Height Standards
```tsx
// Animation containers
h-[320px] lg:h-[370px] xl:h-[420px] 2xl:h-[470px]

// Content containers
h-[500px] lg:h-[600px] xl:h-[650px] 2xl:h-[700px]

// Card containers
min-h-[300px] lg:min-h-[400px]
```

## Testing Checklist

Before deploying any section:

- [ ] Test with longest possible content
- [ ] Verify bottom borders are visible
- [ ] Check all breakpoints (mobile, tablet, desktop, wide)
- [ ] Ensure no content is cut off
- [ ] Verify proper spacing between sections
- [ ] Test accordion expansion/collapse
- [ ] Check sticky positioning doesn't cause overflow

## Common Anti-Patterns to Avoid

1. **Insufficient bottom padding**: Always use `pb-6` minimum
2. **Complex height calculations**: Prefer simple, predictable heights
3. **Ignoring accordion border behavior**: Always override `last:border-b-0`
4. **Fixed heights without overflow consideration**: Use `min-h-` when possible
5. **Missing responsive height adjustments**: Ensure proper scaling across breakpoints

## Quick Fixes

### If you see cutoff issues:
1. Add `pb-6` to the container
2. Increase height values by 50-100px
3. For accordions: add `last:border-b border-b`
4. For sticky containers: simplify height calculations
5. Test with longest content scenario
