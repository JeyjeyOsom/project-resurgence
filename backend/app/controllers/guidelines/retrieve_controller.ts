import type { HttpContext } from '@adonisjs/core/http'
import Brand from '#models/brand'
import BrandGuideline from '#models/brand_guideline'

export default class RetrieveGuidelineController {
  async handle({ params, response }: HttpContext) {
    await Brand.findOrFail(params.brandId)

    const guidelines = await BrandGuideline.query().where('brand_id', params.brandId).first()

    if (!guidelines) {
      return response.notFound({ message: 'No guidelines configured for this brand yet.' })
    }

    return response.ok(guidelines)
  }
}
