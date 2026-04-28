import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, hasMany } from '@adonisjs/lucid/orm'
import type { HasOne, HasMany } from '@adonisjs/lucid/types/relations'
import BrandGuideline from '#models/brand_guideline'
import Asset from '#models/asset'
import ComplianceCheck from '#models/compliance_check'

export default class Brand extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => BrandGuideline)
  declare guidelines: HasOne<typeof BrandGuideline>

  @hasMany(() => Asset)
  declare assets: HasMany<typeof Asset>

  @hasMany(() => ComplianceCheck)
  declare complianceChecks: HasMany<typeof ComplianceCheck>
}
