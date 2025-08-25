// Forms Configuration
// Defines all form layouts, validation patterns, input states, and form components

export interface FormLayoutConfig {
  variant: "default" | "compact" | "spacious" | "card" | "minimal"
  layout: "single-column" | "two-column" | "responsive" | "grid"
  spacing: "sm" | "md" | "lg" | "xl"
  showLabels: boolean
  labelPosition: "top" | "left" | "floating"
  showDescriptions: boolean
  showRequiredIndicator: boolean
  requiredIndicator: "*" | "•" | "(required)"
}

export interface FormValidationConfig {
  mode: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all"
  reValidateMode: "onChange" | "onBlur" | "onSubmit"
  criteriaMode: "firstError" | "allValid"
  shouldFocusError: boolean
  shouldUnregister: boolean
  shouldUseNativeValidation: boolean
  delayError: number
  showValidationIcons: boolean
  validationStyle: "inline" | "toast" | "modal" | "summary"
}

export interface FormInputConfig {
  variant: "default" | "outlined" | "filled" | "minimal" | "bordered"
  size: "sm" | "md" | "lg" | "xl"
  showIcons: boolean
  iconPosition: "left" | "right" | "both"
  showClearButton: boolean
  showPasswordToggle: boolean
  autoComplete: boolean
  spellCheck: boolean
  maxLength: number | null
  minLength: number | null
  placeholderStyle: "default" | "subtle" | "none"
}

export interface FormSelectConfig {
  variant: "default" | "outlined" | "filled" | "minimal"
  size: "sm" | "md" | "lg" | "xl"
  showSearch: boolean
  showClear: boolean
  multiple: boolean
  maxSelections: number | null
  placeholder: string
  noOptionsMessage: string
  loadingMessage: string
  searchPlaceholder: string
  dropdownPosition: "auto" | "top" | "bottom"
}

export interface FormCheckboxConfig {
  variant: "default" | "outlined" | "filled" | "minimal"
  size: "sm" | "md" | "lg"
  showLabel: boolean
  labelPosition: "right" | "left" | "top" | "bottom"
  indeterminate: boolean
  showDescription: boolean
  required: boolean
  disabled: boolean
}

export interface FormRadioConfig {
  variant: "default" | "outlined" | "filled" | "minimal"
  size: "sm" | "md" | "lg"
  layout: "vertical" | "horizontal" | "grid"
  showLabel: boolean
  labelPosition: "right" | "left" | "top" | "bottom"
  showDescription: boolean
  required: boolean
  disabled: boolean
}

export interface FormSwitchConfig {
  variant: "default" | "outlined" | "filled" | "minimal"
  size: "sm" | "md" | "lg"
  showLabel: boolean
  labelPosition: "left" | "right" | "top" | "bottom"
  showDescription: boolean
  required: boolean
  disabled: boolean
  loading: boolean
}

export interface FormTextareaConfig {
  variant: "default" | "outlined" | "filled" | "minimal"
  size: "sm" | "md" | "lg" | "xl"
  rows: number
  maxRows: number | null
  minRows: number | null
  autoResize: boolean
  showCharacterCount: boolean
  maxLength: number | null
  placeholder: string
  spellCheck: boolean
}

export interface FormWizardConfig {
  variant: "default" | "stepper" | "tabs" | "cards" | "progress"
  showProgress: boolean
  progressStyle: "bar" | "dots" | "numbers" | "steps"
  allowBackNavigation: boolean
  allowSkipSteps: boolean
  validateOnStepChange: boolean
  showStepNumbers: boolean
  showStepTitles: boolean
  showStepDescriptions: boolean
  maxSteps: number
  currentStep: number
}

export interface FormStatusConfig {
  variant: "success" | "error" | "warning" | "info" | "loading"
  showIcon: boolean
  showTitle: boolean
  showMessage: boolean
  dismissible: boolean
  autoDismiss: boolean
  dismissDelay: number
  position: "top" | "bottom" | "inline" | "toast"
  animation: "slide" | "fade" | "scale" | "none"
}

