"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import InvoiceStatusBadge from "./InvoiceStatusBadge";

type InvoiceStatus =
  | "DRAFT"
  | "SENT"
  | "VIEWED"
  | "PAID"
  | "OVERDUE"
  | "CANCELLED";

interface InvoiceStatusSelectProps {
  invoiceId: string;
  currentStatus: InvoiceStatus;
}

const statusOptions: { value: InvoiceStatus; label: string }[] = [
  { value: "DRAFT", label: "Draft" },
  { value: "SENT", label: "Sent" },
  { value: "VIEWED", label: "Viewed" },
  { value: "PAID", label: "Paid" },
  { value: "OVERDUE", label: "Overdue" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default function InvoiceStatusSelect({
  invoiceId,
  currentStatus,
}: InvoiceStatusSelectProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleStatusChange = async (newStatus: InvoiceStatus) => {
    if (newStatus === currentStatus) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      router.refresh();
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update status.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-[130px]">
      <Select
        value={currentStatus}
        onValueChange={(value) => handleStatusChange(value as InvoiceStatus)}
        disabled={isUpdating}
      >
        <SelectTrigger className="border-none p-0 h-auto bg-transparent hover:bg-transparent shadow-none focus:ring-0">
          <InvoiceStatusBadge status={currentStatus} />
        </SelectTrigger>
        <SelectContent align="start">
          {statusOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-xs"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
