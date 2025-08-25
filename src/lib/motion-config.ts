// Motion Configuration - Single Source of Truth
// This file defines all animation and motion settings used throughout the application
// Changes here will automatically propagate to all components and pages

export interface EasingCurve {
  name: string
  value: string
  description: string
  usage: string[]
  category: 'linear' | 'ease' | 'custom'
  cssValue: string
}

export interface DurationScale {
  name: string
  value: string
  class: string
  description: string
  usage: string[]
  category: 'instant' | 'fast' | 'normal' | 'slow' | 'very-slow'
  milliseconds: number
}

export interface AnimationPrinciple {
  title: string
  description: string
  icon: string
  examples: string[]
  category: 'purpose' | 'style' | 'accessibility'
}

export interface MicroInteraction {
  name: string
  description: string
  trigger: string
  duration: string
  easing: string
  category: 'feedback' | 'navigation' | 'loading' | 'state'
  examples: string[]
  implementation: string
}

export interface AnimationType {
  name: string
  description: string
  examples: string[]
  category: 'appearance' | 'movement' | 'transformation' | 'rotation'
  cssProperties: string[]
  bestPractices: string[]
}

export interface MotionFoundation {
  baseUnit: string
  description: string
  principles: {
    purposeful: string
    subtle: string
    consistent: string
    accessible: string
  }
}

// Easing Curves Configuration
export const easingCurves: EasingCurve[] = [
  {
    name: "Linear",
    value: "linear",
    description: "Constant speed, no acceleration",
    usage: ["Simple progress indicators", "Loading bars", "Linear transitions"],
    category: "linear",
    cssValue: "linear"
  },
  {
    name: "Ease In",
    value: "ease-in",
    description: "Slow start, fast finish",
    usage: ["Elements entering the screen", "Expanding content", "Fade in effects"],
    category: "ease",
    cssValue: "cubic-bezier(0.4, 0, 1, 1)"
  },
  {
    name: "Ease Out",
    value: "ease-out",
    description: "Fast start, slow finish",
    usage: ["Elements leaving the screen", "Collapsing content", "Fade out effects"],
    category: "ease",
    cssValue: "cubic-bezier(0, 0, 0.2, 1)"
  },
  {
    name: "Ease In Out",
    value: "ease-in-out",
    description: "Slow start and finish, fast middle",
    usage: ["Most UI interactions", "Button presses", "Modal animations"],
    category: "ease",
    cssValue: "cubic-bezier(0.4, 0, 0.2, 1)"
  },
  {
    name: "Bounce",
    value: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    description: "Playful bounce effect",
    usage: ["Success states", "Celebratory interactions", "Attention-grabbing elements"],
    category: "custom",
    cssValue: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
  }
]

// Duration Scale Configuration
export const durationScale: DurationScale[] = [
  {
    name: "Instant",
    value: "0ms",
    class: "duration-0",
    description: "No animation, immediate change",
    usage: ["Critical feedback", "Error states", "Instant updates"],
    category: "instant",
    milliseconds: 0
  },
  {
    name: "Fast",
    value: "150ms",
    class: "duration-150",
    description: "Quick, snappy transitions",
    usage: ["Hover states", "Micro-interactions", "Quick feedback"],
    category: "fast",
    milliseconds: 150
  },
  {
    name: "Normal",
    value: "300ms",
    class: "duration-300",
    description: "Standard transition speed",
    usage: ["Most UI interactions", "Button presses", "Standard transitions"],
    category: "normal",
    milliseconds: 300
  },
  {
    name: "Slow",
    value: "500ms",
    class: "duration-500",
    description: "Smooth, deliberate transitions",
    usage: ["Page transitions", "Modal animations", "Complex interactions"],
    category: "slow",
    milliseconds: 500
  },
  {
    name: "Very Slow",
    value: "700ms",
    class: "duration-700",
    description: "Slow, dramatic animations",
    usage: ["Hero animations", "Attention-grabbing elements", "Dramatic reveals"],
    category: "very-slow",
    milliseconds: 700
  }
]

// Animation Principles Configuration
export const animationPrinciples: AnimationPrinciple[] = [
  {
    title: "Purposeful",
    description: "Every animation should serve a clear purpose and enhance the user experience.",
    icon: "target-line",
    examples: ["Providing feedback", "Guiding attention", "Showing relationships"],
    category: "purpose"
  },
  {
    title: "Subtle",
    description: "Animations should be noticeable but not distracting or overwhelming.",
    icon: "eye-line",
    examples: ["Gentle transitions", "Appropriate timing", "Smooth easing"],
    category: "style"
  },
  {
    title: "Consistent",
    description: "Use consistent animation patterns throughout your interface.",
    icon: "grid-line",
    examples: ["Standard durations", "Consistent easing", "Unified patterns"],
    category: "style"
  },
  {
    title: "Accessible",
    description: "Respect user preferences and provide options to reduce motion.",
    icon: "heart-line",
    examples: ["Reduced motion support", "No motion preferences", "Performance considerations"],
    category: "accessibility"
  }
]

