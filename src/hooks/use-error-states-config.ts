"use client"

import { useState, useCallback } from "react"
import {
  errorStatesConfig,
  ErrorTypeConfig,
  ValidationPatternConfig,
  ErrorMessageConfig,
  FeedbackTypeConfig,
  ErrorBoundaryConfig,
  FormErrorConfig,
  AlertConfig,
  EmptyStateConfig,
  getErrorTypeVariant,
  getValidationPatternMode,
  getErrorMessageStyle,
  getFeedbackTypeVariant,
  getErrorBoundaryFallbackType,
  getFormErrorStyle,
  getAlertVariant,
  getEmptyStateVariant
} from "@/lib/error-states-config"

interface UseErrorStatesConfigReturn {
  // Configuration object
  config: typeof errorStatesConfig
  
  // Error Type configurations
  errorTypeConfig: ErrorTypeConfig
  updateErrorTypeConfig: (config: Partial<ErrorTypeConfig>) => void
  getErrorTypeVariant: typeof getErrorTypeVariant
  
  // Validation Pattern configurations
  validationPatternConfig: ValidationPatternConfig
  updateValidationPatternConfig: (config: Partial<ValidationPatternConfig>) => void
  getValidationPatternMode: typeof getValidationPatternMode
  
  // Error Message configurations
  errorMessageConfig: ErrorMessageConfig
  updateErrorMessageConfig: (config: Partial<ErrorMessageConfig>) => void
  getErrorMessageStyle: typeof getErrorMessageStyle
  
  // Feedback Type configurations
  feedbackTypeConfig: FeedbackTypeConfig
  updateFeedbackTypeConfig: (config: Partial<FeedbackTypeConfig>) => void
  getFeedbackTypeVariant: typeof getFeedbackTypeVariant
  
  // Error Boundary configurations
  errorBoundaryConfig: ErrorBoundaryConfig
  updateErrorBoundaryConfig: (config: Partial<ErrorBoundaryConfig>) => void
  getErrorBoundaryFallbackType: typeof getErrorBoundaryFallbackType
  
  // Form Error configurations
  formErrorConfig: FormErrorConfig
  updateFormErrorConfig: (config: Partial<FormErrorConfig>) => void
  getFormErrorStyle: typeof getFormErrorStyle
  
  // Alert configurations
  alertConfig: AlertConfig
  updateAlertConfig: (config: Partial<AlertConfig>) => void
  getAlertVariant: typeof getAlertVariant
  
  // Empty State configurations
  emptyStateConfig: EmptyStateConfig
  updateEmptyStateConfig: (config: Partial<EmptyStateConfig>) => void
  getEmptyStateVariant: typeof getEmptyStateVariant
  
  // Utility functions
  resetToDefaults: () => void
  exportConfig: () => string
  importConfig: (configString: string) => void
}

