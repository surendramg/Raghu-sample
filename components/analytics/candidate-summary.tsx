"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Users, Clock, Briefcase, GraduationCap } from "lucide-react"

const candidateMetrics = {
  totalCandidates: 2847,
  activeCandidates: 1923,
  newCandidatesThisMonth: 234,
  averageExperience: 4.2,
  profileCompletionRate: 78.5,
  responseRate: 65.2,
  experienceLevels: [
    { level: "Entry Level (0-2 years)", count: 856, percentage: 30 },
    { level: "Mid Level (3-5 years)", count: 1139, percentage: 40 },
    { level: "Senior Level (6-10 years)", count: 569, percentage: 20 },
    { level: "Lead/Principal (10+ years)", count: 283, percentage: 10 },
  ],
  topSkills: [
    { skill: "JavaScript", candidates: 1245, percentage: 44 },
    { skill: "React", candidates: 987, percentage: 35 },
    { skill: "Python", candidates: 876, percentage: 31 },
    { skill: "Node.js", candidates: 743, percentage: 26 },
    { skill: "SQL", candidates: 698, percentage: 25 },
  ],
  locationDistribution: [
    { city: "Bangalore", count: 789, percentage: 28 },
    { city: "Mumbai", count: 542, percentage: 19 },
    { city: "Delhi NCR", count: 456, percentage: 16 },
    { city: "Hyderabad", count: 398, percentage: 14 },
    { city: "Pune", count: 312, percentage: 11 },
    { city: "Others", count: 350, percentage: 12 },
  ],
  salaryExpectations: [
    { range: "₹3-6 LPA", count: 712, percentage: 25 },
    { range: "₹6-10 LPA", count: 854, percentage: 30 },
    { range: "₹10-15 LPA", count: 569, percentage: 20 },
    { range: "₹15-25 LPA", count: 427, percentage: 15 },
    { range: "₹25+ LPA", count: 285, percentage: 10 },
  ],
  topPerformers: [
    {
      name: "Rahul Sharma",
      skills: ["React", "Node.js", "TypeScript"],
      experience: "5 years",
      rating: 4.9,
      completionScore: 95,
      location: "Bangalore",
    },
    {
      name: "Priya Gupta",
      skills: ["Python", "Django", "AWS"],
      experience: "4 years",
      rating: 4.8,
      completionScore: 92,
      location: "Mumbai",
    },
    {
      name: "Arjun Patel",
      skills: ["Java", "Spring Boot", "Microservices"],
      experience: "6 years",
      rating: 4.7,
      completionScore: 90,
      location: "Pune",
    },
    {
      name: "Sneha Reddy",
      skills: ["React", "TypeScript", "GraphQL"],
      experience: "3 years",
      rating: 4.8,
      completionScore: 88,
      location: "Hyderabad",
    },
  ],
  jobPreferences: [
    { type: "Full-time", percentage: 78 },
    { type: "Remote", percentage: 65 },
    { type: "Hybrid", percentage: 45 },
    { type: "Contract", percentage: 23 },
    { type: "Part-time", percentage: 12 },
  ],
  availabilityTimeline: [
    { timeline: "Immediate (0-15 days)", count: 456, percentage: 16 },
    { timeline: "1 Month", count: 854, percentage: 30 },
    { timeline: "2 Months", count: 712, percentage: 25 },
    { timeline: "3+ Months", count: 825, percentage: 29 },
  ],
}

export function CandidateSummary() {
  return (
    <div className="space-y-6">
      {/* Candidate Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{candidateMetrics.totalCandidates.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{candidateMetrics.newCandidatesThisMonth} this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Candidates</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{candidateMetrics.activeCandidates.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((candidateMetrics.activeCandidates / candidateMetrics.totalCandidates) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Experience</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{candidateMetrics.averageExperience} years</div>
            <p className="text-xs text-muted-foreground">Across all candidates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{candidateMetrics.responseRate}%</div>
            <p className="text-xs text-muted-foreground">To employer messages</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Experience Level Distribution</CardTitle>
                <CardDescription>Breakdown of candidates by experience level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidateMetrics.experienceLevels.map((level) => (
                    <div key={level.level} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{level.level}</span>
                        <span>
                          {level.count} candidates ({level.percentage}%)
                        </span>
                      </div>
                      <Progress value={level.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Availability Timeline</CardTitle>
                <CardDescription>When candidates can start new positions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidateMetrics.availabilityTimeline.map((timeline) => (
                    <div key={timeline.timeline} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{timeline.timeline}</span>
                        <span>
                          {timeline.count} candidates ({timeline.percentage}%)
                        </span>
                      </div>
                      <Progress value={timeline.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Most Common Skills</CardTitle>
                <CardDescription>Top skills among registered candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidateMetrics.topSkills.map((skill, index) => (
                    <div key={skill.skill} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        <span className="font-medium">{skill.skill}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{skill.candidates}</p>
                        <p className="text-xs text-muted-foreground">{skill.percentage}% of candidates</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Job Preferences</CardTitle>
                <CardDescription>Preferred work arrangements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidateMetrics.jobPreferences.map((pref) => (
                    <div key={pref.type} className="space-y-2">
                      <div className="flex justify-between text-sm">\
