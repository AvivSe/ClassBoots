const PrivateMessage = require('../models/privatemessage');
const errorsController = require('./errorsController');
const UsersController = require('./userController');

class PrivateMessageController {
    static async getPrivateMessageCollection() {
        try {
            let result;
            let invalid = {};
            result = await PrivateMessage.find(err => {
                if (err) {
                    invalid = {error: true, description: err};
                    errorsController.logger({error: 'getPrivateMessageCollection', description: err});
                }
            });
            return invalid.error === undefined ? result : invalid;
        } catch (e) {
            errorsController.logger({error: 'getPrivateMessageCollection', description: e});
            return {error: true, description: 'getPrivateMessageCollection: ' + e};
        }
    };


    static async getInboxMessages(id) {
        try {
            let result = [];
            await PrivateMessage.find({to: id}).then(node => {
                if (node)
                    result = node;
                else
                    result = [];
            }).catch(err => {
                result = {error: true, description: err};
                errorsController.logger({error: 'getInboxMessages', description: err});
            });
            return result;
        } catch (e) {
            errorsController.logger({error: 'getInboxMessages', description: e});
            return {error: true, description: 'getInboxMessages: ' + e};
        }
    }

    static async getOutboxMessages(id) {
        try {
            let result = [];
            await PrivateMessage.find({from: id}).then(node => {
                if (node)
                    result = node;
                else
                    result = [];
            }).catch(err => {
                result = {error: true, description: err};
                errorsController.logger({error: 'getOutboxMessages', description: err});
            });
            return result;
        } catch (e) {
            errorsController.logger({error: 'getOutboxMessages', description: e});
            return {error: true, description: 'getOutboxMessages: ' + e};
        }
    }

    static async sendPrivateMessage(body) {
        try {
            let result = {};
            let message = new PrivateMessage(body);
            await message.save(err => {
                if (err) {
                    result = {error: true, description: err};
                    errorsController.logger({error: 'sendPrivateMessage', description: err});
                }
            });
            return result.error === undefined ? message : result;
        } catch (e) {
            errorsController.logger({error: 'sendPrivateMessage', description: e});
            return {error: true, description: 'sendPrivateMessage: ' + e};
        }
    }


    static async sendPrivateMessages(body) {
        try {
            let result = {description:"",error:false};
            for (let i = 0; i < body.to.length; i++) {
                let to = await UsersController.getUser(body.to[i]);
                if (!to.error) {
                    let send = {to:to._id,from:body.from,message:body.message};
                    let msgresult = await PrivateMessageController.sendPrivateMessage(send);
                    if(msgresult.error){
                        result.error = true;
                        result.description += (msgresult+"\n");
                    }
                } else {
                    result.error = true;
                    result.description += ("cannot find email " + body.to[i] + "reciver\n");
                }
            }
            return result;
        } catch (e) {
            errorsController.logger({error: 'sendPrivateMessage', description: e});
            return {error: true, description: 'sendPrivateMessage: ' + e};
        }


    }
}

module.exports = PrivateMessageController;