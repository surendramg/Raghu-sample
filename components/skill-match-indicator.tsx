"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface SkillMatchIndicatorProps {
  percentage: number
  size?: "sm" | "md" | "lg"
  showProgress?: boolean
  className?: string
}

export function SkillMatchIndicator({
  percentage,
  size = "md",
  showProgress = false,
  className,
}: SkillMatchIndicatorProps) {
  const getMatchColor = (percent: number) => {
    if (percent >= 90) return "bg-emerald-500"
    if (percent >= 75) return "bg-green-500"
    if (percent >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getMatchLabel = (percent: number) => {
    if (percent >= 90) return "Excellent"
    if (percent >= 75) return "Good"
    if (percent >= 50) return "Partial"
    return "Poor"
  }

  const getVariant = (percent: number) => {
    if (percent >= 75) return "default"
    if (percent >= 50) return "secondary"
    return "destructive"
  }

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center space-x-2">
        <Badge variant={getVariant(percentage)} className={sizeClasses[size]}>
          {percentage}% Match
        </Badge>
        <span className={cn("text-muted-foreground", sizeClasses[size])}>{getMatchLabel(percentage)}</span>
      </div>
      {showProgress && (
        <Progress value={percentage} className={cn("h-2", size === "sm" && "h-1", size === "lg" && "h-3")} />
      )}
    </div>
  )
}
