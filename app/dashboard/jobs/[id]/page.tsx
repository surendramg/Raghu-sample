"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { SkillDemandAnalytics } from "@/components/skill-demand-analytics"
import { mockJobs, mockApplications, mockSkillDemand } from "@/lib/mock-data"
import {
  ArrowLeft,
  MapPin,
  Building2,
  Calendar,
  Users,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
} from "lucide-react"

export default function JobDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string

  const job = mockJobs.find((j) => j.id === jobId)
  const jobApplications = mockApplications.filter((app) => app.job_id === jobId)

  if (!job) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </DashboardShell>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50"
      case "paused":
        return "text-yellow-600 bg-yellow-50"
      case "closed":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "paused":
        return <AlertCircle className="h-4 w-4" />
      case "closed":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewed":
        return "bg-blue-100 text-blue-800"
      case "interviewed":
        return "bg-purple-100 text-purple-800"
      case "hired":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const skillsWithDemand = job.skills.map((skill) => {
    const demand = mockSkillDemand.find((s) => s.skill === skill)
    return { skill, demand }
  })

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-muted-foreground">Job Details & Analytics</p>
          </div>
        </div>

        {/* Job Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {job.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(job.posted_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={`${getStatusColor(job.status)} border-0`}>
                      {getStatusIcon(job.status)}
                      <span className="ml-1 capitalize">{job.status}</span>
                    </Badge>
                    {job.featured && <Badge variant="secondary">Featured</Badge>}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-600">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{job.applicants} applicants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">{job.views} views</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Job Description</h3>
                  <p className="text-sm text-muted-foreground">{job.description}</p>
                </div>
                {job.requirements && (
                  <div>
                    <h3 className="font-medium mb-2">Requirements</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skills with Market Demand */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Required Skills & Market Demand
                </CardTitle>
                <CardDescription>Skills required for this position with current market analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skillsWithDemand.map(({ skill, demand }, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">{skill}</Badge>
                        {demand && <span className="text-xs text-muted-foreground">{demand.totalJobs} total jobs</span>}
                      </div>
                      {demand ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Market Status</span>
                            <div className="flex gap-2">
                              <span className="text-green-600">{demand.activeJobs}A</span>
                              <span className="text-yellow-600">{demand.pausedJobs}P</span>
                              <span className="text-red-600">{demand.closedJobs}C</span>
                            </div>
                          </div>
                          <Progress value={(demand.activeJobs / demand.totalJobs) * 100} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Avg Salary: {demand.averageSalary}</span>
                            <span>
                              Demand: {demand.activeJobs > 5 ? "High" : demand.activeJobs > 2 ? "Medium" : "Low"}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Top companies: {demand.topCompanies.slice(0, 2).join(", ")}
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground">No market data available</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{job.applicants}</div>
                    <div className="text-xs text-muted-foreground">Total Applications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{job.views}</div>
                    <div className="text-xs text-muted-foreground">Profile Views</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Application Rate</span>
                    <span>{Math.round((job.applicants! / job.views!) * 100)}%</span>
                  </div>
                  <Progress value={(job.applicants! / job.views!) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-transparent" variant="outline">
                  Edit Job Posting
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  View All Applications
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  Share Job Link
                </Button>
                {job.status === "active" && (
                  <Button className="w-full" variant="secondary">
                    Pause Applications
                  </Button>
                )}
                {job.status === "paused" && (
                  <Button className="w-full" variant="default">
                    Resume Applications
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Analytics Tabs */}
        <Tabs defaultValue="applicants" className="w-full">
          <TabsList>
            <TabsTrigger value="applicants">Applicants</TabsTrigger>
            <TabsTrigger value="analytics">Skill Analytics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="applicants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Latest candidates who applied for this position</CardDescription>
              </CardHeader>
              <CardContent>
                {jobApplications.length > 0 ? (
                  <div className="space-y-4">
                    {jobApplications.map((application) => (
                      <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40&text=${application.candidate_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}`}
                            />
                            <AvatarFallback>
                              {application.candidate_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{application.candidate_name}</div>
                            <div className="text-sm text-muted-foreground">{application.candidate_email}</div>
                            <div className="text-xs text-muted-foreground">
                              Applied {new Date(application.applied_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getApplicationStatusColor(application.status)}>{application.status}</Badge>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Applications Yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Applications will appear here once candidates start applying.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <SkillDemandAnalytics skillDemand={mockSkillDemand} selectedSkill={job.skills[0]} />
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Views to Applications</span>
                      <span>{Math.round((job.applicants! / job.views!) * 100)}%</span>
                    </div>
                    <Progress value={(job.applicants! / job.views!) * 100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Daily Views (avg)</span>
                      <span>{Math.round(job.views! / 7)}</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Application Quality</span>
                      <span>High</span>
                    </div>
                    <Progress value={85} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Market Position</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">Above Average</div>
                    <div className="text-sm text-muted-foreground">Compared to similar roles</div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Salary Competitiveness</span>
                      <Badge variant="secondary">Competitive</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Skills Demand</span>
                      <Badge variant="secondary">High</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Location Appeal</span>
                      <Badge variant="secondary">Very High</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
