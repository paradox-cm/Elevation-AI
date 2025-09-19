"use client"

import { useState, useEffect, useCallback } from 'react'
import { blogPostsService } from '@/lib/cms'
import { BlogPostWithCategory } from '@/types/cms'

// Global cache for blog posts
const blogCache = new Map<string, {
  data: BlogPostWithCategory | null
  timestamp: number
  isLoading: boolean
}>()

const blogListCache = new Map<string, {
  data: BlogPostWithCategory[]
  timestamp: number
  isLoading: boolean
}>()

// Cache expiration time (5 minutes)
const CACHE_EXPIRY = 5 * 60 * 1000

interface UseBlogPostCacheOptions {
  slug: string
  enableCache?: boolean
  cacheExpiry?: number
}

interface UseBlogPostCacheReturn {
  post: BlogPostWithCategory | null
  isLoading: boolean
  error: string | null
  refresh: () => Promise<void>
  clearCache: () => void
}

export function useBlogPostCache({ 
  slug, 
  enableCache = true, 
  cacheExpiry = CACHE_EXPIRY 
}: UseBlogPostCacheOptions): UseBlogPostCacheReturn {
  const [post, setPost] = useState<BlogPostWithCategory | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if cache entry is valid
  const isCacheValid = useCallback((cacheEntry: Record<string, unknown>) => {
    if (!cacheEntry) return false
    const now = Date.now()
    return (now - cacheEntry.timestamp) < cacheExpiry
  }, [cacheExpiry])

  // Get blog post from cache or fetch from API
  const fetchBlogPost = useCallback(async (forceRefresh = false) => {
    const cacheKey = slug
    
    // Check cache first (if enabled and not forcing refresh)
    if (enableCache && !forceRefresh) {
      const cachedEntry = blogCache.get(cacheKey)
      
      if (cachedEntry && isCacheValid(cachedEntry) && !cachedEntry.isLoading) {
        // Use cached data
        setPost(cachedEntry.data)
        setIsLoading(false)
        setError(null)
        return
      }
    }

    // Mark as loading only if we don't have valid cached data or if it's currently loading
    const currentCacheEntry = blogCache.get(cacheKey)
    if (!currentCacheEntry || !isCacheValid(currentCacheEntry) || !currentCacheEntry.isLoading) {
      setIsLoading(true)
    }
    
    // Mark this post as loading in cache to prevent duplicate requests
    blogCache.set(cacheKey, {
      data: blogCache.get(cacheKey)?.data || null,
      timestamp: Date.now(),
      isLoading: true
    })

    try {
      const data = await blogPostsService.getBySlug(slug)
      
      // Transform the database post to match the expected format
      const transformedPost = {
        ...data,
        author: data.author_id ? "Elevation AI Team" : "Elevation AI Team",
        author_role: "Content Team",
        read_time: "8 min read" // Default read time
      }
      
      // Update cache
      blogCache.set(cacheKey, {
        data: transformedPost,
        timestamp: Date.now(),
        isLoading: false
      })
      
      setPost(transformedPost)
      setError(null)
    } catch (err) {
      // Only set error if it's a real error, not just a 404
      const errorMessage = err instanceof Error ? err.message : 'Failed to load blog post'
      
      // Check if it's a "not found" error specifically
      if (errorMessage.includes('PGRST116') || errorMessage.includes('not found')) {
        setError('Blog post not found')
      } else {
        setError(errorMessage)
      }
      
      // Update cache with error state
      blogCache.set(cacheKey, {
        data: blogCache.get(cacheKey)?.data || null,
        timestamp: Date.now(),
        isLoading: false
      })
    } finally {
      setIsLoading(false)
    }
  }, [slug, enableCache, isCacheValid])

  // Refresh function to force reload
  const refresh = useCallback(async () => {
    await fetchBlogPost(true)
  }, [fetchBlogPost])

  // Clear cache function
  const clearCache = useCallback(() => {
    blogCache.delete(slug)
  }, [slug])

  // Initial load
  useEffect(() => {
    fetchBlogPost()
  }, [fetchBlogPost])

  return {
    post,
    isLoading,
    error,
    refresh,
    clearCache
  }
}

