# **Comprehensive Brief: Animation Resize Issue**

## **🎯 What We Have**

### **Current System Architecture**
- **Next.js 15.5.0** application with TypeScript
- **Canvas-based animations** rendered on HTML5 canvas elements
- **Responsive design** with Tailwind CSS breakpoints (desktop: `lg:block`, mobile: `block lg:hidden`)
- **Multiple animation components** for different sections of the homepage

### **Animation Components**
1. **UnifiedKnowledge** - Desktop & Mobile versions
2. **IntelligentProcessAutomation** - Desktop & Mobile versions  
3. **RealTimeBusinessIntelligence** - Desktop & Mobile versions
4. **FutureReady** - Desktop & Mobile versions
5. **KnowledgeBlocks** - Desktop & Mobile versions
6. **WorkspacesCanvases** - Desktop only
7. **AgenticEngine** - Desktop only
8. **PersonalCopilot** - Desktop only
9. **EnterpriseSecurity** - Desktop only

### **Current Implementation**
- **Canvas animations** using `requestAnimationFrame` loops
- **High-DPI support** with device pixel ratio scaling
- **Theme-aware colors** (dark/light mode)
- **Performance optimizations** (frame rate limiting, reduced object counts)
- **Resize handling** via `useCanvasResize` hook with debouncing
- **State-based restart mechanism** using `animationKey` to force re-initialization

## **🔧 How These Animations Are Built**

### **Technical Stack**
```typescript
// Core animation pattern
const canvasRef = useRef<HTMLCanvasElement>(null)
const animationRef = useRef<number | null>(null)
const [animationKey, setAnimationKey] = useState(0)

// Animation loop
const animate = useCallback(() => {
  // Clear canvas
  // Update animation state
  // Draw frame
  animationRef.current = requestAnimationFrame(animate)
}, [])

// Restart mechanism
const initializeAndStartAnimation = useCallback(() => {
  cancelAnimationFrame(animationRef.current)
  setAnimationKey(prev => prev + 1) // Forces useEffect to re-run
}, [])
```

### **Responsive Layout Structure**
```tsx
{/* Mobile Layout */}
<div className="block lg:hidden">
  {problems.map((problem, index) => (
    <Card>
      {index === 0 && <UnifiedKnowledge />}
      {index === 1 && <IntelligentProcessAutomationMobile />}
      {index === 2 && <RealTimeBusinessIntelligenceMobile />}
      {index === 3 && <FutureReadyMobile />}
    </Card>
  ))}
</div>

{/* Desktop Layout */}
<div className="hidden lg:block">
  <Carousel>
    {problems.map((problem, index) => (
      <div className={index === activeStep ? 'opacity-100' : 'opacity-0'}>
        {index === 0 && <UnifiedKnowledge />}
        {index === 1 && <IntelligentProcessAutomation />}
        {index === 2 && <RealTimeBusinessIntelligence />}
        {index === 3 && <FutureReady />}
      </div>
    ))}
  </Carousel>
</div>
```

## **🎯 What We're Aiming To Have Them Do**

### **Desired Behavior**
1. **Seamless breakpoint transitions** - Animations should work when resizing browser window
2. **No empty animation containers** - Cards should never appear blank
3. **Automatic restart** - Animations should restart when switching between desktop/tablet views
4. **No page refresh required** - Everything should work without manual refresh
5. **Consistent performance** - Animations should maintain smooth 60fps

### **User Experience Goal**
- User resizes browser from desktop (1200px) to tablet (768px)
- Page switches from carousel layout to card layout
- **All animations should immediately appear and work**
- User resizes back to desktop
- Page switches back to carousel layout
- **All animations should continue working seamlessly**

## **🚫 Where We're Stuck and Why It Possibly Doesn't Work**

### **Root Cause Analysis**
The core issue is **canvas context loss during CSS visibility changes**:

1. **CSS Class Toggle**: When breakpoint changes, elements switch between `hidden lg:block` and `block lg:hidden`
2. **Canvas Context Loss**: When a canvas element is hidden with `display: none`, it loses its 2D rendering context
3. **No Automatic Recovery**: When the element becomes visible again, the canvas doesn't automatically re-initialize
4. **Empty Containers**: Result is blank animation areas that look like empty cards

### **Attempted Solutions (All Failed)**

#### **1. Canvas Resize Hook**
```typescript
// useCanvasResize hook - handles window resize events
useCanvasResize(canvasRef, initializeAndStartAnimation, {
  debounceDelay: 150,
  preserveAspectRatio: true
})
```
**Why it failed**: Only triggers on window resize, not on CSS class changes.

#### **2. State-Based Restart Mechanism**
```typescript
const [animationKey, setAnimationKey] = useState(0)

const initializeAndStartAnimation = useCallback(() => {
  cancelAnimationFrame(animationRef.current)
  setAnimationKey(prev => prev + 1) // Forces useEffect to re-run
}, [])

useEffect(() => {
  // Animation initialization logic
}, [width, height, animationKey]) // animationKey dependency
```
**Why it failed**: The `useEffect` doesn't re-run when CSS classes change visibility.

#### **3. Intersection Observer Approach**
```typescript
// useVisibilityReset hook - detects when elements become visible
useVisibilityReset(containerRef, (isVisible) => {
  if (isVisible) {
    initializeAndStartAnimation()
  }
})
```
**Why it failed**: Intersection Observer doesn't detect CSS class visibility changes, only viewport visibility.

#### **4. Breakpoint Detection Approach**
```typescript
// useBreakpointReset hook - checks CSS visibility periodically
useBreakpointReset(containerRef, () => {
  initializeAndStartAnimation()
})
```
**Why it failed**: Still in testing phase, but may have timing issues.

### **Technical Challenges**

#### **1. Canvas Context Management**
- Canvas 2D context is lost when element is hidden
- Context cannot be restored, must be recreated
- Recreating context requires complete re-initialization

#### **2. CSS Class vs DOM Visibility**
- `display: none` completely removes element from layout
- `visibility: hidden` keeps element in layout but hides it
- `opacity: 0` keeps element visible but transparent
- Current implementation uses `display: none` via Tailwind classes

#### **3. Timing Issues**
- Animation restart must happen after element becomes visible
- Too early = canvas not ready
- Too late = user sees empty container
- Need precise timing for smooth UX

#### **4. Multiple Animation Components**
- 9 different animation components
- Each has different initialization logic
- Some have mobile-specific versions
- Need consistent solution across all components

### **Current Debug Status**
- **Console logging** added to track visibility changes
- **Multiple detection methods** implemented
- **All mobile components** updated with visibility reset hooks
- **Development server** running at `http://localhost:3001`
- **No linting errors** in current implementation

### **Next Steps for New AI**
1. **Test current implementation** - Check console logs during resize
2. **Identify specific failure point** - Which detection method (if any) is working
3. **Consider alternative approaches**:
   - **CSS-only solution** (avoid `display: none`)
   - **React key-based remounting** (force component recreation)
   - **Canvas context preservation** (keep context alive during hide)
   - **Layout shift prevention** (use `visibility: hidden` instead of `display: none`)

### **Key Files to Examine**
- `/src/hooks/use-visibility-reset.ts` - Intersection Observer approach
- `/src/hooks/use-breakpoint-reset.ts` - CSS class detection approach
- `/src/app/wireframes/home/page.tsx` - Main layout with conditional rendering
- `/src/components/animations/*.tsx` - Individual animation components

The core challenge is that **CSS class-based visibility changes don't trigger React lifecycle events**, making it difficult to detect when animations need to restart.