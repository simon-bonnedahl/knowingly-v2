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
import { countries } from "~/lib/countries";



export const CountriesChart = ({ data }: { data: any }) => {
    const maxBars = 10;
  const chartData = Object.keys(data).map((country) => ({
    country: countries[country]?.flagIcon + " " + countries[country]?.name,
    visitors: data[country],
    fill: "hsl(var(--primary))",
  }));


  const chartConfig = chartData.reduce((acc, { country }) => {
    acc[countries[country]?.name] = {
      label: countries[country]?.flagIcon + " " + countries[country]?.name,
    };
    return acc;
  }, {} as ChartConfig
    );



  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitors by Country</CardTitle>
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
              dataKey="country"
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
                dataKey="country"
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
