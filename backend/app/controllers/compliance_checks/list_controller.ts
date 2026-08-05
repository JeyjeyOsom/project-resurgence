import type { HttpContext } from '@adonisjs/core/http'
import Brand from '#models/brand'
import ComplianceCheck from '#models/compliance_check'

export default class ListComplianceChecksController {
  async handle({ params, request, response }: HttpContext) {
    await Brand.findOrFail(params.brandId)

    const page = Number(request.qs().page ?? 1)
    const perPage = 10

    const checks = await ComplianceCheck.query()
      .where('brand_id', params.brandId)
      .orderBy('created_at', 'desc')
      .paginate(page, perPage)

    return response.ok(checks)
  }
}
