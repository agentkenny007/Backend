'use strict'

const Schema = use('Schema')

class AddJsonGrapeColumnSchema extends Schema {

  up () {
    this.table('grapes', (table) => {
      table.json("grapeObj");
    })
  }

  down () {
    this.table('grapes', (table) => {
      table.dropColumn("grapeObj");
    })
  }

}

module.exports = AddJsonGrapeColumnSchema
