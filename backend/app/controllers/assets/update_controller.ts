import type { HttpContext } from '@adonisjs/core/http'
import Asset from '#models/asset'
import { updateAssetValidator } from '#validators/asset_validator'

export default class UpdateAssetController {
  async handle({ params, request, response }: HttpContext) {
    const asset = await Asset.findOrFail(params.id)
    const payload = await request.validateUsing(updateAssetValidator)

    if (payload.tags !== undefined) asset.tags = payload.tags
    if (payload.fileType !== undefined) asset.fileType = payload.fileType

    await asset.save()
    return response.ok(asset)
  }
}
