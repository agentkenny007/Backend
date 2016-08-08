'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

    static get hidden(){
        return ['password']
    }

    apiTokens () {
        return this.hasMany('App/Model/Token')
    }

}

module.exports = User
