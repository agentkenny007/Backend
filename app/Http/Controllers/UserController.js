'use strict';

const User = use('App/Model/User');
const Hash = use('Hash');

class UserController {
    * store(req, resp){
        const input = req.only('email', 'password');
        input.password = yield Hash.make(input.password);
        const user = yield User.create(input);
        console.log(input);
        return resp.json(user.toJSON());
    }

    * login(req, resp){
        const input = req.only('email', 'password');
        try {
            const user = yield User.findBy('email', input.email);
            if (!user) throw new Error('User not found.');

            const verify = yield Hash.verify(input.password, user.password);
            if (!verify) throw new Error('Incorrect Password.');

            user.access_token = yield req.auth.generate(user);
            return resp.json(user.toJSON());
        } catch(e){
            return resp.status(401).json({ error: e.message });
        }
    }

    * show(req, resp){
        return resp.json(req.authUser);
    }
}

module.exports = UserController;
