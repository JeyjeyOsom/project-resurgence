import type { HttpContext } from '@adonisjs/core/http'
import Brand from '#models/brand'

export default class ListBrandsController {
  async handle({ response }: HttpContext) {
    const brands = await Brand.query().orderBy('created_at', 'desc')
    return response.ok(brands)
  }
}
