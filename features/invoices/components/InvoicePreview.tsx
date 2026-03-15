type InvoiceItem = {
  name: string;
  quantity: number;
  price: number;
};

type InvoicePreviewProps = {
  items: InvoiceItem[];
  subtotal: number;
  clientName: string;
  clientEmail: string;
};

export default function InvoicePreview({
  items,
  subtotal,
  clientName,
  clientEmail,
}: InvoicePreviewProps) {
  return (
    <div id="invoice-template" className="bg-white p-8 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Invoice Preview</h2>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Invoice</h1>

        <p className="text-gray-600">Client: {clientName}</p>

        <p className="text-gray-600">Email: {clientEmail}</p>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Item</th>
            <th className="text-left p-2">Qty</th>
            <th className="text-left p-2">Price</th>
            <th className="text-left p-2">Total</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{item.name}</td>

              <td className="p-2">{item.quantity}</td>

              <td className="p-2">${item.price}</td>

              <td className="p-2">${item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mt-6 text-lg font-semibold">
        Subtotal: ${subtotal}
      </div>
    </div>
  );
}
