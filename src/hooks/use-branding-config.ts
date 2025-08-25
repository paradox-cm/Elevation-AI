"use client"

import { useState, useCallback } from "react"
import {
  brandingConfig,
  LogoConfig,
  BrandColorConfig,
  TypographyConfig,
  BrandVoiceConfig,
  BrandGuidelineConfig,
  BrandAssetConfig,
  BrandApplicationConfig,
  getLogoType,
  getBrandColor,
  getTypographyType,
  getBrandVoice,
  getBrandGuideline,
  getBrandAsset,
  getBrandApplication
} from "@/lib/branding-config"

interface UseBrandingConfigReturn {
  // Configuration object
  config: typeof brandingConfig
  
  // Logo configurations
  logoConfig: LogoConfig
  updateLogoConfig: (config: Partial<LogoConfig>) => void
  getLogoType: typeof getLogoType
  
  // Brand Color configurations
  brandColorConfig: BrandColorConfig
  updateBrandColorConfig: (config: Partial<BrandColorConfig>) => void
  getBrandColor: typeof getBrandColor
  
  // Typography configurations
  typographyConfig: TypographyConfig
  updateTypographyConfig: (config: Partial<TypographyConfig>) => void
  getTypographyType: typeof getTypographyType
  
  // Brand Voice configurations
  brandVoiceConfig: BrandVoiceConfig
  updateBrandVoiceConfig: (config: Partial<BrandVoiceConfig>) => void
  getBrandVoice: typeof getBrandVoice
  
  // Brand Guideline configurations
  brandGuidelineConfig: BrandGuidelineConfig
  updateBrandGuidelineConfig: (config: Partial<BrandGuidelineConfig>) => void
  getBrandGuideline: typeof getBrandGuideline
  
  // Brand Asset configurations
  brandAssetConfig: BrandAssetConfig
  updateBrandAssetConfig: (config: Partial<BrandAssetConfig>) => void
  getBrandAsset: typeof getBrandAsset
  
  // Brand Application configurations
  brandApplicationConfig: BrandApplicationConfig
  updateBrandApplicationConfig: (config: Partial<BrandApplicationConfig>) => void
  getBrandApplication: typeof getBrandApplication
  
  // Utility functions
  resetToDefaults: () => void
  exportConfig: () => string
  importConfig: (configString: string) => void
}

export function useBrandingConfig(): UseBrandingConfigReturn {
  // Logo state
  const [logoConfig, setLogoConfig] = useState<LogoConfig>(
    brandingConfig.logos.defaultConfig
  )

  // Brand Color state
  const [brandColorConfig, setBrandColorConfig] = useState<BrandColorConfig>(
    brandingConfig.colors.defaultConfig
  )

  // Typography state
  const [typographyConfig, setTypographyConfig] = useState<TypographyConfig>(
    brandingConfig.typography.defaultConfig
  )

  // Brand Voice state
  const [brandVoiceConfig, setBrandVoiceConfig] = useState<BrandVoiceConfig>(
    brandingConfig.voice.defaultConfig
  )

  // Brand Guideline state
  const [brandGuidelineConfig, setBrandGuidelineConfig] = useState<BrandGuidelineConfig>(
    brandingConfig.guidelines.defaultConfig
  )

  // Brand Asset state
  const [brandAssetConfig, setBrandAssetConfig] = useState<BrandAssetConfig>(
    brandingConfig.assets.defaultConfig
  )

  // Brand Application state
  const [brandApplicationConfig, setBrandApplicationConfig] = useState<BrandApplicationConfig>(
    brandingConfig.applications.defaultConfig
  )

  // Update functions
  const updateLogoConfig = useCallback((config: Partial<LogoConfig>) => {
    setLogoConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateBrandColorConfig = useCallback((config: Partial<BrandColorConfig>) => {
    setBrandColorConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateTypographyConfig = useCallback((config: Partial<TypographyConfig>) => {
    setTypographyConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateBrandVoiceConfig = useCallback((config: Partial<BrandVoiceConfig>) => {
    setBrandVoiceConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateBrandGuidelineConfig = useCallback((config: Partial<BrandGuidelineConfig>) => {
    setBrandGuidelineConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateBrandAssetConfig = useCallback((config: Partial<BrandAssetConfig>) => {
    setBrandAssetConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateBrandApplicationConfig = useCallback((config: Partial<BrandApplicationConfig>) => {
    setBrandApplicationConfig(prev => ({ ...prev, ...config }))
  }, [])

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setLogoConfig(brandingConfig.logos.defaultConfig)
    setBrandColorConfig(brandingConfig.colors.defaultConfig)
    setTypographyConfig(brandingConfig.typography.defaultConfig)
    setBrandVoiceConfig(brandingConfig.voice.defaultConfig)
    setBrandGuidelineConfig(brandingConfig.guidelines.defaultConfig)
    setBrandAssetConfig(brandingConfig.assets.defaultConfig)
    setBrandApplicationConfig(brandingConfig.applications.defaultConfig)
  }, [])

  // Export configuration
  const exportConfig = useCallback(() => {
    const configToExport = {
      logoConfig,
      brandColorConfig,
      typographyConfig,
      brandVoiceConfig,
      brandGuidelineConfig,
      brandAssetConfig,
      brandApplicationConfig
    }
    return JSON.stringify(configToExport, null, 2)
  }, [
    logoConfig,
    brandColorConfig,
    typographyConfig,
    brandVoiceConfig,
    brandGuidelineConfig,
    brandAssetConfig,
    brandApplicationConfig
  ])

  // Import configuration
  const importConfig = useCallback((configString: string) => {
    try {
      const importedConfig = JSON.parse(configString)
      
      if (importedConfig.logoConfig) {
        setLogoConfig(importedConfig.logoConfig)
      }
      if (importedConfig.brandColorConfig) {
        setBrandColorConfig(importedConfig.brandColorConfig)
      }
      if (importedConfig.typographyConfig) {
        setTypographyConfig(importedConfig.typographyConfig)
      }
      if (importedConfig.brandVoiceConfig) {
        setBrandVoiceConfig(importedConfig.brandVoiceConfig)
      }
      if (importedConfig.brandGuidelineConfig) {
        setBrandGuidelineConfig(importedConfig.brandGuidelineConfig)
      }
      if (importedConfig.brandAssetConfig) {
        setBrandAssetConfig(importedConfig.brandAssetConfig)
      }
      if (importedConfig.brandApplicationConfig) {
        setBrandApplicationConfig(importedConfig.brandApplicationConfig)
      }
    } catch (error) {
      console.error("Failed to import configuration:", error)
    }
  }, [])

  return {
    config: brandingConfig,
    
    // Logo
    logoConfig,
    updateLogoConfig,
    getLogoType,
    
    // Brand Color
    brandColorConfig,
    updateBrandColorConfig,
    getBrandColor,
    
    // Typography
    typographyConfig,
    updateTypographyConfig,
    getTypographyType,
    
    // Brand Voice
    brandVoiceConfig,
    updateBrandVoiceConfig,
    getBrandVoice,
    
    // Brand Guideline
    brandGuidelineConfig,
    updateBrandGuidelineConfig,
    getBrandGuideline,
    
    // Brand Asset
    brandAssetConfig,
    updateBrandAssetConfig,
    getBrandAsset,
    
    // Brand Application
    brandApplicationConfig,
    updateBrandApplicationConfig,
    getBrandApplication,
    
    // Utilities
    resetToDefaults,
    exportConfig,
    importConfig,
  }
}
