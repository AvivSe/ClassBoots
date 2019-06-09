const User = require('../models/user');
const bcrypt = require('bcrypt');
const Token = require('../utils/Token');
const History= require('../models/history');
const Video = require('../models/video');
const errorsController =require('../controllers/errorsController');
const MyApriori = require("../utils/apriori");

class UserController {


    static async getRelatedVideos(userId) {
        let result = [];
        let history  = (await this.getUserWatchesHistory(userId));

        history = history.filter(bulbul => bulbul);

        history = history.map(video => video._id.toString());

        for (let i = 0; i < history.length; i++) {
            result = [...result, ...(await MyApriori.getRelatedVideos(history[i]))];
        }

        return result;
    }


    static getToken(user) {
        // TODO: Edit the secret with local variable.
        return new Token(user);
    };


    static async createUser(body) {
        if(!body.email || !body.password )
            return {error:true,description:'you don\'t have validation'};

        try {
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
        }
       catch (e) {
           errorsController.logger({error:'createUser',description:e});
           return {error:true,description:'createUser: '+e};
       }
    };
    static async login(body) {
        if(!body.email || !body.password )
            return {error:true,description:'you don\'t have validation'};

        try {
            let user;
            return (user = await User.findOne({email: body.email})) && await bcrypt.compare(body.password, user.password) ?
                this.getToken(user) : { error: true, description: "Invalid email or password." };
        }
        catch (e) {
            errorsController.logger({error:'login',description:e});
            return {error:true,description:'login: '+e};
        }
    };

    static async getUserHistory(userId) {
        if(!userId )
            return {error:true,description:'you don\'t have validation'};

        try {
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
        catch (e) {
            errorsController.logger({error:'getUserHistory',description:e});
            return {error:true,description:'getUserHistory: '+e};
        }

    }

    static async getUserWatchesHistory(userId) {
        if(!userId )
            return {error:true,description:'you don\'t have validation'};
        try {
            let history = [];
            history = await this.getUserHistory(userId);
            history = history.watches;
            history.sort(function(a,b){return b.date - a.date});
            history = history.slice(0,10);
            let result = [];
            for(let i = 0; i < history.length; i++) {
                result.push(await Video.findById(history[i].video));
            }
            return result;
        }
        catch (e) {
            errorsController.logger({error:'getUserWatchesHistory',description:e});
            return {error:true,description:'getUserWatchesHistory: '+e};
        }
    }

    static async getUser(email) {
        if(!email )
            return {error:true,description:'you don\'t have validation'};

        try {
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
        }
        catch (e) {
            errorsController.logger({error:'getUser',description:e});
            return {error:true,description:'getUser: '+e};
        }
    };

    /**
     * Created by Aviv Segal on Dec 2018
     * @param body
     * @returns All User Collection
     */
    static async getUserCollection(body) {

        // TODO: error handler
        // TODO: we can use body as filters.
        try {
            let result = {status: 200, data: null};
            result.data = await User.find(err => {
                if (err) {
                    result.status = 400;
                    result.data = err;
                }
            });
            return result;
        }
        catch (e) {
            errorsController.logger({error:'getUserCollection',description:e});
            return {error:true,description:'getUserCollection: '+e};
        }
    };

    static async updateUser(uid, profile) {
        try {

            if(profile.password) {
                profile.password = await bcrypt.hash(profile.password, await bcrypt.genSalt(10));
            }

            let invalid = { };
            await User.findByIdAndUpdate(uid, profile, {}).catch(err => {
                invalid = {error: true, description: err};
                errorsController.logger({error: 'updateUser', description: err});
            });
            return invalid;
        } catch (e) {
            errorsController.logger({error: 'updateUser', description: e});
            return {error: true, description: 'updateUser: ' + e};
        }
    }

    static async getUserById(uid) {
        try {
            let result = {};
            result = await User.findOne({ _id: uid }).catch(err => {
                result = {error: true, description: err};
                errorsController.logger({error: 'getUser', description: err});
            });
            return result;
        } catch (e) {
            errorsController.logger({error: 'getUser', description: e});
            return {error: true, description: 'getUser: ' + e};
        }
    }
}

module.exports = UserController;