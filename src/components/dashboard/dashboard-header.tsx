import type React from "react"
import { RoleIndicator } from "./role-indicator"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  userRole?: "admin" | "employer" | "candidate" | "client"
}

export function DashboardHeader({ heading, text, children, userRole = "admin" }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
          <RoleIndicator role={userRole} />
        </div>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}
