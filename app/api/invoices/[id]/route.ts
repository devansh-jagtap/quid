import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const body = await req.json();
  const { clientName, items, subtotal, total } = body;

  // Check if invoice exists and belongs to user
  const existingInvoice = await prisma.invoice.findUnique({
    where: {
      id: id,
      userId: user.id,
    },
  });

  if (!existingInvoice) {
    return new Response("Invoice not found", { status: 404 });
  }

  // Delete old items
  await prisma.invoiceItem.deleteMany({
    where: {
      invoiceId: id,
    },
  });

  // Update invoice
  const updatedInvoice = await prisma.invoice.update({
    where: { id: id },
    data: {
      clientName,
      subtotal,
      total,
      items: {
        create: items.map((item: InvoiceItem) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      items: true,
    },
  });

  return Response.json(updatedInvoice);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  // Check if invoice belongs to user
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: id,
      userId: user.id,
    },
  });

  if (!invoice) {
    return new Response("Invoice not found", { status: 404 });
  }

  // Delete items first
  await prisma.invoiceItem.deleteMany({
    where: {
      invoiceId: id,
    },
  });

  // Delete invoice
  await prisma.invoice.delete({
    where: { id: id },
  });

  return Response.json({ message: "Invoice deleted successfully" });
}
