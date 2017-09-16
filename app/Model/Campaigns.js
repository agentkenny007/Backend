'use strict'

const Lucid = use('Lucid')

class Campaigns extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

  grapes () {
        return this.hasMany('App/Model/Grape')
    }

}

module.exports = Campaigns
