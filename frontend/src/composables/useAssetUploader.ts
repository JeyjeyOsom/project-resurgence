import { ref } from 'vue'
import { assetsApi } from '@/api'
import type { Asset } from '@/types'
import { useToast } from '@/composables/useToast'

export function useAssetUploader(brandId: string, onUploaded: (asset: Asset) => void) {
  const { showToast } = useToast()
  const uploading = ref(false)

  function guessFileType(name: string): string {
    const ext = name.split('.').pop()?.toLowerCase() ?? ''
    if (['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'].includes(ext)) return 'logo'
    if (['ttf', 'otf', 'woff', 'woff2'].includes(ext)) return 'typography'
    if (['pdf', 'doc', 'docx', 'txt', 'md'].includes(ext)) return 'document'
    return 'other'
  }

  async function uploadFile(file: File, tags: string[] = []) {
    uploading.value = true
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('fileType', guessFileType(file.name))
      fd.append('tags', JSON.stringify(tags))
      const asset = await assetsApi.upload(brandId, fd)
      onUploaded(asset)
    } catch (err) {
      showToast((err as Error).message, 'error')
    } finally {
      uploading.value = false
    }
  }

  return { uploading, uploadFile }
}
