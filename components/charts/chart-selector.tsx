"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, LineChart, TrendingUp } from "lucide-react"

interface ChartSelectorProps {
  chartType: "bar" | "line" | "combo"
  onChartTypeChange: (type: "bar" | "line" | "combo") => void
}

export function ChartSelector({ chartType, onChartTypeChange }: ChartSelectorProps) {
  return (
    <Select value={chartType} onValueChange={onChartTypeChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Chart type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="bar">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Bar Chart</span>
          </div>
        </SelectItem>
        <SelectItem value="line">
          <div className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Line Chart</span>
          </div>
        </SelectItem>
        <SelectItem value="combo">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Combo Chart</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
