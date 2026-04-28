<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAssetManager } from '@/composables/useAssetManager'
import { useAssetUploader } from '@/composables/useAssetUploader'
import AssetCard from '@/components/AssetCard.vue'
import AssetUploadModal from '@/components/AssetUploadModal.vue'

const props = defineProps<{ brandId?: string }>()
const route = useRoute()
const brandId = props.brandId ?? (route.params.id as string)

const { assets, loading, error, tagFilter, loadAssets, handleRemove, addAsset } =
  useAssetManager(brandId)
const { uploading, uploadFile } = useAssetUploader(brandId, addAsset)

const showUploadModal = ref(false)

async function handleModalSubmit(payload: { file: File; tags: string[] }) {
  const success = await uploadFile(payload.file, payload.tags)
  if (success) showUploadModal.value = false
}

function confirmRemove(id: string) {
  if (window.confirm('Delete this asset?')) handleRemove(id)
}

onMounted(loadAssets)
</script>

<template>
  <div>
    <!-- Toolbar -->
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
      <span class="text-xs text-gray-400">{{ assets.length }} asset(s)</span>
      <button
        class="ml-auto flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
        @click="showUploadModal = true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        Add Asset
      </button>
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
      No assets uploaded yet. Click <strong>Add Asset</strong> to get started.
    </div>

    <!-- Upload modal -->
    <AssetUploadModal
      :visible="showUploadModal"
      :uploading="uploading"
      @close="showUploadModal = false"
      @submit="handleModalSubmit"
    />
  </div>
</template>
