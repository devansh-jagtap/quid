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
    <div
      id="invoice-template"
      className="bg-white dark:bg-card p-8 shadow rounded-lg"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black dark:text-foreground mb-2">
          Invoice
        </h1>
        <p className="text-gray-600 dark:text-muted-foreground">
          Professional Invoice Document
        </p>
      </div>

      {/* Client Info */}
      <div className="mb-8 border-b border-gray-200 dark:border-border pb-6">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-muted-foreground uppercase mb-2">
          Bill To
        </h2>
        <p className="text-lg font-semibold text-black dark:text-foreground">
          {clientName || "Client Name"}
        </p>
        <p className="text-gray-600 dark:text-muted-foreground">
          {clientEmail || "client@example.com"}
        </p>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-border">
              <th className="text-left py-3 px-4 font-semibold text-black dark:text-foreground">
                Item
              </th>
              <th className="text-right py-3 px-4 font-semibold text-black dark:text-foreground">
                Qty
              </th>
              <th className="text-right py-3 px-4 font-semibold text-black dark:text-foreground">
                Price
              </th>
              <th className="text-right py-3 px-4 font-semibold text-black dark:text-foreground">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-border hover:bg-gray-50 dark:hover:bg-muted/50"
              >
                <td className="py-3 px-4 text-gray-800 dark:text-foreground">
                  {item.name || "Item"}
                </td>
                <td className="text-right py-3 px-4 text-gray-800 dark:text-foreground">
                  {item.quantity}
                </td>
                <td className="text-right py-3 px-4 text-gray-800 dark:text-foreground">
                  ${item.price.toFixed(2)}
                </td>
                <td className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-foreground">
                  ${(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-80">
          <div className="flex justify-between py-3 border-t border-gray-200 dark:border-border mb-3">
            <span className="text-gray-700 dark:text-muted-foreground">
              Subtotal:
            </span>
            <span className="font-semibold text-black dark:text-foreground">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-3 border-t-2 border-b-2 border-gray-300 dark:border-border bg-gray-50 dark:bg-muted/30 px-4">
            <span className="text-lg font-bold text-black dark:text-foreground">
              Total:
            </span>
            <span className="text-lg font-bold text-green-600 dark:text-primary">
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-6 border-t border-gray-200 dark:border-border">
        <p className="text-sm text-gray-500 dark:text-muted-foreground">
          Thank you for your business!
        </p>
        <p className="text-xs text-gray-400 dark:text-muted-foreground mt-2">
          This is an automated invoice. Please retain for your records.
        </p>
      </div>
    </div>
  );
}
