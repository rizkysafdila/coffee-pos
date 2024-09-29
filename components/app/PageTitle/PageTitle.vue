<script lang="ts" setup>
import type { IPageTitleProps } from './PageTitle.type'

defineProps<IPageTitleProps>()
</script>

<template>
  <div class="flex items-center gap-3">
    <VText
      variant="xl"
      color="gray.800"
      font-weight="semibold"
      as="h1"
    >
      {{ title }}
    </VText>
  </div>
</template>
