"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Briefcase, Clock, Filter, X, TrendingUp } from "lucide-react"
import { mockSkillDemand } from "@/lib/mock-data"

interface JobFiltersProps {
  onFiltersChange: (filters: {
    search: string
    location: string
    type: string
    experience: string
    salary: string
  }) => void
  totalJobs?: number
  filteredJobs?: number
}

export function JobFilters({ onFiltersChange, totalJobs = 0, filteredJobs = 0 }: JobFiltersProps) {
  const [filters, setFilters] = useState({
    search: "",
    location: "All Locations",
    type: "All Types",
    experience: "All Levels",
    salary: "All Ranges",
  })

  const locations = [
    "All Locations",
    "Bangalore, Karnataka",
    "Mumbai, Maharashtra",
    "Delhi, NCR",
    "Hyderabad, Telangana",
    "Pune, Maharashtra",
    "Chennai, Tamil Nadu",
    "Kolkata, West Bengal",
    "Ahmedabad, Gujarat",
  ]

  const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Internship", "Remote"]
  const experienceLevels = ["All Levels", "0-1 years", "1-3 years", "3-5 years", "5-10 years", "10+ years"]
  const salaryRanges = ["All Ranges", "0-5 LPA", "5-10 LPA", "10-15 LPA", "15-25 LPA", "25-40 LPA", "40+ LPA"]

  const updateFilters = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      location: "All Locations",
      type: "All Types",
      experience: "All Levels",
      salary: "All Ranges",
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = Object.values(filters).some(
    (value) =>
      value !== "All Locations" &&
      value !== "All Types" &&
      value !== "All Levels" &&
      value !== "All Ranges" &&
      value !== "",
  )

  const topSkills = mockSkillDemand.slice(0, 8)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter Jobs
          </CardTitle>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredJobs} of {totalJobs} jobs
            </p>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Search Jobs</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Job title, company, skills, or keywords..."
                value={filters.search}
                onChange={(e) => updateFilters("search", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Location</Label>
            <Select value={filters.location} onValueChange={(value) => updateFilters("location", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Job Type */}
          <div className="space-y-2">
            <Label>Job Type</Label>
            <Select value={filters.type} onValueChange={(value) => updateFilters("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label>Experience Level</Label>
            <Select value={filters.experience} onValueChange={(value) => updateFilters("experience", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Salary */}
          <div className="space-y-2">
            <Label>Salary Range</Label>
            <Select value={filters.salary} onValueChange={(value) => updateFilters("salary", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select salary range" />
              </SelectTrigger>
              <SelectContent>
                {salaryRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range === "All Ranges" ? range : `₹${range}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="space-y-2">
              <Label>Active Filters</Label>
              <div className="flex flex-wrap gap-2">
                {filters.search && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Search className="h-3 w-3" />
                    {filters.search}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("search", "")} />
                  </Badge>
                )}
                {filters.location !== "All Locations" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {filters.location}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("location", "All Locations")} />
                  </Badge>
                )}
                {filters.type !== "All Types" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {filters.type}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("type", "All Types")} />
                  </Badge>
                )}
                {filters.experience !== "All Levels" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {filters.experience}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("experience", "All Levels")} />
                  </Badge>
                )}
                {filters.salary !== "All Ranges" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    ₹{filters.salary}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("salary", "All Ranges")} />
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Skills Quick Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Top Skills in Demand
          </CardTitle>
          <p className="text-sm text-muted-foreground">Click on a skill to search for related jobs</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {topSkills.map((skill) => (
              <div
                key={skill.skill}
                className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => updateFilters("search", skill.skill)}
              >
                <div className="text-sm font-medium mb-1">{skill.skill}</div>
                <div className="text-xs text-muted-foreground mb-2">
                  {skill.totalJobs} jobs • {skill.averageSalary}
                </div>
                <div className="flex gap-1">
                  <Badge variant="secondary" className="text-xs px-1 py-0">
                    A: {skill.activeJobs}
                  </Badge>
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    P: {skill.pausedJobs}
                  </Badge>
                  <Badge variant="destructive" className="text-xs px-1 py-0">
                    C: {skill.closedJobs}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
