<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useBrandStore } from '@/stores/brand'
import { useDashboardStore } from '@/stores/dashboard'
import BrandSelector from '@/components/BrandSelector.vue'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const brandStore = useBrandStore()
const dashStore = useDashboardStore()

async function load() {
  await brandStore.fetchBrands()
  if (brandStore.activeBrandId) {
    await dashStore.loadDashboard(brandStore.activeBrandId)
  }
}

onMounted(load)
watch(() => brandStore.activeBrandId, (id) => {
  if (id) dashStore.loadDashboard(id)
})

const chartData = () => ({
  labels: dashStore.scoreTrend.map((p) => p.label),
  datasets: [
    {
      label: 'Tone Score',
      data: dashStore.scoreTrend.map((p) => p.score),
      backgroundColor: 'rgba(99, 102, 241, 0.7)',
      borderRadius: 4,
    },
  ],
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    y: {
      min: 0,
      max: 100,
      ticks: { stepSize: 20 },
    },
  },
}

function scoreColor(score: number) {
  if (score >= 75) return 'text-green-600'
  if (score >= 50) return 'text-yellow-600'
  return 'text-red-600'
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="!brandStore.activeBrand && !brandStore.loading" class="text-center py-24">
      <p class="text-gray-500 text-lg mb-4">No brands yet.</p>
      <RouterLink
        to="/brands"
        class="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Create your first brand
      </RouterLink>
    </div>

    <template v-else>
      <!-- Brand selector -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div class="flex items-center gap-3">
          <label class="text-sm text-gray-500">Active brand:</label>
          <BrandSelector
            :brands="brandStore.brands"
            :model-value="brandStore.activeBrandId"
            @update:model-value="brandStore.setActiveBrand"
          />
          <RouterLink
            v-if="brandStore.activeBrandId"
            :to="`/brands/${brandStore.activeBrandId}/check`"
            class="bg-indigo-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Run Check
          </RouterLink>
        </div>
      </div>

      <div v-if="dashStore.loading" class="text-center py-16 text-gray-400">Loading…</div>

      <template v-else>
        <!-- Stats row -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div class="bg-white rounded-xl border border-gray-200 p-5">
            <p class="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
              Total checks
            </p>
            <p class="text-3xl font-bold text-gray-900">{{ dashStore.recentChecks.length }}</p>
          </div>
          <div class="bg-white rounded-xl border border-gray-200 p-5">
            <p class="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Avg score</p>
            <p
              class="text-3xl font-bold"
              :class="
                scoreColor(
                  dashStore.recentChecks.length
                    ? Math.round(
                        dashStore.recentChecks.reduce((s, c) => s + c.toneScore, 0) /
                          dashStore.recentChecks.length,
                      )
                    : 0,
                )
              "
            >
              {{
                dashStore.recentChecks.length
                  ? Math.round(
                      dashStore.recentChecks.reduce((s, c) => s + c.toneScore, 0) /
                        dashStore.recentChecks.length,
                    )
                  : '–'
              }}
            </p>
          </div>
          <div class="bg-white rounded-xl border border-gray-200 p-5">
            <p class="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Assets</p>
            <p class="text-3xl font-bold text-gray-900">{{ dashStore.recentAssets.length }}</p>
          </div>
        </div>

        <!-- Main grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Score trend chart -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <h2 class="text-sm font-semibold text-gray-700 mb-4">Compliance Score Trend</h2>
            <div v-if="dashStore.scoreTrend.length">
              <Bar :data="chartData()" :options="chartOptions" />
            </div>
            <div v-else class="text-center py-10 text-gray-400 text-sm">
              No compliance checks yet.
            </div>
          </div>

          <!-- Recent checks -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-sm font-semibold text-gray-700">Recent Checks</h2>
              <RouterLink
                v-if="brandStore.activeBrandId"
                :to="`/brands/${brandStore.activeBrandId}/checks`"
                class="text-xs text-indigo-600 hover:underline"
              >
                View all
              </RouterLink>
            </div>
            <div v-if="dashStore.recentChecks.length" class="space-y-3">
              <div
                v-for="check in dashStore.recentChecks.slice(0, 5)"
                :key="check.id"
                class="flex items-start justify-between gap-2 text-sm"
              >
                <p class="text-gray-600 truncate flex-1">{{ check.inputText }}</p>
                <span
                  class="font-semibold shrink-0"
                  :class="scoreColor(check.toneScore)"
                >
                  {{ check.toneScore }}
                </span>
              </div>
            </div>
            <div v-else class="text-center py-10 text-gray-400 text-sm">No checks yet.</div>
          </div>

          <!-- Recent assets -->
          <div class="bg-white rounded-xl border border-gray-200 p-6 lg:col-span-2">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-sm font-semibold text-gray-700">Recent Assets</h2>
              <RouterLink
                v-if="brandStore.activeBrandId"
                :to="`/brands/${brandStore.activeBrandId}/assets`"
                class="text-xs text-indigo-600 hover:underline"
              >
                Manage assets
              </RouterLink>
            </div>
            <div v-if="dashStore.recentAssets.length" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div
                v-for="asset in dashStore.recentAssets"
                :key="asset.id"
                class="border border-gray-200 rounded-lg p-3 text-center"
              >
                <div class="text-2xl mb-1">
                  {{ asset.fileType === 'logo' ? '🖼️' : asset.fileType === 'typography' ? '🔤' : asset.fileType === 'color' ? '🎨' : '📄' }}
                </div>
                <p class="text-xs text-gray-600 truncate">{{ asset.fileName }}</p>
                <p class="text-xs text-gray-400">{{ asset.fileType }}</p>
              </div>
            </div>
            <div v-else class="text-center py-10 text-gray-400 text-sm">No assets uploaded yet.</div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
