"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ExternalLink } from "lucide-react"
import Link from "next/link"

export function SetupBanner() {
  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "your_supabase_project_url" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "your_supabase_anon_key"

  if (isSupabaseConfigured) {
    return null
  }

  return (
    <div className="border-b bg-muted/50">
      <div className="container py-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Setup Required</AlertTitle>
          <AlertDescription className="mt-2">
            This is a demo recruitment platform. To enable full functionality, you need to configure Supabase.
            <div className="mt-4 space-y-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Quick Setup Steps:</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>
                      Create a Supabase project at{" "}
                      <Link href="https://supabase.com" className="text-primary hover:underline" target="_blank">
                        supabase.com
                      </Link>
                    </li>
                    <li>Copy your project URL and anon key</li>
                    <li>Add them to your environment variables</li>
                    <li>Set up the database tables</li>
                  </ol>
                  <div className="mt-3">
                    <Button asChild size="sm">
                      <Link href="https://supabase.com/dashboard" target="_blank">
                        Get Started <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
