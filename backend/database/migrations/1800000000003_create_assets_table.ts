import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'assets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table
        .uuid('brand_id')
        .notNullable()
        .references('id')
        .inTable('brands')
        .onDelete('CASCADE')
      table.string('file_name').notNullable()
      table.string('file_path').notNullable()
      table.string('file_type').notNullable().defaultTo('other')
      table.jsonb('tags').notNullable().defaultTo('[]')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
