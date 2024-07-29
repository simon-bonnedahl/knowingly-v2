"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@knowingly/ui/card"
import type {
  ChartConfig} from "@knowingly/ui/chart";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@knowingly/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@knowingly/ui/select"
const chartData = [
  { date: "2024-04-01", pending: 222, completed: 150, canceled: 50 },
  { date: "2024-04-02", pending: 97, completed: 180, canceled: 50 },
  { date: "2024-04-03", pending: 167, completed: 120, canceled: 50 },
  { date: "2024-04-04", pending: 242, completed: 260, canceled: 50 },
  { date: "2024-04-05", pending: 373, completed: 290, canceled: 50 },
  { date: "2024-04-06", pending: 301, completed: 340, canceled: 50 },
  { date: "2024-04-07", pending: 245, completed: 180, canceled: 50 },
  { date: "2024-04-08", pending: 409, completed: 320, canceled: 50 },
  { date: "2024-04-09", pending: 59, completed: 110, canceled: 50 },
  { date: "2024-04-10", pending: 261, completed: 190, canceled: 50 },
  { date: "2024-04-11", pending: 327, completed: 350, canceled: 50 },
  { date: "2024-04-12", pending: 292, completed: 210, canceled: 50 },
  { date: "2024-04-13", pending: 342, completed: 380, canceled: 50 },
  { date: "2024-04-14", pending: 137, completed: 220, canceled: 50 },
  { date: "2024-04-15", pending: 120, completed: 170, canceled: 50 },
  { date: "2024-04-16", pending: 138, completed: 190, canceled: 50 },
  { date: "2024-04-17", pending: 446, completed: 360, canceled: 50 },
  { date: "2024-04-18", pending: 364, completed: 410, canceled: 50 },
  { date: "2024-04-19", pending: 243, completed: 180, canceled: 50 },
  { date: "2024-04-20", pending: 89, completed: 150, canceled: 50 },
  { date: "2024-04-21", pending: 137, completed: 200, canceled: 50 },
  { date: "2024-04-22", pending: 224, completed: 170, canceled: 50 },
  { date: "2024-04-23", pending: 138, completed: 230, canceled: 50 },
  { date: "2024-04-24", pending: 387, completed: 290, canceled: 50 },
  { date: "2024-04-25", pending: 215, completed: 250, canceled: 50 },
  { date: "2024-04-26", pending: 75, completed: 130, canceled: 50 },
  { date: "2024-04-27", pending: 383, completed: 420, canceled: 50 },
  { date: "2024-04-28", pending: 122, completed: 180, canceled: 50 },
  { date: "2024-04-29", pending: 315, completed: 240, canceled: 50 },
  { date: "2024-04-30", pending: 454, completed: 380, canceled: 50 },
  { date: "2024-05-01", pending: 165, completed: 220, canceled: 50 },
  { date: "2024-05-02", pending: 293, completed: 310, canceled: 50 },
  { date: "2024-05-03", pending: 247, completed: 190, canceled: 50 },
  { date: "2024-05-04", pending: 385, completed: 420, canceled: 50 },
  { date: "2024-05-05", pending: 481, completed: 390, canceled: 50 },
  { date: "2024-05-06", pending: 498, completed: 520, canceled: 50 },
  { date: "2024-05-07", pending: 388, completed: 300, canceled: 50 },
  { date: "2024-05-08", pending: 149, completed: 210, canceled: 50 },
  { date: "2024-05-09", pending: 227, completed: 180, canceled: 50 },
  { date: "2024-05-10", pending: 293, completed: 330, canceled: 50 },
  { date: "2024-05-11", pending: 335, completed: 270, canceled: 50 },
  { date: "2024-05-12", pending: 197, completed: 240, canceled: 50 },
  { date: "2024-05-13", pending: 197, completed: 160, canceled: 50 },
  { date: "2024-05-14", pending: 448, completed: 490, canceled: 50 },
  { date: "2024-05-15", pending: 473, completed: 380, canceled: 50 },
  { date: "2024-05-16", pending: 338, completed: 400, canceled: 50 },
  { date: "2024-05-17", pending: 499, completed: 420, canceled: 50 },
  { date: "2024-05-18", pending: 315, completed: 350, canceled: 50 },
  { date: "2024-05-19", pending: 235, completed: 180, canceled: 50 },
  { date: "2024-05-20", pending: 177, completed: 230, canceled: 50 },
  { date: "2024-05-21", pending: 82, completed: 140, canceled: 50 },
  { date: "2024-05-22", pending: 81, completed: 120, canceled: 50 },
  { date: "2024-05-23", pending: 252, completed: 290, canceled: 50 },
  { date: "2024-05-24", pending: 294, completed: 220, canceled: 50 },
  { date: "2024-05-25", pending: 201, completed: 250, canceled: 50 },
  { date: "2024-05-26", pending: 213, completed: 170, canceled: 50 },
  { date: "2024-05-27", pending: 420, completed: 460, canceled: 50 },
  { date: "2024-05-28", pending: 233, completed: 190, canceled: 50 },
  { date: "2024-05-29", pending: 78, completed: 130, canceled: 50 },
  { date: "2024-05-30", pending: 340, completed: 280, canceled: 50 },
  { date: "2024-05-31", pending: 178, completed: 230, canceled: 50 },
  { date: "2024-06-01", pending: 178, completed: 200, canceled: 50 },
  { date: "2024-06-02", pending: 470, completed: 410, canceled: 50 },
  { date: "2024-06-03", pending: 103, completed: 160, canceled: 50 },
  { date: "2024-06-04", pending: 439, completed: 380, canceled: 50 },
  { date: "2024-06-05", pending: 88, completed: 140, canceled: 50 },
  { date: "2024-06-06", pending: 294, completed: 250, canceled: 50 },
  { date: "2024-06-07", pending: 323, completed: 370, canceled: 50 },
  { date: "2024-06-08", pending: 385, completed: 320, canceled: 50 },
  { date: "2024-06-09", pending: 438, completed: 480, canceled: 50 },
  { date: "2024-06-10", pending: 155, completed: 200, canceled: 50 },
  { date: "2024-06-11", pending: 92, completed: 150, canceled: 50 },
  { date: "2024-06-12", pending: 492, completed: 420, canceled: 50 },
  { date: "2024-06-13", pending: 81, completed: 130, canceled: 50 },
  { date: "2024-06-14", pending: 426, completed: 380, canceled: 50 },
  { date: "2024-06-15", pending: 307, completed: 350, canceled: 50 },
  { date: "2024-06-16", pending: 371, completed: 310, canceled: 50 },
  { date: "2024-06-17", pending: 475, completed: 520, canceled: 50 },
  { date: "2024-06-18", pending: 107, completed: 170, canceled: 50 },
  { date: "2024-06-19", pending: 341, completed: 290, canceled: 50 },
  { date: "2024-06-20", pending: 408, completed: 450, canceled: 50 },
  { date: "2024-06-21", pending: 169, completed: 210, canceled: 50 },
  { date: "2024-06-22", pending: 317, completed: 270, canceled: 50 },
  { date: "2024-06-23", pending: 480, completed: 530, canceled: 50 },
  { date: "2024-06-24", pending: 132, completed: 180, canceled: 50 },
  { date: "2024-06-25", pending: 141, completed: 190, canceled: 50 },
  { date: "2024-06-26", pending: 434, completed: 380, canceled: 50 },
  { date: "2024-06-27", pending: 448, completed: 490, canceled: 50 },
  { date: "2024-06-28", pending: 149, completed: 200, canceled: 50 },
  { date: "2024-06-29", pending: 103, completed: 160, canceled: 50 },
  { date: "2024-06-30", pending: 446, completed: 400, canceled: 50 },
]

const chartConfig = {
  meetings: {
    label: "Meetings",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-2))",
  },
  canceled: {
    label: "Canceled",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function MeetingChart() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    now.setDate(now.getDate() - daysToSubtract)
    return date >= now
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Meetings</CardTitle>
          <CardDescription>
            Showing total meetings on yor hub for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillPending" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-pending)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-pending)"
                  stopOpacity={0.1}
                />
                
              </linearGradient>
              <linearGradient id="fillCanceled" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-canceled)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-canceled)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="pending"
              type="natural"
              fill="url(#fillPending)"
              stroke="var(--color-pending)"
              stackId="a"
            />
            <Area
              dataKey="completed"
              type="natural"
              fill="url(#fillCompleted)"
              stroke="var(--color-completed)"
              stackId="a"
            />
            <Area
              dataKey="canceled"
              type="natural"
              fill="url(#fillCanceled)"
              stroke="var(--color-canceled)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
