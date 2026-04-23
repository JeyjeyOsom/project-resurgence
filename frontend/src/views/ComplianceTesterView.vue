<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { useComplianceChecker } from '@/composables/useComplianceChecker'
import ComplianceResultItem from '@/components/ComplianceResultItem.vue'

const route = useRoute()
const brandId = route.params.id as string

const { inputText, result, loading, error, runCheck } = useComplianceChecker(brandId)
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <RouterLink :to="`/brands/${brandId}/checks`" class="text-gray-400 hover:text-gray-600 text-sm">
        ← Brand
      </RouterLink>
      <h1 class="text-2xl font-bold text-gray-900">Compliance Checker</h1>
    </div>

    <!-- Split pane -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Input -->
      <div class="bg-white border border-gray-200 rounded-xl p-6 flex flex-col">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Content to check
        </label>
        <textarea
          v-model="inputText"
          rows="10"
          placeholder="Paste your social post, PR copy, email draft, ad copy…"
          class="flex-1 w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div class="flex items-center justify-between mt-4">
          <span class="text-xs text-gray-400">{{ inputText.length }} characters</span>
          <button
            class="bg-indigo-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            :disabled="loading || !inputText.trim()"
            @click="runCheck"
          >
            {{ loading ? 'Checking…' : 'Check Compliance' }}
          </button>
        </div>
        <div v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</div>
      </div>

      <!-- Results -->
      <div class="bg-white border border-gray-200 rounded-xl p-6">
        <h2 class="text-sm font-semibold text-gray-700 mb-4">Results</h2>

        <div v-if="loading" class="flex items-center justify-center py-16 text-gray-400 text-sm">
          <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Analysing with Gemini AI…
        </div>

        <ComplianceResultItem v-else-if="result" :result="result" />

        <div v-else class="flex items-center justify-center py-16 text-gray-400 text-sm text-center">
          <div>
            <p class="text-4xl mb-3">🤖</p>
            <p>Paste content on the left and click<br />"Check Compliance" to get started.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
