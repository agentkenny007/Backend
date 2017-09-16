'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

    static get hidden(){
        return ['password']
    }

    apiTokens () {
        return this.hasMany('App/Model/Token')
    }

    campaigns () {
        return this.hasMany('App/Model/Campaigns')
    }

}

module.exports = User
