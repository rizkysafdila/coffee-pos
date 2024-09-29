<script lang="ts" setup>
import type { IOrderCategoryCardEmits, IOrderCategoryCardProps } from './CategoryCard.type'

defineProps<IOrderCategoryCardProps>()

const emits = defineEmits<IOrderCategoryCardEmits>()

// const selected = ref<string>('')
</script>

<template>
  <VCard color="dark" class="cursor-pointer" shadow="none">
    <VText font-weight="medium">
      All
    </VText>
  </VCard>

  <VCard
    v-for="item in items"
    :key="item.id"
    class="cursor-pointer"
    shadow="none"
    @click="emits('filterCategory')"
  >
    <VText font-weight="medium">
      {{ item.name }}
    </VText>
  </VCard>
</template>
