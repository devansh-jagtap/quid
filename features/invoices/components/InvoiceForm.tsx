"use client";

import { useState } from "react";
import InvoicePreview from "./InvoicePreview";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { InvoiceItem } from "../types";
import { saveInvoice } from "../actions/saveInvoice";

export default function InvoiceForm() {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      name: "",
      quantity: 1,
      price: 0,
    },
  ]);

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
      const data = await saveInvoice({
        clientName,
        items,
        subtotal,
        total: subtotal,
      });

      console.log("Invoice saved:", data);
      alert("Invoice saved successfully!");
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

    pdf.save("invoice.pdf");
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Create Invoice</h1>

      <div className="bg-gray-200 shadow rounded-lg p-6">
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold">Client Information</h2>

          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Client Name"
            className="w-full border p-3 rounded"
          />

          <input
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            placeholder="Client Email"
            className="w-full border p-3 rounded"
          />
        </div>
        <div className="bg-white shadow rounded-lg p-6 mt-2 space-y-6">
          <h2 className="text-2xl">Items</h2>
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 mb-4">
              <input
                value={item.name}
                onChange={(e) => updateItem(index, "name", e.target.value)}
                placeholder="Item name"
                className="border p-2 rounded"
              />

              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateItem(index, "quantity", Number(e.target.value))
                }
                placeholder="Qty"
                className="border p-2 rounded"
              />

              <input
                type="number"
                value={item.price}
                onChange={(e) =>
                  updateItem(index, "price", Number(e.target.value))
                }
                placeholder="Price"
                className="border p-2 rounded"
              />
              <button
                onClick={() => removeItem(index)}
                className="bg-red-500 text-white rounded-lg px-4 py-2"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-center items-center gap-5 w-full">
            <button
              onClick={addItem}
              className="bg-black text-white px-6 py-2 rounded-lg"
            >
              Add Item
            </button>
          </div>

          <div className="mt-6 text-right">
            <p className="text-lg">Subtotal: ${subtotal}</p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div id="invoice-template">
          <InvoicePreview
            items={items}
            subtotal={subtotal}
            clientName={clientName}
            clientEmail={clientEmail}
          />
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={downloadPDF}
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            Download PDF
          </button>
          <button
            onClick={handleSaveInvoice}
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Save Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
