"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SkillMatchIndicator } from "@/components/skill-match-indicator"
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  MessageSquare,
  Calendar,
  Star,
  MapPin,
  Briefcase,
  UserPlus,
  TrendingUp,
  UserCheck,
  UserX,
  Clock,
  Target,
} from "lucide-react"
import { useState } from "react"
import { getCandidatesWithSkillMatch, mockJobs } from "@/lib/mock-data"

export default function CandidatesPage() {
  const { user, loading } = useAuth()
  const [selectedJobId, setSelectedJobId] = useState("1")
  const [statusFilter, setStatusFilter] = useState("all")

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

  // Get candidates with skill matching for selected job
  const { appliedGoodMatch, notAppliedGoodMatch, appliedPoorMatch } = getCandidatesWithSkillMatch(selectedJobId)
  const selectedJob = mockJobs.find((job) => job.id === selectedJobId)

  // Filter candidates by status
  const filterByStatus = (candidates: any[], status: string) => {
    if (status === "all") return candidates
    return candidates.filter((candidate) => candidate.application?.status === status)
  }

  // Mock data for admin candidates overview
  const adminCandidates = [
    {
      id: "1",
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      position: "Senior Software Engineer",
      location: "Mumbai, Maharashtra",
      experience: "5 years",
      skills: ["React", "Node.js", "Python"],
      status: "Active",
      joinedDate: "2024-01-15",
      applications: 12,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Priya Patel",
      email: "priya.patel@email.com",
      position: "Product Manager",
      location: "Bangalore, Karnataka",
      experience: "7 years",
      skills: ["Product Strategy", "Analytics", "Agile"],
      status: "Active",
      joinedDate: "2024-01-12",
      applications: 8,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  if (isAdmin) {
    // Admin view - show all candidates overview
    const adminStats = {
      totalCandidates: 1234,
      activeCandidates: 987,
      newRegistrations: 45,
      avgApplications: 8.5,
    }

    return (
      <DashboardShell>
        <DashboardHeader
          heading="Candidates Management"
          text="Overview of all candidates on the platform"
          userRole={user.role}
        />

        {/* Admin Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalCandidates}</div>
              <p className="text-xs text-muted-foreground">Platform-wide</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Candidates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.activeCandidates}</div>
              <p className="text-xs text-muted-foreground">Currently job seeking</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.newRegistrations}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.avgApplications}</div>
              <p className="text-xs text-muted-foreground">Per candidate</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Candidates Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Candidates</CardTitle>
                <CardDescription>Overview of all candidates on the platform</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search candidates..." className="pl-8 w-[200px]" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {adminCandidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar>
                      <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                      <AvatarFallback>
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{candidate.name}</h4>
                        <Badge variant="default">{candidate.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-1">
                        <span>{candidate.position}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {candidate.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {candidate.experience}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {candidate.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 3 && (
                          <span className="text-muted-foreground">+{candidate.skills.length - 3} more</span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Joined {new Date(candidate.joinedDate).toLocaleDateString()} • {candidate.applications}{" "}
                        applications
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </DashboardShell>
    )
  }

  // Employer view with skill matching
  const employerStats = {
    appliedGoodMatch: appliedGoodMatch.length,
    notAppliedGoodMatch: notAppliedGoodMatch.length,
    appliedPoorMatch: appliedPoorMatch.length,
    totalApplications: appliedGoodMatch.length + appliedPoorMatch.length,
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Smart Candidate Matching"
        text="AI-powered skill matching to find the best candidates for your jobs"
        userRole={user.role}
      />

      {/* Job Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Select Job for Candidate Analysis</CardTitle>
          <CardDescription>Choose a job to see skill-matched candidates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Select value={selectedJobId} onValueChange={setSelectedJobId}>
              <SelectTrigger className="w-[400px]">
                <SelectValue placeholder="Select a job" />
              </SelectTrigger>
              <SelectContent>
                {mockJobs
                  .filter((job) => job.status === "active")
                  .map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{job.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {job.company}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {selectedJob && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4" />
                Required Skills: {selectedJob.skills.slice(0, 3).join(", ")}
                {selectedJob.skills.length > 3 && ` +${selectedJob.skills.length - 3} more`}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applied + Good Match</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{employerStats.appliedGoodMatch}</div>
            <p className="text-xs text-muted-foreground">≥75% skill match</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Candidates</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{employerStats.notAppliedGoodMatch}</div>
            <p className="text-xs text-muted-foreground">Good match, not applied</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applied + Poor Match</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{employerStats.appliedPoorMatch}</div>
            <p className="text-xs text-muted-foreground">{"<75% skill match"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employerStats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">For selected job</p>
          </CardContent>
        </Card>
      </div>

      {/* Skill-Matched Candidates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Skill-Matched Candidates</CardTitle>
              <CardDescription>
                Candidates categorized by application status and skill matching for {selectedJob?.title}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search candidates..." className="pl-8 w-[200px]" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="applied-good" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="applied-good" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Applied + Good Match ({appliedGoodMatch.length})
              </TabsTrigger>
              <TabsTrigger value="potential" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Potential Candidates ({notAppliedGoodMatch.length})
              </TabsTrigger>
              <TabsTrigger value="applied-poor" className="flex items-center gap-2">
                <UserX className="h-4 w-4" />
                Applied + Poor Match ({appliedPoorMatch.length})
              </TabsTrigger>
            </TabsList>

            {/* Applied + Good Match Tab */}
            <TabsContent value="applied-good" className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="interviewed">Interviewed</SelectItem>
                    <SelectItem value="offered">Offered</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                  </SelectContent>
                </Select>
                <Badge variant="secondary" className="text-green-700 bg-green-50">
                  High-quality candidates with excellent skill match
                </Badge>
              </div>
              <div className="space-y-4">
                {filterByStatus(appliedGoodMatch, statusFilter).map((candidate) => (
                  <div
                    key={candidate.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-green-50/50"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar>
                        <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                        <AvatarFallback>
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{candidate.name}</h4>
                          <SkillMatchIndicator percentage={candidate.skillMatch} size="sm" />
                          <Badge variant="outline">{candidate.application.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span>{candidate.current_role}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {candidate.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {candidate.experience}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {candidate.availability}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs mb-2">
                          {candidate.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 4 && (
                            <span className="text-muted-foreground">+{candidate.skills.length - 4} more</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Applied {new Date(candidate.application.applied_at).toLocaleDateString()} • Expected:{" "}
                          {candidate.expected_salary}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Star className="mr-2 h-4 w-4" />
                            Shortlist
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Potential Candidates Tab */}
            <TabsContent value="potential" className="space-y-4">
              <div className="mb-4">
                <Badge variant="secondary" className="text-blue-700 bg-blue-50">
                  High-potential candidates who haven't applied yet - consider reaching out!
                </Badge>
              </div>
              <div className="space-y-4">
                {notAppliedGoodMatch.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-blue-50/50"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar>
                        <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                        <AvatarFallback>
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{candidate.name}</h4>
                          <SkillMatchIndicator percentage={candidate.skillMatch} size="sm" />
                          <Badge variant="outline" className="text-blue-600">
                            Not Applied
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span>{candidate.current_role}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {candidate.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {candidate.experience}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {candidate.availability}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs mb-2">
                          {candidate.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 4 && (
                            <span className="text-muted-foreground">+{candidate.skills.length - 4} more</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last active {new Date(candidate.last_active).toLocaleDateString()} • Expected:{" "}
                          {candidate.expected_salary}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Invite to Apply
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Star className="mr-2 h-4 w-4" />
                            Add to Watchlist
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Applied + Poor Match Tab */}
            <TabsContent value="applied-poor" className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="interviewed">Interviewed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Badge variant="secondary" className="text-red-700 bg-red-50">
                  Candidates with limited skill match - consider for other roles
                </Badge>
              </div>
              <div className="space-y-4">
                {filterByStatus(appliedPoorMatch, statusFilter).map((candidate) => (
                  <div
                    key={candidate.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-red-50/50"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar>
                        <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                        <AvatarFallback>
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{candidate.name}</h4>
                          <SkillMatchIndicator percentage={candidate.skillMatch} size="sm" />
                          <Badge variant="outline">{candidate.application.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span>{candidate.current_role}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {candidate.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {candidate.experience}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {candidate.availability}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs mb-2">
                          {candidate.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 4 && (
                            <span className="text-muted-foreground">+{candidate.skills.length - 4} more</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Applied {new Date(candidate.application.applied_at).toLocaleDateString()} • Expected:{" "}
                          {candidate.expected_salary}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserX className="mr-2 h-4 w-4" />
                            Reject Application
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
