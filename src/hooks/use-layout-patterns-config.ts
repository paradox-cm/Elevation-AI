"use client"

import { useState, useCallback } from "react"
import {
  layoutPatternsConfig,
  LayoutPatternsConfig,
  HeroSectionConfig,
  ContentSectionConfig,
  FeatureGridConfig,
  StatsSectionConfig,
  TestimonialSectionConfig,
  CTASectionConfig,
  SidebarLayoutConfig,
  TwoColumnLayoutConfig,
  ContainerConfig,
  PageLayoutConfig,
  getHeroSectionVariant,
  getContentSectionVariant,
  getFeatureGridVariant,
  getStatsSectionVariant,
  getTestimonialSectionVariant,
  getCTASectionVariant,
  getSidebarLayoutVariant,
  getTwoColumnLayoutVariant,
  getContainerVariant,
  getPageLayoutVariant,
} from "@/lib/layout-patterns-config"

export interface UseLayoutPatternsConfigReturn {
  // Configuration
  config: LayoutPatternsConfig
  
  // Hero Section
  heroSectionConfig: HeroSectionConfig
  updateHeroSectionConfig: (config: Partial<HeroSectionConfig>) => void
  getHeroSectionVariant: (id: string) => ReturnType<typeof getHeroSectionVariant>
  
  // Content Section
  contentSectionConfig: ContentSectionConfig
  updateContentSectionConfig: (config: Partial<ContentSectionConfig>) => void
  getContentSectionVariant: (id: string) => ReturnType<typeof getContentSectionVariant>
  
  // Feature Grid
  featureGridConfig: FeatureGridConfig
  updateFeatureGridConfig: (config: Partial<FeatureGridConfig>) => void
  getFeatureGridVariant: (id: string) => ReturnType<typeof getFeatureGridVariant>
  
  // Stats Section
  statsSectionConfig: StatsSectionConfig
  updateStatsSectionConfig: (config: Partial<StatsSectionConfig>) => void
  getStatsSectionVariant: (id: string) => ReturnType<typeof getStatsSectionVariant>
  
  // Testimonial Section
  testimonialSectionConfig: TestimonialSectionConfig
  updateTestimonialSectionConfig: (config: Partial<TestimonialSectionConfig>) => void
  getTestimonialSectionVariant: (id: string) => ReturnType<typeof getTestimonialSectionVariant>
  
  // CTA Section
  ctaSectionConfig: CTASectionConfig
  updateCTASectionConfig: (config: Partial<CTASectionConfig>) => void
  getCTASectionVariant: (id: string) => ReturnType<typeof getCTASectionVariant>
  
  // Sidebar Layout
  sidebarLayoutConfig: SidebarLayoutConfig
  updateSidebarLayoutConfig: (config: Partial<SidebarLayoutConfig>) => void
  getSidebarLayoutVariant: (id: string) => ReturnType<typeof getSidebarLayoutVariant>
  
  // Two Column Layout
  twoColumnLayoutConfig: TwoColumnLayoutConfig
  updateTwoColumnLayoutConfig: (config: Partial<TwoColumnLayoutConfig>) => void
  getTwoColumnLayoutVariant: (id: string) => ReturnType<typeof getTwoColumnLayoutVariant>
  
  // Container
  containerConfig: ContainerConfig
  updateContainerConfig: (config: Partial<ContainerConfig>) => void
  getContainerVariant: (id: string) => ReturnType<typeof getContainerVariant>
  
  // Page Layout
  pageLayoutConfig: PageLayoutConfig
  updatePageLayoutConfig: (config: Partial<PageLayoutConfig>) => void
  getPageLayoutVariant: (id: string) => ReturnType<typeof getPageLayoutVariant>
  
  // Utility functions
  resetToDefaults: () => void
  exportConfig: () => string
  importConfig: (configString: string) => void
}

