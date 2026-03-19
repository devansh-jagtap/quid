"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export interface ChartDataPoint {
  date: string;
  paid: number;
  pending: number;
}

interface ChartAreaInteractiveProps {
  data?: ChartDataPoint[];
  title?: string;
  description?: string;
}

const defaultChartData: ChartDataPoint[] = [
  { date: "2024-04-01", paid: 222, pending: 150 },
  { date: "2024-04-02", paid: 97, pending: 180 },
  { date: "2024-04-03", paid: 167, pending: 120 },
  { date: "2024-04-04", paid: 242, pending: 260 },
  { date: "2024-04-05", paid: 373, pending: 290 },
  { date: "2024-04-06", paid: 301, pending: 340 },
  { date: "2024-04-07", paid: 245, pending: 180 },
  { date: "2024-04-08", paid: 409, pending: 320 },
  { date: "2024-04-09", paid: 59, pending: 110 },
  { date: "2024-04-10", paid: 261, pending: 190 },
  { date: "2024-04-11", paid: 327, pending: 350 },
  { date: "2024-04-12", paid: 292, pending: 210 },
  { date: "2024-04-13", paid: 342, pending: 380 },
  { date: "2024-04-14", paid: 137, pending: 220 },
  { date: "2024-04-15", paid: 120, pending: 170 },
  { date: "2024-04-16", paid: 138, pending: 190 },
  { date: "2024-04-17", paid: 446, pending: 360 },
  { date: "2024-04-18", paid: 364, pending: 410 },
  { date: "2024-04-19", paid: 243, pending: 180 },
  { date: "2024-04-20", paid: 89, pending: 150 },
  { date: "2024-04-21", paid: 137, pending: 200 },
  { date: "2024-04-22", paid: 224, pending: 170 },
  { date: "2024-04-23", paid: 138, pending: 230 },
  { date: "2024-04-24", paid: 387, pending: 290 },
  { date: "2024-04-25", paid: 215, pending: 250 },
  { date: "2024-04-26", paid: 75, pending: 130 },
  { date: "2024-04-27", paid: 383, pending: 420 },
  { date: "2024-04-28", paid: 122, pending: 180 },
  { date: "2024-04-29", paid: 315, pending: 240 },
  { date: "2024-04-30", paid: 454, pending: 380 },
  { date: "2024-05-01", paid: 165, pending: 220 },
  { date: "2024-05-02", paid: 293, pending: 310 },
  { date: "2024-05-03", paid: 247, pending: 190 },
  { date: "2024-05-04", paid: 385, pending: 420 },
  { date: "2024-05-05", paid: 481, pending: 390 },
  { date: "2024-05-06", paid: 498, pending: 520 },
  { date: "2024-05-07", paid: 388, pending: 300 },
  { date: "2024-05-08", paid: 149, pending: 210 },
  { date: "2024-05-09", paid: 227, pending: 180 },
  { date: "2024-05-10", paid: 293, pending: 330 },
  { date: "2024-05-11", paid: 335, pending: 270 },
  { date: "2024-05-12", paid: 197, pending: 240 },
  { date: "2024-05-13", paid: 197, pending: 160 },
  { date: "2024-05-14", paid: 448, pending: 490 },
  { date: "2024-05-15", paid: 473, pending: 380 },
  { date: "2024-05-16", paid: 338, pending: 400 },
  { date: "2024-05-17", paid: 499, pending: 420 },
  { date: "2024-05-18", paid: 315, pending: 350 },
  { date: "2024-05-19", paid: 235, pending: 180 },
  { date: "2024-05-20", paid: 177, pending: 230 },
  { date: "2024-05-21", paid: 82, pending: 140 },
  { date: "2024-05-22", paid: 81, pending: 120 },
  { date: "2024-05-23", paid: 252, pending: 290 },
  { date: "2024-05-24", paid: 294, pending: 220 },
  { date: "2024-05-25", paid: 201, pending: 250 },
  { date: "2024-05-26", paid: 213, pending: 170 },
  { date: "2024-05-27", paid: 420, pending: 460 },
  { date: "2024-05-28", paid: 233, pending: 190 },
  { date: "2024-05-29", paid: 78, pending: 130 },
  { date: "2024-05-30", paid: 340, pending: 280 },
  { date: "2024-05-31", paid: 178, pending: 230 },
  { date: "2024-06-01", paid: 178, pending: 200 },
  { date: "2024-06-02", paid: 470, pending: 410 },
  { date: "2024-06-03", paid: 103, pending: 160 },
  { date: "2024-06-04", paid: 439, pending: 380 },
  { date: "2024-06-05", paid: 88, pending: 140 },
  { date: "2024-06-06", paid: 294, pending: 250 },
  { date: "2024-06-07", paid: 323, pending: 370 },
  { date: "2024-06-08", paid: 385, pending: 320 },
  { date: "2024-06-09", paid: 438, pending: 480 },
  { date: "2024-06-10", paid: 155, pending: 200 },
  { date: "2024-06-11", paid: 92, pending: 150 },
  { date: "2024-06-12", paid: 492, pending: 420 },
  { date: "2024-06-13", paid: 81, pending: 130 },
  { date: "2024-06-14", paid: 426, pending: 380 },
  { date: "2024-06-15", paid: 307, pending: 350 },
  { date: "2024-06-16", paid: 371, pending: 310 },
  { date: "2024-06-17", paid: 475, pending: 520 },
  { date: "2024-06-18", paid: 107, pending: 170 },
  { date: "2024-06-19", paid: 341, pending: 290 },
  { date: "2024-06-20", paid: 408, pending: 450 },
  { date: "2024-06-21", paid: 169, pending: 210 },
  { date: "2024-06-22", paid: 317, pending: 270 },
  { date: "2024-06-23", paid: 480, pending: 530 },
  { date: "2024-06-24", paid: 132, pending: 180 },
  { date: "2024-06-25", paid: 141, pending: 190 },
  { date: "2024-06-26", paid: 434, pending: 380 },
  { date: "2024-06-27", paid: 448, pending: 490 },
  { date: "2024-06-28", paid: 149, pending: 200 },
  { date: "2024-06-29", paid: 103, pending: 160 },
  { date: "2024-06-30", paid: 446, pending: 400 },
];

const chartConfig = {
  paid: {
    label: "Paid",
    color: "var(--primary)",
  },
  pending: {
    label: "Pending",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive({
  data = defaultChartData,
  title = "Total Invoices",
  description,
}: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = data.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  // ToggleGroup from @base-ui/react uses string[] for value
  const toggleValue = [timeRange];
  const handleToggleChange = (values: string[]) => {
    // Keep the last selected value; ignore deselects
    const next = values[values.length - 1];
    if (next) setTimeRange(next);
  };

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            {description ?? "Total for the last 3 months"}
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            value={toggleValue}
            onValueChange={handleToggleChange}
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={(v) => v && setTimeRange(v)}>
            <SelectTrigger
              className="flex w-40 @[767px]/card:hidden"
              aria-label="Select a time range"
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
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillPaid" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-paid)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-paid)"
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
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
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
                    });
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
              dataKey="paid"
              type="natural"
              fill="url(#fillPaid)"
              stroke="var(--color-paid)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
