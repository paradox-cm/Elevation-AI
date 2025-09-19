"use client"

import React from 'react'
import { PageSection } from '@/types/cms'
import { cn } from '@/lib/utils'

// Import section components - Only existing components
import { HeroTypewriterSection } from './sections/hero-typewriter-section'
import { HeroSimpleSection } from './sections/hero-simple-section'
import { IntroductionAccordionSection } from './sections/introduction-accordion-section'
import { ProblemCardsSection } from './sections/problem-cards-section'
import { LogoCarouselSection } from './sections/logo-carousel-section'
import { CTASection } from './sections/cta-section'
import { PlatformFeaturesSection } from './sections/platform-features-section'
import { SolutionsCarouselSection } from './sections/solutions-carousel-section'
import { ApproachCardsSection } from './sections/approach-cards-section'

interface DynamicSectionRendererProps {
  section: PageSection
  className?: string
}

// Section component mapping - Only for existing content types
const sectionComponents = {
  // Hero Section Types (existing content)
  hero_typewriter: HeroTypewriterSection,
  hero_simple: HeroSimpleSection,
  
  // Content Section Types (existing content)
  introduction_accordion: IntroductionAccordionSection,
  problem_cards: ProblemCardsSection,
  logo_carousel: LogoCarouselSection,
  cta: CTASection,
  
  // Platform Section Types (existing content)
  platform_features: PlatformFeaturesSection,
  solutions_carousel: SolutionsCarouselSection,
  approach_cards: ApproachCardsSection,
  
  // Legacy Types (for backward compatibility with existing data)
  hero: HeroSimpleSection,
  introduction: IntroductionAccordionSection,
  faq: HeroSimpleSection, // Will be replaced with proper component
  team_members: HeroSimpleSection, // Will be replaced with proper component
  partnership_info: HeroSimpleSection, // Will be replaced with proper component
  investment_info: HeroSimpleSection, // Will be replaced with proper component
  blog_listing: HeroSimpleSection, // Will be replaced with proper component
  custom: HeroSimpleSection // Will be replaced with proper component
}

export function DynamicSectionRenderer({ section, className }: DynamicSectionRendererProps) {
  // Get the appropriate component for this section type
  const SectionComponent = sectionComponents[section.section_type as keyof typeof sectionComponents]
  
  if (!SectionComponent) {
    console.warn(`No component found for section type: ${section.section_type}`)
    // Don't render anything for unimplemented section types
    // This ensures no placeholder content appears on the live site
    return null
  }

  // Parse section data
  const sectionData = typeof section.section_data === 'string' 
    ? JSON.parse(section.section_data) 
    : section.section_data || {}

  const sectionConfig = typeof section.metadata?.config === 'string'
    ? JSON.parse(section.metadata.config)
    : section.metadata?.config || {}

  const sectionStyles = typeof section.metadata?.styles === 'string'
    ? JSON.parse(section.metadata.styles)
    : section.metadata?.styles || {}

  // Combine all section data
  const combinedData = {
    ...sectionData,
    config: sectionConfig,
    styles: sectionStyles,
    title: section.title,
    content: section.content,
    metadata: section.metadata
  }

  return (
    <div 
      className={cn(
        "section",
        typeof section.metadata?.section_class === 'string' ? section.metadata.section_class : undefined,
        className
      )}
      id={section.id}
      data-section-type={section.section_type}
      data-section-id={section.id}
    >
      <SectionComponent 
        data={combinedData}
        section={section}
      />
    </div>
  )
}

// Helper function to render multiple sections
export function renderSections(sections: PageSection[], className?: string) {
  return sections
    .filter(section => section.is_published)
    .sort((a, b) => a.section_order - b.section_order)
    .map((section) => (
      <DynamicSectionRenderer
        key={section.id}
        section={section}
        className={className}
      />
    ))
}

// Helper function to get section by type
export function getSectionsByType(sections: PageSection[], type: string) {
  return sections.filter(section => section.section_type === type)
}

// Helper function to get section by ID
export function getSectionById(sections: PageSection[], id: string) {
  return sections.find(section => section.id === id)
}

export default DynamicSectionRenderer