// Micro-Interactions Configuration
export const microInteractions: MicroInteraction[] = [
  {
    name: "Button Hover",
    description: "Subtle scale and shadow changes on hover",
    trigger: "Hover",
    duration: "150ms",
    easing: "ease-out",
    category: "feedback",
    examples: ["Primary buttons", "Interactive elements", "Call-to-action buttons"],
    implementation: "transition-all duration-150 ease-out hover:scale-105 hover:shadow-md"
  },
  {
    name: "Form Focus",
    description: "Smooth border color and shadow transitions",
    trigger: "Focus",
    duration: "200ms",
    easing: "ease-out",
    category: "feedback",
    examples: ["Input fields", "Text areas", "Form controls"],
    implementation: "transition-all duration-200 ease-out focus:ring-2 focus:ring-primary"
  },
  {
    name: "Loading States",
    description: "Gentle pulse or spin animations",
    trigger: "Loading",
    duration: "1000ms",
    easing: "linear",
    category: "loading",
    examples: ["Data loading", "Processing states", "Background tasks"],
    implementation: "animate-pulse or animate-spin"
  },
  {
    name: "Success Feedback",
    description: "Quick scale and color change",
    trigger: "Success",
    duration: "300ms",
    easing: "ease-out",
    category: "feedback",
    examples: ["Form submissions", "Action confirmations", "Positive feedback"],
    implementation: "transition-all duration-300 ease-out scale-110"
  },
  {
    name: "Error States",
    description: "Gentle shake animation",
    trigger: "Error",
    duration: "500ms",
    easing: "ease-in-out",
    category: "feedback",
    examples: ["Form validation", "Error messages", "Invalid inputs"],
    implementation: "animate-shake or custom keyframes"
  }
]

// Animation Types Configuration
export const animationTypes: AnimationType[] = [
  {
    name: "Fade",
    description: "Opacity transitions for smooth appearance/disappearance",
    examples: ["Modal overlays", "Tooltips", "Loading states"],
    category: "appearance",
    cssProperties: ["opacity", "visibility"],
    bestPractices: ["Use with transform for better performance", "Consider reduced motion preferences"]
  },
  {
    name: "Slide",
    description: "Position-based animations for directional movement",
    examples: ["Navigation menus", "Sidebars", "Page transitions"],
    category: "movement",
    cssProperties: ["transform: translateX/Y", "left/right/top/bottom"],
    bestPractices: ["Use transform instead of position properties", "Provide fallbacks for reduced motion"]
  },
  {
    name: "Scale",
    description: "Size changes for emphasis and feedback",
    examples: ["Button interactions", "Card hover effects", "Focus states"],
    category: "transformation",
    cssProperties: ["transform: scale()", "width/height"],
    bestPractices: ["Keep scale changes subtle (1.05-1.1)", "Use for interactive feedback"]
  },
  {
    name: "Rotate",
    description: "Rotation for loading and directional indicators",
    examples: ["Loading spinners", "Expand/collapse icons", "Direction indicators"],
    category: "rotation",
    cssProperties: ["transform: rotate()"],
    bestPractices: ["Use for functional purposes", "Avoid excessive rotation"]
  }
]

// Motion System Foundation
export const motionFoundation: MotionFoundation = {
  baseUnit: "150ms",
  description: "Our motion system provides consistent animation timing, easing, and micro-interactions for creating polished, accessible user experiences.",
  principles: {
    purposeful: "Every animation should serve a clear purpose and enhance the user experience",
    subtle: "Animations should be noticeable but not distracting or overwhelming",
    consistent: "Use consistent animation patterns throughout your interface",
    accessible: "Respect user preferences and provide options to reduce motion"
  }
}

// CSS Custom Properties
export const cssCustomProperties = {
  description: "CSS variables for consistent animation timing and easing across your application.",
  timing: [
    "--duration-fast: 150ms",
    "--duration-normal: 300ms",
    "--duration-slow: 500ms",
    "--duration-very-slow: 700ms"
  ],
  easing: [
    "--ease-linear: linear",
    "--ease-in: cubic-bezier(0.4, 0, 1, 1)",
    "--ease-out: cubic-bezier(0, 0, 0.2, 1)",
    "--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)",
    "--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)"
  ]
}

