var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email:      { type:String, required:true, unique:true },
    password:   { type:String, required:true },
    regDate:    { type:Date, default: Date.now },
    role:       { type:String, default: 'user'}

});

module.exports = mongoose.model('User',userSchema); // users