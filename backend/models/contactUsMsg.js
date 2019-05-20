var mongoose = require('mongoose');

var contactusMsgSchema = mongoose.Schema({
    email:  { type:String, required:true },
    message:{ type:String, required:true },
    date:   {type:Date, default: Date.now },
    handled:{type:Boolean, default: false}
});

module.exports = mongoose.model('ContactUsMsg',contactusMsgSchema); // contactusMsg
