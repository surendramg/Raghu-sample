"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Building2, Users, Clock, Target, Star } from "lucide-react"
import { UserGrowthChart } from "@/components/charts/user-growth-chart"
import { JobPerformanceChart } from "@/components/charts/job-performance-chart"

const clientMetrics = {
  totalClients: 234,
  activeClients: 189,
  newClientsThisMonth: 12,
  clientRetentionRate: 87.5,
  averageJobsPerClient: 3.2,
  topSpendingClients: [
    { name: "TechCorp India", spent: "₹4,50,000", jobs: 15, hires: 12 },
    { name: "InnovateTech", spent: "₹3,20,000", jobs: 12, hires: 8 },
    { name: "CloudTech Solutions", spent: "₹2,80,000", jobs: 10, hires: 7 },
    { name: "DataInsights", spent: "₹2,10,000", jobs: 8, hires: 6 },
    { name: "GrowthLabs", spent: "₹1,90,000", jobs: 7, hires: 5 },
  ],
  clientSatisfactionScore: 4.6,
  averageTimeToHire: 18,
  clientsByIndustry: [
    { industry: "Technology", count: 89, percentage: 38 },
    { industry: "Finance", count: 45, percentage: 19 },
    { industry: "Healthcare", count: 32, percentage: 14 },
    { industry: "E-commerce", count: 28, percentage: 12 },
    { industry: "Education", count: 23, percentage: 10 },
    { industry: "Others", count: 17, percentage: 7 },
  ],
  clientsBySize: [
    { size: "Enterprise (500+)", count: 67, percentage: 29 },
    { size: "Large (100-499)", count: 78, percentage: 33 },
    { size: "Medium (50-99)", count: 56, percentage: 24 },
    { size: "Small (10-49)", count: 33, percentage: 14 },
  ],
  recentClientActivity: [
    { client: "TechCorp India", action: "Posted new job", job: "Senior DevOps Engineer", time: "2 hours ago" },
    { client: "InnovateTech", action: "Hired candidate", job: "Product Manager", time: "4 hours ago" },
    {
      client: "CloudTech Solutions",
      action: "Shortlisted candidates",
      job: "Full Stack Developer",
      time: "6 hours ago",
    },
    { client: "DataInsights", action: "Posted new job", job: "Data Scientist", time: "1 day ago" },
    { client: "GrowthLabs", action: "Interview scheduled", job: "Marketing Manager", time: "1 day ago" },
  ],
}

export function ClientAnalytics() {
  return (
    <div className="space-y-6">
      {/* Client Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientMetrics.totalClients}</div>
            <p className="text-xs text-muted-foreground">+{clientMetrics.newClientsThisMonth} new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientMetrics.activeClients}</div>
            <p className="text-xs text-muted-foreground">
              {((clientMetrics.activeClients / clientMetrics.totalClients) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientMetrics.clientRetentionRate}%</div>
            <p className="text-xs text-muted-foreground">+2.3% from last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientMetrics.clientSatisfactionScore}/5</div>
            <p className="text-xs text-muted-foreground">Based on 156 reviews</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="top-clients">Top Clients</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <UserGrowthChart />
            <JobPerformanceChart />
          </div>
        </TabsContent>

        <TabsContent value="top-clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Spending Clients</CardTitle>
              <CardDescription>Clients ranked by total spending and hiring success</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientMetrics.topSpendingClients.map((client, index) => (
                  <div key={client.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {client.jobs} jobs posted • {client.hires} successful hires
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{client.spent}</p>
                      <p className="text-sm text-muted-foreground">Total spent</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Clients by Industry</CardTitle>
                <CardDescription>Distribution of clients across different industries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientMetrics.clientsByIndustry.map((industry) => (
                    <div key={industry.industry} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{industry.industry}</span>
                        <span>
                          {industry.count} clients ({industry.percentage}%)
                        </span>
                      </div>
                      <Progress value={industry.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Clients by Company Size</CardTitle>
                <CardDescription>Client distribution based on company size</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientMetrics.clientsBySize.map((size) => (
                    <div key={size.size} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{size.size}</span>
                        <span>
                          {size.count} clients ({size.percentage}%)
                        </span>
                      </div>
                      <Progress value={size.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Client Activity</CardTitle>
              <CardDescription>Latest actions and updates from your clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientMetrics.recentClientActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{activity.client}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.action}: <span className="font-medium">{activity.job}</span>
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
