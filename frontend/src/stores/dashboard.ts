import { defineStore } from 'pinia'
import { ref } from 'vue'
import { checksApi, assetsApi } from '@/api'
import type { ComplianceCheck, Asset } from '@/types'

export const useDashboardStore = defineStore('dashboard', () => {
  const recentChecks = ref<ComplianceCheck[]>([])
  const recentAssets = ref<Asset[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Trend: last 10 checks scores
  const scoreTrend = ref<{ label: string; score: number }[]>([])

  async function loadDashboard(brandId: string) {
    loading.value = true
    error.value = null
    try {
      const [checksResult, assetsResult] = await Promise.all([
        checksApi.history(brandId, 1),
        assetsApi.list(brandId),
      ])
      recentChecks.value = checksResult.data.slice(0, 10)
      recentAssets.value = assetsResult.slice(0, 6)

      // Build score trend from recent checks (oldest → newest)
      scoreTrend.value = [...recentChecks.value]
        .reverse()
        .map((c, i) => ({
          label: `#${i + 1}`,
          score: c.toneScore,
        }))
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  return {
    recentChecks,
    recentAssets,
    scoreTrend,
    loading,
    error,
    loadDashboard,
  }
})
