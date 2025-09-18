"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartSelector } from "./chart-selector"

const engagementData = [
  { month: "Jan", pageViews: 12500, uniqueVisitors: 3200, avgSessionDuration: 245, bounceRate: 42 },
  { month: "Feb", pageViews: 14200, uniqueVisitors: 3650, avgSessionDuration: 267, bounceRate: 38 },
  { month: "Mar", pageViews: 16800, uniqueVisitors: 4100, avgSessionDuration: 289, bounceRate: 35 },
  { month: "Apr", pageViews: 18900, uniqueVisitors: 4580, avgSessionDuration: 312, bounceRate: 33 },
  { month: "May", pageViews: 21200, uniqueVisitors: 5020, avgSessionDuration: 334, bounceRate: 31 },
  { month: "Jun", pageViews: 23800, uniqueVisitors: 5480, avgSessionDuration: 356, bounceRate: 29 },
  { month: "Jul", pageViews: 26500, uniqueVisitors: 5920, avgSessionDuration: 378, bounceRate: 27 },
  { month: "Aug", pageViews: 29100, uniqueVisitors: 6380, avgSessionDuration: 401, bounceRate: 25 },
  { month: "Sep", pageViews: 31800, uniqueVisitors: 6850, avgSessionDuration: 423, bounceRate: 24 },
  { month: "Oct", pageViews: 34600, uniqueVisitors: 7320, avgSessionDuration: 445, bounceRate: 22 },
  { month: "Nov", pageViews: 37400, uniqueVisitors: 7800, avgSessionDuration: 467, bounceRate: 21 },
  { month: "Dec", pageViews: 40200, uniqueVisitors: 8280, avgSessionDuration: 489, bounceRate: 19 },
]

export function UserEngagementChart() {
  const [chartType, setChartType] = useState<"bar" | "line" | "combo">("line")

  const chartConfig = {
    pageViews: {
      label: "Page Views",
      color: "hsl(var(--chart-1))",
    },
    uniqueVisitors: {
      label: "Unique Visitors",
      color: "hsl(var(--chart-2))",
    },
    avgSessionDuration: {
      label: "Avg Session (seconds)",
      color: "hsl(var(--chart-3))",
    },
    bounceRate: {
      label: "Bounce Rate (%)",
      color: "hsl(var(--chart-4))",
    },
  }

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="pageViews" fill="var(--color-pageViews)" name="Page Views" />
            <Bar dataKey="uniqueVisitors" fill="var(--color-uniqueVisitors)" name="Unique Visitors" />
          </BarChart>
        )
      case "line":
        return (
          <AreaChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="pageViews"
              stroke="var(--color-pageViews)"
              fill="var(--color-pageViews)"
              fillOpacity={0.3}
              strokeWidth={2}
              name="Page Views"
            />
            <Line
              type="monotone"
              dataKey="uniqueVisitors"
              stroke="var(--color-uniqueVisitors)"
              strokeWidth={2}
              name="Unique Visitors"
            />
            <Line
              type="monotone"
              dataKey="avgSessionDuration"
              stroke="var(--color-avgSessionDuration)"
              strokeWidth={2}
              name="Avg Session Duration"
            />
          </AreaChart>
        )
      case "combo":
        return (
          <ComposedChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar yAxisId="left" dataKey="pageViews" fill="var(--color-pageViews)" name="Page Views" />
            <Bar yAxisId="left" dataKey="uniqueVisitors" fill="var(--color-uniqueVisitors)" name="Unique Visitors" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avgSessionDuration"
              stroke="var(--color-avgSessionDuration)"
              strokeWidth={3}
              name="Avg Session Duration"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="bounceRate"
              stroke="var(--color-bounceRate)"
              strokeWidth={2}
              name="Bounce Rate %"
            />
          </ComposedChart>
        )
    }
  }

  return (
    <div className="space-y-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-medium truncate">User Engagement Analytics</h3>
          <p className="text-sm text-muted-foreground truncate">Website traffic and user behavior metrics</p>
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
