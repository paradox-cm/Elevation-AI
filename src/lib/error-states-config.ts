// Error States Configuration
// Defines all error handling patterns, validation states, feedback types, and error components

export interface ErrorTypeConfig {
  variant: "validation" | "system" | "user" | "warning" | "info"
  severity: "critical" | "error" | "warning" | "info" | "success"
  icon: string
  color: string
  backgroundColor: string
  borderColor: string
  showIcon: boolean
  showTitle: boolean
  showDescription: boolean
  dismissible: boolean
  autoDismiss: boolean
  dismissDelay: number
}

export interface ValidationPatternConfig {
  mode: "inline" | "onSubmit" | "onBlur" | "onChange" | "debounced"
  timing: number
  showRealTime: boolean
  showSummary: boolean
  maxErrors: number
  groupErrors: boolean
  focusFirstError: boolean
  scrollToError: boolean
  errorPosition: "inline" | "below" | "tooltip" | "summary"
}

export interface ErrorMessageConfig {
  style: "clear" | "positive" | "technical" | "friendly"
  tone: "professional" | "casual" | "helpful" | "direct"
  includeCode: boolean
  includeTimestamp: boolean
  includeActions: boolean
  maxLength: number
  truncateLongMessages: boolean
  showSuggestions: boolean
  language: "en" | "es" | "fr" | "de" | "auto"
}

export interface FeedbackTypeConfig {
  variant: "success" | "error" | "warning" | "info" | "loading"
  position: "top" | "bottom" | "inline" | "toast" | "modal" | "banner"
  animation: "slide" | "fade" | "scale" | "bounce" | "none"
  duration: number
  showProgress: boolean
  showActions: boolean
  actions: Array<{
    label: string
    action: string
    variant: "primary" | "secondary" | "outline" | "ghost"
  }>
  autoHide: boolean
  autoHideDelay: number
}

export interface ErrorBoundaryConfig {
  fallbackType: "simple" | "detailed" | "custom"
  showErrorDetails: boolean
  showReloadButton: boolean
  showReportButton: boolean
  logErrors: boolean
  reportErrors: boolean
  customFallback: string | null
  errorReportingService: "sentry" | "logrocket" | "custom" | "none"
}

export interface FormErrorConfig {
  showFieldErrors: boolean
  showFormErrors: boolean
  errorStyle: "inline" | "summary" | "both"
  errorIcon: string
  errorColor: string
  successIcon: string
  successColor: string
  warningIcon: string
  warningColor: string
  fieldErrorPosition: "below" | "right" | "tooltip"
  formErrorPosition: "top" | "bottom" | "inline"
}

export interface AlertConfig {
  variant: "default" | "destructive" | "warning" | "info" | "success"
  size: "sm" | "md" | "lg"
  showIcon: boolean
  showTitle: boolean
  showDescription: boolean
  dismissible: boolean
  autoDismiss: boolean
  dismissDelay: number
  actionButton: boolean
  actionLabel: string
  actionVariant: "default" | "outline" | "ghost"
}

export interface EmptyStateConfig {
  variant: "default" | "search" | "filter" | "error" | "loading"
  showIcon: boolean
  showTitle: boolean
  showDescription: boolean
  showAction: boolean
  actionLabel: string
  actionVariant: "default" | "outline" | "ghost"
  iconSize: "sm" | "md" | "lg" | "xl"
  layout: "centered" | "left" | "right"
  background: "none" | "muted" | "card" | "gradient"
}

export interface ErrorStatesConfig {
  errorTypes: {
    variants: Array<{
      id: string
      name: string
      description: string
      icon: string
      color: string
      backgroundColor: string
      borderColor: string
    }>
    severities: Array<{
      id: string
      name: string
      description: string
      color: string
      priority: number
    }>
    defaultConfig: ErrorTypeConfig
  }
  validationPatterns: {
    modes: Array<{
      id: string
      name: string
      description: string
      timing: number
      className: string
    }>
    positions: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: ValidationPatternConfig
  }
  errorMessages: {
    styles: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    tones: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: ErrorMessageConfig
  }
  feedbackTypes: {
    variants: Array<{
      id: string
      name: string
      description: string
      icon: string
      color: string
      backgroundColor: string
    }>
    positions: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    animations: Array<{
      id: string
      name: string
      description: string
      className: string
      duration: number
    }>
    defaultConfig: FeedbackTypeConfig
  }
  errorBoundaries: {
    fallbackTypes: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    services: Array<{
      id: string
      name: string
      description: string
      config: Record<string, unknown>
    }>
    defaultConfig: ErrorBoundaryConfig
  }
  formErrors: {
    styles: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    positions: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: FormErrorConfig
  }
  alerts: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      iconClass: string
    }>
    sizes: Array<{
      id: string
      name: string
      className: string
      padding: string
    }>
    defaultConfig: AlertConfig
  }
  emptyStates: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      iconClass: string
    }>
    layouts: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    backgrounds: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: EmptyStateConfig
  }
}

