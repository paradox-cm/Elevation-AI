I've successfully updated both the responsive design and sticky sections documentation in the design system to reflect what we've actually implemented on the `/wireframes/home` page. Here's a summary of the changes made:

## **Responsive Design Documentation Updates**

### **1. Breakpoint System**
- **Updated breakpoint ranges** to match our actual implementation:
  - **LG**: 1024px - 1599px (includes 14-inch MacBooks at 1512px)
  - **XL**: 1600px - 2559px (large desktop monitors and ultra-wide displays)
  - **2XL**: 2560px+ (ultra-wide displays, 4K monitors, 3360px+ screens)

### **2. Responsive Patterns**
- **Replaced generic patterns** with our actual implementation patterns:
  - **Progressive Typography Scaling**: LG breakpoint preservation, XL/2XL enhancement
  - **Container Width Optimization**: Full-width content utilization with proper padding
  - **Component Size Scaling**: Responsive component sizing with breakpoint-specific values

### **3. Grid Examples**
- **Updated examples** to reflect our actual implementation:
  - **Footer Grid**: Two-column mobile, five-column desktop
  - **Container Padding**: Consistent padding across all breakpoints
  - **Typography Scaling**: Progressive scaling with LG preservation
  - **Component Sizing**: Responsive sizing with specific breakpoint values

### **4. Responsive Components**
- **Updated component examples** to match our actual components:
  - **Perlin Logo**: Specific sizing for each breakpoint
  - **Typography**: Progressive scaling with LG preservation
  - **Containers**: Max-width configurations for each breakpoint
  - **Footer Layout**: Two-column mobile with left-justified copyright

## **Sticky Sections Documentation Updates**

### **1. Implementation Guidelines**
- **Updated to use ScrollEventManager** instead of basic calculation functions
- **Added manual interaction handling** with `setCurrentSlide()` method
- **Included proper event listener setup** and cleanup

### **2. ScrollEventManager Features**
- **Added new section** documenting the core features:
  - One-action-one-slide behavior
  - Manual slide setting with `setCurrentSlide()`
  - Debounced scroll events (150ms)
  - Cooldown periods (500ms)
  - Automatic cleanup on `destroy()`

### **3. Implementation Examples**
- **Added real examples** from our wireframes page:
  - **PlatformSection**: Tab navigation with 5 slides
  - **ProblemSection**: Step indicators with 5 slides
  - **Code snippets** showing actual implementation patterns

### **4. Event Handling**
- **Documented proper event handling**:
  - Wheel events with `passive: false`
  - Scroll events with `passive: true`
  - Prevents default on wheel events
  - Handles both mouse and trackpad input

## **Key Benefits**

1. **Accurate Documentation**: The design system now reflects our actual implementation rather than theoretical patterns
2. **Implementation Guidance**: Developers can follow the documented patterns to implement similar features
3. **Consistency**: All future implementations will follow the same established patterns
4. **Maintainability**: Centralized documentation makes it easier to maintain and update patterns

The design system documentation now serves as a true source of truth for our responsive design and sticky section implementations, making it easier for developers to understand and implement these patterns consistently across the application.