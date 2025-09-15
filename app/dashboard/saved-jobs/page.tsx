"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Heart,
  ExternalLink,
  Filter,
  Briefcase,
  Users,
  Wifi,
  Calendar,
  HeartOff,
  Eye,
  Building,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock job data
const allJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp India",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    workMode: "Remote",
    salary: "₹15-25 LPA",
    experience: "3-5 years",
    skills: ["React", "TypeScript", "Node.js"],
    postedDate: "2024-01-15",
    views: 245,
    applications: 12,
    saved: false,
    description: "Join our dynamic team as a Senior React Developer and work on cutting-edge web applications.",
    featured: true,
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "₹20-30 LPA",
    experience: "4-6 years",
    skills: ["Product Strategy", "Analytics", "Agile"],
    postedDate: "2024-01-14",
    views: 189,
    applications: 8,
    saved: false,
    description: "Lead product development and strategy for our innovative fintech platform.",
    featured: false,
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "AI Solutions Ltd",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    workMode: "On-site",
    salary: "₹18-28 LPA",
    experience: "2-4 years",
    skills: ["Python", "Machine Learning", "SQL"],
    postedDate: "2024-01-13",
    views: 312,
    applications: 15,
    saved: false,
    description: "Work on exciting AI projects and help build the future of data-driven solutions.",
    featured: true,
  },
  {
    id: 4,
    title: "UX Designer",
    company: "Design Studio Pro",
    location: "Pune, Maharashtra",
    type: "Full-time",
    workMode: "Remote",
    salary: "₹12-18 LPA",
    experience: "2-4 years",
    skills: ["Figma", "User Research", "Prototyping"],
    postedDate: "2024-01-12",
    views: 156,
    applications: 6,
    saved: false,
    description: "Create beautiful and intuitive user experiences for our digital products.",
    featured: false,
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech Systems",
    location: "Chennai, Tamil Nadu",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "₹16-24 LPA",
    experience: "3-5 years",
    skills: ["AWS", "Docker", "Kubernetes"],
    postedDate: "2024-01-11",
    views: 203,
    applications: 9,
    saved: false,
    description: "Build and maintain scalable cloud infrastructure for our growing platform.",
    featured: false,
  },
  {
    id: 6,
    title: "Marketing Manager",
    company: "Growth Marketing Co",
    location: "Delhi, NCR",
    type: "Full-time",
    workMode: "On-site",
    salary: "₹14-20 LPA",
    experience: "3-5 years",
    skills: ["Digital Marketing", "SEO", "Analytics"],
    postedDate: "2024-01-10",
    views: 178,
    applications: 7,
    saved: false,
    description: "Drive marketing campaigns and growth strategies for our expanding business.",
    featured: false,
  },
  {
    id: 7,
    title: "Full Stack Developer",
    company: "InnovateLabs",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    workMode: "Remote",
    salary: "₹12-20 LPA",
    experience: "2-4 years",
    skills: ["React", "Node.js", "MongoDB"],
    postedDate: "2024-01-09",
    views: 134,
    applications: 5,
    saved: false,
    description: "Build end-to-end web applications using modern JavaScript technologies.",
    featured: false,
  },
  {
    id: 8,
    title: "Mobile App Developer",
    company: "AppCraft Solutions",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "₹10-16 LPA",
    experience: "1-3 years",
    skills: ["React Native", "Flutter", "iOS"],
    postedDate: "2024-01-08",
    views: 98,
    applications: 4,
    saved: false,
    description: "Develop cross-platform mobile applications for iOS and Android.",
    featured: false,
  },
]

const locations = ["All Locations", "Bangalore", "Mumbai", "Hyderabad", "Pune", "Chennai", "Delhi NCR"]
const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Internship"]
const workModes = ["All Modes", "Remote", "On-site", "Hybrid"]

// Initial saved jobs with some examples
const initialSavedJobs = [1, 3, 5, 7] // IDs of jobs that are pre-saved

