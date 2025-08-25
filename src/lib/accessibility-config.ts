// Accessibility Configuration
// Defines all accessibility standards, WCAG compliance levels, testing methods, and accessibility features

export interface WCAGLevelConfig {
  level: "A" | "AA" | "AAA"
  name: string
  description: string
  compliance: string
  requirements: string[]
  examples: string[]
  priority: number
  mandatory: boolean
  testingMethods: string[]
}

export interface AccessibilityPrincipleConfig {
  principle: "perceivable" | "operable" | "understandable" | "robust"
  title: string
  description: string
  icon: string
  guidelines: string[]
  successCriteria: string[]
  testingApproach: string
  tools: string[]
}

export interface ColorContrastConfig {
  type: "normal" | "large" | "ui" | "graphics"
  ratio: string
  description: string
  examples: string[]
  testMethod: string
  tools: string[]
  minimumRatio: number
  recommendedRatio: number
}

export interface KeyboardNavigationConfig {
  feature: "tabNavigation" | "focusIndicators" | "skipLinks" | "shortcuts" | "trapping"
  name: string
  description: string
  requirements: string[]
  examples: string[]
  implementation: string
  testing: string[]
  priority: "critical" | "high" | "medium" | "low"
}

export interface ScreenReaderConfig {
  feature: "semanticHTML" | "ariaAttributes" | "liveRegions" | "landmarks" | "headings"
  name: string
  description: string
  requirements: string[]
  examples: string[]
  testing: string[]
  tools: string[]
  priority: "critical" | "high" | "medium" | "low"
}

export interface FocusManagementConfig {
  type: "indicators" | "trapping" | "restoration" | "order"
  name: string
  description: string
  implementation: string
  cssClasses: string[]
  testing: string[]
  bestPractices: string[]
}

export interface TestingToolConfig {
  name: string
  type: "automated" | "manual" | "assistive" | "browser"
  description: string
  features: string[]
  url?: string
  cost: "free" | "paid" | "freemium"
  integration: string[]
  limitations: string[]
}

export interface AccessibilityAuditConfig {
  type: "automated" | "manual" | "user" | "expert"
  name: string
  description: string
  scope: string[]
  duration: string
  tools: string[]
  checklist: string[]
  reporting: string[]
}

export interface ComplianceConfig {
  standard: "WCAG2.1" | "WCAG2.2" | "ADA" | "Section508" | "EN301549"
  name: string
  description: string
  requirements: string[]
  levels: string[]
  testing: string[]
  documentation: string[]
  legal: string[]
}

export interface AccessibilityConfig {
  wcagLevels: {
    levels: Array<{
      id: string
      name: string
      description: string
      compliance: string
      className: string
    }>
    priorities: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: WCAGLevelConfig
  }
  principles: {
    types: Array<{
      id: string
      name: string
      description: string
      icon: string
      className: string
    }>
    guidelines: Array<{
      id: string
      name: string
      description: string
      category: string
      className: string
    }>
    defaultConfig: AccessibilityPrincipleConfig
  }
  colorContrast: {
    types: Array<{
      id: string
      name: string
      description: string
      ratio: string
      className: string
    }>
    tools: Array<{
      id: string
      name: string
      description: string
      url: string
      className: string
    }>
    defaultConfig: ColorContrastConfig
  }
  keyboardNavigation: {
    features: Array<{
      id: string
      name: string
      description: string
      priority: string
      className: string
    }>
    testing: Array<{
      id: string
      name: string
      description: string
      method: string
      className: string
    }>
    defaultConfig: KeyboardNavigationConfig
  }
  screenReaders: {
    features: Array<{
      id: string
      name: string
      description: string
      priority: string
      className: string
    }>
    tools: Array<{
      id: string
      name: string
      description: string
      platform: string
      className: string
    }>
    defaultConfig: ScreenReaderConfig
  }
  focusManagement: {
    types: Array<{
      id: string
      name: string
      description: string
      implementation: string
      className: string
    }>
    styles: Array<{
      id: string
      name: string
      description: string
      cssClass: string
      className: string
    }>
    defaultConfig: FocusManagementConfig
  }
  testingTools: {
    categories: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    tools: Array<{
      id: string
      name: string
      description: string
      type: string
      className: string
    }>
    defaultConfig: TestingToolConfig
  }
  audits: {
    types: Array<{
      id: string
      name: string
      description: string
      scope: string
      className: string
    }>
    methods: Array<{
      id: string
      name: string
      description: string
      duration: string
      className: string
    }>
    defaultConfig: AccessibilityAuditConfig
  }
  compliance: {
    standards: Array<{
      id: string
      name: string
      description: string
      region: string
      className: string
    }>
    requirements: Array<{
      id: string
      name: string
      description: string
      standard: string
      className: string
    }>
    defaultConfig: ComplianceConfig
  }
}

