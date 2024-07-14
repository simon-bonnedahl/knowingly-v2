"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
    { browser: "chrome", meetings: Math.floor(Math.random() * 100), fill: "var(--color-chrome)" },
    { browser: "safari", meetings: Math.floor(Math.random() * 100), fill: "var(--color-safari)" },
    { browser: "firefox", meetings: Math.floor(Math.random() * 100), fill: "var(--color-firefox)" },
    { browser: "edge", meetings: Math.floor(Math.random() * 100), fill: "var(--color-edge)" },
    { browser: "other", meetings: Math.floor(Math.random() * 100), fill: "var(--color-other)" },
]

chartData.sort((a, b) => b.meetings - a.meetings)

const chartConfig = {
  meetings: {
    label: "Meetings",
  },
  chrome: {
    label: "Elon Musk",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Jeff Bezos",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Bill Gates",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Sam Altman",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Sundar Pichai",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function UserActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Most active users</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
            className="w-fit border border-black"
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="meetings" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="meetings" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}
