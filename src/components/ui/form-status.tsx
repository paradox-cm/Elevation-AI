"use client"

import React from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { cn } from "@/lib/utils"

export interface FormStatusProps {
  status: "idle" | "loading" | "success" | "error"
  title?: string
  message?: string
  onRetry?: () => void
  onDismiss?: () => void
  className?: string
  variant?: "default" | "inline" | "toast"
}

const statusConfig = {
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
  loading: {
    icon: "loader-2-line",
    className: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
    iconClassName: "text-blue-500 dark:text-blue-400 animate-spin",
  },
  idle: {
    icon: "",
    className: "",
    iconClassName: "",
  },
}

export function FormStatus({
  status,
  title,
  message,
  onRetry,
  onDismiss,
  className,
  variant = "default"
}: FormStatusProps) {
  if (status === "idle") return null

  const config = statusConfig[status]

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-2 text-sm", className)}>
        <Icon 
          name={config.icon} 
          className={cn("h-4 w-4", config.iconClassName)} 
        />
        <span className={config.iconClassName}>
          {message || title}
        </span>
      </div>
    )
  }

  if (variant === "toast") {
    return (
      <div className={cn(
        "fixed top-4 right-4 z-50 max-w-sm w-full",
        "transform transition-all duration-300 ease-in-out",
        "translate-x-0 opacity-100",
        className
      )}>
        <Alert className={cn(config.className, "shadow-lg")}>
          <Icon name={config.icon} className={cn("h-4 w-4", config.iconClassName)} />
          <AlertDescription className="flex items-center justify-between">
            <div>
              {title && <div className="font-medium">{title}</div>}
              {message && <div className="text-sm">{message}</div>}
            </div>
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="h-6 w-6 p-0 hover:bg-transparent"
              >
                <Icon name="close-line" className="h-3 w-3" />
              </Button>
            )}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <Alert className={cn(config.className, className)}>
      <Icon name={config.icon} className={cn("h-4 w-4", config.iconClassName)} />
      <AlertDescription>
        <div className="space-y-2">
          {title && <div className="font-medium">{title}</div>}
          {message && <div>{message}</div>}
          {status === "error" && onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="mt-2"
            >
              Try Again
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  )
}

// Hook for managing form status
export function useFormStatus() {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = React.useState<string>("")
  const [title, setTitle] = React.useState<string>("")

  const setLoading = (loadingMessage?: string) => {
    setStatus("loading")
    setMessage(loadingMessage || "Processing...")
    setTitle("")
  }

  const setSuccess = (successTitle: string, successMessage?: string) => {
    setStatus("success")
    setTitle(successTitle)
    setMessage(successMessage || "")
  }

  const setError = (errorTitle: string, errorMessage?: string) => {
    setStatus("error")
    setTitle(errorTitle)
    setMessage(errorMessage || "Something went wrong. Please try again.")
  }

  const reset = () => {
    setStatus("idle")
    setMessage("")
    setTitle("")
  }

  return {
    status,
    message,
    title,
    setLoading,
    setSuccess,
    setError,
    reset,
  }
}
