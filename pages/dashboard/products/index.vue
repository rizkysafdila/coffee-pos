<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
})

// Stores
const productStore = useProductStore()

const search = ref<string>('')
const showDetailModal = ref<boolean>(false)

// Fetch All Products
await useAsyncData('products', () => productStore.fetchAll())

const products = computed(() => {
  return productStore.products.map(item => ({
    ...item,
    unit: toCapitalize(item.unit),
  }))
})

// Open Detail Product Modal
function openDetailModal(productId: number): void {
  showDetailModal.value = !showDetailModal.value
  productStore.FETCH_SINGLE_PRODUCT(productId)
}
</script>

<template>
  <PageTitle title="Product List" />

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
    <VBtn
      to="#"
      prefix-icon="tabler:plus"
      color="spice"
      class="!font-medium ml-auto mt-3 md:mt-0"
      no-ring
      :block="isMobile"
    >
      New Product
    </VBtn>
  </div>

  <VDataTable
    v-model:search="search"
    class="!shadow-none !border !border-gray-200"
    :headers="PRODUCT_LIST_HEADER"
    :items="products"
  >
    <template #item.category="{ item }">
      <VBadge color="indigo">
        {{ item.category.name }}
      </VBadge>
    </template>

    <template #item.name="{ item }">
      <VList class="!p-0">
        <VListItem class="!p-0">
          <template #prepend>
            <VAvatar
              :src="`http://localhost:1337${item.thumbnail.url}`"
              :name="item.name"
              size="xl"
              shape="rounded"
            />
          </template>
          <VText font-weight="medium" as="p" class="flex items-center gap-2">
            {{ item.name }}
          </VText>
        </VListItem>
      </VList>
    </template>

    <template #item.price="{ item }">
      {{ toCurrency(item.price) }}
    </template>

    <template #item.action="{ item }">
      <ClientOnly>
        <div class="flex items-center gap-3">
          <VBtn
            prefix-icon="tabler:eye"
            color="info"
            no-ring
            @click="openDetailModal(item.id)"
          />
          <VBtn
            prefix-icon="tabler:edit"
            color="warning"
            no-ring
          />
          <VBtn
            prefix-icon="tabler:trash"
            color="error"
            no-ring
          />
        </div>
      </ClientOnly>
    </template>
  </VDataTable>

  <!-- Detail Product Modal -->
  <VModal v-model="showDetailModal" title="Product Details">
    <div class="flex flex-wrap gap-3">
      <NuxtImg :src="`http://localhost:1337${productStore.product?.thumbnail.url}`" class="w-full h-56 object-cover rounded-lg" />
      <div class="flex justify-between items-start w-full">
        <div class="flex flex-wrap">
          <VText class="w-full" variant="xl" font-weight="semibold">
            {{ productStore.product?.name }}
          </VText>
          <VText color="gray.500" class="mt-1">
            {{ productStore.product?.description }}
          </VText>
        </div>
        <VBadge color="indigo" small>
          {{ productStore.product?.category.name }}
        </VBadge>
      </div>
      <div class="w-full flex flex-col gap-0.5">
        <VText class="text-spice-700" variant="lg" font-weight="semibold">
          {{ toCurrency(productStore.product?.price as number) }}
        </VText>
        <VText font-weight="medium">
          {{ `Stock: ${productStore.product?.stock} ${toCapitalize(productStore.product?.unit as string)}` }}
        </VText>
      </div>
    </div>
  </VModal>
</template>
