"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SolutionsSubNavProps {
  className?: string
}

interface SectionRef {
  id: string
  element: HTMLElement
  title: string
}

const solutionsSections = [
  { id: "industry-solutions", title: "Industry Solutions" },
  { id: "stage-solutions", title: "By Stage Solutions" }
]

export function SolutionsSubNav({ className }: SolutionsSubNavProps) {
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

      // Get the solutions sections
      const industrySection = document.getElementById("industry-solutions")
      const stageSection = document.getElementById("stage-solutions")
      
      if (!industrySection || !stageSection) return

      const industryRect = industrySection.getBoundingClientRect()
      const stageRect = stageSection.getBoundingClientRect()
      
      // Show sub-nav when we're in either solutions section
      const shouldShow = (industryRect.top <= 100 && industryRect.bottom > 200) || 
                        (stageRect.top <= 100 && stageRect.bottom > 200)
      setIsVisible(shouldShow)

      if (shouldShow) {
        // Find which section is currently in view
        const sections: SectionRef[] = [
          { id: "industry-solutions", element: industrySection, title: "Industry Solutions" },
          { id: "stage-solutions", element: stageSection, title: "By Stage Solutions" }
        ]

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

        // If no section is active but we're in the solutions area, default to first section
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
    const element = document.getElementById(sectionId)
    if (element) {
      // Account for main header + sub-nav height + extra spacing
      // Mobile: top-14 (56px) + sub-nav height (~60px) + extra spacing = 140px
      // Desktop: top-16 (64px) + sub-nav height (~60px) + extra spacing = 160px
      const isMobile = window.innerWidth < 640 // sm breakpoint
      const offset = isMobile ? 140 : 160
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed top-14 sm:top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50 transition-all duration-300",
        isScrolling ? "opacity-90" : "opacity-100",
        className
      )}
    >
      <div className="w-full">
        <div className="flex items-center pt-2 sm:pt-4 pb-2">
          <nav ref={navRef} className="flex items-center w-full">
            {solutionsSections.map((section) => (
              <Button
                key={section.id}
                ref={activeSection === section.id ? activeButtonRef : null}
                variant={activeSection === section.id ? "default" : "ghost"}
                size="sm"
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "flex-1 text-sm font-medium transition-all duration-200 h-8 rounded-none first:rounded-l-none last:rounded-r-none",
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
