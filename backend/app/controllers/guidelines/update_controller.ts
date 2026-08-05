import type { HttpContext } from '@adonisjs/core/http'
import Brand from '#models/brand'
import BrandGuideline from '#models/brand_guideline'
import { updateGuidelineValidator } from '#validators/guideline_validator'

export default class UpdateGuidelineController {
  async handle({ params, request, response }: HttpContext) {
    await Brand.findOrFail(params.brandId)

    const payload = await request.validateUsing(updateGuidelineValidator)

    const guidelines = await BrandGuideline.updateOrCreate(
      { brandId: params.brandId },
      {
        tone: payload.tone,
        bannedWords: payload.bannedWords ?? [],
        preferredPhrases: payload.preferredPhrases ?? [],
      }
    )

    return response.ok(guidelines)
  }
}
