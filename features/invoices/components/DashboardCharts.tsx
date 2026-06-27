"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const formatCurrency = (value: number) => `$${value.toFixed(0)}`;

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
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="total"
                    fill="var(--primary)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            {/* Revenue by Status Stacked Bar Chart */}
            <TabsContent value="status" className="w-full">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="draft" stackId="a" fill={COLORS.draft} />
                  <Bar dataKey="sent" stackId="a" fill={COLORS.sent} />
                  <Bar dataKey="paid" stackId="a" fill={COLORS.paid} />
                  <Bar dataKey="overdue" stackId="a" fill={COLORS.overdue} />
                </BarChart>
              </ResponsiveContainer>
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
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--primary)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  fill="url(#colorTotal)"
                  dot={{ fill: "var(--primary)", r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
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
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => `${value} invoice(s)`}
                      contentStyle={{
                        backgroundColor: "var(--background)",
                        border: "1px solid var(--border)",
                        borderRadius: "6px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
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
