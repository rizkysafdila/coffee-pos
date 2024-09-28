<script setup lang="ts">
const isMini = ref<boolean>(false)
const isAsideOpen = ref<boolean>(false)
const router = useRouter()

watchEffect(() => {
  isAsideOpen.value = !isMobile.value
})

function miniToggle(): void {
  isMini.value = !isMini.value
}
</script>

<template>
  <VAppShell padded-container>
    <!-- navbar -->
    <template #navigation>
      <VAppBar
        v-if="isMobile"
        class="flex justify-between items-center !py-8"
        sticky
        bordered
      >
        <VBtn
          v-if="isMobile"
          class="hover:!bg-gray-100 ml-auto"
          prefix-icon="tabler:layout-sidebar"
          text
          no-ring
          @click="isAsideOpen = !isAsideOpen"
        />
      </VAppBar>
    </template>

    <!-- aside -->
    <template #aside>
      <VNavDrawer
        v-model="isAsideOpen"
        v-model:mini="isMini"
        :fixed="isMobile"
        :overlay="isMobile"
        :close-on-overlay-click="isMobile"
        :class="{ 'z-20 !w-10/12 sidebar': isMobile }"
        bordered
      >
        <div class="flex justify-center items-center px-3 py-4" :class="{ 'justify-between': !isMini }">
          <div class="flex items-center gap-2">
            <NuxtImg
              src="/images/logo/coffee.svg"
              :width="48"
              alt="Coffee"
              @click="router.push('/')"
            />
            <VText
              v-if="!isMini || isMobile"
              class="cursor-pointer"
              variant="lg"
              font-weight="bold"
              @click="router.push('/')"
            >
              Coffie
            </VText>
          </div>
          <VBtn
            v-if="!isMobile"
            class="hover:!bg-gray-100"
            prefix-icon="tabler:layout-sidebar"
            text
            no-ring
            @click="miniToggle"
          />
        </div>

        <Sidebar
          :is-mini="isMini"
          :class="isMini ? '!px-2' : '!px-3'"
          @mini-click="miniToggle"
        />
      </VNavDrawer>
    </template>

    <!-- content -->
    <slot />
  </VAppShell>
</template>
