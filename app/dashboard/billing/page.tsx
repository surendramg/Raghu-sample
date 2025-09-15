import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, DollarSign, TrendingUp, Calendar } from "lucide-react"

export const metadata = {
  title: "Billing & Subscriptions | RecruitPro",
  description: "Manage billing, subscriptions, and payments",
}

const mockInvoices = [
  {
    id: "INV-001",
    date: "2024-01-15",
    amount: "₹24,999",
    status: "paid",
    plan: "Enterprise",
  },
  {
    id: "INV-002",
    date: "2023-12-15",
    amount: "₹24,999",
    status: "paid",
    plan: "Enterprise",
  },
  {
    id: "INV-003",
    date: "2023-11-15",
    amount: "₹24,999",
    status: "paid",
    plan: "Enterprise",
  },
]

const mockSubscriptions = [
  {
    id: "1",
    company: "TechCorp",
    plan: "Enterprise",
    status: "active",
    amount: "₹24,999",
    nextBilling: "2024-02-15",
  },
  {
    id: "2",
    company: "StartupXYZ",
    plan: "Professional",
    status: "active",
    amount: "₹9,999",
    nextBilling: "2024-02-12",
  },
  {
    id: "3",
    company: "SmallBiz Inc",
    plan: "Basic",
    status: "cancelled",
    amount: "₹2,999",
    nextBilling: "-",
  },
]

export default function BillingPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing & Subscriptions"
        text="Manage platform billing, subscriptions, and revenue"
        userRole="admin"
      >
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </DashboardHeader>

      <div className="space-y-6">
        {/* Revenue Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹4,56,000</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+12 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Revenue Per User</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹2,923</div>
              <p className="text-xs text-muted-foreground">+5.2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3%</div>
              <p className="text-xs text-muted-foreground">-0.5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Invoices */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Latest billing transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge variant="default">{invoice.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Subscription Plans */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plans</CardTitle>
              <CardDescription>Current pricing tiers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Basic Plan</h4>
                  <Badge variant="secondary">₹2,999/month</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Up to 10 job postings</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Professional Plan</h4>
                  <Badge variant="default">₹9,999/month</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Up to 50 job postings</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Enterprise Plan</h4>
                  <Badge variant="default">₹24,999/month</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Unlimited job postings</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Subscriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Active Subscriptions</CardTitle>
            <CardDescription>Manage customer subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Next Billing</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSubscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell className="font-medium">{subscription.company}</TableCell>
                    <TableCell>{subscription.plan}</TableCell>
                    <TableCell>
                      <Badge variant={subscription.status === "active" ? "default" : "destructive"}>
                        {subscription.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{subscription.amount}</TableCell>
                    <TableCell>
                      {subscription.nextBilling !== "-" ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(subscription.nextBilling).toLocaleDateString()}
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