export function useErrorStatesConfig(): UseErrorStatesConfigReturn {
  // Error Type state
  const [errorTypeConfig, setErrorTypeConfig] = useState<ErrorTypeConfig>(
    errorStatesConfig.errorTypes.defaultConfig
  )

  // Validation Pattern state
  const [validationPatternConfig, setValidationPatternConfig] = useState<ValidationPatternConfig>(
    errorStatesConfig.validationPatterns.defaultConfig
  )

  // Error Message state
  const [errorMessageConfig, setErrorMessageConfig] = useState<ErrorMessageConfig>(
    errorStatesConfig.errorMessages.defaultConfig
  )

  // Feedback Type state
  const [feedbackTypeConfig, setFeedbackTypeConfig] = useState<FeedbackTypeConfig>(
    errorStatesConfig.feedbackTypes.defaultConfig
  )

  // Error Boundary state
  const [errorBoundaryConfig, setErrorBoundaryConfig] = useState<ErrorBoundaryConfig>(
    errorStatesConfig.errorBoundaries.defaultConfig
  )

  // Form Error state
  const [formErrorConfig, setFormErrorConfig] = useState<FormErrorConfig>(
    errorStatesConfig.formErrors.defaultConfig
  )

  // Alert state
  const [alertConfig, setAlertConfig] = useState<AlertConfig>(
    errorStatesConfig.alerts.defaultConfig
  )

  // Empty State state
  const [emptyStateConfig, setEmptyStateConfig] = useState<EmptyStateConfig>(
    errorStatesConfig.emptyStates.defaultConfig
  )

  // Update functions
  const updateErrorTypeConfig = useCallback((config: Partial<ErrorTypeConfig>) => {
    setErrorTypeConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateValidationPatternConfig = useCallback((config: Partial<ValidationPatternConfig>) => {
    setValidationPatternConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateErrorMessageConfig = useCallback((config: Partial<ErrorMessageConfig>) => {
    setErrorMessageConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateFeedbackTypeConfig = useCallback((config: Partial<FeedbackTypeConfig>) => {
    setFeedbackTypeConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateErrorBoundaryConfig = useCallback((config: Partial<ErrorBoundaryConfig>) => {
    setErrorBoundaryConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateFormErrorConfig = useCallback((config: Partial<FormErrorConfig>) => {
    setFormErrorConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateAlertConfig = useCallback((config: Partial<AlertConfig>) => {
    setAlertConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateEmptyStateConfig = useCallback((config: Partial<EmptyStateConfig>) => {
    setEmptyStateConfig(prev => ({ ...prev, ...config }))
  }, [])

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setErrorTypeConfig(errorStatesConfig.errorTypes.defaultConfig)
    setValidationPatternConfig(errorStatesConfig.validationPatterns.defaultConfig)
    setErrorMessageConfig(errorStatesConfig.errorMessages.defaultConfig)
    setFeedbackTypeConfig(errorStatesConfig.feedbackTypes.defaultConfig)
    setErrorBoundaryConfig(errorStatesConfig.errorBoundaries.defaultConfig)
    setFormErrorConfig(errorStatesConfig.formErrors.defaultConfig)
    setAlertConfig(errorStatesConfig.alerts.defaultConfig)
    setEmptyStateConfig(errorStatesConfig.emptyStates.defaultConfig)
  }, [])

  // Export configuration
  const exportConfig = useCallback(() => {
    const configToExport = {
      errorTypeConfig,
      validationPatternConfig,
      errorMessageConfig,
      feedbackTypeConfig,
      errorBoundaryConfig,
      formErrorConfig,
      alertConfig,
      emptyStateConfig
    }
    return JSON.stringify(configToExport, null, 2)
  }, [
    errorTypeConfig,
    validationPatternConfig,
    errorMessageConfig,
    feedbackTypeConfig,
    errorBoundaryConfig,
    formErrorConfig,
    alertConfig,
    emptyStateConfig
  ])

  // Import configuration
  const importConfig = useCallback((configString: string) => {
    try {
      const importedConfig = JSON.parse(configString)
      
      if (importedConfig.errorTypeConfig) {
        setErrorTypeConfig(importedConfig.errorTypeConfig)
      }
      if (importedConfig.validationPatternConfig) {
        setValidationPatternConfig(importedConfig.validationPatternConfig)
      }
      if (importedConfig.errorMessageConfig) {
        setErrorMessageConfig(importedConfig.errorMessageConfig)
      }
      if (importedConfig.feedbackTypeConfig) {
        setFeedbackTypeConfig(importedConfig.feedbackTypeConfig)
      }
      if (importedConfig.errorBoundaryConfig) {
        setErrorBoundaryConfig(importedConfig.errorBoundaryConfig)
      }
      if (importedConfig.formErrorConfig) {
        setFormErrorConfig(importedConfig.formErrorConfig)
      }
      if (importedConfig.alertConfig) {
        setAlertConfig(importedConfig.alertConfig)
      }
      if (importedConfig.emptyStateConfig) {
        setEmptyStateConfig(importedConfig.emptyStateConfig)
      }
    } catch (error) {
      console.error("Failed to import configuration:", error)
    }
  }, [])

  return {
    config: errorStatesConfig,
    
    // Error Type
    errorTypeConfig,
    updateErrorTypeConfig,
    getErrorTypeVariant,
    
    // Validation Pattern
    validationPatternConfig,
    updateValidationPatternConfig,
    getValidationPatternMode,
    
    // Error Message
    errorMessageConfig,
    updateErrorMessageConfig,
    getErrorMessageStyle,
    
    // Feedback Type
    feedbackTypeConfig,
    updateFeedbackTypeConfig,
    getFeedbackTypeVariant,
    
    // Error Boundary
    errorBoundaryConfig,
    updateErrorBoundaryConfig,
    getErrorBoundaryFallbackType,
    
    // Form Error
    formErrorConfig,
    updateFormErrorConfig,
    getFormErrorStyle,
    
    // Alert
    alertConfig,
    updateAlertConfig,
    getAlertVariant,
    
    // Empty State
    emptyStateConfig,
    updateEmptyStateConfig,
    getEmptyStateVariant,
    
    // Utilities
    resetToDefaults,
    exportConfig,
    importConfig,
  }
}
