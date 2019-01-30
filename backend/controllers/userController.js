const User = require('../models/user');
const errorsController = require('../controllers/errorsController');

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
            }).catch(error => {
                console.log(error);
                errorsController.logger(error,"invalid");
            })
        };
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
                errorsController.logger(err,error);
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
            errorsController.logger(err,result);

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
            errorsController.logger(err,result);
        });
        return result;
    };

    static async getUserCollection(body) {
        let result = null;
        // TODO: error handler
        // TODO: we can use body as filters.
        result = await User.find(err => {
            if (err) {
                result = err
                errorsController.logger(err,result);
            }
        });
        return result;
    };
}

module.exports = UserController;