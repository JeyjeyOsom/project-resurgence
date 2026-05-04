import type { HttpContext } from '@adonisjs/core/http'
import Brand from '#models/brand'
import { createBrandValidator } from '#validators/brand_validator'

export default class CreateBrandController {
  async handle({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createBrandValidator)
    const brand = await Brand.create(payload)
    return response.created(brand)
  }
}
