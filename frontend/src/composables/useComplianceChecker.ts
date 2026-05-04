import { ref } from 'vue'
import { checksApi } from '@/api'
import type { ComplianceCheck } from '@/types'
import { useToast } from '@/composables/useToast'

export function useComplianceChecker(brandId: string) {
  const { showToast } = useToast()

  const inputText = ref('')
  const result = ref<ComplianceCheck | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function runCheck() {
    if (!inputText.value.trim()) return
    loading.value = true
    error.value = null
    result.value = null
    try {
      result.value = await checksApi.run(brandId, { inputText: inputText.value })
    } catch (err) {
      const message = (err as Error).message
      error.value = message
      showToast(message, 'error')
    } finally {
      loading.value = false
    }
  }

  return { inputText, result, loading, error, runCheck }
}