export const errorStatesConfig: ErrorStatesConfig = {
  errorTypes: {
    variants: [
      {
        id: "validation",
        name: "Validation Error",
        description: "Errors that occur when user input doesn't meet requirements",
        icon: "error-warning-line",
        color: "#ef4444",
        backgroundColor: "#fef2f2",
        borderColor: "#fecaca"
      },
      {
        id: "system",
        name: "System Error",
        description: "Errors that occur due to technical issues or server problems",
        icon: "server-line",
        color: "#dc2626",
        backgroundColor: "#fef2f2",
        borderColor: "#fca5a5"
      },
      {
        id: "user",
        name: "User Error",
        description: "Errors that occur due to user actions or decisions",
        icon: "user-line",
        color: "#ea580c",
        backgroundColor: "#fff7ed",
        borderColor: "#fed7aa"
      },
      {
        id: "warning",
        name: "Warning",
        description: "Non-critical issues that users should be aware of",
        icon: "alert-line",
        color: "#d97706",
        backgroundColor: "#fffbeb",
        borderColor: "#fde68a"
      },
      {
        id: "info",
        name: "Information",
        description: "Helpful information and guidance for users",
        icon: "information-line",
        color: "#2563eb",
        backgroundColor: "#eff6ff",
        borderColor: "#bfdbfe"
      }
    ],
    severities: [
      {
        id: "critical",
        name: "Critical",
        description: "Critical errors that prevent functionality",
        color: "#dc2626",
        priority: 1
      },
      {
        id: "error",
        name: "Error",
        description: "Standard errors that need attention",
        color: "#ef4444",
        priority: 2
      },
      {
        id: "warning",
        name: "Warning",
        description: "Warnings that should be addressed",
        color: "#f59e0b",
        priority: 3
      },
      {
        id: "info",
        name: "Info",
        description: "Informational messages",
        color: "#3b82f6",
        priority: 4
      },
      {
        id: "success",
        name: "Success",
        description: "Success confirmations",
        color: "#10b981",
        priority: 5
      }
    ],
    defaultConfig: {
      variant: "validation",
      severity: "error",
      icon: "error-warning-line",
      color: "#ef4444",
      backgroundColor: "#fef2f2",
      borderColor: "#fecaca",
      showIcon: true,
      showTitle: true,
      showDescription: true,
      dismissible: false,
      autoDismiss: false,
      dismissDelay: 5000
    }
  },
  validationPatterns: {
    modes: [
      {
        id: "inline",
        name: "Inline Validation",
        description: "Real-time validation as users type",
        timing: 0,
        className: "validation-inline"
      },
      {
        id: "onSubmit",
        name: "On Submit Validation",
        description: "Validation occurs when form is submitted",
        timing: 0,
        className: "validation-on-submit"
      },
      {
        id: "onBlur",
        name: "On Blur Validation",
        description: "Validation occurs when users leave a field",
        timing: 0,
        className: "validation-on-blur"
      },
      {
        id: "onChange",
        name: "On Change Validation",
        description: "Validation occurs on every change",
        timing: 0,
        className: "validation-on-change"
      },
      {
        id: "debounced",
        name: "Debounced Validation",
        description: "Validation occurs after user stops typing",
        timing: 500,
        className: "validation-debounced"
      }
    ],
    positions: [
      {
        id: "inline",
        name: "Inline Position",
        description: "Errors displayed inline with fields",
        className: "error-position-inline"
      },
      {
        id: "below",
        name: "Below Position",
        description: "Errors displayed below fields",
        className: "error-position-below"
      },
      {
        id: "tooltip",
        name: "Tooltip Position",
        description: "Errors displayed in tooltips",
        className: "error-position-tooltip"
      },
      {
        id: "summary",
        name: "Summary Position",
        description: "Errors displayed in a summary section",
        className: "error-position-summary"
      }
    ],
    defaultConfig: {
      mode: "onBlur",
      timing: 300,
      showRealTime: false,
      showSummary: true,
      maxErrors: 5,
      groupErrors: true,
      focusFirstError: true,
      scrollToError: true,
      errorPosition: "below"
    }
  },
  errorMessages: {
    styles: [
      {
        id: "clear",
        name: "Clear Style",
        description: "Direct and straightforward error messages",
        className: "error-message-clear"
      },
      {
        id: "positive",
        name: "Positive Style",
        description: "Focus on what users can do to fix the error",
        className: "error-message-positive"
      },
      {
        id: "technical",
        name: "Technical Style",
        description: "Detailed technical information for developers",
        className: "error-message-technical"
      },
      {
        id: "friendly",
        name: "Friendly Style",
        description: "Warm and approachable error messages",
        className: "error-message-friendly"
      }
    ],
    tones: [
      {
        id: "professional",
        name: "Professional",
        description: "Formal and business-like tone",
        className: "error-tone-professional"
      },
      {
        id: "casual",
        name: "Casual",
        description: "Relaxed and informal tone",
        className: "error-tone-casual"
      },
      {
        id: "helpful",
        name: "Helpful",
        description: "Supportive and guidance-focused tone",
        className: "error-tone-helpful"
      },
      {
        id: "direct",
        name: "Direct",
        description: "Straightforward and concise tone",
        className: "error-tone-direct"
      }
    ],
    defaultConfig: {
      style: "clear",
      tone: "helpful",
      includeCode: false,
      includeTimestamp: false,
      includeActions: true,
      maxLength: 200,
      truncateLongMessages: true,
      showSuggestions: true,
      language: "en"
    }
  },
  feedbackTypes: {
    variants: [
      {
        id: "success",
        name: "Success Feedback",
        description: "Positive confirmation when actions complete successfully",
        icon: "check-line",
        color: "#10b981",
        backgroundColor: "#ecfdf5"
      },
      {
        id: "error",
        name: "Error Feedback",
        description: "Clear indication when something goes wrong",
        icon: "close-line",
        color: "#ef4444",
        backgroundColor: "#fef2f2"
      },
      {
        id: "warning",
        name: "Warning Feedback",
        description: "Cautionary information about potential issues",
        icon: "alert-line",
        color: "#f59e0b",
        backgroundColor: "#fffbeb"
      },
      {
        id: "info",
        name: "Info Feedback",
        description: "Helpful information and guidance for users",
        icon: "information-line",
        color: "#3b82f6",
        backgroundColor: "#eff6ff"
      },
      {
        id: "loading",
        name: "Loading Feedback",
        description: "Indication that an action is in progress",
        icon: "loader-4-line",
        color: "#6b7280",
        backgroundColor: "#f9fafb"
      }
    ],
    positions: [
      {
        id: "top",
        name: "Top Position",
        description: "Feedback displayed at the top of the page",
        className: "feedback-position-top"
      },
      {
        id: "bottom",
        name: "Bottom Position",
        description: "Feedback displayed at the bottom of the page",
        className: "feedback-position-bottom"
      },
      {
        id: "inline",
        name: "Inline Position",
        description: "Feedback displayed inline with content",
        className: "feedback-position-inline"
      },
      {
        id: "toast",
        name: "Toast Position",
        description: "Feedback displayed as toast notifications",
        className: "feedback-position-toast"
      },
      {
        id: "modal",
        name: "Modal Position",
        description: "Feedback displayed in modal dialogs",
        className: "feedback-position-modal"
      },
      {
        id: "banner",
        name: "Banner Position",
        description: "Feedback displayed as banner notifications",
        className: "feedback-position-banner"
      }
    ],
    animations: [
      {
        id: "slide",
        name: "Slide Animation",
        description: "Smooth slide-in animation",
        className: "animate-slide-in",
        duration: 300
      },
      {
        id: "fade",
        name: "Fade Animation",
        description: "Gentle fade-in animation",
        className: "animate-fade-in",
        duration: 200
      },
      {
        id: "scale",
        name: "Scale Animation",
        description: "Scale-in animation",
        className: "animate-scale-in",
        duration: 250
      },
      {
        id: "bounce",
        name: "Bounce Animation",
        description: "Bouncy entrance animation",
        className: "animate-bounce-in",
        duration: 400
      },
      {
        id: "none",
        name: "No Animation",
        description: "No animation effects",
        className: "",
        duration: 0
      }
    ],
    defaultConfig: {
      variant: "info",
      position: "top",
      animation: "slide",
      duration: 300,
      showProgress: false,
      showActions: false,
      actions: [],
      autoHide: false,
      autoHideDelay: 5000
    }
  },
  errorBoundaries: {
    fallbackTypes: [
      {
        id: "simple",
        name: "Simple Fallback",
        description: "Basic error boundary with minimal information",
        className: "error-boundary-simple"
      },
      {
        id: "detailed",
        name: "Detailed Fallback",
        description: "Error boundary with detailed error information",
        className: "error-boundary-detailed"
      },
      {
        id: "custom",
        name: "Custom Fallback",
        description: "Custom error boundary component",
        className: "error-boundary-custom"
      }
    ],
    services: [
      {
        id: "sentry",
        name: "Sentry",
        description: "Sentry error reporting service",
        config: {
          dsn: "",
          environment: "production",
          release: "1.0.0"
        }
      },
      {
        id: "logrocket",
        name: "LogRocket",
        description: "LogRocket error reporting service",
        config: {
          appId: "",
          dom: {
            inputSanitizer: true
          }
        }
      },
      {
        id: "custom",
        name: "Custom Service",
        description: "Custom error reporting service",
        config: {
          endpoint: "",
          headers: {},
          method: "POST"
        }
      },
      {
        id: "none",
        name: "No Reporting",
        description: "No error reporting service",
        config: {}
      }
    ],
    defaultConfig: {
      fallbackType: "simple",
      showErrorDetails: false,
      showReloadButton: true,
      showReportButton: false,
      logErrors: true,
      reportErrors: false,
      customFallback: null,
      errorReportingService: "none"
    }
  },
  formErrors: {
    styles: [
      {
        id: "inline",
        name: "Inline Style",
        description: "Errors displayed inline with form fields",
        className: "form-error-inline"
      },
      {
        id: "summary",
        name: "Summary Style",
        description: "Errors displayed in a summary section",
        className: "form-error-summary"
      },
      {
        id: "both",
        name: "Both Styles",
        description: "Combination of inline and summary error display",
        className: "form-error-both"
      }
    ],
    positions: [
      {
        id: "below",
        name: "Below Position",
        description: "Errors displayed below form fields",
        className: "form-error-below"
      },
      {
        id: "right",
        name: "Right Position",
        description: "Errors displayed to the right of form fields",
        className: "form-error-right"
      },
      {
        id: "tooltip",
        name: "Tooltip Position",
        description: "Errors displayed in tooltips",
        className: "form-error-tooltip"
      }
    ],
    defaultConfig: {
      showFieldErrors: true,
      showFormErrors: true,
      errorStyle: "inline",
      errorIcon: "error-warning-line",
      errorColor: "#ef4444",
      successIcon: "check-line",
      successColor: "#10b981",
      warningIcon: "alert-line",
      warningColor: "#f59e0b",
      fieldErrorPosition: "below",
      formErrorPosition: "top"
    }
  },
  alerts: {
    variants: [
      {
        id: "default",
        name: "Default Alert",
        description: "Standard alert with neutral styling",
        className: "alert-default",
        iconClass: "text-foreground"
      },
      {
        id: "destructive",
        name: "Destructive Alert",
        description: "Alert for critical errors and destructive actions",
        className: "alert-destructive",
        iconClass: "text-destructive"
      },
      {
        id: "warning",
        name: "Warning Alert",
        description: "Alert for warnings and cautionary information",
        className: "alert-warning",
        iconClass: "text-warning"
      },
      {
        id: "info",
        name: "Info Alert",
        description: "Alert for informational messages",
        className: "alert-info",
        iconClass: "text-info"
      },
      {
        id: "success",
        name: "Success Alert",
        description: "Alert for successful actions and confirmations",
        className: "alert-success",
        iconClass: "text-success"
      }
    ],
    sizes: [
      {
        id: "sm",
        name: "Small",
        className: "alert-sm",
        padding: "p-2"
      },
      {
        id: "md",
        name: "Medium",
        className: "alert-md",
        padding: "p-4"
      },
      {
        id: "lg",
        name: "Large",
        className: "alert-lg",
        padding: "p-6"
      }
    ],
    defaultConfig: {
      variant: "default",
      size: "md",
      showIcon: true,
      showTitle: true,
      showDescription: true,
      dismissible: false,
      autoDismiss: false,
      dismissDelay: 5000,
      actionButton: false,
      actionLabel: "Action",
      actionVariant: "default"
    }
  },
  emptyStates: {
    variants: [
      {
        id: "default",
        name: "Default Empty State",
        description: "Standard empty state for general use",
        className: "empty-state-default",
        iconClass: "text-muted-foreground"
      },
      {
        id: "search",
        name: "Search Empty State",
        description: "Empty state for search results",
        className: "empty-state-search",
        iconClass: "text-muted-foreground"
      },
      {
        id: "filter",
        name: "Filter Empty State",
        description: "Empty state for filtered results",
        className: "empty-state-filter",
        iconClass: "text-muted-foreground"
      },
      {
        id: "error",
        name: "Error Empty State",
        description: "Empty state for error conditions",
        className: "empty-state-error",
        iconClass: "text-destructive"
      },
      {
        id: "loading",
        name: "Loading Empty State",
        description: "Empty state for loading conditions",
        className: "empty-state-loading",
        iconClass: "text-muted-foreground"
      }
    ],
    layouts: [
      {
        id: "centered",
        name: "Centered Layout",
        description: "Content centered in the container",
        className: "empty-state-centered"
      },
      {
        id: "left",
        name: "Left Layout",
        description: "Content aligned to the left",
        className: "empty-state-left"
      },
      {
        id: "right",
        name: "Right Layout",
        description: "Content aligned to the right",
        className: "empty-state-right"
      }
    ],
    backgrounds: [
      {
        id: "none",
        name: "No Background",
        description: "No background styling",
        className: "empty-state-bg-none"
      },
      {
        id: "muted",
        name: "Muted Background",
        description: "Subtle muted background",
        className: "empty-state-bg-muted"
      },
      {
        id: "card",
        name: "Card Background",
        description: "Card-style background",
        className: "empty-state-bg-card"
      },
      {
        id: "gradient",
        name: "Gradient Background",
        description: "Gradient background styling",
        className: "empty-state-bg-gradient"
      }
    ],
    defaultConfig: {
      variant: "default",
      showIcon: true,
      showTitle: true,
      showDescription: true,
      showAction: false,
      actionLabel: "Get Started",
      actionVariant: "default",
      iconSize: "lg",
      layout: "centered",
      background: "none"
    }
  }
}

// Helper functions to get specific configurations
export function getErrorTypeVariant(variantId: string) {
  return errorStatesConfig.errorTypes.variants.find(v => v.id === variantId)
}

export function getValidationPatternMode(modeId: string) {
  return errorStatesConfig.validationPatterns.modes.find(m => m.id === modeId)
}

export function getErrorMessageStyle(styleId: string) {
  return errorStatesConfig.errorMessages.styles.find(s => s.id === styleId)
}

export function getFeedbackTypeVariant(variantId: string) {
  return errorStatesConfig.feedbackTypes.variants.find(v => v.id === variantId)
}

export function getErrorBoundaryFallbackType(typeId: string) {
  return errorStatesConfig.errorBoundaries.fallbackTypes.find(t => t.id === typeId)
}

export function getFormErrorStyle(styleId: string) {
  return errorStatesConfig.formErrors.styles.find(s => s.id === styleId)
}

export function getAlertVariant(variantId: string) {
  return errorStatesConfig.alerts.variants.find(v => v.id === variantId)
}

export function getEmptyStateVariant(variantId: string) {
  return errorStatesConfig.emptyStates.variants.find(v => v.id === variantId)
}
