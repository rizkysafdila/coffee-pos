export interface IOrderProductCardProps {
  items: IProduct[]
}

export interface IOrderProductCardEmits {
  (e: 'toCart', product: IProduct): void
}
