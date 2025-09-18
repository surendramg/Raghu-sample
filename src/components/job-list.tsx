"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { mockJobs, mockSkillDemand } from "@/lib/mock-data"
import { Building2, MapPin, Clock, TrendingUp, Users, Eye } from "lucide-react"

interface JobListProps {
  searchQuery?: string
  selectedTypes?: string[]
  selectedLocations?: string[]
  salaryRange?: [number, number]
  filters?: {
    search: string
    location: string
    type: string
    experience: string
    salary: string
  }
}

export function JobList({
  searchQuery = "",
  selectedTypes = [],
  selectedLocations = [],
  salaryRange,
  filters,
}: JobListProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  const filteredJobs = useMemo(() => {
    let filtered = [...mockJobs]

    // 1️⃣ Search query (from prop or filters.search)
    const query = (searchQuery || filters?.search || "").toLowerCase()
    if (query) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.skills.some((skill) => skill.toLowerCase().includes(query)),
      )
    }

    // 2️⃣ Job types
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((job) => selectedTypes.includes(job.type))
    }

    // 3️⃣ Locations
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((job) => selectedLocations.includes(job.location))
    }

    // 4️⃣ Additional dropdown filters
    if (filters) {
      if (filters.location && filters.location !== "All Locations") {
        filtered = filtered.filter((job) => job.location.includes(filters.location))
      }
      if (filters.type && filters.type !== "All Types") {
        filtered = filtered.filter((job) => job.type === filters.type)
      }
    }

    // 5️⃣ Salary range (simplified)
    if (salaryRange) {
      filtered = filtered.filter((job) => {
        const salaryText = job.salary.toLowerCase()
        if (salaryText.includes("remote") || salaryText.includes("negotiable")) return true

        const numbers = job.salary.match(/\d+/g)
        if (numbers && numbers.length >= 2) {
          const minSalary = Number.parseInt(numbers[0]) * 100000
          const maxSalary = Number.parseInt(numbers[1]) * 100000
          return maxSalary >= salaryRange[0] && minSalary <= salaryRange[1]
        }
        return true
      })
    }

    return filtered
  }, [searchQuery, selectedTypes, selectedLocations, salaryRange, filters])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "paused":
        return "bg-yellow-500"
      case "closed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "paused":
        return "Paused"
      case "closed":
        return "Closed"
      default:
        return "Unknown"
    }
  }

  const getSkillDemand = (skill: string) => {
    return mockSkillDemand.find((s) => s.skill === skill)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
          {searchQuery && ` for "${searchQuery}"`}
        </div>
        {selectedSkill && (
          <Button variant="outline" size="sm" onClick={() => setSelectedSkill(null)}>
            Clear Skill Filter
          </Button>
        )}
      </div>

      {filteredJobs.map((job) => (
        <Card key={job.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl hover:text-primary transition-colors">
                    <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                  </CardTitle>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(job.status)}`} />
                  <Badge variant="outline" className="text-xs">
                    {getStatusText(job.status)}
                  </Badge>
                </div>
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
                    <Clock className="h-4 w-4" />
                    {new Date(job.posted_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Badge variant="outline">{job.type}</Badge>
                  {job.featured && <Badge variant="secondary">Featured</Badge>}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {job.applicants} applicants
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {job.views} views
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="font-medium text-green-600">{job.salary}</div>
              <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

              {/* Skills Section with Demand Analytics */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Required Skills</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job.skills.slice(0, 6).map((skill, index) => {
                    const skillDemand = getSkillDemand(skill)
                    return (
                      <div
                        key={index}
                        className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedSkill(skill)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                          {skillDemand && (
                            <span className="text-xs text-muted-foreground">{skillDemand.totalJobs} jobs</span>
                          )}
                        </div>
                        {skillDemand && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Market Demand</span>
                              <span className="text-green-600">{skillDemand.activeJobs} active</span>
                            </div>
                            <Progress value={(skillDemand.activeJobs / skillDemand.totalJobs) * 100} className="h-1" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Avg: {skillDemand.averageSalary}</span>
                              <div className="flex gap-1">
                                <span className="text-yellow-600">{skillDemand.pausedJobs}P</span>
                                <span className="text-red-600">{skillDemand.closedJobs}C</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {job.skills.length > 6 && (
                    <div className="p-3 border rounded-lg bg-muted/30">
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 6} more skills
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {job.requirements && (
                <div className="space-y-2">
                  <span className="text-sm font-medium">Key Requirements</span>
                  <div className="flex flex-wrap gap-1">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                    {job.requirements.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.requirements.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Posted{" "}
              {new Date(job.posted_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/jobs/${job.id}`}>View Details</Link>
              </Button>
              {job.status === "active" && (
                <Button size="sm" asChild>
                  <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
                </Button>
              )}
              {job.status === "paused" && (
                <Button size="sm" variant="secondary" disabled>
                  Applications Paused
                </Button>
              )}
              {job.status === "closed" && (
                <Button size="sm" variant="destructive" disabled>
                  Position Closed
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}

      {filteredJobs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <svg
              className="h-6 w-6 text-muted-foreground"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">No jobs found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Try adjusting your search criteria or browse all available positions.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
