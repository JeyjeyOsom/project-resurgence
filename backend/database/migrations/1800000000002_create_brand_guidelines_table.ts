import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'brand_guidelines'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table
        .uuid('brand_id')
        .notNullable()
        .references('id')
        .inTable('brands')
        .onDelete('CASCADE')
        .unique() // enforces 1:1
      table.string('tone').notNullable().defaultTo('professional')
      table.jsonb('banned_words').notNullable().defaultTo('[]')
      table.jsonb('preferred_phrases').notNullable().defaultTo('[]')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
