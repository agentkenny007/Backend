'use strict'

const Lucid = use('Lucid')



class Grapes extends Lucid {

  campaign () {
    return this.belongsTo('App/Model/Campaigns')
  }



}

module.exports = Grapes
