<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { checksApi } from '@/api'
import type { ComplianceCheck, PaginatedResponse } from '@/types'

const props = defineProps<{ brandId?: string }>()
const route = useRoute()
const brandId = props.brandId ?? (route.params.id as string)

const result = ref<PaginatedResponse<ComplianceCheck> | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

onMounted(load)

async function load(page = 1) {
  loading.value = true
  error.value = null
  try {
    result.value = await checksApi.history(brandId, page)
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    loading.value = false
  }
}

function scoreColor(score: number) {
  if (score >= 75) return 'bg-green-100 text-green-700'
  if (score >= 50) return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-700'
}
</script>

<template>
  <div>
    <div v-if="loading" class="text-center py-12 text-gray-400">Loading…</div>
    <div v-else-if="error" class="text-sm text-red-600">{{ error }}</div>

    <template v-else-if="result">
      <div v-if="result.data.length" class="space-y-4">
        <div
          v-for="check in result.data"
          :key="check.id"
          class="bg-white border border-gray-200 rounded-xl p-5"
        >
          <div class="flex items-start justify-between gap-4 mb-3">
            <p class="text-sm text-gray-800 flex-1">{{ check.inputText }}</p>
            <span
              class="text-sm font-bold px-3 py-1 rounded-full shrink-0"
              :class="scoreColor(check.toneScore)"
            >
              {{ check.toneScore }}/100
            </span>
          </div>

          <div v-if="check.flaggedInconsistencies.length" class="mb-2">
            <p class="text-xs font-medium text-gray-500 mb-1">Flagged:</p>
            <ul class="list-disc list-inside text-xs text-red-600 space-y-0.5">
              <li v-for="flag in check.flaggedInconsistencies" :key="flag">{{ flag }}</li>
            </ul>
          </div>

          <div v-if="check.suggestions.length">
            <p class="text-xs font-medium text-gray-500 mb-1">Suggestions:</p>
            <ul class="list-disc list-inside text-xs text-indigo-600 space-y-0.5">
              <li v-for="sug in check.suggestions" :key="sug">{{ sug }}</li>
            </ul>
          </div>

          <p class="text-xs text-gray-400 mt-3">
            {{ new Date(check.createdAt).toLocaleString() }}
          </p>
        </div>

        <!-- Pagination -->
        <div v-if="result.meta.lastPage > 1" class="flex items-center justify-center gap-2 mt-4">
          <button
            v-for="page in result.meta.lastPage"
            :key="page"
            class="text-sm px-3 py-1.5 rounded-lg border transition-colors"
            :class="
              page === result.meta.currentPage
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-gray-300 text-gray-600 hover:border-gray-400'
            "
            @click="load(page)"
          >
            {{ page }}
          </button>
        </div>
      </div>

      <div v-else class="text-center py-16 text-gray-400 text-sm">
        No compliance checks yet. Run your first check to see history here.
      </div>
    </template>
  </div>
</template>
