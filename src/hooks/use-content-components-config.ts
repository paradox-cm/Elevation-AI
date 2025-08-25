"use client"

import { useState, useCallback } from "react"
import {
  contentComponentsConfig,
  ArticleLayoutConfig,
  MediaCardConfig,
  GalleryConfig,
  TimelineConfig,
  FAQConfig,
  ContentBlockConfig,
  QuoteConfig,
  SocialShareConfig,
  getArticleLayoutVariant,
  getMediaCardVariant,
  getGalleryVariant,
  getTimelineVariant,
  getFAQVariant,
  getContentBlockVariant,
  getQuoteVariant,
  getSocialShareVariant,
  getSocialSharePlatform
} from "@/lib/content-components-config"

interface UseContentComponentsConfigReturn {
  // Configuration object
  config: typeof contentComponentsConfig
  
  // Article Layout configurations
  articleLayoutConfig: ArticleLayoutConfig
  updateArticleLayoutConfig: (config: Partial<ArticleLayoutConfig>) => void
  getArticleLayoutVariant: typeof getArticleLayoutVariant
  
  // Media Card configurations
  mediaCardConfig: MediaCardConfig
  updateMediaCardConfig: (config: Partial<MediaCardConfig>) => void
  getMediaCardVariant: typeof getMediaCardVariant
  
  // Gallery configurations
  galleryConfig: GalleryConfig
  updateGalleryConfig: (config: Partial<GalleryConfig>) => void
  getGalleryVariant: typeof getGalleryVariant
  
  // Timeline configurations
  timelineConfig: TimelineConfig
  updateTimelineConfig: (config: Partial<TimelineConfig>) => void
  getTimelineVariant: typeof getTimelineVariant
  
  // FAQ configurations
  faqConfig: FAQConfig
  updateFAQConfig: (config: Partial<FAQConfig>) => void
  getFAQVariant: typeof getFAQVariant
  
  // Content Block configurations
  contentBlockConfig: ContentBlockConfig
  updateContentBlockConfig: (config: Partial<ContentBlockConfig>) => void
  getContentBlockVariant: typeof getContentBlockVariant
  
  // Quote configurations
  quoteConfig: QuoteConfig
  updateQuoteConfig: (config: Partial<QuoteConfig>) => void
  getQuoteVariant: typeof getQuoteVariant
  
  // Social Share configurations
  socialShareConfig: SocialShareConfig
  updateSocialShareConfig: (config: Partial<SocialShareConfig>) => void
  getSocialShareVariant: typeof getSocialShareVariant
  getSocialSharePlatform: typeof getSocialSharePlatform
  
  // Utility functions
  resetToDefaults: () => void
  exportConfig: () => string
  importConfig: (configString: string) => void
}

