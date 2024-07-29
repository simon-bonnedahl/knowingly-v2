"use client"

import { Pie, PieChart } from "recharts"

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
} from "@knowingly/ui/chart"
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Mentors",
    color: "hsl(var(--chart-1))",
  },
  firefox: {
    label: "Angels",
    color: "hsl(var(--chart-2))",
  },
  safari: {
    label: "Students",
    color: "hsl(var(--chart-3))",
  },
 

} satisfies ChartConfig

export function SubrolesChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>User roles</CardTitle>
        <CardDescription>Distribution of user roles</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
