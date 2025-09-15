"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Calendar, ExternalLink, FileText, Clock, Eye } from "lucide-react"
import Link from "next/link"

const mockApplications = [
  {
    id: "1",
    jobTitle: "Senior Software Engineer",
    company: "TechCorp India",
    location: "Bangalore, Karnataka",
    status: "Under Review",
    appliedAt: "2024-01-15",
    salary: "₹15-25 LPA",
    type: "Full-time",
    remote: true,
    jobId: "job-1",
  },
  {
    id: "2",
    jobTitle: "Frontend Developer",
    company: "StartupXYZ",
    location: "Mumbai, Maharashtra",
    status: "Interview Scheduled",
    appliedAt: "2024-01-12",
    salary: "₹8-15 LPA",
    type: "Full-time",
    remote: false,
    jobId: "job-2",
    interviewDate: "2024-01-20",
  },
  {
    id: "3",
    jobTitle: "Full Stack Developer",
    company: "BigTech Inc",
    location: "Hyderabad, Telangana",
    status: "Offer Received",
    appliedAt: "2024-01-10",
    salary: "₹20-30 LPA",
    type: "Full-time",
    remote: true,
    jobId: "job-3",
    offerAmount: "₹25 LPA",
  },
  {
    id: "4",
    jobTitle: "React Developer",
    company: "WebSolutions",
    location: "Pune, Maharashtra",
    status: "Rejected",
    appliedAt: "2024-01-08",
    salary: "₹10-18 LPA",
    type: "Full-time",
    remote: false,
    jobId: "job-4",
  },
  {
    id: "5",
    jobTitle: "DevOps Engineer",
    company: "CloudTech",
    location: "Delhi, NCR",
    status: "Under Review",
    appliedAt: "2024-01-18",
    salary: "₹18-28 LPA",
    type: "Full-time",
    remote: true,
    jobId: "job-5",
  },
]

export default function ApplicationsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  // Redirect if not candidate
  if (!user || user.role !== "candidate") {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Access denied. This page is for candidates only.</p>
        </div>
      </DashboardShell>
    )
  }

  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status.toLowerCase().replace(" ", "-") === statusFilter
    const matchesLocation = locationFilter === "all" || app.location.includes(locationFilter)

    return matchesSearch && matchesStatus && matchesLocation
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Interview Scheduled":
        return "default"
      case "Under Review":
        return "secondary"
      case "Offer Received":
        return "default"
      case "Rejected":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const activeApplications = filteredApplications.filter((app) =>
    ["Under Review", "Interview Scheduled"].includes(app.status),
  )

  const offers = filteredApplications.filter((app) => app.status === "Offer Received")
  const rejectedApplications = filteredApplications.filter((app) => app.status === "Rejected")

  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Applications"
        text="Track and manage all your job applications in one place."
        userRole="candidate"
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockApplications.length}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeApplications.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockApplications.filter((app) => app.status === "Interview Scheduled").length}
            </div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offers.length}</div>
            <p className="text-xs text-muted-foreground">Pending decision</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
                <SelectItem value="offer-received">Offer Received</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                <SelectItem value="Pune">Pune</SelectItem>
                <SelectItem value="Delhi">Delhi NCR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active ({activeApplications.length})</TabsTrigger>
          <TabsTrigger value="offers">Offers ({offers.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedApplications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeApplications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No active applications found</p>
                <Button asChild>
                  <Link href="/jobs">Browse Jobs</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            activeApplications.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{application.jobTitle}</h3>
                        <Badge variant={getStatusBadgeVariant(application.status)}>{application.status}</Badge>
                      </div>
                      <p className="text-muted-foreground font-medium">{application.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {application.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Applied {new Date(application.appliedAt).toLocaleDateString()}
                        </div>
                        <span className="font-medium text-foreground">{application.salary}</span>
                        {application.remote && <Badge variant="outline">Remote</Badge>}
                      </div>
                      {application.interviewDate && (
                        <div className="flex items-center gap-1 text-sm text-blue-600">
                          <Calendar className="h-4 w-4" />
                          Interview on {new Date(application.interviewDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/jobs/${application.jobId}`}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Job
                        </Link>
                      </Button>
                      {application.status === "Interview Scheduled" && <Button size="sm">Join Interview</Button>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="offers" className="space-y-4">
          {offers.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">No offers received yet</p>
              </CardContent>
            </Card>
          ) : (
            offers.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow border-green-200">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{application.jobTitle}</h3>
                        <Badge variant="default" className="bg-green-600">
                          {application.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground font-medium">{application.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {application.location}
                        </div>
                        <span className="font-medium text-foreground">{application.offerAmount}</span>
                        {application.remote && <Badge variant="outline">Remote</Badge>}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm">
                        Decline
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Accept Offer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedApplications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">No rejected applications</p>
              </CardContent>
            </Card>
          ) : (
            rejectedApplications.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow opacity-75">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{application.jobTitle}</h3>
                        <Badge variant="destructive">{application.status}</Badge>
                      </div>
                      <p className="text-muted-foreground font-medium">{application.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {application.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Applied {new Date(application.appliedAt).toLocaleDateString()}
                        </div>
                        <span className="font-medium">{application.salary}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/jobs/${application.jobId}`}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Job
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
