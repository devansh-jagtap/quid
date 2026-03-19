import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteInvoiceButton from "@/features/invoices/components/DeleteInvoiceButton";
import DashboardCharts from "@/features/invoices/components/DashboardCharts";
import InvoiceStatusBadge from "@/features/invoices/components/InvoiceStatusBadge";
import { Badge } from "@/components/ui/badge";

type InvoiceStatus =
  | "DRAFT"
  | "SENT"
  | "VIEWED"
  | "PAID"
  | "OVERDUE"
  | "CANCELLED";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/login");
  }

  const invoices = await prisma.invoice.findMany({
    where: { userId: user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  // Calculate status breakdown
  const statusCounts = invoices.reduce<Record<InvoiceStatus, number>>(
    (acc, invoice) => {
      acc[invoice.status as InvoiceStatus] =
        (acc[invoice.status as InvoiceStatus] || 0) + 1;
      return acc;
    },
    {
      DRAFT: 0,
      SENT: 0,
      VIEWED: 0,
      PAID: 0,
      OVERDUE: 0,
      CANCELLED: 0,
    },
  );

  // Status distribution for pie chart
  const statusDistribution = [
    {
      name: "Draft",
      value: statusCounts.DRAFT,
      color: "#94a3b8",
    },
    {
      name: "Sent",
      value: statusCounts.SENT,
      color: "#3b82f6",
    },
    {
      name: "Viewed",
      value: statusCounts.VIEWED,
      color: "#a855f7",
    },
    {
      name: "Paid",
      value: statusCounts.PAID,
      color: "#10b981",
    },
    {
      name: "Overdue",
      value: statusCounts.OVERDUE,
      color: "#ef4444",
    },
    {
      name: "Cancelled",
      value: statusCounts.CANCELLED,
      color: "#6b7280",
    },
  ].filter((item) => item.value > 0);

  // Monthly revenue data with status breakdown
  const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });
  const lastSixMonths = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - (5 - index));
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: monthFormatter.format(date),
    };
  });

  const revenueByMonth = invoices.reduce<
    Record<
      string,
      {
        total: number;
        draft: number;
        sent: number;
        paid: number;
        overdue: number;
      }
    >
  >((acc, invoice) => {
    const invoiceDate = new Date(invoice.createdAt);
    const key = `${invoiceDate.getFullYear()}-${invoiceDate.getMonth()}`;

    if (!acc[key]) {
      acc[key] = { total: 0, draft: 0, sent: 0, paid: 0, overdue: 0 };
    }

    acc[key].total += invoice.total;

    if (invoice.status === "DRAFT") {
      acc[key].draft += invoice.total;
    } else if (invoice.status === "SENT") {
      acc[key].sent += invoice.total;
    } else if (invoice.status === "PAID") {
      acc[key].paid += invoice.total;
    } else if (invoice.status === "OVERDUE") {
      acc[key].overdue += invoice.total;
    }

    return acc;
  }, {});

  const monthlyRevenueData = lastSixMonths.map((month) => ({
    month: month.label,
    total: revenueByMonth[month.key]?.total || 0,
    draft: revenueByMonth[month.key]?.draft || 0,
    sent: revenueByMonth[month.key]?.sent || 0,
    paid: revenueByMonth[month.key]?.paid || 0,
    overdue: revenueByMonth[month.key]?.overdue || 0,
  }));

  const recentTrendData = invoices.slice(0, 7).reverse();
  const trendSummary = recentTrendData.reduce(
    (acc, invoice) => {
      acc.maxTrendTotal = Math.max(acc.maxTrendTotal, invoice.total);
      acc.trendData.push({
        date: new Date(invoice.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        total: invoice.total,
        status: invoice.status,
      });
      return acc;
    },
    {
      trendData: [] as { date: string; total: number; status: string }[],
      maxTrendTotal: 0,
    },
  );

  // Calculate metrics
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidAmount = invoices
    .filter((inv) => inv.status === "PAID")
    .reduce((sum, inv) => sum + inv.total, 0);
  const pendingAmount = invoices
    .filter((inv) => ["DRAFT", "SENT", "VIEWED"].includes(inv.status))
    .reduce((sum, inv) => sum + inv.total, 0);
  const overdueAmount = invoices
    .filter((inv) => inv.status === "OVERDUE")
    .reduce((sum, inv) => sum + inv.total, 0);

  const thisMonthInvoices = invoices.filter((inv) => {
    const invoiceDate = new Date(inv.createdAt);
    const now = new Date();
    return (
      invoiceDate.getMonth() === now.getMonth() &&
      invoiceDate.getFullYear() === now.getFullYear()
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-8 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Welcome back, {session.user?.name || session.user?.email}
          </p>
        </div>

        {/* Primary Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-3xl font-bold">
                ${totalRevenue.toFixed(2)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                From {invoices.length} invoices
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription>Paid Amount</CardDescription>
              <CardTitle className="text-3xl font-bold text-green-600 dark:text-green-400">
                ${paidAmount.toFixed(2)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {statusCounts.PAID} paid invoices
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription>Pending Amount</CardDescription>
              <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                ${pendingAmount.toFixed(2)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {statusCounts.SENT + statusCounts.VIEWED} pending
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription>Overdue Amount</CardDescription>
              <CardTitle className="text-3xl font-bold text-red-600 dark:text-red-400">
                ${overdueAmount.toFixed(2)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {statusCounts.OVERDUE} overdue
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Status Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Draft</CardDescription>
              <CardTitle className="text-2xl">{statusCounts.DRAFT}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Sent</CardDescription>
              <CardTitle className="text-2xl">{statusCounts.SENT}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Viewed</CardDescription>
              <CardTitle className="text-2xl">{statusCounts.VIEWED}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Paid</CardDescription>
              <CardTitle className="text-2xl text-green-600 dark:text-green-400">
                {statusCounts.PAID}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Overdue</CardDescription>
              <CardTitle className="text-2xl text-red-600 dark:text-red-400">
                {statusCounts.OVERDUE}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Cancelled</CardDescription>
              <CardTitle className="text-2xl">
                {statusCounts.CANCELLED}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Charts Section */}
        <DashboardCharts
          monthlyRevenueData={monthlyRevenueData}
          trendData={trendSummary.trendData}
          maxTrendTotal={trendSummary.maxTrendTotal}
          statusDistribution={statusDistribution}
        />

        {/* Create Invoice CTA */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Your Invoices</h2>
          <Link href="/create-invoice">
            <Button size="lg">+ Create New Invoice</Button>
          </Link>
        </div>

        {/* Invoices List */}
        {invoices.length === 0 ? (
          <Card className="text-center py-12 bg-card border-border">
            <CardHeader>
              <CardTitle>No Invoices Yet</CardTitle>
              <CardDescription>
                Create your first invoice to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/create-invoice">
                <Button size="lg">Create Your First Invoice</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invoices.map((invoice) => (
              <Card
                key={invoice.id}
                className="hover:shadow-lg transition-shadow cursor-pointer bg-card border-border overflow-hidden"
              >
                <CardHeader>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-foreground">
                        {invoice.clientName}
                      </CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {new Date(invoice.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </CardDescription>
                    </div>
                    <InvoiceStatusBadge
                      status={invoice.status as InvoiceStatus}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        Invoice Total
                      </p>
                      <span className="text-xl font-bold text-primary">
                        ${invoice.total.toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-border pt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <p className="text-muted-foreground">Items</p>
                        <p className="font-medium">{invoice.items.length}</p>
                      </div>
                      <div className="flex justify-between text-sm">
                        <p className="text-muted-foreground">Subtotal</p>
                        <p className="font-medium">
                          ${invoice.subtotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/invoice/${invoice.id}`} className="flex-1">
                      <Button className="w-full" variant="outline" size="sm">
                        View Details →
                      </Button>
                    </Link>
                    <DeleteInvoiceButton invoiceId={invoice.id} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
