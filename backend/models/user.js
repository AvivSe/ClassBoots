var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email:      { type:String, required:true, unique:true },
    password:   { type:String, required:true },
    regDate:    { type:Date, default: Date.now },
    address:    { type:String, required:true },
    rule:       { type:String, default: 'user'},
    firstname:  { type:String, required:true },
    lastname:   { type:String, required:true },
    BOD:        { type:Date, required:true },

});

module.exports = mongoose.model('User',userSchema); // users