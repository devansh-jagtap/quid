import { InvoiceItem, InvoiceData } from "../types";
import { templates } from "../templates";

type InvoicePreviewProps = {
  items: InvoiceItem[];
  subtotal: number;
  clientName: string;
  clientEmail: string;
  templateId?: keyof typeof templates;
};

export default function InvoicePreview({
  items,
  subtotal,
  clientName,
  clientEmail,
  templateId = "simple",
}: InvoicePreviewProps) {
  
  const Template = templates[templateId] || templates.simple;

  const invoiceData: InvoiceData = {
    clientName: clientName || "Client Name",
    clientEmail: clientEmail,
    items: items,
    subtotal: subtotal,
    total: subtotal,
  };

  return (
    <div id="invoice-preview-root">
      <Template {...invoiceData} />
    </div>
  );
}
