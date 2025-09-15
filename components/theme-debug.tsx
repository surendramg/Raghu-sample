"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ThemeDebug() {
  const { theme, resolvedTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Card className="fixed bottom-4 left-4 z-50 w-64 opacity-80 hover:opacity-100 transition-opacity">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Theme Debug</CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-1">
        <div>
          Current theme: <strong>{theme}</strong>
        </div>
        <div>
          Resolved theme: <strong>{resolvedTheme}</strong>
        </div>
        <div>
          System theme: <strong>{systemTheme}</strong>
        </div>
        <div>
          Document class: <strong>{document.documentElement.className}</strong>
        </div>
      </CardContent>
    </Card>
  )
}
