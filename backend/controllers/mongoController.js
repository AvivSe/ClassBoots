const mongoose = require('mongoose');
//const aws = require('aws-sdk');
// todo: mongo config file
const connectionString = "mongodb://site:QqQq!1!1@ds117164.mlab.com:17164/classboots";
// "mongodb://"+ process.env.DB_USER_CONNECT +":"+ process.env.DB_PASS_CONNECT +"@ds117164.mlab.com:17164/classboots"
let connected = false;

class MongoController {

    static connect() {
        if(!connected) {
            connected = true;
            mongoose.connect(connectionString, { useNewUrlParser: true ,useCreateIndex:true})
                .then(() => {
                    console.log('Connected to the database!');
                }).catch(reason => {
                console.log(reason);
            });
        }
    }
}


module.exports = MongoController;