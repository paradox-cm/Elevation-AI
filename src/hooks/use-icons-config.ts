"use client"

import { useState } from 'react'
import {
  iconCategories,
  iconSizes,
  iconStyles,
  lineIcons,
  fillIcons,
  iconFoundation,
  usageGuidelines,
  implementationExamples,
  IconItem,
  IconCategory,
  IconSize,
  IconStyle
} from '@/lib/icons-config'

interface IconsConfig {
  iconCategories: IconCategory[]
  iconSizes: IconSize[]
  iconStyles: IconStyle[]
  lineIcons: string[]
  fillIcons: string[]
  iconFoundation: typeof iconFoundation
  usageGuidelines: typeof usageGuidelines
  implementationExamples: typeof implementationExamples
}

interface UseIconsConfigReturn extends IconsConfig {
  getIconByName: (name: string) => IconItem | undefined
  getIconsByCategory: (category: string) => string[]
  getIconsByStyle: (style: 'line' | 'fill') => string[]
  getIconSizeByName: (name: string) => IconSize | undefined
  getIconStyleByName: (name: string) => IconStyle | undefined
  searchIcons: (query: string) => string[]
  updateIconCategories: (categories: IconCategory[]) => void
  updateIconSizes: (sizes: IconSize[]) => void
  resetToDefaults: () => void
}