// Tailwind CSS Classes
export const tailwindClasses = {
  description: "Utility classes for implementing animations in your components.",
  duration: [
    "duration-0 → transition-duration: 0ms",
    "duration-150 → transition-duration: 150ms",
    "duration-300 → transition-duration: 300ms",
    "duration-500 → transition-duration: 500ms",
    "duration-700 → transition-duration: 700ms"
  ],
  easing: [
    "ease-linear → transition-timing-function: linear",
    "ease-in → transition-timing-function: cubic-bezier(0.4, 0, 1, 1)",
    "ease-out → transition-timing-function: cubic-bezier(0, 0, 0.2, 1)",
    "ease-in-out → transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)"
  ],
  animations: [
    "animate-pulse → pulsing animation",
    "animate-spin → spinning animation",
    "animate-bounce → bouncing animation",
    "animate-ping → ping animation",
    "animate-fade-in → fade in animation"
  ]
}

// Accessibility Considerations
export const accessibilityConsiderations = {
  motion: {
    title: "Motion Preferences",
    points: [
      "Respect `prefers-reduced-motion` media query",
      "Provide options to disable animations",
      "Test with motion-sensitive users",
      "Offer alternative experiences for reduced motion"
    ]
  },
  performance: {
    title: "Performance",
    points: [
      "Use `transform` and `opacity` for smooth animations",
      "Avoid animating layout-triggering properties",
      "Test on lower-end devices",
      "Limit concurrent animations"
    ]
  }
}

// Implementation Examples
export const implementationExamples = {
  reactComponent: {
    title: "Animated Button Component",
    description: "Button with accessibility and reduced motion support",
    code: `function AnimatedButton({ children, className, ...props }) {
  const [isPressed, setIsPressed] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <button
      className={cn(
        "transition-all duration-150 ease-out",
        "hover:scale-105 hover:shadow-md",
        "active:scale-95",
        "focus-visible:ring-2 focus-visible:ring-ring",
        prefersReducedMotion && "transition-none",
        className
      )}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      {...props}
    >
      {children}
    </button>
  )
}`
  },
  reducedMotionHook: {
    title: "Reduced Motion Hook",
    description: "Hook to respect user motion preferences",
    code: `function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mediaQuery.matches)

    const handleChange = (e) => setPrefersReduced(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReduced
}`
  },
  keyframes: {
    title: "Custom Keyframes",
    description: "Custom animation keyframes for specific effects",
    code: `@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}`
  }
}

// Usage Guidelines
export const usageGuidelines = {
  do: [
    "Use animations to provide feedback",
    "Keep animations subtle and purposeful",
    "Maintain consistent timing and easing",
    "Respect reduced motion preferences",
    "Test performance on slower devices",
    "Use animations to guide user attention"
  ],
  dont: [
    "Animate everything just because you can",
    "Use overly long or complex animations",
    "Ignore user motion preferences",
    "Create animations that cause motion sickness",
    "Use animations to hide poor UX",
    "Ignore performance implications"
  ]
}

// Helper functions
export function getEasingByName(name: string): EasingCurve | undefined {
  return easingCurves.find(easing => easing.name === name)
}

export function getEasingByValue(value: string): EasingCurve | undefined {
  return easingCurves.find(easing => easing.value === value)
}

export function getEasingByCategory(category: 'linear' | 'ease' | 'custom'): EasingCurve[] {
  return easingCurves.filter(easing => easing.category === category)
}

export function getDurationByName(name: string): DurationScale | undefined {
  return durationScale.find(duration => duration.name === name)
}

export function getDurationByClass(className: string): DurationScale | undefined {
  return durationScale.find(duration => duration.class === className)
}

export function getDurationByCategory(category: 'instant' | 'fast' | 'normal' | 'slow' | 'very-slow'): DurationScale[] {
  return durationScale.filter(duration => duration.category === category)
}

export function getMicroInteractionByName(name: string): MicroInteraction | undefined {
  return microInteractions.find(interaction => interaction.name === name)
}

export function getMicroInteractionsByCategory(category: 'feedback' | 'navigation' | 'loading' | 'state'): MicroInteraction[] {
  return microInteractions.filter(interaction => interaction.category === category)
}

export function getAnimationTypeByName(name: string): AnimationType | undefined {
  return animationTypes.find(type => type.name === name)
}

export function getAnimationTypesByCategory(category: 'appearance' | 'movement' | 'transformation' | 'rotation'): AnimationType[] {
  return animationTypes.filter(type => type.category === category)
}

export function getAnimationPrincipleByCategory(category: 'purpose' | 'style' | 'accessibility'): AnimationPrinciple[] {
  return animationPrinciples.filter(principle => principle.category === category)
}
