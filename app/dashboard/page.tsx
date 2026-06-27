import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { InvoiceDataTable } from "@/features/invoices/components/InvoiceDataTable";
import { Plus, ArrowRight } from "lucide-react";
import type { InvoiceWithItems } from "@/features/invoices/types";

export default async function DashboardPage() {
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

  const invoices = (await prisma.invoice.findMany({
    where: { userId: user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  })) as InvoiceWithItems[];

  // Build chart data: aggregate daily paid vs pending amounts for the last 90 days
  const dailyMap = new Map<string, { paid: number; pending: number }>();
  
  // Initialize last 90 days with zeros to ensure the graph is "connected"
  const now = new Date();
  for (let i = 0; i < 90; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    dailyMap.set(dateStr, { paid: 0, pending: 0 });
  }

  invoices.forEach((invoice) => {
    const dateStr = new Date(invoice.createdAt).toISOString().split("T")[0];
    const existing = dailyMap.get(dateStr);
    if (existing) {
      if (invoice.status === "PAID") {
        existing.paid += invoice.total;
      } else {
        existing.pending += invoice.total;
      }
      dailyMap.set(dateStr, existing);
    }
  });

  const chartData = Array.from(dailyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, values]) => ({
      date,
      paid: Math.round(values.paid * 100) / 100,
      pending: Math.round(values.pending * 100) / 100,
    }));

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

  // Recent invoices for the dashboard overview (Limit to 5)
  const recentInvoices = invoices.slice(0, 5).map((invoice) => ({
    id: invoice.id,
    clientName: invoice.clientName,
    status: invoice.status,
    total: invoice.total,
    subtotal: invoice.subtotal,
    itemCount: invoice.items.length,
    createdAt: invoice.createdAt.toISOString(),
  }));

  return (
    <div className="w-full">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto">
          <Link href="/create-invoice">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Invoice
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards
              totalRevenue={totalRevenue}
              paidAmount={paidAmount}
              pendingAmount={pendingAmount}
              overdueAmount={overdueAmount}
            />

            <div className="px-4 lg:px-6">
              <ChartAreaInteractive
                data={chartData.length > 0 ? chartData : undefined}
                title="Revenue Overview"
                description="Paid vs pending trends over the last 90 days"
              />
            </div>

            <div className="px-4 lg:px-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight">Recent Invoices</h2>
                <Link href="/invoices">
                  <Button variant="ghost" size="sm" className="gap-1 text-primary">
                    View All Invoices
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <InvoiceDataTable data={recentInvoices} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
