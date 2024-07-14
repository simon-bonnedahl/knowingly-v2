"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@knowingly/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@knowingly/ui/chart"

const chartData = [
  { date: "2024-06-01", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-02", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-03", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-04", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-05", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-06", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-07", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-08", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-09", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-10", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-11", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-12", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-13", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-14", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-15", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-16", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-17", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-18", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-19", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-20", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-21", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-22", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-23", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-24", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-25", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-26", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-27", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-28", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-29", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
  { date: "2024-06-30", pending: Math.floor(Math.random() * 30), completed: Math.floor(Math.random() * 75), canceled: Math.floor(Math.random() * 20) },
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
    color: "hsl(var(--chart-3))",
  },
  canceled: {
    label: "Canceled",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function MeetingsBarChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("pending")

  const total = React.useMemo(
    () => ({
      pending: chartData.reduce((acc, curr) => acc + curr.pending, 0),
      completed: chartData.reduce((acc, curr) => acc + curr.completed, 0),
      canceled: chartData.reduce((acc, curr) => acc + curr.canceled, 0),

    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Meetings</CardTitle>
          <CardDescription>
            Showing total meetings of the last 30 days
          </CardDescription>
        </div>
        <div className="flex">
          {["pending", "completed", "canceled"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
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
              content={
                <ChartTooltipContent
                  className="w-[30px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
