export type InvoiceItem = {
  id: string
  name: string
  quantity: number
  price: number
}

export type InvoiceStatus =
  | "DRAFT"
  | "SENT"
  | "VIEWED"
  | "PAID"
  | "OVERDUE"
  | "CANCELLED"

export type InvoiceWithItems = {
  id: string
  clientName: string
  clientEmail: string
  subtotal: number
  total: number
  status: InvoiceStatus
  createdAt: Date
  updatedAt: Date
  userId: string
  items: InvoiceItem[]
}

export type InvoiceData = {
  clientName: string
  clientEmail?: string
  items: InvoiceItem[]
  subtotal: number
  total: number
}
