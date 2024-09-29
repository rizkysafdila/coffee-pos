<script lang="ts" setup>
import type { ISidebarProps } from './Sidebar.type'

defineProps<ISidebarProps>()

const route = useRoute()
</script>

<template>
  <VList
    active-variant="filled"
    class="!gap-3.5"
    hover
  >
    <div v-for="(menu, i) in SIDEBAR_MENU_ITEMS" :key="i">
      <VListItemHeader v-if="!isMini">
        {{ menu.header }}
      </VListItemHeader>
      <VListItem
        v-for="(item, index) in menu.items"
        :key="index"
        v-bind="item"
        :active="route.fullPath.startsWith(`/dashboard/${item.to}`)"
        class="!rounded-lg mb-1.5"
        default-class="font-medium"
      >
        {{ item.title }}
      </VListItem>
    </div>
  </VList>
</template>

<style lang="scss">
:root {
  --v-list-item-active-bg-color: theme('colors.white');
  --v-list-item-active-border-color: theme('colors.spice.700');
  --v-list-item-active-color: theme('colors.spice.700');
}

.v-list--active-filled .v-list-item--active {
  border: 1px solid theme('colors.gray.300') !important;
}
</style>
