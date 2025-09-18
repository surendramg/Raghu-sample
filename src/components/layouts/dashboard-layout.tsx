import { Outlet } from 'react-router-dom'
import { DashboardNav } from '../dashboard/dashboard-nav'

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 border-r bg-background lg:block">
        <DashboardNav />
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}