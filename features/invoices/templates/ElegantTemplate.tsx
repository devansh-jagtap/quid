import { InvoiceData } from "../types"

export default function ElegantTemplate({
  clientName,
  clientEmail,
  items,
  subtotal,
  total,
}: InvoiceData) {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-2xl overflow-hidden shadow-xl">
      <div className="bg-primary/10 px-10 py-8 border-b border-border">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-2">
              Quid Studio
            </p>
            <h1 className="text-4xl font-bold tracking-tight">Invoice</h1>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
              Issued
            </p>
            <p className="font-medium">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="px-10 py-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Bill To
          </p>
          <p className="text-2xl font-semibold">{clientName || "Client Name"}</p>
          {clientEmail && <p className="text-muted-foreground mt-1">{clientEmail}</p>}
        </div>

        <table className="w-full text-sm mb-8">
          <thead>
            <tr className="text-muted-foreground border-b border-border">
              <th className="text-left py-3">Description</th>
              <th className="text-center py-3">Qty</th>
              <th className="text-right py-3">Price</th>
              <th className="text-right py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id || index} className="border-b border-border/60">
                <td className="py-3 font-medium">{item.name || "Service item"}</td>
                <td className="py-3 text-center">{item.quantity}</td>
                <td className="py-3 text-right">${item.price.toFixed(2)}</td>
                <td className="py-3 text-right font-semibold">
                  ${(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-72 text-sm space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground pb-2 border-b border-border">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
