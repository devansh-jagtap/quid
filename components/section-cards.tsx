"use client"

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SectionCardsProps {
  totalRevenue: number
  paidAmount: number
  pendingAmount: number
  overdueAmount: number
}

function TrendBadge({ value }: { value: number }) {
  const isPositive = value >= 0
  return (
    <Badge variant="outline" className="gap-1">
      {isPositive ? (
        <IconTrendingUp className="size-3" />
      ) : (
        <IconTrendingDown className="size-3" />
      )}
      {isPositive ? "+" : ""}
      {value.toFixed(1)}%
    </Badge>
  )
}

export function SectionCards({
  totalRevenue,
  paidAmount,
  pendingAmount,
  overdueAmount,
}: SectionCardsProps) {
  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  // Mock previous month data for trend calculation
  const prevRevenue = totalRevenue * 0.85
  const prevPaid = paidAmount * 0.8
  const prevPending = pendingAmount * 0.9
  const prevOverdue = overdueAmount * 1.1

  const revenueTrend = calculateTrend(totalRevenue, prevRevenue)
  const paidTrend = calculateTrend(paidAmount, prevPaid)
  const pendingTrend = calculateTrend(pendingAmount, prevPending)
  const overdueTrend = calculateTrend(overdueAmount, prevOverdue)

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${totalRevenue.toFixed(2)}
          </CardTitle>
          <div className="mt-2">
            <TrendBadge value={revenueTrend} />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {revenueTrend >= 0 ? "Trending up" : "Trending down"} this month{" "}
            {revenueTrend >= 0 ? (
              <IconTrendingUp className="size-4 text-green-600" />
            ) : (
              <IconTrendingDown className="size-4 text-red-600" />
            )}
          </div>
          <div className="text-muted-foreground">
            All invoices combined
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Paid Amount</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-green-600 dark:text-green-400">
            ${paidAmount.toFixed(2)}
          </CardTitle>
          <div className="mt-2">
            <TrendBadge value={paidTrend} />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong payment collection
            <IconTrendingUp className="size-4 text-green-600" />
          </div>
          <div className="text-muted-foreground">
            Successfully paid invoices
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pending Amount</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-blue-600 dark:text-blue-400">
            ${pendingAmount.toFixed(2)}
          </CardTitle>
          <div className="mt-2">
            <TrendBadge value={pendingTrend} />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Awaiting payment
            <IconTrendingUp className="size-4 text-blue-600" />
          </div>
          <div className="text-muted-foreground">
            Draft, sent, and viewed invoices
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Overdue Amount</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-red-600 dark:text-red-400">
            ${overdueAmount.toFixed(2)}
          </CardTitle>
          <div className="mt-2">
            <TrendBadge value={overdueTrend} />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Requires attention
            {overdueTrend > 0 ? (
              <IconTrendingUp className="size-4 text-red-600" />
            ) : (
              <IconTrendingDown className="size-4 text-green-600" />
            )}
          </div>
          <div className="text-muted-foreground">
            Past due invoices
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
