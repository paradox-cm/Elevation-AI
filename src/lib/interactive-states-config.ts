// Interactive States Configuration
// Defines all interactive states, loading patterns, and feedback mechanisms

export interface LoadingSpinnerConfig {
  variant: "default" | "dots" | "pulse" | "ring" | "bars"
  size: "sm" | "md" | "lg" | "xl"
  color: "primary" | "secondary" | "success" | "warning" | "error" | "muted"
  showText: boolean
  textPosition: "top" | "bottom" | "left" | "right"
  animationSpeed: "slow" | "normal" | "fast"
}

export interface LoadingOverlayConfig {
  variant: "default" | "blur" | "dim" | "transparent"
  backdrop: "opaque" | "semi-transparent" | "blur"
  showSpinner: boolean
  showText: boolean
  textPosition: "center" | "bottom"
  closeOnClick: boolean
  closeOnEscape: boolean
}

export interface SkeletonConfig {
  variant: "default" | "card" | "list" | "table" | "avatar" | "text"
  animation: "pulse" | "wave" | "none"
  color: "default" | "muted" | "primary"
  borderRadius: "none" | "sm" | "md" | "lg" | "full"
  height: "sm" | "md" | "lg" | "xl"
}

export interface ToastConfig {
  variant: "success" | "error" | "warning" | "info" | "default"
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
  duration: number
  showIcon: boolean
  showCloseButton: boolean
  autoClose: boolean
  pauseOnHover: boolean
  maxToasts: number
}

export interface ProgressStepsConfig {
  variant: "default" | "numbered" | "dots" | "lines"
  orientation: "horizontal" | "vertical"
  showLabels: boolean
  showDescriptions: boolean
  clickable: boolean
  size: "sm" | "md" | "lg"
  color: "primary" | "secondary" | "success" | "warning" | "error"
}

export interface ButtonStatesConfig {
  loadingVariant: "spinner" | "dots" | "pulse"
  loadingPosition: "left" | "right" | "center"
  disabledOpacity: number
  hoverEffect: "scale" | "glow" | "shadow" | "none"
  focusRing: boolean
  focusRingColor: "primary" | "secondary" | "accent"
}

export interface FormStatesConfig {
  validationStyle: "inline" | "toast" | "modal"
  loadingVariant: "spinner" | "skeleton" | "overlay"
  errorDisplay: "immediate" | "onBlur" | "onSubmit"
  successFeedback: "toast" | "inline" | "both"
  autoSave: boolean
  autoSaveInterval: number
}

export interface InteractiveStatesConfig {
  loadingSpinners: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      animationClass: string
    }>
    sizes: Array<{
      id: string
      name: string
      width: number
      height: number
      className: string
    }>
    colors: Array<{
      id: string
      name: string
      className: string
      hexColor: string
    }>
    defaultConfig: LoadingSpinnerConfig
  }
  loadingOverlays: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      backdropClass: string
    }>
    defaultConfig: LoadingOverlayConfig
  }
  skeletons: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      animationClass: string
    }>
    animations: Array<{
      id: string
      name: string
      className: string
      duration: string
    }>
    defaultConfig: SkeletonConfig
  }
  toasts: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      iconClass: string
    }>
    positions: Array<{
      id: string
      name: string
      className: string
      description: string
    }>
    defaultConfig: ToastConfig
  }
  progressSteps: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      stepClass: string
    }>
    orientations: Array<{
      id: string
      name: string
      className: string
      description: string
    }>
    defaultConfig: ProgressStepsConfig
  }
  buttonStates: {
    loadingVariants: Array<{
      id: string
      name: string
      className: string
      description: string
    }>
    hoverEffects: Array<{
      id: string
      name: string
      className: string
      description: string
    }>
    defaultConfig: ButtonStatesConfig
  }
  formStates: {
    validationStyles: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    loadingVariants: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: FormStatesConfig
  }
}

