export const useCartStore = defineStore('cartStore', {
  state: (): {
    order: IOrder
  } => ({
    order: {
      orderDate: '',
      customerName: '',
      orderStatus: 'UNPAID',
      orderItems: [],
      totalAmount: 0,
    },
  }),
  getters: {
    itemCount(state): number {
      return state.order.orderItems.reduce((total, item) => total + item.quantity, 0)
    },
    totalAmount(state): number {
      return state.order.totalAmount
    },
  },
  actions: {
    initializeOrder(customerName: string): void {
      this.order.customerName = customerName
      this.order.orderDate = new Date().toISOString()
      this.order.orderItems = []
      this.order.totalAmount = 0
    },
    addItem(product: IProduct, quantity: number, notes: string): void {
      const existingItem = this.order.orderItems.find(item => item.product.id === product.id)

      if (existingItem) {
        existingItem.quantity += quantity
        existingItem.subTotal += product.price * quantity
      }
      else {
        this.order.orderItems.push({
          product,
          notes,
          quantity,
          subTotal: product.price * quantity,
        })
      }
      this.order.totalAmount += product.price * quantity // Update total amount
    },
    clearCart(): void {
      this.order = {
        orderDate: '',
        customerName: '',
        orderStatus: 'UNPAID',
        orderItems: [],
        totalAmount: 0,
      }
    },
  },
})
