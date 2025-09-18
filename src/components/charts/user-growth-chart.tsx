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

const userGrowthData = [
  { month: "Jan", newUsers: 120, totalUsers: 1200, activeUsers: 980 },
  { month: "Feb", newUsers: 150, totalUsers: 1350, activeUsers: 1100 },
  { month: "Mar", newUsers: 180, totalUsers: 1530, activeUsers: 1250 },
  { month: "Apr", newUsers: 200, totalUsers: 1730, activeUsers: 1400 },
  { month: "May", newUsers: 220, totalUsers: 1950, activeUsers: 1580 },
  { month: "Jun", newUsers: 180, totalUsers: 2130, activeUsers: 1720 },
  { month: "Jul", newUsers: 240, totalUsers: 2370, activeUsers: 1920 },
  { month: "Aug", newUsers: 280, totalUsers: 2650, activeUsers: 2150 },
  { month: "Sep", newUsers: 320, totalUsers: 2970, activeUsers: 2400 },
  { month: "Oct", newUsers: 290, totalUsers: 3260, activeUsers: 2650 },
  { month: "Nov", newUsers: 350, totalUsers: 3610, activeUsers: 2920 },
  { month: "Dec", newUsers: 380, totalUsers: 3990, activeUsers: 3240 },
]

export function UserGrowthChart() {
  const [chartType, setChartType] = useState<"bar" | "line" | "combo">("bar")

  const chartConfig = {
    newUsers: {
      label: "New Users",
      color: "hsl(var(--chart-1))",
    },
    totalUsers: {
      label: "Total Users",
      color: "hsl(var(--chart-2))",
    },
    activeUsers: {
      label: "Active Users",
      color: "hsl(var(--chart-3))",
    },
  }

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="newUsers" fill="var(--color-newUsers)" name="New Users" />
            <Bar dataKey="activeUsers" fill="var(--color-activeUsers)" name="Active Users" />
          </BarChart>
        )
      case "line":
        return (
          <LineChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line type="monotone" dataKey="newUsers" stroke="var(--color-newUsers)" strokeWidth={2} name="New Users" />
            <Line
              type="monotone"
              dataKey="totalUsers"
              stroke="var(--color-totalUsers)"
              strokeWidth={2}
              name="Total Users"
            />
            <Line
              type="monotone"
              dataKey="activeUsers"
              stroke="var(--color-activeUsers)"
              strokeWidth={2}
              name="Active Users"
            />
          </LineChart>
        )
      case "combo":
        return (
          <ComposedChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="newUsers" fill="var(--color-newUsers)" name="New Users" />
            <Line
              type="monotone"
              dataKey="totalUsers"
              stroke="var(--color-totalUsers)"
              strokeWidth={3}
              name="Total Users"
            />
            <Line
              type="monotone"
              dataKey="activeUsers"
              stroke="var(--color-activeUsers)"
              strokeWidth={2}
              name="Active Users"
            />
          </ComposedChart>
        )
    }
  }

  return (
    <div className="space-y-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-medium truncate">User Growth Trends</h3>
          <p className="text-sm text-muted-foreground truncate">Monthly user registration and activity</p>
        </div>
        <div className="flex-shrink-0">
          <ChartSelector chartType={chartType} onChartTypeChange={setChartType} />
        </div>
      </div>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height={300}>
          {renderChart()}
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
