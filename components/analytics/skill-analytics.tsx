"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Code, TrendingUp, AlertTriangle, Target } from "lucide-react"

const skillMetrics = {
  totalSkills: 156,
  trendingSkills: 23,
  emergingSkills: 8,
  skillGaps: 12,
  topSkills: [
    { skill: "React", demand: 89, growth: 15.2, level: "Very High", salary: "₹12-18L" },
    { skill: "Node.js", demand: 76, growth: 12.8, level: "High", salary: "₹10-16L" },
    { skill: "Python", demand: 82, growth: 18.5, level: "Very High", salary: "₹8-15L" },
    { skill: "TypeScript", demand: 65, growth: 25.3, level: "High", salary: "₹12-20L" },
    { skill: "AWS", demand: 71, growth: 22.1, level: "High", salary: "₹15-25L" },
  ],
  emergingTech: [
    { skill: "Next.js", growth: 45.2, demand: 34, level: "Emerging" },
    { skill: "GraphQL", growth: 38.7, demand: 28, level: "Emerging" },
    { skill: "Terraform", growth: 42.1, demand: 31, level: "Emerging" },
    { skill: "Kubernetes", growth: 35.9, demand: 41, level: "Growing" },
  ],
  skillGapAnalysis: [
    { skill: "DevOps Engineers", gap: 78, severity: "Critical", openPositions: 45 },
    { skill: "Data Scientists", gap: 65, severity: "High", openPositions: 32 },
    { skill: "Cloud Architects", gap: 72, severity: "Critical", openPositions: 28 },
    { skill: "Cybersecurity", gap: 58, severity: "Medium", openPositions: 23 },
  ],
  industryDemand: [
    { industry: "Technology", percentage: 42, topSkill: "React" },
    { industry: "Finance", percentage: 18, topSkill: "Python" },
    { industry: "Healthcare", percentage: 15, topSkill: "Data Analysis" },
    { industry: "E-commerce", percentage: 12, topSkill: "Node.js" },
    { industry: "Education", percentage: 8, topSkill: "Full Stack" },
    { industry: "Others", percentage: 5, topSkill: "Various" },
  ],
}

const getDemandColor = (level: string) => {
  switch (level) {
    case "Very High":
      return "bg-red-100 text-red-800"
    case "High":
      return "bg-orange-100 text-orange-800"
    case "Growing":
      return "bg-blue-100 text-blue-800"
    case "Emerging":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Critical":
      return "bg-red-100 text-red-800"
    case "High":
      return "bg-orange-100 text-orange-800"
    case "Medium":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function SkillAnalytics() {
  return (
    <div className="space-y-6">
      {/* Skill Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Skills Tracked</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skillMetrics.totalSkills}</div>
            <p className="text-xs text-muted-foreground">Across all industries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trending Skills</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skillMetrics.trendingSkills}</div>
            <p className="text-xs text-muted-foreground">High growth this quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emerging Technologies</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skillMetrics.emergingSkills}</div>
            <p className="text-xs text-muted-foreground">New market entrants</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Skill Gaps</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{skillMetrics.skillGaps}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trending">Trending Skills</TabsTrigger>
          <TabsTrigger value="emerging">Emerging Tech</TabsTrigger>
          <TabsTrigger value="gaps">Skill Gaps</TabsTrigger>
          <TabsTrigger value="industry">Industry Demand</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Skills in Demand</CardTitle>
              <CardDescription>Most requested skills with growth rates and salary ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillMetrics.topSkills.map((skill, index) => (
                  <div key={skill.skill} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium">{skill.skill}</p>
                          <Badge className={getDemandColor(skill.level)} variant="secondary">
                            {skill.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {skill.demand}% demand • +{skill.growth}% growth
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{skill.salary}</p>
                      <p className="text-sm text-muted-foreground">Salary range</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emerging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Emerging Technologies</CardTitle>
              <CardDescription>New and rapidly growing skills in the market</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillMetrics.emergingTech.map((tech) => (
                  <div key={tech.skill} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium">{tech.skill}</p>
                          <Badge className={getDemandColor(tech.level)} variant="secondary">
                            {tech.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{tech.demand}% current demand</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">+{tech.growth}%</p>
                      <p className="text-sm text-muted-foreground">Growth rate</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Critical Skill Gaps</CardTitle>
              <CardDescription>Skills with high demand but limited supply</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillMetrics.skillGapAnalysis.map((gap) => (
                  <div key={gap.skill} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium">{gap.skill}</p>
                          <Badge className={getSeverityColor(gap.severity)} variant="secondary">
                            {gap.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{gap.openPositions} open positions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">{gap.gap}%</p>
                      <p className="text-sm text-muted-foreground">Supply gap</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="industry" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skill Demand by Industry</CardTitle>
              <CardDescription>Distribution of skill requirements across industries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillMetrics.industryDemand.map((industry) => (
                  <div key={industry.industry} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="font-medium">{industry.industry}</span>
                        <span className="text-muted-foreground ml-2">• Top skill: {industry.topSkill}</span>
                      </div>
                      <span>{industry.percentage}% of total demand</span>
                    </div>
                    <Progress value={industry.percentage} className="h-2" />
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
