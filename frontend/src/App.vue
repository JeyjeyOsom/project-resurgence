<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { useBrandStore } from '@/stores/brand'
import ToastContainer from '@/components/ToastContainer.vue'

const brandStore = useBrandStore()
const route = useRoute()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Top nav -->
    <header class="bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-6">
          <RouterLink to="/" class="text-lg font-bold text-indigo-600 tracking-tight">
            BrandAI
          </RouterLink>
          <nav class="flex gap-4">
            <RouterLink
              to="/"
              class="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
              active-class="text-indigo-600"
              exact-active-class="text-indigo-600 font-semibold"
            >
              Dashboard
            </RouterLink>
            <RouterLink
              to="/brands"
              class="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
              active-class="text-indigo-600"
            >
              Brands
            </RouterLink>
          </nav>
        </div>

        <!-- Active brand indicator -->
        <div v-if="brandStore.activeBrand" class="flex items-center gap-2 text-sm text-gray-500">
          <span class="inline-block w-2 h-2 rounded-full bg-green-400"></span>
          <span>{{ brandStore.activeBrand.name }}</span>
        </div>
      </div>
    </header>

    <!-- Page content -->
    <main class="flex-1">
      <RouterView />
    </main>

    <ToastContainer />
  </div>
</template>
