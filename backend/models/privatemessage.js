var mongoose = require('mongoose');

var privatemessageSchema = mongoose.Schema({
    from:   { type:String, required:true },
    to:      { type:String, required:true },
    message:{ type:String, required:true },
    date:    { type:Date, default: Date.now }
});


module.exports = mongoose.model('PrivateMessage',privatemessageSchema); // privateMessages