export interface FormsConfig {
  layouts: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      layoutClass: string
    }>
    spacings: Array<{
      id: string
      name: string
      className: string
      pixels: number
    }>
    defaultConfig: FormLayoutConfig
  }
  validation: {
    modes: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    styles: Array<{
      id: string
      name: string
      description: string
      className: string
    }>
    defaultConfig: FormValidationConfig
  }
  inputs: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      borderClass: string
    }>
    sizes: Array<{
      id: string
      name: string
      height: number
      className: string
    }>
    defaultConfig: FormInputConfig
  }
  selects: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      dropdownClass: string
    }>
    sizes: Array<{
      id: string
      name: string
      height: number
      className: string
    }>
    defaultConfig: FormSelectConfig
  }
  checkboxes: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      checkClass: string
    }>
    sizes: Array<{
      id: string
      name: string
      width: number
      height: number
      className: string
    }>
    defaultConfig: FormCheckboxConfig
  }
  radios: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      radioClass: string
    }>
    layouts: Array<{
      id: string
      name: string
      className: string
      description: string
    }>
    defaultConfig: FormRadioConfig
  }
  switches: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      trackClass: string
    }>
    sizes: Array<{
      id: string
      name: string
      width: number
      height: number
      className: string
    }>
    defaultConfig: FormSwitchConfig
  }
  textareas: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      borderClass: string
    }>
    sizes: Array<{
      id: string
      name: string
      minHeight: number
      className: string
    }>
    defaultConfig: FormTextareaConfig
  }
  wizards: {
    variants: Array<{
      id: string
      name: string
      description: string
      className: string
      stepClass: string
    }>
    progressStyles: Array<{
      id: string
      name: string
      className: string
      description: string
    }>
    defaultConfig: FormWizardConfig
  }
  status: {
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
    defaultConfig: FormStatusConfig
  }
}

