"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building, User, Bell, Shield, Globe, Zap, Database, Briefcase, Eye, UserCheck, Save } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  if (!user) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-medium">Please log in</h3>
            <p className="text-sm text-muted-foreground">You need to be logged in to access settings.</p>
          </div>
        </div>
      </DashboardShell>
    )
  }

  // Role-specific avatar
  const getRoleAvatarSrc = (role: string) => {
    switch (role) {
      case "admin":
        return "/placeholder.svg?height=80&width=80&text=👨‍💼&bg=ef4444&color=white"
      case "employer":
        return "/placeholder.svg?height=80&width=80&text=🏢&bg=3b82f6&color=white"
      case "candidate":
        return "/placeholder.svg?height=80&width=80&text=👩‍💻&bg=10b981&color=white"
      default:
        return "/placeholder.svg?height=80&width=80&text=👤&bg=6b7280&color=white"
    }
  }

  const roleAvatarSrc = getRoleAvatarSrc(user.role)

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  // Admin Settings
  if (user.role === "admin") {
    return (
      <DashboardShell>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Admin Settings</h3>
              <p className="text-muted-foreground">Manage platform configuration and system settings.</p>
            </div>
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">
                <Globe className="mr-2 h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="integrations">
                <Zap className="mr-2 h-4 w-4" />
                Integrations
              </TabsTrigger>
              <TabsTrigger value="advanced">
                <Database className="mr-2 h-4 w-4" />
                Advanced
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Configuration</CardTitle>
                  <CardDescription>Configure general platform settings and features.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="platform-name">Platform Name</Label>
                      <Input id="platform-name" defaultValue="RecruitPro" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="support-email">Support Email</Label>
                      <Input id="support-email" type="email" defaultValue="support@recruitpro.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platform-description">Platform Description</Label>
                    <Textarea
                      id="platform-description"
                      defaultValue="Professional recruitment platform connecting employers with top talent."
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="maintenance-mode" />
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="new-registrations" defaultChecked />
                    <Label htmlFor="new-registrations">Allow New Registrations</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Policies</CardTitle>
                  <CardDescription>Configure security settings and access policies.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input id="session-timeout" type="number" defaultValue="60" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                      <Input id="max-login-attempts" type="number" defaultValue="5" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="two-factor" defaultChecked />
                    <Label htmlFor="two-factor">Require Two-Factor Authentication</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="password-complexity" defaultChecked />
                    <Label htmlFor="password-complexity">Enforce Password Complexity</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Notifications</CardTitle>
                  <CardDescription>Configure system-wide notification settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="system-alerts" defaultChecked />
                    <Label htmlFor="system-alerts">System Alert Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="user-activity" defaultChecked />
                    <Label htmlFor="user-activity">User Activity Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="security-alerts" defaultChecked />
                    <Label htmlFor="security-alerts">Security Alert Notifications</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Third-Party Integrations</CardTitle>
                  <CardDescription>Manage external service integrations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">WhatsApp Business API</h4>
                        <p className="text-sm text-muted-foreground">Enable WhatsApp messaging</p>
                      </div>
                      <Badge variant="secondary">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Service</h4>
                        <p className="text-sm text-muted-foreground">SMTP email delivery</p>
                      </div>
                      <Badge variant="secondary">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Payment Gateway</h4>
                        <p className="text-sm text-muted-foreground">Process payments</p>
                      </div>
                      <Badge variant="outline">Not Connected</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>Developer and system administration settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="debug-mode" />
                    <Label htmlFor="debug-mode">Debug Mode</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="api-logging" defaultChecked />
                    <Label htmlFor="api-logging">API Request Logging</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cache-duration">Cache Duration (hours)</Label>
                    <Input id="cache-duration" type="number" defaultValue="24" />
                  </div>
                  <Button variant="destructive" size="sm">
                    Clear System Cache
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardShell>
    )
  }

  // Employer Settings
  if (user.role === "employer") {
    return (
      <DashboardShell>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Employer Settings</h3>
              <p className="text-muted-foreground">Manage your company profile and hiring preferences.</p>
            </div>
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <Tabs defaultValue="company" className="space-y-4">
            <TabsList>
              <TabsTrigger value="company">
                <Building className="mr-2 h-4 w-4" />
                Company
              </TabsTrigger>
              <TabsTrigger value="hiring">
                <Briefcase className="mr-2 h-4 w-4" />
                Hiring
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="account">
                <User className="mr-2 h-4 w-4" />
                Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="company" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Company Profile</CardTitle>
                  <CardDescription>Update your company information and branding.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={roleAvatarSrc || "/placeholder.svg"} alt="Company Logo" />
                      <AvatarFallback className="bg-blue-500 text-white">
                        <Building className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Logo</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" defaultValue="Tech Solutions Inc." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-size">Company Size</Label>
                      <Select defaultValue="51-200">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="500+">500+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select defaultValue="technology">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="Mumbai, India" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-description">Company Description</Label>
                    <Textarea
                      id="company-description"
                      defaultValue="Leading technology company focused on innovative solutions."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hiring" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Hiring Preferences</CardTitle>
                  <CardDescription>Configure your job posting and application settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="application-stages">Application Stages</Label>
                    <Textarea
                      id="application-stages"
                      defaultValue="Applied, Screening, Interview, Final Review, Offer"
                      placeholder="Enter comma-separated stages"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="screening-questions">Default Screening Questions</Label>
                    <Textarea
                      id="screening-questions"
                      defaultValue="What interests you about this role?\nDescribe your relevant experience.\nWhat are your salary expectations?"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-response" defaultChecked />
                    <Label htmlFor="auto-response">Send automatic application confirmations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="require-cover-letter" />
                    <Label htmlFor="require-cover-letter">Require cover letter for applications</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose what notifications you want to receive.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="new-applications" defaultChecked />
                    <Label htmlFor="new-applications">New job applications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="job-expiry" defaultChecked />
                    <Label htmlFor="job-expiry">Job posting expiry reminders</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="weekly-reports" defaultChecked />
                    <Label htmlFor="weekly-reports">Weekly hiring reports</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="candidate-messages" defaultChecked />
                    <Label htmlFor="candidate-messages">Candidate messages</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your personal account information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input id="full-name" defaultValue={user.name || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardShell>
    )
  }

  // Candidate Settings
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Candidate Settings</h3>
            <p className="text-muted-foreground">Manage your profile and job search preferences.</p>
          </div>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Briefcase className="mr-2 h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Eye className="mr-2 h-4 w-4" />
              Privacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={roleAvatarSrc || "/placeholder.svg"} alt="Profile Picture" />
                    <AvatarFallback className="bg-green-500 text-white">
                      <UserCheck className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Photo</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Doe" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="Mumbai, India" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Job Search Preferences</CardTitle>
                <CardDescription>Set your preferences for better job recommendations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-type">Preferred Job Type</Label>
                    <Select defaultValue="full-time">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="work-mode">Work Mode</Label>
                    <Select defaultValue="hybrid">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="onsite">On-site</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-salary">Minimum Salary (₹)</Label>
                    <Input id="min-salary" type="number" defaultValue="500000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-salary">Maximum Salary (₹)</Label>
                    <Input id="max-salary" type="number" defaultValue="1200000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferred-locations">Preferred Locations</Label>
                  <Input id="preferred-locations" defaultValue="Mumbai, Pune, Bangalore" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills</Label>
                  <Input id="skills" defaultValue="React, Node.js, TypeScript, Python" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you want to receive.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="job-recommendations" defaultChecked />
                  <Label htmlFor="job-recommendations">Job recommendations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="application-updates" defaultChecked />
                  <Label htmlFor="application-updates">Application status updates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="interview-reminders" defaultChecked />
                  <Label htmlFor="interview-reminders">Interview reminders</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="employer-messages" defaultChecked />
                  <Label htmlFor="employer-messages">Messages from employers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="weekly-digest" />
                  <Label htmlFor="weekly-digest">Weekly job digest</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control your profile visibility and contact preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-visibility">Profile Visibility</Label>
                  <Select defaultValue="public">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Visible to all employers</SelectItem>
                      <SelectItem value="limited">Limited - Only applied companies</SelectItem>
                      <SelectItem value="private">Private - Hidden from search</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="allow-contact" defaultChecked />
                  <Label htmlFor="allow-contact">Allow employers to contact me directly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="show-salary" />
                  <Label htmlFor="show-salary">Show salary expectations on profile</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="anonymous-applications" />
                  <Label htmlFor="anonymous-applications">Apply anonymously when possible</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
