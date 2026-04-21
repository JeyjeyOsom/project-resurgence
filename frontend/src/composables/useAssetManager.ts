import { ref } from 'vue'
import { assetsApi } from '@/api'
import type { Asset } from '@/types'
import { useToast } from '@/composables/useToast'

export function useAssetManager(brandId: string) {
  const { showToast } = useToast()

  const assets = ref<Asset[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const tagFilter = ref('')

  async function loadAssets() {
    loading.value = true
    error.value = null
    try {
      assets.value = await assetsApi.list(brandId, tagFilter.value || undefined)
    } catch (err) {
      const message = (err as Error).message
      error.value = message
      showToast(message, 'error')
    } finally {
      loading.value = false
    }
  }

  async function handleRemove(assetId: string) {
    try {
      await assetsApi.remove(assetId)
      assets.value = assets.value.filter((a) => a.id !== assetId)
    } catch (err) {
      const message = (err as Error).message
      error.value = message
      showToast(message, 'error')
    }
  }

  function addAsset(asset: Asset) {
    assets.value.unshift(asset)
  }

  return { assets, loading, error, tagFilter, loadAssets, handleRemove, addAsset }
}
