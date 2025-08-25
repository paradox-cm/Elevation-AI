"use client"

import { useState, useCallback } from "react"
import {
  interactiveStatesConfig,
  LoadingSpinnerConfig,
  LoadingOverlayConfig,
  SkeletonConfig,
  ToastConfig,
  ProgressStepsConfig,
  ButtonStatesConfig,
  FormStatesConfig,
  getLoadingSpinnerVariant,
  getLoadingSpinnerSize,
  getLoadingSpinnerColor,
  getLoadingOverlayVariant,
  getSkeletonVariant,
  getToastVariant,
  getToastPosition,
  getProgressStepsVariant,
  getButtonLoadingVariant,
  getFormValidationStyle
} from "@/lib/interactive-states-config"

interface UseInteractiveStatesConfigReturn {
  // Configuration object
  config: typeof interactiveStatesConfig
  
  // Loading Spinner configurations
  loadingSpinnerConfig: LoadingSpinnerConfig
  updateLoadingSpinnerConfig: (config: Partial<LoadingSpinnerConfig>) => void
  getLoadingSpinnerVariant: typeof getLoadingSpinnerVariant
  getLoadingSpinnerSize: typeof getLoadingSpinnerSize
  getLoadingSpinnerColor: typeof getLoadingSpinnerColor
  
  // Loading Overlay configurations
  loadingOverlayConfig: LoadingOverlayConfig
  updateLoadingOverlayConfig: (config: Partial<LoadingOverlayConfig>) => void
  getLoadingOverlayVariant: typeof getLoadingOverlayVariant
  
  // Skeleton configurations
  skeletonConfig: SkeletonConfig
  updateSkeletonConfig: (config: Partial<SkeletonConfig>) => void
  getSkeletonVariant: typeof getSkeletonVariant
  
  // Toast configurations
  toastConfig: ToastConfig
  updateToastConfig: (config: Partial<ToastConfig>) => void
  getToastVariant: typeof getToastVariant
  getToastPosition: typeof getToastPosition
  
  // Progress Steps configurations
  progressStepsConfig: ProgressStepsConfig
  updateProgressStepsConfig: (config: Partial<ProgressStepsConfig>) => void
  getProgressStepsVariant: typeof getProgressStepsVariant
  
  // Button States configurations
  buttonStatesConfig: ButtonStatesConfig
  updateButtonStatesConfig: (config: Partial<ButtonStatesConfig>) => void
  getButtonLoadingVariant: typeof getButtonLoadingVariant
  
  // Form States configurations
  formStatesConfig: FormStatesConfig
  updateFormStatesConfig: (config: Partial<FormStatesConfig>) => void
  getFormValidationStyle: typeof getFormValidationStyle
  
  // Utility functions
  resetToDefaults: () => void
  exportConfig: () => string
  importConfig: (configString: string) => void
}

