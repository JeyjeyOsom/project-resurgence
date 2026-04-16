import type { HttpContext } from '@adonisjs/core/http'
import Brand from '#models/brand'
import Asset from '#models/asset'

export default class ListAssetsController {
  async handle({ params, request, response }: HttpContext) {
    await Brand.findOrFail(params.brandId)

    const tag = request.qs().tag as string | undefined

    const query = Asset.query()
      .apply((scopes) => scopes.forBrand(params.brandId))
      .orderBy('created_at', 'desc')

    if (tag) {
      query.apply((scopes) => scopes.withTag(tag))
    }

    const assets = await query
    return response.ok(assets)
  }
}
