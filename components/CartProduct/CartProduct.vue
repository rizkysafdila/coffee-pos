<script lang="ts" setup>
import type { ICartProductProps } from './CartProduct.type'

defineProps<ICartProductProps>()
</script>

<template>
  <VList
    v-for="item in items"
    :key="item.id"
    class="!p-0 mb-3"
  >
    <VListItem class="!p-2.5 !bg-gray-100">
      <template #prepend>
        <VAvatar
          :src="`http://localhost:1337${item.product.thumbnail.url}`"
          size="xl"
          shape="rounded"
        />
      </template>
      <div class="flex justify-between items-center">
        <VText font-weight="medium" as="p">
          {{ item.product.name }}
        </VText>
        <VText font-weight="semibold" as="p">
          {{ toCurrency(item.subTotal) }}
        </VText>
      </div>
      <VText color="gray.500" as="p">
        {{ `x ${item.quantity}` }}
      </VText>
    </VListItem>
  </VList>
</template>
