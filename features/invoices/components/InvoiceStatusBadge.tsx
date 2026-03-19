"use client";

import { Badge } from "@/components/ui/badge";

type InvoiceStatus = "DRAFT" | "SENT" | "VIEWED" | "PAID" | "OVERDUE" | "CANCELLED";

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
}

const statusConfig = {
  DRAFT: {
    label: "Draft",
    variant: "draft" as const,
  },
  SENT: {
    label: "Sent",
    variant: "sent" as const,
  },
  VIEWED: {
    label: "Viewed",
    variant: "viewed" as const,
  },
  PAID: {
    label: "Paid",
    variant: "paid" as const,
  },
  OVERDUE: {
    label: "Overdue",
    variant: "overdue" as const,
  },
  CANCELLED: {
    label: "Cancelled",
    variant: "cancelled" as const,
  },
};

export default function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className="flex items-center text-center gap-1.5">
      <span className="text-center">{config.label}</span>
    </Badge>
  );
}
