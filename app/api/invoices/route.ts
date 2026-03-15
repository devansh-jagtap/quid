import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
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

  const invoices = await prisma.invoice.findMany({
    where: { userId: user.id },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(invoices);
}

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const { clientName, items, subtotal, total } = body;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const invoice = await prisma.invoice.create({
    data: {
      clientName,
      subtotal,
      total,
      userId: user.id,

      items: {
        create: items.map((item: InvoiceItem) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  return Response.json(invoice);
}
