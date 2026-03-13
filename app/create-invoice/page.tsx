"use client"

export default function CreateInvoicePage() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Create Invoice</h1>

      <div className="bg-gray-200 shadow rounded-lg p-6">
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold">Client Information</h2>

          <input
            placeholder="Client Name"
            className="w-full border p-3 rounded"
          />

          <input
            placeholder="Client Email"
            className="w-full border p-3 rounded"
          />
        </div>
      </div>
    </div>
  );
}
