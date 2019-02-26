const User = require('../models/user');
const bcrypt = require('bcrypt');
const Token = require('../utils/Token');
const History= require('../models/history');
const Video = require('../models/video');
class UserController {
    static getToken(user) {
        // TODO: Edit the secret with local variable.
        return new Token(user);
    };

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
        var history =new History({user:user._id});
        history.save();

        await user.save(err => {
            if (err) {
                error = true;
            }
        });

        return error ? {error: true, description: "cannot save to db" } : this.getToken(user);
    };
    static async login(body) {
        let user;
        return (user = await User.findOne({email: body.email})) && await bcrypt.compare(body.password, user.password) ?
            this.getToken(user) : { error: true, description: "Invalid email or password." };
    };

    static async getUserHistory(userId) {
        let result = null;
        await History.findOne({user:userId}).then(history=>{
            if(history) {
                result = history;
            } else {
                result = {error: "history not found"};
            }
        });
        return result;
    }

    static async getUserWatchesHistory(userId) {
        let history = [];
        history = await this.getUserHistory(userId);
        history = history.watches;
        history.sort(function(a,b){return a.date - b.date});
        history = history.slice(0,10);
        let result = [];
        for(let i = 0; i < history.length; i++) {
            result.push(await Video.findById(history[i].video));
        }
        return result;
    }

    static async getUser(email) {
        let result = null;

        await User.findOne({email: email}).then(user => {
            if (user) {
                result = user;
            }
            else
                result = {error: "email not found"};
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