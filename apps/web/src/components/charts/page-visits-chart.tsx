"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@knowingly/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@knowingly/ui/chart";



export const PagevisitsChart = ({ data }: { data: any }) => {
  const maxBars = 10;
  const chartData = Object.keys(data).map((page) => ({
    page: page,
    visitors: data[page],
    fill: "hsl(var(--primary))",
  }));


  const chartConfig = chartData.reduce((acc, { page }) => {
    acc[page] = {
      label: page,
    };
    return acc;
  }, {} as ChartConfig
    );

   

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top pages</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}  >
          <BarChart
            accessibilityLayer
            data={chartData.sort((a, b) => b.visitors - a.visitors).slice(0, maxBars)}
            layout="vertical"
            maxBarSize={24}
            margin={{right: 16, }}
          
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="page"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="visitors"
              layout="vertical"
              radius={4}
            >
              <LabelList
                dataKey="page"
                position="insideLeft"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
              <LabelList
                dataKey="visitors"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
