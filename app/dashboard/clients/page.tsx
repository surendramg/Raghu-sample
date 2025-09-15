"use client"

import type React from "react"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Building2,
  Mail,
  Calendar,
  Users,
  Briefcase,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  AlertCircle,
  Clock,
  Edit,
  Trash2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for existing clients
const mockClients = [
  {
    id: "CL001",
    companyName: "TechCorp Solutions",
    contactPerson: "Sarah Johnson",
    email: "sarah@techcorp.com",
    phone: "+1 (555) 123-4567",
    industry: "Technology",
    status: "active",
    onboardedDate: "2024-01-15",
    activeJobs: 3,
    totalHires: 12,
    username: "techcorp_sarah",
    lastLogin: "2024-01-02",
  },
  {
    id: "CL002",
    companyName: "Healthcare Plus",
    contactPerson: "Dr. Michael Chen",
    email: "m.chen@healthcareplus.com",
    phone: "+1 (555) 987-6543",
    industry: "Healthcare",
    status: "pending",
    onboardedDate: "2024-01-20",
    activeJobs: 1,
    totalHires: 0,
    username: "healthcare_chen",
    lastLogin: null,
  },
  {
    id: "CL003",
    companyName: "Finance First Bank",
    contactPerson: "Jennifer Williams",
    email: "j.williams@financefirst.com",
    phone: "+1 (555) 456-7890",
    industry: "Finance",
    status: "active",
    onboardedDate: "2023-12-10",
    activeJobs: 5,
    totalHires: 28,
    username: "finance_jennifer",
    lastLogin: "2024-01-01",
  },
]

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Consulting",
  "Real Estate",
  "Other",
]

export default function ClientsPage() {
  const [clients, setClients] = useState(mockClients)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    industry: "",
    notes: "",
    username: "",
    password: "",
  })
  const { toast } = useToast()

  const generateCredentials = () => {
    const username =
      formData.companyName.toLowerCase().replace(/\s+/g, "_") + "_" + formData.contactPerson.toLowerCase().split(" ")[0]
    const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4).toUpperCase()

    setFormData((prev) => ({
      ...prev,
      username,
      password,
    }))
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newClient = {
      id: `CL${String(clients.length + 1).padStart(3, "0")}`,
      companyName: formData.companyName,
      contactPerson: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      industry: formData.industry,
      status: "pending" as const,
      onboardedDate: new Date().toISOString().split("T")[0],
      activeJobs: 0,
      totalHires: 0,
      username: formData.username,
      lastLogin: null,
    }

    setClients((prev) => [...prev, newClient])
    setIsDialogOpen(false)
    setFormData({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      industry: "",
      notes: "",
      username: "",
      password: "",
    })

    toast({
      title: "Client Onboarded Successfully!",
      description: `${formData.companyName} has been added to your client list.`,
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredClients = clients.filter((client) => {
    if (activeTab === "all") return true
    return client.status === activeTab
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Client Management"
        text="Onboard new clients and manage existing client relationships."
        userRole="employer"
      >
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Onboard New Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Onboard New Client</DialogTitle>
              <DialogDescription>
                Add a new client to your platform and generate their login credentials.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactPerson: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional notes about this client..."
                  rows={3}
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium">Login Credentials</h4>
                  <Button type="button" variant="outline" size="sm" onClick={generateCredentials}>
                    Generate Credentials
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="flex">
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="ml-2 bg-transparent"
                        onClick={() => copyToClipboard(formData.username, "Username")}
                        disabled={!formData.username}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Provisional Password</Label>
                    <div className="flex">
                      <div className="relative flex-1">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="ml-2 bg-transparent"
                        onClick={() => copyToClipboard(formData.password, "Password")}
                        disabled={!formData.password}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    The client will be required to change their password on first login for security.
                  </AlertDescription>
                </Alert>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Onboard Client</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </DashboardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Clients ({clients.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({clients.filter((c) => c.status === "active").length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({clients.filter((c) => c.status === "pending").length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredClients.map((client) => (
              <Card key={client.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="outline" className={getStatusColor(client.status)}>
                      {getStatusIcon(client.status)}
                      <span className="ml-1 capitalize">{client.status}</span>
                    </Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-semibold text-lg">{client.companyName}</h3>
                      <p className="text-sm text-muted-foreground">ID: {client.id}</p>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>{client.contactPerson}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="truncate">{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-3 w-3 text-muted-foreground" />
                        <span>{client.industry}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>Onboarded: {new Date(client.onboardedDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex justify-between pt-2 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">{client.activeJobs}</div>
                        <div className="text-muted-foreground">Active Jobs</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{client.totalHires}</div>
                        <div className="text-muted-foreground">Total Hires</div>
                      </div>
                    </div>

                    <div className="pt-2 text-xs text-muted-foreground">
                      Username: <code className="bg-muted px-1 rounded">{client.username}</code>
                      <br />
                      Last Login: {client.lastLogin ? new Date(client.lastLogin).toLocaleDateString() : "Never"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredClients.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No clients found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  {activeTab === "all"
                    ? "You haven't onboarded any clients yet. Start by adding your first client."
                    : `No ${activeTab} clients found.`}
                </p>
                {activeTab === "all" && (
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Onboard First Client
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
