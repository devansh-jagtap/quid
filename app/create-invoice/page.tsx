"use client";

import { useState } from "react";

type InvoiceItem = {
  name: string;
  quantity: number;
  price: number;
};

export default function CreateInvoicePage() {
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
    const update = [...items];
    update[index][field] = value;
    setItems(update);
  };

  const subtotal = items.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Create Invoice</h1>

      <div className="bg-gray-200 shadow rounded-lg p-6">
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold">Client Information</h2>

          <input
            placeholder="Client Name"
            className="w-full border p-3 rounded"
          />

          <input
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
                className="bg-red-500 text-white w-40 rounded-lg text-2xl"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-center items-center gap-5 w-full">
            <button
              onClick={addItem}
              className="bg-black text-white w-40 rounded-lg text-2xl"
            >
              Add Item
            </button>
          </div>

          <div className="mt-6 text-right">
            <p className="text-lg">Subtotal: ${subtotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
