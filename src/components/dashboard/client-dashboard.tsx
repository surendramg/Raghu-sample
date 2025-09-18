"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Users, Calendar, Clock, Plus, Eye, TrendingUp, CheckCircle, FileText } from "lucide-react"
import Link from "next/link"

interface ClientDashboardProps {
  userId: string
}

export function ClientDashboard({ userId }: ClientDashboardProps) {
  const stats = [
    {
      title: "Active Requests",
      value: "12",
      description: "Job positions being filled",
      icon: FileText,
      trend: "+2 this week",
      color: "text-blue-600",
    },
    {
      title: "Filled Positions",
      value: "8",
      description: "Successfully hired",
      icon: CheckCircle,
      trend: "+3 this month",
      color: "text-green-600",
    },
    {
      title: "Candidates Interviewed",
      value: "45",
      description: "Total interviews conducted",
      icon: Users,
      trend: "+12 this week",
      color: "text-purple-600",
    },
    {
      title: "Avg. Time to Hire",
      value: "18 days",
      description: "From posting to offer",
      icon: Clock,
      trend: "-2 days improved",
      color: "text-orange-600",
    },
  ]

  const recentRequests = [
    {
      id: "1",
      position: "Senior React Developer",
      department: "Engineering",
      status: "In Progress",
      candidates: 15,
      priority: "High",
      progress: 65,
    },
    {
      id: "2",
      position: "Product Manager",
      department: "Product",
      status: "Reviewing",
      candidates: 8,
      priority: "Medium",
      progress: 80,
    },
    {
      id: "3",
      position: "UX Designer",
      department: "Design",
      status: "Draft",
      candidates: 0,
      priority: "Low",
      progress: 20,
    },
  ]

  const upcomingInterviews = [
    {
      id: "1",
      candidate: "Sarah Johnson",
      position: "Senior React Developer",
      time: "Today, 2:00 PM",
      type: "Technical Interview",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      candidate: "Michael Chen",
      position: "Product Manager",
      time: "Tomorrow, 10:00 AM",
      type: "Final Interview",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "3",
      candidate: "Emily Davis",
      position: "UX Designer",
      time: "Friday, 3:30 PM",
      type: "Portfolio Review",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Reviewing":
        return "bg-yellow-100 text-yellow-800"
      case "Draft":
        return "bg-gray-100 text-gray-800"
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

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <p className="text-xs text-green-600 mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Job Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Job Requests</CardTitle>
              <CardDescription>Your latest hiring requests and their progress</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/requests">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{request.position}</h4>
                      <Badge className={getStatusColor(request.status)} variant="secondary">
                        {request.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{request.department}</span>
                      <span>•</span>
                      <span>{request.candidates} candidates</span>
                      <span>•</span>
                      <span className={getPriorityColor(request.priority)}>{request.priority} Priority</span>
                    </div>
                    <div className="mt-2">
                      <Progress value={request.progress} className="h-1" />
                      <span className="text-xs text-muted-foreground">{request.progress}% complete</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Interviews */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Scheduled interviews for your positions</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/interviews">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={interview.avatar || "/placeholder.svg"} alt={interview.candidate} />
                    <AvatarFallback>
                      {interview.candidate
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{interview.candidate}</p>
                    <p className="text-xs text-muted-foreground truncate">{interview.position}</p>
                    <p className="text-xs text-blue-600">{interview.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">{interview.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline" asChild>
              <Link href="/dashboard/requests/new">
                <Plus className="h-6 w-6" />
                <span>New Job Request</span>
              </Link>
            </Button>
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline" asChild>
              <Link href="/dashboard/candidates">
                <Users className="h-6 w-6" />
                <span>Review Candidates</span>
              </Link>
            </Button>
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline" asChild>
              <Link href="/dashboard/analytics">
                <TrendingUp className="h-6 w-6" />
                <span>View Analytics</span>
              </Link>
            </Button>
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline" asChild>
              <Link href="/dashboard/interviews">
                <Calendar className="h-6 w-6" />
                <span>Schedule Interview</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
