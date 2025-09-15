import type React from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen w-full">
      {/* Fixed Sidebar - positioned below header */}
      <div className="fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] w-60 border-r bg-background hidden md:block">
        <DashboardNav />
      </div>

      {/* Main Content Area */}
      <div className="md:pl-60">
        <main className="flex flex-col min-h-screen">
          <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
