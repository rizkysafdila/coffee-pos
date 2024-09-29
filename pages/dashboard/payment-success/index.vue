<script setup lang="ts">
const router = useRouter()

// Function to go back to the home page
function goBackToHome(): void {
  router.push('/dashboard/home')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <VCard class="p-6 bg-white shadow-md w-full max-w-lg text-center">
      <VIcon name="tabler:circle-check" class="text-green-500 mx-auto" :size="96" />
      <h1 class="text-2xl font-bold mt-4">
        Payment Successful!
      </h1>
      <p class="text-gray-600 mt-2">
        Thank you for your payment.
      </p>

      <div class="mt-8">
        <VBtn color="spice" @click="goBackToHome">
          Back to Home
        </VBtn>
      </div>
    </VCard>
  </div>
</template>
