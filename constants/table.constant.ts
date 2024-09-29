import type { VDataTableHeader } from '@morpheme/table'

export const PRODUCT_LIST_HEADER = ref<VDataTableHeader[]>([
  {
    text: 'Product',
    value: 'name',
  },
  {
    text: 'Category',
    value: 'category',
  },
  {
    text: 'Price',
    value: 'price',
  },
  {
    text: 'Stock',
    value: 'stock',
  },
  {
    text: 'Unit',
    value: 'unit',
  },
  {
    text: 'Action',
    value: 'action',
    sortable: false,
  },
])

export const ORDER_LIST_HEADER = ref<VDataTableHeader[]>([
  {
    text: 'Order ID',
    value: 'id',
  },
  {
    text: 'Date',
    value: 'orderDate',
  },
  {
    text: 'Customer',
    value: 'customerName',
  },
  {
    text: 'Total Amount',
    value: 'totalAmount',
  },
  {
    text: 'Status',
    value: 'orderStatus',
  },
  {
    text: 'Action',
    value: 'action',
    sortable: false,
  },
])
