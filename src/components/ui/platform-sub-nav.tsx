"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PlatformSubNavProps {
  className?: string
}

interface SectionRef {
  id: string
  element: HTMLElement
  title: string
}

const platformSections = [
  { id: "knowledge-blocks", title: "Knowledge Blocks" },
  { id: "workspace", title: "Workspace" },
  { id: "integration-hub", title: "Integration Hub" },
  { id: "library-interface", title: "Library Interface" },
  { id: "co-pilot-interface", title: "Co-pilot Interface" }
]

export function PlatformSubNav({ className }: PlatformSubNavProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const activeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      setIsScrolling(true)

      // Set a new timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)

      // Get the platform features section
      const featuresSection = document.getElementById("features")
      if (!featuresSection) return

      const featuresRect = featuresSection.getBoundingClientRect()
      const featuresTop = featuresRect.top
      const featuresBottom = featuresRect.bottom

      // Show/hide sub-nav based on whether we're in the features section
      const shouldShow = featuresTop <= 100 && featuresBottom > 200
      setIsVisible(shouldShow)

      if (shouldShow) {
        // Find which section is currently in view
        const sections: SectionRef[] = []
        
        // Map the platform sections to their actual DOM elements
        // Based on the platform page structure, we need to find the actual sections
        const sectionMappings = [
          { id: "knowledge-blocks", selector: "[data-section='knowledge-graph']" },
          { id: "workspace", selector: "[data-section='workspace']" },
          { id: "integration-hub", selector: "[data-section='integration-hub']" },
          { id: "library-interface", selector: "[data-section='library']" },
          { id: "co-pilot-interface", selector: "[data-section='co-pilot']" }
        ]

        sectionMappings.forEach(({ id, selector }) => {
          const element = document.querySelector(selector) as HTMLElement
          if (element) {
            sections.push({
              id,
              element,
              title: platformSections.find(s => s.id === id)?.title || id
            })
          }
        })

        // Find the active section
        let currentActive = null
        const scrollPosition = window.scrollY + 200 // Offset for better UX

        for (const section of sections) {
          const rect = section.element.getBoundingClientRect()
          const elementTop = window.scrollY + rect.top
          const elementBottom = elementTop + rect.height

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            currentActive = section.id
            break
          }
        }

        // If no section is active but we're in the features area, default to first section
        if (!currentActive && sections.length > 0) {
          const firstSection = sections[0]
          const rect = firstSection.element.getBoundingClientRect()
          const elementTop = window.scrollY + rect.top
          
          if (scrollPosition >= elementTop) {
            currentActive = firstSection.id
          }
        }

        setActiveSection(currentActive)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Auto-scroll to active button on mobile
  useEffect(() => {
    if (activeButtonRef.current && navRef.current) {
      const nav = navRef.current
      const activeButton = activeButtonRef.current
      
      const navRect = nav.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()
      
      // Check if button is outside the visible area
      const isButtonLeftOfNav = buttonRect.left < navRect.left
      const isButtonRightOfNav = buttonRect.right > navRect.right
      
      if (isButtonLeftOfNav || isButtonRightOfNav) {
        const scrollLeft = activeButton.offsetLeft - (nav.offsetWidth / 2) + (activeButton.offsetWidth / 2)
        nav.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        })
      }
    }
  }, [activeSection])

  const scrollToSection = (sectionId: string) => {
    const sectionMappings: Record<string, string> = {
      "knowledge-blocks": "[data-section='knowledge-graph']",
      "workspace": "[data-section='workspace']",
      "integration-hub": "[data-section='integration-hub']",
      "library-interface": "[data-section='library']",
      "co-pilot-interface": "[data-section='co-pilot']"
    }

    const selector = sectionMappings[sectionId]
    if (selector) {
      const element = document.querySelector(selector) as HTMLElement
      if (element) {
        // Account for main header (64px) + sub-nav height (approximately 60px) + extra spacing
        const offset = 160
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed top-14 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50 transition-all duration-300",
        isScrolling ? "opacity-90" : "opacity-100",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center pt-3 pb-2">
          <nav ref={navRef} className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide h-10">
            {platformSections.map((section) => (
              <Button
                key={section.id}
                ref={activeSection === section.id ? activeButtonRef : null}
                variant={activeSection === section.id ? "default" : "ghost"}
                size="sm"
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "whitespace-nowrap text-sm font-medium transition-all duration-200 h-8",
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {section.title}
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
