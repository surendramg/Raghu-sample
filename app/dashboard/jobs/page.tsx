"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Briefcase, Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Users } from "lucide-react"
import Link from "next/link"

export default function JobsPage() {
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

  // Mock data for employer jobs with more examples for each status
  const employerJobs = [
    // Active Jobs
    {
      id: "1",
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      status: "Active",
      applications: 45,
      postedDate: "2024-01-15",
      salary: "₹15-25 LPA",
      views: 234,
    },
    {
      id: "2",
      title: "Product Manager",
      department: "Product",
      location: "Bangalore, India",
      type: "Full-time",
      status: "Active",
      applications: 32,
      postedDate: "2024-01-12",
      salary: "₹20-30 LPA",
      views: 189,
    },
    {
      id: "3",
      title: "Frontend Developer",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      status: "Active",
      applications: 28,
      postedDate: "2024-01-18",
      salary: "₹10-18 LPA",
      views: 156,
    },
    {
      id: "4",
      title: "Data Scientist",
      department: "Analytics",
      location: "Hyderabad, India",
      type: "Full-time",
      status: "Active",
      applications: 41,
      postedDate: "2024-01-20",
      salary: "₹18-28 LPA",
      views: 203,
    },
    {
      id: "5",
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Delhi, India",
      type: "Full-time",
      status: "Active",
      applications: 19,
      postedDate: "2024-01-22",
      salary: "₹8-15 LPA",
      views: 134,
    },

    // Paused Jobs
    {
      id: "6",
      title: "UX Designer",
      department: "Design",
      location: "Delhi, India",
      type: "Full-time",
      status: "Paused",
      applications: 28,
      postedDate: "2024-01-10",
      salary: "₹12-18 LPA",
      views: 156,
    },
    {
      id: "7",
      title: "Backend Developer",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      status: "Paused",
      applications: 35,
      postedDate: "2024-01-08",
      salary: "₹12-20 LPA",
      views: 178,
    },
    {
      id: "8",
      title: "Business Analyst",
      department: "Operations",
      location: "Bangalore, India",
      type: "Full-time",
      status: "Paused",
      applications: 22,
      postedDate: "2024-01-05",
      salary: "₹10-16 LPA",
      views: 145,
    },
    {
      id: "9",
      title: "HR Manager",
      department: "Human Resources",
      location: "Mumbai, India",
      type: "Full-time",
      status: "Paused",
      applications: 31,
      postedDate: "2024-01-03",
      salary: "₹15-22 LPA",
      views: 167,
    },

    // Closed Jobs
    {
      id: "10",
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      status: "Closed",
      applications: 67,
      postedDate: "2024-01-08",
      salary: "₹18-28 LPA",
      views: 298,
    },
    {
      id: "11",
      title: "Sales Manager",
      department: "Sales",
      location: "Mumbai, India",
      type: "Full-time",
      status: "Closed",
      applications: 54,
      postedDate: "2023-12-28",
      salary: "₹12-20 LPA",
      views: 267,
    },
    {
      id: "12",
      title: "Content Writer",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      status: "Closed",
      applications: 89,
      postedDate: "2023-12-25",
      salary: "₹6-12 LPA",
      views: 445,
    },
    {
      id: "13",
      title: "Quality Assurance Engineer",
      department: "Engineering",
      location: "Bangalore, India",
      type: "Full-time",
      status: "Closed",
      applications: 43,
      postedDate: "2023-12-20",
      salary: "₹8-15 LPA",
      views: 234,
    },
    {
      id: "14",
      title: "Financial Analyst",
      department: "Finance",
      location: "Delhi, India",
      type: "Full-time",
      status: "Closed",
      applications: 38,
      postedDate: "2023-12-15",
      salary: "₹10-18 LPA",
      views: 189,
    },
    {
      id: "15",
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Hyderabad, India",
      type: "Full-time",
      status: "Closed",
      applications: 52,
      postedDate: "2023-12-10",
      salary: "₹12-20 LPA",
      views: 278,
    },
  ]

  // Mock data for admin jobs overview
  const adminJobs = [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "TechCorp India",
      location: "Mumbai, India",
      type: "Full-time",
      status: "Active",
      applications: 45,
      postedDate: "2024-01-15",
      salary: "₹15-25 LPA",
    },
    {
      id: "2",
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Bangalore, India",
      type: "Full-time",
      status: "Active",
      applications: 32,
      postedDate: "2024-01-12",
      salary: "₹20-30 LPA",
    },
    {
      id: "3",
      title: "Data Scientist",
      company: "AI Solutions Ltd",
      location: "Hyderabad, India",
      type: "Full-time",
      status: "Active",
      applications: 89,
      postedDate: "2024-01-14",
      salary: "₹25-35 LPA",
    },
  ]

  const isEmployer = user.role === "employer"
  const isAdmin = user.role === "admin"
  const allJobs = isEmployer ? employerJobs : adminJobs

  // Filter jobs by status
  const activeJobs = allJobs.filter((job) => job.status === "Active")
  const pausedJobs = allJobs.filter((job) => job.status === "Paused")
  const closedJobs = allJobs.filter((job) => job.status === "Closed")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Paused":
        return "secondary"
      case "Closed":
        return "destructive"
      default:
        return "default"
    }
  }

  const employerStats = {
    totalJobs: employerJobs.length,
    activeJobs: activeJobs.length,
    pausedJobs: pausedJobs.length,
    closedJobs: closedJobs.length,
    totalApplications: employerJobs.reduce((sum, job) => sum + job.applications, 0),
    totalViews: employerJobs.reduce((sum, job) => sum + job.views, 0),
  }

  const adminStats = {
    totalJobs: 456,
    activeJobs: 234,
    totalCompanies: 89,
    avgApplications: 34,
  }

  const renderJobList = (jobs: typeof employerJobs) => (
    <div className="space-y-4">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-medium">{job.title}</h4>
                <Badge variant={getStatusColor(job.status)}>{job.status}</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {isAdmin && <span>{job.company}</span>}
                {isEmployer && <span>{job.department}</span>}
                <span>{job.location}</span>
                <span>{job.type}</span>
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                <span>{job.applications} applications</span>
                {isEmployer && <span>{job.views} views</span>}
                <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isEmployer && (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/jobs/${job.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                  {job.status !== "Closed" && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/jobs/${job.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                  )}
                </>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  {isEmployer && job.status !== "Closed" && (
                    <>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Job
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        View Applications
                      </DropdownMenuItem>
                      {job.status === "Active" && <DropdownMenuItem>Pause Job</DropdownMenuItem>}
                      {job.status === "Paused" && <DropdownMenuItem>Resume Job</DropdownMenuItem>}
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Job
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <Briefcase className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No jobs found</h3>
          <p className="text-sm text-muted-foreground mb-4">No jobs match the current filter criteria.</p>
        </div>
      )}
    </div>
  )

  return (
    <DashboardShell>
      <DashboardHeader
        heading={isEmployer ? "Job Postings" : "Jobs Management"}
        text={
          isEmployer
            ? "Manage your job postings and track applications"
            : "Overview of all job postings on the platform"
        }
        userRole={user.role}
      >
        {isEmployer && (
          <Button asChild>
            <Link href="/dashboard/jobs/new">
              <Plus className="mr-2 h-4 w-4" />
              Post New Job
            </Link>
          </Button>
        )}
      </DashboardHeader>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {isEmployer ? (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employerStats.totalJobs}</div>
                <p className="text-xs text-muted-foreground">All your job postings</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employerStats.activeJobs}</div>
                <p className="text-xs text-muted-foreground">Currently accepting applications</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employerStats.totalApplications}</div>
                <p className="text-xs text-muted-foreground">Across all jobs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employerStats.totalViews}</div>
                <p className="text-xs text-muted-foreground">Job listing views</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.totalJobs}</div>
                <p className="text-xs text-muted-foreground">Platform-wide</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.activeJobs}</div>
                <p className="text-xs text-muted-foreground">Currently active</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Companies</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.totalCompanies}</div>
                <p className="text-xs text-muted-foreground">Posting jobs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Applications</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.avgApplications}</div>
                <p className="text-xs text-muted-foreground">Per job posting</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{isEmployer ? "Your Job Postings" : "All Job Postings"}</CardTitle>
              <CardDescription>
                {isEmployer ? "Manage and track your job postings" : "Overview of all jobs on the platform"}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search jobs..." className="pl-8 w-[200px]" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Jobs ({allJobs.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({activeJobs.length})</TabsTrigger>
              <TabsTrigger value="paused">Paused ({pausedJobs.length})</TabsTrigger>
              <TabsTrigger value="closed">Closed ({closedJobs.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {renderJobList(allJobs)}
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              {renderJobList(activeJobs)}
            </TabsContent>

            <TabsContent value="paused" className="space-y-4">
              {renderJobList(pausedJobs)}
            </TabsContent>

            <TabsContent value="closed" className="space-y-4">
              {renderJobList(closedJobs)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
