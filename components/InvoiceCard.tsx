import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface InvoiceCardProps {
  id: string;
  clientName: string;
  total: number;
  subtotal: number;
  createdAt: Date | string;
  items: InvoiceItem[];
}

export default function InvoiceCard({
  id,
  clientName,
  total,
  subtotal,
  createdAt,
  items,
}: InvoiceCardProps) {
  const date = new Date(createdAt);

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group bg-card border-border">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl group-hover:text-primary transition-colors text-foreground">
            {clientName}
          </CardTitle>
          <span className="text-2xl font-bold text-primary">
            ${total.toFixed(2)}
          </span>
        </div>
        <CardDescription>
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-muted-foreground">Items: {items.length}</p>
          <p className="text-sm text-muted-foreground">
            Subtotal: ${subtotal.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">ID: {id.slice(0, 8)}</p>
        </div>
        <Link href={`/invoice/${id}`}>
          <Button className="w-full" variant="outline">
            View Details →
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
