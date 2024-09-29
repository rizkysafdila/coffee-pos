<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
})

const orderStore = useOrderStore()
const search = ref<string>('')

// fetch all orders
await useAsyncData('orders', () => orderStore.fetchAll())
</script>

<template>
  <PageTitle title="Order List" />

  <div class="flex flex-wrap items-center mt-10 mb-4">
    <div class="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-auto">
      <VInput
        v-model="search"
        placeholder="Search..."
        wrapper-class="w-full"
        prepend-icon="ri:search-line"
        no-ring
      />
      <VBtn
        color="dark"
        prefix-icon="mage:filter"
        outlined
        no-ring
        :block="isMobile"
      >
        Filter
      </VBtn>
    </div>
    <OrderModal activator-class="ml-auto mt-3 md:mt-0" />
  </div>

  <VDataTable
    v-model:search="search"
    class="!shadow-none !border !border-gray-200"
    :headers="ORDER_LIST_HEADER"
    :items="orderStore.orders"
  >
    <template #item.id="{ item }">
      {{ `#${item.id}` }}
    </template>

    <template #item.orderStatus="{ item }">
      <VBadge :color="item.orderStatus === 'PAID' ? 'success' : 'error'">
        {{ item.orderStatus }}
      </VBadge>
    </template>

    <template #item.totalAmount="{ item }">
      {{ toCurrency(item.totalAmount) }}
    </template>

    <template #item.action>
      <div class="flex items-center gap-3">
        <VBtn
          prefix-icon="tabler:shopping-cart"
          color="warning"
          no-ring
        />
      </div>
    </template>
  </VDataTable>
</template>
