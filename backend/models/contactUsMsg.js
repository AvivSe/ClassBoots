var mongoose = require('mongoose');

var contactusMsgSchema = mongoose.Schema({
    email:  { type:String, required:true },
    message:{ type:String, required:true },
    date:   {type:Date.now(),required:true},
    handled:{type:Boolean}
});

module.exports = mongoose.model('ContactUsMsg',contactusMsgSchema); // privateMessages
