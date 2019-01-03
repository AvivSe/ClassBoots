const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserController {
    static async getUserCollection(body) {
        let result = {status: 200, data: null};
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
        let result = null;
        // TODO: Check body schema
        body.password = await bcrypt.hash(body.password, await bcrypt.genSalt(10));

        const user = new User(body);

        await user.save(err => {
            if (err) {
                result = err;
            } else {
                // TODO add token!!!
                result = "token";
            }
        });
        return result;
    };

    static async login(body) {
        let result = null;
        const invalid = "Invalid email or password.";
        let user = await User.findOne({email: body.email});
        if (!user) {
            result = invalid;
        }
        else if (body.password === user.password) {
            // TODO add token!!!
            return "token";
        }
        else
        {
            result = invalid;
        }

        return result;


    };

    static async getUser(email) {
        let result = null;

        await User.findOne({email: email}).then(user => {
            if (user)
                result = user;
            else
                result = {"ERROR":"email not found"};
        }).catch(err => {
            result = err;
        });
        return result;
    };
}

module.exports = UserController;