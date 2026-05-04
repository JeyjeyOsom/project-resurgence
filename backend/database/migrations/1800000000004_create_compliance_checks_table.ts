import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'compliance_checks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table
        .uuid('brand_id')
        .notNullable()
        .references('id')
        .inTable('brands')
        .onDelete('CASCADE')
      table.text('input_text').notNullable()
      table.decimal('tone_score', 5, 2).notNullable().defaultTo(0)
      table.jsonb('flagged_inconsistencies').notNullable().defaultTo('[]')
      table.jsonb('suggestions').notNullable().defaultTo('[]')
      // Immutable — no updated_at
      table.timestamp('created_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
