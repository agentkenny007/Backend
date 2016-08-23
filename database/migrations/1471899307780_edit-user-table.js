'use strict'

const Schema = use('Schema')

class EditUserTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
        table.string('firstname')
        table.string('lastname')
        table.string('profile_pic')
        table.boolean('public').defaultTo(false)
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = EditUserTableSchema
