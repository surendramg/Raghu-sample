import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, DollarSign, TrendingUp, Building } from "lucide-react"
import Link from "next/link"

export function AdminDashboard() {
  const stats = {
    totalCompanies: 234,
    totalJobs: 456,
    monthlyRevenue: 4560000,
    growthRate: 12.5,
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCompanies.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+18 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobs}</div>
            <p className="text-xs text-muted-foreground">+23 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.growthRate}%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Actions</CardTitle>
          <CardDescription>Manage platform settings and monitor performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button asChild className="h-auto p-4 flex flex-col items-start">
              <Link href="/dashboard/billing">
                <DollarSign className="h-6 w-6 mb-2" />
                <span className="font-medium">Billing & Revenue</span>
                <span className="text-xs text-muted-foreground">Manage subscriptions and payments</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
              <Link href="/dashboard/jobs">
                <Briefcase className="h-6 w-6 mb-2" />
                <span className="font-medium">Manage Jobs</span>
                <span className="text-xs text-muted-foreground">Oversee job postings</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
              <Link href="/dashboard/analytics">
                <TrendingUp className="h-6 w-6 mb-2" />
                <span className="font-medium">Analytics</span>
                <span className="text-xs text-muted-foreground">View detailed reports</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Platform Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Building className="h-8 w-8 p-2 bg-blue-100 rounded-full text-blue-600" />
                <div>
                  <p className="font-medium">TechCorp joined the platform</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Briefcase className="h-8 w-8 p-2 bg-green-100 rounded-full text-green-600" />
                <div>
                  <p className="font-medium">15 new job postings today</p>
                  <p className="text-sm text-muted-foreground">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <DollarSign className="h-8 w-8 p-2 bg-yellow-100 rounded-full text-yellow-600" />
                <div>
                  <p className="font-medium">Monthly revenue target achieved</p>
                  <p className="text-sm text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Platform performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Server Uptime</span>
                <span className="text-sm text-green-600">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Response Time</span>
                <span className="text-sm text-green-600">120ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Active Sessions</span>
                <span className="text-sm">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database Health</span>
                <span className="text-sm text-green-600">Optimal</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
