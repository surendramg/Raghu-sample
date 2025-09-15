"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useAuth } from "@/lib/auth-context"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  FileText,
  Download,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Save,
  Eye,
  CheckCircle,
  UserCheck,
  Building,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  Mail,
  MessageSquare,
  Lock,
  EyeOff,
} from "lucide-react"

interface ParsedResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
  }
  summary: string
  experience: Array<{
    company: string
    position: string
    duration: string
    description: string
  }>
  education: Array<{
    institution: string
    degree: string
    year: string
  }>
  skills: string[]
  totalExperience: string
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null)
  const [isParsingComplete, setIsParsingComplete] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Notification settings state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    jobAlerts: true,
    interviewReminders: true,
    applicationUpdates: true,
    marketingEmails: false,
    weeklyDigest: true,
    instantAlerts: false,
  })

  // Privacy settings state
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    contactInfoVisible: true,
    showOnlineStatus: false,
    allowDirectMessages: true,
    showActivityStatus: true,
    dataSharing: false,
    analyticsTracking: true,
    thirdPartyIntegrations: false,
  })

  // Redirect if not authenticated
  if (!user) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-medium">Please log in</h3>
            <p className="text-sm text-muted-foreground">
              You need to be logged in to access your profile.{" "}
              <a href="/auth/login" className="text-primary hover:underline">
                Login here
              </a>
            </p>
          </div>
        </div>
      </DashboardShell>
    )
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or Word document")
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB")
      return
    }

    setUploadedFile(file)
    setUploadProgress(0)
    setIsParsingComplete(false)

    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          parseResume(file)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const parseResume = async (file: File) => {
    // Simulate resume parsing (in real implementation, this would call an API)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock parsed data
    const mockParsedData: ParsedResumeData = {
      personalInfo: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+91 98765 43210",
        location: "Mumbai, India",
      },
      summary:
        "Experienced software developer with 5+ years in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable web applications and leading development teams.",
      experience: [
        {
          company: "Tech Solutions Inc.",
          position: "Senior Software Developer",
          duration: "2021 - Present",
          description:
            "Led development of microservices architecture, improved system performance by 40%, mentored junior developers.",
        },
        {
          company: "StartupXYZ",
          position: "Full Stack Developer",
          duration: "2019 - 2021",
          description:
            "Built responsive web applications using React and Node.js, implemented CI/CD pipelines, collaborated with cross-functional teams.",
        },
      ],
      education: [
        {
          institution: "Mumbai University",
          degree: "Bachelor of Engineering - Computer Science",
          year: "2019",
        },
      ],
      skills: ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker", "MongoDB", "PostgreSQL"],
      totalExperience: "5+ years",
    }

    setParsedData(mockParsedData)
    setIsParsingComplete(true)
  }

  const applyParsedDataToProfile = () => {
    if (!parsedData) return

    // In a real implementation, this would update the user's profile
    alert("Profile updated with parsed resume data!")
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsEditing(false)
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: string, value: boolean | string) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
  }

  const roleAvatarSrc =
    user.role === "client"
      ? "/placeholder.svg?height=80&width=80&text=🏛️&bg=7c3aed&color=white"
      : "/placeholder.svg?height=80&width=80&text=👩‍💻&bg=10b981&color=white"

  // Client Profile View
  if (user.role === "client") {
    return (
      <DashboardShell>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Company Profile & Settings</h3>
              <p className="text-muted-foreground">
                Manage your company information, notifications, and privacy settings.
              </p>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </div>
          </div>

          <Tabs defaultValue="company" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="company">
                <Building className="mr-2 h-4 w-4" />
                Company
              </TabsTrigger>
              <TabsTrigger value="contact">
                <User className="mr-2 h-4 w-4" />
                Contact
              </TabsTrigger>
              <TabsTrigger value="address">
                <MapPin className="mr-2 h-4 w-4" />
                Address
              </TabsTrigger>
              <TabsTrigger value="business">
                <CreditCard className="mr-2 h-4 w-4" />
                Business
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy">
                <Shield className="mr-2 h-4 w-4" />
                Privacy
              </TabsTrigger>
            </TabsList>

            {/* Company Information Tab */}
            <TabsContent value="company" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>Update your company details and branding.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={roleAvatarSrc || "/placeholder.svg"} alt="Company Logo" />
                      <AvatarFallback className="bg-purple-500 text-white">
                        <Building className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && <Button variant="outline">Change Logo</Button>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input
                        id="company-name"
                        defaultValue="TechCorp Solutions Pvt Ltd"
                        disabled={!isEditing}
                        onChange={() => {}}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Input
                        id="industry"
                        defaultValue="Information Technology"
                        disabled={!isEditing}
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-size">Company Size</Label>
                      <Input
                        id="company-size"
                        defaultValue="50-200 employees"
                        disabled={!isEditing}
                        onChange={() => {}}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="founded-year">Founded Year</Label>
                      <Input id="founded-year" defaultValue="2015" disabled={!isEditing} onChange={() => {}} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Company Website</Label>
                    <Input
                      id="website"
                      defaultValue="https://techcorp-solutions.com"
                      disabled={!isEditing}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-description">Company Description</Label>
                    <Textarea
                      id="company-description"
                      defaultValue="TechCorp Solutions is a leading IT services company specializing in custom software development, cloud solutions, and digital transformation. We help businesses leverage technology to achieve their goals and stay competitive in the digital age."
                      disabled={!isEditing}
                      rows={4}
                      onChange={() => {}}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Details Tab */}
            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Update your primary contact details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-person">Contact Person</Label>
                      <Input
                        id="contact-person"
                        defaultValue="Rajesh Kumar"
                        disabled={!isEditing}
                        onChange={() => {}}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="designation">Designation</Label>
                      <Input id="designation" defaultValue="HR Manager" disabled={!isEditing} onChange={() => {}} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                        disabled={!isEditing}
                        onChange={() => {}}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+91 98765 43210" disabled={!isEditing} onChange={() => {}} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="alt-email">Alternative Email</Label>
                      <Input
                        id="alt-email"
                        defaultValue="hr@techcorp-solutions.com"
                        disabled={!isEditing}
                        onChange={() => {}}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alt-phone">Alternative Phone</Label>
                      <Input id="alt-phone" defaultValue="+91 22 4567 8900" disabled={!isEditing} onChange={() => {}} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Address Tab */}
            <TabsContent value="address" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Company Address</CardTitle>
                  <CardDescription>Update your company's registered and office addresses.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Registered Office */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Registered Office
                    </h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reg-address">Street Address</Label>
                        <Input
                          id="reg-address"
                          defaultValue="123, Business Park, Andheri East"
                          disabled={!isEditing}
                          onChange={() => {}}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="reg-city">City</Label>
                          <Input id="reg-city" defaultValue="Mumbai" disabled={!isEditing} onChange={() => {}} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-state">State</Label>
                          <Input id="reg-state" defaultValue="Maharashtra" disabled={!isEditing} onChange={() => {}} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-pincode">PIN Code</Label>
                          <Input id="reg-pincode" defaultValue="400069" disabled={!isEditing} onChange={() => {}} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Corporate Office */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Corporate Office
                    </h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="corp-address">Street Address</Label>
                        <Input
                          id="corp-address"
                          defaultValue="456, Tech Tower, Bandra Kurla Complex"
                          disabled={!isEditing}
                          onChange={() => {}}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="corp-city">City</Label>
                          <Input id="corp-city" defaultValue="Mumbai" disabled={!isEditing} onChange={() => {}} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="corp-state">State</Label>
                          <Input id="corp-state" defaultValue="Maharashtra" disabled={!isEditing} onChange={() => {}} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="corp-pincode">PIN Code</Label>
                          <Input id="corp-pincode" defaultValue="400051" disabled={!isEditing} onChange={() => {}} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Business Details Tab */}
            <TabsContent value="business" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Business Details</CardTitle>
                  <CardDescription>Update your business registration and tax information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gst-number">GST Number</Label>
                      <Input id="gst-number" defaultValue="27AABCT1234C1Z5" disabled={!isEditing} onChange={() => {}} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pan-number">PAN Number</Label>
                      <Input id="pan-number" defaultValue="AABCT1234C" disabled={!isEditing} onChange={() => {}} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cin-number">CIN Number</Label>
                      <Input
                        id="cin-number"
                        defaultValue="U72900MH2015PTC123456"
                        disabled={!isEditing}
                        onChange={() => {}}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registration-date">Registration Date</Label>
                      <Input
                        id="registration-date"
                        type="date"
                        defaultValue="2015-03-15"
                        disabled={!isEditing}
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="authorized-capital">Authorized Capital</Label>
                      <Input
                        id="authorized-capital"
                        defaultValue="₹10,00,000"
                        disabled={!isEditing}
                        onChange={() => {}}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paid-up-capital">Paid-up Capital</Label>
                      <Input id="paid-up-capital" defaultValue="₹5,00,000" disabled={!isEditing} onChange={() => {}} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-activities">Business Activities</Label>
                    <Textarea
                      id="business-activities"
                      defaultValue="Software development, IT consulting, cloud services, digital transformation, mobile app development, web development, system integration, and technology training services."
                      disabled={!isEditing}
                      rows={3}
                      onChange={() => {}}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Communication Preferences */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Communication Preferences
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={notifications.emailNotifications}
                          onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                        </div>
                        <Switch
                          checked={notifications.smsNotifications}
                          onCheckedChange={(checked) => handleNotificationChange("smsNotifications", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                        </div>
                        <Switch
                          checked={notifications.pushNotifications}
                          onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Job & Interview Notifications */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Job & Interview Notifications
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Job Application Alerts</Label>
                          <p className="text-sm text-muted-foreground">New applications for your job postings</p>
                        </div>
                        <Switch
                          checked={notifications.jobAlerts}
                          onCheckedChange={(checked) => handleNotificationChange("jobAlerts", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Interview Reminders</Label>
                          <p className="text-sm text-muted-foreground">Reminders for upcoming interviews</p>
                        </div>
                        <Switch
                          checked={notifications.interviewReminders}
                          onCheckedChange={(checked) => handleNotificationChange("interviewReminders", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Application Updates</Label>
                          <p className="text-sm text-muted-foreground">Status changes on applications</p>
                        </div>
                        <Switch
                          checked={notifications.applicationUpdates}
                          onCheckedChange={(checked) => handleNotificationChange("applicationUpdates", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Instant Alerts</Label>
                          <p className="text-sm text-muted-foreground">Real-time notifications for urgent updates</p>
                        </div>
                        <Switch
                          checked={notifications.instantAlerts}
                          onCheckedChange={(checked) => handleNotificationChange("instantAlerts", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Marketing & Updates */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Marketing & Updates
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Marketing Emails</Label>
                          <p className="text-sm text-muted-foreground">Product updates and promotional content</p>
                        </div>
                        <Switch
                          checked={notifications.marketingEmails}
                          onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Weekly Digest</Label>
                          <p className="text-sm text-muted-foreground">Weekly summary of your hiring activity</p>
                        </div>
                        <Switch
                          checked={notifications.weeklyDigest}
                          onCheckedChange={(checked) => handleNotificationChange("weeklyDigest", checked)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security Settings</CardTitle>
                  <CardDescription>Control your privacy and data sharing preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Visibility */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Profile Visibility
                    </h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Company Profile Visibility</Label>
                        <Select
                          value={privacy.profileVisibility}
                          onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public - Visible to all users</SelectItem>
                            <SelectItem value="registered">Registered Users Only</SelectItem>
                            <SelectItem value="private">Private - Only visible to you</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Show Contact Information</Label>
                          <p className="text-sm text-muted-foreground">Display contact details on public profile</p>
                        </div>
                        <Switch
                          checked={privacy.contactInfoVisible}
                          onCheckedChange={(checked) => handlePrivacyChange("contactInfoVisible", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Show Online Status</Label>
                          <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                        </div>
                        <Switch
                          checked={privacy.showOnlineStatus}
                          onCheckedChange={(checked) => handlePrivacyChange("showOnlineStatus", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Communication Settings */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Communication Settings
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Allow Direct Messages</Label>
                          <p className="text-sm text-muted-foreground">Let candidates send you direct messages</p>
                        </div>
                        <Switch
                          checked={privacy.allowDirectMessages}
                          onCheckedChange={(checked) => handlePrivacyChange("allowDirectMessages", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Show Activity Status</Label>
                          <p className="text-sm text-muted-foreground">Display your recent activity to others</p>
                        </div>
                        <Switch
                          checked={privacy.showActivityStatus}
                          onCheckedChange={(checked) => handlePrivacyChange("showActivityStatus", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Data & Analytics */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Data & Analytics
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Data Sharing with Partners</Label>
                          <p className="text-sm text-muted-foreground">Share anonymized data with trusted partners</p>
                        </div>
                        <Switch
                          checked={privacy.dataSharing}
                          onCheckedChange={(checked) => handlePrivacyChange("dataSharing", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Analytics Tracking</Label>
                          <p className="text-sm text-muted-foreground">Help improve our service with usage analytics</p>
                        </div>
                        <Switch
                          checked={privacy.analyticsTracking}
                          onCheckedChange={(checked) => handlePrivacyChange("analyticsTracking", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Third-party Integrations</Label>
                          <p className="text-sm text-muted-foreground">Allow third-party apps to access your data</p>
                        </div>
                        <Switch
                          checked={privacy.thirdPartyIntegrations}
                          onCheckedChange={(checked) => handlePrivacyChange("thirdPartyIntegrations", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Account Security */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Account Security
                    </h4>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full bg-transparent">
                        <Lock className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Shield className="mr-2 h-4 w-4" />
                        Enable Two-Factor Authentication
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        <EyeOff className="mr-2 h-4 w-4" />
                        Download My Data
                      </Button>
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

  // Candidate Profile View (existing code with notifications and privacy tabs)
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">My Profile & Settings</h3>
            <p className="text-muted-foreground">
              Manage your professional profile, notifications, and privacy settings.
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="resume" className="space-y-4">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="resume">
              <Upload className="mr-2 h-4 w-4" />
              Resume
            </TabsTrigger>
            <TabsTrigger value="personal">
              <User className="mr-2 h-4 w-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="experience">
              <Briefcase className="mr-2 h-4 w-4" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="education">
              <GraduationCap className="mr-2 h-4 w-4" />
              Education
            </TabsTrigger>
            <TabsTrigger value="skills">
              <Award className="mr-2 h-4 w-4" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Shield className="mr-2 h-4 w-4" />
              Privacy
            </TabsTrigger>
          </TabsList>

          {/* Resume Upload Tab */}
          <TabsContent value="resume" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resume Upload & Parser</CardTitle>
                <CardDescription>
                  Upload your resume in PDF or Word format. Our AI will automatically extract and populate your profile
                  information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File Upload Section */}
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="font-semibold">Upload your resume</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop your resume here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">Supports PDF, DOC, DOCX (Max 5MB)</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button onClick={() => fileInputRef.current?.click()}>
                      <Upload className="mr-2 h-4 w-4" />
                      Choose File
                    </Button>
                  </div>
                </div>

                {/* Upload Progress */}
                {uploadedFile && uploadProgress < 100 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Uploading {uploadedFile.name}</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}

                {/* Uploaded File Info */}
                {uploadedFile && uploadProgress === 100 && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-blue-500" />
                          <div>
                            <p className="font-medium">{uploadedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setUploadedFile(null)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {!isParsingComplete && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          Parsing resume content...
                        </div>
                      )}

                      {isParsingComplete && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          Resume parsed successfully!
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Parsed Data Preview */}
                {parsedData && isParsingComplete && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Extracted Information
                      </CardTitle>
                      <CardDescription>
                        Review the information extracted from your resume before applying to your profile.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Personal Information */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Personal Information
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Name:</span>
                            <p className="font-medium">{parsedData.personalInfo.name}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Email:</span>
                            <p className="font-medium">{parsedData.personalInfo.email}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Phone:</span>
                            <p className="font-medium">{parsedData.personalInfo.phone}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Location:</span>
                            <p className="font-medium">{parsedData.personalInfo.location}</p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Professional Summary */}
                      <div>
                        <h4 className="font-semibold mb-3">Professional Summary</h4>
                        <p className="text-sm text-muted-foreground">{parsedData.summary}</p>
                      </div>

                      <Separator />

                      {/* Experience */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          Work Experience ({parsedData.totalExperience})
                        </h4>
                        <div className="space-y-4">
                          {parsedData.experience.map((exp, index) => (
                            <div key={index} className="border-l-2 border-primary/20 pl-4">
                              <div className="flex justify-between items-start mb-1">
                                <h5 className="font-medium">{exp.position}</h5>
                                <Badge variant="secondary" className="text-xs">
                                  {exp.duration}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{exp.company}</p>
                              <p className="text-sm">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Education */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Education
                        </h4>
                        <div className="space-y-2">
                          {parsedData.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{edu.degree}</p>
                                <p className="text-sm text-muted-foreground">{edu.institution}</p>
                              </div>
                              <Badge variant="outline">{edu.year}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Skills */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Skills & Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {parsedData.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Apply Button */}
                      <div className="pt-4">
                        <Button onClick={applyParsedDataToProfile} className="w-full">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Apply This Information to My Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-4">
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
                  {isEditing && <Button variant="outline">Change Photo</Button>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="John" disabled={!isEditing} onChange={() => {}} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Doe" disabled={!isEditing} onChange={() => {}} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user.email}
                      disabled={!isEditing}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" disabled={!isEditing} onChange={() => {}} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="Mumbai, India" disabled={!isEditing} onChange={() => {}} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Summary</Label>
                  <Textarea
                    id="bio"
                    defaultValue="Experienced software developer with expertise in full-stack development..."
                    disabled={!isEditing}
                    onChange={() => {}}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Add your professional work experience and achievements.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">Senior Software Developer</h4>
                        <p className="text-sm text-muted-foreground">Tech Solutions Inc.</p>
                      </div>
                      <Badge variant="secondary">2021 - Present</Badge>
                    </div>
                    <p className="text-sm mb-2">Mumbai, India</p>
                    <p className="text-sm">
                      Led development of microservices architecture, improved system performance by 40%, mentored junior
                      developers.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">Full Stack Developer</h4>
                        <p className="text-sm text-muted-foreground">StartupXYZ</p>
                      </div>
                      <Badge variant="secondary">2019 - 2021</Badge>
                    </div>
                    <p className="text-sm mb-2">Mumbai, India</p>
                    <p className="text-sm">
                      Built responsive web applications using React and Node.js, implemented CI/CD pipelines.
                    </p>
                  </div>
                </div>

                {isEditing && (
                  <Button variant="outline" className="w-full bg-transparent">
                    Add Experience
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>Add your educational background and qualifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">Bachelor of Engineering - Computer Science</h4>
                      <p className="text-sm text-muted-foreground">Mumbai University</p>
                    </div>
                    <Badge variant="secondary">2019</Badge>
                  </div>
                  <p className="text-sm">Mumbai, India</p>
                </div>

                {isEditing && (
                  <Button variant="outline" className="w-full bg-transparent">
                    Add Education
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Technologies</CardTitle>
                <CardDescription>Showcase your technical skills and expertise.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Technical Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["React", "Node.js", "TypeScript", "Python", "AWS", "Docker", "MongoDB", "PostgreSQL"].map(
                      (skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="space-y-2">
                    <Label htmlFor="new-skill">Add Skill</Label>
                    <div className="flex gap-2">
                      <Input id="new-skill" placeholder="Enter skill name" onChange={() => {}} />
                      <Button variant="outline">Add</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab - Same as Client */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how and when you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Communication Preferences */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Communication Preferences
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                      </div>
                      <Switch
                        checked={notifications.smsNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("smsNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Job Notifications for Candidates */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Job & Application Notifications
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Job Alerts</Label>
                        <p className="text-sm text-muted-foreground">New job opportunities matching your profile</p>
                      </div>
                      <Switch
                        checked={notifications.jobAlerts}
                        onCheckedChange={(checked) => handleNotificationChange("jobAlerts", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Interview Reminders</Label>
                        <p className="text-sm text-muted-foreground">Reminders for upcoming interviews</p>
                      </div>
                      <Switch
                        checked={notifications.interviewReminders}
                        onCheckedChange={(checked) => handleNotificationChange("interviewReminders", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Application Updates</Label>
                        <p className="text-sm text-muted-foreground">Status changes on your applications</p>
                      </div>
                      <Switch
                        checked={notifications.applicationUpdates}
                        onCheckedChange={(checked) => handleNotificationChange("applicationUpdates", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Marketing & Updates */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Marketing & Updates
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Career tips and promotional content</p>
                      </div>
                      <Switch
                        checked={notifications.marketingEmails}
                        onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Weekly Digest</Label>
                        <p className="text-sm text-muted-foreground">Weekly summary of new job opportunities</p>
                      </div>
                      <Switch
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) => handleNotificationChange("weeklyDigest", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab - Same as Client */}
          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security Settings</CardTitle>
                <CardDescription>Control your privacy and data sharing preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Visibility */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Profile Visibility
                  </h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Profile Visibility</Label>
                      <Select
                        value={privacy.profileVisibility}
                        onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public - Visible to all employers</SelectItem>
                          <SelectItem value="registered">Registered Employers Only</SelectItem>
                          <SelectItem value="private">Private - Only visible to you</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Contact Information</Label>
                        <p className="text-sm text-muted-foreground">Display contact details on public profile</p>
                      </div>
                      <Switch
                        checked={privacy.contactInfoVisible}
                        onCheckedChange={(checked) => handlePrivacyChange("contactInfoVisible", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Online Status</Label>
                        <p className="text-sm text-muted-foreground">Let employers see when you're online</p>
                      </div>
                      <Switch
                        checked={privacy.showOnlineStatus}
                        onCheckedChange={(checked) => handlePrivacyChange("showOnlineStatus", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Communication Settings */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Communication Settings
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Direct Messages</Label>
                        <p className="text-sm text-muted-foreground">Let employers send you direct messages</p>
                      </div>
                      <Switch
                        checked={privacy.allowDirectMessages}
                        onCheckedChange={(checked) => handlePrivacyChange("allowDirectMessages", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Activity Status</Label>
                        <p className="text-sm text-muted-foreground">Display your recent activity to employers</p>
                      </div>
                      <Switch
                        checked={privacy.showActivityStatus}
                        onCheckedChange={(checked) => handlePrivacyChange("showActivityStatus", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Data & Analytics */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Data & Analytics
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Data Sharing with Partners</Label>
                        <p className="text-sm text-muted-foreground">Share anonymized data with trusted partners</p>
                      </div>
                      <Switch
                        checked={privacy.dataSharing}
                        onCheckedChange={(checked) => handlePrivacyChange("dataSharing", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Analytics Tracking</Label>
                        <p className="text-sm text-muted-foreground">Help improve our service with usage analytics</p>
                      </div>
                      <Switch
                        checked={privacy.analyticsTracking}
                        onCheckedChange={(checked) => handlePrivacyChange("analyticsTracking", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Third-party Integrations</Label>
                        <p className="text-sm text-muted-foreground">Allow third-party apps to access your data</p>
                      </div>
                      <Switch
                        checked={privacy.thirdPartyIntegrations}
                        onCheckedChange={(checked) => handlePrivacyChange("thirdPartyIntegrations", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Account Security */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Account Security
                  </h4>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Lock className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Shield className="mr-2 h-4 w-4" />
                      Enable Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <EyeOff className="mr-2 h-4 w-4" />
                      Download My Data
                    </Button>
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
