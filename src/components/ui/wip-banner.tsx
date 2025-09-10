"use client"

import React from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

export function WIPBanner() {
  return (
    <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50 mb-6">
      <AlertDescription className="flex items-center gap-3">
        <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
          Work In Progress
        </Badge>
        <span className="text-amber-800 dark:text-amber-200">
          This page is currently under development. Content, design and features in progress.
        </span>
      </AlertDescription>
    </Alert>
  )
}
