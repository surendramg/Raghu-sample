"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Users, UserX, CheckCircle, Building2, ChevronDown, ChevronRight, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface EmployerDashboardProps {
  userId: string
}

interface Client {
  id: string
  name: string
  logo?: string
  openRoles: number
  filledRoles: number
  candidatesSelected: number
  candidatesRejected: number
  totalApplications: number
  roles: Role[]
}

interface Role {
  id: string
  title: string
  applications: number
  status: "Open" | "Filled" | "On Hold"
  postedAt: string
  candidatesSelected: number
  candidatesRejected: number
  candidatesPending: number
}

export function EmployerDashboard({ userId }: EmployerDashboardProps) {
  const [expandedClients, setExpandedClients] = useState<string[]>([])

  const toggleClient = (clientId: string) => {
    setExpandedClients((prev) => (prev.includes(clientId) ? prev.filter((id) => id !== clientId) : [...prev, clientId]))
  }

  // Mock data for clients and their roles
  const clients: Client[] = [
    {
      id: "1",
      name: "TechCorp Solutions",
      openRoles: 5,
      filledRoles: 3,
      candidatesSelected: 8,
      candidatesRejected: 15,
      totalApplications: 67,
      roles: [
        {
          id: "r1",
          title: "Senior Software Engineer",
          applications: 25,
          status: "Open",
          postedAt: "2024-01-15",
          candidatesSelected: 0,
          candidatesRejected: 8,
          candidatesPending: 17,
        },
        {
          id: "r2",
          title: "Product Manager",
          applications: 18,
          status: "Filled",
          postedAt: "2024-01-12",
          candidatesSelected: 1,
          candidatesRejected: 12,
          candidatesPending: 5,
        },
        {
          id: "r3",
          title: "DevOps Engineer",
          applications: 24,
          status: "Open",
          postedAt: "2024-01-18",
          candidatesSelected: 0,
          candidatesRejected: 6,
          candidatesPending: 18,
        },
      ],
    },
    {
      id: "2",
      name: "InnovateLabs Inc",
      openRoles: 4,
      filledRoles: 2,
      candidatesSelected: 5,
      candidatesRejected: 12,
      totalApplications: 45,
      roles: [
        {
          id: "r4",
          title: "UX Designer",
          applications: 15,
          status: "Open",
          postedAt: "2024-01-20",
          candidatesSelected: 0,
          candidatesRejected: 4,
          candidatesPending: 11,
        },
        {
          id: "r5",
          title: "Frontend Developer",
          applications: 20,
          status: "Filled",
          postedAt: "2024-01-14",
          candidatesSelected: 1,
          candidatesRejected: 8,
          candidatesPending: 11,
        },
        {
          id: "r6",
          title: "Data Scientist",
          applications: 10,
          status: "Open",
          postedAt: "2024-01-22",
          candidatesSelected: 0,
          candidatesRejected: 2,
          candidatesPending: 8,
        },
      ],
    },
    {
      id: "3",
      name: "StartupXYZ",
      openRoles: 3,
      filledRoles: 3,
      candidatesSelected: 6,
      candidatesRejected: 8,
      totalApplications: 44,
      roles: [
        {
          id: "r7",
          title: "Full Stack Developer",
          applications: 22,
          status: "Filled",
          postedAt: "2024-01-10",
          candidatesSelected: 1,
          candidatesRejected: 12,
          candidatesPending: 9,
        },
        {
          id: "r8",
          title: "Marketing Manager",
          applications: 12,
          status: "Filled",
          postedAt: "2024-01-16",
          candidatesSelected: 1,
          candidatesRejected: 6,
          candidatesPending: 5,
        },
        {
          id: "r9",
          title: "Sales Representative",
          applications: 10,
          status: "Filled",
          postedAt: "2024-01-19",
          candidatesSelected: 1,
          candidatesRejected: 4,
          candidatesPending: 5,
        },
      ],
    },
  ]

  // Calculate overall stats
  const overallStats = {
    totalClients: clients.length,
    openRoles: clients.reduce((sum, client) => sum + client.openRoles, 0),
    filledRoles: clients.reduce((sum, client) => sum + client.filledRoles, 0),
    candidatesSelected: clients.reduce((sum, client) => sum + client.candidatesSelected, 0),
    candidatesRejected: clients.reduce((sum, client) => sum + client.candidatesRejected, 0),
    totalApplications: clients.reduce((sum, client) => sum + client.totalApplications, 0),
  }

  return (
    <div className="space-y-6">
      {/* Overall Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalClients}</div>
            <p className="text-xs text-muted-foreground">Active clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Roles</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.openRoles}</div>
            <p className="text-xs text-muted-foreground">Across all clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Filled Roles</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.filledRoles}</div>
            <p className="text-xs text-muted-foreground">Successfully placed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selected</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{overallStats.candidatesSelected}</div>
            <p className="text-xs text-muted-foreground">Candidates hired</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overallStats.candidatesRejected}</div>
            <p className="text-xs text-muted-foreground">Not selected</p>
          </CardContent>
        </Card>
      </div>

      {/* Client Details with Drill-down */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Client Portfolio</CardTitle>
              <CardDescription>Detailed breakdown by client with role-level insights</CardDescription>
            </div>
            <Button asChild>
              <Link href="/dashboard/jobs/new">Post New Job</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clients.map((client) => (
              <Collapsible key={client.id} className="border rounded-lg">
                <CollapsibleTrigger
                  className="w-full p-4 hover:bg-muted/50 transition-colors"
                  onClick={() => toggleClient(client.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {expandedClients.includes(client.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium">{client.name}</h4>
                        <p className="text-sm text-muted-foreground">{client.totalApplications} total applications</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm font-medium text-blue-600">{client.openRoles}</div>
                        <div className="text-xs text-muted-foreground">Open</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-green-600">{client.filledRoles}</div>
                        <div className="text-xs text-muted-foreground">Filled</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-green-700">{client.candidatesSelected}</div>
                        <div className="text-xs text-muted-foreground">Selected</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-red-600">{client.candidatesRejected}</div>
                        <div className="text-xs text-muted-foreground">Rejected</div>
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 border-t bg-muted/20">
                    <div className="pt-4">
                      <h5 className="font-medium mb-3 text-sm text-muted-foreground">
                        ROLES FOR {client.name.toUpperCase()}
                      </h5>
                      <div className="space-y-3">
                        {client.roles.map((role) => (
                          <div
                            key={role.id}
                            className="flex items-center justify-between p-3 bg-background border rounded-md"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h6 className="font-medium">{role.title}</h6>
                                <Badge
                                  variant={
                                    role.status === "Open"
                                      ? "default"
                                      : role.status === "Filled"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {role.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {role.applications} applications • Posted {new Date(role.postedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="text-center">
                                <div className="font-medium text-green-600">{role.candidatesSelected}</div>
                                <div className="text-xs text-muted-foreground">Selected</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium text-red-600">{role.candidatesRejected}</div>
                                <div className="text-xs text-muted-foreground">Rejected</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium text-yellow-600">{role.candidatesPending}</div>
                                <div className="text-xs text-muted-foreground">Pending</div>
                              </div>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/dashboard/jobs/${role.id}`}>
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hiring Pipeline Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Hiring Pipeline</CardTitle>
          <CardDescription>Current status across all clients and roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{overallStats.totalApplications}</div>
              <p className="text-sm text-muted-foreground">Total Applications</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {overallStats.totalApplications - overallStats.candidatesSelected - overallStats.candidatesRejected}
              </div>
              <p className="text-sm text-muted-foreground">Under Review</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{overallStats.candidatesSelected}</div>
              <p className="text-sm text-muted-foreground">Successfully Placed</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">{overallStats.candidatesRejected}</div>
              <p className="text-sm text-muted-foreground">Not Selected</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
