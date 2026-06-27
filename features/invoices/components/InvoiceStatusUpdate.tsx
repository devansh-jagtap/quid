"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InvoiceStatusBadge from "./InvoiceStatusBadge";

type InvoiceStatus = "DRAFT" | "SENT" | "VIEWED" | "PAID" | "OVERDUE" | "CANCELLED";

interface InvoiceStatusUpdateProps {
  invoiceId: string;
  currentStatus: InvoiceStatus;
  onStatusUpdated?: (newStatus: InvoiceStatus) => void;
}

const statusOptions: { value: InvoiceStatus; label: string }[] = [
  { value: "DRAFT", label: "Draft" },
  { value: "SENT", label: "Sent" },
  { value: "VIEWED", label: "Viewed" },
  { value: "PAID", label: "Paid" },
  { value: "OVERDUE", label: "Overdue" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default function InvoiceStatusUpdate({
  invoiceId,
  currentStatus,
  onStatusUpdated,
}: InvoiceStatusUpdateProps) {
  const router = useRouter();
  const [status, setStatus] = useState<InvoiceStatus>(currentStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: InvoiceStatus) => {
    setStatus(newStatus);
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/invoices/${invoiceId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update status");
      }

      // Call the callback if provided
      if (onStatusUpdated) {
        onStatusUpdated(newStatus);
      }

      // Revalidate the page data
      router.refresh();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update invoice status";
      setError(errorMessage);
      setStatus(currentStatus); // Revert on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Invoice Status
          </label>
          <Select
            value={status}
            onValueChange={(value) =>
              handleStatusChange(value as InvoiceStatus)
            }
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="pt-6">
          <InvoiceStatusBadge status={status} />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}
    </div>
  );
}
