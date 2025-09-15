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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartSelector } from "./chart-selector"

const revenueBreakdownData = [
  { month: "Jan", basic: 89000, professional: 156000, enterprise: 234000 },
  { month: "Feb", basic: 95000, professional: 167000, enterprise: 267000 },
  { month: "Mar", basic: 102000, professional: 178000, enterprise: 289000 },
  { month: "Apr", basic: 108000, professional: 189000, enterprise: 312000 },
  { month: "May", basic: 115000, professional: 201000, enterprise: 334000 },
  { month: "Jun", basic: 122000, professional: 212000, enterprise: 356000 },
  { month: "Jul", basic: 128000, professional: 223000, enterprise: 378000 },
  { month: "Aug", basic: 135000, professional: 234000, enterprise: 401000 },
  { month: "Sep", basic: 142000, professional: 245000, enterprise: 423000 },
  { month: "Oct", basic: 148000, professional: 256000, enterprise: 445000 },
  { month: "Nov", basic: 155000, professional: 267000, enterprise: 467000 },
  { month: "Dec", basic: 162000, professional: 278000, enterprise: 489000 },
]

const pieData = [
  { name: "Enterprise", value: 489000, color: "hsl(var(--chart-1))" },
  { name: "Professional", value: 278000, color: "hsl(var(--chart-2))" },
  { name: "Basic", value: 162000, color: "hsl(var(--chart-3))" },
]

export function RevenueBreakdownChart() {
  const [chartType, setChartType] = useState<"bar" | "line" | "combo">("bar")

  const chartConfig = {
    basic: {
      label: "Basic Plan",
      color: "hsl(var(--chart-3))",
    },
    professional: {
      label: "Professional Plan",
      color: "hsl(var(--chart-2))",
    },
    enterprise: {
      label: "Enterprise Plan",
      color: "hsl(var(--chart-1))",
    },
  }

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={revenueBreakdownData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
            <ChartTooltip
              content={<ChartTooltipContent />}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
            />
            <Legend />
            <Bar dataKey="basic" stackId="a" fill="var(--color-basic)" name="Basic Plan" />
            <Bar dataKey="professional" stackId="a" fill="var(--color-professional)" name="Professional Plan" />
            <Bar dataKey="enterprise" stackId="a" fill="var(--color-enterprise)" name="Enterprise Plan" />
          </BarChart>
        )
      case "line":
        return (
          <LineChart data={revenueBreakdownData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
            <ChartTooltip
              content={<ChartTooltipContent />}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
            />
            <Legend />
            <Line type="monotone" dataKey="basic" stroke="var(--color-basic)" strokeWidth={2} name="Basic Plan" />
            <Line
              type="monotone"
              dataKey="professional"
              stroke="var(--color-professional)"
              strokeWidth={2}
              name="Professional Plan"
            />
            <Line
              type="monotone"
              dataKey="enterprise"
              stroke="var(--color-enterprise)"
              strokeWidth={3}
              name="Enterprise Plan"
            />
          </LineChart>
        )
      case "combo":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[350px]">
            <div className="min-h-0">
              <h4 className="text-sm font-medium mb-2">Monthly Trends</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={revenueBreakdownData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
                    />
                    <Bar dataKey="enterprise" fill="var(--color-enterprise)" name="Enterprise" />
                    <Line
                      type="monotone"
                      dataKey="professional"
                      stroke="var(--color-professional)"
                      strokeWidth={2}
                      name="Professional"
                    />
                    <Line type="monotone" dataKey="basic" stroke="var(--color-basic)" strokeWidth={2} name="Basic" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="min-h-0">
              <h4 className="text-sm font-medium mb-2">Current Distribution</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-medium truncate">Revenue by Subscription Plans</h3>
          <p className="text-sm text-muted-foreground truncate">Revenue breakdown across different pricing tiers</p>
        </div>
        <div className="flex-shrink-0">
          <ChartSelector chartType={chartType} onChartTypeChange={setChartType} />
        </div>
      </div>
      {chartType !== "combo" ? (
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height={350}>
            {renderChart()}
          </ResponsiveContainer>
        </ChartContainer>
      ) : (
        <div className="w-full">{renderChart()}</div>
      )}
    </div>
  )
}
