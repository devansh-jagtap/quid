import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import InvoiceForm from "@/features/invoices/components/InvoiceForm";
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

interface EditInvoicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditInvoicePage({
  params,
}: EditInvoicePageProps) {
  const { id } = await params;
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

  const invoice = await prisma.invoice.findUnique({
    where: {
      id: id,
      userId: user.id,
    },
    include: {
      items: true,
    },
  });

  if (!invoice) {
    redirect("/dashboard");
  }

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
              <BreadcrumbPage>Edit Invoice</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <InvoiceForm
        initialData={{
          id: invoice.id,
          clientName: invoice.clientName,
          clientEmail: invoice.clientEmail || "",
          items: invoice.items.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          subtotal: invoice.subtotal,
          total: invoice.total,
        }}
        isEditing={true}
      />
    </div>
  );
}
