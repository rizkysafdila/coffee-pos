<script lang="ts" setup>
import type { IOrderProductCardEmits, IOrderProductCardProps } from './ProductCard.type'

// Props
const props = defineProps<IOrderProductCardProps>()

// Emits
const emits = defineEmits<IOrderProductCardEmits>()
</script>

<template>
  <VCollapsible
    v-for="item in props.items"
    :key="item.id"
    active-class="font-semibold text-dark !bg-white rounded-t-lg rounded-b-none"
    wrapper-class="rounded-lg"
    activator-class="bg-white hover:bg-white text-dark rounded-lg"
    panel-class="bg-white p-4 rounded-b-lg"
    hide-icon
  >
    <!-- Product Header -->
    <template #header>
      <div class="flex gap-4">
        <NuxtImg
          :src="`http://localhost:1337${item.thumbnail.url}`"
          class="w-1/4 object-cover rounded-md"
          :alt="item.name"
        />
        <div class="flex flex-col">
          <VText variant="md" font-weight="medium">
            {{ item.name }}
          </VText>
          <VText variant="xs" color="gray.500">
            {{ item.description }}
          </VText>
          <VText variant="md" font-weight="semibold" class="mt-auto !text-spice-700">
            {{ toCurrency(item.price) }}
          </VText>
        </div>
      </div>
    </template>

    <!-- Add to Cart Button -->
    <VBtn
      prefix-icon="tabler:plus"
      block
      no-ring
      @click="emits('toCart', item)"
    >
      Add to Cart
    </VBtn>
  </VCollapsible>
</template>
