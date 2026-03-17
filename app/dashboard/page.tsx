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

  const revenueByMonth = invoices.reduce<Record<string, number>>((acc, invoice) => {
    const invoiceDate = new Date(invoice.createdAt);
    const key = `${invoiceDate.getFullYear()}-${invoiceDate.getMonth()}`;
    acc[key] = (acc[key] || 0) + invoice.total;
    return acc;
  }, {});

  const monthlyRevenueData = lastSixMonths.map((month) => ({
    month: month.label,
    total: revenueByMonth[month.key] || 0,
  }));

  const recentTrendData = invoices.slice(0, 7).reverse();
  const maxTrendTotal = Math.max(...recentTrendData.map((invoice) => invoice.total), 1);
  const trendData = recentTrendData.map((invoice) => ({
    date: new Date(invoice.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    total: invoice.total,
  }));

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardDescription>Total Invoices</CardDescription>
              <CardTitle className="text-4xl">{invoices.length}</CardTitle>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-4xl">
                ${invoices.reduce((sum, inv) => sum + inv.total, 0).toFixed(2)}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardDescription>This Month</CardDescription>
              <CardTitle className="text-4xl">
                {
                  invoices.filter((inv) => {
                    const invoiceDate = new Date(inv.createdAt);
                    const now = new Date();
                    return (
                      invoiceDate.getMonth() === now.getMonth() &&
                      invoiceDate.getFullYear() === now.getFullYear()
                    );
                  }).length
                }
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <DashboardCharts
          monthlyRevenueData={monthlyRevenueData}
          trendData={trendData}
          maxTrendTotal={maxTrendTotal}
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
                className="hover:shadow-lg transition-shadow cursor-pointer bg-card border-border"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl text-foreground">
                      {invoice.clientName}
                    </CardTitle>
                    <span className="text-2xl font-bold text-primary">
                      ${invoice.total.toFixed(2)}
                    </span>
                  </div>
                  <CardDescription>
                    {new Date(invoice.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-muted-foreground">
                      Items: {invoice.items.length}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Subtotal: ${invoice.subtotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/invoice/${invoice.id}`} className="flex-1">
                      <Button className="w-full" variant="outline">
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
