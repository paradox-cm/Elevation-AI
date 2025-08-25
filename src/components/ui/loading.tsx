"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Icon from "@/components/ui/icon"
import { H3, BodySmall } from "@/components/ui/typography"

// Loading Spinner Component
interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  text?: string
}

export function LoadingSpinner({ 
  size = "md", 
  className,
  text 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <Icon 
        name="loader-4-line" 
        className={cn(
          "animate-spin text-primary",
          sizeClasses[size]
        )} 
      />
      {text && (
        <BodySmall className="mt-2 text-muted-foreground">{text}</BodySmall>
      )}
    </div>
  )
}

// Loading Overlay Component
interface LoadingOverlayProps {
  isLoading: boolean
  text?: string
  children: React.ReactNode
  className?: string
}

export function LoadingOverlay({ 
  isLoading, 
  text = "Loading...", 
  children,
  className 
}: LoadingOverlayProps) {
  if (!isLoading) return <>{children}</>

  return (
    <div className={cn("relative", className)}>
      {children}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <LoadingSpinner text={text} />
      </div>
    </div>
  )
}

// Skeleton Loader Components
export function SkeletonCard() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[160px]" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>
  )
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[90px]" />
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[90px]" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonList({ items = 3 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-3 w-[160px]" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  )
}

// Content Placeholder Component
interface ContentPlaceholderProps {
  icon?: string
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function ContentPlaceholder({ 
  icon = "file-damage-line",
  title,
  description,
  action,
  className 
}: ContentPlaceholderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12", className)}>
      <div className="p-4 bg-muted rounded-full mb-4">
        <Icon name={icon} className="h-8 w-8 text-muted-foreground" />
      </div>
      <H3 className="text-lg font-medium mb-2 text-center">{title}</H3>
      <BodySmall className="text-muted-foreground text-center mb-6 max-w-sm">
        {description}
      </BodySmall>
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

// Loading States for Different Content Types
export function LoadingStates() {
  return (
    <div className="space-y-8">
      <div>
        <H3 className="mb-4">Loading Spinners</H3>
        <div className="flex items-center space-x-8">
          <LoadingSpinner size="sm" text="Small" />
          <LoadingSpinner size="md" text="Medium" />
          <LoadingSpinner size="lg" text="Large" />
          <LoadingSpinner size="xl" text="Extra Large" />
        </div>
      </div>

      <div>
        <H3 className="mb-4">Skeleton Loaders</H3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <BodySmall className="mb-2">Card Skeleton</BodySmall>
            <SkeletonCard />
          </div>
          <div>
            <BodySmall className="mb-2">List Skeleton</BodySmall>
            <SkeletonList />
          </div>
        </div>
      </div>

      <div>
        <H3 className="mb-4">Content Placeholders</H3>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <ContentPlaceholder
                icon="database-2-line"
                title="No data available"
                description="There are no items to display at the moment. Get started by creating your first item."
                action={{
                  label: "Create Item",
                  onClick: () => console.log("Create item"),
                }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <ContentPlaceholder
                icon="search-line"
                title="No search results"
                description="Try adjusting your search terms or filters to find what you're looking for."
                action={{
                  label: "Clear Filters",
                  onClick: () => console.log("Clear filters"),
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Toast Notification Component
interface ToastProps {
  type: "success" | "error" | "warning" | "info"
  title: string
  message?: string
  onClose?: () => void
  duration?: number
}

export function Toast({ 
  type, 
  title, 
  message, 
  onClose,
  duration = 5000 
}: ToastProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const typeConfig = {
    success: {
      icon: "check-line",
      className: "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
      iconClassName: "text-green-500 dark:text-green-400",
    },
    error: {
      icon: "close-line",
      className: "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
      iconClassName: "text-red-500 dark:text-red-400",
    },
    warning: {
      icon: "alert-line",
      className: "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
      iconClassName: "text-yellow-500 dark:text-yellow-400",
    },
    info: {
      icon: "information-line",
      className: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
      iconClassName: "text-blue-500 dark:text-blue-400",
    },
  }

  const config = typeConfig[type]

  if (!isVisible) return null

  return (
    <div className={cn(
      "fixed top-4 right-4 z-50 p-4 rounded-lg border shadow-lg max-w-sm",
      config.className
    )}>
      <div className="flex items-start space-x-3">
        <Icon name={config.icon} className={cn("h-5 w-5 mt-0.5", config.iconClassName)} />
        <div className="flex-1">
          <div className="font-medium">{title}</div>
          {message && (
            <BodySmall className="mt-1 opacity-90">{message}</BodySmall>
          )}
        </div>
        {onClose && (
          <button
            onClick={() => {
              setIsVisible(false)
              onClose()
            }}
            className="text-current opacity-70 hover:opacity-100"
          >
            <Icon name="close-line" className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// Toast Container for managing multiple toasts
export function ToastContainer() {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const addToast = (toast: Omit<ToastProps, 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, onClose: () => removeToast(id) }
    setToasts(prev => [...prev, newToast])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast, index) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}

// Progress Steps Component
interface ProgressStep {
  id: string
  title: string
  description?: string
  status: "pending" | "current" | "completed" | "error"
}

interface ProgressStepsProps {
  steps: ProgressStep[]
  currentStep: number
  className?: string
}

export function ProgressSteps({ steps, currentStep, className }: ProgressStepsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          Step {currentStep} of {steps.length}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round((currentStep / steps.length) * 100)}%
        </span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.status === "completed"
          const isCurrent = step.status === "current"
          const isError = step.status === "error"

          return (
            <div
              key={step.id}
              className={cn(
                "flex flex-col items-center space-y-1",
                isCompleted && "text-primary",
                isCurrent && "text-primary font-medium",
                !isCompleted && !isCurrent && "text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "w-3 h-3 rounded-full",
                  isCompleted && "bg-primary",
                  isCurrent && "bg-primary",
                  isError && "bg-destructive",
                  !isCompleted && !isCurrent && !isError && "bg-muted"
                )}
              />
              <span className="text-xs text-center max-w-20">{step.title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
