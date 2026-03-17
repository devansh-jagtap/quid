"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type RevenueChartPoint = {
  month: string;
  total: number;
};

type TrendChartPoint = {
  date: string;
  total: number;
};

type DashboardChartsProps = {
  monthlyRevenueData: RevenueChartPoint[];
  trendData: TrendChartPoint[];
  maxTrendTotal: number;
};

const revenueChartConfig = {
  total: {
    label: "Revenue",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

const trendChartConfig = {
  total: {
    label: "Invoice Total",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig;

export default function DashboardCharts({
  monthlyRevenueData,
  trendData,
  maxTrendTotal,
}: DashboardChartsProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
      <Card className="bg-card border-border xl:col-span-2">
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
          <CardDescription>Revenue performance over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={revenueChartConfig} className="h-64 w-full">
            <BarChart accessibilityLayer data={monthlyRevenueData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(value) => `$${value}`}
                tickLine={false}
                axisLine={false}
                width={50}
              />
              <ChartTooltip
                cursor={{ fill: "var(--muted)" }}
                content={<ChartTooltipContent />}
              />
              <Bar
                dataKey="total"
                fill="var(--color-total)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Invoice Trend</CardTitle>
          <CardDescription>Last {trendData.length || 0} invoices by total</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={trendChartConfig} className="h-64 w-full">
            <LineChart accessibilityLayer data={trendData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} minTickGap={20} />
              <YAxis
                tickFormatter={(value) => `$${value}`}
                tickLine={false}
                axisLine={false}
                width={50}
              />
              <ChartTooltip
                cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
                content={<ChartTooltipContent />}
              />
              <Line
                dataKey="total"
                type="monotone"
                stroke="var(--color-total)"
                strokeWidth={2.5}
                dot={{ fill: "var(--color-total)" }}
              />
            </LineChart>
          </ChartContainer>
          <p className="mt-3 text-xs text-muted-foreground">
            Highest recent invoice: ${maxTrendTotal.toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