export const formsConfig: FormsConfig = {
  layouts: {
    variants: [
      {
        id: "default",
        name: "Default Layout",
        description: "Standard form layout with consistent spacing",
        className: "space-y-6",
        layoutClass: "w-full"
      },
      {
        id: "compact",
        name: "Compact Layout",
        description: "Tightly spaced form for dense interfaces",
        className: "space-y-4",
        layoutClass: "w-full"
      },
      {
        id: "spacious",
        name: "Spacious Layout",
        description: "Generously spaced form for better readability",
        className: "space-y-8",
        layoutClass: "w-full"
      },
      {
        id: "card",
        name: "Card Layout",
        description: "Form wrapped in a card container",
        className: "bg-card border rounded-lg p-6 space-y-6",
        layoutClass: "w-full"
      },
      {
        id: "minimal",
        name: "Minimal Layout",
        description: "Clean, minimal form with reduced visual noise",
        className: "space-y-4",
        layoutClass: "w-full"
      }
    ],
    spacings: [
      {
        id: "sm",
        name: "Small Spacing",
        className: "space-y-2",
        pixels: 8
      },
      {
        id: "md",
        name: "Medium Spacing",
        className: "space-y-4",
        pixels: 16
      },
      {
        id: "lg",
        name: "Large Spacing",
        className: "space-y-6",
        pixels: 24
      },
      {
        id: "xl",
        name: "Extra Large Spacing",
        className: "space-y-8",
        pixels: 32
      }
    ],
    defaultConfig: {
      variant: "default",
      layout: "single-column",
      spacing: "md",
      showLabels: true,
      labelPosition: "top",
      showDescriptions: true,
      showRequiredIndicator: true,
      requiredIndicator: "*"
    }
  },
  validation: {
    modes: [
      {
        id: "onChange",
        name: "On Change",
        description: "Validate as user types",
        className: "validate-on-change"
      },
      {
        id: "onBlur",
        name: "On Blur",
        description: "Validate when field loses focus",
        className: "validate-on-blur"
      },
      {
        id: "onSubmit",
        name: "On Submit",
        description: "Validate only on form submission",
        className: "validate-on-submit"
      },
      {
        id: "onTouched",
        name: "On Touched",
        description: "Validate after field has been touched",
        className: "validate-on-touched"
      },
      {
        id: "all",
        name: "All Events",
        description: "Validate on all events",
        className: "validate-on-all"
      }
    ],
    styles: [
      {
        id: "inline",
        name: "Inline Validation",
        description: "Show errors inline with fields",
        className: "validation-inline"
      },
      {
        id: "toast",
        name: "Toast Validation",
        description: "Show errors as toast notifications",
        className: "validation-toast"
      },
      {
        id: "modal",
        name: "Modal Validation",
        description: "Show errors in a modal dialog",
        className: "validation-modal"
      },
      {
        id: "summary",
        name: "Summary Validation",
        description: "Show all errors in a summary section",
        className: "validation-summary"
      }
    ],
    defaultConfig: {
      mode: "onBlur",
      reValidateMode: "onChange",
      criteriaMode: "firstError",
      shouldFocusError: true,
      shouldUnregister: false,
      shouldUseNativeValidation: false,
      delayError: 0,
      showValidationIcons: true,
      validationStyle: "inline"
    }
  },
  inputs: {
    variants: [
      {
        id: "default",
        name: "Default Input",
        description: "Standard input with border",
        className: "border border-input bg-background",
        borderClass: "border-input"
      },
      {
        id: "outlined",
        name: "Outlined Input",
        description: "Input with prominent border",
        className: "border-2 border-input bg-background",
        borderClass: "border-2 border-input"
      },
      {
        id: "filled",
        name: "Filled Input",
        description: "Input with background fill",
        className: "border-none bg-muted",
        borderClass: "border-none"
      },
      {
        id: "minimal",
        name: "Minimal Input",
        description: "Clean input with minimal styling",
        className: "border-b border-input bg-transparent rounded-none",
        borderClass: "border-b border-input"
      },
      {
        id: "bordered",
        name: "Bordered Input",
        description: "Input with custom border styling",
        className: "border border-border bg-background",
        borderClass: "border-border"
      }
    ],
    sizes: [
      {
        id: "sm",
        name: "Small",
        height: 32,
        className: "h-8 px-3 text-sm"
      },
      {
        id: "md",
        name: "Medium",
        height: 40,
        className: "h-10 px-3"
      },
      {
        id: "lg",
        name: "Large",
        height: 48,
        className: "h-12 px-4 text-base"
      },
      {
        id: "xl",
        name: "Extra Large",
        height: 56,
        className: "h-14 px-4 text-lg"
      }
    ],
    defaultConfig: {
      variant: "default",
      size: "md",
      showIcons: false,
      iconPosition: "left",
      showClearButton: false,
      showPasswordToggle: false,
      autoComplete: true,
      spellCheck: true,
      maxLength: null,
      minLength: null,
      placeholderStyle: "default"
    }
  },
  selects: {
    variants: [
      {
        id: "default",
        name: "Default Select",
        description: "Standard select dropdown",
        className: "border border-input bg-background",
        dropdownClass: "border border-border bg-background"
      },
      {
        id: "outlined",
        name: "Outlined Select",
        description: "Select with prominent border",
        className: "border-2 border-input bg-background",
        dropdownClass: "border-2 border-border bg-background"
      },
      {
        id: "filled",
        name: "Filled Select",
        description: "Select with background fill",
        className: "border-none bg-muted",
        dropdownClass: "border-none bg-muted"
      },
      {
        id: "minimal",
        name: "Minimal Select",
        description: "Clean select with minimal styling",
        className: "border-b border-input bg-transparent rounded-none",
        dropdownClass: "border-b border-border bg-transparent"
      }
    ],
    sizes: [
      {
        id: "sm",
        name: "Small",
        height: 32,
        className: "h-8 px-3 text-sm"
      },
      {
        id: "md",
        name: "Medium",
        height: 40,
        className: "h-10 px-3"
      },
      {
        id: "lg",
        name: "Large",
        height: 48,
        className: "h-12 px-4 text-base"
      },
      {
        id: "xl",
        name: "Extra Large",
        height: 56,
        className: "h-14 px-4 text-lg"
      }
    ],
    defaultConfig: {
      variant: "default",
      size: "md",
      showSearch: false,
      showClear: false,
      multiple: false,
      maxSelections: null,
      placeholder: "Select an option",
      noOptionsMessage: "No options available",
      loadingMessage: "Loading...",
      searchPlaceholder: "Search options...",
      dropdownPosition: "auto"
    }
  },
  checkboxes: {
    variants: [
      {
        id: "default",
        name: "Default Checkbox",
        description: "Standard checkbox with border",
        className: "border border-input bg-background",
        checkClass: "text-primary"
      },
      {
        id: "outlined",
        name: "Outlined Checkbox",
        description: "Checkbox with prominent border",
        className: "border-2 border-input bg-background",
        checkClass: "text-primary"
      },
      {
        id: "filled",
        name: "Filled Checkbox",
        description: "Checkbox with background fill",
        className: "border-none bg-muted",
        checkClass: "text-primary"
      },
      {
        id: "minimal",
        name: "Minimal Checkbox",
        description: "Clean checkbox with minimal styling",
        className: "border border-border bg-transparent",
        checkClass: "text-foreground"
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
        width: 20,
        height: 20,
        className: "w-5 h-5"
      },
      {
        id: "lg",
        name: "Large",
        width: 24,
        height: 24,
        className: "w-6 h-6"
      }
    ],
    defaultConfig: {
      variant: "default",
      size: "md",
      showLabel: true,
      labelPosition: "right",
      indeterminate: false,
      showDescription: false,
      required: false,
      disabled: false
    }
  },
  radios: {
    variants: [
      {
        id: "default",
        name: "Default Radio",
        description: "Standard radio button",
        className: "border border-input bg-background",
        radioClass: "text-primary"
      },
      {
        id: "outlined",
        name: "Outlined Radio",
        description: "Radio with prominent border",
        className: "border-2 border-input bg-background",
        radioClass: "text-primary"
      },
      {
        id: "filled",
        name: "Filled Radio",
        description: "Radio with background fill",
        className: "border-none bg-muted",
        radioClass: "text-primary"
      },
      {
        id: "minimal",
        name: "Minimal Radio",
        description: "Clean radio with minimal styling",
        className: "border border-border bg-transparent",
        radioClass: "text-foreground"
      }
    ],
    layouts: [
      {
        id: "vertical",
        name: "Vertical Layout",
        className: "flex flex-col space-y-2",
        description: "Radio buttons stacked vertically"
      },
      {
        id: "horizontal",
        name: "Horizontal Layout",
        className: "flex flex-row space-x-4",
        description: "Radio buttons arranged horizontally"
      },
      {
        id: "grid",
        name: "Grid Layout",
        className: "grid grid-cols-2 gap-4",
        description: "Radio buttons in a grid layout"
      }
    ],
    defaultConfig: {
      variant: "default",
      size: "md",
      layout: "vertical",
      showLabel: true,
      labelPosition: "right",
      showDescription: false,
      required: false,
      disabled: false
    }
  },
  switches: {
    variants: [
      {
        id: "default",
        name: "Default Switch",
        description: "Standard toggle switch",
        className: "bg-input",
        trackClass: "bg-primary"
      },
      {
        id: "outlined",
        name: "Outlined Switch",
        description: "Switch with border",
        className: "border border-input bg-background",
        trackClass: "bg-primary"
      },
      {
        id: "filled",
        name: "Filled Switch",
        description: "Switch with background fill",
        className: "bg-muted",
        trackClass: "bg-primary"
      },
      {
        id: "minimal",
        name: "Minimal Switch",
        description: "Clean switch with minimal styling",
        className: "bg-border",
        trackClass: "bg-foreground"
      }
    ],
    sizes: [
      {
        id: "sm",
        name: "Small",
        width: 32,
        height: 16,
        className: "w-8 h-4"
      },
      {
        id: "md",
        name: "Medium",
        width: 44,
        height: 24,
        className: "w-11 h-6"
      },
      {
        id: "lg",
        name: "Large",
        width: 56,
        height: 32,
        className: "w-14 h-8"
      }
    ],
    defaultConfig: {
      variant: "default",
      size: "md",
      showLabel: true,
      labelPosition: "left",
      showDescription: false,
      required: false,
      disabled: false,
      loading: false
    }
  },
  textareas: {
    variants: [
      {
        id: "default",
        name: "Default Textarea",
        description: "Standard textarea with border",
        className: "border border-input bg-background",
        borderClass: "border-input"
      },
      {
        id: "outlined",
        name: "Outlined Textarea",
        description: "Textarea with prominent border",
        className: "border-2 border-input bg-background",
        borderClass: "border-2 border-input"
      },
      {
        id: "filled",
        name: "Filled Textarea",
        description: "Textarea with background fill",
        className: "border-none bg-muted",
        borderClass: "border-none"
      },
      {
        id: "minimal",
        name: "Minimal Textarea",
        description: "Clean textarea with minimal styling",
        className: "border-b border-input bg-transparent rounded-none",
        borderClass: "border-b border-input"
      }
    ],
    sizes: [
      {
        id: "sm",
        name: "Small",
        minHeight: 80,
        className: "min-h-[80px] p-2 text-sm"
      },
      {
        id: "md",
        name: "Medium",
        minHeight: 100,
        className: "min-h-[100px] p-3"
      },
      {
        id: "lg",
        name: "Large",
        minHeight: 120,
        className: "min-h-[120px] p-4 text-base"
      },
      {
        id: "xl",
        name: "Extra Large",
        minHeight: 160,
        className: "min-h-[160px] p-4 text-lg"
      }
    ],
    defaultConfig: {
      variant: "default",
      size: "md",
      rows: 4,
      maxRows: null,
      minRows: null,
      autoResize: false,
      showCharacterCount: false,
      maxLength: null,
      placeholder: "Enter text...",
      spellCheck: true
    }
  },
  wizards: {
    variants: [
      {
        id: "default",
        name: "Default Wizard",
        description: "Standard step-by-step wizard",
        className: "space-y-6",
        stepClass: "flex items-center space-x-4"
      },
      {
        id: "stepper",
        name: "Stepper Wizard",
        description: "Wizard with numbered steps",
        className: "space-y-6",
        stepClass: "flex items-center space-x-4"
      },
      {
        id: "tabs",
        name: "Tabs Wizard",
        description: "Wizard with tab navigation",
        className: "space-y-6",
        stepClass: "flex items-center space-x-4"
      },
      {
        id: "cards",
        name: "Cards Wizard",
        description: "Wizard with card-based steps",
        className: "space-y-6",
        stepClass: "bg-card border rounded-lg p-6"
      },
      {
        id: "progress",
        name: "Progress Wizard",
        description: "Wizard with progress bar",
        className: "space-y-6",
        stepClass: "flex items-center space-x-4"
      }
    ],
    progressStyles: [
      {
        id: "bar",
        name: "Progress Bar",
        className: "w-full bg-muted rounded-full h-2",
        description: "Linear progress bar"
      },
      {
        id: "dots",
        name: "Progress Dots",
        className: "flex space-x-2",
        description: "Dot-based progress indicator"
      },
      {
        id: "numbers",
        name: "Progress Numbers",
        className: "flex items-center space-x-4",
        description: "Numbered progress indicator"
      },
      {
        id: "steps",
        name: "Progress Steps",
        className: "flex items-center space-x-4",
        description: "Step-based progress indicator"
      }
    ],
    defaultConfig: {
      variant: "default",
      showProgress: true,
      progressStyle: "bar",
      allowBackNavigation: true,
      allowSkipSteps: false,
      validateOnStepChange: true,
      showStepNumbers: true,
      showStepTitles: true,
      showStepDescriptions: true,
      maxSteps: 5,
      currentStep: 1
    }
  },
  status: {
    variants: [
      {
        id: "success",
        name: "Success Status",
        description: "Green status for successful actions",
        className: "bg-green-50 border-green-200 text-green-800",
        iconClass: "text-green-500"
      },
      {
        id: "error",
        name: "Error Status",
        description: "Red status for error messages",
        className: "bg-red-50 border-red-200 text-red-800",
        iconClass: "text-red-500"
      },
      {
        id: "warning",
        name: "Warning Status",
        description: "Yellow status for warnings",
        className: "bg-yellow-50 border-yellow-200 text-yellow-800",
        iconClass: "text-yellow-500"
      },
      {
        id: "info",
        name: "Info Status",
        description: "Blue status for information",
        className: "bg-blue-50 border-blue-200 text-blue-800",
        iconClass: "text-blue-500"
      },
      {
        id: "loading",
        name: "Loading Status",
        description: "Gray status for loading states",
        className: "bg-gray-50 border-gray-200 text-gray-800",
        iconClass: "text-gray-500"
      }
    ],
    positions: [
      {
        id: "top",
        name: "Top Position",
        className: "mb-4",
        description: "Status displayed at the top"
      },
      {
        id: "bottom",
        name: "Bottom Position",
        className: "mt-4",
        description: "Status displayed at the bottom"
      },
      {
        id: "inline",
        name: "Inline Position",
        className: "inline-block",
        description: "Status displayed inline"
      },
      {
        id: "toast",
        name: "Toast Position",
        className: "fixed top-4 right-4 z-50",
        description: "Status displayed as toast notification"
      }
    ],
    defaultConfig: {
      variant: "info",
      showIcon: true,
      showTitle: true,
      showMessage: true,
      dismissible: false,
      autoDismiss: false,
      dismissDelay: 5000,
      position: "top",
      animation: "slide"
    }
  }
}