export function useInteractiveStatesConfig(): UseInteractiveStatesConfigReturn {
  // Loading Spinner state
  const [loadingSpinnerConfig, setLoadingSpinnerConfig] = useState<LoadingSpinnerConfig>(
    interactiveStatesConfig.loadingSpinners.defaultConfig
  )

  // Loading Overlay state
  const [loadingOverlayConfig, setLoadingOverlayConfig] = useState<LoadingOverlayConfig>(
    interactiveStatesConfig.loadingOverlays.defaultConfig
  )

  // Skeleton state
  const [skeletonConfig, setSkeletonConfig] = useState<SkeletonConfig>(
    interactiveStatesConfig.skeletons.defaultConfig
  )

  // Toast state
  const [toastConfig, setToastConfig] = useState<ToastConfig>(
    interactiveStatesConfig.toasts.defaultConfig
  )

  // Progress Steps state
  const [progressStepsConfig, setProgressStepsConfig] = useState<ProgressStepsConfig>(
    interactiveStatesConfig.progressSteps.defaultConfig
  )

  // Button States state
  const [buttonStatesConfig, setButtonStatesConfig] = useState<ButtonStatesConfig>(
    interactiveStatesConfig.buttonStates.defaultConfig
  )

  // Form States state
  const [formStatesConfig, setFormStatesConfig] = useState<FormStatesConfig>(
    interactiveStatesConfig.formStates.defaultConfig
  )

  // Update functions
  const updateLoadingSpinnerConfig = useCallback((config: Partial<LoadingSpinnerConfig>) => {
    setLoadingSpinnerConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateLoadingOverlayConfig = useCallback((config: Partial<LoadingOverlayConfig>) => {
    setLoadingOverlayConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateSkeletonConfig = useCallback((config: Partial<SkeletonConfig>) => {
    setSkeletonConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateToastConfig = useCallback((config: Partial<ToastConfig>) => {
    setToastConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateProgressStepsConfig = useCallback((config: Partial<ProgressStepsConfig>) => {
    setProgressStepsConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateButtonStatesConfig = useCallback((config: Partial<ButtonStatesConfig>) => {
    setButtonStatesConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateFormStatesConfig = useCallback((config: Partial<FormStatesConfig>) => {
    setFormStatesConfig(prev => ({ ...prev, ...config }))
  }, [])

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setLoadingSpinnerConfig(interactiveStatesConfig.loadingSpinners.defaultConfig)
    setLoadingOverlayConfig(interactiveStatesConfig.loadingOverlays.defaultConfig)
    setSkeletonConfig(interactiveStatesConfig.skeletons.defaultConfig)
    setToastConfig(interactiveStatesConfig.toasts.defaultConfig)
    setProgressStepsConfig(interactiveStatesConfig.progressSteps.defaultConfig)
    setButtonStatesConfig(interactiveStatesConfig.buttonStates.defaultConfig)
    setFormStatesConfig(interactiveStatesConfig.formStates.defaultConfig)
  }, [])

  // Export configuration
  const exportConfig = useCallback(() => {
    const configToExport = {
      loadingSpinnerConfig,
      loadingOverlayConfig,
      skeletonConfig,
      toastConfig,
      progressStepsConfig,
      buttonStatesConfig,
      formStatesConfig
    }
    return JSON.stringify(configToExport, null, 2)
  }, [
    loadingSpinnerConfig,
    loadingOverlayConfig,
    skeletonConfig,
    toastConfig,
    progressStepsConfig,
    buttonStatesConfig,
    formStatesConfig
  ])

  // Import configuration
  const importConfig = useCallback((configString: string) => {
    try {
      const importedConfig = JSON.parse(configString)
      
      if (importedConfig.loadingSpinnerConfig) {
        setLoadingSpinnerConfig(importedConfig.loadingSpinnerConfig)
      }
      if (importedConfig.loadingOverlayConfig) {
        setLoadingOverlayConfig(importedConfig.loadingOverlayConfig)
      }
      if (importedConfig.skeletonConfig) {
        setSkeletonConfig(importedConfig.skeletonConfig)
      }
      if (importedConfig.toastConfig) {
        setToastConfig(importedConfig.toastConfig)
      }
      if (importedConfig.progressStepsConfig) {
        setProgressStepsConfig(importedConfig.progressStepsConfig)
      }
      if (importedConfig.buttonStatesConfig) {
        setButtonStatesConfig(importedConfig.buttonStatesConfig)
      }
      if (importedConfig.formStatesConfig) {
        setFormStatesConfig(importedConfig.formStatesConfig)
      }
    } catch (error) {
      console.error("Failed to import configuration:", error)
    }
  }, [])

  return {
    config: interactiveStatesConfig,
    
    // Loading Spinner
    loadingSpinnerConfig,
    updateLoadingSpinnerConfig,
    getLoadingSpinnerVariant,
    getLoadingSpinnerSize,
    getLoadingSpinnerColor,
    
    // Loading Overlay
    loadingOverlayConfig,
    updateLoadingOverlayConfig,
    getLoadingOverlayVariant,
    
    // Skeleton
    skeletonConfig,
    updateSkeletonConfig,
    getSkeletonVariant,
    
    // Toast
    toastConfig,
    updateToastConfig,
    getToastVariant,
    getToastPosition,
    
    // Progress Steps
    progressStepsConfig,
    updateProgressStepsConfig,
    getProgressStepsVariant,
    
    // Button States
    buttonStatesConfig,
    updateButtonStatesConfig,
    getButtonLoadingVariant,
    
    // Form States
    formStatesConfig,
    updateFormStatesConfig,
    getFormValidationStyle,
    
    // Utilities
    resetToDefaults,
    exportConfig,
    importConfig,
  }
}
