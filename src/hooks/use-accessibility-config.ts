"use client"

import { useState, useCallback } from "react"
import {
  accessibilityConfig,
  WCAGLevelConfig,
  AccessibilityPrincipleConfig,
  ColorContrastConfig,
  KeyboardNavigationConfig,
  ScreenReaderConfig,
  FocusManagementConfig,
  TestingToolConfig,
  AccessibilityAuditConfig,
  ComplianceConfig,
  getWCAGLevel,
  getAccessibilityPrinciple,
  getColorContrastType,
  getKeyboardNavigationFeature,
  getScreenReaderFeature,
  getFocusManagementType,
  getTestingTool,
  getAuditType,
  getComplianceStandard
} from "@/lib/accessibility-config"

interface UseAccessibilityConfigReturn {
  // Configuration object
  config: typeof accessibilityConfig
  
  // WCAG Level configurations
  wcagLevelConfig: WCAGLevelConfig
  updateWCAGLevelConfig: (config: Partial<WCAGLevelConfig>) => void
  getWCAGLevel: typeof getWCAGLevel
  
  // Accessibility Principle configurations
  accessibilityPrincipleConfig: AccessibilityPrincipleConfig
  updateAccessibilityPrincipleConfig: (config: Partial<AccessibilityPrincipleConfig>) => void
  getAccessibilityPrinciple: typeof getAccessibilityPrinciple
  
  // Color Contrast configurations
  colorContrastConfig: ColorContrastConfig
  updateColorContrastConfig: (config: Partial<ColorContrastConfig>) => void
  getColorContrastType: typeof getColorContrastType
  
  // Keyboard Navigation configurations
  keyboardNavigationConfig: KeyboardNavigationConfig
  updateKeyboardNavigationConfig: (config: Partial<KeyboardNavigationConfig>) => void
  getKeyboardNavigationFeature: typeof getKeyboardNavigationFeature
  
  // Screen Reader configurations
  screenReaderConfig: ScreenReaderConfig
  updateScreenReaderConfig: (config: Partial<ScreenReaderConfig>) => void
  getScreenReaderFeature: typeof getScreenReaderFeature
  
  // Focus Management configurations
  focusManagementConfig: FocusManagementConfig
  updateFocusManagementConfig: (config: Partial<FocusManagementConfig>) => void
  getFocusManagementType: typeof getFocusManagementType
  
  // Testing Tool configurations
  testingToolConfig: TestingToolConfig
  updateTestingToolConfig: (config: Partial<TestingToolConfig>) => void
  getTestingTool: typeof getTestingTool
  
  // Accessibility Audit configurations
  accessibilityAuditConfig: AccessibilityAuditConfig
  updateAccessibilityAuditConfig: (config: Partial<AccessibilityAuditConfig>) => void
  getAuditType: typeof getAuditType
  
  // Compliance configurations
  complianceConfig: ComplianceConfig
  updateComplianceConfig: (config: Partial<ComplianceConfig>) => void
  getComplianceStandard: typeof getComplianceStandard
  
  // Utility functions
  resetToDefaults: () => void
  exportConfig: () => string
  importConfig: (configString: string) => void
}

