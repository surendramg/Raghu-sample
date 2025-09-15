"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Users,
  Briefcase,
  Eye,
  Calendar,
  DollarSign,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Building2,
  UserCheck,
  TrendingDown,
  Receipt,
  AlertTriangle,
  FileText,
  IndianRupee,
} from "lucide-react"
import { UserGrowthChart } from "@/components/charts/user-growth-chart"
import { RevenueChart } from "@/components/charts/revenue-chart"
import { JobPerformanceChart } from "@/components/charts/job-performance-chart"
import { UserEngagementChart } from "@/components/charts/user-engagement-chart"
import { RevenueBreakdownChart } from "@/components/charts/revenue-breakdown-chart"
import { ClientAnalytics } from "@/components/analytics/client-analytics"
import { SkillAnalytics } from "@/components/analytics/skill-analytics"
import { CandidateSummary } from "@/components/analytics/candidate-summary"

export default function AnalyticsPage() {
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
          <p>Please log in to access this page.</p>
        </div>
      </DashboardShell>
    )
  }

  const isEmployer = user.role === "employer"
  const isAdmin = user.role === "admin"
  const isClient = user.role === "client"

  // Client-specific analytics data
  const clientAnalyticsData = {
    totalJobOpenings: 15,
    activeOpenings: 8,
    closedOpenings: 7,
    totalInterviews: 45,
    successfulHires: 12,
    overallSuccessRate: 26.7,
    avgTimeToHire: 18,
    jobOpeningsByRole: [
      {
        role: "Software Engineer",
        openings: 4,
        interviews: 18,
        hires: 5,
        successRate: 27.8,
        status: "active",
      },
      {
        role: "Product Manager",
        openings: 2,
        interviews: 8,
        hires: 2,
        successRate: 25.0,
        status: "active",
      },
      {
        role: "UX Designer",
        openings: 3,
        interviews: 12,
        hires: 3,
        successRate: 25.0,
        status: "closed",
      },
      {
        role: "DevOps Engineer",
        openings: 2,
        interviews: 5,
        hires: 1,
        successRate: 20.0,
        status: "active",
      },
      {
        role: "Data Analyst",
        openings: 2,
        interviews: 2,
        hires: 1,
        successRate: 50.0,
        status: "closed",
      },
      {
        role: "Marketing Manager",
        openings: 2,
        interviews: 0,
        hires: 0,
        successRate: 0,
        status: "active",
      },
    ],
    rejectionReasons: [
      {
        reason: "Technical Skills Gap",
        count: 12,
        percentage: 36.4,
        description: "Candidates lacked required technical expertise",
      },
      {
        reason: "Experience Level Mismatch",
        count: 8,
        percentage: 24.2,
        description: "Too junior or too senior for the role",
      },
      {
        reason: "Cultural Fit",
        count: 6,
        percentage: 18.2,
        description: "Not aligned with company culture and values",
      },
      {
        reason: "Salary Expectations",
        count: 4,
        percentage: 12.1,
        description: "Salary expectations beyond budget",
      },
      {
        reason: "Communication Skills",
        count: 2,
        percentage: 6.1,
        description: "Poor communication or presentation skills",
      },
      {
        reason: "Availability Issues",
        count: 1,
        percentage: 3.0,
        description: "Notice period or availability conflicts",
      },
    ],
    interviewsByMonth: [
      { month: "Oct 2023", interviews: 8, hires: 2 },
      { month: "Nov 2023", interviews: 12, hires: 3 },
      { month: "Dec 2023", interviews: 15, hires: 4 },
      { month: "Jan 2024", interviews: 10, hires: 3 },
    ],
    topPerformingRoles: [
      { role: "Data Analyst", successRate: 50.0, interviews: 2, hires: 1 },
      { role: "Software Engineer", successRate: 27.8, interviews: 18, hires: 5 },
      { role: "Product Manager", successRate: 25.0, interviews: 8, hires: 2 },
      { role: "UX Designer", successRate: 25.0, interviews: 12, hires: 3 },
    ],
  }

  // Employer-specific analytics data
  const employerStats = {
    totalViews: 2456,
    applications: 156,
    hireRate: 12.5,
    avgTimeToHire: 18,
    topPerformingJob: "Senior Software Engineer",
    conversionRate: 8.2,
  }

  // Admin-specific analytics data
  const adminStats = {
    totalRevenue: 4560000,
    platformGrowth: 23.5,
    activeCompanies: 234,
    jobPostings: 1456,
    userEngagement: 78.5,
    monthlyGrowth: 15.2,
  }

  // Financial data for employers
  const financialData = {
    totalInvoiced: 2850000,
    totalCollected: 2280000,
    pendingCollection: 570000,
    overdueAmount: 125000,
    collectionRate: 80.0,
    avgCollectionTime: 28,
    invoices: [
      {
        id: "INV-2024-001",
        client: "TechCorp India",
        amount: 450000,
        issueDate: "2024-01-15",
        dueDate: "2024-02-14",
        status: "Paid",
        paidDate: "2024-02-10",
        services: "5 Senior Developer Placements",
        paymentMethod: "Bank Transfer",
      },
      {
        id: "INV-2024-002",
        client: "InnovateTech",
        amount: 320000,
        issueDate: "2024-01-20",
        dueDate: "2024-02-19",
        status: "Paid",
        paidDate: "2024-02-15",
        services: "3 Product Manager Placements",
        paymentMethod: "NEFT",
      },
      {
        id: "INV-2024-003",
        client: "CloudTech Solutions",
        amount: 280000,
        issueDate: "2024-02-01",
        dueDate: "2024-03-03",
        status: "Pending",
        services: "4 DevOps Engineer Placements",
        daysOverdue: 0,
      },
      {
        id: "INV-2024-004",
        client: "DataInsights",
        amount: 210000,
        issueDate: "2024-01-10",
        dueDate: "2024-02-09",
        status: "Overdue",
        services: "3 Data Scientist Placements",
        daysOverdue: 25,
      },
      {
        id: "INV-2024-005",
        client: "GrowthLabs",
        amount: 190000,
        issueDate: "2024-02-10",
        dueDate: "2024-03-12",
        status: "Pending",
        services: "2 Marketing Manager Placements",
        daysOverdue: 0,
      },
      {
        id: "INV-2024-006",
        client: "StartupHub",
        amount: 150000,
        issueDate: "2024-01-25",
        dueDate: "2024-02-24",
        status: "Paid",
        paidDate: "2024-02-20",
        services: "2 Full Stack Developer Placements",
        paymentMethod: "UPI",
      },
    ],
    monthlyRevenue: [
      { month: "Oct 2023", invoiced: 380000, collected: 320000, pending: 60000 },
      { month: "Nov 2023", invoiced: 520000, collected: 480000, pending: 40000 },
      { month: "Dec 2023", invoiced: 680000, collected: 650000, pending: 30000 },
      { month: "Jan 2024", invoiced: 750000, collected: 580000, pending: 170000 },
      { month: "Feb 2024", invoiced: 520000, collected: 250000, pending: 270000 },
    ],
    clientPaymentBehavior: [
      { client: "TechCorp India", avgPaymentDays: 25, totalInvoiced: 450000, collectionRate: 100 },
      { client: "InnovateTech", avgPaymentDays: 26, totalInvoiced: 320000, collectionRate: 100 },
      { client: "CloudTech Solutions", avgPaymentDays: 22, totalInvoiced: 280000, collectionRate: 95 },
      { client: "DataInsights", avgPaymentDays: 45, totalInvoiced: 210000, collectionRate: 75 },
      { client: "GrowthLabs", avgPaymentDays: 30, totalInvoiced: 190000, collectionRate: 90 },
      { client: "StartupHub", avgPaymentDays: 26, totalInvoiced: 150000, collectionRate: 100 },
    ],
    paymentTermsAnalysis: [
      { terms: "Net 30", count: 4, percentage: 67, avgCollectionDays: 28 },
      { terms: "Net 45", count: 1, percentage: 17, avgCollectionDays: 42 },
      { terms: "Net 15", count: 1, percentage: 16, avgCollectionDays: 18 },
    ],
  }

  // Client Summary data for employers
  const clientSummaryData = {
    totalRequests: 45,
    fulfilledRequests: 32,
    pendingRequests: 13,
    fulfillmentRate: 71.1,
    avgFulfillmentTime: 12,
    urgentRequests: 5,
    clientRequests: [
      {
        id: "REQ-001",
        client: "TechCorp India",
        position: "Senior React Developer",
        requestDate: "2024-01-15",
        status: "Fulfilled",
        daysToFulfill: 8,
        priority: "High",
      },
      {
        id: "REQ-002",
        client: "InnovateTech",
        position: "DevOps Engineer",
        requestDate: "2024-01-18",
        status: "In Progress",
        daysOpen: 15,
        priority: "Medium",
      },
      {
        id: "REQ-003",
        client: "CloudTech Solutions",
        position: "Product Manager",
        requestDate: "2024-01-20",
        status: "Fulfilled",
        daysToFulfill: 10,
        priority: "High",
      },
      {
        id: "REQ-004",
        client: "DataInsights",
        position: "Data Scientist",
        requestDate: "2024-01-12",
        status: "Overdue",
        daysOpen: 21,
        priority: "Urgent",
      },
      {
        id: "REQ-005",
        client: "GrowthLabs",
        position: "Full Stack Developer",
        requestDate: "2024-01-25",
        status: "In Progress",
        daysOpen: 8,
        priority: "Medium",
      },
    ],
    ageingAnalysis: [
      { range: "0-7 days", count: 8, percentage: 62 },
      { range: "8-14 days", count: 3, percentage: 23 },
      { range: "15-21 days", count: 1, percentage: 8 },
      { range: "21+ days", count: 1, percentage: 7 },
    ],
    clientSatisfaction: [
      { client: "TechCorp India", rating: 4.8, requests: 12, fulfilled: 11 },
      { client: "InnovateTech", rating: 4.6, requests: 8, fulfilled: 7 },
      { client: "CloudTech Solutions", rating: 4.9, requests: 10, fulfilled: 9 },
      { client: "DataInsights", rating: 4.2, requests: 6, fulfilled: 4 },
      { client: "GrowthLabs", rating: 4.7, requests: 9, fulfilled: 8 },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Fulfilled":
      case "Paid":
        return "bg-green-100 text-green-800"
      case "In Progress":
      case "Pending":
        return "bg-blue-100 text-blue-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={isClient ? "Hiring Analytics" : isEmployer ? "Job Analytics" : "Platform Analytics"}
        text={
          isClient
            ? "Track your job openings, interviews, and hiring success metrics"
            : isEmployer
              ? "Track the performance of your job postings and hiring metrics"
              : "Monitor platform performance and business metrics"
        }
        userRole={user.role}
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {isClient ? (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Job Openings</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientAnalyticsData.totalJobOpenings}</div>
                <p className="text-xs text-muted-foreground">
                  {clientAnalyticsData.activeOpenings} active, {clientAnalyticsData.closedOpenings} closed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientAnalyticsData.totalInterviews}</div>
                <p className="text-xs text-muted-foreground">Across all job openings</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Successful Hires</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientAnalyticsData.successfulHires}</div>
                <p className="text-xs text-muted-foreground">{clientAnalyticsData.overallSuccessRate}% success rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Time to Hire</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientAnalyticsData.avgTimeToHire} days</div>
                <p className="text-xs text-muted-foreground">From posting to offer</p>
              </CardContent>
            </Card>
          </>
        ) : isEmployer ? (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employerStats.totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Applications</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employerStats.applications}</div>
                <p className="text-xs text-muted-foreground">+23 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hire Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employerStats.hireRate}%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Time to Hire</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employerStats.avgTimeToHire} days</div>
                <p className="text-xs text-muted-foreground">-3 days from last month</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{(adminStats.totalRevenue / 100000).toFixed(1)}L</div>
                <p className="text-xs text-muted-foreground">+{adminStats.monthlyGrowth}% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Platform Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.platformGrowth}%</div>
                <p className="text-xs text-muted-foreground">Year over year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Companies</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.activeCompanies}</div>
                <p className="text-xs text-muted-foreground">+12 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">User Engagement</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.userEngagement}%</div>
                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Main Analytics Tabs */}
      <Tabs
        defaultValue={isClient ? "job-openings" : isEmployer ? "job-performance" : isAdmin ? "client-view" : "overview"}
        className="space-y-4"
      >
        <TabsList
          className={
            isClient ? "grid w-full grid-cols-4" : isAdmin ? "grid w-full grid-cols-7" : "grid w-full grid-cols-4"
          }
        >
          {isClient ? (
            <>
              <TabsTrigger value="job-openings">Job Openings</TabsTrigger>
              <TabsTrigger value="interviews">Interview Analytics</TabsTrigger>
              <TabsTrigger value="success-rates">Success Rates</TabsTrigger>
              <TabsTrigger value="rejections">Rejection Analysis</TabsTrigger>
            </>
          ) : isAdmin ? (
            <>
              <TabsTrigger value="client-view" className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Client View</span>
              </TabsTrigger>
              <TabsTrigger value="skill-view" className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Skill View</span>
              </TabsTrigger>
              <TabsTrigger value="candidate-summary" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Candidates</span>
              </TabsTrigger>
              <TabsTrigger value="financials" className="flex items-center space-x-2">
                <IndianRupee className="h-4 w-4" />
                <span>Financials</span>
              </TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="growth">Growth</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
            </>
          ) : isEmployer ? (
            <>
              <TabsTrigger value="job-performance">Job Performance</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="hiring-funnel">Hiring Funnel</TabsTrigger>
              <TabsTrigger value="client-summary">Client Summary</TabsTrigger>
            </>
          ) : (
            <>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="growth">Growth</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
            </>
          )}
        </TabsList>

        {/* Client-specific tabs */}
        {isClient && (
          <>
            <TabsContent value="job-openings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Job Openings by Role</CardTitle>
                  <CardDescription>Overview of all job openings and their current status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clientAnalyticsData.jobOpeningsByRole.map((job) => (
                      <div key={job.role} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                            <Briefcase className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium">{job.role}</p>
                              <Badge className={getRoleStatusColor(job.status)} variant="secondary">
                                {job.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {job.openings} opening{job.openings !== 1 ? "s" : ""} • {job.interviews} interviews •{" "}
                              {job.hires} hire{job.hires !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{job.successRate.toFixed(1)}%</p>
                          <p className="text-sm text-muted-foreground">Success rate</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="interviews" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Interview Trends</CardTitle>
                    <CardDescription>Monthly interview and hiring trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {clientAnalyticsData.interviewsByMonth.map((month) => (
                        <div key={month.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{month.month}</p>
                            <p className="text-sm text-muted-foreground">{month.interviews} interviews conducted</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">{month.hires} hires</p>
                            <p className="text-xs text-muted-foreground">
                              {((month.hires / month.interviews) * 100).toFixed(1)}% success
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Roles</CardTitle>
                    <CardDescription>Roles with highest interview success rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {clientAnalyticsData.topPerformingRoles.map((role, index) => (
                        <div key={role.role} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                              <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium">{role.role}</p>
                              <p className="text-sm text-muted-foreground">
                                {role.interviews} interviews • {role.hires} hires
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-green-600">{role.successRate.toFixed(1)}%</p>
                            <p className="text-xs text-muted-foreground">Success rate</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="success-rates" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Overall Success Metrics</CardTitle>
                    <CardDescription>Key performance indicators for your hiring process</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center p-6 bg-green-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {clientAnalyticsData.overallSuccessRate.toFixed(1)}%
                        </div>
                        <p className="text-sm text-muted-foreground">Overall Success Rate</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {clientAnalyticsData.successfulHires} hires from {clientAnalyticsData.totalInterviews}{" "}
                          interviews
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{clientAnalyticsData.avgTimeToHire}</div>
                          <p className="text-sm text-muted-foreground">Avg Days to Hire</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {(clientAnalyticsData.totalInterviews / clientAnalyticsData.totalJobOpenings).toFixed(1)}
                          </div>
                          <p className="text-sm text-muted-foreground">Interviews per Opening</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Success Rate by Role</CardTitle>
                    <CardDescription>Compare hiring success across different positions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {clientAnalyticsData.jobOpeningsByRole
                        .filter((job) => job.interviews > 0)
                        .sort((a, b) => b.successRate - a.successRate)
                        .map((job) => (
                          <div key={job.role} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{job.role}</span>
                              <span>
                                {job.hires}/{job.interviews} ({job.successRate.toFixed(1)}%)
                              </span>
                            </div>
                            <Progress value={job.successRate} className="h-2" />
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="rejections" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Rejection Reasons Analysis</CardTitle>
                    <CardDescription>
                      Understanding why candidates were not selected (Total:{" "}
                      {clientAnalyticsData.rejectionReasons.reduce((sum, reason) => sum + reason.count, 0)} rejections)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {clientAnalyticsData.rejectionReasons.map((reason) => (
                        <div key={reason.reason} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{reason.reason}</span>
                            <span>
                              {reason.count} ({reason.percentage.toFixed(1)}%)
                            </span>
                          </div>
                          <Progress value={reason.percentage} className="h-2" />
                          <p className="text-xs text-muted-foreground">{reason.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Improvement Recommendations</CardTitle>
                    <CardDescription>Actionable insights based on rejection patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-red-800">Technical Skills Gap (36.4%)</p>
                            <p className="text-sm text-red-700 mt-1">
                              Consider revising job requirements or providing skills assessment earlier in the process
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <TrendingDown className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-yellow-800">Experience Mismatch (24.2%)</p>
                            <p className="text-sm text-yellow-700 mt-1">
                              Refine job descriptions to better specify experience requirements
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-800">Cultural Fit (18.2%)</p>
                            <p className="text-sm text-blue-700 mt-1">
                              Include culture-fit questions in initial screening to save time
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-800">Salary Expectations (12.1%)</p>
                            <p className="text-sm text-green-700 mt-1">
                              Consider including salary ranges in job postings to attract suitable candidates
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </>
        )}

        {/* Admin-specific tabs */}
        {isAdmin && (
          <>
            <TabsContent value="client-view" className="space-y-4">
              <ClientAnalytics />
            </TabsContent>
            <TabsContent value="skill-view" className="space-y-4">
              <SkillAnalytics />
            </TabsContent>
            <TabsContent value="candidate-summary" className="space-y-4">
              <CandidateSummary />
            </TabsContent>
            <TabsContent value="revenue" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <RevenueChart />
                <RevenueBreakdownChart />
              </div>
            </TabsContent>
            <TabsContent value="growth" className="space-y-4">
              <UserGrowthChart />
            </TabsContent>
            <TabsContent value="engagement" className="space-y-4">
              <UserEngagementChart />
            </TabsContent>
            {/* New Financials Tab */}
            <TabsContent value="financials" className="space-y-4">
              {/* Financial Overview Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Invoiced</CardTitle>
                    <Receipt className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{(financialData.totalInvoiced / 100000).toFixed(1)}L</div>
                    <p className="text-xs text-muted-foreground">+15% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{(financialData.totalCollected / 100000).toFixed(1)}L</div>
                    <p className="text-xs text-muted-foreground">{financialData.collectionRate}% collection rate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Collection</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{(financialData.pendingCollection / 100000).toFixed(1)}L</div>
                    <p className="text-xs text-muted-foreground">
                      Avg {financialData.avgCollectionTime} days to collect
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      ₹{(financialData.overdueAmount / 100000).toFixed(1)}L
                    </div>
                    <p className="text-xs text-muted-foreground">Requires immediate attention</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Recent Invoices */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Invoices</CardTitle>
                    <CardDescription>Latest invoices and their payment status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {financialData.invoices.map((invoice) => (
                        <div key={invoice.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium text-sm">{invoice.id}</p>
                              <Badge className={getStatusColor(invoice.status)} variant="secondary">
                                {invoice.status}
                              </Badge>
                            </div>
                            <p className="font-medium">{invoice.client}</p>
                            <p className="text-sm text-muted-foreground">{invoice.services}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-lg font-bold">₹{invoice.amount.toLocaleString()}</span>
                              <span className="text-xs text-muted-foreground">
                                {invoice.status === "Paid"
                                  ? `Paid on ${invoice.paidDate}`
                                  : invoice.status === "Overdue"
                                    ? `${invoice.daysOverdue} days overdue`
                                    : `Due ${invoice.dueDate}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Client Payment Behavior */}
                <Card>
                  <CardHeader>
                    <CardTitle>Client Payment Behavior</CardTitle>
                    <CardDescription>Average payment days and collection rates by client</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {financialData.clientPaymentBehavior.map((client) => (
                        <div key={client.client} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{client.client}</span>
                            <div className="text-right">
                              <span className="text-sm font-bold">{client.avgPaymentDays} days</span>
                              <span className="text-xs text-muted-foreground ml-2">{client.collectionRate}%</span>
                            </div>
                          </div>
                          <Progress value={client.collectionRate} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            Total invoiced: ₹{client.totalInvoiced.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Monthly Revenue Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue Trends</CardTitle>
                  <CardDescription>Invoiced vs collected amounts over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {financialData.monthlyRevenue.map((month) => (
                      <div key={month.month} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{month.month}</p>
                          <p className="text-sm text-muted-foreground">
                            Invoiced: ₹{(month.invoiced / 100000).toFixed(1)}L
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">₹{(month.collected / 100000).toFixed(1)}L</p>
                          <p className="text-xs text-muted-foreground">
                            {((month.collected / month.invoiced) * 100).toFixed(1)}% collected
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-orange-600">₹{(month.pending / 100000).toFixed(1)}L</p>
                          <p className="text-xs text-muted-foreground">Pending</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Terms Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Terms Analysis</CardTitle>
                  <CardDescription>Collection performance by payment terms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {financialData.paymentTermsAnalysis.map((term) => (
                      <div key={term.terms} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{term.terms}</span>
                          <span>
                            {term.count} invoices ({term.percentage}%) • Avg {term.avgCollectionDays} days
                          </span>
                        </div>
                        <Progress value={term.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}

        {/* Employer-specific tabs */}
        {isEmployer && (
          <>
            <TabsContent value="job-performance" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <JobPerformanceChart />
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Jobs</CardTitle>
                    <CardDescription>Jobs with highest application rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Senior Software Engineer</p>
                          <p className="text-sm text-muted-foreground">45 applications</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">234 views</p>
                          <p className="text-sm text-muted-foreground">19.2% conversion</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Product Manager</p>
                          <p className="text-sm text-muted-foreground">32 applications</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">189 views</p>
                          <p className="text-sm text-muted-foreground">16.9% conversion</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">UX Designer</p>
                          <p className="text-sm text-muted-foreground">28 applications</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">156 views</p>
                          <p className="text-sm text-muted-foreground">17.9% conversion</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="applications" className="space-y-4">
              <UserEngagementChart />
            </TabsContent>
            <TabsContent value="hiring-funnel" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Hiring Funnel</CardTitle>
                  <CardDescription>Track candidates through your hiring process</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="font-medium">Applications Received</span>
                      <span className="text-2xl font-bold text-blue-600">156</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                      <span className="font-medium">Initial Screening</span>
                      <span className="text-2xl font-bold text-yellow-600">89</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <span className="font-medium">Interviews Scheduled</span>
                      <span className="text-2xl font-bold text-purple-600">34</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <span className="font-medium">Offers Extended</span>
                      <span className="text-2xl font-bold text-green-600">12</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                      <span className="font-medium">Hires Completed</span>
                      <span className="text-2xl font-bold text-emerald-600">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="client-summary" className="space-y-4">
              {/* Client Summary Overview Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{clientSummaryData.totalRequests}</div>
                    <p className="text-xs text-muted-foreground">+8 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Fulfillment Rate</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{clientSummaryData.fulfillmentRate}%</div>
                    <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Fulfillment Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{clientSummaryData.avgFulfillmentTime} days</div>
                    <p className="text-xs text-muted-foreground">-2 days from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Urgent Requests</CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{clientSummaryData.urgentRequests}</div>
                    <p className="text-xs text-muted-foreground">Require immediate attention</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Recent Client Requests */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Client Requests</CardTitle>
                    <CardDescription>Latest hiring requests from your clients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {clientSummaryData.clientRequests.map((request) => (
                        <div key={request.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium text-sm">{request.id}</p>
                              <div className="flex space-x-2">
                                <Badge className={getPriorityColor(request.priority)} variant="secondary">
                                  {request.priority}
                                </Badge>
                                <Badge className={getStatusColor(request.status)} variant="secondary">
                                  {request.status}
                                </Badge>
                              </div>
                            </div>
                            <p className="font-medium">{request.position}</p>
                            <p className="text-sm text-muted-foreground">{request.client}</p>
                            <div className="flex items-center mt-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              {request.status === "Fulfilled"
                                ? `Fulfilled in ${request.daysToFulfill} days`
                                : `Open for ${request.daysOpen} days`}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Ageing Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Request Ageing Analysis</CardTitle>
                    <CardDescription>Distribution of pending requests by age</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {clientSummaryData.ageingAnalysis.map((age) => (
                        <div key={age.range} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{age.range}</span>
                            <span>
                              {age.count} requests ({age.percentage}%)
                            </span>
                          </div>
                          <Progress value={age.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Client Satisfaction */}
              <Card>
                <CardHeader>
                  <CardTitle>Client Satisfaction Metrics</CardTitle>
                  <CardDescription>Performance ratings and fulfillment rates by client</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clientSummaryData.clientSatisfaction.map((client) => (
                      <div key={client.client} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                            <Building2 className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{client.client}</p>
                            <p className="text-sm text-muted-foreground">
                              {client.fulfilled}/{client.requests} requests fulfilled
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <span className="text-lg font-bold">{client.rating}</span>
                            <span className="text-yellow-500">★</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {((client.fulfilled / client.requests) * 100).toFixed(0)}% success rate
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </DashboardShell>
  )
}
