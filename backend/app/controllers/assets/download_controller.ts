import type { HttpContext } from '@adonisjs/core/http'
import Asset from '#models/asset'

export default class DownloadAssetController {
  async handle({ params, response }: HttpContext) {
    const asset = await Asset.findOrFail(params.id)
    return response.download(asset.filePath)
  }
}
