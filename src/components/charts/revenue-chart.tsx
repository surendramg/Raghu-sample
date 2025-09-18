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

const revenueData = [
  { month: "Jan", revenue: 245000, subscriptions: 89000, jobPostings: 156000 },
  { month: "Feb", revenue: 289000, subscriptions: 98000, jobPostings: 191000 },
  { month: "Mar", revenue: 312000, subscriptions: 105000, jobPostings: 207000 },
  { month: "Apr", revenue: 356000, subscriptions: 112000, jobPostings: 244000 },
  { month: "May", revenue: 398000, subscriptions: 125000, jobPostings: 273000 },
  { month: "Jun", revenue: 423000, subscriptions: 134000, jobPostings: 289000 },
  { month: "Jul", revenue: 445000, subscriptions: 142000, jobPostings: 303000 },
  { month: "Aug", revenue: 467000, subscriptions: 148000, jobPostings: 319000 },
  { month: "Sep", revenue: 489000, subscriptions: 156000, jobPostings: 333000 },
  { month: "Oct", revenue: 512000, subscriptions: 163000, jobPostings: 349000 },
  { month: "Nov", revenue: 534000, subscriptions: 171000, jobPostings: 363000 },
  { month: "Dec", revenue: 556000, subscriptions: 178000, jobPostings: 378000 },
]

export function RevenueChart() {
  const [chartType, setChartType] = useState<"bar" | "line" | "combo">("line")

  const chartConfig = {
    revenue: {
      label: "Total Revenue",
      color: "hsl(var(--chart-1))",
    },
    subscriptions: {
      label: "Subscriptions",
      color: "hsl(var(--chart-2))",
    },
    jobPostings: {
      label: "Job Postings",
      color: "hsl(var(--chart-3))",
    },
  }

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
            <ChartTooltip
              content={<ChartTooltipContent />}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
            />
            <Legend />
            <Bar dataKey="subscriptions" fill="var(--color-subscriptions)" name="Subscriptions" />
            <Bar dataKey="jobPostings" fill="var(--color-jobPostings)" name="Job Postings" />
          </BarChart>
        )
      case "line":
        return (
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
            <ChartTooltip
              content={<ChartTooltipContent />}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              fill="var(--color-revenue)"
              fillOpacity={0.3}
              strokeWidth={3}
              name="Total Revenue"
            />
            <Line
              type="monotone"
              dataKey="subscriptions"
              stroke="var(--color-subscriptions)"
              strokeWidth={2}
              name="Subscriptions"
            />
            <Line
              type="monotone"
              dataKey="jobPostings"
              stroke="var(--color-jobPostings)"
              strokeWidth={2}
              name="Job Postings"
            />
          </AreaChart>
        )
      case "combo":
        return (
          <ComposedChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
            <ChartTooltip
              content={<ChartTooltipContent />}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
            />
            <Legend />
            <Bar dataKey="subscriptions" fill="var(--color-subscriptions)" name="Subscriptions" />
            <Bar dataKey="jobPostings" fill="var(--color-jobPostings)" name="Job Postings" />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              strokeWidth={3}
              name="Total Revenue"
            />
          </ComposedChart>
        )
    }
  }

  return (
    <div className="space-y-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-medium truncate">Revenue Performance</h3>
          <p className="text-sm text-muted-foreground truncate">Monthly revenue breakdown by source</p>
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
