"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Shield, Building, UserCheck, Building2 } from "lucide-react"

interface ViewSwitcherProps {
  currentRole?: string
  onRoleChange?: (role: string) => void
}

const roles = [
  {
    value: "admin",
    label: "Admin",
    icon: Shield,
    description: "Full system access",
    color: "bg-red-500",
  },
  {
    value: "employer",
    label: "Employer",
    icon: Building,
    description: "Manage jobs & candidates",
    color: "bg-blue-500",
  },
  {
    value: "candidate",
    label: "Candidate",
    icon: UserCheck,
    description: "Job seeker view",
    color: "bg-green-500",
  },
  {
    value: "client",
    label: "Client",
    icon: Building2,
    description: "Client company view",
    color: "bg-purple-500",
  },
]

export function ViewSwitcher({ currentRole = "admin", onRoleChange }: ViewSwitcherProps) {
  const [selectedRole, setSelectedRole] = useState(currentRole)

  const currentRoleData = roles.find((role) => role.value === selectedRole)
  const CurrentIcon = currentRoleData?.icon || Shield

  const handleRoleChange = (role: string) => {
    setSelectedRole(role)
    onRoleChange?.(role)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Demo Mode</span>
        <Badge variant="secondary" className="text-xs">
          Preview Only
        </Badge>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between bg-transparent">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${currentRoleData?.color}`} />
              <CurrentIcon className="h-4 w-4" />
              <span>{currentRoleData?.label} View</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-full" align="start">
          <DropdownMenuLabel>Switch View (Demo Only)</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {roles.map((role) => {
            const Icon = role.icon
            return (
              <DropdownMenuItem
                key={role.value}
                onClick={() => handleRoleChange(role.value)}
                className="flex items-center gap-3 p-3"
              >
                <div className={`w-2 h-2 rounded-full ${role.color}`} />
                <Icon className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="font-medium">{role.label}</span>
                  <span className="text-xs text-muted-foreground">{role.description}</span>
                </div>
                {selectedRole === role.value && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Active
                  </Badge>
                )}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