export function useIconsConfig(): UseIconsConfigReturn {
  const [config, setConfig] = useState<IconsConfig>({
    iconCategories,
    iconSizes,
    iconStyles,
    lineIcons,
    fillIcons,
    iconFoundation,
    usageGuidelines,
    implementationExamples
  })

  // Update icon categories
  const updateIconCategories = (newCategories: IconCategory[]) => {
    setConfig(prev => ({
      ...prev,
      iconCategories: newCategories
    }))
  }

  // Update icon sizes
  const updateIconSizes = (newSizes: IconSize[]) => {
    setConfig(prev => ({
      ...prev,
      iconSizes: newSizes
    }))
  }

  // Reset to defaults
  const resetToDefaults = () => {
    setConfig({
      iconCategories,
      iconSizes,
      iconStyles,
      lineIcons,
      fillIcons,
      iconFoundation,
      usageGuidelines,
      implementationExamples
    })
  }

  // Local helper functions that use the current state
  const getIconByNameLocal = (name: string): IconItem | undefined => {
    const allIcons = [...config.lineIcons, ...config.fillIcons]
    if (!allIcons.includes(name)) return undefined
    
    const style = name.includes('-line') ? 'line' : 'fill'
    const baseName = name.replace(/-line$/, '').replace(/-fill$/, '')
    
    return {
      name,
      category: getIconCategoryLocal(baseName),
      description: `Icon for ${baseName.replace(/-/g, ' ')}`,
      usage: getIconUsageLocal(baseName),
      tags: [baseName, style],
      style: style as 'line' | 'fill',
      size: 'md'
    }
  }

  const getIconsByCategoryLocal = (category: string): string[] => {
    const categoryData = config.iconCategories.find(cat => cat.name.toLowerCase() === category.toLowerCase())
    return categoryData ? categoryData.icons : []
  }

  const getIconsByStyleLocal = (style: 'line' | 'fill'): string[] => {
    return style === 'line' ? config.lineIcons : config.fillIcons
  }

  const getIconSizeByNameLocal = (name: string): IconSize | undefined => {
    return config.iconSizes.find(size => size.value === name)
  }

  const getIconStyleByNameLocal = (name: string): IconStyle | undefined => {
    return config.iconStyles.find(style => style.suffix === `-${name}`)
  }

  const searchIconsLocal = (query: string): string[] => {
    const allIcons = [...config.lineIcons, ...config.fillIcons]
    const lowercaseQuery = query.toLowerCase()
    
    return allIcons.filter(icon => 
      icon.toLowerCase().includes(lowercaseQuery) ||
      icon.replace(/-line$/, '').replace(/-fill$/, '').replace(/-/g, ' ').toLowerCase().includes(lowercaseQuery)
    )
  }

  // Helper functions for internal use
  const getIconCategoryLocal = (baseName: string): string => {
    const categoryMappings: Record<string, string> = {
      'home': 'Navigation',
      'search': 'Navigation',
      'settings': 'Settings & Preferences',
      'user': 'Settings & Preferences',
      'mail': 'Communication',
      'notification': 'Communication',
      'add': 'Actions',
      'star': 'Status & Feedback',
      'heart': 'Status & Feedback',
      'download': 'Actions',
      'upload': 'Actions',
      'edit': 'Actions',
      'delete': 'Actions',
      'file': 'Files & Media',
      'image': 'Files & Media',
      'video': 'Files & Media',
      'music': 'Files & Media',
      'phone': 'Communication',
      'chat': 'Communication',
      'message': 'Communication',
      'lock': 'Settings & Preferences',
      'shield': 'Settings & Preferences',
      'wifi': 'Settings & Preferences',
      'battery': 'Status & Feedback',
      'calendar': 'Actions',
      'check': 'Status & Feedback',
      'close': 'Status & Feedback',
      'arrow': 'Navigation',
      'folder': 'Files & Media',
      'save': 'Actions',
      'cloud': 'Files & Media',
      'code': 'Files & Media',
      'key': 'Settings & Preferences',
      'team': 'Communication',
      'question': 'Communication',
      'timer': 'Actions',
      'book': 'Files & Media'
    }
    
    for (const [key, category] of Object.entries(categoryMappings)) {
      if (baseName.includes(key)) {
        return category
      }
    }
    
    return 'General'
  }

  const getIconUsageLocal = (baseName: string): string[] => {
    const usageMappings: Record<string, string[]> = {
      'home': ['Main navigation', 'Dashboard', 'Landing page'],
      'search': ['Search functionality', 'Filter interfaces', 'Discovery features'],
      'settings': ['Configuration pages', 'User preferences', 'System settings'],
      'user': ['User profiles', 'Account management', 'Authentication'],
      'mail': ['Email interfaces', 'Communication features', 'Notifications'],
      'notification': ['Alert systems', 'Status updates', 'User feedback'],
      'add': ['Create new items', 'Form submissions', 'Content creation'],
      'star': ['Favorites', 'Ratings', 'Bookmarks'],
      'heart': ['Likes', 'Favorites', 'Emotional responses'],
      'download': ['File downloads', 'Export features', 'Data retrieval'],
      'upload': ['File uploads', 'Import features', 'Data submission'],
      'edit': ['Content editing', 'Form modifications', 'Data updates'],
      'delete': ['Remove items', 'Data cleanup', 'Content removal'],
      'file': ['File management', 'Document handling', 'Content organization'],
      'image': ['Media galleries', 'Photo uploads', 'Visual content'],
      'video': ['Video players', 'Media content', 'Streaming features'],
      'music': ['Audio players', 'Music libraries', 'Sound content'],
      'phone': ['Contact features', 'Communication', 'Call interfaces'],
      'chat': ['Messaging systems', 'Conversations', 'Real-time communication'],
      'message': ['Text communication', 'Notifications', 'Feedback systems'],
      'lock': ['Security features', 'Privacy controls', 'Authentication'],
      'shield': ['Security indicators', 'Protection features', 'Safety controls'],
      'wifi': ['Network status', 'Connectivity', 'Device settings'],
      'battery': ['Power status', 'Device health', 'System monitoring'],
      'calendar': ['Date selection', 'Event management', 'Scheduling'],
      'check': ['Success states', 'Confirmation', 'Completion'],
      'close': ['Dismiss actions', 'Cancel operations', 'Exit features'],
      'arrow': ['Navigation', 'Direction indicators', 'Movement controls'],
      'folder': ['File organization', 'Content management', 'Storage systems'],
      'save': ['Data persistence', 'Content storage', 'Backup features'],
      'cloud': ['Cloud storage', 'Remote data', 'Sync features'],
      'code': ['Development tools', 'Technical features', 'Programming interfaces'],
      'key': ['Security access', 'Authentication', 'Permission management'],
      'team': ['Collaboration', 'Group features', 'Social interactions'],
      'question': ['Help systems', 'Support features', 'Information access'],
      'timer': ['Time tracking', 'Scheduling', 'Productivity features'],
      'book': ['Documentation', 'Learning resources', 'Content libraries']
    }
    
    for (const [key, usage] of Object.entries(usageMappings)) {
      if (baseName.includes(key)) {
        return usage
      }
    }
    
    return ['General interface', 'User interaction', 'Content display']
  }

  return {
    ...config,
    getIconByName: getIconByNameLocal,
    getIconsByCategory: getIconsByCategoryLocal,
    getIconsByStyle: getIconsByStyleLocal,
    getIconSizeByName: getIconSizeByNameLocal,
    getIconStyleByName: getIconStyleByNameLocal,
    searchIcons: searchIconsLocal,
    updateIconCategories,
    updateIconSizes,
    resetToDefaults
  }
}

// Specialized hooks for specific use cases
export function useIcon(name: string): IconItem | undefined {
  const { getIconByName } = useIconsConfig()
  return getIconByName(name)
}

export function useIconsByCategory(category: string): string[] {
  const { getIconsByCategory } = useIconsConfig()
  return getIconsByCategory(category)
}

export function useIconsByStyle(style: 'line' | 'fill'): string[] {
  const { getIconsByStyle } = useIconsConfig()
  return getIconsByStyle(style)
}

export function useIconSize(name: string): IconSize | undefined {
  const { getIconSizeByName } = useIconsConfig()
  return getIconSizeByName(name)
}

export function useIconStyle(name: string): IconStyle | undefined {
  const { getIconStyleByName } = useIconsConfig()
  return getIconStyleByName(name)
}

export function useIconSearch(query: string): string[] {
  const { searchIcons } = useIconsConfig()
  return searchIcons(query)
}
