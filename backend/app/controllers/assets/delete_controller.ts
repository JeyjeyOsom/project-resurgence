import { unlink } from 'node:fs/promises'
import type { HttpContext } from '@adonisjs/core/http'
import Asset from '#models/asset'

export default class DeleteAssetController {
  async handle({ params, response }: HttpContext) {
    const asset = await Asset.findOrFail(params.id)

    try {
      await unlink(asset.filePath)
    } catch {
      // File missing is acceptable
    }

    await asset.delete()
    return response.noContent()
  }
}
