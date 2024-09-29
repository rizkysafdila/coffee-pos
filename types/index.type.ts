export interface IOrder {
  id?: number
  orderDate: string
  customerName: string
  orderStatus: 'UNPAID' | 'PAID'
  orderItems: IOrderItem[]
  totalAmount: number
}

export interface IOrderItem {
  id?: number
  product: IProduct
  notes: string
  quantity: number
  subTotal: number
}

export interface IPayment {
  order: IOrder
  paymentType: 'CASH' | 'CARD' | 'QRIS'
  amountPaid: number
  paymentDate: string
}

export interface IProduct {
  id?: number
  documentId: string
  name: string
  description: string
  stock: number
  price: number
  unit: string
  category: ICategory
  thumbnail: IThumbnail
}

export interface ICategory {
  id?: number
  documentId: string
  name: string
}

interface IThumbnail {
  id?: number
  documentId: string
  name: string
  alternativeText: any
  caption: any
  width: number
  height: number
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: any
}