// Helper functions to get specific configurations
export function getFormLayoutVariant(variantId: string) {
  return formsConfig.layouts.variants.find(v => v.id === variantId)
}

export function getFormValidationMode(modeId: string) {
  return formsConfig.validation.modes.find(m => m.id === modeId)
}

export function getFormInputVariant(variantId: string) {
  return formsConfig.inputs.variants.find(v => v.id === variantId)
}

export function getFormSelectVariant(variantId: string) {
  return formsConfig.selects.variants.find(v => v.id === variantId)
}

export function getFormCheckboxVariant(variantId: string) {
  return formsConfig.checkboxes.variants.find(v => v.id === variantId)
}

export function getFormRadioVariant(variantId: string) {
  return formsConfig.radios.variants.find(v => v.id === variantId)
}

export function getFormSwitchVariant(variantId: string) {
  return formsConfig.switches.variants.find(v => v.id === variantId)
}

export function getFormTextareaVariant(variantId: string) {
  return formsConfig.textareas.variants.find(v => v.id === variantId)
}

export function getFormWizardVariant(variantId: string) {
  return formsConfig.wizards.variants.find(v => v.id === variantId)
}

export function getFormStatusVariant(variantId: string) {
  return formsConfig.status.variants.find(v => v.id === variantId)
}
