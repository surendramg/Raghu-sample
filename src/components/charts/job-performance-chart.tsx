"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartSelector } from "./chart-selector"

const jobPerformanceData = [
  { month: "Jan", jobsPosted: 45, applications: 1200, successfulHires: 89 },
  { month: "Feb", applications: 1350, jobsPosted: 52, successfulHires: 102 },
  { month: "Mar", applications: 1580, jobsPosted: 48, successfulHires: 118 },
  { month: "Apr", applications: 1720, jobsPosted: 61, successfulHires: 134 },
  { month: "May", applications: 1890, jobsPosted: 58, successfulHires: 145 },
  { month: "Jun", applications: 2100, jobsPosted: 67, successfulHires: 167 },
  { month: "Jul", applications: 2280, jobsPosted: 72, successfulHires: 189 },
  { month: "Aug", applications: 2450, jobsPosted: 69, successfulHires: 201 },
  { month: "Sep", applications: 2680, jobsPosted: 78, successfulHires: 223 },
  { month: "Oct", applications: 2890, jobsPosted: 81, successfulHires: 245 },
  { month: "Nov", applications: 3120, jobsPosted: 85, successfulHires: 267 },
  { month: "Dec", applications: 3350, jobsPosted: 89, successfulHires: 289 },
]

export function JobPerformanceChart() {
  const [chartType, setChartType] = useState<"bar" | "line" | "combo">("combo")

  const chartConfig = {
    jobsPosted: {
      label: "Jobs Posted",
      color: "hsl(var(--chart-1))",
    },
    applications: {
      label: "Applications",
      color: "hsl(var(--chart-2))",
    },
    successfulHires: {
      label: "Successful Hires",
      color: "hsl(var(--chart-3))",
    },
  }

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={jobPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="jobsPosted" fill="var(--color-jobsPosted)" name="Jobs Posted" />
            <Bar dataKey="successfulHires" fill="var(--color-successfulHires)" name="Successful Hires" />
          </BarChart>
        )
      case "line":
        return (
          <LineChart data={jobPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="jobsPosted"
              stroke="var(--color-jobsPosted)"
              strokeWidth={2}
              name="Jobs Posted"
            />
            <Line
              type="monotone"
              dataKey="applications"
              stroke="var(--color-applications)"
              strokeWidth={2}
              name="Applications"
            />
            <Line
              type="monotone"
              dataKey="successfulHires"
              stroke="var(--color-successfulHires)"
              strokeWidth={2}
              name="Successful Hires"
            />
          </LineChart>
        )
      case "combo":
        return (
          <ComposedChart data={jobPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar yAxisId="left" dataKey="jobsPosted" fill="var(--color-jobsPosted)" name="Jobs Posted" />
            <Bar yAxisId="left" dataKey="successfulHires" fill="var(--color-successfulHires)" name="Successful Hires" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="applications"
              stroke="var(--color-applications)"
              strokeWidth={3}
              name="Applications"
            />
          </ComposedChart>
        )
    }
  }

  return (
    <div className="space-y-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-medium truncate">Job Performance Metrics</h3>
          <p className="text-sm text-muted-foreground truncate">Job posting effectiveness and hiring success</p>
        </div>
        <div className="flex-shrink-0">
          <ChartSelector chartType={chartType} onChartTypeChange={setChartType} />
        </div>
      </div>
      <ChartContainer config={chartConfig} className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height={350}>
          {renderChart()}
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
