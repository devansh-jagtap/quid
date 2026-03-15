import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import InvoiceForm from "@/features/invoices/components/InvoiceForm";

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
    <InvoiceForm
      initialData={{
        id: invoice.id,
        clientName: invoice.clientName,
        clientEmail: "",
        items: invoice.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal: invoice.subtotal,
        total: invoice.total,
      }}
      isEditing={true}
    />
  );
}