export function useContentComponentsConfig(): UseContentComponentsConfigReturn {
  // Article Layout state
  const [articleLayoutConfig, setArticleLayoutConfig] = useState<ArticleLayoutConfig>(
    contentComponentsConfig.articleLayouts.defaultConfig
  )

  // Media Card state
  const [mediaCardConfig, setMediaCardConfig] = useState<MediaCardConfig>(
    contentComponentsConfig.mediaCards.defaultConfig
  )

  // Gallery state
  const [galleryConfig, setGalleryConfig] = useState<GalleryConfig>(
    contentComponentsConfig.galleries.defaultConfig
  )

  // Timeline state
  const [timelineConfig, setTimelineConfig] = useState<TimelineConfig>(
    contentComponentsConfig.timelines.defaultConfig
  )

  // FAQ state
  const [faqConfig, setFAQConfig] = useState<FAQConfig>(
    contentComponentsConfig.faqs.defaultConfig
  )

  // Content Block state
  const [contentBlockConfig, setContentBlockConfig] = useState<ContentBlockConfig>(
    contentComponentsConfig.contentBlocks.defaultConfig
  )

  // Quote state
  const [quoteConfig, setQuoteConfig] = useState<QuoteConfig>(
    contentComponentsConfig.quotes.defaultConfig
  )

  // Social Share state
  const [socialShareConfig, setSocialShareConfig] = useState<SocialShareConfig>(
    contentComponentsConfig.socialShare.defaultConfig
  )

  // Update functions
  const updateArticleLayoutConfig = useCallback((config: Partial<ArticleLayoutConfig>) => {
    setArticleLayoutConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateMediaCardConfig = useCallback((config: Partial<MediaCardConfig>) => {
    setMediaCardConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateGalleryConfig = useCallback((config: Partial<GalleryConfig>) => {
    setGalleryConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateTimelineConfig = useCallback((config: Partial<TimelineConfig>) => {
    setTimelineConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateFAQConfig = useCallback((config: Partial<FAQConfig>) => {
    setFAQConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateContentBlockConfig = useCallback((config: Partial<ContentBlockConfig>) => {
    setContentBlockConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateQuoteConfig = useCallback((config: Partial<QuoteConfig>) => {
    setQuoteConfig(prev => ({ ...prev, ...config }))
  }, [])

  const updateSocialShareConfig = useCallback((config: Partial<SocialShareConfig>) => {
    setSocialShareConfig(prev => ({ ...prev, ...config }))
  }, [])

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setArticleLayoutConfig(contentComponentsConfig.articleLayouts.defaultConfig)
    setMediaCardConfig(contentComponentsConfig.mediaCards.defaultConfig)
    setGalleryConfig(contentComponentsConfig.galleries.defaultConfig)
    setTimelineConfig(contentComponentsConfig.timelines.defaultConfig)
    setFAQConfig(contentComponentsConfig.faqs.defaultConfig)
    setContentBlockConfig(contentComponentsConfig.contentBlocks.defaultConfig)
    setQuoteConfig(contentComponentsConfig.quotes.defaultConfig)
    setSocialShareConfig(contentComponentsConfig.socialShare.defaultConfig)
  }, [])

  // Export configuration
  const exportConfig = useCallback(() => {
    const configToExport = {
      articleLayoutConfig,
      mediaCardConfig,
      galleryConfig,
      timelineConfig,
      faqConfig,
      contentBlockConfig,
      quoteConfig,
      socialShareConfig
    }
    return JSON.stringify(configToExport, null, 2)
  }, [
    articleLayoutConfig,
    mediaCardConfig,
    galleryConfig,
    timelineConfig,
    faqConfig,
    contentBlockConfig,
    quoteConfig,
    socialShareConfig
  ])

  // Import configuration
  const importConfig = useCallback((configString: string) => {
    try {
      const importedConfig = JSON.parse(configString)
      
      if (importedConfig.articleLayoutConfig) {
        setArticleLayoutConfig(importedConfig.articleLayoutConfig)
      }
      if (importedConfig.mediaCardConfig) {
        setMediaCardConfig(importedConfig.mediaCardConfig)
      }
      if (importedConfig.galleryConfig) {
        setGalleryConfig(importedConfig.galleryConfig)
      }
      if (importedConfig.timelineConfig) {
        setTimelineConfig(importedConfig.timelineConfig)
      }
      if (importedConfig.faqConfig) {
        setFAQConfig(importedConfig.faqConfig)
      }
      if (importedConfig.contentBlockConfig) {
        setContentBlockConfig(importedConfig.contentBlockConfig)
      }
      if (importedConfig.quoteConfig) {
        setQuoteConfig(importedConfig.quoteConfig)
      }
      if (importedConfig.socialShareConfig) {
        setSocialShareConfig(importedConfig.socialShareConfig)
      }
    } catch (error) {
      console.error("Failed to import configuration:", error)
    }
  }, [])

  return {
    config: contentComponentsConfig,
    
    // Article Layout
    articleLayoutConfig,
    updateArticleLayoutConfig,
    getArticleLayoutVariant,
    
    // Media Card
    mediaCardConfig,
    updateMediaCardConfig,
    getMediaCardVariant,
    
    // Gallery
    galleryConfig,
    updateGalleryConfig,
    getGalleryVariant,
    
    // Timeline
    timelineConfig,
    updateTimelineConfig,
    getTimelineVariant,
    
    // FAQ
    faqConfig,
    updateFAQConfig,
    getFAQVariant,
    
    // Content Block
    contentBlockConfig,
    updateContentBlockConfig,
    getContentBlockVariant,
    
    // Quote
    quoteConfig,
    updateQuoteConfig,
    getQuoteVariant,
    
    // Social Share
    socialShareConfig,
    updateSocialShareConfig,
    getSocialShareVariant,
    getSocialSharePlatform,
    
    // Utilities
    resetToDefaults,
    exportConfig,
    importConfig,
  }
}
