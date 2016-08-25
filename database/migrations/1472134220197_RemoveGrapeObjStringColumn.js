'use strict'

const Schema = use('Schema')

class RemoveGrapeObjStringColumnSchema extends Schema {

  up () {
    this.table('grapes', (table) => {
      table.dropColumn("grapeObj");
    })
  }

  down () {
    this.table('grapes', (table) => {
      table.string("grapeObj");
    })
  }

}

module.exports = RemoveGrapeObjStringColumnSchema
