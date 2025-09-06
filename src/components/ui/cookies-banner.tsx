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
        "fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 md:p-6",
        "transform transition-all duration-300 ease-in-out",
        isAnimating ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        className
      )}
    >
      <Card className="mx-auto max-w-4xl border-border/50 bg-background/95 backdrop-blur-sm shadow-lg">
        <CardContent className="p-3 sm:p-4 md:p-6">
          {/* Mobile Layout */}
          <div className="block sm:hidden">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center">
                <Cookie className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  We use cookies
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
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
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="flex-shrink-0 w-10 h-10 p-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Mobile Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
                className="flex-1 text-xs h-8"
              >
                Decline
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="flex-1 text-xs h-8"
              >
                Accept All
              </Button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-start sm:items-center gap-4">
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

            {/* Desktop Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
              >
                Decline
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
              >
                Accept All
              </Button>
            </div>

            {/* Close button for desktop */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="flex-shrink-0 w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
