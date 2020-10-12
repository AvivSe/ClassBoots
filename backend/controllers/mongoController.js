const mongoose = require('mongoose');
const errorsController = require("./errorsController");
const connectionString = process.env.DB_CONNECTION_STRING;
let connected = false;

class MongoController {

    static connect() {
        try {
            if(!connected) {
                mongoose.connect(connectionString, { useNewUrlParser: true, useCreateIndex:true, useFindAndModify:false})
                    .then(() => {
                        connected = true;
                    }).catch(reason => {
                    console.log(reason);
                });
            }
        }
        catch (e) {
            errorsController.logger({error:'connect-MongoController: ',description:e});
            return {error:true,description:'connect-MongoController: '+e};
        }

    }
}


module.exports = MongoController;