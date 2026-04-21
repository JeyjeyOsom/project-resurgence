<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAssetManager } from '@/composables/useAssetManager'
import { useAssetUploader } from '@/composables/useAssetUploader'
import AssetCard from '@/components/AssetCard.vue'
import FileUploadDropzone from '@/components/FileUploadDropzone.vue'

const props = defineProps<{ brandId?: string }>()
const route = useRoute()
const brandId = props.brandId ?? (route.params.id as string)

const { assets, loading, error, tagFilter, loadAssets, handleRemove, addAsset } =
  useAssetManager(brandId)
const { uploading, uploadFile } = useAssetUploader(brandId, addAsset)

const uploadTags = ref('')

function handleFileSelected(file: File) {
  const tags = uploadTags.value
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
  uploadFile(file, tags)
  uploadTags.value = ''
}

function confirmRemove(id: string) {
  if (window.confirm('Delete this asset?')) handleRemove(id)
}

onMounted(loadAssets)
</script>

<template>
  <div>
    <div class="mb-3">
      <label class="block text-xs text-gray-500 mb-1">Tags for next upload (comma-separated)</label>
      <input
        v-model="uploadTags"
        type="text"
        placeholder="e.g. logo, dark-mode, web"
        class="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 w-full"
      />
    </div>
    <FileUploadDropzone :uploading="uploading" @file-selected="handleFileSelected" />

    <!-- Filter bar -->
    <div class="flex items-center gap-3 mb-4">
      <input
        v-model="tagFilter"
        type="text"
        placeholder="Filter by tag…"
        class="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 w-48"
        @keyup.enter="loadAssets"
      />
      <button
        class="text-sm text-gray-500 hover:text-gray-700"
        @click="tagFilter = ''; loadAssets()"
      >
        Clear
      </button>
      <span class="text-xs text-gray-400 ml-auto">{{ assets.length }} asset(s)</span>
    </div>

    <!-- Error -->
    <div v-if="error" class="text-sm text-red-600 mb-4">{{ error }}</div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12 text-gray-400">Loading…</div>

    <!-- Grid -->
    <div v-else-if="assets.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <AssetCard
        v-for="asset in assets"
        :key="asset.id"
        :asset="asset"
        @delete="confirmRemove"
      />
    </div>

    <div v-else class="text-center py-16 text-gray-400 text-sm">
      No assets uploaded yet. Drag & drop files above to get started.
    </div>
  </div>
</template>
