import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

interface InvoiceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function InvoiceDetailPage({
  params,
}: InvoiceDetailPageProps) {
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
    return (
      <div className="min-h-screen bg-background md:ml-64 p-8">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Invoice Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The invoice you&apos;re looking for doesn&apos;t exist or you
              don&apos;t have permission to view it.
            </p>
            <Link href="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background md:ml-64">
      <div className="p-8 max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Link href={`/invoice/${id}/edit`}>
              <Button>Edit Invoice</Button>
            </Link>
          </div>
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="bg-muted/30">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl mb-2 text-foreground">
                  Invoice #{invoice.id.slice(-6).toUpperCase()}
                </CardTitle>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="font-semibold text-foreground">
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Client Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Bill To:
              </h3>
              <p className="text-xl font-medium text-foreground">
                {invoice.clientName}
              </p>
            </div>

            {/* Invoice Items Table */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Items
              </h3>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-semibold text-foreground">
                        Item
                      </th>
                      <th className="text-right p-4 font-semibold text-foreground">
                        Quantity
                      </th>
                      <th className="text-right p-4 font-semibold text-foreground">
                        Price
                      </th>
                      <th className="text-right p-4 font-semibold text-foreground">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-border last:border-b-0"
                      >
                        <td className="p-4 text-foreground">{item.name}</td>
                        <td className="p-4 text-right text-foreground">
                          {item.quantity}
                        </td>
                        <td className="p-4 text-right text-foreground">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="p-4 text-right font-medium text-foreground">
                          ${(item.quantity * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between py-2 border-t border-border">
                  <span className="font-semibold text-foreground">
                    Subtotal:
                  </span>
                  <span className="font-semibold text-foreground">
                    ${invoice.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-t-2 border-border">
                  <span className="text-lg font-bold text-foreground">
                    Total:
                  </span>
                  <span className="text-lg font-bold text-primary">
                    ${invoice.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
              <p>Thank you for your business!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