export function useLayoutPatternsConfig(): UseLayoutPatternsConfigReturn {
  // Hero Section State
  const [heroSectionConfig, setHeroSectionConfig] = useState<HeroSectionConfig>(
    layoutPatternsConfig.heroSections.defaultConfig
  )
  
  // Content Section State
  const [contentSectionConfig, setContentSectionConfig] = useState<ContentSectionConfig>(
    layoutPatternsConfig.contentSections.defaultConfig
  )
  
  // Feature Grid State
  const [featureGridConfig, setFeatureGridConfig] = useState<FeatureGridConfig>(
    layoutPatternsConfig.featureGrids.defaultConfig
  )
  
  // Stats Section State
  const [statsSectionConfig, setStatsSectionConfig] = useState<StatsSectionConfig>(
    layoutPatternsConfig.statsSections.defaultConfig
  )
  
  // Testimonial Section State
  const [testimonialSectionConfig, setTestimonialSectionConfig] = useState<TestimonialSectionConfig>(
    layoutPatternsConfig.testimonialSections.defaultConfig
  )
  
  // CTA Section State
  const [ctaSectionConfig, setCTASectionConfig] = useState<CTASectionConfig>(
    layoutPatternsConfig.ctaSections.defaultConfig
  )
  
  // Sidebar Layout State
  const [sidebarLayoutConfig, setSidebarLayoutConfig] = useState<SidebarLayoutConfig>(
    layoutPatternsConfig.sidebarLayouts.defaultConfig
  )
  
  // Two Column Layout State
  const [twoColumnLayoutConfig, setTwoColumnLayoutConfig] = useState<TwoColumnLayoutConfig>(
    layoutPatternsConfig.twoColumnLayouts.defaultConfig
  )
  
  // Container State
  const [containerConfig, setContainerConfig] = useState<ContainerConfig>(
    layoutPatternsConfig.containers.defaultConfig
  )
  
  // Page Layout State
  const [pageLayoutConfig, setPageLayoutConfig] = useState<PageLayoutConfig>(
    layoutPatternsConfig.pageLayouts.defaultConfig
  )

  // Update functions
  const updateHeroSectionConfig = useCallback((config: Partial<HeroSectionConfig>) => {
    setHeroSectionConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateContentSectionConfig = useCallback((config: Partial<ContentSectionConfig>) => {
    setContentSectionConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateFeatureGridConfig = useCallback((config: Partial<FeatureGridConfig>) => {
    setFeatureGridConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateStatsSectionConfig = useCallback((config: Partial<StatsSectionConfig>) => {
    setStatsSectionConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateTestimonialSectionConfig = useCallback((config: Partial<TestimonialSectionConfig>) => {
    setTestimonialSectionConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateCTASectionConfig = useCallback((config: Partial<CTASectionConfig>) => {
    setCTASectionConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateSidebarLayoutConfig = useCallback((config: Partial<SidebarLayoutConfig>) => {
    setSidebarLayoutConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateTwoColumnLayoutConfig = useCallback((config: Partial<TwoColumnLayoutConfig>) => {
    setTwoColumnLayoutConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateContainerConfig = useCallback((config: Partial<ContainerConfig>) => {
    setContainerConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updatePageLayoutConfig = useCallback((config: Partial<PageLayoutConfig>) => {
    setPageLayoutConfig(prev => ({ ...prev, ...config }))
  }, [])

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setHeroSectionConfig(layoutPatternsConfig.heroSections.defaultConfig)
    setContentSectionConfig(layoutPatternsConfig.contentSections.defaultConfig)
    setFeatureGridConfig(layoutPatternsConfig.featureGrids.defaultConfig)
    setStatsSectionConfig(layoutPatternsConfig.statsSections.defaultConfig)
    setTestimonialSectionConfig(layoutPatternsConfig.testimonialSections.defaultConfig)
    setCTASectionConfig(layoutPatternsConfig.ctaSections.defaultConfig)
    setSidebarLayoutConfig(layoutPatternsConfig.sidebarLayouts.defaultConfig)
    setTwoColumnLayoutConfig(layoutPatternsConfig.twoColumnLayouts.defaultConfig)
    setContainerConfig(layoutPatternsConfig.containers.defaultConfig)
    setPageLayoutConfig(layoutPatternsConfig.pageLayouts.defaultConfig)
  }, [])

  // Export configuration
  const exportConfig = useCallback(() => {
    const config = {
      heroSectionConfig,
      contentSectionConfig,
      featureGridConfig,
      statsSectionConfig,
      testimonialSectionConfig,
      ctaSectionConfig,
      sidebarLayoutConfig,
      twoColumnLayoutConfig,
      containerConfig,
      pageLayoutConfig,
    }
    return JSON.stringify(config, null, 2)
  }, [
    heroSectionConfig,
    contentSectionConfig,
    featureGridConfig,
    statsSectionConfig,
    testimonialSectionConfig,
    ctaSectionConfig,
    sidebarLayoutConfig,
    twoColumnLayoutConfig,
    containerConfig,
    pageLayoutConfig,
  ])

  // Import configuration
  const importConfig = useCallback((configString: string) => {
    try {
      const config = JSON.parse(configString)
      if (config.heroSectionConfig) setHeroSectionConfig(config.heroSectionConfig)
      if (config.contentSectionConfig) setContentSectionConfig(config.contentSectionConfig)
      if (config.featureGridConfig) setFeatureGridConfig(config.featureGridConfig)
      if (config.statsSectionConfig) setStatsSectionConfig(config.statsSectionConfig)
      if (config.testimonialSectionConfig) setTestimonialSectionConfig(config.testimonialSectionConfig)
      if (config.ctaSectionConfig) setCTASectionConfig(config.ctaSectionConfig)
      if (config.sidebarLayoutConfig) setSidebarLayoutConfig(config.sidebarLayoutConfig)
      if (config.twoColumnLayoutConfig) setTwoColumnLayoutConfig(config.twoColumnLayoutConfig)
      if (config.containerConfig) setContainerConfig(config.containerConfig)
      if (config.pageLayoutConfig) setPageLayoutConfig(config.pageLayoutConfig)
    } catch (error) {
      console.error("Failed to import layout patterns configuration:", error)
    }
  }, [])

  return {
    config: layoutPatternsConfig,
    
    // Hero Section
    heroSectionConfig,
    updateHeroSectionConfig,
    getHeroSectionVariant,
    
    // Content Section
    contentSectionConfig,
    updateContentSectionConfig,
    getContentSectionVariant,
    
    // Feature Grid
    featureGridConfig,
    updateFeatureGridConfig,
    getFeatureGridVariant,
    
    // Stats Section
    statsSectionConfig,
    updateStatsSectionConfig,
    getStatsSectionVariant,
    
    // Testimonial Section
    testimonialSectionConfig,
    updateTestimonialSectionConfig,
    getTestimonialSectionVariant,
    
    // CTA Section
    ctaSectionConfig,
    updateCTASectionConfig,
    getCTASectionVariant,
    
    // Sidebar Layout
    sidebarLayoutConfig,
    updateSidebarLayoutConfig,
    getSidebarLayoutVariant,
    
    // Two Column Layout
    twoColumnLayoutConfig,
    updateTwoColumnLayoutConfig,
    getTwoColumnLayoutVariant,
    
    // Container
    containerConfig,
    updateContainerConfig,
    getContainerVariant,
    
    // Page Layout
    pageLayoutConfig,
    updatePageLayoutConfig,
    getPageLayoutVariant,
    
    // Utility functions
    resetToDefaults,
    exportConfig,
    importConfig,
  }
}
