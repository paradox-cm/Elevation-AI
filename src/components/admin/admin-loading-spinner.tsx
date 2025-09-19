import { LogoLoadingSpinner } from "@/components/ui/loading-spinner"

export function AdminLoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <LogoLoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-muted-foreground">Loading admin dashboard...</p>
      </div>
    </div>
  )
}
