"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { X, Cookie } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CookiesBannerProps {
  className?: string
}

export function CookiesBanner({ className }: CookiesBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('cookies-consent')
    if (!hasConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true)
        setIsAnimating(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookies-consent', 'accepted')
    setIsAnimating(false)
    setTimeout(() => setIsVisible(false), 300)
  }

  const handleDecline = () => {
    localStorage.setItem('cookies-consent', 'declined')
    setIsAnimating(false)
    setTimeout(() => setIsVisible(false), 300)
  }

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => setIsVisible(false), 300)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6",
        "transform transition-all duration-300 ease-in-out",
        isAnimating ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        className
      )}
    >
      <Card className="mx-auto max-w-4xl border-border/50 bg-background/95 backdrop-blur-sm shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon and Content */}
            <div className="flex items-start gap-3 flex-1">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Cookie className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  We use cookies
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies.{' '}
                  <button 
                    className="text-primary hover:underline focus:outline-none focus:underline"
                    onClick={() => {/* TODO: Open privacy policy */}}
                  >
                    Learn more
                  </button>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
                className="w-full sm:w-auto"
              >
                Decline
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="w-full sm:w-auto"
              >
                Accept All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="w-full sm:w-auto sm:hidden"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Close button for desktop */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="hidden sm:flex flex-shrink-0 w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
