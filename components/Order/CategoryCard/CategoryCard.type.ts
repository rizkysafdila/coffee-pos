export interface IOrderCategoryCardProps {
  items: ICategory[]
}

export interface IOrderCategoryCardEmits {
  (e: 'filterCategory'): void
}