export function useAccessibilityConfig(): UseAccessibilityConfigReturn {
  // WCAG Level state
  const [wcagLevelConfig, setWCAGLevelConfig] = useState<WCAGLevelConfig>(
    accessibilityConfig.wcagLevels.defaultConfig
  )

  // Accessibility Principle state
  const [accessibilityPrincipleConfig, setAccessibilityPrincipleConfig] = useState<AccessibilityPrincipleConfig>(
    accessibilityConfig.principles.defaultConfig
  )

  // Color Contrast state
  const [colorContrastConfig, setColorContrastConfig] = useState<ColorContrastConfig>(
    accessibilityConfig.colorContrast.defaultConfig
  )

  // Keyboard Navigation state
  const [keyboardNavigationConfig, setKeyboardNavigationConfig] = useState<KeyboardNavigationConfig>(
    accessibilityConfig.keyboardNavigation.defaultConfig
  )

  // Screen Reader state
  const [screenReaderConfig, setScreenReaderConfig] = useState<ScreenReaderConfig>(
    accessibilityConfig.screenReaders.defaultConfig
  )

  // Focus Management state
  const [focusManagementConfig, setFocusManagementConfig] = useState<FocusManagementConfig>(
    accessibilityConfig.focusManagement.defaultConfig
  )

  // Testing Tool state
  const [testingToolConfig, setTestingToolConfig] = useState<TestingToolConfig>(
    accessibilityConfig.testingTools.defaultConfig
  )

  // Accessibility Audit state
  const [accessibilityAuditConfig, setAccessibilityAuditConfig] = useState<AccessibilityAuditConfig>(
    accessibilityConfig.audits.defaultConfig
  )

  // Compliance state
  const [complianceConfig, setComplianceConfig] = useState<ComplianceConfig>(
    accessibilityConfig.compliance.defaultConfig
  )

  // Update functions
  const updateWCAGLevelConfig = useCallback((config: Partial<WCAGLevelConfig>) => {
    setWCAGLevelConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateAccessibilityPrincipleConfig = useCallback((config: Partial<AccessibilityPrincipleConfig>) => {
    setAccessibilityPrincipleConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateColorContrastConfig = useCallback((config: Partial<ColorContrastConfig>) => {
    setColorContrastConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateKeyboardNavigationConfig = useCallback((config: Partial<KeyboardNavigationConfig>) => {
    setKeyboardNavigationConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateScreenReaderConfig = useCallback((config: Partial<ScreenReaderConfig>) => {
    setScreenReaderConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateFocusManagementConfig = useCallback((config: Partial<FocusManagementConfig>) => {
    setFocusManagementConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateTestingToolConfig = useCallback((config: Partial<TestingToolConfig>) => {
    setTestingToolConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateAccessibilityAuditConfig = useCallback((config: Partial<AccessibilityAuditConfig>) => {
    setAccessibilityAuditConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateComplianceConfig = useCallback((config: Partial<ComplianceConfig>) => {
    setComplianceConfig(prev => ({ ...prev, ...config }))
  }, [])

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setWCAGLevelConfig(accessibilityConfig.wcagLevels.defaultConfig)
    setAccessibilityPrincipleConfig(accessibilityConfig.principles.defaultConfig)
    setColorContrastConfig(accessibilityConfig.colorContrast.defaultConfig)
    setKeyboardNavigationConfig(accessibilityConfig.keyboardNavigation.defaultConfig)
    setScreenReaderConfig(accessibilityConfig.screenReaders.defaultConfig)
    setFocusManagementConfig(accessibilityConfig.focusManagement.defaultConfig)
    setTestingToolConfig(accessibilityConfig.testingTools.defaultConfig)
    setAccessibilityAuditConfig(accessibilityConfig.audits.defaultConfig)
    setComplianceConfig(accessibilityConfig.compliance.defaultConfig)
  }, [])

  // Export configuration
  const exportConfig = useCallback(() => {
    const configToExport = {
      wcagLevelConfig,
      accessibilityPrincipleConfig,
      colorContrastConfig,
      keyboardNavigationConfig,
      screenReaderConfig,
      focusManagementConfig,
      testingToolConfig,
      accessibilityAuditConfig,
      complianceConfig
    }
    return JSON.stringify(configToExport, null, 2)
  }, [
    wcagLevelConfig,
    accessibilityPrincipleConfig,
    colorContrastConfig,
    keyboardNavigationConfig,
    screenReaderConfig,
    focusManagementConfig,
    testingToolConfig,
    accessibilityAuditConfig,
    complianceConfig
  ])

  // Import configuration
  const importConfig = useCallback((configString: string) => {
    try {
      const importedConfig = JSON.parse(configString)
      
      if (importedConfig.wcagLevelConfig) {
        setWCAGLevelConfig(importedConfig.wcagLevelConfig)
      }
      if (importedConfig.accessibilityPrincipleConfig) {
        setAccessibilityPrincipleConfig(importedConfig.accessibilityPrincipleConfig)
      }
      if (importedConfig.colorContrastConfig) {
        setColorContrastConfig(importedConfig.colorContrastConfig)
      }
      if (importedConfig.keyboardNavigationConfig) {
        setKeyboardNavigationConfig(importedConfig.keyboardNavigationConfig)
      }
      if (importedConfig.screenReaderConfig) {
        setScreenReaderConfig(importedConfig.screenReaderConfig)
      }
      if (importedConfig.focusManagementConfig) {
        setFocusManagementConfig(importedConfig.focusManagementConfig)
      }
      if (importedConfig.testingToolConfig) {
        setTestingToolConfig(importedConfig.testingToolConfig)
      }
      if (importedConfig.accessibilityAuditConfig) {
        setAccessibilityAuditConfig(importedConfig.accessibilityAuditConfig)
      }
      if (importedConfig.complianceConfig) {
        setComplianceConfig(importedConfig.complianceConfig)
      }
    } catch (error) {
      console.error("Failed to import configuration:", error)
    }
  }, [])

  return {
    config: accessibilityConfig,
    
    // WCAG Level
    wcagLevelConfig,
    updateWCAGLevelConfig,
    getWCAGLevel,
    
    // Accessibility Principle
    accessibilityPrincipleConfig,
    updateAccessibilityPrincipleConfig,
    getAccessibilityPrinciple,
    
    // Color Contrast
    colorContrastConfig,
    updateColorContrastConfig,
    getColorContrastType,
    
    // Keyboard Navigation
    keyboardNavigationConfig,
    updateKeyboardNavigationConfig,
    getKeyboardNavigationFeature,
    
    // Screen Reader
    screenReaderConfig,
    updateScreenReaderConfig,
    getScreenReaderFeature,
    
    // Focus Management
    focusManagementConfig,
    updateFocusManagementConfig,
    getFocusManagementType,
    
    // Testing Tool
    testingToolConfig,
    updateTestingToolConfig,
    getTestingTool,
    
    // Accessibility Audit
    accessibilityAuditConfig,
    updateAccessibilityAuditConfig,
    getAuditType,
    
    // Compliance
    complianceConfig,
    updateComplianceConfig,
    getComplianceStandard,
    
    // Utilities
    resetToDefaults,
    exportConfig,
    importConfig,
  }
}