export const accessibilityConfig: AccessibilityConfig = {
  wcagLevels: {
    levels: [
      {
        id: "wcag-a",
        name: "WCAG A",
        description: "Basic accessibility requirements",
        compliance: "Minimum compliance level",
        className: "wcag-level-a"
      },
      {
        id: "wcag-aa",
        name: "WCAG AA",
        description: "Standard accessibility requirements",
        compliance: "Recommended compliance level",
        className: "wcag-level-aa"
      },
      {
        id: "wcag-aaa",
        name: "WCAG AAA",
        description: "Enhanced accessibility requirements",
        compliance: "Highest compliance level",
        className: "wcag-level-aaa"
      }
    ],
    priorities: [
      {
        id: "critical",
        name: "Critical",
        description: "Must be implemented for basic accessibility",
        className: "priority-critical"
      },
      {
        id: "high",
        name: "High",
        description: "Important for good accessibility",
        className: "priority-high"
      },
      {
        id: "medium",
        name: "Medium",
        description: "Improves accessibility experience",
        className: "priority-medium"
      },
      {
        id: "low",
        name: "Low",
        description: "Nice to have for enhanced accessibility",
        className: "priority-low"
      }
    ],
    defaultConfig: {
      level: "AA",
      name: "WCAG AA",
      description: "Standard accessibility requirements",
      compliance: "Recommended compliance level",
      requirements: [
        "Color contrast ratios of 4.5:1 for normal text",
        "Keyboard navigation for all functionality",
        "Focus indicators for interactive elements",
        "Alt text for images",
        "Form labels and error identification"
      ],
      examples: [
        "Keyboard navigation",
        "Alt text for images",
        "Form labels",
        "Color contrast ratios",
        "Focus indicators",
        "Error identification"
      ],
      priority: 2,
      mandatory: true,
      testingMethods: [
        "Automated testing with axe-core",
        "Manual keyboard navigation testing",
        "Screen reader testing",
        "Color contrast analysis"
      ]
    }
  },
  principles: {
    types: [
      {
        id: "perceivable",
        name: "Perceivable",
        description: "Information must be presentable to users in ways they can perceive",
        icon: "eye-line",
        className: "principle-perceivable"
      },
      {
        id: "operable",
        name: "Operable",
        description: "User interface components must be operable by all users",
        icon: "mouse-line",
        className: "principle-operable"
      },
      {
        id: "understandable",
        name: "Understandable",
        description: "Information and operation must be understandable",
        icon: "lightbulb-line",
        className: "principle-understandable"
      },
      {
        id: "robust",
        name: "Robust",
        description: "Content must be robust enough for various user agents",
        icon: "shield-check-line",
        className: "principle-robust"
      }
    ],
    guidelines: [
      {
        id: "text-alternatives",
        name: "Text Alternatives",
        description: "Provide text alternatives for non-text content",
        category: "perceivable",
        className: "guideline-text-alternatives"
      },
      {
        id: "keyboard-accessible",
        name: "Keyboard Accessible",
        description: "Make all functionality available from a keyboard",
        category: "operable",
        className: "guideline-keyboard-accessible"
      },
      {
        id: "readable",
        name: "Readable",
        description: "Make text readable and understandable",
        category: "understandable",
        className: "guideline-readable"
      },
      {
        id: "compatible",
        name: "Compatible",
        description: "Maximize compatibility with user tools",
        category: "robust",
        className: "guideline-compatible"
      }
    ],
    defaultConfig: {
      principle: "perceivable",
      title: "Perceivable",
      description: "Information and user interface components must be presentable to users in ways they can perceive.",
      icon: "eye-line",
      guidelines: [
        "Provide text alternatives for non-text content",
        "Create content that can be presented in different ways",
        "Make it easier for users to see and hear content"
      ],
      successCriteria: [
        "1.1.1 Non-text Content",
        "1.2.1 Audio-only and Video-only",
        "1.3.1 Info and Relationships",
        "1.4.1 Use of Color"
      ],
      testingApproach: "Manual testing with assistive technologies",
      tools: ["Screen readers", "Color contrast analyzers", "Keyboard navigation"]
    }
  },
  colorContrast: {
    types: [
      {
        id: "normal-text",
        name: "Normal Text",
        description: "Minimum contrast for normal text",
        ratio: "4.5:1",
        className: "contrast-normal-text"
      },
      {
        id: "large-text",
        name: "Large Text",
        description: "Minimum contrast for large text (18pt+)",
        ratio: "3:1",
        className: "contrast-large-text"
      },
      {
        id: "ui-components",
        name: "UI Components",
        description: "Minimum contrast for UI elements",
        ratio: "3:1",
        className: "contrast-ui-components"
      },
      {
        id: "graphics",
        name: "Graphics",
        description: "Minimum contrast for graphics and icons",
        ratio: "3:1",
        className: "contrast-graphics"
      }
    ],
    tools: [
      {
        id: "axe",
        name: "axe DevTools",
        description: "Browser extension for automated testing",
        url: "https://www.deque.com/axe/",
        className: "tool-axe"
      },
      {
        id: "wave",
        name: "WAVE",
        description: "Web accessibility evaluation tool",
        url: "https://wave.webaim.org/",
        className: "tool-wave"
      },
      {
        id: "contrast-checker",
        name: "WebAIM Contrast Checker",
        description: "Color contrast ratio calculator",
        url: "https://webaim.org/resources/contrastchecker/",
        className: "tool-contrast-checker"
      }
    ],
    defaultConfig: {
      type: "normal",
      ratio: "4.5:1",
      description: "Minimum contrast for normal text",
      examples: ["Body text", "Paragraphs", "Descriptions", "Form labels"],
      testMethod: "Automated testing with color contrast analyzers",
      tools: ["axe DevTools", "WAVE", "WebAIM Contrast Checker"],
      minimumRatio: 4.5,
      recommendedRatio: 7.0
    }
  },
  keyboardNavigation: {
    features: [
      {
        id: "tab-navigation",
        name: "Tab Navigation",
        description: "All interactive elements must be reachable via keyboard",
        priority: "critical",
        className: "feature-tab-navigation"
      },
      {
        id: "focus-indicators",
        name: "Focus Indicators",
        description: "Clear visual indication of keyboard focus",
        priority: "critical",
        className: "feature-focus-indicators"
      },
      {
        id: "skip-links",
        name: "Skip Links",
        description: "Allow users to skip to main content",
        priority: "high",
        className: "feature-skip-links"
      },
      {
        id: "keyboard-shortcuts",
        name: "Keyboard Shortcuts",
        description: "Provide keyboard shortcuts for common actions",
        priority: "medium",
        className: "feature-keyboard-shortcuts"
      },
      {
        id: "focus-trapping",
        name: "Focus Trapping",
        description: "Keep focus within modal dialogs",
        priority: "high",
        className: "feature-focus-trapping"
      }
    ],
    testing: [
      {
        id: "tab-through",
        name: "Tab Through Elements",
        description: "Test tab navigation through all interactive elements",
        method: "Manual testing",
        className: "testing-tab-through"
      },
      {
        id: "focus-visible",
        name: "Focus Indicators",
        description: "Verify focus indicators are visible and clear",
        method: "Visual inspection",
        className: "testing-focus-visible"
      },
      {
        id: "keyboard-functionality",
        name: "Keyboard Functionality",
        description: "Test all functionality with keyboard only",
        method: "Manual testing",
        className: "testing-keyboard-functionality"
      }
    ],
    defaultConfig: {
      feature: "tabNavigation",
      name: "Tab Navigation",
      description: "All interactive elements must be reachable via keyboard",
      requirements: [
        "All interactive elements must be focusable",
        "Logical tab order",
        "No keyboard traps",
        "Skip navigation links"
      ],
      examples: ["Buttons", "Links", "Form inputs", "Custom controls", "Dropdowns"],
      implementation: "Use semantic HTML and proper tabindex values",
      testing: [
        "Tab through all interactive elements",
        "Verify focus indicators are visible",
        "Test all functionality with keyboard",
        "Check for keyboard traps"
      ],
      priority: "critical"
    }
  },
  screenReaders: {
    features: [
      {
        id: "semantic-html",
        name: "Semantic HTML",
        description: "Use proper HTML semantics for better accessibility",
        priority: "critical",
        className: "feature-semantic-html"
      },
      {
        id: "aria-attributes",
        name: "ARIA Attributes",
        description: "Use ARIA attributes to enhance accessibility",
        priority: "high",
        className: "feature-aria-attributes"
      },
      {
        id: "live-regions",
        name: "Live Regions",
        description: "Announce dynamic content changes",
        priority: "high",
        className: "feature-live-regions"
      },
      {
        id: "landmarks",
        name: "Landmarks",
        description: "Use landmark roles for page structure",
        priority: "high",
        className: "feature-landmarks"
      },
      {
        id: "headings",
        name: "Heading Structure",
        description: "Proper heading hierarchy for navigation",
        priority: "critical",
        className: "feature-headings"
      }
    ],
    tools: [
      {
        id: "nvda",
        name: "NVDA",
        description: "Free screen reader for Windows",
        platform: "Windows",
        className: "tool-nvda"
      },
      {
        id: "jaws",
        name: "JAWS",
        description: "Professional screen reader for Windows",
        platform: "Windows",
        className: "tool-jaws"
      },
      {
        id: "voiceover",
        name: "VoiceOver",
        description: "Built-in screen reader for macOS",
        platform: "macOS",
        className: "tool-voiceover"
      },
      {
        id: "talkback",
        name: "TalkBack",
        description: "Built-in screen reader for Android",
        platform: "Android",
        className: "tool-talkback"
      }
    ],
    defaultConfig: {
      feature: "semanticHTML",
      name: "Semantic HTML",
      description: "Use proper HTML semantics for better accessibility",
      requirements: [
        "Use semantic HTML elements",
        "Provide proper heading structure",
        "Use landmarks for page structure",
        "Include alt text for images"
      ],
      examples: [
        "<button> for buttons",
        "<nav> for navigation",
        "<main> for main content",
        "<h1> to <h6> for headings"
      ],
      testing: [
        "Test with NVDA or VoiceOver",
        "Verify proper heading structure",
        "Check alt text for images",
        "Test form labels and errors"
      ],
      tools: ["NVDA", "JAWS", "VoiceOver", "TalkBack"],
      priority: "critical"
    }
  },
  focusManagement: {
    types: [
      {
        id: "indicators",
        name: "Focus Indicators",
        description: "Visual indicators for keyboard focus",
        implementation: "CSS focus styles",
        className: "focus-indicators"
      },
      {
        id: "trapping",
        name: "Focus Trapping",
        description: "Keep focus within modal dialogs",
        implementation: "JavaScript focus management",
        className: "focus-trapping"
      },
      {
        id: "restoration",
        name: "Focus Restoration",
        description: "Restore focus when dialogs close",
        implementation: "JavaScript focus restoration",
        className: "focus-restoration"
      },
      {
        id: "order",
        name: "Focus Order",
        description: "Logical tab order for elements",
        implementation: "HTML structure and tabindex",
        className: "focus-order"
      }
    ],
    styles: [
      {
        id: "outline",
        name: "Outline Style",
        description: "Standard browser outline",
        cssClass: "focus:outline focus:outline-2 focus:outline-primary",
        className: "focus-style-outline"
      },
      {
        id: "ring",
        name: "Ring Style",
        description: "Custom focus ring",
        cssClass: "focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className: "focus-style-ring"
      },
      {
        id: "highlight",
        name: "Highlight Style",
        description: "Background highlight",
        cssClass: "focus:bg-primary/10 focus:border-primary",
        className: "focus-style-highlight"
      }
    ],
    defaultConfig: {
      type: "indicators",
      name: "Focus Indicators",
      description: "Visual indicators for keyboard focus",
      implementation: "CSS focus styles with high contrast",
      cssClasses: [
        "focus:outline-2",
        "focus:outline-primary",
        "focus:outline-offset-2"
      ],
      testing: [
        "Tab through all interactive elements",
        "Verify focus indicators are visible",
        "Test with high contrast mode",
        "Check focus indicators in different themes"
      ],
      bestPractices: [
        "Use high contrast colors",
        "Ensure sufficient size",
        "Maintain consistent styling",
        "Test with different themes"
      ]
    }
  },
  testingTools: {
    categories: [
      {
        id: "automated",
        name: "Automated Testing",
        description: "Tools that automatically detect accessibility issues",
        className: "category-automated"
      },
      {
        id: "manual",
        name: "Manual Testing",
        description: "Tools that require human interaction",
        className: "category-manual"
      },
      {
        id: "assistive",
        name: "Assistive Technology",
        description: "Screen readers and other assistive tools",
        className: "category-assistive"
      },
      {
        id: "browser",
        name: "Browser Tools",
        description: "Built-in browser accessibility features",
        className: "category-browser"
      }
    ],
    tools: [
      {
        id: "axe",
        name: "axe DevTools",
        description: "Browser extension for automated testing",
        type: "automated",
        className: "tool-axe"
      },
      {
        id: "wave",
        name: "WAVE",
        description: "Web accessibility evaluation tool",
        type: "automated",
        className: "tool-wave"
      },
      {
        id: "lighthouse",
        name: "Lighthouse",
        description: "Google's automated testing tool",
        type: "automated",
        className: "tool-lighthouse"
      },
      {
        id: "nvda",
        name: "NVDA",
        description: "Free screen reader for Windows",
        type: "assistive",
        className: "tool-nvda"
      }
    ],
    defaultConfig: {
      name: "axe DevTools",
      type: "automated",
      description: "Browser extension for automated accessibility testing",
      features: [
        "Automated testing",
        "Issue reporting",
        "WCAG compliance",
        "Integration with CI/CD"
      ],
      url: "https://www.deque.com/axe/",
      cost: "free",
      integration: ["Chrome", "Firefox", "Edge", "CI/CD pipelines"],
      limitations: [
        "Cannot detect all manual testing issues",
        "Requires human verification",
        "May have false positives"
      ]
    }
  },
  audits: {
    types: [
      {
        id: "automated",
        name: "Automated Audit",
        description: "Using tools to automatically detect issues",
        scope: "Code analysis and basic accessibility checks",
        className: "audit-automated"
      },
      {
        id: "manual",
        name: "Manual Audit",
        description: "Human testing of accessibility features",
        scope: "Keyboard navigation, screen reader testing",
        className: "audit-manual"
      },
      {
        id: "user",
        name: "User Testing",
        description: "Testing with actual users with disabilities",
        scope: "Real-world usage scenarios",
        className: "audit-user"
      },
      {
        id: "expert",
        name: "Expert Review",
        description: "Review by accessibility experts",
        scope: "Comprehensive accessibility assessment",
        className: "audit-expert"
      }
    ],
    methods: [
      {
        id: "quick",
        name: "Quick Audit",
        description: "Basic accessibility check",
        duration: "1-2 hours",
        className: "method-quick"
      },
      {
        id: "standard",
        name: "Standard Audit",
        description: "Comprehensive accessibility review",
        duration: "1-2 days",
        className: "method-standard"
      },
      {
        id: "comprehensive",
        name: "Comprehensive Audit",
        description: "Full accessibility assessment",
        duration: "1-2 weeks",
        className: "method-comprehensive"
      }
    ],
    defaultConfig: {
      type: "manual",
      name: "Manual Accessibility Audit",
      description: "Human testing of accessibility features",
      scope: [
        "Keyboard navigation testing",
        "Screen reader compatibility",
        "Color contrast analysis",
        "Form accessibility",
        "Error handling"
      ],
      duration: "1-2 days",
      tools: [
        "axe DevTools",
        "NVDA/VoiceOver",
        "Color contrast checker",
        "Keyboard navigation"
      ],
      checklist: [
        "All interactive elements are keyboard accessible",
        "Focus indicators are visible and clear",
        "Color contrast meets WCAG requirements",
        "Images have appropriate alt text",
        "Forms have proper labels and error messages"
      ],
      reporting: [
        "Issue severity levels",
        "WCAG compliance status",
        "Remediation recommendations",
        "Testing methodology"
      ]
    }
  },
  compliance: {
    standards: [
      {
        id: "wcag21",
        name: "WCAG 2.1",
        description: "Web Content Accessibility Guidelines 2.1",
        region: "International",
        className: "standard-wcag21"
      },
      {
        id: "wcag22",
        name: "WCAG 2.2",
        description: "Web Content Accessibility Guidelines 2.2",
        region: "International",
        className: "standard-wcag22"
      },
      {
        id: "ada",
        name: "ADA",
        description: "Americans with Disabilities Act",
        region: "United States",
        className: "standard-ada"
      },
      {
        id: "section508",
        name: "Section 508",
        description: "Section 508 of the Rehabilitation Act",
        region: "United States",
        className: "standard-section508"
      },
      {
        id: "en301549",
        name: "EN 301 549",
        description: "European accessibility standard",
        region: "European Union",
        className: "standard-en301549"
      }
    ],
    requirements: [
      {
        id: "color-contrast",
        name: "Color Contrast",
        description: "Sufficient color contrast for text and graphics",
        standard: "WCAG 2.1",
        className: "requirement-color-contrast"
      },
      {
        id: "keyboard-navigation",
        name: "Keyboard Navigation",
        description: "All functionality accessible via keyboard",
        standard: "WCAG 2.1",
        className: "requirement-keyboard-navigation"
      },
      {
        id: "screen-reader",
        name: "Screen Reader Support",
        description: "Compatibility with screen readers",
        standard: "WCAG 2.1",
        className: "requirement-screen-reader"
      },
      {
        id: "focus-indicators",
        name: "Focus Indicators",
        description: "Visible focus indicators for keyboard navigation",
        standard: "WCAG 2.1",
        className: "requirement-focus-indicators"
      }
    ],
    defaultConfig: {
      standard: "WCAG2.1",
      name: "WCAG 2.1",
      description: "Web Content Accessibility Guidelines 2.1",
      requirements: [
        "Perceivable - Information must be presentable to users",
        "Operable - User interface must be operable",
        "Understandable - Information must be understandable",
        "Robust - Content must be robust for various user agents"
      ],
      levels: ["A", "AA", "AAA"],
      testing: [
        "Automated testing with accessibility tools",
        "Manual testing with assistive technologies",
        "User testing with people with disabilities",
        "Expert review by accessibility specialists"
      ],
      documentation: [
        "Accessibility statement",
        "Testing reports",
        "Remediation plans",
        "Compliance certificates"
      ],
      legal: [
        "ADA compliance requirements",
        "Section 508 requirements",
        "International accessibility laws",
        "Risk mitigation strategies"
      ]
    }
  }
}

// Helper functions to get specific configurations
export function getWCAGLevel(levelId: string) {
  return accessibilityConfig.wcagLevels.levels.find(l => l.id === levelId)
}

export function getAccessibilityPrinciple(principleId: string) {
  return accessibilityConfig.principles.types.find(p => p.id === principleId)
}

export function getColorContrastType(typeId: string) {
  return accessibilityConfig.colorContrast.types.find(t => t.id === typeId)
}

export function getKeyboardNavigationFeature(featureId: string) {
  return accessibilityConfig.keyboardNavigation.features.find(f => f.id === featureId)
}

export function getScreenReaderFeature(featureId: string) {
  return accessibilityConfig.screenReaders.features.find(f => f.id === featureId)
}

export function getFocusManagementType(typeId: string) {
  return accessibilityConfig.focusManagement.types.find(t => t.id === typeId)
}

export function getTestingTool(toolId: string) {
  return accessibilityConfig.testingTools.tools.find(t => t.id === toolId)
}

export function getAuditType(typeId: string) {
  return accessibilityConfig.audits.types.find(t => t.id === typeId)
}

export function getComplianceStandard(standardId: string) {
  return accessibilityConfig.compliance.standards.find(s => s.id === standardId)
}
