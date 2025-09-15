"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SkillDemand } from "@/lib/mock-data"
import { TrendingUp, Building2, DollarSign, Briefcase } from "lucide-react"

interface SkillDemandAnalyticsProps {
  skillDemand: SkillDemand[]
  selectedSkill?: string
}

export function SkillDemandAnalytics({ skillDemand, selectedSkill }: SkillDemandAnalyticsProps) {
  const topSkills = skillDemand.slice(0, 10)
  const selectedSkillData = selectedSkill ? skillDemand.find((s) => s.skill === selectedSkill) : null

  return (
    <div className="space-y-6">
      {/* Selected Skill Details */}
      {selectedSkillData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {selectedSkillData.skill} - Market Demand
            </CardTitle>
            <CardDescription>Detailed analytics for {selectedSkillData.skill} across all job postings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{selectedSkillData.totalJobs}</div>
                <div className="text-sm text-muted-foreground">Total Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{selectedSkillData.activeJobs}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{selectedSkillData.pausedJobs}</div>
                <div className="text-sm text-muted-foreground">Paused</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{selectedSkillData.closedJobs}</div>
                <div className="text-sm text-muted-foreground">Closed</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Active Jobs</span>
                  <span>{Math.round((selectedSkillData.activeJobs / selectedSkillData.totalJobs) * 100)}%</span>
                </div>
                <Progress value={(selectedSkillData.activeJobs / selectedSkillData.totalJobs) * 100} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Average Salary</span>
                </div>
                <Badge variant="secondary">{selectedSkillData.averageSalary}</Badge>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Top Hiring Companies</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSkillData.topCompanies.map((company, index) => (
                    <Badge key={index} variant="outline">
                      {company}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Skills Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Top Skills in Demand
          </CardTitle>
          <CardDescription>Most requested skills across all job postings with status breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="paused">Paused</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {topSkills.map((skill, index) => (
                <div key={skill.skill} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-muted-foreground">#{index + 1}</div>
                    <div>
                      <div className="font-medium">{skill.skill}</div>
                      <div className="text-sm text-muted-foreground">
                        {skill.topCompanies.slice(0, 2).join(", ")}
                        {skill.topCompanies.length > 2 && ` +${skill.topCompanies.length - 2} more`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold">{skill.totalJobs}</div>
                      <div className="text-sm text-muted-foreground">jobs</div>
                    </div>
                    <div className="flex gap-1">
                      <Badge variant="secondary" className="text-xs">
                        A: {skill.activeJobs}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        P: {skill.pausedJobs}
                      </Badge>
                      <Badge variant="destructive" className="text-xs">
                        C: {skill.closedJobs}
                      </Badge>
                    </div>
                    <Badge variant="secondary">{skill.averageSalary}</Badge>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              {topSkills
                .filter((skill) => skill.activeJobs > 0)
                .sort((a, b) => b.activeJobs - a.activeJobs)
                .map((skill, index) => (
                  <div key={skill.skill} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold text-green-600">#{index + 1}</div>
                      <div>
                        <div className="font-medium">{skill.skill}</div>
                        <div className="text-sm text-muted-foreground">{skill.topCompanies.slice(0, 2).join(", ")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold text-green-600">{skill.activeJobs}</div>
                        <div className="text-sm text-muted-foreground">active jobs</div>
                      </div>
                      <Badge variant="secondary">{skill.averageSalary}</Badge>
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="paused" className="space-y-4">
              {topSkills
                .filter((skill) => skill.pausedJobs > 0)
                .sort((a, b) => b.pausedJobs - a.pausedJobs)
                .map((skill, index) => (
                  <div key={skill.skill} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold text-yellow-600">#{index + 1}</div>
                      <div>
                        <div className="font-medium">{skill.skill}</div>
                        <div className="text-sm text-muted-foreground">{skill.topCompanies.slice(0, 2).join(", ")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold text-yellow-600">{skill.pausedJobs}</div>
                        <div className="text-sm text-muted-foreground">paused jobs</div>
                      </div>
                      <Badge variant="secondary">{skill.averageSalary}</Badge>
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="closed" className="space-y-4">
              {topSkills
                .filter((skill) => skill.closedJobs > 0)
                .sort((a, b) => b.closedJobs - a.closedJobs)
                .map((skill, index) => (
                  <div key={skill.skill} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold text-red-600">#{index + 1}</div>
                      <div>
                        <div className="font-medium">{skill.skill}</div>
                        <div className="text-sm text-muted-foreground">{skill.topCompanies.slice(0, 2).join(", ")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold text-red-600">{skill.closedJobs}</div>
                        <div className="text-sm text-muted-foreground">closed jobs</div>
                      </div>
                      <Badge variant="secondary">{skill.averageSalary}</Badge>
                    </div>
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
