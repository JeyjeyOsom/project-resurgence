import type { HttpContext } from '@adonisjs/core/http'
import Brand from '#models/brand'

export default class DeleteBrandController {
  async handle({ params, response }: HttpContext) {
    const brand = await Brand.findOrFail(params.id)
    await brand.delete()
    return response.noContent()
  }
}
