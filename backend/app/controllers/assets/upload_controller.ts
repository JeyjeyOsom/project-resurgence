import { join } from 'node:path'
import { mkdir } from 'node:fs/promises'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import Brand from '#models/brand'
import Asset from '#models/asset'
import { storeAssetValidator } from '#validators/asset_validator'

export default class UploadAssetController {
  async handle({ params, request, response }: HttpContext) {
    await Brand.findOrFail(params.brandId)

    const file = request.file('file', { size: '50mb' })

    if (!file) {
      return response.badRequest({ message: 'No file uploaded.' })
    }

    const uploadDir = app.makePath('storage', 'uploads', 'brands', params.brandId)
    await mkdir(uploadDir, { recursive: true })

    const fileName = `${Date.now()}-${file.clientName}`
    await file.move(uploadDir, { name: fileName, overwrite: true })

    if (!file.isValid) {
      return response.badRequest({ message: file.errors[0]?.message ?? 'File upload failed.' })
    }

    const filePath = join(uploadDir, fileName)
    const payload = await request.validateUsing(storeAssetValidator)

    let tags: string[] = []
    const rawTags = request.input('tags') as string | undefined
    if (rawTags) {
      try {
        const parsed = JSON.parse(rawTags)
        if (Array.isArray(parsed)) tags = parsed.filter((t) => typeof t === 'string')
      } catch {
        // malformed JSON — keep empty array
      }
    }

    const fileType = payload.fileType ?? 'other'

    const asset = await Asset.create({
      brandId: params.brandId,
      fileName,
      filePath,
      fileType,
      tags,
    })

    return response.created(asset)
  }
}
