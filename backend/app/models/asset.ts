import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, scope } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Brand from '#models/brand'

export default class Asset extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare brandId: string

  @column()
  declare fileName: string

  @column()
  declare filePath: string

  @column()
  declare fileType: string

  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    consume: (value: string | string[]) => (typeof value === 'string' ? JSON.parse(value) : value),
  })
  declare tags: string[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Brand)
  declare brand: BelongsTo<typeof Brand>

  static withTag = scope((query: any, tag: string) => {
    query.whereRaw(`tags::jsonb @> ?::jsonb`, [JSON.stringify([tag])])
  })

  static forBrand = scope((query: any, brandId: string) => {
    query.where('brand_id', brandId)
  })
}
