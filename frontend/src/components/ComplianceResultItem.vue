<script setup lang="ts">
import type { ComplianceCheck } from '@/types'

defineProps<{ result: ComplianceCheck }>()

const RADIUS = 40
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function scoreLabel(score: number) {
  if (score >= 75) return 'On-brand'
  if (score >= 50) return 'Needs work'
  return 'Off-brand'
}

function scoreColors(score: number) {
  if (score >= 75) return { ring: 'stroke-green-500', bg: 'bg-green-50', text: 'text-green-700' }
  if (score >= 50) return { ring: 'stroke-yellow-500', bg: 'bg-yellow-50', text: 'text-yellow-700' }
  return { ring: 'stroke-red-500', bg: 'bg-red-50', text: 'text-red-700' }
}

function gaugeOffset(score: number) {
  return CIRCUMFERENCE * (1 - score / 100)
}
</script>

<template>
  <div>
    <!-- Circular gauge -->
    <div class="flex items-center justify-center mb-6">
      <div class="relative">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" :r="RADIUS" fill="none" stroke="#e5e7eb" stroke-width="10" />
          <circle
            cx="60"
            cy="60"
            :r="RADIUS"
            fill="none"
            :class="scoreColors(result.toneScore).ring"
            stroke-width="10"
            stroke-linecap="round"
            :stroke-dasharray="CIRCUMFERENCE"
            :stroke-dashoffset="gaugeOffset(result.toneScore)"
            transform="rotate(-90 60 60)"
            style="transition: stroke-dashoffset 0.6s ease"
          />
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-2xl font-bold text-gray-900">{{ result.toneScore }}</span>
          <span class="text-xs text-gray-500">/ 100</span>
        </div>
      </div>
    </div>

    <!-- Label badge -->
    <div class="flex justify-center mb-6">
      <span
        class="text-sm font-semibold px-4 py-1 rounded-full"
        :class="[scoreColors(result.toneScore).bg, scoreColors(result.toneScore).text]"
      >
        {{ scoreLabel(result.toneScore) }}
      </span>
    </div>

    <!-- Flagged inconsistencies -->
    <div v-if="result.flaggedInconsistencies.length" class="mb-5">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        Flagged Issues
      </h3>
      <ul class="space-y-1.5">
        <li
          v-for="flag in result.flaggedInconsistencies"
          :key="flag"
          class="flex items-start gap-2 text-sm text-gray-700"
        >
          <span class="text-red-500 shrink-0 mt-0.5">⚠</span>
          {{ flag }}
        </li>
      </ul>
    </div>

    <!-- Suggestions -->
    <div v-if="result.suggestions.length">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        Suggestions
      </h3>
      <ul class="space-y-1.5">
        <li
          v-for="sug in result.suggestions"
          :key="sug"
          class="flex items-start gap-2 text-sm text-gray-700"
        >
          <span class="text-indigo-500 shrink-0 mt-0.5">💡</span>
          {{ sug }}
        </li>
      </ul>
    </div>
  </div>
</template>
