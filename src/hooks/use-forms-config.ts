"use client"

import { useState, useCallback } from "react"
import {
  formsConfig,
  FormLayoutConfig,
  FormValidationConfig,
  FormInputConfig,
  FormSelectConfig,
  FormCheckboxConfig,
  FormRadioConfig,
  FormSwitchConfig,
  FormTextareaConfig,
  FormWizardConfig,
  FormStatusConfig,
  getFormLayoutVariant,
  getFormValidationMode,
  getFormInputVariant,
  getFormSelectVariant,
  getFormCheckboxVariant,
  getFormRadioVariant,
  getFormSwitchVariant,
  getFormTextareaVariant,
  getFormWizardVariant,
  getFormStatusVariant
} from "@/lib/forms-config"

interface UseFormsConfigReturn {
  // Configuration object
  config: typeof formsConfig
  
  // Form Layout configurations
  formLayoutConfig: FormLayoutConfig
  updateFormLayoutConfig: (config: Partial<FormLayoutConfig>) => void
  getFormLayoutVariant: typeof getFormLayoutVariant
  
  // Form Validation configurations
  formValidationConfig: FormValidationConfig
  updateFormValidationConfig: (config: Partial<FormValidationConfig>) => void
  getFormValidationMode: typeof getFormValidationMode
  
  // Form Input configurations
  formInputConfig: FormInputConfig
  updateFormInputConfig: (config: Partial<FormInputConfig>) => void
  getFormInputVariant: typeof getFormInputVariant
  
  // Form Select configurations
  formSelectConfig: FormSelectConfig
  updateFormSelectConfig: (config: Partial<FormSelectConfig>) => void
  getFormSelectVariant: typeof getFormSelectVariant
  
  // Form Checkbox configurations
  formCheckboxConfig: FormCheckboxConfig
  updateFormCheckboxConfig: (config: Partial<FormCheckboxConfig>) => void
  getFormCheckboxVariant: typeof getFormCheckboxVariant
  
  // Form Radio configurations
  formRadioConfig: FormRadioConfig
  updateFormRadioConfig: (config: Partial<FormRadioConfig>) => void
  getFormRadioVariant: typeof getFormRadioVariant
  
  // Form Switch configurations
  formSwitchConfig: FormSwitchConfig
  updateFormSwitchConfig: (config: Partial<FormSwitchConfig>) => void
  getFormSwitchVariant: typeof getFormSwitchVariant
  
  // Form Textarea configurations
  formTextareaConfig: FormTextareaConfig
  updateFormTextareaConfig: (config: Partial<FormTextareaConfig>) => void
  getFormTextareaVariant: typeof getFormTextareaVariant
  
  // Form Wizard configurations
  formWizardConfig: FormWizardConfig
  updateFormWizardConfig: (config: Partial<FormWizardConfig>) => void
  getFormWizardVariant: typeof getFormWizardVariant
  
  // Form Status configurations
  formStatusConfig: FormStatusConfig
  updateFormStatusConfig: (config: Partial<FormStatusConfig>) => void
  getFormStatusVariant: typeof getFormStatusVariant
  
  // Utility functions
  resetToDefaults: () => void
  exportConfig: () => string
  importConfig: (configString: string) => void
}

