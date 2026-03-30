import { InvoiceData } from "../types"

export default function SimpleTemplate({
    clientName,
    clientEmail,
    items,
    subtotal,
    total
}: InvoiceData) {
    return (
        <div className="bg-card p-10 border border-border rounded-lg font-sans text-card-foreground">
            
            {/* Header */}
            <div className="flex justify-between items-end border-b-2 border-border pb-6 mb-10">
                <div>
                    <h1 className="text-3xl tracking-widest uppercase mb-1">
                        Invoice
                    </h1>
                </div>
                <div className="text-right text-sm">
                    <p className="font-semibold uppercase text-muted-foreground mb-1">Date</p>
                    <p>{new Date().toLocaleDateString('en-US')}</p>
                </div>
            </div>

            {/* Client Info */}
            <div className="mb-10 text-sm leading-relaxed">
                <p className="uppercase font-semibold text-muted-foreground mb-2">Billed To</p>
                <p className="font-medium text-lg mb-1">{clientName || "Client Name"}</p>
                {clientEmail && (
                    <p className="text-muted-foreground">{clientEmail}</p>
                )}
            </div>

            {/* Table */}
            <table className="w-full text-sm text-left mb-8">
                <thead className="border-b border-border text-muted-foreground uppercase">
                    <tr>
                        <th className="py-3 px-2 font-semibold">Description</th>
                        <th className="py-3 px-2 text-center font-semibold">Qty</th>
                        <th className="py-3 px-2 text-right font-semibold">Price</th>
                        <th className="py-3 px-2 text-right font-semibold">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.id || index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                            <td className="py-4 px-2 font-medium">{item.name || "Item description"}</td>
                            <td className="py-4 px-2 text-center">{item.quantity}</td>
                            <td className="py-4 px-2 text-right text-muted-foreground">${item.price.toFixed(2)}</td>
                            <td className="py-4 px-2 text-right font-medium">${(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end mb-10">
                <div className="w-64 text-sm">
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border mb-2">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="font-medium text-foreground">$0.00</span>
                    </div>
                    <div className="flex justify-between py-2 text-lg font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-border text-center text-xs text-muted-foreground uppercase tracking-widest">
                <p>Thank you for your business</p>
            </div>
        </div>
    )
}