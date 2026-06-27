import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { InvoiceDataTable } from "@/features/invoices/components/InvoiceDataTable";
import { Plus } from "lucide-react";
import type { InvoiceWithItems } from "@/features/invoices/types";

export default async function InvoicesPage() {
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

  const invoiceTableData = invoices.map((invoice) => ({
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
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background px-4 sticky top-0 z-20">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Invoices</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto">
          <Link href="/create-invoice">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Invoice
            </Button>
          </Link>
        </div>
      </header>

      <main className="p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight">Manage Invoices</h1>
            <p className="text-muted-foreground">
              Review, filter, and manage all your customer invoices in one place.
            </p>
          </div>
          <InvoiceDataTable data={invoiceTableData} />
        </div>
      </main>
    </div>
  );
}
