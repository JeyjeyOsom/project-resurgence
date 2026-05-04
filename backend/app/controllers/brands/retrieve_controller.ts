import type { HttpContext } from '@adonisjs/core/http'
import Brand from '#models/brand'

export default class RetrieveBrandController {
  async handle({ params, response }: HttpContext) {
    const brand = await Brand.query()
      .where('id', params.id)
      .preload('guidelines')
      .preload('assets', (q: any) => q.orderBy('created_at', 'desc').limit(10))
      .firstOrFail()

    return response.ok(brand)
  }
}
