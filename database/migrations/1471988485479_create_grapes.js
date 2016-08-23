'use strict'

const Schema = use('Schema')

class CreateGrapesSchema extends Schema {

  up () {
    this.create('grapes', (table) => {
      table.increments()
      table.string('grapeObj')
      table.integer('campaigns_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('grapes')
  }

}

module.exports = CreateGrapesSchema
