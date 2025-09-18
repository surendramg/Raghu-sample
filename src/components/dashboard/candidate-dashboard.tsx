import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Briefcase, Eye, Clock } from "lucide-react"
import Link from "next/link"

interface CandidateDashboardProps {
  userId: string
}

export function CandidateDashboard({ userId }: CandidateDashboardProps) {
  // In a real app, you'd fetch this data from your database
  const stats = {
    applications: 12,
    interviews: 3,
    profileViews: 45,
    savedJobs: 8,
  }

  const recentApplications = [
    {
      id: "1",
      jobTitle: "Senior Software Engineer",
      company: "TechCorp",
      status: "Under Review",
      appliedAt: "2024-01-15",
    },
    {
      id: "2",
      jobTitle: "Frontend Developer",
      company: "StartupXYZ",
      status: "Interview Scheduled",
      appliedAt: "2024-01-12",
    },
    {
      id: "3",
      jobTitle: "Full Stack Developer",
      company: "BigTech Inc",
      status: "Rejected",
      appliedAt: "2024-01-10",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.applications}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviews}</div>
            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.profileViews}</div>
            <p className="text-xs text-muted-foreground">+12 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.savedJobs}</div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Your latest job applications and their status</CardDescription>
            </div>
            <Button asChild variant="outline">
              <Link href="/dashboard/applications">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{application.jobTitle}</h4>
                  <p className="text-sm text-muted-foreground">{application.company}</p>
                  <p className="text-xs text-muted-foreground">
                    Applied on {new Date(application.appliedAt).toLocaleDateString()}
                  </p>
                </div>
                <Badge
                  variant={
                    application.status === "Interview Scheduled"
                      ? "default"
                      : application.status === "Under Review"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {application.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to help you in your job search</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button asChild className="h-auto p-4 flex flex-col items-start">
              <Link href="/jobs">
                <Briefcase className="h-6 w-6 mb-2" />
                <span className="font-medium">Browse Jobs</span>
                <span className="text-xs text-muted-foreground">Find new opportunities</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-start">
              <Link href="/dashboard/profile">
                <FileText className="h-6 w-6 mb-2" />
                <span className="font-medium">Update Profile</span>
                <span className="text-xs text-muted-foreground">Keep your profile current</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-start">
              <Link href="/blog">
                <Eye className="h-6 w-6 mb-2" />
                <span className="font-medium">Career Resources</span>
                <span className="text-xs text-muted-foreground">Tips and advice</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
