<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, RouterLink, RouterView } from 'vue-router'
import { useBrandStore } from '@/stores/brand'

const route = useRoute()
const brandStore = useBrandStore()
const brandId = route.params.id as string

onMounted(async () => {
  await brandStore.fetchBrand(brandId)
  brandStore.setActiveBrand(brandId)
})

const tabs = [
  { name: 'Guidelines', to: 'guidelines' },
  { name: 'Assets', to: 'assets' },
  { name: 'Checks', to: 'checks' },
]
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <RouterLink to="/brands" class="text-gray-400 hover:text-gray-600 text-sm">← Brands</RouterLink>
      <h1 class="text-2xl font-bold text-gray-900">
        {{ brandStore.brands.find((b) => b.id === brandId)?.name ?? '…' }}
      </h1>
      <RouterLink
        :to="`/brands/${brandId}/check`"
        class="ml-auto bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Run Compliance Check
      </RouterLink>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="flex gap-6">
        <RouterLink
          v-for="tab in tabs"
          :key="tab.to"
          :to="`/brands/${brandId}/${tab.to}`"
          class="pb-3 text-sm font-medium border-b-2 transition-colors"
          active-class="border-indigo-600 text-indigo-600"
          :class="{ 'border-transparent text-gray-500 hover:text-gray-700': true }"
        >
          {{ tab.name }}
        </RouterLink>
      </nav>
    </div>

    <!-- Tab content -->
    <RouterView :brand-id="brandId" />
  </div>
</template>