export const interactiveStatesConfig: InteractiveStatesConfig = {
  loadingSpinners: {
    variants: [
      {
        id: "default",
        name: "Default Spinner",
        description: "Standard circular loading spinner",
        className: "animate-spin",
        animationClass: "animate-spin"
      },
      {
        id: "dots",
        name: "Dots Spinner",
        description: "Animated dots loading indicator",
        className: "flex space-x-1",
        animationClass: "animate-pulse"
      },
      {
        id: "pulse",
        name: "Pulse Spinner",
        description: "Pulsing circle loading indicator",
        className: "animate-pulse",
        animationClass: "animate-pulse"
      },
      {
        id: "ring",
        name: "Ring Spinner",
        description: "Rotating ring loading indicator",
        className: "animate-spin border-2 border-t-transparent",
        animationClass: "animate-spin"
      },
      {
        id: "bars",
        name: "Bars Spinner",
        description: "Animated bars loading indicator",
        className: "flex space-x-1",
        animationClass: "animate-bounce"
      }
    ],
    sizes: [
      {
        id: "sm",
        name: "Small",
        width: 16,
        height: 16,
        className: "w-4 h-4"
      },
      {
        id: "md",
        name: "Medium",
        width: 24,
        height: 24,
        className: "w-6 h-6"
      },
      {
        id: "lg",
        name: "Large",
        width: 32,
        height: 32,
        className: "w-8 h-8"
      },
      {
        id: "xl",
        name: "Extra Large",
        width: 48,
        height: 48,
        className: "w-12 h-12"
      }
    ],
    colors: [
      {
        id: "primary",
        name: "Primary",
        className: "text-primary",
        hexColor: "#3b82f6"
      },
      {
        id: "secondary",
        name: "Secondary",
        className: "text-secondary",
        hexColor: "#6b7280"
      },
      {
        id: "success",
        name: "Success",
        className: "text-green-500",
        hexColor: "#10b981"
      },
      {
        id: "warning",
        name: "Warning",
        className: "text-yellow-500",
        hexColor: "#f59e0b"
      },
      {
        id: "error",
        name: "Error",
        className: "text-red-500",
        hexColor: "#ef4444"
      },
      {
        id: "muted",
        name: "Muted",
        className: "text-muted-foreground",
        hexColor: "#9ca3af"
      }
    ],
    defaultConfig: {
      variant: "default",
      size: "md",
      color: "primary",
      showText: true,
      textPosition: "bottom",
      animationSpeed: "normal"
    }
  },
  loadingOverlays: {
    variants: [
      {
        id: "default",
        name: "Default Overlay",
        description: "Standard loading overlay with backdrop",
        className: "fixed inset-0 z-50",
        backdropClass: "bg-background/80 backdrop-blur-sm"
      },
      {
        id: "blur",
        name: "Blur Overlay",
        description: "Overlay with heavy blur effect",
        className: "fixed inset-0 z-50",
        backdropClass: "bg-background/60 backdrop-blur-md"
      },
      {
        id: "dim",
        name: "Dim Overlay",
        description: "Simple dimming overlay",
        className: "fixed inset-0 z-50",
        backdropClass: "bg-black/50"
      },
      {
        id: "transparent",
        name: "Transparent Overlay",
        description: "Transparent overlay without backdrop",
        className: "fixed inset-0 z-50",
        backdropClass: "bg-transparent"
      }
    ],
    defaultConfig: {
      variant: "default",
      backdrop: "semi-transparent",
      showSpinner: true,
      showText: true,
      textPosition: "center",
      closeOnClick: false,
      closeOnEscape: true
    }
  },
  skeletons: {
    variants: [
      {
        id: "default",
        name: "Default Skeleton",
        description: "Standard skeleton loading animation",
        className: "animate-pulse bg-muted rounded",
        animationClass: "animate-pulse"
      },
      {
        id: "card",
        name: "Card Skeleton",
        description: "Skeleton for card components",
        className: "animate-pulse bg-muted rounded-lg p-4",
        animationClass: "animate-pulse"
      },
      {
        id: "list",
        name: "List Skeleton",
        description: "Skeleton for list items",
        className: "animate-pulse bg-muted rounded h-4",
        animationClass: "animate-pulse"
      },
      {
        id: "table",
        name: "Table Skeleton",
        description: "Skeleton for table rows",
        className: "animate-pulse bg-muted rounded h-8",
        animationClass: "animate-pulse"
      },
      {
        id: "avatar",
        name: "Avatar Skeleton",
        description: "Skeleton for avatar images",
        className: "animate-pulse bg-muted rounded-full",
        animationClass: "animate-pulse"
      },
      {
        id: "text",
        name: "Text Skeleton",
        description: "Skeleton for text content",
        className: "animate-pulse bg-muted rounded h-4",
        animationClass: "animate-pulse"
      }
    ],
    animations: [
      {
        id: "pulse",
        name: "Pulse",
        className: "animate-pulse",
        duration: "2s"
      },
      {
        id: "wave",
        name: "Wave",
        className: "animate-pulse",
        duration: "1.5s"
      },
      {
        id: "none",
        name: "None",
        className: "",
        duration: "0s"
      }
    ],
    defaultConfig: {
      variant: "default",
      animation: "pulse",
      color: "default",
      borderRadius: "md",
      height: "md"
    }
  },
  toasts: {
    variants: [
      {
        id: "success",
        name: "Success Toast",
        description: "Green toast for successful actions",
        className: "bg-green-500 text-white border-green-600",
        iconClass: "text-green-100"
      },
      {
        id: "error",
        name: "Error Toast",
        description: "Red toast for error messages",
        className: "bg-red-500 text-white border-red-600",
        iconClass: "text-red-100"
      },
      {
        id: "warning",
        name: "Warning Toast",
        description: "Yellow toast for warnings",
        className: "bg-yellow-500 text-white border-yellow-600",
        iconClass: "text-yellow-100"
      },
      {
        id: "info",
        name: "Info Toast",
        description: "Blue toast for information",
        className: "bg-blue-500 text-white border-blue-600",
        iconClass: "text-blue-100"
      },
      {
        id: "default",
        name: "Default Toast",
        description: "Neutral toast for general messages",
        className: "bg-background text-foreground border-border",
        iconClass: "text-muted-foreground"
      }
    ],
    positions: [
      {
        id: "top-right",
        name: "Top Right",
        className: "top-4 right-4",
        description: "Positioned in the top right corner"
      },
      {
        id: "top-left",
        name: "Top Left",
        className: "top-4 left-4",
        description: "Positioned in the top left corner"
      },
      {
        id: "bottom-right",
        name: "Bottom Right",
        className: "bottom-4 right-4",
        description: "Positioned in the bottom right corner"
      },
      {
        id: "bottom-left",
        name: "Bottom Left",
        className: "bottom-4 left-4",
        description: "Positioned in the bottom left corner"
      },
      {
        id: "top-center",
        name: "Top Center",
        className: "top-4 left-1/2 transform -translate-x-1/2",
        description: "Positioned in the top center"
      },
      {
        id: "bottom-center",
        name: "Bottom Center",
        className: "bottom-4 left-1/2 transform -translate-x-1/2",
        description: "Positioned in the bottom center"
      }
    ],
    defaultConfig: {
      variant: "default",
      position: "top-right",
      duration: 5000,
      showIcon: true,
      showCloseButton: true,
      autoClose: true,
      pauseOnHover: true,
      maxToasts: 5
    }
  },
  progressSteps: {
    variants: [
      {
        id: "default",
        name: "Default Steps",
        description: "Standard numbered progress steps",
        className: "flex items-center space-x-4",
        stepClass: "flex items-center"
      },
      {
        id: "numbered",
        name: "Numbered Steps",
        description: "Steps with prominent numbers",
        className: "flex items-center space-x-6",
        stepClass: "flex items-center"
      },
      {
        id: "dots",
        name: "Dot Steps",
        description: "Simple dot-based progress indicator",
        className: "flex items-center space-x-2",
        stepClass: "flex items-center"
      },
      {
        id: "lines",
        name: "Line Steps",
        description: "Connected line progress indicator",
        className: "flex items-center space-x-1",
        stepClass: "flex items-center"
      }
    ],
    orientations: [
      {
        id: "horizontal",
        name: "Horizontal",
        className: "flex-row",
        description: "Steps arranged horizontally"
      },
      {
        id: "vertical",
        name: "Vertical",
        className: "flex-col",
        description: "Steps arranged vertically"
      }
    ],
    defaultConfig: {
      variant: "default",
      orientation: "horizontal",
      showLabels: true,
      showDescriptions: false,
      clickable: false,
      size: "md",
      color: "primary"
    }
  },
  buttonStates: {
    loadingVariants: [
      {
        id: "spinner",
        name: "Spinner",
        className: "animate-spin",
        description: "Rotating spinner animation"
      },
      {
        id: "dots",
        name: "Dots",
        className: "flex space-x-1",
        description: "Animated dots"
      },
      {
        id: "pulse",
        name: "Pulse",
        className: "animate-pulse",
        description: "Pulsing animation"
      }
    ],
    hoverEffects: [
      {
        id: "scale",
        name: "Scale",
        className: "hover:scale-105 transition-transform",
        description: "Slight scale increase on hover"
      },
      {
        id: "glow",
        name: "Glow",
        className: "hover:shadow-lg transition-shadow",
        description: "Glow effect on hover"
      },
      {
        id: "shadow",
        name: "Shadow",
        className: "hover:shadow-md transition-shadow",
        description: "Shadow effect on hover"
      },
      {
        id: "none",
        name: "None",
        className: "",
        description: "No hover effect"
      }
    ],
    defaultConfig: {
      loadingVariant: "spinner",
      loadingPosition: "left",
      disabledOpacity: 0.5,
      hoverEffect: "scale",
      focusRing: true,
      focusRingColor: "primary"
    }
  },
  formStates: {
    validationStyles: [
      {
        id: "inline",
        name: "Inline Validation",
        description: "Show validation errors inline with form fields",
        className: "text-sm text-red-500 mt-1"
      },
      {
        id: "toast",
        name: "Toast Validation",
        description: "Show validation errors as toast notifications",
        className: "toast-notification"
      },
      {
        id: "modal",
        name: "Modal Validation",
        description: "Show validation errors in a modal dialog",
        className: "modal-dialog"
      }
    ],
    loadingVariants: [
      {
        id: "spinner",
        name: "Spinner",
        description: "Show spinner during form submission",
        className: "animate-spin"
      },
      {
        id: "skeleton",
        name: "Skeleton",
        description: "Show skeleton loading for form fields",
        className: "animate-pulse bg-muted rounded"
      },
      {
        id: "overlay",
        name: "Overlay",
        description: "Show loading overlay during submission",
        className: "fixed inset-0 z-50"
      }
    ],
    defaultConfig: {
      validationStyle: "inline",
      loadingVariant: "spinner",
      errorDisplay: "onBlur",
      successFeedback: "toast",
      autoSave: false,
      autoSaveInterval: 30000
    }
  }
}

