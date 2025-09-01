"use client"

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import Icon from '@/components/ui/icon'
import { cn } from '@/lib/utils'

interface CollapsibleCardProps {
  title: string
  icon: string
  description: string
  children?: React.ReactNode
  className?: string
  defaultOpen?: boolean
  iconClassName?: string
  iconContainerClassName?: string
}

export function CollapsibleCard({ 
  title, 
  icon, 
  description, 
  children, 
  className,
  defaultOpen = false,
  iconClassName = "text-primary",
  iconContainerClassName = "bg-primary/10",
  isInViewport = false
}: CollapsibleCardProps & { isInViewport?: boolean }) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  // Auto-expand/collapse based on viewport visibility
  React.useEffect(() => {
    if (isInViewport !== undefined) {
      setIsOpen(isInViewport)
    }
  }, [isInViewport])

  return (
    <Card className={cn("border-border/50", className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className={cn("pb-6 transition-all duration-300 ease-in-out", !isOpen && "pb-3")}>
          <div className={cn("space-y-6 transition-all duration-300 ease-in-out", !isOpen && "space-y-0")}>
            {/* Icon and Title with Collapse Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", iconContainerClassName)}>
                  <Icon name={icon} size="2xl" className={iconClassName} />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold">{title}</h3>
              </div>
              
              {/* Collapse/Expand Button */}
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-muted/50"
                >
                  <Icon 
                    name={isOpen ? "arrow-up-s-line" : "arrow-down-s-line"} 
                    className="h-4 w-4 transition-transform duration-200" 
                  />
                </Button>
              </CollapsibleTrigger>
            </div>
            
            {/* Description - Only visible when expanded */}
            <CollapsibleContent className={cn("space-y-6 transition-all duration-300 ease-in-out", !isOpen && "space-y-0")}>
              <p className="text-muted-foreground leading-relaxed text-base">
                {description}
              </p>
              {children}
            </CollapsibleContent>
          </div>
        </CardHeader>
      </Collapsible>
    </Card>
  )
}
