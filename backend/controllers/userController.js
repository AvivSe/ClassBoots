const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {
    static getToken(user) {
        // TODO: Edit the secret with local variable.
        return { token: jwt.sign(
            {
                email: user.email,
                userId: user._id
            },
            'todo_edit_this_secret',
            {
                expiresIn: "1h"
            }).cath(error => {
                console.log(error);
            })
        };
    };

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
        return result;
    };

    static async createUser(body) {
        let error = false;
        let user = await User.findOne({email: body.email});
        if (user) {
            return {error: true, details: "email address already exists."};
        }
        // TODO: Check body schema
        body.password = await bcrypt.hash(body.password, await bcrypt.genSalt(10));

        user = new User(body);

        await user.save(err => {
            if (err) {
                error = true;
            }
        });

        return error?{error: true, details: "cannot save to db"}:this.getToken(user);
    };

    static async login(body) {
        let result = null;
        let user = await User.findOne({email: body.email});

        if (user && await bcrypt.compare(body.password, user.password)) {
            return this.getToken(user);
        } else {
            result = "Invalid email or password.";
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