<script setup lang="ts">
import { assetsApi } from '@/api'
import type { Asset } from '@/types'

defineProps<{ asset: Asset }>()
const emit = defineEmits<{ delete: [id: string] }>()

function assetIcon(fileType: string) {
  const icons: Record<string, string> = {
    logo: '🖼️',
    typography: '🔤',
    color: '🎨',
    document: '📄',
    other: '📁',
  }
  return icons[fileType] ?? '📁'
}
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-xl p-4 group relative">
    <div class="text-3xl text-center mb-2">{{ assetIcon(asset.fileType) }}</div>
    <p class="text-xs text-gray-700 font-medium truncate text-center">{{ asset.fileName }}</p>
    <p class="text-xs text-gray-400 text-center mt-0.5">{{ asset.fileType }}</p>

    <div class="flex flex-wrap gap-1 mt-2">
      <span
        v-for="tag in asset.tags"
        :key="tag"
        class="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5"
      >
        {{ tag }}
      </span>
    </div>

    <div
      class="absolute inset-0 bg-white/90 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
    >
      <a
        :href="assetsApi.downloadUrl(asset.id)"
        target="_blank"
        class="text-xs text-indigo-600 hover:underline"
      >
        Download
      </a>
      <button
        class="text-xs text-red-500 hover:text-red-700"
        @click.stop="emit('delete', asset.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>
