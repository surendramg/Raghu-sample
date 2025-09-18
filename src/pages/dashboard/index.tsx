import { useAuth } from "../../lib/auth-context"
import { DashboardHeader } from "../../components/dashboard/dashboard-header"
import { DashboardShell } from "../../components/dashboard/dashboard-shell"
import { CandidateDashboard } from "../../components/dashboard/candidate-dashboard"
import { EmployerDashboard } from "../../components/dashboard/employer-dashboard"
import { AdminDashboard } from "../../components/dashboard/admin-dashboard"
import { ClientDashboard } from "../../components/dashboard/client-dashboard"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { Info } from "lucide-react"

export function DashboardPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardShell>
    )
  }

  if (!user) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <p>Please log in to access the dashboard.</p>
        </div>
      </DashboardShell>
    )
  }

  const currentRole = user.role as "candidate" | "employer" | "admin" | "client"
  const roleDisplayNames: Record<typeof currentRole, string> = {
    candidate: "Candidate",
    employer: "Employer",
    admin: "Administrator",
    client: "Client",
  }

  const roleDescriptions: Record<typeof currentRole, string> = {
    candidate: "Track your job applications and manage your career journey.",
    employer: "Manage job postings, review candidates, and grow your team.",
    admin: "Oversee platform operations and monitor system performance.",
    client: "Manage hiring requests and track recruitment progress.",
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`${roleDisplayNames[currentRole]} Dashboard`}
        text={roleDescriptions[currentRole]}
        userRole={currentRole}
      />

      {/* Show demo alert only for admin users */}
      {user.email === "admin@demo.com" && (
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Demo Mode:</strong> You can switch between different user views using the dropdown in the sidebar.
            Currently viewing as <strong>{currentRole}</strong>.
          </AlertDescription>
        </Alert>
      )}

      {currentRole === "candidate" && <CandidateDashboard userId={user.id} />}
      {currentRole === "employer" && <EmployerDashboard userId={user.id} />}
      {currentRole === "admin" && <AdminDashboard />}
      {currentRole === "client" && <ClientDashboard userId={user.id} />}
    </DashboardShell>
  )
}