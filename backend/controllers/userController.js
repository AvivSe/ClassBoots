const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserController {
    static async getUserCollection(body) {
        let result = { status: 200, data: null};
        // TODO: error handler
        // TODO: we can use body as filters.
        result.data = await User.find(err => {
            if (err) {
                result.status = 400;
                result.data = err;
            }
        });
        //console.log(result);
        return result;
    };

    static async createUser(body) {
        let result = { status: 201, data: body};
        // TODO: Check body schema
        body.password =  await bcrypt.hash(body.password,await bcrypt.genSalt(10));

        const user = new User(body);

        await user.save(err => {
            if (err) {
                result.status = 400;
                result.data = err;
            }
        });
        //console.log(result);
        return result;
    };

    static async getUser(email) {
        //{_id: req.params.id}
        let result = { status: null, data: null};

        await User.findOne({email: email}).then(user => {
            if(!user) {
                result. status = 400;
                result.data = null;
            } else {
                result.status = 200;
                result.data = user;
            }
        }).catch(err=> {
            result.status = 400;
            result.data = err;
        });
        //console.log(result);
        return result;
    };
}
module.exports = UserController;