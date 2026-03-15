import { InvoiceItem } from "../types";

type SaveInvoiceDTO = {
  clientName: string;
  clientEmail: string;
  items: InvoiceItem[];
  subtotal: number;
  total: number;
};

export const saveInvoice = async (data: SaveInvoiceDTO) => {
  const response = await fetch("/api/invoices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to save invoice");
  }

  return await response.json();
};
