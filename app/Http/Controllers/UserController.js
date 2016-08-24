'use strict'

const User = use('App/Model/User')
const Hash = use('Hash')

class UserController {
    * login (req, resp) {
        const input = req.only('email', 'password')
        try {
            const user = yield User.findBy('email', input.email)
            if (!user) throw new Error('User not found.')

            const verify = yield Hash.verify(input.password, user.password)
            if (!verify) throw new Error('Incorrect Password.')

            user.access_token = yield req.auth.generate(user)
            return resp.json(user.toJSON())
        } catch(e){
            return resp.status(401).json({ error: e.message })
        }
    }

    * save (req, resp) {
        const   user = req.authUser
                input = req.only('firstname, lastname, email, password, profile_pic, public')
        console.log(user);
        input.password = yield Hash.make(input.password)
        // yield Database
        //     .table('users')
        //     .where('email', 'virk')
        //     .update('lastname', 'Virk')
    }

    * show (req, resp) {
        return resp.json(req.authUser)
    }

    * store (req, resp) {
        const input = req.only('email', 'password')
        input.password = yield Hash.make(input.password)
        const user = yield User.create(input)
        console.log(input)

        return resp.json(user.toJSON())
    }

    * update (req, resp) {

    }

    * getCampaign (request, resp){
        const user = request.authUser
        const camps = user.campaigns().fetch();
        return resp.json(camps)

    }
}

module.exports = UserController