// Helper functions to get specific configurations
export function getLoadingSpinnerVariant(variantId: string) {
  return interactiveStatesConfig.loadingSpinners.variants.find(v => v.id === variantId)
}

export function getLoadingSpinnerSize(sizeId: string) {
  return interactiveStatesConfig.loadingSpinners.sizes.find(s => s.id === sizeId)
}

export function getLoadingSpinnerColor(colorId: string) {
  return interactiveStatesConfig.loadingSpinners.colors.find(c => c.id === colorId)
}

export function getLoadingOverlayVariant(variantId: string) {
  return interactiveStatesConfig.loadingOverlays.variants.find(v => v.id === variantId)
}

export function getSkeletonVariant(variantId: string) {
  return interactiveStatesConfig.skeletons.variants.find(v => v.id === variantId)
}

export function getToastVariant(variantId: string) {
  return interactiveStatesConfig.toasts.variants.find(v => v.id === variantId)
}

export function getToastPosition(positionId: string) {
  return interactiveStatesConfig.toasts.positions.find(p => p.id === positionId)
}

export function getProgressStepsVariant(variantId: string) {
  return interactiveStatesConfig.progressSteps.variants.find(v => v.id === variantId)
}

export function getButtonLoadingVariant(variantId: string) {
  return interactiveStatesConfig.buttonStates.loadingVariants.find(v => v.id === variantId)
}

export function getFormValidationStyle(styleId: string) {
  return interactiveStatesConfig.formStates.validationStyles.find(s => s.id === styleId)
}
