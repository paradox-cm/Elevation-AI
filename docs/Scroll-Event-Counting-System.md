# Scroll Event Counting System

## Overview

The Scroll Event Counting System implements true event-based progression that ensures **one scroll action = one slide advancement**. This solves the core issue where minimal scrolling was causing multiple slides to be skipped.

## Key Features

### 1. True Event-Based Progression
- Counts scroll events, not scroll distance
- Each scroll action advances exactly one slide
- No slides are skipped regardless of scroll speed or amount
- Removed all distance-based calculations

### 2. Direction-Aware Section Entry
- **Scrolling down**: Sections start at slide 0
- **Scrolling up**: Sections start at the last slide (N-1)
- Proper reverse progression through slides

### 3. Simple Debouncing & Cooldown
- **Debounce Time**: 150ms to group rapid scroll events
- **Cooldown Period**: 300ms after slide change to prevent rapid switching
- No minimum scroll distance requirements

### 4. One-Action-One-Slide Guarantee
- Every scroll event = exactly one slide advancement
- Impossible to skip slides
- Predictable, consistent behavior

## Implementation

### ScrollEventManager Class

```typescript
class ScrollEventManager {
  constructor(totalSlides: number, onSlideChange: (slideIndex: number) => void)
  
  handleScroll(scrollY: number, rect: DOMRect, direction: 'up' | 'down'): boolean
  setCurrentSlide(slideIndex: number): void
  getCurrentSlide(): number
  resetToFirstSlide(): void
  resetToLastSlide(): void
  destroy(): void
}
```

### useScrollEventManager Hook

```typescript
const activeSlide = useScrollEventManager(totalSlides, sectionRef)
```

## Configuration

```typescript
export const SCROLL_EVENT_CONFIG = {
  DEBOUNCE_TIME: 150,        // ms
  COOLDOWN_PERIOD: 300,      // ms
}
```

## Usage Examples

### ProblemSection (4 slides)
```typescript
function ProblemSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const problems = [/* 4 problem items */]
  
  // Use scroll event manager for one-action-one-slide behavior
  const activeStep = useScrollEventManager(problems.length, sectionRef)
  
  return (
    // ... JSX with activeStep controlling which slide is shown
  )
}
```

### UnifyingStatementSection (3 slides)
```typescript
function UnifyingStatementSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const texts = [/* 3 text items */]
  
  // Use scroll event manager for one-action-one-slide behavior
  const activeStep = useScrollEventManager(texts.length, sectionRef)
  
  return (
    // ... JSX with activeStep controlling which text is shown
  )
}
```

### PlatformSection (4 tabs)
```typescript
function PlatformSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const features = [/* 4 feature items */]
  
  // Use scroll event manager for one-action-one-slide behavior
  const activeTab = useScrollEventManager(features.length, sectionRef)
  
  return (
    // ... JSX with activeTab controlling which tab is shown
  )
}
```

## Behavior Comparison

### Before (Distance-Based Thresholds)
- Scroll 0-25% → Slide 0
- Scroll 25-50% → Slide 1
- Scroll 50-75% → Slide 2
- Scroll 75-100% → Slide 3

**Problem**: Minimal scrolling could skip multiple slides

### After (Event-Based Counting)
- **Scrolling down**:
  - Enter section → Slide 0
  - Scroll action 1 → Slide 0 → Slide 1
  - Scroll action 2 → Slide 1 → Slide 2
  - Scroll action 3 → Slide 2 → Slide 3
  - Scroll action 4 → Slide 3 (stays at last slide)

- **Scrolling up**:
  - Enter section → Slide 3 (last slide)
  - Scroll action 1 → Slide 3 → Slide 2
  - Scroll action 2 → Slide 2 → Slide 1
  - Scroll action 3 → Slide 1 → Slide 0
  - Scroll action 4 → Slide 0 (stays at first slide)

**Solution**: Each scroll action advances exactly one slide

## Debugging

The current implementation includes comprehensive console logging to help debug scroll behavior:

### Console Logs
- `Section entered viewport (down)` or `Section entered viewport (up)`
- `Section left viewport`
- `Slide changed to: X`
- `Scrolling down: X → Y` or `Scrolling up: X → Y`
- `Forward scroll event triggered slide change to: X` or `Reverse scroll event triggered slide change to: X`
- `In cooldown period, ignoring scroll`
- `Debouncing scroll: Xms < 150ms`
- `No slide change needed, current: X`

### Testing
1. Open browser console
2. Navigate to `/wireframes/home`
3. Scroll through sections and observe console output
4. Verify that each scroll action advances exactly one slide
5. Test reverse scrolling to ensure it starts from the last slide

## Accessibility Features

### Keyboard Navigation
- Spacebar: Exactly 1 press per slide transition
- Arrow keys: 1 press per slide transition

### Mouse/Trackpad
- Mouse wheel: 1 click per slide (any amount)
- Trackpad: 1 swipe per slide (any amount)

### Screen Reader Support
- Clear slide progression
- Predictable navigation behavior
- No unexpected jumps or skips

## Migration Guide

### From Distance-Based to Event-Based

1. **Remove old scroll logic**:
   ```typescript
   // Remove this
   const [activeStep, setActiveStep] = React.useState(0)
   React.useEffect(() => {
     const handleScroll = () => {
       // ... distance-based calculations
     }
     window.addEventListener('scroll', handleScroll)
   }, [])
   ```

2. **Add new scroll event manager**:
   ```typescript
   // Add this
   import { useScrollEventManager } from '@/hooks/use-scroll-to-top'
   
   const activeStep = useScrollEventManager(totalSlides, sectionRef)
   ```

3. **Remove manual slide controls**:
   ```typescript
   // Remove onClick handlers that manually set slides
   // The scroll event manager handles all slide progression
   ```

## Benefits

1. **Predictable UX**: Users know exactly what to expect from each scroll action
2. **No Skipped Slides**: Impossible to accidentally skip slides
3. **Smooth Progression**: Natural, intuitive navigation flow
4. **Accessibility**: Works consistently across all input methods
5. **Performance**: Efficient event handling with debouncing
6. **Maintainable**: Clean, reusable code across all sections
7. **Debuggable**: Comprehensive logging for troubleshooting
8. **Reverse Support**: Proper backwards navigation starting from last slide

## Current Status

✅ **Implemented**: True scroll event counting (no distance calculations)
✅ **Implemented**: Direction-aware section entry
✅ **Implemented**: Reverse scrolling support
✅ **Implemented**: One-action-one-slide guarantee
✅ **Implemented**: Debouncing and cooldown
✅ **Implemented**: Debug logging
✅ **Implemented**: All three sections updated

🔄 **Testing**: Currently testing on `/wireframes/home`
🔄 **Validation**: Verifying one-action-one-slide behavior

## Key Improvements Made

1. **Removed distance-based calculations**: No more measuring scroll distance
2. **Simplified event handling**: Pure event counting approach
3. **Added reverse scrolling**: Sections start at last slide when scrolling up
4. **Guaranteed one-action-one-slide**: Every scroll event advances exactly one slide
5. **Direction-aware entry**: Smart initial slide selection based on scroll direction

## Future Enhancements

- Customizable debounce and cooldown times per section
- Smooth scroll animations between slides
- Touch gesture support for mobile devices
- Analytics tracking for scroll behavior
- A/B testing framework for different scroll configurations
- Remove debug logging for production
