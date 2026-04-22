import type { HttpContext } from '@adonisjs/core/http'
import Brand from '#models/brand'
import { updateBrandValidator } from '#validators/brand_validator'

export default class UpdateBrandController {
  async handle({ params, request, response }: HttpContext) {
    const brand = await Brand.findOrFail(params.id)
    const payload = await request.validateUsing(updateBrandValidator)
    brand.merge(payload)
    await brand.save()
    return response.ok(brand)
  }
}
