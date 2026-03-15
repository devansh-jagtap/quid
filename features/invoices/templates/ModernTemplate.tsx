import { InvoiceData } from "../types"

export default function ModernTemplate({
    clientName,
    clientEmail,
    items,
    subtotal,
    total
}: InvoiceData) {
    return (
        <div className="bg-white dark:bg-card p-10 rounded-lg shadow-lg dark:border dark:border-border">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-12">
                <div>
                    <h1 className="text-4xl font-black text-primary tracking-tighter mb-2 uppercase">
                        INVOICE
                    </h1>
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold text-gray-500 dark:text-muted-foreground uppercase tracking-wider mb-1">
                        Date Issued
                    </p>
                    <p className="font-medium text-foreground">
                        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Billing Info */}
            <div className="mb-12">
                <p className="text-sm font-semibold text-gray-500 dark:text-muted-foreground uppercase tracking-wider mb-3">
                    Billed To
                </p>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                    {clientName || "Client Name"}
                </h3>
                {clientEmail && (
                    <p className="text-gray-600 dark:text-muted-foreground">
                        {clientEmail}
                    </p>
                )}
            </div>

            {/* Table */}
            <table className="w-full mb-8">
                <thead className="bg-muted/50 dark:bg-muted/20 border-y-2 border-primary/20 dark:border-border">
                    <tr>
                        <th className="text-left py-3 px-4 text-sm font-bold text-foreground uppercase tracking-wider">Item</th>
                        <th className="text-center py-3 px-4 text-sm font-bold text-foreground uppercase tracking-wider">Qty</th>
                        <th className="text-right py-3 px-4 text-sm font-bold text-foreground uppercase tracking-wider">Price</th>
                        <th className="text-right py-3 px-4 text-sm font-bold text-foreground uppercase tracking-wider">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.id || index} className="border-b dark:border-border/50 hover:bg-muted/30 transition-colors">
                            <td className="py-4 px-4 text-foreground font-medium">{item.name || "Item Name"}</td>
                            <td className="py-4 px-4 text-center text-foreground">{item.quantity}</td>
                            <td className="py-4 px-4 text-right text-gray-600 dark:text-muted-foreground">${item.price.toFixed(2)}</td>
                            <td className="py-4 px-4 text-right font-semibold text-foreground">${(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Totals Section */}
            <div className="flex justify-end mb-10">
                <div className="w-72">
                    <div className="flex justify-between py-3 border-b dark:border-border">
                        <span className="text-gray-600 dark:text-muted-foreground font-medium">Subtotal</span>
                        <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b dark:border-border">
                        <span className="text-gray-600 dark:text-muted-foreground font-medium">Tax (0%)</span>
                        <span className="font-semibold text-foreground">$0.00</span>
                    </div>
                    <div className="flex justify-between py-4 mt-3 bg-primary text-primary-foreground rounded-xl px-5">
                        <span className="text-xl font-bold">Total Due</span>
                        <span className="text-xl font-bold">${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t-2 dark:border-border text-center text-gray-500 dark:text-muted-foreground flex justify-between items-center">
                <p className="font-medium">Thank you for your business.</p>
                <div className="flex items-center gap-2 font-bold text-sm tracking-widest uppercase">
                    <span className="text-primary text-lg">⚡</span> Powered by Quid
                </div>
            </div>
        </div>
    )
}