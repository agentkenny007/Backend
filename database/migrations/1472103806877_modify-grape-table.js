'use strict'

const Schema = use('Schema')

class ModifyGrapeTableSchema extends Schema {

  up () {
    this.table('grapes', (table) => {
    	table.dropColumn('grapeObj');
    })
  }

  down () {
    this.table('grapes', (table) => {
    	table.string('grapeObj');
    })
  }

}
module.exports = ModifyGrapeTableSchema
