'use strict'

const Schema = use('Schema')

class CreateCampaignsSchema extends Schema {

  up () {
    this.create('campaigns', (table) => {
      table.increments()
      table.string('title')
      table.string('description')
      table.integer('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('campaigns')
  }

}

module.exports = CreateCampaignsSchema
