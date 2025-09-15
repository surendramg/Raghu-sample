"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { JobSearch } from "@/components/job-search"
import { JobList } from "@/components/job-list"
import { JobFilters } from "@/components/job-filters"
import { SkillDemandAnalytics } from "@/components/skill-demand-analytics"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Users, TrendingUp, Activity } from "lucide-react"
import { useState } from "react"
import { mockJobs, mockSkillDemand } from "@/lib/mock-data"

const jobStats = [
  {
    label: "Total Jobs",
    value: mockJobs.length.toString(),
    icon: Briefcase,
    color: "text-blue-600",
  },
  {
    label: "Active Jobs",
    value: mockJobs.filter((job) => job.status === "active").length.toString(),
    icon: Activity,
    color: "text-green-600",
  },
  {
    label: "Paused Jobs",
    value: mockJobs.filter((job) => job.status === "paused").length.toString(),
    icon: TrendingUp,
    color: "text-yellow-600",
  },
  {
    label: "Companies Hiring",
    value: new Set(mockJobs.map((job) => job.company)).size.toString(),
    icon: Users,
    color: "text-purple-600",
  },
]

function JobsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState({
    search: "",
    location: "All Locations",
    type: "All Types",
    experience: "All Levels",
    salary: "All Ranges",
  })

  // Calculate filtered jobs count
  const getFilteredJobsCount = () => {
    let filtered = [...mockJobs]

    const query = searchQuery || selectedFilters.search
    if (query) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase()) ||
          job.skills.some((skill) => skill.toLowerCase().includes(query.toLowerCase())),
      )
    }

    if (selectedFilters.location !== "All Locations") {
      filtered = filtered.filter((job) => job.location.includes(selectedFilters.location))
    }
    if (selectedFilters.type !== "All Types") {
      filtered = filtered.filter((job) => job.type === selectedFilters.type)
    }

    return filtered.length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Opportunities</h1>
          <p className="text-muted-foreground">Discover your next career opportunity from top companies across India</p>
        </div>

        {/* Job Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {jobStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="jobs" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="jobs">Job Listings</TabsTrigger>
          <TabsTrigger value="analytics">Skill Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-6">
          {/* Search Section */}
          <Card>
            <CardHeader>
              <CardTitle>Find Your Perfect Job</CardTitle>
              <CardDescription>
                Use our advanced search and filters to find opportunities that match your skills and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <JobSearch onSearch={setSearchQuery} />
              <Separator />
              <JobFilters
                onFiltersChange={setSelectedFilters}
                totalJobs={mockJobs.length}
                filteredJobs={getFilteredJobsCount()}
              />
            </CardContent>
          </Card>

          {/* Job Listings */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Available Positions</h2>
              <Badge variant="secondary">
                {searchQuery ||
                Object.values(selectedFilters).some(
                  (filter) =>
                    filter !== "All Locations" &&
                    filter !== "All Types" &&
                    filter !== "All Levels" &&
                    filter !== "All Ranges" &&
                    filter !== "",
                )
                  ? "Filtered Results"
                  : "All Jobs"}
              </Badge>
            </div>
            <JobList searchQuery={searchQuery} filters={selectedFilters} />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Intelligence</CardTitle>
              <CardDescription>
                Analyze skill demand across all job postings with real-time status tracking
              </CardDescription>
            </CardHeader>
          </Card>
          <SkillDemandAnalytics skillDemand={mockSkillDemand} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function JobsPage() {
  const { user } = useAuth()

  if (user) {
    return (
      <DashboardShell>
        <JobsContent />
      </DashboardShell>
    )
  }

  return <JobsContent />
}
