const  ContactUsMsg= require('../models/contactUsMsg');
const errorsController = require('./errorsController');

class contactusmsgController {
    static async getContactUsMsgCollection() {
        try {
            let result;
            let invalid = {};
            result = await ContactUsMsg.find(err => {
                if (err) {
                    invalid = {error: true, description: err};
                    errorsController.logger({error: 'getContactUsMsgCollection', description: err});
                }
            });
            return invalid.error === undefined ? result : invalid;
        } catch (e) {
            errorsController.logger({error: 'getContactUsMsgCollection', description: e});
            return {error: true, description: 'getContactUsMsgCollection: ' + e};
        }
    };


    static async getInboxMessages(id) {
        try {
            let result = [];
            await ContactUsMsg.find({to: id}).then(node => {
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



    static async sendContactMessage(body) {
        try {
            let result = {};
            let message = new ContactUsMsg(body);
            await message.save(err => {
                if (err) {
                    result = {error: true, description: err};
                    errorsController.logger({error: 'sendContactMessage', description: err});
                }
            });
            return result.error === undefined ? message : result;
        } catch (e) {
            errorsController.logger({error: 'sendContactMessage', description: e});
            return {error: true, description: 'sendContactMessage: ' + e};
        }
    }



}

module.exports = contactusmsgController;