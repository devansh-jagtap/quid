"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InvoicePreview from "./InvoicePreview";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { InvoiceItem } from "../types";
import { saveInvoice } from "../actions/saveInvoice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { templates } from "../templates";

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
        id: crypto.randomUUID(),
        name: "",
        quantity: 1,
        price: 0,
      },
    ],
  );

  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof templates>("simple");

  const addItem = () => {
    setItems([...items, { id: crypto.randomUUID(), name: "", quantity: 1, price: 0 }]);
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
            clientEmail,
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
          clientEmail,
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

  // Light-mode CSS variable values to override on the element during PDF capture
  // This avoids touching the global dark class and prevents any flash
  const lightModeVars: Record<string, string> = {
    "--background": "oklch(1.0000 0 0)",
    "--foreground": "oklch(0.2686 0 0)",
    "--card": "oklch(1.0000 0 0)",
    "--card-foreground": "oklch(0.2686 0 0)",
    "--popover": "oklch(1.0000 0 0)",
    "--popover-foreground": "oklch(0.2686 0 0)",
    "--primary": "oklch(0.7686 0.1647 70.0804)",
    "--primary-foreground": "oklch(0 0 0)",
    "--secondary": "oklch(0.9670 0.0029 264.5419)",
    "--secondary-foreground": "oklch(0.4461 0.0263 256.8018)",
    "--muted": "oklch(0.9846 0.0017 247.8389)",
    "--muted-foreground": "oklch(0.5510 0.0234 264.3637)",
    "--accent": "oklch(0.9869 0.0214 95.2774)",
    "--accent-foreground": "oklch(0.4732 0.1247 46.2007)",
    "--destructive": "oklch(0.6368 0.2078 25.3313)",
    "--destructive-foreground": "oklch(1.0000 0 0)",
    "--border": "oklch(0.9276 0.0058 264.5313)",
    "--input": "oklch(0.9276 0.0058 264.5313)",
    "--ring": "oklch(0.7686 0.1647 70.0804)",
  };

  const downloadPDF = async () => {
    const previewContainer = document.getElementById("preview-scroll-container");
    const element = document.getElementById("invoice-preview-root");
    if (!element || !previewContainer) return;

    // 1. Override CSS variables on the element to force light-mode colors (no theme toggle!)
    const savedVars: Record<string, string> = {};
    for (const [key, val] of Object.entries(lightModeVars)) {
      savedVars[key] = element.style.getPropertyValue(key);
      element.style.setProperty(key, val);
    }
    // Force white background and dark text on the root element itself
    const savedBg = element.style.backgroundColor;
    const savedColor = element.style.color;
    element.style.backgroundColor = "white";
    element.style.color = "black";

    // 2. Temporarily remove scroll container constraints
    const savedOverflow = previewContainer.style.overflow;
    const savedMaxHeight = previewContainer.style.maxHeight;
    const savedHeight = previewContainer.style.height;
    previewContainer.style.overflow = "visible";
    previewContainer.style.maxHeight = "none";
    previewContainer.style.height = "auto";

    // 3. Give browser a frame to re-layout
    await new Promise((r) => requestAnimationFrame(r));

    try {
      const imgData = await toPng(element, { 
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const img = new Image();
      img.src = imgData;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (img.height * pdfWidth) / img.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      const filename = isEditing
        ? `invoice-${initialData?.id?.slice(0, 8)}-updated.pdf`
        : "invoice.pdf";
      pdf.save(filename);
    } finally {
      // 4. Restore everything
      previewContainer.style.overflow = savedOverflow;
      previewContainer.style.maxHeight = savedMaxHeight;
      previewContainer.style.height = savedHeight;
      element.style.backgroundColor = savedBg;
      element.style.color = savedColor;
      for (const [key] of Object.entries(lightModeVars)) {
        if (savedVars[key]) {
          element.style.setProperty(key, savedVars[key]);
        } else {
          element.style.removeProperty(key);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
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
          <div>
            <div className="sticky top-8 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Preview
                </h2>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value as keyof typeof templates)}
                  className="px-3 py-1.5 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="simple">Simple Template</option>
                  <option value="modern">Modern Template</option>
                </select>
              </div>
              <div
                id="preview-scroll-container"
                className="bg-card border border-border rounded-lg p-4 overflow-auto max-h-[calc(100vh-200px)]"
              >
                <InvoicePreview
                  items={items}
                  subtotal={subtotal}
                  clientName={clientName}
                  clientEmail={clientEmail}
                  templateId={selectedTemplate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
