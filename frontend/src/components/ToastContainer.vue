<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const { toasts, removeToast } = useToast()
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80 pointer-events-none">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="flex items-start gap-3 rounded-lg px-4 py-3 shadow-lg text-sm pointer-events-auto"
      :class="{
        'bg-red-600 text-white': toast.type === 'error',
        'bg-green-600 text-white': toast.type === 'success',
        'bg-gray-800 text-white': toast.type === 'info',
      }"
    >
      <span class="flex-1">{{ toast.message }}</span>
      <button
        class="shrink-0 opacity-80 hover:opacity-100 leading-none"
        @click="removeToast(toast.id)"
      >
        ×
      </button>
    </div>
  </div>
</template>
