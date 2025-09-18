import { Loader2 } from "lucide-react"

export function AuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading authentication...</p>
      </div>
    </div>
  )
}