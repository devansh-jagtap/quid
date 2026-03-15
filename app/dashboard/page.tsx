import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <p>Please login</p>;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return <p>User not found</p>;
  }

  const invoices = await prisma.invoice.findMany({
    where: { userId: user.id },
    include: { items: true },
  });

  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <p className="text-xl font-bold text-gray-700">
        Welcome to your dashboard {session.user?.name}
      </p>

      <div className="grid grid-cols-3 mt-10 gap-10 text-center">
        <div className="bg-white p-10 text-3xl rounded-xl shadow">
          Total Invoices
        </div>

        <div className="bg-white p-10 text-3xl rounded-xl shadow">
          Subscription
        </div>

        <div className="bg-white p-10 text-3xl rounded-xl shadow">Revenue</div>
      </div>

      <div className="space-y-4 mt-8">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="p-4 border rounded bg-white">
            <p>Client: {invoice.clientName}</p>
            <p>Total: ${invoice.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