export function useFormsConfig(): UseFormsConfigReturn {
  // Form Layout state
  const [formLayoutConfig, setFormLayoutConfig] = useState<FormLayoutConfig>(
    formsConfig.layouts.defaultConfig
  )

  // Form Validation state
  const [formValidationConfig, setFormValidationConfig] = useState<FormValidationConfig>(
    formsConfig.validation.defaultConfig
  )

  // Form Input state
  const [formInputConfig, setFormInputConfig] = useState<FormInputConfig>(
    formsConfig.inputs.defaultConfig
  )

  // Form Select state
  const [formSelectConfig, setFormSelectConfig] = useState<FormSelectConfig>(
    formsConfig.selects.defaultConfig
  )

  // Form Checkbox state
  const [formCheckboxConfig, setFormCheckboxConfig] = useState<FormCheckboxConfig>(
    formsConfig.checkboxes.defaultConfig
  )

  // Form Radio state
  const [formRadioConfig, setFormRadioConfig] = useState<FormRadioConfig>(
    formsConfig.radios.defaultConfig
  )

  // Form Switch state
  const [formSwitchConfig, setFormSwitchConfig] = useState<FormSwitchConfig>(
    formsConfig.switches.defaultConfig
  )

  // Form Textarea state
  const [formTextareaConfig, setFormTextareaConfig] = useState<FormTextareaConfig>(
    formsConfig.textareas.defaultConfig
  )

  // Form Wizard state
  const [formWizardConfig, setFormWizardConfig] = useState<FormWizardConfig>(
    formsConfig.wizards.defaultConfig
  )

  // Form Status state
  const [formStatusConfig, setFormStatusConfig] = useState<FormStatusConfig>(
    formsConfig.status.defaultConfig
  )

  // Update functions
  const updateFormLayoutConfig = useCallback((config: Partial<FormLayoutConfig>) => {
    setFormLayoutConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateFormValidationConfig = useCallback((config: Partial<FormValidationConfig>) => {
    setFormValidationConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateFormInputConfig = useCallback((config: Partial<FormInputConfig>) => {
    setFormInputConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateFormSelectConfig = useCallback((config: Partial<FormSelectConfig>) => {
    setFormSelectConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateFormCheckboxConfig = useCallback((config: Partial<FormCheckboxConfig>) => {
    setFormCheckboxConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateFormRadioConfig = useCallback((config: Partial<FormRadioConfig>) => {
    setFormRadioConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateFormSwitchConfig = useCallback((config: Partial<FormSwitchConfig>) => {
    setFormSwitchConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateFormTextareaConfig = useCallback((config: Partial<FormTextareaConfig>) => {
    setFormTextareaConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateFormWizardConfig = useCallback((config: Partial<FormWizardConfig>) => {
    setFormWizardConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateFormStatusConfig = useCallback((config: Partial<FormStatusConfig>) => {
    setFormStatusConfig(prev => ({ ...prev, ...config }))
  }, [])

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setFormLayoutConfig(formsConfig.layouts.defaultConfig)
    setFormValidationConfig(formsConfig.validation.defaultConfig)
    setFormInputConfig(formsConfig.inputs.defaultConfig)
    setFormSelectConfig(formsConfig.selects.defaultConfig)
    setFormCheckboxConfig(formsConfig.checkboxes.defaultConfig)
    setFormRadioConfig(formsConfig.radios.defaultConfig)
    setFormSwitchConfig(formsConfig.switches.defaultConfig)
    setFormTextareaConfig(formsConfig.textareas.defaultConfig)
    setFormWizardConfig(formsConfig.wizards.defaultConfig)
    setFormStatusConfig(formsConfig.status.defaultConfig)
  }, [])

  // Export configuration
  const exportConfig = useCallback(() => {
    const configToExport = {
      formLayoutConfig,
      formValidationConfig,
      formInputConfig,
      formSelectConfig,
      formCheckboxConfig,
      formRadioConfig,
      formSwitchConfig,
      formTextareaConfig,
      formWizardConfig,
      formStatusConfig
    }
    return JSON.stringify(configToExport, null, 2)
  }, [
    formLayoutConfig,
    formValidationConfig,
    formInputConfig,
    formSelectConfig,
    formCheckboxConfig,
    formRadioConfig,
    formSwitchConfig,
    formTextareaConfig,
    formWizardConfig,
    formStatusConfig
  ])

  // Import configuration
  const importConfig = useCallback((configString: string) => {
    try {
      const importedConfig = JSON.parse(configString)
      
      if (importedConfig.formLayoutConfig) {
        setFormLayoutConfig(importedConfig.formLayoutConfig)
      }
      if (importedConfig.formValidationConfig) {
        setFormValidationConfig(importedConfig.formValidationConfig)
      }
      if (importedConfig.formInputConfig) {
        setFormInputConfig(importedConfig.formInputConfig)
      }
      if (importedConfig.formSelectConfig) {
        setFormSelectConfig(importedConfig.formSelectConfig)
      }
      if (importedConfig.formCheckboxConfig) {
        setFormCheckboxConfig(importedConfig.formCheckboxConfig)
      }
      if (importedConfig.formRadioConfig) {
        setFormRadioConfig(importedConfig.formRadioConfig)
      }
      if (importedConfig.formSwitchConfig) {
        setFormSwitchConfig(importedConfig.formSwitchConfig)
      }
      if (importedConfig.formTextareaConfig) {
        setFormTextareaConfig(importedConfig.formTextareaConfig)
      }
      if (importedConfig.formWizardConfig) {
        setFormWizardConfig(importedConfig.formWizardConfig)
      }
      if (importedConfig.formStatusConfig) {
        setFormStatusConfig(importedConfig.formStatusConfig)
      }
    } catch (error) {
      console.error("Failed to import configuration:", error)
    }
  }, [])

  return {
    config: formsConfig,
    
    // Form Layout
    formLayoutConfig,
    updateFormLayoutConfig,
    getFormLayoutVariant,
    
    // Form Validation
    formValidationConfig,
    updateFormValidationConfig,
    getFormValidationMode,
    
    // Form Input
    formInputConfig,
    updateFormInputConfig,
    getFormInputVariant,
    
    // Form Select
    formSelectConfig,
    updateFormSelectConfig,
    getFormSelectVariant,
    
    // Form Checkbox
    formCheckboxConfig,
    updateFormCheckboxConfig,
    getFormCheckboxVariant,
    
    // Form Radio
    formRadioConfig,
    updateFormRadioConfig,
    getFormRadioVariant,
    
    // Form Switch
    formSwitchConfig,
    updateFormSwitchConfig,
    getFormSwitchVariant,
    
    // Form Textarea
    formTextareaConfig,
    updateFormTextareaConfig,
    getFormTextareaVariant,
    
    // Form Wizard
    formWizardConfig,
    updateFormWizardConfig,
    getFormWizardVariant,
    
    // Form Status
    formStatusConfig,
    updateFormStatusConfig,
    getFormStatusVariant,
    
    // Utilities
    resetToDefaults,
    exportConfig,
    importConfig,
  }
}
