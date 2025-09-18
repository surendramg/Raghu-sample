"use client"

import { Badge } from "@/components/ui/badge"
import { Shield, Building, UserCheck } from "lucide-react"

interface RoleIndicatorProps {
  role: "admin" | "employer" | "candidate" | "client"
}

export function RoleIndicator({ role }: RoleIndicatorProps) {
  const roleConfig = {
    admin: {
      label: "Admin",
      icon: Shield,
      variant: "destructive" as const,
    },
    employer: {
      label: "Employer",
      icon: Building,
      variant: "default" as const,
    },
    candidate: {
      label: "Candidate",
      icon: UserCheck,
      variant: "secondary" as const,
    },
    client: {
      label: "Client",
      icon: Building, // use the existing Building icon
      variant: "default" as const,
    },
  } as const

  const config = roleConfig[role]

  if (!config) return null

  const Icon = config.icon

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  )
}
