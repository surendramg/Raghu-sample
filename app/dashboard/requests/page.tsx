"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const mockJobRequests = [
  {
    id: "1",
    position: "Senior React Developer",
    department: "Engineering",
    status: "Active",
    priority: "High",
    candidates: 15,
    budget: "₹12-18 LPA",
    location: "Bangalore",
    postedAt: "2024-01-15",
    deadline: "2024-02-15",
    description: "Looking for an experienced React developer with 5+ years of experience.",
    requirements: ["React", "TypeScript", "Node.js", "GraphQL"],
  },
  {
    id: "2",
    position: "Product Manager",
    department: "Product",
    status: "In Review",
    priority: "Medium",
    candidates: 8,
    budget: "₹15-25 LPA",
    location: "Mumbai",
    postedAt: "2024-01-12",
    deadline: "2024-02-12",
    description: "Seeking a strategic product manager to lead our mobile app initiatives.",
    requirements: ["Product Strategy", "Analytics", "User Research", "Agile"],
  },
  {
    id: "3",
    position: "UX Designer",
    department: "Design",
    status: "Draft",
    priority: "Low",
    candidates: 0,
    budget: "₹8-12 LPA",
    location: "Remote",
    postedAt: "2024-01-10",
    deadline: "2024-02-10",
    description: "Creative UX designer to enhance our user experience across platforms.",
    requirements: ["Figma", "User Research", "Prototyping", "Design Systems"],
  },
  {
    id: "4",
    position: "DevOps Engineer",
    department: "Engineering",
    status: "Filled",
    priority: "High",
    candidates: 22,
    budget: "₹10-16 LPA",
    location: "Hyderabad",
    postedAt: "2024-01-08",
    deadline: "2024-02-08",
    description: "DevOps engineer to manage our cloud infrastructure and CI/CD pipelines.",
    requirements: ["AWS", "Docker", "Kubernetes", "Jenkins"],
  },
  {
    id: "5",
    position: "Data Scientist",
    department: "Analytics",
    status: "Active",
    priority: "Medium",
    candidates: 12,
    budget: "₹14-20 LPA",
    location: "Pune",
    postedAt: "2024-01-05",
    deadline: "2024-02-05",
    description: "Data scientist to work on machine learning models and analytics.",
    requirements: ["Python", "Machine Learning", "SQL", "Statistics"],
  },
]

export default function JobRequestsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  if (!user || user.role !== "client") {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Access denied. This page is for clients only.</p>
        </div>
      </DashboardShell>
    )
  }

  const filteredRequests = mockJobRequests.filter((request) => {
    const matchesSearch =
      request.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesDepartment =
      departmentFilter === "all" || request.department.toLowerCase() === departmentFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesDepartment
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "In Review":
        return "bg-yellow-100 text-yellow-800"
      case "Draft":
        return "bg-gray-100 text-gray-800"
      case "Filled":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return CheckCircle
      case "In Review":
        return Clock
      case "Draft":
        return FileText
      case "Filled":
        return Users
      default:
        return AlertCircle
    }
  }

  const stats = {
    total: mockJobRequests.length,
    active: mockJobRequests.filter((r) => r.status === "Active").length,
    inReview: mockJobRequests.filter((r) => r.status === "In Review").length,
    filled: mockJobRequests.filter((r) => r.status === "Filled").length,
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Job Requests"
        text="Manage your hiring requests and track their progress."
        userRole={user.role}
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Currently hiring</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inReview}</div>
            <p className="text-xs text-muted-foreground">Under review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Filled</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.filled}</div>
            <p className="text-xs text-muted-foreground">Successfully hired</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search positions or departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="in review">In Review</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="filled">Filled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button asChild>
              <Link href="/dashboard/requests/new">
                <Plus className="mr-2 h-4 w-4" />
                New Request
              </Link>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Job Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No job requests found</p>
              <Button asChild>
                <Link href="/dashboard/requests/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Request
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request) => {
            const StatusIcon = getStatusIcon(request.status)
            return (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{request.position}</h3>
                          <p className="text-muted-foreground font-medium">{request.department} Department</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(request.status)} variant="secondary">
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {request.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{request.candidates} candidates</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Due {new Date(request.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className={`h-4 w-4 ${getPriorityColor(request.priority)}`} />
                          <span className={getPriorityColor(request.priority)}>{request.priority} Priority</span>
                        </div>
                        <div className="text-muted-foreground">
                          {request.budget} • {request.location}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">{request.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {request.requirements.map((req) => (
                          <Badge key={req} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 lg:w-40">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/requests/${request.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/requests/${request.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </DashboardShell>
  )
}
