import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, scope } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Brand from '#models/brand'

export default class ComplianceCheck extends BaseModel {
  static table = 'compliance_checks'

  // Immutable — no autoUpdate
  static readonly selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare brandId: string

  @column()
  declare inputText: string

  @column()
  declare toneScore: number

  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    consume: (value: string | string[]) => (typeof value === 'string' ? JSON.parse(value) : value),
  })
  declare flaggedInconsistencies: string[]

  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    consume: (value: string | string[]) => (typeof value === 'string' ? JSON.parse(value) : value),
  })
  declare suggestions: string[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Brand)
  declare brand: BelongsTo<typeof Brand>

  static forBrand = scope((query: any, brandId: string) => {
    query.where('brand_id', brandId)
  })
}
