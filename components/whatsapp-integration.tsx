"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MessageSquare, Send, Bot, Users, BarChart3, CheckCircle, AlertCircle } from "lucide-react"

export function WhatsAppIntegration() {
  const [isConnected, setIsConnected] = useState(false)
  const [testMessage, setTestMessage] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleConnect = () => {
    setIsConnected(true)
  }

  const handleSendTest = async () => {
    if (!testMessage.trim() || !phoneNumber.trim()) return

    try {
      const response = await fetch("/api/whatsapp/send-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: phoneNumber,
          message: testMessage,
        }),
      })

      if (response.ok) {
        alert("Test message sent successfully!")
        setTestMessage("")
        setPhoneNumber("")
      } else {
        alert("Failed to send test message")
      }
    } catch (error) {
      alert("Error sending test message")
    }
  }

  const stats = {
    totalMessages: 1234,
    activeChats: 45,
    responseRate: 89,
    avgResponseTime: "2.3 min",
  }

  const messageTemplates = [
    {
      name: "Welcome Message",
      content:
        "Welcome to RecruitPro! I'm your AI assistant. Type 'jobs' to see available positions or 'help' for more options.",
      status: "active",
    },
    {
      name: "Job Search",
      content:
        "Here are the latest job openings matching your profile: {'{job_list}'}. Reply with the job number to learn more!",
      status: "active",
    },
    {
      name: "Application Confirmation",
      content:
        "Great! Your application for {'{job_title}'} has been submitted. We'll notify you about the next steps within 24 hours.",
      status: "active",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <CardTitle>WhatsApp Business API</CardTitle>
            </div>
            <Badge variant={isConnected ? "default" : "secondary"}>{isConnected ? "Connected" : "Disconnected"}</Badge>
          </div>
          <CardDescription>
            Connect your WhatsApp Business account to enable automated job notifications and candidate interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  To connect WhatsApp, you'll need a WhatsApp Business API account and valid credentials.
                </AlertDescription>
              </Alert>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="phone-id">Phone Number ID</Label>
                  <Input id="phone-id" placeholder="Enter your Phone Number ID" />
                </div>
                <div>
                  <Label htmlFor="access-token">Access Token</Label>
                  <Input id="access-token" type="password" placeholder="Enter your Access Token" />
                </div>
              </div>
              <Button onClick={handleConnect} className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Connect WhatsApp
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>WhatsApp Business API is connected and ready to use</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="test">Test</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalMessages.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeChats}</div>
                <p className="text-xs text-muted-foreground">+5 from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.responseRate}%</div>
                <p className="text-xs text-muted-foreground">+2% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avgResponseTime}</div>
                <p className="text-xs text-muted-foreground">-0.5 min from last week</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest WhatsApp interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <MessageSquare className="h-8 w-8 p-2 bg-green-100 rounded-full text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium">New job inquiry from +91 98765 43210</p>
                    <p className="text-sm text-muted-foreground">Asked about Software Engineer positions - 2 min ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Bot className="h-8 w-8 p-2 bg-blue-100 rounded-full text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium">Auto-response sent to +91 87654 32109</p>
                    <p className="text-sm text-muted-foreground">Shared job recommendations - 5 min ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Users className="h-8 w-8 p-2 bg-purple-100 rounded-full text-purple-600" />
                  <div className="flex-1">
                    <p className="font-medium">Application submitted via WhatsApp</p>
                    <p className="text-sm text-muted-foreground">
                      Candidate applied for Product Manager role - 10 min ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Pre-approved templates for automated responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messageTemplates.map((template, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{template.name}</h4>
                      <Badge variant={template.status === "active" ? "default" : "secondary"}>{template.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{template.content}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Preview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bot Configuration</CardTitle>
              <CardDescription>Configure your WhatsApp bot behavior and responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" value="https://your-domain.com/api/whatsapp/webhook" readOnly />
                <p className="text-xs text-muted-foreground mt-1">
                  Use this URL in your WhatsApp Business API configuration
                </p>
              </div>
              <div>
                <Label htmlFor="verify-token">Verify Token</Label>
                <Input id="verify-token" value="your-verify-token-here" readOnly />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Auto-responses</h4>
                  <p className="text-sm text-muted-foreground">Automatically respond to common queries</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Business Hours</h4>
                  <p className="text-sm text-muted-foreground">Set when the bot should be active</p>
                </div>
                <Button variant="outline">Set Hours</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test WhatsApp Integration</CardTitle>
              <CardDescription>Send a test message to verify your WhatsApp setup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="test-phone">Phone Number (with country code)</Label>
                <Input
                  id="test-phone"
                  placeholder="+91 98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="test-message">Test Message</Label>
                <Textarea
                  id="test-message"
                  placeholder="Enter your test message here..."
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                />
              </div>
              <Button onClick={handleSendTest} disabled={!testMessage.trim() || !phoneNumber.trim()} className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Test Message
              </Button>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Make sure the phone number is registered with WhatsApp and has opted in to receive messages from your
                  business.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
