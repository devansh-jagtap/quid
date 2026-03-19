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
    icon: "📝",
  },
  SENT: {
    label: "Sent",
    variant: "sent" as const,
    icon: "📤",
  },
  VIEWED: {
    label: "Viewed",
    variant: "viewed" as const,
    icon: "👁️",
  },
  PAID: {
    label: "Paid",
    variant: "paid" as const,
    icon: "✅",
  },
  OVERDUE: {
    label: "Overdue",
    variant: "overdue" as const,
    icon: "⏰",
  },
  CANCELLED: {
    label: "Cancelled",
    variant: "cancelled" as const,
    icon: "❌",
  },
};

export default function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className="flex items-center gap-1.5">
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </Badge>
  );
}
