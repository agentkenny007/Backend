'use strict'

const Schema = use('Schema')

class ModifyGrapeTableSchema extends Schema {

  up () {
    this.create('modify-grape-table', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('modify-grape-table')
  }

}

module.exports = ModifyGrapeTableSchema
