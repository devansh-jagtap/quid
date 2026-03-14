import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Please login</p>;
  }
  return (
    <div className="p-10  min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <p className="text-xl font-bold text-gray-700">
        Welcome to your dashboard  {session.user?.name}
      </p>
      <div className="grid grid-cols-3 mt-10 gap-10 text-center">
        <div className="bg-white  p-10 text-3xl rounded-xl shadow">
          Total Invoices
        </div>

        <div className="bg-white  p-10 text-3xl rounded-xl shadow">
          Subscription
        </div>

        <div className="bg-white p-10  text-3xl rounded-xl shadow">Revenue</div>
      </div>
    </div>
  );
}