export default function JobsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [selectedJobType, setSelectedJobType] = useState("All Types")
  const [selectedWorkMode, setSelectedWorkMode] = useState("All Modes")
  const [jobs, setJobs] = useState(allJobs)
  const [savedJobs, setSavedJobs] = useState<number[]>(initialSavedJobs)

  const handleSaveJob = (jobId: number) => {
    setSavedJobs((prev) => {
      const isAlreadySaved = prev.includes(jobId)
      if (isAlreadySaved) {
        toast({
          title: "Job removed from saved",
          description: "The job has been removed from your saved list.",
        })
        return prev.filter((id) => id !== jobId)
      } else {
        toast({
          title: "Job saved successfully",
          description: "The job has been added to your saved list.",
        })
        return [...prev, jobId]
      }
    })
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesLocation = selectedLocation === "All Locations" || job.location.includes(selectedLocation)
    const matchesJobType = selectedJobType === "All Types" || job.type === selectedJobType
    const matchesWorkMode = selectedWorkMode === "All Modes" || job.workMode === selectedWorkMode

    return matchesSearch && matchesLocation && matchesJobType && matchesWorkMode
  })

  const savedJobsList = jobs.filter((job) => savedJobs.includes(job.id))

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedLocation("All Locations")
    setSelectedJobType("All Types")
    setSelectedWorkMode("All Modes")
  }

  const JobCard = ({ job, showSavedDate = false }: { job: any; showSavedDate?: boolean }) => (
    <Card key={job.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{job.title}</CardTitle>
              {job.featured && (
                <Badge variant="secondary" className="text-xs">
                  Featured
                </Badge>
              )}
            </div>
            <CardDescription className="text-base font-medium text-foreground flex items-center gap-2">
              <Building className="h-4 w-4" />
              {job.company}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSaveJob(job.id)}
            className="text-muted-foreground hover:text-red-500"
          >
            {savedJobs.includes(job.id) ? (
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            ) : (
              <Heart className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {job.location}
          </Badge>
          <Badge variant="outline">{job.type}</Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Wifi className="h-3 w-3" />
            {job.workMode}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4">{job.description}</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-muted-foreground">
                <DollarSign className="h-3 w-3" />
                {job.salary}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Briefcase className="h-3 w-3" />
                {job.experience}
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {job.views}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {job.applications}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {job.skills.map((skill: string) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {showSavedDate ? "Saved on Jan 15, 2024" : `Posted ${new Date(job.postedDate).toLocaleDateString()}`}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                View Details
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
              <Button size="sm">Apply Now</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
          <p className="text-muted-foreground">Search for new opportunities and manage your saved jobs</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{filteredJobs.length}</p>
                  <p className="text-xs text-muted-foreground">Total Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">{savedJobs.length}</p>
                  <p className="text-xs text-muted-foreground">Saved Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Wifi className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{jobs.filter((job) => job.workMode === "Remote").length}</p>
                  <p className="text-xs text-muted-foreground">Remote Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {
                      jobs.filter((job) => {
                        const postedDate = new Date(job.postedDate)
                        const weekAgo = new Date()
                        weekAgo.setDate(weekAgo.getDate() - 7)
                        return postedDate >= weekAgo
                      }).length
                    }
                  </p>
                  <p className="text-xs text-muted-foreground">New This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="search" className="space-y-6">
          <TabsList>
            <TabsTrigger value="search">Search Jobs</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs ({savedJobs.length})</TabsTrigger>
          </TabsList>

          {/* Search Jobs Tab */}
          <TabsContent value="search" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Find Your Perfect Job</CardTitle>
                <CardDescription>
                  Use our advanced search and filters to discover opportunities that match your preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by job title, company, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Separator />

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Type</label>
                    <select
                      value={selectedJobType}
                      onChange={(e) => setSelectedJobType(e.target.value)}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      {jobTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Work Mode</label>
                    <select
                      value={selectedWorkMode}
                      onChange={(e) => setSelectedWorkMode(e.target.value)}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      {workModes.map((mode) => (
                        <option key={mode} value={mode}>
                          {mode}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Clear Filters */}
                {(searchQuery ||
                  selectedLocation !== "All Locations" ||
                  selectedJobType !== "All Types" ||
                  selectedWorkMode !== "All Modes") && (
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      <Filter className="mr-2 h-4 w-4" />
                      Clear Filters
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Job Listings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Available Positions</h2>
                <Badge variant="secondary">
                  {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
                </Badge>
              </div>

              {filteredJobs.length > 0 ? (
                <div className="grid gap-4">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search terms or filters to find more opportunities
                    </p>
                    <Button onClick={clearFilters}>Clear All Filters</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Saved Jobs Tab */}
          <TabsContent value="saved" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Saved Jobs</h2>
                <Badge variant="secondary">
                  {savedJobs.length} job{savedJobs.length !== 1 ? "s" : ""} saved
                </Badge>
              </div>

              {savedJobsList.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    These are jobs you've bookmarked for later review. You can apply to them anytime or remove them from
                    your saved list.
                  </div>
                  <div className="grid gap-4">
                    {savedJobsList.map((job) => (
                      <JobCard key={job.id} job={job} showSavedDate={true} />
                    ))}
                  </div>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <HeartOff className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No saved jobs yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start saving jobs you're interested in to keep track of opportunities you want to apply for later
                    </p>
                    <Button asChild>
                      <a href="#search">Browse Jobs</a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
