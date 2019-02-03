const User = require('../models/user');
const bcrypt = require('bcrypt');
const Token = require('../utils/Token');

/**
 * Created by Aviv Segal & Gal Keidar on Dec 2018
 */
class UserController {
    /**
     * Created by Aviv Segal on Dec 2018
     * @param user
     * @returns {{token: *}}
     */
    static getToken(user) {
        // TODO: Edit the secret with local variable.
        return { error:false, details: new Token(user) };
    };

    /**
     * Created by Aviv Segal on Dec 2018
     * @param body
     * @returns Token
     */
    static async createUser(body) {
        let error = false;
        let user = await User.findOne({email: body.email});
        // if user is not null, it's means that we already have user with this email address.
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

        return error ? {error: "cannot save to db" } : this.getToken(user);
    };

    /**
     * Created by Aviv Segal on Dec 2018
     * @param body
     * @returns Token
     */
    static async login(body) {
        let user;
        return (user = await User.findOne({email: body.email})) && await bcrypt.compare(body.password, user.password) ?
            this.getToken(user) : { error: true, description:"Invalid email or password." };
    };

    /**
     * Created by Aviv Segal on Dec 2018
     * @param email
     * @returns User Details
     */
    static async getUser(email) {
        let result = null;

        await User.findOne({email: email}).then(user => {
            if (user) {
                result = user;
            }
            else
                result = {error: true, description:"email not found"};
        }).catch(err => {
            result = err;
        });
        return result;
    };

    /**
     * Created by Aviv Segal on Dec 2018
     * @param body
     * @returns All User Collection
     */
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
}

module.exports = UserController;