"use client"

import { useState, useEffect, useCallback } from 'react'
import { pagesService } from '@/lib/cms'
import { PageWithSections } from '@/types/cms'

// Global cache to store page data across the entire app
const pageCache = new Map<string, {
  data: PageWithSections | null
  timestamp: number
  isLoading: boolean
}>()

// Cache expiration time (5 minutes)
const CACHE_EXPIRY = 5 * 60 * 1000

interface UsePageCacheOptions {
  pageId: string
  enableCache?: boolean
  cacheExpiry?: number
}

interface UsePageCacheReturn {
  pageData: PageWithSections | null
  isLoading: boolean
  error: string | null
  refresh: () => Promise<void>
  clearCache: () => void
}

export function usePageCache({ 
  pageId, 
  enableCache = true, 
  cacheExpiry = CACHE_EXPIRY 
}: UsePageCacheOptions): UsePageCacheReturn {
  const [pageData, setPageData] = useState<PageWithSections | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if cache entry is valid
  const isCacheValid = useCallback((cacheEntry: Record<string, unknown>) => {
    if (!cacheEntry) return false
    const now = Date.now()
    const timestamp = typeof cacheEntry.timestamp === 'number' ? cacheEntry.timestamp : 0
    return (now - timestamp) < cacheExpiry
  }, [cacheExpiry])

  // Get data from cache or fetch from API
  const fetchPageData = useCallback(async (forceRefresh = false) => {
    const cacheKey = pageId
    
    // Check cache first (if enabled and not forcing refresh)
    if (enableCache && !forceRefresh) {
      const cachedEntry = pageCache.get(cacheKey)
      
      if (cachedEntry && isCacheValid(cachedEntry)) {
        // Use cached data
        setPageData(cachedEntry.data)
        setIsLoading(false)
        setError(null)
        return
      }
    }

    // Mark as loading only if we don't have valid cached data
    const cachedEntry = pageCache.get(cacheKey)
    if (!cachedEntry || !isCacheValid(cachedEntry)) {
      setIsLoading(true)
    }
    
    // Mark this page as loading in cache to prevent duplicate requests
    pageCache.set(cacheKey, {
      data: pageCache.get(cacheKey)?.data || null,
      timestamp: Date.now(),
      isLoading: true
    })

    try {
      const data = await pagesService.getWithSections(pageId)
      
      // Update cache
      pageCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
        isLoading: false
      })
      
      setPageData(data)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load page data'
      setError(errorMessage)
      
      // Update cache with error state
      pageCache.set(cacheKey, {
        data: pageCache.get(cacheKey)?.data || null,
        timestamp: Date.now(),
        isLoading: false
      })
    } finally {
      setIsLoading(false)
    }
  }, [pageId, enableCache, isCacheValid])

  // Refresh function to force reload
  const refresh = useCallback(async () => {
    await fetchPageData(true)
  }, [fetchPageData])

  // Clear cache function
  const clearCache = useCallback(() => {
    pageCache.delete(pageId)
  }, [pageId])

  // Initial load
  useEffect(() => {
    fetchPageData()
  }, [fetchPageData])

  // Listen for refresh events
  useEffect(() => {
    const handleRefresh = () => {
      refresh()
    }

    // Listen for page-specific refresh events
    window.addEventListener(`refresh-${pageId}-page`, handleRefresh)
    // Listen for global refresh events
    window.addEventListener('refresh-page', handleRefresh)
    
    return () => {
      window.removeEventListener(`refresh-${pageId}-page`, handleRefresh)
      window.removeEventListener('refresh-page', handleRefresh)
    }
  }, [refresh, pageId])

  return {
    pageData,
    isLoading,
    error,
    refresh,
    clearCache
  }
}

// Utility function to clear all cache
export function clearAllPageCache() {
  pageCache.clear()
}

// Utility function to get cache stats
export function getCacheStats() {
  const now = Date.now()
  const entries = Array.from(pageCache.entries())
  
  return {
    totalEntries: entries.length,
    validEntries: entries.filter(([_, entry]) => isCacheValid(entry)).length,
    expiredEntries: entries.filter(([_, entry]) => !isCacheValid(entry)).length,
    entries: entries.map(([key, entry]) => ({
      pageId: key,
      hasData: !!entry.data,
      age: now - entry.timestamp,
      isValid: isCacheValid(entry)
    }))
  }
}

// Helper function to check if cache entry is valid
function isCacheValid(cacheEntry: Record<string, unknown>): boolean {
  if (!cacheEntry) return false
  const now = Date.now()
  const timestamp = typeof cacheEntry.timestamp === 'number' ? cacheEntry.timestamp : 0
  return (now - timestamp) < CACHE_EXPIRY
}
