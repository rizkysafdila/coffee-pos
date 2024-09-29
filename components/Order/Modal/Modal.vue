<script setup lang="ts">
import type { IOrderModalProps } from './Modal.type'

// Props
defineProps<IOrderModalProps>()

// Stores
const categoryStore = useCategoryStore()
const productStore = useProductStore()
const cartStore = useCartStore()

const isOpen = ref<boolean>(false)
const isModalPayOpen = ref<boolean>(false)
const search = ref<string>('')
const now = useNow()
const customerName = ref<string>('')
const selectedPaymentMethod = ref('cash')

const paymentMethods = ref([
  { text: 'Cash', value: 'cash' },
  { text: 'Card', value: 'card' },
  { text: 'QRIS', value: 'qris' },
])

// Function to format date: dd/mm/yyyy
const formattedDate = computed(() => {
  return now.value.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(/[/]/g, '/')
})

// Fetch all categories
await useAsyncData('categories', () => categoryStore.fetchAll())

// Fetch all products
await useAsyncData('products', () => productStore.fetchAll())

// Add To Cart Function
function addToCart(item: IProduct, quantity = 1): void {
  const notes = ''
  cartStore.addItem(item, quantity, notes)
}

// Tax Calculation (e.g., 10% tax)
const taxRate = 0.1 // 10% tax
const taxAmount = computed(() => cartStore.order.totalAmount * taxRate)
const totalWithTax = computed(() => cartStore.order.totalAmount + taxAmount.value)

// For Cash
const cashGiven = ref<number>(0)

// For Card
const cardNumber = ref<string>('')

// Function to handle payment
function handlePayment(): void {
  if (selectedPaymentMethod.value === 'cash') {
    const change = cashGiven.value ? cashGiven.value - totalWithTax.value : 0
    if (change < 0)
      // eslint-disable-next-line no-alert
      alert('Not enough cash provided!')
    else
      // eslint-disable-next-line no-alert
      alert(`Payment successful! Change: ${change}`)
  }
  else if (selectedPaymentMethod.value === 'card') {
    // eslint-disable-next-line no-alert
    alert(`Card payment successful! Card number: ${cardNumber.value}`)
  }
  else if (selectedPaymentMethod.value === 'qris') {
    // eslint-disable-next-line no-alert
    alert('QRIS payment successful!')
  }
  // Close modal and clear cart
  isModalPayOpen.value = false
  cartStore.clearCart()
  navigateTo('/dashboard/payment-success')
}

function onPayNow(): void {
  isModalPayOpen.value = true
}

// Search Filter
const filteredProducts = computed(() => {
  return productStore.products.filter(product =>
    product.name.toLowerCase().includes(search.value.toLowerCase()),
  )
})
</script>

<template>
  <VBtn
    :class="activatorClass"
    prefix-icon="tabler:plus"
    color="spice"
    no-ring
    @click="isOpen = true"
  >
    New Order
  </VBtn>

  <VModal
    v-model="isOpen"
    modal-class="!p-0"
    body-class="!mt-0 flex flex-row"
    hide-header
    hide-footer
    fullscreen
    persistent
  >
    <div class="w-8/12 p-5 h-full bg-spice-50">
      <div class="flex items-center justify-between">
        <VText variant="lg" font-weight="semibold">
          Choose Menu
        </VText>
        <VInput
          v-model="search"
          placeholder="Search menu"
          prepend-icon="ri:search-line"
          no-ring
        />
      </div>
      <div class="flex items-center gap-4 mt-3">
        <OrderCategoryCard
          :items="categoryStore.categories"
        />
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <OrderProductCard
          :items="filteredProducts"
          @to-cart="addToCart"
        />
      </div>
    </div>

    <div class="w-4/12 p-5 flex flex-col">
      <div class="flex justify-between items-center mb-2">
        <VText font-weight="semibold">
          {{ `Order #321` }}
        </VText>
        <VText font-weight="semibold">
          {{ formattedDate }}
        </VText>
      </div>
      <VInput
        v-model="customerName"
        prepend-icon="tabler:user"
        placeholder="Customer name"
        no-ring
      />

      <VText variant="md" font-weight="semibold" class="mt-6">
        Cart
      </VText>
      <div class="flex flex-col mt-2 overflow-y-auto max-h-80">
        <CartProduct :items="cartStore.order.orderItems" />
      </div>

      <!-- Tax and Total Section -->
      <div class="flex flex-col mt-auto space-y-2">
        <div class="flex justify-between">
          <VText variant="md" font-weight="medium">
            Subtotal
          </VText>
          <VText variant="md" font-weight="medium">
            {{ toCurrency(cartStore.order.totalAmount) }}
          </VText>
        </div>
        <div class="flex justify-between">
          <VText variant="md" font-weight="medium">
            Tax (10%)
          </VText>
          <VText variant="md" font-weight="medium">
            {{ toCurrency(taxAmount) }}
          </VText>
        </div>
        <VDivider />
        <div class="flex justify-between">
          <VText variant="md" font-weight="bold">
            Total
          </VText>
          <VText variant="md" font-weight="bold">
            {{ toCurrency(totalWithTax) }}
          </VText>
        </div>

        <VFormSelect
          v-model="selectedPaymentMethod"
          :items="paymentMethods"
        />

        <div class="grid md:grid-cols-2 gap-3 pt-4">
          <VBtn
            prefix-icon="mingcute:bill-2-line"
            color="spice"
            size="lg"
          >
            Place Order
          </VBtn>
          <VBtn
            prefix-icon="tabler:wallet"
            color="dark"
            size="lg"
            @click="onPayNow"
          >
            Pay Now
          </VBtn>
        </div>
      </div>
    </div>
  </VModal>

  <VModal
    v-model="isModalPayOpen"
    title="Complete Payment"
    hide-footer
  >
    <div class="space-y-4">
      <!-- Show the total amount -->
      <div class="flex justify-between items-center">
        <VText variant="md" font-weight="semibold">
          Total Amount
        </VText>
        <VText variant="md" font-weight="semibold">
          {{ toCurrency(totalWithTax) }}
        </VText>
      </div>

      <!-- Conditional fields based on the selected payment method -->
      <div v-if="selectedPaymentMethod === 'cash'">
        <VInput
          v-model="cashGiven"
          type="number"
          label="Cash Given"
          placeholder="Enter cash given by customer"
          prepend-icon="tabler:cash"
        />
      </div>

      <div v-if="selectedPaymentMethod === 'card'">
        <VInput
          v-model="cardNumber"
          label="Card Number"
          placeholder="Enter card number"
          prepend-icon="tabler:credit-card"
        />
      </div>

      <div v-if="selectedPaymentMethod === 'qris'">
        <VText variant="md" font-weight="semibold">
          Scan this QR Code for payment:
        </VText>
        <NuxtImg src="/images/qr-code.png" alt="QR Code" class="mx-auto" />
      </div>

      <!-- Payment action buttons -->
      <div class="grid md:grid-cols-2 gap-3 pt-4">
        <VBtn
          class="order-1"
          color="spice"
          prefix-icon="tabler:wallet"
          @click="handlePayment"
        >
          Confirm Payment
        </VBtn>
        <VBtn
          color="error"
          outlined
          @click="isModalPayOpen = false"
        >
          Cancel
        </VBtn>
      </div>
    </div>
  </VModal>
</template>
