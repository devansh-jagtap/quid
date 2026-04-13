import { InvoiceData } from "../types"

export default function VibrantTemplate({
  clientName,
  clientEmail,
  items,
  subtotal,
  total,
}: InvoiceData) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-border bg-gradient-to-br from-background via-muted/40 to-primary/10 text-foreground">
      <div className="px-8 py-7 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black tracking-tight">INVOICE</h1>
            <p className="text-xs uppercase tracking-[0.2em] opacity-90 mt-1">
              crafted by quid
            </p>
          </div>
          <div className="text-right text-sm">
            <p className="uppercase tracking-wider opacity-90">Date</p>
            <p className="font-semibold">
              {new Date().toLocaleDateString("en-US")}
            </p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Billed To
            </p>
            <p className="font-bold text-xl">{clientName || "Client Name"}</p>
            {clientEmail && (
              <p className="text-muted-foreground text-sm mt-1">{clientEmail}</p>
            )}
          </div>
          <div className="rounded-xl border border-primary/20 bg-card/80 p-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Payment Summary
            </p>
            <p className="text-3xl font-extrabold text-primary">${total.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">Total due amount</p>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="bg-primary/10 text-primary border-y border-primary/20">
              <th className="text-left py-3 px-3 font-bold uppercase">Item</th>
              <th className="text-center py-3 px-3 font-bold uppercase">Qty</th>
              <th className="text-right py-3 px-3 font-bold uppercase">Price</th>
              <th className="text-right py-3 px-3 font-bold uppercase">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id || index} className="border-b border-border/60">
                <td className="py-3 px-3 font-medium">{item.name || "Item"}</td>
                <td className="py-3 px-3 text-center">{item.quantity}</td>
                <td className="py-3 px-3 text-right">${item.price.toFixed(2)}</td>
                <td className="py-3 px-3 text-right font-semibold">
                  ${(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 flex justify-end">
          <div className="w-72 rounded-xl bg-card border border-border p-4 space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
