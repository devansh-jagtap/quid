"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InvoicePreview from "./InvoicePreview";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { InvoiceItem } from "../types";
import { saveInvoice } from "../actions/saveInvoice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InvoiceFormProps {
  initialData?: {
    id: string;
    clientName: string;
    clientEmail: string;
    items: InvoiceItem[];
    subtotal: number;
    total: number;
  };
  isEditing?: boolean;
}

export default function InvoiceForm({
  initialData,
  isEditing = false,
}: InvoiceFormProps) {
  const router = useRouter();
  const [clientName, setClientName] = useState(initialData?.clientName || "");
  const [clientEmail, setClientEmail] = useState(
    initialData?.clientEmail || "",
  );

  const [items, setItems] = useState<InvoiceItem[]>(
    initialData?.items || [
      {
        name: "",
        quantity: 1,
        price: 0,
      },
    ],
  );

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const updateItem = <K extends keyof InvoiceItem>(
    index: number,
    field: K,
    value: InvoiceItem[K],
  ) => {
    // Fix state mutation: Create a new object for the updated item
    const newItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setItems(newItems);
  };

  const subtotal = items.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  const handleSaveInvoice = async () => {
    try {
      if (isEditing && initialData?.id) {
        // Update existing invoice
        const response = await fetch(`/api/invoices/${initialData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientName,
            items,
            subtotal,
            total: subtotal,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update invoice");
        }

        alert("Invoice updated successfully!");
        router.push(`/invoice/${initialData.id}`);
      } else {
        // Create new invoice
        const data = await saveInvoice({
          clientName,
          items,
          subtotal,
          total: subtotal,
        });

        console.log("Invoice saved:", data);
        alert("Invoice saved successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error saving invoice:", error);
      alert("Error saving invoice");
    }
  };

  const downloadPDF = async () => {
    const element = document.getElementById("invoice-template");
    if (!element) return;

    const imgData = await toPng(element, { pixelRatio: 2 });

    const img = new Image();
    img.src = imgData;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const pdf = new jsPDF();

    const imgWidth = 210;
    const imgHeight = (img.height * imgWidth) / img.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    const filename = isEditing
      ? `invoice-${initialData?.id?.slice(0, 8)}-updated.pdf`
      : "invoice.pdf";
    pdf.save(filename);
  };

  return (
    <div className="min-h-screen bg-background md:ml-64">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Create Invoice
          </h1>
          <p className="text-muted-foreground">
            Fill in the details below to create a new invoice
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Client Name
                  </label>
                  <input
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter client name"
                    className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Client Email
                  </label>
                  <input
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Invoice Items */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Invoice Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-3 items-end"
                    >
                      <input
                        value={item.name}
                        onChange={(e) =>
                          updateItem(index, "name", e.target.value)
                        }
                        placeholder="Item name"
                        className="col-span-6 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(index, "quantity", Number(e.target.value))
                        }
                        placeholder="Qty"
                        className="col-span-2 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          updateItem(index, "price", Number(e.target.value))
                        }
                        placeholder="Price"
                        className="col-span-2 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        onClick={() => removeItem(index)}
                        className="col-span-2 px-3 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addItem}
                  className="w-full px-4 py-2 border-2 border-dashed border-border text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                >
                  + Add Item
                </button>
              </CardContent>
            </Card>

            {/* Subtotal */}
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-2 border-t border-border">
                  <span className="text-foreground">Subtotal:</span>
                  <span className="font-semibold text-foreground">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
              {isEditing && (
                <button
                  onClick={() => router.back()}
                  className="px-6 py-2 border border-border text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={downloadPDF}
                className="px-6 py-2 border border-border text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
              >
                Download PDF
              </button>
              <button
                onClick={handleSaveInvoice}
                className="px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors font-medium"
              >
                {isEditing ? "Update Invoice" : "Save Invoice"}
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Preview
              </h2>
              <div
                id="invoice-template"
                className="bg-card border border-border rounded-lg p-4 overflow-auto max-h-[calc(100vh-200px)]"
              >
                <InvoicePreview
                  items={items}
                  subtotal={subtotal}
                  clientName={clientName}
                  clientEmail={clientEmail}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
