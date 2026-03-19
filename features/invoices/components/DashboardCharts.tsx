"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type RevenueChartPoint = {
  month: string;
  total: number;
  draft?: number;
  sent?: number;
  paid?: number;
  overdue?: number;
};

type TrendChartPoint = {
  date: string;
  total: number;
  status?: string;
};

type StatusDistribution = {
  name: string;
  value: number;
  color: string;
};

type DashboardChartsProps = {
  monthlyRevenueData: RevenueChartPoint[];
  trendData: TrendChartPoint[];
  maxTrendTotal: number;
  statusDistribution?: StatusDistribution[];
};

const COLORS = {
  draft: "#94a3b8",
  sent: "#3b82f6",
  viewed: "#a855f7",
  paid: "#10b981",
  overdue: "#ef4444",
  cancelled: "#6b7280",
};

const revenueChartConfig = {
  total: {
    label: "Revenue",
    color: "var(--color-chart-1)",
  },
  draft: {
    label: "Draft",
    color: "#94a3b8",
  },
  sent: {
    label: "Sent",
    color: "#3b82f6",
  },
  paid: {
    label: "Paid",
    color: "#10b981",
  },
  overdue: {
    label: "Overdue",
    color: "#ef4444",
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
  statusDistribution = [],
}: DashboardChartsProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Monthly Revenue with Status Breakdown */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Revenue Analysis</CardTitle>
          <CardDescription>
            Monthly revenue performance and trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="total" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="total">Total Revenue</TabsTrigger>
              <TabsTrigger value="status">By Status</TabsTrigger>
            </TabsList>

            {/* Total Revenue Bar Chart */}
            <TabsContent value="total" className="w-full">
              <ChartContainer
                config={revenueChartConfig}
                className="h-80 w-full"
              >
                <BarChart accessibilityLayer data={monthlyRevenueData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    tickLine={false}
                    axisLine={false}
                    width={50}
                  />
                  <ChartTooltip
                    cursor={{ fill: "var(--muted)" }}
                    content={<ChartTooltipContent />}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="total"
                    fill="var(--color-total)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </TabsContent>

            {/* Revenue by Status Stacked Bar Chart */}
            <TabsContent value="status" className="w-full">
              <ChartContainer
                config={revenueChartConfig}
                className="h-80 w-full"
              >
                <BarChart accessibilityLayer data={monthlyRevenueData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    tickLine={false}
                    axisLine={false}
                    width={50}
                  />
                  <ChartTooltip
                    cursor={{ fill: "var(--muted)" }}
                    content={<ChartTooltipContent />}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="draft"
                    stackId="a"
                    fill={COLORS.draft}
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar dataKey="sent" stackId="a" fill={COLORS.sent} />
                  <Bar dataKey="paid" stackId="a" fill={COLORS.paid} />
                  <Bar dataKey="overdue" stackId="a" fill={COLORS.overdue} />
                </BarChart>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Trend and Status Distribution Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Invoice Trend - Area Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Invoice Trend</CardTitle>
            <CardDescription>
              Last {trendData.length} invoices by total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={trendChartConfig} className="h-72 w-full">
              <AreaChart accessibilityLayer data={trendData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-total)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-total)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  minTickGap={20}
                />
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
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="var(--color-total)"
                  strokeWidth={2.5}
                  fill="url(#colorTotal)"
                  dot={{ fill: "var(--color-total)", r: 4 }}
                />
              </AreaChart>
            </ChartContainer>
            <p className="mt-3 text-xs text-muted-foreground">
              Highest recent invoice: ${maxTrendTotal.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        {/* Status Distribution - Pie Chart */}
        {statusDistribution.length > 0 && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Invoice Status Distribution</CardTitle>
              <CardDescription>Breakdown by invoice status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <PieChart width={300} height={280}>
                  <Pie
                    data={statusDistribution}
                    cx={150}
                    cy={120}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </div>
              <div className="mt-6 space-y-2">
                {statusDistribution.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-muted-foreground capitalize">
                        {item.name}
                      </span>
                    </div>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
