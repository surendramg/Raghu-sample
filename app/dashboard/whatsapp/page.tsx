import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { WhatsAppIntegration } from "@/components/whatsapp-integration"

export const metadata = {
  title: "WhatsApp Integration | RecruitPro",
  description: "Configure and manage WhatsApp bot integration",
}

export default function WhatsAppPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">WhatsApp Integration</h3>
          <p className="text-muted-foreground">
            Configure and manage your WhatsApp bot integration for automated candidate communication.
          </p>
        </div>
        <WhatsAppIntegration />
      </div>
    </DashboardShell>
  )
}
