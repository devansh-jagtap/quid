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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Welcome back, {session.user?.name || session.user?.email}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardDescription>Total Invoices</CardDescription>
              <CardTitle className="text-4xl">{invoices.length}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-4xl">
                ${invoices.reduce((sum, inv) => sum + inv.total, 0).toFixed(2)}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
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

        {/* Create Invoice CTA */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Invoices</h2>
          <Link href="/create-invoice">
            <Button size="lg">+ Create New Invoice</Button>
          </Link>
        </div>

        {/* Invoices List */}
        {invoices.length === 0 ? (
          <Card className="text-center py-12">
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
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">
                      {invoice.clientName}
                    </CardTitle>
                    <span className="text-2xl font-bold text-blue-600">
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
                    <p className="text-sm text-gray-600">
                      Items: {invoice.items.length}
                    </p>
                    <p className="text-sm text-gray-600">
                      Subtotal: ${invoice.subtotal.toFixed(2)}
                    </p>
                  </div>
                  <Link href={`/invoice/${invoice.id}`}>
                    <Button className="w-full" variant="outline">
                      View Details →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
