import type { HttpContext } from '@adonisjs/core/http'
import Brand from '#models/brand'
import BrandGuideline from '#models/brand_guideline'
import ComplianceCheck from '#models/compliance_check'
import GeminiService from '#services/gemini_service'
import { createComplianceCheckValidator } from '#validators/compliance_check_validator'

export default class CreateComplianceCheckController {
  async handle({ params, request, response }: HttpContext) {
    await Brand.findOrFail(params.brandId)

    const payload = await request.validateUsing(createComplianceCheckValidator)

    const guidelines = await BrandGuideline.query().where('brand_id', params.brandId).first()

    const gemini = new GeminiService()
    const result = await gemini.checkCompliance(payload.inputText, guidelines ?? null)

    const check = await ComplianceCheck.create({
      brandId: params.brandId,
      inputText: payload.inputText,
      toneScore: result.toneScore,
      flaggedInconsistencies: result.flaggedInconsistencies,
      suggestions: result.suggestions,
    })

    return response.created(check)
  }
}
