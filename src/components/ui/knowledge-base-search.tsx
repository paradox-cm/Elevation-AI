"use client"

import React, { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { cn } from "@/lib/utils"

interface SearchableItem {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
}

interface KnowledgeBaseSearchProps {
  items: SearchableItem[]
  onSearch?: (query: string, results: SearchableItem[]) => void
  placeholder?: string
  className?: string
}

export function KnowledgeBaseSearch({ 
  items, 
  onSearch, 
  placeholder = "Search knowledge base...",
  className 
}: KnowledgeBaseSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return items
    }

    const query = searchQuery.toLowerCase().trim()
    
    return items.filter(item => {
      const searchableText = [
        item.question,
        item.answer,
        item.category,
        ...(item.tags || [])
      ].join(" ").toLowerCase()

      return searchableText.includes(query)
    })
  }, [searchQuery, items])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setIsSearching(true)
    
    // Simulate search delay for better UX
    setTimeout(() => {
      setIsSearching(false)
      onSearch?.(query, searchResults)
    }, 150)
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    onSearch?.("", items)
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <div className="relative">
          <Icon 
            name="search-line" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" 
          />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-10 h-12 text-base"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-muted/50"
            >
              <Icon name="close-line" className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Search Results Count */}
        {searchQuery && (
          <div className="mt-2 text-sm text-muted-foreground">
            {isSearching ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                Searching...
              </div>
            ) : (
              <span>
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                {searchQuery && ` for "${searchQuery}"`}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