interface UseBlogListCacheOptions {
  enableCache?: boolean
  cacheExpiry?: number
}

interface UseBlogListCacheReturn {
  posts: BlogPostWithCategory[]
  isLoading: boolean
  error: string | null
  refresh: () => Promise<void>
  clearCache: () => void
}

export function useBlogListCache({ 
  enableCache = true, 
  cacheExpiry = CACHE_EXPIRY 
}: UseBlogListCacheOptions = {}): UseBlogListCacheReturn {
  const [posts, setPosts] = useState<BlogPostWithCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if cache entry is valid
  const isCacheValid = useCallback((cacheEntry: Record<string, unknown>) => {
    if (!cacheEntry) return false
    const now = Date.now()
    return (now - cacheEntry.timestamp) < cacheExpiry
  }, [cacheExpiry])

  // Get blog list from cache or fetch from API
  const fetchBlogList = useCallback(async (forceRefresh = false) => {
    const cacheKey = 'all-posts'
    
    // Check cache first (if enabled and not forcing refresh)
    if (enableCache && !forceRefresh) {
      const cachedEntry = blogListCache.get(cacheKey)
      
      if (cachedEntry && isCacheValid(cachedEntry)) {
        // Use cached data
        setPosts(cachedEntry.data)
        setIsLoading(false)
        setError(null)
        return
      }
    }

    // Mark as loading only if we don't have valid cached data
    if (!blogListCache.get(cacheKey) || !isCacheValid(blogListCache.get(cacheKey))) {
      setIsLoading(true)
    }
    
    // Mark this list as loading in cache to prevent duplicate requests
    blogListCache.set(cacheKey, {
      data: blogListCache.get(cacheKey)?.data || [],
      timestamp: Date.now(),
      isLoading: true
    })

    try {
      const data = await blogPostsService.getAll()
      
      // Update cache
      blogListCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
        isLoading: false
      })
      
      setPosts(data)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load blog posts'
      setError(errorMessage)
      
      // Update cache with error state
      blogListCache.set(cacheKey, {
        data: blogListCache.get(cacheKey)?.data || [],
        timestamp: Date.now(),
        isLoading: false
      })
    } finally {
      setIsLoading(false)
    }
  }, [enableCache, isCacheValid])

  // Refresh function to force reload
  const refresh = useCallback(async () => {
    await fetchBlogList(true)
  }, [fetchBlogList])

  // Clear cache function
  const clearCache = useCallback(() => {
    blogListCache.delete('all-posts')
  }, [])

  // Initial load
  useEffect(() => {
    fetchBlogList()
  }, [fetchBlogList])

  return {
    posts,
    isLoading,
    error,
    refresh,
    clearCache
  }
}

// Utility function to clear all blog cache
export function clearAllBlogCache() {
  blogCache.clear()
  blogListCache.clear()
}

// Utility function to get blog cache stats
export function getBlogCacheStats() {
  const now = Date.now()
  const postEntries = Array.from(blogCache.entries())
  const listEntries = Array.from(blogListCache.entries())
  
  return {
    totalPostEntries: postEntries.length,
    totalListEntries: listEntries.length,
    validPostEntries: postEntries.filter(([_, entry]) => isCacheValid(entry)).length,
    validListEntries: listEntries.filter(([_, entry]) => isCacheValid(entry)).length,
  }
}

// Helper function to check if cache entry is valid
function isCacheValid(cacheEntry: Record<string, unknown>): boolean {
  if (!cacheEntry) return false
  const now = Date.now()
  return (now - cacheEntry.timestamp) < CACHE_EXPIRY
}
