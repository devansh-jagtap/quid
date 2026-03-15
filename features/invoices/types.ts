export type InvoiceItem = {
  id: string
  name: string
  quantity: number
  price: number
}

export type InvoiceData = {
  clientName: string
  clientEmail?: string
  items: InvoiceItem[]
  subtotal: number
  total: number
}