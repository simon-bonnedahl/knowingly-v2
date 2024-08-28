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
import { RenderIcon } from "../icon-picker/render-icon";

const getDeviceIcon = (device: string) => {
  switch (device) {
    case "Mobile":
      return "📱";
    case "Desktop":
      return "💻";
    default:
      return "?";
  }
}

export const DevicesChart = ({ data }: { data: any }) => {
  const chartData = Object.keys(data).map((device) => ({
    device: getDeviceIcon(device) + " " + device,
    visitors: data[device],
    fill: "hsl(var(--primary))",
  }));


  const chartConfig = chartData.reduce((acc, { device }) => {
    acc[device] = {
      label: getDeviceIcon(device) + " " + device,
    };
    return acc;
  }, {} as ChartConfig
    );


  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitors by Device</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}  >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
           
            maxBarSize={24}
            margin={{right: 16, }}
          
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="device"
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
                dataKey="device"
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
