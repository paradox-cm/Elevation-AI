"use client"

import { useEffect, useState } from 'react'
import { siteSettingsService } from '@/lib/cms'
import { Button } from '@/components/ui/button'
import { H1, P } from '@/components/ui/typography'
import Link from 'next/link'

interface HeroSectionProps {
  pageSlug: string
  fallbackTitle?: string
  fallbackSubtitle?: string
  fallbackCtaPrimary?: string
  fallbackCtaSecondary?: string
  fallbackCtaPrimaryUrl?: string
  fallbackCtaSecondaryUrl?: string
}

export function DynamicHero({
  pageSlug,
  fallbackTitle = "The Agentic Platform for",
  fallbackSubtitle = "Elevation AI is the agentic knowledge and work orchestration platform, powered by a concierge team, unifying knowledge, streamlining workflows and securing your use of AI. Your universe, intelligently orchestrated.",
  fallbackCtaPrimary = "Get Started",
  fallbackCtaSecondary = "Request a Demo",
  fallbackCtaPrimaryUrl = "/website/sign-up",
  fallbackCtaSecondaryUrl = "/website/demo"
}: HeroSectionProps) {
  const [settings, setSettings] = useState<{
    title: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    ctaPrimaryUrl: string
    ctaSecondaryUrl: string
  }>({
    title: fallbackTitle,
    subtitle: fallbackSubtitle,
    ctaPrimary: fallbackCtaPrimary,
    ctaSecondary: fallbackCtaSecondary,
    ctaPrimaryUrl: fallbackCtaPrimaryUrl,
    ctaSecondaryUrl: fallbackCtaSecondaryUrl
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [
          title,
          subtitle,
          ctaPrimary,
          ctaSecondary,
          ctaPrimaryUrl,
          ctaSecondaryUrl
        ] = await Promise.all([
          siteSettingsService.getByKey(`${pageSlug}_hero_title`),
          siteSettingsService.getByKey(`${pageSlug}_hero_subtitle`),
          siteSettingsService.getByKey(`${pageSlug}_hero_cta_primary`),
          siteSettingsService.getByKey(`${pageSlug}_hero_cta_secondary`),
          siteSettingsService.getByKey(`${pageSlug}_hero_cta_primary_url`),
          siteSettingsService.getByKey(`${pageSlug}_hero_cta_secondary_url`)
        ])

        setSettings({
          title: title || fallbackTitle,
          subtitle: subtitle || fallbackSubtitle,
          ctaPrimary: ctaPrimary || fallbackCtaPrimary,
          ctaSecondary: ctaSecondary || fallbackCtaSecondary,
          ctaPrimaryUrl: ctaPrimaryUrl || fallbackCtaPrimaryUrl,
          ctaSecondaryUrl: ctaSecondaryUrl || fallbackCtaSecondaryUrl
        })
      } catch (error) {
        console.error('Error fetching hero settings:', error)
        // Keep fallback values
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [pageSlug, fallbackTitle, fallbackSubtitle, fallbackCtaPrimary, fallbackCtaSecondary, fallbackCtaPrimaryUrl, fallbackCtaSecondaryUrl])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {/* Content */}
      <div className="space-y-6 sm:space-y-8 text-left">
        <div className="space-y-4 sm:space-y-6">
          <H1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold leading-tight tracking-tight">
            {settings.title}
          </H1>
          <P className="text-muted-foreground max-w-2xl xl:max-w-4xl 2xl:max-w-5xl text-base sm:text-base md:text-lg leading-relaxed">
            {settings.subtitle}
          </P>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button size="lg" asChild className="text-base sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
            <Link href={settings.ctaPrimaryUrl}>
              {settings.ctaPrimary}
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="text-base sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
            <Link href={settings.ctaSecondaryUrl}>
              {settings.ctaSecondary}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
